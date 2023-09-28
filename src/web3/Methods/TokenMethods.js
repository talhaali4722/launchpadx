import Web3 from "web3";
import { contractAbi } from "../ABIs/ContractAbi";
import { FACTORY_ADDRESS } from "../Constants/constants";

export const tokenMethods = async (address) => {
  let Contract;
  // if (!window.ethereum) {
  //   window.web3 = new Web3(
  //     new Web3.providers.HttpProvider(
  //       "https://data-seed-prebsc-1-s1.binance.org:8545/"
  //     )
  //   );
  // }
  // if (window.ethereum?.chainId != "0x61") {

  //   window.web3 = new Web3(
  //     new Web3.providers.HttpProvider(
  //       "https://data-seed-prebsc-1-s1.binance.org:8545/"
  //     )
  //   );
  // } else {

  //   window.web3 = new Web3(window.ethereum);
  // }
  if (!window.web3 || !window.ethereum) {
    const provider = new Web3.providers.HttpProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    );
    const web3 = new Web3(provider);
    Contract = new web3.eth.Contract(contractAbi, address);
  }
  if (window.ethereum?.chainId != "0x61") {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      )
    );
    Contract = new window.web3.eth.Contract(contractAbi, address);
  } else {
    const web3 = new Web3(window.ethereum);
    Contract = new web3.eth.Contract(contractAbi, address);
  }

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

  const approveToken = (address, balance) => {
    return new Promise(async (resolve, reject) => {
      Contract.methods
        .approve(FACTORY_ADDRESS, balance)
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
