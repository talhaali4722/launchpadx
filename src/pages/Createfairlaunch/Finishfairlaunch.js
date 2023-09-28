import { useMutation } from "@apollo/client";
import axios from "axios";
import { fromBn } from "evm-bn";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Oval, RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
// import { FACTORY_ADDRESS, RPC_URL } from "../../web3/constants";
import { FACTORY_ADDRESS, RPC_URL } from "../../web3/Constants/constants";
// import { factoryMethods, tokenMethods } from "../../web3/metamask";
import { factoryMethods } from "../../web3/Methods/FactoryMethods";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import switchingToBNB from "../../web3/SwitchToBNB";
import LaunchpadType from "../enums/LaunchpadType.enum";
import {
  CREATE_FAIR_LAUNCH_MUTATION,
  CREATE_LAUNCHPAD_MUTATION,
} from "../Graphql/Mutations";
import {
  useCreateFairLaunchInfoStore,
  useCreateFairLaunchStore,
  useFairLaunchAdditionalInfo,
} from "../store/useStore";

function Finishfairlaunch() {
  const [Createlaunchpad, { loading, data, error }] = useMutation(
    CREATE_LAUNCHPAD_MUTATION
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const tokenAddress = useCreateFairLaunchStore((state) => state.tokenAddress);
  const sellingAmount = useCreateFairLaunchInfoStore(
    (state) => state.sellingAmount
  );
  const softCap = useCreateFairLaunchInfoStore((state) => state.softCap);
  const liquidity = useCreateFairLaunchInfoStore((state) => state.liquidity);
  const startDate = useCreateFairLaunchInfoStore((state) => state.startDate);
  const endDate = useCreateFairLaunchInfoStore((state) => state.endDate);

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
  } = useFairLaunchAdditionalInfo((state) => ({
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

  const maxContribution = useCreateFairLaunchInfoStore(
    (state) => state.maxContribution
  );
  const status = useCreateFairLaunchInfoStore((state) => state.status);
  const selectedFee = useCreateFairLaunchStore((state) => state.selectedFee);
  const [loader, setLoader] = useState(false);
  const launchpadID = useCreateFairLaunchStore((state) => state.launchpad);
  const setLaunchpadID = useCreateFairLaunchStore(
    (state) => state.setLaunchpadID
  );
  const {
    setSoftCap,
    setSellingAmount,
    setLiquidity,
    setEndDate,
    setStartDate,
    setMaxContribution,
  } = useCreateFairLaunchInfoStore((state) => ({
    setSoftCap: state.setSoftCap,
    setSellingAmount: state.setSellingAmount,
    setLiquidity: state.setLiquidity,
    setStartDate: state.setStartDate,
    setEndDate: state.setEndDate,
    setMaxContribution: state.setMaxContribution,
  }));
  /*   const {
    setLogoUrl,
    setFacebookUrl,
    setInstagramUrl,
    setGithubUrl,
    setTwitterUrl,
    setTelegramUrl,
    setDiscordUrl,
    setRedditUrl,
    setDescription,
    setWebUrl,
  } = useFairLaunchAdditionalInfo((state) => ({
    setLogoUrl: state.setLogoUrl,
    setFacebookUrl: state.setFacebookUrl,
    setInstagramUrl: state.setInstagramUrl,
    setGithubUrl: state.setGithubUrl,
    setTwitterUrl: state.setTwitterUrl,
    setTelegramUrl: state.setTelegramUrl,
    setDiscordUrl: state.setDiscordUrl,
    setRedditUrl: state.setRedditUrl,
    setDescription: state.setDescription,
    setWebUrl: state.setWebUrl,
  }));
  const clearFairInfo = () => {
    setSoftCap(0);
    setSellingAmount(0);
    setLiquidity("");
    setEndDate("");
    setStartDate("");
    setMaxContribution(0);
    setLogoUrl("");
    setFacebookUrl("");
    setInstagramUrl("");
    setGithubUrl("");
    setTwitterUrl("");
    setTelegramUrl("");
    setDiscordUrl("");
    setRedditUrl("");
    setDescription("");
    setWebUrl("");
  }; */

  const [launchpadAddress, setLaunchpadAddress] = useState("");
  const [allowanceToken, setAllowanceToken] = useState("");
  const [emergencyShow, setEmergencyShow] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  const walletData = useSelector((state) => state.wallet);
  const decimal = useCreateFairLaunchStore((state) => state.decimal);

  const [tokenDetails, settokenDetails] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    tokenBalance: 0,
    liquidityForToken: 0,
  });

  const navigate = useNavigate();

  /**
   * fetch token detauils i.e. token name symbol and decimals
   */
  const contractDetails = async () => {
    if (tokenAddress) {
      const tokenDetail = await tokenMethods(tokenAddress);
      const name = await tokenDetail.nameOfToken();
      const symbol = await tokenDetail.symbolOfToken();
      const decimals = await tokenDetail.decimalsOfToken();
      const balanceOf = await tokenDetail.balanceOfToken(
        window.ethereum.selectedAddress
      );

      settokenDetails((prev) => {
        return {
          ...prev,
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
          tokenBalance: fromBn(balanceOf, decimal),
        };
      });

      if (
        parseFloat(status) <= parseFloat(allowanceToken) &&
        parseFloat(status) <= parseFloat(fromBn(balanceOf, decimal))
      ) {
        // createLaunchpad();

        setApproveStatus(true);
      } else {
        setApproveStatus(false);
      }
      tokenDetail
        .allowance(window.ethereum.selectedAddress, FACTORY_ADDRESS)
        .then((res) => {
          const x = fromBn(res, decimal);

          setAllowanceToken(x);
        });
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
            setAllowanceToken(window.web3.utils.fromWei(res, "ether"));
          });
      };
      getAllowance();
    }
  }, [tokenAddress]);

  const createLaunchpad = async () => {
    var payload = {
      tokenAddress: tokenAddress,
      launchpadType: LaunchpadType.Fair_Launchpad,
      liquidity: liquidity,
      preSaleRate: sellingAmount,
      softCap: softCap,
      hardCap: 0,
      maxBuy: maxContribution ? maxContribution : 0,
      minBuy: 0,
      listingRate: 0,
      decreaseTime: 0,
      startTime: moment(startDate).unix(),
      endTime: moment(endDate).unix(),
      isWhiteListed: 0,
      feeOption: selectedFee,
      logoURL: logoUrl,
      website: webUrl,
      decimals: tokenDetails.tokenDecimals,
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
                  type: LaunchpadType.Fair_Launchpad.toString(),
                  tokenAddress: tokenAddress,
                  tokenName: tokenDetails.tokenName,
                  tokenSymbol: tokenDetails.tokenSymbol,
                  tokenDecimal: parseFloat(tokenDetails.tokenDecimals),
                  status: "0",
                  liquidityTokens: parseFloat(status),
                  launcher: walletData.account,
                  liquidityPercentage: parseFloat(liquidity),
                  preSaleRate: parseFloat(sellingAmount),
                  softCap: parseFloat(softCap),
                  hardCap: 0,
                  maximumBuy: parseFloat(maxContribution ? maxContribution : 0),
                  minimumBuy: 0,
                  listingRate: 0,
                  startTime: parseFloat(moment(startDate).unix()),
                  endTime: parseFloat(moment(endDate).unix()),
                  isWhitelisted: false,

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
            navigate(`/FairLaunchPitchtoken/${launchpadAddress}`);
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

  const addFairlaunch = () => {
    if (walletData.account && walletData.chainId == "0x61") {
      contractDetails();
      setEmergencyShow(true);
    } else if (walletData.account && walletData.chainId !== "0x61") {
      toast.error("Please Switch to BNB Network", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Please Connect to metamask", {
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

    if (
      parseFloat(status) <= parseFloat(allowanceToken) &&
      parseFloat(status) <= parseFloat(tokenDetails.tokenBalance)
    ) {
      // createLaunchpad();
      setApproveStatus(true);
    }
    // if (parseFloat(status) <= parseFloat(allowanceToken)) {
    //   // createLaunchpad();
    //   setApproveStatus(true);
    // }
  };

  useEffect(() => {
    window.onload = takeBack;
    return () => {
      window.onload = takeBack;
    };
  }, []);

  const takeBack = (e) => {
    e.preventDefault();
    e.returnValue = "";
    navigate("/Createfairlaunch/Createfairlaunch");
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
      setEmergencyShow(false);
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
    const remaining = tokenDetails.tokenBalance - status;

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
              <div
                style={{ maxWidth: "1495px" }}
                className="col-xl-12 col-lg-12 col-md-12 col-sm-12"
              >
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
                      <h6>DeFi Fairlaunch Info</h6>
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
                                <b>Total token</b>
                              </p>
                              <p>
                                {status} {tokenDetails.tokenSymbol}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Factory Address</b>
                              </p>
                              <p className="word-break">{FACTORY_ADDRESS}</p>
                            </li>
                            <li>
                              <p>
                                <b>Token name</b>
                              </p>
                              <p>{tokenDetails.tokenName}</p>
                            </li>
                            <li>
                              <p>
                                <b>Token symbol</b>
                              </p>
                              <p>{tokenDetails.tokenSymbol}</p>
                            </li>
                            <li>
                              <p>
                                <b>Token decimals</b>
                              </p>
                              <p>{tokenDetails.tokenDecimals}</p>
                            </li>
                            <li>
                              <p>
                                <b>Total selling amount</b>
                              </p>
                              <p>
                                {sellingAmount} {tokenDetails.tokenName}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Softcap</b>
                              </p>
                              <p>{parseFloat(softCap)} BNB</p>
                            </li>

                            <li>
                              <p>
                                <b>Max Owner Receive</b>
                              </p>
                              <p>
                                {maxContribution
                                  ? parseFloat(maxContribution)
                                  : "disabled"}
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>Liquidity</b>
                              </p>
                              <p>{parseFloat(liquidity)}%</p>
                            </li>
                            <li>
                              <p>
                                <b>Start time</b>
                              </p>
                              <p>
                                {moment.unix(startUnix).format("lll")} (UTC)
                              </p>
                            </li>
                            <li>
                              <p>
                                <b>End time</b>
                              </p>
                              <p>{moment.unix(endUnix).format("lll")} (UTC)</p>
                            </li>
                            {/* <li>
                        <p>
                          <b>Liquidity lockup time</b>
                        </p>
                        <p>111 minutes</p>
                      </li> */}
                            <li>
                              <p>
                                <b>Website</b>
                              </p>
                              <p
                                style={{
                                  wordBreak: "break-all",
                                  maxWidth: "80%",
                                }}
                              >
                                {webUrl}
                              </p>
                            </li>
                            {/* <li>
                        <p>
                          <b>Using Team Vesting?******</b>
                        </p>
                        <p>No</p>
                      </li> */}
                          </ul>
                        </div>
                        <div className="full-div text-right">
                          <div className="btn-cntnr">
                            <Link
                              className="reg-gradient big trans"
                              to="/Createfairlaunch/Fairlaunchadditionalinfo"
                            >
                              Back
                            </Link>

                            {
                              <>
                                <Button
                                  className="reg-gradient big"
                                  onClick={addFairlaunch}
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
                                    <Modal.Title>Confirmaton</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    {approveStatus ? (
                                      <div className="reload-warning-div container">
                                        <p>Are you sure to create Launchpad?</p>
                                      </div>
                                    ) : (
                                      <div className="reload-warning-div container">
                                        <p>
                                          Tokens Required to create Launchpad:{" "}
                                          {status}
                                        </p>
                                        <p>Your Allowance: {allowanceToken}</p>
                                        <p>
                                          Your Current Balance:{" "}
                                          {tokenDetails.tokenBalance}
                                        </p>

                                        {fromBn(
                                          tokenDetails.tokenBalance,
                                          decimal
                                        ) < status ? (
                                          <>
                                            <p>
                                              You Need {status - allowanceToken}{" "}
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
                                          <p>Insuffiecient Balance</p>
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
                                          <div className="loader-container">
                                            <Oval
                                              height={30}
                                              width={30}
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
export default Finishfairlaunch;
