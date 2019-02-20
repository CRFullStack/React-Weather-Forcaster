import React, { Component } from "react";
import DisplayOverlay from "./DisplayOverlay";
import SideBar from "./SideBar";
import Footer from "./Footer";

import "../css/index.css";
const iconUrl = "http://openweathermap.org/img/w/"; // this is the base url for the openweathermap weather icon
const iconExt = ".png"; // all weathermap icons end with .png

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: "", // req  tempeture
      city: "", // req  city
      country: "", // req  country
      descr: "", // req  description of weather
      icon: "", // req  openweathermap icon
      loading: false // bool  is the page loading
    };
  }

  parentWeatherCallback = weatherData => {
    // @param obj  json request passed in from child component "SideBar"
    let tempeture = weatherData.main.temp;
    let _city = weatherData.name;
    let _country = weatherData.sys.country;
    let _descr = weatherData.weather[0].description;
    let _icon = iconUrl + weatherData.weather[0].icon + iconExt;
    this.setState({
      temp: tempeture,
      city: _city,
      country: _country,
      descr: _descr,
      icon: _icon
    });
  };

  isLoadingCallback = isLoading => {
    // @param bool  passed in from child component to see if the request is being sent
    this.setState({ loading: isLoading });
  };

  render() {
    let _isLoading = this.state.loading;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <div
              className={
                _isLoading ? "DisplayOverlayLoading" : "DisplayOverlay"
              } // a tenerany mainly for the loading bar background color
            >
              <div className="row">
                <div className="col-md-8">
                  <DisplayOverlay
                    temp={this.state.temp}
                    city={this.state.city}
                    country={this.state.country}
                    descr={this.state.descr}
                    icon={this.state.icon}
                    loading={this.state.loading}
                  />
                </div>
                <div className="col-sm-4 Side">
                  <SideBar
                    getWeatherData={this.parentWeatherCallback} // @param func  a function passed to the child to get weather json response
                    getLoadingState={this.isLoadingCallback} // @param func  a function passed to the child to check the loading status
                  />
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="Footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
