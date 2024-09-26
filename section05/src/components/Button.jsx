const Button = ({ text, color = "black", children }) => {
  const onClickButton = (e) => {
    console.log(text);
    console.log(e);
  };
  return (
    <button onClick={onClickButton} style={{ color: color }}>
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
};

export default Button;
