import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { subscriptionFactoryMethods } from "../../web3/Methods/SubscriptionFactoryMethods";
import { subscriptionLaunchpadMethods } from "../../web3/Methods/SubscriptionLaunchpadMethos";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";

import moment from "moment";
import { CREATE_LAUNCHPAD_MUTATION } from "../Graphql/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import {
  useCreateSubscription,
  useSubscriptionAdditionalInfo,
} from "../store/useStore";
import { Col, ModalBody, Row, Tab, Table, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import { connectWithMetamask } from "../../web3/metamask";
import { walletConnection } from "../../redux/actions/wallet-connections";
import { IS_WALLET_CONNECTED } from "../../utils/constants";
import { FaCopy, FaTelegramPlane } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { ImReddit } from "react-icons/im";
import { RiDiscordFill } from "react-icons/ri";
import { CiFacebook, CiGlobe, CiInstagram, CiTwitter } from "react-icons/ci";
import PaginatedItems from "../../components/PaginatedItems";
// import { subscriptionFactoryMethods } from "../../web3/Methods/subscriptionFactoryMethods";
import img from "../../utils/image.png";
import { IconContext } from "react-icons";
import Loader from "../../components/loader";
import { fromBn } from "evm-bn";
import { GET_ALL_LAUNCHPAD_DETAILS } from "../Graphql/Queries";
import showConsole from "../../utils/common-functions";
import switchingToBNB from "../../web3/SwitchToBNB";
import Web3 from "web3";

function SubscriptionPitchToken() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    )
  );

  const walletData = useSelector((state) => state.wallet);
  const [userPurchased, setUserPurchased] = useState();

  const [isInterval, setIsInterval] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState();
  const [whiteListAddresses, setWhiteListAddresses] = useState([]);
  const [time, setTime] = useState();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isWhitelist, setIsWhitelist] = useState(false);
  const [tokensAmount, setTokensAmount] = useState();
  const [estimatedTokensAmount, setEstimatedTokensAmount] = useState();
  const [estimatedCurrency, setEstimatedCurrency] = useState();
  const [maxValue, setMaxValue] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [refundType, setRefundType] = useState();
  const [withDrawTokenLiquidity, setWithDrawTokenLiquidity] = useState(false);
  const [isStatusCancelled, setIsStatusCancelled] = useState(false);
  const [emergencyShow, setEmergencyShow] = useState(false);
  const [hardCap, setHardCap] = useState();
  const [dataloaded, setDataLoaded] = useState(false);
  const [percentage, setPercentage] = useState();
  const [yourRefund, setYourRefund] = useState();
  const [walletBalance, setWalletBalance] = useState();

  const { loading, error, data } = useQuery(GET_ALL_LAUNCHPAD_DETAILS, {
    pollInterval: 500,
    variables: {
      filter: {
        presaleAddress: window.location.pathname.split("/")[2].toLowerCase(),
      },
    },
  });

  let isLocked;
  let metadata;
  if (window.ethereum) {
    isLocked = !window.ethereum._metamask.isUnlocked();
  }
  if (!isLocked) {
    if (loading) {
    }
    if (error) {
    }
    if (data) {
      metadata = data.GetAllLaunchpads.items[0]?.metadata;
    }
  }

  const [emergencyWithDraw, setEmergencyWithDraw] = useState(false);
  const [launchpadDetails, setLaunchpadDetails] = useState({
    subscriptionAddress: "",
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    // status: "",
    tokenDecimals: 0,
    subscriptionRate: 0,
    listingRate: 0,
    softCapTokens: 0,
    hardCapTokens: 0,
    hardCapTokensPerUser: 0,
    // minBuy: 0,
    // maxBuy: 0,
    startTime: 0,
    endTime: 0,
    liquidityPercentage: 0,
    totalSupply: 0,
    liquidityTokens: 0,
    currentPool: 0,
    iswhitListed: false,
    launcher: "",
    fee: "",
    uSoldTokenRefundType: "",
    logoUrl: "",
    website: "",
  });
  const [gatheredCurrency, setGatheredCurrency] = useState();

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [whiteListshow, setWhiteListShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isWhitelisting, setIsWhitelisting] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [RLCs, setRLCs] = useState();
  const [softRLCs, setSoftRLCs] = useState();

  const [claimableTokens, setClaimableTokens] = useState();
  const [finalStatus, setFinalStatus] = useState(false);
  const [claimTokenStatus, setClaimTokenStatus] = useState(false);
  const [claim, setClaim] = useState(false);
  const [afterFinalClaim, setAfterFinalClaim] = useState(false);
  const [whiteList, setWhiteList] = useState([{ whiteList: "" }]);
  const [cat, setCat] = useState("");
  const [everySecond, setEverySecond] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("0");
  const [lgShow, setLgShow] = useState(false);
  const [allUserPurchaselist, setAllUserPurchaseList] = useState([]);

  const [withDrawLiquidity, setWithDrawLiquidity] = useState(false);
  const [withDrawTokenStatus, setWithDrawTokenStatus] = useState(false);
  const [contractFinalStatus, setContractFinalStatus] = useState(false);
  const [contributeDisabled, setContributeDisabled] = useState(false);
  const [afterExpireCancel, setAfterExpireCancel] = useState(false);
  const [claimStatus, setClaimStatus] = useState(false);
  const [claimAndRefundStatus, setClaimAndRefundStatus] = useState(false);
  const [claimAndRefund, setClaimAndRefund] = useState(false);
  const [refundStatus, setRefundStatus] = useState(false);
  const [refund, setRefund] = useState(false);
  const [userPaid, setUserPaid] = useState();
  const [userPurchase1, setUserPurchase1] = useState();
  const [commitmentRatio1, setCommitmentRatio1] = useState();
  const [allocationRatio, setAllocationRatio] = useState();
  const [currentRaiseValue, setCurrentRaiseValue] = useState();

  const [liquidityTokens, setLiquidityTokens] = useState();
  const [listingRate1, setListingRate1] = useState();
  const [hardCapTokensperUser, setHardCapTokensPerUser] = useState();
  const balance = useCreateSubscription((state) => state.balance);

  const {
    logoUrl,
    facebookUrl,
    instagramUrl,
    gitHubUrl,
    twitterUrl,
    telegramUrl,
    discordUrl,
    redditUrl,
    webUrl,
    description,
  } = useSubscriptionAdditionalInfo((state) => ({
    logoUrl: state.logoUrl,
    facebookUrl: state.facebookUrl,
    instagramUrl: state.instagramUrl,
    gitHubUrl: state.gitHubUrl,
    twitterUrl: state.twitterUrl,
    telegramUrl: state.telegramUrl,
    discordUrl: state.discordUrl,
    redditUrl: state.redditUrl,
    webUrl: state.webUrl,
    description: state.description,
  }));
  const getTokensAmount = async () => {
    const presale = await launchpadDetails.presaleRate;
    if (presale) {
      let x = presale * amount;
      setTokensAmount(x);
    }
  };
  try {
    getTokensAmount();
  } catch {}

  const handleWhiteListChange = (e, index) => {
    if (!web3.utils.isAddress(e.target.value)) {
      toast.error("Invalid address");
      return;
    }
    const itemToChange = whiteList.find((item, i) => index === i);
    const ind = whiteList.indexOf(itemToChange);
    whiteList[ind].whiteList = e.target.value;
    const data = [...whiteList];

    setWhiteList(data);
  };

  const removeProperty = (index) => {
    if (whiteList.length == 0) return;
    else {
      let filteredList = [...whiteList.filter((item, i) => i != index)];
      setWhiteList(filteredList);
    }
  };

  const addMoreProperty = () => {
    setWhiteList((prev) => {
      return [...prev, { whiteList: "" }];
    });
  };

  const handlwWhiteList = async () => {
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[3]
    );
    setIsWhitelist(true);

    const flag = await details
      .setToWhiteList(window.location.pathname.split("/")[2])
      .then(() => {
        setIsWhitelist(false);
        setLaunchpadDetails((prev) => {
          return {
            ...prev,
            iswhitListed: true,
          };
        });
      })
      .catch(() => {
        if (walletData.chainId !== "0x61") {
          switchingToBNB();
        } else {
          toast.error("Transaction Rejected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setIsWhitelist(false);
      });
  };

  const handleWhiteListDisable = async () => {
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[3]
    );
    setIsWhitelist(true);

    await details
      .setSaleToPublic(window.location.pathname.split("/")[2])
      .then((resp) => {
        setIsWhitelist(false);
        setLaunchpadDetails((prev) => {
          return {
            ...prev,
            iswhitListed: false,
          };
        });
      })
      .catch(() => {
        if (walletData.chainId !== "0x61") {
          switchingToBNB();
        } else {
          toast.error("Transaction Rejected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setIsWhitelist(false);
      });
  };

  const getLaunchpadDetails = async () => {
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    try {
      details
        .getLaunchpadDetails(window.location.pathname.split("/")[2])
        .then(async (resp) => {
          const tokenDetail = await tokenMethods(resp[0].tokenAddress);

          const name = await tokenDetail.nameOfToken();
          const symbol = await tokenDetail.symbolOfToken();
          const decimals = await tokenDetail.decimalsOfToken();
          const totalSupply = await tokenDetail.totalSupply();

          const currentPool = await details.getLaunchpadPool(
            window.location.pathname.split("/")[2] &&
              window.location.pathname.split("/")[2]
          );

          // const iswhitelist = await details.isWhiteListOn(
          //   window.location.pathname.split("/")[2] &&
          //     window.location.pathname.split("/")[2]
          // );

          setLaunchpadDetails({
            subscriptionAddress: window.location.pathname.split("/")[2],
            tokenAddress: resp[0].tokenAddress,
            tokenName: name,
            tokenSymbol: symbol,
            tokenDecimals: decimals,
            status: resp[3],
            subscriptionRate: web3.utils.fromWei(resp._subscriptionRate),
            listingRate: resp[2],
            softCapTokens: web3.utils.fromWei(resp[0].softCapTokens),
            hardCapTokens: web3.utils.fromWei(resp[0].hardCapTokens),

            startTime: resp[0].startTime,
            endTime: resp[0].endTime,
            liquidityPercentage: resp[0].liquidity_Percentage,
            totalSupply: fromBn(totalSupply, decimals),

            currentPool: web3.utils.fromWei(currentPool),
            // iswhitListed: iswhitelist,
            launcher: resp[0].launcher,
            fee: cat,
            uSoldTokenRefundType: resp[0].uSoldTokenType,
            logoUrl: resp[0].logoURL,
            website: resp[0].website,
          });
          setIsInterval(true);
        })
        .catch((err) => {});
    } catch (err) {}
  };

  useEffect(() => {
    getPoolStatus();
    setTimeout(() => {
      everySecond === false ? setEverySecond(true) : setEverySecond(false);
    }, 1000);

    if (moment().unix() > start) {
      if (end) {
        const currentTime = moment().unix();
        const diffTime = end - currentTime;
        let duration = moment.duration(diffTime * 1000, "milliseconds");
        const interval = 1000;
        if (duration._milliseconds <= 0) {
          // setCardStatus("Expired");
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
        } else {
          // setCardStatus("InProgress");
          duration = moment.duration(duration - interval, "milliseconds");
          setDays(duration.days());
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
        }
      }
    } else {
      if (start) {
        const currentTime = moment().unix();
        const diffTime = start - currentTime;
        let duration = moment.duration(diffTime * 1000, "milliseconds");
        const interval = 1000;

        if (duration._milliseconds <= 0) {
          // setCardStatus("InComing");
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
        } else {
          duration = moment.duration(duration - interval, "milliseconds");
          setDays(duration.days());
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
        }
      }
    }
  }, [everySecond]);

  const userAdress = walletData?.account;

  const withDrawTokens = async () => {
    setWithDrawTokenStatus(true);
    try {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      await address
        .withdrawCurrencyAfterCancel(walletData?.account)
        .then(() => {
          toast.success("Operation Successful!");
        });
    } catch (error) {
      if (walletData.chainId !== "0x61") {
        switchingToBNB();
      } else {
        toast.error("Transaction Rejected", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setWithDrawTokenStatus(false);
    }
  };

  /*
   * claim token status
   * returns boolean
   */
  const getClaimStatus = async () => {
    if (window.ethereum) {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      await address
        .getClaimStatus(userAdress)
        .then((res) => {
          setClaimTokenStatus(res);
        })
        .catch((err) => {});
    }
  };

  const getRefundStatus = async () => {
    if (window.ethereum) {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      await address
        .claimRefundAddresses(userAdress)
        .then((res) => {
          setRefundStatus(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const getRefund = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const ref = await address.getRefund(userAdress);
    setYourRefund(web3.utils.fromWei(ref));
  };

  useEffect(() => {
    if (window.location.pathname.split("/")[2] && launchpadDetails) {
      var interval = setInterval(() => {
        startTime();
        endTime();

        getheredCurrency();
        isFinalized();

        checkWhitelisting();
        getContributorsList();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [launchpadDetails]);

  const getWalletBalance = async () => {
    await window.web3.eth.getBalance(walletData.account).then((res) => {
      const balance = web3.utils.fromWei(res, "ether");
      setWalletBalance(balance);
    });
  };

  useEffect(() => {
    var interval = setInterval(() => {
      checkWhitelisting();

      if (walletData.account) {
        getRefund();
        getRefundStatus();
        youPaid();
        getClaimStatus();
        getClaimableToken();

        getCurrentRaised();
        commitmentRatio();

        youPurchased();
        userPurchase();
        getContributorsList();
        getAllWhiteLists();
        getWalletBalance();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [walletData.account]);

  useEffect(() => {
    if (
      parseFloat(launchpadDetails.subscriptionRate) &&
      parseFloat(launchpadDetails.hardCapTokens)
    ) {
      let x = parseFloat(
        launchpadDetails.softCapTokens / launchpadDetails.subscriptionRate
      );
      setRLCs(x.toFixed(2));
    }
    if (
      parseFloat(launchpadDetails.subscriptionRate) &&
      parseFloat(launchpadDetails.hardCapTokens)
    ) {
      let y = parseFloat(
        launchpadDetails.hardCapTokens / launchpadDetails.subscriptionRate
      );
      setSoftRLCs(y.toFixed(2));
    }
    // getPoolStatus();
    // getheredCurrency();
    // isFinalized();
  }, []);

  useEffect(() => {
    feeCategorey();
    getLaunchpadDetails();
    getRefundType();
    hardcapTokenPerUser();
  }, []);

  const checkWhitelisting = async () => {
    if (window.ethereum) {
      const details = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      await details
        .isWhiteListOn(
          window.location.pathname.split("/")[2],
          walletData?.account
        )
        .then((resp) => {
          setLaunchpadDetails((prev) => {
            return {
              ...prev,
              iswhitListed: resp,
            };
          });
        });
    }
  };

  const userPurchase = async () => {
    if (window.ethereum) {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      const purchase = await address.userPurchased(walletData?.account);

      setUserPurchased(parseFloat(purchase));
    }
  };

  useEffect(() => {
    try {
      const getEstimatedTokenReceived = async () => {
        if (window.location.pathname.split("/")[2]) {
          const address = await subscriptionLaunchpadMethods(
            window.location.pathname.split("/")[2]
          );
          if (amount > 0) {
            await address
              .getEstimatedTokenReceived(amount)
              .then((res) => {
                setEstimatedTokensAmount(
                  web3.utils.fromWei(String(res[0]), "ether")
                );
                setEstimatedCurrency(
                  web3.utils.fromWei(String(res[1]), "ether")
                );
              })
              .catch((err) => {});
          }
        }
      };

      getEstimatedTokenReceived();
    } catch (error) {}
  }, [amount]);

  const getRefundType = async () => {
    if (window.location.pathname.split("/")[2]) {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      let refund = await address.getRefundType();
      setRefundType(refund);
    }
  };

  useEffect(() => {}, [launchpadDetails]);

  useEffect(() => {
    var interval = setInterval(() => {
      if (launchpadDetails.subscriptionAddress) {
        getLaunchpadTokenBalance();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [launchpadDetails.subscriptionAddress]);

  // Createlaunchpad({
  //   variables: {
  //     Createlaunchpad: {
  //       launchpadID: launchpadDetails.presaleAddress,
  //       tokenAddress: launchpadDetails.tokenAddress,
  //       minimumBuy: parseFloat(launchpadDetails.minBuy),
  //       maximumBuy: parseFloat(launchpadDetails.maxBuy),
  //       softCap: parseFloat(launchpadDetails.softCap),
  //       hardCap: parseFloat(launchpadDetails.hardCap),
  //       listingRate: parseInt(launchpadDetails.listingRate),
  //       liquidityPercentage: parseFloat(launchpadDetails.liquidityPercentage),
  //       startTime: start,
  //       endTime: end,
  //       refundType: launchpadDetails.refundType,
  //       name: launchpadDetails.tokenName,
  //       symbol: launchpadDetails.tokenSymbol,
  //     },
  //   },
  // });

  // const withDrawTime = async () => {
  //   const time = await subscriptionFactoryMethods();
  //   time
  //     .withDrawTime()
  //     .then((res) => {
  //       setTime(res);
  //     })
  //     .catch(() => {});
  // };

  /**
   * Contribute in Launchpad
   *
   */
  const Contribute = async () => {
    if (!parseFloat(amount)) {
      toast.error("Enter amount", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    // if (parseFloat(amount) < parseFloat(launchpadDetails.minBuy)) {
    //   toast.error("Amount must be greater than minimum buy", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   return;
    // }

    // if (
    //   parseFloat(userPurchased) >
    //   parseFloat(hardCapTokensperUser / launchpadDetails.subscriptionRate)
    // ) {
    //   // alertHandled("Amount must be smaller than hardcap");
    //   toast.error("Amount must be smaller than Hard Cap Per User", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   return;
    // }

    // if (
    //   parseFloat(launchpadDetails.currentPool) + parseFloat(amount) >
    //   parseFloat(hardCapTokensperUser / launchpadDetails.subscriptionRate)
    // ) {
    //   // alertHandled("Total amount must be smaller than hardcap");
    //   toast.error("Amount must be smaller than Hard Cap Per User", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   return;
    // }

    // if (
    //   parseFloat(userPurchased) + parseFloat(amount) >
    //   parseFloat(hardCapTokensperUser / launchpadDetails.subscriptionRate)
    // ) {
    //   // alertHandled("Total amount must be smaller than hardcap");
    //   toast.error("User cannot buy more than maximum buy limit", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //   });
    //   return;
    // }

    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const isUserWhiteListed = await details.whiteLists(
      window.location.pathname.split("/")[2],
      walletData.account
    );

    if (launchpadDetails.iswhitListed && !isUserWhiteListed) {
      toast.error("You are not whitelisted!");
      return;
    }

    setContributeDisabled(true);
    details
      .contributeLaunchpad(window.location.pathname.split("/")[2], amount)
      .then(async (resp) => {
        const currentPool = await details.getLaunchpadPool(
          window.location.pathname.split("/")[2]
        );
        setLaunchpadDetails((pre) => {
          return {
            ...pre,
            currentPool: web3.utils.fromWei(currentPool),
          };
        });
        setContributeDisabled(false);
        await window.web3.eth.getBalance(walletData.account).then((res) => {
          const balance = web3.utils.fromWei(res, "ether");
          setWalletBalance(balance);
        });
        setAmount(0);
      })
      .catch(() => {
        setContributeDisabled(false);
      });

    // dispatchh();
  };

  /**
   * Finalize Launchpad
   */
  const Finalize = async () => {
    setFinalStatus(true);

    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const currencyForLiqiudity = await details.getCurrency(
      window.location.pathname.split("/")[2]
    );

    details
      .finalizeLaunchpad(window.location.pathname.split("/")[2])
      .then((resp) => {
        // navigate("/");

        setFinalStatus(false);
        setAfterFinalClaim(true);
      })
      .catch(() => {
        if (walletData.chainId !== "0x61") {
          switchingToBNB();
        } else {
          toast.error("Transaction Rejected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setFinalStatus(false);
      });
  };

  /**
   * cancel launchpad
   */
  const cancelLaunchpad = async () => {
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    setIsCancelled(true);

    // const transferAmount = details.withdrawCurrencyAfterCancel(
    //   window.ethereum.selectedAddress
    // );
    // setIsDisabled(true);
    // if (transferAmount) {
    details
      .cancelLaunchpad(walletData?.account)
      .then((res) => {
        setIsCancelled(true);
        setAfterExpireCancel(true);
        setIsStatusCancelled(true);
      })
      .catch(() => {
        if (walletData.chainId !== "0x61") {
          switchingToBNB();
        } else {
          toast.error("Transaction Rejected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
        setIsCancelled(false);
      });
  };

  /**
   * status of pool
   * i.e inProgress,finised,expire etc
   */
  const getPoolStatus = async () => {
    if (window.location.pathname.split("/")[2]) {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2] &&
          window.location.pathname.split("/")[2]
      );
      try {
        const status = await address.getPoolStatus(
          window.location.pathname.split("/")[2] &&
            window.location.pathname.split("/")[2]
        );
        setStatus(status[3]);
      } catch (error) {
        getPoolStatus();
      }
    }
  };

  const startTime = async () => {
    if (window.location.pathname.split("/")[2]) {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2] &&
          window.location.pathname.split("/")[2]
      );
      try {
        const s = await address.startTime(
          window.location.pathname.split("/")[2]
        );
        setStart(s);
      } catch (error) {
        startTime();
      }
    }
  };

  const endTime = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    try {
      const e = await address.endTime(window.location.pathname.split("/")[2]);
      setEnd(e);
    } catch (error) {
      endTime();
    }
  };

  /**
   * amount of tokens claimed by the user
   */
  const getClaimableToken = async () => {
    if (window.ethereum) {
      const address = await subscriptionLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      const tokens = await address.getClaimableToken(walletData?.account);
      setClaimableTokens(web3.utils.fromWei(tokens));
    }
  };

  const [claimTokenLoader, setClaimTokenLoader] = useState(false);
  /**
   * Boolean Status of Tokens claim by the user
   * i.e. true or flase
   */
  const claimToken = async () => {
    setClaimTokenLoader(true);
    // setIsDisabled(true);

    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address
      .claimToken(walletData.account)
      .then(() => {
        setClaimStatus(true);
        setClaimTokenLoader(false);
        toast.success("Operation Succesfull");
      })
      .catch(() => {
        setClaimTokenLoader(false);
        if (walletData.chainId !== "0x61") {
          switchingToBNB();
        } else {
          toast.error("Transaction Rejected", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
  };

  const claimAndRefundToken = async () => {
    setClaimAndRefund(true);
    // setIsDisabled(true);

    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address
      .claimAndRefundToken(walletData?.account)
      .then(() => {
        setClaimAndRefundStatus(true);
        setClaimAndRefund(false);
        toast.success("Operation Succesfull");
      })
      .catch(() => {
        setClaimAndRefund(false);
        toast.error("Transaction Rejected");
      });
  };

  const claimRefund = async () => {
    setRefund(true);
    // setIsDisabled(true);

    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address
      .claimRefund(walletData?.account)
      .then(() => {
        // setRefundStatus(true);
        setRefund(false);
        toast.success("Operation Succesfull");
      })
      .catch(() => {
        setRefund(false);
        toast.error("Transaction Rejected");
      });
  };

  const youPaid = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    if (walletData?.account) {
      await address.youPaid(walletData.account).then((res) => {
        setUserPaid(web3.utils.fromWei(res));
      });
    }
  };
  const youPurchased = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    if (walletData?.account) {
      await address.youPurchased(walletData.account).then((res) => {
        setUserPurchase1(web3.utils.fromWei(res));
      });
    }
  };

  const commitmentRatio = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address.commitmentRatio(walletData.account).then((res) => {
      setCommitmentRatio1(web3.utils.fromWei(res[0], "ether"));
      setAllocationRatio(web3.utils.fromWei(res[1], "ether"));
    });
  };

  const hardcapTokenPerUser = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address
      .hardcapTokenPerUser()
      .then((res) => {
        setHardCapTokensPerUser(web3.utils.fromWei(res));
      })
      .catch((err) => {});
  };

  /**
   * get gathered currency
   * aamount gathered in a pool
   */
  const getheredCurrency = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const gathered = await address.getheredCurrency();
    setGatheredCurrency(gathered);
  };

  /**
   * get contributors list
   */
  const getContributorsList = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const list = await address.getContributorsList();
    setList(list);
  };

  const liquidityTokenAmount = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const token = await address.liquidityTokenAmount();
    setLiquidityTokens(web3.utils.fromWei(token, "ether"));
  };
  const getTokenRate = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const result = await address.getTokenRate();
    setHardCap(web3.utils.fromWei(result[0], "ether"));
  };
  const listingRate = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const result = await address.listingRate();
    setListingRate1(web3.utils.fromWei(result, "ether"));
  };

  /**
   * Boolean status if Finalize Launchpad
   */
  const isFinalized = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const isFinal = await address.finalized();
    if (isFinal) {
      setIsDisabled(true);
      setFinalStatus(false);
      setContractFinalStatus(isFinal);
      setAfterFinalClaim(isFinal);
      // setClaimTokenStatus(isFinal);
    }
  };

  /**
   * Selected Fee at time of creation
   */
  const feeCategorey = async () => {
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address.feeCategorey().then((res) => {
      setCat(res);
    });
  };

  /**
   * Emergency WithDraw Contribution
   */
  const emergencyWithDrawContribution = async () => {
    handleEmergencyClose();
    setEmergencyWithDraw(true);
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .emergencyWithdraw(walletData.account)
      .then(() => {
        setEmergencyWithDraw(false);
        setUserPurchased(0);
      })
      .catch(() => {
        handleEmergencyClose();
        setEmergencyWithDraw(false);
      });
  };

  const withDrawLiquidityTokens = async () => {
    setWithDrawLiquidity(true);
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .withDrawLiquidityTokens(walletData.account)
      .then(() => {
        setWithDrawLiquidity(true);
        setWithDrawTokenLiquidity(1);

        toast.success("Operation Successful", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch(() => {
        setWithDrawLiquidity(false);
      });
  };

  const getLaunchpadTokenBalance = async () => {
    const tokenDetail = await tokenMethods(launchpadDetails.tokenAddress);
    const balance = await tokenDetail.balanceOfToken(
      launchpadDetails.subscriptionAddress
    );

    setWithDrawTokenLiquidity(parseFloat(web3.utils.fromWei(balance, "ether")));
  };

  // useEffect(() => {
  //   if (window.location.pathname.split("/")[2]) {
  //   }
  // }, [launchpadDetails]);

  useEffect(() => {
    listingRate();
    liquidityTokenAmount();
    getTokenRate();
  }, [launchpadDetails]);

  const handleMax = (e) => {
    e.preventDefault();
    if (walletData) {
      const balance = parseFloat(web3.utils.fromWei(walletData.balance));
      const maxBuy = parseFloat(launchpadDetails.maxBuy);
      if (maxBuy <= balance) {
        setAmount(maxBuy);
      } else {
        setAmount(balance);
      }
    }
  };

  const onSubmit = (e) => {
    handleWhiteListClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getContributorsList();
    setShow(true);
  };

  const handleWhiteListShow = () => setWhiteListShow(true);
  const handleWhiteListClose = () => {
    setIsAddingAddress(false);
    setWhiteList((prev) => {
      return [{ whiteList: "" }];
    });
    setWhiteListShow(false);
  };

  const handleEmergencyClose = () => {
    setEmergencyShow(false);
    setEmergencyWithDraw(false);
  };
  const handleEmergencyShow = () => setEmergencyShow(true);

  // const handleClick = () => {
  //   setCounter((prev) => [...prev, counter + 1]);
  // };

  const toFindDuplicates = (arry) =>
    arry.filter((item, index) => arry.indexOf(item) !== index);

  const handleAddWhiteList = async () => {
    setIsAddingAddress(true);
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const getAllWhiteList = await details.getAllWhiteList(0, 10);

    const duplicateElements = toFindDuplicates([
      ...whiteList.map((i) => i.whiteList),
    ]);
    if (duplicateElements.length > 0) {
      toast.error("Can't enter duplicate addresses");
      setIsAddingAddress(false);

      return;
    }

    const distinctAddresses = [
      ...new Set([...whiteList.map((i) => i.whiteList)]),
    ];

    let check = false;
    getAllWhiteList.map((i) => {
      if (distinctAddresses.includes(i)) {
        toast.error(
          `Address ${
            i.slice(0, 7) + "..." + i.slice(35, i.length)
          } already whitelistted`
        );
        setIsAddingAddress(false);
        check = true;
      }
    });

    if (check) return;

    // if(distinctAddresses.includes(getAllWhiteList.map(i => i))){

    // }

    details
      .AddWhiteList(distinctAddresses, walletData.account)
      .then(() => {
        distinctAddresses.map((item) => {
          setWhiteListAddresses((prev) => [...prev, item]);
        });
        // setWhiteList([{whiteList: distinctAddresses.map(i=> i)}])

        // setWhiteListAddresses(...distinctAddresses.map(i=> i.whi))
        setIsAddingAddress(false);
        toast.success("User(s) whitelisted successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleWhiteListClose();
        window.location.reload();
      })
      .catch(() => {
        setIsAddingAddress(false);

        toast.error("Transaction Rejected", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const getAllWhiteLists = async () => {
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const getAllWhiteList = await details.getAllWhiteList(0, 10);
    setWhiteListAddresses(getAllWhiteList);
  };

  const removeWhiteListing = async (address) => {
    setIsWhitelisting(true);
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const whiteListRemoved = await details.RemoveWhiteList(
      [address],
      walletData.account
    );

    if (!whiteListRemoved) {
      toast.error("Transaction Rejected");
      return;
    }

    const indexToRemove = whiteListAddresses.indexOf(address);

    if (indexToRemove !== -1) {
      const newArr = whiteListAddresses.splice(indexToRemove, 1);
      const newArr2 = whiteListAddresses.filter(
        (item) => item !== indexToRemove
      );
      setWhiteListAddresses(newArr2);
    }

    toast.success("User has been removed successfully!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsWhitelisting(false);
  };

  const getCurrentRaised = async () => {
    const details = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await details.getCurrentRaise().then((res) => {
      setCurrentRaiseValue(web3.utils.fromWei(res, "ether"));
    });
  };

  const copyToClipboard = (address, key) => {
    if (key === "token") {
      try {
        navigator.clipboard.writeText(address);
        toast.success("Copied User Address", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error("Error");
      }
    } else {
      try {
        navigator.clipboard.writeText(address);
        toast.success("Copied Address", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        toast.error("Error", error.message);
      }
    }
  };

  const handleAmount = (e) => {
    const x = e.target.value;
    const validated = x.match(/^(\d*\.{0,1}\d{0,4}$)/);
    if (validated) {
      setAmount(e.target.value);
    }
  };

  window.onpopstate = (e) => {
    navigate("/");
  };

  const onImageError = (e) => {
    e.target.src = img;
  };

  useEffect(() => {
    const percentage = (currentRaiseValue / hardCap) * 100;
    setPercentage(parseFloat(percentage));
  }, [gatheredCurrency]);

  const [showWhiteList, setShowWhiteList] = useState(false);

  const showWhiteListAddresses = (e) => {};

  const handleShowWhiteList = () => {
    setShowWhiteList((current) => !current);
    // setShowWhiteList(true);
  };

  const getPurchaseHistory = async () => {
    setLgShow(true);
    const address = await subscriptionLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address
      .getPurchaseHistory()
      .then((res) => {
        setAllUserPurchaseList(res);
      })
      .catch(() => {
        setWithDrawLiquidity(false);
      });
  };

  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                <div className="full-div shadow-box">
                  {launchpadDetails.subscriptionAddress !== "" ? (
                    <>
                      <div className="flex-div">
                        <div className="pitchtoken-head">
                          <div className="flex-div">
                            <>
                              <img
                                className="circle-span"
                                src={
                                  launchpadDetails.logoUrl
                                    ? launchpadDetails.logoUrl
                                    : img
                                }
                                alt="Not available"
                                onError={onImageError}
                              />
                            </>
                            <div className="flex-div">
                              <div style={{ display: "flex" }}>
                                <h1>
                                  {launchpadDetails.tokenName +
                                    " " +
                                    "Subscription"}
                                </h1>
                              </div>

                              <div>
                                <Button
                                  type="button"
                                  style={{ minWidth: "120px" }}
                                  className={`sale-btn  ${
                                    isStatusCancelled
                                      ? "gray"
                                      : moment().unix() < start
                                      ? "yellow"
                                      : status === "1"
                                      ? "green"
                                      : status === "2"
                                      ? "green"
                                      : status === "3"
                                      ? "red"
                                      : status === "4"
                                      ? "gray"
                                      : status === "5"
                                      ? "red"
                                      : ""
                                  }`}
                                >
                                  <span></span>
                                  {isStatusCancelled
                                    ? "Cancelled"
                                    : moment().unix() < start
                                    ? "Upcoming"
                                    : status === "1"
                                    ? "Sale Live"
                                    : status === "2"
                                    ? "Filled"
                                    : status === "3"
                                    ? "Sale Ended"
                                    : status === "4"
                                    ? "Cancelled"
                                    : status === "5"
                                    ? "Expired"
                                    : ""}
                                </Button>
                              </div>
                            </div>
                          </div>

                          {data ? (
                            <div className="social-media-icons-container text-danger">
                              {metadata?.website ? (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={
                                      metadata?.website
                                        ? metadata?.website
                                        : launchpadDetails.website
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <CiGlobe />
                                  </a>
                                </IconContext.Provider>
                              ) : (
                                ""
                              )}
                              {metadata?.twitterUrl && (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={
                                      twitterUrl
                                        ? twitterUrl
                                        : metadata.twitterUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <CiTwitter />
                                  </a>
                                </IconContext.Provider>
                              )}
                              {metadata?.facebookUrl && (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={metadata?.facebookUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <CiFacebook />
                                  </a>
                                </IconContext.Provider>
                              )}
                              {metadata?.telegramUrl && (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={metadata?.telegramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <FaTelegramPlane />
                                  </a>
                                </IconContext.Provider>
                              )}
                              {metadata?.githubUrl && (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={metadata?.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <FiGithub />
                                  </a>
                                </IconContext.Provider>
                              )}

                              {metadata?.instagramUrl && (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={metadata?.instagramUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <CiInstagram />
                                  </a>
                                </IconContext.Provider>
                              )}
                              {metadata?.discordUrl && (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={metadata?.discordUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <RiDiscordFill />
                                  </a>
                                </IconContext.Provider>
                              )}
                              {metadata?.redditUrl && (
                                <IconContext.Provider
                                  value={{
                                    className: "social-media-icon",
                                    style: { fontSize: "2rem" },
                                  }}
                                >
                                  <a
                                    href={metadata?.redditUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <ImReddit />
                                  </a>
                                </IconContext.Provider>
                              )}
                              {metadata?.description && (
                                <p
                                  style={{
                                    paddingLeft: "0%",
                                    marginTop: "15px",
                                  }}
                                  className="text-white"
                                >
                                  {metadata?.description}
                                </p>
                              )}
                            </div>
                          ) : (
                            <Loader />
                          )}
                        </div>
                      </div>
                      <div className="space-20"></div>
                      <ul className="flex-list">
                        <li>
                          <p>
                            <b>Subscription Address</b>
                          </p>
                          <p className="word-break">
                            {launchpadDetails.subscriptionAddress}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Token Name</b>
                          </p>
                          <p>{launchpadDetails.tokenName}</p>
                        </li>
                        <li>
                          <p>
                            <b>Token Symbol</b>
                          </p>
                          <p>{launchpadDetails.tokenSymbol}</p>
                        </li>
                        <li>
                          <p>
                            <b>Token Decimals</b>
                          </p>
                          <p>{launchpadDetails.tokenDecimals}</p>
                        </li>
                        <li>
                          <p>
                            <b>Token Address</b>
                          </p>
                          <p className="word-break">
                            {launchpadDetails.tokenAddress}
                            <FaCopy
                              className="copy-icon-token"
                              title="Copy Address"
                              onClick={(e) => {
                                copyToClipboard(
                                  launchpadDetails.tokenAddress,
                                  "token"
                                );
                              }}
                            />
                            <p>(Do not send BNB to the token address!)</p>
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Total Supply</b>
                          </p>
                          <p>
                            {launchpadDetails.totalSupply}{" "}
                            {launchpadDetails.tokenSymbol}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>HardCap Tokens</b>
                          </p>
                          <p>
                            {launchpadDetails.hardCapTokens}{" "}
                            {launchpadDetails.tokenSymbol} (
                            {parseFloat(
                              launchpadDetails.hardCapTokens /
                                launchpadDetails.subscriptionRate
                            ).toFixed(2)}
                            {"  "}
                            BNB)
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>SoftCap Tokens</b>
                          </p>
                          <p>
                            {launchpadDetails.softCapTokens}{" "}
                            {launchpadDetails.tokenSymbol} (
                            {parseFloat(
                              launchpadDetails.softCapTokens /
                                launchpadDetails.subscriptionRate
                            ).toFixed(2)}
                            {"  "}
                            BNB)
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Tokens For Liquidity</b>
                          </p>
                          <p>
                            {liquidityTokens} {launchpadDetails.tokenSymbol}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Subscription Rate</b>
                          </p>
                          <p>
                            1 BNB = {launchpadDetails.subscriptionRate}{" "}
                            {launchpadDetails.tokenSymbol}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Listing Rate</b>
                          </p>
                          <p>
                            1 BNB = {listingRate1}{" "}
                            {launchpadDetails.tokenSymbol}
                          </p>
                        </li>
                        {/* <li>
                      <p>
                        <b>Initial Market Cap (estimate) </b>
                      </p>
                      <p>$30245787</p>
                    </li> */}

                        <li>
                          <p>
                            <b>Unsold Tokens</b>
                          </p>
                          <p>{refundType == "0" ? "Refund" : "Burn"}</p>
                        </li>
                        <li>
                          <p>
                            {/* <b>{status === "0" ? 'Presale Start Time': launchpadDetails.status === "5" ? 'Time Ended': 'Ends in'} </b> */}
                            <b>Start Time</b>
                          </p>
                          <p>{moment.unix(start).format("lll")}</p>
                        </li>
                        <li>
                          <p>
                            <b>End Time</b>
                          </p>
                          <p>{moment.unix(end).format("lll")}</p>
                        </li>
                        <li>
                          <p>
                            <b>Listing On</b>
                          </p>
                          <a
                            href={`https://pancakeswap.finance/swap?outputCurrency=${launchpadDetails.tokenAddress}&chain=bscTestnet`}
                            target="_blank"
                            style={
                              !launchpadDetails.tokenAddress
                                ? { pointerEvents: "none" }
                                : null
                            }
                            className="listing-text"
                          >
                            Pancake Swap
                          </a>
                        </li>
                        <li>
                          <p>
                            <b>Liquidity Percent</b>
                          </p>
                          <p>{launchpadDetails.liquidityPercentage}%</p>
                        </li>
                      </ul>
                      {/* {launchpadDetails.iswhitListed && (
                        <Button
                          onClick={showWhiteListAddresses}
                          className="reg-gradient"
                        >
                          Show Whitelist Addresses
                        </Button>
                      )} */}

                      <div className="white-list-container word-break">
                        {showWhiteList &&
                          launchpadDetails.iswhitListed &&
                          whiteListAddresses.length > 0 &&
                          (launchpadDetails.launcher &&
                          launchpadDetails?.launcher?.toLowerCase() ===
                            walletData.account ? (
                            <PaginatedItems
                              removeWhiteListing={removeWhiteListing}
                              itemsPerPage={5}
                              whiteListAddresses={whiteListAddresses}
                              isWhitelisting={isWhitelisting}
                              setIsWhitelisting={setIsWhitelisting}
                            />
                          ) : (
                            ""
                          ))}
                      </div>
                    </>
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>

              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                {/* Put Ended In start-timer-pool div */}
                <div className="full-div shadow-box start-timer-pool">
                  {(status === "0" || status === "1") &&
                  !contractFinalStatus ? (
                    <>
                      <div className="text-center">
                        <h3>
                          {moment().unix() < start
                            ? "Subscription Starts In"
                            : moment().unix() < end
                            ? "Subscription Ends in"
                            : status === "5"
                            ? "Subscription Expired"
                            : "Subscription Ended"}
                        </h3>
                      </div>
                      <ul className="timer-list">
                        <li>{days}</li>
                        <li>{hours}</li>
                        <li>{minutes}</li>
                        <li>{seconds}</li>
                      </ul>
                      <ProgressBar now={(gatheredCurrency / hardCap) * 100} />

                      <div className="flex-div">
                        <span className="text-secondary">
                          {gatheredCurrency} BNB
                        </span>
                        <span className="text-secondary">
                          {parseFloat(hardCap).toFixed(3)} BNB
                        </span>
                      </div>

                      <div className="text-center">
                        <p>This Pool has been ended</p>
                      </div>
                      <div className="space-20"></div>
                      <h3>
                        Amount(max:{" "}
                        {walletData.balance
                          ? parseFloat(walletBalance).toFixed(3)
                          : "0"}
                        BNB)
                      </h3>
                      <div className="flex-div input-submit-div">
                        <input
                          type="number"
                          autoComplete="off"
                          id="token-symbol"
                          step="any"
                          value={amount}
                          placeholder="0.0"
                          // onChange={handleAmount}
                          onChange={(e) => handleAmount(e)}
                          // {...register("max", {
                          // })}
                        />
                        {<Button onClick={handleMax}>Max</Button>}
                      </div>
                      {amount && (
                        <div className="text-white">
                          <small>
                            Estimate tokens received:{" "}
                            {estimatedTokensAmount
                              ? parseFloat(estimatedTokensAmount).toFixed(4)
                              : 0}{" "}
                            {launchpadDetails.tokenSymbol} (
                            {estimatedCurrency
                              ? parseFloat(estimatedCurrency).toFixed(4)
                              : 0}{" "}
                            BNB)
                          </small>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <ProgressBar now={(gatheredCurrency / hardCap) * 100} />
                      <div className="flex-div">
                        <span className="text-secondary">
                          {gatheredCurrency} BNB
                        </span>
                        <span className="text-secondary">
                          {parseFloat(hardCap).toFixed(3)} BNB
                        </span>
                      </div>
                    </>
                  )}
                  {status === "2" ? (
                    <h6 className="text-white text-center">Pool Has Filled</h6>
                  ) : status === "3" ? (
                    <h6 className="text-white text-center">Pool Has Ended</h6>
                  ) : status === "4" ? (
                    <h6 className="text-white text-center">
                      Pool Has Cancelled
                    </h6>
                  ) : status === "5" ? (
                    <h6 className="text-white text-center">Pool Has Expired</h6>
                  ) : (
                    ""
                  )}

                  <div className="text-center">
                    {walletData.account ? (
                      afterFinalClaim ? (
                        userPurchased > 0 ? (
                          <ul>
                            {parseFloat(yourRefund) > 0 ? (
                              !claimTokenStatus && !refundStatus ? (
                                <ul>
                                  <div style={{ padding: "3px" }}>
                                    <li>
                                      <Button
                                        className="reg-gradient"
                                        onClick={() => claimToken()}
                                        disabled={claimTokenStatus}
                                      >
                                        {claimTokenLoader ? (
                                          <Loader />
                                        ) : (
                                          `Claim token (${
                                            userPurchase1
                                              ? parseFloat(
                                                  userPurchase1
                                                ).toFixed(4)
                                              : 0
                                          }
                                 )`
                                        )}
                                      </Button>
                                    </li>
                                  </div>
                                  <div style={{ padding: "3px" }}>
                                    <li>
                                      <Button
                                        className="reg-gradient"
                                        onClick={() => claimAndRefundToken()}
                                        disabled={claimTokenStatus}
                                      >
                                        {claimAndRefund ? (
                                          <Loader />
                                        ) : (
                                          `Claim and Refund`
                                        )}
                                      </Button>
                                    </li>
                                  </div>
                                  <div style={{ padding: "3px" }}>
                                    <li>
                                      <Button
                                        className="reg-gradient"
                                        onClick={() => claimRefund()}
                                        disabled={claimTokenStatus}
                                      >
                                        {refund ? <Loader /> : `Claim Refund`}
                                      </Button>
                                    </li>
                                  </div>
                                </ul>
                              ) : claimTokenStatus &&
                                !refundStatus &&
                                parseFloat(yourRefund) > 0 ? (
                                <Button
                                  className="reg-gradient"
                                  onClick={() => claimRefund()}
                                >
                                  {refund ? <Loader /> : `Claim Refund`}
                                </Button>
                              ) : !claimTokenStatus && refundStatus ? (
                                <Button
                                  className="reg-gradient"
                                  onClick={() => claimToken()}
                                  disabled={claimTokenStatus}
                                >
                                  {claimTokenLoader ? (
                                    <Loader />
                                  ) : (
                                    `Claim Token (${
                                      userPurchase1
                                        ? parseFloat(userPurchase1).toFixed(4)
                                        : 0
                                    }
                              )`
                                  )}
                                </Button>
                              ) : (
                                ""
                              )
                            ) : (
                              <Button
                                className="reg-gradient"
                                onClick={() => claimToken()}
                                disabled={claimTokenStatus}
                              >
                                {claimTokenLoader ? (
                                  <Loader />
                                ) : (
                                  `Claim token (${
                                    userPurchase1
                                      ? parseFloat(userPurchase1).toFixed(4)
                                      : 0
                                  }
                            )`
                                )}
                              </Button>
                            )}
                          </ul>
                        ) : (
                          // <ul>
                          //   <div style={{padding: "3px"}} >
                          //     {claimTokenStatus &&

                          //     parseFloat(yourRefund) > 0 ? (
                          //       <li>
                          //         <Button
                          //           className="reg-gradient"
                          //           onClick={() => claimRefund()}
                          //         >
                          //           {claim ? <Loader /> : `Claim refund`}
                          //         </Button>
                          //       </li>
                          //     ) : !claimTokenStatus ? (
                          //       <li>
                          //         <Button
                          //           className="reg-gradient"
                          //           onClick={() => claimToken()}
                          //           disabled={claimTokenStatus}
                          //         >
                          //           {claim ? (
                          //             <Loader />
                          //           ) : (
                          //             `Claim token (${
                          //               userPurchase1
                          //                 ? parseFloat(userPurchase1).toFixed(4)
                          //                 : 0
                          //             }
                          //       )`
                          //           )}
                          //         </Button>
                          //       </li>
                          //     ) : (
                          //       <Button disabled className="reg-gradient">
                          //         Token Claimed{" "}
                          //         {parseFloat(userPurchase1).toFixed(4)}
                          //       </Button>
                          //     )}
                          //   </div>
                          //   <div style={{padding: "3px"}} >
                          //     {/* {parseFloat(yourRefund) > 0 &&
                          //     !refundStatus &&
                          //     !claimTokenStatus ? (
                          //       <li>
                          //         <></>
                          //       </li>

                          //     ) : */}
                          //     { !claimAndRefundStatus && parseFloat(yourRefund) > 0 ? (
                          //       <li>
                          //         <Button
                          //           className="reg-gradient"
                          //           onClick={() => claimAndRefundToken()}
                          //           disabled={claimTokenStatus}
                          //         >
                          //           {claimAndRefund ? (
                          //             <Loader />
                          //           ) : (
                          //             `Claim and Refund  `
                          //           )}
                          //         </Button>
                          //       </li>
                          //     ) : (
                          //       <></>
                          //     )}
                          //   </div>

                          //   <div style={{padding: "3px"}} >
                          //     {parseFloat(yourRefund) > 0 &&
                          //     !refundStatus &&
                          //     !claimTokenStatus ? (
                          //       refundStatus &&
                          //       !claimTokenStatus &&
                          //       !claimAndRefundStatus ? (
                          //         <li>
                          //           <Button
                          //             className="reg-gradient"
                          //             onClick={() => claimToken()}
                          //           >
                          //             {refund ? (
                          //               <Loader />
                          //             ) : (
                          //               `Claim token (${
                          //                 userPurchase1
                          //                   ? parseFloat(userPurchase1).toFixed(
                          //                       4
                          //                     )
                          //                   : 0
                          //               }
                          //       )`
                          //             )}
                          //           </Button>
                          //         </li>
                          //       ) : (
                          //         parseFloat(yourRefund) > 0  &&  !claimTokenStatus  &&(
                          //           <li>
                          //             <Button
                          //               className="reg-gradient"
                          //               onClick={() => claimRefund()}
                          //             >
                          //               {refund ? <Loader /> : `Claim Refund`}
                          //             </Button>
                          //           </li>
                          //         )
                          //       )
                          //     ) : (
                          //       <></>
                          //     )}
                          //   </div>
                          // </ul>
                          <>
                            <h6 className="text-white text-center">
                              You Didn't Conribute in this Pool
                            </h6>
                          </>
                        )
                      ) : moment().unix() > start &&
                        moment().unix() < end &&
                        parseFloat(gatheredCurrency) <
                          parseFloat(launchpadDetails.hardCapTokens) &&
                        status !== "4" ? (
                        <Button
                          className="reg-gradient"
                          onClick={() => Contribute()}
                          disabled={contributeDisabled}
                        >
                          {contributeDisabled ? (
                            <Oval
                              height={27}
                              width={27}
                              color="#000"
                              wrapperStyle={{}}
                              wrapperClass="contribute-oval"
                              visible={true}
                              ariaLabel="oval-loading"
                              secondaryColor="#aaa"
                              strokeWidth={6}
                              strokeWidthSecondary={6}
                            />
                          ) : (
                            <span className="contribute">Contribute</span>
                          )}
                        </Button>
                      ) : (
                        <Button className="reg-gradient" disabled>
                          Contribute
                        </Button>
                      )
                    ) : (
                      <Button
                        className="reg-gradient"
                        onClick={() => {
                          if (!window.ethereum) {
                            toast.error("Please Install Metamask", {
                              position: "top-right",
                              autoClose: 1500,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "light",
                            });
                            return;
                          }
                          connectWithMetamask().then((resp) => {
                            localStorage.setItem(IS_WALLET_CONNECTED, true);
                            dispatch(walletConnection(resp));
                          });
                          if (!window.ethereum) {
                            toast.error("Please Install Metamask", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "dark",
                            });
                          }
                        }}
                      >
                        Connect Wallet
                      </Button>
                    )}
                    {status === "4" || status === "5"
                      ? parseFloat(userPurchased) > 0 &&
                        walletData.account && (
                          <Button
                            onClick={withDrawTokens}
                            disabled={withDrawTokenStatus}
                            className="reg-gradient d-block mx-auto mt-3"
                          >
                            {withDrawTokenStatus ? (
                              <Loader />
                            ) : (
                              "Withdraw Contribution"
                            )}
                          </Button>
                        )
                      : ""}
                    <hr />

                    {/* {walletData.account &&
                    userPurchased > 0 &&
                    moment().unix() <= end - time &&
                    parseFloat(gatheredCurrency) <
                      parseFloat(launchpadDetails.hardCap) &&
                    status != "4" ? (
                      <>
                        <Button
                          className="reg-gradient"
                          onClick={handleEmergencyShow}
                          disabled={emergencyWithDraw}
                        >
                          Emergency Withdraw
                        </Button>
                        <Modal
                          onEscapeKeyDown={handleEmergencyClose}
                          show={emergencyShow}
                          onHide={handleEmergencyClose}
                          className="contributers-list-container"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Confirm Emergency WithDraw
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="reload-warning-div container">
                              <p>
                                Emergency withdrawal takes your contribution
                                (with 10% penalty ) out of Presale Pool and
                                cancels your participation in the presale
                              </p>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              className="reg-gradient"
                              onClick={handleEmergencyClose}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="secondary"
                              className="reg-gradient"
                              onClick={emergencyWithDrawContribution}
                            >
                              Ok
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    ) : (
                      ""
                    )} */}
                    <div>
                      <h6
                        onClick={getPurchaseHistory}
                        style={{ cursor: "pointer" }}
                        className="text-danger"
                      >
                        <u>View Purchase History</u>
                      </h6>
                      <Modal
                        size="xl"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        className="contributers-list-container"
                        dialogClassName="modal-90w"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Purchase History
                          </Modal.Title>
                        </Modal.Header>

                        <Tabs
                          defaultActiveKey="profile"
                          className="mb-3 single-btn"
                          activeKey={selectedIndex}
                          onSelect={(e) => setSelectedIndex(e)}
                        >
                          <Tab eventKey="0" title="All Records">
                            <Col lg="12">
                              <div className="table-container">
                                <div className="table-container-inner">
                                  <Table variant="dark" size="sm" hover>
                                    <thead>
                                      <th>No.</th>
                                      <th>Address</th>
                                      <th>Committed(BNB)</th>
                                      <th>Commitment Ratio</th>
                                      <th>
                                        Allocation{" "}
                                        {launchpadDetails.tokenSymbol}
                                      </th>
                                      <th>Allocation Ratio </th>
                                    </thead>
                                    <tbody>
                                      {allUserPurchaselist.length > 0
                                        ? allUserPurchaselist.map((i) => (
                                            <tr>
                                              <td class="counterCell"></td>
                                              <td>
                                                {i.contributorAddresses}{" "}
                                                <FaCopy
                                                  className="copy-icon"
                                                  title="Copy Address"
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() =>
                                                    copyToClipboard(
                                                      i.contributorAddresses,
                                                      "token"
                                                    )
                                                  }
                                                />
                                              </td>
                                              <td>
                                                {web3.utils.fromWei(
                                                  i.Commited,
                                                  "ether"
                                                )}
                                              </td>
                                              <td>
                                                {parseFloat(
                                                  web3.utils.fromWei(
                                                    i.CommitementRatio,
                                                    "ether"
                                                  )
                                                ).toFixed(3)}
                                                %
                                              </td>
                                              <td>
                                                {" "}
                                                {parseFloat(
                                                  web3.utils.fromWei(
                                                    i.allocation,
                                                    "ether"
                                                  )
                                                ).toFixed(3)}
                                                (
                                                {parseFloat(
                                                  web3.utils.fromWei(
                                                    i.allocationAmount,
                                                    "ether"
                                                  )
                                                ).toFixed(3)}{" "}
                                                BNB)
                                              </td>
                                              <td>
                                                {parseFloat(
                                                  web3.utils.fromWei(
                                                    i.CommitementRatio,
                                                    "ether"
                                                  )
                                                ).toFixed(3)}
                                                %
                                              </td>
                                            </tr>
                                          ))
                                        : "No History Found"}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </Col>
                          </Tab>
                        </Tabs>
                      </Modal>
                    </div>
                  </div>
                </div>
                <div className="full-div shadow-box">
                  <ul className="flex-list low m-0">
                    <li>
                      <p>Status</p>
                      <p>
                        {status === "0"
                          ? "Incoming"
                          : status === "1"
                          ? "inProgress"
                          : status === "2"
                          ? "filled"
                          : status === "3"
                          ? "ended"
                          : status === "4"
                          ? "cancelled"
                          : status === "5"
                          ? "expired"
                          : ""}
                      </p>
                    </li>
                    <li>
                      <p>Sale Type</p>
                      <p>
                        {launchpadDetails?.iswhitListed
                          ? "Whitelisted"
                          : "Public"}
                      </p>
                    </li>
                    <li>
                      <p>Current Raised</p>
                      <p>
                        {parseFloat(currentRaiseValue).toFixed(3)} BNB (
                        {percentage
                          ? percentage > 100
                            ? 100
                            : parseFloat(percentage).toFixed(3)
                          : 0}
                        %)
                      </p>
                    </li>
                    <li>
                      <p>Hard Cap Per User </p>
                      <p>
                        {hardCapTokensperUser +
                          " " +
                          launchpadDetails.tokenSymbol}{" "}
                        (
                        {parseFloat(
                          hardCapTokensperUser /
                            launchpadDetails.subscriptionRate
                        ).toFixed(3)}{" "}
                        BNB)
                      </p>
                    </li>

                    <li>
                      <p>Max Allocation Requires</p>
                      <p>
                        {parseFloat(gatheredCurrency) < parseFloat(hardCap)
                          ? parseFloat(hardCapTokensperUser).toFixed(3)
                          : parseFloat(gatheredCurrency).toFixed(3)}{" "}
                        BNB
                      </p>
                    </li>
                    {gatheredCurrency > 0 && (
                      <>
                        <li>
                          <p>Participants</p>
                          <p>{list?.length}</p>
                        </li>
                        <li>
                          <p>You Committed</p>
                          <p>{userPurchased} BNB</p>
                        </li>
                        <li>
                          <p>Commitment ratio</p>
                          <p>{parseFloat(commitmentRatio1).toFixed(4)} %</p>
                        </li>
                        <li>
                          <p>Allocation Ratio </p>
                          <p>{parseFloat(allocationRatio).toFixed(4)} %</p>
                        </li>
                        <li>
                          <p>You Purchased </p>
                          <p>
                            {parseFloat(userPurchase1).toFixed(4)}{" "}
                            {launchpadDetails.tokenSymbol}
                          </p>
                        </li>
                        <li>
                          <p>You Paid </p>
                          <p>{parseFloat(userPaid).toFixed(4)} BNB</p>
                        </li>
                        <li>
                          <p>Your Refund </p>
                          <p>{parseFloat(yourRefund).toFixed(4)} BNB</p>
                        </li>
                      </>
                    )}

                    {/* <li>
                      <p>Total Contributors</p>
                      <p>{list?.length} BNB</p>
                    </li> */}
                  </ul>
                </div>
                {walletData.account &&
                  launchpadDetails.launcher &&
                  launchpadDetails?.launcher?.toLowerCase() ===
                    walletData?.account.toLowerCase() && (
                    <div className="full-div shadow-box owner-zone text-center">
                      <h2>Owner Zone</h2>
                      <div className="fee-option-div  container">
                        <p className="fee-option-text">
                          {cat === "0"
                            ? "5% BNB raised only"
                            : "2% BNB raised + 2% token sold"}
                        </p>
                      </div>
                      <ul className="full-list">
                        <li>
                          {launchpadDetails.iswhitListed &&
                            (status === "0" || status === "1") && (
                              <Button
                                onClick={handleWhiteListDisable}
                                className="reg-gradient"
                                disabled={isWhitelist}
                              >
                                {isWhitelist ? <Loader /> : "Disable Whitelist"}
                              </Button>
                            )}
                        </li>

                        <li>
                          {status == "0" || status == "1" ? (
                            launchpadDetails.iswhitListed ? (
                              <>
                                <Button
                                  onClick={handleWhiteListShow}
                                  className="reg-gradient"
                                >
                                  Add Whitelist Addresses
                                </Button>

                                <form>
                                  <Modal
                                    onEscapeKeyDown={handleWhiteListClose}
                                    className="my-modal"
                                    show={whiteListshow}
                                  >
                                    <Modal.Header>
                                      <Modal.Title>
                                        White List Addresses
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="modal-body-color">
                                      <Row style={{ paddingBottom: "5px" }}>
                                        <Col xs={1}></Col>
                                        {/* <Col xs={4}>
                                        <span
                                          className=""
                                          style={{ fontWeight: "bold", color: "#cb273a" }}
                                        >
                                          Address
                                        </span>
                                      </Col> */}
                                      </Row>
                                      <div
                                        style={{
                                          maxHeight: "300px",
                                          overflowY: "scroll",
                                          overflowX: "hidden",
                                        }}
                                      >
                                        {whiteList.map((item, index) => {
                                          return (
                                            <div
                                              style={
                                                {
                                                  // border: "1px solid #c7a7a7b9",
                                                  // borderRadius: "4px",
                                                  // marginTop: "10px",
                                                }
                                              }
                                              key={index}
                                            >
                                              <Row
                                                style={{ height: "40px" }}
                                                className={"my-4"}
                                              >
                                                <Col xs={1}>
                                                  <div
                                                    style={{
                                                      width: "25px",
                                                      height: "25px",
                                                      cursor: "pointer",
                                                      marginTop: "8px",
                                                    }}
                                                    onClick={() => {
                                                      removeProperty(index);
                                                    }}
                                                  >
                                                    <CrossIcon />
                                                  </div>
                                                </Col>
                                                <br />
                                                <Col xs={10}>
                                                  <input
                                                    placeholder="Type valid address"
                                                    maxLength={42}
                                                    onChange={(e) => {
                                                      // const regex = /^(?![\s-])[\w\s-]*$/
                                                      // if (regex.test(e.target.value)) {
                                                      handleWhiteListChange(
                                                        e,
                                                        index
                                                      );

                                                      // }
                                                    }}
                                                    className="form-control black"
                                                    value={item.type}
                                                    type="text"
                                                    style={{
                                                      borderRight:
                                                        "1px solid #c7a7a7b9",
                                                      borderLeft:
                                                        "1px solid #c7a7a7b9",
                                                      height: 40,
                                                    }}
                                                  />
                                                </Col>
                                              </Row>
                                            </div>
                                          );
                                        })}
                                      </div>

                                      <Button
                                        onClick={addMoreProperty}
                                        // className='reg-gradient'
                                        className="reg-gradient-secondary mt-2 float-right mr-4"
                                      >
                                        Add more
                                      </Button>
                                    </Modal.Body>
                                    {/* <Modal.Body>
                                    
                                    {whiteList.map((item, index) => (
                                      <div key={index} className="whitelist">
                                        <input
                                          name="whitelist"
                                          type="text"
                                          id="whitelist"
                                          value={item.whitelist}
                                          {...register("address", {
                                            onChange: (e) =>
                                              handleWhiteListChange(e, index),
                                          })}
                                        />
                                        
                                        {whiteList.length !== 1 && (
                                          <Button
                                            type="button"
                                            onClick={() =>
                                              handleWhiteListRemove(index)
                                            }
                                            className="reg-gradient mb-2"
                                          >
                                            <span>Remove</span>
                                          </Button>
                                        )}
                                        <div className="second-division"></div>
                                      </div>
                                    ))}

                                    <Button
                                      className="reg-gradient"
                                      onClick={handleWhiteListAdd}
                                    >
                                      Add More Address
                                    </Button>
                                  </Modal.Body> */}
                                    <Modal.Footer>
                                      <Button
                                        className="reg-gradient"
                                        onClick={handleWhiteListClose}
                                      >
                                        Close
                                      </Button>
                                      <Button
                                        className="reg-gradient"
                                        type="submit"
                                        onClick={handleAddWhiteList}
                                        disabled={isAddingAddress}
                                      >
                                        {isAddingAddress ? (
                                          <Loader />
                                        ) : (
                                          "Save Changes"
                                        )}
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </form>
                              </>
                            ) : (
                              <>
                                <Button
                                  className="reg-gradient"
                                  onClick={handlwWhiteList}
                                  disabled={isWhitelist}
                                >
                                  {isWhitelist ? (
                                    <Loader />
                                  ) : (
                                    "Enable Whitelist"
                                  )}
                                </Button>
                              </>
                            )
                          ) : (
                            ""
                          )}
                          {/* <Link to="/">Enable Whitelist</Link> */}
                        </li>
                        <li>
                          {list.length > 0 ? (
                            <Button
                              className="reg-gradient"
                              onClick={handleShow}
                            >
                              List of Contributors
                            </Button>
                          ) : (
                            <Button className="reg-gradient" disabled>
                              List of Contributors
                            </Button>
                          )}
                          <Modal
                            onEscapeKeyDown={handleClose}
                            show={show}
                            onHide={handleClose}
                            className="contributers-list-container"
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>List of Contrbutors</Modal.Title>
                            </Modal.Header>
                            <ol className="contributers-list px-2">
                              {list.map((i) =>
                                i ? (
                                  <Modal.Body key={i}>
                                    <li className="">
                                      <p>{i}</p>
                                      <div className="icon-container">
                                        <FaCopy
                                          className="copy-icon"
                                          title="Copy Address"
                                          onClick={() =>
                                            copyToClipboard(i, "n")
                                          }
                                        />
                                        <p>s</p>
                                      </div>
                                    </li>
                                  </Modal.Body>
                                ) : (
                                  <Modal.Body>No Contributors</Modal.Body>
                                )
                              )}
                            </ol>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                className="reg-gradient"
                                onClick={handleClose}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </li>

                        <li>
                          {status === "5" ||
                          status === "4" ||
                          status === "0" ||
                          status === "1" ? (
                            <Button className="reg-gradient" disabled>
                              Finalize Pool
                            </Button>
                          ) : (
                            <Button
                              className="reg-gradient"
                              onClick={() => Finalize()}
                              disabled={afterFinalClaim}
                              // ref={finalRef}
                            >
                              {finalStatus ? <Loader /> : "Finalize Pool"}
                            </Button>
                          )}
                        </li>
                        {!afterFinalClaim && status !== "4" ? (
                          <li>
                            <Button
                              className="reg-gradient"
                              onClick={cancelLaunchpad}
                              disabled={isCancelled}
                              // ref={cancelRef}
                            >
                              {isCancelled ? <Loader /> : "Cancel Pool"}
                            </Button>
                          </li>
                        ) : (
                          ""
                        )}
                        <li>
                          {launchpadDetails.iswhitListed &&
                          (status === "0" || status === "1") &&
                          whiteList.length > 0 ? (
                            <>
                              <Button
                                onClick={handleShowWhiteList}
                                className="reg-gradient"
                              >
                                Show whitelist address
                              </Button>
                            </>
                          ) : (
                            ""
                          )}
                        </li>
                        <li>
                          {withDrawTokenLiquidity > 0
                            ? walletData.account &&
                              status === "4" &&
                              launchpadDetails?.launcher?.toLowerCase() ===
                                window.ethereum.selectedAddress.toLowerCase() && (
                                <>
                                  <Button
                                    className="reg-gradient d-block mx-auto"
                                    onClick={withDrawLiquidityTokens}
                                    disabled={withDrawLiquidity}
                                  >
                                    {withDrawLiquidity ? (
                                      <Loader />
                                    ) : (
                                      "Withdraw Liquidity Tokens"
                                    )}
                                  </Button>
                                </>
                              )
                            : ""}
                        </li>
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SubscriptionPitchToken;

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
