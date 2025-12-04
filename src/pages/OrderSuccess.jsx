import React from 'react';
import { Box, Container, Paper, Typography, Button } from '@mui/material';

import { Link } from 'react-router-dom';

/**
 * Komponent wyświetlający informację o pomyślnym złożeniu zamówienia.
 * Oferuje ładną wizualizację i opcję powrotu do strony głównej.
 */
export default function OrderSuccess() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}> {/* mt: margin top dla odstępu od góry */}
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, // Padding
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          textAlign: 'center',
          borderRadius: '12px', // Zaokrąglone rogi dla lepszego wyglądu
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Delikatny cień
        }}
      >
        
        <Typography variant="h4" component="h1" gutterBottom>
          Your order has been placed successfully!
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Thank you for your purchase. We will send you an email confirmation shortly with the details of your order.
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          component={Link} // Użyj Link z react-router-dom jako komponentu
          to="/" // Przycisk przeniesie na stronę główną
          sx={{ mt: 2, py: 1.5, px: 4, borderRadius: '8px' }} // Stylizacja przycisku
        >
          Go to Home Page
        </Button>
      </Paper>
    </Container>
  );
}