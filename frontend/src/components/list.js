import React from "react";
import Word from "../components/word";
const axios = require("axios").default;

/**
 * Component that Shows user a list of words and inputs
 */
class List extends React.Component {
  /**
   * constructor
   *
   * props
   * @param {array} props props that are given in Tags component
   * @param {boolean} props.swap boolean if you want to guess words the other way around
   *
   * state
   * @param {array} words array that contains all tag
   * @param {boolean} check boolean to initiate word check
   * @param {int} tag id of selected tag
   * @param {array} points array with all collected points
   */
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

  /**
   * handles that counts score
   * @param {int} id word id that was correct
   */
  handler(id) {
    let tmp = this.state.points;
    tmp[id] = 1;
    this.setState({
      points: tmp,
    });
  }

  /**
   * get all words from with specific tag
   */
  async componentDidMount() {
    try {
      const response = await axios.get("/words/tag/" + this.state.tag);
      let json = Object.values(response.data);
      this.setState({ words: json });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * function to count points
   */
  countPoints() {
    let pointsCount = 0;
    this.state.points.forEach((point) => {
      if (point === 1) pointsCount++;
    });
    return pointsCount + "/" + this.state.words.length;
  }

  render() {
    let pointsCount = this.countPoints();

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
      /**
       * Render this if tags are not yet found
       */
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
      /**
       * Render List of words
       */
      return (
        <div>
          <table>
            {header}
            {ui}
          </table>
          <p>Score: {pointsCount}</p>
          <button
            onClick={() =>
              this.setState({
                check: true,
              })
            }
            disabled={this.state.check}
          >
            Check answers
          </button>
        </div>
      );
    }
  }
}

export default List;
