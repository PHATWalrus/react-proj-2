import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ApplicationProvider } from './context/ApplicationContext';
import { Navbar } from './components/Navbar/Navbar';

import { Dashboard } from './pages/Dashboard/Dashboard';
import { Applications } from './pages/Applications/Applications';
import { AddApplication } from './pages/AddApplication/AddApplication';
import { Analytics } from './pages/Analytics/Analytics';

function App() {
  return (
    <ApplicationProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="app-layout">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<AddApplication />} />
              <Route path="/applications/:id" element={<AddApplication />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </div>
        <ToastContainer theme="dark" position="bottom-right" />
      </Router>
    </ApplicationProvider>
  );
}

export default App;
