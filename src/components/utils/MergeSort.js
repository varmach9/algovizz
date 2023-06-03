let values=[];
let globlen=0;
function merge(arr, start, mid, end)
{
    let fin= (start===0 && end===globlen-1)?1:0
	let start2 = mid + 1;

	// If the direct merge is already sorted
	if (arr[mid] <= arr[start2])
	{
		return;
	}

	// Two pointers to maintain start
	// of both arrays to merge
	while (start <= mid && start2 <= end)
	{
		
		// If element 1 is in right place
		if (arr[start] <= arr[start2])
		{
			start++;
		}
		else
		{
			// let value = arr[start2];
			let index = start2;

			// Shift all the elements between element 1
			// element 2, right by 1.
			while (index != start)
			{
                let k=arr[index]
				arr[index] = arr[index - 1];
                arr[index-1]=k;
                let t=[];
                arr.forEach(i=> {
                    t.push(i)
                });
                let obj={
                    array:t,
                    a:index,
                    b:index-1,
                    fin:fin
                }
                values.push(obj)
				index--;
			}

			start++;
			mid++;
			start2++;
		}
	}
}


function mergeSort(arr, l, r)
{
	if (l < r)
	{
		let m = l + Math.floor((r - l) / 2);
		mergeSort(arr, l, m);
		mergeSort(arr, m + 1, r);
		merge(arr, l, m, r);
	}
}

export default function merger(arr){
    globlen=arr.length
    mergeSort(arr,0,arr.length-1)
    return values
}

