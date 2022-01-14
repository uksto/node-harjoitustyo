import "../App.css";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to Learn English! site</h2>
        <p>
          In this site you can learn English or Finnish words.{" "}
          <b>Learn Words</b> tab is the place to start learning. <b>Admin</b>{" "}
          tab is the place for admins to edit word lists and tags.
        </p>
      </div>
    );
  }
}

export default App;
