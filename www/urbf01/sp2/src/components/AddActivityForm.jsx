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

export const AddActivityForm = () => {
  const [formState, setFormState] = useState({
    isSubmitting: false,
  });

  const [activity, setActivity] = useState({
    name: '',
    sport_type: '',
    start_date_local: dayjs(),
    elapsed_time: '',
    description: '',
    distance: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActivity((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        <form onSubmit={handleSubmit} id='addActivityForm'>
          <Box sx={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              onChange={handleInputChange}
              name='name'
              value={activity.name}
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
                value={activity.sport_type}
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  required
                  className='dateTimePicker'
                  name='start_date_local'
                  value={dayjs(activity.start_date_local)}
                  label='Start Date and Time'
                />
              </DemoContainer>
            </LocalizationProvider>

            <TextField
              onChange={handleInputChange}
              name='distance'
              value={activity.distance}
              id='outlined-basic'
              label='Distance in Meters'
              variant='outlined'
            />

            <TextField
              required
              onChange={handleInputChange}
              name='elapsed_time'
              value={activity.elapsed_time}
              id='outlined-basic'
              label='Elapsed Time in Seconds'
              variant='outlined'
            />

            <TextField
              onChange={handleInputChange}
              name='description'
              value={activity.description}
              label='Description'
              rows={3}
              placeholder="How'd it go?"
              variant='outlined'
              multiline
            />

            <Button type='submit' variant='contained' color='success' sx={{ width: '300px' }}>
              Create
            </Button>
          </Box>
        </form>
      )}
    </>
  );
};
