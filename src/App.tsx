import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import AlbumPage from "./pages/Album/Album";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/album/:id" element={<AlbumPage />} />
      </Routes>
    </Router>
  );
}

export default App;
