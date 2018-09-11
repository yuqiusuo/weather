const CryptoJS = require('crypto-js');
import { SeniverseConfig } from '../../../config/weather.config';
import axios from 'axios';

enum WeatherType {
    DAILY = 'weather/forecast?',
    HOURLY = 'weather/hourly?',
    NOW = 'weather/now?',
    GATHER = '/weather'
};

class Seniverse {
    private key: string;
    private uid: string;
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
        this.uid = SeniverseConfig.uid || '';
        this.preUrl = 'https://free-api.heweather.com/s6/';
        this.defaultOpt.location = location || 'hefei';
    }

    private request(url: string) {
        return new Promise((resolve, reject) => {
            axios.get(url).then((re) => {
                console.log(re.data);
                resolve(re.data);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        })
    }

    public getNowWeather() {
        let url = `${this.preUrl}${WeatherType.NOW}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }

    public getDailyWeather() {
        let url = `${this.preUrl}${WeatherType.DAILY}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }

    public getHourlyWeather() {
        let url = `${this.preUrl}${WeatherType.HOURLY}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }

    public getGatherWeather() {
        let url = `${this.preUrl}${WeatherType.GATHER}location=${this.defaultOpt.location}&unit=${this.defaultOpt.unit}&lang=${this.defaultOpt.language}&key=${this.key}`;
        return this.request(url);
    }
}

export {Seniverse};
