import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/todo">Todo</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <Outlet /> {/* Renders the current route's component */}
      </main>
      <footer>
        <p>Footer Content Here</p>
      </footer>
    </div>
  );
}

export default Layout;
