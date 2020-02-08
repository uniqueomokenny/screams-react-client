import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';

import MyButton from '../util/MyButton';

function Navbar({ authenticated }) {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {authenticated ? (
          <>
            <MyButton tip='Create a scream!'>
              <AddIcon />
            </MyButton>

            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon />
              </MyButton>
            </Link>

            <MyButton tip='Notifications'>
              <NotificationsIcon />
            </MyButton>
          </>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/'>
              Home
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
