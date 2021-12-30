import * as React from 'react';
import { useState, useRef} from 'react';



// <> === React.Fragement 
// typescript 가 변화할 때 위와 같이 변환. React import 안하면, undefined가 되어 버림.
const GuGuDan=()=>{
    const [first, setFirst]= useState(Math.ceil(Math.random() * 9)); // hooks에서는 타입추론이 자동화되어 있음. 
    const [second, setSecond]= useState(Math.ceil(Math.random() * 9));
    const [value, setValue]=useState('');
    const [result, setResult]=useState('');
    const inputEl= useRef<HTMLInputElement>(null); // HTMLInputElement라고 타입을 명시해줘야 함.

    const onSubmitForm=(e : React.FormEvent<HTMLFormElement>)=>{ // 뒤에 명시적으로 formevent 라고 타입을 적어줌.
        e.preventDefault();
        const input =inputEl.current;
        if(parseInt(value)===first * second){ // 정답 맞췄으면 초기화
            setResult('정답');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            if(input){
                input!.focus(); //input! -> input 이 존재한다는 확신을 가졋을 때만.
            }
        }else{
            setResult('땡');
            setValue('');
            if(input){
                input!.focus();
            }
        }
    }

    return(
        <>
            <div>{first} 곱하기 {second}는?</div>
            <div>{result}</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    type="number"
                    value={value}
                    onChange = {(e)=> setValue(e.target.value)} // 같이쓰면 매개변수가 알아서 타입추론이 된다. React.ChangeEvent.
                />
            </form>
        </>
    )
}

export default GuGuDan;