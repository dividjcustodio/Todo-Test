import { CHANGE_LIST_DATA } from "./types";
export const getDataStart = dispatch => {
  fetch(`https://jsonplaceholder.typicode.com/todos`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: new Headers(),
    redirect: "follow",
    referrer: "no-referrer"
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      dispatch(getDataSuccess(data));
    });
};
export const getDataSuccess = data => {
  return {
    type: CHANGE_LIST_DATA,
    data: { data }
  };
};
export const getDataDetailStart = async (id, dataSet) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: new Headers(),
    redirect: "follow",
    referrer: "no-referrer"
  });
  const data = await res.json();
  dataSet(data);
};
