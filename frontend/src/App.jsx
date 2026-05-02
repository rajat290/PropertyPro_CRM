import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Leads from './pages/Leads';
import Appointments from './pages/Appointments';
import Profile from './pages/Profile';
// Note: Create other placeholder pages as needed in Phase 2

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes inside Layout will have the Sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="leads" element={<Leads />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
