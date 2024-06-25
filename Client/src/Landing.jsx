import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import workgif from "../icons/workgif.gif";

export default function Landing() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("mytoken")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e, isLogin) => {
    e.preventDefault();
    const {name, email, password} = e.target.elements;

    const url = isLogin ? "/login" : "/register";
    const params = isLogin
      ? {email: email.value, password: password.value}
      : {username: name.value, email: email.value, password: password.value};

    try {
      const {data} = isLogin
        ? await axios.get(url, {params})
        : await axios.post(url, params);
      if (data.is_success || data === "Successfully registered") {
        window.localStorage.setItem("mytoken", data.data?.token);
        navigate("/home");
      } else {
        alert(data.error || data);
      }
    } catch (error) {
      console.error(isLogin ? "Login error:" : "Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form onSubmit={e => handleSubmit(e, isLogin)}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              className="input text-lg w-full mb-4"
              required
              placeholder="Username"
            />
          )}
          <input
            type={isLogin ? "text" : "email"}
            name="email"
            className="input text-lg w-full mb-4"
            required
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            className="input text-lg w-full mb-4"
            required
            placeholder="Password"
          />
          <button
            type="submit"
            className="btn w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <div className="text-center">
            <label className="inline-block text-gray-600">
              {isLogin ? "Don't have an account?" : "Have an account?"}
              <input
                type="checkbox"
                className="ml-2 align-middle"
                onChange={() => setIsLogin(!isLogin)}
              />
            </label>
          </div>
        </form>
      </div>
      <div className="mt-6">
        <img
          src={workgif}
          alt="Relax and work"
          className="h-32 md:h-48"
        />
        <p className="mt-4 text-gray-600">
          Organize your daily tasks efficiently
        </p>
      </div>
    </div>
  );
}
