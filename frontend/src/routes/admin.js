import "../App.css";
import List from "../components/admin-list";
import React from "react";
const axios = require("axios").default;

/**
 * Site that Shows admin a list of tags to edit
 */
class Admin extends React.Component {
  /**
   * state
   * @param {array} tags array that contains all tags
   * @param {array} select selected tag object
   * @param {int} delete id of a tag to be deleted
   * @param {string} tagname name of a tag that is created
   */
  state = { tags: [], select: [], delete: 0, tagname: "" };

  /**
   * get all tags
   */
  async componentDidMount() {
    try {
      const response = await axios.get("/tags");
      let json = Object.values(response.data);
      this.setState({ tags: json });
    } catch (error) {
      console.error(error);
    }
    this.handler = this.handler.bind(this);
  }

  /**
   * function that handles adding new tag
   */
  async handleNewTag() {
    try {
      const response = await axios.post("/tag", {
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

  /**
   * function that handles deleting tag
   */
  async handleTagDelete(id) {
    try {
      await axios.delete("/tag/" + id);
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

  /**
   * function that handles setting a new tagname to state
   */
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
      /**
       * Render this if a tag is not selected
       */
      return (
        <div>
          <h2>Select what tag you want to edit</h2>
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
      /**
       * Render this if a tag is selected
       */
      return (
        <div>
          <h2>Edit Tag name or list of words</h2>
          <button onClick={() => this.setState({ select: [] })}>Go Back</button>
          <List tag={this.state.select} handler={this.handler}></List>
        </div>
      );
    }
  }
}

export default Admin;
