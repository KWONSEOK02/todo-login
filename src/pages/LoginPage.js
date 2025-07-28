import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate, Navigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = ({user, setUser}) => { // App.js 에서 setUser 가져옴
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (event)=>{
    event.preventDefault() // 새로고침 막음
    try{
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token; //"Bearer "가 있어야 토큰이라고 알 수 있음. 토큰만 보내면 무시 당할 수 있다. 인증을 위해 Axios의 요청 헤더에 토큰을 자동으로 포함시키는 설정
        setError("");
        navigate("/");
      }
      throw new Error(response.message);
    } catch (error) {
        setError(error.message);
    }

  };

  if (user) {
    console.log("You don't have to login");  // 이미 로그인되어 있으므로 로그인 페이지 접근 차단
    return <Navigate to="/" />
  }
  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
