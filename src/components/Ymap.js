import React from 'react'
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps'

const mapState = { center: [53.353929, 83.768455], zoom: 15 }

class Ymap extends React.Component {
  constructor(props) {
    super(props)
    this.setCoordPoint = this.setCoordPoint.bind(this)
    this.resCenter = this.resCenter.bind(this)
  }

  state = {
    center: mapState.center,
  }

  onBoundsChange = () => {
    this.setState({ center: this.state.map.getCenter() }, () => {
      this.resCenter(this.state.center)
    })
  }

  resCenter = p => {
    this.props.setCenter(this.state.center)
  }

  setCoordPoint = (coord, e) => {
    this.props.CoordPoint(coord, e)
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
          >
            {this.props.items.map((pointParams, i) => (
              <Placemark
                onDrag={e => this.setCoordPoint(i, e)}
                key={i}
                {...pointParams.par}
              />
            ))}

            <Polyline
              geometry={{
                coordinates: this.props.points,
              }}
              properties={{
                hintContent: 'Редактируйте маршрут',
                balloonContentHeader: 'Строим маршрут',
                balloonContentBody: 'Описание маршрута',
                balloonContentFooter: 'Маршрут Иванова И.И.',
              }}
              options={{
                strokeColor: '#00000088',
                editorMaxPoints: 0,
                strokeWidth: 10,
                strokeOpacity: 0.5,
                editorMenuManager: function(items) {
                  items.push({
                    title: 'Дополнительный пункт меню',
                    onClick: e => {
                      alert('JSON.stringify(e)')
                    },
                  })
                  return items
                },
              }}
            />
          </Map>
        </YMaps>
      </div>
    )
  }
}

export default Ymap
