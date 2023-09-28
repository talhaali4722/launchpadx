import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SUBSCRIPTION_FACTORY_ADDRESS,
  RPC_URL,
} from "../../web3/Constants/constants";
import {
  factoryMethods,
  subscriptionFactoryMethods,
} from "../../web3/Methods/SubscriptionFactoryMethods";
import { mapperMethods } from "../../web3/Methods/MapperMethods";
import { tokenMethods } from "../../web3/Methods/SubscriptionTokenMethods";
import {
  useCreateSubscription,
  useSubscriptionAdditionalInfo,
  useSubscriptionPool,
} from "../store/useStore";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import { tokenFactory } from "../../web3/Methods/TokenFactory";
import axios from "axios";
import { fromBn } from "evm-bn";
import Loader from "../../components/loader";
import switchingToBNB from "../../web3/SwitchToBNB";

const schema = Joi.object({
  tokenName: Joi.string().required().messages({
    "string.empty": "Token Name cannot not be empty",
    "any.required": `Required Field`,
  }),
  tokenSymbol: Joi.string().alphanum().required().messages({
    "string.empty": `Token Symbol cannot not be empty`,
    "any.required": `Required Field`,
  }),
  tokenDecimal: Joi.number().min(2).max(18).positive().messages({
    "number.base": `Required Field`,
    "number.min": `Token Decimal must be greater or equal to 2`,
    "number.positive": `Token Decimal must be a positive number`,
    "number.max": `Token Decimal must be less than or equal to 18`,
    "any.required": `Required Field`,
  }),
  tokenSupply: Joi.number().unsafe().positive().integer().messages({
    "number.base": ` Token Supply Required Field`,
    "number.positive": `Token Supply must be a positive number`,
    "number.integer": `Token Supply must be a positive number`,

    "any.required": `Required Field`,
  }),
});

function Createsubscription() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      tokenName: "",
      tokenDecimal: "",
      tokenSupply: "",
      tokenSymbol: "",
    },
    resolver: joiResolver(schema),
  });
  const {
    setSoftCapTokens,
    setHardCapTokens,
    setHardCapTokensPerUser,
    setSubscriptionRate,
    setListingRate,
    setLiquidity,
    setrefundType,
    setStartDate,
    setEndDate,
    setIsWhiteListed,
    setTokenStatus,
  } = useSubscriptionPool((state) => ({
    setSoftCapTokens: state.setSoftCapTokens,
    setHardCapTokens: state.setHardCapTokens,
    setHardCapTokensPerUser: state.setHardCapTokensPerUser,
    setSubscriptionRate: state.setSubscriptionRate,
    setListingRate: state.setListingRate,
    setLiquidity: state.setLiquidity,
    setrefundType: state.setrefundType,
    setStartDate: state.setStartDate,
    setEndDate: state.setEndDate,
    setIsWhiteListed: state.setIsWhiteListed,
    setTokenStatus: state.setTokenStatus,
  }));

  const {
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
  } = useSubscriptionAdditionalInfo((state) => ({
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
  // const clearDutchInfo = () => {
  //   setSellingAmount(0);
  //   setStartPrice(0);
  //   setEndPrice(0);
  //   setSoftCap(0);
  //   setHardCap(0);
  //   setMinContribution(0);
  //   setMaxContribution(0);
  //   setDecreasePriceCycle(0);
  //   setLiquidity(0);
  //   setRefundType("Refund");
  //   setEndDate("");
  //   setStartDate("");

  //   setLogoUrl("");
  //   setFacebookUrl("");
  //   setInstagramUrl("");
  //   setGithubUrl("");
  //   setTwitterUrl("");
  //   setTelegramUrl("");
  //   setDiscordUrl("");
  //   setRedditUrl("");
  //   setDescription("");
  //   setWebUrl("");
  // };

  const clearSubInfo = () => {
    setSoftCapTokens("");
    setHardCapTokens("");
    setHardCapTokensPerUser("");
    setSubscriptionRate("");
    setListingRate("");
    setLiquidity("");
    setStartDate("");
    setEndDate("");
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
  };

  const walletData = useSelector((state) => state.wallet);
  const [isDisabled, setIsDisabled] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);
  const [createdTokenName, setTokenName] = useState("");
  const [createdTokenSymbol, setTokenSymbol] = useState("");
  const [createdTokenDecimal, setTokenDecimal] = useState();
  const [createdTokenSupply, setTokenSupply] = useState("");
  const [loader, setLoader] = useState(false);

  const [allowance, setAllowance] = useState(0);

  const selectedFee = useCreateSubscription((state) => state.selectedFee);
  const setSelectedFee = useCreateSubscription((state) => state.setSelectedFee);
  const setSymbol = useCreateSubscription((state) => state.setSymbol);
  const setBalance = useCreateSubscription((state) => state.setBalance);
  const setDecimal = useCreateSubscription((state) => state.setDecimal);

  const approvalChceck = useCreateSubscription((state) => state.approvalChceck);
  const setApprovalChceck = useCreateSubscription(
    (state) => state.setApprovalChceck
  );

  const setTokenAddress = useCreateSubscription(
    (state) => state.setTokenAddress
  );
  const tokenAddress = useCreateSubscription((state) => state.tokenAddress);
  const [tokenDetails, settokenDetails] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    tokenBalance: 0,
  });
  const [approveCheck, setApproveCheck] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);

  const isValidAddress = async (adr) => {
    setIsDisabled(false);
    setApprovalChceck(false);
    if (!window.web3.utils.isAddress(adr)) {
      setTokenAddress(adr);
      setIsValidInput(false);

      return false;
    } else {
      if (walletData.account) {
        setTokenAddress(adr);
        setIsValidInput(true);

        if (adr) {
          setInputStatus(true);
          const isExists = await mapperMethods();
          const flag = await isExists.isTokenExists(adr);
          const tokenMethod = await tokenMethods(adr);
          const isAllowed = await tokenMethod.allowance(
            window.ethereum.selectedAddress,
            SUBSCRIPTION_FACTORY_ADDRESS
          );

          isAllowed > 0 &&
            !flag &&
            walletData.chainId == 0x61 &&
            setApprovalChceck(true);
          setAllowance(isAllowed);
          setFlag(flag);
          contractDetails(adr);
        }
      }
      return true;
    }
  };

  const Approve = async () => {
    setIsDisabled(true);

    const tokenDetail = await tokenMethods(tokenAddress);
    const balance = await tokenDetail.balanceOfToken(walletData.account);

    if (parseFloat(fromBn(balance, tokenDetails.tokenDecimals)) > 0) {
      tokenDetail
        .approveToken(window.ethereum.selectedAddress, balance)
        .then((res) => {
          setApprovalChceck(true);
          // reRender
          isValidAddress(tokenAddress);
          clearSubInfo();
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
          setApprovalChceck(false);
        });
    } else {
      setIsDisabled(false);
      setApprovalChceck(false);
      toast.error("Insufficient Supply", {
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

  const contractDetails = async (address) => {
    if (address) {
      const check = window.web3.utils.isAddress(address);
      if (check) {
        const tokenDetail = await tokenMethods(address);

        const name = await tokenDetail.nameOfToken();
        const symbol = await tokenDetail.symbolOfToken();
        const decimals = await tokenDetail.decimalsOfToken();
        const balance = await tokenDetail.balanceOfToken(
          window.ethereum.selectedAddress
        );

        const isExists = await mapperMethods();
        const flag = await isExists.isTokenExists(address);
        const tokenMethod = await tokenMethods(address);
        const isAllowed = await tokenMethod.allowance(
          window.ethereum.selectedAddress,
          SUBSCRIPTION_FACTORY_ADDRESS
        );
        isAllowed > 0 &&
          !flag &&
          walletData.chainId == 0x61 &&
          setApprovalChceck(true);
        setAllowance(isAllowed);
        setFlag(flag);

        setSymbol(symbol);

        // const tokenName = await  nameOfToken()
        const finalBalance = fromBn(balance, decimals);

        setBalance(finalBalance);
        setDecimal(decimals);
        settokenDetails({
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
          tokenBalance: finalBalance,
        });
        setApproveCheck(false);
      } else {
        setApproveCheck(true);
        settokenDetails({
          tokenName: "Enter valid address",
          tokenSymbol: "Enter valid address",
          tokenDecimals: 0,
          tokenBalance: 0,
        });
      }
    }
  };

  let location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.prevPath !== "/Createsubscription/Subscriptionpool") {
        setTokenAddress("");
      } else {
        if (tokenAddress) {
          isValidAddress(tokenAddress);
        }
      }
    } else {
      setTokenAddress("");
    }
  }, [location]);

  useEffect(() => {
    settokenDetails({
      tokenName: "-",
      tokenSymbol: "-",
      tokenDecimals: 0,
      tokenBalance: 0,
    });
    setApprovalChceck(false);
    if (tokenAddress) {
      setFlag(false);

      contractDetails(tokenAddress);
    }
  }, [tokenAddress]);
  const handleRadio = (e) => {
    setSelectedFee(e.target.value);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    reset({
      tokenName: "",
      tokenDecimal: "",
      tokenSupply: "",
      tokenSymbol: "",
    });
    setShow(true);
  };

  const navigate = useNavigate();

  const onSubmit = (e) => {
    handleCreate();
    navigate("/Createsubscription/Createsubscription");
  };

  const handleCreate = async (e) => {
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
    // setSelectedFee(e.target.value);
    setLoader(true);
    const factory = await tokenFactory();
    var payload = [
      window.ethereum.selectedAddress,
      String(createdTokenName),
      String(createdTokenSymbol),
      parseInt(createdTokenSupply),
      parseInt(createdTokenDecimal),
    ];
    factory
      .createToken(payload, window.ethereum.selectedAddress)
      .then((resp) => {
        var body = {
          jsonrpc: "2.0",
          method: "eth_getTransactionReceipt",
          params: [resp.transactionHash],
          id: 53,
        };
        axios.post(RPC_URL, body).then((response) => {
          isValidAddress(response.data.result.logs[0].address);
          // setTokenAddress(response.data.result.logs[0].address);
          // settokenDetails({
          //   tokenName: tokenName,
          //   tokenSymbol: tokenSymbol,
          //   tokenDecimals: tokenDecimal,
          //   tokenBalance: tokenSupply,
          // });
          handleClose();
          setLoader(false);
          const addTokentoMetaMask = async () => {
            const tokenAddress = response.data.result.logs[0].address;
            const tokenName = createdTokenName;
            const tokenSymbol = createdTokenSymbol;
            const tokenDecimals = createdTokenDecimal;

            try {
              // wasAdded is a boolean. Like any RPC method, an error may be thrown.
              const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                  type: "ERC20", // Initially only supports ERC20, but eventually more!
                  options: {
                    address: tokenAddress, // The address that the token is at.
                    name: tokenName, // The name of the token
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    // image: tokenImage, // A string url of the token logo
                  },
                },
              });
            } catch (error) {}
          };

          addTokentoMetaMask();

          // setLaunchpadID(launchpadAddress);
          // navigate(`/FairLaunchPitchtoken/${launchpadAddress}`);
        });
        setLoader(false);
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

        setLoader(false);
      });
  };

  const showMessage = async () => {
    const isLocked = !(await window.ethereum._metamask.isUnlocked());
    if (!window.ethereum) {
      toast.error("Please Install to metamask", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (isLocked) {
      toast.error("Please Connect to Metamask", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (walletData.chainId == "0x61") {
      toast.error("Please  Switch To BNB", {
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
      toast.error("Please Connect to Metamask", {
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

  const [maxLength, setMaxLength] = useState("");
  const [maxLengthStatus, setMaxLengthStatus] = useState(false);

  useEffect(() => {
    let supplyLength =
      Math.max(Math.floor(Math.log10(Math.abs(createdTokenSupply))), 0) + 1;
    let diff = parseFloat(33) - parseFloat(createdTokenDecimal);
    if (supplyLength > diff) {
      setMaxLengthStatus(true);
      setMaxLength("Invalid total supply");
    } else {
      setMaxLengthStatus(false);
      setMaxLength("");
    }
  }, [createdTokenDecimal, createdTokenSupply]);

  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul style={{ maxWidth: "1400px" }} className="verify-list">
                  <li className="active">
                    <span>01</span>
                    <div className="txt-pnl">
                      <h6>Verify Token</h6>
                      <p>Enter the token address and verify</p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div className="txt-pnl">
                      <h6>Subscription Pool</h6>
                      <p>
                        Enter the Subscription Pool information that you want to
                        raise,that should be enter all details about your pool
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div className="txt-pnl">
                      <h6>Add Additional Info</h6>
                      <p>Let people know who you are</p>
                    </div>
                  </li>
                  <li>
                    <span>04</span>
                    <div className="txt-pnl">
                      <h6>Finish</h6>
                      <p>Review your information</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-xl-12  col-lg-6 col-md-12 col-sm-12">
                <form style={{ maxWidth: "1265px" }}>
                  <div className="full-div shadow-box verification-info">
                    <div className="full-div text-right">
                      <Button className="reg-gradient" onClick={handleShow}>
                        Create Token
                      </Button>
                      <Modal
                        onEscapeKeyDown={handleClose}
                        className="my-modal"
                        show={show}
                        centered
                      >
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Modal.Header>
                            <Modal.Title>Create Token</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            {/* <Form.Group className="mb-3"> */}
                            <label>Token Type</label>
                            <input
                              className="text-white"
                              type="text"
                              placeholder="Standard Token"
                              value="Standard Token"
                              readOnly
                            />
                            <label>Name</label>
                            <input
                              type="text"
                              placeholder="Ex: BNB"
                              {...register("tokenName", {
                                onChange: (e) => setTokenName(e.target.value),
                              })}
                            />
                            {errors.tokenName && (
                              <p style={{ color: "red " }}>
                                {errors.tokenName.message}
                              </p>
                            )}
                            <label>Symbol</label>
                            <input
                              type="text"
                              placeholder="Ex: BNB"
                              {...register("tokenSymbol", {
                                onChange: (e) => setTokenSymbol(e.target.value),
                              })}
                            />
                            {errors.tokenSymbol && (
                              <p style={{ color: "red " }}>
                                {errors.tokenSymbol.message}
                              </p>
                            )}
                            <label>Decimal</label>
                            <input
                              type="number"
                              placeholder="Ex: 18"
                              {...register("tokenDecimal", {
                                onChange: (e) =>
                                  setTokenDecimal(e.target.value),
                              })}
                            />
                            {errors.tokenDecimal && (
                              <p style={{ color: "red " }}>
                                {errors.tokenDecimal.message}
                              </p>
                            )}
                            <label>Total Supply</label>
                            <input
                              type="number"
                              placeholder="Ex: 10000000000"
                              {...register("tokenSupply", {
                                onChange: (e) => setTokenSupply(e.target.value),
                              })}
                            />
                            {errors.tokenSupply ? (
                              <p style={{ color: "red " }}>
                                {errors.tokenSupply.message}
                              </p>
                            ) : (
                              <p style={{ color: "red " }}>{maxLength}</p>
                            )}
                            {/* </Form.Group> */}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant="secondary"
                              className="reg-gradient"
                              onClick={handleClose}
                            >
                              Close
                            </Button>

                            {walletData.account &&
                            walletData.chainId == "0x61" ? (
                              <Button
                                variant="secondary"
                                className="reg-gradient"
                                type="submit"
                                disabled={loader || maxLengthStatus}
                              >
                                {loader ? <Loader /> : "Create Token"}
                              </Button>
                            ) : (
                              <Button
                                className="reg-gradient"
                                onClick={showMessage}
                              >
                                Create Token
                              </Button>
                            )}
                          </Modal.Footer>
                        </form>
                      </Modal>
                    </div>
                    <p>(*) is required field</p>
                    <h3>TOKEN ADDRESS*</h3>
                    {walletData.account ? (
                      <Form.Control
                        type="text"
                        autoComplete="off"
                        id="token-symbol"
                        aria-describedby="Token Symbol"
                        placeholder="Enter token address"
                        value={tokenAddress}
                        maxLength={42}
                        onChange={(e) => {
                          isValidAddress(e.target.value);
                          setIsEmpty(true);
                        }}
                      />
                    ) : (
                      <Form.Control
                        type="text"
                        autoComplete="off"
                        id="token-symbol"
                        aria-describedby="Token Symbol"
                        placeholder=""
                        disabled
                      />
                    )}
                    {isValidInput ? (
                      <p>Valid Address</p>
                    ) : walletData.account && isEmpty ? (
                      <p className="text-danger">Invalid token address</p>
                    ) : (
                      ""
                    )}
                    <p>Pool creation fee: 0.1 BNB</p>
                    {walletData.account ? (
                      tokenAddress || inputStatus ? (
                        <ul className="flex-list low">
                          {walletData.chainId == 0x61 ? (
                            <>
                              <li>
                                <p>NAME</p>
                                <p>{tokenDetails.tokenName}</p>
                              </li>
                              <li>
                                <p>SYMBOL</p>
                                <p>{tokenDetails.tokenSymbol}</p>
                              </li>
                              <li>
                                <p>DECIMALS</p>
                                <p>{tokenDetails.tokenDecimals}</p>
                              </li>
                              <li>
                                <p>BALANCE</p>
                                <p>{tokenDetails.tokenBalance}</p>
                              </li>
                            </>
                          ) : (
                            <p style={{ color: "red" }} className="flex-list">
                              Switch to BinanceTestnet
                            </p>
                          )}
                        </ul>
                      ) : (
                        <ul className="flex-list low">
                          <li>
                            <p>NAME</p>
                            <p>Name of Token</p>
                          </li>
                          <li>
                            <p>SYMBOL</p>
                            <p>Symbol of Token</p>
                          </li>
                          <li>
                            <p>DECIMALS</p>
                            <p>Decimals of Token</p>
                          </li>
                          <li>
                            <p>BALANCE</p>
                            <p>Balance of Token</p>
                          </li>
                        </ul>
                      )
                    ) : (
                      <ul className="flex-list low">
                        <li>
                          <p>NAME</p>
                          <p>Name of Token</p>
                        </li>
                        <li>
                          <p>SYMBOL</p>
                          <p>Symbol of Token</p>
                        </li>
                        <li>
                          <p>DECIMALS</p>
                          <p>Decimals of Token</p>
                        </li>
                        <li>
                          <p>BALANCE</p>
                          <p>Balance of Token</p>
                        </li>
                      </ul>
                    )}

                    <h3>CURRENCY</h3>
                    <Form>
                      <div className="mb-3">
                        <Form.Check
                          checked
                          label="BNB"
                          name="group2 "
                          type={"radio"}
                          id={"Currency"}
                        />
                      </div>
                    </Form>
                    <p>Users will pay with BNB for your token</p>
                    <h3>Fee Options</h3>
                    <div className="mb-3">
                      <Form.Check
                        label="5% BNB raised only (Recommended)"
                        name="group2"
                        type="radio"
                        value="0"
                        checked={selectedFee === "0"}
                        onChange={handleRadio}
                      />
                      <Form.Check
                        label="2% BNB raised + 2% token sold  "
                        name="group2"
                        type="radio"
                        value="1"
                        onChange={handleRadio}
                        checked={selectedFee === "1"}
                      />
                    </div>
                    {flag && (
                      <p style={{ color: "red" }} className="flex-list">
                        Pool Already Exists
                      </p>
                    )}
                    <div className="full-div text-right">
                      {walletData.account && isValidInput ? (
                        tokenAddress ? (
                          <>
                            {approvalChceck ? (
                              <Link
                                className="reg-gradient big"
                                to="/Createsubscription/Subscriptionpool"
                              >
                                Next
                              </Link>
                            ) : (
                              <Button
                                className="reg-gradient big"
                                onClick={() => {
                                  Approve();
                                }}
                                disabled={
                                  isDisabled ||
                                  flag ||
                                  walletData.chainId != 0x61
                                }
                              >
                                {isDisabled ? <Loader /> : "Approve"}
                              </Button>
                            )}
                          </>
                        ) : (
                          <Link
                            className="reg-gradient big"
                            to="/Createsubscription/Createsubscription"
                          >
                            First Enter Valid Address
                          </Link>
                        )
                      ) : (
                        <Button className="reg-gradient big" disabled>
                          Next
                        </Button>
                      )}
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
export default Createsubscription;
