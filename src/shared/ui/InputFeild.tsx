import Image from "next/image";
import React, { useImperativeHandle } from "react";

import { forwardRef, useId } from "react";

interface InputProps {
  variant?: "default" | "underline";
  label?: string;
  type?: string;
  value?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  setPasswordHide?: React.Dispatch<React.SetStateAction<boolean>>;
}

const variantStyles = {
  default:
    "h-[48px] px-4 w-full rounded-lg border md:text-[18px] text-[16px] placeholder-gray-2 focus:outline-none focus:border-gray-3 transition",
  underline:
    "border-b w-full px-1 py-2 md:text-[20px] text-[16px] placeholder-gray-2 focus:outline-none focus:border-black transition rounded-none",
};

// 부모컴포넌트가 직접 접근 할 수 없기 때문에 forwardRef로 전달 받음
const InputField = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    name,
    label,
    variant = "default",
    type = "text",
    value,
    placeholder,
    onChange,
    readOnly = false,
    error,
    setPasswordHide,
    defaultValue,
  },
  ref
) {
  // 전역적으로 고유한 ID를 생성하여 서버와 클라이언트 간의 ID 불일치를 방지하기 위해 사용
  const inputId = useId();

  const hideHandler = () => {
    if (setPasswordHide) {
      setPasswordHide((prev) => !prev);
    }
  };

  // 부모에게 제공할 메서드를 정의
  //   useImperativeHandle(inputRef, () => ({
  //     focus: () => {
  //       if (inputRef.current) {
  //         inputRef.current?.focus();
  //       }
  //     },
  //     clear: () => {
  //       if (inputRef.current) {
  //         inputRef.current.value = "";
  //       }
  //     },
  //   }));

  return (
    <div className="flex flex-col">
      {label && (
        <label className="ml-1 mb-2 font-bold text-[18px]" htmlFor={inputId}>
          {label}
        </label>
      )}
      {(type === "text" || type === "password") && (
        <div className="relative">
          <input
            className={`${variantStyles[variant]} ${
              error ? "border-red-3" : "border-gray-2"
            }`}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            id={inputId}
            defaultValue={defaultValue}
          />
          {setPasswordHide && (
            <button
              onClick={hideHandler}
              type="button"
              className="absolute right-4 top-[14px]"
            >
              {type === "text" ? (
                <Image
                  src="/icons/eye-regular.svg"
                  alt="눈 아이콘"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/icons/eye-slash-regular.svg"
                  alt="눈 아이콘"
                  width={20}
                  height={20}
                />
              )}
            </button>
          )}
        </div>
      )}
      {type === "file" && (
        <input
          ref={ref}
          type="file"
          className={`${variantStyles[variant]} text-[10px] py-[10px]`}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {error && <p className={`text-red-3 text-[12px] mt-2`}>{error}</p>}
    </div>
  );
});

export default InputField;
