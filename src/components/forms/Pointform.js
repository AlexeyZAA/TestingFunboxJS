import React, { Component } from "react";
import Myfullname from "../Myfullname";
import Sid from "../Sid";
import Ymap from "../Ymap";
import { Layout } from "antd";

import "./pointform.css";

const { Header, Content, Footer } = Layout;

class Pointform extends React.Component {
  state = {};
  render() {
    return (
      <Layout style={{ width: "890px" }}>
        <Header style={{ background: "#fff", textAlign: "center" }}>
          <h1>
            <span style={{ fontWeight: "bold" }}>Построение маршрута</span>
          </h1>
        </Header>
        <Layout>
          <Sid />
          <Content style={{ margin: "24px 16px 0" }}>
            <Ymap />
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          <Myfullname firstName="Алексей" lastName="Зубенко" />
        </Footer>
      </Layout>
    );
  }
}

export default Pointform;
