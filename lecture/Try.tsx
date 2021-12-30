import * as React from 'react';
import { FunctionComponent } from 'react';
import { useRef, useState } from 'react';
import {TryInfo} from './numberBaseball';

//<{props}> state 는 useState 가 대체해서 제네릭에서는 타이핑이 없습니다.
const Try: FunctionComponent<{tryInfo:TryInfo}> =({tryInfo})=>{
    console.log('try component 입니다');
    console.log(tryInfo);
    return(
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
};

// PropTypes 
export default Try;