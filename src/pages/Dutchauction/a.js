import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { tokenMethods } from "../../web3/Methods/TokenMethods";
import {
  useCreateLaunchPadStore,
  useDefiLaunchPadStore,
} from "./../store/useStore";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
// import detectEthereumProvider from "@metamask/detect-provider";
// import { Toast } from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify";
// import { factoryMethods } from "../../web3/Methods/FactoryMethods";
// import { Spinner } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import { mapperMethods } from "../../web3/Methods/MapperMethods";
import { FACTORY_ADDRESS } from "../../web3/Constants/constants";
import { factoryMethods } from "../../web3/Methods/FactoryMethods";
function Createlaunchpad(props) {
  // const [tokenAddress, setTokenAddress] = useState("");

  const {
    setSoftCap,
    setHardCap,
    setMinimumBuy,
    setmaximumBuy,
    setLiquidity,
    setrefundType,
    setListingRate,
    setStartDate,
    setEndDate,
    setPreSale,
  } = useDefiLaunchPadStore((state) => ({
    setSoftCap: state.setSoftCap,
    setHardCap: state.setHardCap,
    setMinimumBuy: state.setMinimumBuy,
    setmaximumBuy: state.setmaximumBuy,
    setrefundType: state.setrefundType,
    setLiquidity: state.setLiquidity,
    setListingRate: state.setListingRate,
    setStartDate: state.setStartDate,
    setEndDate: state.setEndDate,
    setPreSale: state.setPreSale,
  })); /* 
  const setSoftCap = useDefiLaunchPadStore((state) => state.setSoftCap);
  const setHardCap = useDefiLaunchPadStore((state) => state.setHardCap);
  const setMinimumBuy = useDefiLaunchPadStore((state) => state.setMinimumBuy);
  const setmaximumBuy = useDefiLaunchPadStore((state) => state.setmaximumBuy);
  const setrefundType = useDefiLaunchPadStore((state) => state.setrefundType);
  const setLiquidity = useDefiLaunchPadStore((state) => state.setLiquidity);
  const setListingRate = useDefiLaunchPadStore((state) => state.setListingRate);
  const setStartDate = useDefiLaunchPadStore((state) => state.setStartDate);
  const setEndDate = useDefiLaunchPadStore((state) => state.setEndDate);
  const setPreSale = useDefiLaunchPadStore((state) => state.setPreSale); */

  const clearDefiInfo = () => {
    setSoftCap("");
    setHardCap("");
    setMinimumBuy("");
    setmaximumBuy("");
    setrefundType("");
    setLiquidity("");
    setListingRate("");
    setStartDate("");
    setEndDate("");
    setPreSale("");
  };

  const walletData = useSelector((state) => state.wallet);
  const [radio, setRadio] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [radio1, setRadio1] = useState("");

  const tokenAddress = useCreateLaunchPadStore((state) => state.tokenAddress);
  const setTokenAddress = useCreateLaunchPadStore(
    (state) => state.setTokenAddress
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [flag, setFlag] = useState(false);
  const [allowance, setAllowance] = useState(0);

  // const [selected, setSelected] = useState("0");
  const selectedFee = useCreateLaunchPadStore((state) => state.selectedFee);
  const setSelectedFee = useCreateLaunchPadStore(
    (state) => state.setSelectedFee
  );
  const [tokenDetails, settokenDetails] = useState({
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    tokenBalance: 0,
  });
  // const [approvalChceck, setApprovalChceck] = useState(false);
  const approvalChceck = useCreateLaunchPadStore(
    (state) => state.approvalChceck
  );
  const setApprovalChceck = useCreateLaunchPadStore(
    (state) => state.setApprovalChceck
  );
  const [approveCheck, setApproveCheck] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);

  const contractDetails = async (address) => {
    if (address) {
      const check = window.web3.utils.isAddress(address);
      if (check) {
        const tokenDetail = await tokenMethods(address);

        const name = await tokenDetail.nameOfToken();
        const symbol = await tokenDetail.symbolOfToken();
        const decimals = await tokenDetail.decimalsOfToken();
        const balance = await tokenDetail.balanceOfToken();

        const isExists = await mapperMethods();
        const flag = await isExists.isTokenExists(address);
        const tokenMethod = await tokenMethods(address);
        const isAllowed = await tokenMethod.allowance(
          window.ethereum.selectedAddress,
          FACTORY_ADDRESS
        );
        isAllowed > 0 &&
          !flag &&
          walletData.chainId == 0x61 &&
          setApprovalChceck(true);
        setAllowance(isAllowed);
        setFlag(flag);

        // const tokenName = await  nameOfToken()
        settokenDetails({
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
          tokenBalance: balance,
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
      if (location.state.prevPath !== "/Createlaunchpad/DefilaunchpadInfo") {
        setTokenAddress("");
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
  /**
   * Validate Token Adress
   * @param  token address
   * @returns boolean
   */
  const isValidAddress = async (adr) => {
    // let regex = /^0x[a-fA-F0-9]{40}$/;
    // const provider = await detectEthereumProvider();
    // if (provider !== window.ethereum) {
    //   window.web3 = new Web3(provider);
    // } else {
    //   window.web3 = new Web3(window.ethereum);
    // }

    if (!window.web3.utils.isAddress(adr)) {
      setTokenAddress("");
      return false;
    } else {
      if (walletData.account) {
        setTokenAddress(adr);
        if (adr) {
          setInputStatus(true);
          const isExists = await mapperMethods();
          const flag = await isExists.isTokenExists(adr);
          const tokenMethod = await tokenMethods(adr);
          const isAllowed = await tokenMethod.allowance(
            window.ethereum.selectedAddress,
            FACTORY_ADDRESS
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

  /**
   * Approve Token
   * @param no paranms
   * @returns
   */
  const Approve = async () => {
    setIsDisabled(true);

    const tokenDetail = await tokenMethods(tokenAddress);
    tokenDetail
      .approveToken(window.ethereum.selectedAddress)
      .then((res) => {
        setApprovalChceck(true);
      })
      .catch(() => {
        setIsDisabled(false);
        setApprovalChceck(false);
      });
  };

  /**
   * Set Value of radio button
   * @param value of radio button
   */
  const handleRadio = async (e) => {
    setSelectedFee(e.target.value);
  };

  const handleSubmit = (e) => {};

  return (
    <>
      <div className="main">
        <div className="main-inner">
          <div className="container-fluid dashboard-container">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <ul className="verify-list">
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
                      <h6>DeFi Launchpad Info</h6>
                      <p>
                        Enter the Dutch Auction information that you want to
                        raise , that should be enter all details about your pool
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
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <form onSubmit={handleSubmit}>
                  <div className="full-div shadow-box verification-info">
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
                        disabled
                        value={""}
                      />
                    )}

                    {tokenAddress ? (
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
                              Switch to Binance Testnet
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
                          <p>Balance</p>
                          <p>Balance of Token</p>
                        </li>
                      </ul>
                    )}

                    <h3>CURRENCY</h3>

                    <div key={`radio`} className="mb-3">
                      <Form.Check
                        checked
                        label="BNB"
                        name="group2 "
                        type={"radio"}
                        id={`inline-radio-2`}
                      />
                    </div>

                    <p>Users will pay with BNB for your token</p>
                    <h3>Fee Options</h3>
                    <div className="mb-3">
                      <Form.Check
                        label="5% BNB raised only (Recommended)"
                        name="group2"
                        type="radio"
                        value="0"
                        id="5%"
                        checked={selectedFee === "0"}
                        onChange={handleRadio}
                      />
                      <Form.Check
                        label="2% BNB raised + 2% token sold"
                        name="group2"
                        type="radio"
                        value="1"
                        id="2%"
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
                      {walletData.account ? (
                        tokenAddress ? (
                          <>
                            {}
                            {approvalChceck ? (
                              <Link
                                className="reg-gradient big"
                                to="/Dutchauction/DutchauctionInfo"
                                onClick={clearDefiInfo}
                              >
                                Next
                              </Link>
                            ) : (
                              <Button
                                className="reg-gradient big"
                                onClick={() => Approve()}
                                disabled={
                                  isDisabled ||
                                  flag ||
                                  walletData.chainId != 0x61
                                }
                              >
                                {isDisabled ? (
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
                          </>
                        ) : (
                          <Link
                            className="reg-gradient big"
                            to="/Dutchauction/Dutchauction"
                          >
                            First Enter Valid Address
                          </Link>
                        )
                      ) : (
                        <Button
                          className="reg-gradient big"
                          disabled
                          to="/Dutchauction/DutchauctionInfo"
                        >
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
export default Createlaunchpad;
