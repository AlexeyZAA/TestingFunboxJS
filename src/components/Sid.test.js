import React from 'react'
import { render } from '@testing-library/react'
import Sid from './Sid'

/* eslint-env jest */

/** Протестируем ввывод списка точек в Сидебаре, дав ему подготовленные параметры. Формирование параметров в другом тесте */
const items = [
  {
    title: 'Точка 1',
    key: 0,
    par: {
      geometry: {
        type: 'Point',
        coordinates: [53.35475063654921, 83.77012869842511]
      },
      properties: {
        iconContent: '',
        hintContent: 'Узел маршрута',
        balloonContentHeader: 'Название узла',
        balloonContentBody: 'Точка 1',
        balloonContentFooter: 'Балун всплывайка'
      },
      options: { preset: 'islands#circleIcon', draggable: true }
    }
  },
  {
    title: 'Точка 2',
    key: 1,
    par: {
      geometry: {
        type: 'Point',
        coordinates: [53.351412638902175, 83.7630047512809]
      },
      properties: {
        iconContent: '',
        hintContent: 'Узел маршрута',
        balloonContentHeader: 'Название узла',
        balloonContentBody: 'Точка 2',
        balloonContentFooter: 'Балун всплывайка'
      },
      options: { preset: 'islands#circleIcon', draggable: true }
    }
  },
  {
    title: 'Точка 3',
    key: 2,
    par: {
      geometry: {
        type: 'Point',
        coordinates: [53.35721545073843, 83.76472136505083]
      },
      properties: {
        iconContent: '',
        hintContent: 'Узел маршрута',
        balloonContentHeader: 'Название узла',
        balloonContentBody: 'Точка 3',
        balloonContentFooter: 'Балун всплывайка'
      },
      options: { preset: 'islands#circleIcon', draggable: true }
    }
  }
]

test('тест снимок списка контрольных узлов маршута ', () => {
  const { asFragment } = render(<Sid items={items} />)
  expect(asFragment()).toMatchSnapshot()
})
