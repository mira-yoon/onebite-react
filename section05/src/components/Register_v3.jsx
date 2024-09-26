import { useState } from "react";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  console.log(input);

  // 앞에서 작성했던 비슷한 이벤트핸들러들을 하나로 통합하기
  const onChange = (e) => {
    console.log(e.target.name);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      // 객체 안에서 프로퍼티의 키 자리에 대괄호 안에 변수를 넣으면 이 변수의 값이 프로퍼티의 키가 된다.
    });
  };

  return (
    <>
      <div>
        <input
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
    </>
  );
};

export default Register;
