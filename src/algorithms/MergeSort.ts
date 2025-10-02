import type { SortStep, SortAlgorithm } from "./index";

export const mergeSort: SortAlgorithm = (input) => {
    const arr = [...input];
    const steps: SortStep[] = [{ array: arr.slice(), highlighted: [], sorted: [] }];

    const merge = (left: number, mid: number, right: number) => {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);

        let i = 0, j = 0, k = left;

        while (i < leftArr.length && j < rightArr.length) {
            steps.push({ array: arr.slice(), highlighted: [k], sorted: [] });
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            steps.push({ array: arr.slice(), highlighted: [k], sorted: [] });
            k++;
        }

        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++; k++;
            steps.push({ array: arr.slice(), highlighted: [k - 1], sorted: [] });
        }

        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++; k++;
            steps.push({ array: arr.slice(), highlighted: [k - 1], sorted: [] });
        }
    };

    const mergeSortRecursive = (left: number, right: number) => {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);
        mergeSortRecursive(left, mid);
        mergeSortRecursive(mid + 1, right);
        merge(left, mid, right);
    };

    mergeSortRecursive(0, arr.length - 1);

    // legg til siste steg med hele array som "sorted"
    steps.push({ array: arr.slice(), highlighted: [], sorted: arr.map((_, i) => i) });

    return steps;
};
