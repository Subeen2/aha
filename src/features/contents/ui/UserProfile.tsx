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
    <div className={isFlexRow ? "flex space-x-5" : "flex space-x-5 flex-col"}>
      <img src={userImgSrc} />
      <span className={showName ? "block" : "none"}>{userName}</span>
    </div>
  );
};

export default UserProfile;
