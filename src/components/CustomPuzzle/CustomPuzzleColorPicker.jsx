import styled from "styled-components";

const SideBar = styled.section`
  position: fixed;
  left: calc(50vw + 150px);
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  z-index: 30;

  .color-picker {
    width: 100px;
    height: 60px;
  }
`;

function CustomPuzzleColorPicker({ cubeColor, handleCubeColor }) {
  return (
    <SideBar>
      <div>
        <input
          className="color-picker"
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
