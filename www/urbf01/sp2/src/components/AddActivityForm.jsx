import { useState } from 'react';
import {
  Button,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { postNewActivity } from '../service/apiService';
import { useDebouncedCallback } from 'use-debounce';

export const AddActivityForm = () => {
  const [formState, setFormState] = useState({
    isSubmitting: false,
  });

  const [activity, setActivity] = useState({
    name: '',
    sport_type: 'Run',
    start_date_local: dayjs(),
    elapsed_time: '',
    description: '',
    distance: '',
  });

  const debounced = useDebouncedCallback((event) => {
    const { value, name } = event.target;
    setActivity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, 500);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      setFormState({ isSubmitting: false });
    }, 3000);
    setFormState({ isSubmitting: true });

    // format date time
    const dateTimePicker = document.querySelector('.dateTimePicker input');
    activity.start_date_local = dayjs(dateTimePicker.value).toISOString();
    const response = await postNewActivity(activity);
    const activityId = response.id;
    window.location = `/activities/${activityId}`;
  };

  return (
    <>
      {formState.isSubmitting === true && (
        <Alert variant='outlined' severity='success' sx={{ maxWidth: 'calc(500px - 34px)' }}>
          New activity was sucessfully created.
        </Alert>
      )}

      {formState.isSubmitting !== true && (
        <form onSubmit={handleSubmit}>
          <Box sx={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              autoComplete='true'
              onChange={(e) => debounced(e)}
              name='name'
              defaultValue={activity.name}
              label='Activity Name'
              variant='outlined'
            />

            <FormControl fullWidth sx={{ pt: 1 }}>
              <InputLabel id='sport-type-label'>Sport type</InputLabel>
              <Select
                required
                labelId='sport-type-label'
                onChange={(e) => debounced(e)}
                name='sport_type'
                size='small'
                value={activity.sport_type}
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  required
                  className='dateTimePicker'
                  name='start_date_local'
                  defaultValue={dayjs(activity.start_date_local)}
                  label='Start Date and Time'
                />
              </DemoContainer>
            </LocalizationProvider>

            <TextField
              onChange={(e) => debounced(e)}
              name='distance'
              defaultValue={activity.distance}
              label='Distance in Meters'
              variant='outlined'
            />

            <TextField
              required
              onChange={(e) => debounced(e)}
              name='elapsed_time'
              defaultValue={activity.elapsed_time}
              label='Elapsed Time in Seconds'
              variant='outlined'
            />

            <TextField
              id='description'
              onChange={(e) => debounced(e)}
              name='description'
              defaultValue={activity.description}
              label='Description'
              rows={3}
              placeholder="How'd it go?"
              multiline
            />

            <Button type='submit' variant='contained' color='success'>
              Create
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};
