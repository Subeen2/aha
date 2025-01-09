import InputField from "@/shared/ui/InputFeild";
import AhaButton from "@/widgets/ui/AhaButton";
import axios from "axios";
import { useState } from "react";

const AddPost = ({ afterAdd }: { afterAdd: () => void }) => {
  const [linkArr, setLinkArr] = useState<string[]>([]);
  const [link, setLink] = useState<string>("");
  const [content, setContent] = useState("");

  const handleAddLink = () => {
    if (link.trim() !== "") {
      setLinkArr((prevLinks) => [...prevLinks, link]);
      setLink(""); // 링크 추가 후 입력 필드 초기화
    }
  };

  const handleAddContent = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/content`,
        {
          userInfo: {},
          content,
          linkArr,
        }
      );
      if (response.status === 200) {
        alert("정상 등록되었습니다!");
        afterAdd();
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <textarea
        className="w-full h-[88px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex w-full justify-between">
        <i>링크</i>
        <InputField
          variant={"underline"}
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <AhaButton size={"s"} onClick={handleAddLink}>
          링크 추가
        </AhaButton>
      </div>
      {linkArr.map((item, index) => {
        return <p key={item}>{item}</p>;
      })}
      <AhaButton size="l" onClick={handleAddContent}>
        등록
      </AhaButton>
    </div>
  );
};

export default AddPost;
