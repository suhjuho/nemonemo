import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import GameStage from "./GameStage/GameStage";

import "./styles.css";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<MainPage />} />
      <Route path="/puzzles/:difficulty/:stageNumber" element={<GameStage />} />
    </Routes>
  );
}

export default App;
