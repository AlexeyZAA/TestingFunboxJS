import Pointapp from "./Pointapp";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

const point = new Pointapp();
//снимок компонента
it("Тест рендер компонента содержащего список точек", () => {
  expect(point).toMatchSnapshot();
});

