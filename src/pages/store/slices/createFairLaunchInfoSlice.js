const createFairLaunchInfoSlice = (set) => ({
  sellingAmount: "",
  softCap: "",
  liquidity: "",
  startDate: "",
  endDate: "",
  maxContribution: "",
  status: "",
  setStatus: (input) => set((state) => ({ status: input })),
  setMaxContribution: (input) => set((state) => ({ maxContribution: input })),
  setStartDate: (input) => set((state) => ({ startDate: input })),
  setEndDate: (input) => set((state) => ({ endDate: input })),
  setLiquidity: (liquidity) => set(() => ({ liquidity: liquidity })),
  setSoftCap: (input) => set((state) => ({ softCap: input })),
  setSellingAmount: (input) => set((state) => ({ sellingAmount: input })),
});

export default createFairLaunchInfoSlice;
