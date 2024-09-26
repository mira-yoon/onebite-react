import { useState, useRef } from "react";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  // 레퍼런스 객체를 이용해서 register컴포넌트가 렌더링하고 있는 4개의 폼에 사용자가 얼마나 많이 변경을 일으켰는지 그 수정횟수를 카운트하는 기능
  const countRef = useRef(0);
  const inputRef = useRef();

  const onChange = (e) => {
    countRef.current++;
    console.log(countRef.current);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // input태그에 접근하기 위해 레퍼런스 객체를 이용
  // input.name이 비어있으면 포커스 됨
  const onSubmit = () => {
    if (input.name === "") {
      console.log(inputRef.current);
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div>
        {/* 아래와 같이 ref 속성으로 레퍼런스 객체 inputRef를 넣어주게 되면, 인풋태그가 렌더링하는 돔 요소가 inputRef라는 레퍼런스 객체에 저장이 된다. */}
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          type="text"
          placeholder={"이름"}
        />
        {input.name}
      </div>

      <div>
        <input
          name="birth"
          value={input.birth}
          onChange={onChange}
          type="date"
        />
        {input.birth}
      </div>

      <div>
        <select name="country" id="" value={input.country} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {input.country}
      </div>

      <div>
        <textarea
          name="bio"
          id=""
          value={input.bio}
          onChange={onChange}
        ></textarea>
        {input.bio}
      </div>

      <button onClick={onSubmit}>제출</button>
    </>
  );
};

export default Register;
