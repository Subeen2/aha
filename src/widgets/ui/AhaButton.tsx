interface AhaButtonProps {
  size: "s" | "m" | "l"; // 버튼 사이즈
  onClick: () => void; // 버튼 클릭 핸들러
  children: React.ReactNode; // 버튼 내부 텍스트
}

const AhaButton = ({ size, onClick, children }: AhaButtonProps) => {
  return (
    <button
      className={`${size} === 's' ? w-2 : ${size} === 'm' ? w-5 : ${size} === 'l' ? w-10 `}
    >
      {children}
    </button>
  );
};

export default AhaButton;
