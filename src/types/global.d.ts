declare const wp: import("./ScriptingContext").ScriptingContext;

/*
declare class MixedMaterialRow {
  constructor(material: any, occurrence: number, scale: Float32Array);
}
*/

declare const org: {
  pepsoft: {
    minecraft: {
      // https://www.worldpainter.net/javadoc/org/pepsoft/minecraft/Material.html#method.detail
      Material: any;
    };
    worldpainter: {
      // https://www.worldpainter.net/javadoc/org/pepsoft/worldpainter/MixedMaterial.Row.html
      MixedMaterial: any; //{ Row: constructor(material: any, occurrence: number, scale: Float32Array) };
      // https://www.worldpainter.net/javadoc/org/pepsoft/worldpainter/NoiseSettings.html
      NoiseSettings: any;
      layers: {
        groundcover: any;
        Biome: any;
        Annotations: { INSTANCE: any };
      };
      Dimension: {
        Anchor: any;
      };
      // https://www.worldpainter.net/javadoc/org/pepsoft/worldpainter/Terrain.html#field.summary
      Terrain: {
        VALUES: number[];
        DEEP_SNOW: any;
      };
    };
  };
};

//these params have to match the header.js file!
declare const params: {
  chance: number;
  iterations: number;
  colors: string;
};

declare const java: {
  awt: {
    Color: any /*{
      constructor: (r: number, g: number, b:number) {
        //
      };
      BLACK: any;
      BLUE: any;
      CYAN: any;
      DARK_GRAY: any;
      GRAY: any;
      GREEN: any;
      LIGHT_GRAY: any;
      MAGENTA: any;
      ORANGE: any;
      PINK: any;
      RED: any;
      WHITE: any;
      YELLOW: any;
    };*/;
  };
  lang: {
    System: any;
  };
};

//declare const world: import("./World2").World2;
//declare const dimension: import("./Dimension").Dimension;

//declare const log: typeof import("../log").default;

/*
export {};

declare global {
  const dimension: any; //typeof import("./Dimension");
  const wp: any;
  //@ts-ignore
  //const print: (text: string) => void;
  const org: {
    pepsoft: {
      minecraft: {
        Material: any;
      };
      worldpainter: any;
    };
  };
  const world2: any;
  const log: typeof import("../log").default;
}
*/
