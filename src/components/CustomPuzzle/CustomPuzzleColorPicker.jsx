import styled from "styled-components";

const SideBar = styled.section`
  position: fixed;
  right: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  z-index: 5;
`;

function CustomPuzzleColorPicker({ cubeColor, handleCubeColor }) {
  return (
    <SideBar>
      <div>
        <input
          type="color"
          id="head"
          name="head"
          value={cubeColor}
          onChange={(event) => handleCubeColor(event.target.value)}
        />
      </div>
    </SideBar>
  );
}

export default CustomPuzzleColorPicker;
