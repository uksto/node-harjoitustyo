import React from "react";

class Word extends React.Component {
  state = {
    pair: [this.props.pair],
    check: false,
    input: "",
  };

  render() {
    let ui = this.state.pair.map((word) => (
      <tr key={word.id}>
        <td key={word.english}>{word.english}</td>
        <td key={word.finnish}>
          <input
            type="text"
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          {this.state.input}
        </td>
      </tr>
    ));
    return <tbody>{ui}</tbody>;
  }
}

export default Word;
