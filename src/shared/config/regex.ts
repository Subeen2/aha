// TODO: 임시 추후 변경될 수 있음
// const idRegEx = /^[a-zA-Z0-9]{4,12}$/;
const nicknameRegEx = /^[a-zA-Z0-9가-힣]$/;
const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const nameRegEx = /^[가-힣]{1,12}$/;
const nameRegEx = /^.{0,30}$/;
const phoneRegEx = /^[0-9]+$/;

export { nicknameRegEx, passwordRegEx, emailRegEx, nameRegEx, phoneRegEx };
