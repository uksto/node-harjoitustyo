import React from "react";

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pair: [this.props.pair],
      input: "",
    };
  }

  render() {
    let result;
    if (this.props.check) {
      result =
        this.props.pair.finnish === this.state.input ? " correct" : " wrong";
      console.log(this.props.pair.finnish);
    }
    let ui = this.state.pair.map((word) => (
      <tr key={word.id}>
        <td key={word.english}>{word.english}</td>
        <td key={word.finnish}>
          <input
            type="text"
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          {result}
        </td>
      </tr>
    ));
    return <tbody>{ui}</tbody>;
  }
}

export default Word;
