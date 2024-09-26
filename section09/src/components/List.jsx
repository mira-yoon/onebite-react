import "./List.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // todos배열에서 현재의 검색결과에 해당하는 값들만 필터링을 해주는 기능
  const getFilteredDate = () => {
    // search가 비어있으면 전체 todos 리턴
    if (search === "") {
      return todos;
    }
    // todo.centent 중에서 search값이 있는 값만 필터링
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  // search state의 값이 바뀔때마다 List컴포넌트가 리렌더링되기 때문에
  // List 컴포넌트가 리렌더링될 때마다 getFilteredDate()를 호출하고 그 결과값을 filteredTodos에 저장
  const filteredTodos = getFilteredDate();

  return (
    <div className="List">
      <h4>Todo List 🌷</h4>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          // 매개변수 todo에 있는 모든 데이터를 props로 전달
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
