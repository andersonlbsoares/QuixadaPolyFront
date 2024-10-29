import MainScreen from './pages/mainScreen/mainScreen.jsx';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
