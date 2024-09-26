import { useState } from "react";

const Register = () => {
  const [input, setInput] = useState({
    //초기값으로 객체를 넣을 수 있다
    //객체의 프로퍼티로 이전에 작성했던 4가지 state들을 보관
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  console.log(input);

  //input에 사용자가 텍스트를 입력하게 되면 텍스트를 name state에 보관할 수 있도록 만들어야 한다.

  // onChangeName함수의 기능: input에 입력된 값을 받아와서 setInput함수를 호출해서 state에 보관.
  const onChangeName = (e) => {
    // name 프로퍼티의 값을 e.target.value로 변경
    setInput({
      ...input, //기존의 input state에 들어있던 프로퍼티 값들을 가지고왔다.
      // name 말고 다른 프로퍼티(birth, country, bio)의 값은 변경하지 않고 그대로 유지시키기 위함
      // ...input을 안넣게 되면 다른 프로퍼티는 사라지게 되고 name프로퍼티만 값이 들어가게 된다
      name: e.target.value,
    });
  };

  const onChangeBirth = (e) => {
    setInput({
      ...input,
      birth: e.target.value,
    });
  };

  const onChangeCountry = (e) => {
    setInput({
      ...input,
      country: e.target.value,
    });
  };

  const onChangeBio = (e) => {
    setInput({
      ...input,
      bio: e.target.value,
    });
  };

  return (
    <>
      <div>
        <input
          value={input.name}
          onChange={onChangeName}
          type="text"
          placeholder={"이름"}
        />
        {input.name}
        {/* 입력된 값이 state에 저장되었는지 확인용으로 넣어본 것 */}
      </div>

      <div>
        <input value={input.birth} onChange={onChangeBirth} type="date" />
        {input.birth}
        {/* 입력된 값이 state에 저장되었는지 확인용으로 넣어본 것 */}
      </div>

      <div>
        <select name="" id="" value={input.country} onChange={onChangeCountry}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {input.country}
      </div>

      <div>
        <textarea
          name=""
          id=""
          value={input.bio}
          onChange={onChangeBio}
        ></textarea>
        {input.bio}
      </div>
    </>
  );
};

export default Register;
