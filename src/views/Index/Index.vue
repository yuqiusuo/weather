<style lang="less" scoped>
@import url('./style.less');
</style>

<template>
    <article class="weather" :class="timeCls">
        <div class="weather__info">
            <div class="iconfont weather__icon pull-left" :class="weatherIcon"></div>
            <div class="temperature">
                <span>{{temperature}}°C</span>
                <div class="temperature--min">{{minTemperture}}°C</div>
                <div class="temperature--max">{{maxTemperture}}°C</div>
            </div>
            <div class="weather__txt">{{weatherTxt}}</div>
            <div class="air__quality">空气质量 {{airQuality}}</div>
        </div>
        <div class="weather__pre">
            <div class="weather__pre__item pull-left weather__tomorrow">
                <div class="pre__weather__icon iconfont" :class="tomorrowWeatherIcon"></div>
                <div class="pre__weather__txt">{{tomorrow.cond_txt_d}}</div>
                <div class="pre__temperature__range">
                    {{tomorrow.tmp_min}}°C ~ {{tomorrow.tmp_max}}°C
                </div>
            </div>
            <div class="weather__pre__item pull-left weather__acquired">
                <div class="pre__weather__icon iconfont" :class="acquiredWeatherIcon"></div>
                <div class="pre__weather__txt">{{acquired.cond_txt_d}}</div>
                <div class="pre__temperature__range">
                    {{acquired.tmp_min}}°C ~ {{acquired.tmp_max}}°C
                </div>
            </div>
        </div>
        <div class="location" @click="showContArea(true)">
            <div class="location__icon iconfont icon-dingwei"></div>
            <div class="location__text">{{city}}</div>
        </div>
		<cont-area :show="isShowContArea" @search="search"></cont-area>
		<div class="cont-shadow" :class="{'hide': !isShowContArea}" @click="showContArea(false)"></div>
    </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Seniverse } from '@/assets/js/util';
import { WeatherIcon, Season, ErrorMsg } from '@/assets/js/contant.ts';
import contArea from './contArea.vue';

@Component({
	components: {
		contArea
	}
})
export default class Index extends Vue {
	preCity: string = '合肥'; // 预选城市
	city: string = '合肥'; // 默认城市
	code: string = '999'; // 默认icon代码
	temperature: string = '----'; // 默认温度
	minTemperture: string = '----'; // 最低温度
	maxTemperture: string = '----'; // 最高温度
	weatherIcon: string = 'icon-unknow'; // 默认icon图标
	airQuality: string = '----'; // 空气质量
	weatherTxt: string = '----'; // 天气
	tomorrow: object = {}; // 明天天气对象
	tomorrowWeatherIcon: string = 'icon-unknow'; // 明天天气图标
	acquired: object = {}; // 后天天气对象
	acquiredWeatherIcon: string = 'icon-unknow'; // 后天天气图标
	timeCls: string = 'lethe'; // 时间校验
	isShowContArea: boolean = false; // 控制修改地区是否显示

	created() {
		this.calTime();
		this.getWeatherInfo();
		this.getAirInfo();
	}

	// 计算时间
	calTime() {
		let date = new Date(),
			month = date.getMonth() + 1,
			hour = date.getHours();
		if (!(hour >= 6 && hour <= 18)) {
			this.timeCls = 'night';
			return;
		}

		this.timeCls = (Season as any)[month];
	}

	// 获取天气信息
	getWeatherInfo() {
		let sen = new Seniverse(this.preCity);
		sen
			.getGatherWeather()
			.then(re => {
				console.log(re);
				let errAng = ErrorMsg as any,
					reAny = re as any;
				if (errAng[reAny["HeWeather6"][0].status]) {
					alert(errAng[reAny['HeWeather6'][0].status]);
					return;
				}
				let result = reAny['HeWeather6'];
				this.getWeatherInfoSc(result);
			})
			.catch(err => {
				console.log(err);
			});
	}

	// 获取空气质量信息
	getAirInfo() {
		let sen = new Seniverse(this.city);
		sen
			.getAirQuality()
			.then(re => {
				console.log('空气', re);
				let result = (re as any)['HeWeather6'][0].air_now_city;
				this.getAirInfoSc(result);
			})
			.catch(err => {
				console.log(err);
			});
	}

	// 获取天气信息回调
	getWeatherInfoSc(result: any) {
		let info = result[0].now,
			infoTody = result[0].daily_forecast[0],
			WeatherIconAny = WeatherIcon as any;
		this.city = result[0].basic.parent_city;
		this.code = info.cond_code;
		this.weatherIcon = WeatherIconAny[info.cond_code];
		this.temperature = info.tmp;
		this.weatherTxt = info.cond_txt;
		this.minTemperture = infoTody.tmp_min;
		this.maxTemperture = infoTody.tmp_max;
		this.tomorrow = result[0].daily_forecast[1] || {};
		this.tomorrowWeatherIcon =
			WeatherIconAny[(this.tomorrow as any).cond_code_d];
		this.acquired = result[0].daily_forecast[2] || {};
		this.acquiredWeatherIcon =
			WeatherIconAny[(this.acquired as any).cond_code_d];
	}

	// 获取空气质量回调
	getAirInfoSc(result: any) {
		this.airQuality = result.qlty;
	}

	// 修改地址弹框是否显示
	showContArea(v: boolean) {
		this.isShowContArea = v;
	}

	// 搜索回调
	search(city: string) {
		this.preCity = city;
		this.getWeatherInfo();
		this.getAirInfo();
	}
}
</script>
