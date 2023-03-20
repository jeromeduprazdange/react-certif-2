import Header from "./components/Layout/Header";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Teams from "./pages/Teams/Teams";
import GameResults from "./pages/GameResults/GameResults";
import TrackedTeamsContextProvider from "./store/TrackedTeamsProvider";

function App() {
  return (
    <Router>
      <TrackedTeamsContextProvider>
        <Header></Header>
        <Link to="/">teams</Link>
        <Link to="/results">results</Link>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Teams />} />
            <Route path="/results/:code" element={<GameResults />} />
          </Routes>
        </main>
      </TrackedTeamsContextProvider>
    </Router>
  );
}

export default App;
