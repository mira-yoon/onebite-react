import useInput from "../hooks/useInput";

const HookExam = () => {
  // useInput 함수를 호출해서 배열의 구조분해할당으로 input과 onChange함수를 useInput 함수로부터 받아오게 만들었다.
  const [input, onChange] = useInput();
  const [input2, onChange2] = useInput();

  return (
    <>
      <input type="text" value={input} onChange={onChange} />
      <input type="text" value={input2} onChange={onChange2} />
      {input}
      {input2}
    </>
  );
};

export default HookExam;
