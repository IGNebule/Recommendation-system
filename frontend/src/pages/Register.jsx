import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const register = async () => {
    try {
      await API.post("/auth/register", form);

      alert("Register success");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Register failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

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

      <button onClick={register}>Register</button>
    </div>
  );
}
