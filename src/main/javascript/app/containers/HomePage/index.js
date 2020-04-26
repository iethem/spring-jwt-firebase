/**
 *
 * HomePage
 *
 */

import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Alert,
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
} from 'reactstrap';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectHomePage, {
  makeSelectUser,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getUser, saveUser } from './actions';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Email and Google as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export function HomePage({ user, loading, error, dispatch }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [isSignedIn, setSignedIn] = useState(false);
  const [bio, setBio] = useState(user.bio);

  useEffect(() => {
    // componentDidMount
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(firebaseUser => {
        setSignedIn(!!firebaseUser);
      });

    // componentWillUnmount
    return () => {
      unregisterAuthObserver();
    };
  }, []);

  useEffect(() => {
    if (isSignedIn) dispatch(getUser());
  }, [isSignedIn]);

  function onChangeBio(e) {
    const { value } = e.target;
    setBio(value);
  }

  function onSubmitForm(e) {
    e.preventDefault();

    const newUser = { ...user, bio };
    dispatch(saveUser(newUser));
  }

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>Home</NavbarBrand>
        {isSignedIn && (
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="danger" type="button" onClick={logout}>
                Logout
              </Button>
            </NavItem>
          </Nav>
        )}
      </Navbar>
      <Container className="mt-3" fluid>
        {loading ? (
          <Alert color="info">Loading...</Alert>
        ) : (
          <div>
            {isSignedIn ? (
              <>
                {error && <Alert color="danger">{error.message}</Alert>}
                <h3>
                  Welcome {firebase.auth().currentUser.displayName}! You are now
                  signed-in!
                </h3>
                <Form onSubmit={onSubmitForm}>
                  <FormGroup>
                    <Label for="name">Bio</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={user.bio}
                      onChange={onChangeBio}
                      autoComplete="name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" type="submit">
                      Save
                    </Button>
                  </FormGroup>
                </Form>
              </>
            ) : (
              <>
                <h5 className="text-center">Login:</h5>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);