const createDutchAuctionSlice = (set) => ({
  tokenAddress: "",
  approvalChceck: false,
  selectedFee: "0",
  symbol: "",
  decimals: "",
  allowanceOfToken: "",
  balance: "",

  setAllownanceOfToken: (input) =>
    set((state) => ({ allowanceOfToken: input })),
  setBalance: (input) => set((state) => ({ balance: input })),
  setDecimals: (input) => set((state) => ({ decimals: input })),
  setSymbol: (input) => set((state) => ({ symbol: input })),
  setSelectedFee: (input) => set((state) => ({ selectedFee: input })),
  setApprovalChceck: (input) => set((state) => ({ approvalChceck: input })),
  setTokenAddress: (input) => set((state) => ({ tokenAddress: input })),
});

export default createDutchAuctionSlice;
