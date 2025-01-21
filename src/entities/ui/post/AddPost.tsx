import { useAuthStore } from "@/entities/lib/supabase/zustand/authStore";
import InputField from "@/shared/ui/InputFeild";
import AhaButton from "@/widgets/ui/AhaButton";
import AhaIcon from "@/widgets/ui/AhaIcon";
import axios from "axios";
import { useState } from "react";

const AddPost = ({ addSuccessHandler }: { addSuccessHandler: () => void }) => {
  const user = useAuthStore((state) => state.user);
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/content`,
        {
          writer: user,
          content,
          links: linkArr,
        }
      );
      if (response.status === 200) {
        alert("정상 등록되었습니다!");
        addSuccessHandler();
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <textarea
        className="w-full h-[88px] "
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex w-full justify-between">
        <div className="flex w-[70%]">
          <AhaIcon iconSrc={"/icons/link.svg"} width={20} />
          <InputField
            variant={"underline"}
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
        </div>
        <AhaButton onClick={handleAddLink}>링크 추가</AhaButton>
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
