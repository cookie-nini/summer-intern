import React from 'react';
import like from './img/thumb.png';
import './PostItem.css';

export default class PostItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            editing:false,
            post:props.post
        };
        this.handleEditPost=this.handleEditPost.bind(this);
        this.handleTitleChange=this.handleTitleChange.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.state.post!==nextProps.post){
            this.setState({
                post:nextProps.post
            });
        }
    }

    handleEditPost(){
        if(this.state.editing){
            this.props.onSave({...this.state.post})
        }
        this.setState({
            editing:!this.state.editing
        });
    }

    handleTitleChange(event){
        const newPost={...this.state.post,title:event.target.value};
        this.setState({post:newPost});
    }

    render(){
        const {post}=this.state; 
        return(
            <li className='item'>
                <div className='title'>
                    {this.state.editing?
                        <textarea value={post.title} onChange={this.handleTitleChange}
                        />:post.title}
                </div>
                <div>创建人： {post.author}</div>
                <div>创建时间： {post.date}</div>
                <div className='like'>
                    <span><img src={like} alt='' onClick={()=>{this.props.onVote(post.id)}}/></span>
                    <span>{post.vote}</span>
                </div>
                <button onClick={this.handleEditPost}>{this.state.editing?'保存':'编辑'}</button>
            </li>
        );
    }
}

