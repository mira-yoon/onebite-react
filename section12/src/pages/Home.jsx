import { useSearchParams } from "react-router-dom";

// http://localhost:5173/?value=hello로 들어왔을 때.
const Home = () => {
  const [params, setParams] = useSearchParams();
  // params라는 변수에는 queryString으로 전달한 변수와 값이 들어온다.
  // setParams에는 특정 queryString의 값을 변경할 수 있는 함수가 들어오게 된다.
  console.log(params.get("value")); // hello
  return <div>Home</div>;
};

export default Home;
