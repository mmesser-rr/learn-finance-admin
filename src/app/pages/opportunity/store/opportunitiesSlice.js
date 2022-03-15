import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Sample data
const initialState = {
  searchText: '',
  opportunities: [
    {
      id: '1',
      title: 'Learn Bit Farming',
      subTitle: '',
      organization: {
        name: 'NFL',
      },
      webSiteUrl: '',
      location: {
        name: 'Rams Training Facility',
        address1: '',
        address2: '',
        city: 'Los Angeles',
        state: 'CA',
        zip: '',
        country: '',
      },
      details: '',
      tldr: '',
      cost: '50',
      costType: 'USD',
      startDateTime: '2022-04-23T18:25:43.511Z',
      endDateTime: '2022-04-23T18:25:43.511Z',
      timezone: 'America/Los Angeles',
      eventType: '',
      attendanceType: '',
      categories: ['Crypto, NFT, Finance'],
      tags: ['canvas-print', 'nature'],
      seatsTotal: 100,
      seatsReserved: 43,
      isPrivate: false,
      status: 'pending',
      creator: {
        displayName: '',
      },
      reward: '100',

      name: 'A Walk Amongst Friends - Canvas Print',
      handle: 'a-walk-amongst-friends-canvas-print',
      description:
        'Officia amet eiusmod eu sunt tempor voluptate laboris velit nisi amet enim proident et. Consequat laborum non eiusmod cillum eu exercitation. Qui adipisicing est fugiat eiusmod esse. Sint aliqua cupidatat pariatur mollit ad est proident reprehenderit. Eiusmod adipisicing laborum incididunt sit aliqua ullamco.',
      featuredImageId: '1',
      images: [
        {
          id: '0',
          url: 'assets/images/ecommerce/a-walk-amongst-friends.jpg',
          type: 'image',
        },
        {
          id: '1',
          url: 'assets/images/ecommerce/braies-lake.jpg',
          type: 'image',
        },
        {
          id: '2',
          url: 'assets/images/ecommerce/fall-glow.jpg',
          type: 'image',
        },
        {
          id: '3',
          url: 'assets/images/ecommerce/first-snow.jpg',
          type: 'image',
        },
        {
          id: '4',
          url: 'assets/images/ecommerce/lago-di-braies.jpg',
          type: 'image',
        },
        {
          id: '5',
          url: 'assets/images/ecommerce/lago-di-sorapis.jpg',
          type: 'image',
        },
        {
          id: '6',
          url: 'assets/images/ecommerce/never-stop-changing.jpg',
          type: 'image',
        },
        {
          id: '7',
          url: 'assets/images/ecommerce/reaching.jpg',
          type: 'image',
        },
        {
          id: '8',
          url: 'assets/images/ecommerce/morain-lake.jpg',
          type: 'image',
        },
        {
          id: '9',
          url: 'assets/images/ecommerce/yosemite.jpg',
          type: 'image',
        },
      ],
      priceTaxExcl: 9.309,
      priceTaxIncl: 10.24,
      taxRate: 10,
      comparedPrice: 19.9,
      quantity: 3,
      sku: 'A445BV',
      width: '22cm',
      height: '24cm',
      depth: '15cm',
      weight: '3kg',
      extraShippingFee: 3.0,
      active: true,
    },
    {
      id: '2',
      title: 'Real Estate 101',
      subTitle: '',
      organization: {
        name: 'NFL',
      },
      webSiteUrl: '',
      location: {
        name: '',
        address1: '',
        address2: '',
        city: 'Los Angeles',
        state: 'CA',
        zip: '',
        country: '',
      },
      details: '',
      tldr: '',
      cost: '50',
      costType: 'USD',
      startDateTime: '2022-06-23T18:25:43.511Z',
      endDateTime: '2022-06-23T18:25:43.511Z',
      timezone: 'America/Los Angeles',
      eventType: '',
      attendanceType: '',
      categories: ['Real Estate', 'Franchise'],
      tags: ['canvas-print', 'nature'],
      seatsTotal: 100,
      seatsReserved: 43,
      isPrivate: false,
      status: 'active',
      creator: {
        displayName: '',
      },
      reward: '100',

      name: 'Braies Lake - Canvas Print',
      handle: 'braies-lake-canvas-print',
      description:
        'Duis anim est non exercitation consequat. Ullamco ut ipsum dolore est elit est ea elit ad fugiat exercitation. Adipisicing eu ad sit culpa sint. Minim irure Lorem eiusmod minim nisi sit est consectetur.',
      featuredImageId: '2',
      images: [
        {
          id: '0',
          url: 'assets/images/ecommerce/a-walk-amongst-friends.jpg',
          type: 'image',
        },
        {
          id: '1',
          url: 'assets/images/ecommerce/braies-lake.jpg',
          type: 'image',
        },
        {
          id: '2',
          url: 'assets/images/ecommerce/fall-glow.jpg',
          type: 'image',
        },
        {
          id: '3',
          url: 'assets/images/ecommerce/first-snow.jpg',
          type: 'image',
        },
        {
          id: '4',
          url: 'assets/images/ecommerce/lago-di-braies.jpg',
          type: 'image',
        },
        {
          id: '5',
          url: 'assets/images/ecommerce/lago-di-sorapis.jpg',
          type: 'image',
        },
        {
          id: '6',
          url: 'assets/images/ecommerce/never-stop-changing.jpg',
          type: 'image',
        },
        {
          id: '7',
          url: 'assets/images/ecommerce/reaching.jpg',
          type: 'image',
        },
        {
          id: '8',
          url: 'assets/images/ecommerce/morain-lake.jpg',
          type: 'image',
        },
        {
          id: '9',
          url: 'assets/images/ecommerce/yosemite.jpg',
          type: 'image',
        },
      ],
      priceTaxExcl: 22.381,
      priceTaxIncl: 24.62,
      taxRate: 10,
      comparedPrice: 29.9,
      quantity: 92,
      sku: 'A445BV',
      width: '22cm',
      height: '24cm',
      depth: '15cm',
      weight: '3kg',
      extraShippingFee: 3.0,
      active: true,
    },
  ],
};

export const getOpportunities = createAsyncThunk(
  'adminApp/opportunties/getOpportunities',
  async () => {
    const response = initialState.opportunities;
    console.log('getOpportunities => ', response);
    // const data = await response.data;
    const data = response;
    return data;
  }
);

export const opportunitiesSlice = createSlice({
  name: 'opportunities',
  initialState,
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
});

// export const selectOpportunities = (state) => state.opportunities;
export const selectSearchText = (state) => state;

export const { setSearchText } = opportunitiesSlice.actions;

export default opportunitiesSlice.reducer;
