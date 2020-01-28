import Pointapp from "./Pointapp";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

const point = new Pointapp();

it("Тест рендер компонента содержащего список точек", () => {
  expect(point).toMatchSnapshot();
});


it("Тест рендера компонента списка", () => {
    expect(sortableContainer).toMatchSnapshot();
  });