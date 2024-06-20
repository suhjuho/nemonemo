import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { ResizeObserver } from "@juggle/resize-observer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import GameStageHeader from "../shared/Header/GameStageHeader.tsx";

import { useAnswerStore, useLanguageStore } from "../../store/store.tsx";
import usePuzzlesStore from "../../store/puzzle.tsx";
import usePuzzlesIndexStore from "../../store/selectPuzzlesIndex.tsx";
import useSolvedPuzzlesStore from "../../store/solvedPuzzles.tsx";

import getDefaultPuzzle from "../../utils/getDefaultPuzzle.ts";
import convertCoordinate from "../../utils/convertCoordinate.ts";
import formatTime from "../../utils/formatTime.ts";

import Back from "../../assets/icon/back.png";
import Next from "../../assets/icon/next.png";
import Detail from "../../assets/icon/detail.png";
import useFetchPuzzles from "../../apis/useFetchPuzzles.tsx";
import breakpoints from "../../styles/media.tsx";

const Stage = styled.div`
  position: relative;
  height: 100vh;
`;

const Icon = styled.img`
  width: 60px;
  margin: 0px 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 8px;

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    color: #007302;
  }

  @media screen and (max-width: ${breakpoints.md}) {
    width: 30px;
    margin: 0px 5px;
    border-radius: 5px;
  }
`;

const Puzzles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const Puzzle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;

  @media screen and (max-width: ${breakpoints.md}) {
    width: 250px;
  }

  @media screen and (max-height: ${breakpoints.md}) {
    width: 150px;
  }
`;

const PuzzleLabel = styled.div`
  font-size: 48px;
  font-weight: 700;
`;

const PuzzlePreview = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 30px;
  box-shadow: 2px 4px 8px;

  ${({ idx }) =>
    idx === 0 &&
    `
    width: 300px;
    height: 300px;
  `}

  @media screen and (max-width: ${breakpoints.md}) {
    width: 250px;
    height: 250px;
  }

  @media screen and (max-height: ${breakpoints.md}) {
    width: 150px;
    height: 150px;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  bottom: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;

  .play-button {
    width: 300px;
    height: 80px;
    border-radius: 30px;
    background-color: #ffffff;
    text-align: center;
    line-height: 80px;
    font-size: 36px;
    font-weight: 900;
    box-shadow: 2px 4px 8px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      color: #000073;
    }

    @media screen and (max-height: ${breakpoints.md}) {
      width: 150px;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
    }
  }
`;

const DetailIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 8px;

  transition: transform 0.3s ease-in-out;
  z-index: 40;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    color: #c5dd0e;
  }
`;

const RankingModal = styled.div`
  position: absolute;
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 3px solid white;
  padding: 20px;
  background-color: rgba(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0px 0px 8px black;
  top: 40px;
  right: 40px;
  width: 100px;
  height: 100px;
  overflow: scroll;

  ${({ idx }) =>
    idx === 0 &&
    `
    width: 180px;
    height: 180px;
  `}
`;

const PlayTime = styled.div`
  font-size: 16px;
  margin-bottom: 4px;

  ${({ idx }) =>
    idx === 0 &&
    `
    font-size: 24px;
  `}
`;

function GameSelectPage() {
  const navigate = useNavigate();
  const { difficulty } = useParams();
  const { puzzles } = usePuzzlesStore();
  const { setIsComplete } = useAnswerStore();
  const { puzzlesIndex, setPuzzlesIndex } = usePuzzlesIndexStore();
  const { solvedPuzzles } = useSolvedPuzzlesStore();
  const { language } = useLanguageStore();
  const [allPuzzles, setAllPuzzles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isRankShown, setIsRankShown] = useState(false);
  const [ranking, setRanking] = useState([]);
  const [rankIndex, setRankIndex] = useState(-1);
  const [displayList, setDisplayList] = useState([-2, -1, 0, 1, 2]);

  useFetchPuzzles();

  useEffect(() => {
    setAllPuzzles(Object.entries(puzzles[difficulty]));
    setCurrentIndex(puzzlesIndex[difficulty]);
    setIsComplete(false);
  }, [puzzles[difficulty]]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < parseInt(breakpoints.lg, 10)) {
        setDisplayList([0]);
      } else if (window.innerWidth < parseInt(breakpoints["2xl"], 10)) {
        setDisplayList([-1, 0, 1]);
      } else {
        setDisplayList([-2, -1, 0, 1, 2]);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleIndexIncrease = () => {
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
        <Icon
          src={Back}
          onClick={handleIndexDecrease}
          style={{ visibility: `${currentIndex > 1 ? "visible" : "hidden"}` }}
        />
        {displayList.map((idx) => {
          const currentPuzzle = puzzles[difficulty][currentIndex + idx];
          const isSolved = solvedPuzzles[difficulty][currentIndex + idx];

          return currentPuzzle ? (
            <Puzzle key={currentPuzzle.title + currentPuzzle.size}>
              <PuzzlePreview idx={idx}>
                {difficulty !== "tutorial" && isSolved && (
                  <DetailIcon
                    src={Detail}
                    onClick={() => {
                      setRankIndex(currentIndex + idx);
                      setIsRankShown((prev) => !prev);
                      setRanking(currentPuzzle.ranking);
                    }}
                  />
                )}
                {isSolved &&
                  isRankShown &&
                  rankIndex === currentIndex + idx && (
                    <RankingModal idx={idx}>
                      <span>풀이 시간</span>
                      {ranking.map((time, i) => (
                        <PlayTime
                          key={time + i}
                          idx={idx}
                        >{`${i + 1}등 ${formatTime(ranking[i]).slice(3)}초`}</PlayTime>
                      ))}
                    </RankingModal>
                  )}
                {isSolved ? (
                  <Canvas
                    frameloop="demand"
                    resize={{ polyfill: ResizeObserver }}
                    style={{
                      background: currentPuzzle.subColor,
                      borderRadius: 20,
                    }}
                  >
                    <ambientLight intensity={1} />
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
                    frameloop="demand"
                    resize={{ polyfill: ResizeObserver }}
                    style={{
                      background: currentPuzzle.subColor,
                      borderRadius: 20,
                    }}
                  >
                    <ambientLight intensity={1} />
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
                {isSolved ? currentPuzzle.title : currentPuzzle.size.join("x")}
              </PuzzleLabel>
            </Puzzle>
          ) : (
            <Puzzle key={currentIndex + idx} />
          );
        })}
        <Icon
          src={Next}
          onClick={handleIndexIncrease}
          style={{
            visibility: `${allPuzzles.length > currentIndex ? "visible" : "hidden"}`,
          }}
        />
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
          {language === "English" ? "Play" : "시작"}
        </button>
      </PlayButton>
    </Stage>
  );
}

export default GameSelectPage;
