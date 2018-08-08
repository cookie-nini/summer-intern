import React from 'react';
import PostItem from './PostItem';
import './PostList.css'

export default class PostList extends React.Component{
	constructor(props){
		super(props);
		this.state={
            posts:[]
        };
        this.timer=null;
		this.handleVote=this.handleVote.bind(this);
	}

    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.setState({
               posts:[
                    {id:1,title:'大家一起来学React吧',author:'张三',date:'2017-09-01 10:00',vote:0},
                    {id:2,title:'前端框架，你最爱哪一个',author:'李四',date:'2017-09-01 12:00',vote:0},
                    {id:3,title:'Web App时代已经到来',author:'王五',date:'2017-09-01 14:00',vote:0}
                ]
            })
        },1000);
    }

    componentWillUnmount(){
        if(this.timer){
            clearTimeout(this.timer);
        }
    }

	handleVote(id){
		const {posts}=this.state;
		const newItem=posts.filter(item=>(item.id===id))[0];
		newItem.vote++;
		this.setState({posts});
	}

	render(){
		return(
		<div className='container'>
			<h2>话题列表</h2>
			<ul>
				{this.state.posts.map(item=>
                    <PostItem post={item} onVote={this.handleVote}/>
                )}
			</ul>
		</div>
		);
	}
}





