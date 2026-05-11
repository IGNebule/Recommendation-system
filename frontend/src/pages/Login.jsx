import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <br />
      <br />

      <button onClick={login}>Login</button>
    </div>
  );
}
