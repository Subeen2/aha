import React, { useState } from "react";

type TooltipProps = {
  children: React.ReactNode; // 툴팁 트리거
  content: React.ReactNode; // 툴팁 내용
  position?: "top" | "bottom" | "left" | "right"; // 툴팁 위치
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
}) => {
  const [visible, setVisible] = useState(false);

  // 마우스 오버/아웃 핸들러
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {/* 트리거 */}
      <div className="cursor-pointer">{children}</div>

      {/* 툴팁 */}
      {visible && (
        <div
          className={`absolute whitespace-nowrap px-3 py-1 bg-grey800 text-white text-sm rounded shadow-lg ${
            position === "top"
              ? "bottom-full mb-2"
              : position === "bottom"
              ? "top-full mt-2"
              : position === "left"
              ? "right-full mr-2"
              : "left-full ml-2"
          }`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
