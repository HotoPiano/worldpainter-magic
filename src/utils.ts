import dimension from "./dimension";
import log from "./log";
import { loopCoordinates } from "./mapDimensions";

export function raiseAll(value: number) {
  loopCoordinates((x, y) => {
    dimension.setHeightAt(x, y, dimension.getHeightAt(x, y) + value);
    let waterLevel = dimension.getWaterLevelAt(x, y);
    if (waterLevel > 0) {
      dimension.setWaterLevelAt(x, y, waterLevel - value);
    }
  }, true);
  log("raised all by " + value);
}

export function getRandomNumber(min: number, max: number) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}
