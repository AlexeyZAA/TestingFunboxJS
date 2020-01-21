import React, { Component } from 'react';

import { Layout, Input, List, Button } from 'antd';



const { Sider } = Layout

class Sid extends React.Component {
  state = {
    collapsed: false,
    inputpoint: "",
    datapointlist: []
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleEnter = event => {
  if (event.keyCode === 13) {
    
    this.setState({
      inputpoint: event.target.value
    })
    this.state.datapointlist.push({title: event.target.value, key: this.state.datapointlist.length})  
  }
};
inputPointClean = event => {
  if (event.keyCode === 13) event.target.value = ""
};

itempointDel = (param) => {
  let newitemarr = []
  newitemarr = this.state.datapointlist.filter( (item) => {
     return item.key !== param.key 
  })
  
for (let i=0; i < newitemarr.length; i++){
  newitemarr[i]['key'] = i 
}
  this.setState({
   datapointlist: newitemarr
 })

 this.setState({
  inputpoint: ""
  })
 };


  render() {
      return (

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
            <List.Item key={item.key}>
              <List.Item.Meta
                title={item.title}
              />
            <div>
            <Button type="primary" shape="circle" onClick={() => this.itempointDel({key: item.key, titl: item.title})} >del</Button>
            </div>
            </List.Item>
          )}
        />
       </div> 
      </Sider>
      );
    }
  }

  export default Sid;