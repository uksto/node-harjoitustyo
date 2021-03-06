import "../App.css";
import List from "../components/list";
import React from "react";
const axios = require("axios").default;

/**
 * Site that Shows user a list of tags to choose from
 */
class Tags extends React.Component {
  /**
   * state
   * @param {array} tags array that contains all tags
   * @param {int} select id of selected tag
   * @param {boolean} swap boolean if you want to guess words the other way around
   */
  state = { tags: [], select: 0, swap: false };

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
  }

  render() {
    if (this.state.tags.length === 0) {
      /**
       * Render this if tags are not yet found
       */
      return <p>loading...</p>;
    } else {
      if (this.state.select === 0) {
        let ui = this.state.tags.map((tag) => (
          <tr key={tag.id}>
            <td>{tag.tag}</td>
            <td>
              <button
                onClick={() => this.setState({ select: tag.id, swap: false })}
              >
                Practice Finnish
              </button>
            </td>
            <td>
              <button
                onClick={() => this.setState({ select: tag.id, swap: true })}
              >
                Practice English
              </button>
            </td>
          </tr>
        ));
        /**
         * Render List of tags if tag is not selected
         */
        return (
          <div>
            <h2>Select what words you want to learn</h2>
            <table>
              <tbody>{ui}</tbody>
            </table>
          </div>
        );
      } else {
        /**
         * Render List of words if tag is selected
         */
        return (
          <div>
            <h2>Translate given words and press Check answers</h2>
            <button onClick={(e) => this.setState({ select: 0 })}>
              Go Back
            </button>
            <List tag={this.state.select} swap={this.state.swap}></List>
          </div>
        );
      }
    }
  }
}

export default Tags;
