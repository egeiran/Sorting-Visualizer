import { useState, useEffect, useRef } from "react";
import ArrayBars from "./ArrayBars";
import AlgorithmInfoCard from "./AlgorithmInfoCard";
import type { SortStep, AlgorithmInfo } from "../algorithms/index";
import { bubbleSort, insertionSort, countingSort, mergeSort, bucketSort } from "../algorithms/index";

function generateArray(size: number, max: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

type AlgoSelection = {
  id: number;
  algo: keyof typeof algorithms;
  steps: SortStep[];
};

const algorithms: Record<string, AlgorithmInfo> = {
  Bubble: {
    name: "Bubble Sort",
    fn: bubbleSort,
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    pros: ["Enkel å implementere", "God for små datasett"],
    cons: ["Svært treg for store arrays", "Mange unødvendige sammenligninger"],
  },
  Insertion: {
    name: "Insertion Sort",
    fn: insertionSort,
    best: "O(n)",
    average: "O(n²)",
    worst: "O(n²)",
    pros: ["Enkel", "Bra på nesten-sorterte data"],
    cons: ["Dårlig for store arrays"],
  },
  Counting: {
    name: "Counting Sort",
    fn: countingSort,
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n + k)",
    pros: ["Lineær tid når range er liten", "Stabil sortering"],
    cons: ["Fungerer bare på heltall", "Mye minne om range er stor"],
  },
  Merge: {
    name: "Merge Sort",
    fn: mergeSort,
    best: "O(n log n)",
    average: "O(n log n)",
    worst: "O(n log n)",
    pros: ["Alltid O(n log n)", "Stabil sortering"],
    cons: ["Bruker ekstra minne", "Mer kompleks å implementere"],
  },
  Bucket: {
    name: "Bucket Sort",
    fn: bucketSort,
    best: "O(n + k)",
    average: "O(n + k)",
    worst: "O(n²) hvis dårlig fordelt",
    pros: ["Svært rask på uniformt fordelte data", "Kan håndtere desimaltall"],
    cons: ["Må velge bucket-strategi", "Kan gi ubalanserte buckets"],
  },
};


const allowedSizes = [5, 10, 20, 50, 100, 250];
const allowedSpeeds = [2, 5, 10, 20, 50, 100, 200, 500];

export default function SortingVisualizer() {
  const [array, setArray] = useState<number[]>(generateArray(10, 200));
  // const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  // const [selectedAlgo, setSelectedAlgo] = useState<keyof typeof algorithms>("Bubble");
  const [elapsed, setElapsed] = useState<Number | null>(null); 
  const [arraySizeIdx, setArraySizeIdx] = useState(allowedSizes.indexOf(100));
  const arraySize = allowedSizes[arraySizeIdx];
  const [speedIdx, setSpeedIdx] = useState(allowedSpeeds.indexOf(10));
  const speed = allowedSpeeds[speedIdx];
  const stopRef = useRef(false);


  const [panels, setPanels] = useState<AlgoSelection[]>([
    { id: 1, algo: "Bubble", steps: [] }, // standard 1 panel
  ]);


  function resetArray() {
    setArray(generateArray(arraySize, 200));
    // setSteps([]);
    setCurrentStep(0);
    setIsSorting(false);
    setElapsed(null);
  }

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  async function stopSorters(){
    stopRef.current = true;
    setIsSorting(false)
  }

  async function startSorters() {
    resetArray();
    stopRef.current = false;

    const newPanels = panels.map((p) => {
      const fn = algorithms[p.algo].fn;
      return { ...p, steps: fn(array) };
    });
    
    setPanels(newPanels);
    setIsSorting(true);

    const maxSteps = Math.max(...newPanels.map((p) => p.steps.length));
    const startTime = performance.now();

    for (let i = 0; i < maxSteps; i++) {
      if (stopRef.current) break;

      await new Promise((res) => setTimeout(res, speed));
      setCurrentStep(i);
    }

    const endTime = performance.now();

  if (!stopRef.current){
    setElapsed(endTime - startTime);
  }
    setIsSorting(false);
  }

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() =>
            setPanels((prev) =>
              prev.length < 4
                ? [...prev, { id: Date.now(), algo: "Merge", steps: [] }]
                : prev
            )
          }
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={panels.length >= 4}
        >
          Add Algorithm
        </button>

        <button
          onClick={() => setPanels((prev) => prev.slice(0, -1))}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
          disabled={panels.length <= 1}
        >
          Remove
        </button>
        <button
          onClick={isSorting ? stopSorters: startSorters}
          className={`px-4 py-2 bg-${isSorting ? "red": "green"}-500 text-white rounded`}
        >
          {isSorting ? "Stop": "Start"}
        </button>
        <div className="flex justify-center flex-col gap-2"> 
          <div className="flex items-center gap-2"> 
            <label htmlFor="speed">Stepspeed</label> 
            <input type="range" 
              min={0} 
              max={allowedSpeeds.length - 1} 
              step={1} value={speedIdx} onChange={(e) => setSpeedIdx(Number(e.target.value))} 
              disabled={isSorting} 
              className="accent-teal-400" /> 
            <span>{speed} ms</span> 
          </div> 
          <div className="flex items-center gap-2"> 
            <label htmlFor="arraySize">Array Size</label> 
            <input type="range" 
              min={0} 
              max={allowedSizes.length - 1} 
              step={1} value={arraySizeIdx} 
              onChange={(e) => setArraySizeIdx(Number(e.target.value))} 
              disabled={isSorting} 
              className="accent-teal-400" /> 
            <span>{arraySize} bars</span> 
          </div> 
        </div>
      </div>
        
      <div className={`grid grid-cols-${getCols(panels.length)} gap-6`}>
        {panels.map((p) => (
          <div key={p.id}>
            <select
              value={p.algo}
              onChange={(e) =>
                setPanels((prev) =>
                  prev.map((panel) =>
                    panel.id === p.id ? { ...panel, algo: e.target.value as keyof typeof algorithms } : panel
                  )
                )
              }
              disabled={isSorting}
              className="px-2 py-1 rounded font-bold text-white bg-gray-700"
            >
              {Object.keys(algorithms).map((name) => (
                <option key={name} value={name}>
                  {algorithms[name].name}
                </option>
              ))}
            </select>

            {/* {const stepIndex = Math.min(currentStep, p.steps.length - 1);} */}

            <ArrayBars
              array={p.steps[Math.min(currentStep, p.steps.length - 1)]?.array || array}
              highlighted={p.steps[Math.min(currentStep, p.steps.length - 1)]?.highlighted || []}
              sorted={p.steps[Math.min(currentStep, p.steps.length - 1)]?.sorted || []}
            />

            {/* Info-kort under */}
            <AlgorithmInfoCard algo={algorithms[p.algo]}/>
          </div>
        ))}
      </div>



      {elapsed !== null && (
        <div className="mt-4 text-lg text-center">
          Runtime: <span className="font-bold">{elapsed.toFixed(2)} ms</span>
        </div>
      )}
      </div>
  );
}

function getCols(length: number): string{
  if (length == 1) {
    return "1"
  }
  return "2"
}