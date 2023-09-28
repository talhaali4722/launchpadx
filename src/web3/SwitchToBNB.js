import showConsole from "../utils/common-functions";

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

export default switchingToBNB;
