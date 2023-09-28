import { useMutation } from "@apollo/client";
import axios from "axios";
import { fromBn } from "evm-bn";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/loader";
import {
  RPC_URL,
  SUBSCRIPTION_FACTORY_ADDRESS,
} from "../../web3/Constants/constants";
import { subscriptionFactoryMethods } from "../../web3/Methods/SubscriptionFactoryMethods";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import switchingToBNB from "../../web3/SwitchToBNB";
import LaunchpadType from "../enums/LaunchpadType.enum";
import { CREATE_LAUNCHPAD_MUTATION } from "../Graphql/Mutations";
import {
  useCreateSubscription,
  useSubscriptionAdditionalInfo,
  useSubscriptionPool,
} from "../store/useStore";
function Finishsubscription() {
  const walletData = useSelector((state) => state.wallet);
  const [Createlaunchpad, { loading, data, error }] = useMutation(
    CREATE_LAUNCHPAD_MUTATION
  );
  const { tokenAddress, Symbol, selectedFee, balance } = useCreateSubscription(
    (state) => ({
      tokenAddress: state.tokenAddress,
      Symbol: state.Symbol,
      selectedFee: state.selectedFee,
      balance: state.balance,
    })
  );

  const logoUrl = useSubscriptionAdditionalInfo((state) => state.logoUrl);
  const webUrl = useSubscriptionAdditionalInfo((state) => state.webUrl);
  const facebookUrl = useSubscriptionAdditionalInfo(
    (state) => state.facebookUrl
  );
  const twitterUrl = useSubscriptionAdditionalInfo((state) => state.twitterUrl);
  const instagramUrl = useSubscriptionAdditionalInfo(
    (state) => state.instagramUrl
  );
  const discordUrl = useSubscriptionAdditionalInfo((state) => state.discordUrl);
  const redditUrl = useSubscriptionAdditionalInfo((state) => state.redditUrl);
  const gitHubUrl = useSubscriptionAdditionalInfo((state) => state.gitHubUrl);
  const telegramUrl = useSubscriptionAdditionalInfo(
    (state) => state.telegramUrl
  );

  const description = useSubscriptionAdditionalInfo(
    (state) => state.description
  );

  const { decimal } = useCreateSubscription((state) => ({
    decimal: state.decimal,
  }));

  const {
    softCapTokens,
    hardCapTokens,
    hardCapTokensPerUser,
    subscriptionRate,
    listingRate,
    liquidity,
    refundType,
    startDate,
    endDate,
    isWhiteListed,
    tokensStatus,
  } = useSubscriptionPool((state) => ({
    softCapTokens: state.softCapTokens,
    hardCapTokens: state.hardCapTokens,
    hardCapTokensPerUser: state.hardCapTokensPerUser,
    subscriptionRate: state.subscriptionRate,
    listingRate: state.listingRate,
    liquidity: state.liquidity,
    refundType: state.refundType,
    startDate: state.startDate,
    endDate: state.endDate,
    isWhiteListed: state.isWhiteListed,
    tokensStatus: state.tokensStatus,
  }));

  const [tokenDetails, settokenDetails] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    tokenBalance: 0,
    tokenAddress: "",
  });
  const [approveStatus, setApproveStatus] = useState(false);
  const [emergencyShow, setEmergencyShow] = useState(false);
  const [allowanceToken, setAllowanceToken] = useState("");
  const [approvedStatus, setApprovedStatus] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    contractDetails();
    if (tokenAddress) {
      const getAllowance = async () => {
        const tokenDetail = await tokenMethods(tokenAddress);
        tokenDetail
          .allowance(
            window.ethereum.selectedAddress,
            SUBSCRIPTION_FACTORY_ADDRESS
          )
          .then((res) => {
            const x = fromBn(res, decimal);
            setAllowanceToken(x);
          });
      };
      getAllowance();
    }
  }, [tokenAddress]);

  const contractDetails = async () => {
    if (tokenAddress) {
      const tokenDetail = await tokenMethods(tokenAddress);
      const name = await tokenDetail.nameOfToken();
      const symbol = await tokenDetail.symbolOfToken();
      const decimals = await tokenDetail.decimalsOfToken();
      const balanceOf = await tokenDetail.balanceOfToken(walletData.account);

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
        .allowance(
          window.ethereum.selectedAddress,
          SUBSCRIPTION_FACTORY_ADDRESS
        )
        .then((res) => {
          const x = fromBn(res, decimal);
          setAllowanceToken(x);
        });
      // };
      // getAllowance();
    }
  };

  const createLaunchpad = async () => {
    var payload = {
      tokenAddress: tokenAddress,
      launchpadType: LaunchpadType.Subscription_Pool,
      liquidity: liquidity,
      hardCap: hardCapTokens,
      softCap: softCapTokens,
      hardCapPerUser: hardCapTokensPerUser,
      subscriptionRate: subscriptionRate,
      listingRate: listingRate,

      startTime: moment(startDate).unix(),
      endTime: moment(endDate).unix(),
      isWhiteListed: isWhiteListed == "0" ? false : true,
      feeOption: selectedFee,
      uSoldTokenRefundType: refundType ? refundType : 0,
      logoURL: logoUrl,
      website: webUrl,
      decimals: decimal,
    };
    const factory = await subscriptionFactoryMethods();
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
            resp.data.result.logs[0].topics[2],
            tokenDetails.tokenBalance,
            tokenDetails.tokenSymbol,
            tokenDetails.tokenName
          );
          if (launchpadAddress) {
            Createlaunchpad({
              variables: {
                create: {
                  presaleAddress: launchpadAddress.toLowerCase(),
                  type: LaunchpadType.Subscription_Pool.toString(),
                  tokenAddress: tokenAddress,
                  tokenName: tokenDetails.tokenName,
                  tokenSymbol: tokenDetails.tokenSymbol,
                  tokenDecimal: parseFloat(tokenDetails.tokenDecimals),
                  status: "0",
                  liquidityTokens: parseFloat(tokensStatus),
                  launcher: walletData.account,
                  liquidityPercentage: parseFloat(liquidity),
                  preSaleRate: parseFloat(hardCapTokens),
                  softCap: parseFloat(softCapTokens),
                  hardCap: parseFloat(hardCapTokens),
                  maximumBuy: parseFloat(0),
                  minimumBuy: 0,
                  listingRate: parseFloat(listingRate),
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
          }
          navigate(`/SubscriptionPitchToken/${launchpadAddress}`);
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
        toast.success("Tokens approved", res);
        setAllowanceToken();
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
                      <h6>Subscription Pool</h6>
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
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <ul className="flex-list">
                        <li>
                          <p>
                            <b>Factory Address</b>
                          </p>
                          <p className="word-break">
                            {SUBSCRIPTION_FACTORY_ADDRESS}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Token Address</b>
                          </p>
                          <p className="word-break">{tokenAddress}</p>
                        </li>
                        <li>
                          <p>
                            <b>Hard Cap Tokens {Symbol}</b>
                          </p>
                          <p>{parseFloat(hardCapTokens, 10)}</p>
                        </li>
                        <li>
                          <p>
                            <b>Subscription Rate</b>
                          </p>
                          <p>{parseFloat(subscriptionRate, 10)}</p>
                        </li>
                        <li>
                          <p>
                            <b>Listing Rate</b>
                          </p>
                          <p>{parseFloat(listingRate, 10)}</p>
                        </li>
                        <li>
                          <p>
                            <b>Currency</b>
                          </p>
                          <p>BNB</p>
                        </li>
                        <li>
                          <p>
                            <b>Fee Option</b>
                          </p>
                          <p>
                            {selectedFee == "0"
                              ? "5% BNB raised only (Recommended)"
                              : "2% BNB raised + 2% token sold"}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>SoftCap {Symbol}</b>
                          </p>
                          <p>{parseFloat(softCapTokens, 10)}</p>
                        </li>
                        <li>
                          <p>
                            <b>Hardcap Tokens Per User {Symbol}</b>
                          </p>
                          <p>{parseFloat(hardCapTokensPerUser, 10)}</p>
                        </li>
                        <li>
                          <p>
                            <b>Whitelist</b>
                          </p>
                          <p>{isWhiteListed == 0 ? "Disabled" : "Enabled"}</p>
                        </li>
                        <li>
                          <p>
                            <b>Liquidity Percentage</b>
                          </p>
                          <p>{parseFloat(liquidity, 10)}%</p>
                        </li>
                        <li>
                          <p>
                            <b>Router</b>
                          </p>
                          <p>PancakeSwap</p>
                        </li>
                        <li>
                          <p>
                            <b>Refund Type</b>
                          </p>
                          <p>
                            {refundType === "0"
                              ? "Refund"
                              : refundType === "1"
                              ? "Burn"
                              : "Refund"}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Total Tokens</b>
                          </p>
                          <p>
                            {tokensStatus
                              ? parseFloat(tokensStatus).toFixed(3)
                              : 0}
                          </p>
                        </li>

                        <li>
                          <p>
                            <b>Start Time (UTC)</b>
                          </p>
                          <p>{moment.unix(startUnix).format("lll")} (UTC)</p>
                        </li>

                        <li>
                          <p>
                            <b>End Time (UTC)</b>
                          </p>
                          <p>{moment.unix(endUnix).format("lll")}(UTC)</p>
                        </li>

                        {logoUrl && (
                          <li>
                            <p>
                              <b>Logo URL</b>
                            </p>
                            <p className="word-break">{logoUrl}</p>
                          </li>
                        )}
                        {webUrl && (
                          <li>
                            <p>
                              <b>Website</b>
                            </p>
                            <p className="word-break">{webUrl}</p>
                          </li>
                        )}
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
                          <li>
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
                          to="/Createsubscription/Subscriptionadditioninfo"
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
                                          {tokensStatus - allowanceToken} Token
                                          to create Launchpad
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
                                      tokenDetails.tokenBalance <=
                                        allowanceToken || approvedStatus
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Finishsubscription;
