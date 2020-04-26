import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { GET_USER, SAVE_USER } from './constants';
import { getUserFailure, getUserSuccess } from './actions';
import makeSelectHomePage from './selectors';

const requestUrl = 'api/user';

function* getUser() {
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestUrl, options);
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error));
  }
}

function* saveUser() {
  const { user } = yield select(makeSelectHomePage());
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: user.bio,
  };

  try {
    const response = yield call(request, requestUrl, options);
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error));
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(SAVE_USER, saveUser);
}