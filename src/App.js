import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();


class App extends Component {
  constructor() {
    super();

    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      savedAlbums: [],
      savedImageUrls: [],
      topTracks: [],
      topImageUrls: [],
      topArtists: [],
      topArtistsImageUrls: [],
      savedTracks: [],
      savedTracksImageUrls: []
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    // console.log(hashParams)
    return hashParams;
  }

  getMySavedAlbums() {
    spotifyWebApi.getMySavedAlbums()
      .then(res => {
        // console.log(res)
        this.setState({
          savedAlbums: res.items,
          savedImageUrls: res.items.map(item => {
            return item.album.images[0].url
          }),
        })
      })
  }

  createAlbumLinks() {
    // console.log(this.state)
    let albumLinkArray = this.state.savedImageUrls.map((image, index) => {
      return <Link to={`/${index}`}><img style={{ width: '10vw' }} src={image}></img></Link>
    })
    return albumLinkArray
  }

  createSavedInfoRoutes() {
    // console.log(this.state.albums)
    let routeArray = this.state.savedAlbums.map((albumInfo, index) => {
      return (
        <Route path={`/${index}`} exact render={() => {
          return (
            <div className="popup">
            <p className="popup-text">{albumInfo.album.name} - {albumInfo.album.artists[0].name}</p>
            </div>
          )
        }}>
        </Route>
      )
    })
    return routeArray;
  }

  getMyTopTracks() {
    spotifyWebApi.getMyTopTracks()
      .then(res => {
        // console.log(res)
        this.setState({
          topTracks: res.items,
          topImageUrls: res.items.map(item => {
            return item.album.images[0].url
          })
        })
      })
  }

  createTopLinks() {
    let linkArray = this.state.topImageUrls.map((image, index) => {
      return <Link to={`/${index + 20}`}><img style={{ width: '10vw' }} src={image}></img></Link>
    })
    return linkArray
  }

  createTopInfoRoutes() {
    // console.log(this.state.topTracks)
    let routeArray = this.state.topTracks.map((trackInfo, index) => {
      return (
        <Route path={`/${index + 20}`} exact render={() => {
          return (
            <div className="popup">
              <p className="popup-text">{trackInfo.album.name} - {trackInfo.album.artists[0].name}</p>
            </div>
          )
        }}>
        </Route>
      )
    })
    return routeArray;
  }

  getMySavedTracks() {
    spotifyWebApi.getMySavedTracks()
      .then(res => {
        console.log(res)
        this.setState({
          savedTracks: res.items,
          savedTracksImageUrls: res.items.map(item => {
            return item.track.album.images[0].url
          })
        })
      })
  }

  createSavedTracksLinks() {
    let linkArray = this.state.savedTracksImageUrls.map((image, index) => {
      return <Link to={`/${index + 40}`}><img style={{ width: '10vw' }} src={image}></img></Link>
    })
    return linkArray
  }

  createSavedTracksRoutes() {
    console.log(this.state.savedTracks)
    let routeArray = this.state.savedTracks.map((trackInfo, index) => {
      return (
        <Route path={`/${index + 40}`} exact render={() => {
          return (
            <div className='popup'>
              <p className="popup-text">{trackInfo.track.album.name} - {trackInfo.track.album.artists[0].name}</p>
            </div>
          )
        }}>
        </Route>
      )
    })
    return routeArray;
  }

  getMyRecentlyPlayed() {
    spotifyWebApi.getMyRecentlyPlayedTracks()
      .then(res => {
        console.log(res)
        // this.setState({
        //   topArtists: res.items,
        //   topArtistsImageUrls: res.items.map(item => {
        //     return item.images[1].url
        //   })
        // })
      })
  }

  render() {
    if (this.state.loggedIn) {

      return (
        <div className="App">
          <button onClick={() => {
            this.getMySavedAlbums()
            this.getMyTopTracks()
            this.getMySavedTracks()
            // this.getMyRecentlyPlayed()
          }}>
            Record Covers!
          </button>
          <div>
            <Router>
              {this.createTopLinks()}
              {this.createTopInfoRoutes()}
              {this.createSavedTracksLinks()}
              {this.createSavedTracksRoutes()}
              {this.createAlbumLinks()}
              {this.createSavedInfoRoutes()}
            </Router>
          </div>
        </div>
      );
    } else {
      return (
        <div className='App'>
          <a href="http://arch.finityllc.com:8888/">
            <button>Login to Spotify</button>
          </a>
        </div>
      )
    }
  }
}

export default App;
