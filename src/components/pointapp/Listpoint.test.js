/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Pointapp from './Pointapp'

Enzyme.configure({ adapter: new Adapter() })

it('Тест основного', () => {
  const wrapper = shallow(<Pointapp />)
  expect(wrapper).toHaveLength(1)
})
