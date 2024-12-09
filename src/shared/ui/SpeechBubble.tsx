type SpeechBubbleProps = {
  bgColor: string;
  textColor: string;
  text: string;
};

const SpeechBubble = ({ bgColor, textColor, text }: SpeechBubbleProps) => {
  return (
    <div className="absolute top-[-35px] left-[10px] z-[999] text-[13px] leading-none bg-gray-200 text-gray-800 rounded-md p-[5px_10px] animate-bounce">
      {text}
      <div className="absolute bottom-[-8px] right-[20%] w-0 h-0 border-t-[8px] border-t-gray-200 border-x-[6px] border-x-transparent"></div>
    </div>
  );
};

export default SpeechBubble;
