import { TopBandBannerI } from "../config/TopBandBanner";

const TopBandBanner = ({ title, contentArr, isRandom }: TopBandBannerI) => {
  const randomIndex = Math.floor(
    Math.random() * (contentArr ? contentArr.length : [""].length)
  );

  return (
    <div
      style={{ wordSpacing: "2px" }}
      className={`px-4 py-2 overflow-hidden bg-blue-500 text-black text-[15px]
    `}
    >
      {contentArr && (
        <span className={"animate-reveal inline-block"}>
          {title} : {contentArr[isRandom ? randomIndex : 0]}
        </span>
      )}
    </div>
  );
};

export default TopBandBanner;
