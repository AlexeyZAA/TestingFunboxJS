import Pointapp from "./Pointapp";

const point = new Pointapp();
//снимок компонента
it("Тест рендер компонента содержащего список точек", () => {
  expect(point).toMatchSnapshot();
});

