import React from 'react';
import PostItem from './PostItem';
import './PostList.css';

export default class PostList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts:[]
        };
        this.timer=null;
        this.handleVote=this.handleVote.bind(this);
        this.handleSave=this.handleSave.bind(this);
    }

    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.setState({
                posts:[
                    {id:1,title:'大家一起学react吧',author:'张三',date:'2017-09-20 10:00',vote:0},
                    {id:2,title:'前端框架，你最爱哪个',author:'李四',date:'2017-09-20 12:00',vote:0},
                    {id:3,title:'web app时代已经到来',author:'王五',date:'2017-09-20 14:00',vote:0}
                ]
            })
        },1000);
    }

    handleVote(id){
        const newItem=this.state.posts.filter(item=>item.id===id)[0];
        newItem.vote++; //newItem就是this.state.posts对应的那项，++之后这项也变了
        this.setState({posts:this.state.posts}); //设为最新的this.state.posts
    }

    handleSave(post){
        const newTitle=this.state.posts.filter(item=>item.id===post.id)[0];
        newTitle.title=post.title;
        this.setState({
            posts:this.state.posts
        });
    }

    render(){
        return(
            <div className='container'>
                <h2>话题列表</h2>
                <ul>
                    {this.state.posts.map(item=>
                        <PostItem 
                            key={item.id} 
                            post={item} 
                            onVote={this.handleVote}
                            onSave={this.handleSave}
                        />)
                    }
                </ul>
            </div>
        )
    }
}





  