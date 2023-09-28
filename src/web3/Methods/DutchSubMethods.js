import { DutchSubAbi } from "../ABIs/DutchSubAbi";
import Web3 from "web3";
import showConsole from "../../utils/common-functions";
import detectEthereumProvider from "@metamask/detect-provider";
import { dutchSubFactoryAbi } from "../ABIs/DutchSubFactoryAbi";

export const dutchLaunchpadMethods = async (launchpadAddress) => {
  let launchpadContract;

  const provider = await detectEthereumProvider();

  if (!window.ethereum) {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      )
    );
    launchpadContract = new window.web3.eth.Contract(
      DutchSubAbi,
      launchpadAddress
    );
  }
  if (window.ethereum?.chainId != "0x61") {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545/"
      )
    );
    launchpadContract = new window.web3.eth.Contract(
      DutchSubAbi,
      launchpadAddress
    );
  } else {
    window.web3 = new Web3(window.ethereum);
    launchpadContract = new window.web3.eth.Contract(
      DutchSubAbi,
      launchpadAddress
    );
  }

  const getLaunchpadDetails = (launchpadAddress) => {
    return new Promise(async (resolve, reject) => {
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

  const liquidityTokenAmount = (launchpadAddress) => {
    if (launchpadAddress) {
      return new Promise(async (resolve, reject) => {
        if (window.web3) {
          if (window.ethereum?.chainId !== "0x61") {
            window.web3 = new Web3(
              new Web3.providers.HttpProvider(
                "https://data-seed-prebsc-1-s1.binance.org:8545/"
              )
            );
          } else {
            window.web3 = new Web3(window.ethereum);
          }
        }

        launchpadContract.methods
          .liquidityTokenAmount()
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
    let launchpadContract = new window.web3.eth.Contract(
      DutchSubAbi,
      launchpadAddress
    );
    return new Promise(async (resolve, reject) => {
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
    let launchpadContract = new window.web3.eth.Contract(
      DutchSubAbi,
      launchpadAddress
    );
    return new Promise(async (resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      if (window.ethereum) {
        if (window.ethereum.chainId !== "0x61") {
          window.web3 = new Web3(
            new Web3.providers.HttpProvider(
              "https://data-seed-prebsc-1-s1.binance.org:8545/"
            )
          );
        } else {
          window.web3 = new Web3(window.ethereum);
        }
      }
      // let launchpadContract = new window.web3.eth.Contract(
      //   DutchSubAbi,
      //   launchpadAddress
      // );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
        // let launchpadContract = new window.web3.eth.Contract(
        //   DutchSubAbi,
        //   launchpadAddress
        // );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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

  const getAllWhiteList = (page, size) => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .getheredCurrency()
        .call()
        .then((res) => {
          resolve(Web3.utils.fromWei(res, "ether"));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getCurrentFairSaleRate = (address) => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .getCurrentFairSaleRate()
        .call()
        .then((res) => {
          resolve(window.web3.utils.fromWei(res, "ether"));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const isfinalzed = () => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
        // let launchpadContract = new window.web3.eth.Contract(
        //   DutchSubAbi,
        //   launchpadAddress
        // );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      // let launchpadContract = new window.web3.eth.Contract(
      //   DutchSubAbi,
      //   launchpadAddress
      // );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .getLaunchpadTokenBalance()
        .call()
        .then((res) => {
          // resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const decreasePriceCycle = () => {
    return new Promise((resolve, reject) => {
      // let launchpadContract = new window.web3.eth.Contract(
      //   DutchSubAbi,
      //   launchpadAddress
      // );
      launchpadContract.methods
        .decreasePriceCycle()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getTimedelayAmount = () => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .getTimedelayAmount()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const auctionRate = () => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .auctionRate()
        .call()
        .then((res) => {
          resolve(
            parseFloat(
              Web3.utils.fromWei(String(res._auctionRate), "ether")
            ).toFixed(2)
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const getRemainingDeductionTime = (userAddress) => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .getRemainingDeductionTime(userAddress)
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const currentListingRate = () => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .currentListingRate()
        .call()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const currentTokenLiquidity = () => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .currentTokenLiquidity()
        .call()
        .then((res) => {
          resolve(Web3.utils.fromWei(String(res), "ether"));
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  const getPurchaseHistory = () => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
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
  const getUserPurchaseHistory = (userAddress) => {
    return new Promise((resolve, reject) => {
      //let launchpadContract = new window.web3.eth.Contract(
      //  DutchSubAbi,
      //    launchpadAddress
      //    );
      launchpadContract.methods
        .getUserPurchaseHistory(userAddress, 0, 10)
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
    getCurrentFairSaleRate,
    isfinalzed,
    claimToken,
    withdrawCurrencyAfterCancel,
    setToWhiteList,
    setSaleToPublic,
    isWhiteListOn,
    userPurchased,
    AddWhiteList,
    whiteLists,
    setNewTime,
    getClaimStatus,
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
    liquidityTokenAmount,
    decreasePriceCycle,
    getTimedelayAmount,
    auctionRate,
    getRemainingDeductionTime,
    currentListingRate,
    currentTokenLiquidity,
    getPurchaseHistory,
    getUserPurchaseHistory,
  };
};
