import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/authSlice"
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { TextField, FormControl, InputLabel, Select, MenuItem, Box, Paper, Container, Typography, List, ListItem, Button } from "@mui/material";

const Cart = () => {
  const { cart, user } = useSelector((state) => state.auth);
  const { currentCartStage, handleProcced, handleReturn, register, errors, handleSubmit, onSubmit, isBtnDisabled } = useCart();
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return (
      <div className="p-4">
        <Link to="/">Return to home page</Link>
        <Typography variant="h2" align="center" sx={{ marginTop: '50px' }}>
          Your cart is empty
        </Typography>
      </div>
    );
  }


  return (
    <div className="p-4">
      <Link to="/">Return to home page</Link>
      
      {currentCartStage === 1 && 

      <Box>
        <Container>
            <Paper elevation={4} sx={{ width: '100%', minHeight: '80vh', padding: '10px', display: 'flex', flexDirection: 'column'}}>
                <Typography align="center" variant="h4" sx={{marginY: '20px'}}>Your basket</Typography>
                <List>
                 
        {cart.map((product, i) => (
          <ListItem key={i} sx={{display: 'flex', gap: '30px'}}>
            <Paper elevation={3} sx={{padding: '15px', height:'100px', minWidth: '70%', display: 'flex'}} className="align-center justify-center gap-2 sm:justify-between">
              <img src={product.image} alt={product.title} className="h-16 inline-block mr-4" />
              <Typography variant="span" className="hidden sm:block text-xs md:text-base">{product.title}</Typography>
              <button className="p-3 bg-red-500 text-white rounded-lg h-[30px] self-center" onClick={() => dispatch(removeFromCart(i))}>Remove</button>
            </Paper>
            <Paper elevation={3} sx={{padding: '15px', height:'100px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30%'}}>
              <Typography variant='span'> ${product.price}</Typography>
            </Paper>
          </ListItem>
        ))}
                </List>
              <Paper elevation={6} sx={{alignSelf: 'flex-end', padding: '15px', height:'100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '30%', marginTop: 'auto', marginBottom: '20px'}}>
                <p variant="h6" className="text-sm">Summary: ${cart.reduce((sum, product) => sum + product.price, 0)}</p>
              </Paper>
              <Box sx={{alignSelf: 'flex-end', display: 'flex', gap: '20px'}}>
                  <Button onClick={handleProcced} sx={{padding: '15px', backgroundColor: 'green', color: "white"}} color="primary">Procced</Button>
                </Box>
            </Paper>  
        </Container>
      </Box>
      }

      {currentCartStage === 2 && (
        user === null ? <Link to="/login">To continue, you need to login...</Link> :
        
        <Paper elevation={6} sx={{marginTop: '20px', padding: '20px', display: 'flex', flexDirection: 'column', maxWidth: '500px'}}>

          <form className="flex flex-col max-w-100 gap-2" onSubmit={handleSubmit(onSubmit)}>

    <TextField label="First name" {...register('firstname')} />
    {errors?.firstname && <p className="text-red-500">{errors.firstname.message}</p>}

    <TextField label="Last name" {...register('lastname')} />
    {errors?.lastname && <p className="text-red-500">{errors.lastname.message}</p>}

    <TextField label="Street" {...register('street')} />
    {errors?.street && <p className="text-red-500">{errors.street.message}</p>}

    <div className="flex gap-2">
      <TextField label="Zip Code" className="basis-[30%]" {...register('zipcode')} />
      <TextField label="City" className="basis-[70%]" {...register('city')} />
    </div>
    {errors?.zipcode && <p className="text-red-500">{errors.zipcode.message}</p>}
    {errors?.city && <p className="text-red-500">{errors.city.message}</p>}

    <TextField label="Phone number" {...register('phone')} />
    {errors?.phone && <p className="text-red-500">{errors.phone.message}</p>}

    <div className="mt-2">
      <FormControl fullWidth>
        <InputLabel id="payment-label">Payment Method</InputLabel>
        <Select
        name="paymentMethod"
          labelId="payment-label"
          label="Payment Method"
          defaultValue=""
          {...register("paymentMethod", { required: "Please select a payment method" })}
        >
          <MenuItem value="traditional">Traditional Transfer</MenuItem>
        </Select>
      </FormControl>
      {errors?.paymentMethod && (
        <p className="text-red-500">{errors.paymentMethod.message}</p>
      )}
    </div>

    <button type="submit" className="mt-4 p-4 bg-green-600 text-white rounded-lg w-[150px] self-center" disabled={!!isBtnDisabled}>
      Submit
    </button>
  </form>
  <Box sx={{marginTop: '20px', display: 'flex', gap: '20px'}}>
    <Button onClick={handleReturn} sx={{padding: '10px', backgroundColor: 'blue', color: "white"}}>Return</Button>
  </Box>
        </Paper>
)}    
    </div>
  );
};

export default Cart;