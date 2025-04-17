import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomesList from './Components/Home/HomesList';
import CreateUpdateHome from './Components/Home/CreateUpdateHome';
import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import Rents from './Components/Rents';
import MyRents from './Components/Rents/MyRents';
import './App.css';
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomesList />} />
        <Route path="add-home" element={<CreateUpdateHome />} />
        <Route path="signup" element={<Signup />} />
        <Route path="settings" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="all-rents" element={<Rents />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="my-rents" element={<MyRents />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
