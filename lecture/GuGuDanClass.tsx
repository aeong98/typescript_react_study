import * as React from 'react';
import {Component} from 'react';

interface State { // state 의 타입추론을 가능하게 한다.
    first: number,
    second: number,
    value: string,
    result: string,
}

class GuGuDan extends Component<{}, State>{ // Component가 제네릭임. component 에 props 가 쓰이고, state가 쓰이고, context 가 쓰이고
    state={
        first :Math.ceil(Math.random()*9),
        second: Math.ceil(Math.random() *9),
        value:'',
        result:'',
    };

   onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                return {
                    result: '정답: ' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: '',
                };
            });
            if (this.input) {
                this.input.focus();
            }
        
        } else {
            this.setState({
                result: '땡',
                value: '',
            });
            if (this.input) {
                this.input.focus();
            }
        }
    };
    
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ value: e.target.value });
    };


    input: HTMLInputElement | null = null; //null 넣으면 앞에 타입을 맞춰줘야함.

    onRefInput = (c: HTMLInputElement) => { this.input = c; };

    render() {
        return (
            <>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input
                        ref={this.onRefInput}
                        type="number"
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

export default GuGuDan;
