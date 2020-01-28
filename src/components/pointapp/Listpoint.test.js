import React, {Component} from 'react';
import {render} from 'react-dom';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'];

onSortEnd = ({oldIndex, newIndex}) => {
  this.setState(({items}) => ({
    items: arrayMove(items, oldIndex, newIndex),
  }));
};


describe("Тесты основного компонента", () => {
  it("Тест - снимок списка перетаскайки", () => {
    expect(footer).toMatchSnapshot();
  });

});
