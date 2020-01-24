import React from "react";
import { YMaps, Map, GeoObject, Placemark, Circle } from "react-yandex-maps";

const mapState = { center: [53.353929, 83.768455], zoom: 15 };


const pointsarr = [
  {
    geometry: { type: 'Point',coordinates: [53.354160, 83.766278] },
    properties: { iconContent: '', hintContent: 'можно таскать'},
    options: { preset: 'islands#circleIcon', draggable: true}
  }
];

class Ymap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pointsmap: props.pointsarr,
    };
  }

  state = {
    center: mapState.center,
  };

  onBoundsChange = () => {
    this.setState({
      center: this.state.map.getCenter(),
    });
  };

  instPoint = () => {
    alert(JSON.stringify(this.state.center));
  };

  render() {
    return (
      <div>
        <YMaps>
          <Map
            width="100%"
            height="600px"
            state={mapState}
            instanceRef={map => this.setState({ map })}
            onBoundsChange={this.onBoundsChange}
          >

<GeoObject
        geometry={{
          type: 'Point',
          coordinates: [53.354512, 83.769869],
        }}
        properties={{
          iconContent: '',
          hintContent: 'можно таскать',
        }}
        options={{
          preset: 'islands#circleIcon',
          draggable: true,
        }}
      />

      {pointsarr.map((pointParams, i) =>
        <Placemark key={i} {...pointParams} />
      )}
          </Map>
        </YMaps>
        <div>Center: {JSON.stringify(this.state.center)}</div>
        <button onClick={() => this.instPoint()}>Ok</button>
      </div>
    );
  }
}
export default Ymap;
