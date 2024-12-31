type AhaIconProps = {
  iconSrc: string;
  content: string | number;
};

const AhaIcon = ({ iconSrc, content }: AhaIconProps) => {
  return (
    <div className="flex space-x-3">
      <img src={iconSrc} alt="Example Image" className="scale-90" />
      <span>{content}</span>
    </div>
  );
};

export default AhaIcon;
