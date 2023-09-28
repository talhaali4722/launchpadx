import Web3 from "web3";
import showConsole from "../utils/common-functions";
import detectEthereumProvider from "@metamask/detect-provider";

export const connectWithMetamask = () => {
  return new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      // if (window.ethereum.chainId  != "0x61") switchingToBNB()
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          const chainId = window.ethereum.chainId;
          const accounts = await window.web3.eth.getAccounts();

          let balance = 0;
          if (accounts.length !== 0) {
            balance = await window.web3.eth.getBalance(accounts[0]);
          }
          if (chainId !== "0x61") {
            await addingBNBToMetamask();
          }

          //         window.Contract = new window.web3.eth.Contract(contractAbi
          // , CONTRACT_ADDRESS, { from: accounts[0] })

          resolve({
            chainId,
            account: window.ethereum.selectedAddress,
            balance,
          });
        })
        .catch((error) => {
          showConsole("this is contract  ::  ", error);
          reject(error);
        });
    } else {
      reject("please install metamask extension");
    }
  });
};

const addingBNBToMetamask = async () => {
  if (window.web3) {
    let provider = await detectEthereumProvider();
    if (!provider) {
      provider = window.ethereum;
    }

    if (provider.chainId != "0x61") {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "BNB-Testnet",
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
        showConsole("adding BNB error   ::  ", addError);
      }
    }
  }
};

// const switchingToBNB = async () => {
//   try {
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: "0x61" }],
//     });
//   } catch (switchError) {
//     if (switchError.code === 4902) {
//       showConsole(
//         "This network is not available in your metamask, please add it"
//       );
//     }
//     showConsole("Failed to switch to the network");
//   }
// };
