import React from "react";
import { YMaps, Map, GeoObject, Placemark, Circle } from "react-yandex-maps";

const mapState = { center: [53.353929, 83.768455], zoom: 15 };

const t = [{"geometry":{"type":"Point","coordinates":[53.35416,83.766278]},
"properties":{"iconContent":"","hintContent":"можно таскать"},
"options":{"preset":"islands#circleIcon","draggable":true}}];

class Ymap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: mapState.center,
     };

    this.state = {
      point: this.props.pointsarr
    };
  }

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
            {t.map((pointParams, i) => (
              <Placemark key={i} {...pointParams} />
            ))}
          </Map>
        </YMaps>
        <div>Center: {JSON.stringify(this.state.center)}</div>
        <button onClick={() => this.instPoint()}>Ok</button>
        <button
          onClick={() => alert(JSON.stringify(this.props.pointsarr[0].par))}
        >
          Point
        </button>
      </div>
    );
  }
}
export default Ymap;
