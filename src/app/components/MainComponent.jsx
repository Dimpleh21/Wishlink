export default function MainComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md px-6 border border-gray-300 rounded-lg shadow-2xs bg-white p-10">
        <h1 className="font-[Raleway] text-4xl text-center mb-6">Main Page</h1>
        <p className="text-center mb-4">Welcome to the main page!</p>
        <button
          type="button"
          className="text-black p-2 rounded"
          style={{
            backgroundColor: "#cdb7ce",
            border: "none",
            cursor: "pointer",
          }}
        >
          Click Me
        </button>
      </div>
    </div>
  );
}
