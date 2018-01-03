import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DeviceMenu from './DeviceMenu.jsx';
import ParametersMenu from './ParametersMenu.jsx';

export default class ControlInterface extends React.Component {

  constructor(props, context){
    super(props, context);
  }
render() {
  return (
      <div>
	<Row>
	<Col>
  	<DeviceMenu location={this.props.location} />  
	</Col>
	<Col>
	<ParametersMenu location={this.props.location} />
    	</Col>
	</Row>
      </div>
    );
  }
}
ControlInterface.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};

ControlInterface.contextTypes = {
  initialState: React.PropTypes.object,
};
