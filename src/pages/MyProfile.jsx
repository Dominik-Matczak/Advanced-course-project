import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
} from '@mui/material';
import PageNavigation from '../components/PageNavigation';
import { useSelector } from 'react-redux';

const MyProfile = () => {

  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  
  useEffect(() => {
    console.log(user);
    console.log(orders)
  }, [user]);

  return (
    user ? <>
      <PageNavigation />
      <Box sx={{ flexGrow: 1, p: 2, backgroundColor: '#f5f5f5' }}>

        <Paper elevation={0} sx={{ mt: 2, p: 1, borderBottom: '1px solid #ccc' }}>
          <Typography variant="subtitle1" align="center">
            Welcome to your profile!
          </Typography>
        </Paper>

        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <Grid container spacing={3}>

            {/* Lewa kolumna */}
            <Grid sx={{ width: "100%" }}>
              <Paper elevation={3} sx={{ p: 2, minHeight: 300 }}>
                <Typography variant="h6" gutterBottom align='center'>
                  Here's your user data
                </Typography>
                <List dense>
                  <ListItem>Email: {user.email}</ListItem>
                  <ListItem>Username: {user.username}</ListItem>
                  <ListItem>Full name: {user.name.firstname + " " + user.name.lastname}</ListItem>
                  <ListItem>Phone: {user.phone}</ListItem>
                  <ListItem><b>Address</b></ListItem>
                  <ListItem>{user.address.street + " " + user.address.number}</ListItem>
                  <ListItem>{user.address.zipcode + " " + user.address.city}</ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Prawa kolumna */}
            <Grid sx={{ width: "100%" }}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 2, 
                  minHeight: 300, 
                  width: "100%", 
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <Typography variant="h6" gutterBottom align='center'>
                  Here are your orders
                </Typography>
                <List>
  {orders && orders.length > 0 ? (
    orders.map((order, index) => {
      // Obliczenie łącznej ceny
      const totalPrice = order.cart.reduce((sum, item) => sum + item.price, 0);

      return (
        <ListItem key={index} sx={{ display: "block", mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Order #{index + 1}
          </Typography>

          {/* Liczba produktów */}
          <Typography variant="body2">
            Products count: {order.cart.length}
          </Typography>

          {/* Łączna cena */}
          <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
            Total price: ${totalPrice.toFixed(2)}
          </Typography>

          {/* Lista tytułów */}
          <ul style={{ marginTop: 8 }}>
            {order.cart.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </ListItem>
      );
    })
  ) : (
    <ListItem>No orders to display.</ListItem>
  )}
</List>
              </Paper>
            </Grid>

          </Grid>
        </Container>

      </Box>
    </> :
    <>
        <PageNavigation />
        <Typography variant='h3' align='center' sx={{marginTop: '220px'}}>Login to continue...</Typography>
    </>
  );
};

export default MyProfile;
