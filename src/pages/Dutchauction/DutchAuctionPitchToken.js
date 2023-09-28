import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { dutchLaunchpadMethods } from "../../web3/Methods/DutchSubMethods";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";

import moment from "moment";
import { useQuery } from "@apollo/client";
import {
  useAddtionalInfoStore,
  useCreateLaunchPadStore,
  useDefiLaunchPadStore,
  useDucthAdditionalInfo,
} from "../store/useStore";
import { Col, ModalBody, Row, Tab, Table, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
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
import { factoryMethods } from "../../web3/Methods/DutchSubFactoryMethods";
import img from "../../utils/image.png";
import { IconContext } from "react-icons";
import Loader from "../../components/loader";
import Chart from "../../components/Chart";
import { fromBn } from "evm-bn";
import { log } from "joi-browser";
import {
  GET_ALL_LAUNCHPADS_SOFTCAP,
  GET_ALL_LAUNCHPAD_DETAILS,
} from "../Graphql/Queries";
import showConsole from "../../utils/common-functions";
import switchingToBNB from "../../web3/SwitchToBNB";

const schema = Joi.object({
  address: Joi.string()
    .regex(/^0x[a-fA-F0-9]{40}$/)
    .required(),
});

function DutchAuctionPitchToken() {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: joiResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const walletData = useSelector((state) => state.wallet);
  const [userPurchased, setUserPurchased] = useState();

  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/"
    )
  );

  const [isInterval, setIsInterval] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [amount, setAmount] = useState();
  const [status, setStatus] = useState();
  const [whiteListAddresses, setWhiteListAddresses] = useState([]);
  const [time, setTime] = useState();
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isWhitelist, setIsWhitelist] = useState(false);
  const [tokensAmount, setTokensAmount] = useState();
  const [maxValue, setMaxValue] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [refundType, setRefundType] = useState();
  const [withDrawTokenLiquidity, setWithDrawTokenLiquidity] = useState("");
  const [isStatusCancelled, setIsStatusCancelled] = useState(false);
  const [emergencyShow, setEmergencyShow] = useState(false);
  const [dataloaded, setDataLoaded] = useState(false);
  const [chartData, setChartData] = useState({});
  const [addMoreStatus, setAddMoreStatus] = useState(true);

  // const placeholderImage =
  //   "https://www.freepngimg.com/png/88500-text-awesome-question-mark-font-symbol";

  const { loading, error, data } = useQuery(GET_ALL_LAUNCHPAD_DETAILS, {
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
    presaleAddress: "",
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    status: "",
    tokenDecimals: 0,
    presaleRate: 0,
    softCap: 0,
    hardCap: 0,
    minBuy: 0,
    maxBuy: 0,
    startTime: 0,
    endTime: 0,
    liquidityPercentage: 0,
    decreasePriceCycle: 0,
    totalSupply: 0,
    liquidityTokens: 0,
    currentPool: 0,
    startPrice: 0,
    endPrice: 0,
    logoUrl: "",
    website: "",
    iswhitListed: false,
  });
  const [gatheredCurrency, setGatheredCurrency] = useState();

  const launchpadID = useCreateLaunchPadStore((state) => state.launchpadID);
  const setLaunchpadID = useCreateLaunchPadStore(
    (state) => state.setLaunchpadID
  );
  const hardCap = useDefiLaunchPadStore((state) => state.hardCap);
  // const tokenAddress = useCreateLaunchPadStore((state) => state.tokenAddress);
  // const softCap = useDefiLaunchPadStore((state) => state.softCap);
  // const startDate = useDefiLaunchPadStore((state) => state.startDate);
  // const endDate = useDefiLaunchPadStore((state) => state.endDate);
  // const listingRate = useDefiLaunchPadStore((state) => state.listingRate);
  // const liquidity = useDefiLaunchPadStore((state) => state.liquidity);
  // const minimumBuy = useDefiLaunchPadStore((state) => state.minimumBuy);
  // const maximumBuy = useDefiLaunchPadStore((state) => state.maximumBuy);
  // const refundType = useDefiLaunchPadStore((state) => state.refundType);
  // const preSale = useDefiLaunchPadStore((state) => state.preSale);
  const [list, setList] = useState([]);
  const [allUserPurchaselist, setAllUserPurchaseList] = useState([]);
  const [userPurchaselist, setUserPurchaseList] = useState([]);
  const [max, setMax] = useState(0);
  const [show, setShow] = useState(false);
  const [whiteListshow, setWhiteListShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isWhitelisting, setIsWhitelisting] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  // const [isFinalizedDisabled, setIsFinalizedDisabled] = useState(false);

  const [claimableTokens, setClaimableTokens] = useState();
  const [finalStatus, setFinalStatus] = useState(false);
  const [claimTokenStatus, setClaimTokenStatus] = useState(false);
  const [claim, setClaim] = useState(false);
  const [afterFinalClaim, setAfterFinalClaim] = useState(false);
  // const [textAreaValue, setTextAreaValue] = useState("");
  // const [inputArray, setInputArray] = useState([]);
  const [whiteList, setWhiteList] = useState([{ whiteList: "" }]);
  // const [listt, setListt] = useState({ whiteList: "" });
  const [cat, setCat] = useState("");
  const [everySecond, setEverySecond] = useState(false);
  const [array1, setArray1] = useState([]);

  const [withDrawLiquidity, setWithDrawLiquidity] = useState(false);
  const [withDrawTokenStatus, setWithDrawTokenStatus] = useState(false);
  const [contractFinalStatus, setContractFinalStatus] = useState(false);
  const [contributeDisabled, setContributeDisabled] = useState(false);
  const [contributeStatus, setContributeStatus] = useState(false);
  const [afterExpireCancel, setAfterExpireCancel] = useState(false);
  const [claimStatus, setClaimStatus] = useState(false);
  const [auctionRate, setAuctionRate] = useState();
  const [emergencyRemainingTime, setEmergencyRemainingTime] = useState(0);
  const [liquidityToken, setLiquidityToken] = useState(0);
  const [listingRate, setListingRate] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState("0");

  // const handleWhiteListChange = (e, index) => {
  //   const { value } = e.target;
  //   const list = [...whiteList];
  //   list[index] = value;
  //   setWhiteList(list);
  // };
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
  } = useDucthAdditionalInfo((state) => ({
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
      let x = auctionRate * amount;
      setTokensAmount(parseFloat(x).toFixed(2));
    }
  };

  useEffect(() => {
    getTokensAmount();
  }, [amount]);

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
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[3]
    );
    setIsWhitelist(true);

    await details
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
        setIsWhitelist(false);
      });
  };

  const handleWhiteListDisable = async () => {
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[3]
    );
    setIsWhitelist(true);

    const x = await details
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
        setIsWhitelist(false);
      });
  };

  // const diff = moment(endDate);

  const getLaunchpadDetails = async () => {
    if (window.location.pathname.split("/")[2]?.length > 5) {
      const details = await dutchLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      details
        .getLaunchpadDetails(window.location.pathname.split("/")[2])
        .then(async (resp) => {
          const tokenDetail = await tokenMethods(resp[0].tokenAddress);

          const name = await tokenDetail.nameOfToken();
          const symbol = await tokenDetail.symbolOfToken();
          const decimals = await tokenDetail.decimalsOfToken();
          const totalSupply = await tokenDetail.totalSupply();

          // const status = await details?.getPoolStatus(
          //   window.location.pathname.split("/")[2]
          // );

          const currentPool = await details.getLaunchpadPool(
            window.location.pathname.split("/")[2] &&
              window.location.pathname.split("/")[2]
          );

          // const liquidityTokens = await details.liquidityTokenAmount(
          //   window.location.pathname.split("/")[2] &&
          //     window.location.pathname.split("/")[2]
          // );

          const decreasePriceCycle = await details.decreasePriceCycle();

          setLaunchpadDetails({
            presaleAddress: window.location.pathname.split("/")[2],
            tokenAddress: resp[0].tokenAddress,
            tokenName: name,
            tokenSymbol: symbol,
            tokenDecimals: decimals,
            status: resp[3],
            presaleRate: web3.utils.fromWei(resp[1]),
            listingRate: web3.utils.fromWei(resp[2]),
            softCap: web3.utils.fromWei(resp[0].softCap),
            hardCap: web3.utils.fromWei(resp[0].hardCap),
            minBuy: web3.utils.fromWei(resp[0].minBuy),
            maxBuy: web3.utils.fromWei(resp[0].maxBuy),
            startTime: resp[0].startTime,
            endTime: resp[0].endTime,
            liquidityPercentage: resp[0].liquidity_Percentage,
            totalSupply: fromBn(totalSupply, decimals),

            startPrice:
              web3.utils.fromWei(resp[0].hardCap) / web3.utils.fromWei(resp[1]),
            endPrice:
              web3.utils.fromWei(resp[0].softCap) / web3.utils.fromWei(resp[1]),

            // decreaseTime: decreasePriceCycle
            // currentPool: window.web3.utils.fromWei(currentPool),

            launcher: resp[0].launcher,
            fee: cat,
            uSoldTokenRefundType: resp[0].uSoldTokenType,
            logoUrl: resp[0].logoURL,
            website: resp[0].website,
            decreasePriceCycle: decreasePriceCycle,
          });
          setIsInterval(true);
        });
    }
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

  // const userAdress = walletData.account;

  const withDrawTokens = async () => {
    setWithDrawTokenStatus(true);
    try {
      const address = await dutchLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      await address
        .withdrawCurrencyAfterCancel(window.ethereum.selectedAddress)
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
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    if (walletData.account) {
      const claimtokensStatus = await address.getClaimStatus(
        walletData?.account
      );
      setClaimTokenStatus(claimtokensStatus);
    }
  };

  /**
   *Cancel button  Event Listener Use Effect
   */
  // const cancelRef = useRef(null);
  // useEffect(() => {
  //   const handleClick = (e) => {
  //     cancelLaunchpad();
  //   };

  //   const dom = cancelRef.current;
  //   if (dom) {
  //     dom.addEventListener("click", handleClick);

  //     return () => {
  //       dom.removeEventListener("click", handleClick);
  //     };
  //   }
  //   getLaunchpadDetails();
  // }, []);

  // /**
  //  *Finalize button  Event Listener Use Effect
  //  */
  // const finalRef = useRef();
  // useEffect(() => {
  //   const handleClick = (e) => {
  //     Finalize();
  //   };

  //   const dom = finalRef.current;
  //   if (dom) {
  //     dom.addEventListener("click", handleClick);

  //     return () => {
  //       dom.removeEventListener("click", handleClick);
  //     };
  //   }
  //   getLaunchpadDetails();
  // }, []);

  const liquidityTokenAmount = async () => {
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const liquidityTokens = await details.liquidityTokenAmount(
      window.location.pathname.split("/")[2] &&
        window.location.pathname.split("/")[2]
    );

    setLaunchpadDetails((prev) => {
      return {
        ...prev,
        liquidityTokens: web3.utils.fromWei(liquidityTokens),
      };
    });
  };

  useEffect(() => {
    var interval = setInterval(() => {
      getheredCurrency();
      isFinalized();

      userPurchase();
      getClaimableToken();
      getClaimStatus();

      // checkWhitelisting();

      liquidityTokenAmount();
      getContributorsList();
      auction();
      currentListingRate();
      currentTokenLiquidity();
    }, 1000);
    return () => clearInterval(interval);
  }, [launchpadDetails]);

  useEffect(() => {
    var interval = setInterval(() => {
      checkWhitelisting();

      if (walletData.account) {
        userPurchase();
        getClaimableToken();
        getClaimStatus();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [walletData.account]);

  useEffect(() => {
    var interval = setInterval(() => {
      if (launchpadDetails.presaleAddress) {
        getLaunchpadTokenBalance();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [launchpadDetails.presaleAddress]);

  const checkWhitelisting = async () => {
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await details
      .isWhiteListOn(window.location.pathname.split("/")[2], walletData.account)
      .then((resp) => {
        setLaunchpadDetails((prev) => {
          return {
            ...prev,
            iswhitListed: resp,
          };
        });
      });
  };

  useEffect(() => {
    startTime();
    endTime();
    getLaunchpadDetails();
    getAllWhiteLists();
    currentTokenLiquidity();

    feeCategorey();
    // getPoolStatus();
    // getheredCurrency();
    // isFinalized();
  }, []);

  // getLaunchpadDetails();

  const userPurchase = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    if (walletData?.account) {
      const purchase = await address.userPurchased(walletData?.account);
      setUserPurchased(parseFloat(purchase));
    }
  };

  const getRefundType = async () => {
    if (window.location.pathname.split("/")[2]) {
      const address = await dutchLaunchpadMethods(
        window.location.pathname.split("/")[2]
      );
      let refund = await address.getRefundType();
      setRefundType(refund);
    }
  };

  useEffect(() => {
    getClaimableToken();
    getClaimStatus();

    getRefundType();
    auction();
  }, []);
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

  const withDrawTime = async () => {
    const time = await factoryMethods();
    time
      .withDrawTime()
      .then((res) => {
        setTime(res);
      })
      .catch(() => {});
  };

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
    if (parseFloat(amount) < parseFloat(launchpadDetails.minBuy)) {
      toast.error("Amount must be greater than minimum buy", {
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
    if (
      parseFloat(web3.utils.fromWei(String(walletData.balance), "ether")) <
      parseFloat(amount)
    ) {
      toast.error("Not Enough Balance", {
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

    if (parseFloat(userPurchased) > parseFloat(launchpadDetails.maxBuy)) {
      // alertHandled("Amount must be smaller than hardcap");
      toast.error("Amount must be smaller than Max Buy", {
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

    if (
      parseFloat(launchpadDetails.currentPool) + parseFloat(amount) >
      parseFloat(launchpadDetails.hardCap)
    ) {
      // alertHandled("Total amount must be smaller than hardcap");
      toast.error("Amount must be smaller than Maximum Buy", {
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

    if (
      parseFloat(userPurchased) + parseFloat(amount) >
      parseFloat(launchpadDetails.maxBuy)
    ) {
      // alertHandled("Total amount must be smaller than hardcap");
      toast.error("User cannot buy more than maximum buy limit", {
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

    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const isUserWhiteListed = await details.whiteLists(
      window.location.pathname.split("/")[2],
      window.ethereum.selectedAddress
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
        setContributeStatus(true);
        setAmount(0);
        withDrawTime();

        toast.success("Transaction Successful");
      })
      .catch(() => {
        setContributeStatus(false);
        setContributeDisabled(false);
        toast.error("Transaction Rejected");
      });

    // dispatchh();
  };

  /**
   * Finalize Launchpad
   */
  const Finalize = async () => {
    // if (error) {
    // }
    // if (loading) {
    // }
    // Createlaunchpad({
    //   variables: {
    //     Createlaunchpad: {
    //       launchpadID: window.location.pathname.split("/")[2],
    //       tokenAddress: launchpadDetails.tokenAddress,
    //       minimumBuy: parseFloat(launchpadDetails.minBuy),
    //       maximumBuy: parseFloat(launchpadDetails.maxBuy),
    //       softCap: parseFloat(launchpadDetails.softCap),
    //       hardCap: parseFloat(launchpadDetails.hardCap),
    //       listingRate: parseInt(launchpadDetails.listingRate),
    //       liquidityPercentage: parseFloat(launchpadDetails.liquidityPercentage),
    //       startTime: start,
    //       endTime: end,
    //       status: status,
    //       name: launchpadDetails.tokenName,
    //       symbol: launchpadDetails.tokenSymbol,
    //     },
    //   },
    // });

    // if (launchpadDetails.currentPool < launchpadDetails.softCap) {
    //   // alertHandled("Pool is not filled");
    //   toast.error("", {
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

    setFinalStatus(true);

    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const currencyForLiqiudity = await details.getCurrency(
      window.location.pathname.split("/")[2]
    );

    details
      .finalizeLaunchpad(
        window.location.pathname.split("/")[2],
        currencyForLiqiudity[2]
      )
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
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    setIsCancelled(true);

    details
      .cancelLaunchpad(window.ethereum.selectedAddress)
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
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const status = await address.getPoolStatus(
      window.location.pathname.split("/")[2]
    );
    setStatus(status[3]);
  };

  const startTime = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const s = await address.startTime(window.location.pathname.split("/")[2]);
    setStart(s);
  };
  const getRemainingDeductionTime = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .getRemainingDeductionTime(window.ethereum.selectedAddress)
      .then((res) => {
        setEmergencyRemainingTime(parseFloat(res));
      });
  };
  const currentListingRate = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const s = await address.currentListingRate(walletData.account);
    const z = parseFloat(web3.utils.fromWei(s)).toFixed(2);
    setListingRate(z);
  };

  const endTime = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const e = await address.endTime(window.location.pathname.split("/")[2]);
    setEnd(e);
  };
  const auction = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const e = await address.auctionRate(window.location.pathname.split("/")[2]);
    if (window.web3 || window.ethereum) {
      // const z = parseFloat(
      //   window.web3.utils.fromWei(e._auctionRate, "ether")
      // ).toFixed(2);

      setAuctionRate(e);
    }
  };

  /**
   * amount of tokens claimed by the user
   */
  const getClaimableToken = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    if (walletData.account) {
      const tokens = await address.getClaimableToken(walletData?.account);
      setClaimableTokens(web3.utils.fromWei(tokens));
    }
  };

  /**
   * Boolean Status of Tokens claim by the user
   * i.e. true or flase
   */
  const claimToken = async () => {
    setClaim(true);
    // setIsDisabled(true);

    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address
      .claimToken(window.ethereum.selectedAddress)
      .then(() => {
        setClaimStatus(true);
        setClaim(false);
        toast.success("Operation Succesfull");
      })
      .catch(() => {
        setClaim(false);
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

  /**
   * get gathered currency
   * amount gathered in a pool
   */
  const getheredCurrency = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const gathered = await address.getheredCurrency();

    setGatheredCurrency(gathered);

    if (parseFloat(gathered) < parseFloat(launchpadDetails.hardCap)) {
    }
  };

  /**
   * get contributors list
   */
  const getContributorsList = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const list = await address.getContributorsList();
    setList(list);
  };

  /**
   * Boolean status if Finalize Launchpad
   */
  const isFinalized = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const isFinal = await address.isfinalzed();
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
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const categoery = address.feeCategorey().then((res) => {
      setCat(res);
    });
  };

  /**
   * Emergency WithDraw Contribution
   */
  const emergencyWithDrawContribution = async () => {
    handleEmergencyClose();
    setEmergencyWithDraw(true);
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .emergencyWithdraw(window.ethereum.selectedAddress)
      .then(() => {
        setEmergencyWithDraw(false);
      })
      .catch(() => {
        handleEmergencyClose();
        setEmergencyWithDraw(false);
      });
  };

  const withDrawLiquidityTokens = async () => {
    setWithDrawLiquidity(true);
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .withDrawLiquidityTokens(walletData.account)
      .then(() => {
        setWithDrawLiquidity(true);

        toast.success("Operation Successful", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
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
        setWithDrawLiquidity(false);
      });
  };

  const getLaunchpadTokenBalance = async () => {
    const tokenDetail = await tokenMethods(launchpadDetails.tokenAddress);
    const balance = await tokenDetail.balanceOfToken(
      window.location.pathname.split("/")[2]
    );
    setWithDrawTokenLiquidity(parseFloat(web3.utils.fromWei(balance, "ether")));
  };

  useEffect(() => {
    feeCategorey();
  }, []);

  const handleMax = async (e) => {
    e.preventDefault();
    // const balance = parseFloat(
    //   window.web3.utils.fromWei(String(walletData.balance))
    // );

    await window.web3.eth.getBalance(walletData.account).then((res) => {
      const max = parseFloat(launchpadDetails.maxBuy);
      const balance = web3.utils.fromWei(res, "ether");
      if (max <= balance) {
        const diff = max - userPurchased;
        setAmount(diff);
      } else {
        setAmount(balance);
      }
    });
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
    let errorMessageShown = false;
    for (const obj of whiteList) {
      if (Object.keys(obj).some((key) => !obj[key])) {
        if (!errorMessageShown) {
          errorMessageShown = true;
          toast.error("Empty Fields are not Allowed", {
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
      }
    }

    if (!whiteList[0].whiteList) {
      toast.error("Please Enter Address", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setIsAddingAddress(true);
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const getAllWhiteList = await details.getAllWhiteList(0, 10);

    const duplicateElements = toFindDuplicates([
      ...whiteList.map((i) => i.whiteList),
    ]);
    if (duplicateElements.length > 0 && !errorMessageShown) {
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
      .AddWhiteList(distinctAddresses, window.ethereum.selectedAddress)
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
      })
      .catch(() => {
        setIsAddingAddress(false);
        if (whiteList[0].whiteList || !errorMessageShown) {
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
        }
      });
  };

  const getAllWhiteLists = async () => {
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const getAllWhiteList = await details.getAllWhiteList(0, 10);
    setWhiteListAddresses(getAllWhiteList);

    let arr = [];
    let st = launchpadDetails.startPrice;
    const timeDiff = end - start;
    const unitTime = parseInt(
      timeDiff / 60 / launchpadDetails.decreasePriceCycle
    );
    const priceDiff = launchpadDetails.startPrice - launchpadDetails.endPrice;
    const unitPrice = priceDiff / unitTime;
    for (let i = 0; i < unitTime; i++) {
      st = st - unitPrice;
      arr.push(st);
    }
    setArray1(arr);
  };

  const removeWhiteListing = async (address) => {
    setIsWhitelisting(true);
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const whiteListRemoved = await details.RemoveWhiteList(
      [address],
      window.ethereum.selectedAddress
    );

    if (!whiteListRemoved) {
      toast.error("Transaction Rejecteds");
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

  const currentTokenLiquidity = async () => {
    const details = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const token = await details.currentTokenLiquidity();

    if (window.web3 || window.ethereum) {
      setLiquidityToken(token);
    }
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
    if (e.target.value + launchpadDetails.maxBuy > launchpadDetails.maxBuy) {
      setAmount(launchpadDetails.maxBuy);
    } else {
      setAmount(e.target.value);
    }
  };

  window.onpopstate = (e) => {
    navigate("/");
  };

  const onImageError = (e) => {
    e.target.src = img;
  };

  // useEffect(() => {

  useEffect(() => {
    let arr = [];
    let timeArr = [];

    let st = launchpadDetails.startPrice;

    const timeDiff = end - start;

    const unitTime = parseInt(
      timeDiff / 60 / launchpadDetails.decreasePriceCycle
    );
    const priceDiff = launchpadDetails.startPrice - launchpadDetails.endPrice;
    const unitPrice = priceDiff / unitTime;
    for (let i = 0; i < unitTime; i++) {
      st = st - unitPrice;
      arr.push(parseFloat(st).toFixed(4));
      // arr.reverse();
    }

    const unitTimeForDate = timeDiff / 60;
    let finalTime = parseInt(
      unitTimeForDate / launchpadDetails.decreasePriceCycle
    );
    let startTime = moment.unix(start).format("mm");
    let endTime = moment.unix(end).format("hh:mm:ss");
    // let timeToAdd = moment.duration(launch, "minutes").format("hh:mm:ss")

    for (let j = 0; j < finalTime; j++) {
      startTime =
        parseFloat(startTime) + parseFloat(launchpadDetails.decreasePriceCycle);

      timeArr.push(startTime);
      // timeArr.reverse();
    }

    setChartData({
      labels: timeArr,
      datasets: [
        {
          label: "Dutch Auction",

          data: arr,
          borderColor: "red",
          pointBorderColor: "red",
          borderWidth: 2,
          fill: true,
        },
      ],
    });
  }, [launchpadDetails.startPrice]);

  const [showWhiteList, setShowWhiteList] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const showWhiteListAddresses = (e) => {
    setShowWhiteList((current) => !current);
  };

  const showPurchaseHistory = () => {
    setLgShow(true);
  };

  const getAllUserPurchaseHistory = async () => {
    const address = await dutchLaunchpadMethods(
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

  const getUserPurchaseHistory = async () => {
    const address = await dutchLaunchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .getUserPurchaseHistory(walletData?.account)
      .then((res) => {
        setUserPurchaseList(res);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (selectedIndex == "0") {
      getAllUserPurchaseHistory();
    } else if (selectedIndex == "1") {
      getUserPurchaseHistory();
    }
  }, [selectedIndex]);

  useEffect(() => {
    var interval = setInterval(() => {
      if (contributeStatus) {
        getRemainingDeductionTime();
        withDrawTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [contributeStatus]);

  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                <div className="full-div shadow-box">
                  {window.location.pathname.split("/")[2] !== "" ? (
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
                                  {launchpadDetails.tokenName + " Auction"}
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
                                      : moment().unix() < end &&
                                        status !== "4" &&
                                        status !== "2"
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
                                    : moment().unix() < end &&
                                      status !== "4" &&
                                      status !== "2" &&
                                      status != "3"
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
                            <b>Auction Address</b>
                          </p>
                          <p className="word-break">
                            {launchpadDetails.presaleAddress}
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
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Total Supply</b>
                          </p>
                          <p>
                            {launchpadDetails.totalSupply}{" "}
                            {launchpadDetails.tokenName}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Tokens For Presale</b>
                          </p>
                          <p>
                            {launchpadDetails.presaleRate}{" "}
                            {launchpadDetails.tokenName}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Tokens For Liquidity</b>
                          </p>
                          <p>
                            {parseFloat(liquidityToken).toFixed(3)}{" "}
                            {launchpadDetails.tokenName}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Auction Rate</b>
                          </p>
                          <p>
                            1 BNB = {auctionRate}
                            {""} {launchpadDetails.tokenName}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Listing Rate</b>
                          </p>
                          <p>
                            1 BNB = {listingRate} {launchpadDetails.tokenName}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Start Price</b>
                          </p>
                          <p>
                            1 BNB = {launchpadDetails.startPrice}{" "}
                            {launchpadDetails.tokenName}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>End Price</b>
                          </p>
                          <p>
                            1 BNB = {launchpadDetails.endPrice}{" "}
                            {launchpadDetails.tokenName}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Decrease Price Cycle (minutes)</b>
                          </p>
                          <p>{launchpadDetails.decreasePriceCycle} minutes</p>
                        </li>
                        <li>
                          <p>
                            <b>Initial Market Cap(estimate)</b>
                          </p>
                          <p>-</p>
                        </li>
                        <li>
                          <p>
                            <b>Soft Cap</b>
                          </p>
                          <p>{launchpadDetails.softCap} BNB</p>
                        </li>
                        <li>
                          <p>
                            <b>Hard Cap</b>
                          </p>
                          <p>{launchpadDetails.hardCap} BNB</p>
                        </li>
                        <li>
                          <p>
                            <b>Unsold Tokens</b>
                          </p>
                          <p>{refundType === "0" ? "Refund" : "Burn"}</p>
                        </li>
                        <li>
                          <p>
                            {/* <b>{status === "0" ? 'Presale Start Time': launchpadDetails.status === "5" ? 'Time Ended': 'Ends in'} </b> */}
                            <b>Auction Start Time</b>
                          </p>
                          <p>{moment.unix(start).format("lll")}</p>
                        </li>
                        <li>
                          <p>
                            <b>Auction End Time</b>
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
                      <div className="white-list-container word-break">
                        {showWhiteList && whiteListAddresses.length > 0 && (
                          <PaginatedItems
                            removeWhiteListing={removeWhiteListing}
                            itemsPerPage={
                              whiteListAddresses.length < parseInt(5)
                                ? whiteListAddresses.length
                                : parseInt(5)
                            }
                            whiteListAddresses={whiteListAddresses}
                            isWhitelisting={isWhitelisting}
                            setIsWhitelisting={setIsWhitelisting}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <Loader />
                  )}
                </div>
                <div className="full-div shadow-box">
                  <Chart chartData={chartData} />
                  <small className="text-white">
                    The price will steadily decrease over time, meaning you will
                    buy more tokens as the time draws near to the end. The price
                    will decrease each 1 day.
                  </small>
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
                            ? "Auction Starts In"
                            : moment().unix() < end
                            ? "Auction Ends in"
                            : status === "5"
                            ? "Auction Expired"
                            : "Auction is Ended"}
                        </h3>
                      </div>
                      <ul className="timer-list">
                        <li>{days}</li>
                        <li>{hours}</li>
                        <li>{minutes}</li>
                        <li>{seconds}</li>
                      </ul>
                      <ProgressBar
                        now={
                          (gatheredCurrency / launchpadDetails.hardCap) * 100
                        }
                      />

                      <div className="flex-div">
                        <span className="text-secondary">
                          {gatheredCurrency ? gatheredCurrency : 0} BNB
                        </span>
                        <span className="text-secondary">
                          {launchpadDetails.hardCap} BNB
                        </span>
                      </div>

                      <div className="text-center">
                        <p>This Pool has been ended</p>
                      </div>
                      <div className="space-20"></div>
                      {
                        <>
                          <h3>Amount</h3>
                          <div className="flex-div input-submit-div">
                            <input
                              type="number"
                              autoComplete="off"
                              id="token-symbol"
                              step="any"
                              value={amount}
                              placeholder="0.0"
                              // onChange={handleAmount}
                              onChange={(e) => setAmount(e.target.value)}
                              // {...register("max", {
                              // })}
                            />
                            {<Button onClick={handleMax}>Max</Button>}
                          </div>
                        </>
                      }

                      <div className="text-white">
                        <h6>
                          You will recieve:
                          {tokensAmount
                            ? parseFloat(tokensAmount).toFixed(2) +
                              " " +
                              launchpadDetails.tokenSymbol
                            : 0 + " " + launchpadDetails.tokenSymbol}
                        </h6>
                      </div>
                    </>
                  ) : (
                    <>
                      <ProgressBar
                        now={
                          (gatheredCurrency / launchpadDetails.hardCap) * 100
                        }
                      />
                      <div className="flex-div">
                        <span className="text-secondary">
                          {parseFloat(gatheredCurrency).toFixed(3)} BNB
                        </span>
                        <span className="text-secondary">
                          {launchpadDetails.hardCap} BNB
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
                        claimTokenStatus ? (
                          <Button className="reg-gradient" disabled>
                            Token Claimed{" "}
                            {parseFloat(claimableTokens).toFixed(3)}
                          </Button>
                        ) : userPurchased > 0 && !claimTokenStatus ? (
                          <Button
                            className="reg-gradient"
                            onClick={() => claimToken()}
                            disabled={claimTokenStatus}
                          >
                            {claim ? (
                              <Loader />
                            ) : (
                              `Claim token (${
                                claimableTokens
                                  ? parseFloat(claimableTokens).toFixed(3)
                                  : 0
                              }
                                )`
                            )}
                          </Button>
                        ) : (
                          <>
                            <h6 className="text-white text-center">
                              You Didn't Conribute in this Pool
                            </h6>
                          </>
                        )
                      ) : moment().unix() > start &&
                        moment().unix() < end &&
                        parseFloat(userPurchased) <
                          parseFloat(launchpadDetails.maxBuy) &&
                        status !== "4" ? (
                        <Button
                          className="reg-gradient"
                          onClick={() => Contribute()}
                          disabled={contributeDisabled}
                        >
                          {contributeDisabled ? (
                            <Loader />
                          ) : (
                            <span className="contribute">Contribute</span>
                          )}
                        </Button>
                      ) : (
                        <></>
                      )
                    ) : (
                      <Button
                        className="reg-gradient"
                        onClick={() => {
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

                    {
                      //   "Launchpad Details Minimum buy",
                      //   launchpadDetails.minBuy
                      // )

                      parseFloat(emergencyRemainingTime) > 0 ? (
                        walletData?.account &&
                        parseFloat(userPurchased) > 0 &&
                        moment().unix() <= end - time &&
                        (status === "0" || status === "1") ? (
                          <>
                            <Button
                              className="reg-gradient"
                              onClick={handleEmergencyShow}
                              disabled={emergencyWithDraw}
                            >
                              {emergencyWithDraw ? (
                                <Loader />
                              ) : (
                                <span>Emergency Withdraw</span>
                              )}
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
                                    (with 10% penalty ) out of Auction Pool and
                                    cancels your participation in the auction
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
                        )
                      ) : (
                        ""
                      )
                    }
                  </div>

                  <div className="text-center">
                    <h6
                      onClick={showPurchaseHistory}
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
                        className="mb-3"
                        activeKey={selectedIndex}
                        onSelect={(e) => setSelectedIndex(e)}
                      >
                        <Tab eventKey="0" title="All Records">
                          <div className="table-container">
                            <div className="table-container-inner">
                              <Table variant="dark" size="sm" hover>
                                <thead>
                                  <th>No.</th>
                                  <th>Address</th>
                                  <th>Amount(BNB)</th>
                                  <th>
                                    Volume ({launchpadDetails.tokenSymbol})
                                  </th>
                                  <th>Time </th>
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
                                              i.CurrencyAmount,
                                              "ether"
                                            )}
                                          </td>
                                          <td>
                                            {" "}
                                            {parseFloat(
                                              web3.utils.fromWei(
                                                i.tokenAmount,
                                                "ether"
                                              )
                                            ).toFixed(2)}
                                          </td>
                                          <td>
                                            {moment.unix(i.time).format("lll")}
                                          </td>
                                        </tr>
                                      ))
                                    : "No History Found"}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="1" title="My Records">
                          <div className="table-container">
                            <div className="table-container-inner">
                              <Table variant="dark" size="sm" hover>
                                <thead>
                                  <th>No.</th>
                                  <th>Address</th>
                                  <th>Amount(BNB)</th>
                                  <th>Volume {launchpadDetails.tokenSymbol}</th>
                                  <th>Time </th>
                                </thead>
                                <tbody>
                                  {userPurchaselist.length > 0 ? (
                                    userPurchaselist.map((i) => (
                                      <tr>
                                        <td>1</td>
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
                                            i.CurrencyAmount,
                                            "ether"
                                          )}
                                        </td>
                                        <td>
                                          {" "}
                                          {parseFloat(
                                            web3.utils.fromWei(
                                              i.tokenAmount,
                                              "ether"
                                            )
                                          ).toFixed(2)}
                                        </td>
                                        <td>
                                          {moment.unix(i.time).format("lll")}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <ModalBody>No User's History</ModalBody>
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          </div>
                          {/* {userPurchaselist.length > 0 ? (
                            userPurchaselist.map((i) =>
                              i ? (
                                <Modal.Body key={i}>
                                  <li className="">
                                    <p>{i}</p>
                                    <div className="icon-container">
                                      <FaCopy
                                        className="copy-icon"
                                        title="Copy Address"
                                        onClick={() => copyToClipboard(i, "n")}
                                      />
                                      <p>s</p>
                                    </div>
                                  </li>
                                </Modal.Body>
                              ) : (
                                ""
                              )
                            )
                          ) : (
                            <Modal.Body>No User's Purchase History</Modal.Body>
                          )} */}
                        </Tab>
                      </Tabs>
                    </Modal>
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
                        {launchpadDetails.iswhitListed == "1"
                          ? "Whitelisted"
                          : launchpadDetails.iswhitListed == "0"
                          ? "Public"
                          : ""}
                      </p>
                    </li>
                    <li>
                      <p>Minimum Buy</p>
                      <p>{launchpadDetails.minBuy} BNB</p>
                    </li>
                    <li>
                      <p>Maximum Buy</p>
                      <p>{launchpadDetails.maxBuy} BNB</p>
                    </li>
                    <li>
                      <p>You Purchased</p>
                      <p>{userPurchased ? userPurchased : 0} BNB</p>
                    </li>
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

                                <form onSubmit={handleSubmit(onSubmit)}>
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
                                                    {launchpadDetails.launcher &&
                                                      launchpadDetails?.launcher?.toLowerCase() ===
                                                        window.ethereum?.selectedAddress.toLowerCase() &&
                                                      walletData.account && (
                                                        <CrossIcon />
                                                      )}
                                                  </div>
                                                </Col>
                                                <br />
                                                <Col xs={10}>
                                                  <input
                                                    placeholder="Type valid address"
                                                    maxLength={42}
                                                    onChange={(e) => {
                                                      const regex =
                                                        /^0x[a-fA-F0-9]{40}$/;
                                                      const inputValue =
                                                        e.target.value.trim();
                                                      if (
                                                        inputValue.length > 0 &&
                                                        regex.test(
                                                          e.target.value
                                                        )
                                                      ) {
                                                        setAddMoreStatus(false);
                                                        handleWhiteListChange(
                                                          e,
                                                          index
                                                        );
                                                      } else {
                                                        setAddMoreStatus(true);
                                                      }
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
                                        disabled={addMoreStatus}
                                        className="reg-gradient-secondary mt-2 float-right mr-4"
                                      >
                                        Add more
                                      </Button>
                                    </Modal.Body>

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
                        </li>
                        <li>
                          {list?.length > 0 ? (
                            <Button
                              className="reg-gradient"
                              onClick={handleShow}
                            >
                              List of Contributors
                            </Button>
                          ) : (
                            <Button className="reg-gradient" disabled>
                              No Contributors
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
                            >
                              {isCancelled ? <Loader /> : "Cancel Pool"}
                            </Button>
                          </li>
                        ) : (
                          ""
                        )}
                        {launchpadDetails.iswhitListed &&
                        (status === "0" || status === "1") ? (
                          <Button
                            onClick={showWhiteListAddresses}
                            className="reg-gradient"
                          >
                            Show Whitelist Addresses
                          </Button>
                        ) : (
                          ""
                        )}
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
export default DutchAuctionPitchToken;

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
