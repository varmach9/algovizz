let values=[]
let dict={}
function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
        // Swapping elements
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        // Moving to next element
        pivotIndex++;
        }
    }
    
    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    let t=[]
    arr.forEach(element => {
        t.push(element)
    });
    values.push({array:t,fin:pivotIndex,pos:end})
    return pivotIndex;
};
function quickSort(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        if (end in dict){return}
        let t=[]
    arr.forEach(element => {
        t.push(element)
    });
    values.push({array:t,fin:end,pos:end})
    dict[end]=1
        return;
    }
    
    // Returns pivotIndex
    let index = partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    quickSort(arr, start, index - 1);
    quickSort(arr, index + 1, end);
}

export default function quicky(arr){
    quickSort(arr,0,arr.length-1)
    return values
}