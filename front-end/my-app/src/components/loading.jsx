import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Stack sx={{ color: 'grey.500', marginX: 'auto', marginY: 'auto' }} spacing={20} direction="row">
      <CircularProgress color="success" />
    </Stack>
  );
}