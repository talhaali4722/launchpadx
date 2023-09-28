import { WALLET_CONNECTION } from "../actions-type";

export const walletConnection = (data) => (dispatch) => {
  dispatch({ type: WALLET_CONNECTION, payload: data });
};
