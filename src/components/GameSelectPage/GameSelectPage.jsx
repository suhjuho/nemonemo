import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

import { useState, useEffect } from "react";

import styled from "styled-components";

import { useNavigate, useParams } from "react-router-dom";
import GameStageHeader from "../Header/GameStageHeader";

import { useAnswerStore } from "../../store/store";
import usePuzzlesStore from "../../store/puzzle";
import usePuzzlesIndexStore from "../../store/solve";

import getDefaultPuzzle from "../../utils/getDefaultPuzzle";
import convertCoordinate from "../../utils/convertCoordinate";

import Back from "../../assets/icon/back.png";
import Next from "../../assets/icon/next.png";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

const Icon = styled.img`
  width: 60px;
  margin: 0px 10px;
`;

const Puzzles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  height: 100vh;
`;

const Puzzle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
`;

const PuzzleLabel = styled.div`
  font-size: 64px;
`;

const PuzzlePreview = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 30px;
  ${({ idx }) =>
    idx === 0 &&
    `
    width: 300px;
    height: 300px;
  `}
`;

const PlayButton = styled.div`
  position: absolute;
  bottom: 25vh;
  width: 100vw;
  display: flex;
  justify-content: center;

  .play-button {
    width: 300px;
    height: 60px;
    border-radius: 30px;
    background-color: #ffffff;
    text-align: center;
    line-height: 60px;
    font-size: 36px;
    box-shadow: #000000;
  }
`;

function GameSelectPage() {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const { puzzles } = usePuzzlesStore();
  const { setIsComplete } = useAnswerStore();
  const { puzzlesIndex, setPuzzlesIndex } = usePuzzlesIndexStore();
  const [allPuzzles, setAllPuzzles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    setCurrentIndex(puzzlesIndex[difficulty]);
  }, []);

  useEffect(() => {
    setIsComplete(false);
  }, []);

  useEffect(() => {
    setAllPuzzles(Object.entries(puzzles[difficulty]));
  }, []);

  const handleIndexIncrease = () => {
    console.log(currentIndex, allPuzzles.length);
    if (allPuzzles.length > currentIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleIndexDecrease = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Stage>
      <GameStageHeader type="select" difficulty={difficulty} />
      <Puzzles>
        <Icon src={Back} onClick={handleIndexDecrease} />
        {[-2, -1, 0, 1, 2].map((idx) => {
          const currentPuzzle = puzzles[difficulty][currentIndex + idx];

          return currentPuzzle ? (
            <Puzzle key={currentPuzzle.title + currentPuzzle.size}>
              <PuzzlePreview idx={idx}>
                {currentPuzzle.isSolved ? (
                  <Canvas
                    style={{
                      background: currentPuzzle.subColor,
                      borderRadius: 20,
                    }}
                  >
                    <directionalLight intensity={1} position={[-5, 5, -10]} />
                    <directionalLight intensity={3} position={[-10, 5, 10]} />
                    <directionalLight intensity={5} position={[10, 10, 10]} />
                    <OrthographicCamera
                      makeDefault
                      position={[-5, 5, 5]}
                      fov={100}
                      near={1}
                      far={1000}
                      zoom={Math.floor(50 / Math.max(...currentPuzzle.size))}
                    />
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      enableDamping={false}
                    />
                    <group>
                      {Object.keys(currentPuzzle.answers).map((position) => (
                        <mesh
                          key={position}
                          position={convertCoordinate(
                            position,
                            currentPuzzle.size,
                          )}
                        >
                          <boxGeometry args={[2, 2, 2]} />
                          <meshStandardMaterial
                            color={currentPuzzle.colors[position]}
                          />
                        </mesh>
                      ))}
                    </group>
                  </Canvas>
                ) : (
                  <Canvas
                    style={{
                      background: currentPuzzle.subColor,
                      borderRadius: 20,
                    }}
                  >
                    <directionalLight intensity={1} position={[-5, 5, -10]} />
                    <directionalLight intensity={3} position={[-10, 5, 10]} />
                    <directionalLight intensity={5} position={[10, 10, 10]} />
                    <OrthographicCamera
                      makeDefault
                      position={[-8, 8, 8]}
                      fov={100}
                      near={1}
                      far={1000}
                      zoom={Math.floor(50 / Math.max(...currentPuzzle.size))}
                    />
                    <OrbitControls
                      enableZoom={false}
                      enablePan={false}
                      enableDamping={false}
                    />
                    <group>
                      {getDefaultPuzzle(currentPuzzle.size).map((position) => (
                        <mesh key={position} position={position}>
                          <boxGeometry args={[2, 2, 2]} />
                          <meshStandardMaterial
                            color={currentPuzzle.mainColor}
                          />
                        </mesh>
                      ))}
                    </group>
                  </Canvas>
                )}
              </PuzzlePreview>
              <PuzzleLabel>
                {currentPuzzle.isSolved ? currentPuzzle.title : "?"}
              </PuzzleLabel>
            </Puzzle>
          ) : (
            <Puzzle key={currentIndex + idx} />
          );
        })}
        <Icon src={Next} onClick={handleIndexIncrease} />
      </Puzzles>
      <PlayButton>
        <button
          className="play-button"
          onClick={() => {
            puzzlesIndex[difficulty] = currentIndex;
            setPuzzlesIndex(puzzlesIndex);

            navigate(`/puzzles/${difficulty}/${currentIndex}`);
          }}
        >
          Play
        </button>
      </PlayButton>
    </Stage>
  );
}

export default GameSelectPage;
