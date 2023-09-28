import { Link, useNavigate, useRoutes } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { launchpadAbi } from "../../web3/ABIs/LaunchpadAbi";
import { launchpadMethods } from "../../web3/Methods/LaunchpadMethods";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import img from "../../utils/image.png";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_FAIR_LAUNCH_MUTATION } from "../Graphql/Mutations";
import {
  useCreateFairLaunchInfoStore,
  useCreateFairLaunchStore,
  useFairLaunchAdditionalInfo,
} from "../store/useStore";

import { FaCopy, FaTelegramPlane } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { ImReddit } from "react-icons/im";
import { RiDiscordFill } from "react-icons/ri";
import { CiFacebook, CiGlobe, CiInstagram, CiTwitter } from "react-icons/ci";
import { connectWithMetamask } from "../../web3/metamask";
import { IS_WALLET_CONNECTED } from "../../utils/constants";
import { walletConnection } from "../../redux/actions/wallet-connections";
import { Modal } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import { factoryMethods } from "../../web3/Methods/FactoryMethods";
import { set } from "react-hook-form";
import { IconContext } from "react-icons";
import { fromBn } from "evm-bn";
import {
  GET_ALL_LAUNCHPADS_SOFTCAP,
  GET_ALL_LAUNCHPAD_DETAILS,
} from "../Graphql/Queries";
import Loader from "../../components/loader";
import showConsole from "../../utils/common-functions";
import switchingToBNB from "../../web3/SwitchToBNB";

function FairLaunchPitchtoken() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenAddress = useCreateFairLaunchStore((state) => state.tokenAddress);
  const sellingAmount = useCreateFairLaunchInfoStore(
    (state) => state.sellingAmount
  );
  const startDate = useCreateFairLaunchInfoStore((state) => state.startDate);
  const endDate = useCreateFairLaunchInfoStore((state) => state.endDate);
  const maxContribution = useCreateFairLaunchInfoStore(
    (state) => state.maxContribution
  );

  const [tokenDetails, settokenDetails] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    liquidityForToken: 0,
  });

  const walletData = useSelector((state) => state.wallet);

  const [isInterval, setIsInterval] = useState(false);
  const [isInterval1, setIsInterval1] = useState(false);

  const [days, setDays] = useState();
  const [isStatusCancelled, setIsStatusCancelled] = useState(false);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const [amount, setAmount] = useState(0);
  const [gatheredCurrency, setGatheredCurrency] = useState();
  const [currentRate, setCurrentRate] = useState();
  const [claimableTokens, setClaimableTokens] = useState();
  const [status, setStatus] = useState();
  const [isDisabled, setIsDisabled] = useState(false);
  const [claimTokenStatus, setClaimTokenStatus] = useState();
  const [finalStatus, setFinalStatus] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [contributeStatus, setContributeStatus] = useState(false);
  const [userPurchased, setUserPurchased] = useState();
  const [modalShow, setShowModal] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(0);
  const [newEndDate, setNewEndDate] = useState();
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [saveCheck, setSaveCheck] = useState(false);
  const [everySecond, setEverySecond] = useState(false);
  // const walletData = useSelector((state) => state.wallet);

  const [emergencyShow, setEmergencyShow] = useState(false);
  const [emergencyWithDraw, setEmergencyWithDraw] = useState(false);
  const [cat, setCat] = useState();
  const [time, setTime] = useState();
  const [preSaleStatus, setpreSaleStatus] = useState("");
  const [tokensAmount, setTokensAmount] = useState();
  const [withDrawTokenStatus, setWithDrawTokenStatus] = useState(false);
  const [withDrawTokenLiquidity, setWithDrawTokenLiquidity] = useState("");
  const [withDrawLiquidity, setWithDrawLiquidity] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [contributeDisabled, setContributeDisabled] = useState(false);
  const [afterFinalClaim, setAfterFinalClaim] = useState(false);
  const [claim, setClaim] = useState(false);
  const [maxContributeStatus, setMaxContributeStatus] = useState(false);

  const [dataloaded, setDataLoaded] = useState(false);

  const { loading, error, data } = useQuery(GET_ALL_LAUNCHPAD_DETAILS, {
    pollInterval: 500,
    variables: {
      filter: {
        presaleAddress: window.location.pathname.split("/")[2].toLowerCase(),
      },
    },
  });

  // useEffect(() => {
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
  // }, [data]);

  const [launchpadDetails, setLaunchpadDetails] = useState({
    presaleAddress: "",
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    presaleRate: 0,
    listingRate: 0,
    launcher: "",
    softCap: 0,
    hardCap: 0,
    logoUrl: "",
    minBuy: 0,
    maxBuy: 0,
    startTime: 0,
    endTime: 0,
    liquidityPercentage: 0,
    totalSupply: 0,
    liquidityTokens: 0,
    currentPool: 0,
    iswhitListed: false,
    fee: "",
    website: "",
    website: "",
  });
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
  } = useFairLaunchAdditionalInfo((state) => ({
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
  const [launchpadTime, setLaunchpadTime] = useState({
    startTime: 0,
    endTime: 0,
  });

  const [liquidityTokens, setLiquidityTokens] = useState("");

  const liquidityTokenAmount = async () => {
    if (window.ethereum) {
      const address = await launchpadMethods(
        window.location.pathname.split("/")[2]
      );
      const tokenForLiquidity = await address.liquidityTokenAmount();
      setLiquidityTokens(window.web3.utils.fromWei(tokenForLiquidity, "ether"));
    }
  };

  useEffect(() => {
    getLaunchpadDetails();
    liquidityTokenAmount();
    feeCategorey();
    if (launchpadDetails.maxBuy !== 0 || launchpadDetails.maxBuy === 0) {
      setMaxContributeStatus(true);
    }
  }, []);

  const handleShow = () => {
    getContributorsList();
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleTimeShow = () =>
    setShowModal((prev) => {
      return !prev;
    });

  const handleSaveDate = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

    if (selectedCheck == 1 && moment(newEndDate).unix() > end) {
      toast.error("Date must be smaller than previous end time", {
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
    setSaveCheck(true);
    address
      .setNewTime(
        window.location.pathname.split("/")[2],
        window.ethereum.selectedAddress,
        selectedCheck == 1 ? moment(newEndDate).unix() : moment().unix()
      )
      .then(() => {
        setLaunchpadDetails((prev) => {
          return {
            ...prev,
            endTime:
              selectedCheck == 1 ? moment(newEndDate).unix() : moment().unix(),
          };
        });
        setSaveCheck(false);
        handleTimeShow();
      })
      .catch(() => {
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
        setSaveCheck(false);
      });
  };

  const copyToClipboard = (address, key) => {
    if (key === "token") {
      navigator.clipboard.writeText(address);
      toast.success("Copied Token Address", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
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
    }
  };

  const contractDetails = async () => {
    if (tokenAddress) {
      const tokenDetail = await tokenMethods(tokenAddress);
      const name = await tokenDetail.nameOfToken();
      const symbol = await tokenDetail.symbolOfToken();
      const decimals = await tokenDetail.decimalsOfToken();

      settokenDetails((prev) => {
        return {
          ...prev,
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
        };
      });
    }
  };

  const getLaunchpadTokenBalance = async () => {
    if (launchpadDetails.tokenAddress) {
      const tokenDetail = await tokenMethods(launchpadDetails.tokenAddress);
      const balance = await tokenDetail.balanceOfToken(
        window.location.pathname.split("/")[2]
      );

      setWithDrawTokenLiquidity(
        parseFloat(window.web3.utils.fromWei(balance, "ether"))
      );
    }
  };
  useEffect(() => {
    contractDetails();
  }, [tokenAddress]);

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

  const getPoolStatus = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );
    try {
      const status = await address.getPoolStatus(
        window.location.pathname.split("/")[2]
      );
      setStatus(status[3]);
    } catch (error) {
      getPoolStatus();
    }
  };

  const getLaunchpadDetails = async () => {
    const details = await launchpadMethods(
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

        // const status = await details.getPoolStatus(
        //   window.location.pathname.split("/")[2]
        // );

        // const currentPool = await details.getLaunchpadPool(
        //   window.location.pathname.split("/")[2]
        // );
        setLaunchpadDetails({
          presaleAddress: window.location.pathname.split("/")[2],
          tokenAddress: resp[0].tokenAddress,
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
          logoUrl: resp[0].logoURL,
          website: resp[0].website,
          presaleRate: window.web3.utils.fromWei(resp[1]),
          listingRate: window.web3.utils.fromWei(resp[1]),
          softCap: window.web3.utils.fromWei(resp[0].softCap),
          hardCap: window.web3.utils.fromWei(resp[0].hardCap),
          minBuy: window.web3.utils.fromWei(resp[0].minBuy),
          maxBuy: window.web3.utils.fromWei(resp[0].maxBuy),
          startTime: resp[0].startTime,
          endTime: resp[0].endTime,
          launcher: resp[0].launcher,
          liquidityPercentage: resp[0].liquidity_Percentage,
          totalSupply: fromBn(totalSupply, decimals),
          liquidityTokens: window.web3.utils.fromWei(
            resp[0].liquidity_TokenAmount
          ),
          currentPool: window.web3.utils.fromWei,
          iswhitListed: resp[0].iswhitListed,
          fee: cat,
        });
        setLaunchpadTime({
          startTime: resp[0].startTime,
          endTime: resp[0].endTime,
        });
        // if(status[3] == '0'){
        // setIsInterval(true);
        // }
        // else{
        setIsInterval1(true);
        // }
      });
  };

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

    // if (maxContributeStatus && parseFloat(amount) > launchpadDetails.maxBuy) {
    //   toast.error("Amount must be smaller than or equal to max contribution", {
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

    // if (parseFloat(amount) > parseFloat(launchpadDetails.softCap)) {
    //   // alertHandled("Amount must be smaller than hardcap");
    //   toast.error("Amount must be smaller than softcap", {
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

    if (
      parseFloat(amount) >
      window.web3.utils.fromWei(walletData.balance, "ether")
    ) {
      // alertHandled("Total amount must be smaller than hardcap");
      toast.error("Your Account Balance is Insufficient", {
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

    if (launchpadDetails.maxBuy > 0) {
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
    }

    const details = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

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
            currentPool: window.web3.utils.fromWei(currentPool),
          };
        });
        setContributeDisabled(false);
        setContributeStatus(true);
        setAmount(0);
        withDrawTime();
      })
      .catch((err) => {
        setContributeStatus(false);
        setContributeDisabled(false);
      });
  };

  const emergencyWithDrawContribution = async () => {
    handleEmergencyClose();
    setEmergencyWithDraw(true);
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .emergencyWithdraw(window.ethereum.selectedAddress)
      .then(() => {
        toast.success("Withdraw done");
        setEmergencyWithDraw(false);
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
        handleEmergencyClose();
        setEmergencyWithDraw(false);
      });
  };

  const Finalize = async () => {
    if (parseFloat(gatheredCurrency) < launchpadDetails.softCap) {
      // alertHandled("Pool is not filled");
      toast.error("Pool is not filled", {
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

    setFinalStatus(true);

    const details = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const currencyForLiqiudity = await details.getCurrency(
      window.location.pathname.split("/")[2]
    );

    details
      .finalizeLaunchpad(window.location.pathname.split("/")[2])
      .then((resp) => {
        setAfterFinalClaim(true);
        setFinalStatus(false);
        // navigate("/");
      })
      .catch((err) => {
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

    // if (error) {
    // }
    // if (loading) {
    // }
    // if (launchpadDetails.presaleAddress) {
    //   CreateFairLaunch({
    //     variables: {
    //       CreateFairLaunch: {
    //         launchpadID: launchpadDetails.presaleAddress,
    //         tokenAddress: tokenAddress,
    //         name: tokenDetails.tokenName,
    //         symbol: tokenDetails.tokenSymbol,
    //         sellingAmount: parseInt(sellingAmount),
    //         softCap: parseFloat(softCap),
    //         maxContribution: parseInt(maxContribution),
    //         liquidityPercentage: parseInt(liquidity),
    //         startTime: startDate,
    //         endTime: endDate,
    //       },
    //     },
    //   });
    // }
  };

  //
  const handleMax = (e) => {
    e.preventDefault();
    const balance = parseFloat(window.web3.utils.fromWei(walletData.balance));
    if (launchpadDetails.maxBuy > 0) {
      if (launchpadDetails.maxBuy <= balance) {
        setAmount(launchpadDetails.maxBuy);
      } else {
        setAmount(balance);
      }
    } else {
      setAmount(balance);
    }
  };
  const handleRadio = async (e) => {
    setSelectedCheck(e.target.value);
  };

  const cancelLaunchpad = async () => {
    setIsCancelled(true);
    const details = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

    details
      .cancelLaunchpad(window.ethereum.selectedAddress)
      .then(() => {
        setIsCancelled(true);
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

  const getheredCurrency = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const gathered = await address.getheredCurrency();
    setGatheredCurrency(parseFloat(gathered));
  };

  const getCurrentFairSaleRate = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const current = await address.getCurrentFairSaleRate();
    const a = parseFloat(current);
    setCurrentRate(a.toFixed(3));
  };

  const getContributorsList = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const count = await address.getContributorsCounts();
    if (count >= 1) {
      const list = await address.getContributorsList();
      setList(list);
    } else {
      setList([]);
    }
  };

  const isFinalized = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

    const isFinal = await address.isfinalzed();
    if (isFinal) {
      setIsDisabled(true);
      setFinalStatus(false);
      setAfterFinalClaim(true);
    }
  };

  const getClaimableTokens = async () => {
    if (walletData.account) {
      const address = await launchpadMethods(
        window.location.pathname.split("/")[2]
      );
      const tokens = await address.getClaimableToken(walletData?.account);
      setClaimableTokens(window.web3.utils.fromWei(tokens));
    }
  };

  const claimToken = async () => {
    setClaim(true);

    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );
    await address
      .claimToken(window.ethereum.selectedAddress)
      .then(() => {
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

  const withDrawTokens = async () => {
    setWithDrawTokenStatus(true);
    try {
      const address = await launchpadMethods(
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

  const userPurchase = async () => {
    if (window.ethereum) {
      const address = await launchpadMethods(
        window.location.pathname.split("/")[2]
      );
      await address
        .userPurchased(window.ethereum.selectedAddress)
        .then((res) => {
          setUserPurchased(parseFloat(res));
        });
    }
  };

  const getClaimStatus = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const claimtokensStatus = await address.getClaimStatus(walletData?.account);
    setClaimTokenStatus(claimtokensStatus);
  };

  useEffect(() => {
    var interval = setInterval(() => {
      if (window.ethereum) {
        startTime();
        endTime();
        getCurrentFairSaleRate();
        getContributorsList();
        getPoolStatus();
        isFinalized();
        getheredCurrency();

        if (walletData.account) {
          getClaimableTokens();
          getClaimStatus();
        }
        userPurchase();
        withDrawTime();
      }
      // getLaunchpadDetails();
      // getLaunchpadTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    var interval = setInterval(() => {
      if (window.ethereum) {
        if (walletData.account) {
          getClaimableTokens();
          getClaimStatus();
          userPurchase();
        }
      }
      // getLaunchpadDetails();
      // getLaunchpadTime();
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

  useEffect(() => {
    if (walletData.account) {
      getClaimStatus();
    }

    startTime();
    endTime();
  }, []);

  /**
   * Selected Fee at time of creation
   */
  const feeCategorey = async () => {
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );
    const categoery = address.feeCategorey().then((res) => {
      setCat(res);
    });
  };

  const a = moment().unix(end);

  const withDrawTime = async () => {
    const time = await factoryMethods();
    time
      .withDrawTime()
      .then((res) => {
        setTime(res);
      })
      .catch(() => {});
  };

  // withDrawTime();

  const handleEmergencyClose = () => {
    setEmergencyShow(false);
    setEmergencyWithDraw(false);
  };

  const handleEmergencyShow = () => setEmergencyShow(true);

  const getTokensAmount = async () => {
    const presale = await launchpadDetails.presaleRate;
    if (presale) {
      let x = presale * amount;
      setTokensAmount(x);
    }
  };

  getTokensAmount();

  const [withDrawLiquidityStatus, setWithDrawLiquidityStatus] = useState(false);

  const withDrawLiquidityTokens = async () => {
    setWithDrawLiquidity(true);
    const address = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

    await address
      .withDrawLiquidityTokens(window.ethereum.selectedAddress)
      .then(() => {
        setWithDrawLiquidityStatus(true);
        setWithDrawLiquidity(true);
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
        setWithDrawLiquidityStatus(false);
        setWithDrawLiquidity(false);
      });
  };

  window.onpopstate = (e) => {
    navigate("/");
  };
  const startTime = async () => {
    try {
      const address = await launchpadMethods(
        window.location.pathname.split("/")[2]
      );
      const s = await address.startTime(window.location.pathname.split("/")[2]);
      setStart(s);
    } catch (error) {
      startTime();
    }
  };

  const endTime = async () => {
    try {
      const address = await launchpadMethods(
        window.location.pathname.split("/")[2]
      );
      const e = await address.endTime(window.location.pathname.split("/")[2]);
      setEnd(e);
    } catch (error) {
      endTime();
    }
  };

  const onImageError = (e) => {
    e.target.src = img;
  };
  return (
    <>
      <div className="main">
        <div className="main-inner">
          {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          /> */}
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
                                  {launchpadDetails.tokenName + " Fair Launch"}
                                </h1>
                              </div>
                              <div>
                                <Button
                                  type="button"
                                  className={`sale-btn ${
                                    isStatusCancelled
                                      ? "gray"
                                      : moment().unix() < start
                                      ? "yellow"
                                      : moment().unix() < end && status !== "4"
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
                            <div className="social-media-icons-container text-danger word-break-text">
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
                            <b>Presale Address</b>
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
                            {launchpadDetails.tokenAddress}{" "}
                            <FaCopy
                              className="copy-icon-token"
                              title="Copy Address"
                              onClick={() => {
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
                            {parseFloat(liquidityTokens).toFixed(3)}{" "}
                            {launchpadDetails.tokenName}
                          </p>
                        </li>
                        {/* <li>
                      <p>
                        <b>Presale Rate</b>
                      </p>
                      <p>
                        1 BNB = {launchpadDetails.presaleRate}{" "}
                        {launchpadDetails.tokenName}
                      </p>
                    </li> */}
                        {/* <li>
                      <p>
                        <b>Listing Rate</b>
                      </p>
                      <p>
                        1 BNB = {launchpadDetails.listingRate}{" "}
                        {launchpadDetails.tokenName}
                      </p>
                    </li> */}
                        {/* <li>
                      <p>
                        <b>Initial Market Cap (estimate) </b>
                      </p>
                      <p>$30245787</p>
                    </li> */}
                        <li>
                          <p>
                            <b>Soft Cap</b>
                          </p>
                          <p>{launchpadDetails.softCap} BNB</p>
                        </li>
                        {/* <li>
                      <p>
                        <b>Hard Cap</b>
                      </p>
                      <p>{launchpadDetails.hardCap} BNB</p>
                    </li> */}
                        {/* <li>
                          <p>
                            <b>Unsold Tokens</b>
                          </p>
                          <p>0</p>
                        </li> */}
                        <li>
                          <p>
                            <b>Presale Start Time</b>
                          </p>
                          <p>{moment.unix(start).format("lll")}</p>
                        </li>
                        <li>
                          <p>
                            <b>Presale End Time</b>
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
                        {/* <li>
                                            <p><b>Liquidity Lockup Time</b></p>
                                            <p>365 DAYS after pool end</p>
                                        </li> */}
                      </ul>
                    </>
                  ) : (
                    <div className="loader-container">
                      <Oval
                        height={50}
                        width={50}
                        color="#000"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#aaa"
                        strokeWidth={8}
                        strokeWidthSecondary={8}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                {/* Put Ended In start-timer-pool div */}
                <div className="full-div shadow-box start-timer-pool">
                  {status === "0" || status === "1" ? (
                    <>
                      <div className="text-center">
                        <h3>
                          {moment().unix() < start
                            ? "Presale Starts In"
                            : moment().unix() < end
                            ? "Presale Ends in"
                            : status === "5"
                            ? "Presale Expired"
                            : "Presale is Ended"}
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
                          (gatheredCurrency / launchpadDetails.softCap) * 100
                        }
                      />
                      <div className="flex-div">
                        <span className="text-secondary">
                          {gatheredCurrency} BNB
                        </span>
                        <span className="text-secondary">
                          {launchpadDetails.softCap} BNB
                        </span>
                      </div>

                      <div className="text-center">
                        <p>This Pool has been ended</p>
                      </div>
                      <div className="space-20"></div>
                      <h3>Amount</h3>
                      <div className="flex-div input-submit-div">
                        <input
                          type="number"
                          autoComplete="off"
                          id="token-symbol"
                          step="any"
                          value={amount}
                          placeholder="0.0"
                          onChange={(e) => setAmount(e.target.value)}
                          // {...register("max", {
                          //   onChange: (e) => handleAmount(e),
                          // })}
                        />
                        <Button onClick={handleMax}>Max</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <ProgressBar
                        now={
                          (gatheredCurrency / launchpadDetails.softCap) * 100
                        }
                      />
                      <div className="flex-div">
                        <span className="text-secondary">
                          {gatheredCurrency} BNB
                        </span>
                        <span className="text-secondary">
                          {launchpadDetails.softCap} BNB
                        </span>
                      </div>
                    </>
                  )}
                  {/* // status === "2" ? ( //{" "}
                  <h6 className="text-white text-center">Pool Has Filled</h6>
                  // ) : status === "3" ? ( //{" "}
                  <h6 className="text-white text-center">Pool Has Ended</h6>
                  // ) : status === "4" ? ( //{" "}
                  <h6 className="text-white text-center">
                    // Pool Has Cancelled //{" "}
                  </h6>
                  // ) : status === "5" ? ( //{" "}
                  <h6 className="text-white text-center">Pool Has Expired</h6>
                  // ) : ( // "" // )} */}
                  {/* <span className='grey-border'></span> */}

                  <div className="text-center">
                    {walletData.account ? (
                      afterFinalClaim ? (
                        claimTokenStatus ? (
                          <Button className="reg-gradient" disabled>
                            Token Claimed
                          </Button>
                        ) : userPurchased > 0 && !claimTokenStatus ? (
                          <Button
                            className="reg-gradient"
                            onClick={() => claimToken()}
                            disabled={claim}
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
                        maxContributeStatus &&
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
                  </div>
                  <div className="text-center">
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
                    {walletData.account &&
                    parseFloat(userPurchased) > 0 &&
                    status === "1" &&
                    moment().unix() <= end - time ? (
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
                    )}
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

                    {/* <li>
                      <p>Unsold Tokens </p>
                      <p>Burn</p>
                    </li> */}
                    <li>
                      <p>Current Rate</p>
                      <p className="text-right">
                        1 BNB = {currentRate} {launchpadDetails.tokenName}
                      </p>
                    </li>
                    <li>
                      <p>Total Contributors</p>
                      <p>{list?.length}</p>
                    </li>
                    {walletData.account && (
                      <li>
                        <p>You Purchased</p>
                        <p>{userPurchased} BNB</p>
                      </li>
                    )}

                    {launchpadDetails?.maxBuy > 0 && (
                      <li>
                        <p>Max Contribution</p>
                        <p>{launchpadDetails?.maxBuy} BNB</p>
                      </li>
                    )}
                  </ul>
                </div>
                {walletData?.account &&
                  launchpadDetails.launcher &&
                  launchpadDetails?.launcher.toLowerCase() ==
                    (walletData?.account).toLowerCase() && (
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
                          {moment().unix() <= end && status !== "4" && (
                            <Button
                              onClick={handleTimeShow}
                              className="reg-gradient"
                            >
                              Set End Time
                            </Button>
                          )}

                          <Modal className="my-modal" centered show={modalShow}>
                            {/* <Modal.Header>
                              <Modal.Title>White List Addresses</Modal.Title>
                            </Modal.Header> */}
                            <Modal.Body>
                              <p>Make this pool ending soon</p>
                              <div className="full-div shadow-box verification-info">
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Form.Check
                                    label="End Now"
                                    name="group2"
                                    type="radio"
                                    value="0"
                                    id="end-now"
                                    // checked={selectedFee === "0"}
                                    onChange={handleRadio}
                                  />
                                  <Form.Check
                                    label="End pool with specific time"
                                    name="group2"
                                    id="end-at"
                                    type="radio"
                                    value="1"
                                    onChange={handleRadio}
                                    // checked={selectedFee === "1"}
                                  />
                                </div>
                              </div>
                              {selectedCheck == 1 && (
                                <>
                                  <p>End time ( UTC )</p>
                                  <input
                                    type="datetime-local"
                                    id="time"
                                    value={newEndDate}
                                    aria-describedby="time"
                                    placeholder="2022-02-21"
                                    onChange={(e) =>
                                      setNewEndDate(e.target.value)
                                    }
                                  />
                                </>
                              )}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                className="reg-gradient"
                                onClick={handleTimeShow}
                              >
                                Close
                              </Button>
                              <Button
                                className="reg-gradient"
                                type="submit"
                                onClick={handleSaveDate}
                                disabled={saveCheck}
                              >
                                {saveCheck ? (
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
                                  "Save Changes"
                                )}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          {/* <Link to="/">Enable Whitelist</Link> */}
                        </li>
                        <li>
                          {list.length >= 1 ? (
                            <Button
                              className="reg-gradient"
                              onClick={handleShow}
                            >
                              List of Contributors
                            </Button>
                          ) : (
                            <Button className="reg-gradient" disbaled>
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
                              <Modal.Title>List of Contributors</Modal.Title>
                            </Modal.Header>
                            <ol className="contributers-list px-2">
                              {list?.length == 0 && (
                                <Modal.Body>No Contributors</Modal.Body>
                              )}
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
                              // ref={cancelRef}
                            >
                              {isCancelled ? <Loader /> : "Cancel Pool"}
                            </Button>
                          </li>
                        ) : isFinalized ? (
                          ""
                        ) : (
                          <></>
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
export default FairLaunchPitchtoken;
