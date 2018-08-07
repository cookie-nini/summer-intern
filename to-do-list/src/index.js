import React from 'react';
import ReactDOM from 'react-dom';

//import App from './APP';
import './index.css';

class TypeNew extends React.Component
{
    constructor()
    {
        super();
        this.handleAdd=this.handleAdd.bind(this);
    }

    handleAdd()
    {
        var inputDom=this.refs.inputnew.value;
        //var newthing =inputDom.value.trim();
        var rows=this.props.todo;
        if(inputDom!=='')
        {
            rows.push(inputDom);
            this.props.onAdd(rows);
        }
        this.refs.inputnew.value='';
        
    }

    render()
    {
        return(
            <div>
                <input type='text' ref='inputnew'  placeholder='type a new todo item'/><button onClick={this.handleAdd}>add</button>
            </div>
        )
    }
}

class ListTodo extends React.Component
{
    constructor()
    {
        super();
        this.handleDel=this.handleDel.bind(this);
    }

    handleDel(e)
    {
        var delIndex= e.target.getAttribute('data-key');
        this.props.todo.splice(delIndex,1);//splice数组的删除方法，有两个必备参数，第一个是删除的位置，第二个是删除的元素个数
        this.props.onDel(this.props.todo);
    }

    render()
    {
        return(
            <ul>
                {
                    this.props.todo.map((item,index)=>{return <li key={item.id}><label>{item}</label><button onClick={this.handleDel} data-key={index}>delete</button></li>})
                }                                                                                                                     {/*data自定义属性key，值为index*/}
            </ul>
        )
    }
}

class Todolist extends React.Component
{
    constructor()
    {
        super();
        this.state={
            todolist:[]
        };
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(rows)
    {
        this.setState({
            todolist:rows
        })
    }

    render()
    {
        return(
            <div>
                <TypeNew onAdd={this.handleChange} todo={this.state.todolist}/>
                <ListTodo onDel={this.handleChange} todo={this.state.todolist}/>
                
            </div>
        )
    }
}

ReactDOM.render(<Todolist/>, document.getElementById('root'));
