import React from "react";

/**
 * Conponent that handles word pairs and checks
 */
class Word extends React.Component {
  /**
   * constructor
   *
   * props
   * @param {array} props props that are given in List component
   * @param {boolean} props.swap boolean if you want to guess words the other way around
   * @param {array} props.pair word pair array
   * @param {boolean} props.check boolean to initiate word check
   *
   * state
   * @param {array} pair word pair array
   * @param {string} input the word that user guessed
   * @param {string} output string that tells if user was right or wrong
   */
  constructor(props) {
    super(props);
    this.state = {
      pair: [this.props.pair],
      input: "",
      output: "",
    };
  }

  /**
   * Handles checking for right answers
   */
  componentDidUpdate() {
    if (this.props.check && this.state.output === "") {
      if (
        (this.props.pair.finnish === this.state.input && !this.props.swap) ||
        (this.props.pair.english === this.state.input && this.props.swap)
      ) {
        this.setState({ output: "correct" });
        this.props.handler(this.props.count);
      } else {
        this.setState({ output: "wrong" });
      }
    }
  }

  render() {
    let ui;

    if (this.props.swap) {
      /**
       * Render this if word pairs are swapped
       */
      ui = this.state.pair.map((word) => (
        <tr key={word.id}>
          <td key={word.finnish}>{word.finnish}</td>
          <td key={word.english}>
            <input
              type="text"
              onChange={(e) => this.setState({ input: e.target.value })}
            />
          </td>
          <td>{this.state.output}</td>
        </tr>
      ));
    } else {
      /**
       * Render this if word pairs are not swapped
       */
      ui = this.state.pair.map((word) => (
        <tr key={word.id}>
          <td key={word.english}>{word.english}</td>
          <td key={word.finnish}>
            <input
              type="text"
              onChange={(e) => this.setState({ input: e.target.value })}
            />
          </td>
          <td>{this.state.output}</td>
        </tr>
      ));
    }

    return <tbody>{ui}</tbody>;
  }
}

export default Word;
