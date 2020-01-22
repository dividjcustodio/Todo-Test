import { CHANGE_USER_DATA } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: false,
  name: "",
  password: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_USER_DATA:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};
