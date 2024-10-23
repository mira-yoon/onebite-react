import "./App.css";
import { useReducer, useRef, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";

// 로컬스토리지에 저장했으므로 mocData가 필요없음
// const mocData = [
//   {
//     id: 1,
//     createdDate: new Date("2024-10-11").getTime(),
//     emotionId: 1,
//     content: "1번 일기 내용",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2024-10-10").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용",
//   },
//   {
//     id: 3,
//     createdDate: new Date("2024-09-01").getTime(),
//     emotionId: 3,
//     content: "3번 일기 내용",
//   },
// ];

// function reducer(state, action) {
//   switch (action.type) {
//     case "CREATE":
//       return [action.data, ...state];
//     case "UPDATE":
//       return state.map((item) =>
//         String(item.id) === String(action.data.id) ? action.data : item
//       );
//     case "DELETE":
//       return state.filter((item) => String(item.id) !== String(action.id));
//     default:
//       return state;
//   }
// }

// 중괄호로 묶고 return 대신 nextState에 값 넣음. 마지막에 break 넣어서 탈출
function reducer(state, action) {
  let nextState;

  switch (action.type) {
    // INIT케이스에서는 nextStation에 값을 저장하지 않는 이유: 애초에 로컬스토리지로부터 방금 불러온 값
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  // 일기가 생성/수정/삭제될 때마다 로컬스토리지의 diary에 데이터가 저장된다
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  // App컴포넌트가 마운트 될 때 로컬스토리지로부터 데이터를 불러와서 data state의 초기값으로 설정
  useEffect(() => {
    const storedData = localStorage.getItem("diary");

    // 예외처리: storedData가 undefined나 null이라면 종료하기
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    // 예외처리: parsedData가 배열이 아닐 경우에 forEach()를 쓰면 오류가 나므로 종료하기
    if (!Array.isArray(parsedData)) return;

    // 로컬스토리지에 저장된 id값중 가장 높은 값 구하기
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    // 로컬스토리지에 저장된 id값중 가장 높은 값 +1을 해서 idRef에 저장
    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
