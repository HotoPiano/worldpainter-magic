// cd projects/world-magic npm run magic
// wpscript compiled/index.js

import log from "./log";
import world, { exportWorld, saveWorld } from "./world";
import dimension from "./dimension";
import { endX, endY, loopCoordinates, loopOffset, mapHeight, mapWidth, startX, startY } from "./mapDimensions";
import { getRandomNumber, raiseAll } from "./utils";
import { BIOMES, MAX_TREE_SPAWN_RATE } from "./constants";

import terrains from "./palettes/conquest/1/terrains";
import layers from "./palettes/conquest/1/groundCoverLayers";
import customObjectLayers from "./palettes/conquest/1/customObjectLayers";
import { Layer } from "./types/Dimension";
import { GroundCoverLayerType } from "./palettes/generator";

const HEIGHEST_HEIGHT = dimension.getHighestIntHeight();
//const SNOW_HEIGHT_LIMIT = Math.floor(HEIGHEST_HEIGHT / 4);
//const SNOW_SAME_AFTER = SNOW_HEIGHT_LIMIT * 3; //1400;
const SNOW_HEIGHT_LIMIT = Math.floor(HEIGHEST_HEIGHT / 3.5) + 20;
const SNOW_SAME_AFTER = SNOW_HEIGHT_LIMIT * 2.5; //1400;
const MOUNTAIN_EDGE_SLOPE = 0.77;
//const world = wp.getWorld().fromFile(WORLD_FILE).go();

// TODO separate this first into own palette, then start making ardacraft palette
// in new palette, can do: some random differences in in tiles, maybe sand by coast and biomes more like Thelassia map

let currentlyDoingSand = false;
let currentTile = 0;

const performMagic = () => {
  raiseAll(0.5);

  doCoastline();
  doRest();

  dimension.clearLayerData(org.pepsoft.worldpainter.layers.Annotations.INSTANCE);

  raiseAll(-0.5);
};

const doRest = () => {
  loopCoordinates((x, y, tileNumber) => {
    if (currentTile != tileNumber) {
      currentTile = tileNumber;
      currentlyDoingSand = getRandomNumber(1, 5) === 1 ? !currentlyDoingSand : currentlyDoingSand;
    }

    if (dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y) != 255) {
      return;
    }

    const height = dimension.getHeightAt(x, y);
    const addedSlope = height / HEIGHEST_HEIGHT / 2 - 0.2;
    const actualSlope = dimension.getSlope(x, y);
    const slope = actualSlope + addedSlope;
    const waterLevel = dimension.getWaterLevelAt(x, y);
    const floodedCountZero = dimension.getFloodedCount(x, y, 0, false);

    let layer: GroundCoverLayerType | null = null;
    let topLayer: GroundCoverLayerType | null = null;
    let treeLayer: any = null;
    let terrain: any = null;
    let biome: any = null;

    // snow
    if (floodedCountZero == 0 && height > SNOW_HEIGHT_LIMIT) {
      let steeperNeighbours = 0;
      // 25 - (500 / 100) = 25 - 5 = 20
      // 25 - (1500 / 100) = 25 - 15 = 10
      //const steeperLimit = 25 - Math.min(height, SNOW_SAME_AFTER) / 100;
      const onePerTwoHoundredHeight = Math.round(HEIGHEST_HEIGHT / 200); // +10 at 2000
      const steeperLimit = 15 + onePerTwoHoundredHeight - Math.min(height, SNOW_SAME_AFTER) / 100;
      // (500 / 1000) = 0.5
      // (1500 / 1000) = 1.5
      //const slopeLimit = Math.min(height, SNOW_SAME_AFTER) / 1000 + 0.5;
      const slopeLimit = Math.min(height, SNOW_SAME_AFTER) / 1000 + 0.5;

      // consider making top y directions (north) not as impactful, so those with most sun is not as snowy? or something else
      const range = getRandomNumber(40, 60);
      loopOffset(x, y, range + 20, range, (x2, y2) => {
        //for (let x2 = x - range * 2; x2 <= x + range * 2; x2 = x2 + range) {
        //for (let y2 = y - range * 2; y2 <= y + range * 2; y2 = y2 + range) {
        if (x2 < startX || x2 > endX || y2 < startY || y2 > endY) return;
        if (x === x2 && y === y2) return;
        const height2 = dimension.getHeightAt(x2, y2);
        if (height2 > height) steeperNeighbours++;
      });

      const setSnow = (steeperNeighbours > steeperLimit && slope < slopeLimit) || slope - addedSlope * 3 < 0.1;
      //const setSnowBiome = floodedCountZero == 0 && height > SNOW_HEIGHT_LIMIT && steeperNeighbours > steeperLimit / 1.3 && slope < slopeLimit + 0.5;
      //const setSnowBiome = floodedCountZero == 0 && (steeperNeighbours > steeperLimit / 1.3 || slope < 1.5);
      const setSnowBiome = steeperNeighbours > steeperLimit / 1.2 || slope - addedSlope * 3 < 0.2;
      if (setSnowBiome) {
        biome = BIOMES.FROZEN_PEAKS;
        treeLayer = null;
        topLayer = null;
        /*
        if (slopeMtn < 0.2) {
          terrain = terrains.snowyGranite;
          layer = layers.snowyGraniteSlab;
        } else if (slopeMtn < 0.4) {
          terrain = terrains.darkLimestone;
          layer = layers.darkLimestoneSlab;
        } else if (slopeMtn < 0.77) {
          terrain = terrains.weatheredBasalt;
          layer = layers.weatheredBasaltSlab;
        }
        */
      }
      if (setSnow) {
        // snowy granite hvis mindre enn 3 nabosnø blokker?
        const setSnowTerrain = slope < slopeLimit - 0.5;
        if (setSnowTerrain) {
          //terrain = org.pepsoft.worldpainter.Terrain.DEEP_SNOW;
          //layer = layers.frostBuiltIn;
          layer = layers.snow;
          terrain = terrains.snowyIcyLimestone;
        } else {
          layer = layers.snow;
          terrain = terrains.snowyIcyLimestone;
        }
      }
    }

    const slopeMtn = slope; //slope + height / HEIGHEST_HEIGHT / 2;
    // mountains
    if (slopeMtn > 2.2) {
      terrain = terrains.mtn5LimestoneMix;
      layer = layers.mtn5LimestoneMix;
    } else if (slopeMtn > 2) {
      terrain = terrains.mtn7DarkLimestone2;
      layer = layers.mtn7DarkLimestone2;
    } else if (slopeMtn > 1.8) {
      terrain = terrains.mtn7DarkLimestone1;
      layer = layers.mtn7DarkLimestone1;
    } else if (slopeMtn > 1.6) {
      terrain = terrains.anorthosite;
      layer = layers.anorthosite;
    } else if (slopeMtn > 1.4) {
      terrain = terrains.mtn7DarkLimestone1;
      layer = layers.mtn7DarkLimestone1;
    } else if (slopeMtn > 1.2) {
      terrain = terrains.mtn7DarkLimestone2;
      layer = layers.mtn7DarkLimestone2;
    } else if (slopeMtn > 1) {
      terrain = terrains.mtn5LimestoneMix;
      layer = layers.mtn5LimestoneMix;
    } else if (slopeMtn > 0.85) {
      terrain = terrains.mtn6WeatheredGranite;
      layer = layers.mtn6WeatheredGranite;
    } else if (slopeMtn > 0.77) {
      terrain = terrains.mtnColorfulGranite;
      layer = layers.mtnColorfulGranite;
    } else if (slopeMtn > 0.7) {
      /*
      if ((biome = BIOMES.FROZEN_PEAKS)) {
        terrain = terrains.snowyGranite;
        layer = layers.snowyGraniteSlab;
      } else {
      */
      terrain = terrains.mtn3MossyLimestone;
      layer = layers.mtn3MossyLimestone;
      //}
    } else if (slopeMtn > 0.65) {
      /*if ((biome = BIOMES.FROZEN_PEAKS)) {
        terrain = terrains.snowyGranite;
        layer = layers.snowyGraniteSlab;
      } else {*/
      terrain = terrains.overgrownSmallLimestones;
      layer = layers.overgrownSmallLimestones;
      //}
    } else if (slopeMtn > 0.6) {
      terrain = terrains.mtn2BrownSphagnumMoss;
      layer = layers.mtn2BrownSphagnumMoss;
    } else if (slopeMtn > 0.55) {
      terrain = terrains.mtn1GreenSphagnum;
      layer = layers.mtn1GreenSphagnum;
    } else if (slopeMtn > 0.5) {
      terrain = terrains.mtn0MossySandstoneDebris;
      layer = layers.mtn0MossySandstoneDebris;
    }

    // forests & plants
    if (biome == null && floodedCountZero == 0) {
      //if (height < SNOW_HEIGHT_LIMIT) biome = BIOMES.DESERT;

      if (
        //addedSlope < 0.5 &&
        slope > 0.65 &&
        slope < 2 &&
        getRandomNumber(0, Math.round(slope * 2)) == 0
      ) {
        topLayer = slope > 0.65 && slope <= 0.77 ? layers.rocksDark : layers.rocks;
      }

      if (topLayer == null && slope < MOUNTAIN_EDGE_SLOPE) topLayer = layers.plantsPlains;

      /*
      if (slope < mountainEdgeSlope && getRandomNumber(1, 100) == 1) {
        treeLayer = customObjectLayers.bushesDeadThick;
      }
      */

      const doThickForest =
        //slope > 0.3 && slope < 0.4
        slope > 0.6 && slope < 0.7 && getRandomNumber(1, 8) == 1;

      if (doThickForest) {
        treeLayer = customObjectLayers.bushesDeadThick;

        //if (getRandomNumber(1, 2) == 1) {
        const extraLeavesX = x + (getRandomNumber(1, 2) == 1 ? -1 : 1);
        const extraLeavesY = y + (getRandomNumber(1, 2) == 1 ? -1 : 1);
        const slope2 = dimension.getSlope(extraLeavesX, extraLeavesY);

        //const height2 = dimension.getHeightAt(extraLeavesX, extraLeavesY);
        //if (height2 % 1 >= 0.5 && height2 % 1 < 0.52) {
        //if (height2 % 1 >= 0 && height2 % 1 < 0.2) {
        if (slope2 < MOUNTAIN_EDGE_SLOPE) {
          dimension.setBitLayerValueAt(layers.rowanLeaves.normal, extraLeavesX, extraLeavesY, true);
        }
        //}
        /*
        loopOffset(x, y, 1, (x2, y2) => {
          if (x2 == x || y2 == y) return;

          const height2 = dimension.getHeightAt(x2, x2);
          const slope2 = dimension.getSlope(x2, x2);
          //if (height2 % 1 >= 0.5 && height2 % 1 < 0.52) {
          //if (height2 % 1 >= 0 && height2 % 1 < 0.2) {
          if (height2 % 1 >= 0.7 && height2 % 1 < 0.9 && slope2 < mountainEdgeSlope) {
            dimension.setBitLayerValueAt(layers.rowanLeaves, x2, y2, true);
            return true;
          }
        });
        */
      } else {
        /*
        if (
          //height === Math.floor(height) &&
          //getRandomNumber(1, 3) != 3 &&
          // at flat blocks, but 0.5 because foliage is placed while map is lowered 0.5
          //(height % 1 >= 0.5 &&
          //  height % 1 < 0.52 &&
          (height % 1 >= 0.5 &&
            height % 1 < 0.52 &&
            //getRandomNumber(1, 10) == 1 &&
            // just so not constantly on every flat landscapes
            slope < mountainEdgeSlope &&
            slope != 0) ||
          // merging with thicktrees which is at slope > 0.6 && slope < 0.7
          (slope >= 0.67 && slope <= 0.71 && getRandomNumber(1, 5) === 1) ||
          (slope >= 0.59 && slope <= 0.63 && getRandomNumber(1, 5) === 1)
        ) {
          topLayer = layers.rowanLeaves;
        }
        */
        /*
        if (
          //height === Math.floor(height) &&
          //getRandomNumber(1, 3) != 3 &&
          // at flat blocks, but 0.5 because foliage is placed while map is lowered 0.5
          //(height % 1 >= 0.5 &&
          //  height % 1 < 0.52 &&
          height % 1 >= 0.3 &&
          height % 1 < 0.5 &&
          //getRandomNumber(1, 10) == 1 &&
          // just so not constantly on every flat landscapes
          slope < mountainEdgeSlope &&
          slope > 0.1
        ) {
          topLayer = layers.rowanLeaves;
        }
        */
      }

      const tryToPlaceTree = true;

      if (treeLayer == null && tryToPlaceTree) {
        let steeperNeighbours = 0;
        let sameAsNeighBours = 0;

        // desert + olive trees
        let randomDistance = getRandomNumber(30, 70); // 40,60 (20.06.2025)
        // consider making top y directions (north) not as impactful, so those with most sun is not as snowy? or something else
        //for (let x2 = x - randomDistance; x2 <= x + randomDistance; x2 = x2 + randomDistance) {
        //for (let y2 = y - randomDistance; y2 <= y + randomDistance; y2 = y2 + randomDistance) {
        loopOffset(x, y, randomDistance, randomDistance, (x2, y2) => {
          if (x === x2 && y === y2) return;
          const height2 = dimension.getHeightAt(x2, y2);
          if (height2 - 10 > height) steeperNeighbours++;
          if (height2 < height + 10 && height2 > height - 10) sameAsNeighBours++;
        });
        //}
        //}

        // was (sameAsNeighBours > 7 && slope < 0.1) 0.1 21.06.2025
        if (sameAsNeighBours > 6 && slope < 0.4) {
          //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, customBiomes["custom:desert"].getId());
          //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, BIOMES.DESERT);
          biome = BIOMES.DESERT;
          topLayer = layers.plantsDesert;
        }

        if (sameAsNeighBours > 7 && slope < 0.2) {
          //if (getRandomNumber(1, 2) != 1) continue;
          //dimension.clearLayerData(x, y, null);
          //print("heightDiff=" + (dimension.getHeightAt(x, y) - height));
          let steeperNeighbours2 = 0;
          loopOffset(x, y, randomDistance * 2, randomDistance * 2, (x2, y2) => {
            //for (let x2 = x - randomDistance * 2; x2 <= x + randomDistance * 2; x2 = x2 + randomDistance * 2) {
            //for (let y2 = y - randomDistance * 2; y2 <= y + randomDistance * 2; y2 = y2 + randomDistance * 2) {
            if (x === x2 && y === y2) return;
            const height2 = dimension.getHeightAt(x2, y2);
            if (height2 - 10 > height) steeperNeighbours2++;
          });
          //}
          //}

          /*
            if (steeperNeighbours2 >= 0 && steeperNeighbours2 < 4) {
            dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, customBiomes["custom:desert"].getId());
            //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, 1);
            //dimension.setBitLayerValueAt(layerForestFloor, x, y, 1);
            //dimension.setLayerValueAt(customBiomes["custom:desert"], x, y, MAX_TREE_SPAWN_RATE);
            }
            */

          if (steeperNeighbours2 == 2) {
            // > 2
            if (getRandomNumber(1, 8) == 1) {
              let oliveBlocked = false;
              //for (let x2 = x - 3; x2 <= x + 3; x2++) {
              //for (let y2 = y - 3; y2 <= y + 3; y2++) {
              loopOffset(x, y, 3, 1, (x2, y2) => {
                if (oliveBlocked) return;
                if (dimension.getLayerValueAt(customObjectLayers.oliveTrees, x2, y2)) {
                  oliveBlocked = true;
                }
              });
              if (!oliveBlocked) treeLayer = customObjectLayers.oliveTrees;
              //doOliveTree = true;
              //doThickForest = false;
            }
            if (treeLayer == null && steeperNeighbours2 > 0 && steeperNeighbours2 < 3) {
              if (getRandomNumber(1, 4) == 1) {
                topLayer = layers.rocks;
                //dimension.setBitLayerValueAt(layerR, x, y, 1);
                //continue;
              }
            }
          }
        }

        // taiga + rowan bushes
        //if (!doOliveTree) {
        if (treeLayer == null && biome == null && steeperNeighbours > 3 && slope < 0.4) {
          biome = BIOMES.BIOME_OLD_GROWTH_PINE_TAIGA;
          topLayer = layers.plantsTaiga;
          //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, biomes.taiga);
          //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, customBiomes["custom:beach"].getId());
          //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, 2);
          //dimension.setLayerValueAt(customBiomes["custom:beach"], x, y, MAX_TREE_SPAWN_RATE);
          if (steeperNeighbours > 4) {
            const randomNumber = getRandomNumber(1, 16);

            if (randomNumber == 1) {
              treeLayer = customObjectLayers.bushesRowan;
            } else if (randomNumber < 3) {
              topLayer = layers.rocks;
            }
          }
        }
        //}

        // random dead bush
        if (treeLayer == null && slope < MOUNTAIN_EDGE_SLOPE && getRandomNumber(1, 400) === 1) {
          treeLayer = customObjectLayers.bushesDead;
        }
      }
    }

    const { waterloggedLayer, waterloggedTopLayer } = isWaterlogged(x, y, floodedCountZero, waterLevel, height);

    if (floodedCountZero > 0) {
      if (terrain == null) terrain = terrains.seabed;
      if (layer == null) layer = slope > 0.2 ? layers.beachStone : layers.lakebed;
      if (topLayer == null) {
        if (getRandomNumber(0, 5) == 0) topLayer = layers.rocksDark;
        if (slope > 0.2) topLayer = layers.plantsCoastalWaterlogged;
      }
    }

    if (terrain == null) terrain = terrains.ground;
    if (layer == null) {
      if (biome == BIOMES.DESERT) layer = layers.groundDesert;
      else if (biome == BIOMES.BIOME_OLD_GROWTH_PINE_TAIGA) layer = layers.groundTaiga;
      //if (biome === BIOMES.TAIGA) layer = layers.groundTaiga;
      //if (biome === BIOMES.DEEP_FROZEN_OCEAN) layer = layers.groundTaiga;
      else layer = layers.ground;
    }

    //log(layer, terrain, topLayer, treeLayer, biome);

    // always placing terrain and layer
    dimension.setBitLayerValueAt(waterloggedLayer ? layer.waterlogged : layer.normal, x, y, true);
    dimension.setTerrainAt(x, y, terrain);

    // optionally placing toplayer (like grass), treelayer, biomelayer
    if (topLayer != null && treeLayer == null)
      dimension.setBitLayerValueAt(waterloggedTopLayer ? topLayer.waterlogged : topLayer.normal, x, y, true);
    if (treeLayer != null) dimension.setLayerValueAt(treeLayer, x, y, MAX_TREE_SPAWN_RATE);
    if (biome != null) dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, biome);
  });
};

const doCoastline = () => {
  loopCoordinates((x, y) => {
    const height = dimension.getHeightAt(x, y);
    const addedSlope = height / HEIGHEST_HEIGHT / 2 - 0.2;
    const actualSlope = dimension.getSlope(x, y);
    const slope = actualSlope + addedSlope;
    //const waterLevel = dimension.getWaterLevelAt(x, y);
    const floodedCountZero = dimension.getFloodedCount(x, y, 0, false);

    // maybe check every block???
    if (floodedCountZero > 0 && slope < MOUNTAIN_EDGE_SLOPE) {
      let hasFloodedNeighbour = false;
      let hasLandNeighbour = false;
      loopOffset(x, y, 1, 1, (x2, y2) => {
        if (x2 == x && y2 == y) return;
        if (dimension.getFloodedCount(x2, y2, 0, false) > 0) {
          hasFloodedNeighbour = true;
        } else {
          hasLandNeighbour = true;
        }
      });

      // by coast, start expanding outwards
      if (hasLandNeighbour && hasFloodedNeighbour) {
        iterateCoastLine(x, y);
      }
    }
  });
};

const iterateCoastLine = (x: number, y: number) => {
  coastLineIteration(x, y, x, y, "left", true);
  coastLineIteration(x, y, x, y, "up", true);
  coastLineIteration(x, y, x, y, "right", true);
  coastLineIteration(x, y, x, y, "down", true);
};

const coastLineIteration = (
  _x: number,
  _y: number,
  xInitial: number,
  yInitial: number,
  direction: "left" | "up" | "right" | "down",
  canDoSand: boolean
) => {
  loopOffset(_x, _y, 1, 1, (x, y) => {
    if ((_x == x && _y == y) || (_x != x && _y != y)) return; // only square neighbours
    if (direction === "left" && !(x < _x && y <= _y)) return;
    if (direction === "up" && !(x >= _x && y < _y)) return;
    if (direction === "right" && !(x > _x && y >= _y)) return;
    if (direction === "down" && !(x <= _x && y > _y)) return;

    const outsideBounds = x < xInitial - 10 || x > xInitial + 10 || y < yInitial - 10 || y > yInitial + 10;
    if (outsideBounds) return;
    const outsideSavanna = x < xInitial - 5 || x > xInitial + 5 || y < yInitial - 5 || y > yInitial + 5;

    if (dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y) != 255) {
      coastLineIteration(x, y, xInitial, yInitial, direction, canDoSand);
      return;
    }

    /*
    let hasFloodedNeighbour = false;
    let hasLandNeighbour = false;
    loopOffset(x, y, 1, 1, (x2, y2) => {
      if (x2 == x && y2 == y) return;
      if (dimension.getFloodedCount(x2, y2, 0, false) > 0) {
        hasFloodedNeighbour = true;
      } else {
        hasLandNeighbour = true;
      }
    });
    if (hasFloodedNeighbour && hasLandNeighbour) return;
    */

    const height = dimension.getHeightAt(x, y);
    const addedSlope = height / HEIGHEST_HEIGHT / 2 - 0.2;
    const actualSlope = dimension.getSlope(x, y);
    const slope = actualSlope + addedSlope;
    const waterLevel = dimension.getWaterLevelAt(x, y);
    const floodedCountZero = dimension.getFloodedCount(x, y, 0, false);

    const isCoastLine = floodedCountZero > 0 || slope < MOUNTAIN_EDGE_SLOPE;

    if (isCoastLine) {
      let layer: GroundCoverLayerType | null = null;
      let topLayer: GroundCoverLayerType | null = null;
      let treeLayer: any = null;
      let terrain: any = null;
      let biome: any = null;

      const floodedCountTen = dimension.getFloodedCount(x, y, 10, false);
      const doSand = canDoSand && slope < floodedCountTen / 1800;
      //const doDesertBiome = slope < floodedCountTen / 1400;

      const { waterloggedLayer, waterloggedTopLayer } = isWaterlogged(x, y, floodedCountZero, waterLevel, height);

      if (doSand) {
        biome = BIOMES.SAVANNA;
        layer = floodedCountZero > 0 ? layers.beachBottom : layers.beachTop;
        terrain = terrains.beachBottom;
        if (slope > 0.2 && slope < 0.4 && getRandomNumber(1, 5) == 5) {
          topLayer = layers.rocksBeach;
          layer = layers.beachStone;
        }
        if (slope > 0 && slope < 0.2 && getRandomNumber(1, 5) == 5) {
          topLayer = layers.rocksBeach;
        }
      } else if (!outsideSavanna) {
        biome = BIOMES.BEACH;
        layer = layers.lakebed;
        topLayer = floodedCountZero > 0 ? layers.plantsCoastalWaterlogged : layers.plantsCoastal;
        terrain = terrains.seabed;
      } else {
        // if nothing is placed, we stop because we want sand to be connected to water
        return;
      }

      if (layer != null) dimension.setBitLayerValueAt(waterloggedLayer ? layer.waterlogged : layer.normal, x, y, true);
      if (terrain != null) dimension.setTerrainAt(x, y, terrain);

      // optionally placing toplayer (like grass), treelayer, biomelayer
      if (topLayer != null && treeLayer == null)
        dimension.setBitLayerValueAt(waterloggedTopLayer ? topLayer.waterlogged : topLayer.normal, x, y, true);
      if (treeLayer != null) dimension.setLayerValueAt(treeLayer, x, y, MAX_TREE_SPAWN_RATE);
      if (biome != null) dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, biome);

      coastLineIteration(x, y, xInitial, yInitial, direction, doSand);
    }
  });
};

// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------

const performMagic2 = () => {
  raiseAll(0.5);

  // everything, except plants
  loopCoordinates(
    (
      x,
      y //tileNumber
    ) => {
      /*
    if (currentTile != tileNumber) {
      currentTile = tileNumber;
      currentlyDoingSand = getRandomNumber(1, 5) === 1 ? !currentlyDoingSand : currentlyDoingSand;
    }
    */

      const height = dimension.getHeightAt(x, y);
      //const slope = dimension.getSlope(x, y);
      //const slope = dimension.getSlope(x, y) + height / HEIGHEST_HEIGHT / 1.5;
      // 2000 / 2000 / 2 = 0.5
      const addedSlope = height / HEIGHEST_HEIGHT / 2 - 0.2;
      const actualSlope = dimension.getSlope(x, y);
      const slope = actualSlope + addedSlope;
      const waterLevel = dimension.getWaterLevelAt(x, y);
      const floodedCountZero = dimension.getFloodedCount(x, y, 0, false);

      let layer: GroundCoverLayerType | null = null;
      let topLayer: GroundCoverLayerType | null = null;
      let treeLayer: any = null;
      let terrain: any = null;
      let biome: any = null;

      // snow
      if (floodedCountZero == 0 && height > SNOW_HEIGHT_LIMIT) {
        let steeperNeighbours = 0;
        // 25 - (500 / 100) = 25 - 5 = 20
        // 25 - (1500 / 100) = 25 - 15 = 10
        //const steeperLimit = 25 - Math.min(height, SNOW_SAME_AFTER) / 100;
        const onePerTwoHoundredHeight = Math.round(HEIGHEST_HEIGHT / 200); // +10 at 2000
        const steeperLimit = 15 + onePerTwoHoundredHeight - Math.min(height, SNOW_SAME_AFTER) / 100;
        // (500 / 1000) = 0.5
        // (1500 / 1000) = 1.5
        //const slopeLimit = Math.min(height, SNOW_SAME_AFTER) / 1000 + 0.5;
        const slopeLimit = Math.min(height, SNOW_SAME_AFTER) / 1000 + 0.5;

        // consider making top y directions (north) not as impactful, so those with most sun is not as snowy? or something else
        const range = getRandomNumber(40, 60);
        loopOffset(x, y, range + 20, range, (x2, y2) => {
          //for (let x2 = x - range * 2; x2 <= x + range * 2; x2 = x2 + range) {
          //for (let y2 = y - range * 2; y2 <= y + range * 2; y2 = y2 + range) {
          if (x2 < startX || x2 > endX || y2 < startY || y2 > endY) return;
          if (x === x2 && y === y2) return;
          const height2 = dimension.getHeightAt(x2, y2);
          if (height2 > height) steeperNeighbours++;
        });

        const setSnow = (steeperNeighbours > steeperLimit && slope < slopeLimit) || slope - addedSlope * 3 < 0.1;
        //const setSnowBiome = floodedCountZero == 0 && height > SNOW_HEIGHT_LIMIT && steeperNeighbours > steeperLimit / 1.3 && slope < slopeLimit + 0.5;
        //const setSnowBiome = floodedCountZero == 0 && (steeperNeighbours > steeperLimit / 1.3 || slope < 1.5);
        const setSnowBiome = steeperNeighbours > steeperLimit / 1.2 || slope - addedSlope * 3 < 0.2;
        if (setSnowBiome) {
          biome = BIOMES.FROZEN_PEAKS;
          treeLayer = null;
          topLayer = null;
          /*
        if (slopeMtn < 0.2) {
          terrain = terrains.snowyGranite;
          layer = layers.snowyGraniteSlab;
        } else if (slopeMtn < 0.4) {
          terrain = terrains.darkLimestone;
          layer = layers.darkLimestoneSlab;
        } else if (slopeMtn < 0.77) {
          terrain = terrains.weatheredBasalt;
          layer = layers.weatheredBasaltSlab;
        }
        */
        }
        if (setSnow) {
          // snowy granite hvis mindre enn 3 nabosnø blokker?
          const setSnowTerrain = slope < slopeLimit - 0.5;
          if (setSnowTerrain) {
            //terrain = org.pepsoft.worldpainter.Terrain.DEEP_SNOW;
            //layer = layers.frostBuiltIn;
            layer = layers.snow;
            terrain = terrains.snowyIcyLimestone;
          } else {
            layer = layers.snow;
            terrain = terrains.snowyIcyLimestone;
          }
        }
      }

      const slopeMtn = slope; //slope + height / HEIGHEST_HEIGHT / 2;
      // mountains
      if (slopeMtn > 2.2) {
        terrain = terrains.mtn5LimestoneMix;
        layer = layers.mtn5LimestoneMix;
      } else if (slopeMtn > 2) {
        terrain = terrains.mtn7DarkLimestone2;
        layer = layers.mtn7DarkLimestone2;
      } else if (slopeMtn > 1.8) {
        terrain = terrains.mtn7DarkLimestone1;
        layer = layers.mtn7DarkLimestone1;
      } else if (slopeMtn > 1.6) {
        terrain = terrains.anorthosite;
        layer = layers.anorthosite;
      } else if (slopeMtn > 1.4) {
        terrain = terrains.mtn7DarkLimestone1;
        layer = layers.mtn7DarkLimestone1;
      } else if (slopeMtn > 1.2) {
        terrain = terrains.mtn7DarkLimestone2;
        layer = layers.mtn7DarkLimestone2;
      } else if (slopeMtn > 1) {
        terrain = terrains.mtn5LimestoneMix;
        layer = layers.mtn5LimestoneMix;
      } else if (slopeMtn > 0.85) {
        terrain = terrains.mtn6WeatheredGranite;
        layer = layers.mtn6WeatheredGranite;
      } else if (slopeMtn > 0.77) {
        terrain = terrains.mtnColorfulGranite;
        layer = layers.mtnColorfulGranite;
      } else if (slopeMtn > 0.7) {
        /*
      if ((biome = BIOMES.FROZEN_PEAKS)) {
        terrain = terrains.snowyGranite;
        layer = layers.snowyGraniteSlab;
      } else {
      */
        terrain = terrains.mtn3MossyLimestone;
        layer = layers.mtn3MossyLimestone;
        //}
      } else if (slopeMtn > 0.65) {
        /*if ((biome = BIOMES.FROZEN_PEAKS)) {
        terrain = terrains.snowyGranite;
        layer = layers.snowyGraniteSlab;
      } else {*/
        terrain = terrains.overgrownSmallLimestones;
        layer = layers.overgrownSmallLimestones;
        //}
      } else if (slopeMtn > 0.6) {
        terrain = terrains.mtn2BrownSphagnumMoss;
        layer = layers.mtn2BrownSphagnumMoss;
      } else if (slopeMtn > 0.55) {
        terrain = terrains.mtn1GreenSphagnum;
        layer = layers.mtn1GreenSphagnum;
      } else if (slopeMtn > 0.5) {
        terrain = terrains.mtn0MossySandstoneDebris;
        layer = layers.mtn0MossySandstoneDebris;
      }

      // forests & plants
      if (biome == null && floodedCountZero == 0) {
        //if (height < SNOW_HEIGHT_LIMIT) biome = BIOMES.DESERT;

        if (
          //addedSlope < 0.5 &&
          slope > 0.65 &&
          slope < 2 &&
          getRandomNumber(0, Math.round(slope * 2)) == 0
        ) {
          topLayer = slope > 0.65 && slope <= 0.77 ? layers.rocksDark : layers.rocks;
        }

        if (topLayer == null && slope < MOUNTAIN_EDGE_SLOPE) topLayer = layers.plantsPlains;

        /*
      if (slope < mountainEdgeSlope && getRandomNumber(1, 100) == 1) {
        treeLayer = customObjectLayers.bushesDeadThick;
      }
      */

        const doThickForest =
          //slope > 0.3 && slope < 0.4
          slope > 0.6 && slope < 0.7 && getRandomNumber(1, 8) == 1;

        if (doThickForest) {
          treeLayer = customObjectLayers.bushesDeadThick;

          //if (getRandomNumber(1, 2) == 1) {
          const extraLeavesX = x + (getRandomNumber(1, 2) == 1 ? -1 : 1);
          const extraLeavesY = y + (getRandomNumber(1, 2) == 1 ? -1 : 1);
          const slope2 = dimension.getSlope(extraLeavesX, extraLeavesY);

          //const height2 = dimension.getHeightAt(extraLeavesX, extraLeavesY);
          //if (height2 % 1 >= 0.5 && height2 % 1 < 0.52) {
          //if (height2 % 1 >= 0 && height2 % 1 < 0.2) {
          if (slope2 < MOUNTAIN_EDGE_SLOPE) {
            dimension.setBitLayerValueAt(layers.rowanLeaves.normal, extraLeavesX, extraLeavesY, true);
          }
          //}
          /*
        loopOffset(x, y, 1, (x2, y2) => {
          if (x2 == x || y2 == y) return;

          const height2 = dimension.getHeightAt(x2, x2);
          const slope2 = dimension.getSlope(x2, x2);
          //if (height2 % 1 >= 0.5 && height2 % 1 < 0.52) {
          //if (height2 % 1 >= 0 && height2 % 1 < 0.2) {
          if (height2 % 1 >= 0.7 && height2 % 1 < 0.9 && slope2 < mountainEdgeSlope) {
            dimension.setBitLayerValueAt(layers.rowanLeaves, x2, y2, true);
            return true;
          }
        });
        */
        } else {
          /*
        if (
          //height === Math.floor(height) &&
          //getRandomNumber(1, 3) != 3 &&
          // at flat blocks, but 0.5 because foliage is placed while map is lowered 0.5
          //(height % 1 >= 0.5 &&
          //  height % 1 < 0.52 &&
          (height % 1 >= 0.5 &&
            height % 1 < 0.52 &&
            //getRandomNumber(1, 10) == 1 &&
            // just so not constantly on every flat landscapes
            slope < mountainEdgeSlope &&
            slope != 0) ||
          // merging with thicktrees which is at slope > 0.6 && slope < 0.7
          (slope >= 0.67 && slope <= 0.71 && getRandomNumber(1, 5) === 1) ||
          (slope >= 0.59 && slope <= 0.63 && getRandomNumber(1, 5) === 1)
        ) {
          topLayer = layers.rowanLeaves;
        }
        */
          /*
        if (
          //height === Math.floor(height) &&
          //getRandomNumber(1, 3) != 3 &&
          // at flat blocks, but 0.5 because foliage is placed while map is lowered 0.5
          //(height % 1 >= 0.5 &&
          //  height % 1 < 0.52 &&
          height % 1 >= 0.3 &&
          height % 1 < 0.5 &&
          //getRandomNumber(1, 10) == 1 &&
          // just so not constantly on every flat landscapes
          slope < mountainEdgeSlope &&
          slope > 0.1
        ) {
          topLayer = layers.rowanLeaves;
        }
        */
        }

        /*
      let tryToPlaceTree = false;

      if (height < 110) {
        if (slope < 0.55) tryToPlaceTree = true;
      }
      if (height < 160) {
        if (slope < 0.52) tryToPlaceTree = true;
      }
      if (height < 220) {
        if (slope < 0.49) tryToPlaceTree = true;
      }
      if (height < 300) {
        if (slope < 0.46) tryToPlaceTree = true;
      }
      if (height < 400) {
        if (slope < 0.43) tryToPlaceTree = true;
      }
      if (height < 500) {
        if (slope < 0.4) tryToPlaceTree = true;
      }
      if (height < 600) {
        if (slope < 0.37) tryToPlaceTree = true;
      }
      if (height < 700) {
        if (slope < 0.34) tryToPlaceTree = true;
      }
      if (height < 800) {
        if (slope < 0.31) tryToPlaceTree = true;
      }
      if (height < 900) {
        if (slope < 0.28) tryToPlaceTree = true;
      }
      */
        const tryToPlaceTree = true;

        if (treeLayer == null && tryToPlaceTree) {
          let steeperNeighbours = 0;
          let sameAsNeighBours = 0;

          // desert + olive trees
          let randomDistance = getRandomNumber(30, 70); // 40,60 (20.06.2025)
          // consider making top y directions (north) not as impactful, so those with most sun is not as snowy? or something else
          //for (let x2 = x - randomDistance; x2 <= x + randomDistance; x2 = x2 + randomDistance) {
          //for (let y2 = y - randomDistance; y2 <= y + randomDistance; y2 = y2 + randomDistance) {
          loopOffset(x, y, randomDistance, randomDistance, (x2, y2) => {
            if (x === x2 && y === y2) return;
            const height2 = dimension.getHeightAt(x2, y2);
            if (height2 - 10 > height) steeperNeighbours++;
            if (height2 < height + 10 && height2 > height - 10) sameAsNeighBours++;
          });
          //}
          //}

          // was (sameAsNeighBours > 7 && slope < 0.1) 0.1 21.06.2025
          if (sameAsNeighBours > 6 && slope < 0.4) {
            //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, customBiomes["custom:desert"].getId());
            //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, BIOMES.DESERT);
            biome = BIOMES.DESERT;
            topLayer = layers.plantsDesert;
          }

          if (sameAsNeighBours > 7 && slope < 0.2) {
            //if (getRandomNumber(1, 2) != 1) continue;
            //dimension.clearLayerData(x, y, null);
            //print("heightDiff=" + (dimension.getHeightAt(x, y) - height));
            let steeperNeighbours2 = 0;
            loopOffset(x, y, randomDistance * 2, randomDistance * 2, (x2, y2) => {
              //for (let x2 = x - randomDistance * 2; x2 <= x + randomDistance * 2; x2 = x2 + randomDistance * 2) {
              //for (let y2 = y - randomDistance * 2; y2 <= y + randomDistance * 2; y2 = y2 + randomDistance * 2) {
              if (x === x2 && y === y2) return;
              const height2 = dimension.getHeightAt(x2, y2);
              if (height2 - 10 > height) steeperNeighbours2++;
            });
            //}
            //}

            /*
            if (steeperNeighbours2 >= 0 && steeperNeighbours2 < 4) {
            dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, customBiomes["custom:desert"].getId());
            //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, 1);
            //dimension.setBitLayerValueAt(layerForestFloor, x, y, 1);
            //dimension.setLayerValueAt(customBiomes["custom:desert"], x, y, MAX_TREE_SPAWN_RATE);
            }
            */

            if (steeperNeighbours2 == 2) {
              // > 2
              if (getRandomNumber(1, 8) == 1) {
                let oliveBlocked = false;
                //for (let x2 = x - 3; x2 <= x + 3; x2++) {
                //for (let y2 = y - 3; y2 <= y + 3; y2++) {
                loopOffset(x, y, 3, 1, (x2, y2) => {
                  if (oliveBlocked) return;
                  if (dimension.getLayerValueAt(customObjectLayers.oliveTrees, x2, y2)) {
                    oliveBlocked = true;
                  }
                });
                if (!oliveBlocked) treeLayer = customObjectLayers.oliveTrees;
                //doOliveTree = true;
                //doThickForest = false;
              }
              if (treeLayer == null && steeperNeighbours2 > 0 && steeperNeighbours2 < 3) {
                if (getRandomNumber(1, 4) == 1) {
                  topLayer = layers.rocks;
                  //dimension.setBitLayerValueAt(layerR, x, y, 1);
                  //continue;
                }
              }
            }
          }

          // taiga + rowan bushes
          //if (!doOliveTree) {
          if (treeLayer == null && biome == null && steeperNeighbours > 3 && slope < 0.4) {
            biome = BIOMES.BIOME_OLD_GROWTH_PINE_TAIGA;
            topLayer = layers.plantsTaiga;
            //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, biomes.taiga);
            //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, customBiomes["custom:beach"].getId());
            //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y, 2);
            //dimension.setLayerValueAt(customBiomes["custom:beach"], x, y, MAX_TREE_SPAWN_RATE);
            if (steeperNeighbours > 4) {
              const randomNumber = getRandomNumber(1, 16);

              if (randomNumber == 1) {
                treeLayer = customObjectLayers.bushesRowan;
              } else if (randomNumber < 3) {
                topLayer = layers.rocks;
              }
            }
          }
          //}

          // random dead bush
          if (treeLayer == null && slope < MOUNTAIN_EDGE_SLOPE && getRandomNumber(1, 400) === 1) {
            treeLayer = customObjectLayers.bushesDead;
          }
        }
      }

      // water

      let nearBeach = false;
      if (floodedCountZero == 0) {
        loopOffset(x, y, 10, 10, (x2, y2) => {
          if ((x2 == x && y2 == y) || (x != x2 && y != y2)) return;
          const floodedCountZero2 = dimension.getFloodedCount(x2, y2, 0, false);
          if (floodedCountZero2 > 0) {
            nearBeach = true;
            return true;
          }
        });
      }

      if (slope < MOUNTAIN_EDGE_SLOPE && (nearBeach || floodedCountZero > 0)) {
        let hasFloodedNeighbour = false;
        let hasLandNeighbour = false;
        loopOffset(x, y, 1, 1, (x2, y2) => {
          if (x2 == x && y2 == y) return;
          if (dimension.getFloodedCount(x2, y2, 0, false) > 0) {
            hasFloodedNeighbour = true;
          } else {
            hasLandNeighbour = true;
          }
        });
        /*
      loopOffset(x, y, 1, (x2, y2) => {
        if (x2 == x && y2 == y) return;
        if (dimension.getFloodedCount(x2, y2, 0, false) > 0) {
          hasFloodedNeighbour = true;
        } else {
          hasLandNeighbour = true;
        }
      });
      */

        //const sand = slope < 0.2;

        /*
      let countSandSlope = 0;
      loopOffset(x, y, 10, (x2, y2) => {
        if (dimension.getSlope(x2, y2) < 0.4) {
          countSandSlope++;
        }
      });
      */

        /*
      let doSand = true;
      loopOffset(x, y, dimension.getFloodedCount(x, y, 10, false), (x2, y2) => {
        if (dimension.getSlope(x2, y2) > 0.4) {
          doSand = false;
          return true;
        }
      });
      */
        const floodedCountTen = dimension.getFloodedCount(x, y, 10, false);
        const doSand = slope < floodedCountTen / 1800;
        const doDesertBiome = slope < floodedCountTen / 1400;
        if (doDesertBiome) biome = BIOMES.SAVANNA;

        //      if (currentlyDoingSand) {
        if (doSand) {
          if (floodedCountZero > 0) {
            topLayer = null;
            treeLayer = null;
            layer = layers.beachBottom;
            terrain = terrains.beachBottom;

            if (waterLevel - height > 0 && waterLevel - height <= 1.44) {
              //topLayer = layers.plantsCoastal;
              if (slope > 0 && slope < 0.2 && getRandomNumber(1, 10) == 10) {
                topLayer = layers.rocksBeach;
              }
            } else {
              // funker ikke
              topLayer = layers.rocksBeach;
              //if (getRandomNumber(1, 3) == 1)
              //topLayer = layers.plantsCoastalWaterlogged;
              //terrain = terrains.seabed;
            }
          } /*else if (hasFloodedNeighbour && hasLandNeighbour) {
          topLayer = null;
          treeLayer = null;
          layer = layers.beachTop;
          if (
            //slope > 0 && slope < 0.2 &&
            getRandomNumber(1, 5) == 5
          ) {
            topLayer = layers.rocksBeach;
          }
          //topLayer = layers.plantsCoastal;
        }*/ //if (floodedCountTen > 0)
          else {
            topLayer = null;
            treeLayer = null;
            layer = layers.beachTop;
            if (slope > 0.1 && slope < 0.4) {
              layer = layers.beachStone;
            }
            if (slope > 0 && slope < 0.2 && getRandomNumber(1, 5) == 5) {
              topLayer = layers.rocksBeach;
            }
          }
        } else {
          if (floodedCountZero > 0) {
            layer = layers.lakebed;
            // 1.445 er for mye
            // 1.43 ser vel ut til å funke
            // down in the water, up to water's edge
            if (waterLevel - height > 0 && waterLevel - height <= 1.44) {
              topLayer = layers.plantsCoastal;
            } else {
              //if (getRandomNumber(1, 3) == 1)
              topLayer = layers.plantsCoastalWaterlogged;
              terrain = terrains.seabed;
            }
          } else if (hasFloodedNeighbour && hasLandNeighbour) {
            layer = layers.lakebedBeach;
            topLayer = layers.plantsCoastal;
          }
        }
      }

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
      //if (hasFloodedNeighbour && hasLandNeighbour) waterlogged = false;

      /*
    // preparing to add layers to those blocks
    if (hasFloodedNeighbour && hasLandNeighbour) {
      //layer = layers.lakebedBeach;
      //topLayer = layers.coastalPlants;
      for (let x2 = x - getRandomNumber(1, 6); x2 <= x + getRandomNumber(1, 6); x2++) {
        for (let y2 = y - getRandomNumber(1, 6); y2 <= y + getRandomNumber(1, 6); y2++) {
          const floodedCount2 = dimension.getFloodedCount(x2, y2, 0, false);
          const slope2 = dimension.getSlope(x2, y2);
          if (slope2 >= 0.77) {
            if (floodedCount2 == 0 && slope2 <= 2 && getRandomNumber(1, 50) === 1) {
              //dimension.setBitLayerValueAt(layerR, x2, y2, 1);
              layer = layers.rocks;
            }
            continue;
          }
          const height2 = dimension.getHeightAt(x2, y2);

          if (floodedCount2 === 0) {
            // above waters edge
            //dimension.setBitLayerValueAt(layerLakebedBeach, x2, y2, 1);
            layer = layers.lakebedBeach;

            if (getRandomNumber(0, 3) > 0) {
              //dimension.setBitLayerValueAt(layerCP, x2, y2, 1);
              topLayer = layers.coastalPlants;
            }
          } else {
            const waterLevel2 = dimension.getWaterLevelAt(x2, y2);

            // 1.445 er for mye
            // 1.43 ser vel ut til å funke
            // down in the water, up to water's edge
            if (waterLevel2 - height2 > 0 && waterLevel2 - height2 <= 1.44) {
              if (getRandomNumber(0, 1) === 1) {
                //dimension.setBitLayerValueAt(layerCP, x2, y2, 1);
                topLayer = layers.coastalPlants;
              }
            } else {
              topLayer = layers.coastalPlantsWaterlogged;
              if (getRandomNumber(0, 1) === 1) {
                //dimension.setBitLayerValueAt(layerCPW, x2, y2, 1);
                //topLayer = layers.coastalPlantsWaterlogged;
              }
            }
          }
        }
      }
    }
    */

      //if (x == 223 && y == 236) log(topLayer);

      if (terrain == null) terrain = terrains.ground;
      if (layer == null) {
        if (biome == BIOMES.DESERT) layer = layers.groundDesert;
        else if (biome == BIOMES.BIOME_OLD_GROWTH_PINE_TAIGA) layer = layers.groundTaiga;
        //if (biome === BIOMES.TAIGA) layer = layers.groundTaiga;
        //if (biome === BIOMES.DEEP_FROZEN_OCEAN) layer = layers.groundTaiga;
        else layer = layers.ground;
      }

      //log(layer, terrain, topLayer, treeLayer, biome);

      // always placing terrain and layer
      dimension.setBitLayerValueAt(waterloggedLayer ? layer.waterlogged : layer.normal, x, y, true);
      dimension.setTerrainAt(x, y, terrain);

      // optionally placing toplayer (like grass), treelayer, biomelayer
      if (topLayer != null && treeLayer == null)
        dimension.setBitLayerValueAt(waterloggedTopLayer ? topLayer.waterlogged : topLayer.normal, x, y, true);
      if (treeLayer != null) dimension.setLayerValueAt(treeLayer, x, y, MAX_TREE_SPAWN_RATE);
      if (biome != null) dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, biome);
    }
  );

  /*
  // everything, except plants
  loopCoordinates((x, y) => {
    const waterLevel = dimension.getWaterLevelAt(x, y);
    const height = dimension.getHeightAt(x, y);
    const floodedCountZero = dimension.getFloodedCount(x, y, 0, false);
    const slope = dimension.getSlope(x, y);

    if (floodedCountZero == 0) {
      if (slope < mountainEdgeSlope && getRandomNumber(1, 100) == 1) {
        dimension.setLayerValueAt(customObjectLayers.bushesDeadThick, x, y, MAX_TREE_SPAWN_RATE);

        loopOffset(x, y, 1, (x2, y2) => {
          // only checking cross pattern
          if (x2 != x && y2 !== y) return;
          //dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x2, y2, 1);
        });
      }

      //dimension.setBitLayerValueAt(layers.ground, x, y, true);
      //dimension.setTerrainAt(x, y, terrains.ground);
      dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, BIOMES.DESERT);
    }

    const setSnow = false;
    const setSnowTerrain = false;
    if (setSnow) {
      if (setSnowTerrain) {
        dimension.setTerrainAt(x, y, org.pepsoft.worldpainter.Terrain.DEEP_SNOW);
        dimension.setBitLayerValueAt(layers.frostBuiltIn, x, y, true);
      } else {
        dimension.setBitLayerValueAt(layers.snow, x, y, true);
      }
    }

    let terrain = terrains.ground;
    let layer = layers.ground;
    if (slope > 1.2) {
      terrain = terrains.mtn5LimestoneMix;
      layer = layers.mtn5LimestoneMix;
    }
    if (slope > 1.2) {
      terrain = terrains.mtn5LimestoneMix;
      layer = layers.mtn5LimestoneMix;
    } else if (slope > 2) {
      terrain = terrains.mtn7DarkLimestone2;
      layer = layers.mtn7DarkLimestone2;
    } else if (slope > 1.8) {
      terrain = terrains.mtn7DarkLimestone1;
      layer = layers.mtn7DarkLimestone1;
    } else if (slope > 1.6) {
      terrain = terrains.anorthosite;
      layer = layers.anorthosite;
    } else if (slope > 1.4) {
      terrain = terrains.mtn7DarkLimestone1;
      layer = layers.mtn7DarkLimestone1;
    } else if (slope > 1.2) {
      terrain = terrains.mtn7DarkLimestone2;
      layer = layers.mtn7DarkLimestone2;
    } else if (slope > 1) {
      terrain = terrains.mtn5LimestoneMix;
      layer = layers.mtn5LimestoneMix;
    } else if (slope > 0.85) {
      terrain = terrains.mtn6WeatheredGranite;
      layer = layers.mtn6WeatheredGranite;
    } else if (slope > 0.77) {
      terrain = terrains.mtnColorfulGranite;
      layer = layers.mtnColorfulGranite;
    } else if (slope > 0.7) {
      terrain = terrains.mtn3MossyLimestone;
      layer = layers.mtn3MossyLimestone;
    } else if (slope > 0.65) {
      terrain = terrains.overgrownSmallLimestones;
      layer = layers.overgrownSmallLimestones;
    } else if (slope > 0.6) {
      terrain = terrains.mtn2BrownSphagnumMoss;
      layer = layers.mtn2BrownSphagnumMoss;
    } else if (slope > 0.55) {
      terrain = terrains.mtn1GreenSphagnum;
      layer = layers.mtn1GreenSphagnum;
    } else if (slope > 0.5) {
      terrain = terrains.mtn0MossySandstoneDebris;
      layer = layers.mtn0MossySandstoneDebris;
    }

    dimension.setBitLayerValueAt(layer, x, y, true);
    dimension.setTerrainAt(x, y, terrain);

    dimension.setBitLayerValueAt(layers.plantsPlains, x, y, true);
  });
  */

  // plants, after all tree placements have been done
  /*
  loopCoordinates((x, y) => {
    const waterLevel = dimension.getWaterLevelAt(x, y);
    const height = dimension.getHeightAt(x, y);
    const floodedCountZero = dimension.getFloodedCount(x, y, 0, false);
    const slope = dimension.getSlope(x, y);

    if (slope > mountainEdgeSlope) return;

    let placePlants = true;

    const treeBlocked = dimension.getLayerValueAt(org.pepsoft.worldpainter.layers.Annotations.INSTANCE, x, y) > 0;

    if (floodedCountZero > 0 || treeBlocked) return;

    dimension.setBitLayerValueAt(layers.plantsPlains, x, y, true);
  });
  */

  raiseAll(-0.5);
};

/*
const filter2 = wp.createFilter().onlyOnWater().go();
wp.applyTerrain(0).toWorld(world).withFilter(filter2).applyToSurface().go();
wp.applyLayer(layers.lakebed).toWorld(world).withFilter(filter2).applyToSurface().go();
wp.applyLayer(layers.plantsDesert).toWorld(world).withFilter(filter2).applyToSurface().go();
loopCoordinates((x, y) => {
  //dimension.setBitLayerValueAt(layers.lakebed, x, y, true);
  dimension.setBitLayerValueAt(layers.plantsCoastalWaterlogged, x, y, true);
  dimension.setTerrainAt(x, y, terrains.ground);
});
*/
// comment both below if wanna only export already fixed map
performMagic();
/*
loopCoordinates((x, y, tileNumber) => {
  dimension.setBitLayerValueAt(layers.ground.normal, x, y, true);
});
*/
saveWorld();

//log("layers=" + dimension.getLayersAt(215, 270));
// comment if wanna manually export from wp:
exportWorld();

function isWaterlogged(x: number, y: number, floodedCountZero: number, waterLevel: number, height: number) {
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

log("----------------------------------------");
log("Magic complete!!!");
