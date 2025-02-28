import Image from "next/image";

type AhaIconProps = {
  iconSrc: string;
  content?: string | number;
  width?: number;
  height?: number;
};

const AhaIcon = ({ iconSrc, content, width, height }: AhaIconProps) => {
  return (
    <div className="flex space-x-1 cursor-pointer">
      <Image
        src={iconSrc}
        alt="Example Image"
        className="scale-90"
        width={width}
        height={height ? height : 15}
      />
      <span className={`text-[14px] flex justify-center items-center`}>
        {content}
      </span>
    </div>
  );
};

export default AhaIcon;
