import { maperAbi } from "../ABIs/MapperAbi";
import { MAPPER_ADDRESS } from "../Constants/constants";
import Web3 from "web3";

export const mapperMethods = async () => {
  if (!window.ethereum) {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      )
    );
  }
  if (window.ethereum?.chainId !== "0x61") {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      )
    );
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  const getDutchLaunchpads = () => {
    return new Promise(async (resolve, reject) => {
      if (!window.ethereum) {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          )
        );
      }
      if (window.ethereum?.chainId !== "0x61") {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          )
        );
      } else {
        window.web3 = new Web3(window.ethereum);
      }
      let mapperContract = new window.web3.eth.Contract(
        maperAbi,
        MAPPER_ADDRESS
      );

      let x = await mapperContract.methods.totalLaunchpads().call();
      mapperContract.methods
        .getCompleteAddressList(0, x)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getAllLaunchpads = () => {
    return new Promise(async (resolve, reject) => {
      if (!window.ethereum) {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          )
        );
      }
      if (window.ethereum?.chainId !== "0x61") {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          )
        );
      } else {
        window.web3 = new Web3(window.ethereum);
      }
      let mapperContract = new window.web3.eth.Contract(
        maperAbi,
        MAPPER_ADDRESS
      );
      let x = await mapperContract.methods.totalLaunchpads().call();

      mapperContract.methods
        .getCompleteAddressList(0, x)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const recentLaunchpads = () => {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum?.chainId !== "0x61") {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          )
        );
      } else {
        window.web3 = new Web3(window.ethereum);
      }
      // if(window.ethereum){
      //   window.web3 = new Web3(window.ethereum);
      // }
      let mapperContract = new window.web3.eth.Contract(
        maperAbi,
        MAPPER_ADDRESS
      );
      mapperContract.methods
        .recentLaunchpads()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getLaunchpadDetail = (address) => {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum.chainId !== "0x61") {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          )
        );
      } else {
        window.web3 = new Web3(window.ethereum);
      }
      let mapperContract = new window.web3.eth.Contract(
        maperAbi,
        MAPPER_ADDRESS
      );
      mapperContract.methods
        .getLaunchpadDetails(address)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getUserLAunchpads = (address) => {
    return new Promise(async (resolve, reject) => {
      if (window.ethereum.chainId !== "0x61") {
        window.web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545/"
          )
        );
      } else {
        window.web3 = new Web3(window.ethereum);
      }
      let mapperContract = new window.web3.eth.Contract(
        maperAbi,
        MAPPER_ADDRESS
      );
      mapperContract.methods
        .userLaunchpadsAddresses(address)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const isTokenExists = (address) => {
    return new Promise(async (resolve, reject) => {
      let mapperContract = new window.web3.eth.Contract(
        maperAbi,
        MAPPER_ADDRESS
      );
      mapperContract.methods
        .istokenExist(address)
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
    getAllLaunchpads,
    recentLaunchpads,
    getLaunchpadDetail,
    getUserLAunchpads,
    getDutchLaunchpads,
    isTokenExists,
  };
};
