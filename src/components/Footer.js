import React, { Component } from "react";
import "../css/index.css";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <span>
          &copy;Chris Hobdy 2019 |&nbsp;
          <a href="https://hobdy-resume.herokuapp.com/">
            hobdy.chris02@gmail.com
          </a>
        </span>
      </div>
    );
  }
}
