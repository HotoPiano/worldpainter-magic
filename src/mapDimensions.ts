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

export const loopCoordinates = (func: (x: number, y: number, tileNumber: number) => any, name?: string, withoutLogging?: boolean) => {
  const dateStart = new Date();
  let previousPercentage = -1;
  let tileNumber = 0;
  for (let x = xStartTile; x < xEndTile; x++) {
    if (!withoutLogging) {
      const percentage = Math.round(((x - xStartTile) * 100) / (xEndTile - 1 - xStartTile));
      //log(x, xEndTile); siste 161 / 162 blir 94%...
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
    const timeMillis = dateEnd.getTime() - dateStart.getTime();
    const seconds = Math.floor(timeMillis / 1000) % 60;
    const minutes = Math.floor(timeMillis / 1000 / 60) % 60;
    const hours = Math.floor(timeMillis / 1000 / 60 / 60);
    const hoursText = hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") + ", " : "";
    const minutesText = minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") + " and " : "";
    const secondsText = seconds + " second" + (seconds > 1 ? "s" : "");
    log("took " + hoursText + minutesText + secondsText); // took 1 hour(s)
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
