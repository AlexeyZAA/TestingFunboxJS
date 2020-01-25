import React, { Component } from "react";
import Myfullname from "../Myfullname";
import "./Sid.css";
//import Ymap from "../ym/Ymap";
import { Layout, Input, Button } from "antd";
import { YMaps, Map, GeoObject, Placemark, Circle } from "react-yandex-maps";

import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./Pointapp.css";

const { Sider } = Layout;

const mapState = { center: [53.353929, 83.768455], zoom: 15 };

const SortableItem = sortableElement(({ value }) => (
  <div className={"dli"}>{value[0]}</div>
));
const SortableContainer = sortableContainer(({ children }) => {
  return <div className={"dul"}>{children}</div>;
});

const { Header, Content, Footer } = Layout;

class Pointapp extends React.Component {
  state = {
    collapsed: false,
    inputpoint: "",
    items: [],
    geoObjPar: [],
    center: []
  };

  getState = () => {
    return this.state.items;
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleEnter = event => {
    if (event.keyCode === 13) {
      this.setState({
        inputpoint: event.target.value
      });

      this.state.items.push({
        title: event.target.value,
        key: this.state.items.length,
        par: {
          geometry: { type: "Point", coordinates: [53.35416, 83.766278] },
          properties: { iconContent: "", hintContent: "можно таскать" },
          options: { preset: "islands#circleIcon", draggable: true }
        }
      });
      /** делаем массив параметров для геообъектов (вынести в метод)*/
      let geoArr = [];
      for (let j = 0; j < this.state.items.length; j++) {
        geoArr.push(this.state.items[j].par);
      }
      this.setState({
        geoObjPar: geoArr
      });
    }
  };

  inputPointClean = event => {
    if (event.keyCode === 13) {
      event.target.value = "";
    }
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
      this.setPointPar(geoArrD);
    });
  };

  /** Обновление объекта параметров точки */
  setPointPar = par => {
    this.setState({
      geoObjPar: par
    });
  };

  /** обновление items */
  itemsUpdate = itempar => {
    this.setState({
      items: itempar
    });
  };
  /** ДЛЯ карты */
  onBoundsChange = () => {
    this.setState({
      center: this.state.map.getCenter()
    });
  };

  instPoint = () => {
    alert(JSON.stringify(this.state.center));
  };

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
              onKeyDown={this.handleEnter}
            />
            <SortableContainer onSortEnd={this.onSortEnd}>
              {items.map((value, index) => (
                <div>
                  <SortableItem
                    key={value.title}
                    index={index}
                    value={[value.title, index]}
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => this.itempointDel(value.key)}
                  >
                    del
                  </Button>
                </div>
              ))}
            </SortableContainer>
          </Sider>
          <Content style={{ margin: "24px 16px 0" }}>
            {/*<Ymap pointsarr={this.state.geoObjPar} />*/}
            <div>
              <YMaps>
                <Map
                  width="100%"
                  height="600px"
                  state={mapState}
                  instanceRef={map => this.setState({ map })}
                  onBoundsChange={this.onBoundsChange}
                >
                  {this.state.geoObjPar.map((pointParams, i) => (
                    <Placemark key={i} {...pointParams} />
                  ))}
                </Map>
              </YMaps>
              <div>Center: {JSON.stringify(this.state.center)}</div>
              <button onClick={() => this.instPoint()}>Ok</button>
              <button
                onClick={() =>
                  alert(JSON.stringify(this.props.pointsarr[0].par))
                }
              >
                Point
              </button>
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          <Myfullname firstName="Алексей" lastName="Зубенко" />
        </Footer>
      </Layout>
    );
  }
}

export default Pointapp;
