export type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

export type TChartData = {
  price: number;
  time: number;
};
