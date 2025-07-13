// cd projects/world-magic npm run magic
// wpscript compiled/index.js
const dateStart = new Date();
import log from "./log";
import world, { exportWorld, saveWorld } from "./world";
import dimension from "./dimension";
import { endX, endY, loopCoordinates, loopOffset, mapHeight, mapWidth, startX, startY } from "./mapDimensions";
import { getRandomNumber, isWaterlogged, raiseAll, spaceForTree } from "./utils";
import { BIOMES, MAX_TREE_SPAWN_RATE } from "./constants";
import { customObjectLayers, layers, terrains } from "./palettes/currentPalette";

import { GroundCoverLayerType } from "./palettes/generator";

const HEIGHEST_HEIGHT = dimension.getHighestIntHeight();
//const SNOW_HEIGHT_LIMIT = Math.floor(HEIGHEST_HEIGHT / 4);
//const SNOW_SAME_AFTER = SNOW_HEIGHT_LIMIT * 3; //1400;
const MOUNTAIN_EDGE_SLOPE = 0.77;

type Block = { layer: GroundCoverLayerType | null; topLayer: GroundCoverLayerType | null; treeLayer: any; terrain: any; biome: any };
type Environment = { x: number; y: number; floodedCountZero: number; height: number; slope: number; addedSlope: number };

const willExportWorld = true;
const willPerformMagic = true;

const willDoCoastline = true;
const willDoSnow = true;
const willDoMountains = true;
const willDoSurfaceFoliage = true;
const willShiftHeight = true;

const performMagic = () => {
  if (willShiftHeight) raiseAll(0.5);

  if (willDoCoastline) doCoastline();
  doRest();

  if (willDoCoastline) dimension.clearLayerData(org.pepsoft.worldpainter.layers.Annotations.INSTANCE);

  if (willShiftHeight) raiseAll(-0.5);
};

let currentlyDoingSand = false;
let currentTile = 0;

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
  }, "coastline");
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

    const block: Block = { layer: null, topLayer: null, treeLayer: null, terrain: null, biome: null };
    const enviroment: Environment = { addedSlope, floodedCountZero, height, slope, x, y };

    if (willDoSnow) doSnow(block, enviroment);
    if (willDoMountains) doMountains(block, enviroment);
    if (willDoSurfaceFoliage) doSurfaceFoliage(block, enviroment);

    const { waterloggedLayer, waterloggedTopLayer } = isWaterlogged(floodedCountZero, waterLevel, height);

    // some leftover lakebed layers and foliage that was not covered from coastline operation
    if (floodedCountZero > 0) {
      if (block.terrain == null) block.terrain = terrains.seabed;
      if (block.layer == null) block.layer = slope > 0.2 ? layers.beachStone : layers.lakebed;
      if (block.topLayer == null) {
        if (getRandomNumber(0, 5) == 0) block.topLayer = layers.rocksDark;
        if (slope > 0.2) block.topLayer = layers.plantsCoastalWaterlogged;
      }
    }

    // setting the actual terrains + layers of the chosen biome
    if (block.terrain == null) block.terrain = terrains.ground;
    if (block.layer == null) {
      if (block.biome == BIOMES.DESERT) block.layer = layers.groundDesert;
      else if (block.biome == BIOMES.BIOME_OLD_GROWTH_PINE_TAIGA) block.layer = layers.groundTaiga;
      else if (block.biome == BIOMES.GROVE) block.layer = layers.groundGrove;
      //if (biome === BIOMES.TAIGA) layer = layers.groundTaiga;
      //if (biome === BIOMES.DEEP_FROZEN_OCEAN) layer = layers.groundTaiga;
      else block.layer = layers.groundPlains;
    }

    // always placing terrain and layer
    dimension.setBitLayerValueAt(waterloggedLayer ? block.layer.waterlogged : block.layer.normal, x, y, true);
    dimension.setTerrainAt(x, y, block.terrain);

    // optionally placing toplayer (like grass), treelayer, biomelayer
    if (block.topLayer != null && block.treeLayer == null)
      dimension.setBitLayerValueAt(waterloggedTopLayer ? block.topLayer.waterlogged : block.topLayer.normal, x, y, true);
    if (block.treeLayer != null) dimension.setLayerValueAt(block.treeLayer, x, y, MAX_TREE_SPAWN_RATE);
    if (block.biome != null) dimension.setLayerValueAt(org.pepsoft.worldpainter.layers.Biome.INSTANCE, x, y, block.biome);
  }, "the rest");
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

    // if already checked, go to next iteration
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

      const { waterloggedLayer, waterloggedTopLayer } = isWaterlogged(floodedCountZero, waterLevel, height);

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

const doSnow = (block: Block, { x, y, addedSlope, floodedCountZero, height, slope }: Environment) => {
  const SNOW_HEIGHT_LIMIT = Math.floor(HEIGHEST_HEIGHT / 3.5) + 20;
  const SNOW_SAME_AFTER = SNOW_HEIGHT_LIMIT * 2.5; //1400;

  //log(HEIGHEST_HEIGHT);

  if (floodedCountZero > 0 || height < SNOW_HEIGHT_LIMIT) return;

  let steeperNeighbours = 0;
  // 25 - (500 / 100) = 25 - 5 = 20
  // 25 - (1500 / 100) = 25 - 15 = 10
  //const steeperLimit = 25 - Math.min(height, SNOW_SAME_AFTER) / 100;
  //const onePerTwoHoundredHeight = Math.round(HEIGHEST_HEIGHT / 200); // +10 at 2000
  //const steeperLimit = 15 + onePerTwoHoundredHeight - Math.min(height, SNOW_SAME_AFTER) / 100;
  const onePerHoundredHeight = Math.round(HEIGHEST_HEIGHT / 100); // +10 at 2000
  //const steeperLimit = 5 + onePerHoundredHeight - Math.min(height, SNOW_SAME_AFTER) / 100;
  // (2000 / 500 = 4) * 5 = 20
  // (2000 / 1500 = 1.33) * 5 = 6.67
  const steeperLimit = (HEIGHEST_HEIGHT / Math.min(height, SNOW_SAME_AFTER)) * 5;
  // (500 / 1000) = 0.5
  // (1500 / 1000) = 1.5
  //const slopeLimit = Math.min(height, SNOW_SAME_AFTER) / 1000;
  const slopeLimit2 = Math.min(height, SNOW_SAME_AFTER) / (50 * onePerHoundredHeight);
  // (500 / 2000 = 0.25) * 2 = 0.5
  // (1500 / 2000 = 0.75) * 2 = 1.5
  const slopeLimit = (Math.min(height, SNOW_SAME_AFTER) / HEIGHEST_HEIGHT) * 2;

  // consider making top y directions (north) not as impactful, so those with most sun is not as snowy? or something else
  const range = getRandomNumber(15, 20); // 40, 60
  loopOffset(x, y, range * 2, range, (x2, y2) => {
    //for (let x2 = x - range * 2; x2 <= x + range * 2; x2 = x2 + range) {
    //for (let y2 = y - range * 2; y2 <= y + range * 2; y2 = y2 + range) {
    //if (x2 < startX || x2 > endX || y2 < startY || y2 > endY) return;
    if (x === x2 && y === y2) return;
    const height2 = dimension.getHeightAt(x2, y2);
    if (height2 > height) steeperNeighbours++;
  });
  // if (steeperNeighbours > steeperLimit) log(steeperLimit, steeperNeighbours);
  //const setSnow = steeperNeighbours < steeperLimit / 3 && slope < slopeLimit; //|| slope - addedSlope * 3 < 0.1;
  const setSnow = (steeperNeighbours > steeperLimit || steeperNeighbours < steeperLimit / 3) && slope < slopeLimit; //|| slope - addedSlope * 3 < 0.1;
  //const setSnowBiome = floodedCountZero == 0 && height > SNOW_HEIGHT_LIMIT && steeperNeighbours > steeperLimit / 1.3 && slope < slopeLimit + 0.5;
  //const setSnowBiome = floodedCountZero == 0 && (steeperNeighbours > steeperLimit / 1.3 || slope < 1.5);
  const setSnowBiome = setSnow; //steeperNeighbours > steeperLimit / 1.2 || slope - addedSlope * 3 < 0.2;
  if (setSnowBiome) {
    block.biome = BIOMES.FROZEN_PEAKS;
    block.treeLayer = null;
    block.topLayer = null;
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
      block.layer = layers.snow;
      block.terrain = terrains.snowyIcyLimestone;
    } else {
      block.layer = layers.snow;
      block.terrain = terrains.snowyIcyLimestone;
    }
  }
};

const doMountains = (block: Block, { x, y, addedSlope, floodedCountZero, height, slope }: Environment) => {
  const slopeMtn = slope; //slope + height / HEIGHEST_HEIGHT / 2;
  if (slopeMtn <= 0.5) return;
  if ((block.layer != null || block.terrain != null) && (block.biome != BIOMES.BEACH || block.biome != BIOMES.SAVANNA)) return;

  if (slopeMtn > 2.2) {
    block.terrain = terrains.mtn5LimestoneMix;
    block.layer = layers.mtn5LimestoneMix;
  } else if (slopeMtn > 2) {
    block.terrain = terrains.mtn7DarkLimestone2;
    block.layer = layers.mtn7DarkLimestone2;
  } else if (slopeMtn > 1.8) {
    block.terrain = terrains.mtn7DarkLimestone1;
    block.layer = layers.mtn7DarkLimestone1;
  } else if (slopeMtn > 1.6) {
    block.terrain = terrains.anorthosite;
    block.layer = layers.anorthosite;
  } else if (slopeMtn > 1.4) {
    block.terrain = terrains.mtn7DarkLimestone1;
    block.layer = layers.mtn7DarkLimestone1;
  } else if (slopeMtn > 1.2) {
    block.terrain = terrains.mtn7DarkLimestone2;
    block.layer = layers.mtn7DarkLimestone2;
  } else if (slopeMtn > 1) {
    block.terrain = terrains.mtn5LimestoneMix;
    block.layer = layers.mtn5LimestoneMix;
  } else if (slopeMtn > 0.85) {
    block.terrain = terrains.mtn6WeatheredGranite;
    block.layer = layers.mtn6WeatheredGranite;
  } else if (slopeMtn > 0.77) {
    block.terrain = terrains.mtnColorfulGranite;
    block.layer = layers.mtnColorfulGranite;
  } else if (slopeMtn > 0.7) {
    /*
      if ((biome = BIOMES.FROZEN_PEAKS)) {
        terrain = terrains.snowyGranite;
        layer = layers.snowyGraniteSlab;
      } else {
      */
    block.terrain = terrains.mtn3MossyLimestone;
    block.layer = layers.mtn3MossyLimestone;
    //}
  } else if (slopeMtn > 0.65) {
    /*if ((biome = BIOMES.FROZEN_PEAKS)) {
        terrain = terrains.snowyGranite;
        layer = layers.snowyGraniteSlab;
      } else {*/
    block.terrain = terrains.overgrownSmallLimestones;
    block.layer = layers.overgrownSmallLimestones;
    //}
  } else if (slopeMtn > 0.6) {
    block.terrain = terrains.mtn2BrownSphagnumMoss;
    block.layer = layers.mtn2BrownSphagnumMoss;
  } else if (slopeMtn > 0.55) {
    block.terrain = terrains.mtn1GreenSphagnum;
    block.layer = layers.mtn1GreenSphagnum;
  } else if (slopeMtn > 0.5) {
    block.terrain = terrains.mtn0MossySandstoneDebris;
    block.layer = layers.mtn0MossySandstoneDebris;
  }
};

const doSurfaceFoliage = (block: Block, { x, y, addedSlope, floodedCountZero, height, slope }: Environment) => {
  //if (block.biome == null && floodedCountZero == 0) {}
  if (block.biome != null || floodedCountZero > 0 || slope > MOUNTAIN_EDGE_SLOPE) return;

  //if (height < SNOW_HEIGHT_LIMIT) biome = BIOMES.DESERT;

  if (
    //addedSlope < 0.5 &&
    slope > 0.65 &&
    slope < 2 &&
    getRandomNumber(0, Math.round(slope * 2)) == 0
  ) {
    block.topLayer = slope > 0.65 && slope <= 0.77 ? layers.rocksDark : layers.rocks;
  }

  if (block.topLayer == null && slope < MOUNTAIN_EDGE_SLOPE) block.topLayer = layers.plantsPlains;

  /*
      if (slope < mountainEdgeSlope && getRandomNumber(1, 100) == 1) {
        treeLayer = customObjectLayers.bushesDeadThick;
      }
      */

  const doThickForest =
    //slope > 0.3 && slope < 0.4
    slope > 0.6 && slope < 0.7 && getRandomNumber(1, 8) == 1;

  if (doThickForest) {
    block.treeLayer = customObjectLayers.bushesDeadThick;

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

  if (block.treeLayer == null && tryToPlaceTree) {
    let steeperNeighbours = 0;
    let sameAsNeighBours = 0;

    // desert + olive trees
    let randomDistance = getRandomNumber(30, 70); // 40,60 (20.06.2025)
    loopOffset(x, y, randomDistance, randomDistance, (x2, y2) => {
      if (x === x2 && y === y2) return;
      const height2 = dimension.getHeightAt(x2, y2);
      if (height2 - 10 > height) steeperNeighbours++;
      if (height2 < height + 10 && height2 > height - 10) sameAsNeighBours++;
    });

    // desert + goatWillowBushes
    if (sameAsNeighBours > 6 && slope < 0.4) {
      // was (sameAsNeighBours > 7 && slope < 0.1) 0.1 21.06.2025
      block.biome = BIOMES.DESERT;
      block.topLayer = layers.plantsDesert;

      if (getRandomNumber(1, 32) == 1 && slope > 0.2) {
        block.treeLayer = customObjectLayers.goatWillowBushes;
      }
    }

    // larch trees, and some rocks
    if (sameAsNeighBours >= 6 && sameAsNeighBours <= 7 && slope < 0.1) {
      if (getRandomNumber(1, 32) == 1) {
        let steeperNeighbours2 = 0;
        loopOffset(x, y, randomDistance * 4, randomDistance * 4, (x2, y2) => {
          if (x === x2 && y === y2) return;
          const height2 = dimension.getHeightAt(x2, y2);
          if (height2 - 10 > height) steeperNeighbours2++;
        });

        if (steeperNeighbours2 == 2) {
          if (spaceForTree(x, y)) {
            block.treeLayer = customObjectLayers.larchTrees;
          }
        } else if (steeperNeighbours2 > 0 && steeperNeighbours2 < 3) {
          if (getRandomNumber(1, 4) == 1) {
            block.topLayer = layers.rocks;
          }
        }
      }
    }

    // olive trees, and some rocks
    if (sameAsNeighBours > 7 && slope < 0.2) {
      let steeperNeighbours2 = 0;
      loopOffset(x, y, randomDistance * 2, randomDistance * 2, (x2, y2) => {
        if (x === x2 && y === y2) return;
        const height2 = dimension.getHeightAt(x2, y2);
        if (height2 - 10 > height) steeperNeighbours2++;
      });
      // > 2
      if (steeperNeighbours2 == 2) {
        // 8
        if (getRandomNumber(1, 24) == 1) {
          if (spaceForTree(x, y)) {
            block.treeLayer = customObjectLayers.oliveTrees;
          }
        }
        if (block.treeLayer == null && steeperNeighbours2 > 0 && steeperNeighbours2 < 3) {
          if (getRandomNumber(1, 4) == 1) {
            block.topLayer = layers.rocks;
          }
        }
      }
    }

    // taiga + rowan bushes, and some rocks
    if (block.treeLayer == null && block.biome == null && steeperNeighbours > 3) {
      //  && slope < 0.5
      block.biome = BIOMES.BIOME_OLD_GROWTH_PINE_TAIGA;
      block.topLayer = layers.plantsTaiga;
      if (steeperNeighbours > 4 && slope < 0.5) {
        const randomNumber = getRandomNumber(1, 24); // 16

        if (randomNumber == 1) {
          block.treeLayer = customObjectLayers.bushesRowan;
        } else if (randomNumber < 3) {
          block.topLayer = layers.rocks;
        }
      }
    }

    if (block.treeLayer == null && block.biome == null && steeperNeighbours == 2) {
      block.biome = BIOMES.GROVE;
      block.topLayer = layers.plantsGrove;
      if (slope > 0.1 && slope < 0.4) {
        let steeperNeighbours2 = 0;
        loopOffset(x, y, randomDistance * 4, randomDistance * 4, (x2, y2) => {
          if (x === x2 && y === y2) return;
          const height2 = dimension.getHeightAt(x2, y2);
          if (height2 - 10 > height) steeperNeighbours2++;
        });
        if (steeperNeighbours2 > 3) {
          if (getRandomNumber(1, 16) == 1) {
            if (spaceForTree(x, y)) {
              block.treeLayer = customObjectLayers.spruceTrees;
            }
          } else if (getRandomNumber(1, 16) == 1 && slope > 0.2 && slope < 0.3) {
            block.treeLayer = customObjectLayers.beechBushes;
          }
        }
      }
    }

    // random dead bush
    if (block.treeLayer == null && slope < MOUNTAIN_EDGE_SLOPE && getRandomNumber(1, 1000) === 1) {
      block.treeLayer = customObjectLayers.bushesDead;
    }
  }
};

// comment both below if wanna only export already fixed map
if (willPerformMagic) performMagic();

saveWorld();

//log("layers=" + dimension.getLayersAt(215, 270));
if (willExportWorld) exportWorld();

const dateEnd = new Date();
log("----------------------------------------");
log("magic complete!!! All in all took " + Math.round((dateEnd.getTime() - dateStart.getTime()) / 1000) + " seconds");
