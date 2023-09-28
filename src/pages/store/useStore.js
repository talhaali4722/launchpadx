import create from "zustand";
import additionalInfoSlice from "./slices/additionlaInfoSlice";
import createDutchAuctionSlice from "./slices/createDutchAuction";
import createFairLaunchInfoSlice from "./slices/createFairLaunchInfoSlice";
import createFairLaunchSlice from "./slices/createFairLaunchStore";
import createLaunchPadSlice from "./slices/createLaunchPadSlice";
import createSubscriptionSlice from "./slices/createSubscriptionSlice";
import defiLaunchPadSlice from "./slices/defiLaunchPadStore";
import dutchAdditionalInfoSlice from "./slices/dutchAdditionalInfo";
import DutchauctionInfoSlice from "./slices/dutchInfoSlice";
import fairLaunchAdditionalInfoSlice from "./slices/fairLaunchAdditionalInfoSlice";
import homeSlice from "./slices/homeSlice";
import useMetaMaskData from "./slices/metaMaskDataSlice";
import subscriptionAdditionalInfo from "./slices/subscriptionAdditionalSlice";
import subscriptionPoolSlice from "./slices/subscriptionPoolSlice";

const useMetaMaskDataStore = create((set, get) => ({
  ...useMetaMaskData(set, get),
}));

const useCreateLaunchPadStore = create((get, set) => ({
  ...createLaunchPadSlice(get, set),
}));

const useDefiLaunchPadStore = create((set, get) => ({
  ...defiLaunchPadSlice(set, get),
}));

const useAddtionalInfoStore = create((set, get) => ({
  ...additionalInfoSlice(set, get),
}));

const useCreateFairLaunchStore = create((set, get) => ({
  ...createFairLaunchSlice(set, get),
}));

const useCreateFairLaunchInfoStore = create((set, get) => ({
  ...createFairLaunchInfoSlice(set, get),
}));

const useFairLaunchAdditionalInfo = create((set, get) => ({
  ...fairLaunchAdditionalInfoSlice(set, get),
}));

const useCreateDutchAuction = create((set) => ({
  ...createDutchAuctionSlice(set),
}));

const useDutchAuctionInfo = create((set, get) => ({
  ...DutchauctionInfoSlice(set, get),
}));

const useDucthAdditionalInfo = create((set, get) => ({
  ...dutchAdditionalInfoSlice(set, get),
}));

const useCreateSubscription = create((set) => ({
  ...createSubscriptionSlice(set),
}));

const useSubscriptionPool = create((set, get) => ({
  ...subscriptionPoolSlice(set, get),
}));
const useSubscriptionAdditionalInfo = create((set, get) => ({
  ...subscriptionAdditionalInfo(set, get),
}));
const useHomeSlice = create((set, get) => ({
  ...homeSlice(set, get),
}));

export {
  useDucthAdditionalInfo,
  useCreateLaunchPadStore,
  useDefiLaunchPadStore,
  useAddtionalInfoStore,
  useCreateFairLaunchStore,
  useCreateFairLaunchInfoStore,
  useFairLaunchAdditionalInfo,
  useCreateDutchAuction,
  useDutchAuctionInfo,
  useHomeSlice,
  useCreateSubscription,
  useSubscriptionPool,
  useSubscriptionAdditionalInfo,
};
