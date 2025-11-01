import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThumbnailUrl } from '../services/api';

const PhotoCard = ({ photo }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/photos/${photo.id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-gray-200">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-300" />
        )}
        {imageError ? (
          <div className="flex h-full items-center justify-center bg-gray-300">
            <span className="text-gray-500">Failed to load image</span>
          </div>
        ) : (
          <img
            src={getThumbnailUrl(photo.id)}
            alt={`Photo by ${photo.author}`}
            className={`h-full w-full object-cover transition-opacity duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="truncate font-semibold text-gray-800">{photo.author}</h3>
        <p className="text-sm text-gray-500">
          {photo.width} × {photo.height}
        </p>
      </div>
    </div>
  );
};

export default PhotoCard;
