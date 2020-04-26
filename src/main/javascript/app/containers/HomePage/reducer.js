/*
 *
 * HomePage reducer
 *
 */
import produce, { isDraft } from 'immer';
import {
  DEFAULT_ACTION,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SAVE_USER,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILURE,
} from './constants';

export const initialState = {
  user: { bio: '' },
  loading: false,
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_USER:
        draft.loading = true;
        draft.error = null;
        break;
      case GET_USER_SUCCESS:
        draft.user = action.user;
        draft.loading = false;
        break;
      case GET_USER_FAILURE:
        draft.error = action.error;
        draft.loading = false;
        break;
      case SAVE_USER:
        draft.user = action.user;
        draft.loading = true;
        draft.error = null;
        break;
      case SAVE_USER_SUCCESS:
        draft.loading = false;
        break;
      case SAVE_USER_FAILURE:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default homePageReducer;