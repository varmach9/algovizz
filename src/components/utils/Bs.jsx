import React from 'react';

function SortingAlgorithms() {
  return (
    <div style={{textAlign:"left", fontSize:"90%"}}>
      <h2 style={{textAlign:"center"}}>Sorting Algorithms</h2>
      <ul>
        <li>
          <strong>Bubble Sort:</strong> Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.
        </li>
        <li>
          <strong>Selection Sort:</strong> Selection Sort repeatedly selects the smallest element from the unsorted part and swaps it with the element at the beginning of the unsorted part.
        </li>
        <li>
          <strong>Insertion Sort:</strong> Insertion Sort builds the final sorted array one element at a time by inserting each element into its correct position in the sorted part.
        </li>
        <li>
          <strong>Merge Sort:</strong> Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves to obtain the final sorted array.
        </li>
        <li>
          <strong>Quick Sort:</strong> Quick Sort selects a pivot element, partitions the array around the pivot, and recursively applies the same process to the sub-arrays before and after the pivot.
        </li>
        <li>
          <strong>Heap Sort:</strong> Heap Sort builds a binary heap from the array and repeatedly extracts the maximum element from the heap to place it in the sorted part of the array.
        </li>
      </ul>
    </div>
  );
}

export default SortingAlgorithms;
