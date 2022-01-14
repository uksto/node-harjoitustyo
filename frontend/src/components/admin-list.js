import React from "react";
const axios = require("axios").default;

/**
 * Conponent that handles editing selected tag and words
 */
class AdminList extends React.Component {
  /**
   * constructor
   *
   * props
   * @param {array} props props that are given in Admin component
   * @param {array} props.tag array that is selected tag
   * @param {function} props.handler function that handles tag name chane in Admin component
   *
   * state
   * @param {array} words words in selected tag
   * @param {int} tag id of selected tag
   * @param {string} tagname name of selected tag
   * @param {string} english English word that is added
   * @param {string} finnish Finnish word that is added
   */
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      tag: this.props.tag.id,
      english: "",
      finnish: "",
      tagname: this.props.tag.tag,
    };
  }

  /**
   * get all words with selected tag
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
   * handles posting new words
   */
  async handlePost() {
    if (this.state.english !== "" && this.state.finnish !== "") {
      try {
        const response = await axios.post("/words", {
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
        this.setState({ english: "" });
        this.setState({ finnish: "" });
      } catch (error) {
        console.error(error);
      }
    }
  }

  /**
   * handles deleting words
   */
  async handleDelete(id) {
    try {
      await axios.delete("/words/" + id);
      let tmp = [];
      let i = 0;
      this.state.words.forEach((e) => {
        if (e.id !== id) tmp[i++] = e;
      });
      this.setState({ words: tmp });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * handles editing tag name
   */
  async handleEdit() {
    try {
      await axios.patch("/tag", {
        id: this.state.tag,
        tag: this.state.tagname,
      });
      this.props.handler(this.state.tag, this.state.tagname);
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
        <input
          type="text"
          value={this.state.tagname}
          onChange={(e) => this.setState({ tagname: e.target.value })}
        />
        <button onClick={() => this.handleEdit()}>Edit</button>
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
                  value={this.state.english}
                  onChange={(e) => this.setState({ english: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={this.state.finnish}
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

export default AdminList;
