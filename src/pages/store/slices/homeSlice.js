const homeSlice = (set) => ({
  selectedIndex: "launchpads",
  setSelectedIndex: (input) => set((state) => ({ selectedIndex: input })),
});
export default homeSlice;
