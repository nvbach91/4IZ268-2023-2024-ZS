import { useEffect, useState } from 'react';
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

export const ActivityForm = () => {
  const [isSubmitted, setSubmitted] = useState(false);
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

    // format date time
    activity.start_date_local = dayjs(activity.start_date_local).toISOString();

    postNewActivity(activity);
    setSubmitted(true);
  };

  useEffect(() => {
    const activityForm = document.querySelector('#addActivityForm');
    activityForm.reset();
  }, [isSubmitted]);

  return (
    <>
      {isSubmitted && (
        <Alert variant='outlined' severity='success'>
          New activity was sucessfully created.
        </Alert>
      )}
      <form onSubmit={handleSubmit} id='addActivityForm'>
        <Box sx={{ my: 4, maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            required
            onChange={handleInputChange}
            value={activity.name}
            id='outlined-basic'
            label='Activity Name'
            name='name'
            variant='outlined'
          />

          <FormControl fullWidth sx={{ pt: 1 }}>
            <InputLabel id='demo-simple-select-label'>Sport type</InputLabel>
            <Select
              required
              onChange={handleInputChange}
              value={activity.sport_type}
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              name='sport_type'
              size='small'
              label='Sport Type'
            >
              <MenuItem value={'Run'}>Run</MenuItem>
              <MenuItem value={'Bike'}>Bike</MenuItem>
              <MenuItem value={'Swim'}>Swim</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                required
                onChange={handleInputChange}
                value={dayjs(activity.start_date_local)}
                label='Start Date and Time'
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            onChange={handleInputChange}
            value={activity.distance}
            id='outlined-basic'
            label='Distance in Meters'
            name='distance'
            variant='outlined'
          />

          <TextField
            required
            onChange={handleInputChange}
            value={activity.elapsed_time}
            id='outlined-basic'
            label='Elapsed Time in Seconds'
            name='elapsed_time'
            variant='outlined'
          />

          <TextField
            onChange={handleInputChange}
            value={activity.description}
            name='description'
            label='Description'
            rows={3}
            placeholder="How'd it go?"
            variant='outlined'
            multiline
          />

          <Button type='submit' variant='contained'>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};
