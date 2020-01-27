import Myfullname from "../Myfullname";
import React from "react";
import ReactTestUtils from "react-dom/test-utils";

describe("Pointapp", () => {
  test("TestJest", () => {
    const input = 3;
    const output = 6;
    expect(input * 2).toEqual(output);
  });

  it("TestFooter", () => {
    const myfullname = ReactTestUtils.renderIntoDocument(<Myfullname />);
    var h3 = ReactTestUtils.findRenderedDOMComponentWithTag(myfullname, "h3");
  });
});
