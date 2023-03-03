export const convertUnixToLocaleString = (time: number) =>
  new Date(time * 1000).toLocaleTimeString();
