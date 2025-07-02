import log from "./log";
import world from "./world";

const anchor = org.pepsoft.worldpainter.Dimension.Anchor.NORMAL_DETAIL;
const dimension = world.getDimension(anchor);

log("Dimension loaded");

export default dimension;
