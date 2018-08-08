//react传参有两种方式，字符串和表达式{}
class Item extends React.Component{
	constructor(){
		super();
	}
	render(){
		return <li>{this.props.str}</li>;
	}
}

/*方法一
class List extends React.Component{
	constructor(){
		super();
	}
	render(){
		let aItems=[];
		for(let i=0;i<this.props.arr.length;i++){
			aItems.push(<Item str={this.props.arr[i]}/>)
		}
		return(
		<ul>
            {aItems}
		</ul>
		)
	}
}
*/

/*第二种方法
<List arr={['abc','def','dsfs']}/> 给组件传递这个参数，其实相当于
['abc','def','dsfs']=>[<Item str='abc'/>,<Item str='def'/>,<Item str='dsfs'/>]，也就是映射
*/
class List extends React.Component{
	constructor(){
		super();
	}
	render(){
        let aItems=this.props.arr.map(a=><Item str={a}/>);
		return(
		<ul>
            {aItems}
		</ul>
        )
        //也就是 return(<ul>this.props.arr.map(a=><Item str={a}/>)</ul>)
	}
}
