import { React } from 'react';
import { SnackbarProvider } from 'notistack';

import { Layout } from './components';

const App = () => {
  return (
    <SnackbarProvider dense maxSnack={3} autoHideDuration={1500}>
      <Layout />
    </SnackbarProvider>
  );
};

export default App;
