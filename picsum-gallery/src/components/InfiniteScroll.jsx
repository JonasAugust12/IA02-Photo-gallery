import { useEffect, useRef } from 'react';

const InfiniteScroll = ({ onLoadMore, hasMore, isLoading, children }) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [onLoadMore, hasMore, isLoading]);

  return (
    <>
      {children}
      {hasMore && <div ref={observerTarget} className="h-10 w-full" />}
    </>
  );
};

export default InfiniteScroll;
