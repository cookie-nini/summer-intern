import React from 'react';

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            password:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target=event.target;
        this.setState({
            [target.name]:target.value
        });
    }

    handleSubmit(event){
        alert('login successfully');
        event.preventDefault();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    username:
                    <input type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                </label>
                <label>
                    password:
                    <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
                </label>
                <input type='submit' value='submit'/>
            </form>
        );
    }
}