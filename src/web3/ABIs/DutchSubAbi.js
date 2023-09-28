export const DutchSubAbi =[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_userAddress",
        "type": "address[]"
      }
    ],
    "name": "AddWhiteList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_userAddress",
        "type": "address[]"
      }
    ],
    "name": "RemoveWhiteList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "auctionRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_auctionRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_timePasses",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cancelPool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "claimedAddresses",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contribute",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contributorCurrencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "contributorTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contributorsLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentListingRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentTokenLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decreasePriceCycle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deductionTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "destination",
        "type": "address"
      }
    ],
    "name": "emergencyCurrencyWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "destination",
        "type": "address"
      }
    ],
    "name": "emergencyTokenWithdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "feeCateg",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "finalize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "currentSaleRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_currencyAmount",
        "type": "uint256"
      }
    ],
    "name": "generalTokenRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_tokenAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "page",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "size",
        "type": "uint256"
      }
    ],
    "name": "getAllContributorsList",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "_contributors",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "page",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "size",
        "type": "uint256"
      }
    ],
    "name": "getAllWhiteList",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "_contributors",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getClaimableToken",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_tokenAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCurrencyForLiquidity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_PlatFormFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_currencyAmountLiq",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_currencyAmountOwner",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getInitialMarketCap",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_result",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getLaunchpadInfo",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "tokenAddress",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "launchpadType",
            "type": "uint8"
          },
          {
            "internalType": "address",
            "name": "launcher",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "factory",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "softCap",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "hardCap",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "maxBuy",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "minBuy",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "liquidity_Percentage",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "iswhitListed",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "logoURL",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "website",
            "type": "string"
          }
        ],
        "internalType": "struct DutchAuction.GeneralInfo",
        "name": "launchPadInfo",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "_preSaleRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_listingRate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPoolStatus",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_remaingTimeToStart",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_remaingTimeToEnd",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_remainingAmountToFill",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_status",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "page",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "size",
        "type": "uint256"
      }
    ],
    "name": "getPurchaseHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "contributorAddresses",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "CurrencyAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "internalType": "struct DutchAuction.PurchaseHistory[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_currencyAmount",
        "type": "uint256"
      }
    ],
    "name": "getReceivedTokensAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_tokenAmount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getRemainingDeductionTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_remainingTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTimeToPublic",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_result",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTimedelayAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_timedelayRate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "page",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "size",
        "type": "uint256"
      }
    ],
    "name": "getUserPurchaseHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "contributorAddresses",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "CurrencyAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          }
        ],
        "internalType": "struct DutchAuction.PurchaseHistory[]",
        "name": "allAddresses",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getUserPurchased",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_currency",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getWhiteLists",
    "outputs": [
      {
        "internalType": "bool",
        "name": "_flage",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getheredCurrency",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_factory",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "_launchpadType",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_liquidity",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "_feeCateg",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "_isWhiteListOn",
        "type": "bool"
      },
      {
        "internalType": "uint8",
        "name": "_refundType",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_decimals",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_logURL",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_website",
        "type": "string"
      }
    ],
    "name": "initiation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isWhiteListOn",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isfinalzed",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "iswhitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "katooti",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidityFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidityTokenAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_launcher",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_preSaleRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_softCap",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_hardCap",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_maxBuy",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minBuy",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_decreasePriceCycle",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_endTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_preLiquidityAmount",
        "type": "uint256"
      }
    ],
    "name": "setDutchAuction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setSaleToPublic",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_timetoPublic",
        "type": "uint256"
      }
    ],
    "name": "setTimeToPublic",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setToWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_amount",
        "type": "uint8"
      }
    ],
    "name": "setWithdrawFine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "timedelayRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "uSoldTokenRefundType",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "whiteListDisableTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "whitelistCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_length",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawCurrencyAfterCancel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawLiquidityTokensAfterCancel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];
