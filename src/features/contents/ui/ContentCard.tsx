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
      <p>{content}</p>
      <div className="flex flex-col">
        {linkArr.map((item, index) => {
          return (
            <div className="flex gap-2" key={index}>
              <AhaIcon iconSrc={"/icons/link.svg"} width={"20px"} />
              <a
                href={item}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                <p className="font-semibold text-grey800">{item}</p>
              </a>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center space-x-2"></div>
        <div className="flex space-x-2 mt-2">
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
