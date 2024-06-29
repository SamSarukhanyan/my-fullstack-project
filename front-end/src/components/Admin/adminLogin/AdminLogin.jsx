import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../context/AuthContext';
import "./adminLogin.css";

const AdminLogin = () => {
  const { handleLogin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4600/api/login", {
        username,
        password,
      });
      console.log(response.data);

      const isAdmin = response.data.isAdmin;

      if (!isAdmin) {
        throw new Error("User is not an admin");
      }

      const token = response.data.token;
      localStorage.setItem("adminToken", token);
      setUsername("");
      setPassword("");
      setError("");
      handleLogin(); // Вызываем функцию обработчика успешной аутентификации
      navigate("/admin/properties");
    } catch (error) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <h2>Living Invest Մուտք</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Անուն:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Գաղտնաբառ:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Մուտք"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
