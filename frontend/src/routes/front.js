import "../App.css";
import React from "react";
const axios = require("axios").default;

class App extends React.Component {
  state = { words: [] };
  async componentDidMount() {
    try {
      const response = await axios.get("/tags");
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
          {word.id} - {word.tag}
        </li>
      ));
      return <ul>{ui}</ul>;
    }
  }
}

export default App;
