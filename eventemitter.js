var EventEmitter=(function(){
		var _eventNameCallbackArrayMap={};
		var EventEmitter=function(){};
		EventEmitter.prototype.bind=function(eventName,fn){
			var callbackArray=_eventNameCallbackArrayMap[eventName] || [];
			callbackArray.push(fn);
			_eventNameCallbackArrayMap[eventName]=callbackArray;
		}
		EventEmitter.prototype.unbind=function(eventName,fn){
			var callbackArray=_eventNameCallbackArrayMap[eventName];
			if(!callbackArray) return;
			for (var i = callbackArray.length - 1; i >= 0; i--) {
				if(callbackArray[i]===fn){
					callbackArray.splice(i,1);
					break;
				}
			};
		}
		EventEmitter.prototype.trigger=function(eventName,obj){
			var callbackArray=_eventNameCallbackArrayMap[eventName];
			if(!callbackArray) return;
			var callbackArrLen=callbackArray.length;
			for (var i=0;i<callbackArrLen; i++) {
				callbackArray[i](obj);
			};
		}
		return EventEmitter;
})();

var eventify=function(obj,EventEmitter){
	var methodArr = ['bind','unbind','trigger'];
	for (var i = methodArr.length - 1; i >= 0; i--) {
		if(typeof obj === 'function'){
			obj.prototype[methodArr[i]]=EventEmitter.prototype[methodArr[i]];	
		}else{
			obj[methodArr[i]]=EventEmitter.prototype[methodArr[i]];	
			
		}
	};
}