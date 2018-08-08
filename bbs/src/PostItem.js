import React from 'react';

function PostItem (props){
    const {post} =props; //这里posts也是一个对象。
    const handleClick=()=>{props.onVote(post.id)};

    return(
        <div>
            <h3>{post.title}</h3>
            <li>
                <p>创建人： {post.author}</p>
                <p>创建时间： {post.date}</p>
                <button onClick={()=>{handleClick()}}>点赞</button> &nbsp;<span>{post.vote}</span>
            </li>
        </div>
    )
}

export default PostItem;

//还需要研究的问题：this，事件绑定