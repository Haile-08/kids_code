import worker from './browser';

const initMocks = () => {
  if (process.env.NODE_ENV === 'development') {
    worker.start();
  }
};

export default initMocks;
