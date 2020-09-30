import * as types from "../actions/actionTypes";

const initialState = {
  userPin: {
    visible: false,
    position: {
      latitude: 53.551086,
      longitude: 9.993682
    }
  },
  proposals: [],
  popularHashtags: {},
  pinMode: false,
  themeMode: true,
  showConfirmation: false,
  city: "",
};

const map = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_PIN_VISIBILITY:
      return {
        ...state,
        userPin: {
          ...state.userPin,
          visible: action.data
        }
      };

    case types.UPDATE_PIN_POSITION:
      return {
        ...state,
        userPin: {
          ...state.userPin,
          position: {
            latitude: action.lat,
            longitude: action.long
          }
        }
      };

    case types.ADD_PROPOSAL_DETAILS:
      return {
        ...state,
        proposals: [...state.proposals, action.proposal]
      };

    case types.SET_PIN_MODE:
      return {
        ...state,
        pinMode: action.pinMode
      };

    case types.SET_THEME_MODE:
      return {
        ...state,
        themeMode: action.mode
      };

    case types.UPDATE_POPULAR_HASHTAGS:
      return {
        ...state,
        popularHashtags: action.hashtags
      };

    case types.SET_CITY:
      return {
        ...state,
        city: action.city,
      };

    case types.RESET_MAP:
      return initialState;

    case types.TOGGLE_CONFIRMATION:
      return {
        ...state,
        showConfirmation: action.value
      };

    default:
      return state;
  }
};

export default map;
