import React from 'react';

export default class PostItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            vote:0
        };
    }

    //处理点赞逻辑
    handleClick(){
        let vote=this.state.vote;
        vote++;
        this.setState({
            vote:vote
        });
    }

    render(){
        const {title,author,date} = this.props;
        return (
            <li>
                <h3>{title}</h3>
                <p>创建人： {author}</p>
                <p>创建时间： {date}</p>
                <button onClick={()=>{this.handleClick();}}>点赞</button>&nbsp;<span>{this.state.vote}</span>
            </li>
        );
    } 
} 