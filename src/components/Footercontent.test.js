import React from 'react'
import { render } from '@testing-library/react'
import Footercontent from './Footercontent'
/* eslint-env jest */

test('тест снимок небольшого вывода футера', () => {
  const { asFragment  } = render(<Footercontent firstName={'Имя'} lastName={'Фамилия'}/>)

  expect(asFragment()).toMatchSnapshot()
})
