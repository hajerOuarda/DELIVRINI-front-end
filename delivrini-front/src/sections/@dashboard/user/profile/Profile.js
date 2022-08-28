import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfileFollowInfo from './ProfileFollowInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  myProfile: PropTypes.object,
  posts: PropTypes.array,
};

export default function Profile({ myProfile, posts }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
        </Stack>
      </Grid>
    </Grid>
  );
}
