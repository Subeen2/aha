import { PhoneNumberT } from "../config/SendingSMS";

const SendingSMS = ({ phoneNumber }: { phoneNumber: PhoneNumberT }) => {
  return (
    <a href={`sms:${phoneNumber}?body=인증번호입니다.`}>인증 메시지 발송</a>
  );
};

export default SendingSMS;
