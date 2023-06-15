import { useState } from 'react'
import "./styles.css"
import YoutubeEmbed from './utils/Youtube'

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
    <div className='' style={{marginLeft:"0px"}}>
      <div style={{display:"flex",justifyContent:"center",width:"1500px",margin:"10px"}}><h1 style={{fontWeight:"bolder",color:"orange", textShadow: "0 0 3px blue",border:"solid",paddingLeft:"5px",paddingRight:"5px"}}>CPU SCHEDULING</h1></div>
        <div style={{display:"flex",justifyContent:"left",marginLeft:"50px"}}>
        <div id="sidebar" style={{display:"block"}}>
            <div style={{marginTop:"20px",marginBottom:"20px",textAlign:"center",fontSize:"20px"}}>Select Scheduling Algorithm</div>
            <div style={{display:"flex",justifyContent:"left",width:"600px"}}>
                <div>
                    <div style={{width:"250px",textAlign:"center"}}>Preemptive</div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={rr}>Round-Robin Scheduling</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={pb}>RR Priority (Multi ready queue)</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={srjf}>Shotest Remaining Job First</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={lrjf}>Longest Remaining Job First</button></div>
                </div>
                <div>  
                    <div style={{width:"200px",textAlign:"center"}}>Preemptive(mixed)</div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={rrsjf}>RR-SJF</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={rrljf}>RR-LJF</button></div>
                </div>
                <div>
                    <div style={{width:"200px",textAlign:"center"}}>Non-Preemptive</div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={fcfs}>First come First served</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={sjf}>Shortest Job First</button></div>
                    <div style={{textAlign:"center",marginTop:"10px"}} ><button type="button" class="btn btn-primary btn-sm" onClick={ljf}>Longest Job First</button></div>
                </div>
            </div>
        </div>
        <div id="processBlock" style={{ marginLeft:"50px"}} >
            <div style={{display:"flex",justifyContent:"right"}}>
                <div style={{width:"180px", border:"1px solid", textAlign:"center",backgroundColor:"orange"}}>Process Id</div>
                <div style={{width:"180px", border:"1px solid", textAlign:"center",backgroundColor:"orange"}}>Burst Time</div>
                <div style={{width:"180px", border:"1px solid", textAlign:"center",backgroundColor:"orange"}}>Arrival Time</div>
                <div style={{width:"180px", border:"1px solid", textAlign:"center",backgroundColor:"orange"}}>Priority</div>
                <div style={{width:"22px", textAlign:"center"}}></div>
            </div>
            <div>
                {pro.map((k,v)=>{
                    return <div style={{display:"flex",justifyContent:"right"}} id={`p-${v}`}>
                    <div style={{width:"180px", border:"1px solid", textAlign:"center"}}>P-{k[0]}</div>
                    <div style={{width:"180px", border:"1px solid", textAlign:"center"}}>{k[1]}</div>
                    <div style={{width:"180px", border:"1px solid", textAlign:"center"}}>{k[2]}</div>
                    <div style={{width:"180px", border:"1px solid", textAlign:"center"}}>{k[3]}</div>
                    <div style={{width:"22px", border:"1px solid", textAlign:"center"}} onClick={async()=>{
                        if(running){return}
                        let mat=[];
                        document.getElementById(`p-${v}`).style.backgroundColor="red"
                        await sleep(500)
                        document.getElementById(`p-${v}`).style.backgroundColor=""
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
            <div style={{justifyContent:"right"}}>
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
                    Add:
                    <input type="integer"  value={a} onChange={(e)=>{seta(Number(e.target.value))}} style={{width:"165px"}}/>
                    <input type="integer"  value={b} onChange={(e)=>{setb(Number(e.target.value))}} style={{width:"165px"}}/>
                    <input type="integer"  value={c} onChange={(e)=>{setc(Number(e.target.value))}} style={{width:"165px"}}/>
                    <input type="integer"  value={d} onChange={(e)=>{setd(Number(e.target.value))}} style={{width:"165px"}}/>
                  </label>
                  <input type="submit" value="+" style={{width:"30px",backgroundColor:"green",borderRadius:"20%",fontWeight:"bolder"}}/>
                </form>
            </div>
        </div>
    </div>
    <div style={{display:"flex",marginTop:"50px"}}>
    <div style={{marginLeft:"150px",display:"flex"}}><div style={{width:"110px",marginTop:"35px", fontWeight:"bold"}}>Elapsed Time : </div>
    <div style={{width:"150px",height:"100px", backgroundImage:"url(watch.png)",backgroundSize:"cover",marginLeft:"10px"}}>
    <div style={{postion:"absolute",width:"100px",height:"40px",marginTop:"30px",marginLeft:"20px",marginRight:"2px",padding:"0px",display:"flex",fontFamily:"Orbitron"}}><h3 style={{paddingLeft:'20px',paddingTop:"10px"}}>{time} sec</h3></div> 
    </div>
    </div>
    <div style={{marginLeft:"100px",display:"flex",marginRight:"100px"}} id="processState"> State : {!running?"Process not running":"Process Running"} </div>
            <form onSubmit={(event)=>{event.preventDefault()}}>
                  <label>
                    Quantum:
                    <input type="integer"  value={quantum} onChange={(e)=>{setquantum(Number(e.target.value))}} style={{width:"40px"}}/>
                  </label>
                </form>
                
    </div>
    <div style={{width:"170px",marginLeft:"100px"}}>Ready- Queue (in ram)</div>

        <div style={{display:"flex",marginTop:"30px",marginLeft:"100px"}}>
        <div id="ready-queue" style={{width:"400px",height:"320px",backgroundImage:"url(ram.png)",backgroundSize:"cover"}}>
            
            <div style={{display:"flex",justifyContent:"left",paddingLeft:"65px",paddingTop:"35px"}}>
                        <div style={{width:"60px",textAlign:"center",paddingRight:"10px"}}>P</div>
                        <div className='progress'  style={{width:"206px", display:"flex",justifyContent:"center",height:"25px"}}>
                            % completed
                        </div>
                    
                    </div>
            <div id="elementsinq" style={{marginTop:"10px"}}>
            {q.map((k,v)=>{
                        return <div style={{display:"flex",justifyContent:"left",marginBottom:"0px",marginLeft:"65px"}}>
                        <div style={{width:"60px",textAlign:"center",paddingRight:"10px"}}>P-{pro[k][0]}</div>
                        <div className='progress'  style={{width:"200px", border:"1px solid", textAlign:"center",backgroundColor: "lightgrey",height:"20px"}}>
                            {}
                            <div id={`${k}`} style={{backgroundColor:"green",width:`${(100*pro[k][7]/pro[k][1])}%`,position:"",height:"100%"}}></div>
                        </div>
                    
                    </div>
                    })}
            </div>
        </div>
        <div style={{width:"250px",textAlign:"center",marginLeft:"100px",marginRight:"100px"}}>
            <div> CPU </div>
            <div id="elementsinq" style={{marginTop:"10px"}}>
             <div style={{display:"flex",justifyContent:"left",marginBottom:"2px",border:"solid",width:"250px"}}>
                        <div style={{width:"60px",textAlign:"center",paddingRight:"10px"}} id="cpu-pro-name">P</div>
                        <div className='progress'  style={{width:"250px", border:"1px solid", textAlign:"center",backgroundColor: "lightgrey",height:"25px"}}>
                            <div id={`cpu`} style={{backgroundColor:"green",width:`0%`,height:"100%"}}></div>
                        </div>
                </div>
            </div>
            <div>
                <img src={(running===1 && document.getElementById("cpu-pro-name").innerHTML!=="P")?"cpu.gif":"cpu.png"} alt="" width="200px"></img>
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
        <div style={{margin:"100px"}}>
            <div>Process Run History:</div>
            <div style={{display:"flex", width:"1350px", flexDirection: "row",flexWrap: "wrap"}}>
                {
                    result.map((value,key)=>{
                        let col="red";
                        let pallete=["lightblue","pink","lightgreen","orange","violet",
                                    "red","blue","green","brown","white"];
                        if(value==="NA"){col="lightgrey"}
                        else{
                            col=pallete[(value[0]==="P"?Number(value.slice(2,value.length)):pro[value][0])%10]
                        }
                        return <div style={{border:`${0.5}px solid`,borderColor:"black",height:"20px",justifyContent:"center",width:"80px",backgroundColor:col}}>
                            <div style={{paddingLeft:"30px",paddingRight:"30px",width:"100px",justifyContent:"center"}}>{value[0]==="P"?Number(value.slice(2,value.length)):(value==="NA"?"NA":pro[value][0])}</div>
                        </div>
                    })
                }
            </div>
            {(result.length===0)?<div></div>:<div>(block represents 1 sec )</div>}
        </div>
        <div className='yt-section' style={{paddingLeft:"50px"}}>
        <div style={{display:"flex",marginTop:"30px",marginLeft:"50px",color:"orangered"}}><h2>Learn More </h2></div>
    <hr style={{width:"95%",margin:"auto"}}></hr>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="MZdVAVMgNpA" title="FCFS" /></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="VCIVXPoiLpU" title="SJF" /></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="xL3rlxiPc-Q" title="LJF"/></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="TxjIlNYRZ5M" title="Round Robin"/></div> 
    </div>
    <div className='' style={{display: "flex",marginTop:"30px",color:"green",textAlign:"center"}}>
        
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="rsDGfFxSgiY" title="Priority Based" /></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="n7Owxwfr6Ko" title="TAT and WT" /></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}><YoutubeEmbed embedId="0T5PlFVA9_k" title="I/O breaks" /></div>
   <div className="" style={{marginLeft:"50px",width:"300px"}}></div>
    </div>
        </div>
    </div>
  )
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms/3));
}

export default Cpu