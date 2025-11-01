const PhotoSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative aspect-4/3 overflow-hidden bg-gray-200">
        <div className="h-full w-full animate-pulse bg-gray-300" />
      </div>
      <div className="p-4">
        <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-gray-300" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default PhotoSkeleton;
