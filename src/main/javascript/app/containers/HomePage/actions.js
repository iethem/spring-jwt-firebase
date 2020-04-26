/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SAVE_USER,
  SAVE_USER_FAILURE,
  SAVE_USER_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function getUserFailure(error) {
  return {
    type: GET_USER_FAILURE,
    error,
  };
}

export function saveUser(user) {
  return {
    type: SAVE_USER,
    user,
  };
}

export function saveUserSuccess() {
  return {
    type: SAVE_USER_SUCCESS,
  };
}

export function saveUserFailure(error) {
  return {
    type: SAVE_USER_FAILURE,
    error,
  };
}