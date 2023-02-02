export type Option = {
  value: string | number;
  label: string;
  market?: string;
  symbol?: string;
  children?: Option[];
};
