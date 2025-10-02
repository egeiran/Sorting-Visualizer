export type SortStep = {
    array: number[];
    highlighted: number[]; // Indexer som skal markeres
    sorted: number[]; // Indexer som er sortert
};
export type SortAlgorithm = (array: number[]) => SortStep[];

export type AlgorithmInfo = {
    name: string;
    fn: SortAlgorithm;
    best: string;
    average: string;
    worst: string;
    pros: string[];
    cons: string[];
};

export { bubbleSort } from './BubbleSort';
export { insertionSort } from './InsertionSort';
export { countingSort } from "./CountingSort";
export { mergeSort } from "./MergeSort";
export { bucketSort } from "./BucketSort";