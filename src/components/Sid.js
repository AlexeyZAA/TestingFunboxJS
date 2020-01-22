import React, { Component } from "react";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { Layout, Input, List, Button } from "antd";

const { Sider } = Layout;

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

class Sid extends React.Component {
  state = {
    collapsed: false,
    inputpoint: "",
    datapointlist: [],
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"],
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleEnter = event => {
    if (event.keyCode === 13) {
      this.setState({
        inputpoint: event.target.value,
      });
      this.state.datapointlist.push({
        title: event.target.value,
        key: this.state.datapointlist.length,
      });
    }
  };
  inputPointClean = event => {
    if (event.keyCode === 13) event.target.value = "";
  };

  itempointDel = param => {
    let newitemarr = [];
    newitemarr = this.state.datapointlist.filter(item => {
      return item.key !== param.key;
    });

    for (let i = 0; i < newitemarr.length; i++) {
      newitemarr[i]["key"] = i;
    }
    this.setState({
      datapointlist: newitemarr,
    });

    this.setState({
      inputpoint: "",
    });
  };

  render() {
    const { items } = this.state;

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
        <Input
          placeholder="Новая точка маршрута"
          onKeyUp={this.inputPointClean}
          onKeyDown={this.handleEnter}
        />

        <SortableContainer onSortEnd={this.onSortEnd}>
          {items.map((value, index) => (
            <SortableItem key={`item-${value}`} index={index} value={value} />
          ))}
        </SortableContainer>
      </Sider>
    );
  }
}

export default Sid;
