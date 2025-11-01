import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPhotoDetails, getFullSizeUrl } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {
    const loadPhotoDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPhotoDetails(id);
        setPhoto(data);
      } catch (err) {
        setError(err.message || 'Failed to load photo details');
        console.error('Error loading photo details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotoDetails();
  }, [id]);


  const handleBack = () => {
    navigate('/photos');
  };


  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    window.location.reload();
  };


  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <LoadingSpinner message="Loading photo details..." />
      </div>
    );
  }

  if (error || !photo) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <ErrorMessage
          message={error || 'Photo not found'}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 transition-colors hover:text-blue-700"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Gallery
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="relative bg-gray-900">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500" />
              </div>
            )}
            <img
              src={getFullSizeUrl(photo.id, photo.width, photo.height)}
              alt={`Photo by ${photo.author}`}
              className={`mx-auto max-h-[70vh] w-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
            />
          </div>

          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Photo #{photo.id}
              </h1>
              <p className="text-gray-600">
                A beautiful photo from the Lorem Picsum collection
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Author
                </h2>
                <p className="text-lg font-medium text-gray-900">{photo.author}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Dimensions
                </h2>
                <p className="text-lg font-medium text-gray-900">
                  {photo.width} × {photo.height} pixels
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Photo ID
                </h2>
                <p className="font-mono text-lg font-medium text-gray-900">{photo.id}</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Source
                </h2>
                <a
                  href={photo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg font-medium text-blue-600 hover:text-blue-700"
                >
                  View on Unsplash
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 p-6">
              <h2 className="mb-3 text-lg font-semibold text-gray-900">
                About This Photo
              </h2>
              <p className="leading-relaxed text-gray-700">
                This stunning photograph was captured by <strong>{photo.author}</strong> and
                is part of the Lorem Picsum collection, which provides high-quality
                placeholder images for designers and developers. The image showcases
                professional photography with dimensions of {photo.width} × {photo.height} pixels,
                making it perfect for various design projects and layouts.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={photo.download_url}
                download
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Download Photo
              </a>
              <button
                onClick={handleBack}
                className="rounded-lg border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
              >
                Back to Gallery
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoDetail;
