import { EXPORT_FILE_SAVE_DIR, WORLD_FILE_LOCATION, WORLD_FILE_SAVE } from "./constants";
import log from "./log";

const world = wp.getWorld().fromFile(WORLD_FILE_LOCATION).go();

log("World loaded from " + WORLD_FILE_LOCATION);

export const saveWorld = () => {
  log("Saving WorldPainter world " + WORLD_FILE_SAVE);
  wp.saveWorld(world).toFile(WORLD_FILE_SAVE).go();
  log("Saved!");
};

export const exportWorld = () => {
  log("Exporting Minecraft map to dir " + EXPORT_FILE_SAVE_DIR);
  wp.exportWorld(world).toDirectory(EXPORT_FILE_SAVE_DIR).go();
  log("Exported!");
};

export default world;
