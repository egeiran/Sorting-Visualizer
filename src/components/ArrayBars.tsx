type ArrayBarsProps = {
  array: number[];
  highlighted: number[];
  sorted: number[];
};

export default function ArrayBars({ array, highlighted, sorted }: ArrayBarsProps) {
  return (
    <div className="flex items-end justify-center h-64 divide-x divide-teal-200/20">
      {array.map((value, index) => {
        const isHighlighted = highlighted.includes(index);
        const isSorted = sorted.includes(index);

        let color = "bg-teal-400";
        if (isSorted) {
            color = "bg-green-500";
        } 
        if (isHighlighted) {
            color = "bg-red-500";
        }
        return (
        <div key={index} className="flex flex-col items-center">
          <div
            // className={`rounded-t`}
            className={`rounded-t ${color}`}
            // style={{ height: `${value}px`, width: `${1000 / array.length}px`, backgroundColor: getColor(value, Math.min(...array), Math.max(...array))}}
            style={{ height: `${value}px`, width: `${600 / array.length}px` }}
          />
        </div>);
      })}
    </div>
  );
}

// function getColor(value: number, min: number, max: number): string {
//   // normalize 0 → 1
//   const t = (value - min) / (max - min);

//   // interpolate between blue (low) and red (high)
//   const r = Math.round(255 * t);
//   const g = 50; // keep some constant green for warmth
//   const b = Math.round(255 * (1 - t));

//   return `rgb(${r}, ${g}, ${b})`;
// }
