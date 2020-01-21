import React, { Component } from "react";

import { YMaps, Map } from 'react-yandex-maps';

const mapState = { center: [53.353929, 83.768455], zoom: 13 };

class Ymap extends React.Component {
  state = { 
      showMap: true 
    };


  render() {
    const { showMap } = this.state;

    return (
      <YMaps>
        <div id="map-basics">
            <Map defaultState={mapState} width='700px' height='500px' />
        </div>
      </YMaps>
    );
  }
}

export default Ymap;
