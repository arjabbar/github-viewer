import React, { Component } from 'react';
import SearchMetadataBar from './SearchMetadataBar';
import LoadingContainer from './LoadingContainer';
import UserList from './UserList';
import 'whatwg-fetch';
let queryString = require("query-string");

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    let query = queryString.parse(props.location.search).query;
    this.state = {
      executedQuery: query,
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentWillReceiveProps(props) {
    let query = queryString.parse(props.location.search).query;
    if (query !== this.state.executedQuery) {
      this.setState({
        executedQuery: query
      }, this.fetchUsers);
    }
  }

  fetchUsers() {
    this.setState({
      loading: true
    });
    fetch(`https://api.github.com/search/users?q=${this.state.executedQuery}`)
      .then(response => response.json()).then(json => {
        this.setState({
          users: json.items,
          loading: false
        });
      });
  }
  
  render() {
    let { users, executedQuery, loading } = this.state;
    return (
      <LoadingContainer loading={loading}>
        <div className="user-search-results">
          <SearchMetadataBar numberOfMatches={users.length} executedQuery={executedQuery} />
          <UserList users={users}/>
        </div>
      </LoadingContainer>
      )
  }
}