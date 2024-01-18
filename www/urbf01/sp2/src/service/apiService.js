import axios from 'axios';

const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;
const ACCESS_TOKEN = localStorage.getItem('stravaAccessToken');
const API_BASE_URL = 'https://www.strava.com/api/v3';
const AUTH_URL = 'https://www.strava.com/oauth/token';

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// AUTH
export const stravaAuth = async (code) => {
  try {
    const response = await axios.post(AUTH_URL, {
      client_id: REACT_APP_CLIENT_ID,
      client_secret: REACT_APP_CLIENT_SECRET,
      code: code,
      grant_type: 'authorization_code',
    });

    return response.data.access_token;
  } catch (error) {
    throw error;
  }
};

// GET ATHLETE DATA
export const fetchAthleteData = async () => {
  try {
    const response = await apiService.get('/athlete', {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    localStorage.setItem('athlete', JSON.stringify(response.data));
  } catch (error) {
    throw error;
  }
};

// GET ACTIVITIES DATA
export const fetchActivitiesData = async () => {
  const per_page = localStorage.getItem('per_page');

  try {
    const response = await apiService.get('/athlete/activities', {
      params: {
        per_page: per_page ? per_page : 10,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    localStorage.setItem('activities', JSON.stringify(response.data));
  } catch (error) {
    throw error;
  }
};

// POST NEW ACTIVITY
export const postNewActivity = async (activity) => {
  try {
    const response = await apiService.post('/activities', activity, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
