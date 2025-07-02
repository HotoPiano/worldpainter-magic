import dimension from "./dimension";
import log from "./log";

/*
const TILESIZE = 128;
export const mapWidth = dimension.getWidth() * TILESIZE;
export const mapHeight = dimension.getHeight() * TILESIZE;
export const startX = 128 * dimension.getLowestX();
export const endX = 128 * (dimension.getHighestX() + 1) - 1;
export const startY = 128 * dimension.getLowestY();
export const endY = 128 * (dimension.getHighestY() + 1) - 1;

export const loopCoordinates = (func: (x: number, y: number) => any, withoutLogging?: boolean) => {
  for (var x = startX; x < endX; x++) {
    for (var y = startY; y < endY; y++) {
      if (y == 0 && x % 100 == 0 && !withoutLogging) log("iterating blocks: " + (x + "/" + endX));
      func(x, y);
    }
  }
};
*/

const TILESIZE = 128;
const TILE_COUNT_TEXT = dimension.getWidth() + " * " + dimension.getHeight();
export const mapWidth = dimension.getWidth() * TILESIZE;
export const mapHeight = dimension.getHeight() * TILESIZE;
export const startX = 128 * dimension.getLowestX();
export const endX = 128 * (dimension.getHighestX() + 1) - 1;
export const startY = 128 * dimension.getLowestY();
export const endY = 128 * (dimension.getHighestY() + 1) - 1;
const tileWidth = dimension.getWidth();
const tileHeight = dimension.getHeight();
const xStartTile = dimension.getLowestX();
const xEndTile = dimension.getHighestX();
const yStartTile = dimension.getLowestY();
const yEndTile = dimension.getHighestY();

export const loopCoordinates = (func: (x: number, y: number, tileNumber: number) => any, withoutLogging?: boolean) => {
  let tileNumber = 0;
  for (var x = xStartTile; x < xEndTile; x++) {
    for (var y = yStartTile; y < yEndTile; y++) {
      tileNumber++;
      //if (y == 0 && x % 100 == 0 && !withoutLogging) log("iterating blocks: " + (x + "/" + endX));
      if (!withoutLogging) log("iterating tile: " + (tileNumber + " / (" + TILE_COUNT_TEXT) + ")");
      for (var x2 = x * TILESIZE; x2 < x * TILESIZE + TILESIZE; x2++) {
        for (var y2 = y * TILESIZE; y2 < y * TILESIZE + TILESIZE; y2++) {
          func(x2, y2, tileNumber);
        }
      }
    }
  }
};

/**
 *
 * @param x
 * @param y
 * @param offset
 * @param step
 * @param func return true in order to stop loop
 */
//for (let x2 = x - range * 2; x2 <= x + range * 2; x2 = x2 + range) {
export const loopOffset = (x: number, y: number, offset: number, step: number, func: (x: number, y: number) => any) => {
  for (let x2 = x - offset; x2 <= x + offset; x2 = x2 += step) {
    for (let y2 = y - offset; y2 <= y + offset; y2 = y2 += step) {
      if (x2 < startX || x2 > endX || y2 < startY || y2 > endY) continue;
      if (func(x2, y2) == true) return;
    }
  }
};

/*
const startX = 128 * dimension.getLowestX(); // -(mapWidth / 2);
const endX = 128 * (dimension.getHighestX() + 1) - 1; // -startX;
const startY = 128 * dimension.getLowestY(); // -(mapHeight / 2);
const endY = 128 * (dimension.getHighestY() + 1) - 1; // -startY;
 const TILESIZE = 128;
const mapWidth = dimension.getWidth() * TILESIZE;
const mapHeight = dimension.getHeight() * TILESIZE;
const offsetX = mapWidth / 2;
const offsetY = mapHeight / 2;
*/
