import React, {PropTypes} from 'react'
import {Responsive, WidthProvider} from 'react-grid-layout';
import _ from "lodash";
import lomap from 'lodash.map'
import loresult from 'lodash.result'
import lorange from 'lodash.range'
import lorandom from 'lodash.random'
import 'isomorphic-fetch';
import { Link } from 'react-router';
import { Button, AddGlyphicon, Table, Panel } from 'react-bootstrap';
import FaLock from 'react-icons/lib/fa/lock';
import FaUnlock from 'react-icons/lib/fa/unlock';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
var lockIcon = <FaLock />;

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
        };
      }),
      buttonCounter: 0, 
      sliderCounter: 0,
      xyCounter: 0,
      sliderValue: 0,
      lock: true,
  };
  this.onAddButton = this.onAddButton.bind(this);
  this.onAddSlider = this.onAddSlider.bind(this);
  this.onAddXY = this.onAddXY.bind(this);
  this.onBreakpointChange = this.onBreakpointChange.bind(this);
  this.handleSliderChange = this.handleSliderChange.bind(this);
  this.handleOnLock = this.handleOnLock.bind(this);
}
 handleSliderChange (event)  {

    this.setState({sliderValue: event.target.value});
    console.log(event.target.id + ': ' + this.state.i + ' ' + this.state.sliderValue);
  }
handleOnLock(){
 if (this.state.lock == true) {
	this.setState({lock: false});
	lockIcon = <FaUnlock />;
 }	
 else { 
	this.setState({lock: true});
	lockIcon = <FaLock />;
  }
  console.log("handle on lock : " + this.state.lock);
}
 createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
   const gridStyle = {
      background: "#EEE"
    };
    const i = el.add ? "+" : el.i;
    if (el.type==0) { //type is button 
	return (
     		<div key={i} data-grid={el} style={gridStyle}>
		<button>{i}</button>
        	<span
       			className="remove"
          		style={removeStyle}
          		onClick={this.onRemoveItem.bind(this, i)}
        	>
          		x
        	</span>
      		</div>
    	);
    }
    else if (el.type==1) { //type is slider
	return (
      		<div key={i} data-grid={el} style={gridStyle}>
        	<span className="text">{i}</span>
		<div id="slidecontainer">
  		<input type="range" min="1" max="100" value={this.state.sliderValue} className="slider" id={i} ref={i} onChange={this.handleSliderChange}/>
</div>
		<span
          		className="remove"
          		style={removeStyle}
          		onClick={this.onRemoveItem.bind(this, i)}
        	>
          	x
        	</span>
      		</div>
    	);
    }
    else { //type is xy area
        return (
                <div key={i} data-grid={el} style={gridStyle}>
                <span className="text">{i}</span>
                <span
                        className="remove"
                        style={removeStyle}
                        onClick={this.onRemoveItem.bind(this, i)}
                >
                x
                </span>
                </div>
        );
    }
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

render() {
  return (
      <div>
 	<button onClick={this.onAddButton}>Add Button</button>  
      	<button onClick={this.onAddSlider}>Add Slider</button>
	<button onClick={this.onAddXY}>Add X/Y Area</button>
	<button onClick={this.handleOnLock}>{lockIcon}</button>
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
