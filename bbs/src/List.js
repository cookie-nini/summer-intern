import React from 'react';

export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:'mobx'
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            value:event.target.value
        });
    }

    handleSubmit(event){
        alert(`you picked ${this.state.value}`);
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    pick one library:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value='react'>React</option>
                        <option value='redux'>Redux</option>
                        <option value='mobx'>Mobx</option>
                    </select>
                </label>
                <input type='submit' value='submit'/>
            </form>
        );
    }
}