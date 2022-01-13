import "./App.css";
import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <main
      style={{
        padding: "1rem",
        backgroundColor: "lightgray",
      }}
    >
      <h1>Cool Cars Site</h1>
      <nav>
        <Link to="/">
          <span>Frontpage</span>
        </Link>
        <Link to="/tags">
          <span>Word lists</span>
        </Link>
        <Link to="/admin">
          <span>Admin</span>
        </Link>
      </nav>
      <Outlet />
      <p style={{ background: "gray", textAlign: "center" }}>
        Author: Staff Sergeant Griggs
      </p>
    </main>
  );
}

export default App;
