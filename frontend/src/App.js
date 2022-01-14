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
      <h1>Learn English!</h1>
      <nav>
        <Link to="/">
          <span>Frontpage</span>
        </Link>
        <Link to="/tags">
          <span>Learn Words</span>
        </Link>
        <Link to="/admin">
          <span>Admin</span>
        </Link>
      </nav>
      <Outlet />
      <p style={{ background: "gray", textAlign: "center" }}>
        Author: Otto Kujala
      </p>
    </main>
  );
}

export default App;
