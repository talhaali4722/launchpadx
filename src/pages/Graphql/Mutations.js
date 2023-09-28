import { gql } from "@apollo/client";

export const CREATE_LAUNCHPAD_MUTATION = gql`
  mutation create($create: CreatelaunchpadInput!) {
    create(Data: $create) {
      presaleAddress
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
    }
  }
`;

export const CREATE_FAIR_LAUNCH_MUTATION = gql`
  mutation createFairLaunch($CreateFairLaunch: CreateFairlaunchInput!) {
    createFairlaunch(createFairlaunchInput: $CreateFairLaunch) {
      name
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation update($id: String!, $status: String!) {
    updateStatus(ID: $id, status: $status) {
      preSaleRate
      status
    }
  }
`;
