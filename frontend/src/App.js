import "./App.css";
import React from "react";
const axios = require("axios").default;

class App extends React.Component {
  state = { words: [] };
  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8080/words");
      let json = Object.values(response.data);
      this.setState({ words: json });
    } catch (error) {
      console.error(error);
    }
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
