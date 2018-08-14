import React from 'react';
import Board from './Board';

export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null),
            xIsnext:true,
            winner:null
        }
        this.renderSquare=this.renderSquare.bind(this);
    }

    render() {
        return (
          <div>
            <div>
              <Board/>
            </div>
            <div>
              <div>{/* status */}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        );
      }
}