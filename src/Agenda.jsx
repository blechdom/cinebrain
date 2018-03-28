import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import ReactDOM from 'react-dom'
import _ from "lodash";
import 'isomorphic-fetch';
import {Row, Col, Button} from 'react-bootstrap';
import FaLock from 'react-icons/lib/fa/lock';
import FaUnlock from 'react-icons/lib/fa/unlock';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
let lockIcon = <FaLock />;
let socket;

export default class MIDILooper extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      items: [].map(function(i, key, list) {
        return {
          type: 0,
          i: i.toString(),
          x: i * 2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length - 1).toString(),
          inputValue: 0,
        };
      }),
      lock: true,
      compactType: null,
  };
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
  this.handleButtons = this.handleButtons.bind(this);
  this.handleNumberInput = this.handleNumberInput.bind(this);
}
 handleOnLock(){
   if (this.state.lock == true) {
  lockIcon = <FaUnlock />;
    this.setState({lock: false}); 
   } else { 
  lockIcon = <FaLock />;
    this.setState({lock: true});
   } 
 }
 createElement(el) {
    let lockStyle = {
      display: "none",
    };
    if (this.state.lock==false){
      lockStyle = {
        position: "absolute",
        right: "2px",
        top: 0,
        cursor: "pointer",
            display: "inline",
      };
    }
    const gridStyle = {
      background: "#FFF"
    };
    const i = el.add ? "+" : el.i;
    let controllerCode = <button className={el.className} value={el.i} onClick={this.handleButtons}>{el.text}</button>;
    if (el.type==1) { //type is slider
      controllerCode =  <div> <span className="text">{el.text}</span>
                <div id="slidecontainer">
                <input type="range" min="0" max="127" value={el.sliderValue} id={i} className="slider" onChange={this.handleSliders}/></div>
        </div>;
    }
    if (el.type==2) { //type is text input
      controllerCode =  <div> <span className="text">{el.text}</span>
                <div>
                <input type="number" min="0" max="99" value={el.inputValue} id={i} onChange={this.handleNumberInput}/></div>
        </div>;
    }
     return (
        <div key={i} data-grid={el} style={gridStyle}>
            {controllerCode}
            <span style={lockStyle}></span>
        </div>
      );
}

handleButtons(event) {
  console.log(event.target.id + ': ' + event.target.value);

  switch (event.target.value) {
  
  case 'push-record':
     socket.emit('agenda-create-job', {});
    break;
  default:
    console.log('ERROR: Button does not exist');
  }
} 
handleNumberInput(event) {
  console.log(event.target.id + ': ' + event.target.value);
  let input_value = event.target.value;
  switch (event.target.id) {
    case 'Schedule Event':
      socket.emit('agenda-schedule-event', {number:input_value, channel:0});
      break;
    default:
  console.log('ERROR: Input does not exist');
  }
}
onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }
 onLayoutChange(layout) {
    console.log("layout:", layout);
 }
render() {
  return (
      <div><div>
        <Row>
          <Col xs={2} sm={2} md={2} lg={2}>
            <button onClick={this.handleOnLock}>{lockIcon}</button>
          </Col>
          <Col xs={10} sm={10} md={10} lg={10}>
           <strong>Caspar Scheduler</strong>
          </Col>
        </Row>
       <ResponsiveReactGridLayout
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          isDraggable={!this.state.lock}
          isResizable={!this.state.lock}  
          compactType={this.state.compactType}
          {...this.props}
       >
         {_.map(this.state.items, el => this.createElement(el))}
       </ResponsiveReactGridLayout>
     </div>
     <div>{this.state.response}</div>
     </div>
    );
  }
  componentWillUnmount() {
    socket.off(this.props.page);
  }
  componentDidMount() {
    socket = SocketIOClient();
    socket.on('telnet-response', (mesg) => {
      this.setState({response: mesg});
    });
    this.setState({
         items: [
              {
                type: 0,
                i: "push-record",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'RECORD',
              },
                {
                type: 2,
                i: "loop-input",
                x: 5, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 1,
                h: 1,
                text: 'LOOP INPUT',
              },
            ]
      });
}
}
MIDILooper.defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};
