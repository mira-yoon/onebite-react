import "./List.css";
import TodoItem from "./TodoItem";
import { useState, useMemo } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredDate = () => {
    if (search === "") {
      return todos;
    }

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredDate();

  // 현재 todo들의 상태를 분석해서 수치를 제공하는 함수.(useMemo 실습을 위해 만든 함수. 불필요한 연산을 반복하는 함수임.)
  // 이 연산 과정은 filter()하는 메서드를 이용하고 있기 떄문에 todos state에 저장된 데이터의 개수가 증가할수록 훨씬 더 오래걸리는 함수가 된다.
  // filter 메서드는 배열내의 전체 아이템을 한 번씩 다 순회하기 때문.
  // 또한 이 함수는 컴포넌트 내에서 바로 호출되기 때문에 리스트 컴포넌트가 리렌더링될 때마다 계속 호출이 된다.
  // 인풋에 검색을 할 때마다 getAnalyzedData()이 계속 실행된다. 검색한다고 해서 getAnalyzedData의 결과가 변화하는게 아닌데,
  // 검색을 할 때마다 getAnalyzedData()이 계속 실행되는 것은 명백한 낭비!
  // const getAnalyzedData = () => {
  //   const totalCount = todos.length;
  //   const doneCount = todos.filter((todo) => todo.isDone).length;
  //   const notDoneCount = totalCount - doneCount;

  //   return {
  //     totalCount,
  //     doneCount,
  //     notDoneCount,
  //   };
  // };

  // 첫번째 인수: 콜백함수, 두 번째 인수: 배열(의존성 배열. deps)
  // deps가 변경되었을 때 콜백함수를 다시 실행한다.
  // 콜백함수가 반환하는 값을 useMemo는 그대로 다시 반환한다.
  // const a = useMemo(() => { return 1 }, []); 이렇게 결과값을 변수에 담아서 사용하는게 가능하다는 말.
  // 따라서 이 콜백함수에는 메모이제이션하고 싶은 연산을 넣어주면 된다.
  // 1. 콜백함수가 반환하는 값을 그대로 반환한다.
  // 2. deps를 기준으로 콜백함수를 메모이제이션한다.
  // - deps가 빈 배열일 경우에는 컴포넌트가 최초로 렌더링되었을 때만 콜백함수가 실행된다.(useEffect처럼)
  // - 검색할 때는 연산이 실행되지 않아야 하는데, todo 리스트가 추가 되었을 때는 연산이 실행되어야 한다.
  // - deps에 todos를 추가해주면 todo 리스트가 추가 되었을 때 연산이 실행된다.
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyzedData 호출");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

  return (
    <div className="List">
      <h4>Todo List 🌷</h4>
      <div>total: {totalCount}</div>
      <div>done: {doneCount}</div>
      <div>notDone: {notDoneCount}</div>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
