import { useReducer } from "react";

// reducer: 변환기
// -> 상태를 실제로 변화시키는 변환기 역할
// 첫 번째 인수: state, 두 번째 인수: 액션객체
function reducer(state, action) {
  // if (action.type === "INCREASE") {
  //   return state + action.data;
  // } else if (action.type === "DECREASE") {
  //   return state - action.data;
  // }
  switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state + action.data;
    default:
      state;
  }
}

const Exam = () => {
  // dispatch: 발송하다, 급송하다.
  // -> 상태변화가 있어야 한다는 사실을 알리는, 발송하는 함수
  // 컴포넌트 내부에서 dispatch 함수를 호출하게 되면 상태변화가 요청이 되고,
  // useReducer가 상태변화를 실제로 처리하게 될 함수를 호출.
  // 첫 번째 인수: reducer 함수, 두 번째 인수: state의 초기값
  const [state, dispatch] = useReducer(reducer, 0);

  const onClickPlus = () => {
    // 인수: 상태가 어떻게 변화되길 원하는지
    // 보통은 인수로 객체형태를 넣고, 이런 객체를 "액션 객체"라고 한다.
    // 액션객체를 인수로 전달하면서 dispatch함수를 호출하면 useReducer가 요청을 처리해주기 위해서
    // 실체로 상태를 변화시키는 reducer 함수를 호출
    dispatch({
      type: "INCREASE",
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: "DECREASE",
      data: 1,
    });
  };

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
