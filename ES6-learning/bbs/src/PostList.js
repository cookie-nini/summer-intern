import React from 'react';
import PostItem from './PostItem';

const data=[
    {title:'大家一起来学React吧',author:'张三',date:'2017-09-01 10:00'},
    {title:'前端框架，你最爱哪一个',author:'李四',date:'2017-09-01 12:00'},
    {title:'Web App时代已经到来',author:'王五',date:'2017-09-01 14:00'}
];

export default class PostList extends React.Component{
	render(){
		return(
		<div>
			话题列表：
			<ul>
				{data.map(item=>
                    <PostItem title={item.title} author={item.author} date={item.author}/>
                )}
			</ul>
		</div>
		);
	}
}

