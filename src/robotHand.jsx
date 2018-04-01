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

export default class RobotArm extends React.Component {

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
      robot_data: [0,0,0,0],  
  };
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
  this.handleButtons = this.handleButtons.bind(this);
  this.handleSliders = this.handleSliders.bind(this);
  this.saveRobotPreset = this.saveRobotPreset.bind(this);
  this.loadRobotPreset = this.loadRobotPreset.bind(this);
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
                <input type="range" min="0" max="180" default="0" step="1" value={el.sliderValue} id={i} className="slider" onChange={this.handleSliders}/></div>
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
  let robot_data = this.state.robot_data;

  switch (event.target.value) {
  
  case 'save_robot_preset_1':
     this.saveRobotPreset(1);
    break;
  case 'save_robot_preset_2':
     this.saveRobotPreset(2);
    break;
  case 'save_robot_preset_3':
     this.saveRobotPreset(3);
    break;
  case 'save_robot_preset_4':
     this.saveRobotPreset(4);
    break;
  case 'save_robot_preset_5':
     this.saveRobotPreset(5);
    break;
  case 'save_robot_preset_6':
     this.saveRobotPreset(6);
    break;
  case 'save_robot_preset_7':
     this.saveRobotPreset(7);
    break;
  case 'save_robot_preset_8':
     this.saveRobotPreset(8);
    break;
    case 'save_robot_preset_9':
     this.saveRobotPreset(9);
    break;
  case 'save_robot_preset_10':
     this.saveRobotPreset(10);
    break;
  case 'save_robot_preset_11':
     this.saveRobotPreset(11);
    break;
  case 'save_robot_preset_12':
     this.saveRobotPreset(12);
    break;
  case 'recall_robot_preset_1':
     this.loadRobotPreset(1);
    break;
  case 'recall_robot_preset_2':
     this.loadRobotPreset(2);
    break;
  case 'recall_robot_preset_3':
     this.loadRobotPreset(3);
    break;
  case 'recall_robot_preset_4':
     this.loadRobotPreset(4);
    break;
  case 'recall_robot_preset_5':
     this.loadRobotPreset(5);
    break;
  case 'recall_robot_preset_6':
     this.loadRobotPreset(6);
    break;
  case 'recall_robot_preset_7':
     this.loadRobotPreset(7);
    break;
  case 'recall_robot_preset_8':
     this.loadRobotPreset(8);
    break;
     case 'recall_robot_preset_9':
     this.loadRobotPreset(9);
    break;
  case 'recall_robot_preset_10':
     this.loadRobotPreset(10);
    break;
  case 'recall_robot_preset_11':
     this.loadRobotPreset(11);
    break;
  case 'recall_robot_preset_12':
     this.loadRobotPreset(12);
    break;
  default:
    console.log('ERROR: Button does not exist');
  }
  this.setState({robot_data: robot_data});
} 
handleSliders(event) {
  console.log(event.target.id + ': ' + event.target.value);
  let slider_value = event.target.value;
  let robot_data = this.state.robot_data;

  let items= this.state.items;
  for(let i=0; i<items.length; i++){
    if(items[i].i==event.target.id){
      items[i].sliderValue=slider_value;
    }
  }
  this.setState({items});

  switch (event.target.id) {
  case 'thumb':
      robot_data[0]=Number(Math.floor((slider_value)));
      socket.emit('robot-go-thumb', robot_data[0]);
      break;
  case 'pointer':
      robot_data[1]=Number(Math.floor((slider_value/180*180)+0));
      socket.emit('robot-go-pointer', robot_data[1]);
      break;
  case 'middle':
      robot_data[2]=Number(Math.floor((slider_value/180*80)+25));
      socket.emit('robot-go-middle', robot_data[2]);
      break;
  case 'ring':
      robot_data[3]=Number(Math.floor((slider_value/180*180)+0));
      socket.emit('robot-go-ring', robot_data[3]);
      break;
  case 'pinky':
      robot_data[4]=Number(Math.floor((slider_value/180*180)+0));
      socket.emit('robot-go-pinky', robot_data[4]);
      break;
  default:
    console.log('ERROR: Slider does not exist');
  }
  this.setState({robot_data: robot_data});
  socket.emit('last-known-robot-state', robot_data);
}
saveRobotPreset(preset){
  const newRobotPreset = {
      preset_num: preset,
      robot_data: this.state.robot_data,
    };
  console.log(JSON.stringify(newRobotPreset));
  socket.emit('robot-save-preset', newRobotPreset);
}
loadRobotPreset(preset){
 const loadRobotPreset = {
      preset_num: preset, robot_data: this.state.robot_data,
  };
  socket.emit('robot-load-preset', loadRobotPreset);
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
           <h3><strong>Robot Arm Servo Controllers</strong></h3>
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
    socket.on('robot-arm-load-preset-data', (data) => {
      this.setState({robot_data: data});
      console.log("preset retrieved " + this.state.robot_data);
    });
      this.setState({
         items: [
               {
                type: 1,
                i: "thumb",
                x: 0,
                y: 0,
                w: 12,
                h: 1,
                text: 'thumb',
              },
              {
                type: 1,
                i: "pointer",
                x: 0,
                y: 1,
                w: 12,
                h: 1,
                text: 'pointer',
              },
              {
                type: 1,
                i: "middle",
                x: 0,
                y: 2,
                w: 12,
                h: 1,
                text: 'middle',
              },
              {
                type: 1,
                i: "ring",
                x: 0,
                y: 3,
                w: 12,
                h: 1,
                text: 'ring',
              },
                 {
                type: 1,
                i: "pinky",
                x: 0,
                y: 4,
                w: 12,
                h: 1,
                text: 'pinky',
              },
              {
                type: 0,
                i: "recall_robot_preset_1",
                x: 0,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 1',
              },
              {
                type: 0,
                i: "recall_robot_preset_2",
                x: 1,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 2',
              },
                {
                type: 0,
                i: "recall_robot_preset_3",
                x: 2,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 3',
              },
              {
                type: 0,
                i: "recall_robot_preset_4",
                x: 3,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 4',
              },
                {
                type: 0,
                i: "recall_robot_preset_5",
                x: 4,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 5',
              },
              {
                type: 0,
                i: "recall_robot_preset_6",
                x: 5,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 6',
              },
                {
                type: 0,
                i: "recall_robot_preset_7",
                x: 6,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 7',
              },
              {
                type: 0,
                i: "recall_robot_preset_8",
                x: 7,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 8',
              },
              {
                type: 0,
                i: "recall_robot_preset_9",
                x: 8,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 9',
              },
              {
                type: 0,
                i: "recall_robot_preset_10",
                x: 9,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 10',
              },
              {
                type: 0,
                i: "recall_robot_preset_11",
                x: 10,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 11',
              },
              {
                type: 0,
                i: "recall_robot_preset_12",
                x: 11,
                y: 5,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-success',
                text: 'Play 12',
              },
              {
                type: 0,
                i: "save_robot_preset_1",
                x: 0,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 1',
              },
              {
                type: 0,
                i: "save_robot_preset_2",
                x: 1,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 2',
              },
               {
                type: 0,
                i: "save_robot_preset_3",
                x: 2,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 3',
              },
              {
                type: 0,
                i: "save_robot_preset_4",
                x: 3,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 4',
              },
               {
                type: 0,
                i: "save_robot_preset_5",
                x: 4,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 5',
              },
              {
                type: 0,
                i: "save_robot_preset_6",
                x: 5,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 6',
              },
               {
                type: 0,
                i: "save_robot_preset_7",
                x: 6,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 7',
              },
              {
                type: 0,
                i: "save_robot_preset_8",
                x: 7,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 8',
              },
              {
                type: 0,
                i: "save_robot_preset_9",
                x: 8,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 9',
              },
                  {
                type: 0,
                i: "save_robot_preset_10",
                x: 9,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 10',
              },
                  {
                type: 0,
                i: "save_robot_preset_11",
                x: 10,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 11',
              },
                  {
                type: 0,
                i: "save_robot_preset_12",
                x: 11,
                y: 6,
                w: 1,
                h: 1,
                className: 'btn-block btn btn-danger',
                text: 'Rec 12',
              },
            ],
      });
      
  }
}
RobotArm.defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
};
