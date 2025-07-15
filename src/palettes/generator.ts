import { JAVA_COLORS } from "../constants";
import { Layer } from "../types/Dimension";
import { getRandomNumber } from "../utils";
import world from "../world";

type MaterialParams = {
  /**
   * i.e. conquest:grass_block_layer
   */
  identifier: string;
  /**
   * 1-1000
   */
  count?: number;
  /**
   * % for blobs. only if options: scale has value
   */
  scale?: number;
  /**
   * starts at 0
   */
  random?: number;
  /**
   * starts at sometimes 0, sometimes 1
   */
  height?: number;
};

const biome = -1;
let colour = 1;
let colour2 = 0;

type GroundCoverLayerProps = {
  name: string;
  materials: MaterialParams[];
  /**
   * default true, disable i.e. for bushes without layers
   */
  layered?: boolean;
  /**
   * default 1
   */
  thickness?: number;
  /**
   * % for blobs. enables scale option in the materials
   */
  scale?: number;
  persistent?: boolean;
  waterlogged?: boolean;
};

export type GroundCoverLayerType = { normal: Layer; waterlogged: Layer };

export function createGroundCoverLayer(props: GroundCoverLayerProps): GroundCoverLayerType {
  return {
    normal: createGroundCoverLayer2({ ...props, waterlogged: false }),
    waterlogged: createGroundCoverLayer2({ ...props, waterlogged: true }),
  };
}

export function createGroundCoverLayer2({
  name,
  materials,
  layered = true,
  thickness = 1,
  scale,
  persistent,
  waterlogged,
}: GroundCoverLayerProps) {
  const mixedMaterialRows = materials.map(({ identifier, count = 10, scale = 1, random, height }) => {
    const identity = new org.pepsoft.minecraft.Material.Identity(identifier, null);
    let material = org.pepsoft.minecraft.Material.get(identity);
    if (layered) material = material.withProperty("layers", "8");
    if (persistent) material = material.withProperty("persistent", "true");
    if (waterlogged) material = material.withProperty("waterlogged", "true");
    if (random != null) material = material.withProperty("random", random);
    if (height != null) material = material.withProperty("height", height);
    // if (watery != null) material = material.withProperty("watery", "true");
    // spawnWater = true?
    const materialRow = new org.pepsoft.worldpainter.MixedMaterial.Row(material, count, scale);
    return materialRow;
  });
  const mixedMaterialRowsParam = mixedMaterialRows.length == 1 ? mixedMaterialRows[0] : mixedMaterialRows;

  //if(noiseSettings) {
  //const noiseSettings = new org.pepsoft.worldpainter.NoiseSettings();
  //noiseSettings.setScale(50);
  //}

  let mixedMaterial = null;
  if (scale != null) {
    mixedMaterial = new org.pepsoft.worldpainter.MixedMaterial(name + "-mm_layer", mixedMaterialRowsParam, biome, colour, scale);
  } else {
    mixedMaterial = new org.pepsoft.worldpainter.MixedMaterial(name + "-mm_layer", mixedMaterialRowsParam, biome, colour);
  }

  //log("mode=" + mixedMaterial.getMode() + " name= " + name);
  // long: seed, int: range, int: roughness, float: scale

  const groundCoverLayer = new org.pepsoft.worldpainter.layers.groundcover.GroundCoverLayer(
    name + "_layer" + (waterlogged ? "-waterlogged" : ""),
    mixedMaterial,
    //new java.awt.Color(155.1, 15.1, 200.1, 128.0)
    //new java.awt.Color(getRandomNumber(0, 255) + "f", getRandomNumber(0, 255) + "f", getRandomNumber(0, 255) + "f", 128)
    JAVA_COLORS[colour2++ % JAVA_COLORS.length]
  );
  //log("mixedMaterial layers getMode", mixedMaterial.getMode(), mixedMaterial.getName());
  // setNoiseSettings(NoiseSettings noiseSettings) // NoiseSettings(long seed, int range, int roughness, float scale)
  //groundCoverLayer.setNoiseSettings(new org.pepsoft.worldpainter.NoiseSettings(15));

  groundCoverLayer.setThickness(thickness);
  // setThickness(int thickness)
  if (layered) groundCoverLayer.setSmooth(true);
  colour += 1;
  //colour++;
  return groundCoverLayer;
}

//const layer1 = wp.getLayer().fromFile("C:/Users/HoTo/AppData/Roaming/WorldPainter/layers_and_terrains/plants_basic.layer").go();
//log(layer1.getName());

/*
const identity1 = new org.pepsoft.minecraft.Material.Identity("conquest:mossy_soil_slab", null);
const identity2 = new org.pepsoft.minecraft.Material.Identity("conquest:grass_block_layer", null);
const material1 = org.pepsoft.minecraft.Material.get(identity1).withProperty("layers", "8");
const material2 = org.pepsoft.minecraft.Material.get(identity2).withProperty("layers", "8");
const materialRow1 = new org.pepsoft.worldpainter.MixedMaterial.Row(material1, 10, 100);
const materialRow2 = new org.pepsoft.worldpainter.MixedMaterial.Row(material2, 10, 100);
const mixedMaterial = new org.pepsoft.worldpainter.MixedMaterial("test", [materialRow1, materialRow2], -1, 1);
export const groundCoverLayer = new org.pepsoft.worldpainter.layers.groundcover.GroundCoverLayer(
  "ground",
  mixedMaterial,
  java.awt.Color.GREEN
);
groundCoverLayer.setSmooth(true);
*/
/*
function y() {
  const identity1 = new org.pepsoft.minecraft.Material.Identity("conquest:mossy_soil_slab", null);
  const identity2 = new org.pepsoft.minecraft.Material.Identity("conquest:grass_block_layer", null);
  const material1 = org.pepsoft.minecraft.Material.get(identity1).withProperty("layers", "8");
  const material2 = org.pepsoft.minecraft.Material.get(identity2).withProperty("layers", "8");
  const materialRow1 = new org.pepsoft.worldpainter.MixedMaterial.Row(material1, 10, 100);
  const materialRow2 = new org.pepsoft.worldpainter.MixedMaterial.Row(material2, 10, 100);
  const mixedMaterial = new org.pepsoft.worldpainter.MixedMaterial("test", [materialRow1, materialRow2], -1, 1);
  const groundCoverLayer = new org.pepsoft.worldpainter.layers.groundcover.GroundCoverLayer("ground", mixedMaterial, java.awt.Color.GREEN);
  groundCoverLayer.setSmooth(true);
  return groundCoverLayer;
}
*/

type TerrainProps = {
  name: string;
  materials: MaterialParams[];
  /**
   * % for blobs. enables scale option in the materials
   */
  scale?: number;
};

export function createTerrain({ name, materials, scale }: TerrainProps) {
  //colour += colour < 1000 ? 100000 : 100;
  //colour += colour < 1000 ? 10000 : 10;
  colour += colour < 100 ? 100 : 10;
  const mixedMaterialRows = materials.map(({ identifier, count = 10, scale = 1 }) => {
    const identity = new org.pepsoft.minecraft.Material.Identity(identifier, null);
    let material = org.pepsoft.minecraft.Material.get(identity);
    const materialRow = new org.pepsoft.worldpainter.MixedMaterial.Row(material, count, scale);
    return materialRow;
  });
  const mixedMaterialRowsParam = mixedMaterialRows.length == 1 ? mixedMaterialRows[0] : mixedMaterialRows;
  let mixedMaterial = null;
  if (scale != null) {
    mixedMaterial = new org.pepsoft.worldpainter.MixedMaterial(name + "-mm_terrain", mixedMaterialRowsParam, biome, colour, scale);
  } else {
    mixedMaterial = new org.pepsoft.worldpainter.MixedMaterial(name + "-mm_terrain", mixedMaterialRowsParam, biome, colour);
  }
  //log("mixedMaterial terrain getMode", mixedMaterial.getMode(), mixedMaterial.getName());
  let customTerrainIndex = wp.installCustomTerrain(mixedMaterial).toWorld(world).go(); //.inSlot(1) after toWorld()
  const ground = org.pepsoft.worldpainter.Terrain.VALUES[fixIndex(customTerrainIndex)];
  //colour++;
  return ground;
}

// credit #https://github.com/Enderdodo974 https://github.com/Captain-Chaos/WorldPainter/issues/460
function fixIndex(int: number) {
  return intToIndex(installIndexToNumber(int));

  // takes a custom terrain index (0,1,2,3,4...) and converts it to the custom terrain index used by org.pepsoft.worldpainter.Terrain.VALUES
  function intToIndex(index: number) {
    return index < 48 ? (index < 24 ? index + 47 : index + 52) : index + 54;
  }

  // takes the int retured by wp.installCustomTerrain(terrain).toWorld(world).go(); and converts it to the custom terrain index (0,1,2,3,4...)
  function installIndexToNumber(num: number) {
    if (num < 30) {
      //22 to 26
      return num - 22;
    } else if (num < 76) {
      //30 to 48
      return num - 25;
    } else {
      //76 to 149
      return num - 52;
    }
  }
}

/*
import dimension from "../dimension";
import log from "../log";
import { loopCoordinates } from "../mapDimensions";
import world from "../world";

const groundMaterial1 = org.pepsoft.minecraft.Material.get(new org.pepsoft.minecraft.Material.Identity("minecraft:grass_block", null));
const groundMaterial2 = org.pepsoft.minecraft.Material.get(new org.pepsoft.minecraft.Material.Identity("conquest:mossy_soil", null));
const groundMaterialRow1 = new org.pepsoft.worldpainter.MixedMaterial.Row(groundMaterial1, 10, 100);
const groundMaterialRow2 = new org.pepsoft.worldpainter.MixedMaterial.Row(groundMaterial2, 10, 100);

const mixedMaterialTerrainGround1 = new org.pepsoft.worldpainter.MixedMaterial("test2", [groundMaterialRow1, groundMaterialRow2], -1, 1);

let customTerrainIndex = wp
  .installCustomTerrain(mixedMaterialTerrainGround1)
  .toWorld(world) //.inSlot(1)
  .go();

const ground = org.pepsoft.worldpainter.Terrain.VALUES[fixIndex(customTerrainIndex)];

export const terrains = {
  ground,
};
*/
