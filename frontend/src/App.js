import logo from "./logo.svg";
import "./App.css";
import React from "react";

class App extends React.Component {
  state = { words: [] };
  async componentDidMount() {
    let hr = await fetch("http://localhost:8080/words");
    let json = await hr.json();
    this.setState({ words: json });
  }
  render() {
    if (this.state.words.length === 0) {
      return <p>loading...</p>;
    } else {
      let ui = this.state.words.map((word) => (
        <li key={word.id}>
          {word.id} - {word.finnish} - {word.english}
        </li>
      ));
      return <ul>{ui}</ul>;
    }
  }
}

export default App;
