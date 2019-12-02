# spotify-api-ui-pattern

## instructions to run the app:
1. once the repo has bee cloned
1. in a bash session, run the command `nodemon auth-server/authorization_code/app.js`
1. in another session, `cd client/src`, followed by `npm run start`
1. Once the react app is open in the browser, login into spotify. 
1. The albums listed are from 3 functions from the Spotify-WebAPI-JS library
 - `getMyTopTracks()`, `getMySavedTracks()`, and `getMySavedAlbums()`
1. The app is retreiving those items from your spotify account. 