import { React } from 'react';
import { SnackbarProvider } from 'notistack';

import { Header } from './components';

const App = () => {
  return (
    <SnackbarProvider dense maxSnack={3} autoHideDuration={1500}>
      <div className="App">
        <Header />
        {/* <Map /> */}
      </div>
    </SnackbarProvider>
  );
};

export default App;
