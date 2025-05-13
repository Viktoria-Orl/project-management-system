import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Issues from "./pages/Issues";
import Boards from "./pages/Boards";
import BoardDetailsPage from "./pages/BoardDetails";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./state/store";
import TaskModal from "./components/TaskModal";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/issues" replace />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/board/:id" element={<BoardDetailsPage />} />
        </Routes>
        <TaskModal />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
