import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoList from './pages/PhotoList';
import PhotoDetail from './pages/PhotoDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="/photos" element={<PhotoList />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

