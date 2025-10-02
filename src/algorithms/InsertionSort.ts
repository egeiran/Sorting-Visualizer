import type { SortStep, SortAlgorithm } from "./index";

export const insertionSort: SortAlgorithm = (input) => {
    const arr = [...input];
    const steps: SortStep[] = [{ array: arr.slice(), highlighted: [], sorted: [0] }];

    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j] < arr[j - 1]) {
            steps.push({ array: arr.slice(), highlighted: [j, j - 1], sorted: steps[steps.length - 1].sorted });

            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];

            steps.push({ array: arr.slice(), highlighted: [j, j - 1], sorted: steps[steps.length - 1].sorted });
            steps.push({ array: arr.slice(), highlighted: [], sorted: steps[steps.length - 1].sorted });

            j--;
        }

        // nå er elementet på i plassert
        const newSorted = [...steps[steps.length - 1].sorted, i];
        steps.push({ array: arr.slice(), highlighted: [], sorted: newSorted });
    }

    return steps;
};
