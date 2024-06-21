import styled from "styled-components";
import breakpoints from "../../../styles/media.tsx";

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img<{ highlight?: string }>`
  width: 24px;
  margin: 5px 10px;
  padding: 2px;
  border: 3px solid white;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.1);

  ${(props) =>
    props.highlight === "true" &&
    `
    box-shadow: 0px 0px 30px white;
  `}

  @media screen and (min-width: ${breakpoints.md}) {
    width: 60px;
    border-radius: 10px;
  }

  @media screen and (max-height: ${breakpoints.md}) {
    width: 24px;
    border-radius: 5px;
  }
`;

const IconCommand = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  border: 3px solid white;
  border-radius: 2px;
  background-color: rgba(255, 255, 255);
  text-align: center;
  line-height: 10px;
  font-size: 10px;
  font-weight: 900;

  @media screen and (min-width: ${breakpoints.md}) {
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;
    border-radius: 5px;
  }

  @media screen and (max-height: ${breakpoints.md}) {
    width: 10px;
    height: 10px;
    font-size: 10px;
    line-height: 10px;
    border-radius: 2px;
  }
`;

const IconDescription = styled.div<{ highlight?: string }>`
  font-size: 16px;
  font-weight: 700;

  ${(props) =>
    props.highlight === "true" &&
    `
    text-shadow: #2ce41f 1px 0 10px;
  `}

  @media screen and (min-width: ${breakpoints.md}) {
    font-size: 24px;
    font-weight: 900;
  }

  @media screen and (max-height: ${breakpoints.md}) {
    font-size: 16px;
    font-weight: 700;
  }
`;

interface StyledIconProps {
  src: string;
  command?: string;
  description?: string;
  highlight?: string;
  handleClick?: () => void;
}

function StyledIcon({
  src,
  command,
  description,
  highlight,
  handleClick,
}: StyledIconProps) {
  return (
    <Icons>
      <div style={{ position: "relative" }}>
        <Icon src={src} highlight={highlight} onClick={handleClick} />
        {command && <IconCommand>{command}</IconCommand>}
      </div>
      <IconDescription highlight={highlight}>{description}</IconDescription>
    </Icons>
  );
}

export default StyledIcon;
