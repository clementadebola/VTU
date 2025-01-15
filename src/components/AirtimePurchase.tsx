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
`;

const FormCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
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
          <Typography variant="h5" gutterBottom>
            Buy Airtime
          </Typography>
          <TextField
            select
            label="Network"
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
            type="text"
            fullWidth
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            label="Amount (NGN)"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePurchase}
            style={{ marginTop: '20px' }}
          >
            Purchase Airtime
          </Button>

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
