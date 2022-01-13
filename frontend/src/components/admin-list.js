import React from "react";
const axios = require("axios").default;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      tag: this.props.tag,
      english: "",
      finnish: "",
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

  async handlePost() {
    if (this.state.english !== "" && this.state.finnish !== "") {
      try {
        const response = await axios.post("http://localhost:8080/words", {
          english: this.state.english,
          finnish: this.state.finnish,
          tag: this.state.tag,
        });
        let tmp = this.state.words;
        tmp[tmp.length] = {
          id: response.data.id,
          english: response.data.english,
          finnish: response.data.finnish,
          tag: response.data.tag,
        };
        this.setState({ words: tmp });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async handleDelete(id) {
    console.log(id);
    try {
      const response = await axios.delete("http://localhost:8080/words/" + id);
      let tmp = [];
      let i = 0;
      this.state.words.forEach((e) => {
        if (e.id !== id) tmp[i++] = e;
      });
      this.setState({ words: tmp });
      console.log(response);
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
          <button onClick={() => this.handleDelete(word.id)}>Delete</button>
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
          <tbody>
            {ui}
            <tr>
              <td>
                <input
                  type="text"
                  onChange={(e) => this.setState({ english: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  onChange={(e) => this.setState({ finnish: e.target.value })}
                />
              </td>
              <td>
                <button onClick={() => this.handlePost()}>Add New Words</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default List;
