import { useEffect } from "react";

const Even = () => {
  useEffect(() => {
    // useEffect의 콜백함수가 반환하는 함수를 클린업 또는 정리함수라고 한다.
    // 정리함수는 useEffect가 끝날 때 실행이 된다.
    // 두 번째 인수에 빈 배열을 넣게 되면 이 useEffect는 mount 될 때 실행이 되는데,
    // 종료는 그 반대로 unmount될 때 종료됨.
    return () => {
      console.log("unmount");
    };
  }, []);
  return <div>짝수입니다</div>;
};

export default Even;
