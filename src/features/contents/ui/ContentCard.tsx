const ContentCard = () => {
  return (
    <div className="flex space-x-5">
      <div className="flex flex-col mr-5">
        <a
          href="https://fe-developers.kakaoent.com/2024/240715-handling-file-variables/"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          <p className="font-semibold text-gray-900">파일 변수 Deep-Dive</p>
        </a>
        <a
          href="https://fe-developers.kakaoent.com/2024/240715-handling-file-variables/"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          <p className="text-gray-600">서론 제가 속해있는 스토리FE…</p>
        </a>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center space-x-2">
          <img
            src="/_next/static/media/kakao.4219ca3a.ico"
            alt="채널 로고"
            className="w-5 h-5 rounded-full object-cover bg-white"
          />
          <p className="text-sm font-medium text-gray-700">
            카카오엔터테인먼트 FE 기술블로그
          </p>
        </div>
        <p className="text-xs text-gray-500">2024.07.15</p>
        <div className="flex space-x-3 mt-2">
          <img
            src="/_next/static/media/bookmark-deactive.4d44502e.svg"
            alt="북마크"
            className="w-4 h-4 text-transparent"
          />
          <img
            src="/_next/static/media/link-mono.ec0dfa62.svg"
            alt="링크 복사"
            className="w-4 h-4 text-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
