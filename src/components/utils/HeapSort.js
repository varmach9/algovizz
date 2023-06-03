let values=[]
export default function Heapsort( arr)
    {
        var N = arr.length;

        // Build heap (rearrange array)
        for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
            heapify(arr, N, i);

        // One by one extract an element from heap
        for (var i = N - 1; i > 0; i--) {
            // Move current root to end
            var temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            let t=[]
            arr.forEach(ii => {
                t.push(ii)
            });
            values.push({
                array:t,
                a:0,
                b:i,
                fin:1
            })

            // call max heapify on the reduced heap
            heapify(arr, i, 0);
        }
        return values
    }

    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
    function heapify(arr, N, i)
    {
        var largest = i; // Initialize largest as root
        var l = 2 * i + 1; // left = 2*i + 1
        var r = 2 * i + 2; // right = 2*i + 2

        if (l < N && arr[l] > arr[largest])
            largest = l;
        if (r < N && arr[r] > arr[largest])
            largest = r;
        if (largest != i) {
            var swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            let t=[]
            arr.forEach(ii => {
                t.push(ii)
            });
            values.push({
                array:t,
                a:largest,
                b:i,
                fin:1
            })
            heapify(arr, N, largest);
        }
    }
