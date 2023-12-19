import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/Website/HomePage';
import LoginPage from './Pages/Website/LoginPage';
import RegisterPage from './Pages/Website/RegisterPage'
import NoPage from './Pages/Website/NoPage';
import AppPage from './Pages/App/AppPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="app" element={<AppPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App
