import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { launchpadAbi } from "../web3/ABIs/LaunchpadAbi";
import { launchpadMethods } from "../web3/Methods/LaunchpadMethods";
import { tokenMethods } from "../web3/Methods/TokenMethods";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

function Pitchtoken() {
  const navigate = useNavigate();

  const walletData = useSelector((state) => state.wallet);

  const [isInterval, setIsInterval] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const [amount, setAmount] = useState();

  const [launchpadDetails, setLaunchpadDetails] = useState({
    presaleAddress: "",
    tokenAddress: "",
    tokenName: "",
    tokenSymbol: "",
    tokenDecimals: 0,
    presaleRate: 0,
    listingRate: 0,
    softCap: 0,
    hardCap: 0,
    minBuy: 0,
    maxBuy: 0,
    startTime: 0,
    endTime: 0,
    liquidityPercentage: 0,
    totalSupply: 0,
    liquidityTokens: 0,
    currentPool: 0,
    iswhitListed: false,
  });

  useEffect(() => {
    getLaunchpadDetails();
  }, []);

  useEffect(() => {
    if (moment().unix() > launchpadDetails.startTime) {
      setDays("0");
      setHours("0");
      setMinutes("0");
      setSeconds("0");
      return;
    }

    if (launchpadDetails.endTime && isInterval) {
      const currentTime = moment().unix();

      const diffTime = launchpadDetails?.endTime - currentTime;
      let duration = moment.duration(diffTime * 1000, "milliseconds");
      const interval = 1000;
      var timerID = setInterval(() => {
        setIsInterval(true);
        if (duration._milliseconds <= 0) {
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
      }, interval);
      return () => clearInterval(timerID);
    }
  }, [isInterval]);

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

        const currentPool = await details.getLaunchpadPool(
          window.location.pathname.split("/")[2]
        );

        setLaunchpadDetails({
          presaleAddress: window.location.pathname.split("/")[2],
          tokenAddress: resp[0].tokenAddress,
          tokenName: name,
          tokenSymbol: symbol,
          tokenDecimals: decimals,
          presaleRate: window.web3.utils.fromWei(resp[2]),
          listingRate: window.web3.utils.fromWei(resp[1]),
          softCap: window.web3.utils.fromWei(resp[0].softCap),
          hardCap: window.web3.utils.fromWei(resp[0].hardCap),
          minBuy: window.web3.utils.fromWei(resp[0].minBuy),
          maxBuy: window.web3.utils.fromWei(resp[0].maxBuy),
          startTime: resp[0].startTime,
          endTime: resp[0].endTime,
          liquidityPercentage: resp[0].liquidity_Percentage,
          totalSupply: window.web3.utils.fromWei(totalSupply),
          liquidityTokens: window.web3.utils.fromWei(
            resp[0].liquidity_TokenAmount
          ),
          currentPool: window.web3.utils.fromWei(currentPool),
          iswhitListed: resp[0].iswhitListed,
        });
        setIsInterval(true);
      });
  };

  const Contribute = async () => {
    if (amount > launchpadDetails.hardCap) {
      // alertHandled("Amount must be smaller than hardcap");
      toast.error("Amount must be smaller than hardcap", {
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
      launchpadDetails.hardCap
    ) {
      // alertHandled("Total amount must be smaller than hardcap");
      toast.error("Total amount must be smaller than hardcap", {
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

    const details = await launchpadMethods(
      window.location.pathname.split("/")[2]
    );

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
      });
  };

  const Finalize = async () => {
    if (launchpadDetails.currentPool < launchpadDetails.hardCap) {
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

    const details = await launchpadMethods(
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
        navigate("/");
      });
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
                  <div className="flex-div">
                    <div className="pitchtoken-head">
                      <div className="flex-div">
                        <span className="circle-span"></span>
                        <div className="flex-div">
                          <div style={{ display: "flex" }}>
                            <h1>{launchpadDetails.tokenName}</h1>
                            <ul className="alert-list right">
                              <li>
                                <span
                                  className="arrow-span"
                                  style={{ color: "#fff" }}
                                >
                                  <i class="fa fa-arrow-right"></i>
                                </span>
                              </li>
                              <li>
                                <Link className="trans" to="/">
                                  <i class="fa fa-pencil-square-o"></i>
                                </Link>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <ul className="alert-list">
                              <li>
                                <Link to="/">
                                  <i className="fa fa-bell-o"></i>
                                </Link>
                              </li>
                              <li>
                                <Link to="/">
                                  <i className="fa fa-heart-o"></i>
                                </Link>
                              </li>
                            </ul>
                            <Button
                              type="button"
                              className={`sale-btn ${
                                moment().unix() < launchpadDetails.startTime ||
                                moment().unix() > launchpadDetails.endTime
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              <span></span>
                              {moment().unix() > launchpadDetails.startTime &&
                                moment().unix() < launchpadDetails.endTime &&
                                "Sale Live"}
                              {moment().unix() < launchpadDetails.startTime &&
                                "Upcoming"}
                              {moment().unix() > launchpadDetails.endTime &&
                                "Finished"}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <p>
                        Crypto Pitch is a football-themed simulation card game
                        in which players collect NFTs and predict the outcomes
                        of World Cup Qatar 2022 matches | KYC SAFU AUDITED |DAPP
                        is ready | 0% Transfers Tax | Add liquidty 100%.
                      </p>
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
                        {launchpadDetails.tokenAddress}
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
                        {launchpadDetails.liquidityTokens}{" "}
                        {launchpadDetails.tokenName}
                      </p>
                    </li>
                    <li>
                      <p>
                        <b>Presale Rate</b>
                      </p>
                      <p>
                        1 BNB = {launchpadDetails.presaleRate}{" "}
                        {launchpadDetails.tokenName}
                      </p>
                    </li>
                    <li>
                      <p>
                        <b>Listing Rate</b>
                      </p>
                      <p>
                        1 BNB = {launchpadDetails.listingRate}{" "}
                        {launchpadDetails.tokenName}
                      </p>
                    </li>
                    <li>
                      <p>
                        <b>Initial Market Cap (estimate) </b>
                      </p>
                      <p>$30245787</p>
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
                      <p>Burn</p>
                    </li>
                    <li>
                      <p>
                        <b>Presale Start Time</b>
                      </p>
                      <p>
                        {moment.unix(launchpadDetails.startTime).format("lll")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <b>Presale End Time</b>
                      </p>
                      <p>
                        {moment.unix(launchpadDetails.endTime).format("lll")}
                      </p>
                    </li>
                    <li>
                      <p>
                        <b>Listing On</b>
                      </p>
                      <p>BNB</p>
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
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
                {/* Put Ended In start-timer-pool div */}
                <div className="full-div shadow-box start-timer-pool">
                  <div className="text-center">
                    <h3>Presale Starts In</h3>
                  </div>
                  <ul className="timer-list">
                    <li>{days}</li>
                    <li>{hours}</li>
                    <li>{minutes}</li>
                    <li>{seconds}</li>
                  </ul>
                  {/* <span className='grey-border'></span> */}

                  <ProgressBar
                    now={
                      (launchpadDetails.currentPool /
                        launchpadDetails.hardCap) *
                      100
                    }
                  />

                  <div className="flex-div">
                    <span>{launchpadDetails.softCap} BNB</span>
                    <span>{launchpadDetails.hardCap} BNB</span>
                  </div>
                  <div className="text-center">
                    <p>This Pool has been ended</p>
                  </div>
                  <div className="space-20"></div>
                  <h3>Amount</h3>
                  <div className="flex-div input-submit-div">
                    <Form.Control
                      type="text"
                      autoComplete="off"
                      id="token-symbol"
                      aria-describedby="Token Symbol"
                      placeholder="0.0"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button>Max</Button>
                  </div>
                  <div className="text-center">
                    {walletData.account ? (
                      <>
                        {moment().unix() > launchpadDetails.startTime &&
                        moment().unix() < launchpadDetails.endTime ? (
                          <Button
                            className="reg-gradient"
                            onClick={() => Contribute()}
                          >
                            Contribute
                          </Button>
                        ) : (
                          <>
                            <Button className="reg-gradient" disabled={true}>
                              Not available
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <Link className="reg-gradient" to="/">
                        Connect Wallet
                      </Link>
                    )}
                  </div>
                </div>
                <div className="full-div shadow-box">
                  <ul className="flex-list low m-0">
                    <li>
                      <p>Status</p>
                      <p>
                        {moment().unix() > launchpadDetails.endTime
                          ? "Finished"
                          : moment().unix() < launchpadDetails.startTime
                          ? "Upcoming"
                          : "Live"}
                      </p>
                    </li>
                    <li>
                      <p>Sale Type</p>
                      <p>Public</p>
                    </li>
                    <li>
                      <p>Minimum Buy</p>
                      <p>{launchpadDetails.minBuy} BNB</p>
                    </li>
                    <li>
                      <p>Maximum Buy</p>
                      <p>{launchpadDetails.maxBuy} BNB</p>
                    </li>
                  </ul>
                </div>
                <div className="full-div shadow-box owner-zone text-center">
                  <h2>Owner Zone</h2>
                  <ul className="full-list">
                    <li>
                      {launchpadDetails.iswhitListed ? (
                        <Button className="reg-gradient">
                          Whitelist Enabled
                        </Button>
                      ) : (
                        <Button className="reg-gradient">
                          Enable Whitelist
                        </Button>
                      )}
                      {/* <Link to="/">Enable Whitelist</Link> */}
                    </li>
                    <li>
                      <Button
                        className="reg-gradient"
                        onClick={() => Finalize()}
                      >
                        Finalize Pool
                      </Button>
                    </li>
                    <li>
                      <Link className="reg-gradient" to="/">
                        Cancel Pool
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pitchtoken;
