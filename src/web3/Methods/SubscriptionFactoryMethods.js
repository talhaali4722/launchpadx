import { subscriptionFactoryAbi } from "../ABIs/SubscriptionFactoryAbi";
import { SUBSCRIPTION_FACTORY_ADDRESS } from "../Constants/constants";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const subscriptionFactoryMethods = async () => {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider);
  } else {
    window.web3 = new Web3(window.ethereum);
  }

  let factoryContract = new window.web3.eth.Contract(
    subscriptionFactoryAbi,
    SUBSCRIPTION_FACTORY_ADDRESS
  );

  const createLaunchpad = (payload, address) => {
    var payloadd = {
      tokenAddress: payload.tokenAddress,
      launchpadType: payload.launchpadType,
      liquidity: payload.liquidity,
      hardCap: window.web3.utils.toWei(String(payload.hardCap), "ether"),
      softCap: window.web3.utils.toWei(String(payload.softCap), "ether"),
      hardCapPerUser: window.web3.utils.toWei(
        String(payload.hardCapPerUser),
        "ether"
      ),
      subscriptionRate: window.web3.utils.toWei(
        String(payload.subscriptionRate),
        "ether"
      ),
      listingRate: window.web3.utils.toWei(
        String(payload.listingRate),
        "ether"
      ),

      // decreaseTime: payload.decreaseTime ? payload.decreaseTime : 0,
      startTime: payload.startTime,
      endTime: payload.endTime,
      isWhiteListAvail: payload.isWhiteListed,
      feeCateg: payload.feeOption,
      uSoldTokenRefundType: payload.uSoldTokenRefundType
        ? payload.uSoldTokenRefundType
        : 0,
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
      await factoryContract.methods
        .getTokenRequireForSubcription(
          window.web3.utils.toWei(payload?.hardCap.toString(), "ether"),
          window.web3.utils.toWei(
            payload?.subscriptionRate.toString(),
            "ether"
          ),
          window.web3.utils.toWei(payload?.listingRate.toString(), "ether"),

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

  const isTokenExists = (address) => {
    return new Promise(async (resolve, reject) => {
      let mapperContract = new window.web3.eth.Contract(
        subscriptionFactoryAbi,
        SUBSCRIPTION_FACTORY_ADDRESS
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

  return { createLaunchpad, getTokenRequire, isTokenExists };
};
