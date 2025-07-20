import dimension from "./dimension";
import log from "./log";
import { loopCoordinates, loopOffset } from "./mapDimensions";
import customObjectLayers from "./palettes/conquest/1/customObjectLayers";

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

export const spaceForTree = (x: number, y: number, thinTree?: boolean) => {
  let space = true;
  if (thinTree) {
    loopOffset(x, y, 3, 1, (x2, y2) => {
      // thintree beside other thin tree we allow all non matching parallell placements
      if (x2 != x && y2 != y) {
        if (
          dimension.getLayerValueAt(customObjectLayers.larchTreesTall, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.spruceTrees, x2, y2)
        ) {
          return;
          // allow placement at outer edges that is not parallell to both x and y
        } else if (x2 - x > 2 || x2 - x < -2 || y2 - y > 2 || y2 - y < -2) {
          return;
        }
      }

      if (
        dimension.getLayerValueAt(customObjectLayers.oliveTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.aspenTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.poplarTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.aspenTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.gorseTrees, x2, y2)
      ) {
        space = false;
        return true;
      }
    });
  } else {
    loopOffset(x, y, 3, 1, (x2, y2) => {
      // allow placement at outer edges that is not parallell to both x and y
      if (x2 != x && y2 != y) {
        if (x2 - x > 2 || x2 - x < -2 || y2 - y > 2 || y2 - y < -2) {
          return;
        }
      }

      if (
        space &&
        (dimension.getLayerValueAt(customObjectLayers.oliveTrees, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.aspenTrees, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.poplarTrees, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.aspenTrees, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.gorseTrees, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.larchTreesTall, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.spruceTrees, x2, y2))
      ) {
        space = false;
      }
    });
  }

  return space;
};

/*
    if (x2 == x || y2 == y) {
      if (
        space &&
        (dimension.getLayerValueAt(customObjectLayers.larchTreesTall, x2, y2) ||
          dimension.getLayerValueAt(customObjectLayers.spruceTrees, x2, y2))
      ) {
        space = false;
      }
    }

    if (
      space &&
      (dimension.getLayerValueAt(customObjectLayers.oliveTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.aspenTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.poplarTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.aspenTrees, x2, y2) ||
        dimension.getLayerValueAt(customObjectLayers.gorseTrees, x2, y2))
      // || dimension.getLayerValueAt(customObjectLayers.larchTreesTall, x2, y2)
      // || dimension.getLayerValueAt(customObjectLayers.spruceTrees, x2, y2)
    ) {
      space = false;
    }
    */

export const getSteeperNeighbours = (x: number, y: number, height: number, randomDistance: number, distanceMultiplier: number) => {
  let steeperNeighbours = 0;
  loopOffset(x, y, randomDistance * distanceMultiplier, randomDistance * distanceMultiplier, (x2, y2) => {
    if (x === x2 && y === y2) return;
    const height2 = dimension.getHeightAt(x2, y2);
    if (height2 - 10 > height) steeperNeighbours++;
  });
  return steeperNeighbours;
};

export const getRandomBlockNeighbour = (x: number, y: number) => {
  return {
    x: x + (getRandomNumber(1, 2) == 1 ? -1 : 1),
    y: y + (getRandomNumber(1, 2) == 1 ? -1 : 1),
  };
};
