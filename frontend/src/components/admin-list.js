import React from "react";
const axios = require("axios").default;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      tag: this.props.tag,
    };
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

  render() {
    let ui = this.state.words.map((word) => (
      <tr key={word.id}>
        <td key={word.english}>{word.english}</td>
        <td key={word.finnish}>{word.finnish}</td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
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
          <tbody>{ui}</tbody>
        </table>
        <button>Add New Words</button>
      </div>
    );
  }
}

export default List;
