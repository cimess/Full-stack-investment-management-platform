

interface LoaderProps {
  message?: string;
}

function Loader({ message }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#020617]">
      <section>
        <div className="loader loader-7">
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
      </section>
      {message && (
        <p className="text-cyan-300 mt-6 text-lg font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

export default Loader;

