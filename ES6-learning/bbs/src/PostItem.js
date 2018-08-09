import React from 'react';
import PropTypes from 'prop-types';
import './PostItem.css';
import like from './img/thumb.png';

export default class PostItem extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        this.props.onVote(this.props.post.id);
    }

    render(){
        const {post}=props;
        return(
            <li className='item'>
                <div className='title'>{post.title}</div>
                <div>创建人： {post.author}</div>
                <div>创建时间： {post.date}</div>
                <div className='like'>
                    <span><img src={like} alt=''onClick={this.handleClick}/></span>
                    <span>{post.vote}</span>
                </div>
            </li>   //试着去实现点赞变色
        )
    }
}

PostItem.propType={
    post:PropTypes.shape({
        id:PropTypes.number,
        title:PropTypes.string,
        author:PropTypes.string,
        date:PropTypes.string,
        vote:PropTypes.number
    }).isRequired,
    onVote:PropTypes.func.isRequired
}