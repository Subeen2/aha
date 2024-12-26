import Image from "next/image";

const Logo = () => {
  return (
    <h1 className="text-[30px] font-extrabold">
      <a href="/">
        <Image
          alt="아하 로고"
          loading="lazy"
          width="110"
          height="42"
          decoding="async"
          data-nimg="1"
          src="/logos/AHA!.svg"
        />
      </a>
    </h1>
  );
};

export default Logo;
