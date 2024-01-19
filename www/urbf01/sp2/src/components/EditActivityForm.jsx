import { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  Alert,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { fetchActivityData, updateActivity } from '../service/apiService';

export const EditActivityForm = () => {
  const [formState, setFormState] = useState({
    isSubmitting: false,
  });
  const [activity, setActivity] = useState({
    name: '',
    sport_type: '',
    description: '',
  });

  useEffect(() => {
    const fetchActivity = async () => {
      const pathname = window.location.pathname;
      const id = pathname.split('/').slice(-1)[0];
      const activity = await fetchActivityData(id);
      setActivity(activity);
    };

    fetchActivity();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActivity((prevState) => ({
      ...prevState,
      [name]: value ? value : '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setTimeout(() => {
      setFormState({ isSubmitting: false });
    }, 3000);
    setFormState({ isSubmitting: true });

    updateActivity(activity);
  };

  return (
    <>
      {formState.isSubmitting === true && (
        <Alert variant='outlined' severity='success' sx={{ maxWidth: 'calc(500px - 34px)' }}>
          Activity was sucessfully updated.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            onChange={handleInputChange}
            name='name'
            value={activity.name ? activity.name : ''}
            disabled={formState.isSubmitting}
            id='outlined-basic'
            label='Activity Name'
            variant='outlined'
          />

          <FormControl fullWidth sx={{ pt: 1 }}>
            <InputLabel id='demo-simple-select-label'>Sport type</InputLabel>
            <Select
              required
              onChange={handleInputChange}
              name='sport_type'
              value={activity.sport_type ? activity.sport_type : ''}
              disabled={formState.isSubmitting}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              size='small'
              label='Sport Type'
            >
              <MenuItem value={'Run'}>Run</MenuItem>
              <MenuItem value={'TrailRun'}>Trail Run</MenuItem>
              <MenuItem value={'Walk'}>Walk</MenuItem>
              <MenuItem value={'Hike'}>Hike</MenuItem>
              <MenuItem value={'VirtualRun'}>Virtual Run</MenuItem>
              <MenuItem value={'Ride'}>Ride</MenuItem>
              <MenuItem value={'VirtualRide'}>Virtual Ride</MenuItem>
              <MenuItem value={'MountainBikeRide'}>Mountain Bike Ride</MenuItem>
              <MenuItem value={'Golf'}>Golf</MenuItem>
              <MenuItem value={'Swim'}>Swim</MenuItem>
              <MenuItem value={'Yoga'}>Yoga</MenuItem>
              <MenuItem value={'Workout'}>Workout</MenuItem>
              <MenuItem value={'Crossfit'}>Crossfit</MenuItem>
              <MenuItem value={'Soccer'}>Soccer</MenuItem>
              <MenuItem value={'Tennis'}>Tennis</MenuItem>
              <MenuItem value={'Squash'}>Squash</MenuItem>
              <MenuItem value={'Badminton'}>Badminton</MenuItem>
              <MenuItem value={'TableTennis'}>Table Tennis</MenuItem>
            </Select>
          </FormControl>

          <TextField
            onChange={handleInputChange}
            name='description'
            value={activity.description ? activity.description : ''}
            disabled={formState.isSubmitting}
            label='Description'
            rows={3}
            placeholder="How'd it go?"
            variant='outlined'
            multiline
          />

          <Button
            type='submit'
            variant='contained'
            color='success'
            disabled={formState.isSubmitting}
            sx={{ width: '300px' }}
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};
