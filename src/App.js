import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useState, useEffect  } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api"; // 현재 경로라서 . <- 한개만

function App() {
  const [user, setUser] = useState(null); // 다른 곳에서 user 정보를 사용할 수 있어야하기 때문에 App.js에 변수 선언
  const getUser = async () => { // 토큰을 통해 유저 정보 가져옴
    try {
      const StoredToken = sessionStorage.getItem("token");
      if(StoredToken){
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
      
    } catch (error) {
      setUser(null);
    }
  };
  useEffect(() => {
    getUser();
  }, []);  // 처음 한번만 실행 [user] <- 이거면 user 변경시마다 실행
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute user ={user}><TodoPage /></PrivateRoute>} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
