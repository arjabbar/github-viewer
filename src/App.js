import React, { Component } from 'react';
import "whatwg-fetch";
import './App.css';
import logo from './logo.gif';

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
      userList = <div>Loading</div>;
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
          <header className="App-intro">
            <div>
              <div>
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Github Viewer</h1>
              </div>
              <div>
                <input type="text" placeholder="Search for anything on Github"/>
                <div>
                  <div>
                    <span>Search by</span> 
                    <button>User</button>
                    <button>Repo</button>
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
