import React, { useState } from 'react'
import { Component } from 'react'
import merger from './utils/MergeSort'
import Heapsort from './utils/HeapSort'
import quicky from './utils/QuickSort'
import "../../src/App.css"
import 'bootstrap/dist/css/bootstrap.css';

class Sorting extends Component  {

    state = {
        count: 40,
        countsetter:40,
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
        this.setState({algo:0})
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
        this.setState({algo:2})

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
        this.setState({algo:3})

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
        this.setState({algo:5})

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
        this.setState({algo:4})

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
        this.setState({algo:1})

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
    this.setState({isRunning:0})
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
        for(let i=0;i<this.state.rects.length;i++){document.getElementById(`rect-${i}`).style.backgroundColor="green"}
        event.preventDefault();
      }
      handleChange2=(event)=> {
        this.setState({countsetter: event.target.value});
        
      }
    
    handleSubmit2=(event)=> {
        if (this.state.isRunning){return}
        this.setState({count:this.state.countsetter})
        let temp=[]
        for (let i = 0; i < this.state.countsetter; i++) {
            temp.push(Math.floor(Math.random() * 20)+1)
        }
        this.setState({rects:temp})
        for(let i=0;i<this.state.rects.length;i++){document.getElementById(`rect-${i}`).style.backgroundColor="green"}
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
        <div style={{display:"flex"}}>
        <div style={{width:"590px",backgroundColor:""}}>
        <div style={{diaplay:"flex",justifyContent:"center"}}> <h3>Sorting</h3></div>
        <div>sidebar</div>
        <div id='aboutalgo' style={{height:"200px"}}>ABOUT</div>
        <div>
            <img src="timecomplexity.png" style={{width:"550px"}} alt=""></img>
        </div>
        </div>
        <div style={{alignContent:"center",width:"800px",marginLeft:"30px"}}>
        <div>
            <div>
                <div style={{fontWeight:"bold",fontFamily:"sans-serif"}}>Customize Array</div>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Array input:
                    <input type="text" value={this.state.value} onChange={this.handleChange} style={{marginLeft:"5px"}}/>
                  </label>
                  <input type="submit" value="Submit" class="btn btn-warning btn-sm" style={{marginLeft:"5px"}}/>
                </form>
                <form onSubmit={this.handleSubmit2}  style={{marginLeft:"5px"}}>
                  <label>
                    Set Length:
                    <input type="integer"  value={this.state.countsetter} onChange={this.handleChange2} style={{marginLeft:"5px"}}/>
                  </label>
                  <input type="submit" value="Submit" class="btn btn-warning btn-sm" style={{marginLeft:"5px"}}/>
                </form>
            </div>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.BubbleSort}    style={{ marginLeft:"5px", marginTop:"10px", backgroundColor: !this.state.isRunning?"":((this.state.algo===0)?"green":"lightblue")}}>Bubble Sort</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.SelectionSort} style={{ marginLeft:"5px", marginTop:"10px", backgroundColor: !this.state.isRunning?"":((this.state.algo===1)?"green":"lightblue")}}>Selection Sort</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.InsertionSort} style={{ marginLeft:"5px", marginTop:"10px", backgroundColor: !this.state.isRunning?"":((this.state.algo===2)?"green":"lightblue")}}>Insertion Sort</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.StartMergeSort}style={{ marginLeft:"5px", marginTop:"10px", backgroundColor: !this.state.isRunning?"":((this.state.algo===3)?"green":"lightblue")}}>Merge Sort</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.StartQuickSort}style={{ marginLeft:"5px", marginTop:"10px", backgroundColor: !this.state.isRunning?"":((this.state.algo===4)?"green":"lightblue")}}>Quick Sort</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.StartHeapSort} style={{ marginLeft:"5px", marginTop:"10px", backgroundColor: !this.state.isRunning?"":((this.state.algo===5)?"green":"lightblue")}}>Heap Sort</button>
            <button type="button" class="btn btn-primary btn-sm" onClick={this.Randomize}     style={{ marginLeft:"5px", marginTop:"10px", backgroundColor: !this.state.isRunning?"":((this.state.algo===6)?"green":"lightblue")}}>Randomize array</button>
        </div>
        <div style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>
        <div style={{marginTop:"5px"}}>Adjust Speed:</div>
            <div>
                <button type="button" className={classNames("btn", (this.state.speed!==100)?"btn-light":"btn-info", "btn-sm", "border",(this.state.speed===100)?"border-link":"",(this.state.speed===100)?"border-5":"")} style={{marginLeft:"10px"}} onClick={this.Makeslow}>Slow</button>
                <button type="button" className={classNames("btn", (this.state.speed!==25)?"btn-light": "btn-info", "btn-sm", "border",(this.state.speed===25)?"border-link": "",(this.state.speed===25)?"border-5":"")} style={{marginLeft:"10px" }} onClick={this.Makemedium}>Medium</button>
                <button type="button" className={classNames("btn", (this.state.speed!==10)?"btn-light": "btn-info", "btn-sm", "border",(this.state.speed===10)?"border-link": "",(this.state.speed===10)?"border-5":"")} style={{marginLeft:"10px" }} onClick={this.Makefast}>Fast</button>
            </div>
        </div>
        <div style={{display:"flex", paddingTop:"50px"}}>
            {this.state.rects?.map((val,index)=>{
            return <div id={index}>
                        <div>{val}</div>
                        <div style={{width:`${Math.floor(40*20/this.state.count)}px`, height:`${20*val}px`, backgroundColor:"green", marginRight:`${Math.floor(10*10/this.state.count)}px`, borderRadius:"5px"}} id={`rect-${index}`}></div>
                    </div>})
            }
        </div>
    </div>
    </div>
    </div>
  );
}


}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function classNames(...args) {
    return args.filter(Boolean).join(' ')
  }
export default Sorting