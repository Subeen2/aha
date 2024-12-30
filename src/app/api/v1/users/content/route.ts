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
      content:
        "트랜스파일러는 3단계로 이루어 집니다. 파싱, 트랜스폼, 코드 생성",
      linkArr: [1, 2],
    },
    {
      createUser: 1,
      content:
        "History API는 Link 태그를 사용합니다. Link는 a 태그의 기본 동작인 새로고침을 막고, pushState로만 URL을 변경합니다. 그래서 SPA에서는 a태그 대신 Link를 써야합니다.",
      linkArr: [2, 3],
    },
    {
      createUser: 1,
      content: "ddd",
      linkArr: [4, 5],
    },
    {
      createUser: 1,
      content: "ddd",
      linkArr: [6, 7],
    },
    {
      createUser: 1,
      content: "ddd",
      linkArr: [8, 9],
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
