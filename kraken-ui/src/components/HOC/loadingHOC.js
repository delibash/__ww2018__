import React from 'react';

const WithLoading = Component => {
  return function WithLoadingComponent ({isLoading, ...props}) {
    return !isLoading ? <Component {...props} /> : 'Fetching data...';
  };
};

export {
  WithLoading
};