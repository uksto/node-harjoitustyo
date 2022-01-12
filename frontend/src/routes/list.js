import React from "react";
import Word from "../components/word";
const axios = require("axios").default;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      check: false,
    };
  }
  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8080/words");
      let json = Object.values(response.data);
      this.setState({ words: json });
    } catch (error) {
      console.error(error);
    }
  }

  handleClick = () => {
    this.setState({
      check: true,
    });
  };

  render() {
    if (this.state.words.length === 0) {
      return <p>loading...</p>;
    } else {
      let ui = this.state.words.map((word) => (
        <Word key={word.id} pair={word} check={this.state.check} />
      ));
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>English</th>
                <th>Finnish</th>
              </tr>
            </thead>
            {ui}
          </table>
          <button onClick={this.handleClick}>Check answers</button>
        </div>
      );
    }
  }
}

export default List;
