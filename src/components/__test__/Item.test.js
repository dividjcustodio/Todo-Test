import React from "react";
import Item from "./../Item";
import "@testing-library/jest-dom";
import Adapter from "enzyme-adapter-react-16";
import { cleanup } from "@testing-library/react";
import { createShallow, createRender } from '@material-ui/core/test-utils';
import {configure} from "enzyme";
import Enzyme from "enzyme/build";
import { MemoryRouter } from 'react-router'
configure({ adapter: new Adapter() });
Enzyme.configure({ adapter: new Adapter() });


describe('>>>Pages --- Snapshot', () => {
  let shallow = createShallow();
  let render = createRender();

  afterEach(cleanup);
  it("normal rendering", () => {
    render(<MemoryRouter><Item></Item></MemoryRouter>);
  });

  it("renders Items", () => {
    const dataItem = {
      userId: 1,
      id: 1,
      title: 1,
      completed: false
    };
    render(<MemoryRouter><Item {...dataItem} /></MemoryRouter>);
  });
  const ItemContainer = shallow(<MemoryRouter><Item userId={1} id={1} title={"some"} completed={false} /></MemoryRouter>);

  it("+++capturing Snapshot of Item", () => {
    expect(ItemContainer.html()).toMatchSnapshot();
  });


});
