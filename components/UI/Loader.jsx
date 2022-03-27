function Loader({ text = "Loading..." }) {
  return (
    <div className="loading">
        <div className="loading-blocks">
          <div className="block" />
          <div className="block" />
          <div className="block" />
        </div>
        <div className="loading-blocks__text">{text}</div>
      </div>
  );
}

export default Loader;
