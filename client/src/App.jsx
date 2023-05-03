import AppProvider from './Provider/app';
import Approute from './routes/index';
import './style/App.css';

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AppProvider>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Approute />
    </AppProvider>
  );
}

export default App;
