export type Option = {
  value: string | number;
  label: string;
  children?: Option[];
};

export type TChartData = {
  name: string;
  [k: string]: number | string;
};
