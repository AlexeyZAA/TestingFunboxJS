import React from 'react'
import { render } from '@testing-library/react'
import LayoutmapContaner from './LayoutmapContaner'

/* eslint-env jest */

test('тест функции компонента  ', () => {
  const { asFragment } = render(<LayoutmapContaner />)
  expect(asFragment()).toMatchSnapshot()
})
