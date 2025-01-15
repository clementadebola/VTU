import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
`;

const FormCard = styled(Card)`
  width: 100%;
  max-width: 420px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 20px;
    background-color: #007bff;
    color: #fff;
    padding: 10px 0;
    font-weight: bold;
    border-radius: 12px;
    text-transform: none;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const Title = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const AirtimePurchase: React.FC = () => {
  const [network, setNetwork] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handlePurchase = async () => {
    try {
      const response = await axios.post('http://localhost:5000/purchase', {
        network,
        phone,
        amount,
      });

      setMessage(response.data.message);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Purchase failed. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container>
      <FormCard>
        <CardContent>
          <Title variant="h5" gutterBottom>
            Buy Airtime
          </Title>
          <TextField
            select
            label="Select Network"
            fullWidth
            margin="normal"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
          >
            <MenuItem value="mtn">MTN</MenuItem>
            <MenuItem value="airtel">Airtel</MenuItem>
            <MenuItem value="glo">Glo</MenuItem>
            <MenuItem value="9mobile">9Mobile</MenuItem>
          </TextField>

          <TextField
            label="Phone Number"
            type="tel"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g., 08123456789"
          />

          <TextField
            label="Amount (NGN)"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />

          <StyledButton
            variant="contained"
            fullWidth
            onClick={handlePurchase}
          >
            Purchase Airtime
          </StyledButton>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <Alert
              onClose={() => setOpenSnackbar(false)}
              severity={snackbarSeverity}
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
          </Snackbar>
        </CardContent>
      </FormCard>
    </Container>
  );
};

export default AirtimePurchase;
