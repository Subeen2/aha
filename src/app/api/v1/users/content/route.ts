export async function POST(request: Request) {
  const { userInfo, content, linkArr } = await request.json();

  // 실제 데이터베이스 로직 대신 mock 데이터를 사용합니다.
  const mockData = [
    {
      createUser: userInfo,
      content,
      linkArr,
    },
  ];

  // 유저를 찾았을 경우 로그인 성공 메시지를 반환합니다.
  return new Response(
    JSON.stringify({
      message: "좋아요 성공",
      result: {
        mockData,
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

export async function GET(request: Request) {
  // 실제 데이터베이스 로직 대신 mock 데이터를 사용합니다.
  const mockData = [
    {
      createUser: 1,
      content: "ddd",
      linkArr: [1, 2],
    },
  ];

  // 유저를 찾았을 경우 로그인 성공 메시지를 반환합니다.
  return new Response(
    JSON.stringify({
      message: "좋아요 성공",
      result: {
        mockData,
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
