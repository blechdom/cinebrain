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

export default class DMXGroup1 extends React.Component {

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
	        sliderValue: 0,
        };
      }),
      lock: true,
      host: '127.0.0.1',
      port: 5250,
      command: "",
      response: '',
      compactType: null,
      spot_speed: 215,
  };
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
  this.handleButtons = this.handleButtons.bind(this);
  this.handleSliders = this.handleSliders.bind(this);
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
                <input type="range" min="1" max="255" value={el.sliderValue} id={i} className="slider" onChange={this.handleSliders}/></div>
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
  
  case 'spot_on':
     socket.emit('dmx-go', {5:0, 6: 216, 7:255 });
    break;
  case 'spot_off':
     socket.emit('dmx-go', {6: 0, 7:0});
    break;
  case 'wash_on':
     socket.emit('dmx-go', {16:255 });
    break;
  case 'wash_off':
     socket.emit('dmx-go', {16: 0});
    break;
  case 'wash_white':
     socket.emit('dmx-go', {17: 0, 18:0, 19:0, 20:255});
    break;
  case 'wash_red':
     socket.emit('dmx-go', {17: 255, 18:0, 19:0, 20:0});
    break;
  case 'wash_green':
     socket.emit('dmx-go', {17: 0, 18:255, 19:0, 20:0});
    break;
  case 'wash_blue':
     socket.emit('dmx-go', {17: 0, 18:0, 19:255, 20:0});
    break;
  case 'wash_yellow':
     socket.emit('dmx-go', {17: 255, 18:255, 19:0, 20:0});
    break;
  case 'dmx_off': 
    socket.emit('dmx-go', {6: 0, 7:0, 16:0});
    break;

  default:
    console.log('ERROR: Button does not exist');
  }
} 
handleSliders(event) {
  console.log(event.target.id + ': ' + event.target.value);
  let slider_value = event.target.value;
  switch (event.target.id) {
  case 'spot_pan':
      socket.emit('dmx-go', {0: slider_value});
      break;
  case 'spot_tilt':
      socket.emit('dmx-go', {1: slider_value});
      break;
   case 'spot_speed':
      socket.emit('dmx-go', {4: slider_value});
      this.state.spot_speed = slider_value;
      break;
  case 'spot_fine_pan':
      socket.emit('dmx-go', {2: slider_value});
      break;
  case 'spot_fine_tilt':
      socket.emit('dmx-go', {3: slider_value});
      break;
  case 'all_intensity':
      socket.emit('dmx-go', {6:216, 7: slider_value, 16: slider_value});
      break;
  case 'spot_intensity':
      socket.emit('dmx-go', {7: slider_value});
      break;
  case 'wash_intensity':
      socket.emit('dmx-go', {16: slider_value});
      break;
  case 'wash_pan':
      socket.emit('dmx-go', {22: slider_value});
      break;
  case 'wash_tilt':
      socket.emit('dmx-go', {23: slider_value});
      break;
  case 'wash_fine_pan':
      socket.emit('dmx-go', {24: slider_value});
      break;
  case 'wash_fine_tilt':
      socket.emit('dmx-go', {25: slider_value});
      break;
  case 'wash_zoom':
      socket.emit('dmx-go', {27: slider_value});
      break;
  

  default:
    console.log('ERROR: Slider does not exist');
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
           <strong>Group 1: LIGHTS</strong> DMX: 1 + 17
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
                i: "dmx_off",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 2,
                h: 2,
                className: 'btn-block btn btn-danger',
                text: 'LIGHTS OUT',
              },
              {
                type: 1,
                i: "all_intensity",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 2,
                h: 2,
                text: 'Master Intensity',
              },
              {
                type: 0,
                i: "spot_on",
                x: 0,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 2,//Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn',
                text: 'Spot On',
              },
              {
                type: 0,
                i: "spot_off",
                x: 0,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 3,//Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn',
                text: 'Spot Off',
              },
               {
                type: 1,
                i: "spot_intensity",
                x: 0,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 4,//Infinity,
                w: 2,
                h: 2,
                text: 'Spot Intensity',
              },
              {
                type: 1,
                i: "spot_tilt",
                x: 4,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 4, //Infinity,
                w: 2,
                h: 2,
                text: 'Spot Tilt',
              },
              {
                type: 1,
                i: "spot_pan",
                x: 2,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 4,//Infinity,
                w: 2,
                h: 2,
                text: 'Spot Pan',
              },
              {
                type: 1,
                i: "spot_speed",
                x: 0,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 6,//Infinity,
                w: 2,
                h: 2,
                text: 'Spot Speed',
              },
              {
                type: 1,
                i: "spot_fine_tilt",
                x: 4,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 6, //Infinity,
                w: 2,
                h: 2,
                text: 'Spot Fine Tilt',
              },
              {
                type: 1,
                i: "spot_fine_pan",
                x: 2,//(this.state.items.length * 2) % (this.state.cols || 12),
                y: 6,//Infinity,
                w: 2,
                h: 2,
                text: 'Spot Fine Pan',
              },
              /*{
                type: 0,
                i: "spot_white",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 2, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-default',
                text: 'Spot White',
              },
              {
                type: 0,
                i: "spot_red",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 3, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Spot Red',
              },
              {
                type: 0,
                i: "spot_green",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 2, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Spot Green',
              },
              {
                type: 0,
                i: "spot_blue",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 3, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-primary',
                text: 'Spot Blue',
              },
              {
                type: 0,
                i: "spot_yellow",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 2, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'Spot Yellow',
              },*/
              {
                type: 0,
                i: "wash_on",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 8, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn',
                text: 'Wash On',
              },
              {
                type: 0,
                i: "wash_off",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 9, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn',
                text: 'Wash Off',
              },
               {
                type: 1,
                i: "wash_intensity",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 10, //Infinity,
                w: 2,
                h: 2,
                text: 'Wash Intensity',
              },
              {
                type: 1,
                i: "wash_pan",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 10, //Infinity,
                w: 2,
                h: 2,
                text: 'Wash Pan',
              },
              {
                type: 1,
                i: "wash_tilt",
                x: 4,// (this.state.items.length * 2) % (this.state.cols || 12),
                y: 10,// Infinity,
                w: 2,
                h: 2,
                text: 'Wash Tilt',
              },
              {
                type: 1,
                i: "wash_fine_pan",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 12, //Infinity,
                w: 2,
                h: 2,
                text: 'Wash Fine Pan',
              },
              {
                type: 1,
                i: "wash_fine_tilt",
                x: 4,// (this.state.items.length * 2) % (this.state.cols || 12),
                y: 12,// Infinity,
                w: 2,
                h: 2,
                text: 'Wash Fine Tilt',
              },
               {
                type: 1,
                i: "wash_zoom",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 12, //Infinity,
                w: 2,
                h: 2,
                text: 'Wash Zoom',
              },
              {
                type: 0,
                i: "wash_white",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 8, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-default',
                text: 'Wash White',
              },
              {
                type: 0,
                i: "wash_red",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 9, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Wash Red',
              },
              {
                type: 0,
                i: "wash_green",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 8, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Wash Green',
              },
              {
                type: 0,
                i: "wash_blue",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 9, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-primary',
                text: 'Wash Blue',
              },
              {
                type: 0,
                i: "wash_yellow",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 8, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'Wash Yellow',
              },
            ]
      });
}
}
DMXGroup1.defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};
