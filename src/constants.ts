const homePath = java.lang.System.getProperty("user.home");
const appDataPath = java.lang.System.getenv("AppData");

//const EXISTING_WORLDPAINTER_WORLD_NAME = "duskridge20g_high-res-heightmap.world";
const EXISTING_WORLDPAINTER_WORLD_NAME = "test.world";
const isArdaCraft = true;

const GAMEDIR = isArdaCraft ? "ArdaCraft" : "Conquest Reforged Modpack (Fabric)";
const SAVE_CHANGES_TO_WORLDPAINTER_WORLD_NAME = EXISTING_WORLDPAINTER_WORLD_NAME.split(".").join("_1.");
//export const LAYERS_DIR = appDataPath + "\\WorldPainter\\layers_and_terrains\\";
export const LAYERS_DIR = homePath + "\\projects\\worldpainter-magic\\src\\palettes\\conquest\\1\\layers\\";
export const WORLD_FILE_LOCATION = appDataPath + "\\WorldPainter\\worlds\\" + EXISTING_WORLDPAINTER_WORLD_NAME;
export const WORLD_FILE_SAVE = appDataPath + "\\WorldPainter\\worlds\\" + SAVE_CHANGES_TO_WORLDPAINTER_WORLD_NAME;
export const EXPORT_FILE_SAVE_DIR = appDataPath + `\\PrismLauncher\\instances\\${GAMEDIR}\\minecraft\\saves\\`;

/**
 * using 100% spawnrate on trees so we can completely control whether patches of no vegetation shall appear
 */
export const MAX_TREE_SPAWN_RATE = 15;
// https://www.worldpainter.net/javadoc/constant-values.html#org.pepsoft.worldpainter.biomeschemes.AbstractMinecraft1_17BiomeScheme
export const BIOMES = {
  DESERT: 2,
  TAIGA: 15,
  BEACH: 16,
  //GROVE: 250,
  GROVE: 254, // is actually STONY_PEAKS
  SAVANNA: 35,
  BIOME_OLD_GROWTH_PINE_TAIGA: 32, // use instead of taiga if i go for ardacraft
  FROZEN_PEAKS: 249,
  DEEP_FROZEN_OCEAN: 50,
};

export const JAVA_COLORS = [
  //java.awt.Color.BLACK,
  //java.awt.Color.BLUE,
  java.awt.Color.CYAN,
  //java.awt.Color.DARK_GRAY,
  //java.awt.Color.GRAY,
  java.awt.Color.GREEN,
  java.awt.Color.LIGHT_GRAY,
  java.awt.Color.MAGENTA,
  java.awt.Color.ORANGE,
  java.awt.Color.PINK,
  java.awt.Color.RED,
  java.awt.Color.WHITE,
  java.awt.Color.YELLOW,
];
