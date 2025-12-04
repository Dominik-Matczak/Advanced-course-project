import React from 'react';
import { Button } from '@mui/material';
import { useDarkTheme } from '../hooks/useDarkTheme';

export function ThemeButton() {

  const { isDark, toggleTheme } = useDarkTheme();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={toggleTheme}
    >
      {isDark ? 'Dark' : 'Light'}
    </Button>
  );
}