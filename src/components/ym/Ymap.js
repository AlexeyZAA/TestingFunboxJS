import React from "react";
import { YMaps, Map, GeoObject, Placemark } from "react-yandex-maps";

const mapState = { center: [53.353929, 83.768455], zoom: 15 };

class Ymap extends React.Component {
  state = {
    center: mapState.center
  };

  onBoundsChange = () => {
    this.setState({
      center: this.state.map.getCenter()
    });
  };

  instPoint = () => {
    alert(JSON.stringify(this.state.center))
  }

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
          />

        </YMaps>
        <div>Center: {JSON.stringify(this.state.center)}</div>
        <button onClick={() => this.instPoint()}>Ok</button>
      </div>
    );
  }
}
export default Ymap
