exports.id = 0;
exports.modules = {

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var util = __webpack_require__(9);
	var EventEmitter = __webpack_require__(10).EventEmitter;
	var SerialPort = __webpack_require__(11);
	//var dmx_usb_pro = require('./drivers/enttec-usb-dmx-pro');
	console.log("dmx usb pro library loaded");
	
	function DMX(device_id) {
		var self = this;
		console.log("initalize dmx usb pro");
		this.universe = {};
		//return this.universe = new dmx_usb_pro(device_id)
	
		//options = options || {}
		return this.universe = new Buffer(512);
	
		this.dev = new SerialPort(device_id, {
			'baudrate': 250000,
			'databits': 8,
			'stopbits': 2,
			'parity': 'none'
		}, function (err) {
			console.log("dmx enttec driver device error");
		});
		console.log("in driver: this.dev: " + JSON.stringify(this.dev));
		//this.universe = {};
	}
	
	util.inherits(DMX, EventEmitter);
	
	DMX.prototype.update = function (universe, channels) {
		console.log("update universe to be " + universe + " and channels are " + channels);
		this.universe.updateDMX(channels);
		this.emit('update', universe, channels);
	};
	
	DMX.prototype.updateAll = function (universe, value) {
		this.universe.updateAllDMX(value);
		this.emit('updateAll', universe, value);
	};
	
	DMX.prototype.universeToObject = function (universe) {
		//var universe = this.universe
		var u = {};
		for (var i = 0; i < this.universe.length; i++) {
			u[i] = this.universe.get(i);
		}
		return u;
	};
	
	var ENTTEC_PRO_DMX_STARTCODE = 0x00,
	    ENTTEC_PRO_START_OF_MSG = 0x7e,
	    ENTTEC_PRO_END_OF_MSG = 0xe7,
	    ENTTEC_PRO_SEND_DMX_RQ = 0x06,
	    ENTTEC_PRO_RECV_DMX_PKT = 0x05;
	/*
	function EnttecUSBDMXPRO(device_id, options) {
		var self = this
		options = options || {}
		this.universe = new Buffer(512)
		
		this.dev = new SerialPort(device_id, {
			'baudrate': 250000,
			'databits': 8,
			'stopbits': 2,
			'parity': 'none'
		}, function(err) {
			console.log("dmx enttec driver device error");
		})
		console.log("in driver: this.dev: " + JSON.stringify(this.dev));
	}
	*/
	DMX.prototype.send_universe = function () {
		if (!this.dev.isOpen()) {
			console.log("in driver, this.dev is NOT open");
			return;
		}
		var hdr = Buffer([ENTTEC_PRO_START_OF_MSG, ENTTEC_PRO_SEND_DMX_RQ, this.universe.length + 1 & 0xff, this.universe.length + 1 >> 8 & 0xff, ENTTEC_PRO_DMX_STARTCODE]);
		console.log("in driver hdr: " + JSON.stringify(hdr));
		var msg = Buffer.concat([hdr, this.universe, Buffer([ENTTEC_PRO_END_OF_MSG])]);
		console.log("in driver message: " + JSON.stringify(msg));
		this.dev.write(msg);
	};
	
	DMX.prototype.start = function () {
		console.log("in driver, start");
	};
	DMX.prototype.stop = function () {
		console.log("in driver, stop");
	};
	
	DMX.prototype.close = function (cb) {
		this.dev.close(cb);
		console.log("in driver, close dev");
	};
	
	DMX.prototype.updateDMX = function (u) {
		console.log("in enttec update what is u: " + JSON.stringify(u));
		for (var c in u) {
			this.universe[c] = u[c];
			console.log("c: " + c + " u: " + JSON.stringify(u));
		}
		console.log("update enttec this.universe: " + JSON.stringify(this.universe));
		this.send_universe();
	};
	
	DMX.prototype.updateAllDMX = function (v) {
		for (var i = 0; i < 512; i++) {
			this.universe[i] = v;
		}
		this.send_universe();
	};
	
	DMX.prototype.get = function (c) {
		return this.universe[c];
	};
	
	module.exports = DMX;

/***/ })

};
//# sourceMappingURL=0.8888f011636d8476f061.hot-update.js.map