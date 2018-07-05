import React, { Component } from 'react';
import './App.css';
import logo from './logo.gif';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      keyword: 'aj',
    }
  }
  
  componentDidMount() {
   this.loadUsers();
  }

  loadUsers = () => {
    axios.get('https://api.github.com/search/users?q=' + this.state.keyword).then(res => {
      this.setState({users: res.data.items, loading: false});
     
    })
  }

  changeUserInput = e => {
    console.log(e.target.value);
    this.setState({keyword: e.target.value});
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
                <input onChange={this.changeUserInput.bind(this)} value={this.state.keyword} type="text" placeholder="Search for anything on Github"/>
                <div>
                  <div>
                    <span>Search by</span> 
                    <button onClick={this.loadUsers}>User</button>
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
