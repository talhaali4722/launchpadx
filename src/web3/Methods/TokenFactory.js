import { TOKEN_FACTORY_ABI } from "../ABIs/TokenFactoryAbi";
import { TOKEN_FACTORY } from "../Constants/constants";

export const tokenFactory = async () => {
  let Contract = new window.web3.eth.Contract(TOKEN_FACTORY_ABI, TOKEN_FACTORY);
  const createToken = (payload, address) => {
    return new Promise((resolve, reject) => {
      Contract.methods
        .createToken(payload)
        .send({ from: address })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    createToken,
  };
};
