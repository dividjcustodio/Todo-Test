import { CHANGE_LIST_DATA } from "../actions/types";

const INITIAL_STATE = {
  data: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_LIST_DATA:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};
