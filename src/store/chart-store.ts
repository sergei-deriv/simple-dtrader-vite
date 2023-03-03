import { makeAutoObservable } from 'mobx';
import { TChartData } from '../types';

class ChartStore {
  data: TChartData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTick = (tick: TChartData) => {
    this.data.shift();
    this.data.push(tick);
  };

  createHistory = (history: TChartData[]) => {
    this.data = history;
  };
}

export default new ChartStore();
