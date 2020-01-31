import React from 'react'
import { Layout, Input, Button } from 'antd'
import { sortableContainer, sortableElement } from 'react-sortable-hoc'

const { Sider } = Layout
const SortableItem = sortableElement(({ value }) => (
  <li className={'dli'}>{value}</li>
))
const SortableContainer = sortableContainer(({ children }) => {
  return <ul className={'dul'}>{children}</ul>
})

function Sid(props) {
  return (
    <Sider breakpoint="lg" collapsedWidth="0" theme="light">
      <Input
        placeholder="Новая точка маршрута"
        onKeyUp={props.inputPointClean}
        onPressEnter={props.handleEnter}
        value={props.inputpoint}
        onChange={props.inputChange}
      />
      <SortableContainer onSortEnd={props.onSortEnd}>
        {props.items.map((value, index) => (
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
                props.itempointDel(value.key)
              }}
            >
              del
            </Button>
          </div>
        ))}
      </SortableContainer>
    </Sider>
  )
}

export default Sid
