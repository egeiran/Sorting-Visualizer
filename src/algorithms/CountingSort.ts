import type { SortAlgorithm, SortStep } from "./index";

export const countingSort: SortAlgorithm = (input) => {
    const arr = [...input];
    const steps: SortStep[] = [{ array: arr.slice(), highlighted: [], sorted: [] }];

    const maxVal = Math.max(...arr);
    const count = new Array(maxVal + 1).fill(0);

    // Tell forekomster
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]]++;
        steps.push({ array: arr.slice(), highlighted: [i], sorted: steps[steps.length - 1].sorted });
    }

    // Bygg opp sortert array
    let sortedIndex = 0;
    const sortedArr = new Array(arr.length);
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            sortedArr[sortedIndex] = i;
            sortedIndex++;

            // oppdater visning
            const current = sortedArr.concat(arr.slice(sortedIndex)).slice(0, arr.length);
            steps.push({
                array: current,
                highlighted: [sortedIndex - 1],
                sorted: Array.from({ length: sortedIndex }, (_, k) => k),
            });

            count[i]--;

        }
    }

    // Alt sortert
    steps.push({ array: sortedArr, highlighted: [], sorted: Array.from({ length: arr.length }, (_, k) => k) });
    return steps;
}