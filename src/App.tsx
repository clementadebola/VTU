import React from 'react';
import { ThemeProvider } from 'styled-components';
import AirtimePurchase from './components/AirtimePurchase';
import { theme } from './theme/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AirtimePurchase />
    </ThemeProvider>
  );
};

export default App;
