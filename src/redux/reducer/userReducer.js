import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: ""
  },
  isAuthenticated: false
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.data?.token,
          // refresh_token: action?.payload?.data?.refresh_token,
          username: action?.payload?.data?.username,
          image: action?.payload?.data?.avatar,
          role: action?.payload?.data?.roles
        },
        isAuthenticated: true
      };

    default:
      return state;
  }
};

export default userReducer;
