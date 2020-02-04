import React from 'react'

import { Layout } from 'antd'

import arrayMove from 'array-move'
import './Layout.css'
import Sid from './Sid'
import Ymap from './Ymap'

const mapState = { center: [53.353929, 83.768455], zoom: 15 }

const { Content } = Layout

class LayoutmapContaner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      inputpoint: '',
      items: [],
      center: mapState.center,
      points: [],
      pointmove: [53.353929, 83.768455],
      map: null
    }
  }

  /** свойства для примера теста */

  a = () => {return 3}
  b = (par1, par2) => {return par1*par2}
  
  setStateMap = map => {
    this.setState({ map: map })
  }

  getState = () => {
    return this.state.items
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ items }) => ({
        items: arrayMove(items, oldIndex, newIndex)
      }),
      () => {
        this.pointCoordUpdate()
      }
    )
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  handleEnter = event => {
    if (event.keyCode === 13) {
      this.setState({ inputpoint: event.target.value })
      let pointArr = this.state.items
      pointArr.push({
        title: event.target.value,
        key: this.state.items.length,
        par: {
          geometry: { type: 'Point', coordinates: this.state.center },
          properties: {
            iconContent: '',
            hintContent: 'Узел маршрута',
            balloonContentHeader: 'Название узла',
            balloonContentBody: event.target.value,
            balloonContentFooter: 'Балун всплывайка'
          },
          options: { preset: 'islands#circleIcon', draggable: true }
        }
      })
      this.setState({ items: pointArr }, () => {
        let pointCoord = []
        this.state.items.map((val, i) => {
          pointCoord.push(val.par.geometry.coordinates)
        })
        this.setState({
          points: pointCoord
        })
      })
    }
  }

  inputPointClean = event => {
    if (event.keyCode === 13) {
      this.setState({
        inputpoint: ''
      })
    }
  }
  /** изменяем состояние для инпута */
  inputChange = ev => {
    this.setState({ inputpoint: ev.target.value })
  }

  itempointDel = param => {
    let newitemarr = []
    /** делаем новый массив с нужными данными, присваиваем его state items */
    newitemarr = this.state.items.filter(item => {
      return item.key !== param
    })

    newitemarr.map((val, i) => {
      newitemarr[i]['key'] = i
    })

    //через келбэк получаем измененное состояние и переделываем параметры точек
    this.setState({ items: newitemarr }, () => {
      /** делаем массив параметров для геообъектов (вынести в метод)*/
      let geoArrD = []
      this.state.items.map((val, i) => {
        geoArrD.push(val.par)
      })
      this.pointCoordUpdate()
    })
    this.setState({ inputpoint: '' })
  }

  /** Обновление объекта параметров точки */
  setPointPar = par => {
    this.setState({
      geoObjPar: par
    })
  }

  /** обновление items */
  itemsUpdate = itempar => {
    this.setState({
      items: itempar
    })
  }
  /** ДЛЯ карты */
  setCenter = par => {
    this.setState({
      //center: this.state.map.getCenter(),
      center: par
    })
  }

  setCoordPoint = (paramkey, e) => {
    let itemcoord = this.state.items
    //пока тащим узел, изменяем состояние во временном массивеб и сохраняем в рабочем состоянии для геообъектов
    itemcoord[paramkey].par.geometry.coordinates = e
      .get('target')
      .geometry.getCoordinates()
    //после изменения состояния с координатами, которыми все объекты пользуются, делаем координаты для узлов линии
    this.setState({ items: itemcoord }, () => {
      this.pointCoordUpdate()
    })
  }
  //метод обновления состояния координат для точек
  pointCoordUpdate() {
    let tmpCoordPoint = []

    this.state.items.map((val, i) => {
      tmpCoordPoint.push(val.par.geometry.coordinates)
    })
    this.setState({
      points: tmpCoordPoint
    })
  }

  render() {
    const { items } = this.state
    return (
      <Layout>
        <Sid
          inputPointClean={this.inputPointClean}
          handleEnter={this.handleEnter}
          inputpoint={this.state.inputpoint}
          inputChange={this.inputChange}
          items={items}
          onSortEnd={this.onSortEnd}
          itempointDel={this.itempointDel}
        />
        <Content className={'cont'}>
          <div>
            <Ymap
              items={this.state.items}
              CoordPoint={this.setCoordPoint}
              getCenter={this.getCenter}
              setCenter={this.setCenter}
              points={this.state.points}
            />
          </div>
        </Content>
      </Layout>
    )
  }
}

export default LayoutmapContaner
