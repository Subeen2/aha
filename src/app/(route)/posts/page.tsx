// app/posts/page.tsx
import { fetchPosts } from "@/entities/api/fetchPosts";
import ContentCard from "@/features/contents/ui/ContentCard";

// 서버 컴포넌트
export default async function PostsPage() {
  // 서버에서 데이터 가져오기
  const posts = await fetchPosts();

  return (
    <div>
      <h1 className="text-center font-[700] text-[35px] mb-[40px] mt-5 text-grey900 leading-tight">
        무엇이 궁금하신가요?
      </h1>
      <div className="flex flex-wrap justify-between mt-10">
        {posts.map((item) => (
          <ContentCard
            key={item.contentId} // 고유값으로 key 설정
            likedNum={0}
            userProfile={{
              profileImg: "",
              userId: 1,
              nickname: "me",
            }}
            comments={[]}
            contentId={item.contentId}
            content={item.content}
            linkArr={["http://www.korea.com", "https://www.naver.com"]}
          />
        ))}
      </div>
    </div>
  );
}
