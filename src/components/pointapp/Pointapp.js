import React, { Component } from "react";
import Myfullname from "../Myfullname";
import "./Sid.css";
import { Layout, Input, Button } from "antd";
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";

import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./Pointapp.css";

const { Sider } = Layout;

const mapState = { center: [53.353929, 83.768455], zoom: 15 };

const SortableItem = sortableElement(({ value }) => (
  <div className={"dli"}>{value}</div>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <div className={"dul"}>{children}</div>;
});

const { Header, Content, Footer } = Layout;

class Pointapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      inputpoint: "",
      items: [],
      center: mapState.center,
      points: [],
      pointmove: [53.353929, 83.768455],
    };
  }

  getState = () => {
    return this.state.items;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ items }) => ({
        items: arrayMove(items, oldIndex, newIndex),
      }),
      () => {
        this.pointCoordUpdate();
      },
    );
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleEnter = event => {
    if (event.keyCode === 13) {
      this.setState({ inputpoint: event.target.value });
      let pointArr = this.state.items;
      pointArr.push({
        title: event.target.value,
        key: this.state.items.length,
        par: {
          geometry: { type: "Point", coordinates: this.state.center },
          properties: {
            iconContent: "",
            hintContent: "Узел маршрута",
            balloonContentHeader: "Название узла",
            balloonContentBody: event.target.value,
            balloonContentFooter: "Балун всплывайка",
          },
          options: { preset: "islands#circleIcon", draggable: true },
        },
      });
      this.setState({ items: pointArr }, () => {
        let pointCoord = [];
        for (let i = 0; i < this.state.items.length; i++) {
          pointCoord.push(this.state.items[i].par.geometry.coordinates);
        }
        this.setState({
          points: pointCoord,
        });
      });
    }
  };

  inputPointClean = event => {
    if (event.keyCode === 13) {
      this.setState({
        inputpoint: "",
      });
    }
  };
  /** изменяем состояние для инпута */
  inputChange = ev => {
    this.setState({ inputpoint: ev.target.value });
  };

  itempointDel = param => {
    let newitemarr = [];
    /** делаем новый массив с нужными данными, присваиваем его state items */
    newitemarr = this.state.items.filter(item => {
      return item.key !== param;
    });
    for (let i = 0; i < newitemarr.length; i++) {
      newitemarr[i]["key"] = i;
    }
    //через келбэк получаем измененное состояние и переделываем параметры точек
    this.setState({ items: newitemarr }, () => {
      /** делаем массив параметров для геообъектов (вынести в метод)*/
      let geoArrD = [];
      for (let j = 0; j < this.state.items.length; j++) {
        geoArrD.push(this.state.items[j].par);
      }
      this.pointCoordUpdate();
    });
    this.setState({ inputpoint: "" });
  };

  /** Обновление объекта параметров точки */
  setPointPar = par => {
    this.setState({
      geoObjPar: par,
    });
  };

  /** обновление items */
  itemsUpdate = itempar => {
    this.setState({
      items: itempar,
    });
  };
  /** ДЛЯ карты */
  onBoundsChange = () => {
    this.setState({
      center: this.state.map.getCenter(),
    });
  };

  setCoordPoint = (paramkey, e) => {
    let itemcoord = this.state.items;
    //пока тащим узел, изменяем состояние во временном массивеб и сохраняем в рабочем состоянии для геообъектов
    itemcoord[paramkey].par.geometry.coordinates = e
      .get("target")
      .geometry.getCoordinates();
    //после изменения состояния с координатами, которыми все объекты пользуются, делаем координаты для узлов линии
    this.setState({ items: itemcoord }, () => {
      this.pointCoordUpdate();
    });
  };
  //метод обновления состояния координат для точек
  pointCoordUpdate() {
    let tmpCoordPoint = [];
    for (let t = 0; t < this.state.items.length; t++) {
      tmpCoordPoint.push(this.state.items[t].par.geometry.coordinates);
    }
    this.setState({
      points: tmpCoordPoint,
    });
  }

  render() {
    const { items } = this.state;
    return (
      <Layout style={{ width: "100%" }}>
        <Header style={{ background: "#fff", textAlign: "center" }}>
          <h1>
            <span style={{ fontWeight: "bold" }}>Построение маршрута</span>
          </h1>
        </Header>
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme="light"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
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
              {
                items.map((value, index) => (
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
                      this.itempointDel(value.key);
                      }}
                    >
                      del
                    </Button>
                  </div>
                ))
              }
            </SortableContainer>
          </Sider>
          <Content style={{ margin: "24px 16px 0" }}>
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
                  }
                  <Polyline
                    //instanceRef={polyline => polyline.editor.startEditing()}
                    geometry={{
                      coordinates: this.state.points,
                    }}
                    properties={{
                      hintContent: "Редактируйте маршрут",
                      balloonContentHeader: "Строим маршрут",
                      balloonContentBody: "Описание маршрута",
                      balloonContentFooter: "Маршрут Иванова И.И.",
                    }}
                    options={{
                      strokeColor: "#00000088",
                      editorMaxPoints: 0,
                      strokeWidth: 10,
                      strokeOpacity: 0.5,
                      editorMenuManager: function(items) {
                        items.push({
                          title: "Дополнительный пункт меню",
                          onClick: e => {
                            alert("JSON.stringify(e)");
                          },
                        });
                        return items;
                      },
                    }}
                  />
                </Map>
              </YMaps>
              <div>Center: {JSON.stringify(this.state.center)}</div>
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          <div className={"foot"}>
          <Myfullname firstName="Алексей" lastName="Зубенко" />
          </div>
        </Footer>
      </Layout>
    );
  }
}

export default Pointapp;
