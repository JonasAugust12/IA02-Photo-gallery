import PhotoSkeleton from './PhotoSkeleton';

const PhotoGrid = ({ children, isLoading, skeletonCount = 12 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
      {isLoading &&
        Array.from({ length: skeletonCount }).map((_, index) => (
          <PhotoSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
};

export default PhotoGrid;
