import MainScreen from "./pages/mainScreen/mainScreen.jsx";
import StartPage from "./pages/startPage/startPage.jsx";
import Teste from "./pages/Teste/Teste.jsx";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/game" element={<MainScreen />} />
                <Route path="/teste" element={<Teste />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
