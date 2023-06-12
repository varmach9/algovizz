import { useState } from 'react'
import "./styles.css"

const Cpu = () => {
    // id,burst,Arrival,priority,wt,tat,ct,completed time
    const [pro,setpro]=useState([
        [1, 4,  0,  1, 0, 0, 0, 0],
        [2,	1,	1,	2, 0, 0, 0, 0],
        [3, 4,	6,	3, 0, 0, 0, 0],
        [4, 12, 6,	1, 0, 0, 0, 0],
        [5, 3,	8,	3, 0, 0, 0, 0],
        [6, 9,	9,  1, 0, 0, 0, 0],
        [7, 2,	12, 2, 0, 0, 0, 0],
        [8, 4,	14, 2, 0, 0, 0, 0],
        [9, 9,	16, 3, 0, 0, 0, 0],
        [10,7,  18, 1 ,0, 0, 0, 0]
    ])
    const [a,seta]=useState(11)
    const [b,setb]=useState(1)
    const [c,setc]=useState(1)
    const [d,setd]=useState(1)
    const [q,setq]=useState([])
    const [time,settime]=useState(0)
    const [quantum,setquantum]=useState(2)
    const [running,setrunning]=useState(0)
    const [result,setresult]=useState([])
    const refresh=async()=>{
        let mat=[]
        for(let i=0;i<pro.length;i++){
            mat.push([pro[i][0],pro[i][1],pro[i][2],pro[i][3],0,0,0,0])
        }
        setpro(mat)
        await sleep(500)
    }

    const srjf=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in srjf nonRR")
        let qarr=[]
        let proLeft=pro.length
        let times=0
        settime(times)
        for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
        setq(qarr)
        await sleep(500)
        let percentpersec=1
        let timeleft=0
        let quantumleft=10000
        let resultarr=[]
        
        while(proLeft>0 || qarr.length>0 ){
            if(qarr.length===0){
                times+=1
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;}}
                qarr.sort(function(a,b){return pro[a][1]-pro[a][7]-pro[b][1]+pro[b][7]})
                resultarr.push("NA")
                setq(qarr)
                await sleep(500)
                continue
            }
            // allocate a process in cpu 
            document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
            document.getElementById("cpu").style.width=`${100*pro[qarr[0]][7]/pro[qarr[0]][1]}%`
            timeleft=pro[qarr[0]][1]-pro[qarr[0]][7];
            quantumleft=1000;
            let index=qarr[0];
            percentpersec=1/pro[qarr[0]][1];
            qarr=qarr.slice(1,qarr.length)
            setq(qarr)
            await sleep(500)
            // console.log("here",q,qarr);

            // complete a process in cpu 
            while(timeleft>0 && quantumleft>0){
                for(let i=0;i<20;i++){
                    document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                    await sleep(50)
                }
                resultarr.push(index)
                timeleft--;
                times++;
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`);
                if(pro[i][1]<timeleft){quantumleft=0}}}
                qarr.sort(function(a,b){return pro[a][1]-pro[a][7]-pro[b][1]+pro[b][7]})
                setq(qarr)
                await sleep(500)
            }

            // adding process back to ready queue if left
            if(timeleft>0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                mat[index][7]=mat[index][1]-timeleft;
                console.log(`${timeleft} left for process p-${pro[index][0]} at ${times} sec`)
                setpro(mat);

                qarr.push(index);
                qarr.sort(function(a,b){return pro[a][1]-pro[a][7]-pro[b][1]+pro[b][7]});
                setq(qarr);
                await sleep(500)
            }

            // calculating tat and wt if process is completed
            if(timeleft===0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                pro[index][6]=times;
                pro[index][5]=pro[index][6]-pro[index][2]
                pro[index][4]=pro[index][5]-pro[index][1]
                setpro(mat);
                console.log(`P-${pro[index][0]} completed at ${times} sec`)
            }

            // deallocate a process in cpu 
            document.getElementById("cpu").style.width="0%"
            document.getElementById("cpu-pro-name").innerHTML="P"
            await sleep(100)
        }

        console.log("srjf nonRR completed")
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }
    const lrjf=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in lrjf nonRR")
        let qarr=[]
        let proLeft=pro.length
        let times=0
        settime(times)
        for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
        setq(qarr)
        await sleep(500)
        let percentpersec=1
        let timeleft=0
        let quantumleft=quantum
        let resultarr=[]


        while(proLeft>0 || qarr.length>0 ){
            if(qarr.length===0){
                times+=1
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;}}
                qarr.sort(function(a,b){return pro[b][1]-pro[b][7]-pro[a][1]+pro[a][7]})
                resultarr.push("NA")
                setq(qarr)
                await sleep(500)
                continue
            }
            // allocate a process in cpu 
            document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
            document.getElementById("cpu").style.width=`${100*pro[qarr[0]][7]/pro[qarr[0]][1]}%`
            timeleft=pro[qarr[0]][1]-pro[qarr[0]][7];
            quantumleft=1000;
            let index=qarr[0];
            percentpersec=1/pro[qarr[0]][1];
            qarr=qarr.slice(1,qarr.length)
            setq(qarr)
            await sleep(500)
            // console.log("here",q,qarr);

            // complete a process in cpu 
            while(timeleft>0 && quantumleft>0){
                for(let i=0;i<20;i++){
                    document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                    await sleep(50)
                }
                resultarr.push(index)
                timeleft--;
                times++;
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`);if(pro[i][1]>timeleft){quantumleft=0}}}
                qarr.sort(function(a,b){return pro[b][1]-pro[b][7]-pro[a][1]+pro[a][7]})
                setq(qarr)
                await sleep(500)
            }

            // adding process back to ready queue if left
            if(timeleft>0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                mat[index][7]=mat[index][1]-timeleft;
                console.log(`${timeleft} left for process p-${pro[index][0]} at ${times} sec`)
                setpro(mat);

                qarr.push(index);
                qarr.sort(function(a,b){return pro[b][1]-pro[b][7]-pro[a][1]+pro[a][7]});
                setq(qarr);
                await sleep(500)
            }

            // calculating tat and wt if process is completed
            if(timeleft===0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                pro[index][6]=times;
                pro[index][5]=pro[index][6]-pro[index][2]
                pro[index][4]=pro[index][5]-pro[index][1]
                setpro(mat);
                console.log(`P-${pro[index][0]} completed at ${times} sec`)
            }

            // deallocate a process in cpu 
            document.getElementById("cpu").style.width="0%"
            document.getElementById("cpu-pro-name").innerHTML="P"
            await sleep(100)
        }




        console.log("lrjf nonRR completed")
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }

    const rr=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in rr")
        let qarr=[]
        let proLeft=pro.length
        let times=0
        settime(times)
        for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
        setq(qarr)
        await sleep(500)
        let percentpersec=1
        let timeleft=0
        let quantumleft=quantum
        let resultarr=[]

        while(proLeft>0 || qarr.length>0 ){
            if(qarr.length===0){
                times+=1
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;}}
                resultarr.push("NA")
                setq(qarr)
                await sleep(500)
                continue
            }
            // allocate a process in cpu 
            document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
            document.getElementById("cpu").style.width=`${100*pro[qarr[0]][7]/pro[qarr[0]][1]}%`
            timeleft=pro[qarr[0]][1]-pro[qarr[0]][7];
            quantumleft=quantum;
            let index=qarr[0];
            percentpersec=1/pro[qarr[0]][1];
            qarr=qarr.slice(1,qarr.length)
            setq(qarr)
            await sleep(500)
            // console.log("here",q,qarr);

            // complete a process in cpu 
            while(timeleft>0 && quantumleft>0){
                for(let i=0;i<20;i++){
                    document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                    await sleep(50)
                }
                resultarr.push(index)
                timeleft--;
                quantumleft--;
                times++;
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
                setq(qarr)
                await sleep(500)
            }

            // adding process back to ready queue if left
            if(timeleft>0){
                qarr.push(index)
                setq(qarr)
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                mat[index][7]=mat[index][1]-timeleft;
                console.log(`${timeleft} left for process p-${pro[index][0]} at ${times} sec`)
                setpro(mat);
            }

            // calculating tat and wt if process is completed
            if(timeleft===0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                pro[index][6]=times;
                pro[index][5]=pro[index][6]-pro[index][2]
                pro[index][4]=pro[index][5]-pro[index][1]
                setpro(mat);
                console.log(`P-${pro[index][0]} completed at ${times} sec`)
            }

            // deallocate a process in cpu 
            document.getElementById("cpu").style.width="0%"
            document.getElementById("cpu-pro-name").innerHTML="P"
            await sleep(100)

        }
        console.log("rr completed")
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }


    const pb=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in priority based")
        let qarr=[]
        let proLeft=pro.length
        let times=0
        settime(times)
        for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
        qarr.sort(function(a,b){return pro[a][3]-pro[b][3]})
        setq(qarr)
        await sleep(500)
        let percentpersec=1
        let timeleft=0
        let quantumleft=quantum
        let resultarr=[]

        while(proLeft>0 || qarr.length>0 ){
            if(qarr.length===0){
                times+=1
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;}}
                qarr.sort(function(a,b){return pro[a][3]-pro[b][3]})
                resultarr.push("NA")
                setq(qarr)
                await sleep(500)
                continue
            }
            // allocate a process in cpu 
            document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
            document.getElementById("cpu").style.width=`${100*pro[qarr[0]][7]/pro[qarr[0]][1]}%`
            timeleft=pro[qarr[0]][1]-pro[qarr[0]][7];
            quantumleft=quantum;
            let index=qarr[0];
            percentpersec=1/pro[qarr[0]][1];
            qarr=qarr.slice(1,qarr.length)
            setq(qarr)
            await sleep(500)
            // console.log("here",q,qarr);

            // complete a process in cpu 
            while(timeleft>0 && quantumleft>0){
                for(let i=0;i<20;i++){
                    document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                    await sleep(50)
                }
                resultarr.push(index)
                timeleft--;
                quantumleft--;
                times++;
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
                qarr.sort(function(a,b){return pro[a][3]-pro[b][3]})
                setq(qarr)
                await sleep(500)
            }

            // adding process back to ready queue if left
            if(timeleft>0){
                qarr.push(index)
                qarr.sort(function(a,b){return pro[a][3]-pro[b][3]})
                setq(qarr)
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                mat[index][7]=mat[index][1]-timeleft;
                console.log(`${timeleft} left for process p-${pro[index][0]} at ${times} sec`)
                setpro(mat);
            }

            // calculating tat and wt if process is completed
            if(timeleft===0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                pro[index][6]=times;
                pro[index][5]=pro[index][6]-pro[index][2]
                pro[index][4]=pro[index][5]-pro[index][1]
                setpro(mat);
                console.log(`P-${pro[index][0]} completed at ${times} sec`)
            }

            // deallocate a process in cpu 
            document.getElementById("cpu").style.width="0%"
            document.getElementById("cpu-pro-name").innerHTML="P"
            await sleep(100)

        }
        console.log("priority based completed")
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }

    const rrsjf=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in RR srjf")
        let qarr=[]
        let proLeft=pro.length
        let times=0
        settime(times)
        for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
        qarr.sort(function(a,b){return pro[a][1]-pro[a][7]-pro[b][1]+pro[b][7]})
        setq(qarr)
        await sleep(500)
        let percentpersec=1
        let timeleft=0
        let quantumleft=quantum
        let resultarr=[]

        while(proLeft>0 || qarr.length>0 ){
            if(qarr.length===0){
                times+=1
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;}}
                qarr.sort(function(a,b){return pro[a][1]-pro[a][7]-pro[b][1]+pro[b][7]})
                resultarr.push("NA")
                setq(qarr)
                await sleep(500)
                continue
            }
            // allocate a process in cpu 
            document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
            document.getElementById("cpu").style.width=`${100*pro[qarr[0]][7]/pro[qarr[0]][1]}%`
            timeleft=pro[qarr[0]][1]-pro[qarr[0]][7];
            quantumleft=quantum;
            let index=qarr[0];
            percentpersec=1/pro[qarr[0]][1];
            qarr=qarr.slice(1,qarr.length)
            setq(qarr)
            await sleep(500)
            // console.log("here",q,qarr);

            // complete a process in cpu 
            while(timeleft>0 && quantumleft>0){
                for(let i=0;i<20;i++){
                    document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                    await sleep(50)
                }
                resultarr.push(index)
                timeleft--;
                quantumleft--;
                times++;
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
                qarr.sort(function(a,b){return pro[a][1]-pro[a][7]-pro[b][1]+pro[b][7]})
                setq(qarr)
                await sleep(500)
            }

            // adding process back to ready queue if left
            if(timeleft>0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                mat[index][7]=mat[index][1]-timeleft;
                console.log(`${timeleft} left for process p-${pro[index][0]} at ${times} sec`)
                setpro(mat);

                qarr.push(index);
                qarr.sort(function(a,b){return pro[a][1]-pro[a][7]-pro[b][1]+pro[b][7]});
                setq(qarr);
            }

            // calculating tat and wt if process is completed
            if(timeleft===0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                pro[index][6]=times;
                pro[index][5]=pro[index][6]-pro[index][2]
                pro[index][4]=pro[index][5]-pro[index][1]
                setpro(mat);
                console.log(`P-${pro[index][0]} completed at ${times} sec`)
            }

            // deallocate a process in cpu 
            document.getElementById("cpu").style.width="0%"
            document.getElementById("cpu-pro-name").innerHTML="P"
            await sleep(100)

        }
        console.log("srjf RR completed")
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }


    const rrljf=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in RR lrjf")
        let qarr=[]
        let proLeft=pro.length
        let times=0
        settime(times)
        for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
        qarr.sort(function(a,b){return pro[b][1]-pro[b][7]-pro[a][1]+pro[a][7]})
        setq(qarr)
        await sleep(500)
        let percentpersec=1
        let timeleft=0
        let quantumleft=quantum
        let resultarr=[]

        while(proLeft>0 || qarr.length>0 ){
            if(qarr.length===0){
                times+=1
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;}}
                qarr.sort(function(a,b){return pro[b][1]-pro[b][7]-pro[a][1]+pro[a][7]})
                resultarr.push("NA")
                setq(qarr)
                await sleep(500)
                continue
            }
            // allocate a process in cpu 
            document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
            document.getElementById("cpu").style.width=`${100*pro[qarr[0]][7]/pro[qarr[0]][1]}%`
            timeleft=pro[qarr[0]][1]-pro[qarr[0]][7];
            quantumleft=quantum;
            let index=qarr[0];
            percentpersec=1/pro[qarr[0]][1];
            qarr=qarr.slice(1,qarr.length)
            setq(qarr)
            await sleep(500)

            // complete a process in cpu 
            while(timeleft>0 && quantumleft>0){
                for(let i=0;i<20;i++){
                    document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                    await sleep(50)
                }
                resultarr.push(index)
                timeleft--;
                quantumleft--;
                times++;
                settime(times)
                for(let i=0;i<pro.length;i++){if(pro[i][2]===times ){qarr.push(i);proLeft--;console.log(`P-${pro[i][0]} arrived in ready queue at ${times} sec`)}}
                qarr.sort(function(a,b){return pro[b][1]-pro[b][7]-pro[a][1]+pro[a][7]})
                setq(qarr)
                await sleep(500)
            }

            // adding process back to ready queue if left
            if(timeleft>0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                mat[index][7]=mat[index][1]-timeleft;
                console.log(`${timeleft} left for process p-${pro[index][0]} at ${times} sec`)
                setpro(mat);
                qarr.push(index)
                qarr.sort(function(a,b){return pro[b][1]-pro[b][7]-pro[a][1]+pro[a][7]})
                setq(qarr)
            }

            // calculating tat and wt if process is completed
            if(timeleft===0){
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                pro[index][6]=times;
                pro[index][5]=pro[index][6]-pro[index][2]
                pro[index][4]=pro[index][5]-pro[index][1]
                setpro(mat);
                console.log(`P-${pro[index][0]} completed at ${times} sec`)
            }

            // deallocate a process in cpu 
            document.getElementById("cpu").style.width="0%"
            document.getElementById("cpu-pro-name").innerHTML="P"
            await sleep(100)

        }
        console.log("RR lrjf completed")
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }

    const fcfs=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in fcfs")
        let qarr=[]
        let times=time 
        let percentpersec=1
        let timeleft=0
        let proLeft=pro.length
        let resultarr=[]
        while(qarr.length>0 || timeleft!==0  || proLeft>0){
            for(let i=0;i<pro.length;i++){
                if(pro[i][2]===times ){qarr.push(i);proLeft--;}
            }

            if(qarr.length===0){
                if(timeleft!==0){
                    timeleft-=1
                    for(let i=0;i<20;i++){
                        document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                        await sleep(50)
                    }
                    resultarr.push(document.getElementById("cpu-pro-name").innerHTML)
                if(timeleft===0){
                let mat=[]
                for(let j=0;j<pro.length;j++){mat.push(pro[j])}
                let kkk=document.getElementById("cpu-pro-name").innerHTML.length
                let targetProcess=Number(document.getElementById("cpu-pro-name").innerHTML.slice(2,kkk))
                let targetIndex=0;
                console.log(targetProcess,"yp",document.getElementById("cpu-pro-name").innerHTML,kkk)
                for(let i=0;i<pro.length;i++){
                    if (pro[i][0]===targetProcess){targetIndex=i}
                }
                mat[targetIndex][6]=times+1
                mat[targetIndex][5]=mat[targetIndex][6]-mat[targetIndex][2]
                mat[targetIndex][4]=mat[targetIndex][5]-mat[targetIndex][1]
                setpro(mat)
                
                await sleep(500)
                document.getElementById("cpu").style.width="0%"
                document.getElementById("cpu-pro-name").innerHTML="P"
            }
            times+=1
            settime(times)
            continue
            }
            else{
                resultarr.push("NA")
            }
            times+=1
            settime(times)
            continue
        }
            setq(qarr.slice(0,qarr.length))
            await sleep(500)
            if(timeleft===0){
                if(document.getElementById("cpu-pro-name").innerHTML!=="P"){
                    let mat=[]
                    for(let j=0;j<pro.length;j++){mat.push(pro[j])}
                    let kkk=document.getElementById("cpu-pro-name").innerHTML.length
                    let targetProcess=Number(document.getElementById("cpu-pro-name").innerHTML.slice(2,kkk))
                    let targetIndex=0;
                    for(let i=0;i<pro.length;i++){
                        if (pro[i][0]===targetProcess){targetIndex=i}
                    }
                    console.log(targetProcess,"yp",document.getElementById("cpu-pro-name").innerHTML,kkk)
                    
                    mat[targetIndex][6]=times
                    mat[targetIndex][5]=mat[targetIndex][6]-mat[targetIndex][2]
                    mat[targetIndex][4]=mat[targetIndex][5]-mat[targetIndex][1]
                    setpro(mat)
                }
                document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
                document.getElementById("cpu").style.width="0%"
                timeleft=pro[qarr[0]][1]
                percentpersec=1/pro[qarr[0]][1];
                qarr=qarr.slice(1,qarr.length)
                setq(qarr)
                console.log("here",q,qarr);
            }
            timeleft-=1
            for(let i=0;i<20;i++){
                document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                await sleep(50)
            }
            resultarr.push(document.getElementById("cpu-pro-name").innerHTML)
            times+=1
            settime(times)
            await sleep(500)
        }
        console.log("fcfs completed")       
        document.getElementById("cpu").style.width="0%"
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }
    const sjf=async()=>{
        if(running){return}
        setrunning(1)
        refresh()
        console.log("in sjf")
        let qarr=[]
        let times=time 
        let percentpersec=1
        let timeleft=0
        let proLeft=pro.length
        let resultarr=[]
        while(qarr.length>0 || timeleft!==0  || proLeft>0){
            for(let i=0;i<pro.length;i++){
                if(pro[i][2]===times ){qarr.push(i);proLeft--;}
            }
            qarr.sort(function(a,b){return pro[a][1]-pro[b][1]})

            if(qarr.length===0){
                if(timeleft!==0){
                    timeleft-=1
                    for(let i=0;i<20;i++){
                        document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                        await sleep(50)
                    }
                    resultarr.push(document.getElementById("cpu-pro-name").innerHTML)
                if(timeleft===0){
                let mat=[]
                for(let j=0;j<pro.length;j++){mat.push(pro[j])}
                let kkk=document.getElementById("cpu-pro-name").innerHTML.length
                let targetProcess=Number(document.getElementById("cpu-pro-name").innerHTML.slice(2,kkk))
                let targetIndex=0;
                console.log(targetProcess,"yp",document.getElementById("cpu-pro-name").innerHTML,kkk)
                for(let i=0;i<pro.length;i++){
                    if (pro[i][0]===targetProcess){targetIndex=i}
                }
                mat[targetIndex][6]=times+1
                mat[targetIndex][5]=mat[targetIndex][6]-mat[targetIndex][2]
                mat[targetIndex][4]=mat[targetIndex][5]-mat[targetIndex][1]
                setpro(mat)
                
                await sleep(500)
                document.getElementById("cpu").style.width="0%"
                document.getElementById("cpu-pro-name").innerHTML="P"
            }
            times+=1
            settime(times)
            continue
            }else{
                resultarr.push("NA")
            }
            times+=1
            settime(times)
            continue
        }
            setq(qarr.slice(0,qarr.length))
            await sleep(500)
            if(timeleft===0){
                if(document.getElementById("cpu-pro-name").innerHTML!=="P"){
                    let mat=[]
                    for(let j=0;j<pro.length;j++){mat.push(pro[j])}
                    let kkk=document.getElementById("cpu-pro-name").innerHTML.length
                    let targetProcess=Number(document.getElementById("cpu-pro-name").innerHTML.slice(2,kkk))
                    let targetIndex=0;
                    for(let i=0;i<pro.length;i++){
                        if (pro[i][0]===targetProcess){targetIndex=i}
                    }
                    console.log(targetProcess,"yp",document.getElementById("cpu-pro-name").innerHTML,kkk)
                    if(mat[targetIndex][6]===0){
                    mat[targetIndex][6]=times}
                    mat[targetIndex][5]=mat[targetIndex][6]-mat[targetIndex][2]
                    mat[targetIndex][4]=mat[targetIndex][5]-mat[targetIndex][1]
                    setpro(mat)
                // console.log(mat,"ksssssssxsaaaaaa")
                }
                document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
                document.getElementById("cpu").style.width="0%"
                timeleft=pro[qarr[0]][1]
                percentpersec=1/pro[qarr[0]][1];
                qarr=qarr.slice(1,qarr.length)
                setq(qarr)
                console.log("here",q,qarr);
            }
            timeleft-=1
            for(let i=0;i<20;i++){
                document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                await sleep(50)
            }
            resultarr.push(document.getElementById("cpu-pro-name").innerHTML)
            times+=1
            settime(times)
            await sleep(500)
        }
        console.log("sjf completed")       
        document.getElementById("cpu").style.width="0%"
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }
    const ljf=async()=>{
        if(running){return} 
        setrunning(1)
        console.log("in ljf")
        let qarr=[]
        // for(let i=0;i<q.length;i++){qarr.push(q[i])}
        let times=time 
        let percentpersec=1
        let timeleft=0
        let proLeft=pro.length
        let resultarr=[]
        while(qarr.length>0 || timeleft!==0  || proLeft>0){
            // console.log(times,timeleft,qarr,document.getElementById("cpu").style.width)
            for(let i=0;i<pro.length;i++){
                if(pro[i][2]===times ){qarr.push(i);proLeft--;}
            }
            qarr.sort(function(a,b){return pro[b][1]-pro[a][1]})

            if(qarr.length===0){
                if(timeleft!==0){
                    timeleft-=1
                    for(let i=0;i<20;i++){
                        document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                        await sleep(50)
                    }
                    resultarr.push(document.getElementById("cpu-pro-name").innerHTML)
                if(timeleft===0){
                let mat=[]
                for(let j=0;j<pro.length;j++){mat.push(pro[j])}
                let kkk=document.getElementById("cpu-pro-name").innerHTML.length
                let targetProcess=Number(document.getElementById("cpu-pro-name").innerHTML.slice(2,kkk))
                let targetIndex=0;
                console.log(targetProcess,"yp",document.getElementById("cpu-pro-name").innerHTML,kkk)
                for(let i=0;i<pro.length;i++){
                    if (pro[i][0]===targetProcess){targetIndex=i}
                }
                mat[targetIndex][6]=times+1
                mat[targetIndex][5]=mat[targetIndex][6]-mat[targetIndex][2]
                mat[targetIndex][4]=mat[targetIndex][5]-mat[targetIndex][1]
                setpro(mat)
                
                await sleep(500)
                document.getElementById("cpu").style.width="0%"
                document.getElementById("cpu-pro-name").innerHTML="P"
            }
            times+=1
            settime(times)
            continue
            }else{
                resultarr.push("NA")
            }
            times+=1
            settime(times)
            continue
        }
            setq(qarr.slice(0,qarr.length))
            await sleep(500)
            if(timeleft===0){
                if(document.getElementById("cpu-pro-name").innerHTML!=="P"){
                    let mat=[]
                    for(let j=0;j<pro.length;j++){mat.push(pro[j])}
                    let kkk=document.getElementById("cpu-pro-name").innerHTML.length
                    let targetProcess=Number(document.getElementById("cpu-pro-name").innerHTML.slice(2,kkk))
                    let targetIndex=0;
                    for(let i=0;i<pro.length;i++){
                        if (pro[i][0]===targetProcess){targetIndex=i}
                    }
                    console.log(targetProcess,"yp",document.getElementById("cpu-pro-name").innerHTML,kkk)
                    if(mat[targetIndex][6]===0){
                    mat[targetIndex][6]=times}
                    mat[targetIndex][5]=mat[targetIndex][6]-mat[targetIndex][2]
                    mat[targetIndex][4]=mat[targetIndex][5]-mat[targetIndex][1]
                    setpro(mat)
                // console.log(mat,"ksssssssxsaaaaaa")
                }
                document.getElementById("cpu-pro-name").innerHTML=`P-${pro[qarr[0]][0]}`
                document.getElementById("cpu").style.width="0%"
                timeleft=pro[qarr[0]][1]
                percentpersec=1/pro[qarr[0]][1];
                qarr=qarr.slice(1,qarr.length)
                setq(qarr)
                console.log("here",q,qarr);
            }
            timeleft-=1
            for(let i=0;i<20;i++){
                document.getElementById("cpu").style.width=`${Number(document.getElementById("cpu").style.width.slice(0,-1))+(5*percentpersec)}%`
                await sleep(50)
            }
            resultarr.push(document.getElementById("cpu-pro-name").innerHTML)
            times+=1
            settime(times)
            await sleep(500)
        }
        console.log("ljf completed")       
        document.getElementById("cpu").style.width="0%"
        document.getElementById("cpu").style.width="0%"
        setrunning(0)
        settime(0)
        setresult(resultarr)
    }
  return (
    <div>
        <div>Cpu Scheduling</div>
        <div style={{display:"flex",justifyContent:"left"}}>
        <div id="sidebar" style={{display:"block"}}>
            <div style={{marginTop:"20px",marginBottom:"20px",textAlign:"center",fontSize:"20px"}}>Select Scheduling Algorithm</div>
            <div style={{display:"flex",justifyContent:"left",width:"600px"}}>
                <div>
                    <div style={{width:"200px",textAlign:"center"}}>Preemptive</div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={rr}>Round-Robin</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={pb}>RR Priority (Multi ready queue)</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={srjf}>Shotest Remaining Job First</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={lrjf}>Longest Remaining Job First</button></div>
                </div>
                <div>  
                    <div style={{width:"200px",textAlign:"center"}}>Preemptive(mixed)</div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={rrsjf}>RR-SJF</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={rrljf}>RR-LJF</button></div>
                </div>
                <div>
                    <div style={{width:"200px",textAlign:"center"}}>Non-Preemptive</div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={fcfs}>First come First served</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={sjf}>Shortest Job First</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button onClick={ljf}>Longest Job First</button></div>
                </div>
            </div>
        </div>
        <div id="processBlock" style={{ paddingRight:"30px"}} >
            <div style={{display:"flex",justifyContent:"right"}}>
                <div style={{width:"200px", border:"1px solid", textAlign:"center"}}>Process Id</div>
                <div style={{width:"200px", border:"1px solid", textAlign:"center"}}>Burst Time</div>
                <div style={{width:"200px", border:"1px solid", textAlign:"center"}}>Arrival Time</div>
                <div style={{width:"180px", border:"1px solid", textAlign:"center"}}>Priority</div>
                <div style={{width:"21.5px", textAlign:"center"}}></div>
            </div>
            <div>
                {pro.map((k,v)=>{
                    return <div style={{display:"flex",justifyContent:"right"}}>
                    <div style={{width:"200px", border:"1px solid", textAlign:"center"}}>P-{k[0]}</div>
                    <div style={{width:"200px", border:"1px solid", textAlign:"center"}}>{k[1]}</div>
                    <div style={{width:"200px", border:"1px solid", textAlign:"center"}}>{k[2]}</div>
                    <div style={{width:"180px", border:"1px solid", textAlign:"center"}}>{k[3]}</div>
                    <div style={{width:"20px", border:"1px solid", textAlign:"center"}} onClick={()=>{
                        if(running){return}
                        let mat=[];
                        for(let i=0;i<pro.length;i++){
                            if (i!==v){mat.push(pro[i])}
                        }
                        setpro(mat)
                    }}>
                        <img src="trash.webp" width="20px" height="20px"></img>
                    </div>
                </div>
                })}
            </div>
            <div style={{textAlign:"right"}}>
            <form onSubmit={(event)=>{
                if(running){return}
                let mat=[]
                for(let i=0;i<pro.length;i++){mat.push(pro[i])}
                mat.push([a,b,c,d,0,0,0])
                setpro(mat)
                mat.sort((a,b)=>{return a[2]-b[2]})
                seta(Math.max(a+1,pro.length+1))
                event.preventDefault()
            }}>
                  <label>
                    Add Process:
                    <input type="integer"  value={a} onChange={(e)=>{seta(Number(e.target.value))}} style={{width:"195px"}}/>
                    <input type="integer"  value={b} onChange={(e)=>{setb(Number(e.target.value))}} style={{width:"195px"}}/>
                    <input type="integer"  value={c} onChange={(e)=>{setc(Number(e.target.value))}} style={{width:"195px"}}/>
                    <input type="integer"  value={d} onChange={(e)=>{setd(Number(e.target.value))}} style={{width:"175px"}}/>
                  </label>
                  <input type="submit" value="+" style={{width:"20px"}}/>
                </form>
            </div>
        </div>
    </div>
    <div style={{display:"flex"}}>
    <div style={{marginLeft:"200px",display:"flex"}}>Time now = <div style={{marginLeft:"20px",marginRight:"2px",padding:"4px",display:"flex",border:"solid 2px"}}>{time} sec</div> </div>
    <div style={{marginLeft:"100px",display:"flex",marginRight:"100px"}} id="processState"> State : {!running?"Process not running":"Process Running"} </div>
            <form onSubmit={(event)=>{event.preventDefault()}}>
                  <label>
                    Quantum:
                    <input type="integer"  value={quantum} onChange={(e)=>{setquantum(Number(e.target.value))}} style={{width:"40px", margin:"10px"}}/>
                  </label>
                </form>
    </div>
        <div style={{display:"flex",marginTop:"30px"}}>
        <div id="ready-queue" style={{width:"900px",marginLeft:"100px"}}>
            <div>Ready-Queue</div>
            <div style={{display:"flex",justifyContent:"left"}}>
                        <div style={{width:"60px",textAlign:"center",paddingRight:"10px"}}>P</div>
                        <div className='progress'  style={{width:"206px", textAlign:"center"}}>
                            % completed
                        </div>
                    
                    </div>
            <div id="elementsinq" style={{marginTop:"10px"}}>
            {q.map((k,v)=>{
                        return <div style={{display:"flex",justifyContent:"left",marginBottom:"2px",}}>
                        <div style={{width:"60px",textAlign:"center",paddingRight:"10px"}}>P-{pro[k][0]}</div>
                        <div className='progress'  style={{width:"200px", border:"1px solid", textAlign:"center",backgroundColor: "grey"}}>
                            {}
                            <div id={`${k}`} style={{backgroundColor:"green",width:`${(100*pro[k][7]/pro[k][1])}%`,position:"",height:"100%"}}></div>
                        </div>
                    
                    </div>
                    })}
            </div>
        </div>
        <div style={{width:"500px",textAlign:"center",marginLeft:"150px",marginRight:"150px"}}>
            <div> CPU </div>
            <div id="elementsinq" style={{marginTop:"10px"}}>
             <div style={{display:"flex",justifyContent:"left",marginBottom:"2px",border:"solid",width:"200px"}}>
                        <div style={{width:"60px",textAlign:"center",paddingRight:"10px"}} id="cpu-pro-name">P</div>
                        <div className='progress'  style={{width:"200px", border:"1px solid", textAlign:"center",backgroundColor: "grey"}}>
                            <div id={`cpu`} style={{backgroundColor:"green",width:`0%`,height:"100%"}}></div>
                        </div>
                </div>
            </div>
        </div>
        <div style={{textAlign:"right"}}>
        <div style={{display:"flex",justifyContent:"right"}}>
                <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>Process Id</div>
                <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>Waiting Time</div>
                <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>Turn Around Time</div>
                <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>Completion Time</div>
            </div>
            <div>
                {pro.map((k,v)=>{
                    return <div style={{display:"flex",justifyContent:"right"}}>
                    <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>P-{k[0]}</div>
                    <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>{k[4]}</div>
                    <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>{k[5]}</div>
                    <div style={{width:"100px", border:"1px solid", textAlign:"center"}}>{k[6]}</div>
                </div>
                })}
            </div>
        </div>
        </div>
        <div style={{margin:"50px"}}>
            <div>Finish Line</div>
            <div style={{display:"flex", width:"1350px", flexDirection: "row",flexWrap: "wrap"}}>
                {
                    result.map((value,key)=>{
                        let col="red";
                        let pallete=["lightblue","pink","lightgreen","orange","violet",
                                    "red","blue","green","brown","white"];
                        if(value==="NA"){col="grey"}
                        else{
                            col=pallete[(value[0]==="P"?Number(value.slice(2,value.length)):pro[value][0])%10]
                        }
                        return <div style={{border:`${0.5}px solid`,borderColor:"black",height:"20px",justifyContent:"center",width:"80px",backgroundColor:col}}>
                            <div style={{paddingLeft:"30px",paddingRight:"30px",width:"100px",justifyContent:"center"}}>{value[0]==="P"?Number(value.slice(2,value.length)):(value==="NA"?"NA":pro[value][0])}</div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms/3));
}

export default Cpu