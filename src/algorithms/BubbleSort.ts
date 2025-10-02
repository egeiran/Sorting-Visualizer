import type { SortStep, SortAlgorithm } from "./index";

export const bubbleSort: SortAlgorithm = (input) => {
    const arr = [...input];
    const steps: SortStep[] = [{ array: arr.slice(), highlighted: [], sorted: [] }];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            // steg 1: highlight sammenligning
            steps.push({ array: arr.slice(), highlighted: [j, j + 1], sorted: steps[steps.length - 1].sorted });

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // steg 2: etter bytte (fortsatt highlight)
                steps.push({ array: arr.slice(), highlighted: [j, j + 1], sorted: steps[steps.length - 1].sorted });
            }

            // steg 3: nullstill highlight
            steps.push({ array: arr.slice(), highlighted: [], sorted: steps[steps.length - 1].sorted });
        }

        // etter hver runde er siste element "ferdig"
        const newSorted = [...steps[steps.length - 1].sorted, arr.length - 1 - i];
        steps.push({ array: arr.slice(), highlighted: [], sorted: newSorted });
    }

    return steps;
};
