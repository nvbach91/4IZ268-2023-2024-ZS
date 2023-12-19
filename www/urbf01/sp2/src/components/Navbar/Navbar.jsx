import { Button, Box } from '@mui/material';
import './style.css';
import { grey } from '@mui/material/colors';

const pages = ['Aktivity', 'Cíle', 'Statistiky'];

export const Navbar = () => {
  return (
    <nav>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: grey[100],
          px: 2,
          py: 1,
          height: '60px',
        }}
      >
        <img src='./images/logo.svg' style={{ width: '140px' }} alt='Strarmin' />
        <Box sx={{ display: 'flex', gap: '20px' }}>
          {pages.map((page) => (
            <Button key={page} sx={{ my: 2, color: 'black', display: 'block' }}>
              {page}
            </Button>
          ))}
        </Box>
        <Button size='small' color='error' variant='outlined'>
          Odhlásit se
        </Button>
      </Box>
    </nav>
  );
};
