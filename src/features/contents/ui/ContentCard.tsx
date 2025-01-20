import Tooltip from "@/shared/ui/Tooltip";
import AhaIcon from "@/widgets/ui/AhaIcon";
import { ContentCardI } from "../config/Content";
import UserProfile from "./UserProfile";

const ContentCard = ({
  userProfile,
  likedNum,
  linkArr,
  content,
}: ContentCardI) => {
  return (
    <div className="w-full px-6 py-6 mb-4 bg-white rounded-xl shadow-md space-y-5">
      {/** 유저 프로필 및 좋아요 영역 */}
      <div className="flex justify-between">
        <UserProfile
          userImgSrc={userProfile.profileImg}
          userName={userProfile.nickname}
          isFlexRow={false}
          showName={true}
        />
        {/** 좋아요 기능 optimistic update 적용 */}
        {/** https://img.icons8.com/material-rounded/24/like--v1.png */}
        <AhaIcon
          iconSrc={"/icons/heart.svg"}
          content={likedNum}
          width={"15px"}
        />
      </div>

      {/** 컨텐츠 내용 영역 */}
      <p className="text-[14px]">{content}</p>

      {/** 링크 영역 */}
      <div className="flex flex-col">
        {linkArr.map((item, index) => {
          return (
            <div className="flex gap-2" key={index}>
              <Tooltip content="레퍼런스 사이트 주소" position="top">
                <AhaIcon iconSrc={"/icons/link.svg"} width={"20px"} />
              </Tooltip>
              <a
                href={item}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                <p className="font-semibold text-grey800 text-[14px]">{item}</p>
              </a>
            </div>
          );
        })}
      </div>
      {/** 댓글 및 공유 영역 */}
      <div className="flex flex-col items-start">
        <div className="flex items-center "></div>
        <div className="flex space-x-2 mt-2 justify-between w-full">
          <AhaIcon
            iconSrc={"/icons/comment.svg"}
            width={"20px"}
            content="댓글"
          />
          <AhaIcon iconSrc={"/icons/book-mark.svg"} width={"20px"} />
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
