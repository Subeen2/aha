import Image from "next/image";

function GoToTop() {
  const topBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={topBtn}
      className="inline-flex justify-center items-center fixed z-50 right-4 md:right-[10%] bottom-[104px] md:bottom-[112px] rounded-3xl p-1 px-1.5 border-2 "
    >
      <Image
        src="/icons/arrow-up-solid.svg"
        alt="top 스크롤 버튼"
        width={15}
        height={10}
      />
    </button>
  );
}

export default GoToTop;
