import AppProvider from './Provider/app';
import Route from './routes/route';

import './style/App.css';

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <AppProvider>
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <Route />
    </AppProvider>
  );
}

export default App;
