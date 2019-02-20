import React, { Component } from "react";
import "../css/index.css";

class DisplayOverlay extends Component {
  render() {
    let temp = this.props.temp;
    let city = this.props.city;
    let country = this.props.country;
    let descr = this.props.descr;
    let icon = this.props.icon;
    let loading = this.props.loading;

    // get loading status from parent, if true show the loading div
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
          <div>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              }
            />{" "}
          </div>
        </div>
      );
    } else {
      // if city & country is empty then show the default landing page which displays info & instructions
      if (city == "" && country == "") {
        return (
          <div>
            <p>Find the Weather by Entering a City & Country </p>
            <p>You must use country abbreviations, i.e. "US" or "JP" </p>
            <p>Or, make it easy by just typing the zip code</p>
            <img
              src={"http://openweathermap.org/img/w/01d.png"}
              alt={"Enter a country & city!"}
            />
          </div>
        );
      }
      // else return the result from the api get
      else {
        return (
          <div className="Results">
            <p>
              {city}, {country}
            </p>
            <p>{temp}&deg;F</p>
            <p>{descr}</p>
            <img src={icon} alt={"Uh oh, no pic :("} />
          </div>
        );
      }
    }
  }
}

export default DisplayOverlay;
