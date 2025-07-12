import dimension from "./dimension";
import log from "./log";

const TILESIZE = 128;
const TILE_COUNT_TEXT = dimension.getWidth() + " * " + dimension.getHeight();
export const mapWidth = dimension.getWidth() * TILESIZE;
export const mapHeight = dimension.getHeight() * TILESIZE;
export const startX = TILESIZE * dimension.getLowestX();
export const endX = TILESIZE * (dimension.getHighestX() + 1) - 1;
export const startY = TILESIZE * dimension.getLowestY();
export const endY = TILESIZE * (dimension.getHighestY() + 1) - 1;
const tileWidth = dimension.getWidth();
const tileHeight = dimension.getHeight();
const xStartTile = dimension.getLowestX();
const xEndTile = dimension.getHighestX() + 1;
const yStartTile = dimension.getLowestY();
const yEndTile = dimension.getHighestY() + 1;

/*
export const loopCoordinates = (func: (x: number, y: number, tileNumber: number) => any, name?: string, withoutLogging?: boolean) => {
  const dateStart = new Date();
  let percentage = 0;
  let tileNumber = 0;
  let tileXNumber = 0;
  for (let x = xStartTile; x < xEndTile; x++) {
    tileXNumber++;
    for (let y = yStartTile; y < yEndTile; y++) {
      tileNumber++;
      if (!withoutLogging && y == yStartTile && (tileWidth < 100 || x % Math.round((xEndTile - xStartTile) / 100) == 0)) {
        const tileNumberLength = (tileWidth * tileHeight).toString().length;
        const paddedTileNumber = padNumber(tileNumber, tileNumberLength);
        const percentageText = tileWidth > 100 && " - " + ++percentage + "%";
        log("iterating tiles for " + name + ": " + (paddedTileNumber + " / (" + TILE_COUNT_TEXT) + ")" + percentageText);
      }
      for (let x2 = x * TILESIZE; x2 < x * TILESIZE + TILESIZE; x2++) {
        for (let y2 = y * TILESIZE; y2 < y * TILESIZE + TILESIZE; y2++) {
          func(x2, y2, tileNumber);
        }
      }
    }
  }
  if (!withoutLogging) {
    const dateEnd = new Date();
    log("took " + Math.round((dateEnd.getTime() - dateStart.getTime()) / 1000) + " seconds");
  }
};
*/

export const loopCoordinates = (func: (x: number, y: number, tileNumber: number) => any, name?: string, withoutLogging?: boolean) => {
  const dateStart = new Date();
  let previousPercentage = 0;
  let tileNumber = 0;
  let tileXNumber = 0;
  for (let x = xStartTile; x < xEndTile; x++) {
    tileXNumber++;

    if (!withoutLogging) {
      //log(x - xStartTile, xEndTile - xStartTile);
      const percentage = Math.round(((x - xStartTile) * 100) / (xEndTile - xStartTile));
      if (percentage > previousPercentage) {
        previousPercentage = percentage;
        const tileNumberLength = (tileWidth * tileHeight).toString().length;
        const paddedTileNumber = padNumber(tileNumber, tileNumberLength);
        log("iterating tiles for " + name + ": " + (paddedTileNumber + " / (" + TILE_COUNT_TEXT) + ")" + " - " + percentage + "%");
      }
    }

    for (let y = yStartTile; y < yEndTile; y++) {
      tileNumber++;
      for (let x2 = x * TILESIZE; x2 < x * TILESIZE + TILESIZE; x2++) {
        for (let y2 = y * TILESIZE; y2 < y * TILESIZE + TILESIZE; y2++) {
          func(x2, y2, tileNumber);
        }
      }
    }
  }
  if (!withoutLogging) {
    const dateEnd = new Date();
    log("took " + Math.round((dateEnd.getTime() - dateStart.getTime()) / 1000) + " seconds");
  }
};

function padNumber(num: number, length: number) {
  let numString = String(num);
  while (numString.length < length) {
    numString = "0" + numString;
  }
  return numString;
}

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
const TILESIZE = 128;
export const mapWidth = dimension.getWidth() * TILESIZE;
export const mapHeight = dimension.getHeight() * TILESIZE;
export const startX = 128 * dimension.getLowestX();
export const endX = 128 * (dimension.getHighestX() + 1) - 1;
export const startY = 128 * dimension.getLowestY();
export const endY = 128 * (dimension.getHighestY() + 1) - 1;

export const loopCoordinates = (func: (x: number, y: number) => any, withoutLogging?: boolean) => {
  for (let x = startX; x < endX; x++) {
    for (let y = startY; y < endY; y++) {
      if (y == 0 && x % 100 == 0 && !withoutLogging) log("iterating blocks: " + (x + "/" + endX));
      func(x, y);
    }
  }
};

let percentage = 0;
//const iterations = (endX - startX) * (endY - startY);
//let iteration = 0;
export const loopCoordinates = (func: (x: number, y: number) => any, withoutLogging?: boolean) => {
  const dateStart = new Date();
  for (let x = startX; x < endX; x++) {
    for (let y = startY; y < endY; y++) {
      //iteration++;
      //if (!withoutLogging && Math.round(iterations / 100) == iteration) log("iterating blocks: " + (x + "/" + endX));
      //if (y == 0 && x % 100 == 0 && !withoutLogging) log("iterating blocks: " + (x + "/" + endX));
      if (!withoutLogging && y == startY && x % Math.round(mapWidth / 100) == 0) {
        percentage++;
        log("iterating blocks: " + (x + "/" + endX) + " - " + percentage + "%");
      }
      func(x, y);
    }
  }
  const dateEnd = new Date();
  if (!withoutLogging) {
    log("took " + Math.round((dateEnd.getTime() - dateStart.getTime()) / 1000) + " seconds");
  }
};
*/
