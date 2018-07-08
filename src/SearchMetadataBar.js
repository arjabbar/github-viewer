import { AppBar, Toolbar, Button, StepButton, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { PropTypes } from "prop-types";

const SearchMetadataBar = ({numberOfMatches, executedQuery}) => executedQuery && (
  <AppBar color="default" position="static"
      className="search-metadata">
    <Toolbar>
      <Typography variant="subheading">
        Showing top {numberOfMatches} matches for "{executedQuery}"
      </Typography>
    </Toolbar>
  </AppBar>
);

SearchMetadataBar.propTypes = {
  numberOfMatches: PropTypes.number.isRequired,
  executedQuery: PropTypes.string
}

export default SearchMetadataBar;