import { Route, Routes } from "react-router-dom";

import MainPage from "./MainPage/MainPage.tsx";
import GameStage from "./GameStage/GameStage.tsx";
import GameSelectPage from "./GameSelectPage/GameSelectPage.tsx";
import TutorialGameStage from "./GameStage/TutorialGameStage.tsx";
import CustomPuzzle from "./CustomPuzzle/CustomPuzzle.tsx";
import BackgroundMusic from "./BackgroundMusic/BackgroundMusic.tsx";
import "./styles.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/puzzles/:difficulty/" element={<GameSelectPage />} />
        <Route
          path="/puzzles/tutorial/:stageNumber"
          element={<TutorialGameStage />}
        />
        <Route
          path="/puzzles/:difficulty/:stageNumber"
          element={<GameStage />}
        />
        <Route path="/puzzle/making" element={<CustomPuzzle />} />
      </Routes>
      <BackgroundMusic />
    </>
  );
}

export default App;
