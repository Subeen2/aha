import { characters } from "../config/makeRandomString";

export default function makeRandomString(
  inputCharacters: string = characters,
  length = 25
) {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * inputCharacters.length);
    result += inputCharacters[randomIndex];
  }
  return result;
}

// 사용 예시
//const randomString = makeRandomString();
