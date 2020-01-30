import React from 'react'
import Myfullname from '../Myfullname'
import './Sid.css'
import { Layout, Input, Button } from 'antd'
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps'

import { sortableContainer, sortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import './Pointapp.css'

const { Sider } = Layout

const mapState = { center: [53.353929, 83.768455], zoom: 15 }

const SortableItem = sortableElement(({ value }) => (
  <li className={'dli'}>{value}</li>
))

const SortableContainer = sortableContainer(({ children }) => {
  return <ul className={'dul'}>{children}</ul>
})

const { Header, Content, Footer } = Layout

class Pointapp extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    collapsed: false,
    inputpoint: '',
    items: [],
    center: mapState.center,
    points: [],
    pointmove: [53.353929, 83.768455],
  }

  getState = () => {
    return this.state.items
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ items }) => ({
        items: arrayMove(items, oldIndex, newIndex),
      }),
      () => {
        this.pointCoordUpdate()
      },
    )
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
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
            balloonContentFooter: 'Балун всплывайка',
          },
          options: { preset: 'islands#circleIcon', draggable: true },
        },
      })
      this.setState({ items: pointArr }, () => {
        let pointCoord = []
        this.state.items.map((val, i) => {
          pointCoord.push(val.par.geometry.coordinates)
        })
        this.setState({
          points: pointCoord,
        })
      })
    }
  }

  inputPointClean = event => {
    if (event.keyCode === 13) {
      this.setState({
        inputpoint: '',
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
      geoObjPar: par,
    })
  }

  /** обновление items */
  itemsUpdate = itempar => {
    this.setState({
      items: itempar,
    })
  }
  /** ДЛЯ карты */
  onBoundsChange = () => {
    this.setState({
      center: this.state.map.getCenter(),
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
      points: tmpCoordPoint,
    })
  }

  render() {
    const { items } = this.state
    return (
      <Layout className={'lay'}>
        <Header className={'head'}>
          <h1>
            <span className={'headmap'}>Построение маршрута</span>
          </h1>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme="light"
            onBreakpoint={broken => {
              console.log(broken)
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
          >
            <Input
              placeholder="Новая точка маршрута"
              onKeyUp={this.inputPointClean}
              onPressEnter={this.handleEnter}
              value={this.state.inputpoint}
              onChange={this.inputChange}
            />

            <SortableContainer onSortEnd={this.onSortEnd}>
              {items.map((value, index) => (
                <div key={index}>
                  <SortableItem
                    key={`item-${index}`}
                    index={index}
                    value={value.title}
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => {
                      this.itempointDel(value.key)
                    }}
                  >
                    del
                  </Button>
                </div>
              ))}
            </SortableContainer>
          </Sider>
          <Content className={'cont'}>
            <div>
              <YMaps>
                <Map
                  width="100%"
                  height="600px"
                  state={mapState}
                  instanceRef={map => this.setState({ map })}
                  onBoundsChange={this.onBoundsChange}
                >
                  {this.state.items.map((pointParams, i) => (
                    <Placemark
                      onDrag={e => this.setCoordPoint(i, e)}
                      key={i}
                      {...pointParams.par}
                    />
                  ))}

                  <Polyline
                    geometry={{
                      coordinates: this.state.points,
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
              <div>Center: {JSON.stringify(this.state.center)}</div>
            </div>
          </Content>
        </Layout>
        <Footer className={'foot'}>
          <div className={'foot'}>
            <Myfullname firstName="Алексей" lastName="Зубенко" />
          </div>
        </Footer>
      </Layout>
    )
  }
}

export default Pointapp
