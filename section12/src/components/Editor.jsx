import "./Editor.css";
import { useState, useRef, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
  // useContext는 인수로 전달한 context로부터 공급된 데이터를 반환해주는 함수.
  // const data = useContext(TodoContext);
  // console.log(data); // context에 전달했던 데이터들이 다 들어있다.
  // 구조분해할당으로 onCreate만 변수에 저장.
  const { onCreate } = useContext(TodoDispatchContext);

  const [content, setContent] = useState("");
  const contentRef = useRef(null);

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    // 새로운 todo를 추가하게 되었을 때 input의 텍스트를 비우기
    setContent("");
  };

  const onkeydown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="Editor">
      <input
        type="text"
        ref={contentRef}
        value={content}
        onKeyDown={onkeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
