import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/photos');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-gray-300">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="mb-8 text-gray-600">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={handleGoHome}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Go to Gallery
        </button>
      </div>
    </div>
  );
};

export default NotFound;
