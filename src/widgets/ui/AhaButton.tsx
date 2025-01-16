interface AhaButtonProps {
  size?: "s" | "m" | "l"; // 버튼 사이즈
  onClick: () => void; // 버튼 클릭 핸들러
  children: React.ReactNode; // 버튼 내부 텍스트
}

const AhaButton = ({ size = "s", onClick, children }: AhaButtonProps) => {
  return (
    <button
      className={`${
        size === "s" ? "w-[10vw]" : size === "m" ? "w-[50vw]" : "w-full"
      } bg-main100 rounded p-2`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AhaButton;
