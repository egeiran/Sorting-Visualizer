import type { SortStep, SortAlgorithm } from "./index";
import { insertionSort } from "./InsertionSort"; // gjenbruk eksisterende

export const bucketSort: SortAlgorithm = (input) => {
    const src = [...input];
    const steps: SortStep[] = [{ array: src.slice(), highlighted: [], sorted: [] }];
    if (src.length === 0) return steps;

    const min = Math.min(...src);
    const max = Math.max(...src);

    const bucketCount = Math.max(1, Math.floor(Math.sqrt(src.length)));
    const bucketSize = Math.floor((max - min) / bucketCount) + 1;

    const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

    // 👇 vi bruker bucketView som "arbeidsarray" helt til sortering
    let bucketView: number[] = [];

    // 1) Fyll bøttene og vis bucketView
    for (let i = 0; i < src.length; i++) {
        let idx = Math.floor((src[i] - min) / bucketSize);
        if (idx >= bucketCount) idx = bucketCount - 1;
        buckets[idx].push(src[i]);

        bucketView = buckets.flat();
        const view = bucketView.concat(Array(src.length - bucketView.length).fill(NaN));
        steps.push({
            array: view,
            highlighted: [bucketView.length - 1],
            sorted: []
        });
    }

    // 2) Nå begynner vi på ordentlig sortering av hver bøtte
    const arr = bucketView.slice(); // sluttarray
    let write = 0;
    let sortedSoFar: number[] = [];

    for (let b = 0; b < bucketCount; b++) {
        const bucket = buckets[b];
        if (bucket.length === 0) continue;

        // sorter bøtta med insertionSort og map til globalt array
        const bucketSteps = insertionSort(bucket);

        for (const step of bucketSteps) {
            const newArr = arr.slice();
            for (let i = 0; i < step.array.length; i++) {
                newArr[write + i] = step.array[i];
            }
            steps.push({
                array: newArr,
                highlighted: step.highlighted.map(i => write + i),
                sorted: [...sortedSoFar, ...step.sorted.map(i => write + i)]
            });
        }

        // Bruk den ferdig sorterte bøtta fra siste steg
        const finalBucket = bucketSteps[bucketSteps.length - 1].array.slice();
        for (let i = 0; i < finalBucket.length; i++) {
            arr[write + i] = finalBucket[i];
        }

        // highlight at hele bøtta er ferdig
        const bucketRange = Array.from({ length: finalBucket.length }, (_, i) => write + i);
        sortedSoFar = [...sortedSoFar, ...bucketRange];
        steps.push({ array: arr.slice(), highlighted: [], sorted: sortedSoFar });

        write += finalBucket.length;
    }

    // 3) Til slutt: markér alt som sortert
    steps.push({
        array: arr.slice(),
        highlighted: [],
        sorted: Array.from({ length: arr.length }, (_, i) => i)
    });

    return steps;
};
