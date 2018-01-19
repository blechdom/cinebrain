(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return callback();
/******/ 		}
/******/ 		callback(null, update);
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "b421bcb58fa3a4c60c4e"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(64);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _sourceMapSupport = __webpack_require__(2);
	
	var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);
	
	__webpack_require__(3);
	
	var _http = __webpack_require__(4);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _mongodb = __webpack_require__(5);
	
	var _socket = __webpack_require__(6);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _telnetClient = __webpack_require__(7);
	
	var _telnetClient2 = _interopRequireDefault(_telnetClient);
	
	var _dmx = __webpack_require__(8);
	
	var _dmx2 = _interopRequireDefault(_dmx);
	
	var _dgram = __webpack_require__(9);
	
	var _dgram2 = _interopRequireDefault(_dgram);
	
	var _emptyFunction = __webpack_require__(10);
	
	var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_sourceMapSupport2.default.install();
	
	
	let appModule = __webpack_require__(11);
	let db;
	let server;
	let websocket;
	let UDPserver;
	let UDPclient;
	
	let dmx = new _dmx2.default();
	let universe = dmx.addUniverse('demo', 'enttec-usb-dmx-pro', 'COM3');
	
	let on = false;
	
	const PTZ_init = Buffer.from('020000010000000001', 'hex');
	
	const PTZ_camera_on = Buffer.from('010000060000000c8101040002ff', 'hex');
	const PTZ_camera_off = Buffer.from('010000060000000c8101040003ff', 'hex');
	
	_mongodb.MongoClient.connect('mongodb://localhost/cinebrain').then(connection => {
	  db = connection;
	  server = _http2.default.createServer();
	  appModule.setDb(db);
	  server.on('request', appModule.app);
	  server.listen(80, () => {
	    console.log('App started on port 80');
	  });
	
	  UDPserver = _dgram2.default.createSocket('udp4');
	  UDPclient = _dgram2.default.createSocket('udp4');
	
	  UDPserver.on('error', err => {
	    console.log(`UDP server error:\n${err.stack}`);
	    UDPserver.close();
	  });
	
	  UDPserver.on('message', (msg, rinfo) => {
	    console.log(`UDP server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
	  });
	
	  UDPserver.on('listening', () => {
	    const address = '192.168.10.101';
	    console.log(`UDP server listening ${address.address}:${address.port}`);
	  });
	
	  UDPclient.send(PTZ_init, 52381, '192.168.0.100', err => {
	    console.log("send message " + PTZ_init + " err: " + err);
	    UDPclient.send(PTZ_camera_on, 52381, '192.168.0.100', err => {
	      console.log("send message " + PTZ_camera_on + " err: " + err);
	    });
	  });
	
	  UDPserver.bind(62455);
	
	  websocket = (0, _socket2.default)(server);
	  websocket.on('connection', socket => {
	    console.log("user connected from: " + socket.id);
	
	    socket.on('disconnect', () => {
	      console.log('user disconnected');
	    });
	    socket.on('diagnostics-send-telnet', function (data) {
	      console.log("received telnet command: " + data.host + ":" + data.port + "-->" + data.command);
	      runTelnet(data.host, data.port, data.command);
	    });
	    socket.on('control-interface-send-telnet', function (data) {
	      console.log("received telnet command: " + data.host + ":" + data.port + "-->" + data.command);
	      runTelnet(data.host, data.port, data.command);
	    });
	    socket.on('device-menu', message => {
	      console.log("the device number is: " + message);
	      websocket.sockets.emit("show-parameters", message);
	    });
	    socket.on('parameter-menu', buffer => {
	      console.log("the parameter packet is: " + buffer);
	      websocket.sockets.emit("show-parameter-inputs", buffer);
	    });
	    socket.on('dmx-go', buffer => {
	      universe.update(buffer);
	    });
	    socket.on('dmx-all', buffer => {
	      universe.updateAll(buffer);
	    });
	    socket.on('ptz-go', function (data) {
	      let UDPmessage = Buffer.from(data.buffer, 'hex');
	      UDPclient.send(PTZ_init, data.port, data.host, err => {
	        console.log("send message " + PTZ_init + " err: " + err);
	        UDPclient.send(UDPmessage, data.port, data.host, err => {
	          console.log("send message " + UDPmessage + " err: " + err);
	        });
	      });
	    });
	
	    const telnetHost = '127.0.0.1';
	    const telnetPort = 5250;
	
	    function runTelnet(telnetHost, telnetPort, command) {
	      var connection = new _telnetClient2.default();
	
	      var params = {
	        host: telnetHost,
	        port: telnetPort,
	        timeout: 1500,
	        negotiationMandatory: false,
	        ors: '\r\n',
	        waitfor: '\n'
	      };
	      connection.on('connect', function () {
	        connection.send(command, function (err, res) {
	          if (err) return err;
	
	          console.log('first message:', res.trim());
	
	          telnetResponse(res);
	
	          connection.send('', {
	            ors: '\r\n',
	            waitfor: '\n'
	          }, function (err, res) {
	            if (err) return err;
	
	            console.log('resp after cmd:', res);
	          });
	        });
	      });
	
	      connection.connect(params);
	    }
	
	    function telnetResponse(res) {
	      websocket.sockets.emit("telnet-response", res);
	    }
	  });
	}).catch(error => {
	  console.log('ERROR:', error);
	});
	
	if (true) {
	  module.hot.accept(11, () => {
	    server.removeListener('request', appModule.app);
	    appModule = __webpack_require__(11); // eslint-disable-line
	    appModule.setDb(db);
	    server.on('request', appModule.app);
	  });
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("source-map-support");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("mongodb");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("socket.io");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("telnet-client");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("dmx");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("dgram");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("fbjs/lib/emptyFunction");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setDb = exports.app = undefined;
	
	var _express = __webpack_require__(12);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bodyParser = __webpack_require__(13);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _mongodb = __webpack_require__(5);
	
	var _issue = __webpack_require__(14);
	
	var _issue2 = _interopRequireDefault(_issue);
	
	var _device = __webpack_require__(15);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _renderedPageRouter = __webpack_require__(16);
	
	var _renderedPageRouter2 = _interopRequireDefault(_renderedPageRouter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const app = (0, _express2.default)();
	
	app.use(_express2.default.static('static'));
	app.use(_bodyParser2.default.json());
	
	let db;
	
	app.get('/api/issues', (req, res) => {
	  const filter = {};
	  if (req.query.status) filter.status = req.query.status;
	  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
	  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
	  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
	
	  db.collection('issues').find(filter).toArray().then(issues => {
	    const metadata = { total_count: issues.length };
	    res.json({ _metadata: metadata, records: issues });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.get('/api/devices', (req, res) => {
	  const filter = {};
	  if (req.query.status) filter.status = req.query.status;
	  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
	  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
	  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
	
	  db.collection('devices').find(filter).toArray().then(devices => {
	    const metadata = { total_count: devices.length };
	    res.json({ _metadata: metadata, records: devices });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.get('/api/device_1_casparcg', (req, res) => {
	  const filter = {};
	  if (req.query.status) filter.status = req.query.status;
	  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
	  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
	  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
	
	  db.collection('device_1_casparcg').find(filter).toArray().then(device_1_casparcg => {
	    const metadata = { total_count: device_1_casparcg.length };
	    res.json({ _metadata: metadata, records: device_1_casparcg });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.post('/api/issues', (req, res) => {
	  const newIssue = req.body;
	  newIssue.created = new Date();
	  if (!newIssue.status) {
	    newIssue.status = 'New';
	  }
	
	  const err = _issue2.default.validateIssue(newIssue);
	  if (err) {
	    res.status(422).json({ message: `Invalid request: ${err}` });
	    return;
	  }
	
	  db.collection('issues').insertOne(_issue2.default.cleanupIssue(newIssue)).then(result => db.collection('issues').find({ _id: result.insertedId }).limit(1).next()).then(savedIssue => {
	    res.json(savedIssue);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.post('/api/devices', (req, res) => {
	  const newDevice = req.body;
	  newDevice.created = new Date();
	  if (!newDevice.status) {
	    newDevice.status = 'New';
	  }
	
	  const err = _device2.default.validateDevice(newDevice);
	  if (err) {
	    res.status(422).json({ message: `Invalid request: ${err}` });
	    return;
	  }
	
	  db.collection('devices').insertOne(_device2.default.cleanupDevice(newDevice)).then(result => db.collection('devices').find({ _id: result.insertedId }).limit(1).next()).then(savedDevice => {
	    res.json(savedDevice);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.get('/api/issues/:id', (req, res) => {
	  let issueId;
	  try {
	    issueId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
	    return;
	  }
	
	  db.collection('issues').find({ _id: issueId }).limit(1).next().then(issue => {
	    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });else res.json(issue);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.get('/api/devices/:id', (req, res) => {
	  let deviceId;
	  try {
	    deviceId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid device ID format: ${error}` });
	    return;
	  }
	
	  db.collection('devices').find({ _id: deviceId }).limit(1).next().then(device => {
	    if (!device) res.status(404).json({ message: `No such device: ${deviceId}` });else res.json(device);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.put('/api/issues/:id', (req, res) => {
	  let issueId;
	  try {
	    issueId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
	    return;
	  }
	
	  const issue = req.body;
	  delete issue._id;
	
	  const err = _issue2.default.validateIssue(issue);
	  if (err) {
	    res.status(422).json({ message: `Invalid request: ${err}` });
	    return;
	  }
	
	  db.collection('issues').updateOne({ _id: issueId }, _issue2.default.convertIssue(issue)).then(() => db.collection('issues').find({ _id: issueId }).limit(1).next()).then(savedIssue => {
	    res.json(savedIssue);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	
	app.put('/api/devices/:id', (req, res) => {
	  let deviceId;
	  try {
	    deviceId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid device ID format: ${error}` });
	    return;
	  }
	
	  const device = req.body;
	  delete device._id;
	
	  const err = _device2.default.validateDevice(device);
	  if (err) {
	    res.status(422).json({ message: `Invalid request: ${err}` });
	    return;
	  }
	
	  db.collection('devices').updateOne({ _id: deviceId }, _device2.default.convertDevice(device)).then(() => db.collection('devices').find({ _id: deviceId }).limit(1).next()).then(savedDevice => {
	    res.json(savedDevice);
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	app.delete('/api/issues/:id', (req, res) => {
	  let issueId;
	  try {
	    issueId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
	    return;
	  }
	
	  db.collection('issues').deleteOne({ _id: issueId }).then(deleteResult => {
	    if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object not found' });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	app.delete('/api/devices/:id', (req, res) => {
	  let deviceId;
	  try {
	    deviceId = new _mongodb.ObjectId(req.params.id);
	  } catch (error) {
	    res.status(422).json({ message: `Invalid device ID format: ${error}` });
	    return;
	  }
	
	  db.collection('devices').deleteOne({ _id: deviceId }).then(deleteResult => {
	    if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object not found' });
	  }).catch(error => {
	    console.log(error);
	    res.status(500).json({ message: `Internal Server Error: ${error}` });
	  });
	});
	app.use('/', _renderedPageRouter2.default);
	
	function setDb(newDb) {
	  db = newDb;
	}
	
	exports.app = app;
	exports.setDb = setDb;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	const validIssueStatus = {
	  New: true,
	  Open: true,
	  Assigned: true,
	  Fixed: true,
	  Verified: true,
	  Closed: true
	};
	
	const issueFieldType = {
	  status: 'required',
	  owner: 'required',
	  effort: 'optional',
	  created: 'required',
	  completionDate: 'optional',
	  title: 'required'
	};
	
	function cleanupIssue(issue) {
	  const cleanedUpIssue = {};
	  Object.keys(issue).forEach(field => {
	    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
	  });
	  return cleanedUpIssue;
	}
	
	function convertIssue(issue) {
	  if (issue.created) issue.created = new Date(issue.created);
	  if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
	  return cleanupIssue(issue);
	}
	
	function validateIssue(issue) {
	  const errors = [];
	  Object.keys(issueFieldType).forEach(field => {
	    if (issueFieldType[field] === 'required' && !issue[field]) {
	      errors.push(`Missing mandatory field: ${field}`);
	    }
	  });
	
	  if (!validIssueStatus[issue.status]) {
	    errors.push(`${issue.status} is not a valid status.`);
	  }
	
	  return errors.length ? errors.join('; ') : null;
	}
	
	exports.default = {
	  validateIssue: validateIssue,
	  cleanupIssue: cleanupIssue,
	  convertIssue: convertIssue
	};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	const validDeviceStatus = {
	  _id: true,
	  device_id: true,
	  name: true,
	  core: true,
	  purpose: true,
	  protocol: true,
	  port: true,
	  specification: true,
	  control_types: true,
	  status: true,
	  who: true,
	  notes: true,
	  example_command: true,
	  manual_link: true
	};
	
	const deviceFieldType = {
	  device_id: 'required',
	  name: 'required',
	  purpose: 'optional',
	  control_types: 'optional',
	  status: 'required'
	};
	
	function cleanupDevice(device) {
	  const cleanedUpDevice = {};
	  Object.keys(device).forEach(field => {
	    if (deviceFieldType[field]) cleanedUpDevice[field] = device[field];
	  });
	  return cleanedUpDevice;
	}
	
	function convertDevice(device) {
	  if (device.status) device.status = new Date(device.created);
	  if (device.completionDate) device.completionDate = new Date(device.completionDate);
	  return cleanupDevice(device);
	}
	
	function validateDevice(device) {
	  const errors = [];
	  Object.keys(deviceFieldType).forEach(field => {
	    if (deviceFieldType[field] === 'required' && !device[field]) {
	      errors.push(`Missing mandatory field: ${field}`);
	    }
	  });
	
	  if (!validDeviceStatus[device.status]) {
	    errors.push(`${device.status} is not a valid status.`);
	  }
	
	  return errors.length ? errors.join('; ') : null;
	}
	
	exports.default = {
	  validateDevice: validateDevice,
	  cleanupDevice: cleanupDevice,
	  convertDevice: convertDevice
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(18);
	
	var _reactRouter = __webpack_require__(19);
	
	var _express = __webpack_require__(12);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _template = __webpack_require__(20);
	
	var _template2 = _interopRequireDefault(_template);
	
	var _Routes = __webpack_require__(21);
	
	var _Routes2 = _interopRequireDefault(_Routes);
	
	var _ContextWrapper = __webpack_require__(63);
	
	var _ContextWrapper2 = _interopRequireDefault(_ContextWrapper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const renderedPageRouter = new _express2.default();
	
	renderedPageRouter.get('*', (req, res) => {
	  (0, _reactRouter.match)({ routes: _Routes2.default, location: req.url }, (error, redirectLocation, renderProps) => {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	      const componentsWithData = renderProps.components.filter(c => c.dataFetcher);
	      const dataFetchers = componentsWithData.map(c => c.dataFetcher({
	        params: renderProps.params, location: renderProps.location,
	        urlBase: 'http://localhost'
	      }));
	      Promise.all(dataFetchers).then(dataList => {
	        let initialState = {};
	        dataList.forEach(namedData => {
	          initialState = Object.assign(initialState, namedData);
	        });
	        const html = (0, _server.renderToString)(_react2.default.createElement(
	          _ContextWrapper2.default,
	          { initialState: initialState },
	          _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	        ));
	        res.status(200).send((0, _template2.default)(html, initialState));
	      }).catch(err => {
	        console.log(`Error rendering to string: ${err}`);
	      });
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
	});
	
	exports.default = renderedPageRouter;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("react-router");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = template;
	function template(body, initialState) {
	  return `<!DOCTYPE HTML>
	<html>
	<head>
	  <meta charset="UTF-8" />
	  <title>CINEBRAIN</title>
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <link rel="stylesheet" href="/css/bootstrap.min.css" >
	<link rel="stylesheet" href="/css/react-grid-layout-styles.css" >
	  <link rel="stylesheet" href="/css/react-resizable-styles.css" >
	    <link rel="stylesheet" href="/css/slider.css" />
	<style>
	    .panel-title a {display: block; width: 100%; cursor: pointer; }
	  </style>
	</head>
	
	<body>
	  <div id="contents">${body}</div>    <!-- this is where our component will appear -->
	  <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
	  <script src="/vendor.bundle.js"></script>
	  <script src="/app.bundle.js"></script>
	
	</body>
	
	</html>
	`;
	}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(19);
	
	var _App = __webpack_require__(22);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _IssueList = __webpack_require__(26);
	
	var _IssueList2 = _interopRequireDefault(_IssueList);
	
	var _IssueEdit = __webpack_require__(31);
	
	var _IssueEdit2 = _interopRequireDefault(_IssueEdit);
	
	var _DeviceList = __webpack_require__(34);
	
	var _DeviceList2 = _interopRequireDefault(_DeviceList);
	
	var _DeviceEdit = __webpack_require__(36);
	
	var _DeviceEdit2 = _interopRequireDefault(_DeviceEdit);
	
	var _NewControllers = __webpack_require__(37);
	
	var _NewControllers2 = _interopRequireDefault(_NewControllers);
	
	var _ControlInterface = __webpack_require__(48);
	
	var _ControlInterface2 = _interopRequireDefault(_ControlInterface);
	
	var _Demo = __webpack_require__(54);
	
	var _Demo2 = _interopRequireDefault(_Demo);
	
	var _CasparGroup = __webpack_require__(55);
	
	var _CasparGroup2 = _interopRequireDefault(_CasparGroup);
	
	var _CasparGroup3 = __webpack_require__(56);
	
	var _CasparGroup4 = _interopRequireDefault(_CasparGroup3);
	
	var _Group = __webpack_require__(57);
	
	var _Group2 = _interopRequireDefault(_Group);
	
	var _Group3 = __webpack_require__(58);
	
	var _Group4 = _interopRequireDefault(_Group3);
	
	var _PTZGroup = __webpack_require__(59);
	
	var _PTZGroup2 = _interopRequireDefault(_PTZGroup);
	
	var _PTZGroup3 = __webpack_require__(60);
	
	var _PTZGroup4 = _interopRequireDefault(_PTZGroup3);
	
	var _Diagnostics = __webpack_require__(61);
	
	var _Diagnostics2 = _interopRequireDefault(_Diagnostics);
	
	var _Help = __webpack_require__(62);
	
	var _Help2 = _interopRequireDefault(_Help);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const NoMatch = () => _react2.default.createElement(
	  'p',
	  null,
	  'Page Not Found'
	);
	
	exports.default = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/controllers' }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'caspar_group1', component: _CasparGroup2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'caspar_group2', component: _CasparGroup4.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'demo', component: _Demo2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'group1', component: _Group2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'group2', component: _Group4.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'ptz_group1', component: _PTZGroup2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'ptz_group2', component: _PTZGroup4.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'control_interface', component: _ControlInterface2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'new_controllers', component: _NewControllers2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'issues', component: (0, _reactRouter.withRouter)(_IssueList2.default) }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'issues/:id', component: _IssueEdit2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'devices', component: (0, _reactRouter.withRouter)(_DeviceList2.default) }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'devices/:id', component: _DeviceEdit2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'diagnostics', component: _Diagnostics2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'help', component: (0, _reactRouter.withRouter)(_Help2.default) }),
	  _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
	);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(3);
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _reactRouterBootstrap = __webpack_require__(24);
	
	var _moreVert = __webpack_require__(25);
	
	var _moreVert2 = _interopRequireDefault(_moreVert);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const Header = () => _react2.default.createElement(
	  _reactBootstrap.Navbar,
	  { fluid: true },
	  _react2.default.createElement(
	    _reactBootstrap.Navbar.Header,
	    null,
	    _react2.default.createElement(
	      _reactBootstrap.Navbar.Brand,
	      null,
	      'Cinebrain'
	    )
	  ),
	  _react2.default.createElement(
	    _reactBootstrap.Nav,
	    null,
	    _react2.default.createElement(
	      _reactBootstrap.NavDropdown,
	      { id: 'user-dropdown', title: 'Group 1' },
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/group1' },
	        _react2.default.createElement(
	          _reactBootstrap.NavItem,
	          null,
	          'Lights'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/ptz_group1' },
	        _react2.default.createElement(
	          _reactBootstrap.NavItem,
	          null,
	          'Camera'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/caspar_group1' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Video'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      _reactBootstrap.NavDropdown,
	      { id: 'user-dropdown', title: 'Group 2' },
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/group2' },
	        _react2.default.createElement(
	          _reactBootstrap.NavItem,
	          null,
	          'Lights'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/ptz_group2' },
	        _react2.default.createElement(
	          _reactBootstrap.NavItem,
	          null,
	          'Camera'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/caspar_group2' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Video'
	        )
	      )
	    )
	  ),
	  _react2.default.createElement(
	    _reactBootstrap.Nav,
	    { pullRight: true },
	    _react2.default.createElement(
	      _reactBootstrap.NavDropdown,
	      { id: 'user-dropdown', title: _react2.default.createElement(_moreVert2.default, { size: 18 }), noCaret: true },
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/demo' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Demo'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/control_interface' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Control Interface'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/new_controllers' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'New Controllers'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/devices' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Devices'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/issues' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Issues'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/diagnostics' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Diagnostics'
	        )
	      ),
	      _react2.default.createElement(
	        _reactRouterBootstrap.LinkContainer,
	        { to: '/help' },
	        _react2.default.createElement(
	          _reactBootstrap.MenuItem,
	          null,
	          'Help'
	        )
	      )
	    )
	  )
	);
	
	const App = props => _react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(Header, null),
	  _react2.default.createElement(
	    'div',
	    { className: 'container-fluid' },
	    props.children,
	    _react2.default.createElement('hr', null)
	  )
	);
	
	App.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = App;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	module.exports = require("react-router-bootstrap");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/md/more-vert");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(27);
	
	var _reactRouter = __webpack_require__(19);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _trash = __webpack_require__(28);
	
	var _trash2 = _interopRequireDefault(_trash);
	
	var _IssueFilter = __webpack_require__(29);
	
	var _IssueFilter2 = _interopRequireDefault(_IssueFilter);
	
	var _Toast = __webpack_require__(30);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const IssueRow = props => {
	  function onDeleteClick() {
	    props.deleteIssue(props.issue._id);
	  }
	
	  return _react2.default.createElement(
	    'tr',
	    null,
	    _react2.default.createElement(
	      'td',
	      null,
	      _react2.default.createElement(
	        _reactRouter.Link,
	        { to: `/issues/${props.issue._id}` },
	        props.issue._id.substr(-4)
	      )
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.status
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.owner
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.created.toDateString()
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.effort
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.issue.title
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Button,
	        { bsSize: 'xsmall', onClick: onDeleteClick },
	        _react2.default.createElement(_trash2.default, null)
	      )
	    )
	  );
	};
	
	IssueRow.propTypes = {
	  issue: _react2.default.PropTypes.object.isRequired,
	  deleteIssue: _react2.default.PropTypes.func.isRequired
	};
	
	function IssueTable(props) {
	  const issueRows = props.issues.map(issue => _react2.default.createElement(IssueRow, { key: issue._id, issue: issue, deleteIssue: props.deleteIssue }));
	  return _react2.default.createElement(
	    _reactBootstrap.Table,
	    { bordered: true, condensed: true, hover: true, responsive: true },
	    _react2.default.createElement(
	      'thead',
	      null,
	      _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	          'th',
	          null,
	          'Id'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Status'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Owner'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Created'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Effort'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Completion Date'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Title'
	        ),
	        _react2.default.createElement('th', null)
	      )
	    ),
	    _react2.default.createElement(
	      'tbody',
	      null,
	      issueRows
	    )
	  );
	}
	
	IssueTable.propTypes = {
	  issues: _react2.default.PropTypes.array.isRequired,
	  deleteIssue: _react2.default.PropTypes.func.isRequired
	};
	
	class IssueList extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        location = _ref.location;
	
	    return fetch(`${urlBase || ''}/api/issues${location.search}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ IssueList: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const issues = context.initialState.IssueList ? context.initialState.IssueList.records : [];
	    issues.forEach(issue => {
	      issue.created = new Date(issue.created);
	      if (issue.completionDate) {
	        issue.completionDate = new Date(issue.completionDate);
	      }
	    });
	    this.state = {
	      issues: issues,
	      toastVisible: false, toastMessage: '', toastType: 'success'
	    };
	
	    this.setFilter = this.setFilter.bind(this);
	    this.deleteIssue = this.deleteIssue.bind(this);
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
	  }
	
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    const oldQuery = prevProps.location.query;
	    const newQuery = this.props.location.query;
	    if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte) {
	      return;
	    }
	    this.loadData();
	  }
	
	  setFilter(query) {
	    this.props.router.push({ pathname: this.props.location.pathname, query: query });
	  }
	
	  showError(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	  }
	
	  dismissToast() {
	    this.setState({ toastVisible: false });
	  }
	
	  loadData() {
	    IssueList.dataFetcher({ location: this.props.location }).then(data => {
	      const issues = data.IssueList.records;
	      issues.forEach(issue => {
	        issue.created = new Date(issue.created);
	        if (issue.completionDate) {
	          issue.completionDate = new Date(issue.completionDate);
	        }
	      });
	      this.setState({ issues: issues });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  deleteIssue(id) {
	    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
	      if (!response.ok) this.showError('Failed to delete issue');else this.loadData();
	    });
	  }
	
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Panel,
	        { collapsible: true, header: 'Filter' },
	        _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter, initFilter: this.props.location.query })
	      ),
	      _react2.default.createElement(IssueTable, { issues: this.state.issues, deleteIssue: this.deleteIssue }),
	      _react2.default.createElement(_Toast2.default, {
	        showing: this.state.toastVisible, message: this.state.toastMessage,
	        onDismiss: this.dismissToast, bsStyle: this.state.toastType
	      })
	    );
	  }
	}
	
	exports.default = IssueList;
	IssueList.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	IssueList.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/fa/trash");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class IssueFilter extends _react2.default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      status: props.initFilter.status || '',
	      effort_gte: props.initFilter.effort_gte || '',
	      effort_lte: props.initFilter.effort_lte || '',
	      changed: false
	    };
	    this.onChangeStatus = this.onChangeStatus.bind(this);
	    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
	    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
	    this.applyFilter = this.applyFilter.bind(this);
	    this.resetFilter = this.resetFilter.bind(this);
	    this.clearFilter = this.clearFilter.bind(this);
	  }
	
	  componentWillReceiveProps(newProps) {
	    this.setState({
	      status: newProps.initFilter.status || '',
	      effort_gte: newProps.initFilter.effort_gte || '',
	      effort_lte: newProps.initFilter.effort_lte || '',
	      changed: false
	    });
	  }
	
	  onChangeStatus(e) {
	    this.setState({ status: e.target.value, changed: true });
	  }
	
	  onChangeEffortGte(e) {
	    const effortString = e.target.value;
	    if (effortString.match(/^\d*$/)) {
	      this.setState({ effort_gte: e.target.value, changed: true });
	    }
	  }
	
	  onChangeEffortLte(e) {
	    const effortString = e.target.value;
	    if (effortString.match(/^\d*$/)) {
	      this.setState({ effort_lte: e.target.value, changed: true });
	    }
	  }
	
	  applyFilter() {
	    const newFilter = {};
	    if (this.state.status) newFilter.status = this.state.status;
	    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
	    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
	    this.props.setFilter(newFilter);
	  }
	
	  clearFilter() {
	    this.props.setFilter({});
	  }
	
	  resetFilter() {
	    this.setState({
	      status: this.props.initFilter.status || '',
	      effort_gte: this.props.initFilter.effort_gte || '',
	      effort_lte: this.props.initFilter.effort_lte || '',
	      changed: false
	    });
	  }
	
	  render() {
	    return _react2.default.createElement(
	      _reactBootstrap.Row,
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { xs: 6, sm: 4, md: 3, lg: 2 },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.ControlLabel,
	            null,
	            'Status'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormControl,
	            {
	              componentClass: 'select', value: this.state.status,
	              onChange: this.onChangeStatus
	            },
	            _react2.default.createElement(
	              'option',
	              { value: '' },
	              '(Any)'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'New' },
	              'New'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Open' },
	              'Open'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Assigned' },
	              'Assigned'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Fixed' },
	              'Fixed'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Verified' },
	              'Verified'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Closed' },
	              'Closed'
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { xs: 6, sm: 4, md: 3, lg: 2 },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.ControlLabel,
	            null,
	            'Effort'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.InputGroup,
	            null,
	            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_gte, onChange: this.onChangeEffortGte }),
	            _react2.default.createElement(
	              _reactBootstrap.InputGroup.Addon,
	              null,
	              '-'
	            ),
	            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_lte, onChange: this.onChangeEffortLte })
	          )
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { xs: 6, sm: 4, md: 3, lg: 2 },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.ControlLabel,
	            null,
	            '\xA0'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.ButtonToolbar,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { bsStyle: 'primary', onClick: this.applyFilter },
	              'Apply'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { onClick: this.resetFilter, disabled: !this.state.changed },
	              'Reset'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { onClick: this.clearFilter },
	              'Clear'
	            )
	          )
	        )
	      )
	    );
	  }
	}
	
	exports.default = IssueFilter;
	IssueFilter.propTypes = {
	  setFilter: _react2.default.PropTypes.func.isRequired,
	  initFilter: _react2.default.PropTypes.object.isRequired
	};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Toast extends _react2.default.Component {
	  componentDidUpdate() {
	    if (this.props.showing) {
	      clearTimeout(this.dismissTimer);
	      this.dismissTimer = setTimeout(this.props.onDismiss, 5000);
	    }
	  }
	
	  componentWillUnmount() {
	    clearTimeout(this.dismissTimer);
	  }
	
	  render() {
	    return _react2.default.createElement(
	      _reactBootstrap.Collapse,
	      { 'in': this.props.showing },
	      _react2.default.createElement(
	        'div',
	        { style: { position: 'fixed', top: 30, left: 0, right: 0, textAlign: 'center' } },
	        _react2.default.createElement(
	          _reactBootstrap.Alert,
	          {
	            style: { display: 'inline-block', width: 500 }, bsStyle: this.props.bsStyle,
	            onDismiss: this.props.onDismiss
	          },
	          this.props.message
	        )
	      )
	    );
	  }
	}
	
	exports.default = Toast;
	Toast.propTypes = {
	  showing: _react2.default.PropTypes.bool.isRequired,
	  onDismiss: _react2.default.PropTypes.func.isRequired,
	  bsStyle: _react2.default.PropTypes.string,
	  message: _react2.default.PropTypes.any.isRequired
	};
	
	Toast.defaultProps = {
	  bsStyle: 'success'
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _reactRouterBootstrap = __webpack_require__(24);
	
	var _NumInput = __webpack_require__(32);
	
	var _NumInput2 = _interopRequireDefault(_NumInput);
	
	var _DateInput = __webpack_require__(33);
	
	var _DateInput2 = _interopRequireDefault(_DateInput);
	
	var _Toast = __webpack_require__(30);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class IssueEdit extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let params = _ref.params,
	        urlBase = _ref.urlBase;
	
	    return fetch(`${urlBase || ''}/api/issues/${params.id}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ IssueEdit: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    let issue;
	    if (context.initialState.IssueEdit) {
	      issue = context.initialState.IssueEdit;
	      issue.created = new Date(issue.created);
	      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
	    } else {
	      issue = {
	        _id: '', title: '', status: '', owner: '', effort: null,
	        completionDate: null, created: null
	      };
	    }
	    this.state = {
	      issue: issue,
	      invalidFields: {}, showingValidation: false,
	      toastVisible: false, toastMessage: '', toastType: 'success'
	    };
	    this.dismissValidation = this.dismissValidation.bind(this);
	    this.showValidation = this.showValidation.bind(this);
	    this.showSuccess = this.showSuccess.bind(this);
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.onValidityChange = this.onValidityChange.bind(this);
	    this.onSubmit = this.onSubmit.bind(this);
	  }
	
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    if (prevProps.params.id !== this.props.params.id) {
	      this.loadData();
	    }
	  }
	
	  onChange(event, convertedValue) {
	    const issue = Object.assign({}, this.state.issue);
	    const value = convertedValue !== undefined ? convertedValue : event.target.value;
	    issue[event.target.name] = value;
	    this.setState({ issue: issue });
	  }
	
	  onValidityChange(event, valid) {
	    const invalidFields = Object.assign({}, this.state.invalidFields);
	    if (!valid) {
	      invalidFields[event.target.name] = true;
	    } else {
	      delete invalidFields[event.target.name];
	    }
	    this.setState({ invalidFields: invalidFields });
	  }
	
	  onSubmit(event) {
	    event.preventDefault();
	    this.showValidation();
	
	    if (Object.keys(this.state.invalidFields).length !== 0) {
	      return;
	    }
	
	    fetch(`/api/issues/${this.props.params.id}`, {
	      method: 'PUT',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(this.state.issue)
	    }).then(response => {
	      if (response.ok) {
	        response.json().then(updatedIssue => {
	          updatedIssue.created = new Date(updatedIssue.created);
	          if (updatedIssue.completionDate) {
	            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
	          }
	          this.setState({ issue: updatedIssue });
	          this.showSuccess('Updated issue successfully.');
	        });
	      } else {
	        response.json().then(error => {
	          this.showError(`Failed to update issue: ${error.message}`);
	        });
	      }
	    }).catch(err => {
	      this.showError(`Error in sending data to server: ${err.message}`);
	    });
	  }
	
	  loadData() {
	    IssueEdit.dataFetcher({ params: this.props.params }).then(data => {
	      const issue = data.IssueEdit;
	      issue.created = new Date(issue.created);
	      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
	      this.setState({ issue: issue });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err.message}`);
	    });
	  }
	
	  showValidation() {
	    this.setState({ showingValidation: true });
	  }
	
	  dismissValidation() {
	    this.setState({ showingValidation: false });
	  }
	
	  showSuccess(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
	  }
	
	  showError(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	  }
	
	  dismissToast() {
	    this.setState({ toastVisible: false });
	  }
	
	  render() {
	    const issue = this.state.issue;
	    let validationMessage = null;
	    if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
	      validationMessage = _react2.default.createElement(
	        _reactBootstrap.Alert,
	        { bsStyle: 'danger', onDismiss: this.dismissValidation },
	        'Please correct invalid fields before submitting.'
	      );
	    }
	    return _react2.default.createElement(
	      _reactBootstrap.Panel,
	      { header: 'Edit Issue' },
	      _react2.default.createElement(
	        _reactBootstrap.Form,
	        { horizontal: true, onSubmit: this.onSubmit },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'ID'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(
	              _reactBootstrap.FormControl.Static,
	              null,
	              issue._id
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Created'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(
	              _reactBootstrap.FormControl.Static,
	              null,
	              issue.created ? issue.created.toDateString() : ''
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Status'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(
	              _reactBootstrap.FormControl,
	              {
	                componentClass: 'select', name: 'status', value: issue.status,
	                onChange: this.onChange
	              },
	              _react2.default.createElement(
	                'option',
	                { value: 'New' },
	                'New'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Open' },
	                'Open'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Assigned' },
	                'Assigned'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Fixed' },
	                'Fixed'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Verified' },
	                'Verified'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Closed' },
	                'Closed'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Owner'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner', value: issue.owner, onChange: this.onChange })
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Effort'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, {
	              componentClass: _NumInput2.default, name: 'effort',
	              value: issue.effort, onChange: this.onChange
	            })
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          { validationState: this.state.invalidFields.completionDate ? 'error' : null },
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Completion Date'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, {
	              componentClass: _DateInput2.default, name: 'completionDate',
	              value: issue.completionDate, onChange: this.onChange,
	              onValidityChange: this.onValidityChange
	            }),
	            _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Title'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'title', value: issue.title, onChange: this.onChange })
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
	                'Submit'
	              ),
	              _react2.default.createElement(
	                _reactRouterBootstrap.LinkContainer,
	                { to: '/issues' },
	                _react2.default.createElement(
	                  _reactBootstrap.Button,
	                  { bsStyle: 'link' },
	                  'Back'
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { smOffset: 3, sm: 9 },
	            validationMessage
	          )
	        )
	      ),
	      _react2.default.createElement(_Toast2.default, {
	        showing: this.state.toastVisible, message: this.state.toastMessage,
	        onDismiss: this.dismissToast, bsStyle: this.state.toastType
	      })
	    );
	  }
	}
	
	exports.default = IssueEdit;
	IssueEdit.propTypes = {
	  params: _react2.default.PropTypes.object.isRequired
	};
	
	IssueEdit.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class NumInput extends _react2.default.Component {
	  constructor(props) {
	    super(props);
	    this.state = { value: this.format(props.value) };
	    this.onBlur = this.onBlur.bind(this);
	    this.onChange = this.onChange.bind(this);
	  }
	
	  componentWillReceiveProps(newProps) {
	    this.setState({ value: this.format(newProps.value) });
	  }
	
	  onBlur(e) {
	    this.props.onChange(e, this.unformat(this.state.value));
	  }
	
	  onChange(e) {
	    if (e.target.value.match(/^\d*$/)) {
	      this.setState({ value: e.target.value });
	    }
	  }
	
	  format(num) {
	    return num != null ? num.toString() : '';
	  }
	
	  unformat(str) {
	    const val = parseInt(str, 10);
	    return isNaN(val) ? null : val;
	  }
	
	  render() {
	    return _react2.default.createElement('input', _extends({
	      type: 'text' }, this.props, { value: this.state.value,
	      onBlur: this.onBlur, onChange: this.onChange
	    }));
	  }
	}
	
	exports.default = NumInput;
	NumInput.propTypes = {
	  value: _react2.default.PropTypes.number,
	  onChange: _react2.default.PropTypes.func.isRequired
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class DateInput extends _react2.default.Component {
	  constructor(props) {
	    super(props);
	    this.state = { value: this.editFormat(props.value), focused: false, valid: true };
	    this.onFocus = this.onFocus.bind(this);
	    this.onBlur = this.onBlur.bind(this);
	    this.onChange = this.onChange.bind(this);
	  }
	
	  componentWillReceiveProps(newProps) {
	    if (newProps.value !== this.props.value) {
	      this.setState({ value: this.editFormat(newProps.value) });
	    }
	  }
	
	  onFocus() {
	    this.setState({ focused: true });
	  }
	
	  onBlur(e) {
	    const value = this.unformat(this.state.value);
	    const valid = this.state.value === '' || value != null;
	    if (valid !== this.state.valid && this.props.onValidityChange) {
	      this.props.onValidityChange(e, valid);
	    }
	    this.setState({ focused: false, valid: valid });
	    if (valid) this.props.onChange(e, value);
	  }
	
	  onChange(e) {
	    if (e.target.value.match(/^[\d-]*$/)) {
	      this.setState({ value: e.target.value });
	    }
	  }
	
	  displayFormat(date) {
	    return date != null ? date.toDateString() : '';
	  }
	
	  editFormat(date) {
	    return date != null ? date.toISOString().substr(0, 10) : '';
	  }
	
	  unformat(str) {
	    const val = new Date(str);
	    return isNaN(val.getTime()) ? null : val;
	  }
	
	  render() {
	    const value = this.state.focused || !this.state.valid ? this.state.value : this.displayFormat(this.props.value);
	    const childProps = Object.assign({}, this.props);
	    delete childProps.onValidityChange;
	    return _react2.default.createElement('input', _extends({
	      type: 'text' }, childProps, { value: value,
	      placeholder: this.state.focused ? 'yyyy-mm-dd' : null,
	      onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange
	    }));
	  }
	}
	
	exports.default = DateInput;
	DateInput.propTypes = {
	  value: _react2.default.PropTypes.object,
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onValidityChange: _react2.default.PropTypes.func,
	  name: _react2.default.PropTypes.string.isRequired
	};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(27);
	
	var _reactRouter = __webpack_require__(19);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _DeviceFilter = __webpack_require__(35);
	
	var _DeviceFilter2 = _interopRequireDefault(_DeviceFilter);
	
	var _Toast = __webpack_require__(30);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const DeviceRow = props => {
	
	  return _react2.default.createElement(
	    'tr',
	    null,
	    _react2.default.createElement(
	      'td',
	      null,
	      props.device.device_number
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.device.status
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.device.name
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.device.purpose
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.device.protocol
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.device.port
	    ),
	    _react2.default.createElement(
	      'td',
	      null,
	      props.device.control_types
	    )
	  );
	};
	
	DeviceRow.propTypes = {
	  device: _react2.default.PropTypes.object.isRequired
	  //deleteDevice: React.PropTypes.func.isRequired,
	};
	
	function DeviceTable(props) {
	  const deviceRows = props.devices.map(device => _react2.default.createElement(DeviceRow, { key: device._id, device: device }) //deleteDevice={props.deleteDevice} />
	  );
	  return _react2.default.createElement(
	    _reactBootstrap.Table,
	    { bordered: true, condensed: true, hover: true, responsive: true },
	    _react2.default.createElement(
	      'thead',
	      null,
	      _react2.default.createElement(
	        'tr',
	        null,
	        _react2.default.createElement(
	          'th',
	          null,
	          'Number'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Status'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Name'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Purpose'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Protocol'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Port'
	        ),
	        _react2.default.createElement(
	          'th',
	          null,
	          'Control Types'
	        )
	      )
	    ),
	    _react2.default.createElement(
	      'tbody',
	      null,
	      deviceRows
	    )
	  );
	}
	
	DeviceTable.propTypes = {
	  devices: _react2.default.PropTypes.array.isRequired
	  // deleteDevice: React.PropTypes.func.isRequired,
	};
	
	class DeviceList extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        location = _ref.location;
	
	    return fetch(`${urlBase || ''}/api/devices${location.search}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ DeviceList: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const devices = context.initialState.DeviceList ? context.initialState.DeviceList.records : [];
	    devices.forEach(device => {
	      device.created = new Date(device.created);
	      if (device.completionDate) {
	        device.completionDate = new Date(device.completionDate);
	      }
	    });
	    this.state = {
	      devices: devices,
	      toastVisible: false, toastMessage: '', toastType: 'success'
	    };
	
	    this.setFilter = this.setFilter.bind(this);
	    //this.deleteDevice = this.deleteDevice.bind(this);
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
	  }
	
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    const oldQuery = prevProps.location.query;
	    const newQuery = this.props.location.query;
	    if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte) {
	      return;
	    }
	    this.loadData();
	  }
	
	  setFilter(query) {
	    this.props.router.push({ pathname: this.props.location.pathname, query: query });
	  }
	
	  showError(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	  }
	
	  dismissToast() {
	    this.setState({ toastVisible: false });
	  }
	
	  loadData() {
	    DeviceList.dataFetcher({ location: this.props.location }).then(data => {
	      const devices = data.DeviceList.records;
	      devices.forEach(device => {
	        device.created = new Date(device.created);
	        if (device.completionDate) {
	          device.completionDate = new Date(device.completionDate);
	        }
	      });
	      this.setState({ devices: devices });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  /* deleteDevice(id) {
	     fetch(`/api/devices/${id}`, { method: 'DELETE' }).then(response => {
	       if (!response.ok) this.showError('Failed to delete device');
	       else this.loadData();
	     });
	   }*/
	
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Panel,
	        { collapsible: true, header: 'Filter' },
	        _react2.default.createElement(_DeviceFilter2.default, { setFilter: this.setFilter, initFilter: this.props.location.query })
	      ),
	      _react2.default.createElement(DeviceTable, { devices: this.state.devices }),
	      _react2.default.createElement(_Toast2.default, {
	        showing: this.state.toastVisible, message: this.state.toastMessage,
	        onDismiss: this.dismissToast, bsStyle: this.state.toastType
	      })
	    );
	  }
	}
	
	exports.default = DeviceList;
	DeviceList.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	DeviceList.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class DeviceFilter extends _react2.default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      status: props.initFilter.status || '',
	      effort_gte: props.initFilter.effort_gte || '',
	      effort_lte: props.initFilter.effort_lte || '',
	      changed: false
	    };
	    this.onChangeStatus = this.onChangeStatus.bind(this);
	    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
	    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
	    this.applyFilter = this.applyFilter.bind(this);
	    this.resetFilter = this.resetFilter.bind(this);
	    this.clearFilter = this.clearFilter.bind(this);
	  }
	
	  componentWillReceiveProps(newProps) {
	    this.setState({
	      status: newProps.initFilter.status || '',
	      effort_gte: newProps.initFilter.effort_gte || '',
	      effort_lte: newProps.initFilter.effort_lte || '',
	      changed: false
	    });
	  }
	
	  onChangeStatus(e) {
	    this.setState({ status: e.target.value, changed: true });
	  }
	
	  onChangeEffortGte(e) {
	    const effortString = e.target.value;
	    if (effortString.match(/^\d*$/)) {
	      this.setState({ effort_gte: e.target.value, changed: true });
	    }
	  }
	
	  onChangeEffortLte(e) {
	    const effortString = e.target.value;
	    if (effortString.match(/^\d*$/)) {
	      this.setState({ effort_lte: e.target.value, changed: true });
	    }
	  }
	
	  applyFilter() {
	    const newFilter = {};
	    if (this.state.status) newFilter.status = this.state.status;
	    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
	    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
	    this.props.setFilter(newFilter);
	  }
	
	  clearFilter() {
	    this.props.setFilter({});
	  }
	
	  resetFilter() {
	    this.setState({
	      status: this.props.initFilter.status || '',
	      effort_gte: this.props.initFilter.effort_gte || '',
	      effort_lte: this.props.initFilter.effort_lte || '',
	      changed: false
	    });
	  }
	
	  render() {
	    return _react2.default.createElement(
	      _reactBootstrap.Row,
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { xs: 6, sm: 4, md: 3, lg: 2 },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.ControlLabel,
	            null,
	            'Status'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.FormControl,
	            {
	              componentClass: 'select', value: this.state.status,
	              onChange: this.onChangeStatus
	            },
	            _react2.default.createElement(
	              'option',
	              { value: '' },
	              '(Any)'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'New' },
	              'New'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Open' },
	              'Open'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Assigned' },
	              'Assigned'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Fixed' },
	              'Fixed'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Verified' },
	              'Verified'
	            ),
	            _react2.default.createElement(
	              'option',
	              { value: 'Closed' },
	              'Closed'
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { xs: 6, sm: 4, md: 3, lg: 2 },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.ControlLabel,
	            null,
	            'Effort'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.InputGroup,
	            null,
	            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_gte, onChange: this.onChangeEffortGte }),
	            _react2.default.createElement(
	              _reactBootstrap.InputGroup.Addon,
	              null,
	              '-'
	            ),
	            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_lte, onChange: this.onChangeEffortLte })
	          )
	        )
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { xs: 6, sm: 4, md: 3, lg: 2 },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.ControlLabel,
	            null,
	            '\xA0'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.ButtonToolbar,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { bsStyle: 'primary', onClick: this.applyFilter },
	              'Apply'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { onClick: this.resetFilter, disabled: !this.state.changed },
	              'Reset'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { onClick: this.clearFilter },
	              'Clear'
	            )
	          )
	        )
	      )
	    );
	  }
	}
	
	exports.default = DeviceFilter;
	DeviceFilter.propTypes = {
	  setFilter: _react2.default.PropTypes.func.isRequired,
	  initFilter: _react2.default.PropTypes.object.isRequired
	};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _reactRouterBootstrap = __webpack_require__(24);
	
	var _NumInput = __webpack_require__(32);
	
	var _NumInput2 = _interopRequireDefault(_NumInput);
	
	var _DateInput = __webpack_require__(33);
	
	var _DateInput2 = _interopRequireDefault(_DateInput);
	
	var _Toast = __webpack_require__(30);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class DeviceEdit extends _react2.default.Component {
	  static dataFetcher(_ref) {
	    let params = _ref.params,
	        urlBase = _ref.urlBase;
	
	    return fetch(`${urlBase || ''}/api/devices/${params.id}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ DeviceEdit: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    let device;
	    if (context.initialState.DeviceEdit) {
	      device = context.initialState.DeviceEdit;
	      device.created = new Date(device.created);
	      device.completionDate = device.completionDate != null ? new Date(device.completionDate) : null;
	    } else {
	      device = {
	        _id: '', title: '', status: '', owner: '', effort: null,
	        completionDate: null, created: null
	      };
	    }
	    this.state = {
	      device: device,
	      invalidFields: {}, showingValidation: false,
	      toastVisible: false, toastMessage: '', toastType: 'success'
	    };
	    this.dismissValidation = this.dismissValidation.bind(this);
	    this.showValidation = this.showValidation.bind(this);
	    this.showSuccess = this.showSuccess.bind(this);
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
	    this.onChange = this.onChange.bind(this);
	    this.onValidityChange = this.onValidityChange.bind(this);
	    this.onSubmit = this.onSubmit.bind(this);
	  }
	
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    if (prevProps.params.id !== this.props.params.id) {
	      this.loadData();
	    }
	  }
	
	  onChange(event, convertedValue) {
	    const device = Object.assign({}, this.state.device);
	    const value = convertedValue !== undefined ? convertedValue : event.target.value;
	    device[event.target.name] = value;
	    this.setState({ device: device });
	  }
	
	  onValidityChange(event, valid) {
	    const invalidFields = Object.assign({}, this.state.invalidFields);
	    if (!valid) {
	      invalidFields[event.target.name] = true;
	    } else {
	      delete invalidFields[event.target.name];
	    }
	    this.setState({ invalidFields: invalidFields });
	  }
	
	  onSubmit(event) {
	    event.preventDefault();
	    this.showValidation();
	
	    if (Object.keys(this.state.invalidFields).length !== 0) {
	      return;
	    }
	
	    fetch(`/api/devices/${this.props.params.id}`, {
	      method: 'PUT',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(this.state.device)
	    }).then(response => {
	      if (response.ok) {
	        response.json().then(updatedDevice => {
	          updatedDevice.created = new Date(updatedDevice.created);
	          if (updatedDevice.completionDate) {
	            updatedDevice.completionDate = new Date(updatedDevice.completionDate);
	          }
	          this.setState({ device: updatedDevice });
	          this.showSuccess('Updated device successfully.');
	        });
	      } else {
	        response.json().then(error => {
	          this.showError(`Failed to update device: ${error.message}`);
	        });
	      }
	    }).catch(err => {
	      this.showError(`Error in sending data to server: ${err.message}`);
	    });
	  }
	
	  loadData() {
	    DeviceEdit.dataFetcher({ params: this.props.params }).then(data => {
	      const device = data.DeviceEdit;
	      device.created = new Date(device.created);
	      device.completionDate = device.completionDate != null ? new Date(device.completionDate) : null;
	      this.setState({ device: device });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err.message}`);
	    });
	  }
	
	  showValidation() {
	    this.setState({ showingValidation: true });
	  }
	
	  dismissValidation() {
	    this.setState({ showingValidation: false });
	  }
	
	  showSuccess(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
	  }
	
	  showError(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	  }
	
	  dismissToast() {
	    this.setState({ toastVisible: false });
	  }
	
	  render() {
	    const device = this.state.device;
	    let validationMessage = null;
	    if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
	      validationMessage = _react2.default.createElement(
	        _reactBootstrap.Alert,
	        { bsStyle: 'danger', onDismiss: this.dismissValidation },
	        'Please correct invalid fields before submitting.'
	      );
	    }
	    return _react2.default.createElement(
	      _reactBootstrap.Panel,
	      { header: 'Edit Device' },
	      _react2.default.createElement(
	        _reactBootstrap.Form,
	        { horizontal: true, onSubmit: this.onSubmit },
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'ID'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(
	              _reactBootstrap.FormControl.Static,
	              null,
	              device._id
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Created'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(
	              _reactBootstrap.FormControl.Static,
	              null,
	              device.created ? device.created.toDateString() : ''
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Status'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(
	              _reactBootstrap.FormControl,
	              {
	                componentClass: 'select', name: 'status', value: device.status,
	                onChange: this.onChange
	              },
	              _react2.default.createElement(
	                'option',
	                { value: 'New' },
	                'New'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Open' },
	                'Open'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Assigned' },
	                'Assigned'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Fixed' },
	                'Fixed'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Verified' },
	                'Verified'
	              ),
	              _react2.default.createElement(
	                'option',
	                { value: 'Closed' },
	                'Closed'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Owner'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner', value: device.owner, onChange: this.onChange })
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Effort'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, {
	              componentClass: _NumInput2.default, name: 'effort',
	              value: device.effort, onChange: this.onChange
	            })
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          { validationState: this.state.invalidFields.completionDate ? 'error' : null },
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Completion Date'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, {
	              componentClass: _DateInput2.default, name: 'completionDate',
	              value: device.completionDate, onChange: this.onChange,
	              onValidityChange: this.onValidityChange
	            }),
	            _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Title'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'title', value: device.title, onChange: this.onChange })
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
	                'Submit'
	              ),
	              _react2.default.createElement(
	                _reactRouterBootstrap.LinkContainer,
	                { to: '/devices' },
	                _react2.default.createElement(
	                  _reactBootstrap.Button,
	                  { bsStyle: 'link' },
	                  'Back'
	                )
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { smOffset: 3, sm: 9 },
	            validationMessage
	          )
	        )
	      ),
	      _react2.default.createElement(_Toast2.default, {
	        showing: this.state.toastVisible, message: this.state.toastMessage,
	        onDismiss: this.dismissToast, bsStyle: this.state.toastType
	      })
	    );
	  }
	}
	
	exports.default = DeviceEdit;
	DeviceEdit.propTypes = {
	  params: _react2.default.PropTypes.object.isRequired
	};
	
	DeviceEdit.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	//import 'isomorphic-fetch';
	
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _fileUpload = __webpack_require__(43);
	
	var _fileUpload2 = _interopRequireDefault(_fileUpload);
	
	var _fileDownload = __webpack_require__(44);
	
	var _fileDownload2 = _interopRequireDefault(_fileDownload);
	
	var _edit = __webpack_require__(45);
	
	var _edit2 = _interopRequireDefault(_edit);
	
	var _close = __webpack_require__(46);
	
	var _close2 = _interopRequireDefault(_close);
	
	var _Toast = __webpack_require__(30);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	var _AddController = __webpack_require__(47);
	
	var _AddController2 = _interopRequireDefault(_AddController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//import Joystick from './Joystick.jsx';
	
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	
	const DeviceRow = props => {
	  return _react2.default.createElement(
	    'option',
	    { value: props.device.device_number },
	    props.device.name
	  );
	};
	
	DeviceRow.propTypes = {
	  device: _react2.default.PropTypes.object.isRequired
	};
	
	function DeviceTable(props) {
	  const deviceRows = props.devices.map(device => _react2.default.createElement(DeviceRow, { key: device._id, device: device }));
	  return _react2.default.createElement(
	    _reactBootstrap.FormControl,
	    { componentClass: 'select',
	      onChange: props.onDeviceSelect },
	    deviceRows
	  );
	}
	
	DeviceTable.propTypes = {
	  devices: _react2.default.PropTypes.array.isRequired,
	  onDeviceSelect: _react2.default.PropTypes.func.isRequired
	};
	
	class NewControllers extends _react2.default.Component {
	
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        location = _ref.location;
	
	    return fetch(`${urlBase || ''}/api/devices${location.search}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ NewControllers: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const devices = context.initialState.NewControllers ? context.initialState.NewControllers.records : [];
	    this.state = {
	      devices: devices,
	      toastVisible: false,
	      toastMessage: '',
	      toastType: 'success',
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      buttonCounter: 0,
	      sliderCounter: 0,
	      xyCounter: 0,
	      lock: true
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
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
	  }
	  componentDidMount() {
	    this.loadData();
	  }
	
	  componentDidUpdate(prevProps) {
	    const oldQuery = prevProps.location.query;
	    const newQuery = this.props.location.query;
	    if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte) {
	      return;
	    }
	    this.loadData();
	  }
	  showError(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	  }
	
	  dismissToast() {
	    this.setState({ toastVisible: false });
	  }
	
	  loadData() {
	    NewControllers.dataFetcher({ location: this.props.location }).then(data => {
	      const devices = data.NewControllers.records;
	      devices.forEach(device => {
	        device.created = new Date(device.created);
	        if (device.completionDate) {
	          device.completionDate = new Date(device.completionDate);
	        }
	      });
	      this.setState({ devices: devices });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  handleSliderChange(event) {
	    //not updating correct object
	    this.setState({ sliderValue: event.target.value });
	    console.log(event.target.id + ': ' + this.state.sliderValue);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  handleOnDownload() {
	    console.log("download file with data to be loaded again later ");
	  }
	  handleOnUpload() {
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
	      right: "2px",
	      bottom: 0,
	      cursor: "pointer"
	    };
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#EEE"
	    };
	    const i = el.add ? "+" : el.i;
	    let typeCode = _react2.default.createElement(
	      'button',
	      null,
	      i
	    );
	    if (el.type == 1) {
	      //type is slider
	      typeCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          i
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliderChange })
	        )
	      );
	    } else if (el.type == 2) {
	      //type is xy area
	      typeCode = _react2.default.createElement(
	        'div',
	        null,
	        'xy joystick here'
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      typeCode,
	      _react2.default.createElement(
	        'span',
	        { style: lockStyle },
	        _react2.default.createElement(
	          'span',
	          { className: 'edit',
	            onClick: this.onEditItem.bind(this, i) },
	          _react2.default.createElement(_edit2.default, null)
	        ),
	        _react2.default.createElement(
	          'span',
	          { className: 'remove',
	            onClick: this.onRemoveItem.bind(this, i) },
	          _react2.default.createElement(_close2.default, null)
	        )
	      )
	    );
	  }
	
	  onAddButton() {
	
	    console.log("adding ", "button " + this.state.buttonCounter);
	    this.setState({
	      items: this.state.items.concat({
	        type: 0,
	        i: "button-" + this.state.buttonCounter,
	        x: this.state.items.length * 2 % (this.state.cols || 12),
	        y: Infinity,
	        w: 2,
	        h: 2
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
	        x: this.state.items.length * 2 % (this.state.cols || 12),
	        y: Infinity,
	        w: 2,
	        h: 2
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
	        x: this.state.items.length * 2 % (this.state.cols || 12),
	        y: Infinity,
	        w: 2,
	        h: 2
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
	    this.setState({ items: _lodash2.default.reject(this.state.items, { i: i }) });
	  }
	  onEditItem(i) {
	    console.log("edit item: " + i);
	  }
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'goobydooby',
	      _react2.default.createElement(
	        _reactBootstrap.Row,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { xs: 6, sm: 3, md: 2, lg: 1 },
	          _react2.default.createElement(_AddController2.default, null),
	          _react2.default.createElement(DeviceTable, { devices: this.state.devices, onDeviceSelect: this.onAddButton }),
	          _react2.default.createElement(_Toast2.default, {
	            showing: this.state.toastVisible, message: this.state.toastMessage,
	            onDismiss: this.dismissToast, bsStyle: this.state.toastType
	          })
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { xs: 6, sm: 3, md: 2, lg: 1 },
	          _react2.default.createElement(
	            'button',
	            { onClick: this.onAddSlider },
	            'Add Slider'
	          ),
	          _react2.default.createElement(
	            'button',
	            { onClick: this.onAddXY },
	            'Add X/Y Area'
	          )
	        ),
	        _react2.default.createElement(_reactBootstrap.Col, { xs: 6, sm: 3, md: 2, lg: 1 }),
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { xs: 6, sm: 3, md: 2, lg: 1 },
	          _react2.default.createElement(
	            'button',
	            { className: 'pull-right', onClick: this.handleOnLock },
	            lockIcon
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'pull-right', onClick: this.handleOnDownload },
	            _react2.default.createElement(_fileDownload2.default, null)
	          ),
	          _react2.default.createElement(
	            'button',
	            { className: 'pull-right', onClick: this.handleOnUpload },
	            _react2.default.createElement(_fileUpload2.default, null)
	          )
	        )
	      ),
	      _react2.default.createElement(
	        ResponsiveReactGridLayout,
	        _extends({
	          onBreakpointChange: this.onBreakpointChange,
	          onLayoutChange: this.onLayoutChange,
	          isDraggable: !this.state.lock,
	          isResizable: !this.state.lock
	        }, this.props),
	        _lodash2.default.map(this.state.items, el => this.createElement(el))
	      )
	    );
	  }
	}
	exports.default = NewControllers;
	NewControllers.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};
	NewControllers.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	NewControllers.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	module.exports = require("react-grid-layout");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	module.exports = require("react-dom");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	module.exports = require("lodash");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/fa/lock");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/fa/unlock");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/md/file-upload");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/md/file-download");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/md/edit");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = require("react-icons/lib/md/close");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(19);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _Toast = __webpack_require__(30);
	
	var _Toast2 = _interopRequireDefault(_Toast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class AddController extends _react2.default.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      showing: false,
	      toastVisible: false, toastMessage: '', toastType: 'success'
	    };
	    this.showModal = this.showModal.bind(this);
	    this.hideModal = this.hideModal.bind(this);
	    this.submit = this.submit.bind(this);
	    this.showError = this.showError.bind(this);
	    this.dismissToast = this.dismissToast.bind(this);
	  }
	
	  showModal() {
	    this.setState({ showing: true });
	  }
	
	  hideModal() {
	    this.setState({ showing: false });
	  }
	
	  showError(message) {
	    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
	  }
	
	  dismissToast() {
	    this.setState({ toastVisible: false });
	  }
	
	  submit(e) {
	    e.preventDefault();
	    this.hideModal();
	    const form = document.forms.issueAdd;
	    const newIssue = {
	      owner: form.owner.value, title: form.title.value,
	      status: 'New', created: new Date()
	    };
	    fetch('/api/issues', {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(newIssue)
	    }).then(response => {
	      if (response.ok) {
	        response.json().then(updatedIssue => {
	          this.props.router.push(`/issues/${updatedIssue._id}`);
	        });
	      } else {
	        response.json().then(error => {
	          this.showError(`Failed to add issue: ${error.message}`);
	        });
	      }
	    }).catch(err => {
	      this.showError(`Error in sending data to server: ${err.message}`);
	    });
	  }
	
	  render() {
	    return _react2.default.createElement(
	      'span',
	      { onClick: this.showModal },
	      _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' }),
	      ' Add Controller',
	      _react2.default.createElement(
	        _reactBootstrap.Modal,
	        { keyboard: true, show: this.state.showing, onHide: this.hideModal },
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Header,
	          { closeButton: true },
	          _react2.default.createElement(
	            _reactBootstrap.Modal.Title,
	            null,
	            'Add Controller'
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Body,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Form,
	            { name: 'issueAdd' },
	            _react2.default.createElement(
	              _reactBootstrap.FormGroup,
	              null,
	              _react2.default.createElement(
	                _reactBootstrap.ControlLabel,
	                null,
	                'Label'
	              ),
	              _react2.default.createElement(_reactBootstrap.FormControl, { name: 'title', autoFocus: true })
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.FormGroup,
	              null,
	              _react2.default.createElement(
	                _reactBootstrap.ControlLabel,
	                null,
	                'Type'
	              ),
	              _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner' })
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Modal.Footer,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.ButtonToolbar,
	            null,
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { type: 'button', bsStyle: 'primary', onClick: this.submit },
	              'Submit'
	            ),
	            _react2.default.createElement(
	              _reactBootstrap.Button,
	              { bsStyle: 'link', onClick: this.hideModal },
	              'Cancel'
	            )
	          )
	        )
	      ),
	      _react2.default.createElement(_Toast2.default, {
	        showing: this.state.toastVisible, message: this.state.toastMessage,
	        onDismiss: this.dismissToast, bsStyle: this.state.toastType
	      })
	    );
	  }
	}
	
	AddController.propTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRouter.withRouter)(AddController);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _DeviceMenu = __webpack_require__(49);
	
	var _DeviceMenu2 = _interopRequireDefault(_DeviceMenu);
	
	var _ParametersMenu = __webpack_require__(51);
	
	var _ParametersMenu2 = _interopRequireDefault(_ParametersMenu);
	
	var _ParameterInput = __webpack_require__(52);
	
	var _ParameterInput2 = _interopRequireDefault(_ParameterInput);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class ControlInterface extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	  }
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_DeviceMenu2.default, { location: this.props.location }),
	      _react2.default.createElement(_ParametersMenu2.default, { location: this.props.location }),
	      _react2.default.createElement(_ParameterInput2.default, null)
	    );
	  }
	}
	exports.default = ControlInterface;
	ControlInterface.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	ControlInterface.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _socket = __webpack_require__(50);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let socket;
	
	class DeviceMenu extends _react2.default.Component {
	
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        location = _ref.location;
	
	    return fetch(`${urlBase || ''}/api/devices${location.search}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ DeviceMenu: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const devices = context.initialState.DeviceMenu ? context.initialState.DeviceMenu.records : [];
	    this.state = {
	      devices: devices
	    };
	    this.deviceOptions = [_react2.default.createElement(
	      'option',
	      { key: '0', value: '0' },
	      'Select a Device'
	    )];
	    this.onDeviceSelect = this.onDeviceSelect.bind(this);
	  }
	  componentDidMount() {
	    this.loadData();
	    socket = (0, _socket2.default)();
	    socket.on(this.props.location.pathname, mesg => {
	      this.setState({ text: mesg });
	    });
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  loadData() {
	    DeviceMenu.dataFetcher({ location: this.props.location }).then(data => {
	      const devices = data.DeviceMenu.records;
	      devices.forEach(device => {
	        this.deviceOptions.push(_react2.default.createElement(
	          'option',
	          { key: device._id, value: device.device_number },
	          device.name
	        ));
	      });
	      this.setState({ devices: devices });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  onDeviceSelect(event) {
	    console.log("device #" + event.target.value);
	    socket.emit('device-menu', event.target.value);
	  }
	  render() {
	    return _react2.default.createElement(
	      _reactBootstrap.FormGroup,
	      null,
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	        'Device'
	      ),
	      _react2.default.createElement(
	        _reactBootstrap.Col,
	        { sm: 9 },
	        _react2.default.createElement(
	          _reactBootstrap.FormControl,
	          { componentClass: 'select', onChange: this.onDeviceSelect },
	          this.deviceOptions
	        )
	      )
	    );
	  }
	}
	exports.default = DeviceMenu;
	DeviceMenu.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	DeviceMenu.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	module.exports = require("socket.io-client");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _socket = __webpack_require__(50);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let socket;
	
	class ParametersMenu extends _react2.default.Component {
	
	  static dataFetcher(_ref) {
	    let urlBase = _ref.urlBase,
	        location = _ref.location;
	
	    return fetch(`${urlBase || ''}/api/device_1_casparcg${location.search}`).then(response => {
	      if (!response.ok) return response.json().then(error => Promise.reject(error));
	      return response.json().then(data => ({ ParametersMenu: data }));
	    });
	  }
	
	  constructor(props, context) {
	    super(props, context);
	    const parameters = context.initialState.ParametersMenu ? context.initialState.ParametersMenu.records : [];
	    this.state = {
	      parameters: parameters,
	      showing: false
	    };
	    this.showParameters = this.showParameters.bind(this);
	    this.hideParameters = this.hideParameters.bind(this);
	    this.parameterOptions = [_react2.default.createElement(
	      'option',
	      { key: '0', value: 'play 1-0 amb.mp4' },
	      'Select a Parameter'
	    )];
	    this.onParameterSelect = this.onParameterSelect.bind(this);
	  }
	  showParameters() {
	    this.setState({ showing: true });
	  }
	  hideParameters() {
	    this.setState({ showing: false });
	  }
	  componentDidMount() {
	    this.loadData();
	    socket = (0, _socket2.default)();
	    socket.on(this.props.location.pathname, mesg => {
	      this.setState({ text: mesg });
	    });
	    socket.on("show-parameters", mesg => {
	      console.log("show params " + mesg);
	      this.setState({ showing: true });
	    });
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  loadData() {
	    ParametersMenu.dataFetcher({ location: this.props.location }).then(data => {
	      const parameters = data.ParametersMenu.records;
	      parameters.forEach(parameter => {
	        this.parameterOptions.push(_react2.default.createElement(
	          'option',
	          { key: parameter.notes, value: parameter.notes },
	          parameter.command
	        ));
	      });
	      this.setState({ parameters: parameters });
	    }).catch(err => {
	      this.showError(`Error in fetching data from server: ${err}`);
	    });
	  }
	
	  onParameterSelect(event) {
	    console.log("parameter #" + event.target.value);
	    socket.emit('parameter-menu', event.target.value);
	  }
	
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      this.state.showing ? _react2.default.createElement(
	        _reactBootstrap.FormGroup,
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	          'Parameter'
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.Col,
	          { sm: 9 },
	          _react2.default.createElement(
	            _reactBootstrap.FormControl,
	            { componentClass: 'select', onChange: this.onParameterSelect },
	            this.parameterOptions
	          )
	        )
	      ) : null
	    );
	  }
	}
	exports.default = ParametersMenu;
	ParametersMenu.propTypes = {
	  location: _react2.default.PropTypes.object.isRequired,
	  router: _react2.default.PropTypes.object
	};
	
	ParametersMenu.contextTypes = {
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let socket;
	
	class ParameterInput extends _react2.default.Component {
	
	  constructor(props) {
	    super(props);
	    this.state = {
	      text: '',
	      host: '127.0.0.1',
	      port: 5250,
	      command: "",
	      response: '',
	      showing: false
	    };
	    this.showParameterInputs = this.showParameterInputs.bind(this);
	    this.hideParameterInputs = this.hideParameterInputs.bind(this);
	    this.onHostChange = this.onHostChange.bind(this);
	    this.onPortChange = this.onPortChange.bind(this);
	    this.onCommandChange = this.onCommandChange.bind(this);
	    this.sendCommand = this.sendCommand.bind(this);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('show-parameter-inputs', mesg => {
	      this.setState({ showing: true });
	    });
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  showParameterInputs() {
	    this.setState({ showing: true });
	  }
	  hideParameterInputs() {
	    this.setState({ showing: false });
	  }
	  onPortChange(event) {
	    this.setState({ port: event.target.value });
	  }
	  onHostChange(event) {
	    this.setState({ host: event.target.value });
	  }
	  onCommandChange(event) {
	    this.setState({ command: event.target.value });
	  }
	  sendCommand() {
	    console.log("sending Telnet command");
	    socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: this.state.command });
	  }
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      this.state.showing ? _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Host'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'host', value: this.state.host, onChange: this.onHostChange })
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Port'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'port', value: this.state.port, onChange: this.onPortChange })
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
	            'Telnet Command'
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { sm: 9 },
	            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'command', value: this.state.command, onChange: this.onCommandChange })
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
	                { onClick: this.sendCommand },
	                'Send Telnet Command'
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _reactBootstrap.FormGroup,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { smOffset: 3, sm: 6 },
	            this.state.response
	          )
	        )
	      ) : null
	    );
	  }
	}
	exports.default = ParameterInput;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	module.exports = require("socket.io-react");

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	let socket;
	
	class Demo extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      lock: true,
	      host: '127.0.0.1',
	      port: 5250,
	      command: "",
	      response: ''
	    };
	    this.onBreakpointChange = this.onBreakpointChange.bind(this);
	    this.handleOnLock = this.handleOnLock.bind(this);
	    this.handleButtons = this.handleButtons.bind(this);
	    this.handleSliders = this.handleSliders.bind(this);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  createElement(el) {
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#FFF"
	    };
	    const i = el.add ? "+" : el.i;
	    let controllerCode = _react2.default.createElement(
	      'button',
	      { className: el.className, value: el.i, onClick: this.handleButtons },
	      el.text
	    );
	    if (el.type == 1) {
	      //type is slider
	      controllerCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          el.text
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliders })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      controllerCode,
	      _react2.default.createElement('span', { style: lockStyle })
	    );
	  }
	
	  handleButtons(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	
	    switch (event.target.value) {
	      case 'vid_red':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #FF0000' });
	        break;
	      case 'vid_white':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #FFFFFF' });
	        break;
	      case 'vid_green':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #00FF00' });
	        break;
	      case 'vid_blue':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #0000FF' });
	        break;
	      case 'vid_play1':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 aaa.mp4' });
	        break;
	      case 'vid_play2':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-1 bbb.mp4 10 LEFT' });
	        break;
	      case 'vid_play3':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 ccc.mp4 PUSH 20 EASEINSINE' });
	        break;
	      case 'vid_play4':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: '"PLAY 1-0 test_scroll SPEED 5 BLUR 50' });
	        break;
	      case 'vid_play5':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 ddd.mp4' });
	        break;
	      case 'vid_play6':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 MOVIE SEEK 100 LOOP' });
	        break;
	      case 'vid_play7':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 aaa.mp4' });
	        break;
	      case 'vid_play8':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 aaa.mp4' });
	        break;
	      case 'vid_loop1':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop2':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop3':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop4':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'spot_on':
	        socket.emit('dmx-go', { 6: 216, 7: 255 });
	        break;
	      case 'spot_off':
	        socket.emit('dmx-go', { 6: 0, 7: 0 });
	        break;
	      case 'spot_white':
	        socket.emit('dmx-go', { 5: 0, 6: 216, 7: 255 });
	        break;
	      case 'spot_red':
	        socket.emit('dmx-go', { 5: 24, 6: 216, 7: 255 });
	        break;
	      case 'spot_green':
	        socket.emit('dmx-go', { 5: 18, 6: 216, 7: 255 });
	        break;
	      case 'spot_blue':
	        socket.emit('dmx-go', { 5: 42, 6: 216, 7: 255 });
	        break;
	      case 'wash_on':
	        socket.emit('dmx-go', { 16: 255 });
	        break;
	      case 'wash_off':
	        socket.emit('dmx-go', { 16: 0 });
	        break;
	      case 'wash_white':
	        socket.emit('dmx-go', { 17: 0, 18: 0, 19: 0, 20: 255 });
	        break;
	      case 'wash_red':
	        socket.emit('dmx-go', { 17: 255, 18: 0, 19: 0, 20: 0 });
	        break;
	      case 'wash_green':
	        socket.emit('dmx-go', { 17: 0, 18: 255, 19: 0, 20: 0 });
	        break;
	      case 'wash_blue':
	        socket.emit('dmx-go', { 17: 0, 18: 0, 19: 255, 20: 0 });
	        break;
	      case 'wash_yellow':
	        socket.emit('dmx-go', { 17: 255, 18: 255, 19: 0, 20: 0 });
	        break;
	      case 'dmx_on':
	        socket.emit('dmx-all', 255);
	        break;
	      case 'dmx_off':
	        socket.emit('dmx-all', 0);
	        break;
	
	      default:
	        console.log('ERROR: Button does not exist');
	    }
	  }
	  handleSliders(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	    let slider_value = event.target.value / 100.0 * 255.0;
	    switch (event.target.id) {
	      case 'spot_pan':
	        console.log("in spot_pan " + slider_value);
	        socket.emit('dmx-go', { 0: slider_value, 2: slider_value });
	        break;
	      case 'spot_tilt':
	        console.log("in spot_tilt " + slider_value);
	        socket.emit('dmx-go', { 1: slider_value });
	        break;
	      case 'spot_intensity':
	        socket.emit('dmx-go', { 7: slider_value });
	        break;
	      case 'wash_intensity':
	        socket.emit('dmx-go', { 16: slider_value });
	        break;
	      case 'wash_pan':
	        socket.emit('dmx-go', { 22: slider_value });
	        break;
	      case 'wash_tilt':
	        socket.emit('dmx-go', { 23: slider_value });
	        break;
	      case 'wash_zoom':
	        socket.emit('dmx-go', { 27: slider_value });
	        break;
	
	      default:
	        console.log('ERROR: Slider does not exist');
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Row,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 6, sm: 3, md: 2, lg: 1 },
	            _react2.default.createElement(
	              'button',
	              { onClick: this.handleOnLock },
	              lockIcon
	            )
	          )
	        ),
	        _react2.default.createElement(
	          ResponsiveReactGridLayout,
	          _extends({
	            onBreakpointChange: this.onBreakpointChange,
	            onLayoutChange: this.onLayoutChange,
	            isDraggable: !this.state.lock,
	            isResizable: !this.state.lock
	          }, this.props),
	          _lodash2.default.map(this.state.items, el => this.createElement(el))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.response
	      )
	    );
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	    this.setState({
	      items: [{
	        type: 0,
	        i: "spot_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Spot On'
	      }, {
	        type: 0,
	        i: "spot_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Spot Off'
	      }, {
	        type: 1,
	        i: "spot_intensity",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Intensity'
	      }, {
	        type: 1,
	        i: "spot_tilt",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Tilt'
	      }, {
	        type: 1,
	        i: "spot_pan",
	        x: 5, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Pan'
	      }, {
	        type: 0,
	        i: "spot_white",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Spot White'
	      }, {
	        type: 0,
	        i: "spot_red",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Spot Red'
	      }, {
	        type: 0,
	        i: "spot_green",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Spot Green'
	      }, {
	        type: 0,
	        i: "spot_blue",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Spot Blue'
	      }, {
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 2,
	        h: 1
	      }, {
	        type: 0,
	        i: "dmx_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'DMX ALL ON'
	      }, {
	        type: 0,
	        i: "dmx_off",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'DMX ALL OFF'
	      }, {
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 5,
	        h: 1
	      }, {
	        type: 0,
	        i: "wash_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Wash On'
	      }, {
	        type: 0,
	        i: "wash_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 5, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Wash Off'
	      }, {
	        type: 1,
	        i: "wash_intensity",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Intensity'
	      }, {
	        type: 1,
	        i: "wash_pan",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Pan'
	      }, {
	        type: 1,
	        i: "wash_tilt",
	        x: 5, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, // Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Tilt'
	      }, {
	        type: 1,
	        i: "wash_zoom",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Zoom'
	      }, {
	        type: 0,
	        i: "wash_white",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Wash White'
	      }, {
	        type: 0,
	        i: "wash_red",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Wash Red'
	      }, {
	        type: 0,
	        i: "wash_green",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Wash Green'
	      }, {
	        type: 0,
	        i: "wash_blue",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Wash Blue'
	      }, {
	        type: 0,
	        i: "wash_yellow",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'Wash Yellow'
	      }, {
	        x: 5, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity, 
	        w: 2,
	        h: 1
	      }, {
	        type: 0,
	        i: "vid_play1",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play1'
	      }, {
	        type: 0,
	        i: "vid_play2",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play2'
	      }, {
	        type: 0,
	        i: "vid_play3",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play3'
	      }, {
	        type: 0,
	        i: "vid_play4",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 11, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play4'
	      }, {
	        type: 0,
	        i: "vid_play5",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play5'
	      }, {
	        type: 0,
	        i: "vid_play6",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play6'
	      }, {
	        type: 0,
	        i: "vid_play7",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play7'
	      }, {
	        type: 0,
	        i: "vid_play8",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 11, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play8'
	      }, {
	        type: 0,
	        i: "vid_loop1",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop1'
	      }, {
	        type: 0,
	        i: "vid_loop2",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop2'
	      }, {
	        type: 0,
	        i: "vid_loop3",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop3'
	      }, {
	        type: 0,
	        i: "vid_loop4",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 11, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop4'
	      }, {
	        type: 0,
	        i: "vid_white",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Vid White'
	      }, {
	        type: 0,
	        i: "vid_red",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Vid Red'
	      }, {
	        type: 0,
	        i: "vid_green",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Vid Green'
	      }, {
	        type: 0,
	        i: "vid_blue",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 11, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Vid Blue'
	      }]
	    });
	  }
	}
	exports.default = Demo;
	Demo.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	let socket;
	
	class Caspar extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      lock: true,
	      host: '127.0.0.1',
	      port: 5250,
	      command: "",
	      response: ''
	    };
	    this.onBreakpointChange = this.onBreakpointChange.bind(this);
	    this.handleOnLock = this.handleOnLock.bind(this);
	    this.handleButtons = this.handleButtons.bind(this);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  createElement(el) {
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#FFF"
	    };
	    const i = el.add ? "+" : el.i;
	    let controllerCode = _react2.default.createElement(
	      'button',
	      { className: el.className, value: el.i, onClick: this.handleButtons },
	      el.text
	    );
	    if (el.type == 1) {
	      //type is slider
	      controllerCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          el.text
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliders })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      controllerCode,
	      _react2.default.createElement('span', { style: lockStyle })
	    );
	  }
	
	  handleButtons(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	
	    switch (event.target.value) {
	      case 'vid_red':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #FF0000' });
	        break;
	      case 'vid_white':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #FFFFFF' });
	        break;
	      case 'vid_green':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #00FF00' });
	        break;
	      case 'vid_blue':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 #0000FF' });
	        break;
	      case 'vid_play1':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 aaa.mp4' });
	        break;
	      case 'vid_play2':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-1 bbb.mp4 10 LEFT' });
	        break;
	      case 'vid_play3':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 ccc.mp4 PUSH 20 EASEINSINE' });
	        break;
	      case 'vid_play4':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: '"PLAY 1-0 test_scroll SPEED 5 BLUR 50' });
	        break;
	      case 'vid_play5':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 ddd.mp4' });
	        break;
	      case 'vid_play6':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 MOVIE SEEK 100 LOOP' });
	        break;
	      case 'vid_play7':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 aaa.mp4' });
	        break;
	      case 'vid_play8':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 1-0 aaa.mp4' });
	        break;
	      case 'vid_loop1':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop2':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop3':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop4':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 1-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_stop':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'STOP 1-0' });
	        break;
	
	      default:
	        console.log('ERROR: Button does not exist');
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Row,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 2, sm: 2, md: 2, lg: 2 },
	            _react2.default.createElement(
	              'button',
	              { onClick: this.handleOnLock },
	              lockIcon
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 10, sm: 10, md: 10, lg: 10 },
	            _react2.default.createElement(
	              'strong',
	              null,
	              'Group 1: VIDEO'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          ResponsiveReactGridLayout,
	          _extends({
	            onBreakpointChange: this.onBreakpointChange,
	            onLayoutChange: this.onLayoutChange,
	            isDraggable: !this.state.lock,
	            isResizable: !this.state.lock
	          }, this.props),
	          _lodash2.default.map(this.state.items, el => this.createElement(el))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.response
	      )
	    );
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	    this.setState({
	      items: [{
	        type: 0,
	        i: "vid_play1",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play1'
	      }, {
	        type: 0,
	        i: "vid_play2",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play2'
	      }, {
	        type: 0,
	        i: "vid_play3",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play3'
	      }, {
	        type: 0,
	        i: "vid_play4",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play4'
	      }, {
	        type: 0,
	        i: "vid_play5",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play5'
	      }, {
	        type: 0,
	        i: "vid_play6",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play6'
	      }, {
	        type: 0,
	        i: "vid_play7",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play7'
	      }, {
	        type: 0,
	        i: "vid_play8",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play8'
	      }, {
	        type: 0,
	        i: "vid_loop1",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop1'
	      }, {
	        type: 0,
	        i: "vid_loop2",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop2'
	      }, {
	        type: 0,
	        i: "vid_loop3",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop3'
	      }, {
	        type: 0,
	        i: "vid_loop4",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop4'
	      }, {
	        type: 0,
	        i: "vid_white",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Vid White'
	      }, {
	        type: 0,
	        i: "vid_red",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Vid Red'
	      }, {
	        type: 0,
	        i: "vid_green",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Vid Green'
	      }, {
	        type: 0,
	        i: "vid_blue",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Vid Blue'
	      }, {
	        type: 0,
	        i: "vid_stop",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Vid Stop'
	      }]
	    });
	  }
	}
	exports.default = Caspar;
	Caspar.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	let socket;
	
	class CasparGroup2 extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      lock: true,
	      host: '127.0.0.1',
	      port: 5250,
	      command: "",
	      response: ''
	    };
	    this.onBreakpointChange = this.onBreakpointChange.bind(this);
	    this.handleOnLock = this.handleOnLock.bind(this);
	    this.handleButtons = this.handleButtons.bind(this);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  createElement(el) {
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#FFF"
	    };
	    const i = el.add ? "+" : el.i;
	    let controllerCode = _react2.default.createElement(
	      'button',
	      { className: el.className, value: el.i, onClick: this.handleButtons },
	      el.text
	    );
	    if (el.type == 1) {
	      //type is slider
	      controllerCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          el.text
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliders })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      controllerCode,
	      _react2.default.createElement('span', { style: lockStyle })
	    );
	  }
	
	  handleButtons(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	
	    switch (event.target.value) {
	      case 'vid_red':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 #FF0000' });
	        break;
	      case 'vid_white':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 #FFFFFF' });
	        break;
	      case 'vid_green':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 #00FF00' });
	        break;
	      case 'vid_blue':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 #0000FF' });
	        break;
	      case 'vid_play1':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 aaa.mp4' });
	        break;
	      case 'vid_play2':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 2-1 bbb.mp4 10 LEFT' });
	        break;
	      case 'vid_play3':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 ccc.mp4 PUSH 20 EASEINSINE' });
	        break;
	      case 'vid_play4':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: '"PLAY 2-0 test_scroll SPEED 5 BLUR 50' });
	        break;
	      case 'vid_play5':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 ddd.mp4' });
	        break;
	      case 'vid_play6':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 2-0 MOVIE SEEK 100 LOOP' });
	        break;
	      case 'vid_play7':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 aaa.mp4' });
	        break;
	      case 'vid_play8':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'play 2-0 aaa.mp4' });
	        break;
	      case 'vid_loop1':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 2-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop2':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 2-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop3':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 2-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_loop4':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'PLAY 2-0 aaa.mp4 LOOP' });
	        break;
	      case 'vid_stop':
	        socket.emit('control-interface-send-telnet', { host: this.state.host, port: this.state.port, command: 'STOP 2-0' });
	        break;
	
	      default:
	        console.log('ERROR: Button does not exist');
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Row,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 2, sm: 2, md: 2, lg: 2 },
	            _react2.default.createElement(
	              'button',
	              { onClick: this.handleOnLock },
	              lockIcon
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 10, sm: 10, md: 10, lg: 10 },
	            _react2.default.createElement(
	              'strong',
	              null,
	              'Group 2: VIDEO'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          ResponsiveReactGridLayout,
	          _extends({
	            onBreakpointChange: this.onBreakpointChange,
	            onLayoutChange: this.onLayoutChange,
	            isDraggable: !this.state.lock,
	            isResizable: !this.state.lock
	          }, this.props),
	          _lodash2.default.map(this.state.items, el => this.createElement(el))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.response
	      )
	    );
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	    this.setState({
	      items: [{
	        type: 0,
	        i: "vid_play1",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play1'
	      }, {
	        type: 0,
	        i: "vid_play2",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play2'
	      }, {
	        type: 0,
	        i: "vid_play3",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play3'
	      }, {
	        type: 0,
	        i: "vid_play4",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play4'
	      }, {
	        type: 0,
	        i: "vid_play5",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play5'
	      }, {
	        type: 0,
	        i: "vid_play6",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play6'
	      }, {
	        type: 0,
	        i: "vid_play7",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play7'
	      }, {
	        type: 0,
	        i: "vid_play8",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Play8'
	      }, {
	        type: 0,
	        i: "vid_loop1",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop1'
	      }, {
	        type: 0,
	        i: "vid_loop2",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop2'
	      }, {
	        type: 0,
	        i: "vid_loop3",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop3'
	      }, {
	        type: 0,
	        i: "vid_loop4",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Vid Loop4'
	      }, {
	        type: 0,
	        i: "vid_white",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Vid White'
	      }, {
	        type: 0,
	        i: "vid_red",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Vid Red'
	      }, {
	        type: 0,
	        i: "vid_green",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Vid Green'
	      }, {
	        type: 0,
	        i: "vid_blue",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Vid Blue'
	      }, {
	        type: 0,
	        i: "vid_stop",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Vid Stop'
	      }]
	    });
	  }
	}
	exports.default = CasparGroup2;
	CasparGroup2.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	let socket;
	
	class Group1 extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      lock: true,
	      host: '127.0.0.1',
	      port: 5250,
	      command: "",
	      response: '',
	      compactType: null
	    };
	    this.onBreakpointChange = this.onBreakpointChange.bind(this);
	    this.handleOnLock = this.handleOnLock.bind(this);
	    this.handleButtons = this.handleButtons.bind(this);
	    this.handleSliders = this.handleSliders.bind(this);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  createElement(el) {
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#FFF"
	    };
	    const i = el.add ? "+" : el.i;
	    let controllerCode = _react2.default.createElement(
	      'button',
	      { className: el.className, value: el.i, onClick: this.handleButtons },
	      el.text
	    );
	    if (el.type == 1) {
	      //type is slider
	      controllerCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          el.text
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliders })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      controllerCode,
	      _react2.default.createElement('span', { style: lockStyle })
	    );
	  }
	
	  handleButtons(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	
	    switch (event.target.value) {
	
	      case 'spot_on':
	        socket.emit('dmx-go', { 6: 216, 7: 255 });
	        break;
	      case 'spot_off':
	        socket.emit('dmx-go', { 6: 0, 7: 0 });
	        break;
	      case 'spot_white':
	        socket.emit('dmx-go', { 5: 0, 6: 216, 7: 255 });
	        break;
	      case 'spot_yellow':
	        socket.emit('dmx-go', { 5: 6, 6: 216, 7: 255 });
	        break;
	      case 'spot_red':
	        socket.emit('dmx-go', { 5: 24, 6: 216, 7: 255 });
	        break;
	      case 'spot_green':
	        socket.emit('dmx-go', { 5: 18, 6: 216, 7: 255 });
	        break;
	      case 'spot_blue':
	        socket.emit('dmx-go', { 5: 42, 6: 216, 7: 255 });
	        break;
	      case 'wash_on':
	        socket.emit('dmx-go', { 16: 255 });
	        break;
	      case 'wash_off':
	        socket.emit('dmx-go', { 16: 0 });
	        break;
	      case 'wash_white':
	        socket.emit('dmx-go', { 17: 0, 18: 0, 19: 0, 20: 255 });
	        break;
	      case 'wash_red':
	        socket.emit('dmx-go', { 17: 255, 18: 0, 19: 0, 20: 0 });
	        break;
	      case 'wash_green':
	        socket.emit('dmx-go', { 17: 0, 18: 255, 19: 0, 20: 0 });
	        break;
	      case 'wash_blue':
	        socket.emit('dmx-go', { 17: 0, 18: 0, 19: 255, 20: 0 });
	        break;
	      case 'wash_yellow':
	        socket.emit('dmx-go', { 17: 255, 18: 255, 19: 0, 20: 0 });
	        break;
	      case 'dmx_off':
	        socket.emit('dmx-go', { 6: 0, 7: 0, 16: 0 });
	        break;
	
	      default:
	        console.log('ERROR: Button does not exist');
	    }
	  }
	  handleSliders(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	    let slider_value = event.target.value / 100.0 * 255.0;
	    switch (event.target.id) {
	      case 'spot_pan':
	        socket.emit('dmx-go', { 0: slider_value });
	        break;
	      case 'spot_tilt':
	        socket.emit('dmx-go', { 1: slider_value });
	        break;
	      case 'spot_speed':
	        socket.emit('dmx-go', { 4: slider_value });
	        break;
	      case 'spot_fine_pan':
	        socket.emit('dmx-go', { 2: slider_value });
	        break;
	      case 'spot_fine_tilt':
	        socket.emit('dmx-go', { 3: slider_value });
	        break;
	      case 'all_intensity':
	        socket.emit('dmx-go', { 6: 216, 7: slider_value, 16: slider_value });
	        break;
	      case 'spot_intensity':
	        socket.emit('dmx-go', { 7: slider_value });
	        break;
	      case 'wash_intensity':
	        socket.emit('dmx-go', { 16: slider_value });
	        break;
	      case 'wash_pan':
	        socket.emit('dmx-go', { 22: slider_value });
	        break;
	      case 'wash_tilt':
	        socket.emit('dmx-go', { 23: slider_value });
	        break;
	      case 'wash_fine_pan':
	        socket.emit('dmx-go', { 24: slider_value });
	        break;
	      case 'wash_fine_tilt':
	        socket.emit('dmx-go', { 25: slider_value });
	        break;
	      case 'wash_zoom':
	        socket.emit('dmx-go', { 27: slider_value });
	        break;
	
	      default:
	        console.log('ERROR: Slider does not exist');
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Row,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 2, sm: 2, md: 2, lg: 2 },
	            _react2.default.createElement(
	              'button',
	              { onClick: this.handleOnLock },
	              lockIcon
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 10, sm: 10, md: 10, lg: 10 },
	            _react2.default.createElement(
	              'strong',
	              null,
	              'Group 1: LIGHTS'
	            ),
	            ' DMX: 1 + 17'
	          )
	        ),
	        _react2.default.createElement(
	          ResponsiveReactGridLayout,
	          _extends({
	            onBreakpointChange: this.onBreakpointChange,
	            onLayoutChange: this.onLayoutChange,
	            isDraggable: !this.state.lock,
	            isResizable: !this.state.lock,
	            compactType: this.state.compactType
	          }, this.props),
	          _lodash2.default.map(this.state.items, el => this.createElement(el))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.response
	      )
	    );
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	    this.setState({
	      items: [{
	        type: 0,
	        i: "dmx_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 2,
	        h: 2,
	        className: 'btn-block btn btn-danger',
	        text: 'LIGHTS OUT'
	      }, {
	        type: 1,
	        i: "all_intensity",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 2,
	        h: 2,
	        text: 'Master Intensity'
	      }, {
	        type: 0,
	        i: "spot_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Spot On'
	      }, {
	        type: 0,
	        i: "spot_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Spot Off'
	      }, {
	        type: 1,
	        i: "spot_intensity",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Intensity'
	      }, {
	        type: 1,
	        i: "spot_tilt",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Tilt'
	      }, {
	        type: 1,
	        i: "spot_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Pan'
	      }, {
	        type: 1,
	        i: "spot_speed",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Speed'
	      }, {
	        type: 1,
	        i: "spot_fine_tilt",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Fine Tilt'
	      }, {
	        type: 1,
	        i: "spot_fine_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Fine Pan'
	      }, {
	        type: 0,
	        i: "spot_white",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Spot White'
	      }, {
	        type: 0,
	        i: "spot_red",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Spot Red'
	      }, {
	        type: 0,
	        i: "spot_green",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Spot Green'
	      }, {
	        type: 0,
	        i: "spot_blue",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Spot Blue'
	      }, {
	        type: 0,
	        i: "spot_yellow",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'Spot Yellow'
	      }, {
	        type: 0,
	        i: "wash_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Wash On'
	      }, {
	        type: 0,
	        i: "wash_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Wash Off'
	      }, {
	        type: 1,
	        i: "wash_intensity",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Intensity'
	      }, {
	        type: 1,
	        i: "wash_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Pan'
	      }, {
	        type: 1,
	        i: "wash_tilt",
	        x: 4, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, // Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Tilt'
	      }, {
	        type: 1,
	        i: "wash_fine_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 12, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Fine Pan'
	      }, {
	        type: 1,
	        i: "wash_fine_tilt",
	        x: 4, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 12, // Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Fine Tilt'
	      }, {
	        type: 1,
	        i: "wash_zoom",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 12, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Zoom'
	      }, {
	        type: 0,
	        i: "wash_white",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Wash White'
	      }, {
	        type: 0,
	        i: "wash_red",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Wash Red'
	      }, {
	        type: 0,
	        i: "wash_green",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Wash Green'
	      }, {
	        type: 0,
	        i: "wash_blue",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Wash Blue'
	      }, {
	        type: 0,
	        i: "wash_yellow",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'Wash Yellow'
	      }]
	    });
	  }
	}
	exports.default = Group1;
	Group1.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	let socket;
	
	class Group2 extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      lock: true,
	      host: '127.0.0.1',
	      port: 5250,
	      command: "",
	      response: '',
	      compactType: null
	    };
	    this.onBreakpointChange = this.onBreakpointChange.bind(this);
	    this.handleOnLock = this.handleOnLock.bind(this);
	    this.handleButtons = this.handleButtons.bind(this);
	    this.handleSliders = this.handleSliders.bind(this);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  createElement(el) {
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#FFF"
	    };
	    const i = el.add ? "+" : el.i;
	    let controllerCode = _react2.default.createElement(
	      'button',
	      { className: el.className, value: el.i, onClick: this.handleButtons },
	      el.text
	    );
	    if (el.type == 1) {
	      //type is slider
	      controllerCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          el.text
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliders })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      controllerCode,
	      _react2.default.createElement('span', { style: lockStyle })
	    );
	  }
	
	  handleButtons(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	
	    switch (event.target.value) {
	
	      case 'spot_on':
	        socket.emit('dmx-go', { 46: 216, 47: 255 });
	        break;
	      case 'spot_off':
	        socket.emit('dmx-go', { 46: 0, 47: 0 });
	        break;
	      case 'spot_white':
	        socket.emit('dmx-go', { 45: 0, 46: 216, 47: 255 });
	        break;
	      case 'spot_yellow':
	        socket.emit('dmx-go', { 45: 6, 46: 216, 47: 255 });
	        break;
	      case 'spot_red':
	        socket.emit('dmx-go', { 45: 24, 46: 216, 47: 255 });
	        break;
	      case 'spot_green':
	        socket.emit('dmx-go', { 45: 18, 46: 216, 47: 255 });
	        break;
	      case 'spot_blue':
	        socket.emit('dmx-go', { 45: 42, 46: 216, 47: 255 });
	        break;
	      case 'wash_on':
	        socket.emit('dmx-go', { 56: 255 });
	        break;
	      case 'wash_off':
	        socket.emit('dmx-go', { 56: 0 });
	        break;
	      case 'wash_white':
	        socket.emit('dmx-go', { 57: 0, 58: 0, 59: 0, 60: 255 });
	        break;
	      case 'wash_red':
	        socket.emit('dmx-go', { 57: 255, 58: 0, 59: 0, 60: 0 });
	        break;
	      case 'wash_green':
	        socket.emit('dmx-go', { 57: 0, 58: 255, 59: 0, 60: 0 });
	        break;
	      case 'wash_blue':
	        socket.emit('dmx-go', { 57: 0, 58: 0, 59: 255, 20: 0 });
	        break;
	      case 'wash_yellow':
	        socket.emit('dmx-go', { 57: 255, 58: 255, 59: 0, 60: 0 });
	        break;
	      case 'dmx_off':
	        socket.emit('dmx-go', { 46: 0, 47: 0, 56: 0 });
	        break;
	
	      default:
	        console.log('ERROR: Button does not exist');
	    }
	  }
	  handleSliders(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	    let slider_value = event.target.value / 100.0 * 255.0;
	    switch (event.target.id) {
	      case 'spot_pan':
	        socket.emit('dmx-go', { 40: slider_value });
	        break;
	      case 'spot_tilt':
	        socket.emit('dmx-go', { 41: slider_value });
	        break;
	      case 'spot_fine_pan':
	        socket.emit('dmx-go', { 42: slider_value });
	        break;
	      case 'spot_fine_tilt':
	        socket.emit('dmx-go', { 43: slider_value });
	        break;
	      case 'spot_speed':
	        socket.emit('dmx-go', { 44: slider_value });
	        break;
	      case 'all_intensity':
	        socket.emit('dmx-go', { 46: 216, 47: slider_value, 56: slider_value });
	        break;
	      case 'spot_intensity':
	        socket.emit('dmx-go', { 47: slider_value });
	        break;
	      case 'wash_intensity':
	        socket.emit('dmx-go', { 56: slider_value });
	        break;
	      case 'wash_pan':
	        socket.emit('dmx-go', { 62: slider_value });
	        break;
	      case 'wash_tilt':
	        socket.emit('dmx-go', { 63: slider_value });
	        break;
	      case 'wash_fine_pan':
	        socket.emit('dmx-go', { 64: slider_value });
	        break;
	      case 'wash_fine_tilt':
	        socket.emit('dmx-go', { 65: slider_value });
	        break;
	      case 'wash_zoom':
	        socket.emit('dmx-go', { 67: slider_value });
	        break;
	
	      default:
	        console.log('ERROR: Slider does not exist');
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Row,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 2, sm: 2, md: 2, lg: 2 },
	            _react2.default.createElement(
	              'button',
	              { onClick: this.handleOnLock },
	              lockIcon
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 10, sm: 10, md: 10, lg: 10 },
	            _react2.default.createElement(
	              'strong',
	              null,
	              'Group 2: LIGHTS'
	            ),
	            ' DMX: 41 + 57'
	          )
	        ),
	        _react2.default.createElement(
	          ResponsiveReactGridLayout,
	          _extends({
	            onBreakpointChange: this.onBreakpointChange,
	            onLayoutChange: this.onLayoutChange,
	            isDraggable: !this.state.lock,
	            isResizable: !this.state.lock,
	            compactType: this.state.compactType
	          }, this.props),
	          _lodash2.default.map(this.state.items, el => this.createElement(el))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.response
	      )
	    );
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	    this.setState({
	      items: [{
	        type: 0,
	        i: "dmx_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 2,
	        h: 2,
	        className: 'btn-block btn btn-danger',
	        text: 'Lights Out'
	      }, {
	        type: 1,
	        i: "all_intensity",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 2,
	        h: 2,
	        text: 'Master Intensity'
	      }, {
	        type: 0,
	        i: "spot_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Spot On'
	      }, {
	        type: 0,
	        i: "spot_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Spot Off'
	      }, {
	        type: 1,
	        i: "spot_intensity",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Intensity'
	      }, {
	        type: 1,
	        i: "spot_tilt",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Tilt'
	      }, {
	        type: 1,
	        i: "spot_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Pan'
	      }, {
	        type: 1,
	        i: "spot_speed",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Speed'
	      }, {
	        type: 1,
	        i: "spot_fine_tilt",
	        x: 4, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Fine Tilt'
	      }, {
	        type: 1,
	        i: "spot_fine_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Spot Fine Pan'
	      }, {
	        type: 0,
	        i: "spot_white",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Spot White'
	      }, {
	        type: 0,
	        i: "spot_red",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Spot Red'
	      }, {
	        type: 0,
	        i: "spot_green",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Spot Green'
	      }, {
	        type: 0,
	        i: "spot_blue",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Spot Blue'
	      }, {
	        type: 0,
	        i: "spot_yellow",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'Spot Yellow'
	      }, {
	        type: 0,
	        i: "wash_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Wash On'
	      }, {
	        type: 0,
	        i: "wash_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'Wash Off'
	      }, {
	        type: 1,
	        i: "wash_intensity",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Intensity'
	      }, {
	        type: 1,
	        i: "wash_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Pan'
	      }, {
	        type: 1,
	        i: "wash_tilt",
	        x: 4, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 10, // Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Tilt'
	      }, {
	        type: 1,
	        i: "wash_fine_pan",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 12, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Fine Pan'
	      }, {
	        type: 1,
	        i: "wash_fine_tilt",
	        x: 4, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 12, // Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Fine Tilt'
	      }, {
	        type: 1,
	        i: "wash_zoom",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 12, //Infinity,
	        w: 2,
	        h: 2,
	        text: 'Wash Zoom'
	      }, {
	        type: 0,
	        i: "wash_white",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'Wash White'
	      }, {
	        type: 0,
	        i: "wash_red",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Wash Red'
	      }, {
	        type: 0,
	        i: "wash_green",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Wash Green'
	      }, {
	        type: 0,
	        i: "wash_blue",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 9, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-primary',
	        text: 'Wash Blue'
	      }, {
	        type: 0,
	        i: "wash_yellow",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 8, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'Wash Yellow'
	      }]
	    });
	  }
	}
	exports.default = Group2;
	Group2.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	let socket;
	
	class PTZGroup1 extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      lock: true,
	      host: '127.0.0.1',
	      port: 5250,
	      PTZhost: '192.168.0.100',
	      PTZport: 52381,
	      command: "",
	      response: '',
	      compactType: null
	    };
	    this.onBreakpointChange = this.onBreakpointChange.bind(this);
	    this.handleOnLock = this.handleOnLock.bind(this);
	    this.handleButtons = this.handleButtons.bind(this);
	    this.handleButtonRelease = this.handleButtonRelease.bind(this);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  createElement(el) {
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#FFF"
	    };
	    const i = el.add ? "+" : el.i;
	    let controllerCode = _react2.default.createElement(
	      'button',
	      { className: el.className, value: el.i, onMouseDown: this.handleButtons, onMouseUp: this.handleButtonRelease },
	      el.text
	    );
	    if (el.type == 1) {
	      //type is slider
	      controllerCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          el.text
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliders })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      controllerCode,
	      _react2.default.createElement('span', { style: lockStyle })
	    );
	  }
	
	  handleButtons(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	
	    switch (event.target.value) {
	
	      case 'ptz_on':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000060000000c8101040002ff' });
	        break;
	      case 'ptz_off':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000060000000c8101040003ff' });
	        break;
	      case 'ptz_preset_1':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0200ff' });
	        break;
	      case 'ptz_preset_2':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0201ff' });
	        break;
	      case 'ptz_preset_3':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0202ff' });
	        break;
	      case 'ptz_preset_4':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0203ff' });
	        break;
	      case 'ptz_preset_5':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0204ff' });
	        break;
	      case 'ptz_preset_6':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0205ff' });
	        break;
	      case 'ptz_save_preset_1':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000108101043f0100ff' });
	        break;
	      case 'ptz_save_preset_2':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0101ff' });
	        break;
	      case 'ptz_save_preset_3':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0102ff' });
	        break;
	      case 'ptz_save_preset_4':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0103ff' });
	        break;
	      case 'ptz_save_preset_5':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0104ff' });
	        break;
	      case 'ptz_save_preset_6':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0105ff' });
	        break;
	      case 'ptz_up_left':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '0100000900000099810106010c080101ff' });
	        break;
	      case 'ptz_up':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000090000009b810106010c080301ff' });
	        break;
	      case 'ptz_up_right':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000090000009d810106010c080201ff' });
	        break;
	      case 'ptz_left':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a3810106010c080103ff' });
	        break;
	      case 'ptz_right':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a5810106010c080203ff' });
	        break;
	      case 'ptz_down_left':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a7810106010c080102ff' });
	        break;
	      case 'ptz_down':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a9810106010c080302ff' });
	        break;
	      case 'ptz_down_right':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000ab810106010c080202ff' });
	        break;
	      case 'ptz_zoom_in':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000b78101040723ff' });
	        break;
	      case 'ptz_zoom_out':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000b98101040733ff' });
	        break;
	      case 'ptz_iris_up':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000003148101040b02ff' });
	        break;
	      case 'ptz_iris_down':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000003168101040b03ff' });
	        break;
	      case 'ptz_iris_reset':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000003168101040b00ff' });
	        break;
	
	      default:
	        console.log('ERROR: Button does not exist');
	    }
	  }
	  handleButtonRelease(event) {
	    console.log(event.target.id + " :mouse upped");
	
	    switch (event.target.value) {
	
	      case 'ptz_zoom_in':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000ba8101040700ff' });
	        break;
	      case 'ptz_zoom_out':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000ba8101040700ff' });
	        break;
	      default:
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000ac810106010c080303ff' });
	
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Row,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 2, sm: 2, md: 2, lg: 2 },
	            _react2.default.createElement(
	              'button',
	              { onClick: this.handleOnLock },
	              lockIcon
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 10, sm: 10, md: 10, lg: 10 },
	            _react2.default.createElement(
	              'strong',
	              null,
	              'Group 1: CAMERA'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          ResponsiveReactGridLayout,
	          _extends({
	            onBreakpointChange: this.onBreakpointChange,
	            onLayoutChange: this.onLayoutChange,
	            isDraggable: !this.state.lock,
	            isResizable: !this.state.lock,
	            compactType: this.state.compactType
	          }, this.props),
	          _lodash2.default.map(this.state.items, el => this.createElement(el))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.response
	      )
	    );
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	    this.setState({
	      items: [{
	        type: 0,
	        i: "ptz_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ On'
	      }, {
	        type: 0,
	        i: "ptz_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Off'
	      }, {
	        type: 0,
	        i: "ptz_preset_1",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 1'
	      }, {
	        type: 0,
	        i: "ptz_preset_2",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 2'
	      }, {
	        type: 0,
	        i: "ptz_preset_3",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 3'
	      }, {
	        type: 0,
	        i: "ptz_preset_4",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 4'
	      }, {
	        type: 0,
	        i: "ptz_preset_5",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 5'
	      }, {
	        type: 0,
	        i: "ptz_preset_6",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 6'
	      }, {
	        type: 0,
	        i: "ptz_zoom_in",
	        x: 0, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, // Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'PTZ Zoom In'
	      }, {
	        type: 0,
	        i: "ptz_zoom_out",
	        x: 0, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, // Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'PTZ Zoom Out'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_1",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 1'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_2",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 2'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_3",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 3'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_4",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 4'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_5",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 5'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_6",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 6'
	      }, {
	        type: 0,
	        i: "ptz_up_left",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Up Left'
	      }, {
	        type: 0,
	        i: "ptz_up",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Up'
	      }, {
	        type: 0,
	        i: "ptz_up_right",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Up Right'
	      }, {
	        type: 0,
	        i: "ptz_left",
	        x: 0, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 5, // Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Left'
	      }, {
	        type: 0,
	        i: "ptz_right",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 5, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Right'
	      }, {
	        type: 0,
	        i: "ptz_down_left",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Down Left'
	      }, {
	        type: 0,
	        i: "ptz_down",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Down'
	      }, {
	        type: 0,
	        i: "ptz_down_right",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Down Right'
	      }, {
	        type: 0,
	        i: "ptz_iris_up",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'PTZ Iris Up'
	      }, {
	        type: 0,
	        i: "ptz_iris_down",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'PTZ Iris Down'
	      }, {
	        type: 0,
	        i: "ptz_iris_reset",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'PTZ Iris Reset'
	      }]
	    });
	  }
	}
	exports.default = PTZGroup1;
	PTZGroup1.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGridLayout = __webpack_require__(38);
	
	var _reactDom = __webpack_require__(39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _lodash = __webpack_require__(40);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _lock = __webpack_require__(41);
	
	var _lock2 = _interopRequireDefault(_lock);
	
	var _unlock = __webpack_require__(42);
	
	var _unlock2 = _interopRequireDefault(_unlock);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const ResponsiveReactGridLayout = (0, _reactGridLayout.WidthProvider)(_reactGridLayout.Responsive);
	let lockIcon = _react2.default.createElement(_lock2.default, null);
	let socket;
	
	class PTZGroup2 extends _react2.default.Component {
	
	  constructor(props, context) {
	    super(props, context);
	    this.state = {
	      items: [].map(function (i, key, list) {
	        return {
	          type: 0,
	          i: i.toString(),
	          x: i * 2,
	          y: 0,
	          w: 2,
	          h: 2,
	          add: i === (list.length - 1).toString(),
	          sliderValue: 0
	        };
	      }),
	      lock: true,
	      host: '127.0.0.1',
	      port: 5250,
	      PTZhost: '192.168.0.100',
	      PTZport: 52381,
	      command: "",
	      response: '',
	      compactType: null
	    };
	    this.onBreakpointChange = this.onBreakpointChange.bind(this);
	    this.handleOnLock = this.handleOnLock.bind(this);
	    this.handleButtons = this.handleButtons.bind(this);
	    this.handleButtonRelease = this.handleButtonRelease.bind(this);
	  }
	  handleOnLock() {
	    if (this.state.lock == true) {
	      lockIcon = _react2.default.createElement(_unlock2.default, null);
	      this.setState({ lock: false });
	    } else {
	      lockIcon = _react2.default.createElement(_lock2.default, null);
	      this.setState({ lock: true });
	    }
	  }
	  createElement(el) {
	    let lockStyle = {
	      display: "none"
	    };
	    if (this.state.lock == false) {
	      lockStyle = {
	        position: "absolute",
	        right: "2px",
	        top: 0,
	        cursor: "pointer",
	        display: "inline"
	      };
	    }
	    const gridStyle = {
	      background: "#FFF"
	    };
	    const i = el.add ? "+" : el.i;
	    let controllerCode = _react2.default.createElement(
	      'button',
	      { className: el.className, value: el.i, onMouseDown: this.handleButtons, onMouseUp: this.handleButtonRelease },
	      el.text
	    );
	    if (el.type == 1) {
	      //type is slider
	      controllerCode = _react2.default.createElement(
	        'div',
	        null,
	        ' ',
	        _react2.default.createElement(
	          'span',
	          { className: 'text' },
	          el.text
	        ),
	        _react2.default.createElement(
	          'div',
	          { id: 'slidecontainer' },
	          _react2.default.createElement('input', { type: 'range', min: '1', max: '100', value: el.sliderValue, id: i, className: 'slider', onChange: this.handleSliders })
	        )
	      );
	    }
	    return _react2.default.createElement(
	      'div',
	      { key: i, 'data-grid': el, style: gridStyle },
	      controllerCode,
	      _react2.default.createElement('span', { style: lockStyle })
	    );
	  }
	
	  handleButtons(event) {
	    console.log(event.target.id + ': ' + event.target.value);
	
	    switch (event.target.value) {
	
	      case 'ptz_on':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000060000000c8101040002ff' });
	        break;
	      case 'ptz_off':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000060000000c8101040003ff' });
	        break;
	      case 'ptz_preset_1':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0200ff' });
	        break;
	      case 'ptz_preset_2':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0201ff' });
	        break;
	      case 'ptz_preset_3':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0202ff' });
	        break;
	      case 'ptz_preset_4':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0203ff' });
	        break;
	      case 'ptz_preset_5':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0204ff' });
	        break;
	      case 'ptz_preset_6':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0205ff' });
	        break;
	      case 'ptz_save_preset_1':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000108101043f0100ff' });
	        break;
	      case 'ptz_save_preset_2':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0101ff' });
	        break;
	      case 'ptz_save_preset_3':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0102ff' });
	        break;
	      case 'ptz_save_preset_4':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0103ff' });
	        break;
	      case 'ptz_save_preset_5':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0104ff' });
	        break;
	      case 'ptz_save_preset_6':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000007000000648101043f0105ff' });
	        break;
	      case 'ptz_up_left':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '0100000900000099810106010c080101ff' });
	        break;
	      case 'ptz_up':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000090000009b810106010c080301ff' });
	        break;
	      case 'ptz_up_right':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '010000090000009d810106010c080201ff' });
	        break;
	      case 'ptz_left':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a3810106010c080103ff' });
	        break;
	      case 'ptz_right':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a5810106010c080203ff' });
	        break;
	      case 'ptz_down_left':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a7810106010c080102ff' });
	        break;
	      case 'ptz_down':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000a9810106010c080302ff' });
	        break;
	      case 'ptz_down_right':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000ab810106010c080202ff' });
	        break;
	      case 'ptz_zoom_in':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000b78101040723ff' });
	        break;
	      case 'ptz_zoom_out':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000b98101040733ff' });
	        break;
	      case 'ptz_iris_up':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000003148101040b02ff' });
	        break;
	      case 'ptz_iris_down':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000003168101040b03ff' });
	        break;
	      case 'ptz_iris_reset':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000003168101040b00ff' });
	        break;
	
	      default:
	        console.log('ERROR: Button does not exist');
	    }
	  }
	  handleButtonRelease(event) {
	    console.log(event.target.id + " :mouse upped");
	
	    switch (event.target.value) {
	
	      case 'ptz_zoom_in':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000ba8101040700ff' });
	        break;
	      case 'ptz_zoom_out':
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000006000000ba8101040700ff' });
	        break;
	      default:
	        socket.emit('ptz-go', { host: this.state.PTZhost, port: this.state.PTZport, buffer: '01000009000000ac810106010c080303ff' });
	
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactBootstrap.Row,
	          null,
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 2, sm: 2, md: 2, lg: 2 },
	            _react2.default.createElement(
	              'button',
	              { onClick: this.handleOnLock },
	              lockIcon
	            )
	          ),
	          _react2.default.createElement(
	            _reactBootstrap.Col,
	            { xs: 10, sm: 10, md: 10, lg: 10 },
	            _react2.default.createElement(
	              'strong',
	              null,
	              'Group 2: CAMERA'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          ResponsiveReactGridLayout,
	          _extends({
	            onBreakpointChange: this.onBreakpointChange,
	            onLayoutChange: this.onLayoutChange,
	            isDraggable: !this.state.lock,
	            isResizable: !this.state.lock,
	            compactType: this.state.compactType
	          }, this.props),
	          _lodash2.default.map(this.state.items, el => this.createElement(el))
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        null,
	        this.state.response
	      )
	    );
	  }
	  componentWillUnmount() {
	    socket.off(this.props.page);
	  }
	  componentDidMount() {
	    socket = (0, _socket3.default)();
	    socket.on('telnet-response', mesg => {
	      this.setState({ response: mesg });
	    });
	    this.setState({
	      items: [{
	        type: 0,
	        i: "ptz_on",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ On'
	      }, {
	        type: 0,
	        i: "ptz_off",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Off'
	      }, {
	        type: 0,
	        i: "ptz_preset_1",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 1'
	      }, {
	        type: 0,
	        i: "ptz_preset_2",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 2'
	      }, {
	        type: 0,
	        i: "ptz_preset_3",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 3'
	      }, {
	        type: 0,
	        i: "ptz_preset_4",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 4'
	      }, {
	        type: 0,
	        i: "ptz_preset_5",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 0, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 5'
	      }, {
	        type: 0,
	        i: "ptz_preset_6",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 1, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-success',
	        text: 'Preset 6'
	      }, {
	        type: 0,
	        i: "ptz_zoom_in",
	        x: 0, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, // Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'PTZ Zoom In'
	      }, {
	        type: 0,
	        i: "ptz_zoom_out",
	        x: 0, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, // Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-warning',
	        text: 'PTZ Zoom Out'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_1",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 1'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_2",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 2'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_3",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 3'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_4",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 4'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_5",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 2, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 5'
	      }, {
	        type: 0,
	        i: "ptz_save_preset_6",
	        x: 3, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 3, //Infinity, 
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-danger',
	        text: 'Save Pset 6'
	      }, {
	        type: 0,
	        i: "ptz_up_left",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Up Left'
	      }, {
	        type: 0,
	        i: "ptz_up",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Up'
	      }, {
	        type: 0,
	        i: "ptz_up_right",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 4, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Up Right'
	      }, {
	        type: 0,
	        i: "ptz_left",
	        x: 0, // (this.state.items.length * 2) % (this.state.cols || 12),
	        y: 5, // Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Left'
	      }, {
	        type: 0,
	        i: "ptz_right",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 5, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Right'
	      }, {
	        type: 0,
	        i: "ptz_down_left",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Down Left'
	      }, {
	        type: 0,
	        i: "ptz_down",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Down'
	      }, {
	        type: 0,
	        i: "ptz_down_right",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 6, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn',
	        text: 'PTZ Down Right'
	      }, {
	        type: 0,
	        i: "ptz_iris_up",
	        x: 0, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'PTZ Iris Up'
	      }, {
	        type: 0,
	        i: "ptz_iris_down",
	        x: 1, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'PTZ Iris Down'
	      }, {
	        type: 0,
	        i: "ptz_iris_reset",
	        x: 2, //(this.state.items.length * 2) % (this.state.cols || 12),
	        y: 7, //Infinity,
	        w: 1,
	        h: 1,
	        className: 'btn-block btn btn-default',
	        text: 'PTZ Iris Reset'
	      }]
	    });
	  }
	}
	exports.default = PTZGroup2;
	PTZGroup2.defaultProps = {
	  className: "layout",
	  rowHeight: 30,
	  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
	};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(27);
	
	var _reactBootstrap = __webpack_require__(23);
	
	var _socket = __webpack_require__(53);
	
	var _socket2 = __webpack_require__(50);
	
	var _socket3 = _interopRequireDefault(_socket2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	let socket;
	
	class Diagnostics extends _react2.default.Component {
	
		constructor(props) {
			super(props);
			this.state = {
				text: '',
				host: '127.0.0.1',
				port: 5250,
				command: "cls",
				response: ''
			};
			this.onHostChange = this.onHostChange.bind(this);
			this.onPortChange = this.onPortChange.bind(this);
			this.onCommandChange = this.onCommandChange.bind(this);
			this.sendTelnetTest = this.sendTelnetTest.bind(this);
		}
		componentDidMount() {
			socket = (0, _socket3.default)();
			socket.on(this.props.location.pathname, mesg => {
				this.setState({ text: mesg });
			});
			socket.on('telnet-response', mesg => {
				this.setState({ response: mesg });
			});
		}
		componentWillUnmount() {
			socket.off(this.props.page);
		}
		onPortChange(event) {
			this.setState({ port: event.target.value });
		}
		onHostChange(event) {
			this.setState({ host: event.target.value });
		}
		onCommandChange(event) {
			this.setState({ command: event.target.value });
		}
		sendTelnetTest() {
			console.log("sending Telnet Test");
			socket.emit('diagnostics-send-telnet', { host: this.state.host, port: this.state.port, command: this.state.command });
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
						{ horizontal: true, onSubmit: this.sendTelnetTest },
						_react2.default.createElement(
							_reactBootstrap.FormGroup,
							null,
							_react2.default.createElement(
								_reactBootstrap.Col,
								{ componentClass: _reactBootstrap.ControlLabel, sm: 3 },
								'Host'
							),
							_react2.default.createElement(
								_reactBootstrap.Col,
								{ sm: 9 },
								_react2.default.createElement(_reactBootstrap.FormControl, { name: 'host', value: this.state.host, onChange: this.onHostChange })
							)
						),
						_react2.default.createElement(
							_reactBootstrap.FormGroup,
							null,
							_react2.default.createElement(
								_reactBootstrap.Col,
								{ componentClass: _reactBootstrap.ControlLabel, sm: 3 },
								'Port'
							),
							_react2.default.createElement(
								_reactBootstrap.Col,
								{ sm: 9 },
								_react2.default.createElement(_reactBootstrap.FormControl, { name: 'port', value: this.state.port, onChange: this.onPortChange })
							)
						),
						_react2.default.createElement(
							_reactBootstrap.FormGroup,
							null,
							_react2.default.createElement(
								_reactBootstrap.Col,
								{ componentClass: _reactBootstrap.ControlLabel, sm: 3 },
								'Telnet Command'
							),
							_react2.default.createElement(
								_reactBootstrap.Col,
								{ sm: 9 },
								_react2.default.createElement(_reactBootstrap.FormControl, { name: 'command', value: this.state.command, onChange: this.onCommandChange })
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
										'Send Telnet Command'
									)
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					null,
					this.state.response
				)
			);
		}
	}
	exports.default = Diagnostics;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__(27);
	
	var _reactRouter = __webpack_require__(19);
	
	var _reactBootstrap = __webpack_require__(23);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Help extends _react2.default.Component {
	  render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      'Help HTML here '
	    );
	  }
	}
	exports.default = Help;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(17);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class ContextWrapper extends _react2.default.Component {
	  getChildContext() {
	    return { initialState: this.props.initialState };
	  }
	
	  render() {
	    return this.props.children;
	  }
	}
	
	exports.default = ContextWrapper;
	ContextWrapper.childContextTypes = {
	  initialState: _react2.default.PropTypes.object
	};
	
	ContextWrapper.propTypes = {
	  children: _react2.default.PropTypes.object.isRequired,
	  initialState: _react2.default.PropTypes.object
	};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals __resourceQuery */
	if(true) {
		var hotPollInterval = +(__resourceQuery.substr(1)) || (10 * 60 * 1000);
	
		function checkForUpdate(fromUpdate) {
			if(module.hot.status() === "idle") {
				module.hot.check(true, function(err, updatedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update.");
							console.warn("[HMR] " + err.stack || err.message);
							console.warn("[HMR] You need to restart the application!");
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
					if(!updatedModules) {
						if(fromUpdate) console.log("[HMR] Update applied.");
						return;
					}
					__webpack_require__(65)(updatedModules, updatedModules);
					checkForUpdate(true);
				});
			}
		}
		setInterval(checkForUpdate, hotPollInterval);
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, "?1000"))

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ })
/******/ ])));
//# sourceMappingURL=server.bundle.js.map