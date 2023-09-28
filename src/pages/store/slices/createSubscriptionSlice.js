const createSubscriptionSlice = (set) => ({
  tokenAddress: "",
  approvalChceck: false,
  selectedFee: "0",
  Symbol: "",
  balance: "",

  decimal: "",
  setDecimal: (input) => set((state) => ({ decimal: input })),
  setSymbol: (input) => set((state) => ({ Symbol: input })),
  setBalance: (input) => set((state) => ({ balance: input })),
  setSelectedFee: (input) => set((state) => ({ selectedFee: input })),
  setApprovalChceck: (input) => set((state) => ({ approvalChceck: input })),
  setTokenAddress: (input) => set((state) => ({ tokenAddress: input })),
});

export default createSubscriptionSlice;
