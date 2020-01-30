import Pointapp from './Pointapp'

const point = new Pointapp()
it('Тест рендер компонента содержащего список точек', () => {
  expect(point).toMatchSnapshot()
})