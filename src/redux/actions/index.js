import {
  CREATE_BANNER,
  UPDATE_BANNER,
  BANNER_ID,
  DELETE_BANNER
} from "./actionsType.js";

export const createBannerA = (data) => ({
  type: CREATE_BANNER,
  data
});

export const updateBannerA = (data) => ({
  type: UPDATE_BANNER,
  data
});

export const chooseCurrentBannerA = (id) => ({
  type: BANNER_ID,
  id
});

export const deleteBannerA = (id) => ({
  type: DELETE_BANNER,
  id
});