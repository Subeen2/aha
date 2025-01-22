// components/Modal.tsx
"use client";

import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 모달 닫기 핸들러
  children: React.ReactNode; // 모달 내부에 표시될 콘텐츠
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // ESC 키로 모달 닫기 기능 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // ESC 키 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyDown);

    // 컴포넌트가 언마운트되거나 isOpen이 변경되면 이벤트 리스너 제거
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]); // onClose가 변경될 때마다 effect를 새로 실행

  if (!isOpen) return null; // 모달이 닫혀 있으면 렌더링하지 않음

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 bg-back"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-md rounded-lg max-w-lg w-full p-10 relative"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않음
      >
        <button
          className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
