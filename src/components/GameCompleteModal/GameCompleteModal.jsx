import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ModalBackground = styled.div`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  width: 640px;
  height: 640px;
  border-radius: 20px;
  background-color: #ffffff;

  .title {
    padding: 10px 10px;
  }
`;

export function GameCompleteModal() {
  const navigate = useNavigate();

  return (
    <ModalBackground>
      <ModalContent>
        finish!!!
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          go back
        </button>
      </ModalContent>
    </ModalBackground>
  );
}

export default GameCompleteModal;
