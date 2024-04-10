import styled from "styled-components";

const Icons = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 60px;
  margin: 5px 10px;
  padding: 2px;
  border: 3px solid white;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
  background-color: rgba(255, 255, 255, 0.1);

  ${(props) =>
    props.highlight === "true" &&
    `
    box-shadow: 0px 0px 30px white;
  `}
`;

const IconCommand = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 20px;
  height: 20px;
  border: 3px solid white;
  border-radius: 5px;
  background-color: rgba(255, 255, 255);
  text-align: center;
  line-height: 20px;
  font-size: 20px;
  font-weight: 900;
`;

const IconDescription = styled.div`
  font-size: 24px;
  font-weight: 900;

  ${(props) =>
    props.highlight === "true" &&
    `
    text-shadow: #2ce41f 1px 0 10px;
  `}
`;

function StyledIcon({ src, command, description, highlight }) {
  return (
    <Icons>
      <div style={{ position: "relative" }}>
        <Icon src={src} highlight={highlight} />
        {command && <IconCommand>{command}</IconCommand>}
      </div>
      <IconDescription highlight={highlight}>{description}</IconDescription>
    </Icons>
  );
}

export default StyledIcon;
