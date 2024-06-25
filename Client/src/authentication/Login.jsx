import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [capsLock, setCapsLock] = useState(false);
  const {login} = useContext(AuthContext);
  const [init, setInit] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const handleCapsLock = event => {
      setCapsLock(event.getModifierState("CapsLock"));
    };
    window.addEventListener("keydown", handleCapsLock);
    window.addEventListener("keyup", handleCapsLock);

    return () => {
      window.removeEventListener("keydown", handleCapsLock);
      window.removeEventListener("keyup", handleCapsLock);
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const loginData = {identifier, password};

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.headers.get("content-type")?.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          login(data);
          navigate("/profile");
        } else {
          setError(data.error); // Set the error message
          console.error("Login failed:", data.error);
        }
      } else {
        const errorText = await response.text();
        setError(errorText); // Set the error message from text response
        console.error("Expected JSON response, got something else.");
      }
    } catch (error) {
      setError("Error logging in");
      console.error("Error logging in:", error);
    }
  };

  const particlesLoaded = container => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d47a1",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {min: 1, max: 5},
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex items-center justify-center">
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
          className="absolute inset-0 z-0"
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-xs px-4 py-6 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded shadow-lg relative z-10"
      >
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div>
          <label
            htmlFor="identifier"
            className="block mb-2"
          >
            Email or Display Name
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            autoFocus
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
          {capsLock && (
            <p className="text-red-500 text-sm mt-2">Caps lock is on</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
            />
            <span className="ml-2">Keep me logged in</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="text-center mt-4">
          <p>
            {`Don't have an account?`}{" "}
            <Link
              to="/register"
              className="text-green-500 hover:underline"
            >
              Registration
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
