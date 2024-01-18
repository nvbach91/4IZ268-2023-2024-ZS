import {
  Typography,
  Box,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect } from 'react';

export const Settings = () => {
  useEffect(() => {
    localStorage.setItem('per_page', 5);
  }, []);

  return (
    <Paper sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography variant='h4' component='h2'>
        Settings
      </Typography>

      <Box>
        <Typography variant='h5' component='h3'>
          My Account
        </Typography>
        <form>
          <TextField type='text' label='Name' variant='outlined' />
          <br />
          <TextField type='text' label='Birthday' variant='outlined' />
          <br />
          <TextField type='text' label='Gender' variant='outlined' />
          <FormControl fullWidth sx={{ pt: 1 }}>
            <InputLabel id='gender-select-label'>Gender</InputLabel>
            <Select
              size='small'
              labelId='gender-select-label'
              id='demo-simple-select'
              name='gender'
              label='Gender'
            >
              <MenuItem value={'Man'}>Man</MenuItem>
              <MenuItem value={'Woman'}>Woman</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField type='number' label='Weight' variant='outlined' />
          <br />
          <Button type='submit' variant='contained'>
            Save Changes
          </Button>
        </form>
      </Box>

      <Box>
        <Typography variant='h5' component='h3'>
          App Settings
        </Typography>
        <form>
          <TextField type='text' label='Activities per page' variant='outlined' />
          <br />
          <Button type='submit' variant='contained'>
            Save Changes
          </Button>
        </form>
      </Box>
    </Paper>
  );
};
