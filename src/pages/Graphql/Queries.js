import { gql } from "@apollo/client";

export const GET_ALL_LAUNCHPADS = gql`
  {
    GetAlllaunchpad {
      presaleAddress
      type
      tokenName
      tokenSymbol
      tokenDecimal
      preSaleRate
      listingRate
      minimumBuy
      maximumBuy
      liquidityPercentage
      startTime
      endTime
      status
      liquidityTokens
      isWhitelisted

      softCap
      hardCap

      metadata {
        logoUrl
        website
      }
    }
  }
`;
export const GET_ALL_LAUNCHPADS_SOFTCAP = gql`
  query get($filterr: FilterDto!) {
    GET(FilterLaunchpadInput: $filterr) {
      presaleAddress
      type
      tokenName
      tokenSymbol
      tokenAddress
      tokenDecimal
      preSaleRate
      listingRate
      softCap
      hardCap
      minimumBuy
      maximumBuy
      liquidityPercentage
      startTime
      endTime
      metadata {
        logoUrl
        website
        githubUrl
        telegramUrl
        facebookUrl
        twitterUrl
        githubUrl
        instagramUrl
        discordUrl
        redditUrl
        description
      }
      status
      liquidityTokens
      isWhitelisted
    }
  }
`;

export const GET_ALL_LAUNCHPAD_DETAILS = gql`
  query get($filter: FilterDto, $sort: SortingDTO) {
    GetAllLaunchpads(FilterLaunchpadInput: $filter, SortingInput: $sort) {
      items {
        presaleAddress
        preSaleRate
        launcher
        type
        tokenName
        tokenSymbol
        tokenAddress
        tokenDecimal
        preSaleRate
        listingRate
        softCap
        hardCap
        minimumBuy
        maximumBuy
        liquidityPercentage
        startTime
        endTime
        metadata {
          logoUrl
          website
          githubUrl
          telegramUrl
          facebookUrl
          twitterUrl
          githubUrl
          instagramUrl
          discordUrl
          redditUrl
          description
        }
        status
        liquidityTokens
        isWhitelisted
      }
      total
    }
  }
`;

export const GET_ALL_OWNER_LAUNCHPADS = gql`
  query get($filter: FilterDto, $sort: SortingDTO) {
    GetOwnerLaunchpad(FilterLaunchpadInput: $filter, SortingInput: $sort) {
      items {
        presaleAddress
        preSaleRate
        launcher
        type
        tokenName
        tokenSymbol
        tokenAddress
        tokenDecimal
        preSaleRate
        listingRate
        softCap
        hardCap
        minimumBuy
        maximumBuy
        liquidityPercentage
        startTime
        endTime
        metadata {
          logoUrl
          website
          githubUrl
          telegramUrl
          facebookUrl
          twitterUrl
          githubUrl
          instagramUrl
          discordUrl
          redditUrl
          description
        }
        status
        liquidityTokens
        isWhitelisted
      }
      total
    }
  }
`;
