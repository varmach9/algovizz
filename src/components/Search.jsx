import React, { useState } from 'react'
import YoutubeEmbed from './utils/Youtube'


const Search = () => {
    const [arr,setarr]= useState([11,2,13,4,4,15,5,7,8,10,11,12,14,15,17,19,21,23,24,30])
    const [target,settarget]=useState(23)
    const [running,setrunning]=useState(0)
    const [str,setstr]=useState("")
    const [str2,setstr2]=useState("")

    const ls=async()=>{
        if (running){return}
        
        setrunning(1)
        let found=0
        for(let i=0;i<arr.length;i++){
            document.getElementById(i).style.backgroundColor="green"
            await sleep(1000)
            if(arr[i]===target){
                found=1
                for(let k=0;k<arr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
                document.getElementById(i).style.backgroundColor="green"
                break
            }else{
            document.getElementById(i).style.backgroundColor="red"
            await sleep(1000)
            document.getElementById(i).style.backgroundColor="grey"
            }
        }
        if(found===1){
            document.getElementById("result").innerHTML="Found"
          }else{
            document.getElementById("result").innerHTML="Not Found"
          }
        setrunning(0)
    }
    const bs=async()=>{
        if (running){return}
        setrunning(1)
        let found=0
        let newarr=[]
        arr.forEach(element => {
        newarr.push(Number(element))
      });
       newarr.sort(function(a, b){return a-b})
      setarr(newarr)
      let i=0;
      let j=newarr.length-1;
      while(i<=j){
        let mid=Math.floor((i+j)/2)
        document.getElementById(mid).style.backgroundColor="green"
        await sleep(1000)
        if(newarr[mid]===target){
            await sleep(500)
            found=1
            for(let k=0;k<newarr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
            document.getElementById(mid).style.backgroundColor="green"
            break
        }else if(newarr[mid]>target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=mid;k<=j;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            j=mid-1;
        }else if(newarr[mid]<target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=i;k<=mid;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            i=mid+1;
        }
        await sleep(1000)
        document.getElementById(mid).style.backgroundColor="grey"
      }
      if(found===1){
        document.getElementById("result").innerHTML="Found"
      }else{
        document.getElementById("result").innerHTML="Not Found"
      }
      setrunning(0)
    }
    const es=async()=>{
        if (running){return}
        setrunning(1)
        let found=0
        let newarr=[]
        arr.forEach(element => {
        newarr.push(Number(element))
      });
       newarr.sort(function(a, b){return a-b})
      setarr(newarr)

      let ind = 1;
      while (ind < newarr.length && newarr[ind] < target){
        console.log(ind,newarr[ind])
        document.getElementById(ind).style.backgroundColor="green"
        await sleep(1000)
        document.getElementById(ind).style.backgroundColor="red"
        for(let k=0;k<=ind;k++){
            document.getElementById(k).style.backgroundColor="grey"
        }
        await sleep(1000)
        ind = ind * 2;
    }
    if(newarr[ind]===target){
        document.getElementById(ind).style.backgroundColor="green"
        await sleep(1000)
        for(let k=0;k<newarr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
        document.getElementById(ind).style.backgroundColor="green"
        document.getElementById("result").innerHTML="Found"
        setrunning(0)
        return 1
    }else if(ind<newarr.length && newarr[ind]>target){
        document.getElementById(ind).style.backgroundColor="green"
        await sleep(1000)
        document.getElementById(ind).style.backgroundColor="red"
    }
      let i=Math.floor(ind/2)+1;
      let j=Math.min(newarr.length-1,ind-1);
        for(let k=j+1;k<newarr.length;k++){
        document.getElementById(k).style.backgroundColor="grey"
        }
        await sleep(1000)
      while(i<=j){
        let mid=Math.floor((i+j)/2)
        document.getElementById(mid).style.backgroundColor="green"
        await sleep(1000)
        if(newarr[mid]===target){
            await sleep(500)
            found=1
            for(let k=0;k<newarr.length;k++){document.getElementById(k).style.backgroundColor="grey"}
            document.getElementById(mid).style.backgroundColor="green"
            break
        }else if(newarr[mid]>target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=mid;k<=j;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            j=mid-1;
        }else if(newarr[mid]<target){
            document.getElementById(mid).style.backgroundColor="red"
            await sleep(1000)
            for(let k=i;k<=mid;k++){
                document.getElementById(k).style.backgroundColor="grey"
            }
            i=mid+1;
        }
        await sleep(1000)
        document.getElementById(mid).style.backgroundColor="grey"
      }
      if(found===1){
        document.getElementById("result").innerHTML="Found"
      }else{
        document.getElementById("result").innerHTML="Not Found"
      }
      setrunning(0)
    }

    const handleSubmit=(event)=>{
      if(running){return}
      document.getElementById("result").innerHTML=``
      for(let i=0;i<arr.length;i++){ document.getElementById(i).style.backgroundColor="white"}
      let t=str.split(" ")
      let newarr=[]
      t.forEach(element => {
        newarr.push(Number(element))
      });
    //   t.sort(function(a, b){return a-b})
      console.log(t)
      setarr(t)
      event.preventDefault();
    }
    const handleSubmit2=(event)=>{
      if(running){return}
      document.getElementById("result").innerHTML=``
      for(let i=0;i<arr.length;i++){ document.getElementById(i).style.backgroundColor="white"}
      settarget(Number(str2))
      event.preventDefault();
    }
    const randomize=()=>{
      if(running){return}
      let t=[]
      document.getElementById("result").innerHTML=""
      for(let i=0;i<20;i++){
        t.push(Math.ceil(Math.random()*30))
        document.getElementById(i).style.backgroundColor="white"
      }
      setarr(t)
    }
  return (
    <div style={{marginLeft:"50px"}}>
        <div style={{display:"flex",justifyContent:"center",width:"1300px",margin:"10px"}}><h1 style={{fontWeight:"bolder",color:"Red", textShadow: "0 0 1px blue",paddingLeft:"235px",paddingRight:"5px"}}>SEARCHING</h1></div>

      <div >
        <div style={{marginTop:"20px",marginLeft:"100px"}}>
        <div style={{display:"flex"}}>
        <form onSubmit={handleSubmit}>
                  <label>
                    Array input:
                    <input type="text" style={{marginLeft:"17px"}} value={str} onChange={(e)=>{
                        if(running){return}
                        setstr(e.target.value)}}/>
                  </label>
                  <input style={{marginLeft:"10px"}} type="submit" class="btn btn-warning btn-sm" value="Submit" />
          </form>
          <form onSubmit={handleSubmit2} style={{marginLeft:"30px"}}>
                  <label>
                    Target input:
                    <input type="integer" style={{marginLeft:"10px"}} value={str2} onChange={(e)=>{
                        if(running){return}
                        setstr2(e.target.value)}}/>
                  </label>
                  <input style={{marginLeft:"10px"}} type="submit"  class="btn btn-warning btn-sm" value="Submit" />
          </form>
          <div style={{marginLeft:"50px"}}>Target = {target}</div>
          </div>
          <div style={{display:"flex"}}>
            <button class="btn btn-primary btn-sm" style={{marginTop:"20px",marginLeft:"20px", width:"150px"}} onClick={ls}>Linear search</button>
            <button class="btn btn-primary btn-sm" style={{marginTop:"20px",marginLeft:"20px", width:"150px"}} onClick={bs}>Binary-search</button>
            <button class="btn btn-primary btn-sm" style={{marginTop:"20px",marginLeft:"20px", width:"150px"}} onClick={es}>Exponential-search</button>
            <button class="btn btn-success btn-sm" style={{marginTop:"20px",marginLeft:"20px", width:"150px"}} onClick={randomize}>Randomize Array</button>
          </div>
        </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        {arr.map((val,ind)=>{
          return <div id={ind} style={{display:"flex",width:"50px",height:"50px",paddingTop:"10px",justifyContent:"center",border:"solid",marginLeft:"10px",marginTop:"20px",marginBottom:"20px"}}>{val}</div>
        })}
      </div>
        {/* <div>{target}</div> */}
        <div style={{display:"flex"}}>
        <div style={{marginLeft:"200px"}}> Result:</div>
        <div style={{marginLeft:"20px"}}id="result"></div>
        </div>
        </div>
        <div style={{marginTop:"50px",marginLeft:"70px",marginRight:"100px"}}>
        <div>
  <h3>Searching Algorithms:</h3>
  <ul>
    <li><strong>Linear Search:</strong> Start from the beginning of the list and sequentially compare each element with the target value until a match is found or the end of the list is reached.</li>
    <li><strong>Binary Search:</strong> Divide the sorted list into two halves and repeatedly narrow down the search range by comparing the target value with the middle element. Continue dividing and searching until the target value is found or the search range becomes empty.</li>
    <li><strong>Exponential Search:</strong> Start with a small subarray at the beginning of the list and exponentially increase the search range until an element greater than the target value is found. Then perform a binary search within the identified range.</li>
    <li><strong>Jump Search:</strong> Divide the list into fixed-size blocks and perform a linear search in each block to find the block that may contain the target value. Once the block is found, perform a linear search within that block to locate the target value.</li>
    <li><strong>Interpolation Search:</strong> Utilize the distribution of the sorted list by estimating the probable position of the target value. Adjust the search range based on this estimation to narrow down the search space. Repeat this process until the target value is found or the search range becomes empty.</li>
  </ul>
</div>


        </div>

        <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Learn More </h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="T2sFYY-fT5o" title="Binary Search" />  </div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="BDVYtuWXgXE" title="Exponential search"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="BrrZL1RDMwc" title="Bitonic Array search"/></div>
   <div className=" " style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="BSihvQCh9-I" title="Books Allocation"/>    </div>
   </div>

    <div>
    <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Practice Binary Search</h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
<div style={{textAlign:"left",width:"1350px",marginLeft:"30px",marginTop:"10px",marginBottom:"30px"}}>

<ul><li style={{marginTop:"20px"}}><strong>Easy:</strong><p></p><div  id="GFG_AD_gfg_outstream_incontent"></div><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-the-largest-three-elements-in-an-array/">Find the largest three elements in an array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-the-missing-number/">Find the Missing Number</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-first-repeating-element-array-integers/">Find the first repeating element in an array of integers</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/">Find the missing and repeating number</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/search-insert-and-delete-in-a-sorted-array/">Search, insert and delete in a sorted array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/count-1s-sorted-binary-array/">Count 1’s in a sorted binary array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/two-elements-whose-sum-is-closest-to-zero/">Two elements whose sum is closest to zero</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-a-pair-with-the-given-difference/">Find a pair with the given difference</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/k-largestor-smallest-elements-in-an-array/">k largest(or smallest) elements in an array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/kth-smallest-element-in-a-row-wise-and-column-wise-sorted-2d-array/">Kth smallest element in a row-wise and column-wise sorted 2D array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-common-elements-three-sorted-arrays/">Find common elements in three sorted arrays</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/ceiling-in-a-sorted-array/">Ceiling in a sorted array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/floor-in-a-sorted-array/">Floor in a Sorted Array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-the-maximum-element-in-an-array-which-is-first-increasing-and-then-decreasing/">Find the maximum element in an array which is first increasing and then decreasing</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/given-an-array-of-of-size-n-finds-all-the-elements-that-appear-more-than-nk-times/">Given an array of of size n and a number k, find all elements that appear more than n/k times</a></li></ol></li><li style={{marginTop:"20px"}}><strong>Medium:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/">Find all triplets with zero sum</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-the-element-before-which-all-the-elements-are-smaller-than-it-and-after-which-all-are-greater-than-it/">Find the element before which all the elements are smaller than it, and after which all are greater</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-the-largest-pair-sum-in-an-unsorted-array/">Find the largest pair sum in an unsorted array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array/">K’th Smallest/Largest Element in Unsorted Array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/">Search an element in a sorted and rotated array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/">Find the minimum element in a sorted and rotated array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-a-peak-in-a-given-array/">Find a peak element</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/">Maximum and minimum of an array using minimum number of comparisons</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-a-fixed-point-in-a-given-array/">Find a Fixed Point in a given array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-the-k-most-frequent-words-from-a-file/">Find the k most frequent words from a file</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-k-closest-elements-given-value/">Find k closest elements to a given value</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/given-sorted-array-number-x-find-pair-array-whose-sum-closest-x/">Given a sorted array and a number x, find the pair in array whose sum is closest to x</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/given-two-sorted-arrays-number-x-find-pair-whose-sum-closest-x/">Find the closest pair from two sorted arrays</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-three-closest-elements-from-given-three-sorted-arrays/">Find three closest elements from given three sorted arrays</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/binary-search-for-rational-numbers-without-using-floating-point-arithmetic/">Binary Search for Rational Numbers without using floating point arithmetic</a></li></ol></li><li style={{marginTop:"20px"}}><strong>Hard:</strong><p></p><ol><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/median-of-two-sorted-arrays/">Median of two sorted arrays</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/median-of-two-sorted-arrays-of-different-sizes/">Median of two sorted arrays of different sizes</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/search-almost-sorted-array/">Search in an almost sorted array</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/find-position-element-sorted-array-infinite-numbers/">Find position of an element in a sorted array of infinite numbers</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/given-a-sorted-and-rotated-array-find-if-there-is-a-pair-with-a-given-sum/">Given a sorted and rotated array, find if there is a pair with a given sum</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/kth-smallest-largest-element-in-unsorted-array-worst-case-linear-time/">K’th Smallest/Largest Element in Unsorted Array | Worst case Linear Time</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/kth-largest-element-in-a-stream/">K’th largest element in a stream</a></li><li><a style={{textDecoration:"none"}} href="https://www.geeksforgeeks.org/best-first-search-informed-search/">Best First Search (Informed Search)</a></li></ol></li></ul>

</div>
    </div>

    </div>
  )
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Search