const dutchAdditionalInfoSlice = (set) => ({
  logoUrl: "",
  facebookUrl: "",
  instagramUrl: "",
  gitHubUrl: "",
  twitterUrl: "",
  telegramUrl: "",
  discordUrl: "",
  redditUrl: "",
  webUrl: "",
  description: "",

  setLogoUrl: (input) => set((state) => ({ logoUrl: input })),
  setFacebookUrl: (input) => set((state) => ({ facebookUrl: input })),
  setInstagramUrl: (input) => set((state) => ({ instagramUrl: input })),
  setGithubUrl: (input) => set((state) => ({ gitHubUrl: input })),
  setTwitterUrl: (input) => set((state) => ({ twitterUrl: input })),
  setTelegramUrl: (input) => set((state) => ({ telegramUrl: input })),
  setDiscordUrl: (input) => set((state) => ({ discordUrl: input })),
  setRedditUrl: (input) => set((state) => ({ redditUrl: input })),
  setDescription: (input) => set((state) => ({ description: input })),
  setWebUrl: (input) => set((state) => ({ webUrl: input })),
});

export default dutchAdditionalInfoSlice;
