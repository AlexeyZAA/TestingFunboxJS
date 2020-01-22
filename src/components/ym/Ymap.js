import React, { Component } from "react";

import { YMaps, Map, GeoObject, Placemark } from "react-yandex-maps";

const mapState = { center: [53.353929, 83.768455], zoom: 15 };

let geoArr = [<Placemark geometry={{ type: 'Circle', coordinates: [53.353741, 83.768138], radius: 15 }} />, <Placemark geometry={{ type: 'Circle', coordinates: [53.353741, 83.768138], radius: 15 }} />];

const Ymap = () => (
  <YMaps>
    <Map state={mapState} width="700px" height="500px">

    </Map>
  </YMaps>
);

export default Ymap
