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

export default class DMXWashGroup1 extends React.Component {

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
          washColor: {17: 0, 18:0, 19:0, 20:255},
        };
      }),
      lock: true,
      compactType: null,
      washIntensity: '127',
      washPan: '0',
      washFinePan: '127',
      washTilt: '0',
      washFineTilt: '127',
      washZoom: '0',
      washColor: {17: 0, 18:0, 19:0, 20:255},
      presets: [].map(function(i, key, list) {
        return {
          i: i.toString(),
          washIntensity: '127',
          washPan: '0',
          washFinePan: '127',
          washTilt: '0',
          washFineTilt: '127',
          washZoom: '0',
          washColor: {17: 0, 18:0, 19:0, 20:255},
          add: i === (list.length - 1).toString(),
        };
      }),
  };
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
  this.handleButtons = this.handleButtons.bind(this);
  this.handleSliders = this.handleSliders.bind(this);
  this.savePreset = this.savePreset.bind(this);
  this.loadPreset = this.loadPreset.bind(this);
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

  case 'wash_on':
     socket.emit('dmx-go', {16:255 });
    break;
  case 'wash_off':
     socket.emit('dmx-go', {16: 0});
    break;
  case 'wash_white':
    this.setState({washColor: {17: 0, 18:0, 19:0, 20:255} });
     socket.emit('dmx-go', {17: 0, 18:0, 19:0, 20:255});
    break;
  case 'wash_red':
   this.setState({washColor:{17: 255, 18:0, 19:0, 20:0} });
     socket.emit('dmx-go', {17: 255, 18:0, 19:0, 20:0});
    break;
  case 'wash_green':
  this.setState({washColor:{17: 0, 18:255, 19:0, 20:0} });
     socket.emit('dmx-go', {17: 0, 18:255, 19:0, 20:0});
    break;
  case 'wash_blue':
  this.setState({washColor:{17: 0, 18:0, 19:255, 20:0}});
     socket.emit('dmx-go', {17: 0, 18:0, 19:255, 20:0});
    break;
  case 'wash_yellow':
   this.setState({washColor:{17: 255, 18:255, 19:0, 20:0}});
     socket.emit('dmx-go', {17: 255, 18:255, 19:0, 20:0});
    break;
  case 'save_preset_1':
     this.savePreset(1);
    break;
  case 'save_preset_3':
     this.savePreset(3);
    break;
     case 'save_preset_4':
     this.savePreset(4);
    break;
  case 'save_preset_5':
     this.savePreset(5);
    break;
     case 'save_preset_6':
     this.savePreset(6);
    break;
  case 'save_preset_2':
     this.savePreset(2);
    break;
  case 'recall_preset_1':
     this.loadPreset(1);
    break;
  case 'recall_preset_2':
     this.loadPreset(2);
    break;
    case 'recall_preset_3':
     this.loadPreset(3);
    break;
  case 'recall_preset_4':
     this.loadPreset(4);
    break;
    case 'recall_preset_5':
     this.loadPreset(5);
    break;
  case 'recall_preset_6':
     this.loadPreset(6);
    break;
  default:
    console.log('ERROR: Button does not exist');
  }
} 
handleSliders(event) {
  console.log(event.target.id + ': ' + event.target.value);
  let slider_value = event.target.value;

  let items= this.state.items;
  for(let i=0; i<items.length; i++){
    if(items[i].i==event.target.id){
      items[i].sliderValue=slider_value;
    }
  }
  this.setState({items});

  switch (event.target.id) {

  case 'wash_intensity':
      this.setState({washIntensity:slider_value});
      socket.emit('dmx-go', {16: slider_value});
      break;
  case 'wash_pan':
      this.setState({washPan:slider_value});
      socket.emit('dmx-go', {22: slider_value});
      break;
  case 'wash_tilt':
      this.setState({washTilt:slider_value});
      socket.emit('dmx-go', {23: slider_value});
      break;
  case 'wash_fine_pan':
      this.setState({washFinePan:slider_value});
      socket.emit('dmx-go', {24: slider_value});
      break;
  case 'wash_fine_tilt':
      this.setState({washFineTilt:slider_value});
      socket.emit('dmx-go', {25: slider_value});
      break;
  case 'wash_zoom':
      this.setState({washZoom:slider_value});
      socket.emit('dmx-go', {27: slider_value});
      break;
  

  default:
    console.log('ERROR: Slider does not exist');
  }
}
savePreset(preset){
  let presets = this.state.presets;
  console.log("save preset " + preset + ": " + presets[preset]);
      presets[preset].washIntensity=this.state.washIntensity;
      presets[preset].washPan=this.state.washPan;
      presets[preset].washTilt=this.state.washTilt;
      presets[preset].washFinePan=this.state.washFinePan;
      presets[preset].washFineTilt=this.state.washFineTilt;
      presets[preset].washZoom=this.state.washZoom;
      presets[preset].washColor=this.state.washColor;
    this.setState({presets});
}
loadPreset(preset){
  let items= this.state.items;
  let presets=this.state.presets;
  for(let i=0; i<items.length; i++){
    if(items[i].i=="wash_pan"){
      items[i].sliderValue=presets[preset].washPan;
      socket.emit('dmx-go', {22: presets[preset].washPan});
    }
    if(items[i].i=="wash_tilt"){
      items[i].sliderValue=presets[preset].washTilt;
      socket.emit('dmx-go', {23: presets[preset].washTilt});
    }
    if(items[i].i=="wash_fine_pan"){
      items[i].sliderValue=presets[preset].washFinePan;
      socket.emit('dmx-go', {24: presets[preset].washFinePan});
    }
    if(items[i].i=="wash_fine_tilt"){
      items[i].sliderValue=presets[preset].washFineTilt;
      socket.emit('dmx-go', {25: presets[preset].washFineTilt});
    }
     if(items[i].i=="wash_zoom"){
      items[i].sliderValue=presets[preset].washZoom;
      socket.emit('dmx-go', {27: presets[preset].washZoom});
    }
    if(items[i].i=="wash_intensity"){
      items[i].sliderValue=presets[preset].washIntensity;
      socket.emit('dmx-go', {16: presets[preset].washIntensity});
    }
    if(items[i].i=="wash_color"){
      items[i].sliderValue=presets[preset].washColor;
      socket.emit('dmx-go', {16: presets[preset].washColor});
    }
  }
  this.setState({items});
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
           <strong>Group 1: Wash LIGHT</strong> DMX: 17
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
                i: "wash_on",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 2,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Wash On',
              },
              {
                type: 0,
                i: "wash_off",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 2,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Wash Off',
              },
               {
                type: 1,
                i: "wash_intensity",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 2, //Infinity,
                w: 12,
                h: 2,
                text: 'Wash Intensity',
              },
              {
                type: 1,
                i: "wash_pan",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 4, //Infinity,
                w: 12,
                h: 2,
                text: 'Wash Pan',
              },
              {
                type: 1,
                i: "wash_tilt",
                x: 0,// (this.state.items.length * 2) % (this.state.cols || 12),
                y: 8,// Infinity,
                w: 12,
                h: 2,
                text: 'Wash Tilt',
              },
              {
                type: 1,
                i: "wash_fine_pan",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 6, //Infinity,
                w: 12,
                h: 2,
                text: 'Wash Fine Pan',
              },
              {
                type: 1,
                i: "wash_fine_tilt",
                x: 0,// (this.state.items.length * 2) % (this.state.cols || 12),
                y: 10,// Infinity,
                w: 12,
                h: 2,
                text: 'Wash Fine Tilt',
              },
               {
                type: 1,
                i: "wash_zoom",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 12, //Infinity,
                w: 12,
                h: 2,
                text: 'Wash Zoom',
              },
              {
                type: 0,
                i: "wash_white",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 14, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-default',
                text: 'Wash White',
              },
              {
                type: 0,
                i: "wash_red",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 14, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Wash Red',
              },
              {
                type: 0,
                i: "wash_green",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 14, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Wash Green',
              },
              {
                type: 0,
                i: "wash_blue",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 14, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-primary',
                text: 'Wash Blue',
              },
              {
                type: 0,
                i: "wash_yellow",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 14, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'Wash Yellow',
              },
                 {
                type: 0,
                i: "recall_preset_1",
                x: 0,
                y: 15,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 1',
              },
              {
                type: 0,
                i: "recall_preset_2",
                x: 1,
                y: 15,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 2',
              },
              {
                type: 0,
                i: "recall_preset_3",
                x: 2,
                y: 15,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 3',
              },
              {
                type: 0,
                i: "recall_preset_4",
                x: 3,
                y: 15,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 4',
              },
              {
                type: 0,
                i: "recall_preset_5",
                x: 4,
                y: 15,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 5',
              },
              {
                type: 0,
                i: "recall_preset_6",
                x: 5,
                y: 15,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 6',
              },
              {
                type: 0,
                i: "save_preset_1",
                x: 0,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 1',
              },
              {
                type: 0,
                i: "save_preset_2",
                x: 1,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 2',
              },
               {
                type: 0,
                i: "save_preset_3",
                x: 2,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 3',
              },
              {
                type: 0,
                i: "save_preset_4",
                x: 3,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 4',
              },
               {
                type: 0,
                i: "save_preset_5",
                x: 4,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 5',
              },
              {
                type: 0,
                i: "save_preset_6",
                x: 5,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 6',
              },
            ],
            presets:[
            {
              washIntensity: '127',
              washPan: '0',
              washFinePan: '127',
              washTilt: '0',
              washFineTilt: '127',
              washZoom: '215',
              washColor: {17: 0, 18:0, 19:255, 20:0},
            }
            ,{},{},{},{},{},{}],
            
      });
}
}
DMXWashGroup1.defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};
