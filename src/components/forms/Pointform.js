import React, { Component } from 'react';
import Myfullname from '../Myfullname';
import { Layout, Input, List, Button } from 'antd';

import './pointform.css';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';


const { Header, Content, Footer, Sider } = Layout

const data = [
  {
    title: 'Точка 1',
    key: '1'
  },
  {
    title: 'Точка 2',
    key: '2'
  },
  {
    title: 'Точка 3',
    key: '3'
  },
  {
    title: 'Точка 4',
    key: '4'
  },
];

class Pointform extends React.Component {
  state = {
    collapsed: false,
    pointitem: [],
    inputpoint: "",
    datapointlist: data
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  itempointDel = e => {
    alert('Удалена точка' + e.target.title)
  };

  handleEnter = event => {
  if (event.keyCode === 13) {
    this.setState({
      inputpoint: event.target.value
    })
    this.state.datapointlist.push({title: event.target.value})  
  }
}
inputPointClean = event => {
  if (event.keyCode === 13) event.target.value = ""
}

  render() {
      return (
    <Layout style={{ width: "1000px" }}>
       <Header style={{ background: '#fff', textAlign: 'center' }} ><h1><span style={{fontWeight: "bold"}}>Построение маршрута</span></h1></Header>
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
    <Input placeholder="Новая точка маршрута" onKeyUp={ this.inputPointClean } onKeyDown={ this.handleEnter } />
    <div class="listpoint">
    <List
        itemLayout="horizontal"
        dataSource={this.state.datapointlist}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={item.title}
            />
        <div>
        <Button type="primary" shape="circle" onClick={ this.itempointDel }>del</Button>
        </div>
          </List.Item>
        )}
      />
     </div> 
    </Sider>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>content</div>
      </Content>
    </Layout>
    <Footer style={{ textAlign: 'center' }}>
        <Myfullname firstName="Алексей" lastName="Зубенко" />
      </Footer>
  </Layout>
      );
    }
  }

  export default Pointform;