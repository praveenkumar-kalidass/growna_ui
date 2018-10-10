import Api from "../Api/Friends";
import {LOAD_FRIENDS_LIST} from "../Constants/ActionTypes";

const getAllFriends = () => (dispatch) => {
  Api.getAllFriends().then((response) => {
    dispatch(loadFriendsList(response.data));
  });
};

const loadFriendsList = (friends) => ({
  type: LOAD_FRIENDS_LIST,
  friends
});

export {
  getAllFriends,
  loadFriendsList
};
