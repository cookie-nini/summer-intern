
import React from 'react';
import PostItem from './PostItem';

export default class PostList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            posts:[
                {id:1,title:'大家一起学react吧',author:'张三',date:'2017-09-20 10:00',vote:0},
                {id:2,title:'前端框架，你最爱哪个',author:'李四',date:'2017-09-20 12:00',vote:0},
                {id:3,title:'web app时代已经到来',author:'王五',date:'2017-09-20 14:00',vote:0}
            ]
        };
        this.handleVote=this.handleVote.bind(this);
    }

    handleVote(id){
       
        const post=this.state.posts;
        console.log(post);
        const postItem=post.filter(item=>(item.id===id))[0]; //item.id===id不是表达式，不要加{}
        postItem.vote++;
        this.setState({posts:post});
    }

    render(){
        return(
            <div>
                话题列表：
                <ul>
                    {this.state.posts.map(item=>
                        (<PostItem post={item} onVote={this.handleVote}/>))  //这不是表达式，不要加{}
                    }
                </ul>
            </div>
        )
    }
}


/*解构赋值，什么意思，就是把等号右边的值对应赋给左边。首先两边形式要相同。数组就要[] 对象就要{}。
如果右边的变量数小于左边，此时没法对号入座，所以两边的变量名字必须一样。
举个例子：
const {post}=this.state  //为什么要{}，要保证两边形式一样，右边是个对象。右边对象展开是{posts:[....]}，只有一项，所以不用担心不能对号入座的问题，左边可以随意命名，不用和右边一样
如果不用解构赋值，就细写：const post=this.state.posts //赋值一个数组
                   对应的this.setState({}) 

再举个例子：
const {post}=props; //同理右边是个对象，所以左边最外面要加{}。右边展开是{post:{item},onVote:{this.handleVote}}}，有两项，而左边只有一项，所以必须用同名来提取


{}不是乱加的。在jsx语法里面，如果要解析表达式就要{}，但<></>明显不是表达式，所以不要{}，或者加（）。如果<></>里面有表达式，即html解析不了的，再在这个表达式上加{}

在数组方法里，()=>{}，如果想用{}，里面就必须是表达式，要用return，如果没有就不行,可以用（）


关于定时器
js定时器有两个方法  注意，如果是代码串就要加“”
setInterval("function",millisec),按照指定的周期（以毫秒计）来调用函数或计算表达式。方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
前一个参数是要调用的函数或执行的代码串，第二个参数是时间间隔

setTimeout(function,millisec),在指定的毫秒数后调用函数或计算表达式。
function myFunction()
{
    setTimeout(function(){alert("Hello")},3000);
}

*/