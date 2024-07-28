export default function Main(props) {
  const { data } = props;
  return (
    <div className="imgContainer">
      <img
        src={data.hdurl}
        alt={data.title || "bg-image"}
        className="bgImage"
      />
    </div>
  );
}
