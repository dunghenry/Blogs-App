import { useEffect } from 'react';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import { useDispatch } from 'react-redux';
import { setUser } from './store/reducers/authSlice';
function App() {
  const dispatch = useDispatch();
  const searchUser = localStorage.getItem("profile");
  useEffect(() => {
    dispatch(setUser(JSON.parse(searchUser)))
  }, [])
  return (
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
  );
}

export default App;
