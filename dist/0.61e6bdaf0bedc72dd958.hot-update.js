exports.id = 0;
exports.modules = {

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(43);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(44);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(30);
	
	var _reactBootstrap = __webpack_require__(26);
	
	var _socket = __webpack_require__(57);
	
	var _socket2 = __webpack_require__(54);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let socket;
	
	class MIDIDiagnostics extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      channel: 1,
	      program_num: 1,
	      cc_num: 1,
	      pitch_num: 1,
	      velocity: 0
	    };
	    this.onMidiChannelChange = this.onMidiChannelChange.bind(this);
	    this.onProgramNumChange = this.onProgramNumChange.bind(this);
	    this.sendProgramChangeTest = this.sendProgramChangeTest.bind(this);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  onMidiChannelChange(event) {
	    this.setState({ channel: event.target.value });
	  }
	  onProgramNumChange(event) {
	    this.setState({ program_num: event.target.value });
	  }
	  sendProgramChangeTest() {
	    console.log("sending MIDI Program Change test...");
	    socket.emit('midi-program', { number: this.state.program_num, channel: this.state.channel });
	  }
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Form,
	          { horizontal: true, onSubmit: this.sendProgramChangeTest },
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Channel'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(_reactBootstrap.FormControl, { name: 'channel', value: this.state.channel, onChange: this.onMidiChannelChange })
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	              'Program Number'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { sm: 9 },
	              _react2.default.createElement(_reactBootstrap.FormControl, { type: 'number', name: 'program_num', value: this.state.program_num, onChange: this.onProgramNumChange })
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormGroup,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Col,
	              { smOffset: 3, sm: 6 },
	              _react2.default.createElement(
	                _reactBootstrap.ButtonToolbar,
	                null,
	                _react2.default.createElement(
	                  _reactBootstrap.Button,
	                  { bsStyle: 'primary', type: 'submit' },
	                  'Send Program Change'
	                )
	              )
	            )
	          )
	        )
	      )
	    );
	  }
	}
	exports.default = MIDIDiagnostics;

/***/ })

};
//# sourceMappingURL=0.61e6bdaf0bedc72dd958.hot-update.js.map