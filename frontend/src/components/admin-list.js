import React from "react";
const axios = require("axios").default;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      check: false,
      tag: this.props.tag,
      points: [],
      select: 0,
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

    if (this.state.words.length === 0) {
      return <p>loading...</p>;
    } else {
      if (this.state.select === 0) {
        let ui = this.state.tags.map((tag) => (
          <div key={tag.id}>
            <button onClick={() => this.setState({ select: tag.id })}>
              {tag.tag}
            </button>
          </div>
        ));
        return (
          <div>
            <h2>Select what tag you want to edit</h2>
            <ul>{ui}</ul>
          </div>
        );
      } else {
        return (
          <div>
            <button onClick={(e) => this.setState({ select: 0 })}>
              Go Back
            </button>
            <List tag={this.state.select}></List>
          </div>
        );
      }
    }
  }
}

export default List;
