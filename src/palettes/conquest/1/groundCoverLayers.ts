import { createGroundCoverLayer } from "../../generator";

const groundCoverLayers = {
  groundPlains: createGroundCoverLayer({
    name: "ground_plains",
    materials: [
      //{ identifier: "conquest:grass_block_layer", count: 200, scale: 1 },
      { identifier: "conquest:green_sphagnum_moss_block_layer", count: 20, scale: 1 },
      { identifier: "conquest:brown_sphagnum_moss_block_layer", count: 20, scale: 1 },
      //{ identifier: "conquest:mossy_sandstone_debris_layer", count: 10, scale: 1 },
      //{ identifier: "conquest:fir_forest_floor_layer", count: 10, scale: 1 },
      { identifier: "conquest:clover_covered_grass_layer", count: 300, scale: 1 },
      { identifier: "conquest:taiga_grass_layer", count: 300, scale: 1 },
    ],
    scale: 1,
  }),
  groundDesert: createGroundCoverLayer({
    name: "ground_desert",
    materials: [
      { identifier: "conquest:grass_block_layer", count: 200, scale: 1 },
      { identifier: "conquest:light_green_sphagnum_moss_block_layer", count: 100, scale: 1 },
      { identifier: "conquest:brown_sphagnum_moss_block_layer", count: 100, scale: 1 },
      { identifier: "conquest:mossy_sandstone_debris_layer", count: 800, scale: 1 },
      /*
conquest: 
      { identifier: "conquest:grass_block_layer", count: 600, scale: 1 },
      { identifier: "conquest:light_green_sphagnum_moss_block_layer", count: 400, scale: 1 },
      */
    ],
    scale: 1,
  }),
  groundTaiga: createGroundCoverLayer({
    name: "ground_taiga",
    materials: [
      /*
      { identifier: "conquest:grass_block_layer", count: 100, scale: 1 },
      { identifier: "conquest:fir_forest_floor_layer", count: 100, scale: 1 },
      { identifier: "conquest:clover_covered_grass_layer", count: 300, scale: 1 },
      { identifier: "conquest:taiga_grass_layer", count: 300, scale: 1 },
      */
      //{ identifier: "conquest:fir_forest_floor_layer", count: 200, scale: 1 },
      { identifier: "conquest:clover_covered_grass_layer", count: 200, scale: 1 },
      { identifier: "conquest:mossy_lorien_forest_floor_layer", count: 100, scale: 1 },
      { identifier: "conquest:yellow_sphagnum_moss_block_layer", count: 100, scale: 1 },
      { identifier: "conquest:autumnal_forest_floor_layer", count: 100, scale: 1 },
      { identifier: "conquest:vibrant_autumnal_forest_floor_layer", count: 100, scale: 1 },
      { identifier: "conquest:autumnal_forest_floor_with_roots_layer", count: 100, scale: 1 },
    ],
    scale: 1,
  }),
  groundGrove: createGroundCoverLayer({
    name: "ground_grove",
    materials: [
      //{ identifier: "conquest:grass_block_layer", count: 100, scale: 1 },
      //{ identifier: "conquest:fir_forest_floor_layer", count: 100, scale: 1 },
      { identifier: "conquest:clover_covered_grass_layer", count: 300, scale: 1 },
      { identifier: "conquest:taiga_grass_layer", count: 300, scale: 1 },
    ],
    scale: 1,
  }),
  plantsPlains: createGroundCoverLayer({
    name: "plants_plains",
    materials: [
      { identifier: "conquest:wavy_hair_grass", count: 5, scale: 0.4, random: 0 },
      { identifier: "conquest:wavy_hair_grass", count: 5, scale: 0.4, random: 1 },
      { identifier: "conquest:wavy_hair_grass", count: 5, scale: 0.4, random: 2 },
      { identifier: "conquest:wood_horsetail", count: 5, scale: 0.1, height: 1 },
      { identifier: "conquest:wood_horsetail", count: 5, scale: 0.1, height: 2 },
      { identifier: "conquest:kentucky_bluegrass", count: 200, scale: 0.4 },
      //{ identifier: "conquest:wavy_hair_grass", count: 200, scale: 0.4 },
      { identifier: "conquest:sparse_headed_feathergrass", count: 200, scale: 0.4 },
      { identifier: "conquest:greater_wood_rush", count: 200, scale: 0.6 },
      { identifier: "conquest:timothy_grass", count: 200, scale: 0.4 },
      { identifier: "conquest:wormwood", count: 200, scale: 0.4 },
      { identifier: "conquest:buttercups", count: 5, scale: 0.1 },
      { identifier: "conquest:wild_basil", count: 5, scale: 1 },
      { identifier: "conquest:cross_leaved_heath", count: 5, scale: 1 },
    ],
    thickness: 2,
    scale: 1,
  }),
  plantsDesert: createGroundCoverLayer({
    name: "plants_desert",
    materials: [
      //{ identifier: "conquest:dead_grass", count: 50, scale: 0.4, random: 0 },
      //{ identifier: "conquest:dead_grass", count: 50, scale: 0.4, random: 1 },
      //{ identifier: "conquest:dead_grass", count: 50, scale: 0.4, random: 2 },
      { identifier: "conquest:dead_grass", count: 200, scale: 0.1 },
      { identifier: "conquest:sheeps_fescue", count: 500, scale: 0.4 },
      { identifier: "conquest:small_fescue", count: 100, scale: 0.4 },
      { identifier: "conquest:meadow_fescue", count: 5, scale: 0.1 },
      { identifier: "conquest:dense_headed_feathergrass", count: 100, scale: 0.4 },
      { identifier: "conquest:cut_wheat_shafts", count: 10, scale: 0.4, height: 0 },
      { identifier: "conquest:cut_wheat_shafts", count: 100, scale: 0.4, height: 1 },
      { identifier: "conquest:cut_wheat_shafts", count: 100, scale: 0.4, height: 2 },
      { identifier: "conquest:cut_wheat_shafts", count: 10, scale: 0.4, height: 3 },
      { identifier: "conquest:warped_fungus", count: 100, scale: 0.4 },
      { identifier: "conquest:marsh_ragwort", count: 4, scale: 0.7 },
      { identifier: "conquest:mediterranean_wild_tulip", count: 4, scale: 0.7 },
      { identifier: "conquest:green_spurge", count: 4, scale: 0.7 },
      { identifier: "conquest:yellow_wolfs_bane", count: 2, scale: 0.7 },
    ],
    thickness: 2,
    scale: 1.5,
  }),
  plantsTaiga: createGroundCoverLayer({
    name: "plants_taiga",
    materials: [
      { identifier: "conquest:large_fern_1", count: 20, scale: 0.3 },
      { identifier: "conquest:large_fern_2", count: 20, scale: 0.3 },
      { identifier: "conquest:large_fern_3", count: 20, scale: 0.3 },
      { identifier: "conquest:fern", count: 50, scale: 0.3 },
      { identifier: "conquest:fern_1", count: 50, scale: 0.3 },
      { identifier: "conquest:fern_2", count: 50, scale: 0.3 },
      { identifier: "conquest:harts_tongue_fern", count: 100, scale: 0.4 },
      { identifier: "conquest:common_cow_wheat", count: 100, scale: 0.4 },
      //{ identifier: "conquest:broom_bush", count: 100, scale: 0.4 },
      { identifier: "conquest:wild_overgrown_nettles", count: 100, scale: 0.1 },
      { identifier: "conquest:bracken", count: 10, scale: 0.3 },
      { identifier: "conquest:autumnal_bracken", count: 10, scale: 0.3 },
      { identifier: "conquest:dark_autumnal_bracken", count: 10, scale: 0.3 },
    ],
    thickness: 2,
    scale: 2,
  }),
  plantsGrove: createGroundCoverLayer({
    name: "plants_grove",
    materials: [
      //{ identifier: "conquest:greater_wood_rush", count: 100, scale: 0.6 },
      { identifier: "conquest:wild_shrub", count: 100, scale: 0.6 },
      { identifier: "conquest:dark_wild_shrub", count: 100, scale: 0.6 },
      { identifier: "conquest:light_wild_shrub", count: 100, scale: 0.6 },
      { identifier: "conquest:broom_bush", count: 25, scale: 0.4 },
      { identifier: "conquest:downy_willow_leaves_tip", count: 20, scale: 0.6 },
      //{ identifier: "conquest:timothy_grass", count: 100, scale: 0.4 },
      //{ identifier: "conquest:wormwood", count: 100, scale: 0.4 },
      { identifier: "conquest:lavender", count: 5, scale: 0.9 },
    ],
    thickness: 2,
    scale: 2,
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
    //waterlogged: true,
  }),
  rowanLeaves: createGroundCoverLayer({
    name: "rowan_leaves",
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
  rocksBeach: createGroundCoverLayer({
    name: "rocks_beach",
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
    //waterlogged: true,
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
