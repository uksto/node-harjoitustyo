import "../App.css";
import List from "../components/admin-list";
import React from "react";
const axios = require("axios").default;

class Admin extends React.Component {
  state = { tags: [], select: [], delete: 0, tagname: "" };
  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8080/tags");
      let json = Object.values(response.data);
      this.setState({ tags: json });
    } catch (error) {
      console.error(error);
    }
    this.handler = this.handler.bind(this);
  }

  async handleNewTag() {
    try {
      const response = await axios.post("http://localhost:8080/tag", {
        tag: this.state.tagname,
      });
      let tmp = this.state.tags;
      tmp[tmp.length] = response.data;
      this.setState({ tags: tmp });
      this.setState({ tagname: "" });
    } catch (error) {
      console.error(error);
    }
  }

  async handleTagDelete(id) {
    try {
      await axios.delete("http://localhost:8080/tag/" + id);
      let tmp = [];
      let i = 0;
      this.state.tags.forEach((e) => {
        if (e.id !== id) tmp[i++] = e;
      });
      this.setState({ tags: tmp });
    } catch (error) {
      console.error(error);
    }
  }

  handler(id, tag) {
    let tmp = this.state.tags;
    let i = 0;
    this.state.tags.forEach((e) => {
      if (e.id === id) tmp[i].tag = tag;
      i++;
    });
    this.setState({
      tags: tmp,
    });
  }

  render() {
    if (this.state.select.length < 1) {
      let ui = this.state.tags.map((tag) => (
        <tr key={tag.id}>
          <td>
            <button onClick={() => this.setState({ select: tag })}>
              {tag.tag}
            </button>
          </td>
          <td>
            <button onClick={() => this.handleTagDelete(tag.id)}>Delete</button>
          </td>
        </tr>
      ));
      return (
        <div>
          <h2>Select what words you want to learn</h2>
          <table>
            <tbody>
              {ui}
              <tr>
                <td>
                  <input
                    type="text"
                    value={this.state.tagname}
                    onChange={(e) => this.setState({ tagname: e.target.value })}
                  />
                </td>
                <td>
                  <button onClick={() => this.handleNewTag()}>
                    Add new Tag
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={(e) => this.setState({ select: [] })}>
            Go Back
          </button>
          <List tag={this.state.select} handler={this.handler}></List>
        </div>
      );
    }
  }
}

export default Admin;
