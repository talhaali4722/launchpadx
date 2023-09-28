import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FACTORY_ADDRESS,
  DUTCH_FACTORY,
  RPC_URL,
} from "../../web3/Constants/constants";
import { factoryMethods } from "../../web3/Methods/DutchSubFactoryMethods";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import LaunchpadType from "../enums/LaunchpadType.enum";
import { toBn, fromBn } from "evm-bn";

import {
  useCreateDutchAuction,
  useDucthAdditionalInfo,
  useDutchAuctionInfo,
} from "../store/useStore";
import Loader from "../../components/loader";
import { useMutation } from "@apollo/client";
import { CREATE_LAUNCHPAD_MUTATION } from "../Graphql/Mutations";
import { useSelector } from "react-redux";
import showConsole from "../../utils/common-functions";
import switchingToBNB from "../../web3/SwitchToBNB";
function FinishDutchlaunch() {
  const walletData = useSelector((state) => state.wallet);

  const tokenAddress = useCreateDutchAuction((state) => state.tokenAddress);
  const decimals = useCreateDutchAuction((state) => state.decimals);
  const sellingAmount = useDutchAuctionInfo((state) => state.sellingAmount);
  const startPrice = useDutchAuctionInfo((state) => state.startPrice);
  const endPrice = useDutchAuctionInfo((state) => state.endPrice);
  const softCap = useDutchAuctionInfo((state) => state.softCap);
  const hardCap = useDutchAuctionInfo((state) => state.hardCap);
  const startDate = useDutchAuctionInfo((state) => state.startDate);
  const endDate = useDutchAuctionInfo((state) => state.endDate);
  const minContribution = useDutchAuctionInfo((state) => state.minContribution);
  const maxContribution = useDutchAuctionInfo((state) => state.maxContribution);
  const decreasePriceCycle = useDutchAuctionInfo(
    (state) => state.decreasePriceCycle
  );
  const liquidity = useDutchAuctionInfo((state) => state.liquidity);
  const refundType = useDutchAuctionInfo((state) => state.refundType);
  const isWhiteListed = useDutchAuctionInfo((state) => state.isWhiteListed);
  const selectedFee = useCreateDutchAuction((state) => state.selectedFee);
  const logoUrl = useDucthAdditionalInfo((state) => state.logoUrl);
  const webUrl = useDucthAdditionalInfo((state) => state.webUrl);
  const facebookUrl = useDucthAdditionalInfo((state) => state.facebookUrl);
  const twitterUrl = useDucthAdditionalInfo((state) => state.twitterUrl);
  const instagramUrl = useDucthAdditionalInfo((state) => state.instagramUrl);
  const discordUrl = useDucthAdditionalInfo((state) => state.discordUrl);
  const redditUrl = useDucthAdditionalInfo((state) => state.redditUrl);
  const gitHubUrl = useDucthAdditionalInfo((state) => state.gitHubUrl);
  const telegramUrl = useDucthAdditionalInfo((state) => state.telegramUrl);
  const description = useDucthAdditionalInfo((state) => state.description);
  const tokensStatus = useDutchAuctionInfo((state) => state.tokensStatus);
  const [launchpadID, setLaunchpadID] = useState("");
  const [allowanceToken, setAllowanceToken] = useState("");
  const [emergencyShow, setEmergencyShow] = useState(false);
  const [approvedStatus, setApprovedStatus] = useState(false);
  const [approveStatus, setApproveStatus] = useState(false);
  // const selectedFee = useCreateDutchAuction((state) => state.selectedFee);

  const [Createlaunchpad, { loading, data, error }] = useMutation(
    CREATE_LAUNCHPAD_MUTATION,
    {
      onCompleted: (data) => {},
    }
  );

  const navigate = useNavigate();

  const [tokenDetails, settokenDetails] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    tokenBalance: 0,
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const contractDetails = async () => {
    if (tokenAddress) {
      const tokenDetail = await tokenMethods(tokenAddress);
      const name = await tokenDetail.nameOfToken();
      const symbol = await tokenDetail.symbolOfToken();
      const decimals = await tokenDetail.decimalsOfToken();
      const balance = await tokenDetail.balanceOfToken(
        window.ethereum.selectedAddress
      );

      // const tokenName = await  nameOfToken()
      settokenDetails((prev) => {
        return {
          ...prev,
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
          tokenBalance: fromBn(balance, decimals),
        };
      });
      if (
        parseFloat(tokensStatus) <= fromBn(balance, decimals) &&
        parseFloat(tokensStatus) <= parseFloat(allowanceToken)
      ) {
        setApproveStatus(true);
      } else {
        setApproveStatus(false);
      }
      tokenDetail
        .allowance(window.ethereum.selectedAddress, DUTCH_FACTORY)
        .then((res) => {
          const x = fromBn(res, decimals);
          setAllowanceToken(x);
        });
    }
  };

  useEffect(() => {
    contractDetails();
  }, []);
  useEffect(() => {
    if (tokenAddress) {
      const getAllowance = async () => {
        const tokenDetail = await tokenMethods(tokenAddress);
        const decimals = await tokenDetail.decimalsOfToken();

        tokenDetail
          .allowance(window.ethereum.selectedAddress, DUTCH_FACTORY)
          .then((res) => {
            const x = fromBn(res, decimals);
            setAllowanceToken(x);
          });
      };
      getAllowance();
    }
  }, [tokenAddress]);

  const createLaunchpad = async () => {
    var payload = {
      /* 
      tokenAddress: tokenAddress,
      launchpadType: LaunchpadType.Dutch_Auction,
      liquidity: liquidity,
      preSaleRate: sellingAmount,
      softCap: softCap,
      hardCap: hardCap,
      maxBuy: maxContribution,
      minBuy: minContribution,
      listingRate: 0,
      decreaseTime: decreasePriceCycle,
      startTime: moment(startDate).unix(),
      endTime: moment(endDate).unix(),
 */
      tokenAddress: tokenAddress,
      launchpadType: LaunchpadType.Dutch_Auction,
      liquidity: liquidity,
      preSaleRate: sellingAmount,
      softCap: softCap,
      hardCap: hardCap,
      maxBuy: maxContribution,
      minBuy: minContribution,
      listingRate: 0,
      decreaseTime: decreasePriceCycle,
      startTime: moment(startDate).unix(),
      endTime: moment(endDate).unix(),
      isWhiteListAvail: isWhiteListed == "0" ? false : true,
      feeOption: selectedFee,
      uSoldTokenRefundType: refundType ? refundType : 0,
      logoURL: logoUrl,
      website: webUrl,
      decimals: decimals,
    };
    const factory = await factoryMethods();

    factory
      .createLaunchpad(payload, window.ethereum.selectedAddress)
      .then((create) => {
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
                  type: LaunchpadType.Dutch_Auction.toString(),
                  tokenAddress: tokenAddress,
                  tokenName: tokenDetails.tokenName,
                  tokenSymbol: tokenDetails.tokenSymbol,
                  tokenDecimal: parseFloat(decimals),
                  status: "0",
                  liquidityTokens: parseFloat(tokensStatus),
                  launcher: walletData.account,
                  liquidityPercentage: parseFloat(liquidity),
                  preSaleRate: parseFloat(sellingAmount),
                  softCap: parseFloat(softCap),
                  hardCap: parseFloat(hardCap),
                  maximumBuy: parseFloat(maxContribution),
                  minimumBuy: parseFloat(minContribution),
                  listingRate: 0,
                  startTime: parseFloat(moment(startDate).unix()),
                  endTime: parseFloat(moment(endDate).unix()),
                  isWhitelisted: isWhiteListed == "0" ? false : true,

                  metadata: {
                    logoUrl: logoUrl,
                    website: webUrl,
                    description: description.toString(),
                    redditUrl: redditUrl,
                    discordUrl: discordUrl,
                    telegramUrl: telegramUrl,
                    twitterUrl: twitterUrl,
                    githubUrl: gitHubUrl,
                    instagramUrl: instagramUrl,
                    facebookUrl: facebookUrl.toString(),
                  },
                },
              },
            });
            navigate(`/DutchAuctionPitchToken/${launchpadAddress}`);
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
  useEffect(() => {
    window.onload = takeBack;
    return () => {
      window.onload = takeBack;
    };
  }, []);

  const takeBack = (e) => {
    e.preventDefault();
    e.returnValue = "";
    navigate("/Dutchauction/Dutchauction");
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
                <ul className="verify-list">
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
                      <h6>Dutch Auction</h6>
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
              <div
                style={{ maxWidth: "1495px" }}
                className="col-xl-12 col-lg-10 col-md-12 col-sm-12"
              >
                <div className="full-div shadow-box verification-info">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <ul className="flex-list">
                      <li>
                        <p>
                          <b>Factory Address</b>
                        </p>
                        <p className="word-break">{DUTCH_FACTORY}</p>
                      </li>
                      <li>
                        <p>
                          <b>Token Address</b>
                        </p>
                        <p className="word-break">{tokenAddress}</p>
                      </li>
                      <li>
                        <p>
                          <b>Total Selling Amount</b>
                        </p>
                        <p>{parseFloat(sellingAmount, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>Currency</b>
                        </p>
                        <p>BNB</p>
                      </li>
                      <li>
                        <p>
                          <b>Fee Options</b>
                        </p>
                        <p>
                          {selectedFee == "0"
                            ? "5% raised only"
                            : "2% BNB raised + 2% token sold"}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Start Price (BNB)</b>
                        </p>
                        <p>{parseFloat(startPrice, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>End Price (BNB)</b>
                        </p>
                        <p>{parseFloat(endPrice, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>SoftCap (BNB)</b>
                        </p>
                        <p>{parseFloat(softCap, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>Hardcap (BNB)</b>
                        </p>
                        <p>{parseFloat(hardCap, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>Whitelist</b>
                        </p>
                        <p>{isWhiteListed == "0" ? "Disabled" : "Enabled"}</p>
                      </li>
                      <li>
                        <p>
                          <b>Min Contribution (BNB)</b>
                        </p>
                        <p>{parseFloat(minContribution, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>Max Contribution (BNB)</b>
                        </p>
                        <p>{parseFloat(maxContribution, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>Decrease Price Cycle (minutes)</b>
                        </p>
                        <p>{parseFloat(decreasePriceCycle, 10)}</p>
                      </li>
                      <li>
                        <p>
                          <b>Liquidity Percent (6)</b>
                        </p>
                        <p>{parseFloat(liquidity, 10)}%</p>
                      </li>
                      <li>
                        <p>
                          <b>Router</b>
                        </p>
                        <p>Pancake Swap</p>
                      </li>
                      <li>
                        <p>
                          <b>Refund Type</b>
                        </p>
                        <p>{refundType == "0" ? "Refund" : "Burn"}</p>
                      </li>

                      <li>
                        <p>
                          <b>Start Time (UTC)</b>
                        </p>
                        <p style={{ textAlign: "right" }}>
                          {moment.unix(startUnix).format("lll")} (UTC)
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>End Time (UTC)</b>
                        </p>
                        <p style={{ textAlign: "right" }}>
                          {moment.unix(endUnix).format("lll")}(UTC)
                        </p>
                      </li>

                      <li>
                        <p>
                          <b>Logo URL</b>
                        </p>
                        <p className="word-break">{logoUrl}</p>
                      </li>
                      <li>
                        <p>
                          <b>Website</b>
                        </p>
                        <p className="word-break">{webUrl}</p>
                      </li>
                      {facebookUrl && (
                        <li>
                          <p>
                            <b>Facebook</b>
                          </p>
                          <p className="word-break">{facebookUrl}</p>
                        </li>
                      )}
                      {twitterUrl && (
                        <li>
                          <p>
                            <b>Twitter</b>
                          </p>
                          <p className="word-break">{twitterUrl}</p>
                        </li>
                      )}

                      {gitHubUrl && (
                        <li>
                          <p>
                            <b>Github</b>
                          </p>
                          <p className="word-break">{gitHubUrl}</p>
                        </li>
                      )}
                      {telegramUrl && (
                        <li>
                          <p>
                            <b>Telegram</b>
                          </p>
                          <p className="word-break">{telegramUrl}</p>
                        </li>
                      )}
                      {instagramUrl && (
                        <li>
                          <p>
                            <b>Instagram</b>
                          </p>
                          <p className="word-break">{instagramUrl}</p>
                        </li>
                      )}
                      {discordUrl && (
                        <li>
                          <p>
                            <b>Discord</b>
                          </p>
                          <p className="word-break">{discordUrl}</p>
                        </li>
                      )}
                      {redditUrl && (
                        <li style={{ textAlign: "right" }}>
                          <p>
                            <b>Reddit</b>
                          </p>
                          <p className="word-break">{redditUrl}</p>
                        </li>
                      )}
                      {description && (
                        <li>
                          <p>
                            <b>Description</b>
                          </p>
                          <p className="word-break">{description}</p>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="full-div text-right">
                    <div className="btn-cntnr">
                      <Link
                        className="reg-gradient big trans"
                        to="/Dutchauction/Dutchadditionalinfo"
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
                                    {tokensStatus}
                                  </p>
                                  <p>Your Allowance: {allowanceToken}</p>
                                  <p>
                                    Your Current Balance:{" "}
                                    {tokenDetails.tokenBalance}
                                  </p>

                                  {tokenDetails.tokenBalance < tokensStatus ? (
                                    <>
                                      <p>
                                        You Need {tokensStatus - allowanceToken}{" "}
                                        Token to create Launchpad
                                      </p>
                                    </>
                                  ) : (
                                    <p>Do you want to create launchpad?</p>
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
                                    fromBn(
                                      tokenDetails.tokenBalance,
                                      decimals
                                    ) <= allowanceToken || approvedStatus
                                  }
                                >
                                  {approvedStatus ? <Loader /> : "Approve"}
                                </Button>
                              )}
                            </Modal.Footer>
                          </Modal>
                        </>
                      }
                    </div>
                  </div>
                  <div className="space-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default FinishDutchlaunch;
