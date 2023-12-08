import ReactLoading from "react-loading";

function LoadingPage({ isLoad }: { isLoad: boolean }) {
  return (
    <div
      className={`${
        isLoad ? "-translate-y-[0%]" : "-translate-y-[100%]"
      } fixed top-0 z-[999] flex h-screen w-full items-center justify-center bg-slate-100 bg-opacity-80 backdrop-blur-sm duration-300 ease-in-out`}
    >
      <ReactLoading type="bubbles" color="#111827" height={100} width={100} />
    </div>
  );
}

export default LoadingPage;