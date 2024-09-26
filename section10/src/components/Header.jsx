import "./Header.css";
import { memo } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 😘</h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

// const memorizedHeader = memo(Header);
// export default memorizedHeader;
export default memo(Header);
