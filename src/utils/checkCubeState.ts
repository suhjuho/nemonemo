import { CUBE_CONSTANT } from "../constants/cube.ts";

function checkCubeState(
  isClicked: boolean,
  isRemoved: boolean,
  clickMode: "color" | "cube",
  isHidden: boolean,
) {
  let result: keyof typeof CUBE_CONSTANT.MATERIAL_ARGS = "blank";

  if (!isClicked && !isRemoved) {
    result = "blank";
  }

  if (isClicked && !isRemoved) {
    result = "marked";
  }

  if (!isClicked && isRemoved && clickMode === "color") {
    result = "invisible";
  }

  if (!isClicked && isRemoved && clickMode === "cube") {
    result = "haze";
  }

  if (isHidden) {
    result = "invisible";
  }

  return result;
}

export default checkCubeState;
