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
          sliderValue: 0,
          inputValue: 0,
        };
      }),
      lock: true,
      compactType: null,
      dmx_data_sr: [0,0,0,0,0,0,0,0,0,0,0],
      dmx_data_sl: [0,0,0,0,0,0,0,0,0,0,0],
  };
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
  this.handleButtons = this.handleButtons.bind(this);
  this.loadPresetSR = this.loadPresetSR.bind(this);
  this.loadPresetSL = this.loadPresetSL.bind(this);
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
     if (el.type==3) { //type is text
      controllerCode =  <div> <span className="text">{el.text}</span> </div>;
    }
     if (el.type==4) { //type is space
      controllerCode =  <div> </div>;
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
  
  case 'trigger1':
     this.loadPresetSR(0);
     this.loadPresetSL(0);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
  case 'trigger2':
     this.loadPresetSR(1);
     this.loadPresetSL(1);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
  case 'trigger3':
     this.loadPresetSR(2);
     this.loadPresetSL(2);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
  case 'trigger4':
     this.loadPresetSR(1);
     this.loadPresetSL(1);
     socket.emit('midi-noteon', {note:12, velocity: 127, channel:0 });
    break;
    case 'trigger4-1':
     this.loadPresetSR(5);
     this.loadPresetSL(5);
     //socket.emit('midi-noteon', {note:12, velocity: 127, channel:0 });
     //socket.emit('midi-noteon', {note:12, velocity: 127, channel:0 });
    break;
  case 'trigger5':
     this.loadPresetSR(0);
     this.loadPresetSL(0);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
   case 'trigger6':
     this.loadPresetSR(2);
     this.loadPresetSL(2);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
   case 'trigger7':
     this.loadPresetSR(0);
     this.loadPresetSL(0);
     socket.emit('midi-noteon', {note:13, velocity: 127, channel:0 });
    break;
  case 'trigger8':
     this.loadPresetSR(0);
     this.loadPresetSL(0);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
   case 'trigger9':
     this.loadPresetSR(3);
     this.loadPresetSL(3);
     socket.emit('midi-noteon', {note:14, velocity: 127, channel:0 });
    break;
  case 'trigger10':
     this.loadPresetSR(0);
     this.loadPresetSL(0);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
  case 'trigger11':
     this.loadPresetSR(6);
     this.loadPresetSL(6);
     socket.emit('midi-noteon', {note:15, velocity: 127, channel:0 });
    break;
  case 'trigger12':
     this.loadPresetSR(4);
     this.loadPresetSL(4);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
  case 'trigger13':
     this.loadPresetSR(0);
     this.loadPresetSL(0);
     socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
  case 'trigger14':
     this.loadPresetSR(0);
     this.loadPresetSL(0);
     socket.emit('midi-noteon', {note:16, velocity: 127, channel:0 });
    break;
  case 'bank1':
     socket.emit('midi-noteon', {note:20, velocity: 127, channel:0 });
    break;
  case 'scene1':
      socket.emit('midi-noteon', {note:12, velocity: 127, channel:0 });
    break;
  case 'scene2':
      socket.emit('midi-noteon', {note:13, velocity: 127, channel:0 });
    break;
  case 'scene3':
      socket.emit('midi-noteon', {note:14, velocity: 127, channel:0 });
    break;
  case 'scene4':
      socket.emit('midi-noteon', {note:15, velocity: 127, channel:0 });
    break;
  case 'scene5':
      socket.emit('midi-noteon', {note:16, velocity: 127, channel:0 });
    break;
  case 'scene6':
      socket.emit('midi-noteon', {note:17, velocity: 127, channel:0 });
    break;
  case 'scene7':
      socket.emit('midi-noteon', {note:18, velocity: 127, channel:0 });
    break;
  case 'scene8':
      socket.emit('midi-noteon', {note:19, velocity: 127, channel:0 });
    break;
  case 'spot_right_blackout':
    this.loadPresetSR(0);
    break;
  case 'spot_right_recall_preset_1':
     this.loadPresetSR(1);
    break;
  case 'spot_right_recall_preset_2':
     this.loadPresetSR(2);
    break;
  case 'spot_right_recall_preset_3':
     this.loadPresetSR(3);
    break;
  case 'spot_right_recall_preset_4':
     this.loadPresetSR(4);
    break;
  case 'spot_right_recall_preset_5':
     this.loadPresetSR(5);
    break;
  case 'spot_right_recall_preset_6':
     this.loadPresetSR(6);
    break;
  case 'spot_left_blackout':
    this.loadPresetSL(0);
    break;
  case 'spot_left_recall_preset_1':
     this.loadPresetSL(1);
    break;
  case 'spot_left_recall_preset_2':
     this.loadPresetSL(2);
    break;
  case 'spot_left_recall_preset_3':
     this.loadPresetSL(3);
    break;
  case 'spot_left_recall_preset_4':
     this.loadPresetSL(4);
    break;
  case 'spot_left_recall_preset_5':
     this.loadPresetSL(5);
    break;
  case 'spot_left_recall_preset_6':
     this.loadPresetSL(6);
    break;

  default:
    console.log('ERROR: Button does not exist');
  }
}
loadPresetSR(preset){
  if (preset==0){
    socket.emit('dmx-go', {dmx: {7: 0, 8:0, 11:0}, offset: 1});  
  }
  else {
    const loadDMXPreset = {
        instrument_id: "spot_1", dmx_offset: 1, preset_num: preset, dmx_data: this.state.dmx_data_sr,
    };
    socket.emit('dmx-load-preset', loadDMXPreset);
  }
} 
loadPresetSL(preset){
  if (preset==0){
    socket.emit('dmx-go', {dmx: {7: 0, 8:0, 11:0}, offset: 41});  
  }
  else {
    const loadDMXPreset = {
        instrument_id: "spot_2", dmx_offset: 41, preset_num: preset, dmx_data: this.state.dmx_data_sr,
    };
    socket.emit('dmx-load-preset', loadDMXPreset);
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
           <strong>DMX MIDI Control</strong>
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
    socket.on('dmx-load-preset-data', (data) => {
      this.setState({dmx_data: data});
      console.log("preset retrieved " + this.state.dmx_data);
    });
    this.setState({
         items: [
                {
                type: 3,
                i: "label1",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 1,
                h: 1,
                text: 'TRIGGERS',
              },
                {
                type: 3,
                i: "label2",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 0, //Infinity, 
                w: 3,
                h: 1,
                text: 'CUES',
              },
              {
                type: 0,
                i: "trigger1",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 1, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'BLACKOUT',
              },
               {
                type: 0,
                i: "trigger2",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 2, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'CHAIR CUE',
              },
                {
                type: 0,
                i: "trigger3",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 3, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'CURTAIN CUE',
              },
                {
                type: 0,
                i: "trigger4",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 4, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'MAIN CUE',
              },
                 {
                type: 0,
                i: "trigger4-1",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 5, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'CENTER CUE',
              },
                {
                type: 0,
                i: "trigger5",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 6, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'BLACKOUT',
              },
                {
                type: 0,
                i: "trigger6",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 7, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'BEGINNING CUE',
              },
               {
                type: 0,
                i: "trigger7",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 8, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'PEDESTAL CUE',
              },
                {
                type: 0,
                i: "trigger8",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 9, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'BLACKOUT',
              },
              {
                type: 0,
                i: "trigger9",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 10, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'BEGINNING CUE',
              },
              {
                type: 0,
                i: "trigger10",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 11, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'BLACKOUT',
              },
               {
                type: 0,
                i: "trigger11",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 12, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'BEGINNING CUE',
              },
              {
                type: 0,
                i: "trigger12",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 13, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'TRANSITION CUE',
              },      
               {
                type: 0,
                i: "trigger13",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 14, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'BLACKOUT',
              },        
              {
                type: 0,
                i: "trigger14",
                x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 15, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-warning',
                text: 'BEGINNING CUE',
              },               
              {
                type: 3,
                i: "cue1",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 1, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT I: Sneaky Sneaky',
              },
               {
                type: 3,
                i: "cue2",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 2, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT I: Chair Dance',
              },
               {
                type: 3,
                i: "cue3",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 3, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT I: Curtain Dance',
              },
               {
                type: 3,
                i: "cue4",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 4, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT I: Main Dance',
              },
              {
                type: 3,
                i: "cue4-1",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 5, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT I: Center Light',
              },
              {
                type: 3,
                i: "cue5",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 6, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT II: Robot',
              },
              {
                type: 3,
                i: "cue6",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 7, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT II: Beginning',
              },
              {
                type: 3,
                i: "cue7",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 8, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT II: Walking-2-Pedestal',
              },
               {
                type: 3,
                i: "cue8",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 9, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT III: Human',
              },
               {
                type: 3,
                i: "cue9",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 10, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT III: Beginning',
              },
              {
                type: 3,
                i: "cue10",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 11, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT IV: Fashion Show',
              },
                 {
                type: 3,
                i: "cue11",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 12, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT IV: Beginning',
              },
                 {
                type: 3,
                i: "cue12",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 13, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT IV: Transition',
              },
              {
                type: 3,
                i: "cue13",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 14, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT V',
              },
                {
                type: 3,
                i: "cue14",
                x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 15, //Infinity, 
                w: 3,
                h: 1,
                text: 'ACT V: Beginning',
              },
              {
                type: 3,
                i: "label6",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 17, //Infinity, 
                w: 1,
                h: 1,
                text: 'DMX BOARD',
              },
              {
                type: 0,
                i: "bank1",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 18, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'BANK 1',
              },
              {
                type: 0,
                i: "scene1",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 19, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'SCENE 1',
              },
              {
                type: 0,
                i: "scene2",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 20, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'SCENE 2',
              },
              {
                type: 0,
                i: "scene3",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 21, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'SCENE 3',
              },
              {
                type: 0,
                i: "scene4",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 22, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'SCENE 4',
              },
              {
                type: 0,
                i: "scene5",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 23, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'SCENE 5',
              },
              {
                type: 0,
                i: "scene6",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 24, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'SCENE 6',
              },
              {
                type: 0,
                i: "scene7",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 25, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'SCENE 7',
              },
               {
                type: 0,
                i: "scene8",
                x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 26, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'SCENE 8',
              },
              {
                type: 3,
                i: "label5",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 17, //Infinity, 
                w: 1,
                h: 1,
                text: 'SPOT RIGHT',
              },
              {
                type: 0,
                i: "spot_right_blackout",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 18, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'BLACKOUT',
              },
              {
                type: 0,
                i: "spot_right_recall_preset_1",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 19, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 1',
              },
              {
                type: 0,
                i: "spot_right_recall_preset_2",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 20, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 2',
              },
              {
                type: 0,
                i: "spot_right_recall_preset_3",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 21, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 3',
              },
              {
                type: 0,
                i: "spot_right_recall_preset_4",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 22, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 4',
              },
              {
                type: 0,
                i: "spot_right_recall_preset_5",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 23, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 5',
              },
              {
                type: 0,
                i: "spot_right_recall_preset_6",
                x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 24, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 6',
              },
              {
                type: 3,
                i: "label4",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 17, //Infinity, 
                w: 1,
                h: 1,
                text: 'SPOT LEFT',
              },
              {
                type: 0,
                i: "spot_left_blackout",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 18, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'BLACKOUT',
              },
              {
                type: 0,
                i: "spot_left_recall_preset_1",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 19, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 1',
              },
              {
                type: 0,
                i: "spot_left_recall_preset_2",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 20, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 2',
              },
              {
                type: 0,
                i: "spot_left_recall_preset_3",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 21, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 3',
              },
              {
                type: 0,
                i: "spot_left_recall_preset_4",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 22, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 4',
              },
              {
                type: 0,
                i: "spot_left_recall_preset_5",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 23, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 5',
              },
              {
                type: 0,
                i: "spot_left_recall_preset_6",
                x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
                y: 24, //Infinity, 
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'PRESET 6',
              },
            ]
      });
}
}
MIDILooper.defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 8, sm: 6, xs: 4, xxs: 2},
};
