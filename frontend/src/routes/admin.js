import "../App.css";
import List from "../components/admin-list";
import React from "react";
const axios = require("axios").default;

class Admin extends React.Component {
  state = { tags: [], select: 0, delete: 0, tagname: "" };
  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8080/tags");
      let json = Object.values(response.data);
      this.setState({ tags: json });
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  }

  async handleNewTag() {
    try {
      const response = await axios.post("http://localhost:8080/tag", {
        tag: this.state.tagname,
      });
      let tmp = this.state.tags;
      tmp[tmp.length] = response.data;
      this.setState({ tags: tmp });
    } catch (error) {
      console.error(error);
    }
  }

  async handleTagDelete(id) {
    console.log(id);
    try {
      const response = await axios.delete("http://localhost:8080/tag/" + id);
      let tmp = [];
      let i = 0;
      this.state.tags.forEach((e) => {
        if (e.id !== id) tmp[i++] = e;
      });
      this.setState({ tags: tmp });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.select === 0) {
      let ui = this.state.tags.map((tag) => (
        <tr key={tag.id}>
          <td>
            <button onClick={() => this.setState({ select: tag.id })}>
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
          <button onClick={(e) => this.setState({ select: 0 })}>Go Back</button>
          <List tag={this.state.select}></List>
        </div>
      );
    }
  }
}

export default Admin;
