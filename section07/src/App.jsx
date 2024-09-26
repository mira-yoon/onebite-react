import "./App.css";
import Viewer from "./components/Viewer";
import Controller from "./components/Controller";
import { useState, useEffect, useRef } from "react";
import Even from "./components/Even";

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const isMount = useRef(false);
  console.log(isMount);

  // App컴포넌트가 리랜더링된다고 해서 isMount의 값이 초기화되는게 아니다.
  // 한 번 true로 변경시켰으면 계속 변경된 상태임.
  // App 컴포넌트가 리랜더링되니까 모든게 초기화되는것처럼 착각을 했음.

  // 1. 마운트: 탄생
  useEffect(() => {
    console.log("mount");
  }, []);
  // useEffect는 deps에 있는 값이 변경되어야지만 실행이 되기 때문에 이렇게 빈 배열을 넣으면 컴포넌트가 처음 마운트될 때 이후에는 다시는 실행되지 않는다.

  // 2. 업데이트: 변화, 리랜더링
  useEffect(() => {
    console.log("update");
  });
  // deps를 생략한다. 컴포넌트가 리랜더링(업데이트)될 때 마다 계속 실행된다.

  // 2-2. 마운트될 때는 제외하고 업데이트 될 때만 실행하기
  // App 컴포넌트가 마운트되었는지 안되었는지 체크하는 변수를 useRef를 이용해서 만든다.
  useEffect(() => {
    // App 컴포넌트가 마운트될 때 조건문이 참이 되기 때문에 isMount.current = true;를 실행하고 멈추게 된다.
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log("only-update");
  });

  // 3. 언마운트: 죽음
  // 카운트의 숫자가 짝수일 때만 화면에 랜더링되도록 만듬

  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
