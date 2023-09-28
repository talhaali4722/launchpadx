import { subscriptionLaunchpadAbi } from "../ABIs/SubscriptionLaunchpadAbi";

import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const subscriptionLaunchpadMethods = async (launchpadAddress) => {
  const provider = await detectEthereumProvider();
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
  const getLaunchpadDetails = (launchpadAddress) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getLaunchpadInfo()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getLaunchpadPool = (launchpadAddress) => {
    if (launchpadAddress) {
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

        let launchpadContract = new window.web3.eth.Contract(
          subscriptionLaunchpadAbi,
          launchpadAddress
        );
        launchpadContract.methods
          .getheredCurrency()
          .call()
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
    }
  };

  const setToWhiteList = (launchpadAddress) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .setToWhitelist()
        .send({ from: window.ethereum.selectedAddress })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const setSaleToPublic = (launchpadAddress) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .setSaleToPublic()
        .send({ from: window.ethereum.selectedAddress })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const isWhiteListOn = (launchpadAddress) => {
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
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .isWhiteListOn()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const contributeLaunchpad = (launchpadAddress, amount) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .contribute()
        .send({
          from: window.ethereum.selectedAddress,
          value: window.web3.utils.toWei(String(amount), "ether"),
          gasLimit: 7200000,
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getCurrency = (launchpadAddress) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getCurrencyForLiquidity()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const finalizeLaunchpad = (launchpadAddress, amount) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .finalize()
        .send({
          from: window.ethereum.selectedAddress,

          gasLimit: 7200000,
        })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const cancelLaunchpad = (address) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .cancelPool()
        .send({ from: address })
        .then((resp) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getPoolStatus = async (launchpadAddress) => {
    if (launchpadAddress) {
      return new Promise((resolve, reject) => {
        let launchpadContract = new window.web3.eth.Contract(
          subscriptionLaunchpadAbi,
          launchpadAddress
        );
        launchpadContract.methods
          .getPoolStatus()
          .call()
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  };

  const getContributorsList = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getAllContributorsList(0, 50)
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  const getContributorsCounts = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .contributorsLength()
        .call()
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  const AddWhiteList = (accounts, address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .AddWhiteList(accounts)
        .send({ from: address })
        .then((resp) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  const RemoveWhiteList = (accounts, address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .RemoveWhiteList(accounts)
        .send({ from: address })
        .then((resp) => {
          resolve(true);
        })
        .catch((err) => {
          reject(false);
        });
    });
  };

  const getClaimableToken = (userAddress, address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getClaimableToken(userAddress)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getClaimStatus = (userAddress) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .claimedAddresses(userAddress)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const claimRefundAddresses = (userAddress) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .claimRefundAddresses(userAddress)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getAllWhiteList = (page, size) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getAllWhiteList(page, size)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getheredCurrency = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getheredCurrency()
        .call()
        .then((res) => {
          resolve(window.web3.utils.fromWei(res, "ether"));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // const getCurrentFairSaleRate = (address) => {
  //   return new Promise((resolve, reject) => {
  //     let launchpadContract = new window.web3.eth.Contract(
  //       subscriptionLaunchpadAbi,
  //       launchpadAddress
  //     );
  //     launchpadContract.methods
  //       .getCurrentFairSaleRate()
  //       .call()
  //       .then((res) => {
  //         resolve(window.web3.utils.fromWei(res, "ether"));
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // };

  const finalized = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .isfinalzed()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const claimToken = (address) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .claimToken()
        .send({ from: address })
        .then((resp) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const withdrawCurrencyAfterCancel = (address) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .withdrawCurrencyAfterCancel()
        .send({ from: address })
        .then((resp) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const emergencyWithdraw = (address) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .contributorCurrencyWithdraw()
        .send({ from: address })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const userPurchased = (userAddress) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getUserPurchased(userAddress)
        .call()
        .then((resp) => {
          resolve(window.web3.utils.fromWei(resp, "ether"));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const whiteLists = (launchpadAddress, userAddress) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getWhiteLists(userAddress)
        .call()
        .then((resp) => {
          resolve(resp == 0 ? false : true);
        })
        .catch((err) => {
          reject(true);
        });
    });
  };

  const setNewTime = (launchpadAddress, address, newEndDate) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .setFairTime(newEndDate)
        .send({ from: address })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const feeCategorey = () => {
    if (launchpadAddress) {
      return new Promise((resolve, reject) => {
        let launchpadContract = new window.web3.eth.Contract(
          subscriptionLaunchpadAbi,
          launchpadAddress
        );
        launchpadContract.methods
          .feeCateg()
          .call()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  };

  const withDrawLiquidityTokens = (address) => {
    return new Promise(async (resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .withdrawLiquidityTokensAfterCancel()
        .send({ from: address })
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const endTime = (launchpadAddress) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .endTime()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const startTime = (launchpadAddress) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .startTime()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getRefundType = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .uSoldTokenRefundType()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getLaunchpadTokenBalance = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getLaunchpadTokenBalance()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getEstimatedTokenReceived = (amount) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getEstimatedTokenReceived(
          window.web3.utils.toWei(amount.toString(), "ether")
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

  const youPaid = (address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .youPaid(address)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const youPurchased = (address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .youPurchased(address)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const commitmentRatio = (address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .commitmentRatio(address)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const hardcapTokenPerUser = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .hardcapTokenPerUser()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const liquidityTokenAmount = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .liquidityTokenAmount()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getTokenRate = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getTokenRate()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const listingRate = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .listingRate()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const claimAndRefundToken = (address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .claimAndRefund()
        .send({ from: address })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const claimRefund = (address) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .refundCurrency()
        .send({ from: address })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getRefund = (userAddress) => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getRefund(userAddress)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getPurchaseHistory = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getPurchaseHistory(0, 10)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getCurrentRaise = () => {
    return new Promise((resolve, reject) => {
      let launchpadContract = new window.web3.eth.Contract(
        subscriptionLaunchpadAbi,
        launchpadAddress
      );
      launchpadContract.methods
        .getCurrentRaise()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  return {
    getLaunchpadDetails,
    getLaunchpadPool,
    contributeLaunchpad,
    getCurrency,
    finalizeLaunchpad,
    cancelLaunchpad,
    getPoolStatus,
    getContributorsList,
    getClaimableToken,
    getheredCurrency,
    // getCurrentFairSaleRate,
    finalized: finalized,
    claimToken,
    withdrawCurrencyAfterCancel,
    setToWhiteList,
    setSaleToPublic,
    isWhiteListOn,
    userPurchased,
    AddWhiteList,
    whiteLists,
    setNewTime,
    // getClaimStatus,
    feeCategorey,
    getAllWhiteList,
    RemoveWhiteList,
    emergencyWithdraw,
    getContributorsCounts,
    withDrawLiquidityTokens,
    endTime,
    startTime,
    getRefundType,
    getLaunchpadTokenBalance,
    getEstimatedTokenReceived,
    youPaid,
    youPurchased,
    commitmentRatio,
    hardcapTokenPerUser,
    liquidityTokenAmount,
    getTokenRate,
    listingRate,
    claimAndRefundToken,
    claimRefund,
    claimRefundAddresses,
    getClaimStatus,
    getRefund,
    getPurchaseHistory,
    getCurrentRaise,
  };
};
