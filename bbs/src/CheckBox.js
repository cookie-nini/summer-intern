import React from 'react';
/*
export default class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            react:false,
            redux:false,
            mobx:false
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target=event.target;
        this.setState({
            [target.name]:target.checked
        });
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    React
                    <input 
                        type='checkbox'
                        name='react'
                        value='react'
                        checked={this.state.react}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Redux
                    <input 
                        type='checkbox'
                        name='redux'
                        value='redux'
                        checked={this.state.redux}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Mobx
                    <input 
                        type='checkbox'
                        name='mobx'
                        value='mobx'
                        checked={this.state.mobx}
                        onChange={this.handleChange}
                    />
                </label>
                <input type='submit' value='submit'/>
            </form>
        );
    }
}
*/

//单选框
export default class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            react:false,
            redux:false,
            mobx:false
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target=event.target;
        this.setState({
            [target.name]:target.checked
        });
    }

    handleSubmit(event){
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    React
                    <input 
                        type='radio'
                        name='react'
                        value='react'
                        checked={this.state.react}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Redux
                    <input 
                        type='radio'
                        name='redux'
                        value='redux'
                        checked={this.state.redux}
                        onChange={this.handleChange}
                    />
                </label>
                <label>
                    Mobx
                    <input 
                        type='radio'
                        name='mobx'
                        value='mobx'
                        checked={this.state.mobx}
                        onChange={this.handleChange}
                    />
                </label>
                <input type='submit' value='submit'/>
            </form>
        );
    }
}