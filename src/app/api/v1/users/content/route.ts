import { createClient } from "@/entities/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  try {
    const { writer, content, links } = await request.json();

    // Supabase를 사용하여 contents 테이블에 데이터 삽입
    const { data, error } = await supabase.from("contents").insert([
      {
        writer: writer.user_uid, // userInfo가 어떤 형태로 들어오는지 확인 후 적절한 필드명으로 변경
        content,
        links,
      },
    ]);

    // 에러가 발생한 경우
    if (error) {
      console.error("Error inserting data into Supabase:", error);
      return new Response(
        JSON.stringify({
          message: "데이터 삽입 실패",
          error: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    }

    // 데이터 삽입 성공 시 응답
    return new Response(
      JSON.stringify({
        message: "컨텐츠 생성 성공",
        result: {
          data,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response(
      JSON.stringify({
        message: "에러가 발생했습니다.",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}

export async function GET() {
  try {
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

    return new Response(
      JSON.stringify({
        message: "컨텐츠 가져오기 성공",
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
  } catch (error) {
    // 에러가 발생한 경우
    console.error("Error in GET request:", error);
    return new Response(
      JSON.stringify({
        message: "에러가 발생했습니다.",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  }
}
