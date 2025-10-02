import type { AlgorithmInfo } from "../algorithms";
import { useState } from "react";

type Props = {
  algo: AlgorithmInfo
}

export default function({ algo }: Props){
  const [display, setDisplay] = useState(true);
  if (display){

    return (
      <div className="mt-6 max-w-2xl mx-auto bg-gray-800 text-white rounded-2xl shadow-lg p-6">
          <span className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-left align-center">
              {algo.name}
            </h2>
            <button onClick={() => setDisplay(false)} className="text-4xl font bold text-right align-center">
              +
            </button>
          </span>

          {/* Runtime complexities */}
          <div className="grid grid-cols-3 gap-4 text-center mb-6 mt-4">
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-400">Best Case</p>
              <p className="font-semibold">{algo.best}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-400">Average</p>
              <p className="font-semibold">{algo.average}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-sm text-gray-400">Worst Case</p>
              <p className="font-semibold">{algo.worst}</p>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-green-400 font-semibold mb-2">Pros ✅</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {algo.pros.map((pro, idx) => (
                  <li key={idx}>{pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-red-400 font-semibold mb-2">Cons ❌</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {algo.cons.map((con, idx) => (
                  <li key={idx}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    );
  }

  return (
    <div className="mt-6 max-w-2xl mx-auto bg-gray-800 text-white rounded-2xl shadow-lg p-6">
        <span className="flex flex-row justify-between">
          <h2 className="text-2xl font-bold text-left align-center">
            {algo.name}
          </h2>
          <button onClick={() => setDisplay(true)} className="text-4xl font bold text-right align-center">
            +
          </button>
        </span>
    </div>
  );
}