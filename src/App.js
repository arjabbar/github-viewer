import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';
import "whatwg-fetch";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    }
  }
  
  componentDidMount() {
    fetch('https://api.github.com/search/users?q=aj')
      .then(response => response.json())
      .then(results => this.setState({
        users: results.items,
        loading: false
      }));
  }

  render() {
    let userList = null;
    if (this.state.loading) {
      userList = <div>Loading...</div>
    } else {
      userList = this.state.users.map(user => {
        return (
          <div>{user.login}</div>
        )
      });
    }

    return (
      <div className="App">
        <div className="">
          <header className="callout App-intro">
            <div className="grid-x align-middle">
              <div className="small-2 cell">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Github Viewer</h1>
              </div>
              <div className="small-4 small-offset-2 cell grid-y">
                <input className="small-4 cell" type="text" placeholder="Search for anything on Github"/>
                <div className="small-4 cell">
                  <div className="buttonGroup grid-x align-middle align-center">
                    <span className="small-2">Search by</span> 
                    <button className="button small-3">User</button>
                    <button className="button small-3">Repo</button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div className="user-list">
            {userList}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
