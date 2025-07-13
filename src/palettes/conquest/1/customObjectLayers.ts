// these are actually practical to create in UI, so have already created them

import { LAYERS_DIR } from "../../../constants";

const customObjectLayers = {
  bushesDead: loadLayerFromFile("bushes_dead.layer"),
  bushesDeadThick: loadLayerFromFile("bushes_dead_thick.layer"),
  bushesRowan: loadLayerFromFile("bushes_rowan.layer"),
  goatWillowBushes: loadLayerFromFile("goat_willow_bushes.layer"),
  beechBushes: loadLayerFromFile("beech_bushes.layer"),
  oliveTrees: loadLayerFromFile("olive_trees.layer"),
  larchTrees: loadLayerFromFile("larch_trees.layer"),
  spruceTrees: loadLayerFromFile("spruce_trees.layer"),
};

function loadLayerFromFile(file: string) {
  return wp
    .getLayer()
    .fromFile(LAYERS_DIR + file)
    .go();
}

export default customObjectLayers;
