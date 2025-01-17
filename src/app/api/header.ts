// CORS 헤더 추가
const headers = {
  "Access-Control-Allow-Origin": "*", // 모든 도메인에서의 접근을 허용
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // 허용할 HTTP 메소드
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default headers;
