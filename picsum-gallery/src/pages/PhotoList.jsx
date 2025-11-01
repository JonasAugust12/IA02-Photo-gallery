import { useState, useEffect, useCallback } from 'react';
import { fetchPhotos } from '../services/api';
import PhotoCard from '../components/PhotoCard';
import PhotoGrid from '../components/PhotoGrid';
import InfiniteScroll from '../components/InfiniteScroll';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 30;
  const MAX_PAGES = 10;

  const loadPhotos = useCallback(async (pageNumber) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchPhotos(pageNumber, ITEMS_PER_PAGE);
      
      if (data.length === 0 || pageNumber >= MAX_PAGES) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load photos');
      console.error('Error loading photos:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);


  useEffect(() => {
    loadPhotos(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPhotos(nextPage);
    }
  }, [page, isLoading, hasMore, loadPhotos]);

  const handleRetry = () => {
    setError(null);
    setPhotos([]);
    setPage(1);
    setHasMore(true);
    loadPhotos(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl  text-gray-900">22127419 - Nguyễn Minh Toàn</h1>
          <h2 className="text-lg font-bold text-gray-600">Lorem Picsum Gallery</h2>
          <p className="mt-2 text-gray-600">
            Browse beautiful photos from Lorem Picsum
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && photos.length === 0 ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : (
          <InfiniteScroll
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isLoading={isLoading}
          >
            <PhotoGrid isLoading={isLoading && page === 1} skeletonCount={12}>
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </PhotoGrid>

            {isLoading && photos.length > 0 && (
              <LoadingSpinner message="Loading more photos..." />
            )}

            {!hasMore && photos.length > 0 && (
              <div className="py-8 text-center text-gray-500">
                <p>You've reached the end of the gallery!</p>
                <p className="text-sm">Total photos: {photos.length}</p>
              </div>
            )}

            {error && photos.length > 0 && (
              <div className="py-4">
                <ErrorMessage message={error} onRetry={() => loadPhotos(page)} />
              </div>
            )}
          </InfiniteScroll>
        )}
      </main>
    </div>
  );
};

export default PhotoList;
