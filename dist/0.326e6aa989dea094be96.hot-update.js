exports.id = 0;
exports.modules = {

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(20);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(30);
	
	var _reactBootstrap = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import TelnetDiagnostics from './TelnetDiagnostics.jsx';
	
	
	class Diagnostics extends _react2.default.Component {
	
		constructor(props) {
			super(props);
			this.state = {};
		}
		render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_reactBootstrap.Tabs,
					{ defaultActiveKey: "telnet-tab", id: 'uncontrolled-tabs' },
					_react2.default.createElement(
						_reactBootstrap.LinkContainer,
						{ to: '/telnet_diagnostics' },
						_react2.default.createElement(
							_reactBootstrap.Tab,
							{ eventKey: "telnet-tab", title: 'Telnet' },
							'Telnet'
						)
					),
					_react2.default.createElement(_reactBootstrap.Tab, { eventKey: "dmx-tab", title: 'DMX' }),
					_react2.default.createElement(_reactBootstrap.Tab, { eventKey: "midi-tab", title: 'MIDI' }),
					_react2.default.createElement(_reactBootstrap.Tab, { eventKey: "osc-tab", title: 'OSC' })
				)
			);
		}
	}
	exports.default = Diagnostics;

/***/ })

};
//# sourceMappingURL=0.326e6aa989dea094be96.hot-update.js.map