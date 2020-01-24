import React, { Component } from "react";
import Myfullname from "../Myfullname";
//import Sid from "../Sid";
import "./Sid.css";
import Ymap from "../ym/Ymap";
import { Layout, Input, Button  } from "antd";

import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import "./Pointapp.css";

const { Sider } = Layout;

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
    items: []
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
        key: this.state.items.length
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
    newitemarr = this.state.items.filter(item => {
      return item.key !== param;
    });

    for (let i = 0; i < newitemarr.length; i++) {
      newitemarr[i]["key"] = i;
    }
    this.setState({
      items: newitemarr
    });
    this.inputpoint = "";
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
                    key={`item-${value.title}`}
                    index={index}
                    value={[value.title, index]}
                  />
                  <div className={"btnD"}>
                    <Button
                      type="primary"
                      shape="circle"
                      onClick={() => this.itempointDel(value.key)}
                    >
                      del
                    </Button>
                  </div>
                </div>
              ))}
            </SortableContainer>
          </Sider>
          <Content style={{ margin: "24px 16px 0" }}>
            <Ymap pointsarr={this.state.items} />
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
