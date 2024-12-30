import Image from "next/image";

type AhaIconProps = {
  iconSrc: string;
  content: string | number;
};

const AhaIcon = ({ iconSrc, content }: AhaIconProps) => {
  return (
    <div className="flex space-x-3">
      <Image
        src={iconSrc}
        alt="Example Image"
        layout="responsive"
        width={16}
        height={9}
      />
      <span>{content}</span>
    </div>
  );
};

export default AhaIcon;
