import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

const useDiary = (id) => {
  const nav = useNavigate();
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  // navigate함수는 컴포넌트들이 마운트된 다음에만 동작할 수 있다.
  // 컴포넌트가 렌더링되자마자 함수를 호출하려면 useEffect를 사용한다.
  // useEffect를 사용해서 id 또는 data가 바뀔 때만 실행되도록 함
  // useEffect 안에 있는 값을 반환하려면 useState의 state에 저장함.(클린업 함수 외에 리턴값이 있어선 안된다)
  useEffect(() => {
    // App에서 받아온 data 중에서 아이디가 일치하는 아이템만 반환(객체형태)
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );

    // 일치하는 id가 없을 때
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      // 뒤로가기 방지
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id, data]);

  return curDiaryItem;
};

export default useDiary;
