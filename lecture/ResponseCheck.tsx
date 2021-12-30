import * as React from 'react';
import { useState, useRef, useCallback } from 'react';



const ResponseCheck=()=>{
    const [state,setState]=useState('waiting');
    const [message,setMessage]=useState('클릭해서 시작하세요.');
    const [result,setResult]=useState<number[]>([]); // 빈 배열일 경우에는 항상 제네릭으로 타입을 잡아야함.₩
    const timeout=useRef<number | null>(null);
    const startTime=useRef(0);
    const endTime=useRef(0);
    

    // ref 를 쓰는 이유 -> 값이 바뀌어도 화면이 리렌더링되지 않도록 하기 위해서
    // useRef 종류 3개
    // 제네릭으로 mutable 한 객체로 오버라이딩할 수 있음 
    const onClickScreen=useCallback(()=>{
        console.log(state);
        if(state==="waiting"){
            // 브라우저의 setTimeout 을 사용한다는 것을 명시해줘야함
            timeout.current=window.setTimeout(()=>{ //timeout에 useRef 로 저장해야지, 나중에 clearTimeout을 할 수 있음.
                setState('now');
                setMessage('지금 클릭');
                startTime.current=new Date().getTime();
            }, Math.floor(Math.random()*1000) +2000); // 2초 ~ 3초 랜덤 시간이 지난 후에 'now'로 바뀜
            setState("ready");
            setMessage("초록색이 되면 클릭하세요.");
        }
        else if(state==="ready"){ // 성급하게 클릭 (state가 now 로 바뀌기 이전에)
            if(timeout.current){
                clearTimeout(timeout.current);
            }
            setState("waiting");
            setMessage("너무 성급하시군요! 초록색이 된 후에 클릭하세요.");
        }
        else if(state==="now"){
            endTime.current= new Date().getTime();
            setState("waiting");
            setMessage("클릭해서 시작하세요");
            setResult((prevResult)=>{
                return [...prevResult, endTime.current-startTime.current];
            });
        }
    },[state,message,result])


    const onReset=useCallback(()=>{
        setResult([]);
    },[])

    const renderAverage = ()=>{
        return result.length === 0 ? null : 
        <>
            <div>평균 시간 : {result.reduce((a,c)=>a+c) /result.length }ms</div>
            <button onClick={onReset}>리셋</button>
        </>
    };

    return(
        <>
            <div 
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheck;