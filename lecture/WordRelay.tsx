import * as React from 'react';
import { useCallback, useState, useRef } from 'react';
const WordRelay=()=>{
    const [word, setWord]=useState('제로초');
    const [value,setValue]=useState('');
    const [result, setResult]=useState('');
    const inputEl=useRef<HTMLInputElement>(null);

    const onSubmitForm=useCallback<(e:React.FormEvent)=>void>((e)=>{
        e.preventDefault();
        const input=inputEl.current;
        if(word[word.length -1]===value[0]){
            setResult('딩동댕');
            setWord(value);
            setValue('');
            if(input){
                input.focus();
            }
        }else{
            setResult('땡');
            setValue('');
            if(input){
                input.focus();
            }
        }
    },[word,value]);

    const onChange=useCallback<(e:React.ChangeEvent<HTMLInputElement>) => void>((e)=>{
        setValue(e.currentTarget.value);
    },[]);

    return(
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    value={value}
                    onChange = {onChange} // useCallBack으로 감싸면 e가 타입추론이 안될 수도 있음.
                />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    )
}

export default WordRelay;