import {
    WALLET_CONNECTION
  } from "../actions-type";
  export const wallet = (state = {}, action) => {
    switch (action.type) {
      case WALLET_CONNECTION:
        return action.payload
      default:
        return state;
    }
  };
  