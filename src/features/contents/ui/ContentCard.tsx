import AhaIcon from "@/widgets/ui/AhaIcon";
import { ContentCardI } from "../config/Content";
import UserProfile from "./UserProfile";

const ContentCard = (props: ContentCardI) => {
  return (
    <div className="w-[50%] px-4 py-7 bg-white rounded-xl shadow-md space-x-4 inline-block">
      <div className="flex justify-between">
        <UserProfile
          userImgSrc={props.userProfile.profileImg}
          userName={props.userProfile.nickname}
          isFlexRow={false}
          showName={true}
        />

        <AhaIcon iconSrc="" content={props.likedNum} />
      </div>
      <p>{props.content}</p>
      <div className="flex flex-col">
        {props.linkArr.map((item) => {
          return (
            <a
              href={item}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              <p className="font-semibold text-gray-900">{item}</p>
            </a>
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
