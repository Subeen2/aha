export async function POST(request: Request) {
  const { sendUser, receiveUser } = await request.json();

  // 실제 데이터베이스 로직 대신 mock 데이터를 사용합니다.
  const mockUsers = [
    {
      sendUser: sendUser,
      receiveUser: receiveUser,
      targetPostId: 1,
    },
  ];

  // 유저를 찾았을 경우 로그인 성공 메시지를 반환합니다.
  return new Response(
    JSON.stringify({
      message: "좋아요 성공",
      result: {
        sendUser: 1,
        receiveUser: 2,
        targetPostId: 1,
        // 필요한 다른 데이터도 이곳에 추가할 수 있습니다.
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  );
}
