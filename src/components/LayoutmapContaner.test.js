import React from 'react'
import { render } from '@testing-library/react'
import LayoutmapContaner from './LayoutmapContaner'

/* eslint-env jest */

/** пока не рендерим весь большой компонент */
/*
test('тест функции компонента  ', () => {
  const { asFragment } = render(<LayoutmapContaner />)
  expect(asFragment()).toMatchSnapshot()
})
*/
const var1 = new LayoutmapContaner()

test('тестим а свойство', () => {
  expect(var1.a()).toBe(3)
})

test('тестим в свойство', () => {
  expect(var1.b(2, 3)).toBe(6)
})

it('взаимодействие функций', () => {
  expect(var1.b(2, var1.a())).toBe(6)
})