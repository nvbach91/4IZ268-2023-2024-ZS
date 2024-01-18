import { useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { stravaAuth } from '../service/apiService';

export const StravaAuth = () => {
  const { login } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');

      const accessToken = await stravaAuth(code);
      login(accessToken);
      window.location.href = '/';
    };

    authenticate();
  });

  return (
    <div>
      <h1>Strava Authentication Callback</h1>
      <p>Processing authentication...</p>
    </div>
  );
};
