import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      users: [ ],
      sort: 'recent'
    };
  }

  componentDidMount() {
    this.getRecent();
  }

  getRecent() {
    let recentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    axios.get(recentUrl)
      .then((res) => {
        return this.setState({
          users: res.data, 
          sort: 'recent'
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAlltime() {
    let alltimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
    axios.get(alltimeUrl)
      .then((res) => {
        return this.setState({
          users: res.data,
          sort: 'alltime' 
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="leaderboard__wrapper" role="main">
          <h2 className="leaderboard__title">
            FCC Leaderboard - { this.state.sort === 'recent' ? 'Top Recent' : 'All time' } 
          </h2>
          <Header sortByAlltime={this.getAlltime.bind(this)} sortByRecent={this.getRecent.bind(this)} sort={this.state.sort} />
          <User users={this.state.users} />
        </div>
      </div>
    );
  }

}

class Header extends Component {

  render() {
    return (
      <div className="leaderboard-header__wrapper">
        <div className="leaderboard-header__item leaderboard-header__rank">Ranking</div>
        <div className="leaderboard-header__item">Username</div>
        <div className="leaderboard-header__item leaderboard-header__item--points" onClick={ this.props.sortByRecent }>Points in past 30 days { this.props.sort === 'recent' ? '▼' : '' }</div>
        <div className="leaderboard-header__item leaderboard-header__item--points" onClick={ this.props.sortByAlltime }>All time points { this.props.sort === 'alltime' ? '▼' : '' }</div>
      </div>
    );
  }
}  

class User extends Component {

  render() {
    return (
      <div>
        { this.props.users.map((user, index) => { 
            return (
              <div className="leaderboard-user__wrapper" key={ user.username + index }>
                <div className="leaderboard-user__avatar-wrapper">
                  <img className="leaderboard-user__info leaderboard-user__avatar" src={ user.img } alt="img for user { user.username }"/>
                  <div className="leaderboard-user__info leaderboard-user__ranking"> { index + 1 } </div>
                </div>
                <div className="leaderboard-user__info"> { user.username } </div>
                <div className="leaderboard-user__info"> { user.recent } </div>
                <div className="leaderboard-user__info"> { user.alltime } </div>        
              </div>
            );
          })
        }
      </div>
    );
  }
}  

export default App;
