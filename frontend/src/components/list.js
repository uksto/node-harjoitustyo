import React from "react";
import Word from "../components/word";
const axios = require("axios").default;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      check: false,
      tag: this.props.tag,
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
    let pointsCount = 0;
    this.state.points.forEach((point) => {
      if (point === 1) pointsCount++;
    });
    pointsCount = pointsCount + "/" + this.state.words.length;

    let header = (
      <thead>
        <tr>
          <th>English</th>
          <th>Finnish</th>
        </tr>
      </thead>
    );
    if (this.props.swap) {
      header = (
        <thead>
          <tr>
            <th>Finnish</th>
            <th>English</th>
          </tr>
        </thead>
      );
    }

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
          swap={this.props.swap}
        />
      ));
      return (
        <div>
          <table>
            {header}
            {ui}
          </table>
          <p>Score: {pointsCount}</p>
          <button onClick={this.handleClick} disabled={this.state.check}>
            Check answers
          </button>
        </div>
      );
    }
  }
}

export default List;
