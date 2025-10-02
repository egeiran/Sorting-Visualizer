import SortingVisualizer from "./components/SortingVisualizer";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Sorting Visualizer</h1>
      <SortingVisualizer />
    </div>
  );
}

export default App;
