import React from "react";

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pair: [this.props.pair],
      input: "",
      output: "",
    };
  }

  componentDidUpdate() {
    if (this.props.check && this.state.output === "") {
      console.log("yeet");
      this.props.pair.finnish === this.state.input
        ? this.setState({ output: "correct" })
        : this.setState({ output: "wrong" });
    }
  }

  render() {
    let ui = this.state.pair.map((word) => (
      <tr key={word.id}>
        <td key={word.english}>{word.english}</td>
        <td key={word.finnish}>
          <input
            type="text"
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          {this.state.output}
        </td>
      </tr>
    ));
    return <tbody>{ui}</tbody>;
  }
}

export default Word;
