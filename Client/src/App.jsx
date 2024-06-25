import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import Todo from "./Todo";
import Login from "./authentication/Login";
import NotFound from "./components/NotFound"; // A component to handle 404 errors

// Optional: Layout component for common layout structure across different routes
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        <Route
          path="home"
          element={<Home />}
        />
        <Route
          path="todo"
          element={<Todo />}
        />
        {/* Nested routes can go here if there are any components that share the same layout */}
        <Route
          path="*"
          element={<NotFound />}
        />{" "}
        {/* Handles any undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;
