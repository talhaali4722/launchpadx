import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
// import { tokenMethods, factoryMethods } from "../../web3/metamask";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import { factoryMethods } from "../../web3/Methods/FactoryMethods";
import {
  useAddtionalInfoStore,
  useCreateLaunchPadStore,
  useDefiLaunchPadStore,
} from "../store/useStore";
import { FACTORY_ADDRESS, RPC_URL } from "../../web3/Constants/constants";
import { useMutation } from "@apollo/client";
import { Button, Modal } from "react-bootstrap";
import { CREATE_LAUNCHPAD_MUTATION } from "../Graphql/Mutations";
import axios from "axios";
import LaunchpadType from "../enums/LaunchpadType.enum";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import { fromBn } from "evm-bn";
import Loader from "../../components/loader";
import { useSelector } from "react-redux";
import switchingToBNB from "../../web3/SwitchToBNB";
// import { info } from "sass";
// const CREATE_LAUNCHPAD_MUTATION = gql`
// mutation createLaunchPad() {
//   Createlaunchpad(CreatelaunchpadInput:{
//     tokenAddress: "",
//     softCap: 0.0,
//     hardCap: 0.1,
//     minimumBuy: 0.1,
//     maximumBuy: 0.5,
//     startTime: "",
//     endTime: "",
//     refundType: Burn,
//     listingRate: 100,
//     liquidityPercentage: 100,
//     metadata:{
//       logoUrl: "",
//       website: "",

//     }

//   })
// }
// `;

function Finishlaunchpad() {
  const walletData = useSelector((state) => state.wallet);
  const launchpadID = useCreateLaunchPadStore((state) => state.launchpadID);
  const setLaunchpadID = useCreateLaunchPadStore(
    (state) => state.setLaunchpadID
  );
  const tokenAddress = useCreateLaunchPadStore((state) => state.tokenAddress);
  const allowanceofToken = useCreateLaunchPadStore(
    (state) => state.allowanceToken
  );
  const softCap = useDefiLaunchPadStore((state) => state.softCap);
  const hardCap = useDefiLaunchPadStore((state) => state.hardCap);
  const startDate = useDefiLaunchPadStore((state) => state.startDate);
  const endDate = useDefiLaunchPadStore((state) => state.endDate);
  const listingRate = useDefiLaunchPadStore((state) => state.listingRate);
  const liquidity = useDefiLaunchPadStore((state) => state.liquidity);
  const minimumBuy = useDefiLaunchPadStore((state) => state.minimumBuy);
  const maximumBuy = useDefiLaunchPadStore((state) => state.maximumBuy);
  const tokensStatus = useDefiLaunchPadStore((state) => state.tokensStatus); // const refundType = useDefiLaunchPadStore((state) => state.refundType);
  const preSale = useDefiLaunchPadStore((state) => state.preSale);
  // const webUrl = useAddtionalInfoStore((state) => state.webUrl);
  // const logoUrl = useAddtionalInfoStore((state) => state.logoUrl);
  const {
    description,
    redditUrl,
    discordUrl,
    telegramUrl,
    twitterUrl,
    gitHubUrl,
    instagramUrl,
    facebookUrl,
    logoUrl,
    webUrl,
  } = useAddtionalInfoStore((state) => ({
    description: state.description,
    redditUrl: state.redditUrl,
    discordUrl: state.discordUrl,
    telegramUrl: state.telegramUrl,
    twitterUrl: state.twitterUrl,
    gitHubUrl: state.gitHubUrl,
    instagramUrl: state.instagramUrl,
    facebookUrl: state.facebookUrl,
    logoUrl: state.logoUrl,
    webUrl: state.webUrl,
  }));
  const [loader, setLoader] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const [emergencyShow, setEmergencyShow] = useState(false);
  const [allowanceToken, setAllowanceToken] = useState("");
  const [approvedStatus, setApprovedStatus] = useState(false);
  const decimal = useCreateLaunchPadStore((state) => state.decimal);

  const navigate = useNavigate();

  const isWhiteListed = useDefiLaunchPadStore((state) => state.isWhiteListed);
  const selectedFee = useCreateLaunchPadStore((state) => state.selectedFee);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [launchpadID, setLaunchpadID] = useState("");
  const [tokenDetails, settokenDetails] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    tokenBalance: 0,
    tokenAddress: "",
  });

  const [Createlaunchpad, { loading, data, error }] = useMutation(
    CREATE_LAUNCHPAD_MUTATION
  );

  const refundType = useDefiLaunchPadStore((state) => state.refundType);

  const contractDetails = async () => {
    if (tokenAddress) {
      const tokenDetail = await tokenMethods(tokenAddress);
      const name = await tokenDetail.nameOfToken();
      const symbol = await tokenDetail.symbolOfToken();
      const decimals = await tokenDetail.decimalsOfToken();
      const balanceOf = await tokenDetail.balanceOfToken(
        window.ethereum.selectedAddress
      );
      // const tokenName = await  nameOfToken()
      settokenDetails((prev) => {
        return {
          ...prev,
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
          tokenAddress: tokenAddress,
          tokenBalance: fromBn(balanceOf, decimal),
        };
      });

      if (
        parseFloat(tokensStatus) <= parseFloat(allowanceToken) &&
        parseFloat(tokensStatus) <= parseFloat(fromBn(balanceOf, decimal))
      ) {
        // createLaunchpad();
        setApproveStatus(true);
      }

      // const getAllowance = async () => {
      //   const tokenDetail = await tokenMethods(tokenAddress);
      tokenDetail
        .allowance(window.ethereum.selectedAddress, FACTORY_ADDRESS)
        .then((res) => {
          const x = fromBn(res, decimal);
          setAllowanceToken(x);
        });
      // };
      // getAllowance();
    }
  };
  useEffect(() => {
    contractDetails();
    if (tokenAddress) {
      const getAllowance = async () => {
        const tokenDetail = await tokenMethods(tokenAddress);
        tokenDetail
          .allowance(window.ethereum.selectedAddress, FACTORY_ADDRESS)
          .then((res) => {
            const x = fromBn(res, decimal);

            setAllowanceToken(x);
          });
      };
      getAllowance();
    }
  }, [tokenAddress]);

  /* if (performance.navigation.type === 1) {
    navigate("/Createlaunchpad/Createlaunchpad");
  } */
  // let dataa = window.performance.getEntriesByType("navigation")[0].type;
  // if (dataa) {
  //   navigate("/Createlaunchpad/Createlaunchpad");
  // }
  useEffect(() => {
    window.onload = takeBack;
    return () => {
      window.onload = takeBack;
    };
  }, []);
  const takeBack = (e) => {
    e.preventDefault();
    e.returnValue = "";
    navigate("/Createlaunchpad/Createlaunchpad");
  };
  const createLaunchpad = async () => {
    var payload = {
      tokenAddress: tokenAddress,
      launchpadType: LaunchpadType.Standard_Launchpad,
      liquidity: liquidity,
      preSaleRate: preSale,
      softCap: softCap,
      hardCap: hardCap,
      maxBuy: maximumBuy,
      minBuy: minimumBuy,
      listingRate: listingRate,
      decreaseTime: 0,
      startTime: moment(startDate).unix(),
      endTime: moment(endDate).unix(),
      isWhiteListed: isWhiteListed == "0" ? false : true,
      feeOption: selectedFee,
      uSoldTokenRefundType:
        refundType === "0" ? "0" : refundType === "1" ? "1" : "0",
      logoURL: logoUrl,
      website: webUrl,
      decimals: decimal,
    };
    const factory = await factoryMethods();
    setLoader(true);
    factory
      .createLaunchpad(payload, window.ethereum.selectedAddress)
      .then((create) => {
        setLoader(false);

        var body = {
          jsonrpc: "2.0",
          method: "eth_getTransactionReceipt",
          params: [create.transactionHash],
          id: 53,
        };
        axios.post(RPC_URL, body).then((resp) => {
          const launchpadAddress = window.web3.eth.abi.decodeParameter(
            "address",
            resp.data.result.logs[0].topics[2]
          );

          setLaunchpadID(launchpadAddress);
          if (launchpadAddress) {
            Createlaunchpad({
              variables: {
                create: {
                  presaleAddress: launchpadAddress.toLowerCase(),
                  type: LaunchpadType.Standard_Launchpad.toString(),
                  tokenAddress: tokenAddress,
                  tokenName: tokenDetails.tokenName,
                  tokenSymbol: tokenDetails.tokenSymbol,
                  tokenDecimal: parseFloat(decimal),
                  status: "0",
                  liquidityTokens: parseFloat(tokensStatus),
                  launcher: walletData.account,
                  liquidityPercentage: parseFloat(liquidity),
                  preSaleRate: parseFloat(preSale),
                  softCap: parseFloat(softCap),
                  hardCap: parseFloat(hardCap),
                  maximumBuy: parseFloat(maximumBuy),
                  minimumBuy: parseFloat(minimumBuy),
                  listingRate: parseFloat(listingRate),
                  startTime: parseFloat(moment(startDate).unix()),
                  endTime: parseFloat(moment(endDate).unix()),
                  isWhitelisted: isWhiteListed == "0" ? false : true,

                  metadata: {
                    logoUrl: logoUrl,
                    website: webUrl,
                    description: description,
                    redditUrl: redditUrl,
                    discordUrl: discordUrl,
                    telegramUrl: telegramUrl,
                    twitterUrl: twitterUrl,
                    githubUrl: gitHubUrl,
                    instagramUrl: instagramUrl,
                    facebookUrl: facebookUrl,
                  },
                },
              },
            });
            navigate(`/StandardPitchToken/${launchpadAddress}`);
          }
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
        setIsDisabled(false);
        setLoader(false);
      });
  };

  const addLAunchpad = async () => {
    contractDetails();
    if (
      parseFloat(tokensStatus) <= parseFloat(allowanceToken) &&
      parseFloat(tokensStatus) <= parseFloat(tokenDetails.tokenBalance)
    ) {
      // createLaunchpad();
      setApproveStatus(true);
    } else {
      setApproveStatus(false);
    }
    setEmergencyShow(true);
  };

  const handleEmergencyClose = () => {
    setEmergencyShow(false);
  };

  const createOnOk = async () => {
    if (moment(startDate).unix() > moment().unix()) {
      createLaunchpad();
      setEmergencyShow(false);
      setIsDisabled(true);
    } else {
      toast.error("Start Date Must greater or equal to Current time", {
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
  };

  const approveAndCreate = async () => {
    const remaining = tokenDetails.tokenBalance - tokensStatus;

    setApprovedStatus(true);
    const tokenDetail = await tokenMethods(tokenAddress);
    const balance = await tokenDetail.balanceOfToken(
      window.ethereum.selectedAddress
    );
    tokenDetail
      .approveToken(window.ethereum.selectedAddress, balance)
      .then((res) => {
        toast.success("Tokens approved");
        setEmergencyShow(false);
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
        setIsDisabled(false);
      });
  };
  const startUnix = moment(startDate).unix();
  const endUnix = moment(endDate).unix();
  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul style={{ maxWidth: "1400px" }} className="verify-list">
                  <li className="active complete">
                    <span>01</span>
                    <div className="txt-pnl">
                      <h6>Verify Token</h6>
                      <p>Enter the token address and verify</p>
                    </div>
                  </li>
                  <li className="active complete">
                    <span>02</span>
                    <div className="txt-pnl">
                      <h6>DeFi Launchpad Info</h6>
                      <p>
                        Enter the Fairlaunch information that you want to raise
                        , that should be enter all details about your pool
                      </p>
                    </div>
                  </li>
                  <li className="active complete">
                    <span>03</span>
                    <div className="txt-pnl">
                      <h6>Add Additional Info</h6>
                      <p>Let people know who you are</p>
                    </div>
                  </li>
                  <li className="active">
                    <span>04</span>
                    <div className="txt-pnl">
                      <h6>Finish</h6>
                      <p>Review your information</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-xl-12 col-lg-10 col-md-12 col-sm-12">
                <form style={{ maxWidth: "1265px" }}>
                  <div className="full-div shadow-box verification-info">
                    {tokenDetails.tokenName ? (
                      <>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <ul className="flex-list">
                            <li>
                              <p>
                                <b>Presale Address</b>
                              </p>
                              <p className="word-break">
                                {FACTORY_ADDRESS ? FACTORY_ADDRESS : "---"}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Token Name</b>
                              </p>
                              <p>
                                {tokenDetails.tokenName
                                  ? tokenDetails.tokenName
                                  : "———"}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Token Symbol</b>
                              </p>
                              <p>
                                {tokenDetails.tokenSymbol
                                  ? tokenDetails.tokenSymbol
                                  : "———"}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Token Decimals</b>
                              </p>
                              <p>
                                {tokenDetails.tokenDecimals
                                  ? tokenDetails.tokenDecimals
                                  : "———"}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Token Address</b>
                              </p>
                              <p className="word-break">
                                {tokenDetails.tokenAddress
                                  ? tokenDetails.tokenAddress
                                  : "———"}
                              </p>
                            </li>
                            {/* <li>
                          <p>
                            <b>Total Supply</b>
                          </p>
                          <p>1020215844121002121 DPI</p>
                        </li> */}
                            {/* <li>
                          <p>
                            <b>Tokens For Presale</b>
                          </p>
                          <p>111545878745454 DPI</p>
                        </li> */}
                            {/* <li>
                          <p>
                            <b>Tokens For Liquidity</b>
                          </p>
                          <p>104545445544 DPI</p>
                        </li> */}
                            {/* <li>
                          <p>
                            <b>Presale Rate</b>
                          </p>
                          <p>1 BNB = 30254 DPI</p>
                        </li> */}
                            <li>
                              <p>
                                <b>Listing Rate</b>
                              </p>
                              <p>{parseFloat(listingRate, 10)}</p>
                            </li>
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
                              <p>{parseFloat(softCap, 10)}</p>
                            </li>
                            <li>
                              <p>
                                <b>Hard Cap</b>
                              </p>
                              <p>{parseFloat(hardCap, 10)}</p>
                            </li>
                            <li>
                              <p>
                                <b>Unsold Tokens</b>
                              </p>
                              <p>
                                {refundType == "0"
                                  ? "REFUND"
                                  : refundType == "1"
                                  ? "BURN"
                                  : "REFUND"}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Presale Start Time</b>
                              </p>
                              <p>
                                {moment.unix(startUnix).format("lll")} (UTC)
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Presale End Time</b>
                              </p>
                              <p>{moment.unix(endUnix).format("lll")} (UTC)</p>
                            </li>
                            {/* <li>
                          <p>
                            <b>Listing On</b>
                          </p>
                          <p>BNB</p>
                        </li> */}
                            <li>
                              <p>
                                <b>Liquidity Percent</b>
                              </p>
                              <p>{parseFloat(liquidity, 10)}%</p>
                            </li>
                            {/* <li>
                          <p>
                            <b>Liquidity Lockup Time</b>
                          </p>
                          <p>365 DAYS after pool end</p>
                        </li> */}
                            <li>
                              <p>
                                <b>Website</b>
                              </p>
                              <p className="word-break">
                                {webUrl ? webUrl : "———"}
                              </p>
                            </li>
                          </ul>
                          <div className="reload-warning-div container mt-1 mb-4">
                            <p className="reload-warning-text">
                              Data will not be saved on reload
                            </p>
                          </div>
                        </div>
                        <div className="full-div text-right">
                          <div className="btn-cntnr">
                            <Link
                              className="reg-gradient big trans"
                              to="/Createlaunchpad/Addaditionalinfo"
                            >
                              Back
                            </Link>

                            {
                              <>
                                <Button
                                  className="reg-gradient big"
                                  onClick={addLAunchpad}
                                  disabled={isDisabled}
                                >
                                  {isDisabled ? <Loader /> : "Finish"}
                                </Button>
                                <Modal
                                  centered
                                  onEscapeKeyDown={handleEmergencyClose}
                                  show={emergencyShow}
                                  onHide={handleEmergencyClose}
                                  className="contributers-list-container"
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Confirmation</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    {approveStatus ? (
                                      <div className="reload-warning-div">
                                        <p>Are you sure to create Launchpad?</p>
                                      </div>
                                    ) : (
                                      <div className="reload-warning-div">
                                        <p>
                                          Tokens Required to create Launchpad:{" "}
                                          {tokensStatus}
                                        </p>
                                        <p>Your Allowance: {allowanceToken}</p>
                                        <p>
                                          Your Current Balance:{" "}
                                          {tokenDetails.tokenBalance}
                                        </p>

                                        {tokenDetails.tokenBalance <
                                        tokensStatus ? (
                                          <>
                                            <p>
                                              You Need{" "}
                                              {tokensStatus - allowanceToken}{" "}
                                              Token to create Launchpad
                                            </p>
                                          </>
                                        ) : (
                                          <p>
                                            Do you want to create launchpad?
                                          </p>
                                        )}
                                        {tokenDetails.tokenBalance <=
                                          allowanceToken && (
                                          <p>Insufficient Balance</p>
                                        )}
                                      </div>
                                    )}
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button
                                      variant="secondary"
                                      className="reg-gradient"
                                      onClick={handleEmergencyClose}
                                    >
                                      Cancel
                                    </Button>

                                    {approveStatus ? (
                                      <Button
                                        variant="secondary"
                                        className="reg-gradient"
                                        onClick={createOnOk}
                                      >
                                        OK
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="secondary"
                                        className="reg-gradient"
                                        onClick={approveAndCreate}
                                        disabled={
                                          tokenDetails.tokenBalance <=
                                            allowanceToken || approvedStatus
                                        }
                                      >
                                        {approvedStatus ? (
                                          <Loader />
                                        ) : (
                                          "Approve"
                                        )}
                                      </Button>
                                    )}
                                  </Modal.Footer>
                                </Modal>
                              </>
                            }
                          </div>
                        </div>
                      </>
                    ) : (
                      <Loader />
                    )}

                    <div className="space-20"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Finishlaunchpad;
