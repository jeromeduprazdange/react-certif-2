import Header from "./components/Layout/Header";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Teams from "./pages/Teams/Teams";
import GameResults from "./pages/GameResults/GameResults";
import TeamsContextProvider from "./store/TeamsProvider";

function App() {
  return (
    <Router>
      <TeamsContextProvider>
        <Header></Header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Teams />} />
            <Route path="/results/:code" element={<GameResults />} />
          </Routes>
        </main>
      </TeamsContextProvider>
    </Router>
  );
}

export default App;
