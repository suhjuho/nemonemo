import styled from "styled-components";

import { BiUndo } from "react-icons/bi";

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  z-index: 10;

  .icon {
    width: 3rem;
    height: 3rem;
    margin: 1rem;
  }
`;

const Icon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0.5rem;
`;

const Command = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  font-size: 1.8rem;
`;

function GameStageFooter() {
  return (
    <Footer>
      <div style={{ display: "flex" }}>
        <Icon>
          <BiUndo className="icon" />
          <Command>Z</Command>
        </Icon>
        <Icon>
          <BiUndo className="icon" style={{ transform: "scaleX(-1)" }} />
          <Command>X</Command>
        </Icon>
      </div>
    </Footer>
  );
}

export default GameStageFooter;
