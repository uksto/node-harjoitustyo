import "../App.css";
import List from "../components/list";
import React from "react";
const axios = require("axios").default;

class Tags extends React.Component {
  state = { tags: [], select: 0, swap: false };
  async componentDidMount() {
    try {
      const response = await axios.get("http://localhost:8080/tags");
      let json = Object.values(response.data);
      this.setState({ tags: json });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.tags.length === 0) {
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
        return (
          <div>
            <h2>Select what words you want to learn</h2>
            <table>
              <tbody>{ui}</tbody>
            </table>
          </div>
        );
      } else {
        return (
          <div>
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
