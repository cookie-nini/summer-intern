import React from 'react';
import PropTypes from 'prop-types';
import './PostItem.css';

function PostItem(props){
    const {post}=props;
    const handleClick=()=>{props.onVote(post.id)};
    return(
        <li className='item'>
            <p className='title'>{post.title}</p>
            <p>创建人： {post.author}</p>
            <p>创建时间： {post.date}</p>
            <div className='like'>
                <span><img onClick={handleClick}/></span>
                <span>{post.vote}</span>
            </div>
        </li>
    )
}

export default PostItem;

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