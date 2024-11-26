export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 실제 데이터베이스 로직 대신 mock 데이터를 사용합니다.
  const mockUsers = [
    {
      nickname: "콩콩",
      email: "existing@example.com",
      password: "password123",
      user_uid: "adadsdasdasd33",
    },
  ];

  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return new Response(
      JSON.stringify({
        message: "유저 등록이 안돼있음.",
        result: null,
      }),
      {
        status: 202,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  }

  // 유저를 찾았을 경우 로그인 성공 메시지를 반환합니다.
  return new Response(
    JSON.stringify({
      message: "로그인 성공",
      result: {
        user_uid: user.user_uid,
        nickname: user.nickname,
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
