// Define your client ID and client secret
const client_id = 'd60be0481a8f49e28c8d4e03363ca7a8';
const client_secret = 'dedb26f403f34a0c9cc2d336376960c7';

// Function to obtain an access token
async function getAccessToken() {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
      },
      body: 'grant_type=client_credentials'
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Function to search tracks
async function searchTracks(query, accessToken) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
}

// Function to get track's audio features
async function getTrackFeatures(id, accessToken) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting track features:', error);
    throw error;
  }
}

// Function to get user's top tracks
async function getTopTracks(accessToken) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error getting top tracks:', error);
    throw error;
  }
}

// Export functions to be used in other files
window.spotifyAPI = {
  getAccessToken,
  searchTracks,
  getTrackFeatures,
  getTopTracks
};


// console.log(window.spotifyAPI);