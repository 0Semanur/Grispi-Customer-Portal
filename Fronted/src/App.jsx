import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { ConfigProvider } from 'antd';

// Pages
import TicketList from './pages/TicketList';
import TicketDetail from './pages/TicketDetail';
import NewTicket from './pages/NewTicket';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import ImportStart from './pages/ImportStart';
import ImportPreview from './pages/ImportPreview';
import ImportMapping from './pages/ImportMapping';
import ImportSummary from './pages/ImportSummary';
import ImportResult from './pages/ImportResult';
import MainLayout from './layouts/MainLayout';

function App() {
  // Basit bir kimlik doğrulama kontrolü (gerçek uygulamada daha karmaşık olacaktır)
  const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6A1B9A',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Korumalı rotalar */}
          <Route path="/" element={isAuthenticated() ? <MainLayout /> : <Navigate to="/login" />}>
            <Route index element={<TicketList />} />
            <Route path="tickets/:id" element={<TicketDetail />} />
            <Route path="tickets/new" element={<NewTicket />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="import" element={<ImportStart />} />
            <Route path="import/preview" element={<ImportPreview />} />
            <Route path="import/mapping" element={<ImportMapping />} />
            <Route path="import/summary" element={<ImportSummary />} />
            <Route path="import/result" element={<ImportResult />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
