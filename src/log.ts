const LIMIT = 1000;

let i = 0;

export default function log(...args: any) {
  //  if (i++ > LIMIT) return;

  const date = new Date();
  const hours = prependSingleDigits(date.getHours());
  const minutes = prependSingleDigits(date.getMinutes());
  const seconds = prependSingleDigits(date.getSeconds());
  const timeText = hours + ":" + minutes + ":" + seconds;
  //@ts-ignore
  print(timeText + " || " + args.join(";"));
}

const prependSingleDigits = (num: number) => (num < 10 ? "0" : "") + num;
