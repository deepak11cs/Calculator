const Button = (props) =>{
    return(
      <button onClick={props.onClickButton} id={props.name} name={props.type} class="button" value={props.symbol}>{props.symbol}</button>
    );
  }
  
  class InputPad extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
      return(
        <div id="input-pad">
          <div id="number-pad">
            <Button onClickButton={this.props.onClickButton} name="clear" symbol="AC" type="clear"/>
            <Button onClickButton={this.props.onClickButton} name="divide" symbol="/" type="operator"/>
            <Button onClickButton={this.props.onClickButton} name="multiply" symbol="X" type="operator"/>
            <Button onClickButton={this.props.onClickButton} name="seven" symbol="7" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="eight" symbol="8" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="nine" symbol="9" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="subtract" symbol="-" type="operator"/>
            <Button onClickButton={this.props.onClickButton} name="four" symbol="4" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="five" symbol="5" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="six" symbol="6" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="add" symbol="+" type="operator"/>
            <Button onClickButton={this.props.onClickButton} name="one" symbol="1" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="two" symbol="2" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="three" symbol="3" type="number"/>
            <Button onClickButton={this.props.onClickButton} name="zero" symbol="0" type="number"/>
            
            <Button onClickButton={this.props.onClickButton} name="decimal" symbol="." type="decimal"/>
            <Button onClickButton={this.props.onClickButton} name="equals" symbol="=" type="equals"/>
            
          </div>
          
        </div>
      );
    }
  }
  
  class Display extends React.Component{
    constructor(props){
      super(props);
    
    }
    render(){
      return(
        <div id="screen">
          <p id="previous">{this.props.previous}</p>
          <p id="display">{this.props.input}</p>
        </div>
      );
    }
  }
  class App extends React.Component{
    constructor(props){
      super(props);
      this.state = { 
        prev: "",
        input: "0"
      }
      this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleButtonClick(event){
      console.log(event);
      event.persist();
      if(event.target.value == 'AC'){
        this.setState({
          input: '0',
          prev: ''
        });
      }
      else if(event.target.value == "="){
        this.setState((state)=>({
          input: Math.round((eval(state.prev)) * 1000000000000) / 1000000000000+"",
          prev: Math.round((eval(state.prev)) * 1000000000000) / 1000000000000+""
        }));
      }
      else if(event.target.name == "operator"){
        if(this.state.input == "+" || this.state.input == "X" || this.state.input=="/" || this.state.input == "-"){
          if(event.target.value == "-" && this.state.prev!="-"){
            this.setState((state)=>({
              input: event.target.value,
              prev: state.prev+event.target.value
            }))
          }
          else if(event.target.value == "X"){
            if(this.state.prev[this.state.prev.length-1] == "-" && (this.state.prev[this.state.prev.length-2]=="*")||(this.state.prev[this.state.prev.length-2]=="/")||(this.state.prev[this.state.prev.length-2]=="+")){
              this.setState((state)=>({
                input: event.target.value,
                prev: state.prev.slice(0,state.prev.length-2)+"*"
              }));
            }
            else{
              this.setState((state)=>({
            input: event.target.value,
            prev: state.prev.slice(0,state.prev.length-1)+"*"
          }));
            }
          }
          else{
            if(this.state.prev[this.state.prev.length-1] == "-" && (this.state.prev[this.state.prev.length-2]=="*")||(this.state.prev[this.state.prev.length-2]=="/")||(this.state.prev[this.state.prev.length-2]=="+")){
              this.setState((state)=>({
                input: event.target.value,
                prev: state.prev.slice(0,state.prev.length-2)+event.target.value
              }));
            }
            else{
              this.setState((state)=>({
            input: event.target.value,
            prev: state.prev.slice(0,state.prev.length-1)+event.target.value
          }));
            }
            
          }
          
        }
        else if(event.target.value == "X"){
          this.setState((state)=>({
            input: event.target.value,
            prev: state.prev+"*"
          }));
          
        }
        
        else{
          this.setState((state)=>({
            input: event.target.value,
            prev: state.prev+event.target.value
          }));
        }
      }
      else{
        if((this.state.input == '0' || this.state.input == '+0' || this.state.input =='-0' || this.state.input == "X0" || this.state.input == "/0" ) && event.target.value == '0'){
          console.log('can not enter 0');
        }
        else if(event.target.value == "."){
         function check(inp){
           for(let i in inp){
             if(inp[i] == ".")
               return true;
           }
           
           return false;
         } if(check(this.state.input)){
           
          }
          else{
            this.setState((state)=>({
              input: state.input+event.target.value,
              prev: state.prev+event.target.value
            }));
          }
        }
        else if(this.state.input == '0'){
          this.setState((state)=>({
            input: event.target.value,
            prev: state.prev + event.target.value
          }))
        }
        else{
          this.setState((state)=>(
          {input: state.input + event.target.value,prev: state.prev+event.target.value}
      ));
        }
        
      }
       
    }
    render(){
      return (
        <>
          <Display input={this.state.input} previous={this.state.prev}/>
          <InputPad onClickButton={this.handleButtonClick}/>
        </>
      );
    }
  }
  ReactDOM.render(<App />, document.getElementById("app"));