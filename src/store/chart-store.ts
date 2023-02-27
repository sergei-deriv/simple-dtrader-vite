import { makeAutoObservable } from 'mobx';
import { TChartData } from '../types';

class ChartStore {
  data: TChartData[] = [
    // {
    //   price: 91.368,
    //   time: 1677504124,
    // },
    // {
    //   price: 91.364,
    //   time: 1677504125,
    // },
    // {
    //   price: 91.365,
    //   time: 1677504126,
    // },
    // {
    //   price: 91.362,
    //   time: 1677504127,
    // },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addTick = (tick: TChartData) => {
    this.data.push(tick);
    console.log('TICK: data = ', this.data);
  };

  createHistory = (history: TChartData[]) => {
    this.data = history;
    console.log('History: data = ', this.data);
  };
}

export default new ChartStore();
