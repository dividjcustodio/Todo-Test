import React from "react";
import nock from "nock";
import Enzyme, { mount, configure } from "enzyme";
import ConnectedApp, { App } from "../App";
import { SignInPage } from "../pages/SignInPage";
import { ListPage } from "../pages/ListPage";
import DetailPage from "../pages/DetailPage";
import { MemoryRouter } from 'react-router'
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { logout, signInAction } from "../actions/user";
import { getDataSuccess, getDataStart } from "../actions/list";
import { item, list } from "../helpers/mock";
import thunk from "redux-thunk";
import { createShallow, createMount } from '@material-ui/core/test-utils';

configure({ adapter: new Adapter() });
Enzyme.configure({ adapter: new Adapter() });
let userData = {
  isAuthenticated: false
};

const dataItem = item;
const dataList = list;

let dataLocal = localStorage.getItem("user");
if (dataLocal) {
  userData = {
    isAuthenticated: true,
    ...JSON.parse(dataLocal)
  };
}
const initialS = { user: { ...userData }, list: { data: [] } };

// Snapshot for SignInPage React Component


describe('>>>Pages --- Snapshot', () => {
  const shallow = createShallow();
  const mockStore = configureStore();
  let store = mockStore(initialS);

  const getData = jest.fn();
  const ListPageContainer = shallow(
    <MemoryRouter>
      <ListPage data={[dataItem]} getData={getData} />
    </MemoryRouter>
  )
  const matchParam = {
    params: {
      id: 3
    }
  }
  const detailPageContainer = shallow(<MemoryRouter><DetailPage match={matchParam}/></MemoryRouter>);
  const SignInPageContainer = shallow(<MemoryRouter><SignInPage/></MemoryRouter>);

  it("+++capturing Snapshot of ListPage", () => {
    expect(ListPageContainer.html()).toMatchSnapshot();
  });
  it("+++capturing Snapshot of DetailPage", () => {
    expect(detailPageContainer.html()).toMatchSnapshot();
  });
  it("+++capturing Snapshot of SignInPage", () => {
    expect(SignInPageContainer.html()).toMatchSnapshot();
  });

});


//*******************************************************************************************************
describe(">>>H O M E --- Shallow Render REACT COMPONENTS", () => {
  const shallow = createShallow();
  const mockStore = configureStore();
  const store = mockStore(initialS);

  const props = {
    user: { ...userData }
  };

  const wrapper1 = shallow(<ConnectedApp store={store} {...props} />);

  it("+++ render the DUMB component", () => {
    expect(wrapper1.length).toEqual(1);
  });
});

//*******************************************************************************************************
describe(">>>H O M E --- REACT-REDUX (Shallow + passing the {store} directly)", () => {
  const shallow = createShallow();
  const initialState = initialS;
  const mockStore = configureStore();
  const store = mockStore(initialState);

  const container = shallow(<ConnectedApp store={store} />);
  it("+++ render the connected(SMART) component", () => {
    expect(container.length).toEqual(1);
  });
});

//*******************************************************************************************************
describe(">>>H O M E --- REACT-REDUX (Mount + wrapping in <Provider>)", () => {
  const initialState = initialS;
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const mount = createMount();
  const store = mockStore(initialState);
  let fetchTodosData = dataList;
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  );
  afterEach(() => {
    // clear all HTTP mocks after each test
    nock.cleanAll();
  });
  it("+++ render the connected(SMART) component", () => {
    expect(wrapper.find(ConnectedApp).length).toEqual(1);
  });

  it("+++ check action user ", () => {
    let action;
    store.dispatch(signInAction({ name: "some", password: "2323" }));
    store.dispatch(logout());
    action = store.getActions();
    expect(action[0].type).toBe("CHANGE_USER_DATA");
    expect(action[1].type).toBe("CHANGE_USER_DATA");
  });

  it("+++ check action list", () => {
    // Dispatch the createSuccess action with the values of a new to-do.
    store.dispatch(getDataSuccess([dataItem]));
    expect(store.getActions()).toMatchSnapshot();
  });

  it("creates async check action list", () => {
    // Simulate a successful response
    nock("http://jsonplaceholder.typicode.com")
      .defaultReplyHeaders({ "access-control-allow-origin": "*" })
      .get("/todos") // Route to catch and mock
      .reply(200, fetchTodosData); // Mock reponse code and data
    // Dispatch action to fetch to-dos
    store.dispatch(getDataStart()).then(() => {
      // return of async actions
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
