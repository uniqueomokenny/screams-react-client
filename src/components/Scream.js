import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import MyButton from '../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

function Scream(props) {
  const {
    classes,
    scream: {
      userImage,
      body,
      createdAt,
      userHandle,
      screamId,
      likeCount,
      commentCount
    },
    user
  } = props;

  dayjs.extend(relativeTime);

  const likedScream = () => {
    if (user.likes && user.likes.find(like => like.screamId === screamId)) {
      return true;
    } else return false;
  };

  const likeScream = () => props.likeScream(screamId);

  const unlikeScream = () => props.unlikeScream(screamId);

  const likeButton = !user.authenticated ? (
    <MyButton tip='Like'>
      <Link to='/login'>
        <FavoriteBorderIcon color='primary' />
      </Link>
    </MyButton>
  ) : likedScream() ? (
    <MyButton tip='Unlike' onClick={unlikeScream}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likeScream}>
      <FavoriteBorderIcon color='primary' />
    </MyButton>
  );

  const deleteButton = user.authenticated &&
    userHandle === user.credentials.handle && (
      <DeleteScream screamId={screamId} />
    );

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='Profile image'
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant='h5'
          color='primary'
          component={Link}
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant='body1' color='textSecondary'>
          {body}
        </Typography>
        {likeButton}
        <span>{likeCount} Likes</span>

        <MyButton tip='Comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{commentCount} Comments</span>
        <ScreamDialog screamId={screamId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scream));
