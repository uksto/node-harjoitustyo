import React from "react";
import Word from "../components/word";
const axios = require("axios").default;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      check: false,
      tag: 1,
      points: [],
    };

    this.handler = this.handler.bind(this);
  }

  handler(id) {
    let tmp = this.state.points;
    tmp[id] = 1;
    this.setState({
      points: tmp,
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        "http://localhost:8080/words/tag/" + this.state.tag
      );
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
    console.log(this.state.points);
    let pointsCount = 0;
    this.state.points.forEach((point) => {
      if (point == 1) pointsCount++;
    });

    if (this.state.words.length === 0) {
      return <p>loading...</p>;
    } else {
      let i = 0;
      let ui = this.state.words.map((word) => (
        <Word
          key={word.id}
          count={i++}
          pair={word}
          check={this.state.check}
          handler={this.handler}
        />
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
          {pointsCount}
        </div>
      );
    }
  }
}

export default List;
