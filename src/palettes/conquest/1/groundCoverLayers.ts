import { createGroundCoverLayer } from "../../generator";

const groundCoverLayers = {
  ground: createGroundCoverLayer({
    name: "ground",
    materials: [
      { identifier: "conquest:grass_block_layer", count: 800, scale: 1 },
      { identifier: "conquest:green_sphagnum_moss_block_layer", count: 5, scale: 1 },
      { identifier: "conquest:brown_sphagnum_moss_block_layer", count: 5, scale: 1 },
      { identifier: "conquest:mossy_sandstone_debris_layer", count: 10, scale: 1 },
      { identifier: "conquest:fir_forest_floor_layer", count: 10, scale: 1 },
    ],
    scale: 1,
  }),
  groundDesert: createGroundCoverLayer({
    name: "ground_desert",
    materials: [
      { identifier: "conquest:grass_block_layer", count: 800, scale: 1 },
      { identifier: "conquest:light_green_sphagnum_moss_block_layer", count: 400, scale: 1 },
    ],
    scale: 1,
  }),
  groundTaiga: createGroundCoverLayer({
    name: "ground_taiga",
    materials: [
      { identifier: "conquest:grass_block_layer", count: 800, scale: 1 },
      { identifier: "conquest:fir_forest_floor_layer", count: 100, scale: 1 },
    ],
    scale: 1,
  }),
  rowanLeaves: createGroundCoverLayer({
    name: "rowanLeaves",
    materials: [
      { identifier: "conquest:rowan_leaves", count: 100 },
      { identifier: "conquest:dead_spruce_needles", count: 25 },
      { identifier: "conquest:dead_pine_needles", count: 100 },
      { identifier: "conquest:yellow_autumnal_larch_needles", count: 50 },
    ],
    thickness: 2,
    persistent: true,
  }),
  frostBuiltIn: wp.getLayer().withName("Frost").go(),
  snow: createGroundCoverLayer({
    name: "snow",
    materials: [
      { identifier: "conquest:snow_slab", count: 100, scale: 0.7 },
      { identifier: "conquest:snow_covered_icy_limestone_slab", count: 25, scale: 0.7 },
    ],
    scale: 2,
  }),
  // on steeper, mountains
  mtn0MossySandstoneDebris: createGroundCoverLayer({
    name: "mtn0_mossy_sandstone_debris",
    materials: [{ identifier: "conquest:mossy_sandstone_debris_layer" }],
  }),
  mtn1GreenSphagnum: createGroundCoverLayer({
    name: "mtn1_green_sphagnum_moss",
    materials: [
      { identifier: "conquest:green_sphagnum_moss_block_layer", count: 1000, scale: 1 },
      { identifier: "conquest:brown_sphagnum_moss_block_layer", count: 200, scale: 1 },
    ],
    scale: 1,
  }),
  mtn2BrownSphagnumMoss: createGroundCoverLayer({
    name: "mtn2_brown_sphagnum_moss",
    materials: [
      { identifier: "conquest:brown_sphagnum_moss_block_layer", count: 1000, scale: 1 },
      { identifier: "conquest:green_sphagnum_moss_block_layer", count: 200, scale: 1 },
    ],
    scale: 1,
  }),
  mtn3MossyLimestone: createGroundCoverLayer({
    name: "mtn3_mossy_limestone",
    materials: [{ identifier: "conquest:mossy_limestone_slab" }],
  }),
  mtn4MossCoveredLimestone: createGroundCoverLayer({
    name: "mtn4_moss_covered_limestone",
    materials: [{ identifier: "conquest:moss_covered_limestone_slab" }],
  }),
  mtn5LimestoneMix: createGroundCoverLayer({
    name: "mtn5_limestone_mix",
    materials: [
      { identifier: "conquest:pink_limestone_slab", count: 1000, scale: 1 },
      { identifier: "conquest:stained_tan_limestone_slab", count: 400, scale: 0.5 },
    ],
    scale: 1,
  }),
  mtn6WeatheredGranite: createGroundCoverLayer({
    name: "mtn6_weathered_granite",
    materials: [
      { identifier: "conquest:weathered_granite_slab", count: 1000, scale: 1 },
      { identifier: "conquest:light_brown_granite_slab", count: 400, scale: 0.5 },
    ],
    scale: 1,
  }),
  mtn7DarkLimestone1: createGroundCoverLayer({
    name: "mtn7_dark_limestone1",
    materials: [
      { identifier: "conquest:light_limestone_slab", count: 800, scale: 0.5 },
      { identifier: "conquest:tan_limestone_slab", count: 200, scale: 0.5 },
    ],
    scale: 2,
  }),
  mtn7DarkLimestone2: createGroundCoverLayer({
    name: "mtn7_dark_limestone2",
    materials: [
      { identifier: "conquest:light_limestone_slab", count: 200, scale: 0.5 },
      { identifier: "conquest:tan_limestone_slab", count: 800, scale: 0.5 },
    ],
    scale: 2,
  }),
  overgrownSmallLimestones: createGroundCoverLayer({
    name: "overgrown_small_limestones",
    materials: [{ identifier: "conquest:overgrown_small_limestones_slab" }],
  }),
  mtnColorfulGranite: createGroundCoverLayer({
    name: "mtn_colorful_granite",
    materials: [
      { identifier: "conquest:dark_brown_granite_slab", count: 500, scale: 1 },
      { identifier: "conquest:smooth_red_granite_slab", count: 500, scale: 1 },
    ],
    scale: 2,
  }),
  anorthosite: createGroundCoverLayer({
    name: "anorthosite",
    materials: [
      { identifier: "conquest:rough_anorthosite_slab", count: 20, scale: 0.5 },
      { identifier: "conquest:weathered_anorthosite_slab", count: 10, scale: 0.5 },
    ],
    scale: 2,
  }),
  lakebedBeach: createGroundCoverLayer({
    name: "lakebed_beach",
    materials: [
      { identifier: "conquest:mud_slab", count: 3, scale: 1 },
      { identifier: "conquest:rocky_soil_slab", count: 3, scale: 1 },
      { identifier: "conquest:mossy_schist_debris_layer", count: 3, scale: 1 },
      { identifier: "conquest:mossy_soil_slab", count: 3, scale: 1 },
    ],
    scale: 1,
  }),
  lakebed: createGroundCoverLayer({
    name: "lakebed",
    materials: [
      { identifier: "conquest:mud_slab", count: 3, scale: 1 },
      { identifier: "conquest:rocky_soil_slab", count: 3, scale: 1 },
      { identifier: "conquest:mossy_schist_debris_layer", count: 3, scale: 1 },
      { identifier: "conquest:mossy_soil_slab", count: 3, scale: 1 },
    ],
    scale: 1,
    //waterlogged: true,
  }),
  /*
  lakebed: wp
    .getLayer()
    .fromFile(java.lang.System.getenv("AppData") + "\\WorldPainter\\layers_and_terrains\\" + "lakebed.layer")
    .go(),
  */
  rocks: createGroundCoverLayer({
    name: "rocks",
    materials: [
      { identifier: "conquest:light_limestone_rocks", count: 10 },
      { identifier: "conquest:dark_limestone_rocks", count: 1 },
      { identifier: "conquest:limestone_rocks", count: 10 },
    ],
    thickness: 2,
  }),
  rocksDark: createGroundCoverLayer({
    name: "rocks_dark",
    materials: [
      { identifier: "conquest:blue_schist_rocks", count: 3 },
      { identifier: "conquest:granite_rocks", count: 3 },
      { identifier: "conquest:slate_rocks", count: 3 },
      { identifier: "conquest:limestone_rocks", count: 3 },
    ],
    thickness: 2,
  }),
  plantsCoastal: createGroundCoverLayer({
    name: "plants_coastal",
    materials: [
      { identifier: "conquest:kentucky_bluegrass", count: 10, scale: 0.3 },
      { identifier: "conquest:lush_grass", count: 10, scale: 0.3 },
      { identifier: "conquest:sedge", count: 10, scale: 0.3 },
      { identifier: "conquest:bottle_sedge", count: 10, scale: 0.3 },
      { identifier: "conquest:dry_reeds", count: 3, random: 0, scale: 0.3 },
      { identifier: "conquest:dry_reeds", count: 3, random: 1, scale: 0.3 },
      { identifier: "conquest:dry_reeds", count: 3, random: 2, scale: 0.3 },
      { identifier: "conquest:greater_fen_sedges", count: 20, scale: 1 },
      //{ identifier: "conquest:greater_fen_sedge", count: 3, random: 0 },
      //{ identifier: "conquest:greater_fen_sedge", count: 3, random: 1 },
      //{ identifier: "conquest:greater_fen_sedge", count: 3, random: 2 },
      { identifier: "conquest:blue_schist_rocks", count: 3, scale: 0.3 },
      { identifier: "conquest:granite_rocks", count: 3, scale: 0.3 },
      { identifier: "conquest:slate_rocks", count: 3, scale: 0.3 },
      { identifier: "conquest:limestone_rocks", count: 3, scale: 0.3 },
    ],
    thickness: 2,
    scale: 2,
  }),
  plantsCoastalWaterlogged: createGroundCoverLayer({
    name: "plants_coastal_waterlogged",
    materials: [
      //{ identifier: "conquest:kentucky_bluegrass", count: 10 },
      //{ identifier: "conquest:lush_grass", count: 10 },
      { identifier: "conquest:sedge", count: 10 },
      { identifier: "conquest:bottle_sedge", count: 10 },
      { identifier: "conquest:dry_reeds", count: 3, random: 0 },
      { identifier: "conquest:dry_reeds", count: 3, random: 1 },
      { identifier: "conquest:dry_reeds", count: 3, random: 2 },
      { identifier: "conquest:greater_fen_sedges", count: 10 },
      //{ identifier: "conquest:greater_fen_sedge", count: 3, random: 0 },
      //{ identifier: "conquest:greater_fen_sedge", count: 3, random: 1 },
      //{ identifier: "conquest:greater_fen_sedge", count: 3, random: 2 },
      { identifier: "conquest:blue_schist_rocks", count: 3 },
      { identifier: "conquest:granite_rocks", count: 3 },
      { identifier: "conquest:slate_rocks", count: 3 },
      { identifier: "conquest:limestone_rocks", count: 3 },
    ],
    thickness: 2,
    waterlogged: true,
  }),
  /*plantsCoastalWaterlogged: wp
    .getLayer()
    .fromFile(java.lang.System.getenv("AppData") + "\\WorldPainter\\layers_and_terrains\\" + "coastal_plants_waterlogged.layer")
    .go(),*/
  plantsPlains: createGroundCoverLayer({
    name: "plants_plains",
    materials: [
      { identifier: "conquest:common_meadow_grass", count: 1000, scale: 0.1 },
      { identifier: "conquest:kentucky_bluegrass", count: 1000, scale: 0.1 },
      { identifier: "conquest:lush_grass", count: 1000, scale: 0.1 },
      { identifier: "conquest:sweet_grass", count: 1000, scale: 0.1 },
      { identifier: "conquest:wavy_hair_grass", count: 500, scale: 0.1 },
      { identifier: "conquest:deergrass", count: 100, scale: 0.8 },
      { identifier: "conquest:timothy_grass", count: 500, scale: 0.1 },
      { identifier: "conquest:purple_moor_grass", count: 1000, scale: 0.1 },
      { identifier: "conquest:dead_bracken", count: 100, scale: 0.8 },
      { identifier: "conquest:dense_headed_feathergrass", count: 250, scale: 0.2 },
      { identifier: "conquest:dead_grass", count: 100, scale: 0.8 },
    ],
    thickness: 2,
    scale: 1,
  }),
  plantsTaiga: createGroundCoverLayer({
    name: "plants_taiga",
    materials: [
      { identifier: "conquest:green_meadow_fesque", count: 3, scale: 0.5 },
      { identifier: "conquest:wavy_hair_grass", count: 3, scale: 0.1 },
      { identifier: "conquest:kentucky_bluegrass", count: 3, scale: 0.5 },
      { identifier: "conquest:lush_grass", count: 3, scale: 0.5 },
      { identifier: "conquest:dense_headed_feathergrass", count: 3, scale: 0.5 },
      { identifier: "conquest:wormwood", count: 3, scale: 0.5 },
      { identifier: "conquest:wood_horsetail", count: 3, scale: 0.5 },
      { identifier: "conquest:timothy_grass", count: 3, scale: 0.5 },
      { identifier: "conquest:grass", count: 3, scale: 0.5 },
    ],
    thickness: 2,
    scale: 1,
  }),
  plantsPlains2: createGroundCoverLayer({
    name: "plants_plains2",
    materials: [
      { identifier: "conquest:common_meadow_grass", count: 1000, scale: 0.1 },
      { identifier: "conquest:kentucky_bluegrass", count: 1000, scale: 0.1 },
      { identifier: "conquest:lush_grass", count: 1000, scale: 0.1 },
      { identifier: "conquest:sweet_grass", count: 10, scale: 0.1 },
      { identifier: "conquest:wavy_hair_grass", count: 50, scale: 0.3 },
      { identifier: "conquest:deergrass", count: 10, scale: 0.8 },
      { identifier: "conquest:timothy_grass", count: 500, scale: 0.1 },
      { identifier: "conquest:purple_moor_grass", count: 10, scale: 0.8 },
      { identifier: "conquest:dead_bracken", count: 200, scale: 0.8 },
      { identifier: "conquest:dense_headed_feathergrass", count: 100, scale: 0.2 },
      { identifier: "conquest:greater_wood_rush", count: 500, scale: 0.1 },
    ],
    thickness: 2,
    scale: 1,
  }),
  plantsDesert: createGroundCoverLayer({
    name: "plants_desert",
    materials: [
      { identifier: "conquest:small_fescue", count: 100, scale: 0.1 },
      { identifier: "conquest:kentucky_bluegrass", count: 50, scale: 0.1 },
      { identifier: "conquest:green_meadow_fescue", count: 50, scale: 0.1 },
      { identifier: "conquest:wavy_hair_grass", count: 500, scale: 0.1 },
      { identifier: "conquest:timothy_grass", count: 50, scale: 0.1 },
      { identifier: "conquest:autumnal_bracken", count: 10, scale: 1 },
      { identifier: "conquest:dead_bracken", count: 15, scale: 0.8 },
      { identifier: "conquest:dead_grass", count: 100, scale: 0.1 },
      { identifier: "conquest:dark_autumnal_bracken", count: 10, scale: 1 },
    ],
    thickness: 2,
    scale: 1,
  }),
  rocksBeach: createGroundCoverLayer({
    name: "rocksBeach",
    materials: [
      { identifier: "conquest:mudstone_rocks" },
      { identifier: "conquest:smooth_tuff_rocks" },
      { identifier: "conquest:tuff_rocks" },
      { identifier: "conquest:rough_marble_rocks" },
    ],
    thickness: 2,
  }),
  beachStone: createGroundCoverLayer({
    name: "beach_stone",
    materials: [
      { identifier: "conquest:smooth_red_granite_slab", count: 2 },
      { identifier: "conquest:red_sandstone_slab", count: 2 },
      { identifier: "conquest:coastal_red_sandstone_slab", count: 2 },
    ],
  }),
  beachTop: createGroundCoverLayer({
    name: "beach_top",
    materials: [
      { identifier: "conquest:wet_tan_sand_layer", count: 1000, scale: 1 },
      { identifier: "conquest:smooth_red_granite_slab", count: 2, scale: 1 },
      { identifier: "conquest:red_sandstone_slab", count: 2, scale: 1 },
      { identifier: "conquest:coastal_red_sandstone_slab", count: 2, scale: 1 },
    ],
    scale: 2,
  }),
  beachBottom: createGroundCoverLayer({
    name: "brown_sand",
    materials: [{ identifier: "conquest:brown_sand_layer" }],
    waterlogged: true,
  }),
  snowyGraniteSlab: createGroundCoverLayer({
    name: "snowy_granite_slab",
    materials: [{ identifier: "conquest:snowy_granite_slab" }],
  }),
  darkLimestoneSlab: createGroundCoverLayer({
    name: "dark_limestone_slab",
    materials: [{ identifier: "conquest:dark_limestone_slab" }],
  }),
  weatheredBasaltSlab: createGroundCoverLayer({
    name: "weathered_basalt_slab",
    materials: [{ identifier: "conquest:weathered_basalt_slab" }],
  }),
};

export default groundCoverLayers;
