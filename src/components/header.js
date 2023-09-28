import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import mobilelogo from "../assets/logo.png";
import dashboard from "../assets/img/dashboard-icon.png";
import Launchpad from "../assets/img/icon-launchpad.png";
import fairlaunch from "../assets/img/icon-launch.png";
import auction from "../assets/img/icon-auction.png";
import subscription from "../assets/img/icon-subscription.png";
import privatesale from "../assets/img/icon-private-sale.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connectWithMetamask } from "../web3/metamask";
import showConsole from "../utils/common-functions";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { walletConnection } from "../redux/actions/wallet-connections";
import { IS_WALLET_CONNECTED } from "../utils/constants";
import { useCreateLaunchPadStore } from "../pages/store/useStore";
import { Button } from "react-bootstrap";
import { FaCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
function Header() {
  const dispatch = useDispatch();
  const walletData = useSelector((state) => state.wallet);
  const location = useLocation();
  const [Locked, setLocked] = useState(true);

  const isLocked = async () => {
    const isLocked = !(await window.ethereum._metamask.isUnlocked());
    if (isLocked) {
      localStorage.setItem(IS_WALLET_CONNECTED, false);
      dispatch(
        walletConnection({
          chainId: null,
          account: null,
          balance: null,
        })
      );
      setLocked(true);
    } else {
      // connectWithMetamaskFunc();
      setLocked(false);
      return false;
    }
  };
  const setTokenAddress = useCreateLaunchPadStore(
    (state) => state.setTokenAddress
  );
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(walletData.account);
      toast.success("Address Copied  ", {
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
      toast.error("Error", {
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

  const navigate = useNavigate();
  return (
    <>
      <nav id="main-navigation" className="container-fluid">
        <ToastContainer
          position="top-right"
          autoClose={1500}
          limit={5}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="row">
          <div className="flex-div">
            <div className="logo-pnl">
              <Link to="/">
                <img src={logo} className="logo" alt="Logo" />
                <img src={mobilelogo} className="mobilelogo" alt="Logo" />
              </Link>
            </div>
            <div className="header-right-pnl">
              <a
                className="buy-btns"
                href="https://pancakeswap.finance/swap?chain=bscTestnet"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy $BNB
              </a>
              {walletData.account ? (
                <span
                  className="a-buttons pointer buy-btns "
                  onClick={() => {
                    connectWithMetamask().then((resp) => {
                      localStorage.setItem(IS_WALLET_CONNECTED, true);
                      dispatch(walletConnection(resp));
                    });
                    copyToClipboard();
                  }}
                >
                  {walletData.account.slice(0, 5) +
                    "..." +
                    walletData.account.slice(-5) +
                    " "}
                  <FaCopy
                    className="copy-icon"
                    title="Copy Address"
                    onClick={copyToClipboard}
                  />
                </span>
              ) : (
                <span
                  className="a-buttons pointer buy-btns"
                  onClick={() => {
                    if (!window.ethereum) {
                      return toast.error("Please Install Metamask", {
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
                      connectWithMetamask().then((resp) => {
                        localStorage.setItem(IS_WALLET_CONNECTED, true);
                        dispatch(walletConnection(resp));
                      });
                    }
                  }}
                >
                  {
                    /* {walletData.account
                    ? walletData.account.slice(0, 5) +
                      "..." +
                      walletData.account.slice(-5)
                    :*/ "Connect Wallet"
                  }
                </span>
              )}

              {walletData.account && (
                <span
                  className="a-buttons pointer buy-btns"
                  onClick={() => {
                    localStorage.setItem(IS_WALLET_CONNECTED, false);
                    dispatch(
                      walletConnection({
                        chainId: null,
                        account: null,
                        balance: null,
                      })
                    );
                    setTokenAddress("");
                    navigate("/");
                    window.location.reload();
                  }}
                >
                  Disconnect
                </span>
              )}
              <button
                className="mobile-menu-btn"
                onClick={() => {
                  document.getElementById("close-btn").classList.add("active");
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div id="close-btn" className="side-bar">
        <div className="side-bar-inner">
          <button
            className="mobile-menu-btn"
            onClick={() => {
              document.getElementById("close-btn").classList.remove("active");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          {/* <Link className="buy-btns" to="#">
          Buy $SCAR
        </Link> */}
          <Link
            className={
              !location.pathname.includes("Createlaunchpad") &&
              !location.pathname.includes("DefilaunchpadInfo") &&
              !location.pathname.includes("Addaditionalinfo") &&
              !location.pathname.includes("Finishlaunchpad") &&
              !location.pathname.includes("Createfairlaunch") &&
              !location.pathname.includes("Fairlaunchinfo") &&
              !location.pathname.includes("Fairlaunchadditionalinfo") &&
              !location.pathname.includes("Finishfairlaunch") &&
              !location.pathname.includes("Dutchauction") &&
              !location.pathname.includes("DutchauctionInfo") &&
              !location.pathname.includes("Dutchadditionalinfo") &&
              !location.pathname.includes("FinishDutchlaunch") &&
              !location.pathname.includes("Createsubscription") &&
              !location.pathname.includes("Subscriptionpool") &&
              !location.pathname.includes("Subscriptionadditioninfo") &&
              !location.pathname.includes("Finishsubscription") &&
              !location.pathname.includes("Privatesale") &&
              !location.pathname.includes("Privatesaleinfo") &&
              !location.pathname.includes("Privatesaleadditionalinfo") &&
              !location.pathname.includes("Finishprivatesale") &&
              "active"
            }
            to="/"
          >
            <img src={dashboard} alt="dashboard" />
            Dashboard
          </Link>

          <Link
            to="/Createlaunchpad/Createlaunchpad"
            className={
              location.pathname.includes("Createlaunchpad") && "active"
            }
          >
            <img src={Launchpad} alt="Create Launchpad" />
            Create Launchpad
          </Link>

          <Link
            to="/Createfairlaunch/Createfairlaunch"
            className={
              location.pathname.includes("Createfairlaunch") && "active"
            }
          >
            <img src={fairlaunch} alt="Fair Launch" />
            Create Fair Launch
          </Link>

          <Link
            to="/Dutchauction/Dutchauction"
            className={location.pathname.includes("Dutchauction") && "active"}
          >
            <img src={auction} alt="Dutch Auction" />
            Dutch Auction
          </Link>

          <Link
            to="/Createsubscription/Createsubscription"
            className={
              location.pathname.includes("Createsubscription") && "active"
            }
          >
            <img src={subscription} alt="Create Subscription" />
            Create Subscription
          </Link>
          {/* 
        <Link
          to="/Privatesale/Privatesale"
          className={location.pathname.includes("Privatesale") && "active"}
        >
          <img src={privatesale} alt="Private Sale" />
          Private Sale
        </Link> */}
        </div>
      </div>
    </>
  );
}
export default Header;
