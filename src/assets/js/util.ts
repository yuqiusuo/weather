const CryptoJS = require('crypto-js');
import { SeniverseConfig } from '../../../config/weather.config';
import axios from 'axios';
import {WeatherType} from './contant';

class Seniverse {
    private key: string;
    private defaultOpt = {
        language: 'zh',
        location: 'hefei',
        ttl: 1800,
        unit: 'm',
        callback: 'showData'
    };
    private preUrl: string;

    constructor(location: string) {
        this.key = SeniverseConfig.key || '';
        this.preUrl = 'https://free-api.heweather.com/s6/';
        this.defaultOpt.location = location || 'hefei';
    }

    private request(url: string) {
        return new Promise((resolve, reject) => {
            axios.get(url).then((re) => {
                resolve(re.data);
            }).catch((err) => {
                reject(err);
            });
        })
    }

    // 获取当前天气
    public getNowWeather() {
        let url = `${this.preUrl}${WeatherType.NOW}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }

    // 获取当天天气
    public getDailyWeather() {
        let url = `${this.preUrl}${WeatherType.DAILY}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }

    // 获取每小时天气
    public getHourlyWeather() {
        let url = `${this.preUrl}${WeatherType.HOURLY}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }

    // 获取天气集合
    public getGatherWeather() {
        let url = `${this.preUrl}${WeatherType.GATHER}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }
    
    // 获取当前空气质量
    public getAirQuality() {
        let url = `${this.preUrl}${WeatherType.AIR}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }
}

export {Seniverse};
