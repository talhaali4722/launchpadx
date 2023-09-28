const createLaunchPadSlice = (set) => ({
  tokenAddress: "",
  launchpadID: "",
  approvalChceck: false,
  selectedFee: "0",
  lastTokenAddress: [],
  allowanceOfToken: 0,
  symbol: " ",
  decimal: "",
  setDecimal: (input) => set((state) => ({ decimal: input })),
  setSymbol: (input) => set((state) => ({ symbol: input })),
  setAllownanceOfToken: (input) =>
    set((state) => ({ allowanceOfToken: input })),
  setSelectedFee: (input) => set((state) => ({ selectedFee: input })),
  setApprovalChceck: (input) => set((state) => ({ approvalChceck: input })),
  setTokenAddress: (input) => set((state) => ({ tokenAddress: input })),
  setLastTokenAddress: (input) =>
    set((state) => ({ lastTokenAddress: [...state.lastTokenAddress, input] })),
  setLaunchpadID: (input) => set((state) => ({ launchpadID: input })),
});

export default createLaunchPadSlice;
