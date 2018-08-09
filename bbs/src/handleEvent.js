import React from 'react';

export default class Mycomponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list:[1,2,3,4],
            current:1
        };
    }
  
    handleClick(item){
        this.setState({
            current:item
        });
        console.log(this.state.current);
    }

    render(){
        return(
            <ul>
                {this.state.list.map((item,index)=>(
                    <li style={{cursor:'pointer'}} key={index} className={this.state.current===item?'current':''} 
                    onClick={this.handleClick.bind(this,item)}>{item}
                    </li>  //只改变了current的值，没有显示数据的改变
                ))}
            </ul>
        );
    }
}