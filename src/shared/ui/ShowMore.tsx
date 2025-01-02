import React, { useState } from "react";

const LoadMoreComponent = ({ items }: { items: any[] }) => {
  const [currentDisplayCount, setCurrentDisplayCount] = useState(3);

  const handleLoadMore = () => {
    setCurrentDisplayCount((prevCount) => prevCount + 3);
  };

  return (
    <div className="text-center">
      <div id="container" className="flex flex-wrap justify-center gap-4">
        {items.slice(0, currentDisplayCount).map((_, index) => (
          <div
            key={index}
            className="shop-item w-48 h-48 bg-gray-200 flex items-center justify-center rounded-md"
          >
            Item {index + 1}
          </div>
        ))}
      </div>
      {currentDisplayCount < items.length && (
        <button
          id="loadMore"
          onClick={handleLoadMore}
          className="mt-5 mx-auto px-6 py-2 text-sm border border-gray-300 rounded-lg text-gray-800 bg-white hover:bg-gray-100"
        >
          더보기
        </button>
      )}
    </div>
  );
};

export default LoadMoreComponent;
