export const subscriptionLaunchpadAbi =[
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
    "inputs": [
      {
        "internalType": "bool",
        "name": "_flage",
        "type": "bool"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "calculation",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "claimAndRefund",
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
    "name": "claimRefundAddresses",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "commitmentRatio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_commitmentRatio",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_allocationRatio",
        "type": "uint256"
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
    "name": "getCurrentRaise",
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_currencyAmount",
        "type": "uint256"
      }
    ],
    "name": "getEstimatedTokenReceived",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_tokens",
        "type": "uint256"
      },
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
            "name": "hardCapTokens",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "softCapTokens",
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
        "internalType": "struct Subscription.GeneralInfo",
        "name": "launchPadInfo",
        "type": "tuple"
      },
      {
        "internalType": "uint256",
        "name": "_subscriptionRate",
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
            "name": "Commited",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "CommitementRatio",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "AllocationRatio",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "allocation",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "allocationAmount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Subscription.PurchaseHistory[]",
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
    "name": "getRefund",
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
    "name": "getTokenRate",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "_hardcapRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_softcapRate",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_feeCateg",
        "type": "uint8"
      }
    ],
    "name": "getTokenRequire",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_afterLiqudityAmount",
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
    "inputs": [],
    "name": "hardCapCurrency",
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
    "name": "hardcapTokenPerUser",
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
    "name": "historyCount",
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
    "name": "initialMarketCap",
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
      }
    ],
    "name": "initiation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isApproved",
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
    "name": "isCalculated",
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
    "inputs": [],
    "name": "listingRate",
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
    "name": "refundCurrency",
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
        "internalType": "address",
        "name": "_launcher",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_hardCapTokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_softCapTokens",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_hardCapPerUser",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_subscriptionRate",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_listingRate",
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
        "internalType": "string",
        "name": "_logoURL",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_website",
        "type": "string"
      }
    ],
    "name": "setSubscriptionPool",
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
    "name": "subscriptionRate",
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
    "name": "unSoldToken",
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
    "name": "whiteListDiableTime",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "youPaid",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "youPurchased",
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
    "stateMutability": "payable",
    "type": "receive"
  }
]