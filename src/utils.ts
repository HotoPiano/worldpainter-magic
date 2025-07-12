import dimension from "./dimension";
import log from "./log";
import { loopCoordinates } from "./mapDimensions";

export function raiseAll(value: number) {
  loopCoordinates(
    (x, y) => {
      dimension.setHeightAt(x, y, dimension.getHeightAt(x, y) + value);
      let waterLevel = dimension.getWaterLevelAt(x, y);
      if (waterLevel > 0) {
        dimension.setWaterLevelAt(x, y, waterLevel - value);
      }
    },
    undefined,
    true
  );
  log("raised all by " + value);
}

export function getRandomNumber(min: number, max: number) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export function isWaterlogged(floodedCountZero: number, waterLevel: number, height: number) {
  let waterloggedLayer = false;
  let waterloggedTopLayer = false;
  if (floodedCountZero > 0) {
    waterloggedLayer = true;
    if (waterLevel - height > 0 && waterLevel - height <= 1.44) {
      //
    } else {
      waterloggedTopLayer = true;
    }
  }
  return { waterloggedLayer, waterloggedTopLayer };
}
