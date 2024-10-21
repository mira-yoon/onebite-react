import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  // navigate함수는 컴포넌트들이 마운트된 다음에만 동작할 수 있다.
  // 컴포넌트가 렌더링되자마자 함수를 호출하려면 useEffect를 사용한다.
  // useEffect를 사용해서 params.id 또는 data가 바뀔 때만 실행되도록 함
  // useEffect 안에 있는 값을 반환하려면 useState의 state에 저장함.(클린업 함수 외에 리턴값이 있어선 안된다)
  useEffect(() => {
    // App에서 받아온 data 중에서 아이디가 일치하는 아이템만 반환(객체형태)
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );

    // 일치하는 id가 없을 때
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      // 뒤로가기 방지
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id, data]);

  const onClickDelete = () => {
    // confirm창: 확인 => true 반환 / 취소 => false 반환
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      // 일기 삭제 로직
      onDelete(params.id);
      // 뒤로가기 방지
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
