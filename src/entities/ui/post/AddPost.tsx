import InputField from "@/shared/ui/InputFeild";
import AhaButton from "@/widgets/ui/AhaButton";

const AddPost = () => {
  return (
    <div>
      <textarea />
      <div>
        <i></i>
        <InputField />
        <AhaButton
          size={"s"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
          children={"등록"}
        />
      </div>
    </div>
  );
};

export default AddPost;
