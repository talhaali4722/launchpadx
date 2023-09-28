import React, { useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import Header from "./components/header";
import Home from "./pages/home";
import Pitchtoken from "./pages/Pitchtoken";

import Createlaunchpad from "./pages/Createlaunchpad/Createlaunchpad";
import DefilaunchpadInfo from "./pages/Createlaunchpad/DefilaunchpadInfo";
import Addaditionalinfo from "./pages/Createlaunchpad/Addaditionalinfo";
import Finishlaunchpad from "./pages/Createlaunchpad/Finishlaunchpad";

import Createfairlaunch from "./pages/Createfairlaunch/Createfairlaunch";
import Fairlaunchinfo from "./pages/Createfairlaunch/Fairlaunchinfo";
import Fairlaunchadditionalinfo from "./pages/Createfairlaunch/Fairlaunchadditionalinfo";
import Finishfairlaunch from "./pages/Createfairlaunch/Finishfairlaunch";

import Dutchauction from "./pages/Dutchauction/Dutchauction";
import DutchauctionInfo from "./pages/Dutchauction/DutchauctionInfo";
import Dutchadditionalinfo from "./pages/Dutchauction/Dutchadditionalinfo";
import FinishDutchlaunch from "./pages/Dutchauction/FinishDutchlaunch";

import Createsubscription from "./pages/Createsubscription/Createsubscription";
import Subscriptionpool from "./pages/Createsubscription/Subscriptionpool";
import Subscriptionadditioninfo from "./pages/Createsubscription/Subscriptionadditioninfo";
import Finishsubscription from "./pages/Createsubscription/Finishsubscription";

import Privatesale from "./pages/Privatesale/Privatesale";
import Privatesaleinfo from "./pages/Privatesale/Privatesaleinfo";
import Privatesaleadditionalinfo from "./pages/Privatesale/Privatesaleadditionalinfo";
import Finishprivatesale from "./pages/Privatesale/Finishprivatesale";

import Footer from "./components/footer";
import "./App.scss";
import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import showConsole from "./utils/common-functions";
import { useSelector, useDispatch } from "react-redux";
import { connectWithMetamask } from "./web3/metamask";
import { walletConnection } from "./redux/actions/wallet-connections";
import { IS_WALLET_CONNECTED } from "./utils/constants";
import CreateLaunchpadPitchtoken from "./pages/Createlaunchpad/CreateLaunchpadPitchToken";
import FairLaunchPitchtoken from "./pages/Createfairlaunch/FairLaunchPitchToken";
import { useCreateLaunchPadStore } from "./pages/store/useStore";
import DutchAuctionPitchToken from "./pages/Dutchauction/DutchAuctionPitchToken";
import SubscriptionPitchToken from "./pages/Createsubscription/SubscriptionPitchToken";

import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

function App() {
  const chainId = useSelector((state) => state.wallet.chainId);
  const dispatch = useDispatch();
  const setApprovalChceck = useCreateLaunchPadStore(
    (state) => state.setApprovalChceck
  );

  // const isLocked = async () => {
  //   const isLocked = !(await window.ethereum._metamask.isUnlocked());
  //   if (isLocked) {
  //     localStorage.setItem(IS_WALLET_CONNECTED, false);
  //     dispatch(
  //       walletConnection({
  //         chainId: null,
  //         account: null,
  //         balance: null,
  //       })
  //     );
  //     setLocked(false);
  //   } else {
  //     // connectWithMetamaskFunc();
  //     setLocked(true);
  //     return false;
  //   }
  // };

  const detectProvider = async () => {
    if (window.web3) {
      const provider = await detectEthereumProvider();
      if (provider !== window.ethereum) {
        window.web3 = new Web3(provider);
      } else {
        window.web3 = new Web3(window.ethereum);
      }
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    addingBNBToMetamask();

    // isLocked();
    if (!chainId && localStorage.getItem(IS_WALLET_CONNECTED) === "true") {
      connectWithMetamaskFunc();
    }
    if (chainId !== "0x61") {
      switchingToBNB();
    }

    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        setApprovalChceck(false);
        connectWithMetamaskFunc();
      });
      window.ethereum.on("accountsChanged", () => {
        localStorage.setItem(IS_WALLET_CONNECTED, false);
        dispatch(
          walletConnection({
            chainId: null,
            account: null,
            balance: null,
          })
        );
        navigate("/");
      });
    } else {
      detectProvider();
    }
  }, [chainId]);

  const connectWithMetamaskFunc = () => {
    connectWithMetamask()
      .then((resp) => {
        dispatch(walletConnection(resp));
      })
      .catch((err) => {});
  };
  const addingBNBToMetamask = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x61",
            chainName: "BNBTestnet",
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
            blockExplorerUrls: ["https://bscscan.com"],
            nativeCurrency: {
              symbol: "BNB",
              decimals: 18,
            },
          },
        ],
      });
    } catch (addError) {
      showConsole("adding binance error   ::  ", addError);
    }
  };

  const switchingToBNB = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        showConsole(
          "This network is not available in your metamask, please add it"
        );
      }
      showConsole("Failed to switch to the network");
    }
  };
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pitchtoken/:address" element={<Pitchtoken />} />

        <Route
          path="/Createlaunchpad/Createlaunchpad"
          element={<Createlaunchpad />}
        />
        <Route
          path="/Createlaunchpad/DefilaunchpadInfo"
          element={<DefilaunchpadInfo />}
        />
        <Route
          path="/Createlaunchpad/Addaditionalinfo"
          element={<Addaditionalinfo />}
        />
        <Route
          path="/Createlaunchpad/Finishlaunchpad"
          element={<Finishlaunchpad />}
        />
        <Route
          path="/StandardPitchToken/:address"
          element={<CreateLaunchpadPitchtoken />}
        />

        <Route
          path="/Createfairlaunch/Createfairlaunch"
          element={<Createfairlaunch />}
        />
        <Route
          path="/Createfairlaunch/Fairlaunchinfo"
          element={<Fairlaunchinfo />}
        />
        <Route
          path="/Createfairlaunch/Fairlaunchadditionalinfo"
          element={<Fairlaunchadditionalinfo />}
        />
        <Route
          path="/Createfairlaunch/Finishfairlaunch"
          element={<Finishfairlaunch />}
        />
        <Route
          path="/FairLaunchPitchtoken/:address"
          element={<FairLaunchPitchtoken />}
        />

        <Route path="/Dutchauction/Dutchauction" element={<Dutchauction />} />
        <Route
          path="/Dutchauction/DutchauctionInfo"
          element={<DutchauctionInfo />}
        />
        <Route
          path="/Dutchauction/Dutchadditionalinfo"
          element={<Dutchadditionalinfo />}
        />
        <Route
          path="/Dutchauction/FinishDutchlaunch"
          element={<FinishDutchlaunch />}
        />
        <Route
          path="/DutchAuctionPitchToken/:address"
          element={<DutchAuctionPitchToken />}
        />

        <Route
          path="/Createsubscription/Createsubscription"
          element={<Createsubscription />}
        />
        <Route
          path="/Createsubscription/Subscriptionpool"
          element={<Subscriptionpool />}
        />
        <Route
          path="/Createsubscription/Subscriptionadditioninfo"
          element={<Subscriptionadditioninfo />}
        />
        <Route
          path="/Createsubscription/Finishsubscription"
          element={<Finishsubscription />}
        />

        <Route
          path="/SubscriptionPitchToken/:address"
          element={<SubscriptionPitchToken />}
        />

        <Route path="/Privatesale/Privatesale" element={<Privatesale />} />
        <Route
          path="/Privatesale/Privatesaleinfo"
          element={<Privatesaleinfo />}
        />
        <Route
          path="/Privatesale/Privatesaleadditionalinfo"
          element={<Privatesaleadditionalinfo />}
        />
        <Route
          path="/Privatesale/Finishprivatesale"
          element={<Finishprivatesale />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
