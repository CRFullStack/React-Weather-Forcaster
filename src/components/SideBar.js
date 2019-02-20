import React, { Component } from "react";
import axios from "axios";

// Below is an example of the api call to openweathermap
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
// api.openweathermap.org/data/2.5/weather?zip=94040,us
// https://samples.openweathermap.org/data/2.5/weather?zip=94040,us&appid=b6907d289e10d714a6e88b30761fae22

// Create a base Api call
const API = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`
});

// Open weather map needs an api key that needs to be sent on every request
const key = "d784be93be15800f0ee2c677f6cebbe2";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      zip: "",
      city: "",
      weather: "",
      loading: false
    };
  }

  // method to update the input field when a user types. The [] around "event.target.name" dynamically set the key name
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // method to handle the button click, it performs the get request via axios, then sends the json data up to the parent (app.js)
  handleSubmit = async event => {
    event.preventDefault();

    // displays the loading bar while the get request proceeds
    this.setState({ loading: true });
    this.props.getLoadingState(this.state.loading);

    let response;

    if (this.state.zip != "") {
      response = await API.get(
        `/weather?zip=${this.state.zip},us&units=imperial&APPID=${key}`
      );
    } else {
      response = await API.get(
        `/weather?q=${this.state.city},${
          this.state.country
        }&units=imperial&APPID=${key}`
      );
    }
    // Promise is resolved and value is inside of the response const.

    // Sends json data to parent
    this.props.getWeatherData(response.data);
    this.setState({
      country: "",
      city: "",
      weather: ""
    });

    // remove the loading bar after the request is finished
    this.setState({ loading: false });
    this.props.getLoadingState(this.state.loading);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={this.state.country}
            placeholder=""
            onChange={this.handleChange}
          />
          City:
          <input
            type="text"
            name="city"
            value={this.state.city}
            placeholder=""
            onChange={this.handleChange}
          />
          OR
          <br />
          <br />
          Zip Code:
          <input
            type="text"
            name="zip"
            value={this.state.zip}
            placeholder=""
            onChange={this.handleChange}
          />
        </label>
        <input className="btn btn-primary" type="submit" value="weather!" />
      </form>
    );
  }
}

export default SideBar;
