import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("이름");
  const [birth, setBirth] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");

  //input에 사용자가 텍스트를 입력하게 되면 텍스트를 name state에 보관할 수 있도록 만들어야 한다.

  // onChangeName함수의 기능: input에 입력된 값을 받아와서 setName함수를 호출해서 state에 보관.
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeBirth = (e) => {
    setBirth(e.target.value);
  };

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeBio = (e) => {
    setBio(e.target.value);
  };

  return (
    <>
      <div>
        <input
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder={"이름"}
        />
        {name}
        {/* 입력된 값이 state에 저장되었는지 확인용으로 넣어본 것 */}
      </div>

      <div>
        <input value={birth} onChange={onChangeBirth} type="date" />
        {birth}
        {/* 입력된 값이 state에 저장되었는지 확인용으로 넣어본 것 */}
      </div>

      <div>
        <select name="" id="" value={country} onChange={onChangeCountry}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        {country}
      </div>

      <div>
        <textarea name="" id="" value={bio} onChange={onChangeBio}></textarea>
        {bio}
      </div>
    </>
  );
};

export default Register;
