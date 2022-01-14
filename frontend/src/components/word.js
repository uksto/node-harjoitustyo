import React from "react";

/**
 * Conponent that handles word pairs and checks
 */
class Word extends React.Component {
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
