import { createTerrain } from "../../generator";

const terrains = {
  ground: createTerrain({
    name: "ground",
    materials: [{ identifier: "conquest:porous_andesite", count: 10, scale: 1 }],
  }),
  seabed: createTerrain({
    name: "seabed",
    materials: [{ identifier: "minecraft:grass_block", count: 10, scale: 1 }],
  }),
  // on steeper, mountains
  mtn0MossySandstoneDebris: createTerrain({
    name: "mtn0_mossy_sandstone_debris",
    materials: [{ identifier: "conquest:mossy_sandstone_debris" }],
  }),
  mtn1GreenSphagnum: createTerrain({
    name: "mtn1_green_sphagnum_moss",
    materials: [
      { identifier: "conquest:green_sphagnum_moss_block", count: 1000, scale: 1 },
      { identifier: "conquest:brown_sphagnum_moss_block", count: 200, scale: 1 },
    ],
    scale: 1,
  }),
  mtn2BrownSphagnumMoss: createTerrain({
    name: "mtn2_brown_sphagnum_moss",
    materials: [
      { identifier: "conquest:brown_sphagnum_moss_block", count: 1000, scale: 1 },
      { identifier: "conquest:green_sphagnum_moss_block", count: 200, scale: 1 },
    ],
    scale: 1,
  }),
  mtn3MossyLimestone: createTerrain({
    name: "mtn3_mossy_limestone",
    materials: [{ identifier: "conquest:mossy_limestone" }],
  }),
  mtn4MossCoveredLimestone: createTerrain({
    name: "mtn4_moss_covered_limestone",
    materials: [{ identifier: "conquest:moss_covered_limestone" }],
  }),
  mtn5LimestoneMix: createTerrain({
    name: "mtn5_limestone_mix",
    materials: [
      { identifier: "conquest:pink_limestone", count: 1000, scale: 1 },
      { identifier: "conquest:stained_tan_limestone", count: 400, scale: 0.5 },
    ],
    scale: 1,
  }),
  mtn6WeatheredGranite: createTerrain({
    name: "mtn6_weathered_granite",
    materials: [
      { identifier: "conquest:weathered_granite", count: 1000, scale: 1 },
      { identifier: "conquest:light_brown_granite", count: 400, scale: 0.5 },
    ],
    scale: 1,
  }),
  mtn7DarkLimestone1: createTerrain({
    name: "mtn7_dark_limestone1",
    materials: [
      { identifier: "minecraft:diorite", count: 800, scale: 0.5 },
      { identifier: "conquest:tan_limestone", count: 200, scale: 0.5 },
    ],
    scale: 2,
  }),
  mtn7DarkLimestone2: createTerrain({
    name: "mtn7_dark_limestone2",
    materials: [
      { identifier: "minecraft:diorite", count: 200, scale: 0.5 },
      { identifier: "conquest:tan_limestone", count: 800, scale: 0.5 },
    ],
    scale: 2,
  }),
  overgrownSmallLimestones: createTerrain({
    name: "overgrown_small_limestones",
    materials: [{ identifier: "conquest:overgrown_small_limestones" }],
  }),
  mtnColorfulGranite: createTerrain({
    name: "mtn_colorful_granite",
    materials: [
      { identifier: "conquest:dark_brown_granite", count: 500, scale: 1 },
      { identifier: "conquest:smooth_red_granite", count: 500, scale: 1 },
    ],
    scale: 2,
  }),
  anorthosite: createTerrain({
    name: "anorthosite",
    materials: [
      { identifier: "conquest:rough_anorthosite", count: 20, scale: 0.5 },
      { identifier: "conquest:weathered_anorthosite", count: 10, scale: 0.5 },
    ],
    scale: 2,
  }),
  beachTop: createTerrain({
    name: "beach_top",
    materials: [
      { identifier: "conquest:wet_tan_sand", count: 1000 },
      { identifier: "conquest:smooth_red_granite", count: 2 },
      { identifier: "conquest:red_sandstone", count: 2 },
      { identifier: "conquest:coastal_red_sandstone", count: 2 },
    ],
  }),
  beachDarkColoredSand: createTerrain({
    name: "beach_dark_colored_sand",
    materials: [
      { identifier: "conquest:dark_brown_sand_layer", count: 50, scale: 1 },
      { identifier: "conquest:wet_river_sand_layer", count: 50, scale: 1 },
    ],
    scale: 2,
  }),
  beachBottom: createTerrain({
    name: "brown_sand",
    materials: [{ identifier: "conquest:brown_sand" }],
  }),
  snowyGranite: createTerrain({
    name: "snowy_granite",
    materials: [{ identifier: "conquest:snowy_granite" }],
  }),
  snowyIcyLimestone: createTerrain({
    name: "snow_covered_icy_limestone",
    materials: [{ identifier: "conquest:snow_covered_icy_limestone" }],
  }),
  darkLimestone: createTerrain({
    name: "dark_limestone",
    materials: [{ identifier: "conquest:dark_limestone" }],
  }),
  weatheredBasalt: createTerrain({
    name: "weathered_basalt",
    materials: [{ identifier: "conquest:weathered_basalt" }],
  }),
};

export default terrains;
