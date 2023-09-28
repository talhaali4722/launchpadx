import { factoryAbi } from "../ABIs/FactoryAbi";
import { FACTORY_ADDRESS } from "../Constants/constants";
import Web3 from "web3";
import showConsole from "../../utils/common-functions";
import detectEthereumProvider from "@metamask/detect-provider";

export const factoryMethods = async () => {
  const provider = await detectEthereumProvider();

  let factoryContract;
  if (!window.web3) {
    const provider = new Web3.providers.HttpProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    );
    const web3 = new Web3(provider);
    factoryContract = new web3.eth.Contract(factoryAbi, FACTORY_ADDRESS);
  } else {
    const web3 = new Web3(window.ethereum);
    factoryContract = new web3.eth.Contract(factoryAbi, FACTORY_ADDRESS);
  }

  // if (provider !== window.ethereum) {
  //   window.web3 = new Web3(provider);
  // } else {
  //   window.web3 = new Web3(window.ethereum);
  // }

  // let factoryContract = new window.web3.eth.Contract(
  //   factoryAbi,
  //   FACTORY_ADDRESS
  // );

  const createLaunchpad = (payload, address) => {
    var payloadd = {
      tokenAddress: payload.tokenAddress,
      launchpadType: payload.launchpadType,
      liquidity: payload.liquidity,
      preSaleRate: window.web3.utils.toWei(
        String(payload.preSaleRate),
        "ether"
      ),
      softCap: window.web3.utils.toWei(String(payload.softCap), "ether"),
      hardCap: window.web3.utils.toWei(String(payload.hardCap), "ether"),
      maxBuy: window.web3.utils.toWei(String(payload.maxBuy), "ether"),
      minBuy: window.web3.utils.toWei(String(payload.minBuy), "ether"),
      listingRate: window.web3.utils.toWei(
        String(payload.listingRate),
        "ether"
      ),
      decreaseTime: payload.decreaseTime ? payload.decreaseTime : 0,
      startTime: payload.startTime,
      endTime: payload.endTime,
      isWhiteListAvail: payload.isWhiteListed,
      feeCateg: payload.feeOption,
      uSoldTokenRefundType: payload.uSoldTokenRefundType
        ? payload.uSoldTokenRefundType
        : "0",
      logoURL: payload.logoURL,
      website: payload.website,
      decimals: payload.decimals,
    };

    return new Promise(async (resolve, reject) => {
      factoryContract.methods
        .createLaunchpad(payloadd)
        .send({ from: address })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // const tokensForLiquidity = () => {
  //   return new Promise((resolve, reject) => {
  //     factoryContract.methods
  //       .getTokenRequire()
  //       .call()
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // };

  const getTokenRequire = (payload, address) => {
    return new Promise(async (resolve, reject) => {
      //   window.web3.utils.toBN(payload.hardCap + "").toString()
      factoryContract.methods
        .getTokenRequire(
          window.web3.utils.toWei(payload?.hardCap.toString(), "ether"),
          window.web3.utils.toWei(payload?.preSale.toString(), "ether"),
          window.web3.utils.toWei(payload?.listingRate.toString(), "ether"),
          // window.web3.utils.toWei(payload.liquidity.toString(), "ether"),
          // window.web3.utils.toWei(
          //   window.web3.utils.toBN(payload.feeOption.toString()),
          //   "ether"
          // )
          payload.liquidity,
          payload.feeOption,
          payload.decimal
        )
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const withDrawTime = () => {
    return new Promise(async (resolve, reject) => {
      factoryContract.methods
        .getlaunchpadWithdrawTime()
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
        factoryAbi,
        FACTORY_ADDRESS
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

  return { createLaunchpad, getTokenRequire, withDrawTime, isTokenExists };
};
