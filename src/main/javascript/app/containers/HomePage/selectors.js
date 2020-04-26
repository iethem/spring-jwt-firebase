import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

const makeSelectUser = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.user,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.error,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectUser,
  makeSelectLoading,
  makeSelectError,
};