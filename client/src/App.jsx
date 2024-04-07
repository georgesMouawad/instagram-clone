import { Route, Routes } from 'react-router-dom';

import Authentication from './components/Authentication/Authentication';
import Feed from './components/Feed/Feed';

import './styles/colors.css'
import './styles/utilities.css'
import './styles/queries.css'
import './App.css';

function App() {
  return (

    <Routes>
      <Route path="/auth" element={<Authentication />} />
      <Route path="/" element={<Feed />} />
    </Routes>

  );
}

export default App;
