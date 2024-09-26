import "./TodoItem.css";
import { memo } from "react";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckBox = () => {
    onUpdate(id);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={isDone}
        onChange={onChangeCheckBox}
        readOnly
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

// 고차 컴포넌트(HOC)
// memo 함수 안에 두 번째 인수로 콜백함수를 인자로 전달하면 , 콜백함수의 매개변수 prevProps, nextProps를 전달해줘서 이 함수의 반환값에 따라서 props가 바뀌었는지 안바뀌었는지 판단한다.
export default memo(TodoItem, (prevProps, nextProps) => {
  // 콜백함수가 true 반환 → props가 바뀌지 않음 → 리렌더링 X
  // 콜백함수가 false 반환 → props가 바뀜 → 리렌더링 O

  // id, isDone, content, date가 바뀌었을 때만 리렌더링 되게 해라
  if (prevProps.id !== nextProps.id) return false;
  if (prevProps.isDone !== nextProps.isDone) return false;
  if (prevProps.content !== nextProps.content) return false;
  if (prevProps.date !== nextProps.date) return false;

  // 바뀐 값이 없다면 리렌더링 하지 마라
  return true;
});
