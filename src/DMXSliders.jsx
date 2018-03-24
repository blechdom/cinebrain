import React from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import ReactDOM from 'react-dom'
import _ from "lodash";
import 'isomorphic-fetch';
import Toast from './Toast.jsx';
import {Row, Col, Button} from 'react-bootstrap';
import FaLock from 'react-icons/lib/fa/lock';
import FaUnlock from 'react-icons/lib/fa/unlock';
import { SocketProvider } from 'socket.io-react';
import SocketIOClient from 'socket.io-client';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
let lockIcon = <FaLock />;
let socket;

export default class DMX255Group2 extends React.Component {

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
      toastVisible: false, toastMessage: '', toastType: 'success',
      lock: true,
      compactType: null,
      instrument_id: "dmx_sliders",
      dmx_offset: 1,
      dmx_data: [0,0,0,0,0,0,0,0,0,0,0,0,0],
      
  };
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
  this.handleButtons = this.handleButtons.bind(this);
  this.handleSliders = this.handleSliders.bind(this);
  this.sendDMX = this.sendDMX.bind(this);
  this.savePreset = this.savePreset.bind(this);
  this.loadPreset = this.loadPreset.bind(this);
  this.showError = this.showError.bind(this);
  this.dismissToast = this.dismissToast.bind(this);  
}
showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }
dismissToast() {
    this.setState({ toastVisible: false });
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
                <input type="range" min="0" max="255" default="0" step="1" value={el.sliderValue} id={i} className="slider" onChange={this.handleSliders}/></div>
        </div>;
    }
     return (
        <div key={i} data-grid={el} style={gridStyle}>
            {controllerCode}
            <span style={lockStyle}></span>
        </div>
      );
     console.log("does this change? " + el.i + " " + el.sliderValue);
}
handleButtons(event) {
  console.log(event.target.id + ': ' + event.target.value);
  let dmx_data = this.state.dmx_data;

  switch (event.target.value) {
  
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
  this.setState({dmx_data: dmx_data});
} 
handleSliders(event) {
  console.log(event.target.id + ': ' + event.target.value);
  let slider_value = event.target.value;
  let dmx_data = this.state.dmx_data;

  let items= this.state.items;
  for(let i=0; i<items.length; i++){
    if(items[i].i==event.target.id){
      items[i].sliderValue=slider_value;
    }
  }
  this.setState({items});

  switch (event.target.id) {
  case 'channel_1':
      this.sendDMX({1: slider_value});
      break;
  case 'channel_2':
      this.sendDMX({2: slider_value});
      break;
  case 'channel_3':
      this.sendDMX({3: slider_value});
      break;
  case 'channel_4':
      this.sendDMX({4: slider_value});
      break;
  case 'channel_5':
      this.sendDMX({5: slider_value});
      break;
  case 'channel_6':
      this.sendDMX({6: slider_value});
      break;
  case 'channel_7':
      this.sendDMX({7: slider_value});
      break;
  case 'channel_8':
      this.sendDMX({8: slider_value});
      break;
  case 'channel_9':
      this.sendDMX({9: slider_value});
      break;
  case 'channel_10':
      this.sendDMX({10: slider_value});
      break;
  case 'channel_11':
      this.sendDMX({11: slider_value});
      break;
  case 'channel_12':
      this.sendDMX({12: slider_value});
      break;
  case 'channel_13':
      this.sendDMX({13: slider_value});
      break;
  case 'channel_14':
      this.sendDMX({14: slider_value});
      break;
  case 'channel_15':
      this.sendDMX({15: slider_value});
      break;
  case 'channel_16':
      this.sendDMX({16: slider_value});
      break;

  default:
    console.log('ERROR: Slider does not exist');
  }
  this.setState({dmx_data: dmx_data});
}
sendDMX(dmx) {
    socket.emit('dmx-go', {dmx: dmx, offset: this.state.dmx_offset});  
}
savePreset(preset){
  const newDMXPreset = {
      instrument_id: this.state.instrument_id, dmx_offset: this.state.dmx_offset, preset_num: preset,
      dmx_data: this.state.dmx_data,
    };
  socket.emit('dmx-save-preset', newDMXPreset);
}
loadPreset(preset){
 const loadDMXPreset = {
      instrument_id: this.state.instrument_id, dmx_offset: this.state.dmx_offset, preset_num: preset, dmx_data: this.state.dmx_data,
  };
  socket.emit('dmx-load-preset', loadDMXPreset);
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
           <h3><strong>DMX sliders</strong></h3>
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
    socket.on('dmx-load-preset-data', (data) => {
      this.setState({dmx_data: data});
      console.log("preset retrieved " + this.state.dmx_data);
    });
      this.setState({
         items: [
               {
                type: 1,
                i: "channel_1",
                x: 0,
                y: 0,
                w: 12,
                h: 1,
                text: 'Channel 1',
              },
              {
                type: 1,
                i: "channel_2",
                x: 0,
                y: 1,
                w: 12,
                h: 1,
                text: 'Channel 2',
              },
              {
                type: 1,
                i: "channel_3",
                x: 0,
                y: 2,
                w: 12,
                h: 1,
                text: 'Channel 3',
              },
              {
                type: 1,
                i: "channel_4",
                x: 0,
                y: 3,
                w: 12,
                h: 1,
                text: 'Channel 4',
              },
              {
                type: 1,
                i: "channel_5",
                x: 0,
                y: 4, 
                w: 12,
                h: 1,
                text: 'Channel 5',
              },
              {
                type: 1,
                i: "channel_6",
                x: 0,
                y: 5,
                w: 12,
                h: 1,
                text: 'Channel 6',
              },
              {
                type: 1,
                i: "channel_7",
                x: 0,
                y: 6,
                w: 12,
                h: 1,
                text: 'Channel 7',
              },
              {
                type: 1,
                i: "channel_8",
                x: 0,
                y: 7,
                w: 12,
                h: 1,
                text: 'Channel 8',
              },
               {
                type: 1,
                i: "channel_9",
                x: 0,
                y: 8,
                w: 12,
                h: 1,
                text: 'Channel 9',
              },
               {
                type: 1,
                i: "channel_10",
                x: 0,
                y: 9,
                w: 12,
                h: 1,
                text: 'Channel 10',
              },
               {
                type: 1,
                i: "channel_11",
                x: 0,
                y: 10,
                w: 12,
                h: 1,
                text: 'Channel 11',
              },
               {
                type: 1,
                i: "channel_12",
                x: 0,
                y: 11,
                w: 12,
                h: 1,
                text: 'Channel 12',
              },
               {
                type: 1,
                i: "channel_13",
                x: 0,
                y: 12,
                w: 12,
                h: 1,
                text: 'Channel 13',
              },
               {
                type: 1,
                i: "channel_14",
                x: 0,
                y: 13,
                w: 12,
                h: 1,
                text: 'Channel 14',
              },
               {
                type: 1,
                i: "channel_15",
                x: 0,
                y: 14,
                w: 12,
                h: 1,
                text: 'Channel 15',
              },
               {
                type: 1,
                i: "channel_16",
                x: 0,
                y: 15,
                w: 12,
                h: 1,
                text: 'Channel 16',
              },
              {
                type: 0,
                i: "recall_preset_1",
                x: 0,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 1',
              },
              {
                type: 0,
                i: "recall_preset_2",
                x: 1,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 2',
              },
              {
                type: 0,
                i: "recall_preset_3",
                x: 2,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 3',
              },
              {
                type: 0,
                i: "recall_preset_4",
                x: 3,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 4',
              },
              {
                type: 0,
                i: "recall_preset_5",
                x: 4,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 5',
              },
              {
                type: 0,
                i: "recall_preset_6",
                x: 5,
                y: 16,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Preset 6',
              },
              {
                type: 0,
                i: "save_preset_1",
                x: 0,
                y: 17,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 1',
              },
              {
                type: 0,
                i: "save_preset_2",
                x: 1,
                y: 17,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 2',
              },
               {
                type: 0,
                i: "save_preset_3",
                x: 2,
                y: 17,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 3',
              },
              {
                type: 0,
                i: "save_preset_4",
                x: 3,
                y: 17,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 4',
              },
               {
                type: 0,
                i: "save_preset_5",
                x: 4,
                y: 17,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 5',
              },
              {
                type: 0,
                i: "save_preset_6",
                x: 5,
                y: 17,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Save Preset 6',
              },
            ],
      });
      
  }
}
DMX255Group2.defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};
