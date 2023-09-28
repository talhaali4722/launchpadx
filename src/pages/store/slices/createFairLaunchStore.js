const createFairLaunchSlice = (set) => ({
  tokenAddress: "",
  launchpadID: "",
  approvalChceck: false,
  selectedFee: "0",
  decimal: "",
  allowanceOfToken: 0,
  setAllownanceOfToken: (input) =>
    set((state) => ({ allowanceOfToken: input })),
  setDecimal: (input) => set((state) => ({ decimal: input })),
  setSelectedFee: (input) => set((state) => ({ selectedFee: input })),
  setLaunchpadID: (input) => set((state) => ({ launchpadID: input })),
  setApprovalChceck: (input) => set((state) => ({ approvalChceck: input })),

  setTokenAddress: (input) => set((state) => ({ tokenAddress: input })),
});

export default createFairLaunchSlice;
