import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import _ from 'lodash';
import isEqual from 'lodash/isEqual';

class App extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {gameFinished: false, playersTurn: "X", numbersOfWins: [{player: "X", wins: 0}, {player: "O", wins: 0}], buttonValues: ["", "", "", "", "", "", "",         "", ""]};
    this.handleClick = this.handleClick.bind(this);
    this.newGame = this.newGame.bind(this);
  }
  
  handleClick(num) {   
    if (!this.state.gameFinished) {   
      if (this.state.buttonValues[num] === "") {        
        let values = this.state.buttonValues;
        values[num] = this.state.playersTurn;
        this.setState({buttonValues: values});
        if (this.hasWinner()) {
          let winsNumbers = this.state.numbersOfWins;
          winsNumbers.find(winsNumber => winsNumber.player === this.state.playersTurn).wins++;
          this.setState({gameFinished: true, numberOfWins: winsNumbers});
        }
        else if (!this.state.buttonValues.includes("")) {   
          this.setState({gameFinished: true});
        }
        else {         
          this.setState({playersTurn: this.state.playersTurn === "X" ? "O" : "X"});          
        }
      }
    }   
  }

 hasWinner() {
   if (_.isEqual(this.state.buttonValues[0], this.state.buttonValues[1]) &&  _.isEqual(this.state.buttonValues[1], this.state.buttonValues[2]) && ! _.isEqual              (this.state.buttonValues[0], "")) {        
     return true;
   }
   if (_.isEqual(this.state.buttonValues[3], this.state.buttonValues[4]) &&  _.isEqual(this.state.buttonValues[4], this.state.buttonValues[5]) && ! _.isEqual             (this.state.buttonValues[3], "")) { 
  
     return true;
   }
   if (_.isEqual(this.state.buttonValues[6], this.state.buttonValues[7]) &&  _.isEqual(this.state.buttonValues[7], this.state.buttonValues[8]) && ! _.isEqual           (this.state.buttonValues[6], "")) {  
     
     return true;
   }
   if (_.isEqual(this.state.buttonValues[0], this.state.buttonValues[3]) &&  _.isEqual(this.state.buttonValues[3], this.state.buttonValues[6]) && ! _.isEqual              (this.state.buttonValues[0], "")) {       
     return true;
   }
   if (_.isEqual(this.state.buttonValues[1], this.state.buttonValues[4]) &&  _.isEqual(this.state.buttonValues[4], this.state.buttonValues[7]) && ! _.isEqual             (this.state.buttonValues[1], "")) { 
     
     return true;
   }
   if (_.isEqual(this.state.buttonValues[2], this.state.buttonValues[5]) &&  _.isEqual(this.state.buttonValues[5], this.state.buttonValues[8]) && ! _.isEqual             (this.state.buttonValues[2], "")) {  
     
     return true;
   }
  if (_.isEqual(this.state.buttonValues[0], this.state.buttonValues[4]) &&  _.isEqual(this.state.buttonValues[4], this.state.buttonValues[8]) && ! _.isEqual              (this.state.buttonValues[0], "")) {  
    
     return true;
  }
  if (_.isEqual(this.state.buttonValues[2], this.state.buttonValues[4]) &&  _.isEqual(this.state.buttonValues[4], this.state.buttonValues[6]) && ! _.isEqual              (this.state.buttonValues[2], "")) {  
    
     return true;
  }
  return false;     
}

  newGame() {
    this.setState({gameFinished: false, playersTurn: "X", buttonValues: ["", "", "", "", "", "", "", "", ""]});
  }

  render () {             
    const firstRow = this.state.buttonValues.map((buttonValue, index) => <button class="btn" onClick = {() => this.handleClick(index)} id={index} style=        {{height:'50px', width:'50px', border:'2px solid black', backgroundColor:'white'}}>{this.state.buttonValues[index]}</button>).slice(0, 3);
   
    const secondRow = this.state.buttonValues.map((buttonValue, index) => <button class="btn" onClick = {() => this.handleClick(index)} id={index} style=                {{height:'50px', width:'50px', border:'2px solid black', backgroundColor:'white'}}>{this.state.buttonValues[index]}</button>).slice(3, 6);

    const thirdRow = this.state.buttonValues.map((buttonValue, index) => <button class="btn" onClick = {() => this.handleClick(index)} id={index} style=               {{height:'50px', width:'50px', border:'2px solid black', backgroundColor:'white'}}>{this.state.buttonValues[index]}</button>).slice(6, 9);

    return (      
      <div className="App">
        <h4 style = {{paddingBottom: '10px'}}><b>Tic tac toe</b></h4>
        <div style= {{paddingBottom: '5px'}}>
          <label style={{paddingRight:'35px'}}>
            {this.state.numbersOfWins[0].player}: {this.state.numbersOfWins[0].wins}
          </label>
          <label style={{paddingLeft:'35px'}}>
            {this.state.numbersOfWins[1].player}: {this.state.numbersOfWins[1].wins}
          </label>
        </div>
        <div> {firstRow} </div>
        <div> {secondRow} </div>
        <div> {thirdRow} </div>     
        <div>
          <label id="message" style = {{paddingTop: '10px'}}>{(!this.state.gameFinished) ? this.state.playersTurn + " turn" : (this.hasWinner()) ?                               this.state.playersTurn + " wins!" : "Draw!"}</label>  
        </div>
        <div>
          <button class= "btn btn-success" id="new game" onClick = {this.newGame} >Restart</button>
        </div>      
      </div>    
  );}    
}
   

export default App;
