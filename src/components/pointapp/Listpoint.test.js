import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { sortableContainer, sortableElement } from "react-sortable-hoc";

Enzyme.configure({ adapter: new Adapter() });

const items = [
  {
    title: "asdas",
    key: 0,
    par: {
      geometry: { type: "Point", coordinates: [53.353929, 83.768455] },
      properties: {
        iconContent: "",
        hintContent: "Узел маршрута",
        balloonContentHeader: "Название узла",
        balloonContentBody: "asdas",
        balloonContentFooter: "Балун всплывайка",
      },
      options: { preset: "islands#circleIcon", draggable: true },
    },
  },
  {
    title: "ssss",
    key: 1,
    par: {
      geometry: { type: "Point" },
      properties: {
        iconContent: "",
        hintContent: "Узел маршрута",
        balloonContentHeader: "Название узла",
        balloonContentBody: "ssss",
        balloonContentFooter: "Балун всплывайка",
      },
      options: { preset: "islands#circleIcon", draggable: true },
    },
  },
];

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

const SortableItem = sortableElement(({ value }) => <div>{value}</div>);

<SortableContainer onSortEnd={this.onSortEnd}>
  {items.map((value, index) => (
    <div>
      <SortableItem key={`item-${index}`} index={index} value={value.title} />
    </div>
  ))}
</SortableContainer>;

const sortCont = render(SortableContainer);
it("контейнер сорт листа", () => {
  expect(sortCont).toMatchSnapshot();
});
