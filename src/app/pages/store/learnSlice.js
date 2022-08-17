import { API, graphqlOperation, Storage } from "aws-amplify";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCustomLearn } from "../../../graphql/customQueries";
import FuseUtils from "@fuse/utils/FuseUtils";
import {
  createCustomLearn,
  updateCustomLearn,
  deleteCustomLearn,
} from "../../../graphql/customMutations";

export const fetchLearnThunk = createAsyncThunk(
  "adminApp/Learn/getLearn",

  async (params) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(getCustomLearn, params));
      data = await resp.data;
      console.log("fetchLearnThunk => data => ", data);
      return data === undefined ? null : data;
    } catch (err) {
      console.log("learnSlice => fetchLearnThunk => err => ", err);
    }
    return data;
  }
);

export const removeLearn = createAsyncThunk(
  "adminApp/Learn/removeLearn",
  async (id, { dispatch, getState }) => {
    const data = { id };
    await API.graphql(
      graphqlOperation(deleteCustomLearn, {
        input: data,
      })
    );

    return id;
  }
);

export const saveLearnThunk = createAsyncThunk(
  "adminApp/Learn/saveLearn",
  async (LearnData, { dispatch, getState }) => {
    const data = LearnData;
    let response;

    try {
      if (!data.bgImageUri.startsWith("learns")) {
        // Upload the images
        console.log("learnSlice => saveLearn => data1 => ", data);
        const bgImageUri = `learns/${data.id}/bgImage.jpg`;
        await Storage.put(
          bgImageUri,
          await (await fetch(data.bgImageUri)).blob(),
          {
            contentType: "images/jpg",
          }
        );
        data.bgImageUri = bgImageUri;

        console.log("learnSlice => saveLearn => data2 => ", data);
      }

      response = await API.graphql(
        graphqlOperation(updateCustomLearn, {
          input: data,
        })
      );
    } catch (err) {
      console.log("learnSlice => saveLearn => err => ", err);
    }
    return response?.data?.updateLearn;
  }
);

export const createLearnThunk = createAsyncThunk(
  "adminApp/Learn/createLearn",
  async (data, { dispatch, getState }) => {
    let response;
    try {
      // Upload the images
      const bgImageUri = `learns/${FuseUtils.generateGUID()}/bgImage.jpg`;
      await Storage.put(
        bgImageUri,
        await (await fetch(data.bgImageUri)).blob(),
        {
          contentType: "images/jpg",
        }
      );
      data.bgImageUri = bgImageUri;

      console.log("learnSlice => saveLearn => data => ", data);

      response = await API.graphql(
        graphqlOperation(createCustomLearn, {
          input: data,
        })
      );
    } catch (err) {
      console.log("learnSlice => saveLearn => err => ", err);
    }
    return response?.data?.createLearn;
  }
);

export const saveLearn1 = createAsyncThunk(
  "adminApp/Learn/saveLearn",
  async (LearnData, { dispatch, getState }) => {
    const logo = LearnData.logoUri;
    const background = LearnData.heroPhotoUri;
    const { organizations } = LearnData;
    const data = LearnData;
    data.logoUri = "";
    data.heroPhotoUri = "";
    delete data.organizations;
    const arrOrganizations = [];

    try {
      console.log("learnSlice => saveLearn => data1 => ", data);
      console.log("startDateTime number?", Number.isNaN(data.startDateTime));
      if (Number.isNaN(data.startDateTime) === true) {
        data.startDateTime = Date.parse(data.startDateTime);
        console.log("startDateTime parsed", Date.parse(data.startDateTime));
      }
      // data.endDateTime = Date.parse(data.endDateTime);
      console.log("learnSlice => saveLearn => data2 => ", data);
      const resp = await API.graphql(
        graphqlOperation(createLearn, {
          input: data,
        })
      );
      const newLearn = resp.data.createLearn;
      const newId = resp.data.createLearn.id;

      // Upload the images
      const logoUri = `learns/${newId}/logo.jpg`;
      const heroPhotoUri = `learns/${newId}/heroPhoto.jpg`;
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
        graphqlOperation(updateLearn, {
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
              learnId: newId,
            };
            const orgResp = await API.graphql(
              graphqlOperation(createOrganization, {
                input: organization,
              })
            );
          })
        );
        // data.organizations = arrOrganizations;
        return newLearn;
      }
    } catch (err) {
      console.log("learnSlice => saveLearn => err => ", err);
    }
    const dataEmpty = {};
    return dataEmpty;
  }
);

const LearnSlice = createSlice({
  name: "adminApp/Learn",
  initialState: null,
  reducers: {
    resetLearn: () => null,
    newLearn: {
      reducer: (state, action) => action.payload,
      prepare: (learn) => ({
        payload: {
          // id: FuseUtils.generateGUID(),
          bgImageUri: "",
          sponsor: "",
          title: "",
          level: "BEGINNER",
          reward: 100,
          deposits: [],
        },
      }),
    },
  },
  extraReducers: {
    [fetchLearnThunk.fulfilled]: (state, action) => action.payload,
    [saveLearnThunk.fulfilled]: (state, action) => action.payload,
    [removeLearn.fulfilled]: (state, action) => null,
  },
});

export const { newLearn, resetLearn } = LearnSlice.actions;

export default LearnSlice.reducer;
