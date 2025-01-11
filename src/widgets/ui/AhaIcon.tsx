type AhaIconProps = {
  iconSrc: string;
  content?: string | number;
  width?: string;
  height?: string;
};

const AhaIcon = ({ iconSrc, content, width, height }: AhaIconProps) => {
  return (
    <div className="flex space-x-1 cursor-pointer">
      <img
        src={iconSrc}
        alt="Example Image"
        className="scale-90"
        width={width}
      />
      <span className={`text-[14px]`}>{content}</span>
    </div>
  );
};

export default AhaIcon;
