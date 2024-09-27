import "./App.css";
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
// import Exam from "./components/Exam";

const mockData = [
  {
    id: 0,
    isDone: false, // 체크박스를 위한 프로퍼티
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

// Context 분리하기
//TodoStateContext : 변경될 수 있는 값 - todos
//TodoDispatchContext : 변경되지 않는 값 - onCreate, onUpdate, onDelete
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

/* useState가 아닌 useReducer 훅을 사용한 상태관리 코드 */
function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  // const onUpdate = (targetId) => {
  //   dispatch({
  //     type: "UPDATE",
  //     targetId: targetId,
  //   });
  // };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  // const onDelete = (targetId) => {
  //   dispatch({
  //     type: "DELETE",
  //     targetId: targetId,
  //   });
  // };

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);

  // 첫 번째 인수: 최적화하고싶은 함수, 두 번째 인수: deps
  // useCallback은 두 번째 인수로 넣은 콜백함수를 그대로 생성해서 반환한다.
  // 이렇게 생성되는 함수는 deps가 변경되었을 때만 최적화를 해준다.(함수를 메모이제이션해 주는 것이다)
  // deps가 빈 배열일 경우에는 컴포넌트가 최초로 렌더링되었을 때만 함수를 생성한다.
  // const func = useCallback(() => {}, []);

  // 최초 렌더링 이후 다시 생성되지 않도록 useMemo로 리턴
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    // Context 분리하기
    // todos는 value로 객체가 아니라 값을 그대로 전달함
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
