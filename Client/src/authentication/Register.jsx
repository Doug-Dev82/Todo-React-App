import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { bold, green, red } from "colorette";
import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {register} = useContext(AuthContext);
  const navigate = useNavigate();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register({email, password, displayName});
      console.log(
        bold(
          green(
            "New user has been stored in the database! Redirecting to newly created profile page. Enjoy!"
          )
        )
      );
      navigate("/profile");
    } catch (error) {
      console.error(
        bold(red("Error while attempting to register new user:", error))
      );
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
          loaded={particlesLoaded}
          options={options}
          className="absolute inset-0 z-0"
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full max-w-xs px-4 py-6 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded shadow-lg relative z-10"
      >
        <h2 className="text-xl font-bold text-center mb-4">Register</h2>
        <div>
          <label
            htmlFor="displayName"
            className="block mb-2"
          >
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
            autoFocus
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
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
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <div className="text-center mt-4">
          <p>
            {`Already have an account?`}{" "}
            <Link
              to="/login"
              className="text-green-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
