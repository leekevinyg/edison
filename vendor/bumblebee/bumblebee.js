import EventEmitter from '../events.js';
import PorcupineManager from './porcupine_manager.js';
import webVoiceProcessor from './web-voice-processor.js';
import SpectrumAnalyser from './spectrum-analyser.js';

const defaultHotwrds = {
	bumblebee: new Uint8Array([
		0x8c, 0x14, 0x8b, 0x6f, 0x4b, 0xe9, 0x6a, 0x89, 0x90, 0xe1, 0xc0, 0x85,
		0xee, 0x60, 0xee, 0x5c, 0xee, 0x4d, 0x7c, 0x3a, 0xd7, 0x15, 0xaf, 0x31,
		0x7f, 0x4a, 0x34, 0xd5, 0x6a, 0x6f, 0xec, 0xe3, 0x0f, 0x74, 0xa8, 0x31,
		0x19, 0xf7, 0x46, 0xb7, 0xb8, 0x3f, 0xa6, 0x37, 0x71, 0x3b, 0x14, 0xf2,
		0xdc, 0xa5, 0x3d, 0x8b, 0x06, 0x84, 0xdb, 0x91, 0x47, 0xba, 0x49, 0x6c,
		0xcc, 0x72, 0x51, 0x14, 0xad, 0x35, 0xe9, 0x51, 0x27, 0x70, 0x9a, 0x4a,
		0x7c, 0x26, 0x34, 0x2c, 0x67, 0x50, 0xab, 0x40, 0xf6, 0xdb, 0xc4, 0x95,
		0xfa, 0x56, 0xc7, 0x12, 0x55, 0xc4, 0x2e, 0x94
	]),
	hey_edison: new Uint8Array([
		0x69, 0x45, 0x8f, 0xdf, 0xc8, 0x5a, 0xec, 0xb2, 0x35, 0xba, 0x70, 0x01,
		0xe6, 0xef, 0xd3, 0x5f, 0x80, 0x31, 0xb1, 0x90, 0x36, 0xd5, 0x3a, 0xcd,
		0x5e, 0x24, 0xac, 0xf3, 0xea, 0x54, 0x44, 0x66, 0x22, 0xe1, 0xb7, 0xb8,
		0x14, 0xfc, 0xa3, 0xd4, 0x1d, 0x73, 0x4a, 0x66, 0xb0, 0xaa, 0xf4, 0x84,
		0xe2, 0x4d, 0x83, 0x4b, 0x5d, 0xd1, 0xba, 0x0c, 0x20, 0xa1, 0x96, 0x27,
		0x3b, 0x6a, 0x9c, 0x53, 0x12, 0x49, 0xc2, 0x20, 0xf3, 0x4e, 0xad, 0x8d,
		0x49, 0x03, 0x17, 0xbc, 0x27, 0x53, 0xed, 0xad, 0x29, 0xff, 0x68, 0xeb,
		0xb6, 0x0b, 0x93, 0x46, 0xd2, 0x12, 0xcf, 0x20
	]),
};

export default class BumbleBee extends EventEmitter {
	constructor() {
		super();
		this.hotword = null;
		this.hotwords = {};
		this.setMicVolume(1);
		this.setMuted(false);
		this.setSensitivity(0.5);
		this.setWorkersPath('/');
		this.setVoiceProcessor(webVoiceProcessor);
		this._detectionCallback = this.detectionCallback.bind(this);
		this._errorCallback = this.errorCallback.bind(this);
		this._audioProcessCallback = this.audioProcessCallback.bind(this);
		this._audioAnalyserCallback = this.audioAnalyserCallback.bind(this);
		this.SpectrumAnalyser = SpectrumAnalyser;
	}
	
	setVoiceProcessor(proc) {
		this.webVoiceProcessor = proc;
	}
	
	addHotword(name, data, sensitivity) {
		if (!data) {
			if (name in defaultHotwrds) {
				data = defaultHotwrds[name];
			}
		}
		if (data) {
			this.hotwords[name] = {
				data,
				sensitivity: sensitivity || this.defaultSensitivity
			};
		}
		else throw new Error('no hotword data');
	}
	
	setHotword(w) {
		if (w === null || w === '') {
			this.hotword = null;
		}
		else if (Object.keys(this.hotwords).indexOf(w) > -1) {
			this.hotword = w;
		}
		else {
			throw new Error('invalid hotword');
		}
	}
	
	setSensitivity(s) {
		this.defaultSensitivity = s;
	}
	
	stop() {
		if (this.porcupineManager) this.porcupineManager.stop();
		this.started = false;
	}
	
	setWorkersPath(path) {
		this.webWorkersPath = path;
	}
	
	detectionCallback(keyword) {
		if (keyword) {
			console.log('bumblebee keyword', keyword);
			if (this.hotword === null || keyword === this.hotword) {
				this.emit('hotword', keyword);
			}
			else {
				console.log('wrong hotword:', keyword);
			}
		}
	}
	
	errorCallback(e) {
		this.emit('error', e);
	}
	
	audioProcessCallback(data, sampleRate) {
		this.emit('data', data, sampleRate);
	}
	
	audioAnalyserCallback(audioAnalyser, gainNode) {
		this.gainNode = gainNode;
		this.emit('analyser', audioAnalyser);
	}
	
	start() {
		if (this.started) return;
		this.started = true;
		this.porcupineManager = PorcupineManager(
			this.webVoiceProcessor,
			this.webWorkersPath+"/porcupine_worker.js",
			this.webWorkersPath+"/downsampling_worker.js");
		
		let keywordIDs = {};
		let sensitivities = [];
		for (let id in this.hotwords) {
			let h = this.hotwords[id];
			keywordIDs[id] = h.data;
			sensitivities.push(h.sensitivity);
		}
		this.porcupineManager.start(keywordIDs, new Float32Array(sensitivities), this._gain, this._detectionCallback, this._errorCallback, this._audioProcessCallback, this._audioAnalyserCallback);
	}
	
	setMuted(muted) {
		this.muted = muted;
		if (this.gainNode) {
			if (muted) {
				this._gain = this.gainNode.gain.value;
				this.gainNode.gain.value = 0;
			}
			else {
				this.gainNode.gain.value = this._gain || 1;
			}
		}
	}
	
	setMicVolume(vol) {
		this._gain = vol;
		if (this.gainNode) this.gainNode.gain.value = vol;
	}
}