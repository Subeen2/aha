import React, { useState } from "react";
import ContentCard from "@/features/contents/ui/ContentCard"; // ContentCard 임포트
import { ContentI } from "@/features/contents/config/Content";

const LoadMorePost = ({ items }: { items: ContentI[] }) => {
  const [currentDisplayCount, setCurrentDisplayCount] = useState(4);

  const handleLoadMore = () => {
    setCurrentDisplayCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="flex flex-col mt-32">
      <div className="flex flex-wrap justify-center gap-4">
        {items.slice(0, currentDisplayCount).map((item, index) => (
          <div
            key={index}
            className="shop-item w-[48%] h-auto bg-gray-200 flex items-center justify-center rounded-md"
          >
            <ContentCard
              likedNum={0}
              userProfile={{
                profileImg: "https://img.icons8.com/forma-light/24/user.png",
                userId: 1,
                nickname: "anonymous",
              }}
              comments={[]}
              content={item.content}
              linkArr={["https://www.naver.com"]}
              id={item.id}
              writer={item.writer}
            />
          </div>
        ))}
      </div>
      {currentDisplayCount < items.length && (
        <button
          id="loadMore"
          onClick={handleLoadMore}
          className="mt-5 mx-auto px-6 py-2 text-sm border border-gray-300 rounded-lg text-gray-800hover:bg-gray-100"
        >
          더보기
        </button>
      )}
    </div>
  );
};

export default LoadMorePost;
