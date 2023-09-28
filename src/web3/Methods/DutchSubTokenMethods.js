import { contractAbi } from "../ABIs/ContractAbi";
import { DUTCH_FACTORY } from "../Constants/constants";
import Web3 from "web3";
// import showConsole from "../utils/common-functions";
import showConsole from "../../utils/common-functions";

export const tokenMethods = async (address) => {
  //   const accounts =  await window.web3.eth.getAccounts();
  let Contract = new window.web3.eth.Contract(contractAbi, address);
  const nameOfToken = () => {
    return new Promise((resolve, reject) => {
      Contract.methods
        .name()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const symbolOfToken = () => {
    return new Promise((resolve, reject) => {
      Contract.methods
        .symbol()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const allowance = (owner, spender) => {
    return new Promise((resolve, reject) => {
      Contract.methods
        .allowance(owner, spender)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const decimalsOfToken = () => {
    return new Promise((resolve, reject) => {
      Contract.methods
        .decimals()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const approveToken = (address) => {
    return new Promise(async (resolve, reject) => {
      const balance = await Contract.methods.balanceOf(address).call();
      Contract.methods
        .approve(DUTCH_FACTORY, balance)
        .send({ from: address })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject("err", err);
        });
    });
  };

  const totalSupply = (address) => {
    return new Promise(async (resolve, reject) => {
      const balance = await Contract.methods.totalSupply().call();
      resolve(balance);
    });
  };

  const balanceOfToken = (address) => {
    return new Promise((resolve, reject) => {
      Contract.methods
        .balanceOf(address)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return {
    nameOfToken,
    symbolOfToken,
    decimalsOfToken,
    approveToken,
    totalSupply,
    balanceOfToken,
    allowance,
  };
};
