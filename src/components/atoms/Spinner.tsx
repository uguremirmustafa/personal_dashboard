function Spinner(): JSX.Element {
  return (
    <div className="h-screen grid place-items-center bg-base-200">
      <span className="loading loading-spinner loading-2xl"></span>
    </div>
  );
}

export default Spinner;
