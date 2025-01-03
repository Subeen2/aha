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
          iconSrc={"https://img.icons8.com/material-outlined/24/like--v1.png"}
          content={likedNum}
        />
      </div>
      <p>{content}</p>
      <div className="flex flex-col">
        {linkArr.map((item) => {
          return (
            <div className="flex gap-2">
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/material-two-tone/48/link--v1.png"
                alt="link--v1"
              />
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
        <div className="flex space-x-3 mt-2">
          <img
            src="/_next/static/media/bookmark-deactive.4d44502e.svg"
            alt="북마크"
            className="w-4 h-4 text-transparent"
          />
          <img
            src="/_next/static/media/link-mono.ec0dfa62.svg"
            alt="링크 복사"
            className="w-4 h-4 text-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
