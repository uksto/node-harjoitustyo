import "../App.css";
import List from "../components/admin-list";
import React from "react";
const axios = require("axios").default;

class Admin extends React.Component {
  state = { words: [], tags: [] };
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
          <div key={tag.id}>
            <button onClick={() => this.setState({ select: tag.id })}>
              {tag.tag}
            </button>
          </div>
        ));
        return (
          <div>
            <h2>Select what words you want to learn</h2>
            <ul>{ui}</ul>
          </div>
        );
      } else {
        return (
          <div>
            <button onClick={(e) => this.setState({ select: 0 })}>
              Go Back
            </button>
            <List tag={this.state.select}></List>
          </div>
        );
      }
    }
  }
}

export default Admin;
