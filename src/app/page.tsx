"use client";

import AddPost from "@/entities/ui/post/AddPost";
import LoadMorePost from "@/entities/ui/post/LoadMorePosts";
import { ContentI } from "@/features/contents/config/Content";
import ContentCard from "@/features/contents/ui/ContentCard";
import { RootState } from "@/shared/model/redux/store";
import Modal from "@/widgets/ui/Modal";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import "../styles/style.css";

const fetchPosts = async (): Promise<ContentI[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/content`
  );
  return response.data.result.mockData;
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  // react-query로 데이터 가져오기
  const { data, error, isLoading }: UseQueryResult<ContentI[]> = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // 인사이트 등록 버튼 클릭 시 모달 열기
  const openModal = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }
    setIsModalOpen(true);
  };

  // 모달 닫는 핸들러
  const closeModal = () => setIsModalOpen(false);

  const posts = data ?? [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-second100">
      <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm">
        {/* {isClient && user.isAuthenticated === true ? ( */}
        <h1 className="text-center font-[700]  text-[35px] mb-[40px] mt-5 text-grey900 leading-tight">
          무엇이 궁금하신가요?
        </h1>
        <form className="css-1hq0ax0 e1crplu70">
          <div className="css-17vqye5 e5hjo0l0">
            <div className="input rounded-md flex border border-[#c8c8c8]">
              <span
                className="icon p-icon p-icon--legacy-colored input__left-addon ml-[20px] mr-[10px]"
                aria-hidden="false"
                role="presentation"
              >
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m19.59 18.41-3.205-3.203c1.0712-1.3712 1.579-3.0994 1.4197-4.832-.1593-1.73274-.9735-3.3394-2.2767-4.49233s-2.9972-1.76527-4.7364-1.71212c-1.73913.05315-3.39252.76779-4.62288 1.99815s-1.945 2.88375-1.99815 4.6229c-.05316 1.7392.55918 3.4332 1.71211 4.7364s2.7596 2.1174 4.49232 2.2767c1.7327.1592 3.4608-.3485 4.832-1.4197l3.204 3.204c.1567.1541.3678.24.5876.2391.2197-.0009.4302-.0886.5856-.2439.1554-.1554.243-.3659.2439-.5856.001-.2198-.085-.431-.2391-.5876zm-4.886-3.808c-.0183.0156-.036.032-.053.049-.042.044-.042.044-.08.092-.91.886-2.197 1.424-3.571 1.424-1.19232.0001-2.348-.4121-3.27107-1.1668s-1.55672-1.8055-1.79352-2.974c-.2368-1.1686-.06217-2.38311.49428-3.43762s1.46047-1.88413 2.55878-2.34819c1.09833-.46405 2.32333-.53398 3.46733-.19793s2.1365 1.0574 2.8094 2.04174c.6728.98434.9845 2.1711.8822 3.359-.1022 1.1879-.6122 2.3039-1.4434 3.1588z"
                    fill="#6b7684"
                  ></path>
                </svg>
              </span>
              <input
                className="input__field w-full"
                placeholder="키워드, 최신 트렌드 등 무엇이든 검색해보세요"
                aria-label="키워드, 최신 트렌드 등 무엇이든 검색해보세요"
                id="input-:r1p:"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-center mt-10">
          <div className="animate-wiggle max-w-sm p-1 items-center bg-white rounded-xl shadow-md space-x-4 inline-block">
            <button
              className="pointer flex place-items-center gap-2 p-4 lg:pointer-events-auto lg:p-4"
              onClick={openModal}
            >
              인사이트 등록하기
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AddPost afterAdd={closeModal} />
      </Modal>
      <LoadMorePost items={posts} />
    </main>
  );
}
