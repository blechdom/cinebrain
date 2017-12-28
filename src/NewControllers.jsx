import React from 'react'
import {Responsive, WidthProvider} from 'react-grid-layout';
import _ from "lodash";
import 'isomorphic-fetch';
import Button from 'react-bootstrap';
import FaLock from 'react-icons/lib/fa/lock';
import FaUnlock from 'react-icons/lib/fa/unlock';
import MdFileUpload from 'react-icons/lib/md/file-upload';
import MdFileDownload from 'react-icons/lib/md/file-download';
import MdEdit from 'react-icons/lib/md/edit';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
let lockIcon = <FaLock />;

export default class NewControllers extends React.Component {

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
      buttonCounter: 0, 
      sliderCounter: 0,
      xyCounter: 0,
      lock: true,
  };
  this.onAddButton = this.onAddButton.bind(this);
  this.onAddSlider = this.onAddSlider.bind(this);
  this.onAddXY = this.onAddXY.bind(this);
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.onEditItem = this.onEditItem.bind(this);
  this.handleSliderChange = this.handleSliderChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
  this.handleOnDownload = this.handleOnDownload.bind(this);
  this.handleOnUpload = this.handleOnUpload.bind(this);
 }
 handleSliderChange (event)  { //not updating correct object
    this.setState({sliderValue: event.target.value});
    console.log(event.target.id + ': ' + this.state.sliderValue);
 }
 handleOnLock(){
   if (this.state.lock == true) {
	this.setState({lock: false});
	lockIcon = <FaUnlock />;
   } else { 
	this.setState({lock: true});
	lockIcon = <FaLock />;
   }
   console.log("handle on lock : " + this.state.lock);
 }
 handleOnDownload(){
   console.log("download file with data to be loaded again later ");
 }
 handleOnUpload(){
   console.log("upload previously saved file to use");
 }
 createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
   const editStyle = {
     position: "absolute",
     left: "2px",
     bottom: 0,
     cursor: "pointer"
   };
   const gridStyle = {
      background: "#EEE"
    };
    const i = el.add ? "+" : el.i;
    let typeCode = <button>{i}</button>;
    if (el.type==1) { //type is slider
      typeCode = <div> <span className="text">{i}</span>
                <div id="slidecontainer">
                <input type="range" min="1" max="100" value={el.sliderValue} id={i} className="slider" onChange={this.handleSliderChange}/></div>
    		</div>;
    }
    else if (el.type==2) { //type is xy area
       typeCode = <span className="text">{i}</span>;
    }
	return (
     		<div key={i} data-grid={el} style={gridStyle}>
		{typeCode}
        	<span
       			className="remove"
          		style={removeStyle}
          		onClick={this.onRemoveItem.bind(this, i)}
        	>
          		x
        	</span>
		<span className="edit"
			style={editStyle}
			onClick={this.onEditItem.bind(this, i)}
		>
			<MdEdit />
		</span>
      		</div>
    	);
}

  onAddButton() {
    console.log("adding ", "button " + this.state.buttonCounter);
    this.setState({
 items: this.state.items.concat({
        type: 0,
	i: "button-" + this.state.buttonCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, 
        w: 2,
        h: 2,
      }),
 buttonCounter: this.state.buttonCounter + 1
    });
  }
onAddSlider() {
    console.log("adding ", "slider " + this.state.sliderCounter);
    this.setState({
 items: this.state.items.concat({
        type: 1,
	i: "slider-" + this.state.sliderCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity,
        w: 2,
        h: 2,
      }),
 sliderCounter: this.state.sliderCounter + 1
    });
  }
onAddXY() {
    console.log("adding ", "xy " + this.state.xyCounter);
    this.setState({
 items: this.state.items.concat({
	type: 2,
        i: "xy-" + this.state.xyCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity,
        w: 2,
        h: 2,
      }),
 xyCounter: this.state.xyCounter + 1
    });
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
 onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }
 onEditItem(i) {
   console.log("edit item: " + i);
 } 
render() {
  return (
      <div>
 	<button onClick={this.onAddButton}>Add Button</button>  
      	<button onClick={this.onAddSlider}>Add Slider</button>
	<button onClick={this.onAddXY}>Add X/Y Area</button>
	<button className="pull-right" onClick={this.handleOnLock}>{lockIcon}</button>
	<button className="pull-right" onClick={this.handleOnDownload}><MdFileDownload /></button>
	<button className="pull-right" onClick={this.handleOnUpload}><MdFileUpload /></button>
	<ResponsiveReactGridLayout
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
	  isDraggable={!this.state.lock}
	{...this.props}
	>
  {_.map(this.state.items, el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
NewControllers.defaultProps = {
    className: "layout",
    rowHeight: 30,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
}; 
