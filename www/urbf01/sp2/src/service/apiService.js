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
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET ACTIVITIES DATA
export const fetchActivitiesData = async (perPage = 10, page = 1) => {
  const per_page = localStorage.getItem('per_page');

  try {
    const response = await apiService.get('/athlete/activities', {
      params: {
        page: page,
        per_page: per_page ? per_page : perPage,
      },
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    localStorage.setItem('test', JSON.stringify(response));
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET ACTIVITY DATA
export const fetchActivityData = async (id) => {
  try {
    const response = await apiService.get(`/activities/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data;
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

// UPDATE ACTIVITY
export const updateActivity = async (activity) => {
  try {
    const response = await apiService.put(`/activities/${activity.id}`, activity, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// UPDATE ATHLETE
export const updateAthlete = async (athlete) => {
  try {
    const response = await apiService.put('/athlete', athlete, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
