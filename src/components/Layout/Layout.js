import React, { useState } from 'react';

import { Header } from '../Header';
import { Map } from '../Map';

export const Layout = () => {
  const [location, setLocation] = useState(null);

  return (
    <div>
      <Header location={location} setLocationFn={setLocation} />
      <Map locationObject={location} />
    </div>
  );
};
