import { API, graphqlOperation, Storage } from "aws-amplify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReward } from "../../../graphql/queries";
import FuseUtils from "@fuse/utils/FuseUtils";
import {
  createReward,
  updateReward,
  deleteReward,
} from "../../../graphql/mutations";

export const fetchRewardThunk = createAsyncThunk(
  "adminApp/Reward/getReward",

  async (params) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(getReward, params));
      data = await resp.data;
      console.log("fetchRewardThunk => data => ", data);
      return data === undefined ? null : data;
    } catch (err) {
      console.log("rewardSlice => fetchRewardThunk => err => ", err);
    }
    return data;
  }
);

export const removeReward = createAsyncThunk(
  "adminApp/Reward/removeReward",
  async (id, { dispatch, getState }) => {
    const data = { id };
    await API.graphql(
      graphqlOperation(deleteReward, {
        input: data,
      })
    );

    return id;
  }
);

export const saveRewardThunk = createAsyncThunk(
  "adminApp/Reward/saveReward",
  async (RewardData, { dispatch, getState }) => {
    const data = RewardData;
    let response;

    try {
      if (!data.logoUri.startsWith("rewards")) {
        const logoUri = `rewards/${data.id}/logo.jpg`;
        await Storage.put(logoUri, await (await fetch(data.logoUri)).blob(), {
          contentType: "images/jpg",
        });

        data.logoUri = logoUri;
      }

      if (!data.heroPhotoUri.startsWith("rewards")) {
        const heroPhotoUri = `rewards/${data.id}/heroPhoto.jpg`;

        await Storage.put(
          heroPhotoUri,
          await (await fetch(data.heroPhotoUri)).blob(),
          {
            contentType: "images/jpg",
          }
        );
        data.heroPhotoUri = heroPhotoUri;
      }

      console.log("rewardSlice => saveReward => data2 => ", data);

      response = await API.graphql(
        graphqlOperation(updateReward, {
          input: data,
        })
      );
    } catch (err) {
      console.log("rewardSlice => saveReward => err => ", err);
    }
    return response?.data?.updateReward;
  }
);

export const createRewardThunk = createAsyncThunk(
  "adminApp/Reward/createReward",
  async (data, { dispatch, getState }) => {
    let response;
    try {
      // Upload the images
      const logoUri = `rewards/${FuseUtils.generateGUID()}/logo.jpg`;
      const heroPhotoUri = `rewards/${FuseUtils.generateGUID()}/heroPhoto.jpg`;
      await Storage.put(logoUri, await (await fetch(data.logoUri)).blob(), {
        contentType: "images/jpg",
      });
      await Storage.put(
        heroPhotoUri,
        await (await fetch(data.heroPhotoUri)).blob(),
        {
          contentType: "images/jpg",
        }
      );
      data.logoUri = logoUri;
      data.heroPhotoUri = heroPhotoUri;

      console.log("rewardSlice => saveReward => data => ", data);

      response = await API.graphql(
        graphqlOperation(createReward, {
          input: data,
        })
      );
    } catch (err) {
      console.log("rewardSlice => saveReward => err => ", err);
    }
    return response?.data?.createReward;
  }
);

export const saveReward1 = createAsyncThunk(
  "adminApp/Reward/saveReward",
  async (RewardData, { dispatch, getState }) => {
    const logo = RewardData.logoUri;
    const background = RewardData.heroPhotoUri;
    const { organizations } = RewardData;
    const data = RewardData;
    data.logoUri = "";
    data.heroPhotoUri = "";
    delete data.organizations;
    const arrOrganizations = [];

    try {
      console.log("rewardSlice => saveReward => data1 => ", data);
      console.log("startDateTime number?", Number.isNaN(data.startDateTime));
      if (Number.isNaN(data.startDateTime) === true) {
        data.startDateTime = Date.parse(data.startDateTime);
        console.log("startDateTime parsed", Date.parse(data.startDateTime));
      }
      // data.endDateTime = Date.parse(data.endDateTime);
      console.log("rewardSlice => saveReward => data2 => ", data);
      const resp = await API.graphql(
        graphqlOperation(createReward, {
          input: data,
        })
      );
      const newReward = resp.data.createReward;
      const newId = resp.data.createReward.id;

      // Upload the images
      const logoUri = `rewards/${newId}/logo.jpg`;
      const heroPhotoUri = `rewards/${newId}/heroPhoto.jpg`;
      const logoResult = await Storage.put(
        logoUri,
        await (await fetch(logo)).blob(),
        {
          contentType: "images/jpg",
        }
      );
      const bgResult = await Storage.put(
        heroPhotoUri,
        await (await fetch(background)).blob(),
        {
          contentType: "images/jpg",
        }
      );
      const updateResp = await API.graphql(
        graphqlOperation(updateReward, {
          input: {
            id: newId,
            logoUri,
            heroPhotoUri,
          },
        })
      );

      // Add any organization relationships
      if (organizations !== null) {
        await Promise.all(
          organizations.map(async (r) => {
            const organization = {
              displayName: r.displayName,
              relationshipType: r.relationshipType,
              rewardId: newId,
            };
            const orgResp = await API.graphql(
              graphqlOperation(createOrganization, {
                input: organization,
              })
            );
          })
        );
        // data.organizations = arrOrganizations;
        return newReward;
      }
    } catch (err) {
      console.log("rewardSlice => saveReward => err => ", err);
    }
    const dataEmpty = {};
    return dataEmpty;
  }
);

const RewardSlice = createSlice({
  name: "adminApp/Reward",
  initialState: null,
  reducers: {
    resetReward: () => null,
    newReward: {
      reducer: (state, action) => action.payload,
      prepare: (reward) => ({
        payload: {
          // id: FuseUtils.generateGUID(),
          title: "",
          wealthAmount: 0,
          heroPhotoUri: "",
          logoUri: "",
          description: "",
        },
      }),
    },
  },
  extraReducers: {
    [fetchRewardThunk.fulfilled]: (state, action) => action.payload,
    [saveRewardThunk.fulfilled]: (state, action) => action.payload,
    [removeReward.fulfilled]: (state, action) => null,
  },
});

export const { newReward, resetReward } = RewardSlice.actions;

export default RewardSlice.reducer;
