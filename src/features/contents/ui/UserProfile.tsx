type UserProfileProps = {
  userImgSrc: string;
  userName: string;
  isFlexRow: boolean;
  showName: boolean;
};

const UserProfile = ({
  userImgSrc,
  userName,
  isFlexRow,
  showName = true,
}: UserProfileProps) => {
  return (
    <div
      className={`items-center inline-block ${
        isFlexRow ? "flex  space-x-5 flex-col" : "flex gap-2"
      }`}
    >
      <img
        className="w-[20px] h-[18px]"
        src={userImgSrc}
        alt="gender-neutral-user--v1"
      />
      <span className={showName ? "block" : "none"}>{userName}</span>
    </div>
  );
};

export default UserProfile;
