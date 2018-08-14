import React from 'react';
import Square from './Square';

export default class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null),
            xIsnext:true,
            winner:null
        }
        this.renderSquare=this.renderSquare.bind(this);
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if(this.calculateWinner(squares)||squares[i]){
            return;
        }
        squares[i]=this.state.xIsnext?'x':'o';
        this.setState({
            squares: squares,
            xIsnext:!this.state.xIsnext
        });
    }

    renderSquare(i){
        const squares=this.state.squares;
        return(
             <Square value={squares[i]} onClick={this.handleClick.bind(this,i)}/> //这里的onclick是属性
        );
    }



    render(){
        const winner=this.calculateWinner(this.state.squares);  //可见每次有更改都会重新渲染
        let status;
        if(winner){
            status='winner: '+winner;
        }else{
            status='next player: '+(this.state.xIsnext? 'x':'o');
        }

        return(
            <div>
                <p>{status}</p>   
                <div>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}