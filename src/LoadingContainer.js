import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { PropTypes } from "prop-types";

const LoadingContainer = props => {
  return (
    <Grid container
    className="loading-container"
    alignItems="center">
        {props.loading ? <CircularProgress style={{alignSelf: 'center'}} /> : props.children}
    </Grid>
  )
}

LoadingContainer.propTypes = {
  loading: PropTypes.bool
}

LoadingContainer.defaultProps = {
  loading: false
}

export default LoadingContainer;