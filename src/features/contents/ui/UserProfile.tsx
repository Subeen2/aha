const UserProfile = (
  userImgSrc: string,
  userName: string,
  isFlexRow: boolean
) => {
  return (
    <div className={isFlexRow ? "flex space-x-5" : "flex space-x-5 flex-col"}>
      <img src={userImgSrc} />
      <span>{userName}</span>
    </div>
  );
};

export default UserProfile;
