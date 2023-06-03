import React, { useState } from 'react'
import { Component } from 'react'
import merger from './utils/MergeSort'
import Heapsort from './utils/HeapSort'
import quicky from './utils/QuickSort'
import "../../src/App.css"

class Sorting extends Component  {

    state = {
        count: 40,
        rects: [],
        speed: 100,
        isRunning: 0,
        algo: 0,
        inputString:"enter",
        value:"",
        displaybox:""
    }
    constructor(props) {
        super(props);
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount() {
        let temp=[]
        for (let i = 0; i < this.state.count; i++) {
            temp.push(Math.floor(Math.random() * 20)+1)
        }
        this.setState({rects:temp})
    }

    BubbleSort=async()=>{ 
        if (this.state.isRunning){return}
        this.setState({isRunning:1})
        this.setState({displaybox:"bubbles"})
        console.log("in bb sort")
        let arr=this.state.rects;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < (arr.length - i - 1); j++) {
                    // if (j>0){document.getElementById(`rect-${j-1}`).style.backgroundColor="green";}
                    document.getElementById(`rect-${j+1}`).style.backgroundColor="blue";
                    document.getElementById(`rect-${j}`).style.backgroundColor="blue";
                    if (arr[j] > arr[j + 1]) {
                        var temp = arr[j]
                        arr[j] = arr[j + 1]
                        arr[j + 1] = temp
                    }
                    await sleep(this.state.speed/2);
                    this.setState({rects:arr});
                    await sleep(this.state.speed/2);
                    document.getElementById(`rect-${j+1}`).style.backgroundColor="green";
                    document.getElementById(`rect-${j}`).style.backgroundColor="green";
                }
                document.getElementById(`rect-${this.state.count-i-1}`).style.backgroundColor="orange";

            }
            console.log("completed")
            console.log(this.state.isRunning);
            this.setState({isRunning:0})
        }



        InsertionSort=async()=>{ 
            if (this.state.isRunning){return}
        this.setState({isRunning:1})
        this.setState({displaybox:"inshirt"})
            document.getElementById(`rect-${0}`).style.backgroundColor="orange";
            console.log("in insertion sort")
                let arr=this.state.rects;
                    for (let i = 1; i < this.state.count; i++) {
                        // Choosing the first element in our unsorted subarray
                        let current = arr[i];
                        // The last element of our sorted subarray
                        let j = i-1; 
                        document.getElementById(`rect-${i}`).style.backgroundColor="blue";
                        while ((j > -1) && (current < arr[j])) {
                            let temp=arr[j+1]
                            arr[j+1] = arr[j];
                            arr[j]=temp
                            await sleep(this.state.speed);
                            this.setState({rects:arr});
                            // await sleep(this.state.speed);
                            document.getElementById(`rect-${j+1}`).style.backgroundColor="orange";
                            if(j+1){
                            document.getElementById(`rect-${j}`).style.backgroundColor="blue";}
                            j--;
                            await sleep(this.state.speed);

                        }
                        if(j>=-1){
                        document.getElementById(`rect-${j+1}`).style.backgroundColor="orange";}
                        
                    } 
                console.log("completed")
                this.setState({isRunning:0})
        }
        
// Javascript program in-place Merge Sort
 
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
// Inplace Implementation

StartMergeSort = async()=>{
    if (this.state.isRunning){return}
        this.setState({isRunning:1})
        this.setState({displaybox:"mergerssss"})
    let values=merger(this.state.rects)
    console.log(values)
    for(let i=0;i<values.length;i++){
        
        document.getElementById(`rect-${values[i].a}`).style.backgroundColor="blue";
        document.getElementById(`rect-${values[i].b}`).style.backgroundColor="blue";
        await sleep(this.state.speed);
        this.setState({rects:values[i].array})
        console.log(this.state.rects)
        await sleep(this.state.speed);

        let sorted=[]
        values[i].array.forEach(element => {
            sorted.push(element)
        });
        console.log(sorted)
        sorted.sort((a,b)=>{return (Number(a)-Number(b))})
        let j=0;
        console.log(sorted,this.state.rects)
        while(j<this.state.count){
            if (sorted[j]!==this.state.rects[j]){break}
            j++
        }
    console.log(values[i].fin,j)
    if (j && values[i].fin){

        for(let k=0;k<j;k++){
        document.getElementById(`rect-${k}`).style.backgroundColor="orange";
        }
        for(let k=j;k<this.state.count;k++){
        document.getElementById(`rect-${k}`).style.backgroundColor="green";
        }

    }else{

        document.getElementById(`rect-${values[i].a}`).style.backgroundColor="green";
        document.getElementById(`rect-${values[i].b}`).style.backgroundColor="green";

        }
    }
    console.log("merge sort completed")
    console.log(this.state.rects);
    this.setState({isRunning:0})

}

// Javascript program for in-place Heap Sort

StartHeapSort = async()=>{
    if (this.state.isRunning){return}
        this.setState({isRunning:1})
        this.setState({displaybox:"heaps of respect"})
    let values=Heapsort(this.state.rects)
    for(let i=0;i<values.length;i++){
    console.log(values[i])
        document.getElementById(`rect-${values[i].a}`).style.backgroundColor="blue";
        document.getElementById(`rect-${values[i].b}`).style.backgroundColor="blue";
        await sleep(this.state.speed);
        this.setState({rects:values[i].array})
        console.log(this.state.rects)
        await sleep(this.state.speed);

        let sorted=[]
        values[i].array.forEach(element => {
            sorted.push(element)
        });
        console.log(sorted)
        sorted.sort((a,b)=>{return (Number(a)-Number(b))})
        let j=this.state.count-1;
        console.log(sorted,this.state.rects)
        while(j>=0){
            if (sorted[j]!==this.state.rects[j]){break}
            j--
        }
    console.log(values[i].fin,j)
    if (j && values[i].fin){

        for(let k=this.state.count-1;k>j;k--){
        document.getElementById(`rect-${k}`).style.backgroundColor="orange";
        }
        for(let k=j;k>=0;k--){
        document.getElementById(`rect-${k}`).style.backgroundColor="green";
        }

    }else{

        document.getElementById(`rect-${values[i].a}`).style.backgroundColor="green";
        document.getElementById(`rect-${values[i].b}`).style.backgroundColor="green";

        }
    }
    console.log("merge sort completed")
    console.log(this.state.rects);
    this.setState({isRunning:0})
}



StartQuickSort = async()=>{
    if (this.state.isRunning){return}
        this.setState({isRunning:1})
        this.setState({displaybox:"fast"})
    let values=quicky(this.state.rects)
    console.log(values)
    for(let i=0;i<values.length;i++){
        console.log(values[i].pos,values[i].fin)
        if (values[i].pos===-1){this.setState({rects:values[i].array})
    continue}
    if (document.getElementById(`rect-${values[i].pos}`).style.backgroundColor==="green"){
        document.getElementById(`rect-${values[i].pos}`).style.backgroundColor="red";}
        await sleep(this.state.speed);
        this.setState({rects:values[i].array})
        if (values[i].fin>=0){
        document.getElementById(`rect-${values[i].fin}`).style.backgroundColor="orange";}
        if (document.getElementById(`rect-${values[i].pos}`).style.backgroundColor==="red"){
        document.getElementById(`rect-${values[i].pos}`).style.backgroundColor="green";}

        await sleep(this.state.speed);        
    }
    console.log("quick sort completed")
    console.log(this.state.rects);
    this.setState({isRunning:0})
}
        
SelectionSort=async()=>{
    if (this.state.isRunning){return}
        this.setState({isRunning:1})
        this.setState({displaybox:"selection hogaya mera?"})
    let inputArr= this.state.rects;
    let n = inputArr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(inputArr[j] < inputArr[min]) {
                document.getElementById(`rect-${min}`).style.backgroundColor="green"
                document.getElementById(`rect-${j}`).style.backgroundColor="red"
                await sleep(this.state.speed);   
                min=j; 
            }
         }
         if (1) {
             // Swapping the elements
             let tmp = inputArr[i]; 
             inputArr[i] = inputArr[min];
             inputArr[min] = tmp;   
             document.getElementById(`rect-${i}`).style.backgroundColor="blue";
             document.getElementById(`rect-${min}`).style.backgroundColor="blue";
             await sleep(this.state.speed);   
             this.setState({rects:inputArr});
             await sleep(this.state.speed); 
             document.getElementById(`rect-${i}`).style.backgroundColor="orange";
             if(document.getElementById(`rect-${min}`).style.backgroundColor==="blue")
             {document.getElementById(`rect-${min}`).style.backgroundColor="green"; }
        }
    }
    return inputArr;
  }


    Randomize=()=>{
        if (this.state.isRunning){return}
        let temp=[]
        for (let i = 0; i < this.state.count; i++) {
            temp.push(Math.floor(Math.random() * 20)+1)
        }
        this.setState({rects:temp})
        for (let i = 0; i < this.state.count; i++) {
            document.getElementById(`rect-${i}`).style.backgroundColor="green";

        }
    }
    handleChange=(event)=> {
        this.setState({value: event.target.value});
      }
    
    handleSubmit=(event)=> {
        let inpArr=this.state.value.split(" ");
        let realArr=[]
        inpArr.forEach(element => {
            realArr.push(Number(element))
        });
        this.setState({count : realArr.length})
        this.setState({rects:realArr})
        event.preventDefault();
      }
      handleChange2=(event)=> {
        this.setState({count: event.target.value});
        
      }
    
    handleSubmit2=(event)=> {
        if (this.state.isRunning){return}
        let temp=[]
        for (let i = 0; i < this.state.count; i++) {
            temp.push(Math.floor(Math.random() * 20)+1)
        }
        this.setState({rects:temp})
        console.log(this.state.count)
        event.preventDefault();
      }
    Makefast=()=>{
        console.log("in fast fn")
        this.setState({speed:10})
    }
    Makeslow=()=>{
        console.log("in slow fn")
        this.setState({speed:100})
    }
    Makemedium=()=>{
        console.log("in medium fn")
        this.setState({speed:25})
    }
render(){ 
  return (
        <div className='App'>
        <div>Sorting</div>
        <div>
            <div>
                <div>Enter an Array Manually...</div>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Array input:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                  </label>
                  <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.handleSubmit2}>
                  <label>
                    length input:
                    <input type="integer"  value={this.state.count} onChange={this.handleChange2}/>
                  </label>
                  <input type="submit" value="Submit" />
                </form>
            </div>
            <button onClick={this.BubbleSort}style={{color: !this.state.isRunning?"red":"white"}}>Bubble Sort</button>
            <button onClick={this.SelectionSort}style={{color: !this.state.isRunning?"red":"white"}}>Selection Sort</button>
            <button onClick={this.InsertionSort}style={{color: !this.state.isRunning?"red":"white"}}>Insertion Sort</button>
            <button onClick={this.StartMergeSort} style={{color: !this.state.isRunning?"red":"white"}}>Merge Sort</button>
            <button onClick={this.StartQuickSort}style={{color: !this.state.isRunning?"red":"white"}}>Quick Sort</button>
            <button onClick={this.StartHeapSort}style={{color: !this.state.isRunning?"red":"white"}}>Heap Sort</button>
            <button onClick={this.Randomize} style={{color: !this.state.isRunning?"red":"white"}}>Randomize array</button>
        </div>
        <div>{this.state.displaybox}</div>
        <div>Speed Variation</div>
            <div>
                <button onClick={this.Makeslow}>slow</button>
                <button onClick={this.Makemedium}>medium</button>
                <button onClick={this.Makefast}>fast</button>
            </div>
        <div style={{display:"flex", paddingTop:"100px"}}>
            {this.state.rects?.map((val,index)=>{
            return <div id={index}>
                        <div>{val}</div>
                        <div style={{width:`${Math.floor(40*20/this.state.count)}px`, height:`${20*val}px`, backgroundColor:"green", margin:`${Math.floor(10*10/this.state.count)}px`}} id={`rect-${index}`}></div>
                    </div>})
            }
        </div>
    </div>
  );
}


// handleCountChange = (val) => {
//     this.setState({count: val});
//     this.handleRandomize();
// }

// handleSpeedChanged = (val) => {
//     const speed = (110 - val);
//     this.setState({speed});
// }


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default Sorting