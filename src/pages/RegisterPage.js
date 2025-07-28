import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";


const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [secPassword, setSecPassword] = useState('')
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== secPassword) {
        throw new Error("패스워드가 일치하지 않습니다 다시 입력해주세요");
      }
      const response = await api.post("/user", { name, email, password });
      if (response.status == 200) {
        navigate("/login"); //로그인 페이지로 이동동
      }
     //status 200이 아니면 catch로 이동하기 때문에  else문 무시 당함. else문 삭제제

      // api
    } catch (error) {
      const fallbackMessage = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요."; // '비밀번호 누락','이메일 중복', '비밀번호 불일치' 외의 기타 오류에 대한 기본 메시지
      const displayMessage = error?.response?.data?.message || error.message || fallbackMessage; //error?.response?.data?.message <-null일 때 오류 발생안하고 undefined
      setError(displayMessage); //  사용자에게 보여줄 적절한 오류 메시지를 설정
    }
  };

  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange = {(event) => setName(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange = {(event) => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange = {(event) => setPassword(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange = {(event) => setSecPassword(event.target.value)}/>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
