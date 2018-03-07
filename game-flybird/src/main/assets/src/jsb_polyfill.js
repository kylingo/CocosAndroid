!(function() {
function t(t) {
return t && t.toString && "[object CallbackConstructor]" === t.toString() ? "function" : "object";
}
!(function(i, n, o) {
function r(o, c) {
var a = n[o];
if (!a) {
var h = i[o];
if (!h) {
var l = "function" == ("object" == (e = typeof require) ? t(require) : e) && require;
if (!c && l) return l(o, !0);
if (s) return s(o, !0);
var u = new Error("Cannot find module '" + o + "'");
u.code = "MODULE_NOT_FOUND";
throw u;
}
var d = {};
a = n[o] = {
exports: d
};
h[0]((function(t) {
return r(h[1][t] || t);
}), a, d);
}
return a.exports;
}
for (var s = "function" == ("object" == (e = typeof require) ? t(require) : e) && require, c = 0; c < o.length; c++) r(o[c]);
})({
1: [ (function(t, e, i) {}), {} ],
2: [ (function(t, e, i) {
function n(t, e) {
return function(i) {
"use strict";
if (1 !== arguments.length) {
var n = "";
2 === arguments.length ? n = "Arguments: " + arguments[1] : arguments.length > 2 && (n = "Arguments: " + cc.js.shiftArguments.apply(null, arguments).join(", "));
t(e + " " + i + ", please go to " + r + "#" + i + " to see details. " + n);
} else t(e + " " + i + ", please go to " + r + "#" + i + " to see details.");
};
}
var o = t("./cocos2d/core/platform/CCEnum");
cc.DebugMode = o({
NONE: 0,
INFO: 1,
WARN: 2,
ERROR: 3,
INFO_FOR_WEB_PAGE: 4,
WARN_FOR_WEB_PAGE: 5,
ERROR_FOR_WEB_PAGE: 6
});
cc._initDebugSetting = function(t) {
cc.log = cc.logID = cc.warn = cc.warnID = cc.error = cc.errorID = cc._throw = cc.assert = cc.assertID = function() {};
if (t !== cc.DebugMode.NONE) {
if (console && console.log.apply) {
console.error || (console.error = console.log);
console.warn || (console.warn = console.log);
console.error.bind ? cc.error = console.error.bind(console) : cc.error = console.error;
cc.assert = function(t, e) {
if (!t) {
e && (e = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments)));
0;
throw new Error(e);
}
};
}
t !== cc.DebugMode.ERROR && (console.warn.bind ? cc.warn = console.warn.bind(console) : cc.warn = console.warn);
if (t === cc.DebugMode.INFO) {
"JavaScriptCore" === scriptEngineType ? cc.log = function() {
return console.log.apply(console, arguments);
} : cc.log = console.log;
cc.info = "JavaScriptCore" === scriptEngineType ? function() {
(console.info || console.log).apply(console, arguments);
} : console.info || console.log;
}
cc.warnID = n(cc.warn, "Warning");
cc.errorID = n(cc.error, "Error");
cc.logID = n(cc.log, "Log");
var e = n((function() {
for (var t = [ !1 ], e = 0; e < arguments.length; ++e) t.push(arguments[e]);
cc.assert.apply(null, t);
}), "Assert");
cc.assertID = function(t) {
"use strict";
t || e.apply(null, cc.js.shiftArguments.apply(null, arguments));
};
}
};
cc._throw = function(t) {
var e = t.stack;
e ? cc.error(t + "\n" + e) : cc.error(t);
};
var r = "https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md";
}), {
"./cocos2d/core/platform/CCEnum": 135
} ],
3: [ (function(t, e, i) {}), {} ],
4: [ (function(t, e, i) {
cc.Action = cc._Class.extend({
ctor: function() {
this.originalTarget = null;
this.target = null;
this.tag = cc.Action.TAG_INVALID;
},
clone: function() {
var t = new cc.Action();
t.originalTarget = null;
t.target = null;
t.tag = this.tag;
return t;
},
isDone: function() {
return !0;
},
startWithTarget: function(t) {
this.originalTarget = t;
this.target = t;
},
stop: function() {
this.target = null;
},
step: function(t) {
cc.logID(1006);
},
update: function(t) {
cc.logID(1007);
},
getTarget: function() {
return this.target;
},
setTarget: function(t) {
this.target = t;
},
getOriginalTarget: function() {
return this.originalTarget;
},
setOriginalTarget: function(t) {
this.originalTarget = t;
},
getTag: function() {
return this.tag;
},
setTag: function(t) {
this.tag = t;
},
retain: function() {},
release: function() {}
});
cc.Action.TAG_INVALID = -1;
cc.FiniteTimeAction = cc.Action.extend({
_duration: 0,
ctor: function() {
cc.Action.prototype.ctor.call(this);
this._duration = 0;
},
getDuration: function() {
return this._duration * (this._timesForRepeat || 1);
},
setDuration: function(t) {
this._duration = t;
},
reverse: function() {
cc.logID(1008);
return null;
},
clone: function() {
return new cc.FiniteTimeAction();
}
});
cc.Speed = cc.Action.extend({
_speed: 0,
_innerAction: null,
ctor: function(t, e) {
cc.Action.prototype.ctor.call(this);
this._speed = 0;
this._innerAction = null;
t && this.initWithAction(t, e);
},
getSpeed: function() {
return this._speed;
},
setSpeed: function(t) {
this._speed = t;
},
initWithAction: function(t, e) {
if (!t) throw new Error("cc.Speed.initWithAction(): action must be non nil");
this._innerAction = t;
this._speed = e;
return !0;
},
clone: function() {
var t = new cc.Speed();
t.initWithAction(this._innerAction.clone(), this._speed);
return t;
},
startWithTarget: function(t) {
cc.Action.prototype.startWithTarget.call(this, t);
this._innerAction.startWithTarget(t);
},
stop: function() {
this._innerAction.stop();
cc.Action.prototype.stop.call(this);
},
step: function(t) {
this._innerAction.step(t * this._speed);
},
isDone: function() {
return this._innerAction.isDone();
},
reverse: function() {
return new cc.Speed(this._innerAction.reverse(), this._speed);
},
setInnerAction: function(t) {
this._innerAction !== t && (this._innerAction = t);
},
getInnerAction: function() {
return this._innerAction;
}
});
cc.speed = function(t, e) {
return new cc.Speed(t, e);
};
cc.Follow = cc.Action.extend({
_followedNode: null,
_boundarySet: !1,
_boundaryFullyCovered: !1,
_halfScreenSize: null,
_fullScreenSize: null,
_worldRect: null,
leftBoundary: 0,
rightBoundary: 0,
topBoundary: 0,
bottomBoundary: 0,
ctor: function(t, e) {
cc.Action.prototype.ctor.call(this);
this._followedNode = null;
this._boundarySet = !1;
this._boundaryFullyCovered = !1;
this._halfScreenSize = null;
this._fullScreenSize = null;
this.leftBoundary = 0;
this.rightBoundary = 0;
this.topBoundary = 0;
this.bottomBoundary = 0;
this._worldRect = cc.rect(0, 0, 0, 0);
t && (e ? this.initWithTarget(t, e) : this.initWithTarget(t));
},
clone: function() {
var t = new cc.Follow(), e = this._worldRect, i = new cc.Rect(e.x, e.y, e.width, e.height);
t.initWithTarget(this._followedNode, i);
return t;
},
isBoundarySet: function() {
return this._boundarySet;
},
setBoudarySet: function(t) {
this._boundarySet = t;
},
initWithTarget: function(t, e) {
if (!t) throw new Error("cc.Follow.initWithAction(): followedNode must be non nil");
e = e || cc.rect(0, 0, 0, 0);
this._followedNode = t;
this._worldRect = e;
this._boundarySet = !cc._rectEqualToZero(e);
this._boundaryFullyCovered = !1;
var i = cc.director.getWinSize();
this._fullScreenSize = cc.p(i.width, i.height);
this._halfScreenSize = cc.pMult(this._fullScreenSize, .5);
if (this._boundarySet) {
this.leftBoundary = -(e.x + e.width - this._fullScreenSize.x);
this.rightBoundary = -e.x;
this.topBoundary = -e.y;
this.bottomBoundary = -(e.y + e.height - this._fullScreenSize.y);
this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2);
this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2);
this.topBoundary === this.bottomBoundary && this.leftBoundary === this.rightBoundary && (this._boundaryFullyCovered = !0);
}
return !0;
},
step: function(t) {
var e = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO), i = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO), n = cc.pSub(e, i), o = this.target.parent.convertToNodeSpaceAR(cc.pAdd(n, this._halfScreenSize));
if (this._boundarySet) {
if (this._boundaryFullyCovered) return;
this.target.setPosition(cc.clampf(o.x, this.leftBoundary, this.rightBoundary), cc.clampf(o.y, this.bottomBoundary, this.topBoundary));
} else this.target.setPosition(o.x, o.y);
},
isDone: function() {
return !this._followedNode.isRunning();
},
stop: function() {
this.target = null;
cc.Action.prototype.stop.call(this);
}
});
cc.follow = function(t, e) {
return new cc.Follow(t, e);
};
}), {} ],
5: [ (function(t, e, i) {
function n(t) {
for (var e = [], i = t.length - 1; i >= 0; i--) e.push(cc.p(t[i].x, t[i].y));
return e;
}
function o(t) {
for (var e = [], i = 0; i < t.length; i++) e.push(cc.p(t[i].x, t[i].y));
return e;
}
cc.cardinalSplineAt = function(t, e, i, n, o, r) {
var s = r * r, c = s * r, a = (1 - o) / 2, h = a * (2 * s - c - r), l = a * (-c + s) + (2 * c - 3 * s + 1), u = a * (c - 2 * s + r) + (-2 * c + 3 * s), d = a * (c - s), f = t.x * h + e.x * l + i.x * u + n.x * d, p = t.y * h + e.y * l + i.y * u + n.y * d;
return cc.p(f, p);
};
cc.getControlPointAt = function(t, e) {
return t[Math.min(t.length - 1, Math.max(e, 0))];
};
cc.CardinalSplineTo = cc.ActionInterval.extend({
_points: null,
_deltaT: 0,
_tension: 0,
_previousPosition: null,
_accumulatedDiff: null,
ctor: function(t, e, i) {
cc.ActionInterval.prototype.ctor.call(this);
this._points = [];
void 0 !== i && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
if (!e || 0 === e.length) throw new Error("Invalid configuration. It must at least have one control point");
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this.setPoints(e);
this._tension = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.CardinalSplineTo();
t.initWithDuration(this._duration, o(this._points), this._tension);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._deltaT = 1 / (this._points.length - 1);
this._previousPosition = cc.p(this.target.getPositionX(), this.target.getPositionY());
this._accumulatedDiff = cc.p(0, 0);
},
update: function(t) {
t = this._computeEaseTime(t);
var e, i, n = this._points;
if (1 === t) {
e = n.length - 1;
i = 1;
} else {
var o = this._deltaT;
i = (t - o * (e = 0 | t / o)) / o;
}
var r = cc.cardinalSplineAt(cc.getControlPointAt(n, e - 1), cc.getControlPointAt(n, e - 0), cc.getControlPointAt(n, e + 1), cc.getControlPointAt(n, e + 2), this._tension, i);
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var s, c;
s = this.target.getPositionX() - this._previousPosition.x;
c = this.target.getPositionY() - this._previousPosition.y;
if (0 !== s || 0 !== c) {
var a = this._accumulatedDiff;
s = a.x + s;
c = a.y + c;
a.x = s;
a.y = c;
r.x += s;
r.y += c;
}
}
this.updatePosition(r);
},
reverse: function() {
var t = n(this._points);
return cc.cardinalSplineTo(this._duration, t, this._tension);
},
updatePosition: function(t) {
this.target.setPosition(t);
this._previousPosition = t;
},
getPoints: function() {
return this._points;
},
setPoints: function(t) {
this._points = t;
}
});
cc.cardinalSplineTo = function(t, e, i) {
return new cc.CardinalSplineTo(t, e, i);
};
cc.CardinalSplineBy = cc.CardinalSplineTo.extend({
_startPosition: null,
ctor: function(t, e, i) {
cc.CardinalSplineTo.prototype.ctor.call(this);
this._startPosition = cc.p(0, 0);
void 0 !== i && this.initWithDuration(t, e, i);
},
startWithTarget: function(t) {
cc.CardinalSplineTo.prototype.startWithTarget.call(this, t);
this._startPosition.x = t.getPositionX();
this._startPosition.y = t.getPositionY();
},
reverse: function() {
for (var t, e = this._points.slice(), i = e[0], o = 1; o < e.length; ++o) {
t = e[o];
e[o] = cc.pSub(t, i);
i = t;
}
var r = n(e);
i = r[r.length - 1];
r.pop();
i.x = -i.x;
i.y = -i.y;
r.unshift(i);
for (o = 1; o < r.length; ++o) {
(t = r[o]).x = -t.x;
t.y = -t.y;
t.x += i.x;
t.y += i.y;
r[o] = t;
i = t;
}
return cc.cardinalSplineBy(this._duration, r, this._tension);
},
updatePosition: function(t) {
var e = this._startPosition, i = t.x + e.x, n = t.y + e.y;
this._previousPosition.x = i;
this._previousPosition.y = n;
this.target.setPosition(i, n);
},
clone: function() {
var t = new cc.CardinalSplineBy();
t.initWithDuration(this._duration, o(this._points), this._tension);
return t;
}
});
cc.cardinalSplineBy = function(t, e, i) {
return new cc.CardinalSplineBy(t, e, i);
};
cc.CatmullRomTo = cc.CardinalSplineTo.extend({
ctor: function(t, e) {
e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
return cc.CardinalSplineTo.prototype.initWithDuration.call(this, t, e, .5);
},
clone: function() {
var t = new cc.CatmullRomTo();
t.initWithDuration(this._duration, o(this._points));
return t;
}
});
cc.catmullRomTo = function(t, e) {
return new cc.CatmullRomTo(t, e);
};
cc.CatmullRomBy = cc.CardinalSplineBy.extend({
ctor: function(t, e) {
cc.CardinalSplineBy.prototype.ctor.call(this);
e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
return cc.CardinalSplineTo.prototype.initWithDuration.call(this, t, e, .5);
},
clone: function() {
var t = new cc.CatmullRomBy();
t.initWithDuration(this._duration, o(this._points));
return t;
}
});
cc.catmullRomBy = function(t, e) {
return new cc.CatmullRomBy(t, e);
};
}), {} ],
6: [ (function(t, e, i) {
cc.ActionEase = cc.ActionInterval.extend({
_inner: null,
ctor: function(t) {
cc.ActionInterval.prototype.ctor.call(this);
t && this.initWithAction(t);
},
initWithAction: function(t) {
if (!t) throw new Error("cc.ActionEase.initWithAction(): action must be non nil");
if (this.initWithDuration(t.getDuration())) {
this._inner = t;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ActionEase();
t.initWithAction(this._inner.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._inner.startWithTarget(this.target);
},
stop: function() {
this._inner.stop();
cc.ActionInterval.prototype.stop.call(this);
},
update: function(t) {
this._inner.update(t);
},
reverse: function() {
return new cc.ActionEase(this._inner.reverse());
},
getInnerAction: function() {
return this._inner;
}
});
cc.actionEase = function(t) {
return new cc.ActionEase(t);
};
cc.EaseRateAction = cc.ActionEase.extend({
_rate: 0,
ctor: function(t, e) {
cc.ActionEase.prototype.ctor.call(this);
void 0 !== e && this.initWithAction(t, e);
},
setRate: function(t) {
this._rate = t;
},
getRate: function() {
return this._rate;
},
initWithAction: function(t, e) {
if (cc.ActionEase.prototype.initWithAction.call(this, t)) {
this._rate = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.EaseRateAction();
t.initWithAction(this._inner.clone(), this._rate);
return t;
},
reverse: function() {
return new cc.EaseRateAction(this._inner.reverse(), 1 / this._rate);
}
});
cc.easeRateAction = function(t, e) {
return new cc.EaseRateAction(t, e);
};
cc.EaseIn = cc.EaseRateAction.extend({
update: function(t) {
this._inner.update(Math.pow(t, this._rate));
},
reverse: function() {
return new cc.EaseIn(this._inner.reverse(), 1 / this._rate);
},
clone: function() {
var t = new cc.EaseIn();
t.initWithAction(this._inner.clone(), this._rate);
return t;
}
});
cc.easeIn = function(t) {
return {
_rate: t,
easing: function(t) {
return Math.pow(t, this._rate);
},
reverse: function() {
return cc.easeIn(1 / this._rate);
}
};
};
cc.EaseOut = cc.EaseRateAction.extend({
update: function(t) {
this._inner.update(Math.pow(t, 1 / this._rate));
},
reverse: function() {
return new cc.EaseOut(this._inner.reverse(), 1 / this._rate);
},
clone: function() {
var t = new cc.EaseOut();
t.initWithAction(this._inner.clone(), this._rate);
return t;
}
});
cc.easeOut = function(t) {
return {
_rate: t,
easing: function(t) {
return Math.pow(t, 1 / this._rate);
},
reverse: function() {
return cc.easeOut(1 / this._rate);
}
};
};
cc.EaseInOut = cc.EaseRateAction.extend({
update: function(t) {
(t *= 2) < 1 ? this._inner.update(.5 * Math.pow(t, this._rate)) : this._inner.update(1 - .5 * Math.pow(2 - t, this._rate));
},
clone: function() {
var t = new cc.EaseInOut();
t.initWithAction(this._inner.clone(), this._rate);
return t;
},
reverse: function() {
return new cc.EaseInOut(this._inner.reverse(), this._rate);
}
});
cc.easeInOut = function(t) {
return {
_rate: t,
easing: function(t) {
return (t *= 2) < 1 ? .5 * Math.pow(t, this._rate) : 1 - .5 * Math.pow(2 - t, this._rate);
},
reverse: function() {
return cc.easeInOut(this._rate);
}
};
};
cc.EaseExponentialIn = cc.ActionEase.extend({
update: function(t) {
this._inner.update(0 === t ? 0 : Math.pow(2, 10 * (t - 1)));
},
reverse: function() {
return new cc.EaseExponentialOut(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseExponentialIn();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeExponentialInObj = {
easing: function(t) {
return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
},
reverse: function() {
return cc._easeExponentialOutObj;
}
};
cc.easeExponentialIn = function() {
return cc._easeExponentialInObj;
};
cc.EaseExponentialOut = cc.ActionEase.extend({
update: function(t) {
this._inner.update(1 === t ? 1 : 1 - Math.pow(2, -10 * t));
},
reverse: function() {
return new cc.EaseExponentialIn(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseExponentialOut();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeExponentialOutObj = {
easing: function(t) {
return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
},
reverse: function() {
return cc._easeExponentialInObj;
}
};
cc.easeExponentialOut = function() {
return cc._easeExponentialOutObj;
};
cc.EaseExponentialInOut = cc.ActionEase.extend({
update: function(t) {
1 !== t && 0 !== t && (t = (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1))));
this._inner.update(t);
},
reverse: function() {
return new cc.EaseExponentialInOut(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseExponentialInOut();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeExponentialInOutObj = {
easing: function(t) {
return 1 !== t && 0 !== t ? (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1))) : t;
},
reverse: function() {
return cc._easeExponentialInOutObj;
}
};
cc.easeExponentialInOut = function() {
return cc._easeExponentialInOutObj;
};
cc.EaseSineIn = cc.ActionEase.extend({
update: function(t) {
t = 0 === t || 1 === t ? t : -1 * Math.cos(t * Math.PI / 2) + 1;
this._inner.update(t);
},
reverse: function() {
return new cc.EaseSineOut(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseSineIn();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeSineInObj = {
easing: function(t) {
return 0 === t || 1 === t ? t : -1 * Math.cos(t * Math.PI / 2) + 1;
},
reverse: function() {
return cc._easeSineOutObj;
}
};
cc.easeSineIn = function() {
return cc._easeSineInObj;
};
cc.EaseSineOut = cc.ActionEase.extend({
update: function(t) {
t = 0 === t || 1 === t ? t : Math.sin(t * Math.PI / 2);
this._inner.update(t);
},
reverse: function() {
return new cc.EaseSineIn(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseSineOut();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeSineOutObj = {
easing: function(t) {
return 0 === t || 1 === t ? t : Math.sin(t * Math.PI / 2);
},
reverse: function() {
return cc._easeSineInObj;
}
};
cc.easeSineOut = function() {
return cc._easeSineOutObj;
};
cc.EaseSineInOut = cc.ActionEase.extend({
update: function(t) {
t = 0 === t || 1 === t ? t : -.5 * (Math.cos(Math.PI * t) - 1);
this._inner.update(t);
},
clone: function() {
var t = new cc.EaseSineInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseSineInOut(this._inner.reverse());
}
});
cc._easeSineInOutObj = {
easing: function(t) {
return 0 === t || 1 === t ? t : -.5 * (Math.cos(Math.PI * t) - 1);
},
reverse: function() {
return cc._easeSineInOutObj;
}
};
cc.easeSineInOut = function() {
return cc._easeSineInOutObj;
};
cc.EaseElastic = cc.ActionEase.extend({
_period: .3,
ctor: function(t, e) {
cc.ActionEase.prototype.ctor.call(this);
t && this.initWithAction(t, e);
},
getPeriod: function() {
return this._period;
},
setPeriod: function(t) {
this._period = t;
},
initWithAction: function(t, e) {
cc.ActionEase.prototype.initWithAction.call(this, t);
this._period = null == e ? .3 : e;
return !0;
},
reverse: function() {
cc.logID(1009);
return null;
},
clone: function() {
var t = new cc.EaseElastic();
t.initWithAction(this._inner.clone(), this._period);
return t;
}
});
cc.EaseElasticIn = cc.EaseElastic.extend({
update: function(t) {
var e = 0;
if (0 === t || 1 === t) e = t; else {
var i = this._period / 4;
t -= 1;
e = -Math.pow(2, 10 * t) * Math.sin((t - i) * Math.PI * 2 / this._period);
}
this._inner.update(e);
},
reverse: function() {
return new cc.EaseElasticOut(this._inner.reverse(), this._period);
},
clone: function() {
var t = new cc.EaseElasticIn();
t.initWithAction(this._inner.clone(), this._period);
return t;
}
});
cc._easeElasticInObj = {
easing: function(t) {
if (0 === t || 1 === t) return t;
t -= 1;
return -Math.pow(2, 10 * t) * Math.sin((t - .075) * Math.PI * 2 / .3);
},
reverse: function() {
return cc._easeElasticOutObj;
}
};
cc.easeElasticIn = function(t) {
return t && .3 !== t ? {
_period: t,
easing: function(t) {
if (0 === t || 1 === t) return t;
t -= 1;
return -Math.pow(2, 10 * t) * Math.sin((t - this._period / 4) * Math.PI * 2 / this._period);
},
reverse: function() {
return cc.easeElasticOut(this._period);
}
} : cc._easeElasticInObj;
};
cc.EaseElasticOut = cc.EaseElastic.extend({
update: function(t) {
var e = 0;
if (0 === t || 1 === t) e = t; else {
var i = this._period / 4;
e = Math.pow(2, -10 * t) * Math.sin((t - i) * Math.PI * 2 / this._period) + 1;
}
this._inner.update(e);
},
reverse: function() {
return new cc.EaseElasticIn(this._inner.reverse(), this._period);
},
clone: function() {
var t = new cc.EaseElasticOut();
t.initWithAction(this._inner.clone(), this._period);
return t;
}
});
cc._easeElasticOutObj = {
easing: function(t) {
return 0 === t || 1 === t ? t : Math.pow(2, -10 * t) * Math.sin((t - .075) * Math.PI * 2 / .3) + 1;
},
reverse: function() {
return cc._easeElasticInObj;
}
};
cc.easeElasticOut = function(t) {
return t && .3 !== t ? {
_period: t,
easing: function(t) {
return 0 === t || 1 === t ? t : Math.pow(2, -10 * t) * Math.sin((t - this._period / 4) * Math.PI * 2 / this._period) + 1;
},
reverse: function() {
return cc.easeElasticIn(this._period);
}
} : cc._easeElasticOutObj;
};
cc.EaseElasticInOut = cc.EaseElastic.extend({
update: function(t) {
var e = 0, i = this._period;
if (0 === t || 1 === t) e = t; else {
t *= 2;
i || (i = this._period = .3 * 1.5);
var n = i / 4;
e = (t -= 1) < 0 ? -.5 * Math.pow(2, 10 * t) * Math.sin((t - n) * Math.PI * 2 / i) : Math.pow(2, -10 * t) * Math.sin((t - n) * Math.PI * 2 / i) * .5 + 1;
}
this._inner.update(e);
},
reverse: function() {
return new cc.EaseElasticInOut(this._inner.reverse(), this._period);
},
clone: function() {
var t = new cc.EaseElasticInOut();
t.initWithAction(this._inner.clone(), this._period);
return t;
}
});
cc.easeElasticInOut = function(t) {
return {
_period: t = t || .3,
easing: function(t) {
var e = 0, i = this._period;
if (0 === t || 1 === t) e = t; else {
t *= 2;
i || (i = this._period = .3 * 1.5);
var n = i / 4;
e = (t -= 1) < 0 ? -.5 * Math.pow(2, 10 * t) * Math.sin((t - n) * Math.PI * 2 / i) : Math.pow(2, -10 * t) * Math.sin((t - n) * Math.PI * 2 / i) * .5 + 1;
}
return e;
},
reverse: function() {
return cc.easeElasticInOut(this._period);
}
};
};
cc.EaseBounce = cc.ActionEase.extend({
bounceTime: function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
},
clone: function() {
var t = new cc.EaseBounce();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseBounce(this._inner.reverse());
}
});
cc.EaseBounceIn = cc.EaseBounce.extend({
update: function(t) {
var e = 1 - this.bounceTime(1 - t);
this._inner.update(e);
},
reverse: function() {
return new cc.EaseBounceOut(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseBounceIn();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._bounceTime = function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
};
cc._easeBounceInObj = {
easing: function(t) {
return 1 - cc._bounceTime(1 - t);
},
reverse: function() {
return cc._easeBounceOutObj;
}
};
cc.easeBounceIn = function() {
return cc._easeBounceInObj;
};
cc.EaseBounceOut = cc.EaseBounce.extend({
update: function(t) {
var e = this.bounceTime(t);
this._inner.update(e);
},
reverse: function() {
return new cc.EaseBounceIn(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseBounceOut();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeBounceOutObj = {
easing: function(t) {
return cc._bounceTime(t);
},
reverse: function() {
return cc._easeBounceInObj;
}
};
cc.easeBounceOut = function() {
return cc._easeBounceOutObj;
};
cc.EaseBounceInOut = cc.EaseBounce.extend({
update: function(t) {
var e = 0;
if (t < .5) {
t *= 2;
e = .5 * (1 - this.bounceTime(1 - t));
} else e = .5 * this.bounceTime(2 * t - 1) + .5;
this._inner.update(e);
},
clone: function() {
var t = new cc.EaseBounceInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseBounceInOut(this._inner.reverse());
}
});
cc._easeBounceInOutObj = {
easing: function(t) {
var e;
if (t < .5) {
t *= 2;
e = .5 * (1 - cc._bounceTime(1 - t));
} else e = .5 * cc._bounceTime(2 * t - 1) + .5;
return e;
},
reverse: function() {
return cc._easeBounceInOutObj;
}
};
cc.easeBounceInOut = function() {
return cc._easeBounceInOutObj;
};
cc.EaseBackIn = cc.ActionEase.extend({
update: function(t) {
t = 0 === t || 1 === t ? t : t * t * (2.70158 * t - 1.70158);
this._inner.update(t);
},
reverse: function() {
return new cc.EaseBackOut(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseBackIn();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeBackInObj = {
easing: function(t) {
return 0 === t || 1 === t ? t : t * t * (2.70158 * t - 1.70158);
},
reverse: function() {
return cc._easeBackOutObj;
}
};
cc.easeBackIn = function() {
return cc._easeBackInObj;
};
cc.EaseBackOut = cc.ActionEase.extend({
update: function(t) {
t -= 1;
this._inner.update(t * t * (2.70158 * t + 1.70158) + 1);
},
reverse: function() {
return new cc.EaseBackIn(this._inner.reverse());
},
clone: function() {
var t = new cc.EaseBackOut();
t.initWithAction(this._inner.clone());
return t;
}
});
cc._easeBackOutObj = {
easing: function(t) {
return (t -= 1) * t * (2.70158 * t + 1.70158) + 1;
},
reverse: function() {
return cc._easeBackInObj;
}
};
cc.easeBackOut = function() {
return cc._easeBackOutObj;
};
cc.EaseBackInOut = cc.ActionEase.extend({
update: function(t) {
var e = 2.5949095;
if ((t *= 2) < 1) this._inner.update(t * t * ((e + 1) * t - e) / 2); else {
t -= 2;
this._inner.update(t * t * ((e + 1) * t + e) / 2 + 1);
}
},
clone: function() {
var t = new cc.EaseBackInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseBackInOut(this._inner.reverse());
}
});
cc._easeBackInOutObj = {
easing: function(t) {
var e = 2.5949095;
return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) / 2 : (t -= 2) * t * ((e + 1) * t + e) / 2 + 1;
},
reverse: function() {
return cc._easeBackInOutObj;
}
};
cc.easeBackInOut = function() {
return cc._easeBackInOutObj;
};
cc.EaseBezierAction = cc.ActionEase.extend({
_p0: null,
_p1: null,
_p2: null,
_p3: null,
ctor: function(t) {
cc.ActionEase.prototype.ctor.call(this, t);
},
_updateTime: function(t, e, i, n, o) {
return Math.pow(1 - o, 3) * t + 3 * o * Math.pow(1 - o, 2) * e + 3 * Math.pow(o, 2) * (1 - o) * i + Math.pow(o, 3) * n;
},
update: function(t) {
var e = this._updateTime(this._p0, this._p1, this._p2, this._p3, t);
this._inner.update(e);
},
clone: function() {
var t = new cc.EaseBezierAction();
t.initWithAction(this._inner.clone());
t.setBezierParamer(this._p0, this._p1, this._p2, this._p3);
return t;
},
reverse: function() {
var t = new cc.EaseBezierAction(this._inner.reverse());
t.setBezierParamer(this._p3, this._p2, this._p1, this._p0);
return t;
},
setBezierParamer: function(t, e, i, n) {
this._p0 = t || 0;
this._p1 = e || 0;
this._p2 = i || 0;
this._p3 = n || 0;
}
});
cc.easeBezierAction = function(t, e, i, n) {
return {
easing: function(o) {
return cc.EaseBezierAction.prototype._updateTime(t, e, i, n, o);
},
reverse: function() {
return cc.easeBezierAction(n, i, e, t);
}
};
};
cc.EaseQuadraticActionIn = cc.ActionEase.extend({
_updateTime: function(t) {
return Math.pow(t, 2);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuadraticActionIn();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuadraticActionIn(this._inner.reverse());
}
});
cc._easeQuadraticActionIn = {
easing: cc.EaseQuadraticActionIn.prototype._updateTime,
reverse: function() {
return cc._easeQuadraticActionIn;
}
};
cc.easeQuadraticActionIn = function() {
return cc._easeQuadraticActionIn;
};
cc.EaseQuadraticActionOut = cc.ActionEase.extend({
_updateTime: function(t) {
return -t * (t - 2);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuadraticActionOut();
t.initWithAction();
return t;
},
reverse: function() {
return new cc.EaseQuadraticActionOut(this._inner.reverse());
}
});
cc._easeQuadraticActionOut = {
easing: cc.EaseQuadraticActionOut.prototype._updateTime,
reverse: function() {
return cc._easeQuadraticActionOut;
}
};
cc.easeQuadraticActionOut = function() {
return cc._easeQuadraticActionOut;
};
cc.EaseQuadraticActionInOut = cc.ActionEase.extend({
_updateTime: function(t) {
return (t *= 2) < 1 ? t * t * .5 : -.5 * (--t * (t - 2) - 1);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuadraticActionInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuadraticActionInOut(this._inner.reverse());
}
});
cc._easeQuadraticActionInOut = {
easing: cc.EaseQuadraticActionInOut.prototype._updateTime,
reverse: function() {
return cc._easeQuadraticActionInOut;
}
};
cc.easeQuadraticActionInOut = function() {
return cc._easeQuadraticActionInOut;
};
cc.EaseQuarticActionIn = cc.ActionEase.extend({
_updateTime: function(t) {
return t * t * t * t;
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuarticActionIn();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuarticActionIn(this._inner.reverse());
}
});
cc._easeQuarticActionIn = {
easing: cc.EaseQuarticActionIn.prototype._updateTime,
reverse: function() {
return cc._easeQuarticActionIn;
}
};
cc.easeQuarticActionIn = function() {
return cc._easeQuarticActionIn;
};
cc.EaseQuarticActionOut = cc.ActionEase.extend({
_updateTime: function(t) {
return -((t -= 1) * t * t * t - 1);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuarticActionOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuarticActionOut(this._inner.reverse());
}
});
cc._easeQuarticActionOut = {
easing: cc.EaseQuarticActionOut.prototype._updateTime,
reverse: function() {
return cc._easeQuarticActionOut;
}
};
cc.easeQuarticActionOut = function() {
return cc._easeQuarticActionOut;
};
cc.EaseQuarticActionInOut = cc.ActionEase.extend({
_updateTime: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuarticActionInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuarticActionInOut(this._inner.reverse());
}
});
cc._easeQuarticActionInOut = {
easing: cc.EaseQuarticActionInOut.prototype._updateTime,
reverse: function() {
return cc._easeQuarticActionInOut;
}
};
cc.easeQuarticActionInOut = function() {
return cc._easeQuarticActionInOut;
};
cc.EaseQuinticActionIn = cc.ActionEase.extend({
_updateTime: function(t) {
return t * t * t * t * t;
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuinticActionIn();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuinticActionIn(this._inner.reverse());
}
});
cc._easeQuinticActionIn = {
easing: cc.EaseQuinticActionIn.prototype._updateTime,
reverse: function() {
return cc._easeQuinticActionIn;
}
};
cc.easeQuinticActionIn = function() {
return cc._easeQuinticActionIn;
};
cc.EaseQuinticActionOut = cc.ActionEase.extend({
_updateTime: function(t) {
return (t -= 1) * t * t * t * t + 1;
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuinticActionOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuinticActionOut(this._inner.reverse());
}
});
cc._easeQuinticActionOut = {
easing: cc.EaseQuinticActionOut.prototype._updateTime,
reverse: function() {
return cc._easeQuinticActionOut;
}
};
cc.easeQuinticActionOut = function() {
return cc._easeQuinticActionOut;
};
cc.EaseQuinticActionInOut = cc.ActionEase.extend({
_updateTime: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseQuinticActionInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseQuinticActionInOut(this._inner.reverse());
}
});
cc._easeQuinticActionInOut = {
easing: cc.EaseQuinticActionInOut.prototype._updateTime,
reverse: function() {
return cc._easeQuinticActionInOut;
}
};
cc.easeQuinticActionInOut = function() {
return cc._easeQuinticActionInOut;
};
cc.EaseCircleActionIn = cc.ActionEase.extend({
_updateTime: function(t) {
return -1 * (Math.sqrt(1 - t * t) - 1);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseCircleActionIn();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseCircleActionIn(this._inner.reverse());
}
});
cc._easeCircleActionIn = {
easing: cc.EaseCircleActionIn.prototype._updateTime,
reverse: function() {
return cc._easeCircleActionIn;
}
};
cc.easeCircleActionIn = function() {
return cc._easeCircleActionIn;
};
cc.EaseCircleActionOut = cc.ActionEase.extend({
_updateTime: function(t) {
t -= 1;
return Math.sqrt(1 - t * t);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseCircleActionOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseCircleActionOut(this._inner.reverse());
}
});
cc._easeCircleActionOut = {
easing: cc.EaseCircleActionOut.prototype._updateTime,
reverse: function() {
return cc._easeCircleActionOut;
}
};
cc.easeCircleActionOut = function() {
return cc._easeCircleActionOut;
};
cc.EaseCircleActionInOut = cc.ActionEase.extend({
_updateTime: function(t) {
if ((t *= 2) < 1) return -.5 * (Math.sqrt(1 - t * t) - 1);
t -= 2;
return .5 * (Math.sqrt(1 - t * t) + 1);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseCircleActionInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseCircleActionInOut(this._inner.reverse());
}
});
cc._easeCircleActionInOut = {
easing: cc.EaseCircleActionInOut.prototype._updateTime,
reverse: function() {
return cc._easeCircleActionInOut;
}
};
cc.easeCircleActionInOut = function() {
return cc._easeCircleActionInOut;
};
cc.EaseCubicActionIn = cc.ActionEase.extend({
_updateTime: function(t) {
return t * t * t;
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseCubicActionIn();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseCubicActionIn(this._inner.reverse());
}
});
cc._easeCubicActionIn = {
easing: cc.EaseCubicActionIn.prototype._updateTime,
reverse: function() {
return cc._easeCubicActionIn;
}
};
cc.easeCubicActionIn = function() {
return cc._easeCubicActionIn;
};
cc.EaseCubicActionOut = cc.ActionEase.extend({
_updateTime: function(t) {
return (t -= 1) * t * t + 1;
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseCubicActionOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseCubicActionOut(this._inner.reverse());
}
});
cc._easeCubicActionOut = {
easing: cc.EaseCubicActionOut.prototype._updateTime,
reverse: function() {
return cc._easeCubicActionOut;
}
};
cc.easeCubicActionOut = function() {
return cc._easeCubicActionOut;
};
cc.EaseCubicActionInOut = cc.ActionEase.extend({
_updateTime: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
},
update: function(t) {
this._inner.update(this._updateTime(t));
},
clone: function() {
var t = new cc.EaseCubicActionInOut();
t.initWithAction(this._inner.clone());
return t;
},
reverse: function() {
return new cc.EaseCubicActionInOut(this._inner.reverse());
}
});
cc._easeCubicActionInOut = {
easing: cc.EaseCubicActionInOut.prototype._updateTime,
reverse: function() {
return cc._easeCubicActionInOut;
}
};
cc.easeCubicActionInOut = function() {
return cc._easeCubicActionInOut;
};
}), {} ],
7: [ (function(t, e, i) {
cc.ActionInstant = cc.FiniteTimeAction.extend({
isDone: function() {
return !0;
},
step: function(t) {
this.update(1);
},
update: function(t) {},
reverse: function() {
return this.clone();
},
clone: function() {
return new cc.ActionInstant();
}
});
cc.Show = cc.ActionInstant.extend({
update: function(t) {
for (var e = this.target.getComponentsInChildren(cc._SGComponent), i = 0; i < e.length; ++i) {
e[i].enabled = !0;
}
},
reverse: function() {
return new cc.Hide();
},
clone: function() {
return new cc.Show();
}
});
cc.show = function() {
return new cc.Show();
};
cc.Hide = cc.ActionInstant.extend({
update: function(t) {
for (var e = this.target.getComponentsInChildren(cc._SGComponent), i = 0; i < e.length; ++i) {
e[i].enabled = !1;
}
},
reverse: function() {
return new cc.Show();
},
clone: function() {
return new cc.Hide();
}
});
cc.hide = function() {
return new cc.Hide();
};
cc.ToggleVisibility = cc.ActionInstant.extend({
update: function(t) {
for (var e = this.target.getComponentsInChildren(cc._SGComponent), i = 0; i < e.length; ++i) {
var n = e[i];
n.enabled = !n.enabled;
}
},
reverse: function() {
return new cc.ToggleVisibility();
},
clone: function() {
return new cc.ToggleVisibility();
}
});
cc.toggleVisibility = function() {
return new cc.ToggleVisibility();
};
cc.RemoveSelf = cc.ActionInstant.extend({
_isNeedCleanUp: !0,
ctor: function(t) {
cc.FiniteTimeAction.prototype.ctor.call(this);
void 0 !== t && this.init(t);
},
update: function(t) {
this.target.removeFromParent(this._isNeedCleanUp);
},
init: function(t) {
this._isNeedCleanUp = t;
return !0;
},
reverse: function() {
return new cc.RemoveSelf(this._isNeedCleanUp);
},
clone: function() {
return new cc.RemoveSelf(this._isNeedCleanUp);
}
});
cc.removeSelf = function(t) {
return new cc.RemoveSelf(t);
};
cc.FlipX = cc.ActionInstant.extend({
_flippedX: !1,
ctor: function(t) {
cc.FiniteTimeAction.prototype.ctor.call(this);
this._flippedX = !1;
void 0 !== t && this.initWithFlipX(t);
},
initWithFlipX: function(t) {
this._flippedX = t;
return !0;
},
update: function(t) {
this.target.scaleX = Math.abs(this.target.scaleX) * (this._flippedX ? -1 : 1);
},
reverse: function() {
return new cc.FlipX(!this._flippedX);
},
clone: function() {
var t = new cc.FlipX();
t.initWithFlipX(this._flippedX);
return t;
}
});
cc.flipX = function(t) {
return new cc.FlipX(t);
};
cc.FlipY = cc.ActionInstant.extend({
_flippedY: !1,
ctor: function(t) {
cc.FiniteTimeAction.prototype.ctor.call(this);
this._flippedY = !1;
void 0 !== t && this.initWithFlipY(t);
},
initWithFlipY: function(t) {
this._flippedY = t;
return !0;
},
update: function(t) {
this.target.scaleY = Math.abs(this.target.scaleY) * (this._flippedY ? -1 : 1);
},
reverse: function() {
return new cc.FlipY(!this._flippedY);
},
clone: function() {
var t = new cc.FlipY();
t.initWithFlipY(this._flippedY);
return t;
}
});
cc.flipY = function(t) {
return new cc.FlipY(t);
};
cc.Place = cc.ActionInstant.extend({
_x: 0,
_y: 0,
ctor: function(t, e) {
cc.FiniteTimeAction.prototype.ctor.call(this);
this._x = 0;
this._y = 0;
if (void 0 !== t) {
if (void 0 !== t.x) {
e = t.y;
t = t.x;
}
this.initWithPosition(t, e);
}
},
initWithPosition: function(t, e) {
this._x = t;
this._y = e;
return !0;
},
update: function(t) {
this.target.setPosition(this._x, this._y);
},
clone: function() {
var t = new cc.Place();
t.initWithPosition(this._x, this._y);
return t;
}
});
cc.place = function(t, e) {
return new cc.Place(t, e);
};
cc.CallFunc = cc.ActionInstant.extend({
_selectorTarget: null,
_function: null,
_data: null,
ctor: function(t, e, i) {
cc.FiniteTimeAction.prototype.ctor.call(this);
this.initWithFunction(t, e, i);
},
initWithFunction: function(t, e, i) {
t && (this._function = t);
e && (this._selectorTarget = e);
void 0 !== i && (this._data = i);
return !0;
},
execute: function() {
this._function && this._function.call(this._selectorTarget, this.target, this._data);
},
update: function(t) {
this.execute();
},
getTargetCallback: function() {
return this._selectorTarget;
},
setTargetCallback: function(t) {
if (t !== this._selectorTarget) {
this._selectorTarget && (this._selectorTarget = null);
this._selectorTarget = t;
}
},
clone: function() {
var t = new cc.CallFunc();
t.initWithFunction(this._function, this._selectorTarget, this._data);
return t;
}
});
cc.callFunc = function(t, e, i) {
return new cc.CallFunc(t, e, i);
};
}), {} ],
8: [ (function(t, e, i) {
cc.ActionInterval = cc.FiniteTimeAction.extend({
_elapsed: 0,
_firstTick: !1,
_easeList: null,
_timesForRepeat: 1,
_repeatForever: !1,
_repeatMethod: !1,
_speed: 1,
_speedMethod: !1,
ctor: function(t) {
this._speed = 1;
this._timesForRepeat = 1;
this._repeatForever = !1;
this.MAX_VALUE = 2;
this._repeatMethod = !1;
this._speedMethod = !1;
cc.FiniteTimeAction.prototype.ctor.call(this);
void 0 !== t && this.initWithDuration(t);
},
getElapsed: function() {
return this._elapsed;
},
initWithDuration: function(t) {
this._duration = 0 === t ? cc.macro.FLT_EPSILON : t;
this._elapsed = 0;
this._firstTick = !0;
return !0;
},
isDone: function() {
return this._elapsed >= this._duration;
},
_cloneDecoration: function(t) {
t._repeatForever = this._repeatForever;
t._speed = this._speed;
t._timesForRepeat = this._timesForRepeat;
t._easeList = this._easeList;
t._speedMethod = this._speedMethod;
t._repeatMethod = this._repeatMethod;
},
_reverseEaseList: function(t) {
if (this._easeList) {
t._easeList = [];
for (var e = 0; e < this._easeList.length; e++) t._easeList.push(this._easeList[e].reverse());
}
},
clone: function() {
var t = new cc.ActionInterval(this._duration);
this._cloneDecoration(t);
return t;
},
easing: function(t) {
this._easeList ? this._easeList.length = 0 : this._easeList = [];
for (var e = 0; e < arguments.length; e++) this._easeList.push(arguments[e]);
return this;
},
_computeEaseTime: function(t) {
var e = this._easeList;
if (!e || 0 === e.length) return t;
for (var i = 0, n = e.length; i < n; i++) t = e[i].easing(t);
return t;
},
step: function(t) {
if (this._firstTick) {
this._firstTick = !1;
this._elapsed = 0;
} else this._elapsed += t;
var e = this._elapsed / (this._duration > 1.192092896e-7 ? this._duration : 1.192092896e-7);
e = 1 > e ? e : 1;
this.update(e > 0 ? e : 0);
if (this._repeatMethod && this._timesForRepeat > 1 && this.isDone()) {
this._repeatForever || this._timesForRepeat--;
this.startWithTarget(this.target);
this.step(this._elapsed - this._duration);
}
},
startWithTarget: function(t) {
cc.Action.prototype.startWithTarget.call(this, t);
this._elapsed = 0;
this._firstTick = !0;
},
reverse: function() {
cc.logID(1010);
return null;
},
setAmplitudeRate: function(t) {
cc.logID(1011);
},
getAmplitudeRate: function() {
cc.logID(1012);
return 0;
},
speed: function(t) {
if (t <= 0) {
cc.logID(1013);
return this;
}
this._speedMethod = !0;
this._speed *= t;
return this;
},
getSpeed: function() {
return this._speed;
},
setSpeed: function(t) {
this._speed = t;
return this;
},
repeat: function(t) {
t = Math.round(t);
if (isNaN(t) || t < 1) {
cc.logID(1014);
return this;
}
this._repeatMethod = !0;
this._timesForRepeat *= t;
return this;
},
repeatForever: function() {
this._repeatMethod = !0;
this._timesForRepeat = this.MAX_VALUE;
this._repeatForever = !0;
return this;
}
});
cc.actionInterval = function(t) {
return new cc.ActionInterval(t);
};
cc.Sequence = cc.ActionInterval.extend({
_actions: null,
_split: null,
_last: 0,
_reversed: !1,
ctor: function(t) {
cc.ActionInterval.prototype.ctor.call(this);
this._actions = [];
var e = t instanceof Array ? t : arguments;
if (1 !== e.length) {
var i = e.length - 1;
i >= 0 && null == e[i] && cc.logID(1015);
if (i >= 0) {
for (var n, o = e[0], r = 1; r < i; r++) if (e[r]) {
n = o;
o = cc.Sequence._actionOneTwo(n, e[r]);
}
this.initWithTwoActions(o, e[i]);
}
} else cc.errorID(1019);
},
initWithTwoActions: function(t, e) {
if (!t || !e) throw new Error("cc.Sequence.initWithTwoActions(): arguments must all be non nil");
var i = t._duration + e._duration;
this.initWithDuration(i);
this._actions[0] = t;
this._actions[1] = e;
return !0;
},
clone: function() {
var t = new cc.Sequence();
this._cloneDecoration(t);
t.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._split = this._actions[0]._duration / this._duration;
this._last = -1;
},
stop: function() {
-1 !== this._last && this._actions[this._last].stop();
cc.Action.prototype.stop.call(this);
},
update: function(t) {
var e, i, n = 0, o = this._split, r = this._actions, s = this._last;
if ((t = this._computeEaseTime(t)) < o) {
e = 0 !== o ? t / o : 1;
if (0 === n && 1 === s && this._reversed) {
r[1].update(0);
r[1].stop();
}
} else {
n = 1;
e = 1 === o ? 1 : (t - o) / (1 - o);
if (-1 === s) {
r[0].startWithTarget(this.target);
r[0].update(1);
r[0].stop();
}
if (0 === s) {
r[0].update(1);
r[0].stop();
}
}
i = r[n];
if (s !== n || !i.isDone()) {
s !== n && i.startWithTarget(this.target);
e *= i._timesForRepeat;
i.update(e > 1 ? e % 1 : e);
this._last = n;
}
},
reverse: function() {
var t = cc.Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
this._cloneDecoration(t);
this._reverseEaseList(t);
t._reversed = !0;
return t;
}
});
cc.sequence = function(t) {
var e = t instanceof Array ? t : arguments;
if (1 === e.length) {
cc.errorID(1019);
return null;
}
var i = e.length - 1;
i >= 0 && null == e[i] && cc.logID(1015);
var n = null;
if (i >= 0) {
n = e[0];
for (var o = 1; o <= i; o++) e[o] && (n = cc.Sequence._actionOneTwo(n, e[o]));
}
return n;
};
cc.Sequence._actionOneTwo = function(t, e) {
var i = new cc.Sequence();
i.initWithTwoActions(t, e);
return i;
};
cc.Repeat = cc.ActionInterval.extend({
_times: 0,
_total: 0,
_nextDt: 0,
_actionInstant: !1,
_innerAction: null,
ctor: function(t, e) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== e && this.initWithAction(t, e);
},
initWithAction: function(t, e) {
var i = t._duration * e;
if (this.initWithDuration(i)) {
this._times = e;
this._innerAction = t;
if (t instanceof cc.ActionInstant) {
this._actionInstant = !0;
this._times -= 1;
}
this._total = 0;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.Repeat();
this._cloneDecoration(t);
t.initWithAction(this._innerAction.clone(), this._times);
return t;
},
startWithTarget: function(t) {
this._total = 0;
this._nextDt = this._innerAction._duration / this._duration;
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._innerAction.startWithTarget(t);
},
stop: function() {
this._innerAction.stop();
cc.Action.prototype.stop.call(this);
},
update: function(t) {
t = this._computeEaseTime(t);
var e = this._innerAction, i = this._duration, n = this._times, o = this._nextDt;
if (t >= o) {
for (;t > o && this._total < n; ) {
e.update(1);
this._total++;
e.stop();
e.startWithTarget(this.target);
o += e._duration / i;
this._nextDt = o;
}
if (t >= 1 && this._total < n) {
e.update(1);
this._total++;
}
this._actionInstant || (this._total === n ? e.stop() : e.update(t - (o - e._duration / i)));
} else e.update(t * n % 1);
},
isDone: function() {
return this._total === this._times;
},
reverse: function() {
var t = new cc.Repeat(this._innerAction.reverse(), this._times);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
setInnerAction: function(t) {
this._innerAction !== t && (this._innerAction = t);
},
getInnerAction: function() {
return this._innerAction;
}
});
cc.repeat = function(t, e) {
return new cc.Repeat(t, e);
};
cc.RepeatForever = cc.ActionInterval.extend({
_innerAction: null,
ctor: function(t) {
cc.ActionInterval.prototype.ctor.call(this);
this._innerAction = null;
t && this.initWithAction(t);
},
initWithAction: function(t) {
if (!t) throw new Error("cc.RepeatForever.initWithAction(): action must be non null");
this._innerAction = t;
return !0;
},
clone: function() {
var t = new cc.RepeatForever();
this._cloneDecoration(t);
t.initWithAction(this._innerAction.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._innerAction.startWithTarget(t);
},
step: function(t) {
var e = this._innerAction;
e.step(t);
if (e.isDone()) {
e.startWithTarget(this.target);
e.step(e.getElapsed() - e._duration);
}
},
isDone: function() {
return !1;
},
reverse: function() {
var t = new cc.RepeatForever(this._innerAction.reverse());
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
setInnerAction: function(t) {
this._innerAction !== t && (this._innerAction = t);
},
getInnerAction: function() {
return this._innerAction;
}
});
cc.repeatForever = function(t) {
return new cc.RepeatForever(t);
};
cc.Spawn = cc.ActionInterval.extend({
_one: null,
_two: null,
ctor: function(t) {
cc.ActionInterval.prototype.ctor.call(this);
this._one = null;
this._two = null;
var e = t instanceof Array ? t : arguments;
if (1 !== e.length) {
var i = e.length - 1;
i >= 0 && null == e[i] && cc.logID(1015);
if (i >= 0) {
for (var n, o = e[0], r = 1; r < i; r++) if (e[r]) {
n = o;
o = cc.Spawn._actionOneTwo(n, e[r]);
}
this.initWithTwoActions(o, e[i]);
}
} else cc.errorID(1020);
},
initWithTwoActions: function(t, e) {
if (!t || !e) throw new Error("cc.Spawn.initWithTwoActions(): arguments must all be non null");
var i = !1, n = t._duration, o = e._duration;
if (this.initWithDuration(Math.max(n, o))) {
this._one = t;
this._two = e;
n > o ? this._two = cc.Sequence._actionOneTwo(e, cc.delayTime(n - o)) : n < o && (this._one = cc.Sequence._actionOneTwo(t, cc.delayTime(o - n)));
i = !0;
}
return i;
},
clone: function() {
var t = new cc.Spawn();
this._cloneDecoration(t);
t.initWithTwoActions(this._one.clone(), this._two.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._one.startWithTarget(t);
this._two.startWithTarget(t);
},
stop: function() {
this._one.stop();
this._two.stop();
cc.Action.prototype.stop.call(this);
},
update: function(t) {
t = this._computeEaseTime(t);
this._one && this._one.update(t);
this._two && this._two.update(t);
},
reverse: function() {
var t = cc.Spawn._actionOneTwo(this._one.reverse(), this._two.reverse());
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.spawn = function(t) {
var e = t instanceof Array ? t : arguments;
if (1 === e.length) {
cc.errorID(1020);
return null;
}
e.length > 0 && null == e[e.length - 1] && cc.logID(1015);
for (var i = e[0], n = 1; n < e.length; n++) null != e[n] && (i = cc.Spawn._actionOneTwo(i, e[n]));
return i;
};
cc.Spawn._actionOneTwo = function(t, e) {
var i = new cc.Spawn();
i.initWithTwoActions(t, e);
return i;
};
cc.RotateTo = cc.ActionInterval.extend({
_dstAngleX: 0,
_startAngleX: 0,
_diffAngleX: 0,
_dstAngleY: 0,
_startAngleY: 0,
_diffAngleY: 0,
ctor: function(t, e, i) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== e && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._dstAngleX = e || 0;
this._dstAngleY = void 0 !== i ? i : this._dstAngleX;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.RotateTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._dstAngleX, this._dstAngleY);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.rotationX % 360, i = this._dstAngleX - e;
i > 180 && (i -= 360);
i < -180 && (i += 360);
this._startAngleX = e;
this._diffAngleX = i;
this._startAngleY = t.rotationY % 360;
var n = this._dstAngleY - this._startAngleY;
n > 180 && (n -= 360);
n < -180 && (n += 360);
this._diffAngleY = n;
},
reverse: function() {
cc.logID(1016);
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
this.target.rotationX = this._startAngleX + this._diffAngleX * t;
this.target.rotationY = this._startAngleY + this._diffAngleY * t;
}
}
});
cc.rotateTo = function(t, e, i) {
return new cc.RotateTo(t, e, i);
};
cc.RotateBy = cc.ActionInterval.extend({
_angleX: 0,
_startAngleX: 0,
_angleY: 0,
_startAngleY: 0,
ctor: function(t, e, i) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== e && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._angleX = e || 0;
this._angleY = void 0 !== i ? i : this._angleX;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.RotateBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._angleX, this._angleY);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._startAngleX = t.rotationX;
this._startAngleY = t.rotationY;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
this.target.rotationX = this._startAngleX + this._angleX * t;
this.target.rotationY = this._startAngleY + this._angleY * t;
}
},
reverse: function() {
var t = new cc.RotateBy(this._duration, -this._angleX, -this._angleY);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.rotateBy = function(t, e, i) {
return new cc.RotateBy(t, e, i);
};
cc.MoveBy = cc.ActionInterval.extend({
_positionDelta: null,
_startPosition: null,
_previousPosition: null,
ctor: function(t, e, i) {
cc.ActionInterval.prototype.ctor.call(this);
this._positionDelta = cc.p(0, 0);
this._startPosition = cc.p(0, 0);
this._previousPosition = cc.p(0, 0);
void 0 !== e && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
if (void 0 !== e.x) {
i = e.y;
e = e.x;
}
this._positionDelta.x = e;
this._positionDelta.y = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.MoveBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._positionDelta);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.getPositionX(), i = t.getPositionY();
this._previousPosition.x = e;
this._previousPosition.y = i;
this._startPosition.x = e;
this._startPosition.y = i;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
var e = this._positionDelta.x * t, i = this._positionDelta.y * t, n = this._startPosition;
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var o = this.target.getPositionX(), r = this.target.getPositionY(), s = this._previousPosition;
n.x = n.x + o - s.x;
n.y = n.y + r - s.y;
e += n.x;
i += n.y;
s.x = e;
s.y = i;
this.target.setPosition(e, i);
} else this.target.setPosition(n.x + e, n.y + i);
}
},
reverse: function() {
var t = new cc.MoveBy(this._duration, cc.p(-this._positionDelta.x, -this._positionDelta.y));
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.moveBy = function(t, e, i) {
return new cc.MoveBy(t, e, i);
};
cc.MoveTo = cc.MoveBy.extend({
_endPosition: null,
ctor: function(t, e, i) {
cc.MoveBy.prototype.ctor.call(this);
this._endPosition = cc.p(0, 0);
void 0 !== e && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.MoveBy.prototype.initWithDuration.call(this, t, e, i)) {
if (void 0 !== e.x) {
i = e.y;
e = e.x;
}
this._endPosition.x = e;
this._endPosition.y = i;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.MoveTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endPosition);
return t;
},
startWithTarget: function(t) {
cc.MoveBy.prototype.startWithTarget.call(this, t);
this._positionDelta.x = this._endPosition.x - t.getPositionX();
this._positionDelta.y = this._endPosition.y - t.getPositionY();
}
});
cc.moveTo = function(t, e, i) {
return new cc.MoveTo(t, e, i);
};
cc.SkewTo = cc.ActionInterval.extend({
_skewX: 0,
_skewY: 0,
_startSkewX: 0,
_startSkewY: 0,
_endSkewX: 0,
_endSkewY: 0,
_deltaX: 0,
_deltaY: 0,
ctor: function(t, e, i) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== i && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
var n = !1;
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._endSkewX = e;
this._endSkewY = i;
n = !0;
}
return n;
},
clone: function() {
var t = new cc.SkewTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endSkewX, this._endSkewY);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._startSkewX = t.skewX % 180;
this._deltaX = this._endSkewX - this._startSkewX;
this._deltaX > 180 && (this._deltaX -= 360);
this._deltaX < -180 && (this._deltaX += 360);
this._startSkewY = t.skewY % 360;
this._deltaY = this._endSkewY - this._startSkewY;
this._deltaY > 180 && (this._deltaY -= 360);
this._deltaY < -180 && (this._deltaY += 360);
},
update: function(t) {
t = this._computeEaseTime(t);
this.target.skewX = this._startSkewX + this._deltaX * t;
this.target.skewY = this._startSkewY + this._deltaY * t;
}
});
cc.skewTo = function(t, e, i) {
return new cc.SkewTo(t, e, i);
};
cc.SkewBy = cc.SkewTo.extend({
ctor: function(t, e, i) {
cc.SkewTo.prototype.ctor.call(this);
void 0 !== i && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
var n = !1;
if (cc.SkewTo.prototype.initWithDuration.call(this, t, e, i)) {
this._skewX = e;
this._skewY = i;
n = !0;
}
return n;
},
clone: function() {
var t = new cc.SkewBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._skewX, this._skewY);
return t;
},
startWithTarget: function(t) {
cc.SkewTo.prototype.startWithTarget.call(this, t);
this._deltaX = this._skewX;
this._deltaY = this._skewY;
this._endSkewX = this._startSkewX + this._deltaX;
this._endSkewY = this._startSkewY + this._deltaY;
},
reverse: function() {
var t = new cc.SkewBy(this._duration, -this._skewX, -this._skewY);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.skewBy = function(t, e, i) {
return new cc.SkewBy(t, e, i);
};
cc.JumpBy = cc.ActionInterval.extend({
_startPosition: null,
_delta: null,
_height: 0,
_jumps: 0,
_previousPosition: null,
ctor: function(t, e, i, n, o) {
cc.ActionInterval.prototype.ctor.call(this);
this._startPosition = cc.p(0, 0);
this._previousPosition = cc.p(0, 0);
this._delta = cc.p(0, 0);
void 0 !== n && this.initWithDuration(t, e, i, n, o);
},
initWithDuration: function(t, e, i, n, o) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
if (void 0 === o) {
o = n;
n = i;
i = e.y;
e = e.x;
}
this._delta.x = e;
this._delta.y = i;
this._height = n;
this._jumps = o;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.JumpBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._delta, this._height, this._jumps);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.getPositionX(), i = t.getPositionY();
this._previousPosition.x = e;
this._previousPosition.y = i;
this._startPosition.x = e;
this._startPosition.y = i;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
var e = t * this._jumps % 1, i = 4 * this._height * e * (1 - e);
i += this._delta.y * t;
var n = this._delta.x * t, o = this._startPosition;
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var r = this.target.getPositionX(), s = this.target.getPositionY(), c = this._previousPosition;
o.x = o.x + r - c.x;
o.y = o.y + s - c.y;
n += o.x;
i += o.y;
c.x = n;
c.y = i;
this.target.setPosition(n, i);
} else this.target.setPosition(o.x + n, o.y + i);
}
},
reverse: function() {
var t = new cc.JumpBy(this._duration, cc.p(-this._delta.x, -this._delta.y), this._height, this._jumps);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.jumpBy = function(t, e, i, n, o) {
return new cc.JumpBy(t, e, i, n, o);
};
cc.JumpTo = cc.JumpBy.extend({
_endPosition: null,
ctor: function(t, e, i, n, o) {
cc.JumpBy.prototype.ctor.call(this);
this._endPosition = cc.p(0, 0);
void 0 !== n && this.initWithDuration(t, e, i, n, o);
},
initWithDuration: function(t, e, i, n, o) {
if (cc.JumpBy.prototype.initWithDuration.call(this, t, e, i, n, o)) {
if (void 0 === o) {
i = e.y;
e = e.x;
}
this._endPosition.x = e;
this._endPosition.y = i;
return !0;
}
return !1;
},
startWithTarget: function(t) {
cc.JumpBy.prototype.startWithTarget.call(this, t);
this._delta.x = this._endPosition.x - this._startPosition.x;
this._delta.y = this._endPosition.y - this._startPosition.y;
},
clone: function() {
var t = new cc.JumpTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endPosition, this._height, this._jumps);
return t;
}
});
cc.jumpTo = function(t, e, i, n, o) {
return new cc.JumpTo(t, e, i, n, o);
};
cc.bezierAt = function(t, e, i, n, o) {
return Math.pow(1 - o, 3) * t + 3 * o * Math.pow(1 - o, 2) * e + 3 * Math.pow(o, 2) * (1 - o) * i + Math.pow(o, 3) * n;
};
cc.BezierBy = cc.ActionInterval.extend({
_config: null,
_startPosition: null,
_previousPosition: null,
ctor: function(t, e) {
cc.ActionInterval.prototype.ctor.call(this);
this._config = [];
this._startPosition = cc.p(0, 0);
this._previousPosition = cc.p(0, 0);
e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._config = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.BezierBy();
this._cloneDecoration(t);
for (var e = [], i = 0; i < this._config.length; i++) {
var n = this._config[i];
e.push(cc.p(n.x, n.y));
}
t.initWithDuration(this._duration, e);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.getPositionX(), i = t.getPositionY();
this._previousPosition.x = e;
this._previousPosition.y = i;
this._startPosition.x = e;
this._startPosition.y = i;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
var e = this._config, i = e[0].x, n = e[1].x, o = e[2].x, r = e[0].y, s = e[1].y, c = e[2].y, a = cc.bezierAt(0, i, n, o, t), h = cc.bezierAt(0, r, s, c, t), l = this._startPosition;
if (cc.macro.ENABLE_STACKABLE_ACTIONS) {
var u = this.target.getPositionX(), d = this.target.getPositionY(), f = this._previousPosition;
l.x = l.x + u - f.x;
l.y = l.y + d - f.y;
a += l.x;
h += l.y;
f.x = a;
f.y = h;
this.target.setPosition(a, h);
} else this.target.setPosition(l.x + a, l.y + h);
}
},
reverse: function() {
var t = this._config, e = [ cc.pAdd(t[1], cc.pNeg(t[2])), cc.pAdd(t[0], cc.pNeg(t[2])), cc.pNeg(t[2]) ], i = new cc.BezierBy(this._duration, e);
this._cloneDecoration(i);
this._reverseEaseList(i);
return i;
}
});
cc.bezierBy = function(t, e) {
return new cc.BezierBy(t, e);
};
cc.BezierTo = cc.BezierBy.extend({
_toConfig: null,
ctor: function(t, e) {
cc.BezierBy.prototype.ctor.call(this);
this._toConfig = [];
e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._toConfig = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.BezierTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toConfig);
return t;
},
startWithTarget: function(t) {
cc.BezierBy.prototype.startWithTarget.call(this, t);
var e = this._startPosition, i = this._toConfig, n = this._config;
n[0] = cc.pSub(i[0], e);
n[1] = cc.pSub(i[1], e);
n[2] = cc.pSub(i[2], e);
}
});
cc.bezierTo = function(t, e) {
return new cc.BezierTo(t, e);
};
cc.ScaleTo = cc.ActionInterval.extend({
_scaleX: 1,
_scaleY: 1,
_startScaleX: 1,
_startScaleY: 1,
_endScaleX: 0,
_endScaleY: 0,
_deltaX: 0,
_deltaY: 0,
ctor: function(t, e, i) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== e && this.initWithDuration(t, e, i);
},
initWithDuration: function(t, e, i) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._endScaleX = e;
this._endScaleY = null != i ? i : e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ScaleTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._startScaleX = t.scaleX;
this._startScaleY = t.scaleY;
this._deltaX = this._endScaleX - this._startScaleX;
this._deltaY = this._endScaleY - this._startScaleY;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target) {
this.target.scaleX = this._startScaleX + this._deltaX * t;
this.target.scaleY = this._startScaleY + this._deltaY * t;
}
}
});
cc.scaleTo = function(t, e, i) {
return new cc.ScaleTo(t, e, i);
};
cc.ScaleBy = cc.ScaleTo.extend({
startWithTarget: function(t) {
cc.ScaleTo.prototype.startWithTarget.call(this, t);
this._deltaX = this._startScaleX * this._endScaleX - this._startScaleX;
this._deltaY = this._startScaleY * this._endScaleY - this._startScaleY;
},
reverse: function() {
var t = new cc.ScaleBy(this._duration, 1 / this._endScaleX, 1 / this._endScaleY);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.ScaleBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
return t;
}
});
cc.scaleBy = function(t, e, i) {
return new cc.ScaleBy(t, e, i);
};
cc.Blink = cc.ActionInterval.extend({
_times: 0,
_originalState: !1,
ctor: function(t, e) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._times = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.Blink();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._times);
return t;
},
update: function(t) {
t = this._computeEaseTime(t);
if (this.target && !this.isDone()) {
var e = 1 / this._times, i = t % e;
this.target.opacity = i > e / 2 ? 255 : 0;
}
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._originalState = t.opacity;
},
stop: function() {
this.target.opacity = this._originalState;
cc.ActionInterval.prototype.stop.call(this);
},
reverse: function() {
var t = new cc.Blink(this._duration, this._times);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.blink = function(t, e) {
return new cc.Blink(t, e);
};
cc.FadeTo = cc.ActionInterval.extend({
_toOpacity: 0,
_fromOpacity: 0,
ctor: function(t, e) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== e && this.initWithDuration(t, e);
},
initWithDuration: function(t, e) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._toOpacity = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.FadeTo();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toOpacity);
return t;
},
update: function(t) {
t = this._computeEaseTime(t);
var e = void 0 !== this._fromOpacity ? this._fromOpacity : 255;
this.target.opacity = e + (this._toOpacity - e) * t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._fromOpacity = t.opacity;
}
});
cc.fadeTo = function(t, e) {
return new cc.FadeTo(t, e);
};
cc.FadeIn = cc.FadeTo.extend({
_reverseAction: null,
ctor: function(t) {
cc.FadeTo.prototype.ctor.call(this);
null == t && (t = 0);
this.initWithDuration(t, 255);
},
reverse: function() {
var t = new cc.FadeOut();
t.initWithDuration(this._duration, 0);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.FadeIn();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toOpacity);
return t;
},
startWithTarget: function(t) {
this._reverseAction && (this._toOpacity = this._reverseAction._fromOpacity);
cc.FadeTo.prototype.startWithTarget.call(this, t);
}
});
cc.fadeIn = function(t) {
return new cc.FadeIn(t);
};
cc.FadeOut = cc.FadeTo.extend({
ctor: function(t) {
cc.FadeTo.prototype.ctor.call(this);
null == t && (t = 0);
this.initWithDuration(t, 0);
},
reverse: function() {
var t = new cc.FadeIn();
t._reverseAction = this;
t.initWithDuration(this._duration, 255);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.FadeOut();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._toOpacity);
return t;
}
});
cc.fadeOut = function(t) {
return new cc.FadeOut(t);
};
cc.TintTo = cc.ActionInterval.extend({
_to: null,
_from: null,
ctor: function(t, e, i, n) {
cc.ActionInterval.prototype.ctor.call(this);
this._to = cc.color(0, 0, 0);
this._from = cc.color(0, 0, 0);
if (e instanceof cc.Color) {
n = e.b;
i = e.g;
e = e.r;
}
void 0 !== n && this.initWithDuration(t, e, i, n);
},
initWithDuration: function(t, e, i, n) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._to = cc.color(e, i, n);
return !0;
}
return !1;
},
clone: function() {
var t = new cc.TintTo();
this._cloneDecoration(t);
var e = this._to;
t.initWithDuration(this._duration, e.r, e.g, e.b);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._from = this.target.color;
},
update: function(t) {
t = this._computeEaseTime(t);
var e = this._from, i = this._to;
e && this.target.setColor(cc.color(e.r + (i.r - e.r) * t, e.g + (i.g - e.g) * t, e.b + (i.b - e.b) * t));
}
});
cc.tintTo = function(t, e, i, n) {
return new cc.TintTo(t, e, i, n);
};
cc.TintBy = cc.ActionInterval.extend({
_deltaR: 0,
_deltaG: 0,
_deltaB: 0,
_fromR: 0,
_fromG: 0,
_fromB: 0,
ctor: function(t, e, i, n) {
cc.ActionInterval.prototype.ctor.call(this);
void 0 !== n && this.initWithDuration(t, e, i, n);
},
initWithDuration: function(t, e, i, n) {
if (cc.ActionInterval.prototype.initWithDuration.call(this, t)) {
this._deltaR = e;
this._deltaG = i;
this._deltaB = n;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.TintBy();
this._cloneDecoration(t);
t.initWithDuration(this._duration, this._deltaR, this._deltaG, this._deltaB);
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
var e = t.color;
this._fromR = e.r;
this._fromG = e.g;
this._fromB = e.b;
},
update: function(t) {
t = this._computeEaseTime(t);
this.target.color = cc.color(this._fromR + this._deltaR * t, this._fromG + this._deltaG * t, this._fromB + this._deltaB * t);
},
reverse: function() {
var t = new cc.TintBy(this._duration, -this._deltaR, -this._deltaG, -this._deltaB);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
}
});
cc.tintBy = function(t, e, i, n) {
return new cc.TintBy(t, e, i, n);
};
cc.DelayTime = cc.ActionInterval.extend({
update: function(t) {},
reverse: function() {
var t = new cc.DelayTime(this._duration);
this._cloneDecoration(t);
this._reverseEaseList(t);
return t;
},
clone: function() {
var t = new cc.DelayTime();
this._cloneDecoration(t);
t.initWithDuration(this._duration);
return t;
}
});
cc.delayTime = function(t) {
return new cc.DelayTime(t);
};
cc.ReverseTime = cc.ActionInterval.extend({
_other: null,
ctor: function(t) {
cc.ActionInterval.prototype.ctor.call(this);
this._other = null;
t && this.initWithAction(t);
},
initWithAction: function(t) {
if (!t) throw new Error("cc.ReverseTime.initWithAction(): action must be non null");
if (t === this._other) throw new Error("cc.ReverseTime.initWithAction(): the action was already passed in.");
if (cc.ActionInterval.prototype.initWithDuration.call(this, t._duration)) {
this._other = t;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.ReverseTime();
this._cloneDecoration(t);
t.initWithAction(this._other.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._other.startWithTarget(t);
},
update: function(t) {
t = this._computeEaseTime(t);
this._other && this._other.update(1 - t);
},
reverse: function() {
return this._other.clone();
},
stop: function() {
this._other.stop();
cc.Action.prototype.stop.call(this);
}
});
cc.reverseTime = function(t) {
return new cc.ReverseTime(t);
};
cc.Animate = cc.ActionInterval.extend({
_animation: null,
_nextFrame: 0,
_origFrame: null,
_executedLoops: 0,
_splitTimes: null,
_currFrameIndex: 0,
ctor: function(t) {
cc.ActionInterval.prototype.ctor.call(this);
this._splitTimes = [];
t && this.initWithAnimation(t);
},
getAnimation: function() {
return this._animation;
},
setAnimation: function(t) {
this._animation = t;
},
getCurrentFrameIndex: function() {
return this._currFrameIndex;
},
initWithAnimation: function(t) {
if (!t) throw new Error("cc.Animate.initWithAnimation(): animation must be non-NULL");
var e = t.getDuration();
if (this.initWithDuration(e * t.getLoops())) {
this._nextFrame = 0;
this.setAnimation(t);
this._origFrame = null;
this._executedLoops = 0;
var i = this._splitTimes;
i.length = 0;
var n = 0, o = e / t.getTotalDelayUnits(), r = t.getFrames();
cc.js.array.verifyType(r, cc.AnimationFrame);
for (var s = 0; s < r.length; s++) {
var c = n * o / e;
n += r[s].getDelayUnits();
i.push(c);
}
return !0;
}
return !1;
},
clone: function() {
var t = new cc.Animate();
this._cloneDecoration(t);
t.initWithAnimation(this._animation.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._animation.getRestoreOriginalFrame() && (this._origFrame = t.getSpriteFrame());
this._nextFrame = 0;
this._executedLoops = 0;
},
update: function(t) {
if ((t = this._computeEaseTime(t)) < 1) {
if ((0 | (t *= this._animation.getLoops())) > this._executedLoops) {
this._nextFrame = 0;
this._executedLoops++;
}
t %= 1;
}
for (var e = this._animation.getFrames(), i = e.length, n = this._splitTimes, o = this._nextFrame; o < i && n[o] <= t; o++) {
_currFrameIndex = o;
this.target.setSpriteFrame(e[_currFrameIndex].getSpriteFrame());
this._nextFrame = o + 1;
}
},
reverse: function() {
var t = this._animation, e = t.getFrames(), i = [];
cc.js.array.verifyType(e, cc.AnimationFrame);
if (e.length > 0) for (var n = e.length - 1; n >= 0; n--) {
var o = e[n];
if (!o) break;
i.push(o.clone());
}
var r = new cc.SpriteFrameAnimation(i, t.getDelayPerUnit(), t.getLoops());
r.setRestoreOriginalFrame(t.getRestoreOriginalFrame());
var s = new cc.Animate(r);
this._cloneDecoration(s);
this._reverseEaseList(s);
return s;
},
stop: function() {
this._animation.getRestoreOriginalFrame() && this.target && this.target.setSpriteFrame(this._origFrame);
cc.Action.prototype.stop.call(this);
}
});
cc.animate = function(t) {
return new cc.Animate(t);
};
cc.TargetedAction = cc.ActionInterval.extend({
_action: null,
_forcedTarget: null,
ctor: function(t, e) {
cc.ActionInterval.prototype.ctor.call(this);
e && this.initWithTarget(t, e);
},
initWithTarget: function(t, e) {
if (this.initWithDuration(e._duration)) {
this._forcedTarget = t;
this._action = e;
return !0;
}
return !1;
},
clone: function() {
var t = new cc.TargetedAction();
this._cloneDecoration(t);
t.initWithTarget(this._forcedTarget, this._action.clone());
return t;
},
startWithTarget: function(t) {
cc.ActionInterval.prototype.startWithTarget.call(this, t);
this._action.startWithTarget(this._forcedTarget);
},
stop: function() {
this._action.stop();
},
update: function(t) {
t = this._computeEaseTime(t);
this._action.update(t);
},
getForcedTarget: function() {
return this._forcedTarget;
},
setForcedTarget: function(t) {
this._forcedTarget !== t && (this._forcedTarget = t);
}
});
cc.targetedAction = function(t, e) {
return new cc.TargetedAction(t, e);
};
}), {} ],
9: [ (function(t, e, i) {
cc.ActionManager = cc._Class.extend({
_elementPool: [],
_searchElementByTarget: function(t, e) {
for (var i = 0; i < t.length; i++) if (e === t[i].target) return t[i];
return null;
},
ctor: function() {
this._hashTargets = {};
this._arrayTargets = [];
this._currentTarget = null;
},
_getElement: function(t, e) {
var i = this._elementPool.pop();
i || (i = new function() {
this.actions = [];
this.target = null;
this.actionIndex = 0;
this.currentAction = null;
this.paused = !1;
this.lock = !1;
}());
i.target = t;
i.paused = !!e;
return i;
},
_putElement: function(t) {
t.actions.length = 0;
t.actionIndex = 0;
t.currentAction = null;
t.paused = !1;
t.target = null;
t.lock = !1;
this._elementPool.push(t);
},
addAction: function(t, e, i) {
if (!t) throw new Error("cc.ActionManager.addAction(): action must be non-null");
if (!e) throw new Error("cc.ActionManager.addAction(): action must be non-null");
var n = this._hashTargets[e.__instanceId];
if (n) n.actions || (n.actions = []); else {
n = this._getElement(e, i);
this._hashTargets[e.__instanceId] = n;
this._arrayTargets.push(n);
}
n.actions.push(t);
t.startWithTarget(e);
},
removeAllActions: function() {
for (var t = this._arrayTargets, e = 0; e < t.length; e++) {
var i = t[e];
i && this.removeAllActionsFromTarget(i.target, !0);
}
},
removeAllActionsFromTarget: function(t, e) {
if (null != t) {
var i = this._hashTargets[t.__instanceId];
if (i) {
i.actions.length = 0;
this._deleteHashElement(i);
}
}
},
removeAction: function(t) {
if (null != t) {
var e = t.getOriginalTarget(), i = this._hashTargets[e.__instanceId];
if (i) {
for (var n = 0; n < i.actions.length; n++) if (i.actions[n] === t) {
i.actions.splice(n, 1);
i.actionIndex >= n && i.actionIndex--;
break;
}
} else cc.logID(1001);
}
},
removeActionByTag: function(t, e) {
t === cc.Action.TAG_INVALID && cc.logID(1002);
cc.assertID(e, 1003);
var i = this._hashTargets[e.__instanceId];
if (i) for (var n = i.actions.length, o = 0; o < n; ++o) {
var r = i.actions[o];
if (r && r.getTag() === t && r.getOriginalTarget() === e) {
this._removeActionAtIndex(o, i);
break;
}
}
},
getActionByTag: function(t, e) {
t === cc.Action.TAG_INVALID && cc.logID(1004);
var i = this._hashTargets[e.__instanceId];
if (i) {
if (null != i.actions) for (var n = 0; n < i.actions.length; ++n) {
var o = i.actions[n];
if (o && o.getTag() === t) return o;
}
cc.logID(1005, t);
}
return null;
},
getNumberOfRunningActionsInTarget: function(t) {
var e = this._hashTargets[t.__instanceId];
return e && e.actions ? e.actions.length : 0;
},
pauseTarget: function(t) {
var e = this._hashTargets[t.__instanceId];
e && (e.paused = !0);
},
resumeTarget: function(t) {
var e = this._hashTargets[t.__instanceId];
e && (e.paused = !1);
},
pauseAllRunningActions: function() {
for (var t = [], e = this._arrayTargets, i = 0; i < e.length; i++) {
var n = e[i];
if (n && !n.paused) {
n.paused = !0;
t.push(n.target);
}
}
return t;
},
resumeTargets: function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.resumeTarget(t[e]);
},
pauseTargets: function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.pauseTarget(t[e]);
},
purgeSharedManager: function() {
cc.director.getScheduler().unscheduleUpdate(this);
},
_removeActionAtIndex: function(t, e) {
e.actions[t];
e.actions.splice(t, 1);
e.actionIndex >= t && e.actionIndex--;
0 === e.actions.length && this._deleteHashElement(e);
},
_deleteHashElement: function(t) {
var e = !1;
if (t && !t.lock && this._hashTargets[t.target.__instanceId]) {
delete this._hashTargets[t.target.__instanceId];
for (var i = this._arrayTargets, n = 0, o = i.length; n < o; n++) if (i[n] === t) {
i.splice(n, 1);
break;
}
this._putElement(t);
e = !0;
}
return e;
},
update: function(t) {
for (var e, i = this._arrayTargets, n = 0; n < i.length; n++) {
this._currentTarget = i[n];
if (!(e = this._currentTarget).paused && e.actions) {
e.lock = !0;
for (e.actionIndex = 0; e.actionIndex < e.actions.length; e.actionIndex++) {
e.currentAction = e.actions[e.actionIndex];
if (e.currentAction) {
e.currentAction.step(t * (e.currentAction._speedMethod ? e.currentAction._speed : 1));
if (e.currentAction && e.currentAction.isDone()) {
e.currentAction.stop();
var o = e.currentAction;
e.currentAction = null;
this.removeAction(o);
}
e.currentAction = null;
}
}
e.lock = !1;
}
0 === e.actions.length && this._deleteHashElement(e) && n--;
}
}
});
0;
}), {} ],
10: [ (function(t, e, i) {
t("./CCActionManager");
t("./CCAction");
t("./CCActionInterval");
t("./CCActionInstant");
t("./CCActionEase");
t("./CCActionCatmullRom");
}), {
"./CCAction": 4,
"./CCActionCatmullRom": 5,
"./CCActionEase": 6,
"./CCActionInstant": 7,
"./CCActionInterval": 8,
"./CCActionManager": 9
} ],
11: [ (function(i, n, o) {
function r(t, e) {
a.call(this);
this.target = t;
this.animation = e;
this._anims = new c.array.MutableForwardIterator([]);
}
function s(i, n) {
function o(t) {
if (!Array.isArray(t)) return !1;
for (var e = 0, i = t.length; e < i; e++) {
var n = t[e];
if (!Array.isArray(n) || 6 !== n.length) return !1;
}
return !0;
}
function r(i, r, s) {
var a = i instanceof cc.Node && "position" === r, d = [], f = new h();
f.target = i;
var p, g = r.indexOf(".");
-1 !== g ? i[p = r.slice(0, g)] : p = r;
f.prop = p;
f.subProps = (function(t) {
var e = t.split(".");
e.shift();
return e.length > 0 ? e : null;
})(r);
for (var v = 0, y = s.length; v < y; v++) {
var m = s[v], b = m.frame / n.duration;
f.ratios.push(b);
if (a) {
var C = m.motionPath;
if (C && !o(C)) {
cc.errorID(3904, i.name, r, v);
C = null;
}
d.push(C);
}
var T = m.value;
f.values.push(T);
var S = m.curve;
if (S) {
if ("string" === ("object" == (e = typeof S) ? t(S) : e)) {
f.types.push(S);
continue;
}
if (Array.isArray(S)) {
S[0] === S[1] && S[2] === S[3] ? f.types.push(h.Linear) : f.types.push(h.Bezier(S));
continue;
}
}
f.types.push(h.Linear);
}
a && u(d, f, c.duration, c.sample);
for (var E, A, x = f.ratios, w = !0, I = 1, O = x.length; I < O; I++) {
E = x[I] - x[I - 1];
if (1 === I) A = E; else if (Math.abs(E - A) > 1e-6) {
w = !1;
break;
}
}
f._findFrameIndex = w ? l : _;
return f;
}
function s(t, e) {
var i = e.props, n = e.comps;
if (i) for (var o in i) {
var s = r(t, o, i[o]);
a.push(s);
}
if (n) for (var c in n) {
var h = t.getComponent(c);
if (h) {
var l = n[c];
for (var o in l) {
s = r(h, o, l[o]);
a.push(s);
}
}
}
}
var c = n.clip, a = n.curves;
a.length = 0;
n.duration = c.duration;
n.speed = c.speed;
n.wrapMode = c.wrapMode;
n.frameRate = c.sample;
(n.wrapMode & p.Loop) === p.Loop ? n.repeatCount = Infinity : n.repeatCount = 1;
var g = c.curveData, v = g.paths;
s(i, g);
for (var y in v) {
var m = cc.find(y, i);
if (m) {
s(m, v[y]);
}
}
var b = c.events;
if (b) for (var C, T = 0, S = b.length; T < S; T++) {
if (!C) {
(C = new d()).target = i;
a.push(C);
}
var E, A = b[T], x = A.frame / n.duration, w = _(C.ratios, x);
if (w >= 0) E = C.events[w]; else {
E = new f();
C.ratios.push(x);
C.events.push(E);
}
E.add(A.func, A.params);
}
}
var c = cc.js, a = i("./playable"), h = i("./animation-curves").DynamicAnimCurve, l = i("./animation-curves").quickFindIndex, u = i("./motion-path-helper").sampleMotionPaths, d = i("./animation-curves").EventAnimCurve, f = i("./animation-curves").EventInfo, p = i("./types").WrapModeMask, _ = i("../core/utils/binary-search").binarySearchEpsilon;
c.extend(r, a);
var g = r.prototype;
g.playState = function(i, n) {
if (i.clip) {
i.curveLoaded || s(this.target, i);
i.animator = this;
i.play();
"number" === ("object" == (e = typeof n) ? t(n) : e) && i.setTime(n);
this.play();
}
};
g.stopStatesExcept = function(t) {
var e = this._anims, i = e.array;
for (e.i = 0; e.i < i.length; ++e.i) {
var n = i[e.i];
n !== t && this.stopState(n);
}
};
g.addAnimation = function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
t._setListeners(this.animation);
};
g.removeAnimation = function(t) {
var e = this._anims.array.indexOf(t);
if (e >= 0) {
this._anims.fastRemoveAt(e);
0 === this._anims.array.length && this.stop();
} else cc.errorID(3908);
t.animator = null;
};
g.sample = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].sample();
}
};
g.stopState = function(t) {
t && t.stop();
};
g.pauseState = function(t) {
t && t.pause();
};
g.resumeState = function(t) {
t && t.resume();
this.isPaused && this.resume();
};
g.setStateTime = function(t, e) {
if (void 0 !== e) {
if (t) {
t.setTime(e);
t.sample();
}
} else {
e = t;
for (var i = this._anims.array, n = 0; n < i.length; ++n) {
var o = i[n];
o.setTime(e);
o.sample();
}
}
};
g.onStop = function() {
var t = this._anims, e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
e[t.i].stop();
}
};
g.onPause = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.pause();
i.animator = null;
}
};
g.onResume = function() {
for (var t = this._anims.array, e = 0; e < t.length; ++e) {
var i = t[e];
i.animator = this;
i.resume();
}
};
g._reloadClip = function(t) {
s(this.target, t);
};
0;
0;
n.exports = r;
}), {
"../core/utils/binary-search": 156,
"./animation-curves": 13,
"./motion-path-helper": 19,
"./playable": 20,
"./types": 21
} ],
12: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AnimationClip",
extends: cc.Asset,
properties: {
_duration: {
default: 0,
type: "Float"
},
duration: {
get: function() {
return this._duration;
}
},
sample: {
default: 60
},
speed: {
default: 1
},
wrapMode: {
default: cc.WrapMode.Normal
},
curveData: {
default: {},
visible: !1
},
events: {
default: [],
visible: !1
}
},
statics: {
createWithSpriteFrames: function(t, e) {
if (!Array.isArray(t)) {
cc.errorID(3905);
return null;
}
var i = new n();
i.sample = e || i.sample;
i._duration = t.length / i.sample;
for (var o = [], r = 1 / i.sample, s = 0, c = t.length; s < c; s++) o[s] = {
frame: s * r,
value: t[s]
};
i.curveData = {
comps: {
"cc.Sprite": {
spriteFrame: o
}
}
};
return i;
}
}
});
cc.AnimationClip = e.exports = n;
}), {} ],
13: [ (function(i, n, o) {
function r(i, n) {
if ("string" === ("object" == (e = typeof n) ? t(n) : e)) {
var o = cc.Easing[n];
o ? i = o(i) : cc.errorID(3906, n);
} else Array.isArray(n) && (i = s(n, i));
return i;
}
var s = i("./bezier").bezierByTime, c = i("../core/utils/binary-search").binarySearchEpsilon, a = i("./types").WrapModeMask, h = i("./types").WrappedInfo, l = cc.Class({
name: "cc.AnimCurve",
sample: function(t, e, i) {},
onTimeChangedManually: void 0
}), u = cc.Class({
name: "cc.DynamicAnimCurve",
extends: l,
properties: {
target: null,
prop: "",
values: [],
ratios: [],
types: [],
subProps: null
},
_findFrameIndex: c,
sample: function(i, n, o) {
var s = this.values, c = this.ratios, a = c.length;
if (0 !== a) {
var h, l = this._findFrameIndex(c, n);
if (l < 0) if ((l = ~l) <= 0) h = s[0]; else if (l >= a) h = s[a - 1]; else {
var u = s[l - 1], d = "number" === ("object" == (e = typeof u) ? t(u) : e), f = u && u.lerp;
if (d || f) {
var p = c[l - 1], _ = c[l], g = this.types[l - 1], v = (n - p) / (_ - p);
g && (v = r(v, g));
var y = s[l];
d ? h = u + (y - u) * v : f && (h = u.lerp(y, v));
} else h = u;
} else h = s[l];
var m = this.subProps;
if (m) {
for (var b = this.target[this.prop], C = b, T = 0; T < m.length - 1; T++) {
var S = m[T];
if (!C) return;
C = C[S];
}
var E = m[m.length - 1];
if (!C) return;
C[E] = h;
h = b;
}
this.target[this.prop] = h;
}
}
});
u.Linear = null;
u.Bezier = function(t) {
return t;
};
var d = function() {
this.events = [];
};
d.prototype.add = function(t, e) {
this.events.push({
func: t || "",
params: e || []
});
};
var f = cc.Class({
name: "cc.EventAnimCurve",
extends: l,
properties: {
target: null,
ratios: [],
events: [],
_wrappedInfo: {
default: function() {
return new h();
}
},
_lastWrappedInfo: null,
_ignoreIndex: NaN
},
_wrapIterations: function(t) {
t - (0 | t) == 0 && (t -= 1);
return 0 | t;
},
sample: function(t, e, i) {
var n = this.ratios.length, o = i.getWrappedInfo(i.time, this._wrappedInfo), r = o.direction, s = c(this.ratios, o.ratio);
if (s < 0) {
s = ~s - 1;
r < 0 && (s += 1);
}
this._ignoreIndex !== s && (this._ignoreIndex = NaN);
o.frameIndex = s;
if (this._lastWrappedInfo) {
var l = i.wrapMode, u = this._wrapIterations(o.iterations), d = this._lastWrappedInfo, f = this._wrapIterations(d.iterations), p = d.frameIndex, _ = d.direction, g = -1 !== f && u !== f;
if (p === s && g && 1 === n) this._fireEvent(0); else if (p !== s || g) {
r = _;
do {
if (p !== s) {
if (-1 === r && 0 === p && s > 0) {
(l & a.PingPong) === a.PingPong ? r *= -1 : p = n;
f++;
} else if (1 === r && p === n - 1 && s < n - 1) {
(l & a.PingPong) === a.PingPong ? r *= -1 : p = -1;
f++;
}
if (p === s) break;
if (f > u) break;
}
p += r;
cc.director.getAnimationManager().pushDelayEvent(this, "_fireEvent", [ p ]);
} while (p !== s && p > -1 && p < n);
}
this._lastWrappedInfo.set(o);
} else {
this._fireEvent(s);
this._lastWrappedInfo = new h(o);
}
},
_fireEvent: function(t) {
if (!(t < 0 || t >= this.events.length || this._ignoreIndex === t)) {
var e = this.events[t].events;
if (this.target.isValid) for (var i = this.target._components, n = 0; n < e.length; n++) for (var o = e[n], r = o.func, s = 0; s < i.length; s++) {
var c = i[s], a = c[r];
a && a.apply(c, o.params);
}
}
},
onTimeChangedManually: function(t, e) {
this._lastWrappedInfo = null;
this._ignoreIndex = NaN;
var i = e.getWrappedInfo(t, this._wrappedInfo), n = i.direction, o = c(this.ratios, i.ratio);
if (o < 0) {
o = ~o - 1;
n < 0 && (o += 1);
this._ignoreIndex = o;
}
}
});
0;
n.exports = {
AnimCurve: l,
DynamicAnimCurve: u,
EventAnimCurve: f,
EventInfo: d,
computeRatioByType: r,
quickFindIndex: function(t, e) {
var i = t.length - 1;
if (0 === i) return 0;
var n = t[0];
if (e < n) return 0;
var o = t[i];
if (e > o) return i;
var r = (e = (e - n) / (o - n)) / (1 / i), s = 0 | r;
return r - s < 1e-6 ? s : ~(s + 1);
}
};
}), {
"../core/utils/binary-search": 156,
"./bezier": 16,
"./types": 21
} ],
14: [ (function(t, e, n) {
var o = cc.js, r = cc.Class({
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._anims = new o.array.MutableForwardIterator([]);
this._delayEvents = [];
},
update: function(t) {
var e = this._anims, n = e.array;
for (e.i = 0; e.i < n.length; ++e.i) {
var o = n[e.i];
o._isPlaying && !o._isPaused && o.update(t);
}
var r = this._delayEvents;
for (i = 0, l = r.length; i < l; i++) {
var s = r[i];
s.target[s.func].apply(s.target, s.args);
}
r.length = 0;
},
destruct: function() {},
addAnimation: function(t) {
-1 === this._anims.array.indexOf(t) && this._anims.push(t);
},
removeAnimation: function(t) {
var e = this._anims.array.indexOf(t);
e >= 0 ? this._anims.fastRemoveAt(e) : cc.errorID(3907);
},
pushDelayEvent: function(t, e, i) {
this._delayEvents.push({
target: t,
func: e,
args: i
});
}
});
cc.AnimationManager = e.exports = r;
}), {} ],
15: [ (function(t, e, i) {
function n(t, e) {
c.call(this);
cc.EventTarget.call(this);
this._firstFramePlayed = !1;
this._delay = 0;
this._delayTime = 0;
this._wrappedInfo = new h();
this._lastWrappedInfo = null;
this._process = o;
this._clip = t;
this._name = e || t && t.name;
this.animator = null;
this.curves = [];
this.delay = 0;
this.repeatCount = 1;
this.duration = 1;
this.speed = 1;
this.wrapMode = l.Normal;
this.time = 0;
this._emit = this.emit;
this.emit = function() {
for (var t = new Array(arguments.length), e = 0, i = t.length; e < i; e++) t[e] = arguments[e];
cc.director.getAnimationManager().pushDelayEvent(this, "_emit", t);
};
}
function o() {
var t = this.sample(), e = this._hasListenerCache;
if (e && e.lastframe) {
var i;
i || (i = this._lastWrappedInfo = new h(t));
this.repeatCount > 1 && (0 | t.iterations) > (0 | i.iterations) && ((this.wrapMode & u.Reverse) === u.Reverse ? i.direction < 0 && this.emit("lastframe", this) : i.direction > 0 && this.emit("lastframe", this));
i.set(t);
}
if (t.stopped) {
this.stop();
this.emit("finished", this);
}
}
function r() {
var t = this.time, e = this.duration;
t > e ? 0 === (t %= e) && (t = e) : t < 0 && 0 !== (t %= e) && (t += e);
for (var i = t / e, n = this.curves, o = 0, r = n.length; o < r; o++) {
n[o].sample(t, i, this);
}
var s = this._hasListenerCache;
if (s && s.lastframe) {
var c = t > 0 ? t / e : -t / e, a = this._lastIterations;
void 0 === a && (a = this._lastIterations = c);
(0 | c) > (0 | a) && this.emit("lastframe", this);
this._lastIterations = c;
}
}
var s = cc.js, c = t("./playable"), a = t("./types"), h = a.WrappedInfo, l = a.WrapMode, u = a.WrapModeMask;
s.extend(n, c);
var d = n.prototype;
cc.js.mixin(d, cc.EventTarget.prototype);
d._setListeners = function(t) {
this._capturingListeners = t ? t._capturingListeners : null;
this._bubblingListeners = t ? t._bubblingListeners : null;
this._hasListenerCache = t ? t._hasListenerCache : null;
};
d.onPlay = function() {
this.setTime(0);
this._delayTime = this._delay;
cc.director.getAnimationManager().addAnimation(this);
this.animator && this.animator.addAnimation(this);
this.emit("play", this);
};
d.onStop = function() {
this.isPaused || cc.director.getAnimationManager().removeAnimation(this);
this.animator && this.animator.removeAnimation(this);
this.emit("stop", this);
};
d.onResume = function() {
cc.director.getAnimationManager().addAnimation(this);
this.emit("resume", this);
};
d.onPause = function() {
cc.director.getAnimationManager().removeAnimation(this);
this.emit("pause", this);
};
d.setTime = function(t) {
this.time = t || 0;
for (var e = this.curves, i = 0, n = e.length; i < n; i++) {
var o = e[i];
o.onTimeChangedManually && o.onTimeChangedManually(t, this);
}
};
d.update = function(t) {
if (this._delayTime > 0) {
this._delayTime -= t;
if (this._delayTime > 0) return;
}
this._firstFramePlayed ? this.time += t * this.speed : this._firstFramePlayed = !0;
this._process();
};
d._needRevers = function(t) {
var e = this.wrapMode, i = !1;
if ((e & u.PingPong) === u.PingPong) {
t - (0 | t) == 0 && t > 0 && (t -= 1);
1 & t && (i = !i);
}
(e & u.Reverse) === u.Reverse && (i = !i);
return i;
};
d.getWrappedInfo = function(t, e) {
e = e || new h();
var i = !1, n = this.duration, o = this.repeatCount, r = t > 0 ? t / n : -t / n;
if (r >= o) {
r = o;
i = !0;
var s = o - (0 | o);
0 === s && (s = 1);
t = s * n * (t > 0 ? 1 : -1);
}
if (t > n) {
var c = t % n;
t = 0 === c ? n : c;
} else t < 0 && 0 !== (t %= n) && (t += n);
var a = !1, l = this._wrapMode & u.ShouldWrap;
l && (a = this._needRevers(r));
var d = a ? -1 : 1;
this.speed < 0 && (d *= -1);
l && a && (t = n - t);
e.ratio = t / n;
e.time = t;
e.direction = d;
e.stopped = i;
e.iterations = r;
return e;
};
d.sample = function() {
for (var t = this.getWrappedInfo(this.time, this._wrappedInfo), e = this.curves, i = 0, n = e.length; i < n; i++) {
e[i].sample(t.time, t.ratio, this);
}
return t;
};
s.get(d, "clip", (function() {
return this._clip;
}));
s.get(d, "name", (function() {
return this._name;
}));
s.obsolete(d, "AnimationState.length", "duration");
s.getset(d, "curveLoaded", (function() {
return this.curves.length > 0;
}), (function() {
this.curves.length = 0;
}));
s.getset(d, "wrapMode", (function() {
return this._wrapMode;
}), (function(t) {
this._wrapMode = t;
0;
this.time = 0;
t & u.Loop ? this.repeatCount = Infinity : this.repeatCount = 1;
}));
s.getset(d, "repeatCount", (function() {
return this._repeatCount;
}), (function(t) {
this._repeatCount = t;
var e = this._wrapMode & u.ShouldWrap, i = (this.wrapMode & u.Reverse) === u.Reverse;
this._process = Infinity !== t || e || i ? o : r;
}));
s.getset(d, "delay", (function() {
return this._delay;
}), (function(t) {
this._delayTime = this._delay = t;
}));
cc.AnimationState = e.exports = n;
}), {
"./playable": 20,
"./types": 21
} ],
16: [ (function(t, e, i) {
function n(t, e, i, n, o) {
var r = 1 - o;
return t * r * r * r + 3 * e * r * r * o + 3 * i * r * o * o + n * o * o * o;
}
function o(t) {
return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
}
function r(t, e) {
var i = (function(t, e) {
var i, n, r, u, d = e - 0, f = e - t[0], p = 3 * d, _ = 3 * f, g = 3 * (e - t[2]), v = 1 / (-d + _ - g + (e - 1)), y = (p - 6 * f + g) * v, m = y * (1 / 3), b = (-p + _) * v, C = 1 / 3 * (3 * b - y * y), T = C * (1 / 3), S = (2 * y * y * y - 9 * y * b + d * v * 27) / 27, E = S / 2, A = E * E + T * T * T;
if (A < 0) {
var x = 1 / 3 * -C, w = l(x * x * x), I = -S / (2 * w), O = c(I < -1 ? -1 : I > 1 ? 1 : I), N = 2 * o(w);
n = N * s(O * (1 / 3)) - m;
r = N * s((O + h) * (1 / 3)) - m;
u = N * s((O + 2 * h) * (1 / 3)) - m;
return 0 <= n && n <= 1 ? 0 <= r && r <= 1 ? 0 <= u && u <= 1 ? a(n, r, u) : a(n, r) : 0 <= u && u <= 1 ? a(n, u) : n : 0 <= r && r <= 1 ? 0 <= u && u <= 1 ? a(r, u) : r : u;
}
if (0 === A) {
r = -(i = E < 0 ? o(-E) : -o(E)) - m;
return 0 <= (n = 2 * i - m) && n <= 1 ? 0 <= r && r <= 1 ? a(n, r) : n : r;
}
var L = l(A);
return n = (i = o(-E + L)) - o(E + L) - m;
})(t, e), n = 1 - i;
return 0 * n * n * n + 3 * t[1] * i * n * n + 3 * t[3] * i * i * n + 1 * i * i * i;
}
var s = Math.cos, c = Math.acos, a = Math.max, h = 2 * Math.PI, l = Math.sqrt;
0;
e.exports = {
bezier: n,
bezierByTime: r
};
}), {} ],
17: [ (function(t, e, i) {
function n(t, e) {
return function(i) {
return i < .5 ? e(2 * i) / 2 : t(2 * i - 1) / 2 + .5;
};
}
var o = {
constant: function() {
return 0;
},
linear: function(t) {
return t;
},
quadIn: function(t) {
return t * t;
},
quadOut: function(t) {
return t * (2 - t);
},
quadInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
},
cubicIn: function(t) {
return t * t * t;
},
cubicOut: function(t) {
return --t * t * t + 1;
},
cubicInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
},
quartIn: function(t) {
return t * t * t * t;
},
quartOut: function(t) {
return 1 - --t * t * t * t;
},
quartInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
},
quintIn: function(t) {
return t * t * t * t * t;
},
quintOut: function(t) {
return --t * t * t * t * t + 1;
},
quintInOut: function(t) {
return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
},
sineIn: function(t) {
return 1 - Math.cos(t * Math.PI / 2);
},
sineOut: function(t) {
return Math.sin(t * Math.PI / 2);
},
sineInOut: function(t) {
return .5 * (1 - Math.cos(Math.PI * t));
},
expoIn: function(t) {
return 0 === t ? 0 : Math.pow(1024, t - 1);
},
expoOut: function(t) {
return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
},
expoInOut: function(t) {
return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
},
circIn: function(t) {
return 1 - Math.sqrt(1 - t * t);
},
circOut: function(t) {
return Math.sqrt(1 - --t * t);
},
circInOut: function(t) {
return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
},
elasticIn: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4);
},
elasticOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .4) + 1;
},
elasticInOut: function(t) {
var e, i = .1;
if (0 === t) return 0;
if (1 === t) return 1;
if (!i || i < 1) {
i = 1;
e = .1;
} else e = .4 * Math.asin(1 / i) / (2 * Math.PI);
return (t *= 2) < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / .4) * .5 + 1;
},
backIn: function(t) {
return t * t * (2.70158 * t - 1.70158);
},
backOut: function(t) {
return --t * t * (2.70158 * t + 1.70158) + 1;
},
backInOut: function(t) {
return (t *= 2) < 1 ? t * t * (3.5949095 * t - 2.5949095) * .5 : .5 * ((t -= 2) * t * (3.5949095 * t + 2.5949095) + 2);
},
bounceOut: function(t) {
return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
},
smooth: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t);
},
fade: function(t) {
return t <= 0 ? 0 : t >= 1 ? 1 : t * t * t * (t * (6 * t - 15) + 10);
}
};
o.quadOutIn = n(o.quadIn, o.quadOut);
o.cubicOutIn = n(o.cubicIn, o.cubicOut);
o.quartOutIn = n(o.quartIn, o.quartOut);
o.quintOutIn = n(o.quintIn, o.quintOut);
o.sineOutIn = n(o.sineIn, o.sineOut);
o.expoOutIn = n(o.expoIn, o.expoOut);
o.circOutIn = n(o.circIn, o.circOut);
o.backOutIn = n(o.backIn, o.backOut);
o.backOutIn = n(o.backIn, o.backOut);
o.bounceIn = function(t) {
return 1 - o.bounceOut(1 - t);
};
o.bounceInOut = function(t) {
return t < .5 ? .5 * o.bounceIn(2 * t) : .5 * o.bounceOut(2 * t - 1) + .5;
};
o.bounceOutIn = n(o.bounceIn, o.bounceOut);
cc.Easing = e.exports = o;
}), {} ],
18: [ (function(t, e, i) {
t("./bezier");
t("./easing");
t("./types");
t("./motion-path-helper");
t("./animation-curves");
t("./animation-clip");
t("./animation-manager");
t("./animation-state");
t("./animation-animator");
}), {
"./animation-animator": 11,
"./animation-clip": 12,
"./animation-curves": 13,
"./animation-manager": 14,
"./animation-state": 15,
"./bezier": 16,
"./easing": 17,
"./motion-path-helper": 19,
"./types": 21
} ],
19: [ (function(t, e, i) {
function n(t) {
this.points = t || [];
this.beziers = [];
this.ratios = [];
this.progresses = [];
this.length = 0;
this.computeBeziers();
}
function o() {
this.start = l();
this.end = l();
this.startCtrlPoint = l();
this.endCtrlPoint = l();
}
function r(t, e, i, o) {
function r(t) {
return t instanceof cc.Vec2 ? {
in: t,
pos: t,
out: t
} : Array.isArray(t) && 6 === t.length ? {
in: l(t[2], t[3]),
pos: l(t[0], t[1]),
out: l(t[4], t[5])
} : {
in: cc.Vec2.ZERO,
pos: cc.Vec2.ZERO,
out: cc.Vec2.ZERO
};
}
function a(t, e, i) {
p.push(t);
_.push(e);
g.push(i);
}
var u = e.values;
if (0 !== t.length && 0 !== u.length) if (1 !== (u = u.map((function(t) {
return l(t[0], t[1]);
}))).length) {
for (var d = e.types, f = e.ratios, p = e.values = [], _ = e.types = [], g = e.ratios = [], v = 0, y = s.Linear, m = 0, b = t.length; m < b - 1; m++) {
var C, T = t[m], S = f[m], E = f[m + 1] - S, A = u[m], x = u[m + 1], w = d[m], I = [], O = v / E, N = 1 / (E * i * o);
if (T && T.length > 0) {
var L = [];
L.push(r(A));
for (var P = 0, R = T.length; P < R; P++) {
var B = r(T[P]);
L.push(B);
}
L.push(r(x));
var D = new n(L);
D.computeBeziers();
for (var M = D.progresses; 1 - O > 1e-6; ) {
var F, j, z, k;
if ((C = c(C = O, w)) < 0) {
k = (0 - C) * (j = D.beziers[0]).getLength();
z = j.start.sub(j.endCtrlPoint).normalize();
F = j.start.add(z.mul(k));
} else if (C > 1) {
k = (C - 1) * (j = D.beziers[D.beziers.length - 1]).getLength();
z = j.end.sub(j.startCtrlPoint).normalize();
F = j.end.add(z.mul(k));
} else {
var W = h(M, C);
W < 0 && (W = ~W);
C -= W > 0 ? M[W - 1] : 0;
C /= D.ratios[W];
F = D.beziers[W].getPointAt(C);
}
I.push(F);
O += N;
}
} else for (;1 - O > 1e-6; ) {
C = c(C = O, w);
I.push(A.lerp(x, C));
O += N;
}
y = "constant" === w ? w : s.Linear;
for (P = 0, R = I.length; P < R; P++) {
var V = S + v + N * P * E;
a(I[P], y, V);
}
v = Math.abs(O - 1) > 1e-6 ? (O - 1) * E : 0;
}
f[f.length - 1] !== g[g.length - 1] && a(u[u.length - 1], y, f[f.length - 1]);
} else e.values = u;
}
var s = t("./animation-curves").DynamicAnimCurve, c = t("./animation-curves").computeRatioByType, a = t("./bezier").bezier, h = t("../core/utils/binary-search").binarySearchEpsilon, l = cc.v2;
n.prototype.computeBeziers = function() {
this.beziers.length = 0;
this.ratios.length = 0;
this.progresses.length = 0;
this.length = 0;
for (var t, e = 1; e < this.points.length; e++) {
var i = this.points[e - 1], n = this.points[e];
(t = new o()).start = i.pos;
t.startCtrlPoint = i.out;
t.end = n.pos;
t.endCtrlPoint = n.in;
this.beziers.push(t);
this.length += t.getLength();
}
var r = 0;
for (e = 0; e < this.beziers.length; e++) {
t = this.beziers[e];
this.ratios[e] = t.getLength() / this.length;
this.progresses[e] = r += this.ratios[e];
}
return this.beziers;
};
o.prototype.getPointAt = function(t) {
var e = this.getUtoTmapping(t);
return this.getPoint(e);
};
o.prototype.getPoint = function(t) {
var e = a(this.start.x, this.startCtrlPoint.x, this.endCtrlPoint.x, this.end.x, t), i = a(this.start.y, this.startCtrlPoint.y, this.endCtrlPoint.y, this.end.y, t);
return new l(e, i);
};
o.prototype.getLength = function() {
var t = this.getLengths();
return t[t.length - 1];
};
o.prototype.getLengths = function(t) {
t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1) return this.cacheArcLengths;
var e, i, n = [], o = this.getPoint(0), r = 0;
n.push(0);
for (i = 1; i <= t; i++) {
e = this.getPoint(i / t);
r += cc.pDistance(e, o);
n.push(r);
o = e;
}
this.cacheArcLengths = n;
return n;
};
o.prototype.getUtoTmapping = function(t, e) {
var i, n = this.getLengths(), o = 0, r = n.length;
i = e || t * n[r - 1];
for (var s, c = 0, a = r - 1; c <= a; ) if ((s = n[o = Math.floor(c + (a - c) / 2)] - i) < 0) c = o + 1; else {
if (!(s > 0)) {
a = o;
break;
}
a = o - 1;
}
if (n[o = a] === i) {
return o / (r - 1);
}
var h = n[o];
return (o + (i - h) / (n[o + 1] - h)) / (r - 1);
};
0;
e.exports = {
sampleMotionPaths: r,
Curve: n,
Bezier: o
};
}), {
"../core/utils/binary-search": 156,
"./animation-curves": 13,
"./bezier": 16
} ],
20: [ (function(t, e, i) {
function n() {
this._isPlaying = !1;
this._isPaused = !1;
this._stepOnce = !1;
}
var o = cc.js, r = n.prototype;
o.get(r, "isPlaying", (function() {
return this._isPlaying;
}), !0);
o.get(r, "isPaused", (function() {
return this._isPaused;
}), !0);
var s = function() {};
r.onPlay = s;
r.onPause = s;
r.onResume = s;
r.onStop = s;
r.onError = s;
r.play = function() {
if (this._isPlaying) if (this._isPaused) {
this._isPaused = !1;
this.onResume();
} else this.onError("already-playing"); else {
this._isPlaying = !0;
this.onPlay();
}
};
r.stop = function() {
if (this._isPlaying) {
this._isPlaying = !1;
this.onStop();
this._isPaused = !1;
}
};
r.pause = function() {
if (this._isPlaying && !this._isPaused) {
this._isPaused = !0;
this.onPause();
}
};
r.resume = function() {
if (this._isPlaying && this._isPaused) {
this._isPaused = !1;
this.onResume();
}
};
r.step = function() {
this.pause();
this._stepOnce = !0;
this._isPlaying || this.play();
};
e.exports = n;
}), {} ],
21: [ (function(t, e, i) {
function n(t) {
if (t) this.set(t); else {
this.ratio = 0;
this.time = 0;
this.direction = 1;
this.stopped = !0;
this.iterations = 0;
this.frameIndex = void 0;
}
}
cc.js;
var o = {
Loop: 2,
ShouldWrap: 4,
PingPong: 22,
Reverse: 36
}, r = cc.Enum({
Default: 0,
Normal: 1,
Reverse: o.Reverse,
Loop: o.Loop,
LoopReverse: o.Loop | o.Reverse,
PingPong: o.PingPong,
PingPongReverse: o.PingPong | o.Reverse
});
cc.WrapMode = r;
n.prototype.set = function(t) {
this.ratio = t.ratio;
this.time = t.time;
this.direction = t.direction;
this.stopped = t.stopped;
this.iterations = t.iterations;
this.frameIndex = t.frameIndex;
};
e.exports = {
WrapModeMask: o,
WrapMode: r,
WrappedInfo: n
};
}), {} ],
22: [ (function(t, e, i) {
var n = cc.js;
i.removed = function(t) {
function e() {
cc.errorID(1403);
}
n.getset(t, "willPlayMusic", e, e);
};
i.deprecated = function(t) {
var e = -1, i = 1, o = 1, r = 1, s = 1;
n.get(t, "playMusic", (function() {
return function(n, s) {
t.stop(e);
e = t.play(n, s, r);
i = n;
o = s;
return e;
};
}));
n.get(t, "stopMusic", (function() {
return function() {
t.stop(e);
return e;
};
}));
n.get(t, "pauseMusic", (function() {
return function() {
t.pause(e);
return e;
};
}));
n.get(t, "resumeMusic", (function() {
return function() {
t.resume(e);
return e;
};
}));
n.get(t, "rewindMusic", (function() {
return function() {
t.setCurrentTime(e, 0);
return e;
};
}));
n.get(t, "getMusicVolume", (function() {
return function() {
return r;
};
}));
n.get(t, "setMusicVolume", (function() {
return function(i) {
r = i;
t.setVolume(e, r);
return r;
};
}));
n.get(t, "isMusicPlaying", (function() {
return function() {
return t.getState(e) === t.AudioState.PLAYING;
};
}));
n.get(t, "playEffect", (function() {
return function(e, i, n) {
return t.play(e, i || !1, void 0 === n ? s : n);
};
}));
n.get(t, "setEffectsVolume", (function(i) {
return function(i) {
s = i;
var n = t._id2audio;
for (var o in n) o !== e && t.setVolume(o, i);
};
}));
n.get(t, "getEffectsVolume", (function() {
return function() {
return s;
};
}));
n.get(t, "pauseEffect", (function() {
return function(e) {
return t.pause(e);
};
}));
n.get(t, "pauseAllEffects", (function() {
return function() {
var i = t.getState(e) === t.AudioState.PLAYING;
t.pauseAll();
i && t.resume(e);
};
}));
n.get(t, "resumeEffect", (function() {
return function(e) {
t.resume(e);
};
}));
n.get(t, "resumeAllEffects", (function() {
return function() {
var i = t.getState(e) === t.AudioState.PAUSED;
t.resumeAll();
i && t.getState(e) === t.AudioState.PLAYING && t.pause(e);
};
}));
n.get(t, "stopEffect", (function() {
return function(e) {
return t.stop(e);
};
}));
n.get(t, "stopAllEffects", (function() {
return function() {
var n = t.getState(e) === t.AudioState.PLAYING, r = t.getCurrentTime(e);
t.stopAll();
if (n) {
e = t.play(i, o);
t.setCurrentTime(e, r);
}
};
}));
n.get(t, "unloadEffect", (function() {
return function(e) {
return t.stop(e);
};
}));
0;
};
}), {} ],
23: [ (function(i, n, o) {
"use strict";
function r(t) {
var e = cc.Mask;
if (e) for (var i = 0, n = t; n && cc.Node.isNode(n); n = n._parent, ++i) if (n.getComponent(e)) return {
index: i,
node: n
};
return null;
}
var s = i("./utils/prefab-helper"), c = i("./utils/scene-graph-helper"), a = cc.Object.Flags.Destroying, h = "position-changed", l = "size-changed", u = "anchor-changed", d = "rotation-changed", f = "scale-changed", p = i("./utils/misc"), _ = i("./event/event"), g = !!cc.ActionManager, v = function() {}, y = cc.Enum({
TOUCH_START: "touchstart",
TOUCH_MOVE: "touchmove",
TOUCH_END: "touchend",
TOUCH_CANCEL: "touchcancel",
MOUSE_DOWN: "mousedown",
MOUSE_MOVE: "mousemove",
MOUSE_ENTER: "mouseenter",
MOUSE_LEAVE: "mouseleave",
MOUSE_UP: "mouseup",
MOUSE_WHEEL: "mousewheel"
}), m = [ y.TOUCH_START, y.TOUCH_MOVE, y.TOUCH_END, y.TOUCH_CANCEL ], b = [ y.MOUSE_DOWN, y.MOUSE_ENTER, y.MOUSE_MOVE, y.MOUSE_LEAVE, y.MOUSE_UP, y.MOUSE_WHEEL ], C = null, T = function(t, e) {
var i = t.getLocation(), n = this.owner;
if (n._hitTest(i, this)) {
(e = _.EventTouch.pool.get(e)).type = y.TOUCH_START;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
_.EventTouch.pool.put(e);
return !0;
}
return !1;
}, S = function(t, e) {
e = _.EventTouch.pool.get(e);
var i = this.owner;
e.type = y.TOUCH_MOVE;
e.touch = t;
e.bubbles = !0;
i.dispatchEvent(e);
e.touch = null;
e._touches = null;
_.EventTouch.pool.put(e);
}, E = function(t, e) {
e = _.EventTouch.pool.get(e);
var i = t.getLocation(), n = this.owner;
n._hitTest(i, this) ? e.type = y.TOUCH_END : e.type = y.TOUCH_CANCEL;
e.touch = t;
e.bubbles = !0;
n.dispatchEvent(e);
e.touch = null;
e._touches = null;
_.EventTouch.pool.put(e);
}, A = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = _.EventMouse.pool.get(t)).type = y.MOUSE_DOWN;
t.bubbles = !0;
i.dispatchEvent(t);
_.EventMouse.pool.put(t);
}
}, x = function(t) {
var e = t.getLocation(), i = this.owner, n = i._hitTest(e, this);
if (n || this._previousIn) {
t.stopPropagation();
t = _.EventMouse.pool.get(t);
}
if (n) {
if (!this._previousIn) {
if (C) {
t.type = y.MOUSE_LEAVE;
C.dispatchEvent(t);
C._mouseListener._previousIn = !1;
}
C = this.owner;
t.type = y.MOUSE_ENTER;
i.dispatchEvent(t);
this._previousIn = !0;
}
t.type = y.MOUSE_MOVE;
t.bubbles = !0;
i.dispatchEvent(t);
} else {
if (!this._previousIn) return;
t.type = y.MOUSE_LEAVE;
i.dispatchEvent(t);
this._previousIn = !1;
C = null;
}
_.EventMouse.pool.put(t);
}, w = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = _.EventMouse.pool.get(t)).type = y.MOUSE_UP;
t.bubbles = !0;
i.dispatchEvent(t);
_.EventMouse.pool.put(t);
}
}, I = function(t) {
var e = t.getLocation(), i = this.owner;
if (i._hitTest(e, this)) {
t.stopPropagation();
(t = _.EventMouse.pool.get(t)).type = y.MOUSE_WHEEL;
t.bubbles = !0;
i.dispatchEvent(t);
_.EventMouse.pool.put(t);
}
}, O = cc.Class({
name: "cc.Node",
extends: i("./utils/base-node"),
properties: {
_opacity: 255,
_color: cc.Color.WHITE,
_cascadeOpacityEnabled: !0,
_anchorPoint: cc.p(.5, .5),
_contentSize: cc.size(0, 0),
_rotationX: 0,
_rotationY: 0,
_scaleX: 1,
_scaleY: 1,
_position: cc.p(0, 0),
_skewX: 0,
_skewY: 0,
_localZOrder: 0,
_globalZOrder: 0,
_opacityModifyRGB: !1,
groupIndex: {
default: 0,
type: cc.Integer
},
group: {
get: function() {
return cc.game.groupList[this.groupIndex] || "";
},
set: function(t) {
this.groupIndex = cc.game.groupList.indexOf(t);
this.emit("group-changed");
}
},
x: {
get: function() {
return this._position.x;
},
set: function(t) {
var e = this._position;
if (t !== e.x) {
e.x = t;
this._sgNode.setPositionX(t);
var i = this._hasListenerCache;
i && i[h] && this.emit(h);
}
}
},
y: {
get: function() {
return this._position.y;
},
set: function(t) {
var e = this._position;
if (t !== e.y) {
e.y = t;
this._sgNode.setPositionY(t);
var i = this._hasListenerCache;
i && i[h] && this.emit(h);
}
}
},
rotation: {
get: function() {
this._rotationX !== this._rotationY && cc.logID(1602);
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t || this._rotationY !== t) {
this._rotationX = this._rotationY = t;
this._sgNode.rotation = t;
var e = this._hasListenerCache;
e && e[d] && this.emit(d);
}
}
},
rotationX: {
get: function() {
return this._rotationX;
},
set: function(t) {
if (this._rotationX !== t) {
this._rotationX = t;
this._sgNode.rotationX = t;
var e = this._hasListenerCache;
e && e[d] && this.emit(d);
}
}
},
rotationY: {
get: function() {
return this._rotationY;
},
set: function(t) {
if (this._rotationY !== t) {
this._rotationY = t;
this._sgNode.rotationY = t;
var e = this._hasListenerCache;
e && e[d] && this.emit(d);
}
}
},
scaleX: {
get: function() {
return this._scaleX;
},
set: function(t) {
if (this._scaleX !== t) {
this._scaleX = t;
this._sgNode.scaleX = t;
var e = this._hasListenerCache;
e && e[f] && this.emit(f);
}
}
},
scaleY: {
get: function() {
return this._scaleY;
},
set: function(t) {
if (this._scaleY !== t) {
this._scaleY = t;
this._sgNode.scaleY = t;
var e = this._hasListenerCache;
e && e[f] && this.emit(f);
}
}
},
skewX: {
get: function() {
return this._skewX;
},
set: function(t) {
this._skewX = t;
this._sgNode.skewX = t;
}
},
skewY: {
get: function() {
return this._skewY;
},
set: function(t) {
this._skewY = t;
this._sgNode.skewY = t;
}
},
opacity: {
get: function() {
return this._opacity;
},
set: function(t) {
if (this._opacity !== t) {
this._opacity = t;
this._sgNode.setOpacity(t);
if (!this._cascadeOpacityEnabled) {
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacity(t);
}
}
},
range: [ 0, 255 ]
},
cascadeOpacity: {
get: function() {
return this._cascadeOpacityEnabled;
},
set: function(t) {
if (this._cascadeOpacityEnabled !== t) {
this._cascadeOpacityEnabled = t;
this._sgNode.cascadeOpacity = t;
var e = t ? 255 : this._opacity, i = this._sizeProvider;
i instanceof _ccsg.Node && i.setOpacity(e);
}
}
},
color: {
get: function() {
return this._color.clone();
},
set: function(t) {
if (!this._color.equals(t)) {
this._color.fromColor(t);
0;
this._sizeProvider instanceof _ccsg.Node && this._sizeProvider.setColor(t);
}
}
},
anchorX: {
get: function() {
return this._anchorPoint.x;
},
set: function(t) {
var e = this._anchorPoint;
if (e.x !== t) {
e.x = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit(u);
}
}
},
anchorY: {
get: function() {
return this._anchorPoint.y;
},
set: function(t) {
var e = this._anchorPoint;
if (e.y !== t) {
e.y = t;
var i = this._sizeProvider;
i instanceof _ccsg.Node && i.setAnchorPoint(e);
this.emit(u);
}
}
},
width: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getWidth();
this._contentSize.width = t;
return t;
}
return this._contentSize.width;
},
set: function(t) {
if (t !== this._contentSize.width) {
var e = this._sizeProvider;
e && e.setContentSize(t, e._getHeight());
this._contentSize.width = t;
this.emit(l);
}
}
},
height: {
get: function() {
if (this._sizeProvider) {
var t = this._sizeProvider._getHeight();
this._contentSize.height = t;
return t;
}
return this._contentSize.height;
},
set: function(t) {
if (t !== this._contentSize.height) {
var e = this._sizeProvider;
e && e.setContentSize(e._getWidth(), t);
this._contentSize.height = t;
this.emit(l);
}
}
},
zIndex: {
get: function() {
return this._localZOrder;
},
set: function(t) {
if (this._localZOrder !== t) {
this._localZOrder = t;
this._sgNode.zIndex = t;
this._parent && (function(t) {
t._parent._delaySort();
})(this);
}
}
}
},
ctor: function(t) {
var e = this._sgNode = new _ccsg.Node();
e.retain();
e._entity = this;
e.onEnter = function() {
_ccsg.Node.prototype.onEnter.call(this);
if (this._entity && !this._entity._active) {
g && cc.director.getActionManager().pauseTarget(this);
cc.eventManager.pauseTarget(this);
}
};
cc.game._isCloning || (e.cascadeOpacity = !0);
this._sizeProvider = null;
this._reorderChildDirty = !1;
this._widget = null;
this._touchListener = null;
this._mouseListener = null;
this._retainedActions = [];
},
statics: {
isNode: function(t) {
return t instanceof O && (t.constructor === O || !(t instanceof cc.Scene));
}
},
_onSetParent: function(t) {
var e = this._sgNode;
e.parent && e.parent.removeChild(e, !1);
if (t) {
t._sgNode.addChild(e);
t._delaySort();
}
},
_onSiblingIndexChanged: function(t) {
var e, i = this._parent, n = i._children, o = 0, r = n.length;
if (cc.runtime) for (;o < r; o++) {
var s = (e = n[o]._sgNode).getLocalZOrder();
e.setLocalZOrder(s + 1);
e.setLocalZOrder(s);
} else {
i._sgNode.removeChild(this._sgNode, !1);
if (t + 1 < n.length) {
var c = n[t + 1], a = this._sgNode.getLocalZOrder();
i._sgNode.insertChildBefore(this._sgNode, c._sgNode);
a !== this._sgNode.getLocalZOrder() && this._sgNode.setLocalZOrder(a);
} else i._sgNode.addChild(this._sgNode);
}
},
_onPreDestroy: function() {
var t = this._onPreDestroyBase();
g && cc.director.getActionManager().removeAllActionsFromTarget(this);
C === this && (C = null);
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._releaseAllActions();
if (this._touchListener) {
this._touchListener.release();
this._touchListener.owner = null;
this._touchListener.mask = null;
this._touchListener = null;
}
if (this._mouseListener) {
this._mouseListener.release();
this._mouseListener.owner = null;
this._mouseListener.mask = null;
this._mouseListener = null;
}
this._reorderChildDirty && cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
cc.eventManager.removeListeners(this);
if (t) {
this._sgNode._entity = null;
this._sgNode = null;
} else {
this._removeSgNode();
0;
}
},
_onPostActivated: function(t) {
var e = g ? cc.director.getActionManager() : null;
if (t) {
e && e.resumeTarget(this);
cc.eventManager.resumeTarget(this);
if (this._touchListener) {
var i = this._touchListener.mask = r(this);
this._mouseListener && (this._mouseListener.mask = i);
} else this._mouseListener && (this._mouseListener.mask = r(this));
} else {
e && e.pauseTarget(this);
cc.eventManager.pauseTarget(this);
}
},
_onHierarchyChanged: function(t) {
this._onHierarchyChangedBase(t);
cc._widgetManager._nodesOrderDirty = !0;
},
_onBatchCreated: function() {
var t = this._prefab;
t && t.sync && !t._synced && t.root === this && s.syncWithPrefab(this);
this._updateDummySgNode();
this._parent && this._parent._sgNode.addChild(this._sgNode);
if (!this._activeInHierarchy) {
g && cc.director.getActionManager().pauseTarget(this);
cc.eventManager.pauseTarget(this);
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
on: function(t, e, i, n) {
var o = !1;
if (-1 !== m.indexOf(t)) {
if (!this._touchListener) {
this._touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
owner: this,
mask: r(this),
onTouchBegan: T,
onTouchMoved: S,
onTouchEnded: E
});
this._touchListener.retain();
cc.eventManager.addListener(this._touchListener, this);
o = !0;
}
} else if (-1 !== b.indexOf(t) && !this._mouseListener) {
this._mouseListener = cc.EventListener.create({
event: cc.EventListener.MOUSE,
_previousIn: !1,
owner: this,
mask: r(this),
onMouseDown: A,
onMouseMove: x,
onMouseUp: w,
onMouseScroll: I
});
this._mouseListener.retain();
cc.eventManager.addListener(this._mouseListener, this);
o = !0;
}
o && !this._activeInHierarchy && cc.director.getScheduler().schedule((function() {
this._activeInHierarchy || cc.eventManager.pauseTarget(this);
}), this, 0, 0, 0, !1);
return this._EventTargetOn(t, e, i, n);
},
off: function(t, e, i, n) {
this._EventTargetOff(t, e, i, n);
-1 !== m.indexOf(t) ? this._checkTouchListeners() : -1 !== b.indexOf(t) && this._checkMouseListeners();
},
targetOff: function(t) {
this._EventTargetTargetOff(t);
this._checkTouchListeners();
this._checkMouseListeners();
},
pauseSystemEvents: function(t) {
cc.eventManager.pauseTarget(this, t);
},
resumeSystemEvents: function(t) {
cc.eventManager.resumeTarget(this, t);
},
_checkTouchListeners: function() {
if (!(this._objFlags & a) && this._touchListener) {
var t = 0;
if (this._bubblingListeners) for (;t < m.length; ++t) if (this._bubblingListeners.has(m[t])) return;
if (this._capturingListeners) for (;t < m.length; ++t) if (this._capturingListeners.has(m[t])) return;
cc.eventManager.removeListener(this._touchListener);
this._touchListener = null;
}
},
_checkMouseListeners: function() {
if (!(this._objFlags & a) && this._mouseListener) {
var t = 0;
if (this._bubblingListeners) for (;t < b.length; ++t) if (this._bubblingListeners.has(b[t])) return;
if (this._capturingListeners) for (;t < b.length; ++t) if (this._capturingListeners.has(b[t])) return;
C === this && (C = null);
cc.eventManager.removeListener(this._mouseListener);
this._mouseListener = null;
}
},
_hitTest: function(t, e) {
var i = this.width, n = this.height, o = cc.rect(0, 0, i, n), r = cc.Camera;
r && r.main && r.main.containsNode(this) && (t = r.main.getCameraToWorldPoint(t));
var s = this.getNodeToWorldTransform();
cc._rectApplyAffineTransformIn(o, s);
var c = t.x - o.x, a = o.x + o.width - t.x, h = t.y - o.y, l = o.y + o.height - t.y;
if (c >= 0 && a >= 0 && l >= 0 && h >= 0) {
if (e && e.mask) {
for (var u = e.mask, d = this, f = 0; d && f < u.index; ++f, d = d.parent) ;
if (d === u.node) {
var p = d.getComponent(cc.Mask);
return !p || !p.enabledInHierarchy || p._hitTest(t);
}
e.mask = null;
return !0;
}
return !0;
}
return !1;
},
_getCapturingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t, !0) && e.push(i);
i = i.parent;
}
},
_getBubblingTargets: function(t, e) {
for (var i = this.parent; i; ) {
i.hasEventListener(t) && e.push(i);
i = i.parent;
}
},
isRunning: function() {
return this._activeInHierarchy;
},
runAction: g ? function(t) {
if (this.active) {
cc.assertID(t, 1618);
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._retainAction(t);
this._sgNode._owner = this;
cc.director.getActionManager().addAction(t, this, !1);
return t;
}
} : v,
pauseAllActions: g ? function() {
cc.director.getActionManager().pauseTarget(this);
} : v,
resumeAllActions: g ? function() {
cc.director.getActionManager().resumeTarget(this);
} : v,
stopAllActions: g ? function() {
cc.director.getActionManager().removeAllActionsFromTarget(this);
} : v,
stopAction: g ? function(t) {
cc.director.getActionManager().removeAction(t);
} : v,
stopActionByTag: g ? function(t) {
t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612);
} : v,
getActionByTag: g ? function(t) {
if (t === cc.Action.TAG_INVALID) {
cc.logID(1613);
return null;
}
return cc.director.getActionManager().getActionByTag(t, this);
} : function() {
return null;
},
getNumberOfRunningActions: g ? function() {
return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this);
} : function() {
return 0;
},
_retainAction: function(t) {
if (t instanceof cc.Action && -1 === this._retainedActions.indexOf(t)) {
this._retainedActions.push(t);
t.retain();
}
},
_releaseAllActions: function() {
for (var t = 0; t < this._retainedActions.length; ++t) this._retainedActions[t].release();
this._retainedActions.length = 0;
},
setTag: function(t) {
this._tag = t;
this._sgNode.tag = t;
},
getPosition: function() {
return new cc.Vec2(this._position);
},
setPosition: function(i, n) {
var o;
if ("undefined" === ("object" == (e = typeof n) ? t(n) : e)) {
o = i.x;
n = i.y;
} else o = i;
var r = this._position;
if (r.x !== o || r.y !== n) {
r.x = o;
r.y = n;
this._sgNode.setPosition(o, n);
var s = this._hasListenerCache;
s && s[h] && this.emit(h);
}
},
getScale: function() {
this._scaleX !== this._scaleY && cc.logID(1603);
return this._scaleX;
},
setScale: function(i, n) {
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
} else n = n || 0 === n ? n : i;
if (this._scaleX !== i || this._scaleY !== n) {
this._scaleX = i;
this._scaleY = n;
this._sgNode.setScale(i, n);
var o = this._hasListenerCache;
o && o[f] && this.emit(f);
}
},
getContentSize: function(t) {
if (this._sizeProvider && !t) {
var e = this._sizeProvider.getContentSize();
this._contentSize = e;
return cc.size(e);
}
return cc.size(this._contentSize);
},
setContentSize: function(t, e) {
var i = this._contentSize;
if (void 0 === e) {
if (t.width === i.width && t.height === i.height) return;
0;
i.width = t.width;
i.height = t.height;
} else {
if (t === i.width && e === i.height) return;
0;
i.width = t;
i.height = e;
}
this._sizeProvider && this._sizeProvider.setContentSize(i);
this.emit(l);
},
setOpacityModifyRGB: function(t) {
if (this._opacityModifyRGB !== t) {
this._opacityModifyRGB = t;
this._sgNode.setOpacityModifyRGB(t);
var e = this._sizeProvider;
e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacityModifyRGB(t);
}
},
isOpacityModifyRGB: function() {
return this._opacityModifyRGB;
},
setGlobalZOrder: function(t) {
this._globalZOrder = t;
this._sgNode.setGlobalZOrder(t);
},
getGlobalZOrder: function() {
this._globalZOrder = this._sgNode.getGlobalZOrder();
return this._globalZOrder;
},
getAnchorPoint: function() {
return cc.p(this._anchorPoint);
},
setAnchorPoint: function(t, e) {
var i = this._anchorPoint;
if (void 0 === e) {
if (t.x === i.x && t.y === i.y) return;
i.x = t.x;
i.y = t.y;
} else {
if (t === i.x && e === i.y) return;
i.x = t;
i.y = e;
}
var n = this._sizeProvider;
n instanceof _ccsg.Node && n.setAnchorPoint(i);
this.emit(u);
},
getAnchorPointInPoints: function() {
return this._sgNode.getAnchorPointInPoints();
},
getDisplayedOpacity: function() {
return this._sgNode.getDisplayedOpacity();
},
_updateDisplayedOpacity: function(t) {
this._sgNode.updateDisplayedOpacity(t);
},
getDisplayedColor: function() {
return this._sgNode.getDisplayedColor();
},
getNodeToParentTransformAR: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getBoundingBox: function() {
var t = this.getContentSize(), e = cc.rect(0, 0, t.width, t.height);
return cc._rectApplyAffineTransformIn(e, this.getNodeToParentTransform());
},
getBoundingBoxToWorld: function() {
var t;
this.parent && (t = this.parent.getNodeToWorldTransformAR());
return this._getBoundingBoxTo(t);
},
_getBoundingBoxTo: function(t) {
var e = this.getContentSize(), i = e.width, n = e.height, o = cc.rect(-this._anchorPoint.x * i, -this._anchorPoint.y * n, i, n), r = cc.affineTransformConcat(this.getNodeToParentTransformAR(), t);
cc._rectApplyAffineTransformIn(o, r);
if (!this._children) return o;
for (var s = this._children, c = 0; c < s.length; c++) {
var a = s[c];
if (a && a.active) {
var h = a._getBoundingBoxTo(r);
h && (o = cc.rectUnion(o, h));
}
}
return o;
},
getNodeToParentTransform: function() {
var t = this.getContentSize(), e = this._sgNode.getNodeToParentTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getNodeToWorldTransform: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (this._isSgTransformArToMe(t)) {
var i = -this._anchorPoint.x * t.width, n = -this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getNodeToWorldTransformAR: function() {
var t = this.getContentSize();
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.getNodeToWorldTransform();
if (!this._isSgTransformArToMe(t)) {
var i = this._anchorPoint.x * t.width, n = this._anchorPoint.y * t.height, o = cc.affineTransformMake(1, 0, 0, 1, i, n);
e = cc.affineTransformConcatIn(o, e);
}
return e;
},
getParentToNodeTransform: function() {
return this._sgNode.getParentToNodeTransform();
},
getWorldToNodeTransform: function() {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.getWorldToNodeTransform();
},
_isSgTransformArToMe: function(t) {
var e = this._sgNode.getContentSize();
return 0 === e.width && 0 === e.height && (0 !== t.width || 0 !== t.height) || !!this._sgNode.isIgnoreAnchorPointForPosition();
},
convertToNodeSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = this._sgNode.convertToNodeSpace(t);
return cc.pAdd(e, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height));
},
convertToWorldSpace: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
var e = t.x - this._anchorPoint.x * this._contentSize.width, i = t.y - this._anchorPoint.y * this._contentSize.height;
return cc.v2(this._sgNode.convertToWorldSpace(cc.v2(e, i)));
},
convertToNodeSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToNodeSpace(t)) : this._sgNode.convertToNodeSpaceAR(t);
},
convertToWorldSpaceAR: function(t) {
cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
return this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToWorldSpace(t)) : cc.v2(this._sgNode.convertToWorldSpaceAR(t));
},
convertTouchToNodeSpace: function(t) {
return this.convertToNodeSpace(t.getLocation());
},
convertTouchToNodeSpaceAR: function(t) {
return this.convertToNodeSpaceAR(t.getLocation());
},
setNodeDirty: function() {
this._sgNode.setNodeDirty();
},
addChild: function(i, n, o) {
n = void 0 === n ? i._localZOrder : n;
var r, s = !1;
if ("undefined" === ("object" == (e = typeof o) ? t(o) : e)) {
o = void 0;
r = i._name;
} else if (cc.js.isString(o)) {
r = o;
o = void 0;
} else if (cc.js.isNumber(o)) {
s = !0;
r = "";
}
0;
cc.assertID(i, 1606);
cc.assertID(null === i._parent, 1605);
i.parent = this;
i.zIndex = n;
s ? i.setTag(o) : i.setName(r);
},
cleanup: function() {
g && cc.director.getActionManager().removeAllActionsFromTarget(this);
cc.eventManager.removeListeners(this);
var t, e, i = this._children.length;
for (t = 0; t < i; ++t) (e = this._children[t]) && e.cleanup();
},
sortAllChildren: function() {
if (this._reorderChildDirty) {
this._reorderChildDirty = !1;
var t = this._children;
if (t.length > 1) {
var e, i, n, o = t.length;
for (e = 1; e < o; e++) {
n = t[e];
i = e - 1;
for (;i >= 0; ) {
if (n._localZOrder < t[i]._localZOrder) t[i + 1] = t[i]; else {
if (!(n._localZOrder === t[i]._localZOrder && n._sgNode._arrivalOrder < t[i]._sgNode._arrivalOrder)) break;
t[i + 1] = t[i];
}
i--;
}
t[i + 1] = n;
}
this.emit("child-reorder");
}
cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_delaySort: function() {
if (!this._reorderChildDirty) {
this._reorderChildDirty = !0;
cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this);
}
},
_updateDummySgNode: function() {
var t = this._sgNode;
t.setPosition(this._position);
t.setRotationX(this._rotationX);
t.setRotationY(this._rotationY);
t.setScale(this._scaleX, this._scaleY);
t.setSkewX(this._skewX);
t.setSkewY(this._skewY);
var e = t._arrivalOrder;
t.setLocalZOrder(this._localZOrder);
t._arrivalOrder = e;
t.setGlobalZOrder(this._globalZOrder);
t.setColor(this._color);
t.setOpacity(this._opacity);
t.setOpacityModifyRGB(this._opacityModifyRGB);
t.setCascadeOpacityEnabled(this._cascadeOpacityEnabled);
t.setTag(this._tag);
},
_updateSgNode: function() {
this._updateDummySgNode();
var t = this._sgNode;
t.setAnchorPoint(this._anchorPoint);
t.setVisible(this._active);
t.setColor(this._color);
var e = g ? cc.director.getActionManager() : null;
if (this._activeInHierarchy) {
e && e.resumeTarget(this);
cc.eventManager.resumeTarget(this);
} else {
e && e.pauseTarget(this);
cc.eventManager.pauseTarget(this);
}
},
_removeSgNode: c.removeSgNode,
onRestore: !1
}), N = function() {
this._activeInHierarchy || cc.eventManager.pauseTarget(this);
};
cc.js.getset(O.prototype, "_sgNode", (function() {
return this.__sgNode;
}), (function(t) {
this.__sgNode = t;
if (this._touchListener || this._mouseListener) {
if (this._touchListener) {
this._touchListener.retain();
cc.eventManager.removeListener(this._touchListener);
cc.eventManager.addListener(this._touchListener, this);
this._touchListener.release();
}
if (this._mouseListener) {
this._mouseListener.retain();
cc.eventManager.removeListener(this._mouseListener);
cc.eventManager.addListener(this._mouseListener, this);
this._mouseListener.release();
}
cc.director.once(cc.Director.EVENT_BEFORE_UPDATE, N, this);
}
}), !0);
p.propertyDefine(O, [ "parent", "tag", "skewX", "skewY", "position", "rotation", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "opacity", "color" ], {
x: [ "getPositionX", "setPositionX" ],
y: [ "getPositionY", "setPositionY" ],
zIndex: [ "getLocalZOrder", "setLocalZOrder" ],
opacityModifyRGB: [ "isOpacityModifyRGB", "setOpacityModifyRGB" ],
cascadeOpacity: [ "isCascadeOpacityEnabled", "setCascadeOpacityEnabled" ]
});
O.EventType = y;
cc.Node = n.exports = O;
}), {
"./event/event": 86,
"./utils/base-node": 155,
"./utils/misc": 159,
"./utils/prefab-helper": 161,
"./utils/scene-graph-helper": 162
} ],
24: [ (function(t, e, i) {
cc.Scene = cc.Class({
name: "cc.Scene",
extends: t("./CCNode"),
properties: {
autoReleaseAssets: void 0
},
ctor: function() {
var t = this._sgNode = new _ccsg.Scene();
t.retain();
t.setAnchorPoint(0, 0);
this._anchorPoint.x = 0;
this._anchorPoint.y = 0;
this._activeInHierarchy = !1;
this._inited = !cc.game._isCloning;
this.dependAssets = null;
},
destroy: function() {
this._super();
this._activeInHierarchy = !1;
},
_onHierarchyChanged: function() {},
_instantiate: null,
_load: function() {
if (!this._inited) {
0;
this._onBatchCreated();
this._inited = !0;
}
},
_activate: function(t) {
t = !1 !== t;
0;
cc.director._nodeActivator.activateNode(this, t);
}
});
e.exports = cc.Scene;
}), {
"./CCNode": 23
} ],
25: [ (function(t, e, i) {
var n = t("./CCRawAsset");
cc.Asset = cc.Class({
name: "cc.Asset",
extends: n,
properties: {
rawUrl: {
get: function() {
if (this._rawFiles) {
if (cc.AssetLibrary) return cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/" + this._rawFiles[0];
cc.errorID(6400);
}
return "";
},
visible: !1
},
rawUrls: {
get: function() {
if (this._rawFiles) {
if (cc.AssetLibrary) {
var t = cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/";
return this._rawFiles.map((function(e) {
return t + e;
}));
}
cc.errorID(6401);
}
return [];
},
visible: !1
},
_rawFiles: null
},
statics: {
deserialize: function(t) {
return cc.deserialize(t);
},
preventDeferredLoadDependents: !1
},
serialize: function() {
return Editor.serialize(this);
},
createNode: null,
_setRawFiles: function(t) {
this._rawFiles = t.length > 0 ? t : null;
},
_preloadRawFiles: null
});
e.exports = cc.Asset;
}), {
"./CCRawAsset": 31
} ],
26: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AudioClip",
extends: cc.RawAsset
});
cc.AudioClip = n;
e.exports = n;
}), {} ],
27: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.BitmapFont",
extends: cc.Font,
properties: {
fntDataStr: {
default: ""
},
spriteFrame: {
default: null,
type: cc.SpriteFrame
},
fontSize: {
default: -1
},
_fntConfig: null
}
});
cc.BitmapFont = n;
e.exports = n;
}), {} ],
28: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Font",
extends: cc.Asset
});
cc.Font = n;
e.exports = n;
}), {} ],
29: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.LabelAtlas",
extends: cc.BitmapFont
});
cc.LabelAtlas = n;
e.exports = n;
}), {} ],
30: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Prefab",
extends: cc.Asset,
properties: {
data: null,
asyncLoadAssets: void 0,
_createFunction: {
default: null,
serializable: !1
}
},
createNode: !1,
compileCreateFunction: function() {
var e = t("../platform/instantiate-jit");
this._createFunction = e.compile(this.data);
},
_doInstantiate: function(t) {
this.data._prefab ? this.data._prefab._synced = !0 : cc.warnID(3700);
this._createFunction || this.compileCreateFunction();
return this._createFunction(t);
},
_instantiate: function() {
var t;
t = this._doInstantiate();
this.data._instantiate(t);
0;
return t;
}
});
cc.Prefab = e.exports = n;
cc.js.obsolete(cc, "cc._Prefab", "Prefab");
}), {
"../platform/instantiate-jit": 147
} ],
31: [ (function(t, e, i) {
var n = t("../platform/CCObject");
cc.RawAsset = cc.Class({
name: "cc.RawAsset",
extends: n,
ctor: function() {
Object.defineProperty(this, "_uuid", {
value: "",
writable: !0
});
},
statics: {
createNodeByInfo: null
}
});
Object.defineProperty(cc.RawAsset, "isRawAssetType", {
value: function(t) {
return cc.isChildClassOf(t, cc.RawAsset) && !cc.isChildClassOf(t, cc.Asset);
}
});
e.exports = cc.RawAsset;
}), {
"../platform/CCObject": 137
} ],
32: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SceneAsset",
extends: cc.Asset,
properties: {
scene: null,
asyncLoadAssets: void 0
}
});
cc.SceneAsset = n;
e.exports = n;
}), {} ],
33: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Script",
extends: cc.Asset
});
cc._Script = n;
var o = cc.Class({
name: "cc.JavaScript",
extends: n
});
cc._JavaScript = o;
var r = cc.Class({
name: "cc.CoffeeScript",
extends: n
});
cc._CoffeeScript = r;
var s = cc.Class({
name: "cc.TypeScript",
extends: n
});
cc._TypeScript = s;
}), {} ],
34: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SpriteAtlas",
extends: cc.Asset,
properties: {
_spriteFrames: {
default: {}
}
},
getTexture: function() {
var t = Object.keys(this._spriteFrames);
if (t.length > 0) {
var e = this._spriteFrames[t[0]];
return e ? e.getTexture() : null;
}
return null;
},
getSpriteFrame: function(t) {
return this._spriteFrames[t];
},
getSpriteFrames: function() {
var t = [], e = this._spriteFrames;
for (var i in e) t.push(e[i]);
return t;
}
});
cc.SpriteAtlas = n;
e.exports = n;
}), {} ],
35: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TTFFont",
extends: cc.Font
});
cc.TTFFont = n;
e.exports = n;
}), {} ],
36: [ (function(t, e, i) {
t("./CCRawAsset");
t("./CCAsset");
t("./CCFont");
t("./CCPrefab");
t("./CCAudioClip");
t("./CCScripts");
t("./CCSceneAsset");
t("../sprites/CCSpriteFrame");
t("../textures/CCTexture2D");
t("./CCTTFFont");
t("./CCSpriteAtlas");
t("./CCBitmapFont");
t("./CCLabelAtlas");
}), {
"../sprites/CCSpriteFrame": 1,
"../textures/CCTexture2D": 1,
"./CCAsset": 25,
"./CCAudioClip": 26,
"./CCBitmapFont": 27,
"./CCFont": 28,
"./CCLabelAtlas": 29,
"./CCPrefab": 30,
"./CCRawAsset": 31,
"./CCSceneAsset": 32,
"./CCScripts": 33,
"./CCSpriteAtlas": 34,
"./CCTTFFont": 35
} ],
37: [ (function(t, e, i) {
function n(t) {
return t instanceof cc.Scene ? cc.visibleRect : !t._sizeProvider || t._sizeProvider instanceof _ccsg.Node ? t._contentSize : t.getContentSize();
}
function o(t, e, i, n) {
for (var o = t._parent._scaleX, r = t._parent._scaleY, s = 0, c = 0, a = t._parent; ;) {
var h = a._position;
s += h.x;
c += h.y;
if (!(a = a._parent)) {
i.x = i.y = 0;
n.x = n.y = 1;
return;
}
if (a === e) break;
var l = a._scaleX, u = a._scaleY;
s *= l;
c *= u;
o *= l;
r *= u;
}
n.x = 0 !== o ? 1 / o : 1;
n.y = 0 !== r ? 1 / r : 1;
i.x = -s;
i.y = -c;
}
function r(t, e) {
var i, r, s, c = e._target;
c ? o(t, i = c, r = u, s = d) : i = t._parent;
var a = n(i), f = i._anchorPoint, p = i instanceof cc.Scene, _ = t._position.x, g = t._position.y, v = t._anchorPoint;
if (e._alignFlags & h) {
var y, m, b = a.width;
if (p) {
y = cc.visibleRect.left.x;
m = cc.visibleRect.right.x;
} else m = (y = -f.x * b) + b;
y += e._isAbsLeft ? e._left : e._left * b;
m -= e._isAbsRight ? e._right : e._right * b;
if (c) {
y += r.x;
y *= s.x;
m += r.x;
m *= s.x;
}
var C, T = v.x, S = t._scaleX;
if (S < 0) {
T = 1 - T;
S = -S;
}
if (e.isStretchWidth) {
C = m - y;
0 !== S && (t.width = C / S);
_ = y + T * C;
} else {
C = t.width * S;
if (e.isAlignHorizontalCenter) {
var E = e._isAbsHorizontalCenter ? e._horizontalCenter : e._horizontalCenter * b, A = (.5 - f.x) * a.width;
if (c) {
E *= s.x;
A += r.x;
A *= s.x;
}
_ = A + (T - .5) * C + E;
} else _ = e.isAlignLeft ? y + T * C : m + (T - 1) * C;
}
}
if (e._alignFlags & l) {
var x, w, I = a.height;
if (p) {
w = cc.visibleRect.bottom.y;
x = cc.visibleRect.top.y;
} else x = (w = -f.y * I) + I;
w += e._isAbsBottom ? e._bottom : e._bottom * I;
x -= e._isAbsTop ? e._top : e._top * I;
if (c) {
w += r.y;
w *= s.y;
x += r.y;
x *= s.y;
}
var O, N = v.y, L = t._scaleY;
if (L < 0) {
N = 1 - N;
L = -L;
}
if (e.isStretchHeight) {
O = x - w;
0 !== L && (t.height = O / L);
g = w + N * O;
} else {
O = t.height * L;
if (e.isAlignVerticalCenter) {
var P = e._isAbsVerticalCenter ? e._verticalCenter : e._verticalCenter * I, R = (.5 - f.y) * a.height;
if (c) {
P *= s.y;
R += r.y;
R *= s.y;
}
g = R + (N - .5) * O + P;
} else g = e.isAlignBottom ? w + N * O : x + (N - 1) * O;
}
}
t.setPosition(_, g);
}
function s(t) {
var e = t._widget;
if (e) {
r(t, e);
e.isAlignOnce ? e.enabled = !1 : f.push(e);
}
for (var i = t._children, n = 0; n < i.length; n++) {
var o = i[n];
o._active && s(o);
}
}
function c() {
var t = cc.director.getScene();
if (t) {
p.isAligning = !0;
if (p._nodesOrderDirty) {
f.length = 0;
s(t);
p._nodesOrderDirty = !1;
} else {
var e, i = p._activeWidgetsIterator;
for (i.i = 0; i.i < f.length; ++i.i) r((e = f[i.i]).node, e);
}
p.isAligning = !1;
}
0;
}
function a(t) {
var e = t._parent;
cc.Node.isNode(e) && a(e);
var i = t._widget || t.getComponent(cc.Widget);
i && r(t, i);
}
var h = 56, l = 7, u = cc.Vec2.ZERO, d = cc.Vec2.ONE, f = [], p = cc._widgetManager = e.exports = {
_AlignFlags: {
TOP: 1,
MID: 2,
BOT: 4,
LEFT: 8,
CENTER: 16,
RIGHT: 32
},
isAligning: !1,
_nodesOrderDirty: !1,
_activeWidgetsIterator: new cc.js.array.MutableForwardIterator(f),
init: function(t) {
t.on(cc.Director.EVENT_BEFORE_VISIT, c);
},
add: function(t) {
t.node._widget = t;
this._nodesOrderDirty = !0;
0;
},
remove: function(t) {
t.node._widget = null;
this._activeWidgetsIterator.remove(t);
0;
},
updateAlignment: a
};
0;
}), {} ],
38: [ (function(t, e, i) {
0;
var n = cc.Class({
name: "cc.Camera",
extends: cc._RendererUnderSG,
ctor: function() {
this.viewMatrix = cc.affineTransformMake();
this.invertViewMatrix = cc.affineTransformMake();
this._lastViewMatrix = cc.affineTransformMake();
this._sgTarges = [];
this._checkedTimes = 0;
this.visibleRect = {
left: cc.v2(),
right: cc.v2(),
top: cc.v2(),
bottom: cc.v2()
};
this.viewPort = cc.rect();
},
editor: !1,
properties: {
_targets: {
default: [],
type: cc.Node,
visible: !0
},
zoomRatio: 1
},
statics: {
main: null
},
_createSgNode: function() {
if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
cc.errorID(8301);
var t = new _ccsg.Node();
t.setTransform = t.addTarget = t.removeTarget = function() {};
return t;
}
return new _ccsg.CameraNode();
},
_initSgNode: function() {
this._sgNode.setContentSize(this.node.getContentSize(!0));
},
_addSgTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && !e._cameraInfo) {
e._cameraInfo = {
touched: this._checkedTimes
};
this._sgNode.addTarget(e);
this._sgTarges.push(e);
}
},
_removeTargetInSg: function(t) {
var e;
t instanceof cc.Node ? e = t._sgNode : t instanceof _ccsg.Node && (e = t);
if (e && e._cameraInfo) {
this._sgNode.removeTarget(e);
delete e._cameraInfo;
cc.js.array.remove(this._sgTarges, e);
}
},
onEnable: function() {
if (n.main) cc.errorID(8300); else {
n.main = this;
this._sgNode.setEnable(!0);
for (var t = this._targets, e = 0, i = t.length; e < i; e++) this._addSgTargetInSg(t[e]);
}
},
onDisable: function() {
if (n.main === this) {
n.main = null;
this._sgNode.setEnable(!1);
for (var t = this._sgTarges, e = t.length - 1; e >= 0; e--) this._removeTargetInSg(t[e]);
}
},
addTarget: function(t) {
if (-1 === this._targets.indexOf(t)) {
this._addSgTargetInSg(t);
this._targets.push(t);
}
},
removeTarget: function(t) {
if (-1 !== this._targets.indexOf(t)) {
this._removeTargetInSg(t);
cc.js.array.remove(this._targets, t);
}
},
getTargets: function() {
return this._targets;
},
getNodeToCameraTransform: function(t) {
var e = t.getNodeToWorldTransform();
this.containsNode(t) && (e = cc.affineTransformConcatIn(e, cc.Camera.main.viewMatrix));
return e;
},
getCameraToWorldPoint: function(t) {
cc.Camera.main && (t = cc.pointApplyAffineTransform(t, cc.Camera.main.invertViewMatrix));
return t;
},
containsNode: function(t) {
t instanceof cc.Node && (t = t._sgNode);
for (var e = this._sgTarges; t; ) {
if (-1 !== e.indexOf(t)) return !0;
t = t.parent;
}
return !1;
},
_setSgNodesCullingDirty: function() {
for (var t = this._sgTarges, e = 0; e < t.length; e++) t[e].markCullingDirty();
},
_checkSgTargets: function() {
for (var t = this._targets, e = this._sgTarges, i = ++this._checkedTimes, n = 0, o = t.length; n < o; n++) {
var r = t[n], s = r;
r instanceof cc.Node && (s = r._sgNode) && !s._cameraInfo && this._addSgTargetInSg(s);
s && (s._cameraInfo.touched = i);
}
for (var c = e.length - 1; c >= 0; c--) {
var a = e[c];
a._cameraInfo.touched !== i && this._removeTargetInSg(a);
}
},
lateUpdate: function() {
this._checkSgTargets();
var t = this.viewMatrix, e = this.invertViewMatrix, i = this.viewPort, n = cc.visibleRect, o = this.visibleRect, r = this.node.getNodeToWorldTransformAR(), s = .5 * -(Math.atan2(r.b, r.a) + Math.atan2(-r.c, r.d)), c = 1, a = 0, h = 0, l = 1;
if (s) {
h = Math.sin(s);
c = l = Math.cos(s);
a = -h;
}
var u = this.zoomRatio;
c *= u;
a *= u;
h *= u;
l *= u;
t.a = c;
t.b = a;
t.c = h;
t.d = l;
var d = n.center;
t.tx = d.x - (c * r.tx + h * r.ty);
t.ty = d.y - (a * r.tx + l * r.ty);
cc.affineTransformInvertOut(t, e);
i.x = n.bottomLeft.x;
i.y = n.bottomLeft.y;
i.width = n.width;
i.height = n.height;
cc._rectApplyAffineTransformIn(i, e);
o.left.x = i.xMin;
o.right.x = i.xMax;
o.bottom.y = i.yMin;
o.top.y = i.yMax;
this._sgNode.setTransform(c, a, h, l, t.tx, t.ty);
var f = this._lastViewMatrix;
if (f.a !== t.a || f.b !== t.b || f.c !== t.c || f.d !== t.d || f.tx !== t.tx || f.ty !== t.ty) {
this._setSgNodesCullingDirty();
f.a = t.a;
f.b = t.b;
f.c = t.c;
f.d = t.d;
f.tx = t.tx;
f.ty = t.ty;
}
}
});
n.flags = cc.Enum({
InCamera: 1,
ParentInCamera: 2
});
e.exports = cc.Camera = n;
}), {
"./CCSGCameraNode": 1
} ],
39: [ (function(t, e, i) {
cc.Collider.Box = cc.Class({
properties: {
_offset: cc.v2(0, 0),
_size: cc.size(100, 100),
offset: {
tooltip: !1,
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
size: {
tooltip: !1,
get: function() {
return this._size;
},
set: function(t) {
this._size.width = t.width < 0 ? 0 : t.width;
this._size.height = t.height < 0 ? 0 : t.height;
},
type: cc.Size
}
},
resetInEditor: !1
});
var n = cc.Class({
name: "cc.BoxCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Box ],
editor: !1
});
cc.BoxCollider = e.exports = n;
}), {} ],
40: [ (function(t, e, i) {
cc.Collider.Circle = cc.Class({
properties: {
_offset: cc.v2(0, 0),
_radius: 50,
offset: {
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
radius: {
tooltip: !1,
get: function() {
return this._radius;
},
set: function(t) {
this._radius = t < 0 ? 0 : t;
}
}
},
resetInEditor: !1
});
var n = cc.Class({
name: "cc.CircleCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Circle ],
editor: !1
});
cc.CircleCollider = e.exports = n;
}), {} ],
41: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Collider",
extends: cc.Component,
properties: {
editing: {
default: !1,
serializable: !1,
tooltip: !1
},
tag: {
tooltip: !1,
default: 0,
range: [ 0, 1e7 ],
type: cc.Integer
}
},
onDisable: function() {
cc.director.getCollisionManager().removeCollider(this);
},
onEnable: function() {
cc.director.getCollisionManager().addCollider(this);
}
});
cc.Collider = e.exports = n;
}), {} ],
42: [ (function(t, e, i) {
var n = t("./CCContact"), o = n.CollisionType, r = cc.rect(), s = cc.v2(), c = cc.Class({
mixins: [ cc.EventTarget ],
properties: {
enabled: !1,
enabledDrawBoundingBox: !1
},
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._contacts = [];
this._colliders = [];
this._debugDrawer = null;
this._enabledDebugDraw = !1;
},
update: function(t) {
if (this.enabled) {
var e, i, n = this._colliders;
for (e = 0, i = n.length; e < i; e++) this.updateCollider(n[e]);
var r = this._contacts, s = [];
for (e = 0, i = r.length; e < i; e++) {
var c = r[e].updateState();
c !== o.None && s.push([ c, r[e] ]);
}
for (e = 0, i = s.length; e < i; e++) {
var a = s[e];
this._doCollide(a[0], a[1]);
}
this.drawColliders();
}
},
_doCollide: function(t, e) {
var i;
switch (t) {
case o.CollisionEnter:
i = "onCollisionEnter";
break;

case o.CollisionStay:
i = "onCollisionStay";
break;

case o.CollisionExit:
i = "onCollisionExit";
}
var n, r, s, c = e.collider1, a = e.collider2, h = c.node._components, l = a.node._components;
for (n = 0, r = h.length; n < r; n++) (s = h[n])[i] && s[i](a, c);
for (n = 0, r = l.length; n < r; n++) (s = l[n])[i] && s[i](c, a);
},
shouldCollide: function(t, e) {
var i = t.node, n = e.node, o = cc.game.collisionMatrix;
return i !== n && o[i.groupIndex][n.groupIndex];
},
initCollider: function(t) {
if (!t.world) {
var e = t.world = {};
e.aabb = cc.rect();
e.preAabb = cc.rect();
e.radius = 0;
if (t instanceof cc.BoxCollider) {
e.position = null;
e.points = [ cc.v2(), cc.v2(), cc.v2(), cc.v2() ];
} else if (t instanceof cc.PolygonCollider) {
e.position = null;
e.points = t.points.map((function(t) {
return cc.v2(t.x, t.y);
}));
} else if (t instanceof cc.CircleCollider) {
e.position = cc.v2();
e.points = null;
}
}
},
updateCollider: function(t) {
var e = t.offset, i = t.world, n = i.aabb, o = i.transform = t.node.getNodeToWorldTransformAR(), c = i.preAabb;
c.x = n.x;
c.y = n.y;
c.width = n.width;
c.height = n.height;
if (t instanceof cc.BoxCollider) {
var a = t.size;
r.x = e.x - a.width / 2;
r.y = e.y - a.height / 2;
r.width = a.width;
r.height = a.height;
var h = i.points, l = h[0], u = h[1], d = h[2], f = h[3];
cc.obbApplyAffineTransform(r, o, l, u, d, f);
var p = Math.min(l.x, u.x, d.x, f.x), _ = Math.min(l.y, u.y, d.y, f.y), g = Math.max(l.x, u.x, d.x, f.x), v = Math.max(l.y, u.y, d.y, f.y);
n.x = p;
n.y = _;
n.width = g - p;
n.height = v - _;
} else if (t instanceof cc.CircleCollider) {
var y = cc.pointApplyAffineTransform(t.offset, o);
i.position.x = y.x;
i.position.y = y.y;
o.tx = o.ty = 0;
s.x = t.radius;
s.y = 0;
var m = cc.pointApplyAffineTransform(s, o), b = Math.sqrt(m.x * m.x + m.y * m.y);
i.radius = b;
n.x = y.x - b;
n.y = y.y - b;
n.width = 2 * b;
n.height = 2 * b;
} else if (t instanceof cc.PolygonCollider) {
var C = t.points, T = i.points;
T.length = C.length;
p = 1e6, _ = 1e6, g = -1e6, v = -1e6;
for (var S = 0, E = C.length; S < E; S++) {
T[S] || (T[S] = cc.v2());
s.x = C[S].x + e.x;
s.y = C[S].y + e.y;
y = cc.pointApplyAffineTransform(s, o);
T[S].x = y.x;
T[S].y = y.y;
y.x > g && (g = y.x);
y.x < p && (p = y.x);
y.y > v && (v = y.y);
y.y < _ && (_ = y.y);
}
n.x = p;
n.y = _;
n.width = g - p;
n.height = v - _;
}
},
addCollider: function(t) {
var e = this._colliders;
if (-1 === e.indexOf(t)) {
for (var i = 0, o = e.length; i < o; i++) {
var r = e[i];
if (this.shouldCollide(t, r)) {
var s = new n(t, r);
this._contacts.push(s);
}
}
e.push(t);
this.initCollider(t);
}
t.node.on("group-changed", this.onNodeGroupChanged, this);
},
removeCollider: function(t) {
var e = this._colliders, i = e.indexOf(t);
if (i >= 0) {
e.splice(i, 1);
for (var n = this._contacts, r = n.length - 1; r >= 0; r--) {
var s = n[r];
if (s.collider1 === t || s.collider2 === t) {
s.touching && this._doCollide(o.CollisionExit, s);
n.splice(r, 1);
}
}
t.node.off("group-changed", this.onNodeGroupChanged, this);
} else cc.errorID(6600);
},
attachDebugDrawToCamera: function(t) {
this._debugDrawer && t.addTarget(this._debugDrawer);
},
detachDebugDrawFromCamera: function(t) {
this._debugDrawer && t.removeTarget(this._debugDrawer);
},
onNodeGroupChanged: function(t) {
for (var e = t.currentTarget.getComponents(cc.Collider), i = 0, n = e.length; i < n; i++) {
this.removeCollider(e[i]);
this.addCollider(e[i]);
}
},
drawColliders: function() {
var t = this._debugDrawer;
if (this._enabledDebugDraw && t) {
t.clear();
for (var e = this._colliders, i = 0, n = e.length; i < n; i++) {
var o = e[i];
if (o instanceof cc.BoxCollider || o instanceof cc.PolygonCollider) {
var r = o.world.points;
if (r.length > 0) {
t.strokeColor = cc.Color.WHITE;
t.moveTo(r[0].x, r[0].y);
for (var s = 1; s < r.length; s++) t.lineTo(r[s].x, r[s].y);
t.close();
t.stroke();
}
} else if (o instanceof cc.CircleCollider) {
t.circle(o.world.position.x, o.world.position.y, o.world.radius);
t.stroke();
}
if (this.enabledDrawBoundingBox) {
var c = o.world.aabb;
t.strokeColor = cc.Color.BLUE;
t.moveTo(c.xMin, c.yMin);
t.lineTo(c.xMin, c.yMax);
t.lineTo(c.xMax, c.yMax);
t.lineTo(c.xMax, c.yMin);
t.close();
t.stroke();
}
}
}
},
onSceneLaunched: function() {
if (this._enabledDebugDraw && this._debugDrawer) {
this._debugDrawer.removeFromParent();
cc.director.getScene()._sgNode.addChild(this._debugDrawer);
}
}
});
cc.js.getset(c.prototype, "enabledDebugDraw", (function() {
return this._enabledDebugDraw;
}), (function(t) {
if (t && !this._enabledDebugDraw) {
if (!this._debugDrawer) {
this._debugDrawer = new _ccsg.GraphicsNode();
this._debugDrawer.retain();
}
cc.director.getScene()._sgNode.addChild(this._debugDrawer);
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneLaunched, this);
} else if (!t && this._enabledDebugDraw) {
this._debugDrawer.clear();
this._debugDrawer.removeFromParent(!1);
cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneLaunched, this);
}
this._enabledDebugDraw = t;
}));
cc.CollisionManager = e.exports = c;
}), {
"./CCContact": 43
} ],
43: [ (function(t, e, i) {
function n(t, e) {
this.collider1 = t;
this.collider2 = e;
this.touching = !1;
var i = t instanceof cc.BoxCollider || t instanceof cc.PolygonCollider, n = e instanceof cc.BoxCollider || e instanceof cc.PolygonCollider, r = t instanceof cc.CircleCollider, s = e instanceof cc.CircleCollider;
if (i && n) this.testFunc = o.polygonPolygon; else if (r && s) this.testFunc = o.circleCircle; else if (i && s) this.testFunc = o.polygonCircle; else if (r && n) {
this.testFunc = o.polygonCircle;
this.collider1 = e;
this.collider2 = t;
} else cc.errorID(6601, cc.js.getClassName(t), cc.js.getClassName(e));
}
var o = t("./CCIntersection"), r = cc.Enum({
None: 0,
CollisionEnter: 1,
CollisionStay: 2,
CollisionExit: 3
});
n.prototype.test = function() {
var t = this.collider1.world, e = this.collider2.world;
return !!t.aabb.intersects(e.aabb) && (this.testFunc === o.polygonPolygon ? this.testFunc(t.points, e.points) : this.testFunc === o.circleCircle ? this.testFunc(t, e) : this.testFunc === o.polygonCircle && this.testFunc(t.points, e));
};
n.prototype.updateState = function() {
var t = this.test(), e = r.None;
if (t && !this.touching) {
this.touching = !0;
e = r.CollisionEnter;
} else if (t && this.touching) e = r.CollisionStay; else if (!t && this.touching) {
this.touching = !1;
e = r.CollisionExit;
}
return e;
};
n.CollisionType = r;
e.exports = n;
}), {
"./CCIntersection": 44
} ],
44: [ (function(t, e, i) {
function n(t, e, i, n) {
var o = (n.x - i.x) * (t.y - i.y) - (n.y - i.y) * (t.x - i.x), r = (e.x - t.x) * (t.y - i.y) - (e.y - t.y) * (t.x - i.x), s = (n.y - i.y) * (e.x - t.x) - (n.x - i.x) * (e.y - t.y);
if (0 !== s) {
var c = o / s, a = r / s;
if (0 <= c && c <= 1 && 0 <= a && a <= 1) return !0;
}
return !1;
}
function o(t, e, i) {
for (var o = i.length, r = 0; r < o; ++r) {
if (n(t, e, i[r], i[(r + 1) % o])) return !0;
}
return !1;
}
function r(t, e) {
for (var i = !1, n = t.x, o = t.y, r = e.length, s = 0, c = r - 1; s < r; c = s++) {
var a = e[s].x, h = e[s].y, l = e[c].x, u = e[c].y;
h > o != u > o && n < (l - a) * (o - h) / (u - h) + a && (i = !i);
}
return i;
}
function s(t, e, i, n) {
var o, r = i.x - e.x, s = i.y - e.y, c = r * r + s * s, a = ((t.x - e.x) * r + (t.y - e.y) * s) / c;
o = n ? c ? a < 0 ? e : a > 1 ? i : cc.v2(e.x + a * r, e.y + a * s) : e : cc.v2(e.x + a * r, e.y + a * s);
r = t.x - o.x;
s = t.y - o.y;
return Math.sqrt(r * r + s * s);
}
var c = {};
c.lineLine = n;
c.lineRect = function(t, e, i) {
var o = new cc.Vec2(i.x, i.y), r = new cc.Vec2(i.x, i.yMax), s = new cc.Vec2(i.xMax, i.yMax), c = new cc.Vec2(i.xMax, i.y);
return !!(n(t, e, o, r) || n(t, e, r, s) || n(t, e, s, c) || n(t, e, c, o));
};
c.linePolygon = o;
c.rectRect = function(t, e) {
var i = t.x, n = t.y, o = t.x + t.width, r = t.y + t.height, s = e.x, c = e.y, a = e.x + e.width, h = e.y + e.height;
return i <= a && o >= s && n <= h && r >= c;
};
c.rectPolygon = function(t, e) {
var i, n, s = new cc.Vec2(t.x, t.y), c = new cc.Vec2(t.x, t.yMax), a = new cc.Vec2(t.xMax, t.yMax), h = new cc.Vec2(t.xMax, t.y);
if (o(s, c, e)) return !0;
if (o(c, a, e)) return !0;
if (o(a, h, e)) return !0;
if (o(h, s, e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (r(e[i], t)) return !0;
return !!(r(s, e) || r(c, e) || r(a, e) || r(h, e));
};
c.polygonPolygon = function(t, e) {
var i, n;
for (i = 0, n = t.length; i < n; ++i) if (o(t[i], t[(i + 1) % n], e)) return !0;
for (i = 0, n = e.length; i < n; ++i) if (r(e[i], t)) return !0;
for (i = 0, n = t.length; i < n; ++i) if (r(t[i], e)) return !0;
return !1;
};
c.circleCircle = function(t, e) {
return t.position.sub(e.position).mag() < t.radius + e.radius;
};
c.polygonCircle = function(t, e) {
var i = e.position;
if (r(i, t)) return !0;
for (var n = 0, o = t.length; n < o; n++) if (s(i, 0 === n ? t[t.length - 1] : t[n - 1], t[n], !0) < e.radius) return !0;
return !1;
};
c.pointInPolygon = r;
c.pointLineDistance = s;
cc.Intersection = e.exports = c;
}), {} ],
45: [ (function(t, e, i) {
cc.Collider.Polygon = cc.Class({
properties: {
threshold: {
default: 1,
serializable: !1,
visible: !1
},
_offset: cc.v2(0, 0),
offset: {
get: function() {
return this._offset;
},
set: function(t) {
this._offset = t;
},
type: cc.Vec2
},
points: {
tooltip: !1,
default: function() {
return [ cc.v2(-50, -50), cc.v2(50, -50), cc.v2(50, 50), cc.v2(-50, 50) ];
},
type: [ cc.Vec2 ]
}
},
resetPointsByContour: !1
});
var n = cc.Class({
name: "cc.PolygonCollider",
extends: cc.Collider,
mixins: [ cc.Collider.Polygon ],
editor: !1
});
cc.PolygonCollider = e.exports = n;
}), {} ],
46: [ (function(t, e, i) {
t("./CCCollisionManager");
t("./CCCollider");
t("./CCBoxCollider");
t("./CCCircleCollider");
t("./CCPolygonCollider");
}), {
"./CCBoxCollider": 39,
"./CCCircleCollider": 40,
"./CCCollider": 41,
"./CCCollisionManager": 42,
"./CCPolygonCollider": 45
} ],
47: [ (function(i, n, o) {
function r(t, e) {
for (var i = e.constructor._executionOrder, n = e.__instanceId, o = 0, r = t.length - 1, s = r >>> 1; o <= r; s = o + r >>> 1) {
var c = t[s], a = c.constructor._executionOrder;
if (a > i) r = s - 1; else if (a < i) o = s + 1; else {
var h = c.__instanceId;
if (h > n) r = s - 1; else {
if (!(h < n)) return s;
o = s + 1;
}
}
}
return ~o;
}
function s(t, e) {
for (var i = t.array, n = t.i + 1; n < i.length; ) {
var o = i[n];
if (o._enabled && o.node._activeInHierarchy) ++n; else {
t.removeAt(n);
e && (o._objFlags &= ~e);
}
}
}
function c(t, e) {
return t.constructor._executionOrder - e.constructor._executionOrder;
}
function a(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) return n ? function(t, e) {
var n = t.array;
for (t.i = 0; t.i < n.length; ++t.i) {
var o = n[t.i];
i(o, e);
}
} : function(t) {
var e = t.array;
for (t.i = 0; t.i < e.length; ++t.i) {
var n = e[t.i];
i(n);
}
};
var o = "var a=it.array;for(it.i=0;it.i<a.length;++it.i){var c=a[it.i];" + i + "}";
return n ? Function("it", "dt", o) : Function("it", o);
}
function h() {
this.startInvoker = new y(a(p));
this.updateInvoker = new m(a(_, !0));
this.lateUpdateInvoker = new m(a(g, !0));
this.scheduleInNextFrame = [];
this._updating = !1;
}
i("./platform/CCClass");
var l = i("./platform/CCObject").Flags, u = i("./platform/js").array, d = l.IsStartCalled, f = l.IsOnEnableCalled, p = (l.IsEditorOnEnableCalled, 
"c.start();c._objFlags|=" + d), _ = "c.update(dt)", g = "c.lateUpdate(dt)", v = cc.Class({
__ctor__: function(t) {
var e = u.MutableForwardIterator;
this._zero = new e([]);
this._neg = new e([]);
this._pos = new e([]);
0;
this._invoke = t;
},
statics: {
stableRemoveInactive: s
},
add: null,
remove: null,
invoke: null
}), y = cc.Class({
extends: v,
add: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).array.push(t);
},
remove: function(t) {
var e = t.constructor._executionOrder;
(0 === e ? this._zero : e < 0 ? this._neg : this._pos).fastRemove(t);
},
cancelInactive: function(t) {
s(this._zero, t);
s(this._neg, t);
s(this._pos, t);
},
invoke: function() {
var t = this._neg;
if (t.array.length > 0) {
t.array.sort(c);
this._invoke(t);
t.array.length = 0;
}
this._invoke(this._zero);
this._zero.array.length = 0;
var e = this._pos;
if (e.array.length > 0) {
e.array.sort(c);
this._invoke(e);
e.array.length = 0;
}
}
}), m = cc.Class({
extends: v,
add: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.array.push(t); else {
var i = e < 0 ? this._neg.array : this._pos.array, n = r(i, t);
n < 0 && i.splice(~n, 0, t);
}
},
remove: function(t) {
var e = t.constructor._executionOrder;
if (0 === e) this._zero.fastRemove(t); else {
var i = e < 0 ? this._neg : this._pos, n = r(i.array, t);
n >= 0 && i.removeAt(n);
}
},
invoke: function(t) {
this._neg.array.length > 0 && this._invoke(this._neg, t);
this._invoke(this._zero, t);
this._pos.array.length > 0 && this._invoke(this._pos, t);
}
}), b = cc.Class({
ctor: h,
unscheduleAll: h,
statics: {
LifeCycleInvoker: v,
OneOffInvoker: y,
createInvokeImpl: a,
invokeOnEnable: function(t) {
var e = cc.director._compScheduler, i = t.array;
for (t.i = 0; t.i < i.length; ++t.i) {
var n = i[t.i];
if (n._enabled) {
n.onEnable();
!n.node._activeInHierarchy || e._onEnabled(n);
}
}
}
},
_onEnabled: function(t) {
cc.director.getScheduler().resumeTarget(t);
t._objFlags |= f;
this._updating ? this.scheduleInNextFrame.push(t) : this._scheduleImmediate(t);
},
_onDisabled: function(t) {
cc.director.getScheduler().pauseTarget(t);
t._objFlags &= ~f;
var e = this.scheduleInNextFrame.indexOf(t);
if (e >= 0) u.fastRemoveAt(this.scheduleInNextFrame, e); else {
!t.start || t._objFlags & d || this.startInvoker.remove(t);
t.update && this.updateInvoker.remove(t);
t.lateUpdate && this.lateUpdateInvoker.remove(t);
}
},
enableComp: function(t, e) {
if (!(t._objFlags & f)) {
if (t.onEnable) {
if (e) {
e.add(t);
return;
}
t.onEnable();
if (!t.node._activeInHierarchy) return;
}
this._onEnabled(t);
}
},
disableComp: function(t) {
if (t._objFlags & f) {
t.onDisable && t.onDisable();
this._onDisabled(t);
}
},
_scheduleImmediate: function(t) {
!t.start || t._objFlags & d || this.startInvoker.add(t);
t.update && this.updateInvoker.add(t);
t.lateUpdate && this.lateUpdateInvoker.add(t);
},
_deferredSchedule: function() {
for (var t = this.scheduleInNextFrame, e = 0, i = t.length; e < i; e++) {
var n = t[e];
this._scheduleImmediate(n);
}
t.length = 0;
},
startPhase: function() {
this._updating = !0;
this.scheduleInNextFrame.length > 0 && this._deferredSchedule();
this.startInvoker.invoke();
},
updatePhase: function(t) {
this.updateInvoker.invoke(t);
},
lateUpdatePhase: function(t) {
this.lateUpdateInvoker.invoke(t);
this._updating = !1;
}
});
n.exports = b;
}), {
"./platform/CCClass": 133,
"./platform/CCObject": 137,
"./platform/js": 149,
"./utils/misc": 159
} ],
48: [ (function(t, e, i) {
function n(t, e) {
return t === e || t && e && (t.name === e.name || t._uuid === e._uuid);
}
var o = t("../../animation/animation-animator"), r = t("../../animation/animation-clip"), s = cc.Class({
name: "cc.Animation",
extends: t("./CCComponent"),
mixins: [ cc.EventTarget ],
editor: !1,
ctor: function() {
cc.EventTarget.call(this);
this._animator = null;
this._nameToState = {};
this._didInit = !1;
this._currentClip = null;
},
properties: {
_defaultClip: {
default: null,
type: r
},
defaultClip: {
type: r,
get: function() {
return this._defaultClip;
},
set: function(t) {
return;
},
tooltip: !1
},
currentClip: {
get: function() {
return this._currentClip;
},
set: function(t) {
this._currentClip = t;
},
type: r,
visible: !1
},
_clips: {
default: [],
type: [ r ],
tooltip: !1,
visible: !0
},
playOnLoad: {
default: !1,
tooltip: !1
}
},
start: function() {
if (this.playOnLoad && this._defaultClip) {
if (!(this._animator && this._animator.isPlaying)) {
var t = this.getAnimationState(this._defaultClip.name);
this._animator.playState(t);
}
}
},
onEnable: function() {
this._animator && this._animator.resume();
},
onDisable: function() {
this._animator && this._animator.pause();
},
onDestroy: function() {
this.stop();
},
getClips: function() {
return this._clips;
},
play: function(t, e) {
var i = this.playAdditive(t, e);
this._animator.stopStatesExcept(i);
return i;
},
playAdditive: function(t, e) {
this._init();
var i = this.getAnimationState(t || this._defaultClip && this._defaultClip.name);
if (i) {
this.enabled = !0;
var n = this._animator;
if (n.isPlaying && i.isPlaying) if (i.isPaused) n.resumeState(i); else {
n.stopState(i);
n.playState(i, e);
} else n.playState(i, e);
this.currentClip = i.clip;
}
return i;
},
stop: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.stopState(e);
} else this._animator.stop();
},
pause: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.pauseState(e);
} else this.enabled = !1;
},
resume: function(t) {
if (this._didInit) if (t) {
var e = this._nameToState[t];
e && this._animator.resumeState(e);
} else this.enabled = !0;
},
setCurrentTime: function(t, e) {
this._init();
if (e) {
var i = this._nameToState[e];
i && this._animator.setStateTime(i, t);
} else this._animator.setStateTime(t);
},
getAnimationState: function(t) {
this._init();
var e = this._nameToState[t];
0;
e && !e.curveLoaded && this._animator._reloadClip(e);
return e || null;
},
addClip: function(t, e) {
if (t) {
this._init();
cc.js.array.contains(this._clips, t) || this._clips.push(t);
e = e || t.name;
var i = this._nameToState[e];
if (i) {
if (i.clip === t) return i;
var n = this._clips.indexOf(i.clip);
-1 !== n && this._clips.splice(n, 1);
}
var o = new cc.AnimationState(t, e);
this._nameToState[e] = o;
return o;
}
cc.warnID(3900);
},
removeClip: function(t, e) {
if (t) {
this._init();
var i;
for (var n in this._nameToState) {
if ((i = this._nameToState[n]).clip === t) break;
}
if (t === this._defaultClip) {
if (!e) {
cc.warnID(3902);
return;
}
this._defaultClip = null;
}
if (i && i.isPlaying) {
if (!e) {
cc.warnID(3903);
return;
}
this.stop(i.name);
}
this._clips = this._clips.filter((function(e) {
return e !== t;
}));
i && delete this._nameToState[i.name];
} else cc.warnID(3901);
},
sample: function(t) {
this._init();
if (t) {
var e = this._nameToState[t];
e && e.sample();
} else this._animator.sample();
},
on: function(t, e, i, n) {
this._init();
for (var o = cc.EventTarget.prototype.on.call(this, t, e, i, n), r = this._animator._anims.array, s = 0; s < r.length; ++s) r[s]._setListeners(this);
return o;
},
off: function(t, e, i, n) {
this._init();
cc.EventTarget.prototype.off.call(this, t, e, i, n);
var o = this._nameToState;
for (var r in o) {
o[r]._setListeners(null);
}
},
_init: function() {
if (!this._didInit) {
this._didInit = !0;
this._animator = new o(this.node, this);
this._createStates();
}
},
_createStates: function() {
this._nameToState = {};
for (var t = null, e = !1, i = 0; i < this._clips.length; ++i) {
var o = this._clips[i];
if (o) {
t = new cc.AnimationState(o);
0;
this._nameToState[t.name] = t;
n(this._defaultClip, o) && (e = t);
}
}
if (this._defaultClip && !e) {
t = new cc.AnimationState(this._defaultClip);
0;
this._nameToState[t.name] = t;
}
}
});
cc.Animation = e.exports = s;
}), {
"../../animation/animation-animator": 11,
"../../animation/animation-clip": 12,
"./CCComponent": 53
} ],
49: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.AudioSource",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this.audio = new cc.Audio();
},
properties: {
_clip: {
default: "",
url: cc.AudioClip
},
_volume: 1,
_mute: !1,
_loop: !1,
_pausedFlag: {
default: !1,
serializable: !1
},
isPlaying: {
get: function() {
if (!this.audio) return !1;
return this.audio.getState() === cc.Audio.State.PLAYING;
},
visible: !1
},
clip: {
get: function() {
return this._clip;
},
set: function(t) {
if (t !== this._clip) {
this._clip = t;
this.audio.stop();
this.audio.src = this._clip;
this.audio.preload && this.audio.preload();
}
},
url: cc.AudioClip,
tooltip: !1,
animatable: !1
},
volume: {
get: function() {
return this._volume;
},
set: function(t) {
t = cc.clamp01(t);
this._volume = t;
var e = this.audio;
if (e && !this._mute) {
e.setVolume(t);
e._loaded || e.on("load", (function() {
e.setVolume(t);
}));
}
return t;
},
tooltip: !1
},
mute: {
get: function() {
return this._mute;
},
set: function(t) {
this._mute = t;
this.audio && this.audio.setVolume(t ? 0 : this._volume);
return t;
},
animatable: !1,
tooltip: !1
},
loop: {
get: function() {
return this._loop;
},
set: function(t) {
this._loop = t;
this.audio && this.audio.setLoop(t);
return t;
},
animatable: !1,
tooltip: !1
},
playOnLoad: {
default: !1,
tooltip: !1,
animatable: !1
},
preload: {
default: !1,
animatable: !1
}
},
_pausedCallback: function() {
var t = this.audio;
if (t && !t.paused) {
this.audio.pause();
this._pausedFlag = !0;
}
},
_restoreCallback: function() {
if (this.audio) {
this._pausedFlag && this.audio.resume();
this._pausedFlag = !1;
}
},
onEnable: function() {
this.playOnLoad && this.play();
if (this.preload) {
this.audio.src = this._clip;
this.audio.preload();
}
cc.game.on(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.on(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDisable: function() {
this.stop();
cc.game.off(cc.game.EVENT_HIDE, this._pausedCallback, this);
cc.game.off(cc.game.EVENT_SHOW, this._restoreCallback, this);
},
onDestroy: function() {
this.stop();
cc.audioEngine.uncache(this._clip);
},
play: function() {
if (this._clip) {
var t = this._mute ? 0 : this._volume, e = this.audio, i = this._loop;
if (e._loaded) {
e.stop();
e.setCurrentTime(0);
e.play();
} else {
e.src = this._clip;
e.once("load", (function() {
e.setLoop(i);
e.setVolume(t);
e.play();
}));
e.preload();
}
}
},
stop: function() {
this.audio && this.audio.stop();
},
pause: function() {
this.audio && this.audio.pause();
},
resume: function() {
this.audio && this.audio.resume();
},
rewind: function() {
this.audio && this.audio.setCurrentTime(0);
},
getCurrentTime: function() {
var t = 0;
this.audio && (t = this.audio.getCurrentTime());
return t;
},
setCurrentTime: function(t) {
var e = this.audio;
if (!e) return t;
if (!e._loaded) {
e.once("load", (function() {
e.setCurrentTime(t);
}));
return t;
}
e.setCurrentTime(t);
return t;
},
getDuration: function() {
var t = 0;
this.audio && (t = this.audio.getDuration());
return t;
}
});
cc.AudioSource = e.exports = n;
}), {
"./CCComponent": 53
} ],
50: [ (function(t, e, i) {
function n(t) {
t.stopPropagation();
}
var o = [ "touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseenter", "mouseleave", "mousewheel" ], r = cc.Class({
name: "cc.BlockInputEvents",
extends: t("./CCComponent"),
editor: {
menu: "i18n:MAIN_MENU.component.ui/Block Input Events",
inspector: "packages://inspector/inspectors/comps/block-input-events.js",
help: "i18n:COMPONENT.help_url.block-input-events"
},
onEnable: function() {
for (var t = 0; t < o.length; t++) this.node.on(o[t], n, this);
},
onDisable: function() {
for (var t = 0; t < o.length; t++) this.node.off(o[t], n, this);
}
});
cc.BlockInputEvents = e.exports = r;
}), {
"./CCComponent": 53
} ],
51: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
COLOR: 1,
SPRITE: 2,
SCALE: 3
}), o = cc.Class({
name: "cc.Button",
extends: t("./CCComponent"),
ctor: function() {
this._resetState();
this._fromColor = null;
this._toColor = null;
this._time = 0;
this._transitionFinished = !0;
this._fromScale = 1;
this._toScale = 1;
this._originalScale = 1;
this._sprite = null;
0;
},
_resetState: function() {
this._pressed = !1;
this._hovered = !1;
},
editor: !1,
properties: {
interactable: {
default: !0,
tooltip: !1,
notify: function(t) {
0;
this._updateState();
this.interactable || this._resetState();
},
animatable: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
},
enableAutoGrayEffect: {
default: !1,
tooltip: !1,
notify: function() {
this._updateDisabledState();
}
},
transition: {
default: n.NONE,
tooltip: !1,
type: n,
animatable: !1
},
normalColor: {
default: cc.color(214, 214, 214),
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedColor: {
default: cc.color(211, 211, 211),
displayName: "Pressed",
tooltip: !1
},
hoverColor: {
default: cc.Color.WHITE,
displayName: "Hover",
tooltip: !1
},
disabledColor: {
default: cc.color(124, 124, 124),
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
duration: {
default: .1,
range: [ 0, 10 ],
tooltip: !1
},
zoomScale: {
default: 1.2,
tooltip: !1
},
normalSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Normal",
tooltip: !1,
notify: function() {
this._updateState();
}
},
pressedSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Pressed",
tooltip: !1,
formerlySerializedAs: "pressedSprite",
notify: function() {
this._updateState();
}
},
hoverSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Hover",
tooltip: !1,
formerlySerializedAs: "hoverSprite",
notify: function() {
this._updateState();
}
},
disabledSprite: {
default: null,
type: cc.SpriteFrame,
displayName: "Disabled",
tooltip: !1,
notify: function() {
this._updateState();
}
},
target: {
default: null,
type: cc.Node,
tooltip: !1,
notify: function() {
this._applyTarget();
}
},
clickEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Transition: n
},
__preload: function() {
this.target || (this.target = this.node);
this._applyTarget();
this._updateState();
},
onEnable: function() {
this.normalSprite && this.normalSprite.ensureLoadTexture();
this.hoverSprite && this.hoverSprite.ensureLoadTexture();
this.pressedSprite && this.pressedSprite.ensureLoadTexture();
this.disabledSprite && this.disabledSprite.ensureLoadTexture();
this._registerEvent();
},
update: function(t) {
var e = this.target;
if (!this._transitionFinished && (this.transition === n.COLOR || this.transition === n.SCALE)) {
this.time += t;
var i = 1;
this.duration > 0 && (i = this.time / this.duration);
if (i >= 1) {
i = 1;
this._transitionFinished = !0;
}
this.transition === n.COLOR ? e.color = this._fromColor.lerp(this._toColor, i) : this.transition === n.SCALE && (e.scale = cc.lerp(this._fromScale, this._toScale, i));
}
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.on(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.on(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getTargetSprite: function(t) {
var e = null;
t && (e = t.getComponent(cc.Sprite));
return e;
},
_applyTarget: function() {
this._sprite = this._getTargetSprite(this.target);
this.target && (this._originalScale = this.target.scale);
},
_onTouchBegan: function(t) {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !0;
this._updateState();
t.stopPropagation();
}
},
_onTouchMove: function(t) {
if (this.interactable && this.enabledInHierarchy && this._pressed) {
var e = t.touch, i = this.node._hitTest(e.getLocation());
if (this.transition === n.SCALE && this.target) if (i) {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this._transitionFinished = !1;
} else {
this.time = 0;
this._transitionFinished = !0;
this.target.scale = this._originalScale;
} else {
var o;
o = i ? "pressed" : "normal";
this._applyTransition(o);
}
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
if (this.interactable && this.enabledInHierarchy) {
if (this._pressed) {
cc.Component.EventHandler.emitEvents(this.clickEvents, t);
this.node.emit("click", this);
}
this._pressed = !1;
this._updateState();
t.stopPropagation();
}
},
_zoomUp: function() {
this._fromScale = this._originalScale;
this._toScale = this._originalScale * this.zoomScale;
this.time = 0;
this._transitionFinished = !1;
},
_zoomBack: function() {
this._fromScale = this.target.scale;
this._toScale = this._originalScale;
this.time = 0;
this._transitionFinished = !1;
},
_onTouchCancel: function() {
if (this.interactable && this.enabledInHierarchy) {
this._pressed = !1;
this._updateState();
}
},
_onMouseMoveIn: function() {
if (!this._pressed && this.interactable && this.enabledInHierarchy && (this.transition !== n.SPRITE || this.hoverSprite) && !this._hovered) {
this._hovered = !0;
this._updateState();
}
},
_onMouseMoveOut: function() {
if (this._hovered) {
this._hovered = !1;
this._updateState();
}
},
_updateState: function() {
var t = this._getButtonState();
this._applyTransition(t);
this._updateDisabledState();
},
onDisable: function() {
this._hovered = !1;
this._pressed = !1;
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
this.node.off(cc.Node.EventType.MOUSE_ENTER, this._onMouseMoveIn, this);
this.node.off(cc.Node.EventType.MOUSE_LEAVE, this._onMouseMoveOut, this);
},
_getButtonState: function() {
return this.interactable ? this._pressed ? "pressed" : this._hovered ? "hover" : "normal" : "disabled";
},
_updateColorTransition: function(t) {
var e = this[t + "Color"], i = this.target;
this._fromColor = i.color.clone();
this._toColor = e;
this.time = 0;
this._transitionFinished = !1;
},
_updateSpriteTransition: function(t) {
var e = this[t + "Sprite"];
this._sprite && e && (this._sprite.spriteFrame = e);
},
_updateScaleTransition: function(t) {
"pressed" === t ? this._zoomUp() : this._zoomBack();
},
_applyTransition: function(t) {
var e = this.transition;
e === n.COLOR ? this._updateColorTransition(t) : e === n.SPRITE ? this._updateSpriteTransition(t) : e === n.SCALE && this._updateScaleTransition(t);
},
_resizeNodeToTargetNode: !1,
_updateDisabledState: function() {
this._sprite && this._sprite._sgNode.setState(0);
this.enableAutoGrayEffect && this.transition !== n.COLOR && (this.transition === n.SPRITE && this.disabledSprite || this._sprite && !this.interactable && this._sprite._sgNode.setState(1));
}
});
cc.Button = e.exports = o;
}), {
"./CCComponent": 53
} ],
52: [ (function(t, e, i) {
var n = {
getContentSize: function() {
return cc.visibleRect;
},
setContentSize: function(t) {},
_getWidth: function() {
return this.getContentSize().width;
},
_getHeight: function() {
return this.getContentSize().height;
}
}, o = cc.Class({
name: "cc.Canvas",
extends: t("./CCComponent"),
editor: !1,
resetInEditor: !1,
statics: {
instance: null
},
properties: {
_designResolution: cc.size(960, 640),
designResolution: {
get: function() {
return cc.size(this._designResolution);
},
set: function(t) {
this._designResolution.width = t.width;
this._designResolution.height = t.height;
this.applySettings();
},
tooltip: !1
},
_fitWidth: !1,
_fitHeight: !0,
fitHeight: {
get: function() {
return this._fitHeight;
},
set: function(t) {
if (this._fitHeight !== t) {
this._fitHeight = t;
this.applySettings();
}
},
tooltip: !1
},
fitWidth: {
get: function() {
return this._fitWidth;
},
set: function(t) {
if (this._fitWidth !== t) {
this._fitWidth = t;
this.applySettings();
}
},
tooltip: !1
}
},
ctor: function() {
this._thisOnResized = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: "window-resize",
callback: this.onResized.bind(this)
});
this._thisOnResized.retain();
},
__preload: function() {
if (o.instance) return cc.errorID(6700, this.node.name, o.instance.node.name);
o.instance = this;
if (this.node._sizeProvider) {
} else this.node._sizeProvider = n;
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
cc.eventManager.addListener(this._thisOnResized, 1);
this.applySettings();
this.onResized();
},
onDestroy: function() {
this.node._sizeProvider === n && (this.node._sizeProvider = null);
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this);
cc.eventManager.removeListener(this._thisOnResized);
this._thisOnResized.release();
o.instance === this && (o.instance = null);
},
alignWithScreen: function() {
var t, e = cc.visibleRect, i = 0, n = 0;
if (!this.fitHeight && !this.fitWidth) {
i = .5 * ((t = cc.view.getDesignResolutionSize()).width - e.width);
n = .5 * (t.height - e.height);
}
this.node.setPosition(.5 * e.width + i, .5 * e.height + n);
},
onResized: function() {
this.alignWithScreen();
},
applySettings: function() {
var t, e = cc.ResolutionPolicy;
t = this.fitHeight && this.fitWidth ? e.SHOW_ALL : this.fitHeight || this.fitWidth ? this.fitWidth ? e.FIXED_WIDTH : e.FIXED_HEIGHT : e.NO_BORDER;
var i = this._designResolution;
cc.view.setDesignResolutionSize(i.width, i.height, t);
}
});
cc.Canvas = e.exports = o;
}), {
"./CCComponent": 53
} ],
53: [ (function(i, n, o) {
var r = i("../platform/CCObject"), s = i("../platform/js"), c = new (i("../platform/id-generater"))("Comp"), a = r.Flags.IsOnEnableCalled, h = r.Flags.IsOnLoadCalled, l = cc.Class({
name: "cc.Component",
extends: r,
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
properties: {
node: {
default: null,
visible: !1
},
name: {
get: function() {
if (this._name) return this._name;
var t = cc.js.getClassName(this), e = t.lastIndexOf(".");
e >= 0 && (t = t.slice(e + 1));
return this.node.name + "<" + t + ">";
},
set: function(t) {
this._name = t;
},
visible: !1
},
_id: {
default: "",
serializable: !1
},
uuid: {
get: function() {
var t = this._id;
if (!t) {
t = this._id = c.getNewId();
0;
}
return t;
},
visible: !1
},
__scriptAsset: !1,
_enabled: !0,
enabled: {
get: function() {
return this._enabled;
},
set: function(t) {
if (this._enabled !== t) {
this._enabled = t;
if (this.node._activeInHierarchy) {
var e = cc.director._compScheduler;
t ? e.enableComp(this) : e.disableComp(this);
}
}
},
visible: !1
},
enabledInHierarchy: {
get: function() {
return (this._objFlags & a) > 0;
},
visible: !1
},
_isOnLoadCalled: {
get: function() {
return this._objFlags & h;
}
}
},
update: null,
lateUpdate: null,
__preload: null,
onLoad: null,
start: null,
onEnable: null,
onDisable: null,
onDestroy: null,
onFocusInEditor: null,
onLostFocusInEditor: null,
resetInEditor: null,
addComponent: function(t) {
return this.node.addComponent(t);
},
getComponent: function(t) {
return this.node.getComponent(t);
},
getComponents: function(t) {
return this.node.getComponents(t);
},
getComponentInChildren: function(t) {
return this.node.getComponentInChildren(t);
},
getComponentsInChildren: function(t) {
return this.node.getComponentsInChildren(t);
},
_getLocalBounds: null,
onRestore: null,
destroy: function() {
this._super() && this._enabled && this.node._activeInHierarchy && cc.director._compScheduler.disableComp(this);
},
_onPreDestroy: function() {
this.unscheduleAllCallbacks();
for (var t = this.__eventTargets, e = 0, i = t.length; e < i; ++e) {
var n = t[e];
n && n.targetOff(this);
}
t.length = 0;
0;
cc.director._nodeActivator.destroyComp(this);
this.node._removeComponent(this);
0;
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
t.node = null;
return t;
},
isRunning: function() {
return this.enabledInHierarchy;
},
schedule: function(t, e, i, n) {
cc.assertID(t, 1619);
cc.assertID(e >= 0, 1620);
e = e || 0;
i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i;
n = n || 0;
var o = cc.director.getScheduler(), r = o.isTargetPaused(this);
o.schedule(t, this, e, i, n, r);
},
scheduleOnce: function(t, e) {
this.schedule(t, 0, 0, e);
},
unschedule: function(t) {
t && cc.director.getScheduler().unschedule(t, this);
},
unscheduleAllCallbacks: function() {
cc.director.getScheduler().unscheduleAllForTarget(this);
}
});
l._requireComponent = null;
l._executionOrder = 0;
0;
s.value(l, "_registerEditorProps", (function(i, n) {
var o = n.requireComponent;
o && (i._requireComponent = o);
var r = n.executionOrder;
r && "number" === ("object" == (e = typeof r) ? t(r) : e) && (i._executionOrder = r);
}));
l.prototype.__scriptUuid = "";
cc.Component = n.exports = l;
}), {
"../platform/CCObject": 137,
"../platform/id-generater": 145,
"../platform/js": 149
} ],
54: [ (function(i, n, o) {
cc.Component.EventHandler = cc.Class({
name: "cc.ClickEvent",
properties: {
target: {
default: null,
type: cc.Node
},
component: {
default: ""
},
handler: {
default: ""
},
customEventData: {
default: ""
}
},
statics: {
emitEvents: function(t) {
"use strict";
var e, i, n;
if (arguments.length > 0) for (i = 0, n = (e = new Array(arguments.length - 1)).length; i < n; i++) e[i] = arguments[i + 1];
for (i = 0, n = t.length; i < n; i++) {
var o = t[i];
o instanceof cc.Component.EventHandler && o.emit(e);
}
}
},
emit: function(i) {
var n = this.target;
if (cc.isValid(n)) {
var o = n.getComponent(this.component);
if (cc.isValid(o)) {
var r = o[this.handler];
if ("function" === ("object" == (e = typeof r) ? t(r) : e)) {
null != this.customEventData && "" !== this.customEventData && (i = i.slice()).push(this.customEventData);
r.apply(o, i);
}
}
}
}
});
}), {} ],
55: [ (function(t, e, i) {
t("../editbox/CCSGEditBox");
var n = _ccsg.EditBox.KeyboardReturnType, o = _ccsg.EditBox.InputMode, r = _ccsg.EditBox.InputFlag, s = cc.Class({
name: "cc.EditBox",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_useOriginalSize: !0,
_string: "",
string: {
tooltip: !1,
get: function() {
return this._sgNode.string;
},
set: function(t) {
this._sgNode.string = this._string = t;
}
},
backgroundImage: {
tooltip: !1,
default: null,
type: cc.SpriteFrame,
notify: function() {
var t = this._sgNode, e = t.getBackgroundSprite();
if (this.backgroundImage) {
this._createBackgroundSprite().setContentSize(t.getContentSize());
} else e.removeFromParent();
}
},
returnType: {
default: n.DEFAULT,
tooltip: !1,
displayName: "KeyboardReturnType",
type: n,
notify: function() {
this._sgNode.returnType = this.returnType;
}
},
inputFlag: {
tooltip: !1,
default: r.DEFAULT,
type: r,
notify: function() {
this._sgNode.inputFlag = this.inputFlag;
}
},
inputMode: {
tooltip: !1,
default: o.ANY,
type: o,
notify: function() {
this._sgNode.inputMode = this.inputMode;
}
},
fontSize: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.fontSize = this.fontSize;
}
},
lineHeight: {
tooltip: !1,
default: 40,
notify: function() {
this._sgNode.setLineHeight(this.lineHeight);
}
},
fontColor: {
tooltip: !1,
default: cc.Color.WHITE,
notify: function() {
this._sgNode.fontColor = this.fontColor;
}
},
placeholder: {
tooltip: !1,
default: "Enter text here...",
notify: function() {
this._sgNode.placeholder = this.placeholder;
}
},
placeholderFontSize: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.placeholderFontSize = this.placeholderFontSize;
}
},
placeholderFontColor: {
tooltip: !1,
default: cc.Color.GRAY,
notify: function() {
this._sgNode.placeholderFontColor = this.placeholderFontColor;
}
},
maxLength: {
tooltip: !1,
default: 20,
notify: function() {
this._sgNode.maxLength = this.maxLength;
}
},
stayOnTop: {
tooltip: !1,
default: !1,
notify: function() {
0;
}
},
_tabIndex: 0,
tabIndex: {
tooltip: !1,
get: function() {
return this._tabIndex;
},
set: function(t) {
this._tabIndex = t;
this._sgNode.setTabIndex(t);
}
},
editingDidBegan: {
default: [],
type: cc.Component.EventHandler
},
textChanged: {
default: [],
type: cc.Component.EventHandler
},
editingDidEnded: {
default: [],
type: cc.Component.EventHandler
},
editingReturn: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
KeyboardReturnType: n,
InputFlag: r,
InputMode: o
},
_applyCapInset: function(t) {
var e = this.backgroundImage;
t.setInsetTop(e.insetTop);
t.setInsetBottom(e.insetBottom);
t.setInsetRight(e.insetRight);
t.setInsetLeft(e.insetLeft);
},
_createSgNode: function() {
return new _ccsg.EditBox(cc.size(160, 40));
},
_createBackgroundSprite: function() {
var t = this._sgNode, e = new cc.Scale9Sprite();
e.setRenderingType(cc.Scale9Sprite.RenderingType.SLICED);
if (this.backgroundImage) {
this.backgroundImage.ensureLoadTexture();
e.setSpriteFrame(this.backgroundImage);
this._applyCapInset(e);
}
t.initWithSizeAndBackgroundSprite(cc.size(160, 40), e);
return e;
},
_initSgNode: function() {
var t = this._sgNode;
0;
this._createBackgroundSprite();
t.setContentSize(this.node.getContentSize());
t.inputMode = this.inputMode;
t.maxLength = this.maxLength;
t.string = this._string;
t.fontSize = this.fontSize;
t.fontColor = this.fontColor;
t.placeholder = this.placeholder;
t.placeholderFontSize = this.placeholderFontSize;
t.placeholderFontColor = this.placeholderFontColor;
t.inputFlag = this.inputFlag;
t.returnType = this.returnType;
t.setLineHeight(this.lineHeight);
t.stayOnTop(this.stayOnTop);
t.setTabIndex(this.tabIndex);
t.setDelegate(this);
},
editBoxEditingDidBegan: function() {
cc.Component.EventHandler.emitEvents(this.editingDidBegan, this);
this.node.emit("editing-did-began", this);
},
editBoxEditingDidEnded: function() {
cc.Component.EventHandler.emitEvents(this.editingDidEnded, this);
this.node.emit("editing-did-ended", this);
},
editBoxTextChanged: function(t, e) {
cc.Component.EventHandler.emitEvents(this.textChanged, e, this);
this.node.emit("text-changed", this);
},
editBoxEditingReturn: function() {
cc.Component.EventHandler.emitEvents(this.editingReturn, this);
this.node.emit("editing-return", this);
},
onDestroy: function() {
this._sgNode.setDelegate(null);
this._super();
},
__preload: function() {
this._super();
this._registerEvent();
},
_registerEvent: function() {
0;
},
_onTouchBegan: function(t) {
this._sgNode && this._sgNode._onTouchBegan(t.touch);
t.stopPropagation();
},
_onTouchEnded: function(t) {
this._sgNode && this._sgNode._onTouchEnded();
t.stopPropagation();
},
setFocus: function() {
this._sgNode && this._sgNode.setFocus();
},
isFocused: function() {
var t = !1;
this._sgNode && (t = this._sgNode.isFocused());
return t;
}
});
s.prototype.editBoxEditingDidBegin = function(t) {
this.editBoxEditingDidBegan(t);
};
s.prototype.editBoxEditingDidEnd = function(t) {
this.editBoxEditingDidEnded(t);
};
cc.EditBox = e.exports = s;
}), {
"../editbox/CCSGEditBox": 1
} ],
56: [ (function(i, n, o) {
i("../label/CCSGLabel");
i("../label/CCSGLabelCanvasRenderCmd");
i("../label/CCSGLabelWebGLRenderCmd");
var r = cc.TextAlignment, s = cc.VerticalTextAlignment, c = _ccsg.Label.Overflow, a = cc.Class({
name: "cc.Label",
extends: cc._RendererUnderSG,
ctor: function() {
0;
},
editor: !1,
_updateSgNodeString: function() {
this._sgNode.setString(this.string);
this._updateNodeSize();
},
_updateSgNodeFontSize: function() {
if (this._sgNode) {
this._sgNode.setFontSize(this._fontSize);
this._updateNodeSize();
}
},
properties: {
_useOriginalSize: !0,
string: {
default: "Label",
multiline: !0,
tooltip: !1,
notify: function() {
this._sgNode && this._updateSgNodeString();
}
},
horizontalAlign: {
default: r.LEFT,
type: r,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setHorizontalAlign(this.horizontalAlign);
},
animatable: !1
},
verticalAlign: {
default: s.TOP,
type: s,
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setVerticalAlign(this.verticalAlign);
},
animatable: !1
},
_actualFontSize: {
default: 40
},
actualFontSize: {
displayName: "Actual Font Size",
animatable: !1,
readonly: !0,
get: function() {
this._sgNode && (this._actualFontSize = this._sgNode.getFontSize());
return this._actualFontSize;
}
},
_fontSize: 40,
fontSize: {
get: function() {
return this._fontSize;
},
set: function(t) {
this._fontSize = t;
this._updateSgNodeFontSize();
},
tooltip: !1
},
fontFamily: {
default: "Arial",
tooltip: !1,
notify: function() {
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
},
animatable: !1
},
_lineHeight: 40,
lineHeight: {
get: function() {
this._sgNode && (this._lineHeight = this._sgNode.getLineHeight());
return this._lineHeight;
},
set: function(t) {
this._lineHeight = t;
if (this._sgNode) {
this._sgNode.setLineHeight(t);
this._updateNodeSize();
}
},
tooltip: !1
},
overflow: {
default: c.NONE,
type: c,
tooltip: !1,
notify: function() {
if (this._sgNode) {
this._sgNode.setOverflow(this.overflow);
this._updateNodeSize();
}
},
animatable: !1
},
_enableWrapText: !0,
enableWrapText: {
get: function() {
this._sgNode && (this._enableWrapText = this._sgNode.isWrapTextEnabled());
return this._enableWrapText;
},
set: function(t) {
this._enableWrapText = t;
this._sgNode && this._sgNode.enableWrapText(t);
},
animatable: !1,
tooltip: !1
},
_N$file: null,
font: {
get: function() {
return this._N$file;
},
set: function(i) {
i || (this._isSystemFontUsed = !0);
0;
this._N$file = i;
this._bmFontOriginalSize = -1;
i && this._isSystemFontUsed && (this._isSystemFontUsed = !1);
if (this._sgNode) {
"string" === ("object" == (e = typeof i) ? t(i) : e) && cc.warnID(4e3);
var n = this.font;
if (n instanceof cc.BitmapFont) if (n.spriteFrame) if (n.spriteFrame.textureLoaded()) this._sgNode.setFontAsset(n); else {
cc.warnID(4012, n.name);
this._sgNode.setFontFamily("");
} else {
cc.warnID(4011, n.name);
this._sgNode.setFontFamily("");
} else this._sgNode.setFontAsset(n);
}
i instanceof cc.BitmapFont && (this._bmFontOriginalSize = i.fontSize);
},
type: cc.Font,
tooltip: !1,
animatable: !1
},
_isSystemFontUsed: !0,
useSystemFont: {
get: function() {
return this._isSystemFontUsed;
},
set: function(t) {
0;
this._isSystemFontUsed = !!t;
if (t) {
this.font = null;
this._sgNode && this._sgNode.setFontFamily(this.fontFamily);
}
},
animatable: !1,
tooltip: !1
},
_bmFontOriginalSize: {
displayName: "BMFont Original Size",
default: -1,
serializable: !1,
readonly: !0,
visible: !0,
animatable: !1
},
_spacingX: 0,
spacingX: {
get: function() {
return this._spacingX;
},
set: function(t) {
this._spacingX = t;
if (this._sgNode) {
this._sgNode.setSpacingX(this.spacingX);
this._updateNodeSize();
}
}
}
},
statics: {
HorizontalAlign: r,
VerticalAlign: s,
Overflow: c
},
__preload: function() {
this._super();
0;
this._updateNodeSize();
},
_createSgNode: function() {
return null;
},
_initSgNode: function() {
var i = this.font;
"string" === ("object" == (e = typeof i) ? t(i) : e) && cc.warnID(4e3);
var n;
if (i instanceof cc.BitmapFont) if (i.spriteFrame) if (i.spriteFrame.textureLoaded()) n = this._sgNode = new _ccsg.Label(this.string, JSON.stringify(i._fntConfig), i.spriteFrame); else {
cc.warnID(4012, i.name);
n = this._sgNode = new _ccsg.Label(this.string, null, null, this._fontSize);
} else {
cc.warnID(4011, i.name);
n = this._sgNode = _ccsg.Label.pool.get(this.string);
} else n = this._sgNode = _ccsg.Label.pool.get(this.string, i, null, this._fontSize);
n.retain();
i instanceof cc.BitmapFont && (this._bmFontOriginalSize = i.fontSize);
n.setVisible(!1);
n.setHorizontalAlign(this.horizontalAlign);
n.setVerticalAlign(this.verticalAlign);
n.setFontSize(this._fontSize);
this.useSystemFont && n.setFontFamily(this.fontFamily);
n.setOverflow(this.overflow);
n.enableWrapText(this._enableWrapText);
n.setLineHeight(this._lineHeight);
n.setString(this.string);
i instanceof cc.BitmapFont && n.setSpacingX(this.spacingX);
0;
n.setContentSize(this.node.getContentSize());
n.setColor(this.node.color);
},
_updateNodeSize: function() {
this._sgNode && this._sgNode.parent && (this.overflow !== c.NONE && this.overflow !== c.RESIZE_HEIGHT || this.node.setContentSize(this._sgNode.getContentSize()));
},
onDestroy: function() {
var t = this._sgNode;
this._super();
if (t) {
t.removeFromParent(!0);
_ccsg.Label.pool.put(t);
}
}
});
cc.Label = n.exports = a;
}), {
"../label/CCSGLabel": 1,
"../label/CCSGLabelCanvasRenderCmd": 1,
"../label/CCSGLabelWebGLRenderCmd": 1
} ],
57: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.LabelOutline",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._labelSGNode = null;
},
properties: {
_color: cc.color(255, 255, 255, 255),
_width: 1,
color: {
get: function() {
return this._color;
},
set: function(t) {
this._color = cc.color(t);
this._labelSGNode && this._labelSGNode.setOutlineColor(cc.color(this._color));
}
},
width: {
get: function() {
return this._width;
},
set: function(t) {
this._width = t;
if (this._labelSGNode) {
this._labelSGNode.setOutlineWidth(t);
this._labelSGNode.setMargin(t);
}
}
}
},
onEnable: function() {
var t = this.node.getComponent("cc.Label"), e = this._labelSGNode = t && t._sgNode;
if (this._labelSGNode) {
e.setOutlined(!0);
e.setOutlineColor(cc.color(this._color));
e.setOutlineWidth(this._width);
e.setMargin(this._width);
}
},
onDisable: function() {
if (this._labelSGNode) {
this._labelSGNode.setOutlined(!1);
this._labelSGNode.setMargin(0);
}
this._labelSGNode = null;
}
});
cc.LabelOutline = e.exports = n;
}), {
"./CCComponent": 53
} ],
58: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
HORIZONTAL: 1,
VERTICAL: 2,
GRID: 3
}), o = cc.Enum({
NONE: 0,
CONTAINER: 1,
CHILDREN: 2
}), r = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), s = cc.Enum({
BOTTOM_TO_TOP: 0,
TOP_TO_BOTTOM: 1
}), c = cc.Enum({
LEFT_TO_RIGHT: 0,
RIGHT_TO_LEFT: 1
}), a = cc.Class({
name: "cc.Layout",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layoutSize: cc.size(300, 200),
_layoutDirty: {
default: !0,
serializable: !1
},
_resize: o.NONE,
_N$layoutType: n.NONE,
type: {
type: n,
get: function() {
return this._N$layoutType;
},
set: function(t) {
this._N$layoutType = t;
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
resizeMode: {
type: o,
tooltip: !1,
animatable: !1,
get: function() {
return this._resize;
},
set: function(t) {
if (this.type !== n.NONE || t !== o.CHILDREN) {
this._resize = t;
this._doLayoutDirty();
}
}
},
cellSize: {
default: cc.size(40, 40),
tooltip: !1,
type: cc.Size,
notify: function() {
this._doLayoutDirty();
}
},
startAxis: {
default: r.HORIZONTAL,
tooltip: !1,
type: r,
notify: function() {
this._doLayoutDirty();
},
animatable: !1
},
_N$padding: {
default: 0
},
paddingLeft: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingRight: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingTop: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
paddingBottom: {
default: 0,
tooltip: !1,
notify: function() {
this._doLayoutDirty();
}
},
spacingX: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
spacingY: {
default: 0,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1
},
verticalDirection: {
default: s.TOP_TO_BOTTOM,
type: s,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
},
horizontalDirection: {
default: c.LEFT_TO_RIGHT,
type: c,
notify: function() {
this._doLayoutDirty();
},
tooltip: !1,
animatable: !1
}
},
statics: {
Type: n,
VerticalDirection: s,
HorizontalDirection: c,
ResizeMode: o,
AxisDirection: r
},
_migratePaddingData: function() {
this.paddingLeft = this._N$padding;
this.paddingRight = this._N$padding;
this.paddingTop = this._N$padding;
this.paddingBottom = this._N$padding;
this._N$padding = 0;
},
onEnable: function() {
this._addEventListeners();
cc.sizeEqualToSize(this.node.getContentSize(), cc.size(0, 0)) && this.node.setContentSize(this._layoutSize);
0 !== this._N$padding && this._migratePaddingData();
this._doLayoutDirty();
},
onDisable: function() {
this._removeEventListeners();
},
_doLayoutDirty: function() {
this._layoutDirty = !0;
},
_addEventListeners: function() {
cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.on("size-changed", this._resized, this);
this.node.on("anchor-changed", this._doLayoutDirty, this);
this.node.on("child-added", this._childAdded, this);
this.node.on("child-removed", this._childRemoved, this);
this.node.on("child-reorder", this._doLayoutDirty, this);
this._addChildrenEventListeners();
},
_removeEventListeners: function() {
cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.updateLayout, this);
this.node.off("size-changed", this._resized, this);
this.node.off("anchor-changed", this._doLayoutDirty, this);
this.node.off("child-added", this._childAdded, this);
this.node.off("child-removed", this._childRemoved, this);
this.node.off("child-reorder", this._doLayoutDirty, this);
this._removeChildrenEventListeners();
},
_addChildrenEventListeners: function() {
this.node.children.forEach(function(t) {
t.on("size-changed", this._doLayoutDirty, this);
t.on("position-changed", this._doLayoutDirty, this);
t.on("anchor-changed", this._doLayoutDirty, this);
t.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
}.bind(this));
},
_removeChildrenEventListeners: function() {
this.node.children.forEach(function(t) {
t.off("size-changed", this._doLayoutDirty, this);
t.off("position-changed", this._doLayoutDirty, this);
t.off("anchor-changed", this._doLayoutDirty, this);
t.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
}.bind(this));
},
_childAdded: function(t) {
var e = t.detail;
e.on("size-changed", this._doLayoutDirty, this);
e.on("position-changed", this._doLayoutDirty, this);
e.on("anchor-changed", this._doLayoutDirty, this);
e.on("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_childRemoved: function(t) {
var e = t.detail;
e.off("size-changed", this._doLayoutDirty, this);
e.off("position-changed", this._doLayoutDirty, this);
e.off("anchor-changed", this._doLayoutDirty, this);
e.off("active-in-hierarchy-changed", this._doLayoutDirty, this);
this._doLayoutDirty();
},
_resized: function() {
this._layoutSize = this.node.getContentSize();
this._doLayoutDirty();
},
_doLayoutHorizontally: function(t, e, i, r) {
var a = this.node.getAnchorPoint(), h = this.node.children, l = 1, u = this.paddingLeft, d = -a.x * t;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
l = -1;
d = (1 - a.x) * t;
u = this.paddingRight;
}
var f = d + l * u - l * this.spacingX, p = 0, _ = 0, g = 0, v = 0, y = 0, m = 0, b = this.cellSize.width;
this.type !== n.GRID && this.resizeMode === o.CHILDREN && (b = (t - (this.paddingLeft + this.paddingRight) - (h.length - 1) * this.spacingX) / h.length);
h.forEach(function(h) {
if (h.activeInHierarchy) {
if (this._resize === o.CHILDREN) {
h.width = b;
this.type === n.GRID && (h.height = this.cellSize.height);
}
var C = h.anchorX;
g > _ && (_ = g);
if (h.height >= _) {
g = _;
_ = h.height;
m = h.getAnchorPoint().y;
}
this.horizontalDirection === c.RIGHT_TO_LEFT && (C = 1 - h.anchorX);
f = f + l * C * h.width + l * this.spacingX;
var T = l * (1 - C) * h.width;
if (e) {
var S = f + T + l * (l > 0 ? this.paddingRight : this.paddingLeft), E = this.horizontalDirection === c.LEFT_TO_RIGHT && S > (1 - a.x) * t, A = this.horizontalDirection === c.RIGHT_TO_LEFT && S < -a.x * t;
if (E || A) {
if (h.height >= _) {
0 === g && (g = _);
p += g;
g = _;
} else {
p += _;
g = h.height;
_ = 0;
}
f = d + l * (u + C * h.width);
v++;
}
}
var x = i(h, p, v);
t >= h.width + this.paddingLeft + this.paddingRight && r && h.setPosition(cc.p(f, x));
var w, I = 1, O = 0 === _ ? h.height : _;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
y = y || this.node._contentSize.height;
(w = x + (I = -1) * (O * m + this.paddingBottom)) < y && (y = w);
} else {
y = y || -this.node._contentSize.height;
(w = x + I * (O * m + this.paddingTop)) > y && (y = w);
}
f += T;
}
}.bind(this));
return y;
},
_getVerticalBaseHeight: function(t) {
var e = 0, i = 0;
if (this.resizeMode === o.CONTAINER) {
t.forEach((function(t) {
if (t.activeInHierarchy) {
i++;
e += t.height;
}
}));
e += (i - 1) * this.spacingY + this.paddingBottom + this.paddingTop;
} else e = this.node.getContentSize().height;
return e;
},
_doLayoutVertically: function(t, e, i, r) {
var a = this.node.getAnchorPoint(), h = this.node.children, l = 1, u = this.paddingBottom, d = -a.y * t;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
l = -1;
d = (1 - a.y) * t;
u = this.paddingTop;
}
var f = d + l * u - l * this.spacingY, p = 0, _ = 0, g = 0, v = 0, y = 0, m = 0, b = this.cellSize.height;
this.type !== n.GRID && this.resizeMode === o.CHILDREN && (b = (t - (this.paddingTop + this.paddingBottom) - (h.length - 1) * this.spacingY) / h.length);
h.forEach(function(h) {
if (h.activeInHierarchy) {
if (this.resizeMode === o.CHILDREN) {
h.height = b;
this.type === n.GRID && (h.width = this.cellSize.width);
}
var C = h.anchorY;
g > _ && (_ = g);
if (h.width >= _) {
g = _;
_ = h.width;
m = h.getAnchorPoint().x;
}
this.verticalDirection === s.TOP_TO_BOTTOM && (C = 1 - h.anchorY);
f = f + l * C * h.height + l * this.spacingY;
var T = l * (1 - C) * h.height;
if (e) {
var S = f + T + l * (l > 0 ? this.paddingTop : this.paddingBottom), E = this.verticalDirection === s.BOTTOM_TO_TOP && S > (1 - a.y) * t, A = this.verticalDirection === s.TOP_TO_BOTTOM && S < -a.y * t;
if (E || A) {
if (h.width >= _) {
0 === g && (g = _);
p += g;
g = _;
} else {
p += _;
g = h.width;
_ = 0;
}
f = d + l * (u + C * h.height);
v++;
}
}
var x = i(h, p, v);
t >= h.height + (this.paddingTop + this.paddingBottom) && r && h.setPosition(cc.p(x, f));
var w, I = 1, O = 0 === _ ? h.width : _;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
I = -1;
y = y || this.node._contentSize.width;
(w = x + I * (O * m + this.paddingLeft)) < y && (y = w);
} else {
y = y || -this.node._contentSize.width;
(w = x + I * (O * m + this.paddingRight)) > y && (y = w);
}
f += T;
}
}.bind(this));
return y;
},
_doLayoutBasic: function() {
var t = null;
this.node.children.forEach((function(e) {
e.activeInHierarchy && (t = t ? cc.rectUnion(t, e.getBoundingBoxToWorld()) : e.getBoundingBoxToWorld());
}));
if (t) {
var e = this.node.parent.convertToNodeSpaceAR(cc.p(t.x, t.y));
e = cc.pAdd(e, cc.p(-this.paddingLeft, -this.paddingBottom));
var i = this.node.parent.convertToNodeSpaceAR(cc.p(t.x + t.width, t.y + t.height));
i = cc.pAdd(i, cc.p(this.paddingRight, this.paddingTop));
var n = cc.size(parseFloat((i.x - e.x).toFixed(2)), parseFloat((i.y - e.y).toFixed(2))), o = this.node.getPosition(), r = (o.x - e.x) / n.width, s = (o.y - e.y) / n.height, c = cc.p(parseFloat(r.toFixed(2)), parseFloat(s.toFixed(2)));
this.node.setAnchorPoint(c);
this.node.setContentSize(n);
}
},
_doLayoutGridAxisHorizontal: function(t, e) {
var i = e.width, n = 1, r = -t.y * e.height, c = this.paddingBottom;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * e.height;
c = this.paddingTop;
}
var a = function(t, e, i) {
return r + n * (e + t.anchorY * t.height + c + i * this.spacingY);
}.bind(this), h = 0;
if (this.resizeMode === o.CONTAINER) {
var l = this._doLayoutHorizontally(i, !0, a, !1);
(h = r - l) < 0 && (h *= -1);
r = -t.y * h;
if (this.verticalDirection === s.TOP_TO_BOTTOM) {
n = -1;
r = (1 - t.y) * h;
}
}
this._doLayoutHorizontally(i, !0, a, !0);
this.resizeMode === o.CONTAINER && this.node.setContentSize(i, h);
},
_doLayoutGridAxisVertical: function(t, e) {
var i = e.height, n = 1, r = -t.x * e.width, s = this.paddingLeft;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * e.width;
s = this.paddingRight;
}
var a = function(t, e, i) {
return r + n * (e + t.anchorX * t.width + s + i * this.spacingX);
}.bind(this), h = 0;
if (this.resizeMode === o.CONTAINER) {
var l = this._doLayoutVertically(i, !0, a, !1);
(h = r - l) < 0 && (h *= -1);
r = -t.x * h;
if (this.horizontalDirection === c.RIGHT_TO_LEFT) {
n = -1;
r = (1 - t.x) * h;
}
}
this._doLayoutVertically(i, !0, a, !0);
this.resizeMode === o.CONTAINER && this.node.setContentSize(h, i);
},
_doLayoutGrid: function() {
var t = this.node.getAnchorPoint(), e = this.node.getContentSize();
this.startAxis === r.HORIZONTAL ? this._doLayoutGridAxisHorizontal(t, e) : this.startAxis === r.VERTICAL && this._doLayoutGridAxisVertical(t, e);
},
_getHorizontalBaseWidth: function(t) {
var e = 0, i = 0;
if (this.resizeMode === o.CONTAINER) {
t.forEach((function(t) {
if (t.activeInHierarchy) {
i++;
e += t.width;
}
}));
e += (i - 1) * this.spacingX + this.paddingLeft + this.paddingRight;
} else e = this.node.getContentSize().width;
return e;
},
_doLayout: function() {
if (this.type === n.HORIZONTAL) {
var t = this._getHorizontalBaseWidth(this.node.children), e = function(t) {
return t.y;
};
this._doLayoutHorizontally(t, !1, e, !0);
this.node.width = t;
} else if (this.type === n.VERTICAL) {
var i = this._getVerticalBaseHeight(this.node.children), r = function(t) {
return t.x;
};
this._doLayoutVertically(i, !1, r, !0);
this.node.height = i;
} else this.type === n.NONE ? this.resizeMode === o.CONTAINER && this._doLayoutBasic() : this.type === n.GRID && this._doLayoutGrid();
},
updateLayout: function() {
if (this._layoutDirty && this.node.children.length > 0) {
this._doLayout();
this._layoutDirty = !1;
}
}
});
Object.defineProperty(a.prototype, "padding", {
get: function() {
cc.warnID(4100);
return this.paddingLeft;
},
set: function(t) {
this._N$padding = t;
this._migratePaddingData();
this._doLayoutDirty();
}
});
cc.Layout = e.exports = a;
}), {
"./CCComponent": 53
} ],
59: [ (function(t, e, i) {
t("../../clipping-nodes/CCClippingNode");
t("../../clipping-nodes/CCClippingNodeCanvasRenderCmd");
t("../../clipping-nodes/CCClippingNodeWebGLRenderCmd");
t("../../shape-nodes/CCDrawNode");
var n = cc._RendererInSG, o = cc.Enum({
RECT: 0,
ELLIPSE: 1,
IMAGE_STENCIL: 2
}), r = cc.Class({
name: "cc.Mask",
extends: n,
editor: !1,
properties: {
_clippingStencil: {
default: null,
serializable: !1
},
_type: o.RECT,
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._refreshStencil();
},
type: o,
tooltip: !1
},
spriteFrame: {
default: null,
type: cc.SpriteFrame,
tooltip: !1,
notify: function() {
this._refreshStencil();
}
},
alphaThreshold: {
default: 1,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setAlphaThreshold(this.alphaThreshold) : cc.warnID(4201);
}
},
inverted: {
default: !1,
type: cc.Boolean,
tooltip: !1,
notify: function() {
cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setInverted(this.inverted) : cc.warnID(4202);
}
},
_segements: 64,
segements: {
get: function() {
return this._segements;
},
set: function(t) {
this._segements = cc.clampf(t, 3, 1e4);
this._refreshStencil();
},
tooltip: !1
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
}
},
statics: {
Type: o
},
_resizeNodeToTargetNode: !1,
_initSgNode: function() {},
_createSgNode: function() {
return new cc.ClippingNode();
},
_hitTest: function(t) {
var e = this.node.getContentSize(), i = e.width, n = e.height, r = this.node.getNodeToWorldTransform();
if (this.type === o.RECT || this.type === o.IMAGE_STENCIL) {
var s = cc.rect(0, 0, i, n);
cc._rectApplyAffineTransformIn(s, r);
var c = t.x - s.x, a = s.x + s.width - t.x, h = t.y - s.y, l = s.y + s.height - t.y;
return c >= 0 && a >= 0 && l >= 0 && h >= 0;
}
if (this.type === o.ELLIPSE) {
var u = i / 2, d = n / 2, f = r.a * u + r.c * d + r.tx, p = r.b * u + r.d * d + r.ty, _ = t.x - f, g = t.y - p;
return _ * _ / (u * u) + g * g / (d * d) < 1;
}
},
onEnable: function() {
this._super();
this.spriteFrame && this.spriteFrame.ensureLoadTexture();
this._refreshStencil();
this.node.on("size-changed", this._refreshStencil, this);
this.node.on("anchor-changed", this._refreshStencil, this);
},
onDisable: function() {
this._super();
this.node.off("size-changed", this._refreshStencil, this);
this.node.off("anchor-changed", this._refreshStencil, this);
},
_calculateCircle: function(t, e, i) {
for (var n = [], o = 2 * Math.PI / i, r = 0; r < i; ++r) n.push(cc.v2(e.x * Math.cos(o * r) + t.x, e.y * Math.sin(o * r) + t.y));
return n;
},
_refreshStencil: function() {
this.type === o.IMAGE_STENCIL && (cc._renderType, cc.game.RENDER_TYPE_WEBGL), 0;
var t = this.node.getContentSize(), e = this.node.getAnchorPoint(), i = this._clippingStencil;
if (this._type === o.IMAGE_STENCIL) {
if (!(i instanceof cc.Scale9Sprite) || i._spriteFrame !== this.spriteFrame) {
(i = new cc.Scale9Sprite()).setSpriteFrame(this.spriteFrame);
this._sgNode.setStencil(i);
}
i.setContentSize(t);
i.setAnchorPoint(e);
this._sgNode.setAlphaThreshold(this.alphaThreshold);
} else {
if (!(i instanceof cc.DrawNode)) {
(i = new cc.DrawNode()).retain();
this._sgNode.setStencil(i);
}
var n = t.width, r = t.height, s = -n * e.x, c = -r * e.y, a = cc.color(255, 255, 255, 0);
i.clear();
if (this._type === o.RECT) {
var h = [ cc.v2(s, c), cc.v2(s + n, c), cc.v2(s + n, c + r), cc.v2(s, c + r) ];
i.drawPoly(h, a, 0, a);
} else if (this._type === o.ELLIPSE) {
var l = cc.v2(s + n / 2, c + r / 2), u = {
x: n / 2,
y: r / 2
};
i.drawPoly(this._calculateCircle(l, u, this._segements), a, 0, a);
}
}
this._sgNode.setInverted(this.inverted);
this._clippingStencil = i;
0;
}
});
r.prototype.__superOnDestroy = n.prototype.onDestroy;
r.prototype.onDestroy = function() {
this.__superOnDestroy();
if (this._clippingStencil) {
this._clippingStencil.release();
this._clippingStencil = null;
}
};
cc.Mask = e.exports = r;
}), {
"../../clipping-nodes/CCClippingNode": 1,
"../../clipping-nodes/CCClippingNodeCanvasRenderCmd": 1,
"../../clipping-nodes/CCClippingNodeWebGLRenderCmd": 1,
"../../shape-nodes/CCDrawNode": 1
} ],
60: [ (function(t, e, i) {
var n = cc.Enum({
Unified: 0,
Free: 1
}), o = cc.Enum({
Horizontal: 0,
Vertical: 1
}), r = cc.Enum({
PAGE_TURNING: 0
}), s = cc.Class({
name: "cc.PageView",
extends: cc.ScrollView,
editor: !1,
ctor: function() {
this._curPageIdx = 0;
this._lastPageIdx = 0;
this._pages = [];
this._scrollCenterOffsetX = [];
this._scrollCenterOffsetY = [];
},
properties: {
sizeMode: {
default: n.Unified,
type: n,
tooltip: !1,
notify: function() {
this._syncSizeMode();
}
},
direction: {
default: o.Horizontal,
type: o,
tooltip: !1,
notify: function() {
this._syncScrollDirection();
}
},
scrollThreshold: {
default: .5,
type: cc.Float,
slide: !0,
range: [ 0, 1, .01 ],
tooltip: !1
},
autoPageTurningThreshold: {
default: 100,
type: cc.Float,
tooltip: !1
},
pageTurningEventTiming: {
default: .1,
type: cc.Float,
range: [ 0, 1, .01 ],
tooltip: !1
},
indicator: {
default: null,
type: cc.PageViewIndicator,
tooltip: !1,
notify: function() {
this.indicator && this.indicator.setPageView(this);
}
},
pageTurningSpeed: {
default: .3,
type: cc.Float,
tooltip: !1
},
pageEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
SizeMode: n,
Direction: o,
EventType: r
},
__preload: function() {
this.node.on("size-changed", this._updateAllPagesSize, this);
},
onEnable: function() {
this._super();
this.node.on("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
},
onDisable: function() {
this._super();
this.node.off("scroll-ended-with-threshold", this._dispatchPageTurningEvent, this);
},
onLoad: function() {
this._initPages();
this.indicator && this.indicator.setPageView(this);
},
onDestroy: function() {
this.node.off("size-changed", this._updateAllPagesSize, this);
},
getCurrentPageIndex: function() {
return this._curPageIdx;
},
setCurrentPageIndex: function(t) {
this.scrollToPage(t, !0);
},
getPages: function() {
return this._pages;
},
addPage: function(t) {
if (t && -1 === this._pages.indexOf(t) && this.content) {
this.content.addChild(t);
this._pages.push(t);
this._updatePageView();
}
},
insertPage: function(t, e) {
if (!(e < 0) && t && -1 === this._pages.indexOf(t) && this.content) {
if (e >= this._pages.length) this.addPage(t); else {
this._pages.splice(e, 0, t);
this.content.addChild(t);
this._updatePageView();
}
}
},
removePage: function(t) {
if (t && this.content) {
var e = this._pages.indexOf(t);
-1 !== e ? this.removePageAtIndex(e) : cc.warnID(4300, t.name);
}
},
removePageAtIndex: function(t) {
var e = this._pages;
if (!(t < 0 || t >= e.length)) {
var i = e[t];
if (i) {
this.content.removeChild(i);
e.splice(t, 1);
this._updatePageView();
}
}
},
removeAllPages: function() {
if (this.content) {
for (var t = this._pages, e = 0, i = t.length; e < i; e++) this.content.removeChild(t[e]);
this._pages.length = 0;
this._updatePageView();
}
},
scrollToPage: function(t, e) {
if (!(t < 0 || t >= this._pages.length)) {
e = void 0 !== e ? e : .3;
this._curPageIdx = t;
this.scrollToOffset(this._moveOffsetValue(t), e, !0);
this.indicator && this.indicator._changedState();
}
},
getScrollEndedEventTiming: function() {
return this.pageTurningEventTiming;
},
_syncScrollDirection: function() {
this.horizontal = this.direction === o.Horizontal;
this.vertical = this.direction === o.Vertical;
},
_syncSizeMode: function() {
if (this.content) {
var t = this.content.getComponent(cc.Layout);
if (t) {
if (0 === this._pages.length) t.padding = 0; else {
var e = this._pages[this._pages.length - 1];
if (this.sizeMode === n.Free) if (this.direction === o.Horizontal) {
t.paddingLeft = (this.node.width - this._pages[0].width) / 2;
t.paddingRight = (this.node.width - e.width) / 2;
} else if (this.direction === o.Vertical) {
t.paddingTop = (this.node.height - this._pages[0].height) / 2;
t.paddingBottom = (this.node.height - e.height) / 2;
}
}
t.updateLayout();
}
}
},
_updatePageView: function() {
var t = this._pages.length;
if (this._curPageIdx >= t) {
this._curPageIdx = 0 === t ? 0 : t - 1;
this._lastPageIdx = this._curPageIdx;
}
for (var e = 0; e < t; ++e) {
this._pages[e].setSiblingIndex(e);
this.direction === o.Horizontal ? this._scrollCenterOffsetX[e] = Math.abs(this.content.x + this._pages[e].x) : this._scrollCenterOffsetY[e] = Math.abs(this.content.y + this._pages[e].y);
}
var i = this.content.getComponent(cc.Layout);
i && i.enabled && i.updateLayout();
this.indicator && this.indicator._refresh();
},
_updateAllPagesSize: function() {
if (this.sizeMode === n.Unified) for (var t = this._pages, e = this.node.getContentSize(), i = 0, o = t.length; i < o; i++) t[i].setContentSize(e);
},
_initPages: function() {
if (this.content) {
for (var t = this.content.children, e = 0; e < t.length; ++e) {
var i = t[e];
this._pages.indexOf(i) >= 0 || this._pages.push(i);
}
this._syncScrollDirection();
this._syncSizeMode();
this._updatePageView();
}
},
_dispatchPageTurningEvent: function() {
if (this._lastPageIdx !== this._curPageIdx) {
this._lastPageIdx = this._curPageIdx;
cc.Component.EventHandler.emitEvents(this.pageEvents, this, r.PAGE_TURNING);
this.node.emit("page-turning", this);
}
},
_isScrollable: function(t, e, i) {
if (this.sizeMode === n.Free) {
var r, s;
if (this.direction === o.Horizontal) {
r = this._scrollCenterOffsetX[e];
s = this._scrollCenterOffsetX[i];
return Math.abs(t.x) >= Math.abs(r - s) * this.scrollThreshold;
}
if (this.direction === o.Vertical) {
r = this._scrollCenterOffsetY[e];
s = this._scrollCenterOffsetY[i];
return Math.abs(t.y) >= Math.abs(r - s) * this.scrollThreshold;
}
} else {
if (this.direction === o.Horizontal) return Math.abs(t.x) >= this.node.width * this.scrollThreshold;
if (this.direction === o.Vertical) return Math.abs(t.y) >= this.node.height * this.scrollThreshold;
}
},
_isQuicklyScrollable: function(t) {
if (this.direction === o.Horizontal) {
if (Math.abs(t.x) > this.autoPageTurningThreshold) return !0;
} else if (this.direction === o.Vertical && Math.abs(t.y) > this.autoPageTurningThreshold) return !0;
return !1;
},
_moveOffsetValue: function(t) {
var e = cc.p(0, 0);
this.sizeMode === n.Free ? this.direction === o.Horizontal ? e.x = this._scrollCenterOffsetX[t] : this.direction === o.Vertical && (e.y = this._scrollCenterOffsetY[t]) : this.direction === o.Horizontal ? e.x = t * this.node.width : this.direction === o.Vertical && (e.y = t * this.node.height);
return e;
},
_getDragDirection: function(t) {
return this.direction === o.Horizontal ? 0 === t.x ? 0 : t.x > 0 ? 1 : -1 : this.direction === o.Vertical ? 0 === t.y ? 0 : t.y < 0 ? 1 : -1 : void 0;
},
_handleReleaseLogic: function(t) {
var e = this._startBounceBackIfNeeded(), i = cc.pSub(this._touchBeganPosition, this._touchEndPosition);
if (e) {
var n = this._getDragDirection(i);
if (0 === n) return;
this._curPageIdx = n > 0 ? this._pages.length - 1 : 0;
this.indicator && this.indicator._changedState();
} else {
var o = this._curPageIdx, r = o + this._getDragDirection(i), s = this.pageTurningSpeed * Math.abs(o - r);
if (r < this._pages.length) {
if (this._isScrollable(i, o, r)) {
this.scrollToPage(r, s);
return;
}
var c = this._calculateTouchMoveVelocity();
if (this._isQuicklyScrollable(c)) {
this.scrollToPage(r, s);
return;
}
}
this.scrollToPage(o, s);
}
},
_onTouchBegan: function(t, e) {
this._touchBeganPosition = t.touch.getLocation();
this._super(t, e);
},
_onTouchMoved: function(t, e) {
this._super(t, e);
},
_onTouchEnded: function(t, e) {
this._touchEndPosition = t.touch.getLocation();
this._super(t, e);
},
_onTouchCancelled: function(t, e) {
this._touchEndPosition = t.touch.getLocation();
this._super(t, e);
},
_onMouseWheel: function() {}
});
cc.PageView = e.exports = s;
}), {} ],
61: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), o = cc.Class({
name: "cc.PageViewIndicator",
extends: t("./CCComponent"),
editor: !1,
properties: {
_layout: null,
_pageView: null,
_indicators: [],
spriteFrame: {
default: null,
type: cc.SpriteFrame,
tooltip: !1
},
direction: {
default: n.HORIZONTAL,
type: n,
tooltip: !1
},
cellSize: {
default: cc.size(20, 20),
tooltip: !1
},
spacing: {
default: 0,
tooltip: !1
}
},
statics: {
Direction: n
},
onLoad: function() {
this._updateLayout();
},
setPageView: function(t) {
this._pageView = t;
this._refresh();
},
_updateLayout: function() {
this._layout = this.getComponent(cc.Layout);
this._layout || (this._layout = this.addComponent(cc.Layout));
if (this.direction === n.HORIZONTAL) {
this._layout.type = cc.Layout.Type.HORIZONTAL;
this._layout.spacingX = this.spacing;
} else if (this.direction === n.VERTICAL) {
this._layout.type = cc.Layout.Type.VERTICAL;
this._layout.spacingY = this.spacing;
}
this._layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
},
_createIndicator: function() {
var t = new cc.Node();
t.addComponent(cc.Sprite).spriteFrame = this.spriteFrame;
t.parent = this.node;
t.width = this.cellSize.width;
t.height = this.cellSize.height;
return t;
},
_changedState: function() {
var t = this._indicators;
if (0 !== t.length) {
var e = this._pageView._curPageIdx;
if (!(e >= t.length)) {
for (var i = 0; i < t.length; ++i) {
t[i].opacity = 127.5;
}
t[e].opacity = 255;
}
}
},
_refresh: function() {
if (this._pageView) {
var t = this._indicators, e = this._pageView.getPages();
if (e.length !== t.length) {
var i = 0;
if (e.length > t.length) for (i = 0; i < e.length; ++i) t[i] || (t[i] = this._createIndicator()); else {
for (i = t.length - e.length; i > 0; --i) {
var n = t[i - 1];
this.node.removeChild(n);
t.splice(i - 1, 1);
}
}
this._layout && this._layout.enabledInHierarchy && this._layout.updateLayout();
this._changedState();
}
}
}
});
cc.PageViewIndicator = e.exports = o;
}), {
"./CCComponent": 53
} ],
62: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1,
FILLED: 2
}), o = cc.Class({
name: "cc.ProgressBar",
extends: t("./CCComponent"),
editor: !1,
_initBarSprite: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = this.node.getContentSize(), i = this.node.getAnchorPoint(), o = t.getContentSize();
t.parent === this.node && this.node.setContentSize(o);
this.barSprite.fillType === cc.Sprite.FillType.RADIAL && (this.mode = n.FILLED);
var r = t.getContentSize();
this.mode === n.HORIZONTAL ? this.totalLength = r.width : this.mode === n.VERTICAL ? this.totalLength = r.height : this.totalLength = this.barSprite.fillRange;
if (t.parent === this.node) {
var s = -e.width * i.x;
t.setPosition(cc.p(s, 0));
}
}
},
_updateBarStatus: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e, i, o, r = t.getAnchorPoint(), s = t.getContentSize(), c = t.getPosition(), a = cc.p(0, .5), h = cc.clamp01(this.progress), l = this.totalLength * h;
switch (this.mode) {
case n.HORIZONTAL:
this.reverse && (a = cc.p(1, .5));
e = cc.size(l, s.height);
i = this.totalLength;
o = s.height;
break;

case n.VERTICAL:
a = this.reverse ? cc.p(.5, 1) : cc.p(.5, 0);
e = cc.size(s.width, l);
i = s.width;
o = this.totalLength;
}
if (this.mode === n.FILLED) if (this.barSprite.type !== cc.Sprite.Type.FILLED) cc.warn("ProgressBar FILLED mode only works when barSprite's Type is FILLED!"); else {
this.reverse && (l *= -1);
this.barSprite.fillRange = l;
} else if (this.barSprite.type !== cc.Sprite.Type.FILLED) {
var u = a.x - r.x, d = a.y - r.y, f = cc.p(i * u, o * d);
t.setPosition(cc.pAdd(c, f));
t.setAnchorPoint(a);
t.setContentSize(e);
} else cc.warn("ProgressBar non-FILLED mode only works when barSprite's Type is non-FILLED!");
}
},
properties: {
barSprite: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._initBarSprite();
},
animatable: !1
},
mode: {
default: n.HORIZONTAL,
type: n,
tooltip: !1,
notify: function() {
if (this.barSprite) {
var t = this.barSprite.node;
if (!t) return;
var e = t.getContentSize();
this.mode === n.HORIZONTAL ? this.totalLength = e.width : this.mode === n.VERTICAL ? this.totalLength = e.height : this.mode === n.FILLED && (this.totalLength = this.barSprite.fillRange);
}
},
animatable: !1
},
_N$totalLength: 1,
totalLength: {
range: [ 0, Number.MAX_VALUE ],
tooltip: !1,
get: function() {
return this._N$totalLength;
},
set: function(t) {
this.mode === n.FILLED && (t = cc.clamp01(t));
this._N$totalLength = t;
this._updateBarStatus();
}
},
progress: {
default: 1,
type: "Float",
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateBarStatus();
}
},
reverse: {
default: !1,
tooltip: !1,
notify: function() {
this.barSprite && (this.barSprite.fillStart = 1 - this.barSprite.fillStart);
this._updateBarStatus();
},
animatable: !1
}
},
statics: {
Mode: n
}
});
cc.ProgressBar = e.exports = o;
}), {
"./CCComponent": 53
} ],
63: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererInSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
t.setVisible(!1);
0;
t.retain();
this._plainNode = new _ccsg.Node();
this._plainNode.retain();
},
__preload: function() {
this._initSgNode();
},
onEnable: function() {
if (cc.director._actionManager && cc.director._actionManager.getNumberOfRunningActionsInTarget(this.node) > 0) {
cc.errorID(1629, this.node.name);
cc.errorID(1630);
cc.errorID(1631);
}
this._replaceSgNode(this._sgNode);
},
onDisable: function() {
this._replaceSgNode(this._plainNode);
},
onDestroy: function() {
this._removeSgNode();
var t = this.node._sgNode;
if (this._plainNode !== t) {
this._plainNode.release();
this._plainNode = null;
}
},
_replaceSgNode: function(t) {
0;
var e = this.node, i = e._sgNode;
i._entity = null;
0;
var n = i.getChildren().slice();
i.removeAllChildren(!1);
if (t.getChildrenCount() > 0) {
0;
t.removeAllChildren(!1);
}
for (var o = 0, r = n.length; o < r; ++o) t.addChild(n[o]);
var s = i.getParent();
if (s) if (cc.runtime) {
s.removeChild(i, !1);
s.addChild(t);
t.arrivalOrder = i.arrivalOrder;
} else {
s.insertChildBefore(t, i);
s.removeChild(i, !1);
}
e._sgNode = t;
e._sgNode._entity = e;
e._updateSgNode();
}
});
cc._RendererInSG = e.exports = n;
}), {
"./CCSGComponent": 66
} ],
64: [ (function(t, e, i) {
var n = cc.Class({
extends: t("./CCSGComponent"),
name: "cc._RendererUnderSG",
ctor: function() {
var t = this._sgNode = this._createSgNode();
if (t) {
t.retain();
t.setVisible(!1);
}
},
__preload: function() {
this._initSgNode();
this._registSizeProvider();
this._appendSgNode(this._sgNode);
},
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
},
_appendSgNode: function(t) {
if (t) {
var e = this.node;
t.setColor(e._color);
e._cascadeOpacityEnabled || t.setOpacity(e._opacity);
t.setAnchorPoint(e._anchorPoint);
t.setOpacityModifyRGB(e._opacityModifyRGB);
t.setLocalZOrder(-1);
e._sgNode.addChild(t);
}
}
});
cc._RendererUnderSG = e.exports = n;
}), {
"./CCSGComponent": 66
} ],
65: [ (function(t, e, i) {
t("../label/CCHtmlTextParser");
t("../label/CCTextUtils");
var n = cc.TextAlignment, o = cc.VerticalTextAlignment, r = cc.Class({
name: "cc.RichText",
extends: cc._RendererUnderSG,
ctor: function() {
this._textArray = null;
this._labelSegments = [];
this._labelSegmentsCache = [];
this._linesWidth = [];
this._resetState();
this._updateRichTextStatus = this._updateRichText;
},
editor: !1,
properties: {
string: {
default: "<color=#00ff00>Rich</c><color=#0fffff>Text</color>",
multiline: !0,
tooltip: !1,
notify: function() {
this._updateRichTextStatus();
}
},
horizontalAlign: {
default: n.LEFT,
type: n,
tooltip: !1,
animatable: !1,
notify: function(t) {
if (this.horizontalAlign !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
fontSize: {
default: 40,
tooltip: !1,
notify: function(t) {
if (this.fontSize !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
font: {
default: null,
type: cc.TTFFont,
tooltip: !1,
notify: function(t) {
if (this.font !== t) {
this._layoutDirty = !0;
0;
this._updateRichTextStatus();
}
}
},
maxWidth: {
default: 0,
tooltip: !1,
notify: function(t) {
if (this.maxWidth !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
lineHeight: {
default: 40,
tooltip: !1,
notify: function(t) {
if (this.lineHeight !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
imageAtlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
notify: function(t) {
if (this.imageAtlas !== t) {
this._layoutDirty = !0;
this._updateRichTextStatus();
}
}
},
handleTouchEvent: {
default: !0,
tooltip: !1,
notify: function(t) {
this.handleTouchEvent !== t && this.enabledInHierarchy && (this.handleTouchEvent ? this._addEventListeners() : this._removeEventListeners());
}
}
},
statics: {
HorizontalAlign: n,
VerticalAlign: o
},
onEnable: function() {
this._super();
this.handleTouchEvent && this._addEventListeners();
},
onDisable: function() {
this._super();
this.handleTouchEvent && this._removeEventListeners();
},
_addEventListeners: function() {
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_removeEventListeners: function() {
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
},
_createSgNode: function() {
var t = new _ccsg.Node();
t.setCascadeOpacityEnabled(!0);
var e = this;
t.setColor = function() {
e._updateLabelSegmentTextAttributes();
};
t._setContentSize = t.setContentSize;
t.setContentSize = function() {};
return t;
},
_updateLabelSegmentTextAttributes: function() {
this._labelSegments.forEach(function(t) {
this._applyTextAttribute(t);
}.bind(this));
},
_initSgNode: function() {
this._updateRichText();
0;
},
_createFontLabel: function(t) {
return _ccsg.Label.pool.get(t, this.font, null, this.fontSize);
},
_getFontRawUrl: function() {
return this.font instanceof cc.TTFFont ? this.font.rawUrl : "";
},
_onTTFLoaded: function() {
var t = this._getFontRawUrl();
if (t) {
var e = this;
cc.CustomFontLoader.loadTTF(t, (function() {
e._layoutDirty = !0;
e._updateRichText();
}));
}
},
_measureText: function(t, e) {
var i = this, n = function(e) {
var n;
if (0 === i._labelSegmentsCache.length) {
n = i._createFontLabel(e);
i._labelSegmentsCache.push(n);
} else (n = i._labelSegmentsCache[0]).setString(e);
n._styleIndex = t;
i._applyTextAttribute(n);
return n.getContentSize().width;
};
return e ? n(e) : n;
},
_onTouchEnded: function(t) {
for (var e = this.node.getComponents(cc.Component), i = 0; i < this._labelSegments.length; ++i) {
var n = this._labelSegments[i], o = n._clickHandler;
if (o && this._containsTouchLocation(n, t.touch.getLocation())) {
e.forEach((function(e) {
e.enabledInHierarchy && e[o] && e[o](t);
}));
t.stopPropagation();
}
}
},
_containsTouchLocation: function(t, e) {
var i = t.getBoundingBoxToWorld();
return cc.rectContainsPoint(i, e);
},
_resetState: function() {
var t = this._sgNode;
t && t.removeAllChildren();
this._labelSegments.length = 0;
this._labelSegmentsCache.length = 0;
this._linesWidth.length = 0;
this._lineOffsetX = 0;
this._lineCount = 1;
this._labelWidth = 0;
this._labelHeight = 0;
this._layoutDirty = !0;
},
_addLabelSegment: function(t, e) {
var i;
0 === this._labelSegmentsCache.length ? i = this._createFontLabel(t) : (i = this._labelSegmentsCache.pop()).setString(t);
i._styleIndex = e;
i._lineCount = this._lineCount;
this._applyTextAttribute(i);
i.setAnchorPoint(0, 0);
this._sgNode.addChild(i);
this._labelSegments.push(i);
i.setOverflow(1);
var n = i.getContentSize();
i.enableWrap(!1);
i.setDimensions(n.width, this.lineHeight);
return i;
},
_updateRichTextWithMaxWidth: function(t, e, i) {
var n = e;
if (this._lineOffsetX > 0 && n + this._lineOffsetX > this.maxWidth) for (var o = 0; this._lineOffsetX <= this.maxWidth; ) {
var r = this._getFirstWordLen(t, o, t.length), s = t.substr(o, r), c = this._measureText(i, s);
if (!(this._lineOffsetX + c <= this.maxWidth)) {
if (o > 0) {
var a = t.substr(0, o);
this._addLabelSegment(a, i);
t = t.substr(o, t.length);
n = this._measureText(i, t);
}
this._updateLineInfo();
break;
}
this._lineOffsetX += c;
o += r;
}
if (n > this.maxWidth) for (var h = cc.TextUtils.fragmentText(t, n, this.maxWidth, this._measureText(i)), l = 0; l < h.length; ++l) {
var u = h[l], d = this._addLabelSegment(u, i).getContentSize();
this._lineOffsetX += d.width;
h.length > 1 && l < h.length - 1 && this._updateLineInfo();
} else {
this._lineOffsetX += n;
this._addLabelSegment(t, i);
}
},
_isLastComponentCR: function(t) {
return t.length - 1 === t.lastIndexOf("\n");
},
_updateLineInfo: function() {
this._linesWidth.push(this._lineOffsetX);
this._lineOffsetX = 0;
this._lineCount++;
},
_needsUpdateTextLayout: function(t) {
if (this._layoutDirty || !this._textArray || !t) return !0;
if (this._textArray.length !== t.length) return !0;
for (var e = 0; e < this._textArray.length; ++e) {
var i = this._textArray[e], n = t[e];
if (i.text != n.text) return !0;
if (i.style) {
if (n.style) {
if (i.style.size !== n.style.size || i.style.italic !== n.style.italic || i.style.isImage !== n.style.isImage) return !0;
if (i.style.isImage === n.style.isImage && i.style.src !== n.style.src) return !0;
} else if (i.style.size || i.style.italic || i.style.isImage) return !0;
} else if (n.style && (n.style.size || n.style.italic || n.style.isImage)) return !0;
}
return !1;
},
_onSpriteFrameLoaded: function(t, e) {
var i;
(i = e || t.target).__sprite.setSpriteFrame(i);
},
_applySpriteFrame: function(t) {
if (t) if (t.textureLoaded()) this._onSpriteFrameLoaded(null, t); else {
t.once("load", this._onSpriteFrameLoaded, this);
t.ensureLoadTexture();
}
},
_addRichTextImageElement: function(t) {
var e = t.style.src, i = this.imageAtlas.getSpriteFrame(e);
if (i) {
var n = new cc.Scale9Sprite();
n.setAnchorPoint(0, 0);
i.__sprite = n;
this._sgNode.addChild(n);
this._labelSegments.push(n);
var o = i.getRect(), r = 1, s = o.width, c = o.height, a = t.style.imageWidth, h = t.style.imageHeight;
if (h > 0 && h < this.lineHeight) {
s *= r = h / c;
c *= r;
} else {
s *= r = this.lineHeight / c;
c *= r;
}
a > 0 && (s = a);
if (this.maxWidth > 0) {
this._lineOffsetX + s > this.maxWidth && this._updateLineInfo();
this._lineOffsetX += s;
} else {
this._lineOffsetX += s;
this._lineOffsetX > this._labelWidth && (this._labelWidth = this._lineOffsetX);
}
this._applySpriteFrame(i);
n.setContentSize(s, c);
n._lineCount = this._lineCount;
t.style.event && t.style.event.click && (n._clickHandler = t.style.event.click);
} else cc.warnID(4400);
},
_updateRichText: function() {
if (this.enabled) {
var t = cc.htmlTextParser.parse(this.string);
if (this._needsUpdateTextLayout(t)) {
this._textArray = t;
this._resetState();
for (var e, i = !1, n = 0; n < this._textArray.length; ++n) {
var o = this._textArray[n], r = o.text;
if ("" === r) {
if (o.style && o.style.newline) {
this._updateLineInfo();
continue;
}
if (o.style && o.style.isImage && this.imageAtlas) {
this._addRichTextImageElement(o);
continue;
}
}
for (var s = r.split("\n"), c = 0; c < s.length; ++c) {
var a = s[c];
if ("" !== a) {
i = !1;
if (this.maxWidth > 0) {
var h = this._measureText(n, a);
this._updateRichTextWithMaxWidth(a, h, n);
s.length > 1 && c < s.length - 1 && this._updateLineInfo();
} else {
e = this._addLabelSegment(a, n).getContentSize();
this._lineOffsetX += e.width;
this._lineOffsetX > this._labelWidth && (this._labelWidth = this._lineOffsetX);
s.length > 1 && c < s.length - 1 && this._updateLineInfo();
}
} else {
if (this._isLastComponentCR(r) && c == s.length - 1) continue;
this._updateLineInfo();
i = !0;
}
}
}
i || this._linesWidth.push(this._lineOffsetX);
this.maxWidth > 0 && (this._labelWidth = this.maxWidth);
this._labelHeight = this._lineCount * this.lineHeight;
this.node.setContentSize(this._labelWidth, this._labelHeight);
this._sgNode._setContentSize(this._labelWidth, this._labelHeight);
this._updateRichTextPosition();
this._layoutDirty = !1;
} else {
this._textArray = t;
this._updateLabelSegmentTextAttributes();
}
}
},
_getFirstWordLen: function(t, e, i) {
var n = t.charAt(e);
if (cc.TextUtils.isUnicodeCJK(n) || cc.TextUtils.isUnicodeSpace(n)) return 1;
for (var o = 1, r = e + 1; r < i; ++r) {
n = t.charAt(r);
if (cc.TextUtils.isUnicodeSpace(n) || cc.TextUtils.isUnicodeCJK(n)) break;
o++;
}
return o;
},
_updateRichTextPosition: function() {
for (var t = 0, e = 1, i = this._lineCount, n = 0; n < this._labelSegments.length; ++n) {
var o = this._labelSegments[n], r = o._lineCount;
if (r > e) {
t = 0;
e = r;
}
var s = 0;
switch (this.horizontalAlign) {
case cc.TextAlignment.LEFT:
s = 0;
break;

case cc.TextAlignment.CENTER:
s = (this._labelWidth - this._linesWidth[r - 1]) / 2;
break;

case cc.TextAlignment.RIGHT:
s = this._labelWidth - this._linesWidth[r - 1];
}
o.setPositionX(t + s);
var c = o.getContentSize(), a = (i - r) * this.lineHeight;
o instanceof cc.Scale9Sprite && (a += (this.lineHeight - o.getContentSize().height) / 2);
o.setPositionY(a);
r === e && (t += c.width);
}
},
_convertLiteralColorValue: function(t) {
var e = t.toUpperCase();
return cc.Color[e] ? cc.Color[e] : cc.hexToColor(t);
},
_applyTextAttribute: function(t) {
if (!(t instanceof cc.Scale9Sprite)) {
var e = t._styleIndex;
t.setLineHeight(this.lineHeight);
t.setVerticalAlign(o.CENTER);
var i = null;
this._textArray[e] && (i = this._textArray[e].style);
i && i.color ? t.setColor(this._convertLiteralColorValue(i.color)) : t.setColor(this.node.color);
i && i.bold ? t.enableBold(!0) : t.enableBold(!1);
i && i.italic ? t.enableItalics(!0) : t.enableItalics(!1);
i && i.underline ? t.enableUnderline(!0) : t.enableUnderline(!1);
if (i && i.outline) {
t.setOutlined(!0);
t.setOutlineColor(this._convertLiteralColorValue(i.outline.color));
t.setOutlineWidth(i.outline.width);
t.setMargin(i.outline.width);
} else {
t.setOutlined(!1);
t.setMargin(0);
}
i && i.size ? t.setFontSize(i.size) : t.setFontSize(this.fontSize);
i && i.event && i.event.click && (t._clickHandler = i.event.click);
}
},
onDestroy: function() {
this._super();
for (var t = 0; t < this._labelSegments.length; ++t) {
this._labelSegments[t].removeFromParent(!0);
_ccsg.Label.pool.put(this._labelSegments[t]);
}
this._resetState();
}
});
cc.RichText = e.exports = r;
}), {
"../label/CCHtmlTextParser": 92,
"../label/CCTextUtils": 93
} ],
66: [ (function(t, e, i) {
var n = t("../utils/scene-graph-helper"), o = cc.Class({
extends: t("./CCComponent"),
name: "cc._SGComponent",
editor: !1,
properties: {
_sgNode: {
default: null,
serializable: !1
}
},
_createSgNode: null,
_initSgNode: null,
_removeSgNode: n.removeSgNode,
_registSizeProvider: function() {
if (this.node._sizeProvider) {
} else this.node._sizeProvider = this._sgNode;
}
});
cc._SGComponent = e.exports = o;
}), {
"../utils/scene-graph-helper": 162,
"./CCComponent": 53
} ],
67: [ (function(t, e, i) {
var n = cc.Enum({
HORIZONTAL: 0,
VERTICAL: 1
}), o = cc.Class({
name: "cc.Scrollbar",
extends: t("./CCComponent"),
editor: !1,
properties: {
_scrollView: null,
_touching: !1,
_autoHideRemainingTime: {
default: 0,
serializable: !1
},
_opacity: 255,
handle: {
default: null,
type: cc.Sprite,
tooltip: !1,
notify: function() {
this._onScroll(cc.p(0, 0));
},
animatable: !1
},
direction: {
default: n.HORIZONTAL,
type: n,
tooltip: !1,
notify: function() {
this._onScroll(cc.p(0, 0));
},
animatable: !1
},
enableAutoHide: {
default: !0,
animatable: !1,
tooltip: !1
},
autoHideTime: {
default: 1,
animatable: !1,
tooltip: !1
}
},
statics: {
Direction: n
},
setTargetScrollView: function(t) {
this._scrollView = t;
},
_convertToScrollViewSpace: function(t) {
var e = t.convertToWorldSpace(cc.p(0, 0));
return this._scrollView.node.convertToNodeSpace(e);
},
_setOpacity: function(t) {
this.handle && this.node.setOpacity(t);
},
_onScroll: function(t) {
if (this._scrollView) {
var e = this._scrollView.content;
if (e) {
var i = e.getContentSize(), o = this._scrollView.node.getContentSize(), r = this.node.getContentSize();
if (this._conditionalDisableScrollBar(i, o)) return;
if (this.enableAutoHide) {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
}
var s = 0, c = 0, a = 0, h = 0, l = 0;
if (this.direction === n.HORIZONTAL) {
s = i.width;
c = o.width;
l = r.width;
a = t.x;
h = -this._convertToScrollViewSpace(e).x;
} else if (this.direction === n.VERTICAL) {
s = i.height;
c = o.height;
l = r.height;
a = t.y;
h = -this._convertToScrollViewSpace(e).y;
}
var u = this._calculateLength(s, c, l, a), d = this._calculatePosition(s, c, l, h, a, u);
this._updateLength(u);
this._updateHanlderPosition(d);
}
}
},
_updateHanlderPosition: function(t) {
if (this.handle) {
var e = this._fixupHandlerPosition();
this.handle.node.setPosition(cc.pAdd(t, e));
}
},
_fixupHandlerPosition: function() {
var t = this.node.getContentSize(), e = this.node.getAnchorPoint(), i = this.handle.node.getContentSize(), o = this.handle.node.parent, r = this.node.convertToWorldSpaceAR(cc.p(-t.width * e.x, -t.height * e.y)), s = o.convertToNodeSpaceAR(r);
this.direction === n.HORIZONTAL ? s = cc.pAdd(s, cc.p(0, (t.height - i.height) / 2)) : this.direction === n.VERTICAL && (s = cc.pAdd(s, cc.p((t.width - i.width) / 2, 0)));
this.handle.node.setPosition(s);
return s;
},
_onTouchBegan: function() {
this.enableAutoHide && (this._touching = !0);
},
_conditionalDisableScrollBar: function(t, e) {
return t.width <= e.width && this.direction === n.HORIZONTAL || t.height <= e.height && this.direction === n.VERTICAL;
},
_onTouchEnded: function() {
if (this.enableAutoHide) {
this._touching = !1;
if (!(this.autoHideTime <= 0)) {
if (this._scrollView) {
var t = this._scrollView.content;
if (t) {
var e = t.getContentSize(), i = this._scrollView.node.getContentSize();
if (this._conditionalDisableScrollBar(e, i)) return;
}
}
this._autoHideRemainingTime = this.autoHideTime;
}
}
},
_calculateLength: function(t, e, i, n) {
var o = t;
n && (o += 20 * (n > 0 ? n : -n));
return i * (e / o);
},
_calculatePosition: function(t, e, i, o, r, s) {
var c = t - e;
r && (c += Math.abs(r));
var a = 0;
if (c) {
a = o / c;
a = cc.clamp01(a);
}
var h = (i - s) * a;
return this.direction === n.VERTICAL ? cc.p(0, h) : cc.p(h, 0);
},
_updateLength: function(t) {
if (this.handle) {
var e = this.handle.node, i = e.getContentSize();
e.setAnchorPoint(cc.p(0, 0));
this.direction === n.HORIZONTAL ? e.setContentSize(t, i.height) : e.setContentSize(i.width, t);
}
},
_processAutoHide: function(t) {
if (this.enableAutoHide && !(this._autoHideRemainingTime <= 0) && !this._touching) {
this._autoHideRemainingTime -= t;
if (this._autoHideRemainingTime <= this.autoHideTime) {
this._autoHideRemainingTime = Math.max(0, this._autoHideRemainingTime);
var e = this._opacity * (this._autoHideRemainingTime / this.autoHideTime);
this._setOpacity(e);
}
}
},
start: function() {
this.enableAutoHide && this._setOpacity(0);
},
hide: function() {
this._autoHideRemainingTime = 0;
this._setOpacity(0);
},
show: function() {
this._autoHideRemainingTime = this.autoHideTime;
this._setOpacity(this._opacity);
},
update: function(t) {
this._processAutoHide(t);
}
});
cc.Scrollbar = e.exports = o;
}), {
"./CCComponent": 53
} ],
68: [ (function(t, e, i) {
var n = function() {
return new Date().getMilliseconds();
}, o = cc.Enum({
SCROLL_TO_TOP: 0,
SCROLL_TO_BOTTOM: 1,
SCROLL_TO_LEFT: 2,
SCROLL_TO_RIGHT: 3,
SCROLLING: 4,
BOUNCE_TOP: 5,
BOUNCE_BOTTOM: 6,
BOUNCE_LEFT: 7,
BOUNCE_RIGHT: 8,
SCROLL_ENDED: 9,
TOUCH_UP: 10,
AUTOSCROLL_ENDED_WITH_THRESHOLD: 11,
SCROLL_BEGAN: 12
}), r = {
"scroll-to-top": o.SCROLL_TO_TOP,
"scroll-to-bottom": o.SCROLL_TO_BOTTOM,
"scroll-to-left": o.SCROLL_TO_LEFT,
"scroll-to-right": o.SCROLL_TO_RIGHT,
scrolling: o.SCROLLING,
"bounce-bottom": o.BOUNCE_BOTTOM,
"bounce-left": o.BOUNCE_LEFT,
"bounce-right": o.BOUNCE_RIGHT,
"bounce-top": o.BOUNCE_TOP,
"scroll-ended": o.SCROLL_ENDED,
"touch-up": o.TOUCH_UP,
"scroll-ended-with-threshold": o.AUTOSCROLL_ENDED_WITH_THRESHOLD,
"scroll-began": o.SCROLL_BEGAN
}, s = cc.Class({
name: "cc.ScrollView",
extends: t("./CCViewGroup"),
editor: !1,
ctor: function() {
this._topBoundary = 0;
this._bottomBoundary = 0;
this._leftBoundary = 0;
this._rightBoundary = 0;
this._touchMoveDisplacements = [];
this._touchMoveTimeDeltas = [];
this._touchMovePreviousTimestamp = 0;
this._touchMoved = !1;
this._autoScrolling = !1;
this._autoScrollAttenuate = !1;
this._autoScrollStartPosition = cc.p(0, 0);
this._autoScrollTargetDelta = cc.p(0, 0);
this._autoScrollTotalTime = 0;
this._autoScrollAccumulatedTime = 0;
this._autoScrollCurrentlyOutOfBoundary = !1;
this._autoScrollBraking = !1;
this._autoScrollBrakingStartPosition = cc.p(0, 0);
this._outOfBoundaryAmount = cc.p(0, 0);
this._outOfBoundaryAmountDirty = !0;
this._stopMouseWheel = !1;
this._mouseWheelEventElapsedTime = 0;
this._isScrollEndedWithThresholdEventFired = !1;
this._scrollEventEmitMask = 0;
this._isBouncing = !1;
this._scrolling = !1;
},
properties: {
content: {
default: void 0,
type: cc.Node,
tooltip: !1
},
horizontal: {
default: !0,
animatable: !1,
tooltip: !1
},
vertical: {
default: !0,
animatable: !1,
tooltip: !1
},
inertia: {
default: !0,
tooltip: !1
},
brake: {
default: .5,
type: "Float",
range: [ 0, 1, .1 ],
tooltip: !1
},
elastic: {
default: !0,
animatable: !1,
tooltip: !1
},
bounceDuration: {
default: 1,
range: [ 0, 10 ],
tooltip: !1
},
horizontalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.horizontalScrollBar) {
this.horizontalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
verticalScrollBar: {
default: void 0,
type: cc.Scrollbar,
tooltip: !1,
notify: function() {
if (this.verticalScrollBar) {
this.verticalScrollBar.setTargetScrollView(this);
this._updateScrollBar(0);
}
},
animatable: !1
},
scrollEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
},
cancelInnerEvents: {
default: !0,
animatable: !1,
tooltip: !1
}
},
statics: {
EventType: o
},
scrollToBottom: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i, !0);
},
scrollToTop: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 1),
applyToHorizontal: !1,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToTopRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 1),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomLeft: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(0, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToBottomRight: function(t, e) {
var i = this._calculateMovePercentDelta({
anchor: cc.p(1, 0),
applyToHorizontal: !0,
applyToVertical: !0
});
t ? this._startAutoScroll(i, t, !1 !== e) : this._moveContent(i);
},
scrollToOffset: function(t, e, i) {
var n = this.getMaxScrollOffset(), o = cc.p(0, 0);
0 === n.x ? o.x = 0 : o.x = t.x / n.x;
0 === n.y ? o.y = 1 : o.y = (n.y - t.y) / n.y;
this.scrollTo(o, e, i);
},
getScrollOffset: function() {
var t = this._getContentTopBoundary() - this._topBoundary, e = this._getContentLeftBoundary() - this._leftBoundary;
return cc.p(e, t);
},
getMaxScrollOffset: function() {
var t = this.node.getContentSize(), e = this.content.getContentSize(), i = e.width - t.width, n = e.height - t.height;
i = i >= 0 ? i : 0;
n = n >= 0 ? n : 0;
return cc.p(i, n);
},
scrollToPercentHorizontal: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.p(t, 0),
applyToHorizontal: !0,
applyToVertical: !1
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollTo: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: t,
applyToHorizontal: !0,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
scrollToPercentVertical: function(t, e, i) {
var n = this._calculateMovePercentDelta({
anchor: cc.p(0, t),
applyToHorizontal: !1,
applyToVertical: !0
});
e ? this._startAutoScroll(n, e, !1 !== i) : this._moveContent(n);
},
stopAutoScroll: function() {
this._autoScrolling = !1;
this._autoScrollAccumulatedTime = this._autoScrollTotalTime;
},
setContentPosition: function(t) {
if (!cc.pFuzzyEqual(t, this.getContentPosition(), 1e-4)) {
this.content.setPosition(t);
this._outOfBoundaryAmountDirty = !0;
}
},
getContentPosition: function() {
return this.content.getPosition();
},
isScrolling: function() {
return this._scrolling;
},
isAutoScrolling: function() {
return this._autoScrolling;
},
_registerEvent: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.on(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_unregisterEvent: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this, !0);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, !0);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this, !0);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this, !0);
this.node.off(cc.Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this, !0);
},
_onMouseWheel: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = cc.p(0, 0), n = -.1;
n = -7;
this.vertical ? i = cc.p(0, t.getScrollY() * n) : this.horizontal && (i = cc.p(t.getScrollY() * n, 0));
this._mouseWheelEventElapsedTime = 0;
this._processDeltaMove(i);
if (!this._stopMouseWheel) {
this._handlePressLogic();
this.schedule(this._checkMouseWheel, 1 / 60);
this._stopMouseWheel = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
},
_checkMouseWheel: function(t) {
var e = this._getHowMuchOutOfBoundary();
if (cc.pFuzzyEqual(e, cc.p(0, 0), 1e-4)) {
this._mouseWheelEventElapsedTime += t;
if (this._mouseWheelEventElapsedTime > .1) {
this._onScrollBarTouchEnded();
this.unschedule(this._checkMouseWheel);
this._stopMouseWheel = !1;
}
} else {
this._processInertiaScroll();
this.unschedule(this._checkMouseWheel);
this._stopMouseWheel = !1;
}
},
_calculateMovePercentDelta: function(t) {
var e = t.anchor, i = t.applyToHorizontal, n = t.applyToVertical;
this._calculateBoundary();
e = cc.pClamp(e, cc.p(0, 0), cc.p(1, 1));
var o = this.node.getContentSize(), r = this.content.getContentSize(), s = this._getContentBottomBoundary() - this._bottomBoundary;
s = -s;
var c = this._getContentLeftBoundary() - this._leftBoundary;
c = -c;
var a = cc.p(0, 0), h = 0;
if (i) {
h = r.width - o.width;
a.x = c - h * e.x;
}
if (n) {
h = r.height - o.height;
a.y = s - h * e.y;
}
return a;
},
_moveContentToTopLeft: function(t) {
var e = this.content.getContentSize(), i = this._getContentBottomBoundary() - this._bottomBoundary;
i = -i;
var n = cc.p(0, 0), o = 0, r = this._getContentLeftBoundary() - this._leftBoundary;
r = -r;
if (e.height < t.height) {
o = e.height - t.height;
n.y = i - o;
this.verticalScrollBar && this.verticalScrollBar.hide();
} else this.verticalScrollBar && this.verticalScrollBar.show();
if (e.width < t.width) {
o = e.width - t.width;
n.x = r;
this.horizontalScrollBar && this.horizontalScrollBar.hide();
} else this.horizontalScrollBar && this.horizontalScrollBar.show();
this._moveContent(n);
this._adjustContentOutOfBoundary();
},
_calculateBoundary: function() {
if (this.content) {
var t = this.content.getComponent(cc.Layout);
t && t.enabledInHierarchy && t.updateLayout();
var e = this.node.getContentSize(), i = this._convertToContentParentSpace(cc.p(0, 0));
this._leftBoundary = i.x;
this._bottomBoundary = i.y;
var n = this._convertToContentParentSpace(cc.p(e.width, e.height));
this._rightBoundary = n.x;
this._topBoundary = n.y;
this._moveContentToTopLeft(e);
}
},
_convertToContentParentSpace: function(t) {
var e = this.node.convertToWorldSpace(t);
return this.content.parent.convertToNodeSpaceAR(e);
},
_hasNestedViewGroup: function(t, e) {
if (t.eventPhase === cc.Event.CAPTURING_PHASE) {
if (e) for (var i = 0; i < e.length; ++i) {
var n = e[i];
if (this.node === n) return !!t.target.getComponent(cc.ViewGroup);
if (n.getComponent(cc.ViewGroup)) return !0;
}
return !1;
}
},
_stopPropagationIfTargetIsMe: function(t) {
t.eventPhase === cc.Event.AT_TARGET && t.target === this.node && t.stopPropagation();
},
_onTouchBegan: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handlePressLogic(i);
this._touchMoved = !1;
this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchMoved: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
var i = t.touch;
this.content && this._handleMoveLogic(i);
if (this.cancelInnerEvents) {
var n = cc.pSub(i.getLocation(), i.getStartLocation());
if (cc.pLength(n) > 7 && !this._touchMoved && t.target !== this.node) {
var o = new cc.Event.EventTouch(t.getTouches(), t.bubbles);
o.type = cc.Node.EventType.TOUCH_CANCEL;
o.touch = t.touch;
o.simulate = !0;
t.target.dispatchEvent(o);
this._touchMoved = !0;
}
this._stopPropagationIfTargetIsMe(t);
}
}
},
_onTouchEnded: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
this._dispatchEvent("touch-up");
var i = t.touch;
this.content && this._handleReleaseLogic(i);
this._touchMoved ? t.stopPropagation() : this._stopPropagationIfTargetIsMe(t);
}
},
_onTouchCancelled: function(t, e) {
if (this.enabledInHierarchy && !this._hasNestedViewGroup(t, e)) {
if (!t.simulate) {
var i = t.touch;
this.content && this._handleReleaseLogic(i);
}
this._stopPropagationIfTargetIsMe(t);
}
},
_processDeltaMove: function(t) {
this._scrollChildren(t);
this._gatherTouchMove(t);
},
_handleMoveLogic: function(t) {
var e = t.getDelta();
this._processDeltaMove(e);
},
_scrollChildren: function(t) {
var e, i = t = this._clampDelta(t);
if (this.elastic) {
e = this._getHowMuchOutOfBoundary();
i.x *= 0 === e.x ? 1 : .5;
i.y *= 0 === e.y ? 1 : .5;
}
if (!this.elastic) {
e = this._getHowMuchOutOfBoundary(i);
i = cc.pAdd(i, e);
}
var n = -1;
if (i.y > 0) {
this.content.y - this.content.anchorY * this.content.height + i.y > this._bottomBoundary && (n = "scroll-to-bottom");
} else if (i.y < 0) {
this.content.y - this.content.anchorY * this.content.height + this.content.height + i.y <= this._topBoundary && (n = "scroll-to-top");
} else if (i.x < 0) {
this.content.x - this.content.anchorX * this.content.width + this.content.width + i.x <= this._rightBoundary && (n = "scroll-to-right");
} else if (i.x > 0) {
this.content.x - this.content.anchorX * this.content.width + i.x >= this._leftBoundary && (n = "scroll-to-left");
}
this._moveContent(i, !1);
if (0 !== i.x || 0 !== i.y) {
if (!this._scrolling) {
this._scrolling = !0;
this._dispatchEvent("scroll-began");
}
this._dispatchEvent("scrolling");
}
-1 !== n && this._dispatchEvent(n);
},
_handlePressLogic: function() {
this._autoScrolling && this._dispatchEvent("scroll-ended");
this._autoScrolling = !1;
this._isBouncing = !1;
this._touchMovePreviousTimestamp = n();
this._touchMoveDisplacements.length = 0;
this._touchMoveTimeDeltas.length = 0;
this._onScrollBarTouchBegan();
},
_clampDelta: function(t) {
var e = this.content.getContentSize(), i = this.node.getContentSize();
e.width < i.width && (t.x = 0);
e.height < i.height && (t.y = 0);
return t;
},
_gatherTouchMove: function(t) {
t = this._clampDelta(t);
for (;this._touchMoveDisplacements.length >= 5; ) {
this._touchMoveDisplacements.shift();
this._touchMoveTimeDeltas.shift();
}
this._touchMoveDisplacements.push(t);
var e = n();
this._touchMoveTimeDeltas.push((e - this._touchMovePreviousTimestamp) / 1e3);
this._touchMovePreviousTimestamp = e;
},
_startBounceBackIfNeeded: function() {
if (!this.elastic) return !1;
var t = this._getHowMuchOutOfBoundary();
t = this._clampDelta(t);
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4)) return !1;
var e = Math.max(this.bounceDuration, 0);
this._startAutoScroll(t, e, !0);
if (!this._isBouncing) {
t.y > 0 && this._dispatchEvent("bounce-top");
t.y < 0 && this._dispatchEvent("bounce-bottom");
t.x > 0 && this._dispatchEvent("bounce-right");
t.x < 0 && this._dispatchEvent("bounce-left");
this._isBouncing = !0;
}
return !0;
},
_processInertiaScroll: function() {
if (!this._startBounceBackIfNeeded() && this.inertia) {
var t = this._calculateTouchMoveVelocity();
!cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4) && this.brake < 1 && this._startInertiaScroll(t);
}
this._onScrollBarTouchEnded();
},
_handleReleaseLogic: function(t) {
var e = t.getDelta();
this._gatherTouchMove(e);
this._processInertiaScroll();
if (this._scrolling) {
this._scrolling = !1;
this._autoScrolling || this._dispatchEvent("scroll-ended");
}
},
_isOutOfBoundary: function() {
var t = this._getHowMuchOutOfBoundary();
return !cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4);
},
_isNecessaryAutoScrollBrake: function() {
if (this._autoScrollBraking) return !0;
if (this._isOutOfBoundary()) {
if (!this._autoScrollCurrentlyOutOfBoundary) {
this._autoScrollCurrentlyOutOfBoundary = !0;
this._autoScrollBraking = !0;
this._autoScrollBrakingStartPosition = this.getContentPosition();
return !0;
}
} else this._autoScrollCurrentlyOutOfBoundary = !1;
return !1;
},
getScrollEndedEventTiming: function() {
return 1e-4;
},
_processAutoScrolling: function(t) {
var e = this._isNecessaryAutoScrollBrake(), i = e ? .05 : 1;
this._autoScrollAccumulatedTime += t * (1 / i);
var n = Math.min(1, this._autoScrollAccumulatedTime / this._autoScrollTotalTime);
this._autoScrollAttenuate && (n = (function(t) {
return (t -= 1) * t * t * t * t + 1;
})(n));
var o = cc.pAdd(this._autoScrollStartPosition, cc.pMult(this._autoScrollTargetDelta, n)), r = Math.abs(n - 1) <= 1e-4;
if (Math.abs(n - 1) <= this.getScrollEndedEventTiming() && !this._isScrollEndedWithThresholdEventFired) {
this._dispatchEvent("scroll-ended-with-threshold");
this._isScrollEndedWithThresholdEventFired = !0;
}
if (this.elastic) {
var s = cc.pSub(o, this._autoScrollBrakingStartPosition);
e && (s = cc.pMult(s, i));
o = cc.pAdd(this._autoScrollBrakingStartPosition, s);
} else {
var c = cc.pSub(o, this.getContentPosition()), a = this._getHowMuchOutOfBoundary(c);
if (!cc.pFuzzyEqual(a, cc.p(0, 0), 1e-4)) {
o = cc.pAdd(o, a);
r = !0;
}
}
r && (this._autoScrolling = !1);
var h = cc.pSub(o, this.getContentPosition());
this._moveContent(h, r);
this._dispatchEvent("scrolling");
if (!this._autoScrolling) {
this._isBouncing = !1;
this._dispatchEvent("scroll-ended");
}
},
_startInertiaScroll: function(t) {
var e = cc.pMult(t, .7);
this._startAttenuatingAutoScroll(e, t);
},
_calculateAttenuatedFactor: function(t) {
if (this.brake <= 0) return 1 - this.brake;
return (1 - this.brake) * (1 / (1 + 14e-6 * t + t * t * 8e-9));
},
_startAttenuatingAutoScroll: function(t, e) {
var i = this._calculateAutoScrollTimeByInitalSpeed(cc.pLength(e)), n = cc.pNormalize(t), o = this.content.getContentSize(), r = this.node.getContentSize(), s = o.width - r.width, c = o.height - r.height, a = this._calculateAttenuatedFactor(s), h = this._calculateAttenuatedFactor(c);
n = cc.p(n.x * s * (1 - this.brake) * a, n.y * c * h * (1 - this.brake));
var l = cc.pLength(t), u = cc.pLength(n) / l;
n = cc.pAdd(n, t);
if (this.brake > 0 && u > 7) {
u = Math.sqrt(u);
n = cc.pAdd(cc.pMult(t, u), t);
}
this.brake > 0 && u > 3 && (i *= u = 3);
0 === this.brake && u > 1 && (i *= u);
this._startAutoScroll(n, i, !0);
},
_calculateAutoScrollTimeByInitalSpeed: function(t) {
return Math.sqrt(Math.sqrt(t / 5));
},
_startAutoScroll: function(t, e, i) {
var n = this._flattenVectorByDirection(t);
this._autoScrolling = !0;
this._autoScrollTargetDelta = n;
this._autoScrollAttenuate = i;
this._autoScrollStartPosition = this.getContentPosition();
this._autoScrollTotalTime = e;
this._autoScrollAccumulatedTime = 0;
this._autoScrollBraking = !1;
this._isScrollEndedWithThresholdEventFired = !1;
this._autoScrollBrakingStartPosition = cc.p(0, 0);
var o = this._getHowMuchOutOfBoundary();
if (!cc.pFuzzyEqual(o, cc.p(0, 0), 1e-4)) {
this._autoScrollCurrentlyOutOfBoundary = !0;
var r = this._getHowMuchOutOfBoundary(n);
(o.x * r.x > 0 || o.y * r.y > 0) && (this._autoScrollBraking = !0);
}
},
_calculateTouchMoveVelocity: function() {
var t = 0;
if ((t = this._touchMoveTimeDeltas.reduce((function(t, e) {
return t + e;
}), t)) <= 0 || t >= .5) return cc.p(0, 0);
var e = cc.p(0, 0);
e = this._touchMoveDisplacements.reduce((function(t, e) {
return cc.pAdd(t, e);
}), e);
return cc.p(e.x * (1 - this.brake) / t, e.y * (1 - this.brake) / t);
},
_flattenVectorByDirection: function(t) {
var e = t;
e.x = this.horizontal ? e.x : 0;
e.y = this.vertical ? e.y : 0;
return e;
},
_moveContent: function(t, e) {
var i = this._flattenVectorByDirection(t), n = cc.pAdd(this.getContentPosition(), i);
this.setContentPosition(n);
var o = this._getHowMuchOutOfBoundary();
this._updateScrollBar(o);
this.elastic && e && this._startBounceBackIfNeeded();
},
_getContentLeftBoundary: function() {
return this.getContentPosition().x - this.content.getAnchorPoint().x * this.content.getContentSize().width;
},
_getContentRightBoundary: function() {
var t = this.content.getContentSize();
return this._getContentLeftBoundary() + t.width;
},
_getContentTopBoundary: function() {
var t = this.content.getContentSize();
return this._getContentBottomBoundary() + t.height;
},
_getContentBottomBoundary: function() {
return this.getContentPosition().y - this.content.getAnchorPoint().y * this.content.getContentSize().height;
},
_getHowMuchOutOfBoundary: function(t) {
t = t || cc.p(0, 0);
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4) && !this._outOfBoundaryAmountDirty) return this._outOfBoundaryAmount;
var e = cc.p(0, 0);
this._getContentLeftBoundary() + t.x > this._leftBoundary ? e.x = this._leftBoundary - (this._getContentLeftBoundary() + t.x) : this._getContentRightBoundary() + t.x < this._rightBoundary && (e.x = this._rightBoundary - (this._getContentRightBoundary() + t.x));
this._getContentTopBoundary() + t.y < this._topBoundary ? e.y = this._topBoundary - (this._getContentTopBoundary() + t.y) : this._getContentBottomBoundary() + t.y > this._bottomBoundary && (e.y = this._bottomBoundary - (this._getContentBottomBoundary() + t.y));
if (cc.pFuzzyEqual(t, cc.p(0, 0), 1e-4)) {
this._outOfBoundaryAmount = e;
this._outOfBoundaryAmountDirty = !1;
}
return e = this._clampDelta(e);
},
_updateScrollBar: function(t) {
this.horizontalScrollBar && this.horizontalScrollBar._onScroll(t);
this.verticalScrollBar && this.verticalScrollBar._onScroll(t);
},
_onScrollBarTouchBegan: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchBegan();
this.verticalScrollBar && this.verticalScrollBar._onTouchBegan();
},
_onScrollBarTouchEnded: function() {
this.horizontalScrollBar && this.horizontalScrollBar._onTouchEnded();
this.verticalScrollBar && this.verticalScrollBar._onTouchEnded();
},
_dispatchEvent: function(t) {
if ("scroll-ended" === t) this._scrollEventEmitMask = 0; else if ("scroll-to-top" === t || "scroll-to-bottom" === t || "scroll-to-left" === t || "scroll-to-right" === t) {
var e = 1 << r[t];
if (this._scrollEventEmitMask & e) return;
this._scrollEventEmitMask |= e;
}
cc.Component.EventHandler.emitEvents(this.scrollEvents, this, r[t]);
this.node.emit(t, this);
},
_adjustContentOutOfBoundary: function() {
this._outOfBoundaryAmountDirty = !0;
if (this._isOutOfBoundary()) {
var t = this._getHowMuchOutOfBoundary(cc.p(0, 0)), e = cc.pAdd(this.getContentPosition(), t);
if (this.content) {
this.content.setPosition(e);
this._updateScrollBar(0);
}
}
},
start: function() {
this._calculateBoundary();
this.content && cc.director.once(cc.Director.EVENT_AFTER_VISIT, this._adjustContentOutOfBoundary, this);
},
_hideScrollbar: function() {
this.horizontalScrollBar && this.horizontalScrollBar.hide();
this.verticalScrollBar && this.verticalScrollBar.hide();
},
_showScrollbar: function() {
this.horizontalScrollBar && this.horizontalScrollBar.show();
this.verticalScrollBar && this.verticalScrollBar.show();
},
onDisable: function() {
this._unregisterEvent();
this.node.off("size-changed", this._calculateBoundary, this);
this.node.off("scale-changed", this._calculateBoundary, this);
if (this.content) {
this.content.off("size-changed", this._calculateBoundary, this);
this.content.off("scale-changed", this._calculateBoundary, this);
}
this._hideScrollbar();
this.stopAutoScroll();
},
onEnable: function() {
this._registerEvent();
this.node.on("size-changed", this._calculateBoundary, this);
this.node.on("scale-changed", this._calculateBoundary, this);
if (this.content) {
this.content.on("size-changed", this._calculateBoundary, this);
this.content.on("scale-changed", this._calculateBoundary, this);
}
this._showScrollbar();
},
update: function(t) {
this._autoScrolling && this._processAutoScrolling(t);
}
});
cc.ScrollView = e.exports = s;
}), {
"./CCViewGroup": 77
} ],
69: [ (function(t, e, i) {
var n = cc.Enum({
Horizontal: 0,
Vertical: 1
}), o = cc.Class({
name: "cc.Slider",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._dragging = !1;
},
properties: {
handle: {
default: null,
type: cc.Button,
tooltip: !1,
notify: function() {
0;
}
},
direction: {
default: n.Horizontal,
type: n,
tooltip: !1
},
progress: {
default: .5,
type: cc.Float,
range: [ 0, 1, .1 ],
slide: !0,
tooltip: !1,
notify: function() {
this._updateHandlePosition();
}
},
slideEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: !1
}
},
statics: {
Direction: n
},
__preload: function() {
this._updateHandlePosition();
},
onEnable: function() {
this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.on(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
onDisable: function() {
this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancelled, this);
if (this.handle && this.handle.isValid) {
this.handle.node.off(cc.Node.EventType.TOUCH_START, this._onHandleDragStart, this);
this.handle.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
this.handle.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
}
},
_onHandleDragStart: function(t) {
this._dragging = !0;
t.stopPropagation();
},
_onTouchBegan: function(t) {
if (this.handle) {
this._dragging = !0;
this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchMoved: function(t) {
if (this._dragging) {
this._handleSliderLogic(t.touch);
t.stopPropagation();
}
},
_onTouchEnded: function(t) {
this._dragging = !1;
t.stopPropagation();
},
_onTouchCancelled: function(t) {
this._dragging = !1;
t.stopPropagation();
},
_handleSliderLogic: function(t) {
this._updateProgress(t);
this._emitSlideEvent();
},
_emitSlideEvent: function() {
cc.Component.EventHandler.emitEvents(this.slideEvents, this);
this.node.emit("slide", this);
},
_updateProgress: function(t) {
if (this.handle) {
var e = null, i = 0, o = this.node.convertTouchToNodeSpaceAR(t);
if (this.direction === n.Horizontal) {
e = this.node.width / 2 - this.handle.node.width * this.handle.node.anchorX;
i = cc.clamp01((o.x + e) / (2 * e), 0, 1);
} else if (this.direction === n.Vertical) {
e = this.node.height / 2 - this.handle.node.height * this.handle.node.anchorY;
i = cc.clamp01((o.y + e) / (2 * e), 0, 1);
}
this.progress = i;
}
},
_updateHandlePosition: function() {
if (this.handle) {
var t;
t = this.direction === n.Horizontal ? cc.p(-this.node.width * this.node.anchorX + this.progress * this.node.width, 0) : cc.p(0, -this.node.height * this.node.anchorY + this.progress * this.node.height);
var e = this.node.convertToWorldSpaceAR(t);
this.handle.node.position = this.handle.node.parent.convertToNodeSpaceAR(e);
}
}
});
cc.Slider = e.exports = o;
}), {
"./CCComponent": 53
} ],
70: [ (function(t, e, i) {
var n = t("./CCRendererUnderSG"), o = cc.Scale9Sprite.RenderingType, r = cc.Scale9Sprite.FillType, s = cc.BlendFunc.BlendFactor, c = cc.Enum({
CUSTOM: 0,
TRIMMED: 1,
RAW: 2
}), a = cc.Class({
name: "cc.Sprite",
extends: n,
editor: !1,
ctor: function() {
this._blendFunc = new cc.BlendFunc(this._srcBlendFactor, this._dstBlendFactor);
},
properties: {
_spriteFrame: {
default: null,
type: cc.SpriteFrame
},
_type: o.SIMPLE,
_sizeMode: c.TRIMMED,
_fillType: 0,
_fillCenter: cc.v2(0, 0),
_fillStart: 0,
_fillRange: 0,
_isTrimmedMode: !0,
_srcBlendFactor: s.SRC_ALPHA,
_dstBlendFactor: s.ONE_MINUS_SRC_ALPHA,
_atlas: {
default: null,
type: cc.SpriteAtlas,
tooltip: !1,
editorOnly: !0,
visible: !0,
animatable: !1
},
spriteFrame: {
get: function() {
return this._spriteFrame;
},
set: function(t, e) {
var i = this._spriteFrame;
if (i !== t) {
this._spriteFrame = t;
this._applySpriteFrame(i);
0;
}
},
type: cc.SpriteFrame
},
type: {
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._sgNode.setRenderingType(t);
},
type: o,
animatable: !1,
tooltip: !1
},
fillType: {
get: function() {
return this._fillType;
},
set: function(t) {
this._fillType = t;
this._sgNode && this._sgNode.setFillType(t);
},
type: r,
tooltip: !1
},
fillCenter: {
get: function() {
return this._fillCenter;
},
set: function(t) {
this._fillCenter = cc.v2(t);
this._sgNode && this._sgNode.setFillCenter(this._fillCenter);
},
tooltip: !1
},
fillStart: {
get: function() {
return this._fillStart;
},
set: function(t) {
this._fillStart = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillStart(t);
},
tooltip: !1
},
fillRange: {
get: function() {
return this._fillRange;
},
set: function(t) {
this._fillRange = cc.clampf(t, -1, 1);
this._sgNode && this._sgNode.setFillRange(t);
},
tooltip: !1
},
trim: {
get: function() {
return this._isTrimmedMode;
},
set: function(t) {
if (this._isTrimmedMode !== t) {
this._isTrimmedMode = t;
this._sgNode.enableTrimmedContentSize(t);
}
},
animatable: !1,
tooltip: !1
},
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
this._srcBlendFactor = t;
this._blendFunc.src = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
this._dstBlendFactor = t;
this._blendFunc.dst = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: s,
tooltip: !1
},
sizeMode: {
get: function() {
return this._sizeMode;
},
set: function(t) {
this._sizeMode = t;
t !== c.CUSTOM && this._applySpriteSize();
},
animatable: !1,
type: c,
tooltip: !1
}
},
statics: {
FillType: r,
Type: o,
SizeMode: c
},
setVisible: function(t) {
this.enabled = t;
},
setInsetLeft: function(t) {
this._sgNode.setInsetLeft(t);
},
getInsetLeft: function() {
return this._sgNode.getInsetLeft();
},
setInsetTop: function(t) {
this._sgNode.setInsetTop(t);
},
getInsetTop: function() {
return this._sgNode.getInsetTop();
},
setInsetRight: function(t) {
this._sgNode.setInsetRight(t);
},
getInsetRight: function() {
return this._sgNode.getInsetRight();
},
setInsetBottom: function(t) {
this._sgNode.setInsetBottom(t);
},
getInsetBottom: function() {
return this._sgNode.getInsetBottom();
},
onEnable: function() {
this._sgNode && this._spriteFrame && this._spriteFrame.textureLoaded() && this._sgNode.setVisible(!0);
},
_applyAtlas: !1,
_applySpriteFrameInsets: function() {
var t = this._spriteFrame, e = this._sgNode;
e.setInsetTop(t.insetTop);
e.setInsetBottom(t.insetBottom);
e.setInsetRight(t.insetRight);
e.setInsetLeft(t.insetLeft);
},
_applySpriteSize: function() {
if (this._spriteFrame) if (c.RAW === this._sizeMode) {
var t = this._spriteFrame.getOriginalSize();
this.node.setContentSize(t);
} else if (c.TRIMMED === this._sizeMode) {
var e = this._spriteFrame.getRect();
this.node.setContentSize(e.width, e.height);
}
},
_onTextureLoaded: function(t) {
if (this.isValid) {
var e = this._sgNode;
e.setSpriteFrame(this._spriteFrame);
this._applySpriteSize();
this.enabledInHierarchy && !e.isVisible() && e.setVisible(!0);
}
},
_applySpriteFrame: function(t, e) {
var i = this._sgNode;
t && t.off && t.off("load", this._onTextureLoaded, this);
var n = this._spriteFrame;
if (n) {
e || this._applySpriteFrameInsets();
if (n.textureLoaded()) this._onTextureLoaded(null); else {
n.once("load", this._onTextureLoaded, this);
n.ensureLoadTexture();
}
} else i.setVisible(!1);
0;
},
_createSgNode: function() {
return new cc.Scale9Sprite();
},
_initSgNode: function() {
var t = this._sgNode, e = 0 !== t.getInsetLeft() || 0 !== t.getInsetRight() || 0 !== t.getInsetTop() || 0 !== t.getInsetBottom();
this._applySpriteFrame(null, e);
t.setContentSize(this.node.getContentSize(!0));
this._applySpriteSize();
t.setRenderingType(this._type);
t.setFillType(this._fillType);
t.setFillCenter(this._fillCenter);
t.setFillStart(this._fillStart);
t.setFillRange(this._fillRange);
t.enableTrimmedContentSize(this._isTrimmedMode);
this._blendFunc.src = this._srcBlendFactor;
this._blendFunc.dst = this._dstBlendFactor;
t.setBlendFunc(this._blendFunc);
},
_resized: !1
});
0;
t("../utils/misc").propertyDefine(a, [ "insetLeft", "insetTop", "insetRight", "insetBottom" ], {
type: [ null, "setRenderingType" ]
});
cc.Sprite = e.exports = a;
}), {
"../utils/misc": 159,
"./CCRendererUnderSG": 64
} ],
71: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.SpriteDistortion",
extends: t("./CCComponent"),
editor: !1,
ctor: function() {
this._spriteSGNode = null;
},
properties: {
_distortionOffset: cc.v2(0, 0),
offset: {
get: function() {
return this._distortionOffset;
},
set: function(t) {
this._distortionOffset.x = t.x;
this._distortionOffset.y = t.y;
this._spriteSGNode && this._spriteSGNode.setDistortionOffset(this._distortionOffset);
}
},
_distortionTiling: cc.v2(1, 1),
tiling: {
get: function() {
return this._distortionTiling;
},
set: function(t) {
this._distortionTiling.x = t.x;
this._distortionTiling.y = t.y;
this._spriteSGNode && this._spriteSGNode.setDistortionTiling(this._distortionTiling);
}
}
},
onEnable: function() {
var t = this.node.getComponent("cc.Sprite"), e = this._spriteSGNode = t && t._sgNode;
if (this._spriteSGNode) {
e.setState(cc.Scale9Sprite.state.DISTORTION);
e.setDistortionOffset(this._distortionOffset);
e.setDistortionTiling(this._distortionTiling);
}
},
onDisable: function() {
this._spriteSGNode && this._spriteSGNode.setState(cc.Scale9Sprite.state.NORMAL);
this._spriteSGNode = null;
}
});
cc.SpriteDistortion = e.exports = n;
}), {
"./CCComponent": 53
} ],
72: [ (function(t, e, i) {
var n = cc.Enum({
NONE: 0,
CHECKBOX: 1,
TEXT_ATLAS: 2,
SLIDER_BAR: 3,
LIST_VIEW: 4,
PAGE_VIEW: 5
}), o = cc.Enum({
VERTICAL: 0,
HORIZONTAL: 1
}), r = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
}), s = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
}), c = cc.Class({
name: "cc.StudioComponent",
extends: cc.Component,
editor: !1,
properties: !1,
statics: {
ComponentType: n,
ListDirection: o,
VerticalAlign: r,
HorizontalAlign: s
}
}), a = t("../utils/prefab-helper");
c.PlaceHolder = cc.Class({
name: "cc.StudioComponent.PlaceHolder",
extends: cc.Component,
properties: {
_baseUrl: "",
nestedPrefab: cc.Prefab
},
onLoad: function() {
this.nestedPrefab && this._replaceWithNestedPrefab();
},
_replaceWithNestedPrefab: function() {
var t = this.node, e = t._prefab;
e.root = t;
e.asset = this.nestedPrefab;
a.syncWithPrefab(t);
}
});
cc.StudioComponent = e.exports = c;
}), {
"../utils/prefab-helper": 161
} ],
73: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.Toggle",
extends: t("./CCButton"),
editor: !1,
properties: {
isChecked: {
default: !0,
tooltip: !1,
notify: function() {
this._updateCheckMark();
}
},
toggleGroup: {
default: null,
tooltip: !1,
type: t("./CCToggleGroup")
},
checkMark: {
default: null,
type: cc.Sprite,
tooltip: !1
},
checkEvents: {
default: [],
type: cc.Component.EventHandler
},
_resizeToTarget: {
animatable: !1,
set: function(t) {
t && this._resizeNodeToTargetNode();
}
}
},
onEnable: function() {
this._super();
this._registerToggleEvent();
this.toggleGroup && this.toggleGroup.enabled && this.toggleGroup.addToggle(this);
},
onDisable: function() {
this._super();
this._unregisterToggleEvent();
this.toggleGroup && this.toggleGroup.enabled && this.toggleGroup.removeToggle(this);
},
_updateCheckMark: function() {
this.checkMark && (this.checkMark.node.active = !!this.isChecked);
},
_updateDisabledState: function() {
this._super();
this.checkMark && this.checkMark._sgNode.setState(0);
this.enableAutoGrayEffect && this.checkMark && !this.interactable && this.checkMark._sgNode.setState(1);
},
_registerToggleEvent: function() {
this.node.on("click", this.toggle, this);
},
_unregisterToggleEvent: function() {
this.node.off("click", this.toggle, this);
},
toggle: function(t) {
var e = this.toggleGroup || this._toggleContainer;
if (!(e && e.enabled && this.isChecked) || e.allowSwitchOff) {
this.isChecked = !this.isChecked;
this._updateCheckMark();
e && e.enabled && e.updateToggles(this);
this._emitToggleEvents(t);
}
},
_emitToggleEvents: function() {
this.node.emit("toggle", this);
this.checkEvents && cc.Component.EventHandler.emitEvents(this.checkEvents, this);
},
check: function() {
var t = this.toggleGroup || this._toggleContainer;
if (!(t && t.enabled && this.isChecked) || t.allowSwitchOff) {
this.isChecked = !0;
t && t.enabled && t.updateToggles(this);
this._emitToggleEvents();
}
},
uncheck: function() {
var t = this.toggleGroup || this._toggleContainer;
if (!(t && t.enabled && this.isChecked) || t.allowSwitchOff) {
this.isChecked = !1;
this._emitToggleEvents();
}
}
});
cc.Toggle = e.exports = n;
t("../platform/js").get(n.prototype, "_toggleContainer", (function() {
var t = this.node.parent;
return cc.Node.isNode(t) ? t.getComponent(cc.ToggleContainer) : null;
}));
}), {
"../platform/js": 149,
"./CCButton": 51,
"./CCToggleGroup": 75
} ],
74: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ToggleContainer",
extends: cc.Component,
editor: !1,
properties: {
allowSwitchOff: {
tooltip: !1,
default: !1
}
},
updateToggles: function(t) {
this.toggleItems.forEach((function(e) {
t.isChecked && e !== t && (e.isChecked = !1);
}));
},
_allowOnlyOneToggleChecked: function() {
var t = !1;
this.toggleItems.forEach((function(e) {
t ? e.isChecked = !1 : e.isChecked && (t = !0);
}));
return t;
},
_makeAtLeastOneToggleChecked: function() {
if (!this._allowOnlyOneToggleChecked() && !this.allowSwitchOff) {
var t = this.toggleItems;
t.length > 0 && t[0].check();
}
},
onEnable: function() {
this.node.on("child-added", this._allowOnlyOneToggleChecked, this);
this.node.on("child-removed", this._makeAtLeastOneToggleChecked, this);
},
onDisable: function() {
this.node.off("child-added", this._allowOnlyOneToggleChecked, this);
this.node.off("child-removed", this._makeAtLeastOneToggleChecked, this);
},
start: function() {
this._makeAtLeastOneToggleChecked();
}
});
t("../platform/js").get(n.prototype, "toggleItems", (function() {
return this.node.getComponentsInChildren(cc.Toggle);
}));
cc.ToggleContainer = e.exports = n;
}), {
"../platform/js": 149
} ],
75: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ToggleGroup",
extends: cc.Component,
ctor: function() {
this._toggleItems = [];
},
editor: !1,
properties: {
allowSwitchOff: {
tooltip: !1,
default: !1
},
toggleItems: {
get: function() {
return this._toggleItems;
}
}
},
updateToggles: function(t) {
this.enabledInHierarchy && this._toggleItems.forEach((function(e) {
t.isChecked && e !== t && e.isChecked && e.enabled && (e.isChecked = !1);
}));
},
addToggle: function(t) {
-1 === this._toggleItems.indexOf(t) && this._toggleItems.push(t);
this._allowOnlyOneToggleChecked();
},
removeToggle: function(t) {
var e = this._toggleItems.indexOf(t);
e > -1 && this._toggleItems.splice(e, 1);
this._makeAtLeastOneToggleChecked();
},
_allowOnlyOneToggleChecked: function() {
var t = !1;
this._toggleItems.forEach((function(e) {
t && e.enabled && (e.isChecked = !1);
e.isChecked && e.enabled && (t = !0);
}));
return t;
},
_makeAtLeastOneToggleChecked: function() {
this._allowOnlyOneToggleChecked() || this.allowSwitchOff || this._toggleItems.length > 0 && (this._toggleItems[0].isChecked = !0);
},
start: function() {
this._makeAtLeastOneToggleChecked();
}
}), o = (t("../platform/js"), !1);
cc.js.get(cc, "ToggleGroup", (function() {
if (!o) {
cc.logID(1405, "cc.ToggleGroup", "cc.ToggleContainer");
o = !0;
}
return n;
}));
cc.ToggleGroup = e.exports = n;
}), {
"../platform/js": 149
} ],
76: [ (function(i, n, o) {
i("../videoplayer/CCSGVideoPlayer");
var r = _ccsg.VideoPlayer.EventType, s = cc.Enum({
REMOTE: 0,
LOCAL: 1
}), c = cc.Class({
name: "cc.VideoPlayer",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_resourceType: s.REMOTE,
resourceType: {
tooltip: !1,
type: s,
set: function(t) {
this._resourceType = t;
this._updateVideoSource();
},
get: function() {
return this._resourceType;
}
},
_remoteURL: "",
remoteURL: {
tooltip: !1,
type: cc.String,
set: function(t) {
this._remoteURL = t;
this._updateVideoSource();
},
get: function() {
return this._remoteURL;
}
},
_clip: {
default: null,
url: cc.RawAsset
},
clip: {
tooltip: !1,
get: function() {
return this._clip;
},
set: function(i) {
"string" !== ("object" == (e = typeof i) ? t(i) : e) && (i = "");
this._clip = i;
this._updateVideoSource();
},
url: cc.RawAsset
},
currentTime: {
tooltip: !1,
type: cc.Float,
set: function(t) {
this._sgNode && this._sgNode.seekTo(t);
},
get: function() {
return this._sgNode ? this._sgNode.currentTime() : -1;
}
},
keepAspectRatio: {
tooltip: !1,
default: !0,
type: cc.Boolean,
notify: function() {
this._sgNode.setKeepAspectRatioEnabled(this.keepAspectRatio);
}
},
isFullscreen: {
tooltip: !1,
default: !1,
type: cc.Boolean,
notify: function() {
this._sgNode.setFullScreenEnabled(this.isFullscreen);
}
},
videoPlayerEvent: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: r,
ResourceType: s
},
onLoad: function() {
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (this.enabled = !1);
},
_createSgNode: function() {
if (cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS) {
console.log("VideoPlayer is not supported on Mac and Windows!");
return null;
}
return new _ccsg.VideoPlayer();
},
_updateVideoSource: function() {
var t = this._sgNode;
this.resourceType === s.REMOTE ? t.setURL(this.remoteURL) : t.setURL(this._clip || "");
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
0;
this._updateVideoSource();
t.seekTo(this.currentTime);
t.setKeepAspectRatioEnabled(this.keepAspectRatio);
t.setFullScreenEnabled(this.isFullscreen);
t.setContentSize(this.node.getContentSize());
this.pause();
t.setEventListener(r.PLAYING, this.onPlaying.bind(this));
t.setEventListener(r.PAUSED, this.onPasued.bind(this));
t.setEventListener(r.STOPPED, this.onStopped.bind(this));
t.setEventListener(r.COMPLETED, this.onCompleted.bind(this));
t.setEventListener(r.META_LOADED, this.onMetaLoaded.bind(this));
t.setEventListener(r.CLICKED, this.onClicked.bind(this));
t.setEventListener(r.READY_TO_PLAY, this.onReadyToPlay.bind(this));
}
},
onReadyToPlay: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.READY_TO_PLAY);
this.node.emit("ready-to-play", this);
},
onMetaLoaded: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.META_LOADED);
this.node.emit("meta-loaded", this);
},
onClicked: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.CLICKED);
this.node.emit("clicked", this);
},
onPlaying: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.PLAYING);
this.node.emit("playing", this);
},
onPasued: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.PAUSED);
this.node.emit("paused", this);
},
onStopped: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.STOPPED);
this.node.emit("stopped", this);
},
onCompleted: function() {
cc.Component.EventHandler.emitEvents(this.videoPlayerEvent, this, r.COMPLETED);
this.node.emit("completed", this);
},
play: function() {
this._sgNode && this._sgNode.play();
},
resume: function() {
this._sgNode && this._sgNode.resume();
},
pause: function() {
this._sgNode && this._sgNode.pause();
},
stop: function() {
this._sgNode && this._sgNode.stop();
},
getDuration: function() {
return this._sgNode ? this._sgNode.duration() : -1;
},
isPlaying: function() {
return !!this._sgNode && this._sgNode.isPlaying();
}
});
cc.VideoPlayer = n.exports = c;
}), {
"../videoplayer/CCSGVideoPlayer": 1
} ],
77: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ViewGroup",
extends: t("./CCComponent")
});
cc.ViewGroup = e.exports = n;
}), {
"./CCComponent": 53
} ],
78: [ (function(t, e, i) {
function n() {}
t("../webview/CCSGWebView");
var o = _ccsg.WebView.EventType, r = cc.Class({
name: "cc.WebView",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_useOriginalSize: !0,
_url: "",
url: {
type: String,
tooltip: !1,
get: function() {
return this._url;
},
set: function(t) {
this._url = t;
var e = this._sgNode;
e && e.loadURL(t);
}
},
webviewEvents: {
default: [],
type: cc.Component.EventHandler
}
},
statics: {
EventType: o
},
onLoad: function() {
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (this.enabled = !1);
},
_createSgNode: function() {
if (cc.sys.os === cc.sys.OS_OSX || cc.sys.os === cc.sys.OS_WINDOWS) {
console.log("WebView is not supported on Mac and Windows!");
return null;
}
return new _ccsg.WebView();
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
0;
t.loadURL(this._url);
t.setContentSize(this.node.getContentSize());
}
},
onEnable: function() {
this._super();
var t = this._sgNode;
t.setEventListener(o.LOADED, this._onWebViewLoaded.bind(this));
t.setEventListener(o.LOADING, this._onWebViewLoading.bind(this));
t.setEventListener(o.ERROR, this._onWebViewLoadError.bind(this));
},
onDisable: function() {
this._super();
var t = this._sgNode;
t.setEventListener(o.LOADED, n);
t.setEventListener(o.LOADING, n);
t.setEventListener(o.ERROR, n);
},
_onWebViewLoaded: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, o.LOADED);
this.node.emit("loaded", this);
},
_onWebViewLoading: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, o.LOADING);
this.node.emit("loading", this);
return !0;
},
_onWebViewLoadError: function() {
cc.Component.EventHandler.emitEvents(this.webviewEvents, this, o.ERROR);
this.node.emit("error", this);
},
setJavascriptInterfaceScheme: function(t) {
this._sgNode && this._sgNode.setJavascriptInterfaceScheme(t);
},
setOnJSCallback: function(t) {
this._sgNode && this._sgNode.setOnJSCallback(t);
},
evaluateJS: function(t) {
this._sgNode && this._sgNode.evaluateJS(t);
}
});
cc.WebView = e.exports = r;
}), {
"../webview/CCSGWebView": 1
} ],
79: [ (function(t, e, i) {
var n = t("../base-ui/CCWidgetManager"), o = n._AlignFlags, r = o.TOP, s = o.MID, c = o.BOT, a = o.LEFT, h = o.CENTER, l = o.RIGHT, u = r | c, d = a | l, f = cc.Class({
name: "cc.Widget",
extends: t("./CCComponent"),
editor: !1,
properties: {
target: {
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
0;
},
type: cc.Node,
tooltip: !1
},
isAlignTop: {
get: function() {
return (this._alignFlags & r) > 0;
},
set: function(t) {
this._setAlign(r, t);
},
animatable: !1,
tooltip: !1
},
isAlignVerticalCenter: {
get: function() {
return (this._alignFlags & s) > 0;
},
set: function(t) {
if (t) {
this.isAlignTop = !1;
this.isAlignBottom = !1;
this._alignFlags |= s;
} else this._alignFlags &= ~s;
},
animatable: !1,
tooltip: !1
},
isAlignBottom: {
get: function() {
return (this._alignFlags & c) > 0;
},
set: function(t) {
this._setAlign(c, t);
},
animatable: !1,
tooltip: !1
},
isAlignLeft: {
get: function() {
return (this._alignFlags & a) > 0;
},
set: function(t) {
this._setAlign(a, t);
},
animatable: !1,
tooltip: !1
},
isAlignHorizontalCenter: {
get: function() {
return (this._alignFlags & h) > 0;
},
set: function(t) {
if (t) {
this.isAlignLeft = !1;
this.isAlignRight = !1;
this._alignFlags |= h;
} else this._alignFlags &= ~h;
},
animatable: !1,
tooltip: !1
},
isAlignRight: {
get: function() {
return (this._alignFlags & l) > 0;
},
set: function(t) {
this._setAlign(l, t);
},
animatable: !1,
tooltip: !1
},
isStretchWidth: {
get: function() {
return (this._alignFlags & d) === d;
},
visible: !1
},
isStretchHeight: {
get: function() {
return (this._alignFlags & u) === u;
},
visible: !1
},
top: {
get: function() {
return this._top;
},
set: function(t) {
this._top = t;
},
tooltip: !1
},
bottom: {
get: function() {
return this._bottom;
},
set: function(t) {
this._bottom = t;
},
tooltip: !1
},
left: {
get: function() {
return this._left;
},
set: function(t) {
this._left = t;
},
tooltip: !1
},
right: {
get: function() {
return this._right;
},
set: function(t) {
this._right = t;
},
tooltip: !1
},
horizontalCenter: {
get: function() {
return this._horizontalCenter;
},
set: function(t) {
this._horizontalCenter = t;
},
tooltip: !1
},
verticalCenter: {
get: function() {
return this._verticalCenter;
},
set: function(t) {
this._verticalCenter = t;
},
tooltip: !1
},
isAbsoluteHorizontalCenter: {
get: function() {
return this._isAbsHorizontalCenter;
},
set: function(t) {
this._isAbsHorizontalCenter = t;
},
animatable: !1
},
isAbsoluteVerticalCenter: {
get: function() {
return this._isAbsVerticalCenter;
},
set: function(t) {
this._isAbsVerticalCenter = t;
},
animatable: !1
},
isAbsoluteTop: {
get: function() {
return this._isAbsTop;
},
set: function(t) {
this._isAbsTop = t;
},
animatable: !1
},
isAbsoluteBottom: {
get: function() {
return this._isAbsBottom;
},
set: function(t) {
this._isAbsBottom = t;
},
animatable: !1
},
isAbsoluteLeft: {
get: function() {
return this._isAbsLeft;
},
set: function(t) {
this._isAbsLeft = t;
},
animatable: !1
},
isAbsoluteRight: {
get: function() {
return this._isAbsRight;
},
set: function(t) {
this._isAbsRight = t;
},
animatable: !1
},
isAlignOnce: {
default: !0,
tooltip: !1,
displayName: "AlignOnce"
},
_target: null,
_alignFlags: 0,
_left: 0,
_right: 0,
_top: 0,
_bottom: 0,
_verticalCenter: 0,
_horizontalCenter: 0,
_isAbsLeft: !0,
_isAbsRight: !0,
_isAbsTop: !0,
_isAbsBottom: !0,
_isAbsHorizontalCenter: !0,
_isAbsVerticalCenter: !0,
_originalWidth: 0,
_originalHeight: 0
},
onEnable: function() {
n.add(this);
},
onDisable: function() {
n.remove(this);
},
_setAlign: function(t, e) {
if (e != (this._alignFlags & t) > 0) {
var i = (t & d) > 0;
if (e) {
this._alignFlags |= t;
if (i) {
this.isAlignHorizontalCenter = !1;
if (this.isStretchWidth) {
this._originalWidth = this.node.width;
0;
}
} else {
this.isAlignVerticalCenter = !1;
if (this.isStretchHeight) {
this._originalHeight = this.node.height;
0;
}
}
0;
} else {
i ? this.isStretchWidth && (this.node.width = this._originalWidth) : this.isStretchHeight && (this.node.height = this._originalHeight);
this._alignFlags &= ~t;
}
}
},
updateAlignment: function() {
n.updateAlignment(this.node);
}
});
cc.Widget = e.exports = f;
}), {
"../base-ui/CCWidgetManager": 37,
"./CCComponent": 53
} ],
80: [ (function(t, e, i) {
t("./CCComponent");
t("./CCRendererInSG");
t("./CCRendererUnderSG");
t("./CCComponentEventHandler");
t("./missing-script");
e.exports = [ t("./CCSprite"), t("./CCWidget"), t("./CCCanvas"), t("./CCAudioSource"), t("./CCAnimation"), t("./CCButton"), t("./CCLabel"), t("./CCProgressBar"), t("./CCMask"), t("./CCScrollBar"), t("./CCScrollView"), t("./CCPageViewIndicator"), t("./CCPageView"), t("./CCSlider"), t("./CCLayout"), t("./CCEditBox"), t("./CCVideoPlayer"), t("./CCWebView"), t("./CCSpriteDistortion"), t("./CCLabelOutline"), t("./CCRichText"), t("./CCToggleContainer"), t("./CCToggleGroup"), t("./CCToggle"), t("./CCBlockInputEvents") ];
}), {
"./CCAnimation": 48,
"./CCAudioSource": 49,
"./CCBlockInputEvents": 50,
"./CCButton": 51,
"./CCCanvas": 52,
"./CCComponent": 53,
"./CCComponentEventHandler": 54,
"./CCEditBox": 55,
"./CCLabel": 56,
"./CCLabelOutline": 57,
"./CCLayout": 58,
"./CCMask": 59,
"./CCPageView": 60,
"./CCPageViewIndicator": 61,
"./CCProgressBar": 62,
"./CCRendererInSG": 63,
"./CCRendererUnderSG": 64,
"./CCRichText": 65,
"./CCScrollBar": 67,
"./CCScrollView": 68,
"./CCSlider": 69,
"./CCSprite": 70,
"./CCSpriteDistortion": 71,
"./CCToggle": 73,
"./CCToggleContainer": 74,
"./CCToggleGroup": 75,
"./CCVideoPlayer": 76,
"./CCWebView": 78,
"./CCWidget": 79,
"./missing-script": 81
} ],
81: [ (function(t, e, i) {
var n = cc.js, o = t("../utils/misc").BUILTIN_CLASSID_RE, r = cc.Class({
name: "cc.MissingClass",
properties: {
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
}
}), s = cc.Class({
name: "cc.MissingScript",
extends: cc.Component,
editor: {
inspector: "packages://inspector/inspectors/comps/missing-script.js"
},
properties: {
compiled: {
default: !1,
serializable: !1
},
_$erialized: {
default: null,
visible: !1,
editorOnly: !0
}
},
ctor: !1,
statics: {
safeFindClass: function(t, e) {
var i = n._getClassById(t);
if (i) return i;
if (t) {
cc.deserialize.reportMissingClass(t);
return s.getMissingWrapper(t, e);
}
return null;
},
getMissingWrapper: function(t, e) {
return e.node && (/^[0-9a-zA-Z+/]{23}$/.test(t) || o.test(t)) ? s : r;
}
},
onLoad: function() {
cc.warnID(4600, this.node.name);
}
});
cc._MissingScript = e.exports = s;
}), {
"../utils/misc": 159
} ],
82: [ (function(t, e, i) {
var n = cc.js;
t("../event/event");
var o = function(t, e) {
cc.Event.call(this, cc.Event.MOUSE, e);
this._eventType = t;
this._button = 0;
this._x = 0;
this._y = 0;
this._prevX = 0;
this._prevY = 0;
this._scrollX = 0;
this._scrollY = 0;
};
n.extend(o, cc.Event);
var r = o.prototype;
r.setScrollData = function(t, e) {
this._scrollX = t;
this._scrollY = e;
};
r.getScrollX = function() {
return this._scrollX;
};
r.getScrollY = function() {
return this._scrollY;
};
r.setLocation = function(t, e) {
this._x = t;
this._y = e;
};
r.getLocation = function() {
return {
x: this._x,
y: this._y
};
};
r.getLocationInView = function() {
return {
x: this._x,
y: cc.view._designResolutionSize.height - this._y
};
};
r._setPrevCursor = function(t, e) {
this._prevX = t;
this._prevY = e;
};
r.getPreviousLocation = function() {
return {
x: this._prevX,
y: this._prevY
};
};
r.getDelta = function() {
return {
x: this._x - this._prevX,
y: this._y - this._prevY
};
};
r.getDeltaX = function() {
return this._x - this._prevX;
};
r.getDeltaY = function() {
return this._y - this._prevY;
};
r.setButton = function(t) {
this._button = t;
};
r.getButton = function() {
return this._button;
};
r.getLocationX = function() {
return this._x;
};
r.getLocationY = function() {
return this._y;
};
o.NONE = 0;
o.DOWN = 1;
o.UP = 2;
o.MOVE = 3;
o.SCROLL = 4;
o.BUTTON_LEFT = 0;
o.BUTTON_RIGHT = 2;
o.BUTTON_MIDDLE = 1;
o.BUTTON_4 = 3;
o.BUTTON_5 = 4;
o.BUTTON_6 = 5;
o.BUTTON_7 = 6;
o.BUTTON_8 = 7;
var s = function(t, e) {
cc.Event.call(this, cc.Event.TOUCH, e);
this._eventCode = 0;
this._touches = t || [];
this.touch = null;
this.currentTouch = null;
};
n.extend(s, cc.Event);
(r = s.prototype).getEventCode = function() {
return this._eventCode;
};
r.getTouches = function() {
return this._touches;
};
r._setEventCode = function(t) {
this._eventCode = t;
};
r._setTouches = function(t) {
this._touches = t;
};
r.setLocation = function(t, e) {
this.touch && this.touch.setTouchInfo(this.touch.getID(), t, e);
};
r.getLocation = function() {
return this.touch ? this.touch.getLocation() : cc.v2();
};
r.getLocationInView = function() {
return this.touch ? this.touch.getLocationInView() : cc.v2();
};
r.getPreviousLocation = function() {
return this.touch ? this.touch.getPreviousLocation() : cc.v2();
};
r.getStartLocation = function() {
return this.touch ? this.touch.getStartLocation() : cc.v2();
};
r.getID = function() {
return this.touch ? this.touch.getID() : null;
};
r.getDelta = function() {
return this.touch ? this.touch.getDelta() : cc.v2();
};
r.getDeltaX = function() {
return this.touch ? this.touch.getDelta().x : 0;
};
r.getDeltaY = function() {
return this.touch ? this.touch.getDelta().y : 0;
};
r.getLocationX = function() {
return this.touch ? this.touch.getLocationX() : 0;
};
r.getLocationY = function() {
return this.touch ? this.touch.getLocationY() : 0;
};
s.MAX_TOUCHES = 5;
s.BEGAN = 0;
s.MOVED = 1;
s.ENDED = 2;
s.CANCELED = 3;
var c = function(t, e) {
cc.Event.call(this, cc.Event.ACCELERATION, e);
this.acc = t;
};
n.extend(c, cc.Event);
var a = function(t, e, i) {
cc.Event.call(this, cc.Event.KEYBOARD, i);
this.keyCode = t;
this.isPressed = e;
};
n.extend(a, cc.Event);
cc.Event.EventMouse = o;
cc.Event.EventTouch = s;
cc.Event.EventAcceleration = c;
cc.Event.EventKeyboard = a;
e.exports = cc.Event;
}), {
"../event/event": 86
} ],
83: [ (function(t, e, i) {
var n = t("../event/event-target"), o = cc.Enum({
KEY_DOWN: "keydown",
KEY_UP: "keyup",
DEVICEMOTION: "devicemotion"
}), r = null, s = null, c = 0, a = cc.Class({
name: "SystemEvent",
extends: n,
statics: {
EventType: o
},
on: function(t, e, i, n) {
this._super(t, e, i, n);
if (t === o.KEY_DOWN || t === o.KEY_UP) {
r || (r = cc.EventListener.create({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(t, e) {
e.type = o.KEY_DOWN;
e.keyCode = t;
e.isPressed = !0;
cc.systemEvent.dispatchEvent(e);
},
onKeyReleased: function(t, e) {
e.type = o.KEY_UP;
e.keyCode = t;
e.isPressed = !1;
cc.systemEvent.dispatchEvent(e);
}
}));
if (!cc.eventManager.hasEventListener(cc._EventListenerKeyboard.LISTENER_ID)) {
var a = cc.director.getTotalFrames();
if (a !== c) {
cc.eventManager.addListener(r, 1);
c = a;
}
}
}
if (t === o.DEVICEMOTION) {
s || (s = cc.EventListener.create({
event: cc.EventListener.ACCELERATION,
callback: function(t, e) {
e.type = o.DEVICEMOTION;
e.acc = t;
cc.systemEvent.dispatchEvent(e);
}
}));
cc.eventManager.hasEventListener(cc._EventListenerAcceleration.LISTENER_ID) || cc.eventManager.addListener(s, 1);
}
},
off: function(t, e, i, n) {
this._super(t, e, i, n);
if (r && (t === o.KEY_DOWN || t === o.KEY_UP)) {
var c = this.hasEventListener(o.KEY_DOWN), a = this.hasEventListener(o.KEY_UP);
c || a || cc.eventManager.removeListener(r);
}
s && t === o.DEVICEMOTION && cc.eventManager.removeListener(s);
}
});
cc.SystemEvent = e.exports = a;
cc.systemEvent = new cc.SystemEvent();
}), {
"../event/event-target": 85
} ],
84: [ (function(t, e, i) {
function n() {
r.call(this);
}
var o = cc.js, r = t("../platform/callbacks-invoker").CallbacksHandler;
o.extend(n, r);
n.prototype.invoke = function(t, e) {
var i = t.type, n = this._callbackTable[i];
if (n) {
var o = !n.isInvoking;
n.isInvoking = !0;
for (var r = n.callbacks, s = n.targets, c = 0, a = r.length; c < a; ++c) {
var h = r[c];
if (h) {
var l = s[c] || t.currentTarget;
h.call(l, t, e);
if (t._propagationImmediateStopped) break;
}
}
if (o) {
n.isInvoking = !1;
n.containCanceled && n.purgeCanceled();
}
}
};
e.exports = n;
0;
}), {
"../platform/callbacks-invoker": 142
} ],
85: [ (function(i, n, o) {
function r() {
this._capturingListeners = null;
this._bubblingListeners = null;
this._hasListenerCache = null;
}
var s = i("./event-listeners");
i("./event");
var c = cc.js.array.fastRemove, a = new Array(16);
a.length = 0;
var h = r.prototype;
h._addEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
n || (n = this._hasListenerCache = cc.js.createMap());
void 0 === n[t] && (n[t] = 0);
var o = i ? 2 : 4;
n[t] |= o;
};
h._purgeEventFlag = function(t, e, i) {
var n = this._hasListenerCache;
if (n && !e.has(t)) {
var o = i ? 2 : 4;
n[t] &= ~o;
0 === n[t] && delete n[t];
}
};
h._resetFlagForTarget = function(t, e, i) {
var n = this._hasListenerCache;
if (n) {
var o = i ? 2 : 4;
for (var r in n) if (!e.has(r)) {
n[r] &= ~o;
0 === n[r] && delete n[r];
}
}
};
h.hasEventListener = function(t, e) {
var i = this._hasListenerCache;
if (!i) return !1;
var n = e ? 2 : 4;
return (i[t] & n) > 0;
};
h.on = function(i, n, o, r) {
if ("boolean" === ("object" == (e = typeof o) ? t(o) : e)) {
r = o;
o = void 0;
} else r = !!r;
if (n) {
var c = null;
if (!(c = r ? this._capturingListeners = this._capturingListeners || new s() : this._bubblingListeners = this._bubblingListeners || new s()).has(i, n, o)) {
c.add(i, n, o);
o && o.__eventTargets && o.__eventTargets.push(this);
this._addEventFlag(i, c, r);
}
return n;
}
cc.errorID(6800);
};
h.off = function(i, n, o, r) {
if ("boolean" === ("object" == (e = typeof o) ? t(o) : e)) {
r = o;
o = void 0;
} else r = !!r;
if (n) {
var s = r ? this._capturingListeners : this._bubblingListeners;
if (s) {
s.remove(i, n, o);
o && o.__eventTargets && c(o.__eventTargets, this);
this._purgeEventFlag(i, s, r);
}
} else {
this._capturingListeners && this._capturingListeners.removeAll(i);
this._bubblingListeners && this._bubblingListeners.removeAll(i);
this._hasListenerCache && delete this._hasListenerCache[i];
}
};
h.targetOff = function(t) {
if (this._capturingListeners) {
this._capturingListeners.removeAll(t);
this._resetFlagForTarget(t, this._capturingListeners, !0);
}
if (this._bubblingListeners) {
this._bubblingListeners.removeAll(t);
this._resetFlagForTarget(t, this._bubblingListeners, !1);
}
};
h.once = function(t, e, i, n) {
var o = "__ONCE_FLAG:" + t, r = n ? this._capturingListeners : this._bubblingListeners;
if (!(r && r.has(o, e, i))) {
var s = this, c = function(a) {
s.off(t, c, i, n);
r.remove(o, e, i);
e.call(this, a);
};
this.on(t, c, i, n);
r || (r = n ? this._capturingListeners : this._bubblingListeners);
r.add(o, e, i);
}
};
h.dispatchEvent = function(t) {
!(function(t, e) {
var i, n;
e.target = t;
a.length = 0;
t._getCapturingTargets(e.type, a);
e.eventPhase = 1;
for (n = a.length - 1; n >= 0; --n) if ((i = a[n])._isTargetActive(e.type) && i._capturingListeners) {
e.currentTarget = i;
i._capturingListeners.invoke(e, a);
if (e._propagationStopped) {
a.length = 0;
return;
}
}
a.length = 0;
if (t._isTargetActive(e.type)) {
e.eventPhase = 2;
e.currentTarget = t;
t._capturingListeners && t._capturingListeners.invoke(e);
!e._propagationImmediateStopped && t._bubblingListeners && t._bubblingListeners.invoke(e);
}
if (!e._propagationStopped && e.bubbles) {
t._getBubblingTargets(e.type, a);
e.eventPhase = 3;
for (n = 0; n < a.length; ++n) if ((i = a[n])._isTargetActive(e.type) && i._bubblingListeners) {
e.currentTarget = i;
i._bubblingListeners.invoke(e);
if (e._propagationStopped) {
a.length = 0;
return;
}
}
}
a.length = 0;
})(this, t);
a.length = 0;
};
h.emit = function(t, e) {
0;
var i = this._hasListenerCache;
if (i) {
var n = i[t];
if (n) {
var o = cc.Event.EventCustom.get(t);
o.detail = e;
o.eventPhase = 2;
o.target = o.currentTarget = this;
var r = this._capturingListeners;
r && 2 & n && r.invoke(o);
var s = this._bubblingListeners;
s && 4 & n && !o._propagationImmediateStopped && s.invoke(o);
cc.Event.EventCustom.put(o);
}
}
};
h._isTargetActive = function(t) {
return !0;
};
h._getCapturingTargets = function(t, e) {};
h._getBubblingTargets = function(t, e) {};
r.prototype._EventTargetOn = r.prototype.on;
r.prototype._EventTargetOnce = r.prototype.once;
r.prototype._EventTargetOff = r.prototype.off;
r.prototype._EventTargetTargetOff = r.prototype.targetOff;
cc.EventTarget = n.exports = r;
}), {
"./event": 86,
"./event-listeners": 84
} ],
86: [ (function(t, e, i) {
var n = t("../platform/js");
cc.Event = function(t, e) {
this.type = t;
this.bubbles = !!e;
this.target = null;
this.currentTarget = null;
this.eventPhase = 0;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
};
cc.Event.prototype = {
constructor: cc.Event,
unuse: function() {
this.type = cc.Event.NO_TYPE;
this.target = null;
this.currentTarget = null;
this.eventPhase = cc.Event.NONE;
this._propagationStopped = !1;
this._propagationImmediateStopped = !1;
},
reuse: function(t, e) {
this.type = t;
this.bubbles = e || !1;
},
stopPropagation: function() {
this._propagationStopped = !0;
},
stopPropagationImmediate: function() {
this._propagationImmediateStopped = !0;
},
isStopped: function() {
return this._propagationStopped || this._propagationImmediateStopped;
},
getCurrentTarget: function() {
return this.currentTarget;
},
getType: function() {
return this.type;
}
};
cc.Event.NO_TYPE = "no_type";
cc.Event.TOUCH = "touch";
cc.Event.MOUSE = "mouse";
cc.Event.KEYBOARD = "keyboard";
cc.Event.ACCELERATION = "acceleration";
cc.Event.NONE = 0;
cc.Event.CAPTURING_PHASE = 1;
cc.Event.AT_TARGET = 2;
cc.Event.BUBBLING_PHASE = 3;
var o = function(t, e) {
cc.Event.call(this, t, e);
this.detail = null;
};
n.extend(o, cc.Event);
o.prototype.reset = o;
o.prototype.setUserData = function(t) {
this.detail = t;
};
o.prototype.getUserData = function() {
return this.detail;
};
o.prototype.getEventName = cc.Event.prototype.getType;
var r = new n.Pool(10);
o.put = function(t) {
r.put(t);
};
o.get = function(t, e) {
var i = r._get();
i ? i.reset(t, e) : i = new o(t, e);
return i;
};
cc.Event.EventCustom = o;
e.exports = cc.Event;
}), {
"../platform/js": 149
} ],
87: [ (function(t, e, i) {
t("./event");
t("./event-listeners");
t("./event-target");
}), {
"./event": 86,
"./event-listeners": 84,
"./event-target": 85
} ],
88: [ (function(t, e, i) {
var n = t("./types").LineCap, o = t("./types").LineJoin, r = cc.Class({
name: "cc.Graphics",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_lineWidth: 1,
_strokeColor: cc.Color.BLACK,
_lineJoin: o.MITER,
_lineCap: n.BUTT,
_fillColor: cc.Color.WHITE,
_miterLimit: 10,
lineWidth: {
get: function() {
return this._lineWidth;
},
set: function(t) {
this._sgNode.lineWidth = this._lineWidth = t;
}
},
lineJoin: {
get: function() {
return this._lineJoin;
},
set: function(t) {
this._sgNode.lineJoin = this._lineJoin = t;
},
type: o
},
lineCap: {
get: function() {
return this._lineCap;
},
set: function(t) {
this._sgNode.lineCap = this._lineCap = t;
},
type: n
},
strokeColor: {
get: function() {
return this._strokeColor;
},
set: function(t) {
this._sgNode.strokeColor = this._strokeColor = t;
}
},
fillColor: {
get: function() {
return this._fillColor;
},
set: function(t) {
this._sgNode.fillColor = this._fillColor = t;
}
},
miterLimit: {
get: function() {
return this._miterLimit;
},
set: function(t) {
this._sgNode.miterLimit = this._miterLimit = t;
}
}
},
statics: {
LineJoin: o,
LineCap: n
},
_createSgNode: function() {
if (!_ccsg.GraphicsNode) {
var t = new _ccsg.Node(), e = function() {};
[ "moveTo", "lineTo", "bezierCurveTo", "quadraticCurveTo", "arc", "ellipse", "circle", "rect", "roundRect", "fillRect", "clear", "close", "stroke", "fill" ].forEach((function(i) {
t[i] = e;
}));
return t;
}
return new _ccsg.GraphicsNode();
},
_initSgNode: function() {
var t = this._sgNode;
t.lineWidth = this._lineWidth;
t.lineJoin = this._lineJoin;
t.lineCap = this._lineCap;
t.strokeColor = this._strokeColor;
t.fillColor = this._fillColor;
t.miterLimit = this._miterLimit;
t.setContentSize(this.node.getContentSize(!0));
},
moveTo: function(t, e) {
this._sgNode.moveTo(t, e);
},
lineTo: function(t, e) {
this._sgNode.lineTo(t, e);
},
bezierCurveTo: function(t, e, i, n, o, r) {
this._sgNode.bezierCurveTo(t, e, i, n, o, r);
},
quadraticCurveTo: function(t, e, i, n) {
this._sgNode.quadraticCurveTo(t, e, i, n);
},
arc: function(t, e, i, n, o, r) {
r = r || !1;
this._sgNode.arc(t, e, i, n, o, r);
},
ellipse: function(t, e, i, n) {
this._sgNode.ellipse(t, e, i, n);
},
circle: function(t, e, i) {
this._sgNode.circle(t, e, i);
},
rect: function(t, e, i, n) {
this._sgNode.rect(t, e, i, n);
},
roundRect: function(t, e, i, n, o) {
this._sgNode.roundRect(t, e, i, n, o);
},
fillRect: function(t, e, i, n) {
this._sgNode.fillRect(t, e, i, n);
},
clear: function(t) {
this._sgNode.clear(!!t);
},
close: function() {
this._sgNode.close();
},
stroke: function() {
this._sgNode.stroke();
},
fill: function() {
this._sgNode.fill();
}
});
cc.Graphics = e.exports = r;
}), {
"./types": 90
} ],
89: [ (function(t, e, i) {
"use strict";
var n;
if (n = _ccsg.GraphicsNode = cc.GraphicsNode) {
t("../utils/misc").propertyDefine(n, [ "lineWidth", "lineCap", "lineJoin", "miterLimit", "strokeColor", "fillColor" ], {});
}
t("./graphics");
}), {
"../utils/misc": 159,
"./graphics": 88,
"./graphics-node": 1
} ],
90: [ (function(t, e, i) {
"use strict";
var n = cc.Enum({
BUTT: 0,
ROUND: 1,
SQUARE: 2
}), o = cc.Enum({
BEVEL: 0,
ROUND: 1,
MITER: 2
});
e.exports = {
LineCap: n,
LineJoin: o
};
}), {} ],
91: [ (function(t, e, i) {
t("./platform");
t("./assets");
t("./CCNode");
t("./CCScene");
t("./components");
t("./graphics");
t("./collider");
t("./collider/CCIntersection");
t("./physics");
t("./camera/CCCamera");
t("./base-ui/CCWidgetManager");
}), {
"./CCNode": 23,
"./CCScene": 24,
"./assets": 36,
"./base-ui/CCWidgetManager": 37,
"./camera/CCCamera": 38,
"./collider": 46,
"./collider/CCIntersection": 44,
"./components": 80,
"./graphics": 89,
"./physics": 121,
"./platform": 146
} ],
92: [ (function(t, e, i) {
var n = /^(click)(\s)*=/, o = /(\s)*src(\s)*=|(\s)*height(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=/;
cc.HtmlTextParser = function() {
this._parsedObject = {};
this._specialSymbolArray = [];
this._specialSymbolArray.push([ /&lt;/g, "<" ]);
this._specialSymbolArray.push([ /&gt;/g, ">" ]);
this._specialSymbolArray.push([ /&amp;/g, "&" ]);
this._specialSymbolArray.push([ /&quot;/g, '"' ]);
this._specialSymbolArray.push([ /&apos;/g, "'" ]);
};
cc.HtmlTextParser.prototype = {
constructor: cc.HtmlTextParser,
parse: function(t) {
this._resultObjectArray = [];
this._stack = [];
for (var e = 0, i = t.length; e < i; ) {
var n = t.indexOf("<", e);
if (n < 0) {
this._stack.pop();
this._processResult(t.substring(e));
e = i;
} else {
this._processResult(t.substring(e, n));
var o = t.indexOf(">", e);
-1 === o ? o = n : "/" === t.charAt(n + 1) ? this._stack.pop() : this._addToStack(t.substring(n + 1, o));
e = o + 1;
}
}
return this._resultObjectArray;
},
_attributeToObject: function(t) {
var e, i, n, r, s = {}, c = (t = t.trim()).match(/^(color|size)(\s)*=/);
if (c) {
e = c[0];
if ("" === (t = t.substring(e.length).trim())) return s;
i = t.indexOf(" ");
switch (e[0]) {
case "c":
s.color = i > -1 ? t.substring(0, i).trim() : t;
break;

case "s":
s.size = parseInt(t);
}
if (i > -1) {
r = t.substring(i + 1).trim();
n = this._processEventHandler(r);
s.event = n;
}
return s;
}
if ((c = t.match(/^(br(\s)*\/)/)) && c[0].length > 0 && (e = c[0].trim()).startsWith("br") && "/" === e[e.length - 1]) {
s.isNewLine = !0;
this._resultObjectArray.push({
text: "",
style: {
newline: !0
}
});
return s;
}
if ((c = t.match(/^(img(\s)*src(\s)*=[^>]+\/)/)) && c[0].length > 0 && (e = c[0].trim()).startsWith("img") && "/" === e[e.length - 1]) {
c = t.match(o);
for (var a, h = !1; c; ) {
e = (t = t.substring(t.indexOf(c[0]))).substr(0, c[0].length);
d = (i = (a = t.substring(e.length).trim()).indexOf(" ")) > -1 ? a.substr(0, i) : a;
e = (e = e.replace(/[^a-zA-Z]/g, "").trim()).toLocaleLowerCase();
t = a.substring(i).trim();
if ("src" === e) {
s.isImage = !0;
d.endsWith("/") && (d = d.substring(0, d.length - 1));
if (0 === d.indexOf("'")) {
h = !0;
d = d.substring(1, d.length - 1);
} else if (0 === d.indexOf('"')) {
h = !0;
d = d.substring(1, d.length - 1);
}
s.src = d;
} else "height" === e ? s.imageHeight = parseInt(d) : "width" === e ? s.imageWidth = parseInt(d) : "click" === e && (s.event = this._processEventHandler(e + "=" + d));
c = t.match(o);
}
h && s.isImage && this._resultObjectArray.push({
text: "",
style: s
});
return {};
}
if (c = t.match(/^(outline(\s)*[^>]*)/)) {
var l = {
color: "#ffffff",
width: 1
};
if (t = c[0].substring("outline".length).trim()) {
var u = /(\s)*color(\s)*=|(\s)*width(\s)*=|(\s)*click(\s)*=/;
c = t.match(u);
for (var d; c; ) {
e = (t = t.substring(t.indexOf(c[0]))).substr(0, c[0].length);
d = (i = (a = t.substring(e.length).trim()).indexOf(" ")) > -1 ? a.substr(0, i) : a;
e = (e = e.replace(/[^a-zA-Z]/g, "").trim()).toLocaleLowerCase();
t = a.substring(i).trim();
"click" === e ? s.event = this._processEventHandler(e + "=" + d) : "color" === e ? l.color = d : "width" === e && (l.width = parseInt(d));
c = t.match(u);
}
}
s.outline = l;
}
if ((c = t.match(/^(on|u|b|i)(\s)*/)) && c[0].length > 0) {
e = c[0];
t = t.substring(e.length).trim();
switch (e[0]) {
case "u":
s.underline = !0;
break;

case "i":
s.italic = !0;
break;

case "b":
s.bold = !0;
}
if ("" === t) return s;
n = this._processEventHandler(t);
s.event = n;
}
return s;
},
_processEventHandler: function(t) {
for (var e = 0, i = {}, o = t.match(n), r = !1; o; ) {
var s = o[0], c = "";
r = !1;
if ('"' === (t = t.substring(s.length).trim()).charAt(0)) {
if ((e = t.indexOf('"', 1)) > -1) {
c = t.substring(1, e).trim();
r = !0;
}
e++;
} else if ("'" === t.charAt(0)) {
if ((e = t.indexOf("'", 1)) > -1) {
c = t.substring(1, e).trim();
r = !0;
}
e++;
} else {
var a = t.match(/(\S)+/);
e = (c = a ? a[0] : "").length;
}
r && (i[s = s.substring(0, s.length - 1).trim()] = c);
o = (t = t.substring(e).trim()).match(n);
}
return i;
},
_addToStack: function(t) {
var e = this._attributeToObject(t);
if (0 === this._stack.length) this._stack.push(e); else {
if (e.isNewLine || e.isImage) return;
var i = this._stack[this._stack.length - 1];
for (var n in i) e[n] || (e[n] = i[n]);
this._stack.push(e);
}
},
_processResult: function(t) {
if ("" !== t) {
t = this._escapeSpecialSymbol(t);
this._stack.length > 0 ? this._resultObjectArray.push({
text: t,
style: this._stack[this._stack.length - 1]
}) : this._resultObjectArray.push({
text: t
});
}
},
_escapeSpecialSymbol: function(t) {
for (var e = 0; e < this._specialSymbolArray.length; ++e) {
var i = this._specialSymbolArray[e][0], n = this._specialSymbolArray[e][1];
t = t.replace(i, n);
}
return t;
}
};
cc.htmlTextParser = new cc.HtmlTextParser();
}), {} ],
93: [ (function(t, e, i) {
var n = function() {
this._status = "unloaded";
this._observers = [];
this._isLoadWithCSS = !1;
};
n.prototype.onLoaded = function() {
this._status = "loaded";
this._observers.forEach((function(t) {
t();
}));
};
n.prototype.isLoaded = function() {
return "loaded" === this._status;
};
n.prototype.addHandler = function(t) {
-1 === this._observers.indexOf(t) && this._observers.push(t);
};
var o = {
_fontCache: {},
_fontWidthCache: {},
_canvasContext: null,
_testString: "BESbswy",
_allFontsLoaded: !1,
_intervalId: 0,
loadTTF: function(t, e) {
var i = this._getFontFamily(t), n = cc.loader.md5Pipe;
n && (t = n.transformURL(t));
var o = cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU && cc.sys.browserType !== cc.sys.BROWSER_TYPE_BAIDU_APP && cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ;
window.FontFace && o ? this._loadWithFontFace(i, t, e) : this._loadWithCSS(i, t, e);
0 === this._intervalId && (this._intervalId = setInterval(this._checkFontLoaded.bind(this), 100));
},
_checkFontLoaded: function() {
this._allFontsLoaded = !0;
for (var t in this._fontCache) {
var e = this._fontCache[t];
if (!e.isLoaded() && e._isLoadWithCSS) {
var i = this._fontWidthCache[t];
this._canvasContext.font = "40px " + t;
i !== this._canvasContext.measureText(this._testString).width ? e.onLoaded() : this._allFontsLoaded = !1;
}
}
if (this._allFontsLoaded) {
clearInterval(this._intervalId);
this._intervalId = 0;
}
},
_loadWithFontFace: function(t, e, i) {
var o = this._fontCache[t];
if (o) o.isLoaded() || o.addHandler(i); else {
var r = new FontFace(t, "url('" + e + "')");
document.fonts.add(r);
(o = new n()).addHandler(i);
this._fontCache[t] = o;
r.loaded.then((function() {
o.onLoaded();
}));
}
},
_loadWithCSS: function(t, e, i) {
var o = this._fontCache[t];
if (o) o.isLoaded() || o.addHandler(i); else {
var r = document, s = document.createElement("style");
s.type = "text/css";
r.body.appendChild(s);
var c = "";
isNaN(t - 0) ? c += "@font-face { font-family:" + t + "; src:" : c += "@font-face { font-family:'" + t + "'; src:";
c += "url('" + e + "');";
s.textContent = c + "}";
var a = document.createElement("div"), h = a.style;
h.fontFamily = t;
a.innerHTML = ".";
h.position = "absolute";
h.left = "-100px";
h.top = "-100px";
r.body.appendChild(a);
(o = new n()).addHandler(i);
this._fontCache[t] = o;
o._isLoadWithCSS = !0;
if (!this._canvasContext) {
var l = document.createElement("canvas");
l.width = 100;
l.height = 100;
this._canvasContext = l.getContext("2d");
}
var u = "40px " + t;
this._canvasContext.font = u;
var d = this._canvasContext.measureText(this._testString).width;
this._fontWidthCache[t] = d;
var f = this;
s.onload = function() {
setTimeout((function() {
if (!f._allFontsLoaded) {
cc.logID(4004);
o.onLoaded();
cc.director.getScheduler().unschedule(this._checkFontLoaded, this);
}
}), 2e4);
};
}
},
_getFontFamily: function(t) {
var e = t.lastIndexOf(".ttf");
if (-1 === e) return t;
var i = t.lastIndexOf("/");
return -1 === i ? t.substring(0, e) + "_LABEL" : t.substring(i + 1, e) + "_LABEL";
}
};
cc.TextUtils = e.exports = {
label_wordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûа-яА-ЯЁё]+|\S)/,
label_symbolRex: /^[!,.:;'}\]%\?>、‘“》？。，！]/,
label_lastWordRex: /([a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+|\S)$/,
label_lastEnglish: /[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]+$/,
label_firstEnglish: /^[a-zA-Z0-9ÄÖÜäöüßéèçàùêâîôûаíìÍÌïÁÀáàÉÈÒÓòóŐőÙÚŰúűñÑæÆœŒÃÂãÔõěščřžýáíéóúůťďňĚŠČŘŽÁÍÉÓÚŤżźśóńłęćąŻŹŚÓŃŁĘĆĄ-яА-ЯЁё]/,
label_wrapinspection: !0,
isUnicodeCJK: function(t) {
return /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/.test(t) || /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g.test(t) || /^[\u1100-\u11FF]|[\u3130-\u318F]|[\uA960-\uA97F]|[\uAC00-\uD7AF]|[\uD7B0-\uD7FF]+$/.test(t);
},
isUnicodeSpace: function(t) {
return (t = t.charCodeAt(0)) >= 9 && t <= 13 || 32 === t || 133 === t || 160 === t || 5760 === t || t >= 8192 && t <= 8202 || 8232 === t || 8233 === t || 8239 === t || 8287 === t || 12288 === t;
},
fragmentText: function(t, e, i, n) {
var o = [];
if (0 === t.length || i < 0) {
o.push("");
return o;
}
for (var r = t; e > i && r.length > 1; ) {
for (var s = r.length * (i / e) | 0, c = r.substr(s), a = e - n(c), h = c, l = 0, u = 0; a > i && u++ < 10; ) {
s *= i / a;
s |= 0;
a = e - n(c = r.substr(s));
}
u = 0;
for (;a < i && u++ < 10; ) {
if (c) {
var d = this.label_wordRex.exec(c);
l = d ? d[0].length : 1;
h = c;
}
s += l;
a = e - n(c = r.substr(s));
}
if (0 == (s -= l)) {
s = 1;
h = h.substr(1);
}
var f, p = r.substr(0, s);
if (this.label_wrapinspection && this.label_symbolRex.test(h || c)) {
0 == (s -= (f = this.label_lastWordRex.exec(p)) ? f[0].length : 0) && (s = 1);
h = r.substr(s);
p = r.substr(0, s);
}
if (this.label_firstEnglish.test(h) && (f = this.label_lastEnglish.exec(p)) && p !== f[0]) {
s -= f[0].length;
h = r.substr(s);
p = r.substr(0, s);
}
0 === o.length && "" === h && "" === c ? o.push(p) : (p = p.trim()).length > 0 && o.push(p);
e = n(r = h || c);
}
0 === o.length ? o.push(r) : (r = r.trim()).length > 0 && o.push(r);
return o;
}
};
cc.CustomFontLoader = e.exports = o;
}), {} ],
94: [ (function(i, n, o) {
function r(i) {
var n, o, r;
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
o = i;
if (i.url) return o;
n = i.uuid;
} else {
o = {};
n = i;
}
r = o.type ? "uuid" === o.type : cc.AssetLibrary._getAssetUrl(n);
cc.AssetLibrary._getAssetInfoInRuntime(n, v);
o.url = r ? v.url : n;
if (v.url && "uuid" === o.type && v.raw) {
o.type = null;
o.isRawAsset = !0;
} else r || (o.isRawAsset = !0);
return o;
}
function s() {
var t = new l(), e = new u(), i = new d();
a.call(this, [ t, e, i ]);
this.assetLoader = t;
this.downloader = e;
this.loader = i;
this.onProgress = null;
this._autoReleaseSetting = {};
0;
}
var c = i("../platform/js"), a = i("./pipeline"), h = i("./loading-items"), l = i("./asset-loader"), u = i("./downloader"), d = i("./loader"), f = i("./asset-table"), p = i("../platform/utils").callInNextTick, _ = i("./auto-release-utils"), g = new f(), v = {
url: null,
raw: !1
}, y = [], m = [];
c.extend(s, a);
var b = s.prototype;
b.init = function(t) {};
b.getXMLHttpRequest = function() {
return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");
};
b.addDownloadHandlers = function(t) {
this.downloader.addHandlers(t);
};
b.addLoadHandlers = function(t) {
this.loader.addHandlers(t);
};
b.load = function(t, e, i) {
if (void 0 === i) {
i = e;
e = this.onProgress || null;
}
var n = this, o = !1;
if (!(t instanceof Array)) {
o = !0;
t = t ? [ t ] : [];
}
y.length = 0;
for (var s = 0; s < t.length; ++s) {
var c = t[s];
if (c && c.id) {
cc.warnID(4920, c.id);
c.uuid || c.url || (c.url = c.id);
}
var a = r(c);
if (a.url || a.uuid) {
var l = this._cache[a.url];
y.push(l || a);
}
}
var u = h.create(this, e, (function(t, e) {
p((function() {
if (i) {
if (o) {
var r = a.url;
i.call(n, e.getError(r), e.getContent(r));
} else i.call(n, t, e);
i = null;
}
e.destroy();
}));
}));
h.initQueueDeps(u);
u.append(y);
y.length = 0;
};
b.flowInDeps = function(t, e, i) {
m.length = 0;
for (var n = 0; n < e.length; ++n) {
var o = r(e[n]);
if (o.url || o.uuid) {
var s = this._cache[o.url];
s ? m.push(s) : m.push(o);
}
}
var c = h.create(this, t ? function(t, e, i) {
this._ownerQueue && this._ownerQueue.onProgress && this._ownerQueue._childOnProgress(i);
} : null, (function(e, n) {
i(e, n);
t && t.deps && (t.deps.length = 0);
n.destroy();
}));
if (t) {
var a = h.getQueue(t);
c._ownerQueue = a._ownerQueue || a;
}
var l = c.append(m, t);
m.length = 0;
return l;
};
b._resources = g;
b._getResUuid = function(t, e, i) {
if (!t) return null;
var n = t.indexOf("?");
-1 !== n && (t = t.substr(0, n));
var o = g.getUuid(t, e);
if (!o) {
var r = cc.path.extname(t);
if (r) {
t = t.slice(0, -r.length);
(o = g.getUuid(t, e)) && !i && cc.warnID(4901, t, r);
}
}
return o;
};
b._getReferenceKey = function(i) {
var n;
"object" === ("object" == (e = typeof i) ? t(i) : e) ? n = i._uuid || null : "string" === ("object" == (e = typeof i) ? t(i) : e) && (n = this._getResUuid(i, null, !0) || i);
if (!n) {
cc.warnID(4800, i);
return n;
}
cc.AssetLibrary._getAssetInfoInRuntime(n, v);
return this._cache[v.url] ? v.url : n;
};
b._urlNotFound = function(t, e, i) {
p((function() {
t = cc.url.normalize(t);
var n = (e ? c.getClassName(e) : "Asset") + ' in "resources/' + t + '" does not exist.';
i && i(new Error(n), []);
}));
};
b._parseLoadResArgs = function(t, e, i) {
if (void 0 === i) {
var n = cc.isChildClassOf(t, cc.RawAsset);
if (e) {
i = e;
n && (e = this.onProgress || null);
} else if (void 0 === e && !n) {
i = t;
e = this.onProgress || null;
t = null;
}
if (void 0 !== e && !n) {
e = t;
t = null;
}
}
return {
type: t,
onProgress: e,
onComplete: i
};
};
b.loadRes = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
var r = this, s = r._getResUuid(t, e);
s ? this.load({
type: "uuid",
uuid: s
}, i, (function(t, e) {
e && r.setAutoReleaseRecursively(s, !1);
n && n(t, e);
})) : r._urlNotFound(t, e, n);
};
b._loadResUuids = function(t, e, i, n) {
if (t.length > 0) {
var o = this, r = t.map((function(t) {
return {
type: "uuid",
uuid: t
};
}));
this.load(r, e, (function(t, e) {
if (i) {
for (var s = [], c = n && [], a = 0; a < r.length; ++a) {
var h = r[a].uuid, l = this._getReferenceKey(h), u = e.getContent(l);
if (u) {
o.setAutoReleaseRecursively(h, !1);
s.push(u);
c && c.push(n[a]);
}
}
n ? i(t, s, c) : i(t, s);
}
}));
} else i && p((function() {
n ? i(null, [], []) : i(null, []);
}));
};
b.loadResArray = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
for (var r = [], s = 0; s < t.length; s++) {
var c = t[s], a = this._getResUuid(c, e);
if (!a) {
this._urlNotFound(c, e, n);
return;
}
r.push(a);
}
this._loadResUuids(r, i, n);
};
b.loadResDir = function(t, e, i, n) {
var o = this._parseLoadResArgs(e, i, n);
e = o.type;
i = o.onProgress;
n = o.onComplete;
var r = [], s = g.getUuidArray(t, e, r);
this._loadResUuids(s, i, n, r);
};
b.getRes = function(t, e) {
var i = this._cache[t];
if (!i) {
var n = this._getResUuid(t, e, !0);
if (!n) return null;
var o = this._getReferenceKey(n);
i = this._cache[o];
}
i && i.alias && (i = i.alias);
return i && i.complete ? i.content : null;
};
b.getResCount = function() {
return Object.keys(this._cache).length;
};
b.getDependsRecursively = function(t) {
if (t) {
var e = this._getReferenceKey(t), i = _.getDependsRecursively(e);
i.push(e);
return i;
}
return [];
};
b.release = function(t) {
if (Array.isArray(t)) for (var e = 0; e < t.length; e++) {
var i = t[e];
this.release(i);
} else if (t) {
var n = this._getReferenceKey(t), o = this.getItem(n);
if (o) {
var r = this.removeItem(n);
if ((t = o.content) instanceof cc.Asset) {
t instanceof cc.SpriteFrame && r && t.release();
for (var s = t.rawUrls, c = 0; c < s.length; c++) this.release(s[c]);
} else t instanceof cc.Texture2D && cc.textureCache.removeTextureForKey(o.rawUrl || o.url);
0;
}
}
};
b.releaseAsset = function(t) {
var e = t._uuid;
e && this.release(e);
};
b.releaseRes = function(t, e) {
var i = this._getResUuid(t, e);
i ? this.release(i) : cc.errorID(4914, t);
};
b.releaseResDir = function(t, e) {
for (var i = g.getUuidArray(t, e), n = 0; n < i.length; n++) {
var o = i[n];
this.release(o);
}
};
b.releaseAll = function() {
for (var t in this._cache) this.release(t);
};
b.removeItem = function(t) {
var e = a.prototype.removeItem.call(this, t);
delete this._autoReleaseSetting[t];
return e;
};
b.setAutoRelease = function(t, e) {
var i = this._getReferenceKey(t);
i && (this._autoReleaseSetting[i] = !!e);
};
b.setAutoReleaseRecursively = function(t, e) {
e = !!e;
var i = this._getReferenceKey(t);
if (i) {
this._autoReleaseSetting[i] = e;
for (var n = _.getDependsRecursively(i), o = 0; o < n.length; o++) {
var r = n[o];
this._autoReleaseSetting[r] = e;
}
} else 0;
};
b.isAutoRelease = function(t) {
var e = this._getReferenceKey(t);
return !!e && !!this._autoReleaseSetting[e];
};
cc.loader = new s();
0;
n.exports = cc.loader;
}), {
"../platform/js": 149,
"../platform/utils": 153,
"./asset-loader": 95,
"./asset-table": 96,
"./auto-release-utils": 97,
"./downloader": 98,
"./loader": 101,
"./loading-items": 102,
"./pipeline": 105,
"./released-asset-checker": 106
} ],
95: [ (function(t, e, i) {
var n = t("../utils/CCPath"), o = t("./pipeline"), r = t("./loading-items"), s = function(t) {
this.id = "AssetLoader";
this.async = !0;
this.pipeline = null;
};
s.ID = "AssetLoader";
var c = [];
s.prototype.handle = function(t, e) {
var i = t.uuid;
if (!i) return t.content ? t.content : null;
cc.AssetLibrary.queryAssetInfo(i, (function(o, s, a) {
if (o) e(o); else {
t.url = t.rawUrl = s;
t.isRawAsset = a;
if (a) {
var h = n.extname(s).toLowerCase();
if (!h) {
e(new Error("Download Uuid: can not find type of raw asset[" + i + "]: " + s));
return;
}
h = h.substr(1);
var l = r.getQueue(t);
c[0] = {
queueId: t.queueId,
id: s,
url: s,
type: h,
error: null,
alias: t,
complete: !0
};
0;
l.append(c);
t.type = h;
e(null, t.content);
} else {
t.type = "uuid";
e(null, t.content);
}
}
}));
};
o.AssetLoader = e.exports = s;
}), {
"../utils/CCPath": 154,
"./loading-items": 102,
"./pipeline": 105
} ],
96: [ (function(t, e, i) {
function n() {
this._pathToUuid = {};
}
function o(t, e) {
if (t.length > e.length) {
var i = t.charCodeAt(e.length);
return 46 === i || 47 === i;
}
return !0;
}
var r = t("../utils/misc").pushToMap, s = n.prototype;
s.getUuid = function(t, e) {
t = cc.url.normalize(t);
var i = this._pathToUuid[t];
if (i) if (Array.isArray(i)) {
if (!e) return i[0].uuid;
for (var n = 0; n < i.length; n++) {
var o = i[n];
if (cc.isChildClassOf(o.type, e)) return o.uuid;
}
} else if (!e || cc.isChildClassOf(i.type, e)) return i.uuid;
return "";
};
s.getUuidArray = function(t, e, i) {
"/" === (t = cc.url.normalize(t))[t.length - 1] && (t = t.slice(0, -1));
var n = this._pathToUuid, r = [], s = cc.isChildClassOf;
for (var c in n) if (c.startsWith(t) && o(c, t) || !t) {
var a = n[c];
if (Array.isArray(a)) for (var h = 0; h < a.length; h++) {
var l = a[h];
if (!e || s(l.type, e)) {
r.push(l.uuid);
i && i.push(c);
}
} else if (!e || s(a.type, e)) {
r.push(a.uuid);
i && i.push(c);
}
}
return r;
};
s.add = function(t, e, i, n) {
t = t.substring(0, t.length - cc.path.extname(t).length);
var o = new function(t, e) {
this.uuid = t;
this.type = e;
}(e, i);
r(this._pathToUuid, t, o, n);
};
s._getInfo_DEBUG = !1;
s.reset = function() {
this._pathToUuid = {};
};
e.exports = n;
}), {
"../utils/misc": 159
} ],
97: [ (function(i, n, o) {
function r(t, e) {
var i = cc.loader.getItem(t);
if (i) {
var n = i.dependKeys;
if (n) for (var o = 0; o < n.length; o++) {
var s = n[o];
if (!e[s]) {
e[s] = !0;
r(s, e);
}
}
}
}
function s(t, e) {
var i = cc.loader._getReferenceKey(t);
if (!e[i]) {
e[i] = !0;
r(i, e);
}
}
function c(i, n) {
for (var o = Object.getOwnPropertyNames(i), r = 0; r < o.length; r++) {
var c = i[o[r]];
if ("object" === ("object" == (e = typeof c) ? t(c) : e) && c) if (Array.isArray(c)) for (var a = 0; a < c.length; a++) {
var h = c[a];
h instanceof cc.RawAsset && s(h, n);
} else if (c.constructor && c.constructor !== Object) c instanceof cc.RawAsset && s(c, n); else for (var l = Object.getOwnPropertyNames(c), u = 0; u < l.length; u++) {
var d = c[l[u]];
d instanceof cc.RawAsset && s(d, n);
}
}
}
function a(t, e) {
for (var i = 0; i < t._components.length; i++) c(t._components[i], e);
for (var n = 0; n < t._children.length; n++) a(t._children[n], e);
}
var h = i("../platform/js");
n.exports = {
autoRelease: function(t, e, i) {
var n = cc.loader._autoReleaseSetting, o = h.createMap();
if (e) for (var r = 0; r < e.length; r++) o[e[r]] = !0;
for (var s = 0; s < i.length; s++) a(i[s], o);
if (t) for (var c = 0; c < t.length; c++) {
var l = t[c];
!1 === n[l] || o[l] || cc.loader.release(l);
}
for (var u = Object.keys(n), d = 0; d < u.length; d++) {
var f = u[d];
!0 !== n[f] || o[f] || cc.loader.release(f);
}
},
getDependsRecursively: function(t) {
var e = {};
r(t, e);
return Object.keys(e);
}
};
}), {
"../platform/js": 149
} ],
98: [ (function(t, e, i) {
function n(t, e, i, o) {
void 0 === i && (i = !0);
var r = p(t.url);
o = o || l.imagePool.get();
i && "file:" !== window.location.protocol ? o.crossOrigin = "anonymous" : o.crossOrigin = null;
if (o.complete && o.naturalWidth > 0 && o.src === r) return o;
!(function() {
function i() {
o.removeEventListener("load", i);
o.removeEventListener("error", s);
e(null, o);
}
function s() {
o.removeEventListener("load", i);
o.removeEventListener("error", s);
"https:" !== window.location.protocol && o.crossOrigin && "anonymous" === o.crossOrigin.toLowerCase() ? n(t, e, !1, o) : e(new Error("Load image (" + r + ") failed"));
}
o.addEventListener("load", i);
o.addEventListener("error", s);
o.src = r;
})();
}
function o(t, e, i) {
var n = document, o = document.createElement("style");
o.type = "text/css";
n.body.appendChild(o);
var r = "";
isNaN(t - 0) ? r += "@font-face { font-family:" + t + "; src:" : r += "@font-face { font-family:'" + t + "'; src:";
if (e instanceof Array) for (var s = 0, c = e.length; s < c; s++) {
var a = e[s];
i = h.extname(a).toLowerCase();
r += "url('" + e[s] + "') format('" + _[i] + "')";
r += s === c - 1 ? ";" : ",";
} else {
i = i.toLowerCase();
r += "url('" + e + "') format('" + _[i] + "');";
}
o.textContent += r + "}";
var l = document.createElement("div"), u = l.style;
u.fontFamily = t;
l.innerHTML = ".";
u.position = "absolute";
u.left = "-100px";
u.top = "-100px";
n.body.appendChild(l);
}
function r(t, e) {
var i = t.url, n = t.type, r = t.name, s = t.srcs;
if (r && s) {
-1 === s.indexOf(i) && s.push(i);
o(r, s);
} else {
n = h.extname(i);
o(r = h.basename(i, n), i, n);
}
if (!document.fonts) return null;
document.fonts.load("1em " + r).then((function() {
e(null, null);
}), (function(t) {
e(t);
}));
}
var s, c = t("../platform/js"), a = t("../platform/CCSys"), h = t("../utils/CCPath"), l = t("../utils/misc"), u = t("./pipeline"), d = t("./pack-downloader"), f = t("./text-downloader"), p = t("./utils").urlAppendTimestamp, _ = {
".eot": "embedded-opentype",
".ttf": "truetype",
".ttc": "truetype",
".woff": "woff",
".svg": "svg"
}, g = {
js: function(e, i, n) {
function o() {
h.parentNode.removeChild(h);
h.removeEventListener("load", o, !1);
h.removeEventListener("error", r, !1);
i(null, s);
}
function r() {
h.parentNode.removeChild(h);
h.removeEventListener("load", o, !1);
h.removeEventListener("error", r, !1);
i(new Error("Load " + s + " failed!"), s);
}
if (a.platform !== a.WECHAT_GAME) {
var s = e.url, c = document, h = document.createElement("script");
h.async = n;
h.src = p(s);
h.addEventListener("load", o, !1);
h.addEventListener("error", r, !1);
c.body.appendChild(h);
} else {
t(e.url);
i(null, e.url);
}
},
png: n,
jpg: n,
bmp: n,
jpeg: n,
gif: n,
ico: n,
tiff: n,
webp: function(t, e, i, o) {
return cc.sys.capabilities.webp ? n(t, e, i, o) : new Error("Load Webp ( " + t.url + " ) failed");
},
image: n,
mp3: s = t("./audio-downloader"),
ogg: s,
wav: s,
m4a: s,
txt: f,
xml: f,
vsh: f,
fsh: f,
atlas: f,
tmx: f,
tsx: f,
json: f,
ExportJson: f,
plist: f,
fnt: f,
font: r,
eot: r,
ttf: r,
woff: r,
svg: r,
ttc: r,
uuid: function(t, e) {
var i = d.load(t, e);
return void 0 === i ? this.extMap.json(t, e) : i || void 0;
},
default: f
}, v = function(t) {
this.id = "Downloader";
this.async = !0;
this.pipeline = null;
this._curConcurrent = 0;
this._loadQueue = [];
this.extMap = c.mixin(t, g);
};
v.ID = "Downloader";
v.PackDownloader = d;
v.prototype.addHandlers = function(t) {
c.mixin(this.extMap, t);
};
v.prototype._handleLoadQueue = function() {
for (;this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT; ) {
var t = this._loadQueue.shift();
if (!t) break;
var e = this.handle(t.item, t.callback);
void 0 !== e && (e instanceof Error ? t.callback(e) : t.callback(null, e));
}
};
v.prototype.handle = function(t, e) {
var i = this, n = this.extMap[t.type] || this.extMap.default, o = void 0;
if (this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT) {
this._curConcurrent++;
if (void 0 !== (o = n.call(this, t, (function(t, n) {
i._curConcurrent = Math.max(0, i._curConcurrent - 1);
i._handleLoadQueue();
e && e(t, n);
})))) {
this._curConcurrent = Math.max(0, this._curConcurrent - 1);
this._handleLoadQueue();
return o;
}
} else if (t.ignoreMaxConcurrency) {
if (void 0 !== (o = n.call(this, t, e))) return o;
} else this._loadQueue.push({
item: t,
callback: e
});
};
u.Downloader = e.exports = v;
}), {
"../platform/CCSys": 138,
"../platform/js": 149,
"../utils/CCPath": 154,
"../utils/misc": 159,
"./audio-downloader": 1,
"./pack-downloader": 104,
"./pipeline": 105,
"./text-downloader": 107,
"./utils": 108
} ],
99: [ (function(t, e, i) {
t("./downloader");
t("./loader");
t("./json-unpacker");
t("./loading-items");
t("./pipeline");
t("./CCLoader");
}), {
"./CCLoader": 94,
"./downloader": 98,
"./json-unpacker": 100,
"./loader": 101,
"./loading-items": 102,
"./pipeline": 105
} ],
100: [ (function(i, n, o) {
function r() {
this.jsons = {};
this.state = -1;
}
r.prototype.read = function(i, n) {
var o = "string" === ("object" == (e = typeof n) ? t(n) : e) ? JSON.parse(n) : n;
o.length !== i.length && cc.errorID(4915);
for (var r = 0; r < i.length; r++) {
var s = i[r], c = o[r];
this.jsons[s] = c;
}
};
r.prototype.retrieve = function(t) {
return this.jsons[t] || null;
};
0;
n.exports = r;
}), {} ],
101: [ (function(i, n, o) {
function r(i, n) {
if ("string" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("JSON Loader: Input item doesn't contain string content");
try {
return JSON.parse(i.content);
} catch (t) {
return new Error("JSON Loader: Parse json [" + i.id + "] failed : " + t);
}
}
function s(t, e) {
if (a.platform !== a.WECHAT_GAME && !(t.content instanceof Image)) return new Error("Image Loader: Input item doesn't contain Image content");
var i = t.rawUrl, n = cc.textureCache.getTextureForKey(i) || new l();
n.url = i;
n.initWithElement(t.content);
n.handleLoadedTexture();
cc.textureCache.cacheImage(i, n);
return n;
}
var c = i("../platform/js"), a = i("../platform/CCSys"), h = i("./pipeline"), l = i("../textures/CCTexture2D"), u = i("./uuid-loader"), d = (i("../utils/misc"), 
{
png: s,
jpg: s,
bmp: s,
jpeg: s,
gif: s,
ico: s,
tiff: s,
webp: s,
image: s,
json: r,
ExportJson: r,
plist: function(i, n) {
if ("string" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("Plist Loader: Input item doesn't contain string content");
var o = cc.plistParser.parse(i.content);
return o || new Error("Plist Loader: Parse [" + i.id + "] failed");
},
uuid: u,
prefab: u,
fire: u,
scene: u,
default: function(t, e) {
return null;
}
}), f = function(t) {
this.id = "Loader";
this.async = !0;
this.pipeline = null;
this.extMap = c.mixin(t, d);
};
f.ID = "Loader";
f.prototype.addHandlers = function(t) {
this.extMap = c.mixin(this.extMap, t);
};
f.prototype.handle = function(t, e) {
return (this.extMap[t.type] || this.extMap.default).call(this, t, e);
};
h.Loader = n.exports = f;
}), {
"../platform/CCSys": 138,
"../platform/js": 149,
"../textures/CCTexture2D": 1,
"../utils/misc": 159,
"./pipeline": 105,
"./uuid-loader": 109
} ],
102: [ (function(i, n, o) {
function r(i) {
var n = i.url || i;
return "string" === ("object" == (e = typeof n) ? t(n) : e);
}
function s(i, n) {
var o = "object" === ("object" == (e = typeof i) ? t(i) : e) ? i.url : i, r = {
queueId: n,
id: o,
url: o,
rawUrl: void 0,
urlParam: (function(t) {
if (t) {
var e = t.split("?");
if (e && e[0] && e[1]) {
var i = {};
e[1].split("&").forEach((function(t) {
var e = t.split("=");
i[e[0]] = e[1];
}));
return i;
}
}
})(o),
type: "",
error: null,
content: null,
complete: !1,
states: {},
deps: null
};
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
l.mixin(r, i);
if (i.skips) for (var s = 0; s < i.skips.length; s++) {
var c = i.skips[s];
r.states[c] = p.COMPLETE;
}
}
r.rawUrl = r.url;
o && !r.type && (r.type = h.extname(o).toLowerCase().substr(1));
return r;
}
function c(t, e, i) {
if (!t || !e) return !1;
var n = !1;
g.push(e.id);
if (e.deps) {
var o, r, s = e.deps;
for (o = 0; o < s.length; o++) {
if ((r = s[o]).id === t.id) {
n = !0;
break;
}
if (!(g.indexOf(r.id) >= 0) && (r.deps && c(t, r, !0))) {
n = !0;
break;
}
}
}
i || (g.length = 0);
return n;
}
var a = i("../platform/callbacks-invoker"), h = i("../utils/CCPath"), l = i("../platform/js"), u = 0 | 998 * Math.random(), d = {}, f = [], p = {
WORKING: 1,
COMPLETE: 2,
ERROR: 3
}, _ = {}, g = [], v = function(t, e, i, n) {
a.call(this);
this._id = ++u;
d[this._id] = this;
this._pipeline = t;
this._errorUrls = [];
this._appending = !1;
this._ownerQueue = null;
this.onProgress = i;
this.onComplete = n;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
this._pipeline ? this.active = !0 : this.active = !1;
e && (e.length > 0 ? this.append(e) : this.allComplete());
};
v.ItemState = new cc.Enum(p);
v.create = function(i, n, o, r) {
if (void 0 === o) {
if ("function" === ("object" == (e = typeof n) ? t(n) : e)) {
r = n;
n = o = null;
}
} else if (void 0 === r) if ("function" === ("object" == (e = typeof n) ? t(n) : e)) {
r = o;
o = n;
n = null;
} else {
r = o;
o = null;
}
var s = f.pop();
if (s) {
s._pipeline = i;
s.onProgress = o;
s.onComplete = r;
d[s._id] = s;
s._pipeline && (s.active = !0);
n && s.append(n);
} else s = new v(i, n, o, r);
return s;
};
v.getQueue = function(t) {
return t.queueId ? d[t.queueId] : null;
};
v.itemComplete = function(t) {
var e = d[t.queueId];
e && e.itemComplete(t.id);
};
v.initQueueDeps = function(t) {
var e = _[t._id];
if (e) {
e.completed.length = 0;
e.deps.length = 0;
} else e = _[t._id] = {
completed: [],
deps: []
};
};
v.registerQueueDep = function(t, e) {
var i = t.queueId || t;
if (!i) return !1;
var n = _[i];
if (n) -1 === n.deps.indexOf(e) && n.deps.push(e); else if (t.id) for (var o in _) {
var r = _[o];
-1 !== r.deps.indexOf(t.id) && -1 === r.deps.indexOf(e) && r.deps.push(e);
}
};
v.finishDep = function(t) {
for (var e in _) {
var i = _[e];
-1 !== i.deps.indexOf(t) && -1 === i.completed.indexOf(t) && i.completed.push(t);
}
};
var y = v.prototype;
l.mixin(y, a.prototype);
y.append = function(t, e) {
if (!this.active) return [];
e && !e.deps && (e.deps = []);
this._appending = !0;
var i, n, o, a = [];
for (i = 0; i < t.length; ++i) if (!(n = t[i]).queueId || this.map[n.id]) {
if (r(n)) {
var h = (o = s(n, this._id)).id;
if (!this.map[h]) {
this.map[h] = o;
this.totalCount++;
e && e.deps.push(o);
v.registerQueueDep(e || this._id, h);
a.push(o);
}
}
} else {
this.map[n.id] = n;
e && e.deps.push(n);
if (n.complete || c(e, n)) {
this.totalCount++;
this.itemComplete(n.id);
continue;
}
var l = this, u = d[n.queueId];
if (u) {
this.totalCount++;
v.registerQueueDep(e || this._id, n.id);
u.addListener(n.id, (function(t) {
l.itemComplete(t.id);
}));
}
}
this._appending = !1;
this.completedCount === this.totalCount ? this.allComplete() : this._pipeline.flowIn(a);
return a;
};
y._childOnProgress = function(t) {
if (this.onProgress) {
var e = _[this._id];
this.onProgress(e ? e.completed.length : this.completedCount, e ? e.deps.length : this.totalCount, t);
}
};
y.allComplete = function() {
var t = 0 === this._errorUrls.length ? null : this._errorUrls;
this.onComplete && this.onComplete(t, this);
};
y.isCompleted = function() {
return this.completedCount >= this.totalCount;
};
y.isItemCompleted = function(t) {
return !!this.completed[t];
};
y.exists = function(t) {
return !!this.map[t];
};
y.getContent = function(t) {
var e = this.map[t], i = null;
e && (e.content ? i = e.content : e.alias && (i = e.alias.content));
return i;
};
y.getError = function(t) {
var e = this.map[t], i = null;
e && (e.error ? i = e.error : e.alias && (i = e.alias.error));
return i;
};
y.addListener = a.prototype.add;
y.hasListener = a.prototype.has;
y.removeListener = a.prototype.remove;
y.removeAllListeners = a.prototype.removeAll;
y.removeItem = function(t) {
var e = this.map[t];
if (e && this.completed[e.alias || t]) {
delete this.completed[t];
delete this.map[t];
if (e.alias) {
delete this.completed[e.alias.id];
delete this.map[e.alias.id];
}
this.completedCount--;
this.totalCount--;
}
};
y.itemComplete = function(t) {
var e = this.map[t];
if (e) {
var i = this._errorUrls.indexOf(t);
e.error && -1 === i ? this._errorUrls.push(t) : e.error || -1 === i || this._errorUrls.splice(i, 1);
this.completed[t] = e;
this.completedCount++;
v.finishDep(e.id);
if (this.onProgress) {
var n = _[this._id];
this.onProgress(n ? n.completed.length : this.completedCount, n ? n.deps.length : this.totalCount, e);
}
this.invoke(t, e);
this.removeAll(t);
!this._appending && this.completedCount >= this.totalCount && this.allComplete();
}
};
y.destroy = function() {
this.active = !1;
this._appending = !1;
this._pipeline = null;
this._ownerQueue = null;
this._errorUrls.length = 0;
this.onProgress = null;
this.onComplete = null;
this.map = {};
this.completed = {};
this.totalCount = 0;
this.completedCount = 0;
a.call(this);
d[this._id] = null;
if (_[this._id]) {
_[this._id].completed.length = 0;
_[this._id].deps.length = 0;
}
-1 === f.indexOf(this) && f.length < 10 && f.push(this);
};
cc.LoadingItems = n.exports = v;
}), {
"../platform/callbacks-invoker": 142,
"../platform/js": 149,
"../utils/CCPath": 154
} ],
103: [ (function(t, e, i) {
var n = t("./pipeline"), o = /(\.[^.\n\\/]*)$/, r = function(t, e, i) {
this.id = "MD5Pipe";
this.async = !1;
this.pipeline = null;
this.md5AssetsMap = t;
this.libraryBase = e;
this.rawAssetsBase = i;
};
r.ID = "MD5Pipe";
r.prototype.handle = function(t) {
t.url = this.transformURL(t.url);
return t;
};
r.prototype.transformURL = function(t) {
var e = t.indexOf("?"), i = t;
-1 !== e && (i = t.substr(0, e));
if (i.startsWith(this.libraryBase)) i = i.slice(this.libraryBase.length); else {
if (!i.startsWith(this.rawAssetsBase)) return t;
i = i.slice(this.rawAssetsBase.length);
}
var n = this.md5AssetsMap[i];
if (n) {
var r = !1;
t = t.replace(o, (function(t, e) {
r = !0;
return "." + n + e;
}));
r || (t = t + "." + n);
}
return t;
};
n.MD5Pipe = e.exports = r;
}), {
"./pipeline": 105
} ],
104: [ (function(t, e, i) {
function n(t, e) {
return new Error("Can not retrieve " + t + " from packer " + e);
}
var o = t("./json-unpacker"), r = t("../utils/misc").pushToMap, s = {}, c = {}, a = {}, h = 0, l = 2, u = 3;
e.exports = {
initPacks: function(t) {
c = t;
for (var e in t) for (var i = t[e], n = 0; n < i.length; n++) {
var o = i[n], a = 1 === i.length;
r(s, o, e, a);
}
},
_loadNewPack: function(t, e, i) {
var o = this, r = cc.AssetLibrary.getLibUrlNoExt(e) + ".json";
cc.loader.load({
url: r,
ignoreMaxConcurrency: !0
}, (function(r, s) {
if (r) {
cc.errorID(4916, t);
return i(r);
}
var c = o._doLoadNewPack(t, e, s);
c ? i(null, c) : i(n(t, e));
}));
},
_doLoadNewPack: function(t, e, i) {
var n = a[e];
if (n.state !== u) {
n.read(c[e], i);
n.state = u;
}
return n.retrieve(t);
},
_selectLoadedPack: function(t) {
for (var e = h, i = "", n = 0; n < t.length; n++) {
var o = t[n], r = a[o];
if (r) {
var s = r.state;
if (s === u) return o;
if (s > e) {
e = s;
i = o;
}
}
}
return e !== h ? i : t[0];
},
load: function(t, e) {
var i = t.uuid, r = s[i];
if (r) {
Array.isArray(r) && (r = this._selectLoadedPack(r));
var c = a[r];
if (c && c.state === u) {
var h = c.retrieve(i);
return h || n(i, r);
}
if (!c) {
console.log("Create unpacker %s for %s", r, i);
(c = a[r] = new o()).state = l;
}
this._loadNewPack(i, r, e);
return null;
}
}
};
0;
}), {
"../utils/misc": 159,
"./json-unpacker": 100
} ],
105: [ (function(t, e, i) {
function n(t, e) {
var i = t.id, o = e.states[i], s = t.next, c = t.pipeline;
if (!e.error && o !== r.WORKING && o !== r.ERROR) if (o === r.COMPLETE) s ? n(s, e) : c.flowOut(e); else {
e.states[i] = r.WORKING;
var a = t.handle(e, (function(t, o) {
if (t) {
e.error = t;
e.states[i] = r.ERROR;
c.flowOut(e);
} else {
o && (e.content = o);
e.states[i] = r.COMPLETE;
s ? n(s, e) : c.flowOut(e);
}
}));
if (a instanceof Error) {
e.error = a;
e.states[i] = r.ERROR;
c.flowOut(e);
} else if (void 0 !== a) {
null !== a && (e.content = a);
e.states[i] = r.COMPLETE;
s ? n(s, e) : c.flowOut(e);
}
}
}
t("../platform/js");
var o = t("./loading-items"), r = o.ItemState, s = function(t) {
this._pipes = t;
this._cache = {};
for (var e = 0; e < t.length; ++e) {
var i = t[e];
if (i.handle && i.id) {
i.pipeline = this;
i.next = e < t.length - 1 ? t[e + 1] : null;
}
}
};
s.ItemState = r;
var c = s.prototype;
c.insertPipe = function(t, e) {
if (!t.handle || !t.id || e > this._pipes.length) cc.warnID(4921); else if (this._pipes.indexOf(t) > 0) cc.warnID(4922); else {
t.pipeline = this;
var i = null;
e < this._pipes.length && (i = this._pipes[e]);
var n = null;
e > 0 && (n = this._pipes[e - 1]);
n && (n.next = t);
t.next = i;
this._pipes.splice(e, 0, t);
}
};
c.insertPipeAfter = function(t, e) {
var i = this._pipes.indexOf(t);
i < 0 || this.insertPipe(e, i + 1);
};
c.appendPipe = function(t) {
if (t.handle && t.id) {
t.pipeline = this;
t.next = null;
this._pipes.length > 0 && (this._pipes[this._pipes.length - 1].next = t);
this._pipes.push(t);
}
};
c.flowIn = function(t) {
var e, i, o = this._pipes[0];
if (o) {
for (e = 0; e < t.length; e++) {
i = t[e];
this._cache[i.id] = i;
}
for (e = 0; e < t.length; e++) n(o, i = t[e]);
} else for (e = 0; e < t.length; e++) this.flowOut(t[e]);
};
c.flowInDeps = function(t, e, i) {
return o.create(this, (function(t, e) {
i(t, e);
e.destroy();
})).append(e, t);
};
c.flowOut = function(t) {
t.error ? delete this._cache[t.id] : this._cache[t.id] || (this._cache[t.id] = t);
t.complete = !0;
o.itemComplete(t);
};
c.copyItemStates = function(t, e) {
if (e instanceof Array) for (var i = 0; i < e.length; ++i) e[i].states = t.states; else e.states = t.states;
};
c.isFlowing = function() {
return !0;
};
c.getItems = function() {
return null;
};
c.getItem = function(t) {
var e = this._cache[t];
if (!e) return e;
e.alias && (e = e.alias);
return e;
};
c.removeItem = function(t) {
var e = this._cache[t];
e && e.complete && delete this._cache[t];
return e;
};
c.clear = function() {
for (var t in this._cache) {
var e = this._cache[t];
delete this._cache[t];
if (!e.complete) {
e.error = new Error("Canceled manually");
this.flowOut(e);
}
}
};
cc.Pipeline = e.exports = s;
}), {
"../platform/js": 149,
"./loading-items": 102
} ],
106: [ (function(t, e, i) {}), {
"../platform/js": 149
} ],
107: [ (function(i, n, o) {
i("../platform/CCSys");
n.exports = function(i, n) {
var o = i.url, r = jsb.fileUtils.getStringFromFile(o);
return "string" === ("object" == (e = typeof r) ? t(r) : e) && r ? r : new Error("Download text failed: " + o);
};
}), {
"../platform/CCSys": 138,
"./utils": 108
} ],
108: [ (function(i, n, o) {
var r = /\?/;
n.exports = {
urlAppendTimestamp: function(i) {
cc.game.config.noCache && "string" === ("object" == (e = typeof i) ? t(i) : e) && (r.test(i) ? i += "&_t=" + (new Date() - 0) : i += "?_t=" + (new Date() - 0));
return i;
}
};
}), {} ],
109: [ (function(i, n, o) {
function r(t) {
return t && (t[0] && "cc.Scene" === t[0].__type__ || t[1] && "cc.Scene" === t[1].__type__ || t[0] && "cc.Prefab" === t[0].__type__);
}
function s(i, n) {
0;
var o;
if ("string" === ("object" == (e = typeof i.content) ? t(i.content) : e)) try {
o = JSON.parse(i.content);
} catch (t) {
return new Error("Uuid Loader: Parse asset [" + i.id + "] failed : " + t.stack);
} else {
if ("object" !== ("object" == (e = typeof i.content) ? t(i.content) : e)) return new Error("JSON Loader: Input item doesn't contain string content");
o = i.content;
}
var s, h = r(o);
s = h ? cc._MissingScript.safeFindClass : function(t) {
var e = c._getClassById(t);
if (e) return e;
cc.warnID(4903, t);
return Object;
};
var l, u = cc.deserialize.Details.pool.get();
try {
l = cc.deserialize(o, u, {
classFinder: s,
target: i.existingAsset,
customEnv: i
});
} catch (t) {
cc.deserialize.Details.pool.put(u);
var d = t + "\n" + t.stack;
return new Error("Uuid Loader: Deserialize asset [" + i.id + "] failed : " + d);
}
l._uuid = i.uuid;
0;
!(function(t, e, i, n, o, r) {
var s, c, h, l, u, d = n.uuidList, f = e.dependKeys = [];
if (o) {
s = [];
c = [];
h = [];
for (l = 0; l < d.length; l++) {
u = d[l];
var p = n.uuidObjList[l], _ = n.uuidPropList[l], g = cc.AssetLibrary._getAssetInfoInRuntime(u);
if (g.raw) {
var v = g.url;
p[_] = v;
f.push(v);
} else {
s.push(p);
c.push(_);
h.push({
type: "uuid",
uuid: u,
deferredLoadRaw: !0
});
}
}
} else {
s = n.uuidObjList;
c = n.uuidPropList;
h = new Array(d.length);
for (l = 0; l < d.length; l++) {
u = d[l];
h[l] = {
type: "uuid",
uuid: u
};
}
}
if (n.rawProp) {
s.push(i);
c.push(n.rawProp);
h.push(e.url);
}
if (i._preloadRawFiles) {
var y = r;
r = function() {
i._preloadRawFiles((function(t) {
y(t || null, i);
}));
};
}
if (0 === h.length) {
cc.deserialize.Details.pool.put(n);
return r(null, i);
}
e.content = i;
t.flowInDeps(e, h, (function(t, e) {
var o;
for (var l in e.map) (o = e.map[l]).uuid && o.content && (o.content._uuid = o.uuid);
for (var u = 0; u < h.length; u++) {
var d = h[u].uuid, p = h[u].url, _ = s[u], g = c[u];
if (o = e.map[p]) {
var v = {
obj: _,
prop: g
};
function y(t) {
var e = t.isRawAsset ? t.rawUrl : t.content;
this.obj[this.prop] = e;
t.uuid !== i._uuid && f.indexOf(t.id) < 0 && f.push(t.id);
}
if (o.complete || o.content) o.error ? cc._throw(o.error) : y.call(v, o); else {
var m = a.getQueue(o), b = m._callbackTable[d];
b ? b.unshift(y, v) : m.addListener(d, y, v);
}
}
}
cc.deserialize.Details.pool.put(n);
r(null, i);
}));
})(this.pipeline, i, l, u, !1, n);
}
var c = i("../platform/js");
i("../platform/deserialize");
var a = i("./loading-items");
n.exports = s;
s.isSceneObj = r;
}), {
"../platform/deserialize": 144,
"../platform/js": 149,
"./loading-items": 102
} ],
110: [ (function(i, n, o) {
function r(t, e, i) {
0;
e ? t._removeComponent(e) : h.array.removeAt(t._components, i);
}
function s() {
this._activatingStack = [];
}
var c = i("./component-scheduler"), a = i("./platform/CCObject").Flags, h = i("./platform/js"), l = a.IsPreloadStarted, u = a.IsOnLoadStarted, d = a.IsOnLoadCalled, f = a.Deactivating, p = "c.onLoad();c._objFlags|=" + d, _ = cc.Class({
extends: c.LifeCycleInvoker,
add: function(t) {
this._zero.array.push(t);
},
remove: function(t) {
this._zero.fastRemove(t);
},
cancelInactive: function(t) {
c.LifeCycleInvoker.stableRemoveInactive(this._zero, t);
},
invoke: function() {
this._invoke(this._zero);
this._zero.array.length = 0;
}
}), g = c.createInvokeImpl("c.__preload();"), v = c.createInvokeImpl(p), y = new h.Pool(4);
y.get = function() {
var t = this._get() || {
preload: new _(g),
onLoad: new c.OneOffInvoker(v),
onEnable: new c.OneOffInvoker(c.invokeOnEnable)
};
t.preload._zero.i = -1;
var e = t.onLoad;
e._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
(e = t.onEnable)._zero.i = -1;
e._neg.i = -1;
e._pos.i = -1;
return t;
};
var m = cc.Class({
ctor: s,
reset: s,
_activateNodeRecursively: function(t, e, i, n) {
if (t._objFlags & f) cc.errorID(3816, t.name); else {
t._activeInHierarchy = !0;
for (var o = t._components.length, s = 0; s < o; ++s) {
var c = t._components[s];
if (c instanceof cc.Component) this.activateComp(c, e, i, n); else {
r(t, c, s);
--s;
--o;
}
}
for (var a = 0, h = t._children.length; a < h; ++a) {
var l = t._children[a];
l._active && this._activateNodeRecursively(l, e, i, n);
}
t._onPostActivated(!0);
}
},
_deactivateNodeRecursively: function(t) {
0;
t._objFlags |= f;
t._activeInHierarchy = !1;
for (var e = t._components.length, i = 0; i < e; ++i) {
var n = t._components[i];
if (n._enabled) {
cc.director._compScheduler.disableComp(n);
if (t._activeInHierarchy) {
t._objFlags &= ~f;
return;
}
}
}
for (var o = 0, r = t._children.length; o < r; ++o) {
var s = t._children[o];
if (s._activeInHierarchy) {
this._deactivateNodeRecursively(s);
if (t._activeInHierarchy) {
t._objFlags &= ~f;
return;
}
}
}
t._onPostActivated(!1);
t._objFlags &= ~f;
},
activateNode: function(t, e) {
if (e) {
var i = y.get();
this._activatingStack.push(i);
this._activateNodeRecursively(t, i.preload, i.onLoad, i.onEnable);
i.preload.invoke();
i.onLoad.invoke();
i.onEnable.invoke();
this._activatingStack.pop();
y.put(i);
} else {
this._deactivateNodeRecursively(t);
for (var n = this._activatingStack, o = 0; o < n.length; o++) {
var r = n[o];
r.preload.cancelInactive(l);
r.onLoad.cancelInactive(u);
r.onEnable.cancelInactive();
}
}
t.emit("active-in-hierarchy-changed", t);
},
activateComp: function(i, n, o, r) {
if (!(i._objFlags & l)) {
i._objFlags |= l;
"function" === ("object" == (e = typeof i.__preload) ? t(i.__preload) : e) && (n ? n.add(i) : i.__preload());
}
if (!(i._objFlags & u)) {
i._objFlags |= u;
if (i.onLoad) if (o) o.add(i); else {
i.onLoad();
i._objFlags |= d;
} else i._objFlags |= d;
}
if (i._enabled) {
if (!i.node._activeInHierarchy) return;
cc.director._compScheduler.enableComp(i, r);
}
},
destroyComp: function(t) {
cc.director._compScheduler.disableComp(t);
t.onDestroy && t._objFlags & d && t.onDestroy();
},
resetComp: !1
});
n.exports = m;
}), {
"./component-scheduler": 47,
"./platform/CCObject": 137,
"./platform/js": 149,
"./utils/misc": 159
} ],
111: [ (function(t, e, i) {
function n() {
this.localPoint = cc.v2();
this.normalImpulse = 0;
this.tangentImpulse = 0;
}
function o() {}
var r = t("./CCPhysicsTypes").PTM_RATIO, s = t("./CCPhysicsTypes").ContactType, c = [], a = [ cc.v2(), cc.v2() ];
0;
var h = {
points: [],
separations: [],
normal: cc.v2()
}, l = [ new n(), new n() ];
0;
var u = {
type: 0,
localPoint: cc.v2(),
localNormal: cc.v2(),
points: []
}, d = {
normalImpulses: [],
tangentImpulses: []
};
o.prototype.init = function(t) {
this.colliderA = t.GetFixtureA().collider;
this.colliderB = t.GetFixtureB().collider;
this.disabled = !1;
this.disabledOnce = !1;
this._impulse = null;
this._inverted = !1;
this._b2contact = t;
t._contact = this;
};
o.prototype.reset = function() {
this.colliderA = null;
this.colliderB = null;
this.disabled = !1;
this._impulse = null;
this._b2contact._contact = null;
this._b2contact = null;
};
o.prototype.getWorldManifold = function() {
var t = h.points, e = h.separations, i = h.normal, n = cc.PhysicsUtils.getContactWorldManifoldWrapper(this._b2contact), o = n.getCount();
t.length = e.length = o;
for (var r = 0; r < o; r++) {
var s = a[r];
s.x = n.getX(r);
s.y = n.getY(r);
t[r] = s;
e[r] = n.getSeparation(r);
}
i.x = n.getNormalX();
i.y = n.getNormalY();
if (this._inverted) {
i.x *= -1;
i.y *= -1;
}
return h;
};
o.prototype.getManifold = function() {
for (var t = u.points, e = u.localNormal, i = u.localPoint, n = cc.PhysicsUtils.getContactManifoldWrapper(), o = t.length = n.getCount(), r = 0; r < o; r++) {
var s;
(s = l[r]).localPoint.x = n.getX(r);
s.localPoint.y = n.getX(r);
s.normalImpulse = n.getNormalImpulse(r);
s.tangentImpulse = n.getTangentImpulse(r);
t[r] = s;
}
e.x = n.getLocalNormalX();
e.y = n.getLocalNormalY();
i.x = n.getLocalPointX();
i.y = n.getLocalPointY();
u.type = n.getType();
if (this._inverted) {
e.x *= -1;
e.y *= -1;
}
return u;
};
o.prototype.getImpulse = function() {
var t = this._impulse;
if (!t) return null;
var e, i = d.normalImpulses, n = d.tangentImpulses;
e = t.getCount();
for (var o = 0; o < e; o++) {
i[o] = t.getNormalImpulse(o);
n[o] = t.getTangentImpulse(o);
}
n.length = i.length = e;
return d;
};
o.prototype.emit = function(t) {
var e;
switch (t) {
case s.BEGIN_CONTACT:
e = "onBeginContact";
break;

case s.END_CONTACT:
e = "onEndContact";
break;

case s.PRE_SOLVE:
e = "onPreSolve";
break;

case s.POST_SOLVE:
e = "onPostSolve";
}
var i, n, o, r, c = this.colliderA, a = this.colliderB, h = c.body, l = a.body;
if (h.enabledContactListener) {
i = h.node._components;
this._inverted = !1;
for (n = 0, o = i.length; n < o; n++) (r = i[n])[e] && r[e](this, c, a);
}
if (l.enabledContactListener) {
i = l.node._components;
this._inverted = !0;
for (n = 0, o = i.length; n < o; n++) (r = i[n])[e] && r[e](this, a, c);
}
if (this.disabled || this.disabledOnce) {
this.setEnabled(!1);
this.disabledOnce = !1;
}
};
o.get = function(t) {
var e;
(e = 0 === c.length ? new cc.PhysicsContact() : c.pop()).init(t);
return e;
};
o.put = function(t) {
var e = t._contact;
if (e) {
c.push(e);
e.reset();
}
};
var f = o.prototype;
f.setEnabled = function(t) {
this._b2contact.SetEnabled(t);
};
f.isTouching = function() {
return this._b2contact.IsTouching();
};
f.setTangentSpeed = function(t) {
this._b2contact.SetTangentSpeed(t / r);
};
f.getTangentSpeed = function() {
return this._b2contact.GetTangentSpeed() * r;
};
f.setFriction = function(t) {
this._b2contact.SetFriction(t);
};
f.getFriction = function() {
return this._b2contact.GetFriction();
};
f.resetFriction = function() {
return this._b2contact.ResetFriction();
};
f.setRestitution = function(t) {
this._b2contact.SetRestitution(t);
};
f.getRestitution = function() {
return this._b2contact.GetRestitution();
};
f.resetRestitution = function() {
return this._b2contact.ResetRestitution();
};
o.ContactType = s;
cc.PhysicsContact = e.exports = o;
}), {
"./CCPhysicsTypes": 113
} ],
112: [ (function(t, e, i) {
var n = t("./CCPhysicsTypes").ContactType, o = t("./CCPhysicsTypes").BodyType, r = t("./CCPhysicsTypes").RayCastType, s = t("./CCPhysicsTypes").PTM_RATIO, c = (t("./CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, 
t("./CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, new b2.AABB()), a = new b2.Vec2(), h = new b2.Vec2(), l = cc.Class({
mixins: [ cc.EventTarget ],
statics: {
DrawBits: b2.Draw,
PTM_RATIO: s,
VELOCITY_ITERATIONS: 10,
POSITION_ITERATIONS: 10
},
ctor: function() {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._debugDrawFlags = 0;
this._debugDrawer = null;
this._world = null;
this._bodies = [];
this._contactMap = {};
this._contactID = 0;
this._delayEvents = [];
this._accumulator = 0;
this.enabledAccumulator = !1;
},
pushDelayEvent: function(t, e, i) {
this._steping ? this._delayEvents.push({
target: t,
func: e,
args: i
}) : t[e].apply(t, i);
},
update: function(t) {
var e = this._world;
if (e && this.enabled) {
this.emit("before-step");
this._steping = !0;
var i = l.VELOCITY_ITERATIONS, n = l.POSITION_ITERATIONS;
if (this.enabledAccumulator) {
this._accumulator += t;
this._accumulator > .2 && (this._accumulator = .2);
for (;this._accumulator > 1 / 60; ) {
e.Step(1 / 60, i, n);
this._accumulator -= 1 / 60;
}
} else {
var o = 1 / cc.game.config.frameRate;
e.Step(o, i, n);
}
e.DrawDebugData();
this._steping = !1;
for (var r = this._delayEvents, s = 0, c = r.length; s < c; s++) {
var a = r[s];
a.target[a.func].apply(a.target, a.args);
}
r.length = 0;
this._syncNode();
}
},
testPoint: function(t) {
var e = a.x = t.x / s, i = a.y = t.y / s, n = .2 / s;
c.lowerBound.x = e - n;
c.lowerBound.y = i - n;
c.upperBound.x = e + n;
c.upperBound.y = i + n;
var o = this._aabbQueryCallback;
o.init(a);
this._world.QueryAABB(o, c);
var r = o.getFixture();
return r ? r.collider : null;
},
testAABB: function(t) {
c.lowerBound.x = t.xMin / s;
c.lowerBound.y = t.yMin / s;
c.upperBound.x = t.xMax / s;
c.upperBound.y = t.yMax / s;
var e = this._aabbQueryCallback;
e.init();
this._world.QueryAABB(e, c);
return e.getFixtures().map((function(t) {
return t.collider;
}));
},
rayCast: function(t, e, i) {
if (t.equals(e)) return [];
i = i || r.Closest;
a.x = t.x / s;
a.y = t.y / s;
h.x = e.x / s;
h.y = e.y / s;
var n = this._raycastQueryCallback;
n.init(i);
this._world.RayCast(n, a, h);
var o = n.getFixtures();
if (o.length > 0) {
for (var c = n.getPoints(), l = n.getNormals(), u = n.getFractions(), d = [], f = 0, p = o.length; f < p; f++) {
var _ = o[f], g = _.collider;
if (i === r.AllClosest) {
var v = d.find((function(t) {
return t.collider === g;
}));
if (v) {
if (u[f] < v.fraction) {
v.fixtureIndex = g._getFixtureIndex(_);
v.point.x = c[f].x * s;
v.point.y = c[f].y * s;
v.normal.x = l[f].x;
v.normal.y = l[f].y;
v.fraction = u[f];
}
continue;
}
}
d.push({
collider: g,
fixtureIndex: g._getFixtureIndex(_),
point: cc.v2(c[f].x * s, c[f].y * s),
normal: cc.v2(l[f]),
fraction: u[f]
});
}
return d;
}
return [];
},
syncPosition: function() {
for (var t = this._bodies, e = 0; e < t.length; e++) t[e].syncPosition();
},
syncRotation: function() {
for (var t = this._bodies, e = 0; e < t.length; e++) t[e].syncRotation();
},
attachDebugDrawToCamera: function(t) {
this._debugDrawer && t.addTarget(this._debugDrawer.getDrawer());
},
detachDebugDrawFromCamera: function(t) {
this._debugDrawer && t.removeTarget(this._debugDrawer.getDrawer());
},
_registerContactFixture: function(t) {
this._contactListener.registerContactFixture(t);
},
_unregisterContactFixture: function(t) {
this._contactListener.unregisterContactFixture(t);
},
_addBody: function(t, e) {
var i = this._world, n = t.node;
if (i && n) {
t._b2Body = i.CreateBody(e);
t._b2Body.SetUserData(n._sgNode);
t._b2Body.body = t;
this._utils.addB2Body(t._b2Body);
this._bodies.push(t);
}
},
_removeBody: function(t) {
var e = this._world;
if (e) {
t._b2Body.SetUserData(null);
t._b2Body.body = null;
this._utils.removeB2Body(t._b2Body);
e.DestroyBody(t._b2Body);
t._b2Body = null;
var i = this._bodies.indexOf(t);
-1 !== i && this._bodies.splice(i, 1);
}
},
_initCallback: function() {
if (this._world) {
if (!this._contactListener) {
var t = new cc.PhysicsContactListener();
t.setBeginContact(this._onBeginContact);
t.setEndContact(this._onEndContact);
t.setPreSolve(this._onPreSolve);
t.setPostSolve(this._onPostSolve);
this._world.SetContactListener(t);
this._contactListener = t;
this._aabbQueryCallback = new cc.PhysicsAABBQueryCallback();
this._raycastQueryCallback = new cc.PhysicsRayCastCallback();
}
} else cc.warn("Please init PhysicsManager first");
},
_init: function() {
this.enabled = !0;
this.debugDrawFlags = b2.Draw.e_shapeBit;
},
_getWorld: function() {
return this._world;
},
_syncNode: function() {
this._utils.syncNode();
for (var t = this._bodies, e = 0, i = t.length; e < i; e++) {
var n = t[e], r = n.node;
r._position.x = r._sgNode.getPositionX();
r._position.y = r._sgNode.getPositionY();
r._rotationX = r._rotationY = r._sgNode.getRotation();
n.type === o.Animated && n.resetVelocity();
}
},
_onSceneLaunched: function() {
this._debugDrawer.AddDrawerToNode(cc.director.getScene()._sgNode);
},
_onBeginContact: function(t) {
cc.PhysicsContact.get(t).emit(n.BEGIN_CONTACT);
},
_onEndContact: function(t) {
var e = t._contact;
if (e) {
e.emit(n.END_CONTACT);
cc.PhysicsContact.put(t);
}
},
_onPreSolve: function(t) {
var e = t._contact;
e && e.emit(n.PRE_SOLVE);
},
_onPostSolve: function(t, e) {
var i = t._contact;
if (i) {
i._impulse = e;
i.emit(n.POST_SOLVE);
i._impulse = null;
}
}
});
cc.js.getset(l.prototype, "enabled", (function() {
return this._enabled;
}), (function(t) {
if (t && !this._world) {
var e = new b2.World(new b2.Vec2(0, -10));
e.SetAllowSleeping(!0);
this._world = e;
this._utils = new cc.PhysicsUtils();
this._initCallback();
}
this._enabled = t;
}));
cc.js.getset(l.prototype, "debugDrawFlags", (function() {
return this._debugDrawFlags;
}), (function(t) {
if (t && !this._debugDrawFlags) {
if (!this._debugDrawer) {
this._debugDrawer = new cc.PhysicsDebugDraw(s);
this._world.SetDebugDraw(this._debugDrawer);
}
cc.director.getScene() && this._debugDrawer.AddDrawerToNode(cc.director.getScene()._sgNode);
cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
} else !t && this._debugDrawFlags && cc.director.off(cc.Director.EVENT_AFTER_SCENE_LAUNCH, this._onSceneLaunched, this);
this._debugDrawFlags = t;
this._debugDrawer && this._debugDrawer.SetFlags(t);
}));
cc.js.getset(l.prototype, "gravity", (function() {
if (this._world) {
var t = this._world.GetGravity();
return cc.v2(t.x * s, t.y * s);
}
return cc.v2();
}), (function(t) {
this._world && this._world.SetGravity(new b2.Vec2(t.x / s, t.y / s));
}));
cc.PhysicsManager = e.exports = l;
}), {
"./CCPhysicsTypes": 113
} ],
113: [ (function(t, e, i) {
var n = cc.Enum({
Static: 0,
Kinematic: 1,
Dynamic: 2,
Animated: 3
});
cc.RigidBodyType = n;
var o = cc.Enum({
Closest: 0,
Any: 1,
AllClosest: 2,
All: 3
});
cc.RayCastType = o;
e.exports = {
BodyType: n,
ContactType: {
BEGIN_CONTACT: "begin-contact",
END_CONTACT: "end-contact",
PRE_SOLVE: "pre-solve",
POST_SOLVE: "post-solve"
},
RayCastType: o,
PTM_RATIO: 32,
ANGLE_TO_PHYSICS_ANGLE: -Math.PI / 180,
PHYSICS_ANGLE_TO_ANGLE: -180 / Math.PI
};
}), {} ],
114: [ (function(i, n, o) {
function r(t, e) {
var i = e.length;
return e[t < 0 ? i - -t % i : t % i];
}
function s(t, e, i) {
for (var n = []; e < t; ) e += i.length;
for (;t <= e; ++t) n.push(r(t, i));
return n;
}
function c(t) {
p(t);
for (var e, i, n, o, _, v, y = [], m = cc.v2(), b = cc.v2(), C = 0, T = 0, S = 0; S < t.length; ++S) if (a(S, t)) {
i = n = 1e8;
for (var E = 0; E < t.length; ++E) {
if (l(r(S - 1, t), r(S, t), r(E, t)) && d(r(S - 1, t), r(S, t), r(E - 1, t))) {
o = g(r(S - 1, t), r(S, t), r(E, t), r(E - 1, t));
if (h(r(S + 1, t), r(S, t), o) && (e = f(r(S, t), o)) < i) {
i = e;
m = o;
C = E;
}
}
if (l(r(S + 1, t), r(S, t), r(E + 1, t)) && d(r(S + 1, t), r(S, t), r(E, t))) {
o = g(r(S + 1, t), r(S, t), r(E, t), r(E + 1, t));
if (l(r(S - 1, t), r(S, t), o) && (e = f(r(S, t), o)) < n) {
n = e;
T = E;
b = o;
}
}
}
if (C == (T + 1) % t.length) {
var A = m.add(b).div(2);
(_ = s(S, T, t)).push(A);
(v = s(C, S, t)).push(A);
} else {
for (var x = 0, w = C; T < C; ) T += t.length;
for (E = C; E <= T; ++E) if (function(t, e, i) {
if (a(t, i)) {
if (u(r(t, i), r(t - 1, i), r(e, i)) && d(r(t, i), r(t + 1, i), r(e, i))) return !1;
} else if (d(r(t, i), r(t + 1, i), r(e, i)) || u(r(t, i), r(t - 1, i), r(e, i))) return !1;
if (a(e, i)) {
if (u(r(e, i), r(e - 1, i), r(t, i)) && d(r(e, i), r(e + 1, i), r(t, i))) return !1;
} else if (d(r(e, i), r(e + 1, i), r(t, i)) || u(r(e, i), r(e - 1, i), r(t, i))) return !1;
for (var n = 0; n < i.length; ++n) if ((n + 1) % i.length != t && n != t && (n + 1) % i.length != e && n != e) {
var o = cc.v2();
if (function(t, e, i, n, o) {
if (t == i || t == n || e == i || e == n) return !1;
var r = t.x, s = t.y, c = e.x, a = e.y, h = i.x, l = i.y, u = n.x, d = n.y;
if (Math.max(r, c) < Math.min(h, u) || Math.max(h, u) < Math.min(r, c)) return !1;
if (Math.max(s, a) < Math.min(l, d) || Math.max(l, d) < Math.min(s, a)) return !1;
var f = (u - h) * (s - l) - (d - l) * (r - h), p = (c - r) * (s - l) - (a - s) * (r - h), _ = (d - l) * (c - r) - (u - h) * (a - s);
if (Math.abs(_) < 1e-6) return !1;
p /= _;
if (0 < (f /= _) && f < 1 && 0 < p && p < 1) {
o.x = r + f * (c - r);
o.y = s + f * (a - s);
return !0;
}
return !1;
}(r(t, i), r(e, i), r(n, i), r(n + 1, i), o)) return !1;
}
return !0;
}(S, E, t)) {
var I = 1 / (f(r(S, t), r(E, t)) + 1);
a(E, t) ? d(r(E - 1, t), r(E, t), r(S, t)) && u(r(E + 1, t), r(E, t), r(S, t)) ? I += 3 : I += 2 : I += 1;
if (I > x) {
w = E;
x = I;
}
}
_ = s(S, w, t);
v = s(w, S, t);
}
return y = (y = y.concat(c(_))).concat(c(v));
}
y.push(t);
for (S = y.length - 1; S >= 0; S--) 0 == y[S].length && y.splice(S, 0);
return y;
}
function a(t, e) {
return h(t, e);
}
function h(i, n, o) {
if ("undefined" === ("object" == (e = typeof o) ? t(o) : e)) {
var s = i, c = n;
i = r(s - 1, c);
n = r(s, c);
o = r(s + 1, c);
}
return v(i, n, o) < 0;
}
function l(t, e, i) {
return v(t, e, i) > 0;
}
function u(t, e, i) {
return v(t, e, i) >= 0;
}
function d(t, e, i) {
return v(t, e, i) <= 0;
}
function f(t, e) {
var i = e.x - t.x, n = e.y - t.y;
return i * i + n * n;
}
function p(t) {
_(t) || t.reverse();
}
function _(t) {
return t.length < 3 || (function(t) {
var e, i = 0;
for (e = 0; e < t.length; e++) {
var n = (e + 1) % t.length;
i += t[e].x * t[n].y;
i -= t[e].y * t[n].x;
}
return i /= 2;
})(t) > 0;
}
function g(t, e, i, n) {
var o = cc.v2(), r = e.y - t.y, s = t.x - e.x, c = r * t.x + s * t.y, a = n.y - i.y, h = i.x - n.x, l = a * i.x + h * i.y, u = r * h - a * s;
if (!(function(t, e) {
return Math.abs(t - e) <= 1e-6;
})(u, 0)) {
o.x = (h * c - s * l) / u;
o.y = (r * l - a * c) / u;
}
return o;
}
function v(t, e, i) {
return t.x * (e.y - i.y) + e.x * (i.y - t.y) + i.x * (t.y - e.y);
}
n.exports = {
ConvexPartition: c,
ForceCounterClockWise: p,
IsCounterClockWise: _
};
}), {} ],
115: [ (function(t, e, i) {
var n = t("./CCPhysicsTypes").PTM_RATIO, o = t("./CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = t("./CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, s = t("./utils").getWorldRotation, c = t("./CCPhysicsTypes").BodyType, a = new b2.Vec2(), h = new b2.Vec2(), l = cc.Vec2.ZERO, u = cc.Class({
name: "cc.RigidBody",
extends: cc.Component,
editor: !1,
properties: {
_type: c.Dynamic,
_allowSleep: !0,
_gravityScale: 1,
_linearDamping: 0,
_angularDamping: 0,
_linearVelocity: cc.v2(0, 0),
_angularVelocity: 0,
_fixedRotation: !1,
enabled: {
get: function() {
return this._enabled;
},
set: function() {
cc.warnID("8200");
},
visible: !1,
override: !0
},
enabledContactListener: {
default: !1,
tooltip: !1
},
bullet: {
default: !1,
tooltip: !1
},
type: {
type: c,
tooltip: !1,
get: function() {
return this._type;
},
set: function(t) {
this._type = t;
this._b2Body && (t === c.Animated ? this._b2Body.SetType(c.Kinematic) : this._b2Body.SetType(t));
}
},
allowSleep: {
tooltip: !1,
get: function() {
return this._b2Body ? this._b2Body.IsSleepingAllowed() : this._allowSleep;
},
set: function(t) {
this._allowSleep = t;
this._b2Body && this._b2Body.SetAllowSleeping(t);
}
},
gravityScale: {
tooltip: !1,
get: function() {
return this._gravityScale;
},
set: function(t) {
this._gravityScale = t;
this._b2Body && this._b2Body.SetGravityScale(t);
}
},
linearDamping: {
tooltip: !1,
get: function() {
return this._linearDamping;
},
set: function(t) {
this._linearDamping = t;
this._b2Body && this._b2Body.SetLinearDamping(this._linearDamping);
}
},
angularDamping: {
tooltip: !1,
get: function() {
return this._angularDamping;
},
set: function(t) {
this._angularDamping = t;
this._b2Body && this._b2Body.SetAngularDamping(t);
}
},
linearVelocity: {
tooltip: !1,
type: cc.Vec2,
get: function() {
var t = this._linearVelocity;
if (this._b2Body) {
var e = this._b2Body.GetLinearVelocity();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
set: function(t) {
this._linearVelocity = t;
var e = this._b2Body;
if (e) {
var i = a;
i.Set(t.x / n, t.y / n);
e.SetLinearVelocity(i);
}
}
},
angularVelocity: {
tooltip: !1,
get: function() {
return this._b2Body ? this._b2Body.GetAngularVelocity() * r : this._angularVelocity;
},
set: function(t) {
this._angularVelocity = t;
this._b2Body && this._b2Body.SetAngularVelocity(t * o);
}
},
fixedRotation: {
tooltip: !1,
get: function() {
return this._fixedRotation;
},
set: function(t) {
this._fixedRotation = t;
this._b2Body && this._b2Body.SetFixedRotation(t);
}
},
awake: {
tooltip: !1,
get: function() {
return !!this._b2Body && this._b2Body.IsAwake();
},
set: function(t) {
this._b2Body && this._b2Body.SetAwake(t);
}
},
active: {
visible: !1,
get: function() {
return !!this._b2Body && this._b2Body.IsActive();
},
set: function(t) {
this._b2Body && this._b2Body.SetActive(t);
}
}
},
getLocalPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLocalPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetWorldPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldVector: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetWorldVector(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getLocalVector: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLocalVector(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getWorldPosition: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetPosition();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getWorldRotation: function() {
return this._b2Body ? this._b2Body.GetAngle() * r : 0;
},
getLocalCenter: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetLocalCenter();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getWorldCenter: function(t) {
t = t || cc.v2();
if (this._b2Body) {
var e = this._b2Body.GetWorldCenter();
t.x = e.x * n;
t.y = e.y * n;
}
return t;
},
getLinearVelocityFromWorldPoint: function(t, e) {
e = e || cc.v2();
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
var i = this._b2Body.GetLinearVelocityFromWorldPoint(a);
e.x = i.x * n;
e.y = i.y * n;
}
return e;
},
getMass: function() {
return this._b2Body ? this._b2Body.GetMass() : 0;
},
getInertia: function() {
return this._b2Body ? this._b2Body.GetInertia() * n * n : 0;
},
getJointList: function() {
if (!this._b2Body) return [];
for (var t = this._b2Body.GetJointList(), e = 0; e < t.length; e++) t[e] = t[e]._joint;
return t;
},
applyForce: function(t, e, i) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
h.Set(e.x / n, e.y / n);
this._b2Body.ApplyForce(a, h, i);
}
},
applyForceToCenter: function(t, e) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
this._b2Body.ApplyForceToCenter(a, e);
}
},
applyTorque: function(t, e) {
this._b2Body && this._b2Body.ApplyTorque(t / n, e);
},
applyLinearImpulse: function(t, e, i) {
if (this._b2Body) {
a.Set(t.x / n, t.y / n);
h.Set(e.x / n, e.y / n);
this._b2Body.ApplyLinearImpulse(a, h, i);
}
},
applyAngularImpulse: function(t, e) {
this._b2Body && this._b2Body.ApplyAngularImpulse(t / n / n, e);
},
syncPosition: function(t) {
var e = this._b2Body;
if (e) {
var i, o = this.node.convertToWorldSpaceAR(l);
(i = a).x = o.x / n;
i.y = o.y / n;
if (this.type === c.Animated && t) {
var r = e.GetPosition(), s = cc.game.config.frameRate;
i.x = (i.x - r.x) * s;
i.y = (i.y - r.y) * s;
e.SetAwake(!0);
e.SetLinearVelocity(i);
} else e.SetTransform(i, e.GetAngle());
}
},
syncRotation: function(t) {
var e = this._b2Body;
if (e) {
var i = o * s(this.node);
if (this.type === c.Animated && t) {
var n = e.GetAngle(), r = cc.game.config.frameRate;
e.SetAwake(!0);
e.SetAngularVelocity((i - n) * r);
} else e.SetTransform(e.GetPosition(), i);
}
},
resetVelocity: function() {
var t = this._b2Body;
if (t) {
var e = a;
e.Set(0, 0);
t.SetLinearVelocity(e);
t.SetAngularVelocity(0);
}
},
onEnable: function() {
this._init();
},
onDisable: function() {
this._destroy();
},
_registerNodeEvents: function() {
var t = this.node;
t.on("position-changed", this._onNodePositionChanged, this);
t.on("rotation-changed", this._onNodeRotationChanged, this);
t.on("scale-changed", this._onNodeScaleChanged, this);
},
_unregisterNodeEvents: function() {
var t = this.node;
t.off("position-changed", this._onNodePositionChanged, this);
t.off("rotation-changed", this._onNodeRotationChanged, this);
t.off("scale-changed", this._onNodeScaleChanged, this);
},
_onNodePositionChanged: function() {
this.syncPosition(!0);
},
_onNodeRotationChanged: function(t) {
this.syncRotation(!0);
},
_onNodeScaleChanged: function(t) {
if (this._b2Body) for (var e = this.getComponents(cc.PhysicsCollider), i = 0; i < e.length; i++) e[i].apply();
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
this._registerNodeEvents();
var t = new b2.BodyDef();
this.type === c.Animated ? t.type = c.Kinematic : t.type = this.type;
t.allowSleep = this.allowSleep;
t.gravityScale = this.gravityScale;
t.linearDamping = this.linearDamping;
t.angularDamping = this.angularDamping;
var e = this.linearVelocity;
t.linearVelocity = new b2.Vec2(e.x / n, e.y / n);
t.angularVelocity = this.angularVelocity * o;
t.fixedRotation = this.fixedRotation;
t.bullet = this.bullet;
var i = this.node, r = i.convertToWorldSpaceAR(l);
t.position = new b2.Vec2(r.x / n, r.y / n);
t.angle = -Math.PI / 180 * s(i);
cc.director.getPhysicsManager()._addBody(this, t);
this._inited = !0;
}
},
__destroy: function() {
if (this._inited) {
cc.director.getPhysicsManager()._removeBody(this);
this._unregisterNodeEvents();
this._inited = !1;
}
},
_getBody: function() {
return this._b2Body;
}
});
cc.RigidBody = e.exports = u;
}), {
"./CCPhysicsTypes": 113,
"./utils": 131
} ],
116: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsBoxCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Box ],
editor: {
menu: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = Math.abs(t.x), i = Math.abs(t.y), o = this.size.width / 2 / n * e, r = this.size.height / 2 / n * i, s = this.offset.x / n * e, c = this.offset.y / n * i, a = new b2.PolygonShape();
a.SetAsBox(o, r, new b2.Vec2(s, c), 0);
return a;
}
});
cc.PhysicsBoxCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 113
} ],
117: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsChainCollider",
extends: cc.PhysicsCollider,
editor: {
menu: !1,
inspector: !1,
requireComponent: cc.RigidBody
},
properties: {
loop: !1,
points: {
default: function() {
return [ cc.v2(-50, 0), cc.v2(50, 0) ];
},
type: [ cc.Vec2 ]
},
threshold: {
default: 1,
serializable: !1,
visible: !1
}
},
_createShape: function(t) {
for (var e = new b2.ChainShape(), i = this.points, o = [], r = 0; r < i.length; r++) {
var s = i[r];
o.push(new b2.Vec2(s.x / n * t.x, s.y / n * t.y));
}
this.loop ? e.CreateLoop(o, o.length) : e.CreateChain(o, o.length);
return e;
},
resetInEditor: !1,
resetPointsByContour: !1
});
cc.PhysicsChainCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 113
} ],
118: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.PhysicsCircleCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Circle ],
editor: {
menu: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = Math.abs(t.x), i = Math.abs(t.y), o = this.offset.x / n * e, r = this.offset.y / n * i, s = new b2.CircleShape();
s.m_radius = this.radius / n * e;
s.m_p = new b2.Vec2(o, r);
return s;
}
});
cc.PhysicsCircleCollider = e.exports = o;
}), {
"../CCPhysicsTypes": 113
} ],
119: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../utils").getWorldScale, r = cc.Class({
name: "cc.PhysicsCollider",
extends: cc.Collider,
ctor: function() {
this._fixtures = [];
this._shapes = [];
this._inited = !1;
this._rect = cc.rect();
},
properties: {
_density: 1,
_sensor: !1,
_friction: .2,
_restitution: 0,
density: {
tooltip: !1,
get: function() {
return this._density;
},
set: function(t) {
this._density = t;
}
},
sensor: {
tooltip: !1,
get: function() {
return this._sensor;
},
set: function(t) {
this._sensor = t;
}
},
friction: {
tooltip: !1,
get: function() {
return this._friction;
},
set: function(t) {
this._friction = t;
}
},
restitution: {
tooltip: !1,
get: function() {
return this._restitution;
},
set: function(t) {
this._restitution = t;
}
},
body: {
default: null,
type: cc.RigidBody,
visible: !1
}
},
onDisable: function() {
this._destroy();
},
onEnable: function() {
this._init();
},
start: function() {
this._init();
},
_getFixtureIndex: function(t) {
return this._fixtures.indexOf(t);
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
var t = this.body || this.getComponent(cc.RigidBody);
if (t) {
var e = t._getBody();
if (e) {
var i = t.node, n = o(i), r = 0 === n.x && 0 === n.y ? [] : this._createShape(n);
r instanceof Array || (r = [ r ]);
for (var s = 1 << i.groupIndex, c = 0, a = cc.game.collisionMatrix[i.groupIndex], h = 0; h < a.length; h++) a[h] && (c |= 1 << h);
for (var l = {
categoryBits: s,
maskBits: c,
groupIndex: 0
}, u = cc.director.getPhysicsManager(), d = 0; d < r.length; d++) {
var f = r[d], p = new b2.FixtureDef();
p.density = this.density;
p.isSensor = this.sensor;
p.friction = this.friction;
p.restitution = this.restitution;
p.shape = f;
p.filter = l;
var _ = e.CreateFixture(p);
_.collider = this;
t.enabledContactListener && u._registerContactFixture(_);
this._shapes.push(f);
this._fixtures.push(_);
}
this.body = t;
this._inited = !0;
}
}
}
},
__destroy: function() {
if (this._inited) {
for (var t = this._fixtures, e = this.body._getBody(), i = cc.director.getPhysicsManager(), n = t.length - 1; n >= 0; n--) {
var o = t[n];
o.collider = null;
cc.sys.isObjectValid(o) && i._unregisterContactFixture(o);
e && e.DestroyFixture(o);
}
this.body = null;
this._fixtures.length = 0;
this._shapes.length = 0;
this._inited = !1;
}
},
_createShape: function() {},
apply: function() {
this._destroy();
this._init();
},
getAABB: function() {
for (var t = 1e7, e = 1e7, i = -1e7, o = -1e7, r = this._fixtures, s = 0; s < r.length; s++) for (var c = r[s], a = c.GetShape().GetChildCount(), h = 0; h < a; h++) {
var l = c.GetAABB(h);
l.lowerBound.x < t && (t = l.lowerBound.x);
l.lowerBound.y < e && (e = l.lowerBound.y);
l.upperBound.x > i && (i = l.upperBound.x);
l.upperBound.y > o && (o = l.upperBound.y);
}
t *= n;
e *= n;
i *= n;
o *= n;
var u = this._rect;
u.x = t;
u.y = e;
u.width = i - t;
u.height = o - e;
return u;
}
});
cc.PhysicsCollider = e.exports = r;
}), {
"../CCPhysicsTypes": 113,
"../utils": 131
} ],
120: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPolygonSeparator"), r = cc.Class({
name: "cc.PhysicsPolygonCollider",
extends: cc.PhysicsCollider,
mixins: [ cc.Collider.Polygon ],
editor: {
menu: !1,
inspector: !1,
requireComponent: cc.RigidBody
},
_createShape: function(t) {
var e = [], i = this.points;
i.length > 0 && i[0].equals(i[i.length - 1]) && (i.length -= 1);
for (var r = o.ConvexPartition(i), s = this.offset, c = 0; c < r.length; c++) {
for (var a = r[c], h = null, l = [], u = null, d = 0, f = a.length; d < f; d++) {
h || (h = new b2.PolygonShape());
var p = a[d], _ = (p.x + s.x) / n * t.x, g = (p.y + s.y) / n * t.y, v = new b2.Vec2(_, g);
l.push(v);
u || (u = v);
if (l.length === b2.maxPolygonVertices) {
h.Set(l, l.length);
e.push(h);
h = null;
d < f - 1 && (l = [ u, l[l.length - 1] ]);
}
}
if (h) {
h.Set(l, l.length);
e.push(h);
}
}
return e;
}
});
cc.PhysicsPolygonCollider = e.exports = r;
}), {
"../CCPhysicsTypes": 113,
"../CCPolygonSeparator": 114
} ],
121: [ (function(t, e, i) {
0;
t("./CCPhysicsManager");
t("./CCRigidBody");
t("./CCPhysicsContact");
t("./collider/CCPhysicsCollider");
t("./collider/CCPhysicsChainCollider");
t("./collider/CCPhysicsCircleCollider");
t("./collider/CCPhysicsBoxCollider");
t("./collider/CCPhysicsPolygonCollider");
t("./joint/CCJoint");
t("./joint/CCDistanceJoint");
t("./joint/CCRevoluteJoint");
t("./joint/CCMouseJoint");
t("./joint/CCMotorJoint");
t("./joint/CCPrismaticJoint");
t("./joint/CCWeldJoint");
t("./joint/CCWheelJoint");
t("./joint/CCRopeJoint");
0;
}), {
"../../../external/box2d/box2d": 1,
"./CCPhysicsContact": 111,
"./CCPhysicsManager": 112,
"./CCRigidBody": 115,
"./collider/CCPhysicsBoxCollider": 116,
"./collider/CCPhysicsChainCollider": 117,
"./collider/CCPhysicsCircleCollider": 118,
"./collider/CCPhysicsCollider": 119,
"./collider/CCPhysicsPolygonCollider": 120,
"./joint/CCDistanceJoint": 122,
"./joint/CCJoint": 123,
"./joint/CCMotorJoint": 124,
"./joint/CCMouseJoint": 125,
"./joint/CCPrismaticJoint": 126,
"./joint/CCRevoluteJoint": 127,
"./joint/CCRopeJoint": 128,
"./joint/CCWeldJoint": 129,
"./joint/CCWheelJoint": 130,
"./platform/CCPhysicsAABBQueryCallback": 1,
"./platform/CCPhysicsContactListner": 1,
"./platform/CCPhysicsDebugDraw": 1,
"./platform/CCPhysicsRayCastCallback": 1,
"./platform/CCPhysicsUtils": 1
} ],
122: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.DistanceJoint",
extends: cc.Joint,
editor: !1,
properties: {
_distance: 1,
_frequency: 0,
_dampingRatio: 0,
distance: {
tooltip: !1,
get: function() {
return this._distance;
},
set: function(t) {
this._distance = t;
this._joint && this._joint.SetLength(t);
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.DistanceJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.length = this.distance / n;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
}
});
cc.DistanceJoint = e.exports = o;
}), {
"../CCPhysicsTypes": 113
} ],
123: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.Joint",
extends: cc.Component,
editor: {
requireComponent: cc.RigidBody
},
properties: {
anchor: {
default: cc.v2(0, 0),
tooltip: !1
},
connectedAnchor: {
default: cc.v2(0, 0),
tooltip: !1
},
connectedBody: {
default: null,
type: cc.RigidBody,
tooltip: !1
},
collideConnected: {
default: !1,
tooltip: !1
}
},
onDisable: function() {
this._destroy();
},
onEnable: function() {
this._init();
},
start: function() {
this._init();
},
apply: function() {
this._destroy();
this._init();
},
getWorldAnchor: function() {
if (this._joint) {
var t = this._joint.GetAnchorA();
return cc.v2(t.x * n, t.y * n);
}
return cc.Vec2.ZERO;
},
getWorldConnectedAnchor: function() {
if (this._joint) {
var t = this._joint.GetAnchorB();
return cc.v2(t.x * n, t.y * n);
}
return cc.Vec2.ZERO;
},
getReactionForce: function(t) {
return this._joint ? this._joint.GetReactionForce(t) : 0;
},
getReactionTorque: function(t) {
return this._joint ? this._joint.GetReactionTorque(t) : 0;
},
_init: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__init", []);
},
_destroy: function() {
cc.director.getPhysicsManager().pushDelayEvent(this, "__destroy", []);
},
__init: function() {
if (!this._inited) {
this.body = this.getComponent(cc.RigidBody);
if (this._isValid()) {
var t = cc.director.getPhysicsManager()._getWorld(), e = this._createJointDef();
if (!e) return;
e.bodyA = this.body._getBody();
e.bodyB = this.connectedBody._getBody();
e.collideConnected = this.collideConnected;
this._joint = t.CreateJoint(e);
this._joint && (this._joint._joint = this);
this._inited = !0;
}
}
},
__destroy: function() {
if (this._inited) {
this._isValid() && cc.director.getPhysicsManager()._getWorld().DestroyJoint(this._joint);
this._joint && (this._joint._joint = null);
this._joint = null;
this._inited = !1;
}
},
_createJointDef: function() {
return null;
},
_isValid: function() {
return this.body && this.body._getBody() && this.connectedBody && this.connectedBody._getBody();
}
});
cc.Joint = e.exports = o;
}), {
"../CCPhysicsTypes": 113
} ],
124: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.MotorJoint",
extends: cc.Joint,
editor: !1,
properties: {
_linearOffset: cc.v2(0, 0),
_angularOffset: 0,
_maxForce: 1,
_maxTorque: 1,
_correctionFactor: .3,
anchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
connectedAnchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
linearOffset: {
tooltip: !1,
get: function() {
return this._linearOffset;
},
set: function(t) {
this._linearOffset = t;
this._joint && this._joint.SetLinearOffset(new b2.Vec2(t.x / n, t.y / n));
}
},
angularOffset: {
tooltip: !1,
get: function() {
return this._angularOffset;
},
set: function(t) {
this._angularOffset = t;
this._joint && this._joint.SetAngularOffset(t);
}
},
maxForce: {
tooltip: !1,
get: function() {
return this._maxForce;
},
set: function(t) {
this._maxForce = t;
this._joint && this._joint.SetMaxForce(t);
}
},
maxTorque: {
tooltip: !1,
get: function() {
return this._maxTorque;
},
set: function(t) {
this._maxTorque = t;
this._joint && this._joint.SetMaxTorque(t);
}
},
correctionFactor: {
tooltip: !1,
get: function() {
return this._correctionFactor;
},
set: function(t) {
this._correctionFactor = t;
this._joint && this._joint.SetCorrectionFactor(t);
}
}
},
_createJointDef: function() {
var t = new b2.MotorJointDef();
t.linearOffset = new b2.Vec2(this.linearOffset.x / n, this.linearOffset.y / n);
t.angularOffset = this.angularOffset * o;
t.maxForce = this.maxForce;
t.maxTorque = this.maxTorque;
t.correctionFactor = this.correctionFactor;
return t;
}
});
cc.MotorJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 113
} ],
125: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = new b2.Vec2(), r = cc.Class({
name: "cc.MouseJoint",
extends: cc.Joint,
editor: !1,
properties: {
_target: 1,
_frequency: 5,
_dampingRatio: .7,
_maxForce: 0,
connectedBody: {
default: null,
type: cc.RigidBody,
visible: !1,
override: !0
},
collideConnected: {
default: !0,
visible: !1,
override: !0
},
anchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
connectedAnchor: {
tooltip: !1,
default: cc.v2(0, 0),
override: !0,
visible: !1
},
mouseRegion: {
tooltip: !1,
default: null,
type: cc.Node
},
target: {
tooltip: !1,
visible: !1,
get: function() {
return this._target;
},
set: function(t) {
this._target = t;
if (this._joint) {
o.x = t.x / n;
o.y = t.y / n;
this._joint.SetTarget(o);
}
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
},
maxForce: {
tooltip: !1,
visible: !1,
get: function() {
return this._maxForce;
},
set: function(t) {
this._maxForce = t;
this._joint && this._joint.SetMaxForce(t);
}
}
},
onLoad: function() {
var t = this.mouseRegion || this.node;
t.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
t.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
t.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
},
onEnable: function() {},
start: function() {},
onTouchBegan: function(t) {
var e = cc.director.getPhysicsManager(), i = this._pressPoint = t.touch.getLocation();
cc.Camera && cc.Camera.main && (i = cc.Camera.main.getCameraToWorldPoint(i));
var n = e.testPoint(i);
if (n) {
(this.connectedBody = n.body).awake = !0;
this.maxForce = 1e3 * this.connectedBody.getMass();
this.target = i;
this._init();
}
},
onTouchMove: function(t) {
this._pressPoint = t.touch.getLocation();
},
onTouchEnd: function(t) {
this._destroy();
this._pressPoint = null;
},
_createJointDef: function() {
var t = new b2.MouseJointDef();
o.x = this.target.x / n;
o.y = this.target.y / n;
t.target = o;
t.maxForce = this.maxForce;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
},
update: function() {
this._pressPoint && this._isValid() && (cc.Camera && cc.Camera.main ? this.target = cc.Camera.main.getCameraToWorldPoint(this._pressPoint) : this.target = this._pressPoint);
}
});
cc.MouseJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 113
} ],
126: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.PrismaticJoint",
extends: cc.Joint,
editor: !1,
properties: {
localAxisA: {
default: cc.v2(1, 0),
tooltip: !1
},
referenceAngle: {
default: 0,
tooltip: !1
},
enableLimit: {
default: !1,
tooltip: !1
},
enableMotor: {
default: !1,
tooltip: !1
},
lowerLimit: {
default: 0,
tooltip: !1
},
upperLimit: {
default: 0,
tooltip: !1
},
_maxMotorForce: 0,
_motorSpeed: 0,
maxMotorForce: {
tooltip: !1,
get: function() {
return this._maxMotorForce;
},
set: function(t) {
this._maxMotorForce = t;
this._joint && this._joint.SetMaxMotorForce(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t);
}
}
},
_createJointDef: function() {
var t = new b2.PrismaticJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
t.referenceAngle = this.referenceAngle * o;
t.enableLimit = this.enableLimit;
t.lowerTranslation = this.lowerLimit / n;
t.upperTranslation = this.upperLimit / n;
t.enableMotor = this.enableMotor;
t.maxMotorForce = this.maxMotorForce;
t.motorSpeed = this.motorSpeed;
return t;
}
});
cc.PrismaticJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 113
} ],
127: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = t("../CCPhysicsTypes").PHYSICS_ANGLE_TO_ANGLE, s = cc.Class({
name: "cc.RevoluteJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxMotorTorque: 0,
_motorSpeed: 0,
_enableLimit: !1,
_enableMotor: !1,
referenceAngle: {
default: 0,
tooltip: !1
},
lowerAngle: {
default: 0,
tooltip: !1
},
upperAngle: {
default: 0,
tooltip: !1
},
maxMotorTorque: {
tooltip: !1,
get: function() {
return this._maxMotorTorque;
},
set: function(t) {
this._maxMotorTorque = t;
this._joint && this._joint.SetMaxMotorTorque(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t * o);
}
},
enableLimit: {
tooltip: !1,
get: function() {
return this._enableLimit;
},
set: function(t) {
this._enableLimit = t;
this._joint && this._joint.EnableLimit(t);
}
},
enableMotor: {
tooltip: !1,
get: function() {
return this._enableMotor;
},
set: function(t) {
this._enableMotor = t;
this._joint && this._joint.EnableMotor(t);
}
}
},
getJointAngle: function() {
return this._joint ? this._joint.GetJointAngle() * r : 0;
},
_createJointDef: function() {
var t = new b2.RevoluteJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.lowerAngle = (this.upperAngle + 90) * o;
t.upperAngle = (this.lowerAngle + 90) * o;
t.maxMotorTorque = this.maxMotorTorque;
t.motorSpeed = this.motorSpeed * o;
t.enableLimit = this.enableLimit;
t.enableMotor = this.enableMotor;
t.referenceAngle = this.referenceAngle * o;
return t;
}
});
cc.RevoluteJoint = e.exports = s;
}), {
"../CCPhysicsTypes": 113
} ],
128: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = cc.Class({
name: "cc.RopeJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxLength: 1,
maxLength: {
tooltip: !1,
get: function() {
return this._maxLength;
},
set: function(t) {
this._maxLength = t;
this._joint && this._joint.SetMaxLength(t);
}
}
},
_createJointDef: function() {
var t = new b2.RopeJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.maxLength = this.maxLength / n;
return t;
}
});
cc.RopeJoint = e.exports = o;
}), {
"../CCPhysicsTypes": 113
} ],
129: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.WeldJoint",
extends: cc.Joint,
editor: !1,
properties: {
referenceAngle: {
default: 0,
tooltip: !1
},
_frequency: 0,
_dampingRatio: 0,
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.WeldJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.referenceAngle = this.referenceAngle * o;
t.frequencyHz = this.frequency;
t.dampingRatio = this.dampingRatio;
return t;
}
});
cc.WeldJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 113
} ],
130: [ (function(t, e, i) {
var n = t("../CCPhysicsTypes").PTM_RATIO, o = t("../CCPhysicsTypes").ANGLE_TO_PHYSICS_ANGLE, r = cc.Class({
name: "cc.WheelJoint",
extends: cc.Joint,
editor: !1,
properties: {
_maxMotorTorque: 0,
_motorSpeed: 0,
_enableMotor: !1,
_frequency: 2,
_dampingRatio: .7,
localAxisA: {
default: cc.v2(1, 0),
tooltip: !1
},
maxMotorTorque: {
tooltip: !1,
get: function() {
return this._maxMotorTorque;
},
set: function(t) {
this._maxMotorTorque = t;
this._joint && this._joint.SetMaxMotorTorque(t);
}
},
motorSpeed: {
tooltip: !1,
get: function() {
return this._motorSpeed;
},
set: function(t) {
this._motorSpeed = t;
this._joint && this._joint.SetMotorSpeed(t * o);
}
},
enableMotor: {
tooltip: !1,
get: function() {
return this._enableMotor;
},
set: function(t) {
this._enableMotor = t;
this._joint && this._joint.EnableMotor(t);
}
},
frequency: {
tooltip: !1,
get: function() {
return this._frequency;
},
set: function(t) {
this._frequency = t;
this._joint && this._joint.SetFrequency(t);
}
},
dampingRatio: {
tooltip: !1,
get: function() {
return this._dampingRatio;
},
set: function(t) {
this._dampingRatio = t;
this._joint && this._joint.SetDampingRatio(t);
}
}
},
_createJointDef: function() {
var t = new b2.WheelJointDef();
t.localAnchorA = new b2.Vec2(this.anchor.x / n, this.anchor.y / n);
t.localAnchorB = new b2.Vec2(this.connectedAnchor.x / n, this.connectedAnchor.y / n);
t.localAxisA = new b2.Vec2(this.localAxisA.x, this.localAxisA.y);
t.maxMotorTorque = this.maxMotorTorque;
t.motorSpeed = this.motorSpeed * o;
t.enableMotor = this.enableMotor;
t.dampingRatio = this.dampingRatio;
t.frequencyHz = this.frequency;
return t;
}
});
cc.WheelJoint = e.exports = r;
}), {
"../CCPhysicsTypes": 113
} ],
131: [ (function(t, e, i) {
e.exports = {
getWorldRotation: function(t) {
for (var e = t.rotationX, i = t.parent; i.parent; ) {
e += i.rotationX;
i = i.parent;
}
return e;
},
getWorldScale: function(t) {
for (var e = t.scaleX, i = t.scaleY, n = t.parent; n.parent; ) {
e *= n.scaleX;
i *= n.scaleY;
n = n.parent;
}
return cc.v2(e, i);
},
convertToNodeRotation: function(t, e) {
e -= t.rotationX;
for (var i = t.parent; i.parent; ) {
e -= i.rotationX;
i = i.parent;
}
return e;
}
};
}), {} ],
132: [ (function(i, n, o) {
function r(t) {
return t && (t.constructor === cc.SceneAsset || t instanceof cc.Scene);
}
function s(t, e) {
this.url = t;
this.type = e;
}
var c = i("../assets/CCAsset"), a = i("./utils").callInNextTick, h = i("../load-pipeline/CCLoader"), l = i("../load-pipeline/pack-downloader"), u = i("../load-pipeline/auto-release-utils"), d = i("../utils/decode-uuid"), f = i("../load-pipeline/md5-pipe"), p = "", _ = "", g = {}, v = {
loadAsset: function(i, n, o) {
if ("string" !== ("object" == (e = typeof i) ? t(i) : e)) return a(n, new Error("[AssetLibrary] uuid must be string"), null);
var s = {
uuid: i,
type: "uuid"
};
o && o.existingAsset && (s.existingAsset = o.existingAsset);
h.load(s, (function(t, e) {
if (t || !e) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + (t ? t.message : "Unknown error")); else {
if (e.constructor === cc.SceneAsset) {
var o = cc.loader._getReferenceKey(i);
e.scene.dependAssets = u.getDependsRecursively(o);
}
if (r(e)) {
var s = cc.loader._getReferenceKey(i);
h.removeItem(s);
}
}
n && n(t, e);
}));
},
getLibUrlNoExt: function(t) {
t = d(t);
return p + t.slice(0, 2) + "/" + t;
},
_queryAssetInfoInEditor: function(t, e) {
0;
},
_getAssetInfoInRuntime: function(t, e) {
e = e || {
url: null,
raw: !1
};
var i = g[t];
if (i && !cc.isChildClassOf(i.type, cc.Asset)) {
e.url = _ + i.url;
e.raw = !0;
} else {
e.url = this.getLibUrlNoExt(t) + ".json";
e.raw = !1;
}
return e;
},
_getAssetUrl: function(t) {
var e = g[t];
return e ? _ + e.url : null;
},
queryAssetInfo: function(t, e) {
var i = this._getAssetInfoInRuntime(t);
e(null, i.url, i.raw);
},
parseUuidInEditor: function(t) {},
loadJson: function(t, e) {
var i = "" + (new Date().getTime() + Math.random()), n = {
uuid: i,
type: "uuid",
content: t,
skips: [ h.assetLoader.id, h.downloader.id ]
};
h.load(n, (function(t, n) {
if (t) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + t.message); else {
if (n.constructor === cc.SceneAsset) {
var o = cc.loader._getReferenceKey(i);
n.scene.dependAssets = u.getDependsRecursively(o);
}
if (r(n)) {
var s = cc.loader._getReferenceKey(i);
h.removeItem(s);
}
}
n._uuid = "";
e && e(t, n);
}));
},
getAssetByUuid: function(t) {
return v._uuidToAsset[t] || null;
},
init: function(t) {
0;
var e = t.libraryPath;
e = e.replace(/\\/g, "/");
p = cc.path.stripSep(e) + "/";
_ = t.rawAssetsBase;
var i = t.md5AssetsMap;
if (i) {
var n = new f(i, p, _);
cc.loader.insertPipeAfter(cc.loader.assetLoader, n);
cc.loader.md5Pipe = n;
}
var o = h._resources;
o.reset();
var r = t.rawAssets;
if (r) {
var a = "resources/";
for (var u in r) {
var d = r[u];
for (var v in d) {
var y = d[v], m = y[0], b = y[1], C = cc.js._getClassById(b);
if (C) {
g[v] = new s(u + "/" + m, C);
if ("assets" === u && m.startsWith(a)) {
if (cc.isChildClassOf(C, c)) {
var T = cc.path.extname(m);
m = T ? m.slice(a.length, -T.length) : m.slice(a.length);
} else m = m.slice(a.length);
var S = 1 === y[2];
o.add(m, v, C, !S);
}
} else cc.error("Cannot get", b);
}
}
}
t.packedAssets && l.initPacks(t.packedAssets);
var E = t.mountPaths;
E || (E = {
assets: _ + "assets",
internal: _ + "internal"
});
cc.url._init(E);
}
};
v._uuidToAsset = {};
n.exports = cc.AssetLibrary = v;
}), {
"../assets/CCAsset": 25,
"../load-pipeline/CCLoader": 94,
"../load-pipeline/auto-release-utils": 97,
"../load-pipeline/md5-pipe": 103,
"../load-pipeline/pack-downloader": 104,
"../utils/decode-uuid": 157,
"./utils": 153
} ],
133: [ (function(i, n, o) {
function r(t, e) {
t.indexOf(e) < 0 && t.push(e);
}
function s(t, e) {
0;
r(t.__props__, e);
}
function c(t, e, i, n, o) {
var r = n.default;
0;
T.setClassAttr(t, i, "default", r);
s(t, i);
var c = y(t, n, e, i, !1);
if (c) {
for (var a = I, h = 0; h < c.length; h++) {
var l = c[h];
T.attr(t, i, l);
l._onAfterProp && a.push(l._onAfterProp);
}
for (var u = 0; u < a.length; u++) a[u](t, i);
I.length = 0;
c.length = 0;
}
}
function a(t, e, i, n, o) {
var r = n.get, s = n.set, c = t.prototype, a = Object.getOwnPropertyDescriptor(c, i), h = !a;
if (r) {
0;
for (var l = y(t, n, e, i, !0), u = 0; u < l.length; u++) T.attr(t, i, l[u]);
l.length = 0;
T.setClassAttr(t, i, "serializable", !1);
0;
o || m.get(c, i, r, h, h);
0;
}
if (s) {
if (!o) {
0;
m.set(c, i, s, h, h);
}
0;
}
}
function h(i) {
return "function" === ("object" == (e = typeof i) ? t(i) : e) ? i() : i;
}
function l(t, e, i) {
for (var n in e) t.hasOwnProperty(n) || i && !i(n) || Object.defineProperty(t, n, m.getPropertyDescriptor(e, n));
}
function u(t, e, i, n) {
var o, s, c = n.__ctor__, a = n.ctor, h = n.__ES6__;
if (h) {
o = [ a ];
s = a;
} else {
o = c ? [ c ] : (function(t, e, i) {
function n(t) {
return v._isCCClass(t) ? t.__ctors__ || [] : [ t ];
}
for (var o = [], s = [ t ].concat(e), c = 0; c < s.length; c++) {
var a = s[c];
if (a) for (var h = n(a), l = 0; l < h.length; l++) r(o, h[l]);
}
var u = i.ctor;
u && o.push(u);
return o;
})(e, i, n);
s = N(o, e, t, n);
m.value(s, "extend", (function(t) {
t.extends = this;
return v(t);
}), !0);
}
m.value(s, "__ctors__", o.length > 0 ? o : null, !0);
var u = s.prototype;
if (e) {
if (!h) {
m.extend(s, e);
u = s.prototype;
}
m.value(s, "$super", e);
0;
}
if (i) {
for (var d = i.length - 1; d >= 0; d--) {
var f = i[d];
l(u, f.prototype);
l(s, f, (function(t) {
return f.hasOwnProperty(t) && !0;
}));
v._isCCClass(f) && l(T.getClassAttrs(s).constructor.prototype, T.getClassAttrs(f).constructor.prototype);
}
u.constructor = s;
}
h || (u.__initProps__ = p);
m.setClassName(t, s);
return s;
}
function d(i) {
for (var n = m.getClassName(i), o = i.constructor, r = "new " + n + "(", s = 0; s < o.__props__.length; s++) {
var c = i[o.__props__[s]];
if ("object" === ("object" == (e = typeof c) ? t(c) : e)) {
cc.errorID(3641, n);
return "new " + n + "()";
}
r += c;
s < o.__props__.length - 1 && (r += ",");
}
return r + ")";
}
function f(t) {
return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}
function p(i) {
var n = T.getClassAttrs(i), o = i.__props__;
if (null === o) {
w.init();
o = i.__props__;
}
var r = (function(i, n) {
for (var o = [], r = "", s = 0; s < n.length; s++) {
var c = n[s], a = c + S + "default";
if (a in i) {
var h;
h = O.test(c) ? "this." + c + "=" : "this[" + f(c) + "]=";
var l, u = i[a];
if ("object" === ("object" == (e = typeof u) ? t(u) : e) && u) l = u instanceof cc.ValueType ? d(u) : Array.isArray(u) ? "[]" : "{}"; else if ("function" === ("object" == (e = typeof u) ? t(u) : e)) {
var p = o.length;
o.push(u);
l = "F[" + p + "]()";
} else l = "string" === ("object" == (e = typeof u) ? t(u) : e) ? f(u) : u;
r += h = h + l + ";\n";
}
}
return 0 === o.length ? Function(r) : Function("F", "return (function(){\n" + r + "})")(o);
})(n, o);
i.prototype.__initProps__ = r;
r.call(this);
}
function _(i, n, o) {
var r = !1;
for (var s in n) if (!(x.indexOf(s) >= 0)) {
var c = n[s];
if ("function" === ("object" == (e = typeof c) ? t(c) : e)) {
var a = m.getPropertyDescriptor(i.prototype, s);
if (a) {
var h = a.value;
if ("function" === ("object" == (e = typeof h) ? t(h) : e)) {
if (L.test(c)) {
r = !0;
n[s] = (function(t, e) {
return function() {
var i = this._super;
this._super = t;
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(h, c);
}
continue;
}
}
0;
}
}
return r;
}
function g(t, e, i, n, o, r) {
t.__props__ = [];
n && n.__props__ && (t.__props__ = n.__props__.slice());
if (o) for (var s = 0; s < o.length; ++s) {
var h = o[s];
h.__props__ && (t.__props__ = t.__props__.concat(h.__props__.filter((function(e) {
return t.__props__.indexOf(e) < 0;
}))));
}
if (i) {
A.preprocessAttrs(i, e, t, r);
for (var l in i) {
var u = i[l];
"default" in u ? c(t, e, l, u) : a(t, e, l, u, r);
}
}
}
function v(i) {
var n = (i = i || {}).name, o = i.extends, r = i.mixins, s = (function(t, e, i, n) {
var o = cc.Component, r = cc._RF.peek();
if (r && cc.isChildClassOf(e, o)) {
if (cc.isChildClassOf(r.cls, o)) {
cc.errorID(3615);
return null;
}
t = t || r.script;
}
var s = u(t, e, i, n);
if (r) if (cc.isChildClassOf(e, o)) {
var c = r.uuid;
c && m._setClassId(c, s);
r.cls = s;
} else cc.isChildClassOf(r.cls, o) || (r.cls = s);
return s;
})(n, o, r, i);
n || (n = cc.js.getClassName(s));
var c = i.properties;
if ("function" === ("object" == (e = typeof c) ? t(c) : e) || o && null === o.__props__ || r && r.some((function(t) {
return null === t.__props__;
}))) {
w.push({
cls: s,
props: c,
mixins: r
});
s.__props__ = null;
} else g(s, n, c, o, i.mixins, i.__ES6__);
var a = i.statics;
if (a) {
var h;
0;
for (h in a) s[h] = a[h];
}
for (var l in i) if (!(x.indexOf(l) >= 0)) {
var d = i[l];
A.validateMethodWithProps(d, l, n, s, o) && m.value(s.prototype, l, d, !0, !0);
}
var f = i.editor;
f && cc.isChildClassOf(o, cc.Component) && cc.Component._registerEditorProps(s, f);
return s;
}
function y(i, n, o, r, s) {
function c() {
l = r + S;
return h = T.getClassAttrsProto(i);
}
function a(i, o) {
if (i in n) {
var r = n[i];
("object" == (e = typeof r) ? t(r) : e) === o && ((h || c())[l + i] = r);
}
}
var h = null, l = "";
R.length = 0;
var u = R, d = n.type;
if (d) {
var f = P[d];
if (f) u.push({
type: d,
_onAfterProp: E(f, "cc." + d)
}); else if ("Object" === d) 0; else if (d === T.ScriptUuid) {
var p = T.ObjectType(cc.ScriptAsset);
p.type = "Script";
u.push(p);
} else "object" === ("object" == (e = typeof d) ? t(d) : e) ? b.isEnum(d) && u.push({
type: "Enum",
enumList: b.getList(d)
}) : "function" === ("object" == (e = typeof d) ? t(d) : e) && (n.url ? u.push({
type: "Object",
ctor: d,
_onAfterProp: E("String", "cc.String")
}) : u.push(n._short ? {
type: "Object",
ctor: d
} : T.ObjectType(d)));
}
n.editorOnly && ((h || c())[l + "editorOnly"] = !0);
0;
n.url && ((h || c())[l + "saveUrlAsAsset"] = !0);
!1 === n.serializable && ((h || c())[l + "serializable"] = !1);
a("formerlySerializedAs", "string");
0;
var _ = n.range;
if (_) if (Array.isArray(_)) if (_.length >= 2) {
(h || c())[l + "min"] = _[0];
h[l + "max"] = _[1];
_.length > 2 && (h[l + "step"] = _[2]);
} else 0; else 0;
a("min", "number");
a("max", "number");
a("step", "number");
return u;
}
var m = i("./js"), b = i("./CCEnum"), C = i("./utils"), T = (C.isPlainEmptyObj_DEV, 
C.cloneable_DEV, i("./attribute")), S = T.DELIMETER, E = T.getTypeChecker, A = i("./preprocess-class");
i("./requiring-frame");
var x = [ "name", "extends", "mixins", "ctor", "__ctor__", "properties", "statics", "editor", "__ES6__" ], w = {
datas: null,
push: function(t) {
if (this.datas) this.datas.push(t); else {
this.datas = [ t ];
var e = this;
setTimeout((function() {
e.init();
}), 0);
}
},
init: function() {
var i = this.datas;
if (i) {
for (var n = 0; n < i.length; ++n) {
var o = i[n], r = o.cls, s = o.props;
"function" === ("object" == (e = typeof s) ? t(s) : e) && (s = s());
var c = m.getClassName(r);
s ? g(r, c, s, r.$super, o.mixins) : cc.errorID(3633, c);
}
this.datas = null;
}
}
}, I = [], O = /^[$A-Za-z_][0-9A-Za-z_$]*$/, N = function(t, e, i, n) {
var o = "return function CCClass(){\n";
e && _(e, n) && (o += "this._super=null;\n");
o += "this.__initProps__(CCClass);\n";
var r = t.length;
if (r > 0) {
var s = !(i && i.startsWith("cc."));
s && (o += "try{\n");
var c = "].apply(this,arguments);\n";
if (1 === r) o += "CCClass.__ctors__[0" + c; else {
o += "var cs=CCClass.__ctors__;\n";
for (var a = 0; a < r; a++) o += "cs[" + a + c;
}
s && (o += "}catch(e){\ncc._throw(e);\n}\n");
}
o += "}";
return Function(o)();
}, L = /xyz/.test((function() {
xyz;
})) ? /\b\._super\b/ : /.*/;
/xyz/.test((function() {
xyz;
}));
v._isCCClass = function(t) {
return t && t.hasOwnProperty("__ctors__");
};
v._fastDefine = function(t, e, i) {
m.setClassName(t, e);
for (var n = e.__props__ = Object.keys(i), o = T.getClassAttrsProto(e), r = 0; r < n.length; r++) {
var s = n[r];
o[s + S + "visible"] = !1;
o[s + S + "default"] = i[s];
}
};
v.Attr = T;
v.attr = T.attr;
cc.isChildClassOf = function(i, n) {
if (i && n) {
if ("function" !== ("object" == (e = typeof i) ? t(i) : e)) return !1;
if ("function" !== ("object" == (e = typeof n) ? t(n) : e)) {
0;
return !1;
}
if (i === n) return !0;
for (;;) {
if (!(i = m.getSuper(i))) return !1;
if (i === n) return !0;
}
}
return !1;
};
v.getInheritanceChain = function(t) {
for (var e = []; t = m.getSuper(t); ) t !== Object && e.push(t);
return e;
};
var P = {
Integer: "Number",
Float: "Number",
Boolean: "Boolean",
String: "String"
}, R = [];
cc.Class = v;
n.exports = {
isArray: function(t) {
t = h(t);
return Array.isArray(t);
},
fastDefine: v._fastDefine,
getNewValueTypeCode: d,
IDENTIFIER_RE: O,
escapeForJS: f,
getDefault: h
};
0;
}), {
"./CCEnum": 135,
"./attribute": 141,
"./js": 149,
"./preprocess-class": 150,
"./requiring-frame": 151,
"./utils": 153
} ],
134: [ (function(i, n, o) {
function r(t) {
return t;
}
function s(t, e) {
return t[e] || (t[e] = {});
}
function c(i) {
return function(n) {
return "function" === ("object" == (e = typeof n) ? t(n) : e) ? i(n) : function(t) {
return i(t, n);
};
};
}
function a(t, e, i) {
return function(t) {
0;
return function(i) {
return e(i, t);
};
};
}
function h(t) {
return a.bind(null, !1);
}
function l(t, e) {
0;
return s(t, g);
}
function u(i, n, o, r, s, c) {
var a = r && (p.getFullFormOfProperty(r) || r), h = n[o], l = _.mixin(h || {}, a || {});
if (s && (s.get || s.set)) {
s.get && (l.get = s.get);
s.set && (l.set = s.set);
} else {
0;
var u = void 0;
if (s) {
if (s.initializer) {
u = (function(i) {
var n;
try {
n = i();
} catch (t) {
return i;
}
return "object" !== ("object" == (e = typeof n) ? t(n) : e) || null === n ? n : i;
})(s.initializer);
!0;
}
} else {
var d = c.default || (c.default = (function(t) {
var e;
try {
e = new t();
} catch (t) {
return {};
}
return e;
})(i));
if (d.hasOwnProperty(o)) {
u = d[o];
!0;
}
}
0;
l.default = u;
}
n[o] = l;
}
function d(t, e, i) {
return t((function(t, n) {
var o = l(t);
if (o) {
var r = void 0 !== i ? i : n;
s(s(o, "proto"), "editor")[e] = r;
}
}), e);
}
function f(t) {
return t(r);
}
i("./CCClass");
var p = i("./preprocess-class"), _ = i("./js"), g = "__ccclassCache__", v = a.bind(null, !1), y = h(), m = h(), b = c((function(t, e) {
var i = _.getSuper(t);
i === Object && (i = null);
var n = {
name: e,
extends: i,
ctor: t,
__ES6__: !0
}, o = t[g];
if (o) {
var r = o.proto;
r && _.mixin(n, r);
t[g] = void 0;
}
return cc.Class(n);
})), C = f(c), T = d(v, "requireComponent"), S = f(y), E = d(m, "executionOrder"), A = f(c), x = f(c), w = f(y), I = f(y), O = f(y);
cc._decorator = n.exports = {
ccclass: b,
property: function(i, n, o) {
function r(t, e, i) {
var n = l(t.constructor);
if (n) {
var o = s(s(n, "proto"), "properties");
u(t.constructor, o, e, c, i, n);
}
}
var c = null;
if ("undefined" === ("object" == (e = typeof n) ? t(n) : e)) {
c = i;
return r;
}
r(i, n, o);
},
executeInEditMode: C,
requireComponent: T,
menu: S,
executionOrder: E,
disallowMultiple: A,
playOnFocus: x,
inspector: w,
icon: I,
help: O,
mixins: function() {
for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
return function(e) {
var i = l(e);
i && (s(i, "proto").mixins = t);
};
}
};
}), {
"./CCClass": 133,
"./js": 149,
"./preprocess-class": 150,
"./utils": 153
} ],
135: [ (function(i, n, o) {
function r(i) {
if ("__enums__" in i) return i;
s.value(i, "__enums__", null, !0);
for (var n = -1, o = Object.keys(i), r = 0; r < o.length; r++) {
var c = o[r], a = i[c];
if (-1 === a) {
a = ++n;
i[c] = a;
} else if ("number" === ("object" == (e = typeof a) ? t(a) : e)) n = a; else if ("string" === ("object" == (e = typeof a) ? t(a) : e) && Number.isInteger(parseFloat(c))) continue;
var h = "" + a;
if (c !== h) {
0;
s.value(i, h, c);
}
}
return i;
}
var s = i("./js");
r.isEnum = function(t) {
return t && t.hasOwnProperty("__enums__");
};
r.getList = function(t) {
if (t.__enums__) return t.__enums__;
var e = t.__enums__ = [];
for (var i in t) {
var n = t[i];
Number.isInteger(n) && e.push({
name: i,
value: n
});
}
e.sort((function(t, e) {
return t.value - e.value;
}));
return e;
};
n.exports = cc.Enum = r;
}), {
"./js": 149
} ],
136: [ (function(t, e, i) {
t("./_CCClass");
cc.KEY = {
none: 0,
back: 6,
menu: 18,
backspace: 8,
tab: 9,
enter: 13,
shift: 16,
ctrl: 17,
alt: 18,
pause: 19,
capslock: 20,
escape: 27,
space: 32,
pageup: 33,
pagedown: 34,
end: 35,
home: 36,
left: 37,
up: 38,
right: 39,
down: 40,
select: 41,
insert: 45,
Delete: 46,
0: 48,
1: 49,
2: 50,
3: 51,
4: 52,
5: 53,
6: 54,
7: 55,
8: 56,
9: 57,
a: 65,
b: 66,
c: 67,
d: 68,
e: 69,
f: 70,
g: 71,
h: 72,
i: 73,
j: 74,
k: 75,
l: 76,
m: 77,
n: 78,
o: 79,
p: 80,
q: 81,
r: 82,
s: 83,
t: 84,
u: 85,
v: 86,
w: 87,
x: 88,
y: 89,
z: 90,
num0: 96,
num1: 97,
num2: 98,
num3: 99,
num4: 100,
num5: 101,
num6: 102,
num7: 103,
num8: 104,
num9: 105,
"*": 106,
"+": 107,
"-": 109,
numdel: 110,
"/": 111,
f1: 112,
f2: 113,
f3: 114,
f4: 115,
f5: 116,
f6: 117,
f7: 118,
f8: 119,
f9: 120,
f10: 121,
f11: 122,
f12: 123,
numlock: 144,
scrolllock: 145,
";": 186,
semicolon: 186,
equal: 187,
"=": 187,
",": 188,
comma: 188,
dash: 189,
".": 190,
period: 190,
forwardslash: 191,
grave: 192,
"[": 219,
openbracket: 219,
backslash: 220,
"]": 221,
closebracket: 221,
quote: 222,
dpadLeft: 1e3,
dpadRight: 1001,
dpadUp: 1003,
dpadDown: 1004,
dpadCenter: 1005
};
cc.ImageFormat = cc.Enum({
JPG: 0,
PNG: 1,
TIFF: 2,
WEBP: 3,
PVR: 4,
ETC: 5,
S3TC: 6,
ATITC: 7,
TGA: 8,
RAWDATA: 9,
UNKNOWN: 10
});
cc.getImageFormatByData = function(t) {
return t.length > 8 && 137 === t[0] && 80 === t[1] && 78 === t[2] && 71 === t[3] && 13 === t[4] && 10 === t[5] && 26 === t[6] && 10 === t[7] ? cc.ImageFormat.PNG : t.length > 2 && (73 === t[0] && 73 === t[1] || 77 === t[0] && 77 === t[1] || 255 === t[0] && 216 === t[1]) ? cc.ImageFormat.TIFF : cc.ImageFormat.UNKNOWN;
};
cc.macro = {
INVALID_INDEX: -1,
NODE_TAG_INVALID: -1,
PI: Math.PI,
PI2: 2 * Math.PI,
FLT_MAX: parseFloat("3.402823466e+38F"),
FLT_MIN: parseFloat("1.175494351e-38F"),
RAD: Math.PI / 180,
DEG: 180 / Math.PI,
UINT_MAX: 4294967295,
REPEAT_FOREVER: 4294967295,
FLT_EPSILON: 1.192092896e-7,
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_ALPHA_SATURATE: 776,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775,
ONE_MINUS_CONSTANT_ALPHA: 32772,
ONE_MINUS_CONSTANT_COLOR: 32770,
LINEAR: 9729,
BLEND_DST: 771,
WEB_ORIENTATION_PORTRAIT: 0,
WEB_ORIENTATION_LANDSCAPE_LEFT: -90,
WEB_ORIENTATION_PORTRAIT_UPSIDE_DOWN: 180,
WEB_ORIENTATION_LANDSCAPE_RIGHT: 90,
ORIENTATION_PORTRAIT: 1,
ORIENTATION_LANDSCAPE: 2,
ORIENTATION_AUTO: 3,
DENSITYDPI_DEVICE: "device-dpi",
DENSITYDPI_HIGH: "high-dpi",
DENSITYDPI_MEDIUM: "medium-dpi",
DENSITYDPI_LOW: "low-dpi",
VERTEX_ATTRIB_FLAG_NONE: 0,
VERTEX_ATTRIB_FLAG_POSITION: 1,
VERTEX_ATTRIB_FLAG_COLOR: 2,
VERTEX_ATTRIB_FLAG_TEX_COORDS: 4,
VERTEX_ATTRIB_FLAG_POS_COLOR_TEX: 7,
GL_ALL: 0,
VERTEX_ATTRIB_POSITION: 0,
VERTEX_ATTRIB_COLOR: 1,
VERTEX_ATTRIB_TEX_COORDS: 2,
VERTEX_ATTRIB_MAX: 3,
UNIFORM_PMATRIX: 0,
UNIFORM_MVMATRIX: 1,
UNIFORM_MVPMATRIX: 2,
UNIFORM_TIME: 3,
UNIFORM_SINTIME: 4,
UNIFORM_COSTIME: 5,
UNIFORM_RANDOM01: 6,
UNIFORM_SAMPLER: 7,
UNIFORM_MAX: 8,
SHADER_POSITION_TEXTURECOLOR: "ShaderPositionTextureColor",
SHADER_SPRITE_POSITION_TEXTURECOLOR: "ShaderSpritePositionTextureColor",
SHADER_POSITION_TEXTURECOLORALPHATEST: "ShaderPositionTextureColorAlphaTest",
SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST: "ShaderSpritePositionTextureColorAlphaTest",
SHADER_POSITION_COLOR: "ShaderPositionColor",
SHADER_SPRITE_POSITION_COLOR: "ShaderSpritePositionColor",
SHADER_POSITION_TEXTURE: "ShaderPositionTexture",
SHADER_POSITION_TEXTURE_UCOLOR: "ShaderPositionTexture_uColor",
SHADER_POSITION_TEXTUREA8COLOR: "ShaderPositionTextureA8Color",
SHADER_POSITION_UCOLOR: "ShaderPosition_uColor",
SHADER_POSITION_LENGTHTEXTURECOLOR: "ShaderPositionLengthTextureColor",
UNIFORM_PMATRIX_S: "CC_PMatrix",
UNIFORM_MVMATRIX_S: "CC_MVMatrix",
UNIFORM_MVPMATRIX_S: "CC_MVPMatrix",
UNIFORM_TIME_S: "CC_Time",
UNIFORM_SINTIME_S: "CC_SinTime",
UNIFORM_COSTIME_S: "CC_CosTime",
UNIFORM_RANDOM01_S: "CC_Random01",
UNIFORM_SAMPLER_S: "CC_Texture0",
UNIFORM_ALPHA_TEST_VALUE_S: "CC_alpha_value",
ATTRIBUTE_NAME_COLOR: "a_color",
ATTRIBUTE_NAME_POSITION: "a_position",
ATTRIBUTE_NAME_TEX_COORD: "a_texCoord",
ITEM_SIZE: 32,
CURRENT_ITEM: 3233828865,
ZOOM_ACTION_TAG: 3233828866,
NORMAL_TAG: 8801,
SELECTED_TAG: 8802,
DISABLE_TAG: 8803,
FIX_ARTIFACTS_BY_STRECHING_TEXEL: 0,
FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: 1,
DIRECTOR_STATS_POSITION: cc.p(0, 0),
DIRECTOR_FPS_INTERVAL: .5,
COCOSNODE_RENDER_SUBPIXEL: 1,
SPRITEBATCHNODE_RENDER_SUBPIXEL: 1,
AUTO_PREMULTIPLIED_ALPHA_FOR_PNG: 0,
OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA: 0,
TEXTURE_NPOT_SUPPORT: 0,
USE_LA88_LABELS: 1,
SPRITE_DEBUG_DRAW: 0,
LABELBMFONT_DEBUG_DRAW: 0,
LABELATLAS_DEBUG_DRAW: 0,
ENABLE_STACKABLE_ACTIONS: 1,
ENABLE_GL_STATE_CACHE: 1,
TOUCH_TIMEOUT: 5e3,
BATCH_VERTEX_COUNT: 2e4,
ENABLE_GC_FOR_NATIVE_OBJECTS: !0,
ENABLE_TILEDMAP_CULLING: !0,
DOWNLOAD_MAX_CONCURRENT: 64,
ENABLE_TRANSPARENT_CANVAS: !1
};
var n = !0;
cc.defineGetterSetter(cc.macro, "ENABLE_CULLING", (function() {
return n;
}), (function(t) {
n = t;
var e = cc.director.getScene();
if (e) {
e._sgNode.markCullingDirty();
cc.director.setCullingEnabled(t);
}
}));
cc.defineGetterSetter(cc.macro, "BLEND_SRC", (function() {
return cc._renderType === cc.game.RENDER_TYPE_WEBGL && cc.macro.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? cc.macro.ONE : cc.macro.SRC_ALPHA;
}));
cc.lerp = function(t, e, i) {
return t + (e - t) * i;
};
cc.rand = function() {
return 16777215 * Math.random();
};
cc.randomMinus1To1 = function() {
return 2 * (Math.random() - .5);
};
cc.random0To1 = Math.random;
cc.degreesToRadians = function(t) {
return t * cc.macro.RAD;
};
cc.radiansToDegrees = function(t) {
return t * cc.macro.DEG;
};
cc.nodeDrawSetup = function(t) {
if (t._shaderProgram) {
t._shaderProgram.use();
t._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4();
}
};
cc.incrementGLDraws = function(t) {
cc.g_NumberOfDraws += t;
};
cc.checkGLErrorDebug = function() {
if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
var t = cc._renderContext.getError();
t && cc.logID(2400, t);
}
};
e.exports = cc.macro;
}), {
"./_CCClass": 140
} ],
137: [ (function(i, n, o) {
function r() {
this._name = "";
this._objFlags = 0;
}
function s() {
for (var t = l.length, e = 0; e < t; ++e) {
var i = l[e];
i._objFlags & h || i._destroyImmediate();
}
t === l.length ? l.length = 0 : l.splice(0, t);
0;
}
var c = i("./js"), a = i("./CCClass"), h = 1;
a.fastDefine("cc.Object", r, {
_name: "",
_objFlags: 0
});
c.value(r, "Flags", {
Destroyed: h,
DontSave: 8,
EditorOnly: 16,
Dirty: 32,
DontDestroy: 64,
PersistentMask: -4192741,
Destroying: 128,
Deactivating: 256,
IsPreloadStarted: 8192,
IsOnLoadStarted: 32768,
IsOnLoadCalled: 16384,
IsOnEnableCalled: 2048,
IsStartCalled: 65536,
IsEditorOnEnableCalled: 4096,
IsPositionLocked: 1 << 21,
IsRotationLocked: 1 << 17,
IsScaleLocked: 1 << 18,
IsAnchorLocked: 1 << 19,
IsSizeLocked: 1 << 20
});
var l = [];
c.value(r, "_deferredDestroy", s);
0;
var u = r.prototype;
c.getset(u, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}));
c.get(u, "isValid", (function() {
return !(this._objFlags & h);
}));
0;
u.destroy = function() {
if (this._objFlags & h) {
cc.warnID(5e3);
return !1;
}
if (4 & this._objFlags) return !1;
this._objFlags |= 4;
l.push(this);
0;
return !0;
};
0;
u._destruct = function() {
var i = this.constructor, n = i.__destruct__;
if (!n) {
n = (function(i, n) {
var o, r = {};
for (o in i) if (i.hasOwnProperty(o)) switch ("object" == (e = typeof i[o]) ? t(i[o]) : e) {
case "string":
r[o] = "";
break;

case "object":
case "function":
r[o] = null;
}
if (cc.Class._isCCClass(n)) for (var s = cc.Class.Attr.getClassAttrs(n), c = n.__props__, h = 0; h < c.length; h++) {
var l = (o = c[h]) + cc.Class.Attr.DELIMETER + "default";
if (l in s) switch ("object" == (e = typeof s[l]) ? t(s[l]) : e) {
case "string":
r[o] = "";
break;

case "object":
case "function":
r[o] = null;
break;

case "undefined":
r[o] = void 0;
}
}
var u = i instanceof cc._BaseNode || i instanceof cc.Component, d = "";
for (o in r) if (!u || "_id" !== o) {
var f;
f = a.IDENTIFIER_RE.test(o) ? "o." + o + "=" : "o[" + a.escapeForJS(o) + "]=";
var p = r[o];
"" === p && (p = '""');
d += f + p + ";\n";
}
return Function("o", d);
})(this, i);
c.value(i, "__destruct__", n, !0);
}
n(this);
};
u._onPreDestroy = null;
u._destroyImmediate = function() {
if (this._objFlags & h) cc.errorID(5e3); else {
this._onPreDestroy && this._onPreDestroy();
this._destruct();
this._objFlags |= h;
}
};
0;
u._deserialize = null;
cc.isValid = function(i) {
return "object" === ("object" == (e = typeof i) ? t(i) : e) ? !(!i || i._objFlags & h) : "undefined" !== ("object" == (e = typeof i) ? t(i) : e);
};
0;
cc.Object = n.exports = r;
}), {
"./CCClass": 133,
"./js": 149
} ],
138: [ (function(i, n, o) {
if (!cc.sys) {
cc.sys = {};
var r = cc.sys;
r.LANGUAGE_ENGLISH = "en";
r.LANGUAGE_CHINESE = "zh";
r.LANGUAGE_FRENCH = "fr";
r.LANGUAGE_ITALIAN = "it";
r.LANGUAGE_GERMAN = "de";
r.LANGUAGE_SPANISH = "es";
r.LANGUAGE_DUTCH = "du";
r.LANGUAGE_RUSSIAN = "ru";
r.LANGUAGE_KOREAN = "ko";
r.LANGUAGE_JAPANESE = "ja";
r.LANGUAGE_HUNGARIAN = "hu";
r.LANGUAGE_PORTUGUESE = "pt";
r.LANGUAGE_ARABIC = "ar";
r.LANGUAGE_NORWEGIAN = "no";
r.LANGUAGE_POLISH = "pl";
r.LANGUAGE_TURKISH = "tr";
r.LANGUAGE_UKRAINIAN = "uk";
r.LANGUAGE_ROMANIAN = "ro";
r.LANGUAGE_BULGARIAN = "bg";
r.LANGUAGE_UNKNOWN = "unknown";
r.OS_IOS = "iOS";
r.OS_ANDROID = "Android";
r.OS_WINDOWS = "Windows";
r.OS_MARMALADE = "Marmalade";
r.OS_LINUX = "Linux";
r.OS_BADA = "Bada";
r.OS_BLACKBERRY = "Blackberry";
r.OS_OSX = "OS X";
r.OS_WP8 = "WP8";
r.OS_WINRT = "WINRT";
r.OS_UNKNOWN = "Unknown";
r.UNKNOWN = -1;
r.WIN32 = 0;
r.LINUX = 1;
r.MACOS = 2;
r.ANDROID = 3;
r.IPHONE = 4;
r.IPAD = 5;
r.BLACKBERRY = 6;
r.NACL = 7;
r.EMSCRIPTEN = 8;
r.TIZEN = 9;
r.WINRT = 10;
r.WP8 = 11;
r.MOBILE_BROWSER = 100;
r.DESKTOP_BROWSER = 101;
r.EDITOR_PAGE = 102;
r.EDITOR_CORE = 103;
r.WECHAT_GAME = 104;
r.BROWSER_TYPE_WECHAT = "wechat";
r.BROWSER_TYPE_WECHAT_GAME = "wechatgame";
r.BROWSER_TYPE_ANDROID = "androidbrowser";
r.BROWSER_TYPE_IE = "ie";
r.BROWSER_TYPE_QQ = "qqbrowser";
r.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
r.BROWSER_TYPE_UC = "ucbrowser";
r.BROWSER_TYPE_360 = "360browser";
r.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
r.BROWSER_TYPE_BAIDU = "baidubrowser";
r.BROWSER_TYPE_MAXTHON = "maxthon";
r.BROWSER_TYPE_OPERA = "opera";
r.BROWSER_TYPE_OUPENG = "oupeng";
r.BROWSER_TYPE_MIUI = "miuibrowser";
r.BROWSER_TYPE_FIREFOX = "firefox";
r.BROWSER_TYPE_SAFARI = "safari";
r.BROWSER_TYPE_CHROME = "chrome";
r.BROWSER_TYPE_LIEBAO = "liebao";
r.BROWSER_TYPE_QZONE = "qzone";
r.BROWSER_TYPE_SOUGOU = "sogou";
r.BROWSER_TYPE_UNKNOWN = "unknown";
r.isNative = !1;
r.isBrowser = "object" === ("object" == (e = typeof window) ? t(window) : e) && "object" === ("object" == (e = typeof document) ? t(document) : e) && !0;
cc.create3DContext = function(t, e, i) {
if (!i) return cc.create3DContext(t, e, "webgl") || cc.create3DContext(t, e, "experimental-webgl") || cc.create3DContext(t, e, "webkit-3d") || cc.create3DContext(t, e, "moz-webgl") || null;
try {
return t.getContext(i, e);
} catch (t) {
return null;
}
};
var s = window, c = s.navigator, a = document, h = a.documentElement, l = c.userAgent.toLowerCase();
r.isMobile = /mobile|android|iphone|ipad/.test(l);
r.platform = r.isMobile ? r.MOBILE_BROWSER : r.DESKTOP_BROWSER;
var u = c.language;
u = (u = u || c.browserLanguage) ? u.split("-")[0] : r.LANGUAGE_ENGLISH;
r.language = u;
var d = !1, f = !1, p = "", _ = 0, g = /android (\d+(?:\.\d+)+)/i.exec(l) || /android (\d+(?:\.\d+)+)/i.exec(c.platform);
if (g) {
d = !0;
p = g[1] || "";
_ = parseInt(p) || 0;
}
if (g = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(l)) {
f = !0;
p = g[2] || "";
_ = parseInt(p) || 0;
} else if (/(iPhone|iPad|iPod)/.exec(c.platform)) {
f = !0;
p = "";
_ = 0;
}
var v = r.OS_UNKNOWN;
-1 !== c.appVersion.indexOf("Win") ? v = r.OS_WINDOWS : f ? v = r.OS_IOS : -1 !== c.appVersion.indexOf("Mac") ? v = r.OS_OSX : -1 !== c.appVersion.indexOf("X11") && -1 === c.appVersion.indexOf("Linux") ? v = r.OS_UNIX : d ? v = r.OS_ANDROID : -1 === c.appVersion.indexOf("Linux") && -1 === l.indexOf("ubuntu") || (v = r.OS_LINUX);
r.os = v;
r.osVersion = p;
r.osMainVersion = _;
r.browserType = r.BROWSER_TYPE_UNKNOWN;
!(function() {
var t = /mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i.exec(l);
t || (t = /qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng/i.exec(l));
var e = t ? t[0].toLowerCase() : r.BROWSER_TYPE_UNKNOWN;
"micromessenger" === e ? e = r.BROWSER_TYPE_WECHAT : "safari" === e && d ? e = r.BROWSER_TYPE_ANDROID : "qq" === e && l.match(/android.*applewebkit/i) ? e = r.BROWSER_TYPE_ANDROID : "trident" === e ? e = r.BROWSER_TYPE_IE : "360 aphone" === e ? e = r.BROWSER_TYPE_360 : "mxbrowser" === e ? e = r.BROWSER_TYPE_MAXTHON : "opr/" === e && (e = r.BROWSER_TYPE_OPERA);
r.browserType = e;
})();
r.browserVersion = "";
!(function() {
var t = l.match(/(mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|uc|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui)(mobile)?(browser)?\/?([\d.]+)/i);
t || (t = l.match(/(qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i));
r.browserVersion = t ? t[4] : "";
})();
var y = window.innerWidth || document.documentElement.clientWidth, m = window.innerHeight || document.documentElement.clientHeight, b = window.devicePixelRatio || 1;
r.windowPixelResolution = {
width: b * y,
height: b * m
};
r._checkWebGLRenderMode = function() {
if (cc._renderType !== cc.game.RENDER_TYPE_WEBGL) throw new Error("This feature supports WebGL render mode only.");
};
var C = document.createElement("canvas"), T = document.createElement("canvas");
r._supportCanvasNewBlendModes = (function() {
var t = C;
t.width = 1;
t.height = 1;
var e = t.getContext("2d");
e.fillStyle = "#000";
e.fillRect(0, 0, 1, 1);
e.globalCompositeOperation = "multiply";
var i = T;
i.width = 1;
i.height = 1;
var n = i.getContext("2d");
n.fillStyle = "#fff";
n.fillRect(0, 0, 1, 1);
e.drawImage(i, 0, 0, 1, 1);
return 0 === e.getImageData(0, 0, 1, 1).data[0];
})();
if (cc.sys.isMobile) {
var S = document.createElement("style");
S.type = "text/css";
document.body.appendChild(S);
S.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}";
}
try {
var E = r.localStorage = s.localStorage;
E.setItem("storage", "");
E.removeItem("storage");
E = null;
} catch (t) {
var A = function() {
cc.warnID(5200);
};
r.localStorage = {
getItem: A,
setItem: A,
removeItem: A,
clear: A
};
}
var x = C.toDataURL("image/webp").startsWith("data:image/webp"), w = !!C.getContext("2d"), I = !1;
if (s.WebGLRenderingContext) {
cc.create3DContext(document.createElement("CANVAS")) && (I = !0);
if (I && r.os === r.OS_ANDROID) {
var O = parseFloat(r.browserVersion);
switch (r.browserType) {
case r.BROWSER_TYPE_MOBILE_QQ:
case r.BROWSER_TYPE_BAIDU:
case r.BROWSER_TYPE_BAIDU_APP:
I = O >= 6.2;
break;

case r.BROWSER_TYPE_ANDROID:
r.osMainVersion && r.osMainVersion >= 5 && (I = !0);
break;

case r.BROWSER_TYPE_CHROME:
I = O >= 30;
break;

case r.BROWSER_TYPE_UC:
I = O > 11;

case r.BROWSER_TYPE_360:
I = !1;
}
}
}
var N = r.capabilities = {
canvas: w,
opengl: I,
webp: x
};
(void 0 !== h.ontouchstart || void 0 !== a.ontouchstart || c.msPointerEnabled) && (N.touches = !0);
void 0 !== h.onmouseup && (N.mouse = !0);
void 0 !== h.onkeyup && (N.keyboard = !0);
(s.DeviceMotionEvent || s.DeviceOrientationEvent) && (N.accelerometer = !0);
var L;
!(function() {
r.browserVersion;
var t = !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
L = {
ONLY_ONE: !1,
WEB_AUDIO: t,
DELAY_CREATE_CTX: !1
};
r.os === r.OS_IOS && (L.USE_LOADER_EVENT = "loadedmetadata");
if (r.browserType === r.BROWSER_TYPE_FIREFOX) {
L.DELAY_CREATE_CTX = !0;
L.USE_LOADER_EVENT = "canplay";
}
r.os === r.OS_ANDROID && r.browserType === r.BROWSER_TYPE_UC && (L.ONE_SOURCE = !0);
!1;
})();
try {
if (L.WEB_AUDIO) {
L.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
L.DELAY_CREATE_CTX && setTimeout((function() {
L.context = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
}), 0);
}
} catch (t) {
L.WEB_AUDIO = !1;
cc.logID(5201);
}
L.format = (function() {
var t = [], e = document.createElement("audio");
if (e.canPlayType) {
e.canPlayType('audio/ogg; codecs="vorbis"') && t.push(".ogg");
e.canPlayType("audio/mpeg") && t.push(".mp3");
e.canPlayType('audio/wav; codecs="1"') && t.push(".wav");
e.canPlayType("audio/mp4") && t.push(".mp4");
e.canPlayType("audio/x-m4a") && t.push(".m4a");
}
return t;
})();
r.__audioSupport = L;
r.garbageCollect = function() {};
r.dumpRoot = function() {};
r.restartVM = function() {};
r.cleanScript = function(t) {};
r.isObjectValid = function(t) {
return !!t;
};
r.dump = function() {
var t = "";
t += "isMobile : " + this.isMobile + "\r\n";
t += "language : " + this.language + "\r\n";
t += "browserType : " + this.browserType + "\r\n";
t += "browserVersion : " + this.browserVersion + "\r\n";
t += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n";
t += "os : " + this.os + "\r\n";
t += "osVersion : " + this.osVersion + "\r\n";
t += "platform : " + this.platform + "\r\n";
t += "Using " + (cc._renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n";
cc.log(t);
};
r.openURL = function(t) {
window.open(t);
};
r.now = function() {
return Date.now ? Date.now() : +new Date();
};
n.exports = r;
}
}), {} ],
139: [ (function(t, e, i) {
cc.visibleRect = {
topLeft: cc.p(0, 0),
topRight: cc.p(0, 0),
top: cc.p(0, 0),
bottomLeft: cc.p(0, 0),
bottomRight: cc.p(0, 0),
bottom: cc.p(0, 0),
center: cc.p(0, 0),
left: cc.p(0, 0),
right: cc.p(0, 0),
width: 0,
height: 0,
init: function(t) {
var e = this.width = t.width, i = this.height = t.height, n = t.x, o = t.y, r = o + i, s = n + e;
this.topLeft.x = n;
this.topLeft.y = r;
this.topRight.x = s;
this.topRight.y = r;
this.top.x = n + e / 2;
this.top.y = r;
this.bottomLeft.x = n;
this.bottomLeft.y = o;
this.bottomRight.x = s;
this.bottomRight.y = o;
this.bottom.x = n + e / 2;
this.bottom.y = o;
this.center.x = n + e / 2;
this.center.y = o + i / 2;
this.left.x = n;
this.left.y = o + i / 2;
this.right.x = s;
this.right.y = o + i / 2;
}
};
}), {} ],
140: [ (function(i, n, o) {
var r = cc.ClassManager = {
instanceId: 0 | 998 * Math.random(),
getNewInstanceId: function() {
return this.instanceId++;
}
}, s = /\b_super\b/, c = function() {};
c.extend = function(i) {
var n, o = this.prototype, a = Object.create(o), h = {
writable: !0,
enumerable: !1,
configurable: !0
};
if (cc.game && cc.game.config && cc.game.config[cc.game.CONFIG_KEY.exposeClassName]) {
var l = "return (function " + (i._className || "Class") + "(arg0,arg1,arg2,arg3,arg4) {\nthis.__instanceId = cc.ClassManager.getNewInstanceId();\nif (this.ctor) {\nswitch (arguments.length) {\ncase 0: this.ctor(); break;\ncase 1: this.ctor(arg0); break;\ncase 2: this.ctor(arg0,arg1); break;\ncase 3: this.ctor(arg0,arg1,arg2); break;\ncase 4: this.ctor(arg0,arg1,arg2,arg3); break;\ncase 5: this.ctor(arg0,arg1,arg2,arg3,arg4); break;\ndefault: this.ctor.apply(this, arguments);\n}\n}\n});";
n = Function(l)();
} else n = function(t, e, i, n, o) {
this.__instanceId = r.getNewInstanceId();
if (this.ctor) switch (arguments.length) {
case 0:
this.ctor();
break;

case 1:
this.ctor(t);
break;

case 2:
this.ctor(t, e);
break;

case 3:
this.ctor(t, e, i);
break;

case 4:
this.ctor(t, e, i, n);
break;

case 5:
this.ctor(t, e, i, n, o);
break;

default:
this.ctor.apply(this, arguments);
}
};
n.prototype = a;
h.value = n;
Object.defineProperty(a, "constructor", h);
for (var u in i) {
var d = "function" === ("object" == (e = typeof i[u]) ? t(i[u]) : e);
if (d && "function" === ("object" == (e = typeof o[u]) ? t(o[u]) : e) && s.test(i[u])) {
h.value = (function(t, e) {
return function() {
var i = this._super;
this._super = o[t];
var n = e.apply(this, arguments);
this._super = i;
return n;
};
})(u, i[u]);
Object.defineProperty(a, u, h);
} else if (d) {
h.value = i[u];
Object.defineProperty(a, u, h);
} else a[u] = i[u];
}
n.extend = c.extend;
n.implement = function(t) {
for (var e in t) a[e] = t[e];
};
return n;
};
cc.defineGetterSetter = function(t, e, i, n, o, r) {
if (t.__defineGetter__) {
i && t.__defineGetter__(e, i);
n && t.__defineSetter__(e, n);
} else {
if (!Object.defineProperty) throw new Error("browser does not support getters");
var s = {
configurable: !0
};
i && (s.get = i);
n && (s.set = n);
Object.defineProperty(t, e, s);
}
};
cc.clone = function(i) {
var n = i.constructor ? new i.constructor() : {};
for (var o in i) {
var r = i[o];
"object" !== ("object" == (e = typeof r) ? t(r) : e) || !r || r instanceof _ccsg.Node ? n[o] = r : n[o] = cc.clone(r);
}
return n;
};
cc._Class = n.exports = c;
}), {} ],
141: [ (function(i, n, o) {
function r(t, e, i) {
var n;
n = function() {};
i && l.extend(n, i.constructor);
var o = new n();
l.value(t, "__attrs__", o);
return o;
}
function s(i, n, o) {
var s, a, h;
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) a = (s = c(i)).constructor.prototype; else {
var l = i;
if (!(s = l.__attrs__)) {
s = r(l, 0, c(i = l.constructor));
}
a = s;
}
if ("undefined" === ("object" == (e = typeof o) ? t(o) : e)) {
var d = n + u, f = {};
for (h in s) h.startsWith(d) && (f[h.slice(d.length)] = s[h]);
return f;
}
if ("object" === ("object" == (e = typeof o) ? t(o) : e)) for (h in o) 95 !== h.charCodeAt(0) && (a[n + u + h] = o[h]); else 0;
}
function c(t) {
return t.hasOwnProperty("__attrs__") && t.__attrs__ || (function(t) {
for (var e, i = cc.Class.getInheritanceChain(t), n = i.length - 1; n >= 0; n--) {
var o = i[n];
o.hasOwnProperty("__attrs__") && o.__attrs__ || r(o, 0, (e = i[n + 1]) && e.__attrs__);
}
r(t, 0, (e = i[0]) && e.__attrs__);
return t.__attrs__;
})(t);
}
function a(t) {
return c(t).constructor.prototype;
}
function h(t, e) {
0;
}
var l = i("./js"), u = (i("./utils").isPlainEmptyObj_DEV, "$_$");
cc.Integer = "Integer";
cc.Float = "Float";
0;
cc.Boolean = "Boolean";
cc.String = "String";
n.exports = {
attr: s,
getClassAttrs: c,
getClassAttrsProto: a,
setClassAttr: function(t, e, i, n) {
a(t)[e + u + i] = n;
},
DELIMETER: u,
getTypeChecker: h,
ObjectType: function(t) {
return {
type: "Object",
ctor: t,
_onAfterProp: !1
};
},
ScriptUuid: {}
};
}), {
"./CCClass": 133,
"./js": 149,
"./utils": 153
} ],
142: [ (function(i, n, o) {
function r() {
this.callbacks = [];
this.targets = [];
this.isInvoking = !1;
this.containCanceled = !1;
}
function s() {
this._callbackTable = c.createMap(!0);
}
var c = i("./js"), a = c.array.fastRemoveAt, h = r.prototype;
h.removeBy = function(t, e) {
for (var i = this.callbacks, n = this.targets, o = 0; o < t.length; ++o) if (t[o] === e) {
a(i, o);
a(n, o);
--o;
}
};
h.cancel = function(t) {
this.callbacks[t] = this.targets[t] = null;
this.containCanceled = !0;
};
h.cancelAll = function() {
for (var t = this.callbacks, e = this.targets, i = 0; i < t.length; i++) t[i] = e[i] = null;
this.containCanceled = !0;
};
h.purgeCanceled = function() {
this.removeBy(this.callbacks, null);
this.containCanceled = !1;
};
var l = new c.Pool(function(t) {
t.callbacks.length = 0;
t.targets.length = 0;
t.isInvoking = !1;
t.containCanceled = !1;
}, 16);
l.get = function() {
return this._get() || new r();
};
(h = s.prototype).add = function(t, e, i) {
var n = this._callbackTable[t];
n || (n = this._callbackTable[t] = l.get());
n.callbacks.push(e);
n.targets.push(i || null);
};
h.has = function(t, e, i) {
var n = this._callbackTable[t];
if (!n) return !1;
var o = n.callbacks;
if (!e) {
for (var r = 0; r < o.length; r++) if (o[r]) return !0;
return !1;
}
i = i || null;
for (var s = n.targets, c = 0; c < o.length; ++c) if (o[c] === e && s[c] === i) return !0;
return !1;
};
h.removeAll = function(i) {
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = this._callbackTable[i];
if (n) if (n.isInvoking) n.cancelAll(); else {
l.put(n);
delete this._callbackTable[i];
}
} else if (i) for (var o in this._callbackTable) {
var r = this._callbackTable[o];
if (r.isInvoking) for (var s = r.targets, c = 0; c < s.length; ++c) s[c] === i && r.cancel(c); else r.removeBy(r.targets, i);
}
};
h.remove = function(t, e, i) {
var n = this._callbackTable[t];
if (n) {
i = i || null;
for (var o = n.callbacks, r = n.targets, s = 0; s < o.length; ++s) if (o[s] === e && r[s] === i) {
if (n.isInvoking) n.cancel(s); else {
a(o, s);
a(r, s);
}
break;
}
}
};
var u = function() {
s.call(this);
};
c.extend(u, s);
0;
u.prototype.invoke = function(t, e, i, n, o, r) {
var s = this._callbackTable[t];
if (s) {
var c = !s.isInvoking;
s.isInvoking = !0;
for (var a = s.callbacks, h = s.targets, l = 0, u = a.length; l < u; ++l) {
var d = a[l];
if (d) {
var f = h[l];
f ? d.call(f, e, i, n, o, r) : d(e, i, n, o, r);
}
}
if (c) {
s.isInvoking = !1;
s.containCanceled && s.purgeCanceled();
}
}
};
u.CallbacksHandler = s;
n.exports = u;
}), {
"./js": 149
} ],
143: [ (function(t, e, i) {
function n(t, e) {
for (var i = 0; i < e.length; i++) {
var o = e[i];
Array.isArray(o) ? n(t, o) : t.push(o);
}
}
e.exports = {
flattenCodeArray: function(t) {
var e = [];
n(e, t);
return e.join("");
}
};
}), {} ],
144: [ (function(i, n, o) {
var r = i("./js"), s = (i("./CCObject"), i("./attribute")), c = i("./CCClass"), a = i("../utils/misc"), h = function() {
this.uuidList = [];
this.uuidObjList = [];
this.uuidPropList = [];
this.rawProp = "";
};
h.prototype.reset = function() {
this.uuidList.length = 0;
this.uuidObjList.length = 0;
this.uuidPropList.length = 0;
this.rawProp = "";
};
0;
h.prototype.getUuidOf = function(t, e) {
for (var i = 0; i < this.uuidObjList.length; i++) if (this.uuidObjList[i] === t && this.uuidPropList[i] === e) return this.uuidList[i];
return "";
};
h.prototype.push = function(t, e, i) {
this.uuidList.push(i);
this.uuidObjList.push(t);
this.uuidPropList.push(e);
};
(h.pool = new r.Pool(function(t) {
t.reset();
}, 10)).get = function() {
return this._get() || new h();
};
var l = (function() {
function i(t, e, i, n, o) {
this.result = t;
this.customEnv = n;
this.deserializedList = [];
this.deserializedData = null;
this._classFinder = i;
0;
this._idList = [];
this._idObjList = [];
this._idPropList = [];
}
function n(t, e, i, n, o) {
var s;
if (n.hasOwnProperty("__deserialize__")) s = n.__deserialize__; else {
s = l(t, n);
r.value(n, "__deserialize__", s, !0);
}
s(t, e, i, n, o);
0;
}
var o = i.prototype;
o.deserialize = function(t) {
if (Array.isArray(t)) {
var e = t, i = e.length;
this.deserializedList.length = i;
for (var n = 0; n < i; n++) if (e[n]) {
this.deserializedList[n] = this._deserializeObject(e[n]);
}
this.deserializedData = i > 0 ? this.deserializedList[0] : [];
} else {
this.deserializedList.length = 1;
this.deserializedData = t ? this._deserializeObject(t) : null;
this.deserializedList[0] = this.deserializedData;
}
!(function(t) {
var e, i, n, o = t.deserializedList, r = t._idPropList, s = t._idList, c = t._idObjList;
t._classFinder && t._classFinder.onDereferenced;
for (e = 0; e < s.length; e++) {
i = r[e];
n = s[e];
c[e][i] = o[n];
}
})(this);
return this.deserializedData;
};
o._deserializeObject = function(i, o, s, c) {
var a, h = null, l = null, u = i.__type__;
if (u) {
if (!(l = this._classFinder(u, i, s, c))) {
this._classFinder === r._getClassById && cc.deserialize.reportMissingClass(u);
return null;
}
if ((h = new l())._deserialize) {
h._deserialize(i.content, this);
return h;
}
cc.Class._isCCClass(l) ? n(this, h, i, l, o) : this._deserializeTypedObject(h, i, l);
} else if (Array.isArray(i)) {
h = new Array(i.length);
for (var d = 0; d < i.length; d++) {
a = i[d];
"object" === ("object" == (e = typeof a) ? t(a) : e) && a ? this._deserializeObjField(h, a, "" + d) : h[d] = a;
}
} else {
h = {};
this._deserializePrimitiveObject(h, i);
}
return h;
};
o._deserializeObjField = function(i, n, o, r) {
var s = n.__id__;
if ("undefined" === ("object" == (e = typeof s) ? t(s) : e)) {
var c = n.__uuid__;
if (c) {
this.result.uuidList.push(c);
this.result.uuidObjList.push(i);
this.result.uuidPropList.push(o);
} else i[o] = this._deserializeObject(n);
} else {
var a = this.deserializedList[s];
if (a) i[o] = a; else {
this._idList.push(s);
this._idObjList.push(i);
this._idPropList.push(o);
}
}
};
o._deserializePrimitiveObject = function(i, n) {
for (var o in n) if (n.hasOwnProperty(o)) {
var r = n[o];
"object" !== ("object" == (e = typeof r) ? t(r) : e) ? "__type__" !== o && (i[o] = r) : r ? this._deserializeObjField(i, r, o) : i[o] = null;
}
};
o._deserializeTypedObject = function(i, n, o) {
if (o !== cc.Vec2) if (o !== cc.Color) if (o !== cc.Size) {
var r = o.__props__;
r || (r = Object.keys(i));
for (var s = 0; s < r.length; s++) {
var c = r[s], a = n[c];
"undefined" !== ("object" == (e = typeof a) ? t(a) : e) && n.hasOwnProperty(c) && ("object" !== ("object" == (e = typeof a) ? t(a) : e) ? i[c] = a : a ? this._deserializeObjField(i, a, c) : i[c] = null);
}
} else {
i.width = n.width || 0;
i.height = n.height || 0;
} else {
i.r = n.r || 0;
i.g = n.g || 0;
i.b = n.b || 0;
var h = n.a;
i.a = void 0 === h ? 255 : h;
} else {
i.x = n.x || 0;
i.y = n.y || 0;
}
};
var h = function(t, e, i, n, o) {
if (e instanceof cc.ValueType) {
o || t.push("if(prop){");
var s = r.getClassName(e);
t.push("s._deserializeTypedObject(o" + i + ",prop," + s + ");");
o || t.push("}else o" + i + "=null;");
} else {
t.push("if(prop){");
t.push("s._deserializeObjField(o,prop," + n + ");");
t.push("}else o" + i + "=null;");
}
}, l = function(i, n) {
for (var o = s.DELIMETER + "rawType", l = (s.DELIMETER, s.DELIMETER + "serializable"), u = s.DELIMETER + "default", d = s.DELIMETER + "saveUrlAsAsset", f = s.DELIMETER + "formerlySerializedAs", p = s.getClassAttrs(n), _ = n.__props__, g = [ "var prop;" ], v = a.BUILTIN_CLASSID_RE.test(r._getClassId(n)), y = 0; y < _.length; y++) {
var m, b = _[y];
if (p[b + o]) {
m = c.IDENTIFIER_RE.test(b) ? '"' + b + '"' : c.escapeForJS(b);
g.push('if(s.result.rawProp)\ncc.error("not support multi raw object in a file");');
g.push("s.result.rawProp=" + m + ";");
} else {
if (!1 === p[b + l]) continue;
var C;
if (c.IDENTIFIER_RE.test(b)) {
m = '"' + b + '"';
C = "." + b;
} else C = "[" + (m = c.escapeForJS(b)) + "]";
var T = C;
if (p[b + f]) {
var S = p[b + f];
T = c.IDENTIFIER_RE.test(S) ? "." + S : "[" + c.escapeForJS(S) + "]";
}
g.push("prop=d" + T + ";");
g.push('if(typeof (prop)!=="undefined"){');
var E = c.getDefault(p[b + u]);
if (v) {
var A = "object" == (e = typeof E) ? t(E) : e;
"string" === A && !p[b + d] || "number" === A || "boolean" === A ? g.push("o" + C + "=prop;") : h(g, E, C, m, !0);
} else {
g.push('if(typeof (prop)!=="object"){o' + C + "=prop;}else{");
h(g, E, C, m, !1);
g.push("}");
}
g.push("}");
}
}
if ("_$erialized" === _[_.length - 1]) {
g.push("o._$erialized=JSON.parse(JSON.stringify(d));");
g.push("s._deserializePrimitiveObject(o._$erialized,d);");
}
return Function("s", "o", "d", "k", "t", g.join(""));
};
(i.pool = new r.Pool(function(t) {
t.result = null;
t.customEnv = null;
t.deserializedList.length = 0;
t.deserializedData = null;
t._classFinder = null;
0;
t._idList.length = 0;
t._idObjList.length = 0;
t._idPropList.length = 0;
}, 1)).get = function(t, e, n, o, r) {
var s = this._get();
if (s) {
s.result = t;
s.customEnv = o;
s._classFinder = n;
0;
return s;
}
return new i(t, e, n, o, r);
};
return i;
})();
cc.deserialize = function(i, n, o) {
var s = (o = o || {}).classFinder || r._getClassById, c = o.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE, a = o.customEnv, u = o.ignoreEditorOnly;
0;
"string" === ("object" == (e = typeof i) ? t(i) : e) && (i = JSON.parse(i));
var d = !n;
n = n || h.pool.get();
var f = l.pool.get(n, !1, s, a, u);
cc.game._isCloning = !0;
var p = f.deserialize(i);
cc.game._isCloning = !1;
l.pool.put(f);
c && n.assignAssetsBy(Editor.serialize.asAsset);
d && h.pool.put(n);
return p;
};
cc.deserialize.Details = h;
cc.deserialize.reportMissingClass = function(t) {
cc.warnID(5302, t);
};
}), {
"../utils/misc": 159,
"./CCClass": 133,
"./CCObject": 137,
"./attribute": 141,
"./js": 149
} ],
145: [ (function(t, e, i) {
function n(t) {
this.id = 0 | 998 * Math.random();
this.prefix = t ? t + o : "";
}
var o = ".";
n.prototype.getNewId = function() {
return this.prefix + ++this.id;
};
n.global = new n("global");
e.exports = n;
}), {} ],
146: [ (function(t, e, i) {
t("./js");
t("./CCClass");
t("./CCClassDecorator");
t("./CCEnum");
t("./CCObject");
t("./callbacks-invoker");
t("./url");
t("./deserialize");
t("./instantiate");
t("./instantiate-jit");
t("./requiring-frame");
t("./CCSys");
t("./CCMacro");
t("./CCAssetLibrary");
0;
}), {
"./CCAssetLibrary": 132,
"./CCClass": 133,
"./CCClassDecorator": 134,
"./CCEnum": 135,
"./CCMacro": 136,
"./CCObject": 137,
"./CCSys": 138,
"./CCVisibleRect": 139,
"./callbacks-invoker": 142,
"./deserialize": 144,
"./instantiate": 148,
"./instantiate-jit": 147,
"./js": 149,
"./requiring-frame": 151,
"./url": 152
} ],
147: [ (function(i, n, o) {
function r(t, e) {
this.varName = t;
this.expression = e;
}
function s(t, e) {
return e instanceof r ? new r(e.varName, t + e.expression) : t + e;
}
function c(t, e, i) {
if (Array.isArray(i)) {
i[0] = s(e, i[0]);
t.push(i);
} else t.push(s(e, i) + ";");
}
function a(t) {
this._exps = [];
this._targetExp = t;
}
function h(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) try {
i = i();
} catch (t) {
return !1;
}
if (i === n) return !0;
if (i && n) {
if (i instanceof cc.ValueType && i.equals(n)) return !0;
if (Array.isArray(i) && Array.isArray(n) || i.constructor === Object && n.constructor === Object) try {
return JSON.stringify(i) === JSON.stringify(n);
} catch (t) {}
}
return !1;
}
function l(t) {
return C.test(t) ? "." + t : "[" + T(t) + "]";
}
function u(t, e) {
this.parent = e;
this.objsToClear_iN$t = [];
this.codeArray = [];
this.objs = [];
this.funcs = [];
this.funcModuleCache = g.createMap();
g.mixin(this.funcModuleCache, x);
this.globalVariables = [];
this.globalVariableId = 0;
this.localVariableId = 0;
this.codeArray.push(S + E + "," + A + ";", "if(R){", E + "=R;", "}else{", E + "=R=new " + this.getFuncModule(t.constructor, !0) + "();", "}");
t._iN$t = {
globalVar: "R"
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(this.codeArray, t);
var i;
this.globalVariables.length > 0 && (i = S + this.globalVariables.join(",") + ";");
var n = y.flattenCodeArray([ "return (function(R){", i || [], this.codeArray, "return o;", "})" ]);
this.result = Function("O", "F", n)(this.objs, this.funcs);
for (var o = 0, r = this.objsToClear_iN$t.length; o < r; ++o) this.objsToClear_iN$t[o]._iN$t = null;
this.objsToClear_iN$t.length = 0;
}
var d = i("./CCObject"), f = d.Flags.Destroyed, p = d.Flags.PersistentMask, _ = i("./attribute"), g = i("./js"), v = i("./CCClass"), y = i("./compiler"), m = _.DELIMETER + "serializable", b = _.DELIMETER + "default", C = v.IDENTIFIER_RE, T = v.escapeForJS, S = "var ", E = "o", A = "t", x = {
"cc.Node": "cc.Node",
"cc.Sprite": "cc.Sprite",
"cc.Label": "cc.Label",
"cc.Button": "cc.Button",
"cc.Widget": "cc.Widget",
"cc.Animation": "cc.Animation",
"cc.ClickEvent": !1,
"cc.PrefabInfo": !1
};
r.prototype.toString = function() {
return S + this.varName + "=" + this.expression + ";";
};
a.prototype.append = function(t, e) {
this._exps.push([ t, e ]);
};
a.prototype.writeCode = function(t) {
var e;
if (this._exps.length > 1) {
t.push(A + "=" + this._targetExp + ";");
e = A;
} else {
if (1 !== this._exps.length) return;
e = this._targetExp;
}
for (var i = 0; i < this._exps.length; i++) {
var n = this._exps[i];
c(t, e + l(n[0]) + "=", n[1]);
}
};
(a.pool = new g.Pool(function(t) {
t._exps.length = 0;
t._targetExp = null;
}, 1)).get = function(t) {
var e = this._get() || new a();
e._targetExp = t;
return e;
};
var w = u.prototype;
w.getFuncModule = function(t, e) {
var i = g.getClassName(t);
if (i) {
var n = this.funcModuleCache[i];
if (n) return n;
if (void 0 === n) {
var o = -1 !== i.indexOf(".");
if (o) try {
if (o = t === Function("return " + i)()) {
this.funcModuleCache[i] = i;
return i;
}
} catch (t) {}
}
}
var r = this.funcs.indexOf(t);
if (r < 0) {
r = this.funcs.length;
this.funcs.push(t);
}
var s = "F[" + r + "]";
e && (s = "(" + s + ")");
this.funcModuleCache[i] = s;
return s;
};
w.getObjRef = function(t) {
var e = this.objs.indexOf(t);
if (e < 0) {
e = this.objs.length;
this.objs.push(t);
}
return "O[" + e + "]";
};
w.setValueType = function(t, e, i, n) {
var o = a.pool.get(n), r = e.constructor.__props__;
r || (r = Object.keys(e));
for (var s = 0; s < r.length; s++) {
var c = r[s], h = i[c];
if (e[c] !== h) {
var l = this.enumerateField(i, c, h);
o.append(c, l);
}
}
o.writeCode(t);
a.pool.put(o);
};
w.enumerateCCClass = function(i, n, o) {
for (var r = o.__props__, s = _.getClassAttrs(o), c = 0; c < r.length; c++) {
var a = r[c];
0;
if (!1 !== s[a + m]) {
var u = n[a];
if (h(d = s[a + b], u)) continue;
if ("object" === ("object" == (e = typeof u) ? t(u) : e) && u instanceof cc.ValueType) {
var d;
if (((d = v.getDefault(d)) && d.constructor) === u.constructor) {
var f = E + l(a);
this.setValueType(i, d, u, f);
continue;
}
}
this.setObjProp(i, n, a, u);
}
}
};
w.instantiateArray = function(t) {
if (0 === t.length) return "[]";
var e = "a" + ++this.localVariableId, i = [ new r(e, "new Array(" + t.length + ")") ];
t._iN$t = {
globalVar: "",
source: i
};
this.objsToClear_iN$t.push(t);
for (var n = 0; n < t.length; ++n) {
c(i, e + "[" + n + "]=", this.enumerateField(t, n, t[n]));
}
return i;
};
w.enumerateField = function(i, n, o) {
if ("object" === ("object" == (e = typeof o) ? t(o) : e) && o) {
var r = o._iN$t;
if (r) {
var c = r.globalVar;
if (!c) {
c = r.globalVar = "v" + ++this.globalVariableId;
this.globalVariables.push(c);
var a = r.source[0];
r.source[0] = s(c + "=", a);
}
return c;
}
return Array.isArray(o) ? this.instantiateArray(o) : this.instantiateObj(o);
}
if ("function" === ("object" == (e = typeof o) ? t(o) : e)) return this.getFuncModule(o);
if ("string" === ("object" == (e = typeof o) ? t(o) : e)) return T(o);
"_objFlags" === n && i instanceof d && (o &= p);
return o;
};
w.setObjProp = function(t, e, i, n) {
c(t, E + l(i) + "=", this.enumerateField(e, i, n));
};
w.enumerateObject = function(i, n) {
var o = n.constructor;
if (cc.Class._isCCClass(o)) this.enumerateCCClass(i, n, o); else for (var r in n) if (n.hasOwnProperty(r) && (95 !== r.charCodeAt(0) || 95 !== r.charCodeAt(1) || "__type__" === r)) {
var s = n[r];
"object" === ("object" == (e = typeof s) ? t(s) : e) && s && s === n._iN$t || this.setObjProp(i, n, r, s);
}
};
w.instantiateObj = function(t) {
if (t instanceof cc.ValueType) return v.getNewValueTypeCode(t);
if (t instanceof cc.Asset) return this.getObjRef(t);
if (t._objFlags & f) return null;
var e, i = t.constructor;
if (cc.Class._isCCClass(i)) {
if (this.parent) if (this.parent instanceof cc.Component) {
if (t instanceof cc._BaseNode || t instanceof cc.Component) return this.getObjRef(t);
} else if (this.parent instanceof cc._BaseNode) if (t instanceof cc._BaseNode) {
if (!t.isChildOf(this.parent)) return this.getObjRef(t);
} else if (t instanceof cc.Component && !t.node.isChildOf(this.parent)) return this.getObjRef(t);
e = new r(E, "new " + this.getFuncModule(i, !0) + "()");
} else if (i === Object) e = new r(E, "{}"); else {
if (i) return this.getObjRef(t);
e = new r(E, "Object.create(null)");
}
var n = [ e ];
t._iN$t = {
globalVar: "",
source: n
};
this.objsToClear_iN$t.push(t);
this.enumerateObject(n, t);
return [ "(function(){", n, "return o;})();" ];
};
n.exports = {
compile: function(t) {
return new u(t, t instanceof cc._BaseNode && t).result;
},
equalsToDefault: h
};
0;
}), {
"./CCClass": 133,
"./CCObject": 137,
"./attribute": 141,
"./compiler": 143,
"./js": 149
} ],
148: [ (function(i, n, o) {
function r(i, n) {
if (!n) {
if ("object" !== ("object" == (e = typeof i) ? t(i) : e) || Array.isArray(i)) {
0;
return null;
}
if (!i) {
0;
return null;
}
if (!cc.isValid(i)) {
0;
return null;
}
0;
}
var o;
if (i instanceof h) {
if (i._instantiate) {
cc.game._isCloning = !0;
o = i._instantiate();
cc.game._isCloning = !1;
return o;
}
if (i instanceof cc.Asset) {
0;
return null;
}
}
cc.game._isCloning = !0;
o = s(i);
cc.game._isCloning = !1;
return o;
}
function s(t, e) {
if (Array.isArray(t)) {
0;
return null;
}
0;
var i;
if (t._iN$t) i = t._iN$t; else if (t.constructor) {
i = new (0, t.constructor)();
} else i = Object.create(null);
c(t, i, e);
for (var n = 0, o = f.length; n < o; ++n) f[n]._iN$t = null;
f.length = 0;
return i;
}
function c(i, n, o) {
i._iN$t = n;
f.push(i);
var r = i.constructor;
if (cc.Class._isCCClass(r)) !(function(i, n, o, r) {
for (var s = i.__props__, c = d.getClassAttrs(i), h = 0; h < s.length; h++) {
var l = s[h];
if (!1 !== c[l + p]) {
var u = n[l];
"object" === ("object" == (e = typeof u) ? t(u) : e) && u ? o[l] = u._iN$t || a(u, r) : o[l] = u;
}
}
})(r, i, n, o); else for (var s in i) if (i.hasOwnProperty(s) && (95 !== s.charCodeAt(0) || 95 !== s.charCodeAt(1) || "__type__" === s)) {
var c = i[s];
if ("object" === ("object" == (e = typeof c) ? t(c) : e) && c) {
if (c === n) continue;
n[s] = c._iN$t || a(c, o);
} else n[s] = c;
}
i instanceof h && (n._objFlags &= u);
}
function a(i, n) {
if (i instanceof cc.ValueType) return i.clone();
if (i instanceof cc.Asset) return i;
var o;
if (Array.isArray(i)) {
var r = i.length;
o = new Array(r);
i._iN$t = o;
for (var s = 0; s < r; ++s) {
var h = i[s];
"object" === ("object" == (e = typeof h) ? t(h) : e) && h ? o[s] = h._iN$t || a(h, n) : o[s] = h;
}
f.push(i);
return o;
}
if (i._objFlags & l) return null;
var u = i.constructor;
if (cc.Class._isCCClass(u)) {
if (n) if (n instanceof cc.Component) {
if (i instanceof cc._BaseNode || i instanceof cc.Component) return i;
} else if (n instanceof cc._BaseNode) if (i instanceof cc._BaseNode) {
if (!i.isChildOf(n)) return i;
} else if (i instanceof cc.Component && !i.node.isChildOf(n)) return i;
o = new u();
} else if (u === Object) o = {}; else {
if (u) return i;
o = Object.create(null);
}
c(i, o, n);
return o;
}
var h = i("./CCObject"), l = h.Flags.Destroyed, u = h.Flags.PersistentMask, d = i("./attribute"), f = (i("./utils").isDomNode, 
[]), p = d.DELIMETER + "serializable";
r._clone = s;
cc.instantiate = r;
n.exports = r;
}), {
"./CCObject": 137,
"./attribute": 141,
"./utils": 153
} ],
149: [ (function(i, n, o) {
function r(t, e) {
for (;t; ) {
var i = Object.getOwnPropertyDescriptor(t, e);
if (i) return i;
t = Object.getPrototypeOf(t);
}
return null;
}
function s(t, e, i) {
var n = r(e, t);
Object.defineProperty(i, t, n);
}
function c(t, e) {
t.splice(e, 1);
}
function a(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
c(t, i);
return !0;
}
return !1;
}
function h(i, n) {
if ("number" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i;
i = null;
}
this.get = null;
this.count = 0;
this._pool = new Array(n);
this._cleanup = i;
}
var l = new (i("./id-generater"))("TmpCId."), u = {
isNumber: function(i) {
return "number" === ("object" == (e = typeof i) ? t(i) : e) || i instanceof Number;
},
isString: function(i) {
return "string" === ("object" == (e = typeof i) ? t(i) : e) || i instanceof String;
},
addon: function(i) {
"use strict";
i = i || {};
for (var n = 1, o = arguments.length; n < o; n++) {
var r = arguments[n];
if (r) {
if ("object" !== ("object" == (e = typeof r) ? t(r) : e)) {
cc.errorID(5402, r);
continue;
}
for (var c in r) c in i || s(c, r, i);
}
}
return i;
},
mixin: function(i) {
"use strict";
i = i || {};
for (var n = 1, o = arguments.length; n < o; n++) {
var r = arguments[n];
if (r) {
if ("object" !== ("object" == (e = typeof r) ? t(r) : e)) {
cc.errorID(5403, r);
continue;
}
for (var c in r) s(c, r, i);
}
}
return i;
},
extend: function(t, e) {
0;
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
t.prototype = Object.create(e.prototype, {
constructor: {
value: t,
writable: !0,
configurable: !0
}
});
return t;
},
getSuper: function(t) {
if (t.hasOwnProperty("$super")) return t.$super;
var e = t.prototype, i = e && Object.getPrototypeOf(e);
return i && i.constructor;
},
clear: function(t) {
for (var e = Object.keys(t), i = 0; i < e.length; i++) delete t[e[i]];
},
getPropertyDescriptor: r
}, d = {
value: void 0,
enumerable: !1,
writable: !1,
configurable: !0
};
u.value = function(t, e, i, n, o) {
d.value = i;
d.writable = n;
d.enumerable = o;
Object.defineProperty(t, e, d);
d.value = void 0;
};
var f = {
get: null,
set: null,
enumerable: !1
};
u.getset = function(i, n, o, r, s) {
if ("function" !== ("object" == (e = typeof r) ? t(r) : e)) {
s = r;
r = void 0;
}
f.get = o;
f.set = r;
f.enumerable = s;
Object.defineProperty(i, n, f);
f.get = null;
f.set = null;
};
var p = {
get: null,
enumerable: !1,
configurable: !1
};
u.get = function(t, e, i, n, o) {
p.get = i;
p.enumerable = n;
p.configurable = o;
Object.defineProperty(t, e, p);
p.get = null;
};
var _ = {
set: null,
enumerable: !1,
configurable: !1
};
u.set = function(t, e, i, n, o) {
_.set = i;
_.enumerable = n;
_.configurable = o;
Object.defineProperty(t, e, _);
_.set = null;
};
u.getClassName = function(i) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = i.prototype;
if (n && n.hasOwnProperty("__classname__") && n.__classname__) return n.__classname__;
var o = "";
i.name && (o = i.name);
if (i.toString) {
var r, s = i.toString();
(r = "[" === s.charAt(0) ? s.match(/\[\w+\s*(\w+)\]/) : s.match(/function\s*(\w+)/)) && 2 === r.length && (o = r[1]);
}
return "Object" !== o ? o : "";
}
return i && i.constructor ? u.getClassName(i.constructor) : "";
};
!(function() {
function i(t, e) {
return function(i, n) {
n.prototype.hasOwnProperty(t) && delete e[n.prototype[t]];
u.value(n.prototype, t, i);
if (i) {
var o = e[i];
if (o && o !== n) {
var r = "A Class already exists with the same " + t + ' : "' + i + '".';
0;
cc.error(r);
} else e[i] = n;
}
};
}
var n = {}, o = {};
u._setClassId = i("__cid__", n);
var r = i("__classname__", o);
u.setClassName = function(t, e) {
r(t, e);
if (!e.prototype.hasOwnProperty("__cid__")) {
var i = t || l.getNewId();
i && u._setClassId(i, e);
}
};
u.unregisterClass = function() {
for (var t = 0; t < arguments.length; t++) {
var e = arguments[t].prototype, i = e.__cid__;
i && delete n[i];
var r = e.__classname__;
r && delete o[r];
}
};
u._getClassById = function(t) {
return n[t];
};
u.getClassByName = function(t) {
return o[t];
};
u._getClassId = function(i, n) {
n = "undefined" === ("object" == (e = typeof n) ? t(n) : e) || n;
if ("function" === ("object" == (e = typeof i) ? t(i) : e) && i.prototype.hasOwnProperty("__cid__")) {
0;
return i.prototype.__cid__;
}
if (i && i.constructor) {
var o = i.constructor.prototype;
if (o && o.hasOwnProperty("__cid__")) {
0;
return i.__cid__;
}
}
return "";
};
0;
})();
u.obsolete = function(t, e, i, n) {
function o() {
0;
return this[i];
}
var r = /([^.]+)$/.exec(e)[0];
n ? u.getset(t, r, o, (function(t) {
0;
this[i] = t;
})) : u.get(t, r, o);
};
u.obsoletes = function(t, e, i, n) {
for (var o in i) {
var r = i[o];
u.obsolete(t, e + "." + o, r, n);
}
};
var g = /(%d)|(%s)/, v = /%s/;
u.formatStr = function() {
var i = arguments.length;
if (0 === i) return "";
var n = arguments[0];
if (1 === i) return "" + n;
if ("string" === ("object" == (e = typeof n) ? t(n) : e) && g.test(n)) for (var o = 1; o < i; ++o) {
var r = arguments[o], s = "number" === ("object" == (e = typeof r) ? t(r) : e) ? g : v;
s.test(n) ? n = n.replace(s, r) : n += " " + r;
} else for (var c = 1; c < i; ++c) n += " " + arguments[c];
return n;
};
u.shiftArguments = function() {
for (var t = arguments.length - 1, e = new Array(t), i = 0; i < t; ++i) e[i] = arguments[i + 1];
return e;
};
u.createMap = function(t) {
var e = Object.create(null);
if (t) {
e["."] = !0;
e["/"] = !0;
delete e["."];
delete e["/"];
}
return e;
};
var y = Array.prototype.indexOf;
u.array = {
remove: a,
fastRemove: function(t, e) {
var i = t.indexOf(e);
if (i >= 0) {
t[i] = t[t.length - 1];
--t.length;
}
},
removeAt: c,
fastRemoveAt: function(t, e) {
var i = t.length;
if (!(e < 0 || e >= i)) {
t[e] = t[i - 1];
t.length = i - 1;
}
},
contains: function(t, e) {
return t.indexOf(e) >= 0;
},
verifyType: function(t, e) {
if (t && t.length > 0) for (var i = 0; i < t.length; i++) if (!(t[i] instanceof e)) {
cc.logID(1300);
return !1;
}
return !0;
},
removeArray: function(t, e) {
for (var i = 0, n = e.length; i < n; i++) a(t, e[i]);
},
appendObjectsAt: function(t, e, i) {
t.splice.apply(t, [ i, 0 ].concat(e));
return t;
},
copy: function(t) {
var e, i = t.length, n = new Array(i);
for (e = 0; e < i; e += 1) n[e] = t[e];
return n;
},
indexOf: y,
MutableForwardIterator: i("../utils/mutable-forward-iterator")
};
h.prototype._get = function() {
if (this.count > 0) {
--this.count;
var t = this._pool[this.count];
this._pool[this.count] = null;
return t;
}
return null;
};
h.prototype.put = function(t) {
var e = this._pool;
if (this.count < e.length) {
if (this._cleanup && !1 === this._cleanup(t)) return;
e[this.count] = t;
++this.count;
}
};
h.prototype.resize = function(t) {
if (t >= 0) {
this._pool.length = t;
this.count > t && (this.count = t);
}
};
u.Pool = h;
cc.js = u;
n.exports = u;
}), {
"../utils/mutable-forward-iterator": 160,
"./id-generater": 145
} ],
150: [ (function(i, n, o) {
function r(t, e, i, n) {
if (t.get || t.set) 0; else if (t.hasOwnProperty("default")) {
var o = "_N$" + e;
t.get = function() {
return this[o];
};
t.set = function(t) {
var e = this[o];
this[o] = t;
i.call(this, e);
};
var r = {};
n[o] = r;
for (var s in h) {
var c = h[s];
if (t.hasOwnProperty(s)) {
r[s] = t[s];
c.canUsedInGet || delete t[s];
}
}
} else 0;
}
function s(t, e, i, n) {
Array.isArray(n) && n.length > 0 && (n = n[0]);
0;
t.type = n;
}
function c(t, e, i, n) {
if (Array.isArray(e)) {
if (!(e.length > 0)) return cc.errorID(5508, i, n);
if (cc.RawAsset.isRawAssetType(e[0])) {
t.url = e[0];
delete t.type;
return;
}
t.type = e = e[0];
}
0;
}
function a(t, e, i, n) {
0;
}
var h = {
url: {
canUsedInGet: !0
},
default: {},
serializable: {},
editorOnly: {},
rawType: {},
formerlySerializedAs: {}
};
o.getFullFormOfProperty = function(i) {
if (!(i && i.constructor === Object)) {
if (Array.isArray(i) && i.length > 0) return {
default: [],
type: i,
_short: !0
};
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) {
var n = i;
return cc.RawAsset.isRawAssetType(n) ? {
default: "",
url: n,
_short: !0
} : {
default: cc.isChildClassOf(n, cc.ValueType) ? new n() : null,
type: n,
_short: !0
};
}
return {
default: i,
_short: !0
};
}
return null;
};
o.preprocessAttrs = function(t, e, i, n) {
for (var h in t) {
var l = t[h], u = o.getFullFormOfProperty(l);
u && (l = t[h] = u);
if (l) {
var d = l.notify;
d && r(l, h, d, t);
"type" in l && c(l, l.type, e, h);
"url" in l && s(l, 0, 0, l.url);
"type" in l && a(0, l.type);
}
}
};
0;
o.validateMethodWithProps = function(i, n, o, r, s) {
0;
if ("function" !== ("object" == (e = typeof i) ? t(i) : e) && null !== i) {
return !1;
}
0;
return !0;
};
}), {
"./CCClass": 133
} ],
151: [ (function(t, e, i) {
var n = [];
cc._RF = {
push: function(t, e, i) {
if (void 0 === i) {
i = e;
e = "";
}
n.push({
uuid: e,
script: i,
module: t,
exports: t.exports,
beh: null
});
},
pop: function() {
var t = n.pop(), e = t.module, i = e.exports;
if (i === t.exports) {
for (var o in i) return;
e.exports = i = t.cls;
}
},
peek: function() {
return n[n.length - 1];
}
};
0;
}), {} ],
152: [ (function(t, e, i) {
var n = {};
cc.url = {
_rawAssets: "",
_builtinRawAssets: "",
normalize: function(t) {
46 === t.charCodeAt(0) && 47 === t.charCodeAt(1) ? t = t.slice(2) : 47 === t.charCodeAt(0) && (t = t.slice(1));
return t;
},
raw: function(t) {
0;
(t = this.normalize(t)).startsWith("resources/") || cc.errorID(7002, t);
return this._rawAssets + t;
},
builtinRaw: !1,
_init: function(t) {
for (var e in t) {
var i = t[e];
i = cc.path.stripSep(i) + "/";
n[e] = i;
}
this._rawAssets = n.assets;
this._builtinRawAssets = n.internal;
}
};
e.exports = cc.url;
}), {} ],
153: [ (function(i, n, o) {
n.exports = {
contains: function(i, n) {
if ("function" == ("object" == (e = typeof i.contains) ? t(i.contains) : e)) return i.contains(n);
if ("function" == ("object" == (e = typeof i.compareDocumentPosition) ? t(i.compareDocumentPosition) : e)) return !!(16 & i.compareDocumentPosition(n));
var o = n.parentNode;
if (o) do {
if (o === i) return !0;
o = o.parentNode;
} while (null !== o);
return !1;
},
isDomNode: "object" === ("object" == (e = typeof window) ? t(window) : e) && ("function" === ("object" == (e = typeof Node) ? t(Node) : e) ? function(t) {
return t instanceof Node;
} : function(i) {
return i && "object" === ("object" == (e = typeof i) ? t(i) : e) && "number" === ("object" == (e = typeof i.nodeType) ? t(i.nodeType) : e) && "string" === ("object" == (e = typeof i.nodeName) ? t(i.nodeName) : e);
}),
callInNextTick: function(t, e, i) {
t && cc.director.once(cc.Director._EVENT_NEXT_TICK, (function() {
t(e, i);
}));
}
};
0;
0;
}), {} ],
154: [ (function(t, e, i) {
t("../platform/CCSys");
var n = /(\.[^\.\/\?\\]*)(\?.*)?$/, o = /[^\.\/]+\/\.\.\//;
cc.path = {
join: function() {
for (var t = arguments.length, e = "", i = 0; i < t; i++) e = (e + ("" === e ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
return e;
},
extname: function(t) {
var e = n.exec(t);
return e ? e[1] : "";
},
mainFileName: function(t) {
if (t) {
var e = t.lastIndexOf(".");
if (-1 !== e) return t.substring(0, e);
}
return t;
},
basename: function(t, e) {
var i = t.indexOf("?");
i > 0 && (t = t.substring(0, i));
var n = /(\/|\\\\)([^(\/|\\\\)]+)$/g.exec(t.replace(/(\/|\\\\)$/, ""));
if (!n) return null;
var o = n[2];
return e && t.substring(t.length - e.length).toLowerCase() === e.toLowerCase() ? o.substring(0, o.length - e.length) : o;
},
dirname: function(t) {
return t.replace(/((.*)(\/|\\|\\\\))?(.*?\..*$)?/, "$2");
},
changeExtname: function(t, e) {
e = e || "";
var i = t.indexOf("?"), n = "";
if (i > 0) {
n = t.substring(i);
t = t.substring(0, i);
}
return (i = t.lastIndexOf(".")) < 0 ? t + e + n : t.substring(0, i) + e + n;
},
changeBasename: function(t, e, i) {
if (0 === e.indexOf(".")) return this.changeExtname(t, e);
var n = t.indexOf("?"), o = "", r = i ? this.extname(t) : "";
if (n > 0) {
o = t.substring(n);
t = t.substring(0, n);
}
n = (n = t.lastIndexOf("/")) <= 0 ? 0 : n + 1;
return t.substring(0, n) + e + r + o;
},
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(o, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
};
e.exports = cc.path;
}), {
"../platform/CCSys": 138
} ],
155: [ (function(i, n, o) {
function r(i) {
if (!i) {
cc.errorID(3804);
return null;
}
return "string" === ("object" == (e = typeof i) ? t(i) : e) ? f.getClassByName(i) : i;
}
function s(t, e) {
for (var i = 0; i < t._components.length; ++i) {
var n = t._components[i];
if (n instanceof e) return n;
}
return null;
}
function c(t, e, i) {
for (var n = 0; n < t._components.length; ++n) {
var o = t._components[n];
o instanceof e && i.push(o);
}
}
function a(t, e) {
for (var i = 0; i < t.length; ++i) {
var n = t[i], o = s(n, e);
if (o) return o;
if (n._children.length > 0 && (o = a(n._children, e))) return o;
}
return null;
}
function h(t, e, i) {
for (var n = 0; n < t.length; ++n) {
var o = t[n];
c(o, e, i);
o._children.length > 0 && h(o._children, e, i);
}
}
var l = i("../platform/CCObject").Flags, u = i("./misc"), d = i("../platform/id-generater"), f = cc.js, p = l.Destroying, _ = l.DontDestroy, g = new d("Node"), v = cc.Class({
name: "cc._BaseNode",
extends: cc.Object,
mixins: [ cc.EventTarget ],
properties: {
_parent: null,
_children: [],
_tag: cc.macro.NODE_TAG_INVALID,
_active: !0,
_components: [],
_prefab: null,
_persistNode: {
get: function() {
return (this._objFlags & _) > 0;
},
set: function(t) {
t ? this._objFlags |= _ : this._objFlags &= ~_;
}
},
name: {
get: function() {
return this._name;
},
set: function(t) {
0;
this._name = t;
}
},
_id: {
default: "",
editorOnly: !0
},
uuid: {
get: function() {
var t = this._id;
t || (t = this._id = g.getNewId());
return t;
}
},
children: {
get: function() {
return this._children;
}
},
childrenCount: {
get: function() {
return this._children.length;
}
},
active: {
get: function() {
return this._active;
},
set: function(t) {
t = !!t;
if (this._active !== t) {
this._active = t;
var e = this._parent;
if (e) {
e._activeInHierarchy && cc.director._nodeActivator.activateNode(this, t);
}
}
}
},
activeInHierarchy: {
get: function() {
return this._activeInHierarchy;
}
}
},
ctor: function(i) {
this._name = "undefined" !== ("object" == (e = typeof i) ? t(i) : e) ? i : "New Node";
this._activeInHierarchy = !1;
this.__instanceId = this._id || cc.ClassManager.getNewInstanceId();
this.__eventTargets = [];
},
getTag: function() {
return this._tag;
},
setTag: function(t) {
this._tag = t;
},
getParent: function() {
return this._parent;
},
setParent: function(t) {
if (this._parent !== t) {
0;
var e = this._parent;
this._parent = t || null;
this._onSetParent(t);
if (t) {
0;
t._children.push(this);
t.emit("child-added", this);
}
if (e) {
if (!(e._objFlags & p)) {
var i = e._children.indexOf(this);
0;
e._children.splice(i, 1);
e.emit("child-removed", this);
this._onHierarchyChanged(e);
}
} else t && this._onHierarchyChanged(null);
}
},
init: function() {
return !0;
},
attr: function(t) {
f.mixin(this, t);
},
getChildByTag: function(t) {
var e = this._children;
if (null !== e) for (var i = 0; i < e.length; i++) {
var n = e[i];
if (n && n._tag === t) return n;
}
return null;
},
getChildByUuid: function(t) {
if (!t) {
cc.log("Invalid uuid");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._id === t) return e[i];
return null;
},
getChildByName: function(t) {
if (!t) {
cc.log("Invalid name");
return null;
}
for (var e = this._children, i = 0, n = e.length; i < n; i++) if (e[i]._name === t) return e[i];
return null;
},
addChild: function(t) {
0;
cc.assertID(t, 1606);
cc.assertID(null === t._parent, 1605);
t.setParent(this);
},
insertChild: function(t, e) {
t.parent = this;
t.setSiblingIndex(e);
},
getSiblingIndex: function() {
return this._parent ? this._parent._children.indexOf(this) : 0;
},
setSiblingIndex: function(t) {
if (this._parent) {
var e = this._parent._children;
t = -1 !== t ? t : e.length - 1;
var i = e.indexOf(this);
if (t !== i) {
e.splice(i, 1);
t < e.length ? e.splice(t, 0, this) : e.push(this);
this._onSiblingIndexChanged && this._onSiblingIndexChanged(t);
}
}
},
cleanup: function() {},
removeFromParent: function(t) {
if (this._parent) {
void 0 === t && (t = !0);
this._parent.removeChild(this, t);
}
},
removeChild: function(t, e) {
if (this._children.indexOf(t) > -1) {
(e || void 0 === e) && t.cleanup();
t.parent = null;
}
},
removeChildByTag: function(t, e) {
t === cc.macro.NODE_TAG_INVALID && cc.logID(1609);
var i = this.getChildByTag(t);
i ? this.removeChild(i, e) : cc.logID(1610, t);
},
removeAllChildren: function(t) {
var e = this._children;
void 0 === t && (t = !0);
for (var i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n) {
t && n.cleanup();
n.parent = null;
}
}
this._children.length = 0;
},
isChildOf: function(t) {
var e = this;
do {
if (e === t) return !0;
e = e._parent;
} while (e);
return !1;
},
getComponent: function(t) {
var e = r(t);
return e ? s(this, e) : null;
},
getComponents: function(t) {
var e = r(t), i = [];
e && c(this, e, i);
return i;
},
getComponentInChildren: function(t) {
var e = r(t);
return e ? a(this._children, e) : null;
},
getComponentsInChildren: function(t) {
var e = r(t), i = [];
if (e) {
c(this, e, i);
h(this._children, e, i);
}
return i;
},
_checkMultipleComp: !1,
addComponent: function(i) {
0;
var n;
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
if (!(n = f.getClassByName(i))) {
cc.errorID(3807, i);
cc._RFpeek() && cc.errorID(3808, i);
return null;
}
} else {
if (!i) {
cc.errorID(3804);
return null;
}
n = i;
}
if ("function" !== ("object" == (e = typeof n) ? t(n) : e)) {
cc.errorID(3809);
return null;
}
if (!cc.isChildClassOf(n, cc.Component)) {
cc.errorID(3810);
return null;
}
0;
var o = n._requireComponent;
if (o && !this.getComponent(o)) {
if (!this.addComponent(o)) return null;
}
var r = new n();
r.node = this;
this._components.push(r);
this._activeInHierarchy && cc.director._nodeActivator.activateComp(r);
return r;
},
_addComponentAt: !1,
removeComponent: function(t) {
if (t) {
t instanceof cc.Component || (t = this.getComponent(t));
t && t.destroy();
} else cc.errorID(3813);
},
_getDependComponent: !1,
_removeComponent: function(t) {
if (t) {
if (!(this._objFlags & p)) {
var e = this._components.indexOf(t);
-1 !== e ? this._components.splice(e, 1) : t.node !== this && cc.errorID(3815);
}
} else cc.errorID(3814);
},
_disableChildComps: function() {
var t, e = this._components.length;
for (t = 0; t < e; ++t) {
var i = this._components[t];
i._enabled && cc.director._compScheduler.disableComp(i);
}
for (t = 0, e = this._children.length; t < e; ++t) {
var n = this._children[t];
n._active && n._disableChildComps();
}
},
destroy: function() {
cc.Object.prototype.destroy.call(this) && this._activeInHierarchy && this._disableChildComps();
},
destroyAllChildren: function() {
for (var t = this._children, e = 0; e < t.length; ++e) t[e].destroy();
},
_onSetParent: function(t) {},
_onPostActivated: function() {},
_onHierarchyChanged: function(t) {
var e = this._parent;
if (this._persistNode && !(e instanceof cc.Scene)) {
cc.game.removePersistRootNode(this);
0;
}
var i = this._active && !(!e || !e._activeInHierarchy);
this._activeInHierarchy !== i && cc.director._nodeActivator.activateNode(this, i);
},
_onBatchCreated: function() {
var t = this._prefab;
t && t.sync && !t._synced && t.root === this && PrefabHelper.syncWithPrefab(this);
for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated();
},
_instantiate: function(t) {
t || (t = cc.instantiate._clone(this, this));
var e = this._prefab;
0;
e && this === e.root && e.sync && (t._prefab._synced = e._synced);
t._parent = null;
t._onBatchCreated();
return t;
},
_registerIfAttached: !1,
_onPreDestroy: function() {
var t, e;
this._objFlags |= p;
var i = this._parent, n = i && i._objFlags & p;
0;
var o = this._children;
for (t = 0, e = o.length; t < e; ++t) o[t]._destroyImmediate();
for (t = 0, e = this._components.length; t < e; ++t) {
this._components[t]._destroyImmediate();
}
var r = this.__eventTargets;
for (t = 0, e = r.length; t < e; ++t) {
var s = r[t];
s && s.targetOff(this);
}
r.length = 0;
this._persistNode && cc.game.removePersistRootNode(this);
if (!n && i) {
var c = i._children.indexOf(this);
i._children.splice(c, 1);
i.emit("child-removed", this);
}
return n;
},
onRestore: !1
});
v.prototype._onPreDestroyBase = v.prototype._onPreDestroy;
0;
v.prototype._onHierarchyChangedBase = v.prototype._onHierarchyChanged;
0;
u.propertyDefine(v, [ "name", "children", "childrenCount" ], {});
0;
cc._BaseNode = n.exports = v;
}), {
"../platform/CCObject": 137,
"../platform/id-generater": 145,
"./misc": 159
} ],
156: [ (function(t, e, i) {
var n = 1e-6;
e.exports = {
binarySearchEpsilon: function(t, e) {
for (var i = 0, o = t.length - 1, r = o >>> 1; i <= o; r = i + o >>> 1) {
var s = t[r];
if (s > e + n) o = r - 1; else {
if (!(s < e - n)) return r;
i = r + 1;
}
}
return ~i;
}
};
}), {} ],
157: [ (function(t, e, i) {
var n = t("./misc").BASE64_VALUES, o = "0123456789abcdef".split(""), r = [ "", "", "", "" ], s = r.concat(r, "-", r, "-", r, "-", r, "-", r, r, r), c = s.map((function(t, e) {
return "-" === t ? NaN : e;
})).filter(isFinite);
e.exports = function(t) {
if (22 !== t.length) return t;
s[0] = t[0];
s[1] = t[1];
for (var e = 2, i = 2; e < 22; e += 2) {
var r = n[t.charCodeAt(e)], a = n[t.charCodeAt(e + 1)];
s[c[i++]] = o[r >> 2];
s[c[i++]] = o[(3 & r) << 2 | a >> 4];
s[c[i++]] = o[15 & a];
}
return s.join("");
};
0;
}), {
"./misc": 159
} ],
158: [ (function(t, e, i) {
cc.find = e.exports = function(t, e) {
if (null == t) {
cc.errorID(5600);
return null;
}
if (e) 0; else {
var i = cc.director.getScene();
if (!i) {
0;
return null;
}
0;
e = i;
}
for (var n = e, o = "/" !== t[0] ? 0 : 1, r = t.split("/"), s = o; s < r.length; s++) {
var c = r[s], a = n._children;
n = null;
for (var h = 0, l = a.length; h < l; ++h) {
var u = a[h];
if (u.name === c) {
n = u;
break;
}
}
if (!n) return null;
}
return n;
};
}), {} ],
159: [ (function(t, e, i) {
var n = t("../platform/js"), o = t("../platform/CCSys"), r = i;
r.propertyDefine = function(t, e, i) {
function n(t, e, i, n) {
var o = Object.getOwnPropertyDescriptor(t, e);
if (o) {
o.get && (t[i] = o.get);
o.set && n && (t[n] = o.set);
} else {
var r = t[i];
cc.js.getset(t, e, r, t[n]);
}
}
for (var o, r = t.prototype, s = 0; s < e.length; s++) {
var c = (o = e[s])[0].toUpperCase() + o.slice(1);
n(r, o, "get" + c, "set" + c);
}
for (o in i) {
var a = i[o];
n(r, o, a[0], a[1]);
}
};
r.NextPOT = function(t) {
t -= 1;
t |= t >> 1;
t |= t >> 2;
t |= t >> 4;
t |= t >> 8;
return (t |= t >> 16) + 1;
};
0;
r.imagePool = new n.Pool(function(t) {
if (t instanceof HTMLImageElement) {
t.src = this._smallImg;
return !0;
}
return !1;
}, 10);
r.imagePool.get = function() {
return this._get() || new Image();
};
r.imagePool._smallImg = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";
o.os !== o.OS_WINDOWS && o.os !== o.OS_LINUX || o.browserType === o.BROWSER_TYPE_CHROME || r.imagePool.resize(0);
r.BUILTIN_CLASSID_RE = /^(?:cc|dragonBones|sp|ccsg)\..+/;
for (var s = new Array(123), c = 0; c < 123; ++c) s[c] = 64;
for (var a = 0; a < 64; ++a) s["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(a)] = a;
r.BASE64_VALUES = s;
r.pushToMap = function(t, e, i, n) {
var o = t[e];
if (o) if (Array.isArray(o)) if (n) {
o.push(o[0]);
o[0] = i;
} else o.push(i); else t[e] = n ? [ i, o ] : [ o, i ]; else t[e] = i;
};
}), {
"../platform/CCSys": 138,
"../platform/js": 149
} ],
160: [ (function(t, e, i) {
function n(t) {
this.i = 0;
this.array = t;
}
var o = n.prototype;
o.remove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.removeAt(e);
};
o.removeAt = function(t) {
this.array.splice(t, 1);
t <= this.i && --this.i;
};
o.fastRemove = function(t) {
var e = this.array.indexOf(t);
e >= 0 && this.fastRemoveAt(e);
};
o.fastRemoveAt = function(t) {
var e = this.array;
e[t] = e[e.length - 1];
--e.length;
t <= this.i && --this.i;
};
o.push = function(t) {
this.array.push(t);
};
e.exports = n;
}), {} ],
161: [ (function(t, e, i) {
cc._PrefabInfo = cc.Class({
name: "cc.PrefabInfo",
properties: {
root: null,
asset: null,
fileId: "",
sync: !1,
_synced: {
default: !1,
serializable: !1
}
}
});
e.exports = {
syncWithPrefab: function(t) {
var e = t._prefab;
e._synced = !0;
if (e.asset) {
var i = t._objFlags, n = t._parent, o = t._id, r = t._name, s = t._active, c = t._position.x, a = t._position.y, h = t._rotationX, l = t._rotationY, u = t._localZOrder, d = t._globalZOrder;
cc.game._isCloning = !0;
e.asset._doInstantiate(t);
cc.game._isCloning = !1;
t._objFlags = i;
t._parent = n;
t._id = o;
t._prefab = e;
t._name = r;
t._active = s;
t._position.x = c;
t._position.y = a;
t._rotationX = h;
t._rotationY = l;
t._localZOrder = u;
t._globalZOrder = d;
} else {
cc.errorID(3701, t.name);
t._prefab = null;
}
}
};
}), {} ],
162: [ (function(t, e, i) {
var n = {
removeSgNode: function() {
var t = this._sgNode;
if (t) {
var e = t._parent;
e ? e.removeChild(t) : t.cleanup();
t._entity && (t._entity = null);
}
}
};
0;
e.exports = n;
}), {} ],
163: [ (function(t, e, i) {
cc.AffineTransform = function(t, e, i, n, o, r) {
this.a = t;
this.b = e;
this.c = i;
this.d = n;
this.tx = o;
this.ty = r;
};
cc.affineTransformMake = function(t, e, i, n, o, r) {
return {
a: t,
b: e,
c: i,
d: n,
tx: o,
ty: r
};
};
cc.affineTransformClone = function(t) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx,
ty: t.ty
};
};
cc.pointApplyAffineTransform = function(t, e, i) {
var n, o;
if (void 0 === i) {
i = e;
n = t.x;
o = t.y;
} else {
n = t;
o = e;
}
return {
x: i.a * n + i.c * o + i.tx,
y: i.b * n + i.d * o + i.ty
};
};
cc._pointApplyAffineTransformIn = function(t, e, i, n) {
var o, r, s;
if (void 0 === n) {
s = e;
o = t.x;
r = t.y;
n = i;
} else {
o = t;
r = e;
s = i;
}
n.x = s.a * o + s.c * r + s.tx;
n.y = s.b * o + s.d * r + s.ty;
};
cc._pointApplyAffineTransform = function(t, e, i) {
return cc.pointApplyAffineTransform(t, e, i);
};
cc.sizeApplyAffineTransform = function(t, e) {
return {
width: e.a * t.width + e.c * t.height,
height: e.b * t.width + e.d * t.height
};
};
cc.affineTransformMakeIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.affineTransformIdentity = function() {
return {
a: 1,
b: 0,
c: 0,
d: 1,
tx: 0,
ty: 0
};
};
cc.rectApplyAffineTransform = function(t, e) {
var i = t.x, n = t.y, o = i + t.width, r = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * o + e.c * n + e.tx, h = e.b * o + e.d * n + e.ty, l = e.a * i + e.c * r + e.tx, u = e.b * i + e.d * r + e.ty, d = e.a * o + e.c * r + e.tx, f = e.b * o + e.d * r + e.ty, p = Math.min(s, a, l, d), _ = Math.max(s, a, l, d), g = Math.min(c, h, u, f), v = Math.max(c, h, u, f);
return cc.rect(p, g, _ - p, v - g);
};
cc._rectApplyAffineTransformIn = function(t, e) {
var i = t.x, n = t.y, o = i + t.width, r = n + t.height, s = e.a * i + e.c * n + e.tx, c = e.b * i + e.d * n + e.ty, a = e.a * o + e.c * n + e.tx, h = e.b * o + e.d * n + e.ty, l = e.a * i + e.c * r + e.tx, u = e.b * i + e.d * r + e.ty, d = e.a * o + e.c * r + e.tx, f = e.b * o + e.d * r + e.ty, p = Math.min(s, a, l, d), _ = Math.max(s, a, l, d), g = Math.min(c, h, u, f), v = Math.max(c, h, u, f);
t.x = p;
t.y = g;
t.width = _ - p;
t.height = v - g;
return t;
};
cc.obbApplyAffineTransform = function(t, e, i, n, o, r) {
var s = t.x, c = t.y, a = t.width, h = t.height, l = e.a * s + e.c * c + e.tx, u = e.b * s + e.d * c + e.ty, d = e.a * a, f = e.b * a, p = e.c * h, _ = e.d * h;
n.x = l;
n.y = u;
o.x = d + l;
o.y = f + u;
i.x = p + l;
i.y = _ + u;
r.x = d + p + l;
r.y = f + _ + u;
};
cc.affineTransformTranslate = function(t, e, i) {
return {
a: t.a,
b: t.b,
c: t.c,
d: t.d,
tx: t.tx + t.a * e + t.c * i,
ty: t.ty + t.b * e + t.d * i
};
};
cc.affineTransformScale = function(t, e, i) {
return {
a: t.a * e,
b: t.b * e,
c: t.c * i,
d: t.d * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformRotate = function(t, e) {
var i = Math.sin(e), n = Math.cos(e);
return {
a: t.a * n + t.c * i,
b: t.b * n + t.d * i,
c: t.c * n - t.a * i,
d: t.d * n - t.b * i,
tx: t.tx,
ty: t.ty
};
};
cc.affineTransformConcat = function(t, e) {
return {
a: t.a * e.a + t.b * e.c,
b: t.a * e.b + t.b * e.d,
c: t.c * e.a + t.d * e.c,
d: t.c * e.b + t.d * e.d,
tx: t.tx * e.a + t.ty * e.c + e.tx,
ty: t.tx * e.b + t.ty * e.d + e.ty
};
};
cc.affineTransformConcatIn = function(t, e) {
var i = t.a, n = t.b, o = t.c, r = t.d, s = t.tx, c = t.ty;
t.a = i * e.a + n * e.c;
t.b = i * e.b + n * e.d;
t.c = o * e.a + r * e.c;
t.d = o * e.b + r * e.d;
t.tx = s * e.a + c * e.c + e.tx;
t.ty = s * e.b + c * e.d + e.ty;
return t;
};
cc.affineTransformEqualToTransform = function(t, e) {
return t.a === e.a && t.b === e.b && t.c === e.c && t.d === e.d && t.tx === e.tx && t.ty === e.ty;
};
cc.affineTransformInvert = function(t) {
var e = 1 / (t.a * t.d - t.b * t.c);
return {
a: e * t.d,
b: -e * t.b,
c: -e * t.c,
d: e * t.a,
tx: e * (t.c * t.ty - t.d * t.tx),
ty: e * (t.b * t.tx - t.a * t.ty)
};
};
cc.affineTransformInvertOut = function(t, e) {
var i = t.a, n = t.b, o = t.c, r = t.d, s = 1 / (i * r - n * o);
e.a = s * r;
e.b = -s * n;
e.c = -s * o;
e.d = s * i;
e.tx = s * (o * t.ty - r * t.tx);
e.ty = s * (n * t.tx - i * t.ty);
};
}), {} ],
164: [ (function(i, n, o) {
var r = i("./CCValueType"), s = i("../platform/js"), c = (function() {
function n(i, n, o, r) {
if ("object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.g;
o = i.b;
r = i.a;
i = i.r;
}
i = i || 0;
n = n || 0;
o = o || 0;
r = "number" === ("object" == (e = typeof r) ? t(r) : e) ? r : 255;
this._val = (~~i << 24 >>> 0) + (~~n << 16) + (~~o << 8) + ~~r;
}
s.extend(n, r);
i("../platform/CCClass").fastDefine("cc.Color", n, {
r: 0,
g: 0,
b: 0,
a: 255
});
var o = {
WHITE: [ 255, 255, 255, 255 ],
BLACK: [ 0, 0, 0, 255 ],
TRANSPARENT: [ 0, 0, 0, 0 ],
GRAY: [ 127.5, 127.5, 127.5 ],
RED: [ 255, 0, 0 ],
GREEN: [ 0, 255, 0 ],
BLUE: [ 0, 0, 255 ],
YELLOW: [ 255, 235, 4 ],
ORANGE: [ 255, 127, 0 ],
CYAN: [ 0, 255, 255 ],
MAGENTA: [ 255, 0, 255 ]
};
for (var c in o) s.get(n, c, (function(t) {
return function() {
return new n(t[0], t[1], t[2], t[3]);
};
})(o[c]));
var a = n.prototype;
a.clone = function() {
var t = new n();
t._val = this._val;
return t;
};
a.equals = function(t) {
return t && this._val === t._val;
};
a.lerp = function(t, e, i) {
i = i || new n();
var o = this.r, r = this.g, s = this.b, c = this.a;
i.r = o + (t.r - o) * e;
i.g = r + (t.g - r) * e;
i.b = s + (t.b - s) * e;
i.a = c + (t.a - c) * e;
return i;
};
a.toString = function() {
return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")";
};
a.getR = function() {
return (4278190080 & this._val) >>> 24;
};
a.setR = function(t) {
this._val = (16777215 & this._val | ~~t << 24 >>> 0) >>> 0;
return this;
};
a.getG = function() {
return (16711680 & this._val) >> 16;
};
a.setG = function(t) {
this._val = (4278255615 & this._val | ~~t << 16) >>> 0;
return this;
};
a.getB = function() {
return (65280 & this._val) >> 8;
};
a.setB = function(t) {
this._val = (4294902015 & this._val | ~~t << 8) >>> 0;
return this;
};
a.getA = function() {
return 255 & this._val;
};
a.setA = function(t) {
this._val = (4294967040 & this._val | ~~t) >>> 0;
return this;
};
s.getset(a, "r", a.getR, a.setR, !0);
s.getset(a, "g", a.getG, a.setG, !0);
s.getset(a, "b", a.getB, a.setB, !0);
s.getset(a, "a", a.getA, a.setA, !0);
a.toCSS = function(t) {
return "rgba" === t ? "rgba(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + "," + (this.a / 255).toFixed(2) + ")" : "rgb" === t ? "rgb(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + ")" : "#" + this.toHEX(t);
};
a.clamp = function() {};
a.fromHEX = function(t) {
t.length < 8 && (t += "FF");
var e = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16);
this._val = (0 & this._val | e) >>> 0;
return this;
};
a.toHEX = function(t) {
var e = [ (0 | this.r).toString(16), (0 | this.g).toString(16), (0 | this.b).toString(16) ], i = -1;
if ("#rgb" === t) for (i = 0; i < e.length; ++i) e[i].length > 1 && (e[i] = e[i][0]); else if ("#rrggbb" === t) for (i = 0; i < e.length; ++i) 1 === e[i].length && (e[i] = "0" + e[i]);
return e.join("");
};
a.toRGBValue = function() {
return 16777215 & this._val;
};
a.fromHSV = function(t, e, i) {
var o = n.hsv2rgb(t, e, i);
this._val = (o.r << 24 >>> 0) + (o.g << 16) + (o.b << 8) + this.a;
return this;
};
a.toHSV = function() {
return n.rgb2hsv(this.r, this.g, this.b);
};
a.fromColor = function(t) {
if (t._val) this._val = t._val; else {
this.r = t.r;
this.g = t.g;
this.b = t.b;
this.a = t.a;
}
};
return n;
})();
c.rgb2hsv = function(t, e, i) {
t /= 255;
e /= 255;
i /= 255;
var n = {
h: 0,
s: 0,
v: 0
}, o = Math.max(t, e, i), r = Math.min(t, e, i), s = 0;
n.v = o;
n.s = o ? (o - r) / o : 0;
if (n.s) {
s = o - r;
n.h = t === o ? (e - i) / s : e === o ? 2 + (i - t) / s : 4 + (t - e) / s;
n.h /= 6;
n.h < 0 && (n.h += 1);
} else n.h = 0;
return n;
};
c.hsv2rgb = function(t, e, i) {
var n = {
r: 0,
g: 0,
b: 0
};
if (0 === e) n.r = n.g = n.b = i; else if (0 === i) n.r = n.g = n.b = 0; else {
1 === t && (t = 0);
t *= 6;
e = e;
i = i;
var o = Math.floor(t), r = t - o, s = i * (1 - e), c = i * (1 - e * r), a = i * (1 - e * (1 - r));
switch (o) {
case 0:
n.r = i;
n.g = a;
n.b = s;
break;

case 1:
n.r = c;
n.g = i;
n.b = s;
break;

case 2:
n.r = s;
n.g = i;
n.b = a;
break;

case 3:
n.r = s;
n.g = c;
n.b = i;
break;

case 4:
n.r = a;
n.g = s;
n.b = i;
break;

case 5:
n.r = i;
n.g = s;
n.b = c;
}
}
n.r *= 255;
n.g *= 255;
n.b *= 255;
return n;
};
cc.Color = c;
cc.color = function(i, n, o, r) {
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
return new cc.Color().fromHEX(i);
}
return "object" === ("object" == (e = typeof i) ? t(i) : e) ? new cc.Color(i.r, i.g, i.b, i.a) : new cc.Color(i, n, o, r);
};
cc.colorEqual = function(t, e) {
return void 0 !== t._val && void 0 !== e._val ? t._val === e._val : t.r === e.r && t.g === e.g && t.b === e.b;
};
cc.hexToColor = function(t) {
t = t.replace(/^#?/, "0x");
var e = parseInt(t), i = e >> 16, n = (65280 & e) >> 8, o = 255 & e;
return cc.color(i, n, o);
};
cc.colorToHex = function(t) {
var e = t.r.toString(16), i = t.g.toString(16), n = t.b.toString(16);
return "#" + (t.r < 16 ? "0" + e : e) + (t.g < 16 ? "0" + i : i) + (t.b < 16 ? "0" + n : n);
};
n.exports = cc.Color;
}), {
"../platform/CCClass": 133,
"../platform/js": 149,
"./CCValueType": 170
} ],
165: [ (function(t, e, i) {
var n = parseFloat("1.192092896e-07F");
cc.pNeg = function(t) {
return cc.p(-t.x, -t.y);
};
cc.pAdd = function(t, e) {
return cc.p(t.x + e.x, t.y + e.y);
};
cc.pSub = function(t, e) {
return cc.p(t.x - e.x, t.y - e.y);
};
cc.pMult = function(t, e) {
return cc.p(t.x * e, t.y * e);
};
cc.pMidpoint = function(t, e) {
return cc.pMult(cc.pAdd(t, e), .5);
};
cc.pDot = function(t, e) {
return t.x * e.x + t.y * e.y;
};
cc.pCross = function(t, e) {
return t.x * e.y - t.y * e.x;
};
cc.pPerp = function(t) {
return cc.p(-t.y, t.x);
};
cc.pRPerp = function(t) {
return cc.p(t.y, -t.x);
};
cc.pProject = function(t, e) {
return cc.pMult(e, cc.pDot(t, e) / cc.pDot(e, e));
};
cc.pLengthSQ = function(t) {
return cc.pDot(t, t);
};
cc.pDistanceSQ = function(t, e) {
return cc.pLengthSQ(cc.pSub(t, e));
};
cc.pLength = function(t) {
return Math.sqrt(cc.pLengthSQ(t));
};
cc.pDistance = function(t, e) {
return cc.pLength(cc.pSub(t, e));
};
cc.pNormalize = function(t) {
var e = cc.pLength(t);
return 0 === e ? cc.p(t) : cc.pMult(t, 1 / e);
};
cc.pForAngle = function(t) {
return cc.p(Math.cos(t), Math.sin(t));
};
cc.pToAngle = function(t) {
return Math.atan2(t.y, t.x);
};
cc.clampf = function(t, e, i) {
if (e > i) {
var n = e;
e = i;
i = n;
}
return t < e ? e : t < i ? t : i;
};
cc.clamp01 = function(t) {
return t < 0 ? 0 : t < 1 ? t : 1;
};
cc.pClamp = function(t, e, i) {
return cc.p(cc.clampf(t.x, e.x, i.x), cc.clampf(t.y, e.y, i.y));
};
cc.pFromSize = function(t) {
return cc.p(t.width, t.height);
};
cc.pCompOp = function(t, e) {
return cc.p(e(t.x), e(t.y));
};
cc.pLerp = function(t, e, i) {
return cc.pAdd(cc.pMult(t, 1 - i), cc.pMult(e, i));
};
cc.pFuzzyEqual = function(t, e, i) {
return t.x - i <= e.x && e.x <= t.x + i && t.y - i <= e.y && e.y <= t.y + i;
};
cc.pCompMult = function(t, e) {
return cc.p(t.x * e.x, t.y * e.y);
};
cc.pAngleSigned = function(t, e) {
var i = cc.pNormalize(t), o = cc.pNormalize(e), r = Math.atan2(i.x * o.y - i.y * o.x, cc.pDot(i, o));
return Math.abs(r) < n ? 0 : r;
};
cc.pAngle = function(t, e) {
var i = Math.acos(cc.pDot(cc.pNormalize(t), cc.pNormalize(e)));
return Math.abs(i) < n ? 0 : i;
};
cc.pRotateByAngle = function(t, e, i) {
var n = cc.pSub(t, e), o = Math.cos(i), r = Math.sin(i), s = n.x;
n.x = s * o - n.y * r + e.x;
n.y = s * r + n.y * o + e.y;
return n;
};
cc.pLineIntersect = function(t, e, i, n, o) {
if (t.x === e.x && t.y === e.y || i.x === n.x && i.y === n.y) return !1;
var r = e.x - t.x, s = e.y - t.y, c = n.x - i.x, a = n.y - i.y, h = t.x - i.x, l = t.y - i.y, u = a * r - c * s;
o.x = c * l - a * h;
o.y = r * l - s * h;
if (0 === u) return 0 === o.x || 0 === o.y;
o.x = o.x / u;
o.y = o.y / u;
return !0;
};
cc.pSegmentIntersect = function(t, e, i, n) {
var o = cc.p(0, 0);
return !!(cc.pLineIntersect(t, e, i, n, o) && o.x >= 0 && o.x <= 1 && o.y >= 0 && o.y <= 1);
};
cc.pIntersectPoint = function(t, e, i, n) {
var o = cc.p(0, 0);
if (cc.pLineIntersect(t, e, i, n, o)) {
var r = cc.p(0, 0);
r.x = t.x + o.x * (e.x - t.x);
r.y = t.y + o.x * (e.y - t.y);
return r;
}
return cc.p(0, 0);
};
cc.pSameAs = function(t, e) {
return null != t && null != e && (t.x === e.x && t.y === e.y);
};
cc.pZeroIn = function(t) {
t.x = 0;
t.y = 0;
};
cc.pIn = function(t, e) {
t.x = e.x;
t.y = e.y;
};
cc.pMultIn = function(t, e) {
t.x *= e;
t.y *= e;
};
cc.pSubIn = function(t, e) {
t.x -= e.x;
t.y -= e.y;
};
cc.pAddIn = function(t, e) {
t.x += e.x;
t.y += e.y;
};
cc.pNormalizeIn = function(t) {
cc.pMultIn(t, 1 / Math.sqrt(t.x * t.x + t.y * t.y));
};
}), {} ],
166: [ (function(i, n, o) {
function r(i, n, o, r) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
o = i.width;
r = i.height;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
this.width = o || 0;
this.height = r || 0;
}
var s = i("./CCValueType"), c = i("../platform/js");
c.extend(r, s);
i("../platform/CCClass").fastDefine("cc.Rect", r, {
x: 0,
y: 0,
width: 0,
height: 0
});
r.fromMinMax = function(t, e) {
var i = Math.min(t.x, e.x), n = Math.min(t.y, e.y);
return new r(i, n, Math.max(t.x, e.x) - i, Math.max(t.y, e.y) - n);
};
r.contain = function(t, e) {
return t.x < e.x && t.x + t.width > e.x + e.width && t.y < e.y && t.y + t.height > e.y + e.height ? 1 : e.x < t.x && e.x + e.width > t.x + t.width && e.y < t.y && e.y + e.height > t.y + t.height ? -1 : 0;
};
var a = r.prototype;
a.clone = function() {
return new r(this.x, this.y, this.width, this.height);
};
a.equals = function(t) {
return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new r();
var n = this.x, o = this.y, s = this.width, c = this.height;
i.x = n + (t.x - n) * e;
i.y = o + (t.y - o) * e;
i.width = s + (t.width - s) * e;
i.height = c + (t.height - c) * e;
return i;
};
a.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
c.getset(a, "xMin", (function() {
return this.x;
}), (function(t) {
this.width += this.x - t;
this.x = t;
}));
c.getset(a, "yMin", (function() {
return this.y;
}), (function(t) {
this.height += this.y - t;
this.y = t;
}));
c.getset(a, "xMax", (function() {
return this.x + this.width;
}), (function(t) {
this.width = t - this.x;
}));
c.getset(a, "yMax", (function() {
return this.y + this.height;
}), (function(t) {
this.height = t - this.y;
}));
c.getset(a, "center", (function() {
return new cc.Vec2(this.x + .5 * this.width, this.y + .5 * this.height);
}), (function(t) {
this.x = t.x - .5 * this.width;
this.y = t.y - .5 * this.height;
}));
c.getset(a, "origin", (function() {
return new cc.Vec2(this.x, this.y);
}), (function(t) {
this.x = t.x;
this.y = t.y;
}));
c.getset(a, "size", (function() {
return new cc.Size(this.width, this.height);
}), (function(t) {
this.width = t.width;
this.height = t.height;
}));
a.intersects = function(t) {
return cc.rectIntersectsRect(this, t);
};
a.contains = function(t) {
return this.x <= t.x && this.x + this.width >= t.x && this.y <= t.y && this.y + this.height >= t.y;
};
a.containsRect = function(t) {
return this.x <= t.x && this.x + this.width >= t.x + t.width && this.y <= t.y && this.y + this.height >= t.y + t.height;
};
cc.Rect = r;
cc.rect = function(t, e, i, n) {
return new r(t, e, i, n);
};
cc.rectEqualToRect = function(t, e) {
return t && e && t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
};
cc._rectEqualToZero = function(t) {
return t && 0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height;
};
cc.rectContainsRect = function(t, e) {
return !(!t || !e) && !(t.x >= e.x || t.y >= e.y || t.x + t.width <= e.x + e.width || t.y + t.height <= e.y + e.height);
};
cc.rectGetMaxX = function(t) {
return t.x + t.width;
};
cc.rectGetMidX = function(t) {
return t.x + t.width / 2;
};
cc.rectGetMinX = function(t) {
return t.x;
};
cc.rectGetMaxY = function(t) {
return t.y + t.height;
};
cc.rectGetMidY = function(t) {
return t.y + t.height / 2;
};
cc.rectGetMinY = function(t) {
return t.y;
};
cc.rectContainsPoint = function(t, e) {
return e.x >= cc.rectGetMinX(t) && e.x <= cc.rectGetMaxX(t) && e.y >= cc.rectGetMinY(t) && e.y <= cc.rectGetMaxY(t);
};
cc.rectIntersectsRect = function(t, e) {
var i = t.x + t.width, n = t.y + t.height, o = e.x + e.width, r = e.y + e.height;
return !(i < e.x || o < t.x || n < e.y || r < t.y);
};
cc.rectOverlapsRect = function(t, e) {
return !(t.x + t.width < e.x || e.x + e.width < t.x || t.y + t.height < e.y || e.y + e.height < t.y);
};
cc.rectUnion = function(t, e) {
var i = cc.rect(0, 0, 0, 0);
i.x = Math.min(t.x, e.x);
i.y = Math.min(t.y, e.y);
i.width = Math.max(t.x + t.width, e.x + e.width) - i.x;
i.height = Math.max(t.y + t.height, e.y + e.height) - i.y;
return i;
};
cc.rectIntersection = function(t, e) {
var i = cc.rect(Math.max(cc.rectGetMinX(t), cc.rectGetMinX(e)), Math.max(cc.rectGetMinY(t), cc.rectGetMinY(e)), 0, 0);
i.width = Math.min(cc.rectGetMaxX(t), cc.rectGetMaxX(e)) - cc.rectGetMinX(i);
i.height = Math.min(cc.rectGetMaxY(t), cc.rectGetMaxY(e)) - cc.rectGetMinY(i);
return i;
};
n.exports = cc.Rect;
}), {
"../platform/CCClass": 133,
"../platform/js": 149,
"./CCValueType": 170
} ],
167: [ (function(i, n, o) {
function r(i, n) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.height;
i = i.width;
}
this.width = i || 0;
this.height = n || 0;
}
var s = i("./CCValueType"), c = i("../platform/js");
c.extend(r, s);
i("../platform/CCClass").fastDefine("cc.Size", r, {
width: 0,
height: 0
});
c.get(r, "ZERO", (function() {
return new r(0, 0);
}));
var a = r.prototype;
a.clone = function() {
return new r(this.width, this.height);
};
a.equals = function(t) {
return t && this.width === t.width && this.height === t.height;
};
a.lerp = function(t, e, i) {
i = i || new r();
var n = this.width, o = this.height;
i.width = n + (t.width - n) * e;
i.height = o + (t.height - o) * e;
return i;
};
a.toString = function() {
return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")";
};
cc.size = function(t, e) {
return new r(t, e);
};
cc.sizeEqualToSize = function(t, e) {
return t && e && t.width === e.width && t.height === e.height;
};
cc.Size = n.exports = r;
}), {
"../platform/CCClass": 133,
"../platform/js": 149,
"./CCValueType": 170
} ],
168: [ (function(t, e, i) {
cc.Acceleration = function(t, e, i, n) {
this.x = t || 0;
this.y = e || 0;
this.z = i || 0;
this.timestamp = n || 0;
};
cc.BlendFunc = function(t, e) {
this.src = t;
this.dst = e;
};
var n = cc.Enum({
ONE: 1,
ZERO: 0,
SRC_ALPHA: 770,
SRC_COLOR: 768,
DST_ALPHA: 772,
DST_COLOR: 774,
ONE_MINUS_SRC_ALPHA: 771,
ONE_MINUS_SRC_COLOR: 769,
ONE_MINUS_DST_ALPHA: 773,
ONE_MINUS_DST_COLOR: 775
});
cc.BlendFunc._disable = function() {
return new cc.BlendFunc(n.ONE, n.ZERO);
};
cc.BlendFunc._alphaPremultiplied = function() {
return new cc.BlendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._alphaNonPremultiplied = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA);
};
cc.BlendFunc._additive = function() {
return new cc.BlendFunc(n.SRC_ALPHA, n.ONE);
};
cc.BlendFunc.BlendFactor = n;
cc.BlendFunc.DISABLE;
cc.js.get(cc.BlendFunc, "DISABLE", cc.BlendFunc._disable);
cc.BlendFunc.ALPHA_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_PREMULTIPLIED", cc.BlendFunc._alphaPremultiplied);
cc.BlendFunc.ALPHA_NON_PREMULTIPLIED;
cc.js.get(cc.BlendFunc, "ALPHA_NON_PREMULTIPLIED", cc.BlendFunc._alphaNonPremultiplied);
cc.BlendFunc.ADDITIVE;
cc.js.get(cc.BlendFunc, "ADDITIVE", cc.BlendFunc._additive);
cc.blendFuncDisable = cc.BlendFunc._disable;
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
169: [ (function(i, n, o) {
cc.WebGLColor = function(i, n, o, r, s, c) {
this._arrayBuffer = s || new ArrayBuffer(cc.WebGLColor.BYTES_PER_ELEMENT);
this._offset = c || 0;
var a = this._arrayBuffer, h = this._offset;
this._view = new Uint8Array(a, h, 4);
this._view[0] = i || 0;
this._view[1] = n || 0;
this._view[2] = o || 0;
if ("number" === ("object" == (e = typeof r) ? t(r) : e)) this._view[3] = r; else {
this._view[3] = 255;
this.a_undefined = !0;
}
};
cc.WebGLColor.BYTES_PER_ELEMENT = 4;
(r = cc.WebGLColor.prototype)._getR = function() {
return this._view[0];
};
r._setR = function(t) {
this._view[0] = t < 0 ? 0 : t;
};
r._getG = function() {
return this._view[1];
};
r._setG = function(t) {
this._view[1] = t < 0 ? 0 : t;
};
r._getB = function() {
return this._view[2];
};
r._setB = function(t) {
this._view[2] = t < 0 ? 0 : t;
};
r._getA = function() {
return this._view[3];
};
r._setA = function(t) {
this._view[3] = t < 0 ? 0 : t;
};
r.r;
cc.js.getset(r, "r", r._getR, r._setR);
r.g;
cc.js.getset(r, "g", r._getG, r._setG);
r.b;
cc.js.getset(r, "b", r._getB, r._setB);
r.a;
cc.js.getset(r, "a", r._getA, r._setA);
cc.Vertex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Vertex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Vertex2F.BYTES_PER_ELEMENT = 8;
var r;
(r = cc.Vertex2F.prototype)._getX = function() {
return this._view[0];
};
r._setX = function(t) {
this._view[0] = t;
};
r._getY = function() {
return this._view[1];
};
r._setY = function(t) {
this._view[1] = t;
};
cc.js.getset(r, "x", r._getX, r._setX);
cc.js.getset(r, "y", r._getY, r._setY);
cc.Vertex3F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.Vertex3F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._view = new Float32Array(r, s, 3);
this._view[0] = t || 0;
this._view[1] = e || 0;
this._view[2] = i || 0;
};
cc.Vertex3F.BYTES_PER_ELEMENT = 12;
(r = cc.Vertex3F.prototype)._getX = function() {
return this._view[0];
};
r._setX = function(t) {
this._view[0] = t;
};
r._getY = function() {
return this._view[1];
};
r._setY = function(t) {
this._view[1] = t;
};
r._getZ = function() {
return this._view[2];
};
r._setZ = function(t) {
this._view[2] = t;
};
cc.js.getset(r, "x", r._getX, r._setX);
cc.js.getset(r, "y", r._getY, r._setY);
cc.js.getset(r, "z", r._getZ, r._setZ);
cc.Tex2F = function(t, e, i, n) {
this._arrayBuffer = i || new ArrayBuffer(cc.Tex2F.BYTES_PER_ELEMENT);
this._offset = n || 0;
this._view = new Float32Array(this._arrayBuffer, this._offset, 2);
this._view[0] = t || 0;
this._view[1] = e || 0;
};
cc.Tex2F.BYTES_PER_ELEMENT = 8;
(r = cc.Tex2F.prototype)._getU = function() {
return this._view[0];
};
r._setU = function(t) {
this._view[0] = t;
};
r._getV = function() {
return this._view[1];
};
r._setV = function(t) {
this._view[1] = t;
};
cc.js.getset(r, "u", r._getU, r._setU);
cc.js.getset(r, "v", r._getV, r._setV);
cc.Quad2 = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.Quad2.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.Vertex2F(t.x, t.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._tr = e ? new cc.Vertex2F(e.x, e.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._bl = i ? new cc.Vertex2F(i.x, i.y, s, c) : new cc.Vertex2F(0, 0, s, c);
c += a;
this._br = n ? new cc.Vertex2F(n.x, n.y, s, c) : new cc.Vertex2F(0, 0, s, c);
};
cc.Quad2.BYTES_PER_ELEMENT = 32;
(r = cc.Quad2.prototype)._getTL = function() {
return this._tl;
};
r._setTL = function(t) {
this._tl._view[0] = t.x;
this._tl._view[1] = t.y;
};
r._getTR = function() {
return this._tr;
};
r._setTR = function(t) {
this._tr._view[0] = t.x;
this._tr._view[1] = t.y;
};
r._getBL = function() {
return this._bl;
};
r._setBL = function(t) {
this._bl._view[0] = t.x;
this._bl._view[1] = t.y;
};
r._getBR = function() {
return this._br;
};
r._setBR = function(t) {
this._br._view[0] = t.x;
this._br._view[1] = t.y;
};
cc.js.getset(r, "tl", r._getTL, r._setTL);
cc.js.getset(r, "tr", r._getTR, r._setTR);
cc.js.getset(r, "bl", r._getBL, r._setBL);
cc.js.getset(r, "br", r._getBR, r._setBR);
cc.Quad3 = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.Quad3.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.Vertex3F.BYTES_PER_ELEMENT;
this.bl = bl ? new cc.Vertex3F(bl.x, bl.y, bl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.br = br ? new cc.Vertex3F(br.x, br.y, br.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tl = tl ? new cc.Vertex3F(tl.x, tl.y, tl.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
c += a;
this.tr = tr ? new cc.Vertex3F(tr.x, tr.y, tr.z, s, c) : new cc.Vertex3F(0, 0, 0, s, c);
};
cc.Quad3.BYTES_PER_ELEMENT = 48;
cc.V3F_C4B_T2F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V3F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex3F(t.x, t.y, t.z, r, s) : new cc.Vertex3F(0, 0, 0, r, s);
s += cc.Vertex3F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, r, s) : new cc.WebGLColor(0, 0, 0, 0, r, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, r, s) : new cc.Tex2F(0, 0, r, s);
};
cc.V3F_C4B_T2F.BYTES_PER_ELEMENT = 24;
(r = cc.V3F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
r._setVertices = function(t) {
var e = this._vertices;
e._view[0] = t.x;
e._view[1] = t.y;
e._view[2] = t.z;
};
r._getColor = function() {
return this._colors;
};
r._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
r._getTexCoords = function() {
return this._texCoords;
};
r._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(r, "vertices", r._getVertices, r._setVertices);
cc.js.getset(r, "colors", r._getColor, r._setColor);
cc.js.getset(r, "texCoords", r._getTexCoords, r._setTexCoords);
cc.V3F_C4B_T2F_Quad = function(t, e, i, n, o, r) {
this._arrayBuffer = o || new ArrayBuffer(cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT);
this._offset = r || 0;
var s = this._arrayBuffer, c = this._offset, a = cc.V3F_C4B_T2F.BYTES_PER_ELEMENT;
this._tl = t ? new cc.V3F_C4B_T2F(t.vertices, t.colors, t.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._bl = e ? new cc.V3F_C4B_T2F(e.vertices, e.colors, e.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._tr = i ? new cc.V3F_C4B_T2F(i.vertices, i.colors, i.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
c += a;
this._br = n ? new cc.V3F_C4B_T2F(n.vertices, n.colors, n.texCoords, s, c) : new cc.V3F_C4B_T2F(null, null, null, s, c);
};
cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT = 96;
(r = cc.V3F_C4B_T2F_Quad.prototype)._getTL = function() {
return this._tl;
};
r._setTL = function(t) {
var e = this._tl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getBL = function() {
return this._bl;
};
r._setBL = function(t) {
var e = this._bl;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getTR = function() {
return this._tr;
};
r._setTR = function(t) {
var e = this._tr;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getBR = function() {
return this._br;
};
r._setBR = function(t) {
var e = this._br;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getArrayBuffer = function() {
return this._arrayBuffer;
};
cc.js.getset(r, "tl", r._getTL, r._setTL);
cc.js.getset(r, "tr", r._getTR, r._setTR);
cc.js.getset(r, "bl", r._getBL, r._setBL);
cc.js.getset(r, "br", r._getBR, r._setBR);
cc.js.get(r, "arrayBuffer", r._getArrayBuffer);
cc.V3F_C4B_T2F_QuadZero = function() {
return new cc.V3F_C4B_T2F_Quad();
};
cc.V3F_C4B_T2F_QuadCopy = function(t) {
if (!t) return cc.V3F_C4B_T2F_QuadZero();
var e = t.tl, i = t.bl, n = t.tr, o = t.br;
return {
tl: {
vertices: {
x: e.vertices.x,
y: e.vertices.y,
z: e.vertices.z
},
colors: {
r: e.colors.r,
g: e.colors.g,
b: e.colors.b,
a: e.colors.a
},
texCoords: {
u: e.texCoords.u,
v: e.texCoords.v
}
},
bl: {
vertices: {
x: i.vertices.x,
y: i.vertices.y,
z: i.vertices.z
},
colors: {
r: i.colors.r,
g: i.colors.g,
b: i.colors.b,
a: i.colors.a
},
texCoords: {
u: i.texCoords.u,
v: i.texCoords.v
}
},
tr: {
vertices: {
x: n.vertices.x,
y: n.vertices.y,
z: n.vertices.z
},
colors: {
r: n.colors.r,
g: n.colors.g,
b: n.colors.b,
a: n.colors.a
},
texCoords: {
u: n.texCoords.u,
v: n.texCoords.v
}
},
br: {
vertices: {
x: o.vertices.x,
y: o.vertices.y,
z: o.vertices.z
},
colors: {
r: o.colors.r,
g: o.colors.g,
b: o.colors.b,
a: o.colors.a
},
texCoords: {
u: o.texCoords.u,
v: o.texCoords.v
}
}
};
};
cc.V3F_C4B_T2F_QuadsCopy = function(t) {
if (!t) return [];
for (var e = [], i = 0; i < t.length; i++) e.push(cc.V3F_C4B_T2F_QuadCopy(t[i]));
return e;
};
cc.V2F_C4B_T2F = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset;
this._vertices = t ? new cc.Vertex2F(t.x, t.y, r, s) : new cc.Vertex2F(0, 0, r, s);
s += cc.Vertex2F.BYTES_PER_ELEMENT;
this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, r, s) : new cc.WebGLColor(0, 0, 0, 0, r, s);
s += cc.WebGLColor.BYTES_PER_ELEMENT;
this._texCoords = i ? new cc.Tex2F(i.u, i.v, r, s) : new cc.Tex2F(0, 0, r, s);
};
cc.V2F_C4B_T2F.BYTES_PER_ELEMENT = 20;
(r = cc.V2F_C4B_T2F.prototype)._getVertices = function() {
return this._vertices;
};
r._setVertices = function(t) {
this._vertices._view[0] = t.x;
this._vertices._view[1] = t.y;
};
r._getColor = function() {
return this._colors;
};
r._setColor = function(t) {
var e = this._colors;
e._view[0] = t.r;
e._view[1] = t.g;
e._view[2] = t.b;
e._view[3] = t.a;
};
r._getTexCoords = function() {
return this._texCoords;
};
r._setTexCoords = function(t) {
this._texCoords._view[0] = t.u;
this._texCoords._view[1] = t.v;
};
cc.js.getset(r, "vertices", r._getVertices, r._setVertices);
cc.js.getset(r, "colors", r._getColor, r._setColor);
cc.js.getset(r, "texCoords", r._getTexCoords, r._setTexCoords);
cc.V2F_C4B_T2F_Triangle = function(t, e, i, n, o) {
this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT);
this._offset = o || 0;
var r = this._arrayBuffer, s = this._offset, c = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
this._a = t ? new cc.V2F_C4B_T2F(t.vertices, t.colors, t.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
s += c;
this._b = e ? new cc.V2F_C4B_T2F(e.vertices, e.colors, e.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
s += c;
this._c = i ? new cc.V2F_C4B_T2F(i.vertices, i.colors, i.texCoords, r, s) : new cc.V2F_C4B_T2F(null, null, null, r, s);
};
cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT = 60;
(r = cc.V2F_C4B_T2F_Triangle.prototype)._getA = function() {
return this._a;
};
r._setA = function(t) {
var e = this._a;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getB = function() {
return this._b;
};
r._setB = function(t) {
var e = this._b;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
r._getC = function() {
return this._c;
};
r._setC = function(t) {
var e = this._c;
e.vertices = t.vertices;
e.colors = t.colors;
e.texCoords = t.texCoords;
};
cc.js.getset(r, "a", r._getA, r._setA);
cc.js.getset(r, "b", r._getB, r._setB);
cc.js.getset(r, "c", r._getC, r._setC);
}), {} ],
170: [ (function(t, e, i) {
function n() {}
var o = t("../platform/js");
o.setClassName("cc.ValueType", n);
var r = n.prototype;
0;
r.toString = function() {
return "" + {};
};
cc.ValueType = n;
e.exports = n;
}), {
"../platform/js": 149
} ],
171: [ (function(i, n, o) {
function r(i, n) {
if (i && "object" === ("object" == (e = typeof i) ? t(i) : e)) {
n = i.y;
i = i.x;
}
this.x = i || 0;
this.y = n || 0;
}
var s = i("./CCValueType"), c = i("../platform/js"), a = i("../platform/CCClass");
c.extend(r, s);
a.fastDefine("cc.Vec2", r, {
x: 0,
y: 0
});
var h = r.prototype;
h.clone = function() {
return new r(this.x, this.y);
};
h.set = function(t) {
this.x = t.x;
this.y = t.y;
return this;
};
h.equals = function(t) {
return t && this.x === t.x && this.y === t.y;
};
h.toString = function() {
return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")";
};
h.lerp = function(t, e, i) {
i = i || new r();
var n = this.x, o = this.y;
i.x = n + (t.x - n) * e;
i.y = o + (t.y - o) * e;
return i;
};
h.addSelf = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
h.add = function(t, e) {
(e = e || new r()).x = this.x + t.x;
e.y = this.y + t.y;
return e;
};
h.subSelf = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
h.sub = function(t, e) {
(e = e || new r()).x = this.x - t.x;
e.y = this.y - t.y;
return e;
};
h.mulSelf = function(t) {
this.x *= t;
this.y *= t;
return this;
};
h.mul = function(t, e) {
(e = e || new r()).x = this.x * t;
e.y = this.y * t;
return e;
};
h.scaleSelf = function(t) {
this.x *= t.x;
this.y *= t.y;
return this;
};
h.scale = function(t, e) {
(e = e || new r()).x = this.x * t.x;
e.y = this.y * t.y;
return e;
};
h.divSelf = function(t) {
this.x /= t;
this.y /= t;
return this;
};
h.div = function(t, e) {
(e = e || new r()).x = this.x / t;
e.y = this.y / t;
return e;
};
h.negSelf = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
h.neg = function(t) {
(t = t || new r()).x = -this.x;
t.y = -this.y;
return t;
};
h.dot = function(t) {
return this.x * t.x + this.y * t.y;
};
h.cross = function(t) {
return this.y * t.x - this.x * t.y;
};
h.mag = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
h.magSqr = function() {
return this.x * this.x + this.y * this.y;
};
h.normalizeSelf = function() {
var t = this.x * this.x + this.y * this.y;
if (1 === t) return this;
if (0 === t) {
console.warn("Can't normalize zero vector");
return this;
}
var e = 1 / Math.sqrt(t);
this.x *= e;
this.y *= e;
return this;
};
h.normalize = function(t) {
(t = t || new r()).x = this.x;
t.y = this.y;
t.normalizeSelf();
return t;
};
h.angle = function(t) {
var e = this.magSqr(), i = t.magSqr();
if (0 === e || 0 === i) {
console.warn("Can't get angle between zero vector");
return 0;
}
var n = this.dot(t) / Math.sqrt(e * i);
n = cc.clampf(n, -1, 1);
return Math.acos(n);
};
h.signAngle = function(t) {
return Math.atan2(this.y, this.x) - Math.atan2(t.y, t.x);
};
h.rotate = function(t, e) {
(e = e || new r()).x = this.x;
e.y = this.y;
return e.rotateSelf(t);
};
h.rotateSelf = function(t) {
var e = Math.sin(t), i = Math.cos(t), n = this.x;
this.x = i * n - e * this.y;
this.y = e * n + i * this.y;
return this;
};
c.get(r, "ONE", (function() {
return new r(1, 1);
}));
c.get(r, "ZERO", (function() {
return new r(0, 0);
}));
c.get(r, "UP", (function() {
return new r(0, 1);
}));
c.get(r, "RIGHT", (function() {
return new r(1, 0);
}));
cc.Vec2 = r;
cc.v2 = function(t, e) {
return new r(t, e);
};
cc.p = cc.v2;
cc.pointEqualToPoint = function(t, e) {
return t && e && t.x === e.x && t.y === e.y;
};
n.exports = cc.Vec2;
}), {
"../platform/CCClass": 133,
"../platform/js": 149,
"./CCValueType": 170
} ],
172: [ (function(t, e, i) {
t("./CCValueType");
t("./CCVec2");
t("./CCPointExtension");
t("./CCSize");
t("./CCRect");
t("./CCColor");
t("./CCTypes");
t("./CCAffineTransform");
t("./CCTypesWebGL");
}), {
"./CCAffineTransform": 163,
"./CCColor": 164,
"./CCPointExtension": 165,
"./CCRect": 166,
"./CCSize": 167,
"./CCTypes": 168,
"./CCTypesWebGL": 169,
"./CCValueType": 170,
"./CCVec2": 171
} ],
173: [ (function(t, e, i) {
cc.js;
}), {} ],
174: [ (function(t, e, i) {
t("./CCSGMotionStreak");
t("./CCSGMotionStreakWebGLRenderCmd");
var n = cc.Class({
name: "cc.MotionStreak",
extends: cc.Component,
editor: !1,
ctor: function() {
this._root = null;
this._motionStreak = null;
},
properties: {
preview: {
default: !1,
editorOnly: !0,
notify: !1,
animatable: !1
},
_fadeTime: 1,
fadeTime: {
get: function() {
return this._fadeTime;
},
set: function(t) {
this._fadeTime = t;
this._motionStreak && this._motionStreak.setFadeTime(t);
},
animatable: !1,
tooltip: !1
},
_minSeg: 1,
minSeg: {
get: function() {
return this._minSeg;
},
set: function(t) {
this._minSeg = t;
this._motionStreak && this._motionStreak.setMinSeg(t);
},
animatable: !1,
tooltip: !1
},
_stroke: 64,
stroke: {
get: function() {
return this._stroke;
},
set: function(t) {
this._stroke = t;
this._motionStreak && this._motionStreak.setStroke(t);
},
animatable: !1,
tooltip: !1
},
_texture: {
default: "",
url: cc.Texture2D
},
texture: {
get: function() {
return this._texture;
},
set: function(t) {
this._texture = t;
if (this._motionStreak) {
t && cc.js.isString(t) && (t = cc.textureCache.addImage(t));
this._motionStreak.setTexture(t);
}
},
url: cc.Texture2D,
animatable: !1,
tooltip: !1
},
_color: cc.Color.WHITE,
color: {
get: function() {
return this._color;
},
set: function(t) {
this._color = t;
this._motionStreak && this._motionStreak.tintWithColor(t);
},
tooltip: !1
},
_fastMode: !1,
fastMode: {
get: function() {
return this._fastMode;
},
set: function(t) {
this._fastMode = t;
this._motionStreak && this._motionStreak.setFastMode(t);
},
animatable: !1,
tooltip: !1
}
},
onFocusInEditor: !1,
onLostFocusInEditor: !1,
reset: function() {
this._motionStreak.reset();
},
__preload: function() {
cc._renderType, cc.game.RENDER_TYPE_WEBGL, 0;
this._root = new _ccsg.Node();
var t = new _ccsg.MotionStreak();
t.initWithFade(this._fadeTime, this._minSeg, this._stroke, this.node.color, this._texture || null);
t.setFastMode(this._fastMode);
this._root.addChild(t);
var e = this.node._sgNode;
e && e.addChild(this._root, -10);
this._motionStreak = t;
},
onEnable: function() {
this.node.on("position-changed", this._onNodePositionChanged, this);
},
onDisable: function() {
this.node.off("position-changed", this._onNodePositionChanged, this);
},
_onNodePositionChanged: function() {
0;
if (this._motionStreak) {
var t = this.node, e = t.getNodeToWorldTransform(), i = e.tx - (t.width / 2 + t.anchorX * t.width), n = e.ty - (t.height / 2 + t.anchorY * t.height);
this._root.setPosition(-i, -n);
this._motionStreak.setPosition(i, n);
}
}
});
cc.MotionStreak = e.exports = n;
}), {
"./CCSGMotionStreak": 1,
"./CCSGMotionStreakWebGLRenderCmd": 1
} ],
175: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.ParticleAsset",
extends: cc.RawAsset
});
cc.ParticleAsset = e.exports = n;
}), {} ],
176: [ (function(t, e, i) {
t("./CCParticleAsset");
t("./CCSGParticleSystem");
t("./CCSGParticleSystemCanvasRenderCmd");
t("./CCSGParticleSystemWebGLRenderCmd");
var n = cc.BlendFunc.BlendFactor, o = cc.Enum({
GRAVITY: 0,
RADIUS: 1
}), r = cc.Enum({
FREE: 0,
RELATIVE: 1,
GROUPED: 2
}), s = {
preview: {
default: !0,
editorOnly: !0,
notify: !1,
animatable: !1,
tooltip: !1
},
_custom: !1,
custom: {
get: function() {
return this._custom;
},
set: function(t) {
0;
if (this._custom !== t) {
this._custom = t;
t ? this._applyCustoms() : this._applyFile();
0;
}
},
animatable: !1,
tooltip: !1
},
_file: {
default: "",
url: cc.ParticleAsset
},
file: {
get: function() {
return this._file;
},
set: function(t, e) {
if (this._file !== t) {
this._file = t;
if (t) {
this._applyFile();
0;
} else this.custom = !0;
}
},
animatable: !1,
url: cc.ParticleAsset,
tooltip: !1
},
_texture: {
default: "",
url: cc.Texture2D
},
texture: {
get: function() {
return this._texture;
},
set: function(t) {
this._texture = t;
this._sgNode.texture = t ? cc.textureCache.addImage(t) : null;
!t && this._file && this._applyFile();
},
url: cc.Texture2D,
tooltip: !1
},
particleCount: {
get: function() {
return this._sgNode.particleCount;
},
set: function(t) {
this._sgNode.particleCount = t;
},
visible: !1,
tooltip: !1
},
_srcBlendFactor: n.SRC_ALPHA,
srcBlendFactor: {
get: function() {
return this._srcBlendFactor;
},
set: function(t) {
this._srcBlendFactor = t;
this._blendFunc.src = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: n,
tooltip: !1
},
_dstBlendFactor: n.ONE_MINUS_SRC_ALPHA,
dstBlendFactor: {
get: function() {
return this._dstBlendFactor;
},
set: function(t) {
this._dstBlendFactor = t;
this._blendFunc.dst = t;
this._sgNode.setBlendFunc(this._blendFunc);
},
animatable: !1,
type: n,
tooltip: !1
},
playOnLoad: !0,
_autoRemoveOnFinish: !1,
autoRemoveOnFinish: {
get: function() {
return this._autoRemoveOnFinish;
},
set: function(t) {
if (this._autoRemoveOnFinish !== t) {
this._autoRemoveOnFinish = t;
this._applyAutoRemove();
}
},
animatable: !1,
tooltip: !1
},
active: {
get: function() {
return !!this._sgNode && this._sgNode.isActive();
},
visible: !1
}
}, c = (function() {
for (var t = {
totalParticles: 150,
duration: -1,
emissionRate: 10,
life: 1,
lifeVar: 0,
startColor: cc.Color.WHITE,
startColorVar: cc.Color.BLACK,
endColor: cc.color(255, 255, 255, 0),
endColorVar: cc.color(0, 0, 0, 0),
angle: 90,
angleVar: 20,
startSize: 50,
startSizeVar: 0,
endSize: 0,
endSizeVar: 0,
startSpin: 0,
startSpinVar: 0,
endSpin: 0,
endSpinVar: 0,
sourcePos: cc.p(0, 0),
posVar: cc.p(0, 0),
positionType: r.FREE,
emitterMode: o.GRAVITY,
gravity: cc.p(0, 0),
speed: 180,
speedVar: 50,
tangentialAccel: 80,
tangentialAccelVar: 0,
radialAccel: 0,
radialAccelVar: 0,
rotationIsDir: !1,
startRadius: 0,
startRadiusVar: 0,
endRadius: 0,
endRadiusVar: 0,
rotatePerS: 0,
rotatePerSVar: 0
}, e = Object.keys(t), i = 0; i < e.length; ++i) {
var n = e[i];
!(function(t, e) {
var i = "_" + t;
s[i] = e;
var n = e.constructor, o = s[t] = {};
if (cc.isChildClassOf(n, cc.ValueType)) {
o.get = function() {
return new n(this[i]);
};
o.type = n;
} else o.get = function() {
return this[i];
};
if (cc.isChildClassOf(n, cc.ValueType)) o.set = function(e) {
this[i] = new n(e);
this._sgNode[t] = e;
}; else {
o.set = function(e) {
this[i] = e;
this._sgNode[t] = e;
};
}
})(n, t[n]);
}
return e;
})();
s.positionType.type = r;
s.emitterMode.type = o;
var a = cc.Class({
name: "cc.ParticleSystem",
extends: cc._RendererUnderSG,
editor: !1,
ctor: function() {
this._previewTimer = null;
this._focused = !1;
this._willStart = !1;
this._blendFunc = new cc.BlendFunc(0, 0);
this._originOnExit = null;
},
properties: s,
statics: {
DURATION_INFINITY: -1,
START_SIZE_EQUAL_TO_END_SIZE: -1,
START_RADIUS_EQUAL_TO_END_RADIUS: -1,
EmitterMode: o,
PositionType: r
},
__preload: function() {
this._super();
this.playOnLoad && this.resetSystem();
this._applyAutoRemove();
},
onDestroy: function() {
this._autoRemoveOnFinish && (this.autoRemoveOnFinish = !1);
this._super();
},
onFocusInEditor: !1,
onLostFocusInEditor: !1,
_createSgNode: function() {
return new _ccsg.ParticleSystem();
},
_initSgNode: function() {
var t = this._sgNode;
if (this._file) if (this._custom) {
!this._texture ? this._applyFile() : this._applyCustoms();
} else this._applyFile(); else this._custom && this._applyCustoms();
t.stopSystem();
},
addParticle: function() {
return this._sgNode.addParticle();
},
stopSystem: function() {
this._sgNode.stopSystem();
},
resetSystem: function() {
this._sgNode.resetSystem();
},
isFull: function() {
return this.particleCount >= this._totalParticles;
},
setDisplayFrame: function(t) {
if (t) {
var e = t.getTexture();
e && (this._texture = e.url);
this._sgNode.setDisplayFrame(t);
}
},
setTextureWithRect: function(t, e) {
t instanceof cc.Texture2D && (this._texture = t.url);
this._sgNode.setTextureWithRect(t, e);
},
_applyFile: function() {
var t = this._file;
if (t) {
var e = this;
cc.loader.load(t, (function(i, n) {
if (i || !n) throw i || new Error("Unkown error");
if (e.isValid) {
var o = e._sgNode;
o.particleCount = 0;
var r = o.isActive();
o.initWithFile(t);
n.textureUuid && cc.AssetLibrary.queryAssetInfo(n.textureUuid, (function(t, i, n) {
t ? cc.error(t) : e.texture = i;
}));
n.emissionRate && (e.emissionRate = n.emissionRate);
o.setPosition(0, 0);
r || o.stopSystem();
e._applyAutoRemove();
e._custom && e._applyCustoms();
}
}));
}
},
_applyCustoms: function() {
for (var t = this._sgNode, e = t.isActive(), i = 0; i < c.length; i++) {
var n = c[i];
t[n] = this["_" + n];
}
this._blendFunc.src = this._srcBlendFactor;
this._blendFunc.dst = this._dstBlendFactor;
t.setBlendFunc(this._blendFunc);
this._texture && (t.texture = cc.textureCache.addImage(this._texture));
e || t.stopSystem();
this._applyAutoRemove();
},
_applyAutoRemove: function() {
var t = this._sgNode, e = this._autoRemoveOnFinish;
t.autoRemoveOnFinish = e;
if (e) {
if (this._originOnExit) return;
this._originOnExit = t.onExit;
var i = this;
t.onExit = function() {
i._originOnExit.call(this);
i.node.destroy();
};
} else if (this._originOnExit) {
t.onExit = this._originOnExit;
this._originOnExit = null;
}
}
});
cc.ParticleSystem = e.exports = a;
}), {
"./CCParticleAsset": 175,
"./CCSGParticleSystem": 1,
"./CCSGParticleSystemCanvasRenderCmd": 1,
"./CCSGParticleSystemWebGLRenderCmd": 1
} ],
177: [ (function(t, e, i) {
t("./CCSGTMXLayer");
t("./CCTMXLayerCanvasRenderCmd");
t("./CCTMXLayerWebGLRenderCmd");
var n = cc.Class({
name: "cc.TiledLayer",
extends: cc._SGComponent,
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
this.enabledInHierarchy || t.setVisible(!1);
this._registSizeProvider();
var e = this.node;
t.setAnchorPoint(e.getAnchorPoint());
}
},
_replaceSgNode: function(t) {
if (t !== this._sgNode) {
this._removeSgNode();
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
if (t && t instanceof _ccsg.TMXLayer) {
this._sgNode = t;
t.retain();
this._initSgNode();
} else this._sgNode = null;
}
},
getLayerName: function() {
return this._sgNode ? this._sgNode.getLayerName() : "";
},
setLayerName: function(t) {
this._sgNode && this._sgNode.setLayerName(t);
},
getProperty: function(t) {
return this._sgNode ? this._sgNode.getProperty(t) : null;
},
getPositionAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getPositionAt(t);
}
return null;
},
removeTileAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
this._sgNode.removeTileAt(t);
}
},
setTileGID: function(t, e, i, n) {
if (this._sgNode) {
if (void 0 === e) throw new Error("_ccsg.TMXLayer.setTileGID(): pos should be non-null");
var o;
if (void 0 === n && e instanceof cc.Vec2) {
o = e;
n = i;
} else o = cc.p(e, i);
this._sgNode.setTileGID(t, o, n);
}
},
getTileGIDAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getTileGIDAt(t);
}
return 0;
},
getTileAt: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.p(t, e));
return this._sgNode.getTileAt(t);
}
return null;
},
releaseMap: function() {
this._sgNode && this._sgNode.releaseMap();
},
setContentSize: function(t, e) {
if (this._sgNode) {
void 0 !== e && (t = cc.size(t, e));
this._sgNode.setContentSize(t);
}
},
getTexture: function() {
return this._sgNode ? this._sgNode.getTexture() : null;
},
setTexture: function(t) {
this._sgNode && this._sgNode.setTexture(t);
},
setTileOpacity: function(t) {
this._sgNode && this._sgNode.setTileOpacity(t);
},
getLayerSize: function() {
return this._sgNode ? this._sgNode.getLayerSize() : cc.size(0, 0);
},
setLayerSize: function(t) {
this._sgNode && this._sgNode.setLayerSize(t);
},
getMapTileSize: function() {
return this._sgNode ? this._sgNode.getMapTileSize() : cc.size(0, 0);
},
setMapTileSize: function(t) {
this._sgNode && this._sgNode.setMapTileSize(t);
},
getTiles: function() {
return this._sgNode ? this._sgNode.getTiles() : null;
},
setTiles: function(t) {
this._sgNode && this._sgNode.setTiles(t);
},
getTileSet: function() {
return this._sgNode ? this._sgNode.getTileSet() : null;
},
setTileSet: function(t) {
this._sgNode && this._sgNode.setTileSet(t);
},
getLayerOrientation: function() {
return this._sgNode ? this._sgNode.getLayerOrientation() : 0;
},
setLayerOrientation: function(t) {
this._sgNode && this._sgNode.setLayerOrientation(t);
},
getProperties: function() {
return this._sgNode ? this._sgNode.getProperties() : null;
},
setProperties: function(t) {
this._sgNode && this._sgNode.setProperties(t);
},
_tryRemoveNode: function() {
this.node.removeComponent(cc.TiledLayer);
1 === this.node._components.length && 0 === this.node.getChildren().length && this.node.removeFromParent();
}
});
cc.TiledLayer = e.exports = n;
}), {
"./CCSGTMXLayer": 1,
"./CCTMXLayerCanvasRenderCmd": 1,
"./CCTMXLayerWebGLRenderCmd": 1
} ],
178: [ (function(t, e, i) {
t("./CCTiledMapAsset");
t("./CCTiledLayer");
t("./CCTiledObjectGroup");
t("./CCSGTMXTiledMap");
var n = cc.Enum({
ORTHO: 0,
HEX: 1,
ISO: 2
}), o = cc.Enum({
NONE: 0,
MAP: 1,
LAYER: 2,
OBJECTGROUP: 3,
OBJECT: 4,
TILE: 5
}), r = cc.Enum({
HORIZONTAL: 2147483648,
VERTICAL: 1073741824,
DIAGONAL: 536870912,
FLIPPED_ALL: 3758096384,
FLIPPED_MASK: 536870911
}), s = cc.Enum({
STAGGERAXIS_X: 0,
STAGGERAXIS_Y: 1
}), c = cc.Enum({
STAGGERINDEX_ODD: 0,
STAGGERINDEX_EVEN: 1
}), a = cc.Enum({
RECT: 0,
ELLIPSE: 1,
POLYGON: 2,
POLYLINE: 3,
IMAGE: 4
}), h = cc.Class({
name: "cc.TiledMap",
extends: cc._RendererInSG,
editor: !1,
statics: {
Orientation: n,
Property: o,
TileFlag: r,
StaggerAxis: s,
StaggerIndex: c,
TMXObjectType: a
},
properties: {
_detachedChildren: {
default: [],
serializable: !1
},
_tmxFile: {
default: null,
type: cc.TiledMapAsset
},
tmxAsset: {
get: function() {
return this._tmxFile;
},
set: function(t, e) {
if (this._tmxFile !== t) {
this._tmxFile = t;
this._applyFile();
}
},
type: cc.TiledMapAsset
}
},
getMapSize: function() {
return this._sgNode.getMapSize();
},
setMapSize: function(t) {
this._sgNode.setMapSize(t);
},
getTileSize: function() {
return this._sgNode.getTileSize();
},
setTileSize: function(t) {
this._sgNode.setTileSize(t);
},
getMapOrientation: function() {
return this._sgNode.getMapOrientation();
},
setMapOrientation: function(t) {
this._sgNode.setMapOrientation(t);
},
getObjectGroups: function() {
for (var t = this.node.children, e = [], i = 0, n = t.length; i < n; i++) {
var o = t[i].getComponent(cc.TiledObjectGroup);
o && e.push(o);
}
return e;
},
getProperties: function() {
return this._sgNode.getProperties();
},
setProperties: function(t) {
this._sgNode.setProperties(t);
},
initWithTMXFile: function(t) {
cc.errorID(7200);
},
initWithXML: function(t, e) {
cc.errorID(7201);
},
allLayers: function() {
for (var t = this.node.children, e = [], i = 0, n = t.length; i < n; i++) {
var o = t[i].getComponent(cc.TiledLayer);
o && e.push(o);
}
return e;
},
getLayer: function(t) {
for (var e = this.node.children, i = 0, n = e.length; i < n; i++) {
var o = e[i].getComponent(cc.TiledLayer);
if (o && o.getLayerName() === t) return o;
}
return null;
},
getObjectGroup: function(t) {
for (var e = this.node.children, i = 0, n = e.length; i < n; i++) {
var o = e[i].getComponent(cc.TiledObjectGroup);
if (o && o.getGroupName() === t) return o;
}
return null;
},
getProperty: function(t) {
return this._sgNode.getProperty(t);
},
getPropertiesForGID: function(t) {
return this._sgNode.getPropertiesForGID(t);
},
onEnable: function() {
0 === this._detachedChildren.length && this._moveLayersInSgNode(this._sgNode);
this._super();
this._tmxFile && this._refreshLayerEntities();
this.node.on("anchor-changed", this._anchorChanged, this);
this.node.on("child-added", this._childAdded, this);
this.node.on("child-reorder", this._syncChildrenOrder, this);
},
onDisable: function() {
this._super();
this._setLayersEnabled(!1);
var t = this._plainNode;
this._moveLayersInSgNode(t);
this.node.off("anchor-changed", this._anchorChanged, this);
this.node.off("child-added", this._childAdded, this);
this.node.off("child-reorder", this._syncChildrenOrder, this);
},
onDestroy: function() {
this._super();
this._removeLayerEntities();
},
_createSgNode: function() {
return new _ccsg.TMXTiledMap();
},
_initSgNode: function() {
this._applyFile();
},
_resetSgSize: function() {
this.node.setContentSize(this._sgNode.getContentSize());
this._sgNode.setContentSize(0, 0);
},
_onMapLoaded: function() {
this._refreshLayerEntities();
this._enabled ? this._anchorChanged() : this._moveLayersInSgNode(this._sgNode);
this._setLayersEnabled(this._enabled);
this._resetSgSize();
},
_setLayersEnabled: function(t) {
for (var e = this.node.getChildren(), i = e.length - 1; i >= 0; i--) {
var n = e[i].getComponent(cc.TiledLayer);
n && (n.enabled = t);
}
},
_moveLayersInSgNode: function(t) {
this._detachedChildren.length = 0;
for (var e = t.getChildren(), i = e.length - 1; i >= 0; i--) {
var n = e[i];
if (n instanceof _ccsg.TMXLayer || n instanceof _ccsg.TMXObjectGroup) {
t.removeChild(n);
var o = n.getLocalZOrder();
this._detachedChildren.push({
sgNode: n,
zorder: o
});
}
}
},
_removeLayerEntities: function() {
for (var t = this.node.getChildren(), e = t.length - 1; e >= 0; e--) {
var i = t[e];
if (i.isValid) {
var n = i.getComponent(cc.TiledLayer);
n && n._tryRemoveNode();
var o = i.getComponent(cc.TiledObjectGroup);
o && o._tryRemoveNode();
}
}
},
_refreshLayerEntities: function() {
var t, e, i = this.node.getChildren(), n = [], o = [], r = [];
for (t = 0; t < this._detachedChildren.length; t++) {
var s = this._detachedChildren[t];
this._sgNode.addChild(s.sgNode, s.zorder, s.zorder);
}
this._detachedChildren.length = 0;
var c = this._sgNode.allLayers().map((function(t) {
return t.getLayerName();
})), a = this._sgNode.getObjectGroups().map((function(t) {
return t.getGroupName();
}));
for (t = i.length - 1; t >= 0; t--) {
var h = i[t], l = h.getComponent(cc.TiledLayer), u = h.getComponent(cc.TiledObjectGroup);
if (l) {
var d = l.getLayerName();
d || (d = h._name);
if (c.indexOf(d) < 0) l._tryRemoveNode(); else {
n.push(h);
var f = this._sgNode.getLayer(d);
l._replaceSgNode(f);
l.enabled = !0;
}
} else if (u) {
var p = u.getGroupName();
p || (p = h._name);
if (a.indexOf(p) < 0) u._tryRemoveNode(); else {
o.push(h);
var _ = this._sgNode.getObjectGroup(p);
u._replaceSgNode(_);
u.enabled = _.isVisible();
}
} else r.push({
child: h,
index: h.getSiblingIndex()
});
}
var g = n.map((function(t) {
return t.getComponent(cc.TiledLayer).getLayerName();
}));
for (t = 0, e = c.length; t < e; t++) {
var v = c[t], y = this._sgNode.getLayer(v), m = g.indexOf(v);
if (m < 0) {
var b = this.node.getChildByName(v), C = null;
if (b && !b.getComponent(cc._SGComponent)) C = b.addComponent(cc.TiledLayer); else {
b = new cc.Node(v);
this.node.addChild(b);
C = b.addComponent(cc.TiledLayer);
}
b && C || cc.errorID(7202);
C._replaceSgNode(y);
b.setSiblingIndex(y.getLocalZOrder());
b.setAnchorPoint(this.node.getAnchorPoint());
}
}
var T = o.map((function(t) {
return t.getComponent(cc.TiledObjectGroup).getGroupName();
}));
for (t = 0, e = a.length; t < e; t++) {
v = a[t];
var S = this._sgNode.getObjectGroup(v);
if ((m = T.indexOf(v)) < 0) {
var E = null;
if ((b = this.node.getChildByName(v)) && !b.getComponent(cc._SGComponent)) E = b.addComponent(cc.TiledObjectGroup); else {
b = new cc.Node(v);
this.node.addChild(b);
E = b.addComponent(cc.TiledObjectGroup);
}
b && E || cc.errorID(7202);
E._replaceSgNode(S);
b.setSiblingIndex(S.getLocalZOrder());
b.setAnchorPoint(this.node.getAnchorPoint());
E.enabled = S.isVisible();
}
}
var A = this.node.getChildren(), x = [];
for (t = 0, e = A.length; t < e; t++) {
l = (h = A[t]).getComponent(cc.TiledLayer);
u = h.getComponent(cc.TiledObjectGroup);
(l || u) && x.push(h._name);
}
var w = [], I = [], O = this._sgNode.getChildren();
for (t = 0, e = O.length; t < e; t++) if ((h = O[t]) instanceof _ccsg.TMXLayer) {
w.push(h.getLayerName());
I.push(h);
} else if (h instanceof _ccsg.TMXObjectGroup) {
w.push(h.getGroupName());
I.push(h);
}
for (t = w.length - 1; t >= 0; t--) {
var N = w[t];
if (t !== x.indexOf(N)) {
this.node.getChildByName(N).setSiblingIndex(I[t].getLocalZOrder());
}
}
for (t = 0, e = r.length; t < e; t++) (s = r[t]).child.setSiblingIndex(s.index);
this._syncChildrenOrder();
},
_anchorChanged: function() {
for (var t = this.node.children, e = this.node.getAnchorPoint(), i = 0, n = t.length; i < n; i++) {
var o = t[i];
o.getComponent(cc.TiledLayer) && o.setAnchorPoint(e);
}
},
_childAdded: function(t) {
var e = t.detail;
if (e) {
var i = e.getComponent(cc.TiledLayer), n = e.getComponent(cc.TiledObjectGroup);
if (!i && !n) {
var o = this.node.getChildrenCount();
e.setSiblingIndex(o);
e._sgNode && e._sgNode.setLocalZOrder(o);
}
}
},
_syncChildrenOrder: function() {
for (var t = this.node.children, e = 0, i = t.length; e < i; e++) {
var n = t[e], o = n.getComponent(cc.TiledLayer), r = n.getComponent(cc.TiledObjectGroup), s = n.getSiblingIndex();
o && o._sgNode && o._sgNode.setLocalZOrder(s);
r && r._sgNode && r._sgNode.setLocalZOrder(s);
n._sgNode && n._sgNode.setLocalZOrder(s);
}
},
_applyFile: function() {
var t = this._sgNode, e = this._tmxFile;
if (e) {
var i = cc.url._rawAssets + e.tmxFolderPath;
i = cc.path.stripSep(i);
0;
if (t.initWithXML(e.tmxXmlStr, i)) {
this._detachedChildren.length = 0;
this._onMapLoaded();
}
} else {
for (var n = t.allLayers(), o = 0, r = n.length; o < r; o++) t.removeChild(n[o]);
var s = t.getObjectGroups();
for (o = 0, r = s.length; o < r; o++) t.removeChild(s[o]);
this._detachedChildren.length = 0;
this._removeLayerEntities();
}
}
});
cc.TiledMap = e.exports = h;
cc.js.obsolete(cc.TiledMap.prototype, "cc.TiledMap.tmxFile", "tmxAsset", !0);
cc.js.get(cc.TiledMap.prototype, "mapLoaded", (function() {
cc.errorID(7203);
return [];
}), !1);
}), {
"./CCSGTMXTiledMap": 1,
"./CCTiledLayer": 177,
"./CCTiledMapAsset": 179,
"./CCTiledObjectGroup": 180
} ],
179: [ (function(t, e, i) {
var n = cc.Class({
name: "cc.TiledMapAsset",
extends: cc.Asset,
properties: {
tmxXmlStr: {
default: ""
},
tmxFolderPath: {
default: ""
},
textures: {
default: [],
url: [ cc.Texture2D ]
},
tsxFiles: {
default: [],
url: [ cc.RawAsset ]
}
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1
});
cc.TiledMapAsset = n;
e.exports = n;
}), {} ],
180: [ (function(t, e, i) {
t("./CCSGTMXObjectGroup");
var n = cc.Class({
name: "cc.TiledObjectGroup",
extends: cc._SGComponent,
onEnable: function() {
this._sgNode && this._sgNode.setVisible(!0);
},
onDisable: function() {
this._sgNode && this._sgNode.setVisible(!1);
},
onDestroy: function() {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
},
_initSgNode: function() {
var t = this._sgNode;
if (t) {
this._registSizeProvider();
t.setAnchorPoint(this.node.getAnchorPoint());
}
},
_replaceSgNode: function(t) {
if (t !== this._sgNode) {
this._removeSgNode();
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
if (t && t instanceof _ccsg.TMXObjectGroup) {
this._sgNode = t;
t.retain();
this._initSgNode();
} else this._sgNode = null;
}
},
getPositionOffset: function() {
return this._sgNode ? this._sgNode.getPositionOffset() : cc.p(0, 0);
},
setPositionOffset: function(t) {
this._sgNode && this._sgNode.setPositionOffset(t);
},
getProperties: function() {
return this._sgNode ? this._sgNode.getProperties() : null;
},
setProperties: function(t) {
this._sgNode && this._sgNode.setProperties(t);
},
getGroupName: function() {
return this._sgNode ? this._sgNode.getGroupName() : "";
},
setGroupName: function(t) {
this._sgNode && this._sgNode.setGroupName(t);
},
getProperty: function(t) {
return this._sgNode ? this._sgNode.propertyNamed(t) : null;
},
getObject: function(t) {
return this._sgNode ? this._sgNode.getObject(t) : null;
},
getObjects: function() {
return this._sgNode ? this._sgNode.getObjects() : [];
},
_tryRemoveNode: function() {
this.node.removeComponent(cc.TiledObjectGroup);
1 === this.node._components.length && 0 === this.node.getChildren().length && this.node.removeFromParent();
}
});
cc.TiledObjectGroup = e.exports = n;
}), {
"./CCSGTMXObjectGroup": 1
} ],
181: [ (function(t, e, i) {
t("./cocos2d/core");
t("./cocos2d/animation");
t("./cocos2d/particle/CCParticleSystem");
t("./cocos2d/tilemap/CCTiledMap");
t("./cocos2d/motion-streak/CCMotionStreak");
t("./cocos2d/core/components/CCStudioComponent");
t("./extensions/ccpool/CCNodePool");
t("./extensions/ccpool/CCPool");
0;
t("./extensions/spine");
t("./extensions/dragonbones");
t("./cocos2d/deprecated");
}), {
"./cocos2d/actions": 10,
"./cocos2d/animation": 18,
"./cocos2d/core": 91,
"./cocos2d/core/components/CCStudioComponent": 72,
"./cocos2d/deprecated": 173,
"./cocos2d/motion-streak/CCMotionStreak": 174,
"./cocos2d/particle/CCParticleAsset": 175,
"./cocos2d/particle/CCParticleSystem": 176,
"./cocos2d/tilemap/CCTiledMap": 178,
"./cocos2d/tilemap/CCTiledMapAsset": 179,
"./extensions/ccpool/CCNodePool": 182,
"./extensions/ccpool/CCPool": 183,
"./extensions/dragonbones": 187,
"./extensions/spine": 191,
"./external/chipmunk/chipmunk": 192
} ],
182: [ (function(t, e, i) {
cc.NodePool = function(t) {
this.poolHandlerComp = t;
this._pool = [];
};
cc.NodePool.prototype = {
constructor: cc.NodePool,
size: function() {
return this._pool.length;
},
clear: function() {
for (var t = this._pool.length, e = 0; e < t; ++e) this._pool[e].destroy();
this._pool.length = 0;
},
put: function(t) {
if (t && -1 === this._pool.indexOf(t)) {
t.removeFromParent(!1);
var e = this.poolHandlerComp ? t.getComponent(this.poolHandlerComp) : null;
e && e.unuse && e.unuse();
this._pool.push(t);
}
},
get: function() {
var t = this._pool.length - 1;
if (t < 0) return null;
var e = this._pool[t];
this._pool.length = t;
var i = this.poolHandlerComp ? e.getComponent(this.poolHandlerComp) : null;
i && i.reuse && i.reuse.apply(i, arguments);
return e;
}
};
e.exports = cc.NodePool;
}), {} ],
183: [ (function(t, e, i) {
var n = [];
cc.pool = {
_pool: {},
_releaseCB: function() {
this.release();
},
_autoRelease: function(t) {
var e = void 0 !== t._running && !t._running;
cc.director.getScheduler().schedule(this._releaseCB, t, 0, 0, 0, e);
},
putInPool: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
this._pool[e] || (this._pool[e] = []);
t.retain && t.retain();
t.unuse && t.unuse();
this._pool[e].push(t);
}
},
hasObject: function(t) {
var e = cc.js._getClassId(t), i = this._pool[e];
return !(!i || 0 === i.length);
},
removeObject: function(t) {
var e = cc.js._getClassId(t.constructor);
if (e) {
var i = this._pool[e];
if (i) for (var n = 0; n < i.length; n++) if (t === i[n]) {
t.release && t.release();
i.splice(n, 1);
}
}
},
getFromPool: function(t) {
if (this.hasObject(t)) {
var e = cc.js._getClassId(t), i = this._pool[e];
n.length = arguments.length - 1;
for (var o = 0; o < n.length; o++) n[o] = arguments[o + 1];
var r = i.pop();
r.reuse && r.reuse.apply(r, n);
r.release && this._autoRelease(r);
n.length = 0;
return r;
}
},
drainAllPools: function() {
for (var t in this._pool) for (var e = 0; e < this._pool[t].length; e++) {
var i = this._pool[t][e];
i.release && i.release();
}
this._pool = {};
}
};
}), {} ],
184: [ (function(t, e, i) {
var n = cc.Enum({
default: -1
}), o = cc.Enum({
"<None>": 0
});
dragonBones.ArmatureDisplay = cc.Class({
name: "dragonBones.ArmatureDisplay",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_factory: {
default: null,
type: dragonBones.CCFactory,
serializable: !1
},
_dragonBonesData: {
default: null,
type: dragonBones.DragonBonesData,
serializable: !1
},
dragonAsset: {
default: null,
type: dragonBones.DragonBonesAsset,
notify: function() {
this._parseDragonAsset();
this._refresh();
0;
},
tooltip: !1
},
dragonAtlasAsset: {
default: null,
type: dragonBones.DragonBonesAtlasAsset,
notify: function() {
this._parseDragonAtlasAsset();
this._refreshSgNode();
},
tooltip: !1
},
_armatureName: "",
armatureName: {
get: function() {
return this._armatureName;
},
set: function(t) {
this._armatureName = t;
var e = this.getAnimationNames(this._armatureName);
(!this.animationName || e.indexOf(this.animationName) < 0) && (this.animationName = "");
this._refresh();
},
visible: !1
},
_animationName: "",
animationName: {
get: function() {
return this._animationName;
},
set: function(t) {
this._animationName = t;
},
visible: !1
},
_defaultArmatureIndex: {
default: 0,
notify: function() {
var t = "";
if (this.dragonAsset) {
var e;
this.dragonAsset && (e = this.dragonAsset.getArmatureEnum());
if (!e) return cc.errorID(7400, this.name);
t = e[this._defaultArmatureIndex];
}
void 0 !== t ? this.armatureName = t : cc.errorID(7401, this.name);
},
type: n,
visible: !0,
editorOnly: !0,
displayName: "Armature",
tooltip: !1
},
_animationIndex: {
default: 0,
notify: function() {
if (0 !== this._animationIndex) {
var t;
this.dragonAsset && (t = this.dragonAsset.getAnimsEnum(this.armatureName));
if (t) {
var e = t[this._animationIndex];
void 0 !== e ? this.animationName = e : cc.errorID(7402, this.name);
}
} else this.animationName = "";
},
type: o,
visible: !0,
editorOnly: !0,
displayName: "Animation",
tooltip: !1
},
timeScale: {
default: 1,
notify: function() {
this._sgNode && (this._sgNode.animation().timeScale = this.timeScale);
},
tooltip: !1
},
playTimes: {
default: -1,
tooltip: !1
},
debugBones: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugBones(this.debugBones);
},
editorOnly: !0,
tooltip: !1
}
},
ctor: function() {
this._factory = new dragonBones.CCFactory();
},
__preload: function() {
this._parseDragonAsset();
this._parseDragonAtlasAsset();
this._refresh();
},
_createSgNode: function() {
return this.dragonAsset && this.dragonAtlasAsset && this.armatureName ? this._factory.buildArmatureDisplay(this.armatureName, this._dragonBonesData.name) : null;
},
_initSgNode: function() {
var t = this._sgNode;
t.animation().timeScale = this.timeScale;
this.animationName && this.playAnimation(this.animationName, this.playTimes);
0;
},
_removeSgNode: function() {
var t = this._sgNode;
this._super();
t && t.armature().dispose();
},
_parseDragonAsset: function() {
if (this.dragonAsset) {
this._dragonBonesData = this._factory.parseDragonBonesData(this.dragonAsset.dragonBonesJson);
}
},
_parseDragonAtlasAsset: function() {
if (this.dragonAtlasAsset) {
this._factory.parseTextureAtlasData(this.dragonAtlasAsset.atlasJson, this.dragonAtlasAsset.texture);
}
},
_refreshSgNode: function() {
var t = null, e = null;
if (this._sgNode) {
t = this._sgNode._bubblingListeners;
e = this._sgNode._hasListenerCache;
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
this._sgNode = null;
}
var i = this._sgNode = this._createSgNode();
if (i) {
i.retain();
this.enabledInHierarchy || i.setVisible(!1);
if (t) {
i._bubblingListeners = t;
i._hasListenerCache = e;
i.hasEventCallback() || i.setEventCallback((function(t) {
i.emit(t.type, t);
}));
}
this._initSgNode();
this._appendSgNode(i);
this._registSizeProvider();
}
},
_refresh: function() {
this._refreshSgNode();
0;
},
_updateAnimEnum: !1,
_updateArmatureEnum: !1,
playAnimation: function(t, e) {
if (this._sgNode) {
this.playTimes = void 0 === e ? -1 : e;
this.animationName = t;
return this._sgNode.animation().play(t, this.playTimes);
}
return null;
},
getArmatureNames: function() {
return this._dragonBonesData ? this._dragonBonesData.armatureNames : [];
},
getAnimationNames: function(t) {
var e = [];
if (this._dragonBonesData) {
var i = this._dragonBonesData.getArmature(t);
if (i) for (var n in i.animations) i.animations.hasOwnProperty(n) && e.push(n);
}
return e;
},
addEventListener: function(t, e, i) {
this._sgNode && this._sgNode.addEvent(t, e, i);
},
removeEventListener: function(t, e, i) {
this._sgNode && this._sgNode.removeEvent(t, e, i);
},
buildArmature: function(t) {
return this._factory ? this._factory.buildArmature(t) : null;
},
armature: function() {
return this._sgNode ? this._sgNode.armature() : null;
}
});
}), {} ],
185: [ (function(t, e, i) {
var n = cc.Class({
name: "dragonBones.DragonBonesAsset",
extends: cc.Asset,
properties: {
_dragonBonesJson: "",
dragonBonesJson: {
get: function() {
return this._dragonBonesJson;
},
set: function(t) {
this._dragonBonesJson = t;
this.reset();
}
}
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1,
reset: function() {
0;
},
getRuntimeData: !1,
getArmatureEnum: !1,
getAnimsEnum: !1
});
dragonBones.DragonBonesAsset = e.exports = n;
}), {} ],
186: [ (function(t, e, i) {
var n = cc.Class({
name: "dragonBones.DragonBonesAtlasAsset",
extends: cc.Asset,
properties: {
_atlasJson: "",
atlasJson: {
get: function() {
return this._atlasJson;
},
set: function(t) {
this._atlasJson = t;
}
},
texture: {
default: "",
url: cc.Texture2D
}
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1
});
dragonBones.DragonBonesAtlasAsset = e.exports = n;
}), {} ],
187: [ (function(t, e, i) {
dragonBones = dragonBones;
dragonBones.DisplayType = {
Image: 0,
Armature: 1,
Mesh: 2
};
dragonBones.ArmatureType = {
Armature: 0,
MovieClip: 1,
Stage: 2
};
dragonBones.ExtensionType = {
FFD: 0,
AdjustColor: 10,
BevelFilter: 11,
BlurFilter: 12,
DropShadowFilter: 13,
GlowFilter: 14,
GradientBevelFilter: 15,
GradientGlowFilter: 16
};
dragonBones.EventType = {
Frame: 0,
Sound: 1
};
dragonBones.ActionType = {
Play: 0,
Stop: 1,
GotoAndPlay: 2,
GotoAndStop: 3,
FadeIn: 4,
FadeOut: 5
};
dragonBones.AnimationFadeOutMode = {
None: 0,
SameLayer: 1,
SameGroup: 2,
SameLayerAndGroup: 3,
All: 4
};
0;
t("./DragonBonesAsset");
t("./DragonBonesAtlasAsset");
t("./ArmatureDisplay");
}), {
"./ArmatureDisplay": 184,
"./CCArmatureDisplay": 1,
"./CCFactory": 1,
"./CCSlot": 1,
"./CCTextureData": 1,
"./DragonBonesAsset": 185,
"./DragonBonesAtlasAsset": 186,
"./lib/dragonBones": 1
} ],
188: [ (function(t, e, i) {
sp.SkeletonTexture = cc.Class({
name: "sp.SkeletonTexture",
extends: sp.spine.Texture,
_texture: null,
setRealTexture: function(t) {
this._texture = t;
},
getRealTexture: function() {
return this._texture;
},
setFilters: function(t, e) {
if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
var i = cc._renderContext;
this.bind();
i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, t);
i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, e);
}
},
setWraps: function(t, e) {
if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
var i = cc._renderContext;
this.bind();
i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, t);
i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, e);
}
},
dispose: function() {},
bind: function() {
cc._renderType === cc.game.RENDER_TYPE_WEBGL && cc.gl.bindTexture2DN(0, this._texture);
}
});
}), {} ],
189: [ (function(i, n, o) {
var r = cc.Enum({
default: -1
}), s = cc.Enum({
"<None>": 0
});
sp.Skeleton = cc.Class({
name: "sp.Skeleton",
extends: cc._RendererUnderSG,
editor: !1,
properties: {
_startListener: {
default: null,
serializable: !1
},
_endListener: {
default: null,
serializable: !1
},
_completeListener: {
default: null,
serializable: !1
},
_eventListener: {
default: null,
serializable: !1
},
_disposeListener: {
default: null,
serializable: !1
},
_interruptListener: {
default: null,
serializable: !1
},
_paused: !1,
paused: {
get: function() {
return this._paused;
},
set: function(t) {
this._paused = t;
this._sgNode && (t ? this._sgNode.pause() : this._sgNode.resume());
},
visible: !1
},
skeletonData: {
default: null,
type: sp.SkeletonData,
notify: function() {
this.defaultSkin = "";
this.defaultAnimation = "";
this._refresh();
},
tooltip: !1
},
defaultSkin: {
default: "",
visible: !1
},
defaultAnimation: {
default: "",
visible: !1
},
animation: {
get: function() {
var t = this.getCurrent(0);
return t && t.animation.name || "";
},
set: function(t) {
this.defaultAnimation = t;
if (t) this.setAnimation(0, t, this.loop); else {
this.clearTrack(0);
this.setToSetupPose();
}
},
visible: !1
},
_defaultSkinIndex: {
get: function() {
if (this.skeletonData && this.defaultSkin) {
var t = this.skeletonData.getSkinsEnum();
if (t) {
var e = t[this.defaultSkin];
if (void 0 !== e) return e;
}
}
return 0;
},
set: function(t) {
var e;
this.skeletonData && (e = this.skeletonData.getSkinsEnum());
if (!e) return cc.errorID("", this.name);
var i = e[t];
if (void 0 !== i) {
this.defaultSkin = i;
0;
} else cc.errorID(7501, this.name);
},
type: r,
visible: !0,
displayName: "Default Skin",
tooltip: !1
},
_animationIndex: {
get: function() {
var t = this.animation;
if (this.skeletonData && t) {
var e = this.skeletonData.getAnimsEnum();
if (e) {
var i = e[t];
if (void 0 !== i) return i;
}
}
return 0;
},
set: function(t) {
if (0 !== t) {
var e;
this.skeletonData && (e = this.skeletonData.getAnimsEnum());
if (!e) return cc.errorID(7502, this.name);
var i = e[t];
void 0 !== i ? this.animation = i : cc.errorID(7503, this.name);
} else this.animation = "";
},
type: s,
visible: !0,
displayName: "Animation",
tooltip: !1
},
loop: {
default: !0,
tooltip: !1
},
_premultipliedAlpha: !0,
premultipliedAlpha: {
get: function() {
return this._premultipliedAlpha;
},
set: function(t) {
this._premultipliedAlpha = t;
this._sgNode && this._sgNode.setPremultipliedAlpha(t);
},
tooltip: !1
},
timeScale: {
default: 1,
notify: function() {
this._sgNode && this._sgNode.setTimeScale(this.timeScale);
},
tooltip: !1
},
debugSlots: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugSlotsEnabled(this.debugSlots);
},
editorOnly: !0,
tooltip: !1
},
debugBones: {
default: !1,
notify: function() {
this._sgNode && this._sgNode.setDebugBonesEnabled(this.debugBones);
},
editorOnly: !0,
tooltip: !1
}
},
__preload: function() {
this.node.setContentSize(0, 0);
this._refresh();
},
_createSgNode: function() {
if (this.skeletonData) {
if (!this.skeletonData._uuid) {
cc.errorID(7504);
return null;
}
var i = this.skeletonData.rawUrl, n = this.skeletonData.atlasUrl;
if (n) {
if ("string" !== ("object" == (e = typeof n) ? t(n) : e)) {
cc.errorID(7505);
return null;
}
try {
return new sp._SGSkeletonAnimation(i, n, this.skeletonData.scale);
} catch (t) {
cc._throw(t);
}
}
}
return null;
},
_initSgNode: function() {
var t = this._sgNode;
t.setTimeScale(this.timeScale);
var e = this;
t.onEnter = function() {
_ccsg.Node.prototype.onEnter.call(this);
e._paused && this.pause();
};
this._startListener && this.setStartListener(this._startListener);
this._endListener && this.setEndListener(this._endListener);
this._completeListener && this.setCompleteListener(this._completeListener);
this._eventListener && this.setEventListener(this._eventListener);
this._interruptListener && this.setInterruptListener(this._interruptListener);
this._disposeListener && this.setDisposeListener(this._disposeListener);
if (this.defaultSkin) try {
t.setSkin(this.defaultSkin);
} catch (t) {
cc._throw(t);
}
t.setPremultipliedAlpha(this._premultipliedAlpha);
this.animation = this.defaultAnimation;
0;
},
_getLocalBounds: !1,
updateWorldTransform: function() {
this._sgNode && this._sgNode.updateWorldTransform();
},
setToSetupPose: function() {
this._sgNode && this._sgNode.setToSetupPose();
},
setBonesToSetupPose: function() {
this._sgNode && this._sgNode.setBonesToSetupPose();
},
setSlotsToSetupPose: function() {
this._sgNode && this._sgNode.setSlotsToSetupPose();
},
findBone: function(t) {
return this._sgNode ? this._sgNode.findBone(t) : null;
},
findSlot: function(t) {
return this._sgNode ? this._sgNode.findSlot(t) : null;
},
setSkin: function(t) {
return this._sgNode ? this._sgNode.setSkin(t) : null;
},
getAttachment: function(t, e) {
return this._sgNode ? this._sgNode.getAttachment(t, e) : null;
},
setAttachment: function(t, e) {
this._sgNode && this._sgNode.setAttachment(t, e);
},
setSkeletonData: function(t, e) {
this._sgNode && this._sgNode.setSkeletonData(t, e);
},
setAnimationStateData: function(t) {
if (this._sgNode) return this._sgNode.setAnimationStateData(t);
},
setMix: function(t, e, i) {
this._sgNode && this._sgNode.setMix(t, e, i);
},
setAnimationListener: function(t, e) {
this._sgNode && this._sgNode.setAnimationListener(t, e);
},
setAnimation: function(t, e, i) {
if (this._sgNode) {
0;
return this._sgNode.setAnimation(t, e, i);
}
return null;
},
_sample: function() {
this._sgNode && this._sgNode.update(0);
},
addAnimation: function(t, e, i, n) {
return this._sgNode ? this._sgNode.addAnimation(t, e, i, n || 0) : null;
},
findAnimation: function(t) {
return this._sgNode ? this._sgNode.findAnimation(t) : null;
},
getCurrent: function(t) {
return this._sgNode ? this._sgNode.getCurrent(t) : null;
},
clearTracks: function() {
this._sgNode && this._sgNode.clearTracks();
},
clearTrack: function(t) {
if (this._sgNode) {
this._sgNode.clearTrack(t);
0;
}
},
_updateAnimEnum: !1,
_updateSkinEnum: !1,
setStartListener: function(t) {
this._startListener = t;
this._sgNode && this._sgNode.setStartListener(t);
},
setInterruptListener: function(t) {
this._interruptListener = t;
this._sgNode && this._sgNode.setInterruptListener(t);
},
setEndListener: function(t) {
this._endListener = t;
this._sgNode && this._sgNode.setEndListener(t);
},
setDisposeListener: function(t) {
this._disposeListener = t;
this._sgNode && this._sgNode.setDisposeListener(t);
},
setCompleteListener: function(t) {
this._completeListener = t;
this._sgNode && this._sgNode.setCompleteListener(t);
},
setEventListener: function(t) {
this._eventListener = t;
this._sgNode && this._sgNode.setEventListener(t);
},
setTrackStartListener: function(t, e) {
this._sgNode && this._sgNode.setTrackStartListener(t, e);
},
setTrackInterruptListener: function(t, e) {
this._sgNode && this._sgNode.setTrackInterruptListener(t, e);
},
setTrackEndListener: function(t, e) {
this._sgNode && this._sgNode.setTrackEndListener(t, e);
},
setTrackDisposeListener: function(t, e) {
this._sgNode && this._sgNode.setTrackDisposeListener(t, e);
},
setTrackCompleteListener: function(t, e) {
this._sgNode && this._sgNode.setTrackCompleteListener(t, e);
},
setTrackEventListener: function(t, e) {
this._sgNode && this._sgNode.setTrackEventListener(t, e);
},
getState: function() {
if (this._sgNode) return this._sgNode.getState();
},
_refresh: function() {
if (this._sgNode) {
this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null);
this._removeSgNode();
this._sgNode = null;
}
var t = this._sgNode = this._createSgNode();
if (t) {
t.retain();
this.enabledInHierarchy || t.setVisible(!1);
t.setContentSize(0, 0);
this._initSgNode();
this._appendSgNode(t);
this._registSizeProvider();
}
0;
}
});
}), {} ],
190: [ (function(t, e, i) {
var n = cc.Class({
name: "sp.SkeletonData",
extends: cc.Asset,
ctor: function() {
this.reset();
},
properties: {
_skeletonJson: null,
skeletonJson: {
get: function() {
return this._skeletonJson;
},
set: function(t) {
this._skeletonJson = t;
this.reset();
}
},
_atlasText: "",
atlasText: {
get: function() {
return this._atlasText;
},
set: function(t) {
this._atlasText = t;
this.reset();
}
},
atlasUrl: {
default: "",
url: cc.RawAsset
},
textures: {
default: [],
url: [ cc.Texture2D ]
},
scale: 1
},
statics: {
preventDeferredLoadDependents: !0
},
createNode: !1,
reset: function() {
this._skeletonCache = null;
this._atlasCache = null;
0;
},
getRuntimeData: !1,
getSkinsEnum: !1,
getAnimsEnum: !1,
_getAtlas: !1
});
sp.SkeletonData = e.exports = n;
}), {} ],
191: [ (function(t, e, i) {
sp = sp;
sp.VERTEX_INDEX = {
X1: 0,
Y1: 1,
X2: 2,
Y2: 3,
X3: 4,
Y3: 5,
X4: 6,
Y4: 7
};
sp.ATTACHMENT_TYPE = {
REGION: 0,
BOUNDING_BOX: 1,
MESH: 2,
SKINNED_MESH: 3
};
sp.AnimationEventType = cc.Enum({
START: 0,
INTERRUPT: 1,
END: 2,
DISPOSE: 3,
COMPLETE: 4,
EVENT: 5
});
0;
t("./SkeletonData");
t("./Skeleton");
}), {
"./SGSkeleton": 1,
"./SGSkeletonAnimation": 1,
"./SGSkeletonCanvasRenderCmd": 1,
"./SGSkeletonTexture": 188,
"./SGSkeletonWebGLRenderCmd": 1,
"./Skeleton": 189,
"./SkeletonData": 190,
"./lib/spine": 1
} ],
192: [ (function(i, n, o) {
Object.create = Object.create || function(t) {
function e() {}
e.prototype = t;
return new e();
};
var r, s, c = function(t, e) {
if (!t) throw new Error("Assertion failed: " + e);
}, a = function(t, e) {
if (!t && console && console.warn) {
console.warn("ASSERTION FAILED: " + e);
console.trace && console.trace();
}
}, h = function(t, e) {
return t < e ? t : e;
}, l = function(t, e) {
return t > e ? t : e;
};
if ("object" === ("object" == (e = typeof window) ? t(window) : e) && window.navigator.userAgent.indexOf("Firefox") > -1) {
r = Math.min;
s = Math.max;
} else {
r = h;
s = l;
}
var u = function(t, e) {
return t < e ? t + " " + e : e + " " + t;
}, d = function(t, e) {
for (var i = 0; i < t.length; i++) if (t[i] === e) {
t[i] = t[t.length - 1];
t.length--;
return;
}
}, f = function(t, e, i, n, o, r) {
var s = i - o, c = n - r, a = m(S(s, c, t - o, e - r) / F(s, c));
return new b(o + s * a, r + c * a);
};
cp.momentForCircle = function(t, e, i, n) {
return t * (.5 * (e * e + i * i) + M(n));
};
cp.areaForCircle = function(t, e) {
return Math.PI * Math.abs(t * t - e * e);
};
cp.momentForSegment = function(t, e, i) {
var n = O(x(e, i), .5);
return t * (G(i, e) / 12 + M(n));
};
cp.areaForSegment = function(t, e, i) {
return i * (Math.PI * i + 2 * V(t, e));
};
cp.momentForPoly = function(t, e, i) {
for (var n = 0, o = 0, r = e.length, s = 0; s < r; s += 2) {
var c = e[s] + i.x, a = e[s + 1] + i.y, h = e[(s + 2) % r] + i.x, l = e[(s + 3) % r] + i.y, u = L(h, l, c, a);
n += u * (S(c, a, c, a) + S(c, a, h, l) + S(h, l, h, l));
o += u;
}
return t * n / (6 * o);
};
cp.areaForPoly = function(t) {
for (var e = 0, i = 0, n = t.length; i < n; i += 2) e += N(new b(t[i], t[i + 1]), new b(t[(i + 2) % n], t[(i + 3) % n]));
return -e / 2;
};
cp.centroidForPoly = function(t) {
for (var e = 0, i = new b(0, 0), n = 0, o = t.length; n < o; n += 2) {
var r = new b(t[n], t[n + 1]), s = new b(t[(n + 2) % o], t[(n + 3) % o]), c = N(r, s);
e += c;
i = x(i, O(x(r, s), c));
}
return O(i, 1 / (3 * e));
};
cp.recenterPoly = function(t) {
for (var e = cp.centroidForPoly(t), i = 0; i < t.length; i += 2) {
t[i] -= e.x;
t[i + 1] -= e.y;
}
};
cp.momentForBox = function(t, e, i) {
return t * (e * e + i * i) / 12;
};
cp.momentForBox2 = function(t, e) {
var i = e.r - e.l, n = e.t - e.b, o = O([ e.l + e.r, e.b + e.t ], .5);
return cp.momentForBox(t, i, n) + t * M(o);
};
var p = cp.loopIndexes = function(t) {
var e, i, n, o, r = 0, s = 0;
e = n = t[0];
i = o = t[1];
for (var c = t.length >> 1, a = 1; a < c; a++) {
var h = t[2 * a], l = t[2 * a + 1];
if (h < e || h == e && l < i) {
e = h;
i = l;
r = a;
} else if (h > n || h == n && l > o) {
n = h;
o = l;
s = a;
}
}
return [ r, s ];
}, _ = function(t, e, i) {
var n = t[2 * e];
t[2 * e] = t[2 * i];
t[2 * i] = n;
n = t[2 * e + 1];
t[2 * e + 1] = t[2 * i + 1];
t[2 * i + 1] = n;
}, g = function(t, e, i, n, o, r) {
if (0 === i) return 0;
for (var s = 0, c = e, a = w(o, n), h = r * E(a), l = e, u = e + i - 1; l <= u; ) {
var d = new b(t[2 * l], t[2 * l + 1]), f = N(a, w(d, n));
if (f > h) {
if (f > s) {
s = f;
c = l;
}
l++;
} else {
_(t, l, u);
u--;
}
}
c != e && _(t, e, c);
return l - e;
}, v = function(t, e, i, n, o, r, s, c) {
if (n < 0) return 0;
if (0 == n) {
e[2 * c] = r.x;
e[2 * c + 1] = r.y;
return 1;
}
var a = g(e, i, n, o, r, t), h = new b(e[2 * i], e[2 * i + 1]), l = v(t, e, i + 1, a - 1, o, h, r, c), u = c + l++;
e[2 * u] = r.x;
e[2 * u + 1] = r.y;
var d = g(e, i + a, n - a, r, s, t), f = new b(e[2 * (i + a)], e[2 * (i + a) + 1]);
return l + v(t, e, i + a + 1, d - 1, r, f, s, c + l);
};
cp.convexHull = function(t, e, i) {
if (e) for (var n = 0; n < t.length; n++) e[n] = t[n]; else e = t;
var o = p(t), r = o[0], s = o[1];
if (r == s) {
e.length = 2;
return e;
}
_(e, 0, r);
_(e, 1, 0 == s ? r : s);
var c = new b(e[0], e[1]), h = new b(e[2], e[3]), l = t.length >> 1, u = v(i, e, 2, l - 2, c, h, c, 1) + 1;
e.length = 2 * u;
a(et(e), "Internal error: cpConvexHull() and cpPolyValidate() did not agree.Please report this error with as much info as you can.");
return e;
};
var y = function(t, e, i) {
return r(s(t, e), i);
}, m = function(t) {
return s(0, r(t, 1));
}, b = cp.Vect = function(t, e) {
this.x = t;
this.y = e;
};
cp.v = function(t, e) {
return new b(t, e);
};
var C = cp.vzero = new b(0, 0), T = cp.v.dot = function(t, e) {
return t.x * e.x + t.y * e.y;
}, S = function(t, e, i, n) {
return t * i + e * n;
}, E = cp.v.len = function(t) {
return Math.sqrt(T(t, t));
}, A = cp.v.len2 = function(t, e) {
return Math.sqrt(t * t + e * e);
}, x = (cp.v.eql = function(t, e) {
return t.x === e.x && t.y === e.y;
}, cp.v.add = function(t, e) {
return new b(t.x + e.x, t.y + e.y);
});
b.prototype.add = function(t) {
this.x += t.x;
this.y += t.y;
return this;
};
var w = cp.v.sub = function(t, e) {
return new b(t.x - e.x, t.y - e.y);
};
b.prototype.sub = function(t) {
this.x -= t.x;
this.y -= t.y;
return this;
};
var I = cp.v.neg = function(t) {
return new b(-t.x, -t.y);
};
b.prototype.neg = function() {
this.x = -this.x;
this.y = -this.y;
return this;
};
var O = cp.v.mult = function(t, e) {
return new b(t.x * e, t.y * e);
};
b.prototype.mult = function(t) {
this.x *= t;
this.y *= t;
return this;
};
var N = cp.v.cross = function(t, e) {
return t.x * e.y - t.y * e.x;
}, L = function(t, e, i, n) {
return t * n - e * i;
}, P = cp.v.perp = function(t) {
return new b(-t.y, t.x);
}, R = (cp.v.pvrperp = function(t) {
return new b(t.y, -t.x);
}, cp.v.project = function(t, e) {
return O(e, T(t, e) / M(e));
});
b.prototype.project = function(t) {
this.mult(T(this, t) / M(t));
return this;
};
var B = cp.v.rotate = function(t, e) {
return new b(t.x * e.x - t.y * e.y, t.x * e.y + t.y * e.x);
};
b.prototype.rotate = function(t) {
this.x = this.x * t.x - this.y * t.y;
this.y = this.x * t.y + this.y * t.x;
return this;
};
var D = cp.v.unrotate = function(t, e) {
return new b(t.x * e.x + t.y * e.y, t.y * e.x - t.x * e.y);
}, M = cp.v.lengthsq = function(t) {
return T(t, t);
}, F = cp.v.lengthsq2 = function(t, e) {
return t * t + e * e;
}, j = cp.v.lerp = function(t, e, i) {
return x(O(t, 1 - i), O(e, i));
}, z = cp.v.normalize = function(t) {
return O(t, 1 / E(t));
}, k = cp.v.normalize_safe = function(t) {
return 0 === t.x && 0 === t.y ? C : z(t);
}, W = cp.v.clamp = function(t, e) {
return T(t, t) > e * e ? O(z(t), e) : t;
}, V = (cp.v.lerpconst = function(t, e, i) {
return x(t, W(w(e, t), i));
}, cp.v.dist = function(t, e) {
return E(w(t, e));
}), G = cp.v.distsq = function(t, e) {
return M(w(t, e));
}, H = (cp.v.near = function(t, e, i) {
return G(t, e) < i * i;
}, cp.v.slerp = function(t, e, i) {
var n = Math.acos(T(t, e));
if (n) {
var o = 1 / Math.sin(n);
return x(O(t, Math.sin((1 - i) * n) * o), O(e, Math.sin(i * n) * o));
}
return t;
}), U = (cp.v.slerpconst = function(t, e, i) {
var n = Math.acos(T(t, e));
return H(t, e, r(i, n) / n);
}, cp.v.forangle = function(t) {
return new b(Math.cos(t), Math.sin(t));
}, cp.v.toangle = function(t) {
return Math.atan2(t.y, t.x);
}, cp.v.str = function(t) {
return "(" + t.x.toFixed(3) + ", " + t.y.toFixed(3) + ")";
}, cp.BB = function(t, e, i, n) {
this.l = t;
this.b = e;
this.r = i;
this.t = n;
0;
});
cp.bb = function(t, e, i, n) {
return new U(t, e, i, n);
};
var Y = function(t, e) {
return new U(t.x - e, t.y - e, t.x + e, t.y + e);
}, X = 0, J = (cp.NO_GROUP = 0, cp.ALL_LAYERS = -1);
cp.resetShapeIdCounter = function() {
X = 0;
};
var q = cp.Shape = function(t) {
this.body = t;
this.bb_l = this.bb_b = this.bb_r = this.bb_t = 0;
this.hashid = X++;
this.sensor = !1;
this.e = 0;
this.u = 0;
this.surface_v = C;
this.collision_type = 0;
this.group = 0;
this.layers = J;
this.space = null;
this.collisionCode = this.collisionCode;
};
q.prototype.setElasticity = function(t) {
this.e = t;
};
q.prototype.setFriction = function(t) {
this.body.activate();
this.u = t;
};
q.prototype.setLayers = function(t) {
this.body.activate();
this.layers = t;
};
q.prototype.setSensor = function(t) {
this.body.activate();
this.sensor = t;
};
q.prototype.setCollisionType = function(t) {
this.body.activate();
this.collision_type = t;
};
q.prototype.getBody = function() {
return this.body;
};
q.prototype.active = function() {
return this.body && -1 !== this.body.shapeList.indexOf(this);
};
q.prototype.setBody = function(t) {
c(!this.active(), "You cannot change the body on an active shape. You must remove the shape from the space before changing the body.");
this.body = t;
};
q.prototype.cacheBB = function() {
return this.update(this.body.p, this.body.rot);
};
q.prototype.update = function(t, e) {
c(!isNaN(e.x), "Rotation is NaN");
c(!isNaN(t.x), "Position is NaN");
this.cacheData(t, e);
};
q.prototype.pointQuery = function(t) {
var e = this.nearestPointQuery(t);
if (e.d < 0) return e;
};
q.prototype.getBB = function() {
return new U(this.bb_l, this.bb_b, this.bb_r, this.bb_t);
};
var Q = function(t, e, i) {
this.shape = t;
this.p = e;
this.d = i;
}, Z = function(t, e, i) {
this.shape = t;
this.t = e;
this.n = i;
};
Z.prototype.hitPoint = function(t, e) {
return j(t, e, this.t);
};
Z.prototype.hitDist = function(t, e) {
return V(t, e) * this.t;
};
var K = cp.CircleShape = function(t, e, i) {
this.c = this.tc = i;
this.r = e;
this.type = "circle";
q.call(this, t);
};
K.prototype = Object.create(q.prototype);
K.prototype.cacheData = function(t, e) {
var i = this.tc = B(this.c, e).add(t), n = this.r;
this.bb_l = i.x - n;
this.bb_b = i.y - n;
this.bb_r = i.x + n;
this.bb_t = i.y + n;
};
K.prototype.nearestPointQuery = function(t) {
var e = t.x - this.tc.x, i = t.y - this.tc.y, n = A(e, i), o = this.r, r = new b(this.tc.x + e * o / n, this.tc.y + i * o / n);
return new Q(this, r, n - o);
};
var $ = function(t, e, i, n, o, r) {
n = w(n, e);
o = w(o, e);
var s = T(n, n) - 2 * T(n, o) + T(o, o), c = -2 * T(n, n) + 2 * T(n, o), a = c * c - 4 * s * (T(n, n) - i * i);
if (a >= 0) {
var h = (-c - Math.sqrt(a)) / (2 * s);
if (0 <= h && h <= 1) return new Z(t, h, z(j(n, o, h)));
}
};
K.prototype.segmentQuery = function(t, e) {
return $(this, this.tc, this.r, t, e);
};
var tt = cp.SegmentShape = function(t, e, i, n) {
this.a = e;
this.b = i;
this.n = P(z(w(i, e)));
this.ta = this.tb = this.tn = null;
this.r = n;
this.a_tangent = C;
this.b_tangent = C;
this.type = "segment";
q.call(this, t);
};
tt.prototype = Object.create(q.prototype);
tt.prototype.cacheData = function(t, e) {
this.ta = x(t, B(this.a, e));
this.tb = x(t, B(this.b, e));
this.tn = B(this.n, e);
var i, n, o, r;
if (this.ta.x < this.tb.x) {
i = this.ta.x;
n = this.tb.x;
} else {
i = this.tb.x;
n = this.ta.x;
}
if (this.ta.y < this.tb.y) {
o = this.ta.y;
r = this.tb.y;
} else {
o = this.tb.y;
r = this.ta.y;
}
var s = this.r;
this.bb_l = i - s;
this.bb_b = o - s;
this.bb_r = n + s;
this.bb_t = r + s;
};
tt.prototype.nearestPointQuery = function(t) {
var e = (function(t, e, i) {
var n = w(e, i), o = m(T(n, w(t, i)) / M(n));
return x(i, O(n, o));
})(t, this.ta, this.tb), i = t.x - e.x, n = t.y - e.y, o = A(i, n), r = this.r, s = o ? x(e, O(new b(i, n), r / o)) : e;
return new Q(this, s, o - r);
};
tt.prototype.segmentQuery = function(t, e) {
var i = this.tn, n = T(w(this.ta, t), i), o = this.r, r = n > 0 ? I(i) : i, s = w(O(r, o), t), c = x(this.ta, s), a = x(this.tb, s), h = w(e, t);
if (N(h, c) * N(h, a) <= 0) {
var l = n + (n > 0 ? -o : o), u = -l, d = T(h, i) - l;
if (u * d < 0) return new Z(this, u / (u - d), r);
} else if (0 !== o) {
var f = $(this, this.ta, this.r, t, e), p = $(this, this.tb, this.r, t, e);
return f ? p && p.t < f.t ? p : f : p;
}
};
tt.prototype.setNeighbors = function(t, e) {
this.a_tangent = w(t, this.a);
this.b_tangent = w(e, this.b);
};
tt.prototype.setEndpoints = function(t, e) {
this.a = t;
this.b = e;
this.n = P(z(w(e, t)));
};
var et = function(t) {
for (var e = t.length, i = 0; i < e; i += 2) {
var n = t[i], o = t[i + 1], r = t[(i + 2) % e], s = t[(i + 3) % e], c = t[(i + 4) % e], a = t[(i + 5) % e];
if (L(r - n, s - o, c - r, a - s) > 0) return !1;
}
return !0;
}, it = cp.PolyShape = function(t, e, i) {
this.setVerts(e, i);
this.type = "poly";
q.call(this, t);
};
it.prototype = Object.create(q.prototype);
var nt = function(t, e) {
this.n = t;
this.d = e;
};
nt.prototype.compare = function(t) {
return T(this.n, t) - this.d;
};
it.prototype.setVerts = function(i, n) {
c(i.length >= 4, "Polygons require some verts");
c("number" === ("object" == (e = typeof i[0]) ? t(i[0]) : e), "Polygon verticies should be specified in a flattened list (eg [x1,y1,x2,y2,x3,y3,...])");
c(et(i), "Polygon is concave or has a reversed winding. Consider using cpConvexHull()");
var o = i.length, r = o >> 1;
this.verts = new Array(o);
this.tVerts = new Array(o);
this.planes = new Array(r);
this.tPlanes = new Array(r);
for (var s = 0; s < o; s += 2) {
var a = i[s] + n.x, h = i[s + 1] + n.y, l = i[(s + 2) % o] + n.x, u = i[(s + 3) % o] + n.y, d = z(P(new b(l - a, u - h)));
this.verts[s] = a;
this.verts[s + 1] = h;
this.planes[s >> 1] = new nt(d, S(d.x, d.y, a, h));
this.tPlanes[s >> 1] = new nt(new b(0, 0), 0);
}
};
cp.BoxShape = function(t, e, i) {
var n = e / 2, o = i / 2;
return ot(t, new U(-n, -o, n, o));
};
var ot = cp.BoxShape2 = function(t, e) {
var i = [ e.l, e.b, e.l, e.t, e.r, e.t, e.r, e.b ];
return new it(t, i, C);
};
it.prototype.transformVerts = function(t, e) {
for (var i = this.verts, n = this.tVerts, o = Infinity, c = -Infinity, a = Infinity, h = -Infinity, l = 0; l < i.length; l += 2) {
var u = i[l], d = i[l + 1], f = t.x + u * e.x - d * e.y, p = t.y + u * e.y + d * e.x;
n[l] = f;
n[l + 1] = p;
o = r(o, f);
c = s(c, f);
a = r(a, p);
h = s(h, p);
}
this.bb_l = o;
this.bb_b = a;
this.bb_r = c;
this.bb_t = h;
};
it.prototype.transformAxes = function(t, e) {
for (var i = this.planes, n = this.tPlanes, o = 0; o < i.length; o++) {
var r = B(i[o].n, e);
n[o].n = r;
n[o].d = T(t, r) + i[o].d;
}
};
it.prototype.cacheData = function(t, e) {
this.transformAxes(t, e);
this.transformVerts(t, e);
};
it.prototype.nearestPointQuery = function(t) {
for (var e = this.tPlanes, i = this.tVerts, n = i[i.length - 2], o = i[i.length - 1], r = Infinity, s = C, c = !1, a = 0; a < e.length; a++) {
e[a].compare(t) > 0 && (c = !0);
var h = i[2 * a], l = i[2 * a + 1], u = f(t.x, t.y, n, o, h, l), d = V(t, u);
if (d < r) {
r = d;
s = u;
}
n = h;
o = l;
}
return new Q(this, s, c ? r : -r);
};
it.prototype.segmentQuery = function(t, e) {
for (var i = this.tPlanes, n = this.tVerts, o = i.length, r = 2 * o, s = 0; s < o; s++) {
var c = i[s].n, a = T(t, c);
if (!(i[s].d > a)) {
var h = T(e, c), l = (i[s].d - a) / (h - a);
if (!(l < 0 || 1 < l)) {
var u = j(t, e, l), d = -N(c, u), f = -L(c.x, c.y, n[2 * s], n[2 * s + 1]), p = -L(c.x, c.y, n[(2 * s + 2) % r], n[(2 * s + 3) % r]);
if (f <= d && d <= p) return new Z(this, l, c);
}
}
}
};
it.prototype.valueOnAxis = function(t, e) {
for (var i = this.tVerts, n = S(t.x, t.y, i[0], i[1]), o = 2; o < i.length; o += 2) n = r(n, S(t.x, t.y, i[o], i[o + 1]));
return n - e;
};
it.prototype.containsVert = function(t, e) {
for (var i = this.tPlanes, n = 0; n < i.length; n++) {
var o = i[n].n;
if (S(o.x, o.y, t, e) - i[n].d > 0) return !1;
}
return !0;
};
it.prototype.containsVertPartial = function(t, e, i) {
for (var n = this.tPlanes, o = 0; o < n.length; o++) {
var r = n[o].n;
if (!(T(r, i) < 0)) {
if (S(r.x, r.y, t, e) - n[o].d > 0) return !1;
}
}
return !0;
};
it.prototype.getNumVerts = function() {
return this.verts.length / 2;
};
it.prototype.getVert = function(t) {
return new b(this.verts[2 * t], this.verts[2 * t + 1]);
};
var rt = cp.Body = function(t, e) {
this.p = new b(0, 0);
this.vx = this.vy = 0;
this.f = new b(0, 0);
this.w = 0;
this.t = 0;
this.v_limit = Infinity;
this.w_limit = Infinity;
this.v_biasx = this.v_biasy = 0;
this.w_bias = 0;
this.space = null;
this.shapeList = [];
this.arbiterList = null;
this.constraintList = null;
this.nodeRoot = null;
this.nodeNext = null;
this.nodeIdleTime = 0;
this.setMass(t);
this.setMoment(e);
this.rot = new b(0, 0);
this.setAngle(0);
};
cp.StaticBody = function() {
var t = new rt(Infinity, Infinity);
t.nodeIdleTime = Infinity;
return t;
};
if ("undefined" !== ("object" == (e = typeof DEBUG) ? t(DEBUG) : e) && DEBUG) {
var st = function(t, e) {
!(function(t, e) {
c(t.x == t.x && t.y == t.y, e);
})(t, e);
!(function(t, e) {
c(Infinity !== Math.abs(t.x) && Infinity !== Math.abs(t.y), e);
})(t, e);
};
rt.prototype.sanityCheck = function() {
c(this.m == this.m && this.m_inv == this.m_inv, "Body's mass is invalid.");
c(this.i == this.i && this.i_inv == this.i_inv, "Body's moment is invalid.");
st(this.p, "Body's position is invalid.");
st(this.f, "Body's force is invalid.");
c(this.vx == this.vx && Infinity !== Math.abs(this.vx), "Body's velocity is invalid.");
c(this.vy == this.vy && Infinity !== Math.abs(this.vy), "Body's velocity is invalid.");
c(this.a == this.a && Infinity !== Math.abs(this.a), "Body's angle is invalid.");
c(this.w == this.w && Infinity !== Math.abs(this.w), "Body's angular velocity is invalid.");
c(this.t == this.t && Infinity !== Math.abs(this.t), "Body's torque is invalid.");
st(this.rot, "Body's rotation vector is invalid.");
c(this.v_limit == this.v_limit, "Body's velocity limit is invalid.");
c(this.w_limit == this.w_limit, "Body's angular velocity limit is invalid.");
};
} else rt.prototype.sanityCheck = function() {};
rt.prototype.getPos = function() {
return this.p;
};
rt.prototype.getVel = function() {
return new b(this.vx, this.vy);
};
rt.prototype.getAngVel = function() {
return this.w;
};
rt.prototype.isSleeping = function() {
return null !== this.nodeRoot;
};
rt.prototype.isStatic = function() {
return Infinity === this.nodeIdleTime;
};
rt.prototype.isRogue = function() {
return null === this.space;
};
rt.prototype.setMass = function(t) {
c(t > 0, "Mass must be positive and non-zero.");
this.activate();
this.m = t;
this.m_inv = 1 / t;
};
rt.prototype.setMoment = function(t) {
c(t > 0, "Moment of Inertia must be positive and non-zero.");
this.activate();
this.i = t;
this.i_inv = 1 / t;
};
rt.prototype.addShape = function(t) {
this.shapeList.push(t);
};
rt.prototype.removeShape = function(t) {
d(this.shapeList, t);
};
var ct = function(t, e, i) {
if (t === i) return t.next(e);
t.a === e ? t.next_a = ct(t.next_a, e, i) : t.next_b = ct(t.next_b, e, i);
return t;
};
rt.prototype.removeConstraint = function(t) {
this.constraintList = ct(this.constraintList, this, t);
};
rt.prototype.setPos = function(t) {
this.activate();
this.sanityCheck();
t === C && (t = cp.v(0, 0));
this.p = t;
};
rt.prototype.setVel = function(t) {
this.activate();
this.vx = t.x;
this.vy = t.y;
};
rt.prototype.setAngVel = function(t) {
this.activate();
this.w = t;
};
rt.prototype.setAngleInternal = function(t) {
c(!isNaN(t), "Internal Error: Attempting to set body's angle to NaN");
this.a = t;
this.rot.x = Math.cos(t);
this.rot.y = Math.sin(t);
};
rt.prototype.setAngle = function(t) {
this.activate();
this.sanityCheck();
this.setAngleInternal(t);
};
rt.prototype.velocity_func = function(t, e, i) {
var n = this.vx * e + (t.x + this.f.x * this.m_inv) * i, o = this.vy * e + (t.y + this.f.y * this.m_inv) * i, r = this.v_limit, s = n * n + o * o, c = s > r * r ? r / Math.sqrt(s) : 1;
this.vx = n * c;
this.vy = o * c;
var a = this.w_limit;
this.w = y(this.w * e + this.t * this.i_inv * i, -a, a);
this.sanityCheck();
};
rt.prototype.position_func = function(t) {
this.p.x += (this.vx + this.v_biasx) * t;
this.p.y += (this.vy + this.v_biasy) * t;
this.setAngleInternal(this.a + (this.w + this.w_bias) * t);
this.v_biasx = this.v_biasy = 0;
this.w_bias = 0;
this.sanityCheck();
};
rt.prototype.resetForces = function() {
this.activate();
this.f = new b(0, 0);
this.t = 0;
};
rt.prototype.applyForce = function(t, e) {
this.activate();
this.f = x(this.f, t);
this.t += N(e, t);
};
rt.prototype.applyImpulse = function(t, e) {
this.activate();
qt(this, t.x, t.y, e);
};
rt.prototype.getVelAtPoint = function(t) {
return x(new b(this.vx, this.vy), O(P(t), this.w));
};
rt.prototype.getVelAtWorldPoint = function(t) {
return this.getVelAtPoint(w(t, this.p));
};
rt.prototype.getVelAtLocalPoint = function(t) {
return this.getVelAtPoint(B(t, this.rot));
};
rt.prototype.eachShape = function(t) {
for (var e = 0, i = this.shapeList.length; e < i; e++) t(this.shapeList[e]);
};
rt.prototype.eachConstraint = function(t) {
for (var e = this.constraintList; e; ) {
var i = e.next(this);
t(e);
e = i;
}
};
rt.prototype.eachArbiter = function(t) {
for (var e = this.arbiterList; e; ) {
var i = e.next(this);
e.swappedColl = this === e.body_b;
t(e);
e = i;
}
};
rt.prototype.local2World = function(t) {
return x(this.p, B(t, this.rot));
};
rt.prototype.world2Local = function(t) {
return D(w(t, this.p), this.rot);
};
rt.prototype.kineticEnergy = function() {
var t = this.vx * this.vx + this.vy * this.vy, e = this.w * this.w;
return (t ? t * this.m : 0) + (e ? e * this.i : 0);
};
var at = cp.SpatialIndex = function(t) {
this.staticIndex = t;
if (t) {
if (t.dynamicIndex) throw new Error("This static index is already associated with a dynamic index.");
t.dynamicIndex = this;
}
};
at.prototype.collideStatic = function(t, e) {
if (t.count > 0) {
var i = t.query;
this.each((function(t) {
i(t, new U(t.bb_l, t.bb_b, t.bb_r, t.bb_t), e);
}));
}
};
var ht = cp.BBTree = function(t) {
at.call(this, t);
this.velocityFunc = null;
this.leaves = {};
this.count = 0;
this.root = null;
this.pooledNodes = null;
this.pooledPairs = null;
this.stamp = 0;
};
ht.prototype = Object.create(at.prototype);
var lt = function(t, e, i) {
this.obj = null;
this.bb_l = r(e.bb_l, i.bb_l);
this.bb_b = r(e.bb_b, i.bb_b);
this.bb_r = s(e.bb_r, i.bb_r);
this.bb_t = s(e.bb_t, i.bb_t);
this.parent = null;
this.setA(e);
this.setB(i);
};
ht.prototype.makeNode = function(t, e) {
var i = this.pooledNodes;
if (i) {
this.pooledNodes = i.parent;
i.constructor(this, t, e);
return i;
}
0;
return new lt(this, t, e);
};
var ut = function(t, e) {
this.obj = e;
t.getBB(e, this);
this.parent = null;
this.stamp = 1;
this.pairs = null;
0;
};
ht.prototype.getBB = function(t, e) {
var i = this.velocityFunc;
if (i) {
var n = .1 * (t.bb_r - t.bb_l), o = .1 * (t.bb_t - t.bb_b), c = O(i(t), .1);
e.bb_l = t.bb_l + r(-n, c.x);
e.bb_b = t.bb_b + r(-o, c.y);
e.bb_r = t.bb_r + s(n, c.x);
e.bb_t = t.bb_t + s(o, c.y);
} else {
e.bb_l = t.bb_l;
e.bb_b = t.bb_b;
e.bb_r = t.bb_r;
e.bb_t = t.bb_t;
}
};
ht.prototype.getStamp = function() {
var t = this.dynamicIndex;
return t && t.stamp ? t.stamp : this.stamp;
};
ht.prototype.incrementStamp = function() {
this.dynamicIndex && this.dynamicIndex.stamp ? this.dynamicIndex.stamp++ : this.stamp++;
};
var dt = function(t, e, i, n) {
this.prevA = null;
this.leafA = t;
this.nextA = e;
this.prevB = null;
this.leafB = i;
this.nextB = n;
};
ht.prototype.makePair = function(t, e, i, n) {
var o = this.pooledPairs;
if (o) {
this.pooledPairs = o.prevA;
o.prevA = null;
o.leafA = t;
o.nextA = e;
o.prevB = null;
o.leafB = i;
o.nextB = n;
return o;
}
0;
return new dt(t, e, i, n);
};
dt.prototype.recycle = function(t) {
this.prevA = t.pooledPairs;
t.pooledPairs = this;
};
var ft = function(t, e, i) {
i && (i.leafA === e ? i.prevA = t : i.prevB = t);
t ? t.leafA === e ? t.nextA = i : t.nextB = i : e.pairs = i;
};
ut.prototype.clearPairs = function(t) {
var e, i = this.pairs;
this.pairs = null;
for (;i; ) {
if (i.leafA === this) {
e = i.nextA;
ft(i.prevB, i.leafB, i.nextB);
} else {
e = i.nextB;
ft(i.prevA, i.leafA, i.nextA);
}
i.recycle(t);
i = e;
}
};
var pt = function(t, e, i) {
var n = t.pairs, o = e.pairs, r = i.makePair(t, n, e, o);
t.pairs = e.pairs = r;
n && (n.leafA === t ? n.prevA = r : n.prevB = r);
o && (o.leafA === e ? o.prevA = r : o.prevB = r);
};
lt.prototype.recycle = function(t) {
this.parent = t.pooledNodes;
t.pooledNodes = this;
};
ut.prototype.recycle = function(t) {};
lt.prototype.setA = function(t) {
this.A = t;
t.parent = this;
};
lt.prototype.setB = function(t) {
this.B = t;
t.parent = this;
};
ut.prototype.isLeaf = !0;
lt.prototype.isLeaf = !1;
lt.prototype.otherChild = function(t) {
return this.A == t ? this.B : this.A;
};
lt.prototype.replaceChild = function(t, e, i) {
a(t == this.A || t == this.B, "Node is not a child of parent.");
if (this.A == t) {
this.A.recycle(i);
this.setA(e);
} else {
this.B.recycle(i);
this.setB(e);
}
for (var n = this; n; n = n.parent) {
var o = n.A, c = n.B;
n.bb_l = r(o.bb_l, c.bb_l);
n.bb_b = r(o.bb_b, c.bb_b);
n.bb_r = s(o.bb_r, c.bb_r);
n.bb_t = s(o.bb_t, c.bb_t);
}
};
lt.prototype.bbArea = ut.prototype.bbArea = function() {
return (this.bb_r - this.bb_l) * (this.bb_t - this.bb_b);
};
var _t = function(t, e) {
return (s(t.bb_r, e.bb_r) - r(t.bb_l, e.bb_l)) * (s(t.bb_t, e.bb_t) - r(t.bb_b, e.bb_b));
}, gt = function(t, e) {
return Math.abs(t.bb_l + t.bb_r - e.bb_l - e.bb_r) + Math.abs(t.bb_b + t.bb_t - e.bb_b - e.bb_t);
}, vt = function(t, e, i) {
if (null == t) return e;
if (t.isLeaf) return i.makeNode(e, t);
var n = t.B.bbArea() + _t(t.A, e), o = t.A.bbArea() + _t(t.B, e);
if (n === o) {
n = gt(t.A, e);
o = gt(t.B, e);
}
o < n ? t.setB(vt(t.B, e, i)) : t.setA(vt(t.A, e, i));
t.bb_l = r(t.bb_l, e.bb_l);
t.bb_b = r(t.bb_b, e.bb_b);
t.bb_r = s(t.bb_r, e.bb_r);
t.bb_t = s(t.bb_t, e.bb_t);
return t;
};
lt.prototype.intersectsBB = ut.prototype.intersectsBB = function(t) {
return this.bb_l <= t.r && t.l <= this.bb_r && this.bb_b <= t.t && t.b <= this.bb_t;
};
var yt = function(t, e, i) {
if (t.intersectsBB(e)) if (t.isLeaf) i(t.obj); else {
yt(t.A, e, i);
yt(t.B, e, i);
}
}, mt = function(t, e, i) {
var n = 1 / (i.x - e.x), o = t.bb_l == e.x ? -Infinity : (t.bb_l - e.x) * n, c = t.bb_r == e.x ? Infinity : (t.bb_r - e.x) * n, a = r(o, c), h = s(o, c), l = 1 / (i.y - e.y), u = t.bb_b == e.y ? -Infinity : (t.bb_b - e.y) * l, d = t.bb_t == e.y ? Infinity : (t.bb_t - e.y) * l, f = r(u, d), p = s(u, d);
if (f <= h && a <= p) {
var _ = s(a, f);
if (0 <= r(h, p) && _ <= 1) return s(_, 0);
}
return Infinity;
}, bt = function(t, e, i, n, o) {
if (t.isLeaf) return o(t.obj);
var s = mt(t.A, e, i), c = mt(t.B, e, i);
if (s < c) {
s < n && (n = r(n, bt(t.A, e, i, n, o)));
c < n && (n = r(n, bt(t.B, e, i, n, o)));
} else {
c < n && (n = r(n, bt(t.B, e, i, n, o)));
s < n && (n = r(n, bt(t.A, e, i, n, o)));
}
return n;
};
ht.prototype.subtreeRecycle = function(t) {
if (t.isLeaf) {
this.subtreeRecycle(t.A);
this.subtreeRecycle(t.B);
t.recycle(this);
}
};
var Ct = function(t, e, i) {
if (e == t) return null;
var n = e.parent;
if (n == t) {
var o = t.otherChild(e);
o.parent = t.parent;
t.recycle(i);
return o;
}
n.parent.replaceChild(n, n.otherChild(e), i);
return t;
}, Tt = function(t, e) {
return t.bb_l <= e.bb_r && e.bb_l <= t.bb_r && t.bb_b <= e.bb_t && e.bb_b <= t.bb_t;
};
ut.prototype.markLeafQuery = function(t, e, i, n) {
if (Tt(t, this)) if (e) pt(t, this, i); else {
this.stamp < t.stamp && pt(this, t, i);
n && n(t.obj, this.obj);
}
};
lt.prototype.markLeafQuery = function(t, e, i, n) {
if (Tt(t, this)) {
this.A.markLeafQuery(t, e, i, n);
this.B.markLeafQuery(t, e, i, n);
}
};
ut.prototype.markSubtree = function(t, e, i) {
if (this.stamp == t.getStamp()) {
e && e.markLeafQuery(this, !1, t, i);
for (var n = this; n.parent; n = n.parent) n == n.parent.A ? n.parent.B.markLeafQuery(this, !0, t, i) : n.parent.A.markLeafQuery(this, !1, t, i);
} else for (var o = this.pairs; o; ) if (this === o.leafB) {
i && i(o.leafA.obj, this.obj);
o = o.nextB;
} else o = o.nextA;
};
lt.prototype.markSubtree = function(t, e, i) {
this.A.markSubtree(t, e, i);
this.B.markSubtree(t, e, i);
};
ut.prototype.containsObj = function(t) {
return this.bb_l <= t.bb_l && this.bb_r >= t.bb_r && this.bb_b <= t.bb_b && this.bb_t >= t.bb_t;
};
ut.prototype.update = function(t) {
var e = t.root, i = this.obj;
if (!this.containsObj(i)) {
t.getBB(this.obj, this);
e = Ct(e, this, t);
t.root = vt(e, this, t);
this.clearPairs(t);
this.stamp = t.getStamp();
return !0;
}
return !1;
};
ut.prototype.addPairs = function(t) {
var e = t.dynamicIndex;
if (e) {
var i = e.root;
i && i.markLeafQuery(this, !0, e, null);
} else {
var n = t.staticIndex.root;
this.markSubtree(t, n, null);
}
};
ht.prototype.insert = function(t, e) {
var i = new ut(this, t);
this.leaves[e] = i;
this.root = vt(this.root, i, this);
this.count++;
i.stamp = this.getStamp();
i.addPairs(this);
this.incrementStamp();
};
ht.prototype.remove = function(t, e) {
var i = this.leaves[e];
delete this.leaves[e];
this.root = Ct(this.root, i, this);
this.count--;
i.clearPairs(this);
i.recycle(this);
};
ht.prototype.contains = function(t, e) {
return null != this.leaves[e];
};
var St = function(t, e) {};
ht.prototype.reindexQuery = function(t) {
if (this.root) {
var e, i = this.leaves;
for (e in i) i[e].update(this);
var n = this.staticIndex, o = n && n.root;
this.root.markSubtree(this, o, t);
n && !o && this.collideStatic(this, n, t);
this.incrementStamp();
}
};
ht.prototype.reindex = function() {
this.reindexQuery(St);
};
ht.prototype.reindexObject = function(t, e) {
var i = this.leaves[e];
if (i) {
i.update(this) && i.addPairs(this);
this.incrementStamp();
}
};
ht.prototype.pointQuery = function(t, e) {
this.query(new U(t.x, t.y, t.x, t.y), e);
};
ht.prototype.segmentQuery = function(t, e, i, n) {
this.root && bt(this.root, t, e, i, n);
};
ht.prototype.query = function(t, e) {
this.root && yt(this.root, t, e);
};
ht.prototype.count = function() {
return this.count;
};
ht.prototype.each = function(t) {
var e;
for (e in this.leaves) t(this.leaves[e].obj);
};
var Et = function(t, e, i, n, o) {
return (s(t.bb_r, n) - r(t.bb_l, e)) * (s(t.bb_t, o) - r(t.bb_b, i));
}, At = function(t, e, i, n) {
if (1 == n) return e[i];
if (2 == n) return t.makeNode(e[i], e[i + 1]);
for (var o = (A = e[i]).bb_l, c = A.bb_b, a = A.bb_r, h = A.bb_t, l = i + n, u = i + 1; u < l; u++) {
A = e[u];
o = r(o, A.bb_l);
c = r(c, A.bb_b);
a = s(a, A.bb_r);
h = s(h, A.bb_t);
}
var d = a - o > h - c, f = new Array(2 * n);
if (d) for (u = i; u < l; u++) {
f[2 * u + 0] = e[u].bb_l;
f[2 * u + 1] = e[u].bb_r;
} else for (u = i; u < l; u++) {
f[2 * u + 0] = e[u].bb_b;
f[2 * u + 1] = e[u].bb_t;
}
f.sort((function(t, e) {
return t - e;
}));
var p = .5 * (f[n - 1] + f[n]), _ = o, g = c, v = a, y = h, m = o, b = c, C = a, T = h;
d ? v = m = p : y = b = p;
for (var S = l, E = i; E < S; ) {
var A = e[E];
if (Et(A, m, b, C, T) < Et(A, _, g, v, y)) {
S--;
e[E] = e[S];
e[S] = A;
} else E++;
}
if (S == n) {
for (A = null, u = i; u < l; u++) A = vt(A, e[u], t);
return A;
}
return NodeNew(t, At(t, e, i, S - i), At(t, e, S, l - S));
};
ht.prototype.optimize = function() {
var t = new Array(this.count), e = 0;
for (var i in this.leaves) t[e++] = this.nodes[i];
tree.subtreeRecycle(root);
this.root = At(tree, t, t.length);
};
var xt = function(t, e) {
if (!t.isLeaf && e <= 10) {
xt(t.A, e + 1);
xt(t.B, e + 1);
}
for (var i = "", n = 0; n < e; n++) i += " ";
console.log(i + t.bb_b + " " + t.bb_t);
};
ht.prototype.log = function() {
this.root && xt(this.root, 0);
};
var wt = cp.CollisionHandler = function() {
this.a = this.b = 0;
};
wt.prototype.begin = function(t, e) {
return !0;
};
wt.prototype.preSolve = function(t, e) {
return !0;
};
wt.prototype.postSolve = function(t, e) {};
wt.prototype.separate = function(t, e) {};
var It = function(t, e) {
this.e = 0;
this.u = 0;
this.surface_vr = C;
this.a = t;
this.body_a = t.body;
this.b = e;
this.body_b = e.body;
this.thread_a_next = this.thread_a_prev = null;
this.thread_b_next = this.thread_b_prev = null;
this.contacts = null;
this.stamp = 0;
this.handler = null;
this.swappedColl = !1;
this.state = "first coll";
};
It.prototype.getShapes = function() {
return this.swappedColl ? [ this.b, this.a ] : [ this.a, this.b ];
};
It.prototype.totalImpulse = function() {
for (var t = this.contacts, e = new b(0, 0), i = 0, n = t.length; i < n; i++) {
var o = t[i];
e.add(O(o.n, o.jnAcc));
}
return this.swappedColl ? e : e.neg();
};
It.prototype.totalImpulseWithFriction = function() {
for (var t = this.contacts, e = new b(0, 0), i = 0, n = t.length; i < n; i++) {
var o = t[i];
e.add(new b(o.jnAcc, o.jtAcc).rotate(o.n));
}
return this.swappedColl ? e : e.neg();
};
It.prototype.totalKE = function() {
for (var t = (1 - this.e) / (1 + this.e), e = 0, i = this.contacts, n = 0, o = i.length; n < o; n++) {
var r = i[n], s = r.jnAcc, c = r.jtAcc;
e += t * s * s / r.nMass + c * c / r.tMass;
}
return e;
};
It.prototype.ignore = function() {
this.state = "ignore";
};
It.prototype.getA = function() {
return this.swappedColl ? this.b : this.a;
};
It.prototype.getB = function() {
return this.swappedColl ? this.a : this.b;
};
It.prototype.isFirstContact = function() {
return "first coll" === this.state;
};
var Ot = function(t, e, i) {
this.point = t;
this.normal = e;
this.dist = i;
};
It.prototype.getContactPointSet = function() {
var t, e = new Array(this.contacts.length);
for (t = 0; t < e.length; t++) e[t] = new Ot(this.contacts[t].p, this.contacts[t].n, this.contacts[t].dist);
return e;
};
It.prototype.getNormal = function(t) {
var e = this.contacts[t].n;
return this.swappedColl ? I(e) : e;
};
It.prototype.getPoint = function(t) {
return this.contacts[t].p;
};
It.prototype.getDepth = function(t) {
return this.contacts[t].dist;
};
var Nt = function(t, e, i, n) {
i ? i.body_a === e ? i.thread_a_next = n : i.thread_b_next = n : e.arbiterList = n;
n && (n.body_a === e ? n.thread_a_prev = i : n.thread_b_prev = i);
};
It.prototype.unthread = function() {
Nt(0, this.body_a, this.thread_a_prev, this.thread_a_next);
Nt(0, this.body_b, this.thread_b_prev, this.thread_b_next);
this.thread_a_prev = this.thread_a_next = null;
this.thread_b_prev = this.thread_b_next = null;
};
It.prototype.update = function(t, e, i, n) {
if (this.contacts) for (var o = 0; o < this.contacts.length; o++) for (var r = this.contacts[o], s = 0; s < t.length; s++) {
var c = t[s];
if (c.hash === r.hash) {
c.jnAcc = r.jnAcc;
c.jtAcc = r.jtAcc;
}
}
this.contacts = t;
this.handler = e;
this.swappedColl = i.collision_type !== e.a;
this.e = i.e * n.e;
this.u = i.u * n.u;
this.surface_vr = w(i.surface_v, n.surface_v);
this.a = i;
this.body_a = i.body;
this.b = n;
this.body_b = n.body;
"cached" == this.state && (this.state = "first coll");
};
It.prototype.preStep = function(t, e, i) {
for (var n = this.body_a, o = this.body_b, s = 0; s < this.contacts.length; s++) {
var c = this.contacts[s];
c.r1 = w(c.p, n.p);
c.r2 = w(c.p, o.p);
c.nMass = 1 / $t(n, o, c.r1, c.r2, c.n);
c.tMass = 1 / $t(n, o, c.r1, c.r2, P(c.n));
c.bias = -i * r(0, c.dist + e) / t;
c.jBias = 0;
c.bounce = Jt(n, o, c.r1, c.r2, c.n) * this.e;
}
};
It.prototype.applyCachedImpulse = function(t) {
if (!this.isFirstContact()) for (var e = this.body_a, i = this.body_b, n = 0; n < this.contacts.length; n++) {
var o = this.contacts[n], r = o.n.x, s = o.n.y, c = r * o.jnAcc - s * o.jtAcc, a = r * o.jtAcc + s * o.jnAcc;
Qt(e, i, o.r1, o.r2, c * t, a * t);
}
};
It.prototype.applyImpulse = function() {
0;
for (var t = this.body_a, e = this.body_b, i = this.surface_vr, n = this.u, o = 0; o < this.contacts.length; o++) {
0;
var r = this.contacts[o], c = r.nMass, a = r.n, h = r.r1, l = r.r2, u = e.vx - l.y * e.w - (t.vx - h.y * t.w), d = e.vy + l.x * e.w - (t.vy + h.x * t.w), f = a.x * (e.v_biasx - l.y * e.w_bias - t.v_biasx + h.y * t.w_bias) + a.y * (l.x * e.w_bias + e.v_biasy - h.x * t.w_bias - t.v_biasy), p = S(u, d, a.x, a.y), _ = S(u + i.x, d + i.y, -a.y, a.x), g = (r.bias - f) * c, v = r.jBias;
r.jBias = s(v + g, 0);
var m = -(r.bounce + p) * c, b = r.jnAcc;
r.jnAcc = s(b + m, 0);
var C = n * r.jnAcc, T = -_ * r.tMass, E = r.jtAcc;
r.jtAcc = y(E + T, -C, C);
var A = a.x * (r.jBias - v), x = a.y * (r.jBias - v);
Zt(t, -A, -x, h);
Zt(e, A, x, l);
var w = r.jnAcc - b, I = r.jtAcc - E;
Qt(t, e, h, l, a.x * w - a.y * I, a.x * I + a.y * w);
}
};
It.prototype.callSeparate = function(t) {
t.lookupHandler(this.a.collision_type, this.b.collision_type).separate(this, t);
};
It.prototype.next = function(t) {
return this.body_a == t ? this.thread_a_next : this.thread_b_next;
};
var Lt = function(t, e, i, n) {
this.p = t;
this.n = e;
this.dist = i;
this.r1 = this.r2 = C;
this.nMass = this.tMass = this.bounce = this.bias = 0;
this.jnAcc = this.jtAcc = this.jBias = 0;
this.hash = n;
0;
}, Pt = [], Rt = function(t, e, i, n) {
var o = i + n, r = w(e, t), s = M(r);
if (!(s >= o * o)) {
var c = Math.sqrt(s);
return new Lt(x(t, O(r, .5 + (i - .5 * o) / (c || Infinity))), c ? O(r, 1 / c) : new b(1, 0), c - o, 0);
}
}, Bt = 0, Dt = function(t, e) {
var i = 0, n = t.valueOnAxis(e[0].n, e[0].d);
if (n > 0) return -1;
for (var o = 1; o < e.length; o++) {
var r = t.valueOnAxis(e[o].n, e[o].d);
if (r > 0) return -1;
if (r > n) {
n = r;
i = o;
}
}
Bt = n;
return i;
}, Mt = function(t, e, i, n) {
for (var o = [], r = t.tVerts, s = 0; s < r.length; s += 2) {
var c = r[s], a = r[s + 1];
e.containsVert(c, a) && o.push(new Lt(new b(c, a), i, n, u(t.hashid, s >> 1)));
}
var h = e.tVerts;
for (s = 0; s < h.length; s += 2) {
c = h[s], a = h[s + 1];
t.containsVert(c, a) && o.push(new Lt(new b(c, a), i, n, u(e.hashid, s >> 1)));
}
return o.length ? o : (function(t, e, i, n) {
for (var o = [], r = t.tVerts, s = 0; s < r.length; s += 2) {
var c = r[s], a = r[s + 1];
e.containsVertPartial(c, a, I(i)) && o.push(new Lt(new b(c, a), i, n, u(t.hashid, s)));
}
var h = e.tVerts;
for (s = 0; s < h.length; s += 2) {
c = h[s], a = h[s + 1];
t.containsVertPartial(c, a, i) && o.push(new Lt(new b(c, a), i, n, u(e.hashid, s)));
}
return o;
})(t, e, i, n);
}, Ft = function(t, e, i) {
var n = T(e, t.ta) - t.r, o = T(e, t.tb) - t.r;
return r(n, o) - i;
}, jt = function(t, e, i, n, o) {
for (var r = N(e.tn, e.ta), s = N(e.tn, e.tb), c = O(e.tn, o), a = i.tVerts, h = 0; h < a.length; h += 2) {
var l = a[h], d = a[h + 1];
if (S(l, d, c.x, c.y) < T(e.tn, e.ta) * o + e.r) {
var f = L(e.tn.x, e.tn.y, l, d);
r >= f && f >= s && t.push(new Lt(new b(l, d), c, n, u(i.hashid, h)));
}
}
};
K.prototype.collisionCode = 0;
tt.prototype.collisionCode = 1;
it.prototype.collisionCode = 2;
K.prototype.collisionTable = [ function(t, e) {
var i = Rt(t.tc, e.tc, t.r, e.r);
return i ? [ i ] : Pt;
}, function(t, e) {
var i = e.ta, n = e.tb, o = t.tc, r = w(n, i), s = m(T(r, w(o, i)) / M(r)), c = x(i, O(r, s)), a = Rt(o, c, t.r, e.r);
if (a) {
var h = a.n;
return 0 === s && T(h, e.a_tangent) < 0 || 1 === s && T(h, e.b_tangent) < 0 ? Pt : [ a ];
}
return Pt;
}, function(t, e) {
for (var i = e.tPlanes, n = 0, o = T(i[0].n, t.tc) - i[0].d - t.r, r = 0; r < i.length; r++) {
var s = T(i[r].n, t.tc) - i[r].d - t.r;
if (s > 0) return Pt;
if (s > o) {
o = s;
n = r;
}
}
var c = i[n].n, a = e.tVerts, h = a.length, l = n << 1, u = a[l], d = a[l + 1], f = a[(l + 2) % h], p = a[(l + 3) % h], _ = L(c.x, c.y, u, d), g = L(c.x, c.y, f, p), v = N(c, t.tc);
if (v < g) return (y = Rt(t.tc, new b(f, p), t.r, 0)) ? [ y ] : Pt;
if (v < _) return [ new Lt(w(t.tc, O(c, t.r + o / 2)), I(c), o, 0) ];
var y;
return (y = Rt(t.tc, new b(u, d), t.r, 0)) ? [ y ] : Pt;
} ];
tt.prototype.collisionTable = [ null, function(t, e) {
return Pt;
}, function(t, e) {
var i = [], n = e.tPlanes, o = n.length, r = T(t.tn, t.ta), s = e.valueOnAxis(t.tn, r) - t.r, c = e.valueOnAxis(I(t.tn), -r) - t.r;
if (c > 0 || s > 0) return Pt;
var a = 0, h = Ft(t, n[0].n, n[0].d);
if (h > 0) return Pt;
for (var l = 0; l < o; l++) {
var d = Ft(t, n[l].n, n[l].d);
if (d > 0) return Pt;
if (d > h) {
h = d;
a = l;
}
}
var f = I(n[a].n), p = x(t.ta, O(f, t.r)), _ = x(t.tb, O(f, t.r));
e.containsVert(p.x, p.y) && i.push(new Lt(p, f, h, u(t.hashid, 0)));
e.containsVert(_.x, _.y) && i.push(new Lt(_, f, h, u(t.hashid, 1)));
(s >= h || c >= h) && (s > c ? jt(i, t, e, s, 1) : jt(i, t, e, c, -1));
if (0 === i.length) {
var g, v = 2 * a, y = e.tVerts, m = new b(y[v], y[v + 1]);
if (g = Rt(t.ta, m, t.r, 0)) return [ g ];
if (g = Rt(t.tb, m, t.r, 0)) return [ g ];
var C = 2 * o, S = new b(y[(v + 2) % C], y[(v + 3) % C]);
if (g = Rt(t.ta, S, t.r, 0)) return [ g ];
if (g = Rt(t.tb, S, t.r, 0)) return [ g ];
}
return i;
} ];
it.prototype.collisionTable = [ null, null, function(t, e) {
var i = Dt(e, t.tPlanes);
if (-1 == i) return Pt;
var n = Bt, o = Dt(t, e.tPlanes);
if (-1 == o) return Pt;
var r = Bt;
return n > r ? Mt(t, e, t.tPlanes[i].n, n) : Mt(t, e, I(e.tPlanes[o].n), r);
} ];
var zt = cp.collideShapes = function(t, e) {
c(t.collisionCode <= e.collisionCode, "Collided shapes must be sorted by type");
return t.collisionTable[e.collisionCode](t, e);
}, kt = new wt(), Wt = cp.Space = function() {
this.stamp = 0;
this.curr_dt = 0;
this.bodies = [];
this.rousedBodies = [];
this.sleepingComponents = [];
this.staticShapes = new ht(null);
this.activeShapes = new ht(this.staticShapes);
this.arbiters = [];
this.contactBuffersHead = null;
this.cachedArbiters = {};
this.constraints = [];
this.locked = 0;
this.collisionHandlers = {};
this.defaultHandler = kt;
this.postStepCallbacks = [];
this.iterations = 10;
this.gravity = C;
this.damping = 1;
this.idleSpeedThreshold = 0;
this.sleepTimeThreshold = Infinity;
this.collisionSlop = .1;
this.collisionBias = Math.pow(.9, 60);
this.collisionPersistence = 3;
this.enableContactGraph = !1;
this.staticBody = new rt(Infinity, Infinity);
this.staticBody.nodeIdleTime = Infinity;
this.collideShapes = this.makeCollideShapes();
};
Wt.prototype.getCurrentTimeStep = function() {
return this.curr_dt;
};
Wt.prototype.setIterations = function(t) {
this.iterations = t;
};
Wt.prototype.isLocked = function() {
return this.locked;
};
var Vt = function(t) {
c(!t.locked, "This addition/removal cannot be done safely during a call to cpSpaceStep()  or during a query. Put these calls into a post-step callback.");
};
Wt.prototype.addCollisionHandler = function(t, e, i, n, o, r) {
Vt(this);
this.removeCollisionHandler(t, e);
var s = new wt();
s.a = t;
s.b = e;
i && (s.begin = i);
n && (s.preSolve = n);
o && (s.postSolve = o);
r && (s.separate = r);
this.collisionHandlers[u(t, e)] = s;
};
Wt.prototype.removeCollisionHandler = function(t, e) {
Vt(this);
delete this.collisionHandlers[u(t, e)];
};
Wt.prototype.setDefaultCollisionHandler = function(t, e, i, n) {
Vt(this);
var o = new wt();
t && (o.begin = t);
e && (o.preSolve = e);
i && (o.postSolve = i);
n && (o.separate = n);
this.defaultHandler = o;
};
Wt.prototype.lookupHandler = function(t, e) {
return this.collisionHandlers[u(t, e)] || this.defaultHandler;
};
Wt.prototype.addShape = function(t) {
var e = t.body;
if (e.isStatic()) return this.addStaticShape(t);
c(!t.space, "This shape is already added to a space and cannot be added to another.");
Vt(this);
e.activate();
e.addShape(t);
t.update(e.p, e.rot);
this.activeShapes.insert(t, t.hashid);
t.space = this;
return t;
};
Wt.prototype.addStaticShape = function(t) {
c(!t.space, "This shape is already added to a space and cannot be added to another.");
Vt(this);
var e = t.body;
e.addShape(t);
t.update(e.p, e.rot);
this.staticShapes.insert(t, t.hashid);
t.space = this;
return t;
};
Wt.prototype.addBody = function(t) {
c(!t.isStatic(), "Static bodies cannot be added to a space as they are not meant to be simulated.");
c(!t.space, "This body is already added to a space and cannot be added to another.");
Vt(this);
this.bodies.push(t);
t.space = this;
return t;
};
Wt.prototype.addConstraint = function(t) {
c(!t.space, "This shape is already added to a space and cannot be added to another.");
Vt(this);
var e = t.a, i = t.b;
e.activate();
i.activate();
this.constraints.push(t);
t.next_a = e.constraintList;
e.constraintList = t;
t.next_b = i.constraintList;
i.constraintList = t;
t.space = this;
return t;
};
Wt.prototype.filterArbiters = function(t, e) {
for (var i in this.cachedArbiters) {
var n = this.cachedArbiters[i];
if (t === n.body_a && (e === n.a || null === e) || t === n.body_b && (e === n.b || null === e)) {
e && "cached" !== n.state && n.callSeparate(this);
n.unthread();
d(this.arbiters, n);
delete this.cachedArbiters[i];
}
}
};
Wt.prototype.removeShape = function(t) {
var e = t.body;
if (e.isStatic()) this.removeStaticShape(t); else {
c(this.containsShape(t), "Cannot remove a shape that was not added to the space. (Removed twice maybe?)");
Vt(this);
e.activate();
e.removeShape(t);
this.filterArbiters(e, t);
this.activeShapes.remove(t, t.hashid);
t.space = null;
}
};
Wt.prototype.removeStaticShape = function(t) {
c(this.containsShape(t), "Cannot remove a static or sleeping shape that was not added to the space. (Removed twice maybe?)");
Vt(this);
var e = t.body;
e.isStatic() && e.activateStatic(t);
e.removeShape(t);
this.filterArbiters(e, t);
this.staticShapes.remove(t, t.hashid);
t.space = null;
};
Wt.prototype.removeBody = function(t) {
c(this.containsBody(t), "Cannot remove a body that was not added to the space. (Removed twice maybe?)");
Vt(this);
t.activate();
d(this.bodies, t);
t.space = null;
};
Wt.prototype.removeConstraint = function(t) {
c(this.containsConstraint(t), "Cannot remove a constraint that was not added to the space. (Removed twice maybe?)");
Vt(this);
t.a.activate();
t.b.activate();
d(this.constraints, t);
t.a.removeConstraint(t);
t.b.removeConstraint(t);
t.space = null;
};
Wt.prototype.containsShape = function(t) {
return t.space === this;
};
Wt.prototype.containsBody = function(t) {
return t.space == this;
};
Wt.prototype.containsConstraint = function(t) {
return t.space == this;
};
Wt.prototype.uncacheArbiter = function(t) {
delete this.cachedArbiters[u(t.a.hashid, t.b.hashid)];
d(this.arbiters, t);
};
Wt.prototype.eachBody = function(t) {
this.lock();
for (var e = this.bodies, i = 0; i < e.length; i++) t(e[i]);
var n = this.sleepingComponents;
for (i = 0; i < n.length; i++) for (var o = n[i]; o; ) {
var r = o.nodeNext;
t(o);
o = r;
}
this.unlock(!0);
};
Wt.prototype.eachShape = function(t) {
this.lock();
this.activeShapes.each(t);
this.staticShapes.each(t);
this.unlock(!0);
};
Wt.prototype.eachConstraint = function(t) {
this.lock();
for (var e = this.constraints, i = 0; i < e.length; i++) t(e[i]);
this.unlock(!0);
};
Wt.prototype.reindexStatic = function() {
c(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
this.staticShapes.each((function(t) {
var e = t.body;
t.update(e.p, e.rot);
}));
this.staticShapes.reindex();
};
Wt.prototype.reindexShape = function(t) {
c(!this.locked, "You cannot manually reindex objects while the space is locked. Wait until the current query or step is complete.");
var e = t.body;
t.update(e.p, e.rot);
this.activeShapes.reindexObject(t, t.hashid);
this.staticShapes.reindexObject(t, t.hashid);
};
Wt.prototype.reindexShapesForBody = function(t) {
for (var e = t.shapeList; e; e = e.next) this.reindexShape(e);
};
Wt.prototype.useSpatialHash = function(t, e) {
throw new Error("Spatial Hash not implemented.");
};
Wt.prototype.activateBody = function(t) {
c(!t.isRogue(), "Internal error: Attempting to activate a rogue body.");
if (this.locked) -1 === this.rousedBodies.indexOf(t) && this.rousedBodies.push(t); else {
this.bodies.push(t);
for (var e = 0; e < t.shapeList.length; e++) {
var i = t.shapeList[e];
this.staticShapes.remove(i, i.hashid);
this.activeShapes.insert(i, i.hashid);
}
for (var n = t.arbiterList; n; n = n.next(t)) {
if (t === (a = n.body_a) || a.isStatic()) {
var o = n.a, r = n.b;
this.cachedArbiters[u(o.hashid, r.hashid)] = n;
n.stamp = this.stamp;
n.handler = this.lookupHandler(o.collision_type, r.collision_type);
this.arbiters.push(n);
}
}
for (var s = t.constraintList; s; s = s.nodeNext) {
var a;
(t === (a = s.a) || a.isStatic()) && this.constraints.push(s);
}
}
};
Wt.prototype.deactivateBody = function(t) {
c(!t.isRogue(), "Internal error: Attempting to deactivate a rogue body.");
d(this.bodies, t);
for (var e = 0; e < t.shapeList.length; e++) {
var i = t.shapeList[e];
this.activeShapes.remove(i, i.hashid);
this.staticShapes.insert(i, i.hashid);
}
for (var n = t.arbiterList; n; n = n.next(t)) {
(t === (r = n.body_a) || r.isStatic()) && this.uncacheArbiter(n);
}
for (var o = t.constraintList; o; o = o.nodeNext) {
var r;
(t === (r = o.a) || r.isStatic()) && d(this.constraints, o);
}
};
var Gt = function(t) {
return t ? t.nodeRoot : null;
};
rt.prototype.activate = function() {
if (!this.isRogue()) {
this.nodeIdleTime = 0;
!(function(t) {
if (t && t.isSleeping(t)) {
c(!t.isRogue(), "Internal Error: componentActivate() called on a rogue body.");
for (var e = t.space, i = t; i; ) {
var n = i.nodeNext;
i.nodeIdleTime = 0;
i.nodeRoot = null;
i.nodeNext = null;
e.activateBody(i);
i = n;
}
d(e.sleepingComponents, t);
}
})(Gt(this));
}
};
rt.prototype.activateStatic = function(t) {
c(this.isStatic(), "Body.activateStatic() called on a non-static body.");
for (var e = this.arbiterList; e; e = e.next(this)) t && t != e.a && t != e.b || (e.body_a == this ? e.body_b : e.body_a).activate();
};
rt.prototype.pushArbiter = function(t) {
a(null === (t.body_a === this ? t.thread_a_next : t.thread_b_next), "Internal Error: Dangling contact graph pointers detected. (A)");
a(null === (t.body_a === this ? t.thread_a_prev : t.thread_b_prev), "Internal Error: Dangling contact graph pointers detected. (B)");
var e = this.arbiterList;
a(null === e || null === (e.body_a === this ? e.thread_a_prev : e.thread_b_prev), "Internal Error: Dangling contact graph pointers detected. (C)");
t.body_a === this ? t.thread_a_next = e : t.thread_b_next = e;
e && (e.body_a === this ? e.thread_a_prev = t : e.thread_b_prev = t);
this.arbiterList = t;
};
var Ht = function(t, e) {
if (!e.isRogue()) {
var i = Gt(e);
if (null == i) {
!(function(t, e) {
e.nodeRoot = t;
if (e !== t) {
e.nodeNext = t.nodeNext;
t.nodeNext = e;
}
})(t, e);
for (var n = e.arbiterList; n; n = n.next(e)) Ht(t, e == n.body_a ? n.body_b : n.body_a);
for (var o = e.constraintList; o; o = o.next(e)) Ht(t, e == o.a ? o.b : o.a);
} else a(i === t, "Internal Error: Inconsistency detected in the contact graph.");
}
}, Ut = function(t, e) {
for (var i = t; i; i = i.nodeNext) if (i.nodeIdleTime < e) return !0;
return !1;
};
Wt.prototype.processComponents = function(t) {
for (var e = Infinity !== this.sleepTimeThreshold, i = this.bodies, n = 0; n < i.length; n++) {
var o = i[n];
a(null === o.nodeNext, "Internal Error: Dangling next pointer detected in contact graph.");
a(null === o.nodeRoot, "Internal Error: Dangling root pointer detected in contact graph.");
}
if (e) {
var r = this.idleSpeedThreshold, s = r ? r * r : M(this.gravity) * t * t;
for (n = 0; n < i.length; n++) {
o = i[n];
var c = s ? o.m * s : 0;
o.nodeIdleTime = o.kineticEnergy() > c ? 0 : o.nodeIdleTime + t;
}
}
for (var h = this.arbiters, l = (n = 0, h.length); n < l; n++) {
var u = h[n], d = u.body_a, f = u.body_b;
if (e) {
(f.isRogue() && !f.isStatic() || d.isSleeping()) && d.activate();
(d.isRogue() && !d.isStatic() || f.isSleeping()) && f.activate();
}
d.pushArbiter(u);
f.pushArbiter(u);
}
if (e) {
var p = this.constraints;
for (n = 0; n < p.length; n++) {
var _ = p[n];
d = _.a;
(f = _.b).isRogue() && !f.isStatic() && d.activate();
d.isRogue() && !d.isStatic() && f.activate();
}
for (n = 0; n < i.length; ) {
o = i[n];
if (null === Gt(o)) {
Ht(o, o);
if (!Ut(o, this.sleepTimeThreshold)) {
this.sleepingComponents.push(o);
for (var g = o; g; g = g.nodeNext) this.deactivateBody(g);
continue;
}
}
n++;
o.nodeRoot = null;
o.nodeNext = null;
}
}
};
rt.prototype.sleep = function() {
this.sleepWithGroup(null);
};
rt.prototype.sleepWithGroup = function(t) {
c(!this.isStatic() && !this.isRogue(), "Rogue and static bodies cannot be put to sleep.");
var e = this.space;
c(e, "Cannot put a rogue body to sleep.");
c(!e.locked, "Bodies cannot be put to sleep during a query or a call to cpSpaceStep(). Put these calls into a post-step callback.");
c(null === t || t.isSleeping(), "Cannot use a non-sleeping body as a group identifier.");
if (this.isSleeping()) c(Gt(this) === Gt(t), "The body is already sleeping and it's group cannot be reassigned."); else {
for (var i = 0; i < this.shapeList.length; i++) this.shapeList[i].update(this.p, this.rot);
e.deactivateBody(this);
if (t) {
var n = Gt(t);
this.nodeRoot = n;
this.nodeNext = n.nodeNext;
this.nodeIdleTime = 0;
n.nodeNext = this;
} else {
this.nodeRoot = this;
this.nodeNext = null;
this.nodeIdleTime = 0;
e.sleepingComponents.push(this);
}
d(e.bodies, this);
}
};
Wt.prototype.activateShapesTouchingShape = function(t) {
Infinity !== this.sleepTimeThreshold && this.shapeQuery(t, (function(t, e) {
t.body.activate();
}));
};
Wt.prototype.pointQuery = function(t, e, i, n) {
var o = function(o) {
(!o.group || i !== o.group) && e & o.layers && o.pointQuery(t) && n(o);
}, r = new U(t.x, t.y, t.x, t.y);
this.lock();
this.activeShapes.query(r, o);
this.staticShapes.query(r, o);
this.unlock(!0);
};
Wt.prototype.pointQueryFirst = function(t, e, i) {
var n = null;
this.pointQuery(t, e, i, (function(t) {
t.sensor || (n = t);
}));
return n;
};
Wt.prototype.nearestPointQuery = function(t, e, i, n, o) {
var r = function(r) {
if ((!r.group || n !== r.group) && i & r.layers) {
var s = r.nearestPointQuery(t);
s.d < e && o(r, s.d, s.p);
}
}, s = Y(t, e);
this.lock();
this.activeShapes.query(s, r);
this.staticShapes.query(s, r);
this.unlock(!0);
};
Wt.prototype.nearestPointQueryNearest = function(t, e, i, n) {
var o, r = function(r) {
if ((!r.group || n !== r.group) && i & r.layers && !r.sensor) {
var s = r.nearestPointQuery(t);
s.d < e && (!o || s.d < o.d) && (o = s);
}
}, s = Y(t, e);
this.activeShapes.query(s, r);
this.staticShapes.query(s, r);
return o;
};
Wt.prototype.segmentQuery = function(t, e, i, n, o) {
var r = function(r) {
var s;
(!r.group || n !== r.group) && i & r.layers && (s = r.segmentQuery(t, e)) && o(r, s.t, s.n);
return 1;
};
this.lock();
this.staticShapes.segmentQuery(t, e, 1, r);
this.activeShapes.segmentQuery(t, e, 1, r);
this.unlock(!0);
};
Wt.prototype.segmentQueryFirst = function(t, e, i, n) {
var o = null, r = function(r) {
var s;
(!r.group || n !== r.group) && i & r.layers && !r.sensor && (s = r.segmentQuery(t, e)) && (null === o || s.t < o.t) && (o = s);
return o ? o.t : 1;
};
this.staticShapes.segmentQuery(t, e, 1, r);
this.activeShapes.segmentQuery(t, e, o ? o.t : 1, r);
return o;
};
Wt.prototype.bbQuery = function(t, e, i, n) {
var o = function(o) {
(!o.group || i !== o.group) && e & o.layers && (function(t, e, i, n, o) {
return t.l <= n && e <= t.r && t.b <= o && i <= t.t;
})(t, o.bb_l, o.bb_b, o.bb_r, o.bb_t) && n(o);
};
this.lock();
this.activeShapes.query(t, o);
this.staticShapes.query(t, o);
this.unlock(!0);
};
Wt.prototype.shapeQuery = function(t, e) {
var i = t.body;
i && t.update(i.p, i.rot);
var n = new U(t.bb_l, t.bb_b, t.bb_r, t.bb_t), o = !1, r = function(i) {
var n = t;
if ((!n.group || n.group !== i.group) && n.layers & i.layers && n !== i) {
var r;
if (n.collisionCode <= i.collisionCode) r = zt(n, i); else {
r = zt(i, n);
for (var s = 0; s < r.length; s++) r[s].n = I(r[s].n);
}
if (r.length) {
o = !(n.sensor || i.sensor);
if (e) {
var c = new Array(r.length);
for (s = 0; s < r.length; s++) c[s] = new Ot(r[s].p, r[s].n, r[s].dist);
e(i, c);
}
}
}
};
this.lock();
this.activeShapes.query(n, r);
this.staticShapes.query(n, r);
this.unlock(!0);
return o;
};
Wt.prototype.addPostStepCallback = function(t) {
a(this.locked, "Adding a post-step callback when the space is not locked is unnecessary. Post-step callbacks will not called until the end of the next call to cpSpaceStep() or the next query.");
this.postStepCallbacks.push(t);
};
Wt.prototype.runPostStepCallbacks = function() {
for (var t = 0; t < this.postStepCallbacks.length; t++) this.postStepCallbacks[t]();
this.postStepCallbacks = [];
};
Wt.prototype.lock = function() {
this.locked++;
};
Wt.prototype.unlock = function(t) {
this.locked--;
c(this.locked >= 0, "Internal Error: Space lock underflow.");
if (0 === this.locked && t) {
for (var e = this.rousedBodies, i = 0; i < e.length; i++) this.activateBody(e[i]);
e.length = 0;
this.runPostStepCallbacks();
}
};
Wt.prototype.makeCollideShapes = function() {
var t = this;
return function(e, i) {
var n = t;
if (e.bb_l <= i.bb_r && i.bb_l <= e.bb_r && e.bb_b <= i.bb_t && i.bb_b <= e.bb_t && e.body !== i.body && (!e.group || e.group !== i.group) && e.layers & i.layers) {
var o = n.lookupHandler(e.collision_type, i.collision_type), r = e.sensor || i.sensor;
if (!r || o !== kt) {
if (e.collisionCode > i.collisionCode) {
var s = e;
e = i;
i = s;
}
var c = zt(e, i);
if (0 !== c.length) {
var a = u(e.hashid, i.hashid), h = n.cachedArbiters[a];
h || (h = n.cachedArbiters[a] = new It(e, i));
h.update(c, o, e, i);
"first coll" != h.state || o.begin(h, n) || h.ignore();
if ("ignore" !== h.state && o.preSolve(h, n) && !r) n.arbiters.push(h); else {
h.contacts = null;
"ignore" !== h.state && (h.state = "normal");
}
h.stamp = n.stamp;
}
}
}
};
};
Wt.prototype.arbiterSetFilter = function(t) {
var e = this.stamp - t.stamp, i = t.body_a, n = t.body_b;
if ((i.isStatic() || i.isSleeping()) && (n.isStatic() || n.isSleeping())) return !0;
if (e >= 1 && "cached" != t.state) {
t.callSeparate(this);
t.state = "cached";
}
if (e >= this.collisionPersistence) {
t.contacts = null;
return !1;
}
return !0;
};
var Yt = function(t) {
var e = t.body;
t.update(e.p, e.rot);
};
Wt.prototype.step = function(t) {
if (0 !== t) {
c(0 === C.x && 0 === C.y, "vzero is invalid");
this.stamp++;
var e = this.curr_dt;
this.curr_dt = t;
var i, n, o, r = this.bodies, s = this.constraints, a = this.arbiters;
for (i = 0; i < a.length; i++) {
var h = a[i];
h.state = "normal";
h.body_a.isSleeping() || h.body_b.isSleeping() || h.unthread();
}
a.length = 0;
this.lock();
for (i = 0; i < r.length; i++) r[i].position_func(t);
this.activeShapes.each(Yt);
this.activeShapes.reindexQuery(this.collideShapes);
this.unlock(!1);
this.processComponents(t);
this.lock();
for (o in this.cachedArbiters) this.arbiterSetFilter(this.cachedArbiters[o]) || delete this.cachedArbiters[o];
var l = this.collisionSlop, u = 1 - Math.pow(this.collisionBias, t);
for (i = 0; i < a.length; i++) a[i].preStep(t, l, u);
for (i = 0; i < s.length; i++) {
var d = s[i];
d.preSolve(this);
d.preStep(t);
}
var f = Math.pow(this.damping, t), p = this.gravity;
for (i = 0; i < r.length; i++) r[i].velocity_func(p, f, t);
var _ = 0 === e ? 0 : t / e;
for (i = 0; i < a.length; i++) a[i].applyCachedImpulse(_);
for (i = 0; i < s.length; i++) s[i].applyCachedImpulse(_);
for (i = 0; i < this.iterations; i++) {
for (n = 0; n < a.length; n++) a[n].applyImpulse();
for (n = 0; n < s.length; n++) s[n].applyImpulse();
}
for (i = 0; i < s.length; i++) s[i].postSolve(this);
for (i = 0; i < a.length; i++) a[i].handler.postSolve(a[i], this);
this.unlock(!0);
}
};
var Xt = function(t, e, i, n) {
var o = t.vx + -i.y * t.w, r = t.vy + i.x * t.w, s = e.vx + -n.y * e.w, c = e.vy + n.x * e.w;
return new b(s - o, c - r);
}, Jt = function(t, e, i, n, o) {
var r = t.vx + -i.y * t.w, s = t.vy + i.x * t.w, c = e.vx + -n.y * e.w, a = e.vy + n.x * e.w;
return S(c - r, a - s, o.x, o.y);
}, qt = function(t, e, i, n) {
t.vx += e * t.m_inv;
t.vy += i * t.m_inv;
t.w += t.i_inv * (n.x * i - n.y * e);
}, Qt = function(t, e, i, n, o, r) {
qt(t, -o, -r, i);
qt(e, o, r, n);
}, Zt = function(t, e, i, n) {
t.v_biasx += e * t.m_inv;
t.v_biasy += i * t.m_inv;
t.w_bias += t.i_inv * L(n.x, n.y, e, i);
}, Kt = function(t, e, i) {
var n = N(e, i);
return t.m_inv + t.i_inv * n * n;
}, $t = function(t, e, i, n, o) {
var r = Kt(t, i, o) + Kt(e, n, o);
a(0 !== r, "Unsolvable collision or constraint.");
return r;
}, te = function(t, e, i, n, o, r) {
var s, c, h, l, u = t.m_inv + e.m_inv;
s = u;
c = 0;
h = 0;
l = u;
var d = t.i_inv, f = i.x * i.x * d, p = i.y * i.y * d, _ = -i.x * i.y * d;
s += p;
c += _;
h += _;
l += f;
var g = e.i_inv, v = n.x * n.x * g, y = n.y * n.y * g, m = -n.x * n.y * g, b = (s += y) * (l += v) - (c += m) * (h += m);
a(0 !== b, "Unsolvable constraint.");
var C = 1 / b;
o.x = l * C;
o.y = -c * C;
r.x = -h * C;
r.y = s * C;
}, ee = function(t, e, i) {
return new b(T(t, e), T(t, i));
}, ie = function(t, e) {
return 1 - Math.pow(t, e);
}, ne = cp.Constraint = function(t, e) {
this.a = t;
this.b = e;
this.space = null;
this.next_a = null;
this.next_b = null;
this.maxForce = Infinity;
this.errorBias = Math.pow(.9, 60);
this.maxBias = Infinity;
};
ne.prototype.activateBodies = function() {
this.a && this.a.activate();
this.b && this.b.activate();
};
ne.prototype.preStep = function(t) {};
ne.prototype.applyCachedImpulse = function(t) {};
ne.prototype.applyImpulse = function() {};
ne.prototype.getImpulse = function() {
return 0;
};
ne.prototype.preSolve = function(t) {};
ne.prototype.postSolve = function(t) {};
ne.prototype.next = function(t) {
return this.a === t ? this.next_a : this.next_b;
};
var oe = cp.PinJoint = function(t, e, i, n) {
ne.call(this, t, e);
this.anchr1 = i;
this.anchr2 = n;
var o = t ? x(t.p, B(i, t.rot)) : i, r = e ? x(e.p, B(n, e.rot)) : n;
this.dist = E(w(r, o));
a(this.dist > 0, "You created a 0 length pin joint. A pivot joint will be much more stable.");
this.r1 = this.r2 = null;
this.n = null;
this.nMass = 0;
this.jnAcc = this.jnMax = 0;
this.bias = 0;
};
oe.prototype = Object.create(ne.prototype);
oe.prototype.preStep = function(t) {
var e = this.a, i = this.b;
this.r1 = B(this.anchr1, e.rot);
this.r2 = B(this.anchr2, i.rot);
var n = w(x(i.p, this.r2), x(e.p, this.r1)), o = E(n);
this.n = O(n, 1 / (o || Infinity));
this.nMass = 1 / $t(e, i, this.r1, this.r2, this.n);
var r = this.maxBias;
this.bias = y(-ie(this.errorBias, t) * (o - this.dist) / t, -r, r);
this.jnMax = this.maxForce * t;
};
oe.prototype.applyCachedImpulse = function(t) {
var e = O(this.n, this.jnAcc * t);
Qt(this.a, this.b, this.r1, this.r2, e.x, e.y);
};
oe.prototype.applyImpulse = function() {
var t = this.a, e = this.b, i = this.n, n = Jt(t, e, this.r1, this.r2, i), o = (this.bias - n) * this.nMass, r = this.jnAcc;
this.jnAcc = y(r + o, -this.jnMax, this.jnMax);
o = this.jnAcc - r;
Qt(t, e, this.r1, this.r2, i.x * o, i.y * o);
};
oe.prototype.getImpulse = function() {
return Math.abs(this.jnAcc);
};
var re = cp.SlideJoint = function(t, e, i, n, o, r) {
ne.call(this, t, e);
this.anchr1 = i;
this.anchr2 = n;
this.min = o;
this.max = r;
this.r1 = this.r2 = this.n = null;
this.nMass = 0;
this.jnAcc = this.jnMax = 0;
this.bias = 0;
};
re.prototype = Object.create(ne.prototype);
re.prototype.preStep = function(t) {
var e = this.a, i = this.b;
this.r1 = B(this.anchr1, e.rot);
this.r2 = B(this.anchr2, i.rot);
var n = w(x(i.p, this.r2), x(e.p, this.r1)), o = E(n), r = 0;
if (o > this.max) {
r = o - this.max;
this.n = k(n);
} else if (o < this.min) {
r = this.min - o;
this.n = I(k(n));
} else {
this.n = C;
this.jnAcc = 0;
}
this.nMass = 1 / $t(e, i, this.r1, this.r2, this.n);
var s = this.maxBias;
this.bias = y(-ie(this.errorBias, t) * r / t, -s, s);
this.jnMax = this.maxForce * t;
};
re.prototype.applyCachedImpulse = function(t) {
var e = this.jnAcc * t;
Qt(this.a, this.b, this.r1, this.r2, this.n.x * e, this.n.y * e);
};
re.prototype.applyImpulse = function() {
if (0 !== this.n.x || 0 !== this.n.y) {
var t = this.a, e = this.b, i = this.n, n = this.r1, o = this.r2, r = Xt(t, e, n, o), s = T(r, i), c = (this.bias - s) * this.nMass, a = this.jnAcc;
this.jnAcc = y(a + c, -this.jnMax, 0);
c = this.jnAcc - a;
Qt(t, e, this.r1, this.r2, i.x * c, i.y * c);
}
};
re.prototype.getImpulse = function() {
return Math.abs(this.jnAcc);
};
var se = cp.PivotJoint = function(i, n, o, r) {
ne.call(this, i, n);
if ("undefined" === ("object" == (e = typeof r) ? t(r) : e)) {
var s = o;
o = i ? i.world2Local(s) : s;
r = n ? n.world2Local(s) : s;
}
this.anchr1 = o;
this.anchr2 = r;
this.r1 = this.r2 = C;
this.k1 = new b(0, 0);
this.k2 = new b(0, 0);
this.jAcc = C;
this.jMaxLen = 0;
this.bias = C;
};
se.prototype = Object.create(ne.prototype);
se.prototype.preStep = function(t) {
var e = this.a, i = this.b;
this.r1 = B(this.anchr1, e.rot);
this.r2 = B(this.anchr2, i.rot);
te(e, i, this.r1, this.r2, this.k1, this.k2);
this.jMaxLen = this.maxForce * t;
var n = w(x(i.p, this.r2), x(e.p, this.r1));
this.bias = W(O(n, -ie(this.errorBias, t) / t), this.maxBias);
};
se.prototype.applyCachedImpulse = function(t) {
Qt(this.a, this.b, this.r1, this.r2, this.jAcc.x * t, this.jAcc.y * t);
};
se.prototype.applyImpulse = function() {
var t = this.a, e = this.b, i = this.r1, n = this.r2, o = Xt(t, e, i, n), r = ee(w(this.bias, o), this.k1, this.k2), s = this.jAcc;
this.jAcc = W(x(this.jAcc, r), this.jMaxLen);
Qt(t, e, this.r1, this.r2, this.jAcc.x - s.x, this.jAcc.y - s.y);
};
se.prototype.getImpulse = function() {
return E(this.jAcc);
};
var ce = cp.GrooveJoint = function(t, e, i, n, o) {
ne.call(this, t, e);
this.grv_a = i;
this.grv_b = n;
this.grv_n = P(z(w(n, i)));
this.anchr2 = o;
this.grv_tn = null;
this.clamp = 0;
this.r1 = this.r2 = null;
this.k1 = new b(0, 0);
this.k2 = new b(0, 0);
this.jAcc = C;
this.jMaxLen = 0;
this.bias = null;
};
ce.prototype = Object.create(ne.prototype);
ce.prototype.preStep = function(t) {
var e = this.a, i = this.b, n = e.local2World(this.grv_a), o = e.local2World(this.grv_b), r = B(this.grv_n, e.rot), s = T(n, r);
this.grv_tn = r;
this.r2 = B(this.anchr2, i.rot);
var c = N(x(i.p, this.r2), r);
if (c <= N(n, r)) {
this.clamp = 1;
this.r1 = w(n, e.p);
} else if (c >= N(o, r)) {
this.clamp = -1;
this.r1 = w(o, e.p);
} else {
this.clamp = 0;
this.r1 = w(x(O(P(r), -c), O(r, s)), e.p);
}
te(e, i, this.r1, this.r2, this.k1, this.k2);
this.jMaxLen = this.maxForce * t;
var a = w(x(i.p, this.r2), x(e.p, this.r1));
this.bias = W(O(a, -ie(this.errorBias, t) / t), this.maxBias);
};
ce.prototype.applyCachedImpulse = function(t) {
Qt(this.a, this.b, this.r1, this.r2, this.jAcc.x * t, this.jAcc.y * t);
};
ce.prototype.grooveConstrain = function(t) {
var e = this.grv_tn, i = this.clamp * N(t, e) > 0 ? t : R(t, e);
return W(i, this.jMaxLen);
};
ce.prototype.applyImpulse = function() {
var t = this.a, e = this.b, i = this.r1, n = this.r2, o = Xt(t, e, i, n), r = ee(w(this.bias, o), this.k1, this.k2), s = this.jAcc;
this.jAcc = this.grooveConstrain(x(s, r));
Qt(t, e, this.r1, this.r2, this.jAcc.x - s.x, this.jAcc.y - s.y);
};
ce.prototype.getImpulse = function() {
return E(this.jAcc);
};
ce.prototype.setGrooveA = function(t) {
this.grv_a = t;
this.grv_n = P(z(w(this.grv_b, t)));
this.activateBodies();
};
ce.prototype.setGrooveB = function(t) {
this.grv_b = t;
this.grv_n = P(z(w(t, this.grv_a)));
this.activateBodies();
};
var ae = function(t, e) {
return (t.restLength - e) * t.stiffness;
}, he = cp.DampedSpring = function(t, e, i, n, o, r, s) {
ne.call(this, t, e);
this.anchr1 = i;
this.anchr2 = n;
this.restLength = o;
this.stiffness = r;
this.damping = s;
this.springForceFunc = ae;
this.target_vrn = this.v_coef = 0;
this.r1 = this.r2 = null;
this.nMass = 0;
this.n = null;
};
he.prototype = Object.create(ne.prototype);
he.prototype.preStep = function(t) {
var e = this.a, i = this.b;
this.r1 = B(this.anchr1, e.rot);
this.r2 = B(this.anchr2, i.rot);
var n = w(x(i.p, this.r2), x(e.p, this.r1)), o = E(n);
this.n = O(n, 1 / (o || Infinity));
var r = $t(e, i, this.r1, this.r2, this.n);
a(0 !== r, "Unsolvable this.");
this.nMass = 1 / r;
this.target_vrn = 0;
this.v_coef = 1 - Math.exp(-this.damping * t * r);
var s = this.springForceFunc(this, o);
Qt(e, i, this.r1, this.r2, this.n.x * s * t, this.n.y * s * t);
};
he.prototype.applyCachedImpulse = function(t) {};
he.prototype.applyImpulse = function() {
var t = this.a, e = this.b, i = this.n, n = this.r1, o = this.r2, r = Jt(t, e, n, o, i), s = (this.target_vrn - r) * this.v_coef;
this.target_vrn = r + s;
s *= this.nMass;
Qt(t, e, this.r1, this.r2, this.n.x * s, this.n.y * s);
};
he.prototype.getImpulse = function() {
return 0;
};
var le = function(t, e) {
return (e - t.restAngle) * t.stiffness;
}, ue = cp.DampedRotarySpring = function(t, e, i, n, o) {
ne.call(this, t, e);
this.restAngle = i;
this.stiffness = n;
this.damping = o;
this.springTorqueFunc = le;
this.target_wrn = 0;
this.w_coef = 0;
this.iSum = 0;
};
ue.prototype = Object.create(ne.prototype);
ue.prototype.preStep = function(t) {
var e = this.a, i = this.b, n = e.i_inv + i.i_inv;
a(0 !== n, "Unsolvable spring.");
this.iSum = 1 / n;
this.w_coef = 1 - Math.exp(-this.damping * t * n);
this.target_wrn = 0;
var o = this.springTorqueFunc(this, e.a - i.a) * t;
e.w -= o * e.i_inv;
i.w += o * i.i_inv;
};
ue.prototype.applyImpulse = function() {
var t = this.a, e = this.b, i = t.w - e.w, n = (this.target_wrn - i) * this.w_coef;
this.target_wrn = i + n;
var o = n * this.iSum;
t.w += o * t.i_inv;
e.w -= o * e.i_inv;
};
var de = cp.RotaryLimitJoint = function(t, e, i, n) {
ne.call(this, t, e);
this.min = i;
this.max = n;
this.jAcc = 0;
this.iSum = this.bias = this.jMax = 0;
};
de.prototype = Object.create(ne.prototype);
de.prototype.preStep = function(t) {
var e = this.a, i = this.b, n = i.a - e.a, o = 0;
n > this.max ? o = this.max - n : n < this.min && (o = this.min - n);
this.iSum = 1 / (1 / e.i + 1 / i.i);
var r = this.maxBias;
this.bias = y(-ie(this.errorBias, t) * o / t, -r, r);
this.jMax = this.maxForce * t;
this.bias || (this.jAcc = 0);
};
de.prototype.applyCachedImpulse = function(t) {
var e = this.a, i = this.b, n = this.jAcc * t;
e.w -= n * e.i_inv;
i.w += n * i.i_inv;
};
de.prototype.applyImpulse = function() {
if (this.bias) {
var t = this.a, e = this.b, i = e.w - t.w, n = -(this.bias + i) * this.iSum, o = this.jAcc;
this.bias < 0 ? this.jAcc = y(o + n, 0, this.jMax) : this.jAcc = y(o + n, -this.jMax, 0);
n = this.jAcc - o;
t.w -= n * t.i_inv;
e.w += n * e.i_inv;
}
};
de.prototype.getImpulse = function() {
return Math.abs(joint.jAcc);
};
var fe = cp.RatchetJoint = function(t, e, i, n) {
ne.call(this, t, e);
this.angle = 0;
this.phase = i;
this.ratchet = n;
this.angle = (e ? e.a : 0) - (t ? t.a : 0);
this.iSum = this.bias = this.jAcc = this.jMax = 0;
};
fe.prototype = Object.create(ne.prototype);
fe.prototype.preStep = function(t) {
var e = this.a, i = this.b, n = this.angle, o = this.phase, r = this.ratchet, s = i.a - e.a, c = n - s, a = 0;
c * r > 0 ? a = c : this.angle = Math.floor((s - o) / r) * r + o;
this.iSum = 1 / (e.i_inv + i.i_inv);
var h = this.maxBias;
this.bias = y(-ie(this.errorBias, t) * a / t, -h, h);
this.jMax = this.maxForce * t;
this.bias || (this.jAcc = 0);
};
fe.prototype.applyCachedImpulse = function(t) {
var e = this.a, i = this.b, n = this.jAcc * t;
e.w -= n * e.i_inv;
i.w += n * i.i_inv;
};
fe.prototype.applyImpulse = function() {
if (this.bias) {
var t = this.a, e = this.b, i = e.w - t.w, n = this.ratchet, o = -(this.bias + i) * this.iSum, r = this.jAcc;
this.jAcc = y((r + o) * n, 0, this.jMax * Math.abs(n)) / n;
o = this.jAcc - r;
t.w -= o * t.i_inv;
e.w += o * e.i_inv;
}
};
fe.prototype.getImpulse = function(t) {
return Math.abs(t.jAcc);
};
var pe = cp.GearJoint = function(t, e, i, n) {
ne.call(this, t, e);
this.phase = i;
this.ratio = n;
this.ratio_inv = 1 / n;
this.jAcc = 0;
this.iSum = this.bias = this.jMax = 0;
};
pe.prototype = Object.create(ne.prototype);
pe.prototype.preStep = function(t) {
var e = this.a, i = this.b;
this.iSum = 1 / (e.i_inv * this.ratio_inv + this.ratio * i.i_inv);
var n = this.maxBias;
this.bias = y(-ie(this.errorBias, t) * (i.a * this.ratio - e.a - this.phase) / t, -n, n);
this.jMax = this.maxForce * t;
};
pe.prototype.applyCachedImpulse = function(t) {
var e = this.a, i = this.b, n = this.jAcc * t;
e.w -= n * e.i_inv * this.ratio_inv;
i.w += n * i.i_inv;
};
pe.prototype.applyImpulse = function() {
var t = this.a, e = this.b, i = e.w * this.ratio - t.w, n = (this.bias - i) * this.iSum, o = this.jAcc;
this.jAcc = y(o + n, -this.jMax, this.jMax);
n = this.jAcc - o;
t.w -= n * t.i_inv * this.ratio_inv;
e.w += n * e.i_inv;
};
pe.prototype.getImpulse = function() {
return Math.abs(this.jAcc);
};
pe.prototype.setRatio = function(t) {
this.ratio = t;
this.ratio_inv = 1 / t;
this.activateBodies();
};
var _e = cp.SimpleMotor = function(t, e, i) {
ne.call(this, t, e);
this.rate = i;
this.jAcc = 0;
this.iSum = this.jMax = 0;
};
_e.prototype = Object.create(ne.prototype);
_e.prototype.preStep = function(t) {
this.iSum = 1 / (this.a.i_inv + this.b.i_inv);
this.jMax = this.maxForce * t;
};
_e.prototype.applyCachedImpulse = function(t) {
var e = this.a, i = this.b, n = this.jAcc * t;
e.w -= n * e.i_inv;
i.w += n * i.i_inv;
};
_e.prototype.applyImpulse = function() {
var t = this.a, e = this.b, i = -(e.w - t.w + this.rate) * this.iSum, n = this.jAcc;
this.jAcc = y(n + i, -this.jMax, this.jMax);
i = this.jAcc - n;
t.w -= i * t.i_inv;
e.w += i * e.i_inv;
};
_e.prototype.getImpulse = function() {
return Math.abs(this.jAcc);
};
}), {} ],
193: [ (function(i, n, o) {
"use strict";
function r(i, n) {
"undefined" === ("object" == (e = typeof window[i]) ? t(window[i]) : e) && (window[i] = n);
}
function s(i) {
return "object" === ("object" == (e = typeof window[i]) ? t(window[i]) : e);
}
r("CC_TEST", s("tap") || s("QUnit"));
r("CC_EDITOR", s("Editor") && s("process") && "electron" in process.versions);
r("CC_PREVIEW", !0);
r("CC_DEV", !0);
r("CC_DEBUG", !0);
r("CC_JSB", s("jsb"));
r("CC_BUILD", !1);
r("CC_WECHATGAME", !1);
r("CC_SUPPORT_JIT", !0);
cc.ClassManager || (cc.ClassManager = window.ClassManager);
0;
i("../polyfill/misc");
i("../polyfill/string");
i("../polyfill/typescript");
i("../cocos2d/core/platform/js");
i("../cocos2d/core/value-types");
i("../cocos2d/core/utils/find");
i("../cocos2d/core/utils/mutable-forward-iterator");
i("../cocos2d/core/event");
i("../cocos2d/core/event-manager/CCEvent");
i("../cocos2d/core/event-manager/CCSystemEvent");
i("../CCDebugger");
0;
var c = i("../cocos2d/core/platform/CCMacro");
void 0 !== window.__ENABLE_GC_FOR_NATIVE_OBJECTS__ && (c.ENABLE_GC_FOR_NATIVE_OBJECTS = window.__ENABLE_GC_FOR_NATIVE_OBJECTS__);
i("./jsb-game");
i("./jsb-loader");
i("./jsb-director");
i("./jsb-tex-sprite-frame");
i("./jsb-scale9sprite");
i("./jsb-label");
i("./jsb-editbox");
i("./jsb-videoplayer");
i("./jsb-webview");
i("./jsb-particle");
i("./jsb-spine");
i("./jsb-enums");
i("./jsb-event");
i("./jsb-action");
i("./jsb-etc");
i("./jsb-audio");
i("./jsb-tiledmap");
i("./jsb-box2d");
i("./jsb-dragonbones");
i("../extends");
}), {
"../CCDebugger": 2,
"../DebugInfos": 3,
"../cocos2d/core/event": 87,
"../cocos2d/core/event-manager/CCEvent": 82,
"../cocos2d/core/event-manager/CCSystemEvent": 83,
"../cocos2d/core/platform/CCMacro": 136,
"../cocos2d/core/platform/js": 149,
"../cocos2d/core/utils/find": 158,
"../cocos2d/core/utils/mutable-forward-iterator": 160,
"../cocos2d/core/value-types": 172,
"../extends": 181,
"../polyfill/misc": 213,
"../polyfill/string": 214,
"../polyfill/typescript": 215,
"./jsb-action": 194,
"./jsb-audio": 195,
"./jsb-box2d": 196,
"./jsb-director": 197,
"./jsb-dragonbones": 198,
"./jsb-editbox": 199,
"./jsb-enums": 200,
"./jsb-etc": 201,
"./jsb-event": 202,
"./jsb-game": 203,
"./jsb-label": 204,
"./jsb-loader": 205,
"./jsb-particle": 206,
"./jsb-scale9sprite": 207,
"./jsb-spine": 208,
"./jsb-tex-sprite-frame": 209,
"./jsb-tiledmap": 210,
"./jsb-videoplayer": 211,
"./jsb-webview": 212
} ],
194: [ (function(t, e, i) {
function n(t, e, i) {
if (t) for (var n = t._owner.getComponentsInChildren(cc._SGComponent), o = 0; o < n.length; ++o) {
var r = n[o];
r.enabled = e ? !r.enabled : i;
}
}
function o(t) {
t instanceof cc.Component ? t = t.node._sgNode : t instanceof cc.Node ? t = t._sgNode : t instanceof _ccsg.Node || (t = null);
return t;
}
function r(t, e) {
var i = cc.ActionManager.prototype, n = i[t];
i[t] = function() {
for (var t = [], i = 0; i < arguments.length; i++) t[i] = i === e ? o(arguments[i]) : arguments[i];
return t[e] ? n.apply(this, t) : void 0;
};
}
function s(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.x = e.getPositionX();
e._owner.y = e.getPositionY();
}
}
function c(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.rotationX = e.getRotationX();
e._owner.rotationY = e.getRotationY();
}
}
function a(t) {
var e = this._getSgTarget();
e._owner && (e._owner.opacity = e.getOpacity());
}
function h(t) {
var e = this._getSgTarget();
if (e._owner) {
var i = e.getColor();
e._owner.color = i;
}
}
cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS;
cc.Action.prototype._getSgTarget = cc.Action.prototype.getTarget;
cc.Action.prototype.getTarget = function() {
var t = this._getSgTarget();
return t._owner || t;
};
cc.targetedAction = function(t, e) {
return new cc.TargetedAction(t, e);
};
cc.TargetedAction.prototype._ctor = function(t, e) {
var i = t._sgNode || t;
i._owner = t;
e && this.initWithTarget(i, e);
};
cc.follow = function(t, e) {
return new cc.Follow(t, e);
};
cc.Follow = cc.BaseJSAction.extend({
_followedNode: null,
_boundarySet: !1,
_boundaryFullyCovered: !1,
_halfScreenSize: null,
_fullScreenSize: null,
_worldRect: null,
leftBoundary: 0,
rightBoundary: 0,
topBoundary: 0,
bottomBoundary: 0,
ctor: function(t, e) {
cc.BaseJSAction.prototype.ctor.call(this);
this._followedNode = null;
this._boundarySet = !1;
this._boundaryFullyCovered = !1;
this._halfScreenSize = null;
this._fullScreenSize = null;
this.leftBoundary = 0;
this.rightBoundary = 0;
this.topBoundary = 0;
this.bottomBoundary = 0;
this._worldRect = cc.rect(0, 0, 0, 0);
t && (e ? this.initWithTarget(t, e) : this.initWithTarget(t));
},
clone: function() {
var t = new cc.Follow(), e = this._worldRect, i = new cc.Rect(e.x, e.y, e.width, e.height);
t.initWithTarget(this._followedNode, i);
return t;
},
isBoundarySet: function() {
return this._boundarySet;
},
setBoudarySet: function(t) {
this._boundarySet = t;
},
initWithTarget: function(t, e) {
if (!t) throw new Error("cc.Follow.initWithAction(): followedNode must be non nil");
e = e || cc.rect(0, 0, 0, 0);
this._followedNode = t;
this._worldRect = e;
this._boundarySet = !cc._rectEqualToZero(e);
this._boundaryFullyCovered = !1;
var i = cc.director.getWinSize();
this._fullScreenSize = cc.p(i.width, i.height);
this._halfScreenSize = cc.pMult(this._fullScreenSize, .5);
if (this._boundarySet) {
this.leftBoundary = -(e.x + e.width - this._fullScreenSize.x);
this.rightBoundary = -e.x;
this.topBoundary = -e.y;
this.bottomBoundary = -(e.y + e.height - this._fullScreenSize.y);
this.rightBoundary < this.leftBoundary && (this.rightBoundary = this.leftBoundary = (this.leftBoundary + this.rightBoundary) / 2);
this.topBoundary < this.bottomBoundary && (this.topBoundary = this.bottomBoundary = (this.topBoundary + this.bottomBoundary) / 2);
this.topBoundary === this.bottomBoundary && this.leftBoundary === this.rightBoundary && (this._boundaryFullyCovered = !0);
}
return !0;
},
step: function(t) {
var e = this.getTarget(), i = e.convertToWorldSpaceAR(cc.Vec2.ZERO), n = this._followedNode.convertToWorldSpaceAR(cc.Vec2.ZERO), o = cc.pSub(i, n), r = e.parent.convertToNodeSpaceAR(cc.pAdd(o, this._halfScreenSize));
if (this._boundarySet) {
if (this._boundaryFullyCovered) return;
e.setPosition(cc.clampf(r.x, this.leftBoundary, this.rightBoundary), cc.clampf(r.y, this.bottomBoundary, this.topBoundary));
} else e.setPosition(r.x, r.y);
},
isDone: function() {
return !this._followedNode.isRunning();
},
stop: function() {
this.setTarget(null);
cc.Action.prototype.stop.call(this);
}
});
var l = cc.FlipX;
cc.FlipX = l.extend({
_flippedX: !1,
ctor: function(t) {
l.prototype.ctor.call(this);
this.initWithFlipX(t);
},
initWithFlipX: function(t) {
this._flippedX = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleX = Math.abs(e.scaleX) * (this._flippedX ? -1 : 1);
},
reverse: function() {
return new cc.FlipX(!this._flippedX);
},
clone: function() {
return new cc.FlipX(this._flippedX);
}
});
cc.flipX = function(t) {
return new cc.FlipX(t);
};
var u = cc.FlipY;
cc.FlipY = u.extend({
_flippedY: !1,
ctor: function(t) {
u.prototype.ctor.call(this);
this.initWithFlipY(t);
},
initWithFlipY: function(t) {
this._flippedY = !!t;
return !0;
},
update: function(t) {
var e = this._getSgTarget();
e.scaleY = Math.abs(e.scaleY) * (this._flippedY ? -1 : 1);
},
reverse: function() {
return new cc.FlipY(!this._flippedY);
},
clone: function() {
return new cc.FlipY(this._flippedY);
}
});
cc.flipY = function(t) {
return new cc.FlipY(t);
};
cc.Show.prototype.update = function(t) {
n(this._getSgTarget(), !1, !0);
};
cc.Hide.prototype.update = function(t) {
n(this._getSgTarget(), !1, !1);
};
cc.ToggleVisibility.prototype.update = function(t) {
n(this._getSgTarget(), !0);
};
cc.callFunc = function(t, e, i) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
return e ? cc.CallFunc.create(n, e) : cc.CallFunc.create(n);
};
cc.CallFunc.prototype._ctor = function(t, e, i) {
if (void 0 !== t) {
var n = function(e) {
e && (e = e._owner || e);
t.call(this, e, i);
};
void 0 === e ? this.initWithFunction(n) : this.initWithFunction(n, e);
}
};
var d = cc.ActionManager.prototype.addAction;
cc.ActionManager.prototype.addAction = function(t, e, i) {
(e = o(e)) && d.call(this, t, e, i);
};
for (var f = [ [ "removeAllActionsFromTarget", 0 ], [ "removeActionByTag", 1 ], [ "getActionByTag", 1 ], [ "getNumberOfRunningActionsInTarget", 0 ], [ "pauseTarget", 0 ], [ "resumeTarget", 0 ] ], p = 0; p < f.length; ++p) r.apply(null, f[p]);
cc.ActionManager.prototype.resumeTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.resumeTarget(t[e]);
};
cc.ActionManager.prototype.pauseTargets = function(t) {
if (t) for (var e = 0; e < t.length; e++) t[e] && this.pauseTarget(t[e]);
};
var _ = {
MoveBy: s,
JumpBy: s,
Place: s,
CardinalSplineTo: s,
RotateTo: c,
RotateBy: c,
ScaleTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.scaleX = e.getScaleX();
e._owner.scaleY = e.getScaleY();
}
},
RemoveSelf: function(t) {
var e = this._getSgTarget();
e._owner && e._owner.removeFromParent();
},
SkewTo: function(t) {
var e = this._getSgTarget();
if (e._owner) {
e._owner.skewX = e.getSkewX();
e._owner.skewY = e.getSkewY();
}
},
Blink: a,
FadeIn: a,
FadeOut: a,
FadeTo: a,
TintTo: h,
TintBy: h,
BezierBy: s
};
for (var g in _) {
cc[g].prototype.update = _[g];
}
}), {} ],
195: [ (function(t, e, i) {
cc.Audio = function(t) {
this.src = t;
this.volume = 1;
this.loop = !1;
this.id = -1;
this._eventList = {};
this.type = cc.Audio.Type.NATIVE;
};
cc.Audio.Type = {
DOM: "AUDIO",
WEBAUDIO: "WEBAUDIO",
NATIVE: "NATIVE",
UNKNOWN: "UNKNOWN"
};
!(function(e, i) {
cc.audioEngine = i;
i.play = i.play2d;
i.setMaxWebAudioSize = function() {};
var n = t("../cocos2d/audio/deprecated");
n.removed(i);
n.deprecated(i);
e.State = i.AudioState;
e.play = function() {
i.stop(this.id);
this.id = i.play2d(this.src, this.loop, this.volume);
};
e.pause = function() {
i.pause(this.id);
};
e.resume = function() {
i.resume(this.id);
};
e.stop = function() {
i.stop(this.id);
};
e.setLoop = function(t) {
this.loop = t;
i.setLoop(this.id, t);
};
e.getLoop = function() {
return i.getLoop(this.id);
};
e.setVolume = function(t) {
this.volume = t;
return i.setVolume(this.id, t);
};
e.getVolume = function() {
return i.getVolume(this.id);
};
e.setCurrentTime = function(t) {
i.setCurrentTime(this.id, t);
};
e.getCurrentTime = function() {
return i.getCurrentTime(this.id);
};
e.getDuration = function() {
return i.getDuration(this.id);
};
e.getState = function() {
return i.getState(this.id);
};
e.preload = function() {
this._loaded = !0;
this.emit("load");
};
e.on = function(t, e) {
var i = this._eventList[t];
i || (i = this._eventList[t] = []);
i.push(e);
};
e.once = function(t, e) {
var i = function(n) {
e.call(this, n);
this.off(t, i);
};
this.on(t, i);
};
e.emit = function(t) {
var e = this._eventList[t];
if (e) for (var i = 0; i < e.length; i++) e[i].call(this, this);
};
e.off = function(t, e) {
var i = this._eventList[t];
if (!i) return !1;
if (!e) {
this._eventList[t] = [];
return !0;
}
for (var n = 0; n < i.length; n++) if (i[n] === e) {
i.splice(n, 1);
break;
}
return !0;
};
})(cc.Audio.prototype, jsb.AudioEngine);
}), {
"../cocos2d/audio/deprecated": 22
} ],
196: [ (function(t, e, i) {
!(function() {
window.b2 || (window.b2 = {});
var t = b2.Vec2 = function(t, e) {
void 0 === t && (t = 0);
void 0 === e && (e = 0);
this.x = t;
this.y = e;
};
t.Make = function(e, i) {
void 0 === e && (e = 0);
void 0 === i && (i = 0);
return new t(e, i);
};
t.prototype.SetZero = function() {
this.x = 0;
this.y = 0;
};
t.prototype.Set = function(t, e) {
void 0 === t && (t = 0);
void 0 === e && (e = 0);
this.x = t;
this.y = e;
};
t.prototype.SetV = function(t) {
this.x = t.x;
this.y = t.y;
};
t.prototype.GetNegative = function() {
return new t(-this.x, -this.y);
};
t.prototype.NegativeSelf = function() {
this.x = -this.x;
this.y = -this.y;
};
t.prototype.Copy = function() {
return new t(this.x, this.y);
};
t.prototype.Add = function(t) {
this.x += t.x;
this.y += t.y;
};
t.prototype.Subtract = function(t) {
this.x -= t.x;
this.y -= t.y;
};
t.prototype.Multiply = function(t) {
void 0 === t && (t = 0);
this.x *= t;
this.y *= t;
};
t.prototype.CrossVF = function(t) {
void 0 === t && (t = 0);
var e = this.x;
this.x = t * this.y;
this.y = -t * e;
};
t.prototype.CrossFV = function(t) {
void 0 === t && (t = 0);
var e = this.x;
this.x = -t * this.y;
this.y = t * e;
};
t.prototype.MinV = function(t) {
this.x = this.x < t.x ? this.x : t.x;
this.y = this.y < t.y ? this.y : t.y;
};
t.prototype.MaxV = function(t) {
this.x = this.x > t.x ? this.x : t.x;
this.y = this.y > t.y ? this.y : t.y;
};
t.prototype.Abs = function() {
this.x < 0 && (this.x = -this.x);
this.y < 0 && (this.y = -this.y);
};
t.prototype.Length = function() {
return Math.sqrt(this.x * this.x + this.y * this.y);
};
t.prototype.LengthSquared = function() {
return this.x * this.x + this.y * this.y;
};
t.prototype.Normalize = function() {
var t = Math.sqrt(this.x * this.x + this.y * this.y);
if (t < Number.MIN_VALUE) return 0;
var e = 1 / t;
this.x *= e;
this.y *= e;
return t;
};
t.IsValid = function(t) {
void 0 === t && (t = 0);
return isFinite(t);
};
t.prototype.IsValid = function() {
return t.IsValid(this.x) && t.IsValid(this.y);
};
var e = b2.AABB = function() {
this.lowerBound = new t();
this.upperBound = new t();
};
e.prototype.IsValid = function() {
var t = this.upperBound.x - this.lowerBound.x, e = this.upperBound.y - this.lowerBound.y, i = t >= 0 && e >= 0;
return i = i && this.lowerBound.IsValid() && this.upperBound.IsValid();
};
e.prototype.GetCenter = function() {
return new t((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
};
e.prototype.GetExtents = function() {
return new t((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
};
e.prototype.Contains = function(t) {
var e = !0;
return e = (e = (e = (e = e && this.lowerBound.x <= t.lowerBound.x) && this.lowerBound.y <= t.lowerBound.y) && t.upperBound.x <= this.upperBound.x) && t.upperBound.y <= this.upperBound.y;
};
e.prototype.RayCast = function(t, e) {
var i = -Number.MAX_VALUE, n = Number.MAX_VALUE, o = e.p1.x, r = e.p1.y, s = e.p2.x - e.p1.x, c = e.p2.y - e.p1.y, a = Math.abs(s), h = Math.abs(c), l = t.normal, u = 0, d = 0, f = 0, p = 0, _ = 0;
if (a < Number.MIN_VALUE) {
if (o < this.lowerBound.x || this.upperBound.x < o) return !1;
} else {
u = 1 / s;
_ = -1;
if ((d = (this.lowerBound.x - o) * u) > (f = (this.upperBound.x - o) * u)) {
p = d;
d = f;
f = p;
_ = 1;
}
if (d > i) {
l.x = _;
l.y = 0;
i = d;
}
if (i > (n = Math.min(n, f))) return !1;
}
if (h < Number.MIN_VALUE) {
if (r < this.lowerBound.y || this.upperBound.y < r) return !1;
} else {
u = 1 / c;
_ = -1;
if ((d = (this.lowerBound.y - r) * u) > (f = (this.upperBound.y - r) * u)) {
p = d;
d = f;
f = p;
_ = 1;
}
if (d > i) {
l.y = _;
l.x = 0;
i = d;
}
if (i > (n = Math.min(n, f))) return !1;
}
t.fraction = i;
return !0;
};
e.prototype.TestOverlap = function(t) {
var e = t.lowerBound.x - this.upperBound.x, i = t.lowerBound.y - this.upperBound.y, n = this.lowerBound.x - t.upperBound.x, o = this.lowerBound.y - t.upperBound.y;
return !(e > 0 || i > 0) && !(n > 0 || o > 0);
};
e.Combine = function(t, i) {
var n = new e();
n.Combine(t, i);
return n;
};
e.prototype.Combine = function(t, e) {
this.lowerBound.x = Math.min(t.lowerBound.x, e.lowerBound.x);
this.lowerBound.y = Math.min(t.lowerBound.y, e.lowerBound.y);
this.upperBound.x = Math.max(t.upperBound.x, e.upperBound.x);
this.upperBound.y = Math.max(t.upperBound.y, e.upperBound.y);
};
var i = b2.FilterData = function() {
this.categoryBits = 1;
this.maskBits = 65535;
this.groupIndex = 0;
};
i.prototype.Copy = function() {
var t = new i();
t.categoryBits = this.categoryBits;
t.maskBits = this.maskBits;
t.groupIndex = this.groupIndex;
return t;
};
b2.FixtureDef = function() {
this.filter = new i();
this.shape = null;
this.userData = null;
this.friction = .2;
this.restitution = 0;
this.density = 0;
this.isSensor = !1;
};
b2.BodyDef = function() {
this.position = new t(0, 0);
this.linearVelocity = new t(0, 0);
this.userData = null;
this.angle = 0;
this.angularVelocity = 0;
this.linearDamping = 0;
this.angularDamping = 0;
this.allowSleep = !0;
this.awake = !0;
this.fixedRotation = !1;
this.bullet = !1;
this.type = b2.Body.b2_staticBody;
this.active = !0;
this.inertiaScale = 1;
this.gravityScale = 1;
};
b2.JointDef = function() {
this.type = b2.Joint.e_unknownJoint;
this.userData = null;
this.bodyA = null;
this.bodyB = null;
this.collideConnected = !1;
};
b2.DistanceJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_distanceJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.length = 1;
this.frequencyHz = 0;
this.dampingRatio = 0;
};
b2.FrictionJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_frictionJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.maxForce = 0;
this.maxTorque = 0;
};
b2.GearJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_gearJoint;
this.joint1 = null;
this.joint2 = null;
this.ratio = 1;
};
b2.MotorJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_motorJoint;
this.linearOffset = new t();
this.angularOffset = 0;
this.maxForce = 1;
this.maxTorque = 1;
this.correctionFactor = .3;
};
b2.MouseJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_mouseJoint;
this.target = new t();
this.maxForce = 0;
this.frequencyHz = 5;
this.dampingRatio = .7;
};
b2.PrismaticJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_prismaticJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.localAxisA = new t(1, 0);
this.referenceAngle = 0;
this.enableLimit = !1;
this.lowerTranslation = 0;
this.upperTranslation = 0;
this.enableMotor = !1;
this.maxMotorForce = 0;
this.motorSpeed = 0;
};
b2.PulleyJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_pulleyJoint;
this.groundAnchorA = new t(-1, 1);
this.groundAnchorB = new t(1, 1);
this.localAnchorA = new t(-1, 0);
this.localAnchorB = new t(1, 0);
this.lengthA = 0;
this.lengthB = 0;
this.ratio = 1;
this.collideConnected = !0;
};
b2.RevoluteJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_revoluteJoint;
this.localAnchorA = new t(0, 0);
this.localAnchorB = new t(0, 0);
this.referenceAngle = 0;
this.lowerAngle = 0;
this.upperAngle = 0;
this.maxMotorTorque = 0;
this.motorSpeed = 0;
this.enableLimit = !1;
this.enableMotor = !1;
};
b2.RopeJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_ropeJoint;
this.localAnchorA = new t(-1, 0);
this.localAnchorB = new t(1, 0);
this.maxLength = 0;
};
b2.WeldJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_weldJoint;
this.localAnchorA = new t(0, 0);
this.localAnchorB = new t(0, 0);
this.referenceAngle = 0;
this.frequencyHz = 0;
this.dampingRatio = 0;
};
b2.WheelJointDef = function() {
b2.JointDef.apply(this, arguments);
this.type = b2.Joint.e_wheelJoint;
this.localAnchorA = new t();
this.localAnchorB = new t();
this.localAxisA = new t(1, 0);
this.enableMotor = !1;
this.maxMotorTorque = 0;
this.motorSpeed = 0;
this.frequencyHz = 2;
this.dampingRatio = .7;
};
b2.WorldManifold = function() {
this.normal = new b2.Vec2();
this.points = [];
this.separations = [];
};
var n = b2.Shape.prototype;
cc.defineGetterSetter(n, "m_radius", n.GetRadius, n.SetRadius);
n = b2.CircleShape.prototype;
cc.defineGetterSetter(n, "m_p", n.GetPosition, n.SetPosition);
b2.Body.b2_staticBody = 0;
b2.Body.b2_kinematicBody = 1;
b2.Body.b2_dynamicBody = 2;
b2.Draw.e_shapeBit = 1;
b2.Draw.e_jointBit = 2;
b2.Draw.e_aabbBit = 4;
b2.Draw.e_pairBit = 8;
b2.Draw.e_centerOfMassBit = 16;
b2.Joint.e_unknownJoint = 0;
b2.Joint.e_revoluteJoint = 1;
b2.Joint.e_prismaticJoint = 2;
b2.Joint.e_distanceJoint = 3;
b2.Joint.e_pulleyJoint = 4;
b2.Joint.e_mouseJoint = 5;
b2.Joint.e_gearJoint = 6;
b2.Joint.e_wheelJoint = 7;
b2.Joint.e_weldJoint = 8;
b2.Joint.e_frictionJoint = 9;
b2.Joint.e_ropeJoint = 10;
b2.Joint.e_motorJoint = 11;
b2.Joint.e_inactiveLimit = 0;
b2.Joint.e_atLowerLimit = 1;
b2.Joint.e_atUpperLimit = 2;
b2.Joint.e_equalLimits = 3;
b2.maxPolygonVertices = 8;
b2.maxManifoldPoints = 2;
})();
}), {} ],
197: [ (function(i, n, o) {
"use strict";
var r = i("../cocos2d/core/load-pipeline/auto-release-utils"), s = i("../cocos2d/core/component-scheduler"), c = i("../cocos2d/core/node-activator"), a = i("../cocos2d/core/event/event-listeners");
cc.director._purgeDirector = cc.director.purgeDirector;
cc.js.mixin(cc.director, {
sharedInit: function() {
this._compScheduler = new s();
this._nodeActivator = new c();
var t = this.getScheduler();
if (cc.AnimationManager) {
this._animationManager = new cc.AnimationManager();
t.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._animationManager = null;
if (cc.CollisionManager) {
this._collisionManager = new cc.CollisionManager();
t.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._collisionManager = null;
if (cc.PhysicsManager) {
this._physicsManager = new cc.PhysicsManager();
this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
} else this._physicsManager = null;
cc._widgetManager.init(this);
cc.loader.init(this);
},
purgeDirector: function() {
this._compScheduler.unscheduleAll();
this._nodeActivator.reset();
this._purgeDirector();
},
reset: function() {
this.purgeDirector();
cc.eventManager && cc.eventManager.setEnabled(!0);
this._animationManager && this.getScheduler().scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._collisionManager && this.getScheduler().scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this._physicsManager && this.getScheduler().scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
this.startAnimation();
},
getActionManager: function() {
return this._actionManager;
},
setActionManager: function(t) {
if (this._actionManager !== t) {
this._actionManager && this._scheduler.unscheduleUpdate(this._actionManager);
this._actionManager = t;
this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1);
}
},
getAnimationManager: function() {
return this._animationManager;
},
getCollisionManager: function() {
return this._collisionManager;
},
getPhysicsManager: function() {
return this._physicsManager;
},
getScene: function() {
return this._scene;
},
runSceneImmediate: function(t, e, i) {
var n = window.console;
if (t instanceof cc.Scene) {
n.time("I");
t._load();
n.timeEnd("I");
}
for (var o = cc.game, s = Object.keys(o._persistRootNodes).map((function(t) {
return o._persistRootNodes[t];
})), c = 0; c < s.length; c++) {
var a = s[c];
o._ignoreRemovePersistNode = a;
a.parent = null;
o._ignoreRemovePersistNode = null;
}
var h = this._scene;
n.time("AR");
var l = h && h.autoReleaseAssets && h.dependAssets;
r.autoRelease(l, t.dependAssets, s);
n.timeEnd("AR");
n.time("D");
cc.isValid(h) && h.destroy();
this._scene = null;
cc.Object._deferredDestroy();
n.timeEnd("D");
e && e();
this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, t);
var u = t;
if (t instanceof cc.Scene) {
this._scene = t;
u = t._sgNode;
n.time("AP");
for (var d = 0; d < s.length; d++) {
var f = s[d], p = t.getChildByUuid(f.uuid);
if (p) {
var _ = p.getSiblingIndex();
p._destroyImmediate();
t.insertChild(f, _);
} else f.parent = t;
}
n.timeEnd("AP");
n.time("A");
t._activate();
n.timeEnd("A");
}
this.getRunningScene() ? this.replaceScene(u) : this.runWithScene(u);
i && i(null, t);
this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, t);
},
runScene: function(t, e, i) {
cc.assertID(t, 1205);
t instanceof cc.Scene && t._load();
this.once(cc.Director.EVENT_AFTER_UPDATE, (function() {
this.runSceneImmediate(t, e, i);
}));
},
_getSceneUuid: function(i) {
var n = cc.game._sceneInfos;
if ("string" === ("object" == (e = typeof i) ? t(i) : e)) {
i.endsWith(".fire") || (i += ".fire");
"/" === i[0] || i.startsWith("db://assets/") || (i = "/" + i);
for (var o = 0; o < n.length; o++) {
var r = n[o];
if (r.url.endsWith(i)) return r;
}
} else if ("number" === ("object" == (e = typeof i) ? t(i) : e)) {
if (0 <= i && i < n.length) return n[i];
cc.errorID(1211, i);
} else cc.errorID(1212, i);
return null;
},
setRuntimeLaunchScene: function(t) {
var e = this._getSceneUuid(t);
this._launchSceneUuid = e.uuid;
},
loadScene: function(t, e, i) {
if (this._loadingScene) {
cc.errorID(1213, t, this._loadingScene);
return !1;
}
var n = this._getSceneUuid(t);
if (n) {
var o = n.uuid;
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
this._loadingScene = t;
if (cc.runtime && o !== this._launchSceneUuid) {
var r = this, s = cc.path.basename(n.url) + "_" + n.uuid;
console.log("==> start preload: " + s);
var c = !1;
cc.LoaderLayer.preload([ s ], (function() {
console.log("==> end preload: " + s);
c ? r._loadSceneByUuid(o, e, i) : setTimeout((function() {
r._loadSceneByUuid(o, e, i);
}), 0);
}));
c = !0;
} else this._loadSceneByUuid(o, e, i);
return !0;
}
cc.errorID(1214, t);
return !1;
},
preloadScene: function(t, e) {
var i = this._getSceneUuid(t);
if (i) {
this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t);
cc.loader.load({
uuid: i.uuid,
type: "uuid"
}, (function(i, n) {
i && cc.errorID(1215, t, i.message);
e && e(i, n);
}));
} else {
var n = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
e(new Error(n));
cc.error("preloadScene: " + n);
}
},
_loadSceneByUuid: function(t, e, i, n) {
0;
console.time("LoadScene " + t);
cc.AssetLibrary.loadAsset(t, (function(n, o) {
console.timeEnd("LoadScene " + t);
var r = cc.director;
r._loadingScene = "";
if (n) {
n = "Failed to load scene: " + n;
cc.error(n);
} else {
if (o instanceof cc.SceneAsset) {
var s = o.scene;
s._id = o._uuid;
s._name = o._name;
r.runSceneImmediate(s, i, e);
return;
}
n = "The asset " + t + " is not a scene";
cc.error(n);
}
e && e(n);
}));
},
__fastOn: function(t, e, i) {
var n = this._bubblingListeners;
n || (n = this._bubblingListeners = new a());
n.add(t, e, i);
this._addEventFlag(t, n, !1);
},
__fastOff: function(t, e, i) {
var n = this._bubblingListeners;
if (n) {
n.remove(t, e, i);
this._purgeEventFlag(t, n, !1);
}
}
});
cc.defineGetterSetter(cc.director, "actionManager", cc.director.getActionManager, cc.director.setActionManager);
cc.EventTarget.call(cc.director);
cc.js.addon(cc.director, cc.EventTarget.prototype);
cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed";
cc.Director.EVENT_AFTER_DRAW = "director_after_draw";
cc.Director.EVENT_BEFORE_VISIT = "director_before_visit";
cc.Director.EVENT_AFTER_VISIT = "director_after_visit";
cc.Director.EVENT_BEFORE_UPDATE = "director_before_update";
cc.Director.EVENT_AFTER_UPDATE = "director_after_update";
cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading";
cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch";
cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch";
cc.Director._EVENT_NEXT_TICK = "_director_next_tick";
cc.Director._beforeUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_BEFORE_UPDATE,
callback: function() {
cc.director.emit(cc.Director._EVENT_NEXT_TICK);
cc.director.emit(cc.Director.EVENT_BEFORE_UPDATE);
cc.director._compScheduler.startPhase();
var t = cc.director.getDeltaTime();
cc.director._compScheduler.updatePhase(t);
}
});
cc.Director._afterUpdateListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_UPDATE,
callback: function() {
var t = cc.director.getDeltaTime();
cc.director._compScheduler.lateUpdatePhase(t);
cc.director.emit(cc.Director.EVENT_AFTER_UPDATE);
cc.Object._deferredDestroy();
cc.director.emit(cc.Director.EVENT_BEFORE_VISIT, this);
}
});
cc.Director._afterVisitListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_VISIT,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_VISIT, this);
}
});
cc.Director._afterDrawListener = cc.EventListener.create({
event: cc.EventListener.CUSTOM,
eventName: cc.Director.EVENT_AFTER_DRAW,
callback: function() {
cc.director.emit(cc.Director.EVENT_AFTER_DRAW, this);
}
});
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._beforeUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterUpdateListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterVisitListener, 1);
cc.eventManager.addEventListenerWithFixedPriority(cc.Director._afterDrawListener, 1);
}), {
"../cocos2d/core/component-scheduler": 47,
"../cocos2d/core/event/event-listeners": 84,
"../cocos2d/core/load-pipeline/auto-release-utils": 97,
"../cocos2d/core/node-activator": 110
} ],
198: [ (function(t, e, i) {
var n = dragonBones.CCArmatureDisplay.prototype;
cc.js.mixin(n, cc.EventTarget.prototype);
n.addEvent = function(t, e, i) {
if (!this.hasEventCallback()) {
var n = this;
this.setEventCallback((function(t) {
n.emit(t.type, t);
}));
}
this.on(t, e, i);
};
var o = [ dragonBones.EventObject.START, dragonBones.EventObject.LOOP_COMPLETE, dragonBones.EventObject.COMPLETE, dragonBones.EventObject.FADE_IN, dragonBones.EventObject.FADE_IN_COMPLETE, dragonBones.EventObject.FADE_OUT, dragonBones.EventObject.FADE_OUT_COMPLETE, dragonBones.EventObject.FRAME_EVENT, dragonBones.EventObject.SOUND_EVENT ];
n.removeEvent = function(t, e, i) {
this.off(t, e, i);
for (var n = !0, r = 0, s = o.length; r < s; r++) {
var c = o[r];
if (this.hasEventListener(c)) {
n = !1;
break;
}
}
n && this.clearEventCallback();
};
var r = dragonBones.Armature.prototype;
r.addEventListener = function(t, e, i) {
this.display.addEvent(t, e, i);
};
r.removeEventListener = function(t, e, i) {
this.display.removeEvent(t, e, i);
};
}), {} ],
199: [ (function(t, e, i) {
"use strict";
var n = cc.EditBox.prototype;
n._setMaxLength = n.setMaxLength;
n.setMaxLength = function(t) {
t < 0 && (t = 65535);
this._setMaxLength(t);
};
cc.defineGetterSetter(n, "font", null, n.setFont);
cc.defineGetterSetter(n, "fontName", null, n.setFontName);
cc.defineGetterSetter(n, "fontSize", null, n.setFontSize);
cc.defineGetterSetter(n, "fontColor", null, n.setFontColor);
cc.defineGetterSetter(n, "string", n.getString, n.setString);
cc.defineGetterSetter(n, "maxLength", n.getMaxLength, n.setMaxLength);
cc.defineGetterSetter(n, "placeholder", n.getPlaceHolder, n.setPlaceHolder);
cc.defineGetterSetter(n, "placeholderFont", null, n.setPlaceholderFont);
cc.defineGetterSetter(n, "placeholderFontName", null, n.setPlaceholderFontName);
cc.defineGetterSetter(n, "placeholderFontSize", null, n.setPlaceholderFontSize);
cc.defineGetterSetter(n, "placeholderFontColor", null, n.setPlaceholderFontColor);
cc.defineGetterSetter(n, "inputFlag", null, n.setInputFlag);
cc.defineGetterSetter(n, "delegate", null, n.setDelegate);
cc.defineGetterSetter(n, "inputMode", null, n.setInputMode);
cc.defineGetterSetter(n, "returnType", null, n.setReturnType);
n.setLineHeight = function() {};
n.setTabIndex = function() {};
n.getTabIndex = function() {
return -1;
};
n.setFocus = function() {};
n.isFocused = function() {
return !1;
};
n.stayOnTop = function() {};
cc.EditBox.InputMode = cc.Enum({
ANY: 0,
EMAIL_ADDR: 1,
NUMERIC: 2,
PHONE_NUMBER: 3,
URL: 4,
DECIMAL: 5,
SINGLE_LINE: 6
});
cc.EditBox.InputFlag = cc.Enum({
PASSWORD: 0,
SENSITIVE: 1,
INITIAL_CAPS_WORD: 2,
INITIAL_CAPS_SENTENCE: 3,
INITIAL_CAPS_ALL_CHARACTERS: 4,
DEFAULT: 5
});
cc.EditBox.KeyboardReturnType = cc.Enum({
DEFAULT: 0,
DONE: 1,
SEND: 2,
SEARCH: 3,
GO: 4
});
}), {} ],
200: [ (function(t, e, i) {
"use strict";
cc.TextAlignment = cc.Enum({
LEFT: 0,
CENTER: 1,
RIGHT: 2
});
cc.VerticalTextAlignment = cc.Enum({
TOP: 0,
CENTER: 1,
BOTTOM: 2
});
}), {} ],
201: [ (function(i, n, o) {
"use strict";
cc.sys.now = function() {
return Date.now();
};
var r = /[^\.\/]+\/\.\.\//;
cc.js.mixin(cc.path, {
_normalize: function(t) {
var e = t = String(t);
do {
e = t;
t = t.replace(r, "");
} while (e.length !== t.length);
return t;
},
sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
stripSep: function(t) {
return t.replace(/[\/\\]$/, "");
}
});
var s = cc.Node.prototype;
cc.defineGetterSetter(s, "_parent", s.getParent, s.setParent);
cc.view.isViewReady = cc.view.isOpenGLReady;
cc.view.setOrientation = function() {};
var c = 0, a = {}, h = function(t) {
this.__instanceId = cc.ClassManager.getNewInstanceId();
this._intervalId = c++;
this._code = t;
};
h.prototype.fun = function() {
if (this._code) {
var i = this._code;
"string" === ("object" == (e = typeof i) ? t(i) : e) ? Function(i)() : "function" === ("object" == (e = typeof i) ? t(i) : e) && i.apply(null, this._args);
}
};
window.setTimeout = function(t, e) {
var i = new h(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
var n = i.fun;
i.fun = function() {
n.apply(this, arguments);
clearTimeout(i._intervalId);
};
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, 0, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.setInterval = function(t, e) {
var i = new h(t);
arguments.length > 2 && (i._args = Array.prototype.slice.call(arguments, 2));
cc.director.getScheduler().schedule(i.fun, i, e / 1e3, cc.macro.REPEAT_FOREVER, 0, !1);
a[i._intervalId] = i;
return i._intervalId;
};
window.clearInterval = function(t) {
var e = a[t];
if (e) {
cc.director.getScheduler().unschedule(e.fun, e);
delete a[t];
}
};
window.clearTimeout = clearInterval;
if (window.SocketIO) {
window.io = window.SocketIO;
SocketIO.prototype._jsbEmit = SocketIO.prototype.emit;
SocketIO.prototype.emit = function(i, n) {
"object" === ("object" == (e = typeof n) ? t(n) : e) && (n = JSON.stringify(n));
this._jsbEmit(i, n);
};
}
cc.Node.prototype.setIgnoreAnchorPointForPosition = cc.Node.prototype.ignoreAnchorPointForPosition;
window._ccsg = {
Node: cc.Node,
Scene: cc.Scene,
Sprite: cc.Sprite,
ParticleSystem: cc.ParticleSystem,
Label: cc.Label,
EditBox: cc.EditBox,
VideoPlayer: cc.VideoPlayer,
WebView: cc.WebView,
TMXTiledMap: cc.TMXTiledMap,
TMXObjectGroup: cc.TMXObjectGroup,
TMXObject: cc.TMXObject,
TMXObjectImage: cc.TMXObjetImage,
TMXObjectShape: cc.TMXObjectShape,
TMXLayer: cc.TMXLayer,
MotionStreak: cc.MotionStreak,
CameraNode: cc.CameraNode
};
cc.formatStr = cc.js.formatStr;
cc.Image && cc.Image.setPNGPremultipliedAlphaEnabled && cc.Image.setPNGPremultipliedAlphaEnabled(!1);
window.__cleanup = function() {
cc.director.getScene().destroy();
cc.Object._deferredDestroy();
cc.js._registeredClassIds = {};
cc.js._registeredClassNames = {};
cc.loader.releaseAll();
cc.textureCache.removeAllTextures();
};
}), {} ],
202: [ (function(i, n, o) {
"use strict";
var r = i("../cocos2d/core/platform/js").Pool, s = i("../cocos2d/core/event/event");
i("../cocos2d/core/event-manager/CCEvent");
s.EventMouse.pool = new r(5);
s.EventMouse.pool.get = function(t, e) {
var i = this._get() || new s.EventMouse(e, !0);
i._button = t.getButton();
var n = t.getLocation();
i._x = n.x;
i._y = n.y;
var o = t._listener;
if (o) {
i._prevX = o._previousX;
i._prevY = o._previousY;
}
i._scrollX = t.getScrollX();
i._scrollY = t.getScrollY();
i._target = null;
i._currentTarget = null;
i.eventPhase = cc.Event.NONE;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
s.EventTouch.pool = new r(5);
s.EventTouch.pool.get = function(t) {
var e = t.getTouches(), i = this._get() || new s.EventTouch(e, !0);
i.eventPhase = cc.Event.NONE;
i._eventCode = t.getEventCode();
i._touches = e;
i._target = null;
i._currentTarget = null;
i._propagationStopped = !1;
i._propagationImmediateStopped = !1;
return i;
};
cc.eventManager.addListener = function(i, n) {
i instanceof cc.EventListener || (i = cc.EventListener.create(i));
if ("number" === ("object" == (e = typeof n) ? t(n) : e)) {
if (0 === n) {
cc.logID(3500);
return;
}
cc.eventManager.addEventListenerWithFixedPriority(i, n);
} else {
var o = n;
if (n instanceof cc._BaseNode) o = n._sgNode; else if (!(o instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
cc.eventManager.addEventListenerWithSceneGraphPriority(i, o);
}
return i;
};
cc.eventManager._removeListeners = cc.eventManager.removeListeners;
cc.eventManager.removeListeners = function(t, e) {
t instanceof cc._BaseNode && (t = t._sgNode);
t instanceof _ccsg.Node || cc.js.isNumber(t) ? this._removeListeners(t, e || !1) : cc.warnID(3506);
};
cc.eventManager._pauseTarget = cc.eventManager.pauseTarget;
cc.eventManager.pauseTarget = function(t, e) {
var i = t;
t._eventPaused = !0;
if (t instanceof cc._BaseNode) i = t._sgNode; else if (!(i instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
if (i !== t && !i.isRunning()) {
var n = i.onEnter;
i.onEnter = function() {
n.call(this);
t._eventPaused && cc.eventManager._pauseTarget(this, e || !1);
this.onEnter = n;
};
}
this._pauseTarget(i, e || !1);
};
cc.eventManager._resumeTarget = cc.eventManager.resumeTarget;
cc.eventManager.resumeTarget = function(t, e) {
t._eventPaused = !1;
if (t instanceof cc._BaseNode) t = t._sgNode; else if (!(t instanceof _ccsg.Node)) {
cc.warnID(3506);
return;
}
this._resumeTarget(t, e || !1);
};
cc._EventListenerKeyboard = cc.EventListenerKeyboard;
cc._EventListenerKeyboard.LISTENER_ID = "__cc_keyboard";
cc._EventListenerAcceleration = cc.EventListenerAcceleration;
cc._EventListenerAcceleration.LISTENER_ID = "__cc_acceleration";
cc._EventListenerTouchAllAtOnce = cc.EventListenerTouchAllAtOnce;
cc._EventListenerTouchAllAtOnce.LISTENER_ID = "__cc_touch_all_at_once";
cc._EventListenerTouchOneByOne = cc.EventListenerTouchOneByOne;
cc._EventListenerTouchOneByOne.LISTENER_ID = "__cc_touch_one_by_one";
cc._EventListenerMouse = cc.EventListenerMouse;
cc._EventListenerMouse.LISTENER_ID = "__cc_mouse";
}), {
"../cocos2d/core/event-manager/CCEvent": 82,
"../cocos2d/core/event/event": 86,
"../cocos2d/core/platform/js": 149
} ],
203: [ (function(i, n, o) {
"use strict";
cc.game = {
DEBUG_MODE_NONE: 0,
DEBUG_MODE_INFO: 1,
DEBUG_MODE_WARN: 2,
DEBUG_MODE_ERROR: 3,
DEBUG_MODE_INFO_FOR_WEB_PAGE: 4,
DEBUG_MODE_WARN_FOR_WEB_PAGE: 5,
DEBUG_MODE_ERROR_FOR_WEB_PAGE: 6,
EVENT_HIDE: "game_on_hide",
EVENT_SHOW: "game_on_show",
EVENT_RESIZE: "game_on_resize",
_onShowListener: null,
_onHideListener: null,
_paused: !1,
_prepareCalled: !1,
_prepared: !1,
config: null,
onStart: null,
_sceneInfos: [],
_persistRootNodes: {},
_ignoreRemovePersistNode: null,
RENDER_TYPE_CANVAS: 0,
RENDER_TYPE_WEBGL: 1,
RENDER_TYPE_OPENGL: 2,
EVENT_GAME_INITED: "game_inited",
CONFIG_KEY: {
width: "width",
height: "height",
modules: "modules",
debugMode: "debugMode",
showFPS: "showFPS",
frameRate: "frameRate",
id: "id",
renderMode: "renderMode",
registerSystemEvent: "registerSystemEvent",
jsList: "jsList",
scenes: "scenes"
},
setFrameRate: function(t) {
this.config[this.CONFIG_KEY.frameRate] = t;
cc.director.setAnimationInterval(1 / t);
},
step: function() {
cc.director.mainLoop();
},
pause: function() {
this._paused = !0;
cc.director.pause();
},
resume: function() {
this._paused = !1;
cc.director.resume();
},
isPaused: function() {
return this._paused;
},
restart: function() {
__restartVM();
},
end: function() {
close();
},
prepare: function(t) {
var e = this, i = e.config, n = e.CONFIG_KEY;
this._loadConfig();
if (this._prepared) t && t(); else if (!this._prepareCalled) {
this._prepareCalled = !0;
cc._renderType = cc.game.RENDER_TYPE_OPENGL;
cc.director.sharedInit();
var o = i[n.jsList];
if (o) cc.loader.load(o, (function(i) {
if (i) throw new Error(JSON.stringify(i));
e._prepared = !0;
t && t();
e.emit(e.EVENT_GAME_INITED);
})); else {
t && t();
e.emit(e.EVENT_GAME_INITED);
}
}
},
run: function(i, n) {
if ("function" === ("object" == (e = typeof i) ? t(i) : e)) cc.game.onStart = i; else {
i && (cc.game.config = i);
"function" === ("object" == (e = typeof n) ? t(n) : e) && (cc.game.onStart = n);
}
cc.director.startAnimation();
this.prepare(cc.game.onStart && cc.game.onStart.bind(cc.game));
},
addPersistRootNode: function(t) {
if (cc.Node.isNode(t) && t.uuid) {
var e = t.uuid;
if (!this._persistRootNodes[e]) {
var i = cc.director._scene;
if (cc.isValid(i)) {
if (t.parent) {
if (!(t.parent instanceof cc.Scene)) {
cc.warnID(3801);
return;
}
if (t.parent !== i) {
cc.warnID(3802);
return;
}
} else t.parent = i;
this._persistRootNodes[e] = t;
t._persistNode = !0;
}
}
} else cc.warnID(3803);
},
removePersistRootNode: function(t) {
if (t !== this._ignoreRemovePersistNode) {
var e = t._id || "";
if (t === this._persistRootNodes[e]) {
delete this._persistRootNodes[e];
t._persistNode = !1;
}
}
},
isPersistRootNode: function(t) {
return t._persistNode;
},
_loadConfig: function() {
if (this.config) this._initConfig(this.config); else try {
var t = jsb.fileUtils.getStringFromFile("project.json"), e = JSON.parse(t);
this._initConfig(e || {});
} catch (t) {
console.log("Failed to read or parse project.json");
this._initConfig({});
}
},
_initConfig: function(i) {
var n = this.CONFIG_KEY;
"number" !== ("object" == (e = typeof i[n.debugMode]) ? t(i[n.debugMode]) : e) && (i[n.debugMode] = 0);
"number" !== ("object" == (e = typeof i[n.frameRate]) ? t(i[n.frameRate]) : e) && (i[n.frameRate] = 60);
"number" !== ("object" == (e = typeof i[n.renderMode]) ? t(i[n.renderMode]) : e) && (i[n.renderMode] = 0);
i[n.showFPS] = !(n.showFPS in i) || !!i[n.showFPS];
this.groupList = i.groupList || [];
this.collisionMatrix = i.collisionMatrix || [];
this._sceneInfos = i[n.scenes] || [];
cc.director.setDisplayStats(i[n.showFPS]);
cc.director.setAnimationInterval(1 / i[n.frameRate]);
cc._initDebugSetting(i[n.debugMode]);
this.config = i;
}
};
cc.EventTarget.call(cc.game);
cc.js.addon(cc.game, cc.EventTarget.prototype);
cc.game._onHideListener = cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, (function() {
cc.game.emit(cc.game.EVENT_HIDE, cc.game);
}));
cc.game._onShowListener = cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, (function() {
cc.game.emit(cc.game.EVENT_SHOW, cc.game);
}));
cc._initDebugSetting(cc.game.DEBUG_MODE_INFO);
}), {} ],
204: [ (function(i, n, o) {
"use strict";
var r = cc.Label;
!r.createWithTTF && r.prototype.createWithTTF && (r.createWithTTF = r.prototype.createWithTTF);
r.prototype.setHorizontalAlign = r.prototype.setHorizontalAlignment;
r.prototype.setVerticalAlign = r.prototype.setVerticalAlignment;
r.prototype.setBMFontSize || (r.prototype.setBMFontSize = function() {});
r.prototype.getBMFontSize || (r.prototype.getBMFontSize = function() {});
r.prototype.setOverflow || (r.prototype.setOverflow = function() {});
r.prototype.getOverflow || (r.prototype.getOverflow = function() {});
r.prototype._setOverflow = r.prototype.setOverflow;
r.prototype.setOverflow = function(t) {
this._overFlow = t;
this._setOverflow(this._overFlow);
};
r.prototype.getOverflow = function() {
return this._overFlow;
};
r.prototype._enableBold = r.prototype.enableBold;
r.prototype.enableBold = function(t) {
t ? this._enableBold() : this.disableEffect(5);
};
r.prototype._enableItalics = r.prototype.enableItalics;
r.prototype.enableItalics = function(t) {
t ? this._enableItalics() : this.disableEffect(4);
};
r.prototype._enableUnderline = r.prototype.enableUnderline;
r.prototype.enableUnderline = function(t) {
t ? this._enableUnderline() : this.disableEffect(6);
};
r.prototype.setFontSize = function(t) {
this._fontSize = t;
if (this._labelType === _ccsg.Label.Type.SystemFont) this.setSystemFontSize(t); else if (this._labelType === _ccsg.Label.Type.BMFont) this.setBMFontSize(t); else if (this._labelType === _ccsg.Label.Type.TTF) {
var e = this.getTTFConfig();
e.fontSize = t;
this.setTTFConfig(e);
}
};
r.prototype.getFontSize = function() {
return this._fontSize;
};
r.prototype.enableWrapText = r.prototype.enableWrap || function() {};
r.prototype.isWrapTextEnabled = r.prototype.isWrapEnabled || function() {};
r.prototype._setLineHeight = r.prototype.setLineHeight;
r.prototype.setLineHeight = function(t) {
this._labelType !== _ccsg.Label.Type.SystemFont ? this._setLineHeight(t) : cc.warnID(4013);
};
r.prototype._setColor = r.prototype.setColor;
r.prototype.setColor = function(t) {
this._labelType === _ccsg.Label.Type.BMFont ? this._setColor(t) : this.setTextColor(t);
};
r.prototype.setSpacingX = r.prototype.setAdditionalKerning;
r.prototype._setTTFConfig = r.prototype.setTTFConfig;
r.prototype.setTTFConfig = function(t) {
this._setTTFConfig(t);
this._ttfConfig = t;
};
r.prototype.getTTFConfig = function() {
return this._ttfConfig;
};
r.prototype._setContentSize = r.prototype.setContentSize;
r.prototype.setContentSize = function(i, n) {
var o = "number" === ("object" == (e = typeof i.width) ? t(i.width) : e) ? i.width : i, r = "number" === ("object" == (e = typeof i.height) ? t(i.height) : e) ? i.height : n;
if (this.getOverflow() === cc.Label.Overflow.NONE) {
o = 0;
r = 0;
} else this._setContentSize(o, r);
this.setDimensions(o, r);
};
r.prototype.setFontAsset = function(t) {
this._fontAsset = t;
var e = t instanceof cc.Font;
if (e) {
var i = e ? t.rawUrl : "";
if (".ttf" === cc.path.extname(i)) {
var n = this.isOutlined() ? this.getOutlineWidth() : 0;
if (this._ttfConfig) {
this._ttfConfig.outlineSize = n;
this._ttfConfig.fontFilePath = i;
} else this._ttfConfig = {
fontFilePath: i,
fontSize: this._fontSize,
outlineSize: n,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
this._labelType = _ccsg.Label.Type.TTF;
this.setTTFConfig(this._ttfConfig);
} else if (t.spriteFrame) {
this._labelType = _ccsg.Label.Type.BMFont;
this.setBMFontFilePath(JSON.stringify(t._fntConfig), t.spriteFrame);
this.setFontSize(this.getFontSize());
}
this.getContentSize();
} else this.setFontFamily("Arial");
};
r.prototype.setFontFamily = function(t) {
t = t || "";
this._labelType = _ccsg.Label.Type.SystemFont;
this.setSystemFontName(t);
this._isSystemFontUsed = !0;
this.getContentSize();
};
r.prototype.setOutlined = function(t) {
this._outlined = !!t;
this._outlined ? this.enableOutline(this.getOutlineColor(), this.getOutlineWidth()) : this.disableEffect(1);
};
r.prototype.setOutlineWidth = function(t) {
this._outlineWidth = t;
if (this._outlined) {
var e = this.getOutlineWidth();
if (this._labelType === _ccsg.Label.Type.TTF) {
var i = this.getTTFConfig();
if (i.outlineSize !== e) {
i.outlineSize = e;
this.setTTFConfig(i);
}
} else this.enableOutline(this.getOutlineColor(), e);
}
};
r.prototype.setOutlineColor = function(t) {
this._outlineColor = cc.color(t);
this._outlined && this.enableOutline(this.getOutlineColor(), this.getOutlineWidth());
};
r.prototype.setMargin = function() {};
r.prototype.isOutlined = function() {
return this._outlined;
};
r.prototype.getOutlineWidth = function() {
return this._outlineWidth || 1;
};
r.prototype.getOutlineColor = function() {
return this._outlineColor || cc.color(255, 255, 255, 255);
};
cc.Label = function(t, e, i, n) {
e = e || "Arial";
var o = cc.path.extname(e), s = _ccsg.Label.Type.TTF;
this._fontSize = n;
var c;
if (".ttf" === o) {
var a = {
fontFilePath: e,
fontSize: this._fontSize,
outlineSize: 0,
glyphs: 0,
customGlyphs: "",
distanceFieldEnable: !1
};
(c = r.createWithTTF(a, t))._ttfConfig = a;
} else if (i) {
c = r.createWithBMFont(e, t, i);
s = _ccsg.Label.Type.BMFont;
} else {
c = r.createWithSystemFont(t || "", e, this._fontSize);
s = _ccsg.Label.Type.SystemFont;
c._isSystemFontUsed = !0;
}
c._labelType = s;
return c;
};
cc.Label.Type = cc.Enum({
TTF: 0,
BMFont: 1,
SystemFont: 2
});
cc.Label.Overflow = cc.Enum({
NONE: 0,
CLAMP: 1,
SHRINK: 2,
RESIZE_HEIGHT: 3
});
cc.Label.pool = new cc.js.Pool(0);
cc.Label.pool.get = function(t, e, i, n) {
this._fontAsset = e;
n = n || 40;
var o = e instanceof cc.Font;
if (!o) return new _ccsg.Label(t, null, null, n);
var r = o ? e.rawUrl : "";
return new _ccsg.Label(t, r, i, n);
};
}), {} ],
205: [ (function(t, e, i) {
"use strict";
function n(t, e) {
return null;
}
function o(e, i) {
t(e.url);
return null;
}
function r(t, e) {
return t.url;
}
function s(t, e) {
var i = t.url, n = cc.textureCache.getTextureForKey(i);
if (n) return n;
if (i.match(jsb.urlRegExp)) jsb.loadRemoteImg(i, (function(t, n) {
if (t) {
n.url = i;
e && e(null, n);
} else e && e(new Error("Load image failed: " + i));
})); else {
var o = function(t) {
if (t instanceof cc.Texture2D) {
t.url = i;
e && e(null, t);
} else e && e(new Error("Load image failed: " + i));
};
cc.textureCache._addImageAsync(i, o);
}
}
t("../cocos2d/core/load-pipeline");
cc.loader.addDownloadHandlers({
js: o,
jsc: o,
png: n,
jpg: n,
bmp: n,
jpeg: n,
gif: n,
ico: n,
tiff: n,
webp: n,
image: n,
mp3: r,
ogg: r,
wav: r,
mp4: r,
m4a: r,
font: n,
eot: n,
ttf: n,
woff: n,
svg: n,
ttc: n
});
cc.loader.addLoadHandlers({
png: s,
jpg: s,
bmp: s,
jpeg: s,
gif: s,
ico: s,
tiff: s,
webp: s,
image: s,
default: n
});
}), {
"../cocos2d/core/load-pipeline": 99
} ],
206: [ (function(t, e, i) {
"use strict";
function n(t, e) {
return function(i) {
this.getEmitterMode() === e && t.call(this, i);
};
}
cc.ParticleSystem.Mode = cc.Enum({
GRAVITY: 0,
RADIUS: 1
});
cc.ParticleSystem.Type = cc.Enum({
FREE: 0,
RELATIVE: 1,
GROUPED: 2
});
for (var o = [ {
tangentialAccel: "setTangentialAccel",
tangentialAccelVar: "setTangentialAccelVar",
radialAccel: "setRadialAccel",
radialAccelVar: "setRadialAccelVar",
rotationIsDir: "setRotationIsDir",
gravity: "setGravity",
speed: "setSpeed",
speedVar: "setSpeedVar"
}, {
startRadius: "setStartRadius",
startRadiusVar: "setStartRadiusVar",
endRadius: "setEndRadius",
endRadiusVar: "setEndRadiusVar",
rotatePerS: "setRotatePerSecond",
rotatePerSVar: "setRotatePerSecondVar"
} ], r = cc.ParticleSystem.prototype, s = 0; s < o.length; s++) {
var c = o[s];
for (var a in c) {
var h = c[a], l = r[h];
r[h] = n(l, s);
var u = h.replace("set", "get");
cc.defineGetterSetter(r, a, r[u], r[h]);
}
}
}), {} ],
207: [ (function(t, e, i) {
"use strict";
var n = !1;
if (cc.Scale9SpriteV2) {
n = !0;
cc.Scale9Sprite = cc.Scale9SpriteV2;
}
cc.Scale9Sprite.state = {
NORMAL: 0,
GRAY: 1,
DISTORTION: 2
};
cc.Scale9Sprite.RenderingType = cc.Enum({
SIMPLE: 0,
SLICED: 1,
TILED: 2,
FILLED: 3
});
cc.Scale9Sprite.FillType = cc.Enum({
Horizontal: 0,
Vertical: 1,
RADIAL: 2
});
var o = cc.Scale9Sprite.prototype;
if (n) {
var r = o.setContentSize;
o.setContentSize = function(t, e) {
void 0 !== e && (t = new cc.Size(t, e));
r.call(this, t);
};
var s = o.setAnchorPoint;
o.setAnchorPoint = function(t, e) {
void 0 !== e && (t = new cc.Vec2(t, e));
s.call(this, t);
};
} else {
o.setFillType = function() {};
o.setFillCenter = function() {};
o.setFillStart = function() {};
o.setFillRange = function() {};
o.enableTrimmedContentSize = function() {};
o._lazyInit = function() {
if (!this._onceInit) {
this._onceInit = !0;
this._insets = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._trim = {
left: 0,
right: 0,
top: 0,
bottom: 0
};
this._contentSizeTrimmed = new cc.Size(0, 0);
this._anchorPointTrimmed = new cc.Vec2(0, 0);
this._sizeAfterTrimmed = new cc.Size(0, 0);
}
};
o._applyInsetsContentAnchor = function() {
var t = 1, e = 1;
if ((this._renderingType || this.getRenderingType && this.getRenderingType()) === cc.Scale9Sprite.RenderingType.SIMPLE) {
t = this._contentSizeTrimmed.width / this._sizeAfterTrimmed.width;
e = this._contentSizeTrimmed.height / this._sizeAfterTrimmed.height;
}
var i = new cc.Size(0, 0);
i.width = this._contentSizeTrimmed.width + (this._trim.left + this._trim.right) * t;
i.height = this._contentSizeTrimmed.height + (this._trim.top + this._trim.bottom) * e;
this._setContentSize(i);
var n = new cc.Vec2(0, 0);
n.x = this._contentSizeTrimmed.width * this._anchorPointTrimmed.x + this._trim.left * t;
n.y = this._contentSizeTrimmed.height * this._anchorPointTrimmed.y + this._trim.bottom * e;
n.x = n.x / i.width;
n.y = n.y / i.height;
this._setAnchorPoint(n);
var o = new cc.Rect(0, 0, 0, 0);
o.x = this._trim.left + this._insets.left;
o.y = this._trim.top + this._insets.top;
o.width = this._sizeAfterTrimmed.width - this._insets.left - this._insets.right;
o.height = this._sizeAfterTrimmed.height - this._insets.top - this._insets.bottom;
this.setCapInsets(o);
};
o._setBlendFunc = o.setBlendFunc;
o.setBlendFunc = function(t, e) {
void 0 !== e && (t = {
src: t,
dst: e
});
this._setBlendFunc && this._setBlendFunc(t);
};
o._getContentSize = o.getContentSize;
o.getContentSize = function() {
return new cc.Size(this._contentSizeTrimmed);
};
o._setContentSize = o.setContentSize;
o.setContentSize = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Size(t, e));
this._contentSizeTrimmed = new cc.Size(t);
this._applyInsetsContentAnchor();
};
o._getAnchorPoint = o.getAnchorPoint;
o.getAnchorPoint = function() {
return new cc.Vec2(this._anchorPointTrimmed);
};
o._setAnchorPoint = o.setAnchorPoint;
o.setAnchorPoint = function(t, e) {
this._lazyInit();
void 0 !== e && (t = new cc.Vec2(t, e));
this._anchorPointTrimmed = new cc.Vec2(t);
this._applyInsetsContentAnchor();
};
o._getInsetLeft = o.getInsetLeft;
o._getInsetRight = o.getInsetRight;
o._getInsetBottom = o.getInsetBottom;
o._getInsetTop = o.getInsetTop;
o.getInsetLeft = function() {
return this._insets.left;
};
o.getInsetRight = function() {
return this._insets.right;
};
o.getInsetBottom = function() {
return this._insets.bottom;
};
o.getInsetTop = function() {
return this._insets.top;
};
o._setInsetLeft = o.setInsetLeft;
o.setInsetLeft = function(t) {
this._lazyInit();
this._insets.left = t;
this._applyInsetsContentAnchor();
};
o._setInsetRight = o.setInsetRight;
o.setInsetRight = function(t) {
this._lazyInit();
this._insets.right = t;
this._applyInsetsContentAnchor();
};
o._setInsetTop = o.setInsetTop;
o.setInsetTop = function(t) {
this._lazyInit();
this._insets.top = t;
this._applyInsetsContentAnchor();
};
o._setInsetBottom = o.setInsetBottom;
o.setInsetBottom = function(t) {
this._lazyInit();
this._insets.bottom = t;
this._applyInsetsContentAnchor();
};
o._setSpriteFrame = o.setSpriteFrame;
o.setSpriteFrame = function(t) {
this._lazyInit();
var e = t.getOriginalSize(), i = t.getRect(), n = t.getOffset(), o = (e.width + 2 * n.x - i.width) / 2, r = e.width - o - i.width, s = (e.height + 2 * n.y - i.height) / 2, c = e.height - s - i.height;
this._trim.left = o;
this._trim.right = r;
this._trim.top = c;
this._trim.bottom = s;
this._sizeAfterTrimmed = new cc.Size(i.width, i.height);
this._setSpriteFrame(t);
this._applyInsetsContentAnchor();
};
}
}), {} ],
208: [ (function(t, e, i) {
sp._SGSkeleton = sp.Skeleton;
sp._SGSkeletonAnimation = sp.SkeletonAnimation;
sp._SGSkeleton.prototype.setPremultipliedAlpha = sp._SGSkeleton.prototype.setOpacityModifyRGB;
sp._SGSkeleton.prototype.setOpacityModifyRGB = function() {};
}), {} ],
209: [ (function(i, n, o) {
"use strict";
i("../cocos2d/core/platform/CCClass");
i("../cocos2d/core/assets/CCAsset");
cc.TextureCache.prototype._addImageAsync || (cc.TextureCache.prototype._addImageAsync = cc.TextureCache.prototype.addImageAsync);
cc.TextureCache.prototype.addImageAsync = function(t, e, i) {
var n = null;
cc.loader.load(t, (function(t, o) {
t && (o = null);
e && e.call(i, o);
n = o;
}));
return n;
};
cc.TextureCache.prototype._addImage || (cc.TextureCache.prototype._addImage = cc.TextureCache.prototype.addImage);
cc.TextureCache.prototype.addImage = function(i, n, o) {
return "function" === ("object" == (e = typeof n) ? t(n) : e) ? this.addImageAsync(i, n, o) : n ? this._addImage(i, n) : this._addImage(i);
};
cc.textureCache._textures = {};
cc.textureCache.cacheImage = function(t, e) {
e instanceof cc.Texture2D && (this._textures[t] = e);
};
cc.textureCache._getTextureForKey = cc.textureCache.getTextureForKey;
cc.textureCache.getTextureForKey = function(t) {
var e = this._getTextureForKey(t);
e || (e = this._textures[t]);
return e || null;
};
cc.textureCache._removeTextureForKey = cc.textureCache.removeTextureForKey;
cc.textureCache.removeTextureForKey = function(t) {
this._textures[t] && delete this._textures[t];
this._removeTextureForKey(t);
};
cc.Class._fastDefine("cc.Texture2D", cc.Texture2D, []);
cc.js.value(cc.Texture2D, "$super", cc.RawAsset);
cc.Texture2D.PixelFormat = cc.Enum({
RGB565: cc.Texture2D.PIXEL_FORMAT_RGB565,
RGB5A1: cc.Texture2D.PIXEL_FORMAT_RGB5A1,
RGBA4444: cc.Texture2D.PIXEL_FORMAT_RGBA4444,
RGB888: cc.Texture2D.PIXEL_FORMAT_RGB888,
RGBA8888: cc.Texture2D.PIXEL_FORMAT_RGBA8888,
A8: cc.Texture2D.PIXEL_FORMAT_A8,
I8: cc.Texture2D.PIXEL_FORMAT_I8,
AI8: cc.Texture2D.PIXEL_FORMAT_AI8
});
cc.Texture2D.WrapMode = cc.Enum({
REPEAT: 10497,
CLAMP_TO_EDGE: 33071,
MIRRORED_REPEAT: 33648
});
cc.Texture2D.Filter = cc.Enum({
LINEAR: 9729,
NEAREST: 9728
});
var r = cc.Texture2D.prototype;
r.loaded = !0;
r.update = function(t) {
var e = !1, i = !1;
if (t) {
if (void 0 !== t.minFilter) {
this._minFilter = t.minFilter;
e = !0;
}
if (void 0 !== t.magFilter) {
this._magFilter = t.magFilter;
e = !0;
}
if (void 0 !== t.wrapS) {
this._wrapS = t.wrapS;
e = !0;
}
if (void 0 !== t.wrapT) {
this._wrapT = t.wrapT;
e = !0;
}
void 0 !== t.mipmap && (i = this._hasMipmap = t.mipmap);
}
e && this.setTexParameters(t);
i && this.generateMipmap();
};
r.isLoaded = function() {
return !0;
};
r.getPixelWidth = r.getPixelsWide;
r.getPixelHeight = r.getPixelsHigh;
r.description = r.getDescription;
cc.js.get(r, "pixelWidth", r.getPixelWidth);
cc.js.get(r, "pixelHeight", r.getPixelHeight);
cc.js.get(r, "_glID", r.getName);
cc.Class._fastDefine("cc.SpriteFrame", cc.SpriteFrame, []);
cc.js.value(cc.SpriteFrame, "$super", cc.Asset);
(r = cc.SpriteFrame.prototype)._setTexture = r.setTexture;
r._initWithTexture = r.initWithTexture;
cc.js.mixin(r, cc.EventTarget.prototype);
r._ctor = function(t, e, i, n, o) {
this._name = "";
this.insetTop = 0;
this.insetBottom = 0;
this.insetLeft = 0;
this.insetRight = 0;
void 0 !== t && this.initWithTexture(t, e, i, n, o);
};
r.textureLoaded = function() {
return null !== this.getTexture();
};
r.setTexture = function(t, e, i, n, o) {
e && this.setRect(e);
n && this.setOffset(n);
o && this.setOriginalSize(o);
this.setRotated(i || !1);
var r = t;
if (cc.js.isString(t)) {
this._textureFilename = t;
this._loadTexture();
} else r instanceof cc.Texture2D && this._refreshTexture(r);
return !0;
};
r.initWithTexture = r.setTexture;
r._loadTexture = function() {
if (this._textureFilename) {
var t = cc.textureCache.addImage(this._textureFilename);
this._refreshTexture(t);
}
};
r.ensureLoadTexture = function() {
this._texture || this._loadTexture();
};
r.clearTexture = function() {
this._setTexture(null);
};
r._refreshTexture = function(t) {
if (this.getTexture() !== t) {
var e = t.width, i = t.height, n = this.getRect();
0 === n.width || 0 === n.height ? n = cc.rect(0, 0, e, i) : this._checkRect(t);
var o = this.getOriginalSize();
0 !== o.width && 0 !== o.height || (o = cc.size(e, i));
var r = this.getOffset(), s = this.isRotated();
this._initWithTexture(t, n, s, r, o);
this.emit("load");
}
};
r._deserialize = function(t, e) {
var i = t.rect;
i && this.setRect(new cc.Rect(i[0], i[1], i[2], i[3]));
t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1]));
t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1]));
this.setRotated(1 === t.rotated);
this._name = t.name;
var n = t.capInsets;
if (n) {
this.insetLeft = n[0];
this.insetTop = n[1];
this.insetRight = n[2];
this.insetBottom = n[3];
}
var o = t.texture;
if (o) {
var r = e.customEnv && e.customEnv.deferredLoadRaw ? "_textureFilename" : "_textureFilenameSetter";
e.result.push(this, r, o);
}
};
r._checkRect = function(t) {
var e = this.getRect(), i = e.x, n = e.y;
if (this.isRotated()) {
i += e.height;
n += e.width;
} else {
i += e.width;
n += e.height;
}
i > t.getPixelWidth() && cc.errorID(3300, t.url);
n > t.getPixelHeight() && cc.errorID(3400, t.url);
};
r._getTexture = r.getTexture;
r.getTexture = function() {
var t = this._getTexture();
this._texture = t;
return t;
};
r._clone = r.clone;
r.clone = function() {
var t = this._clone();
t._name = this._name;
t.insetTop = this.insetTop;
t.insetBottom = this.insetBottom;
t.insetLeft = this.insetLeft;
t.insetRight = this.insetRight;
return t;
};
cc.js.set(r, "_textureFilenameSetter", (function(t) {
this._textureFilename = t;
t && this._loadTexture();
}));
cc.js.getset(r, "name", (function() {
return this._name;
}), (function(t) {
this._name = t;
}));
}), {
"../cocos2d/core/assets/CCAsset": 25,
"../cocos2d/core/platform/CCClass": 133
} ],
210: [ (function(t, e, i) {
"use strict";
if (!cc.runtime) {
var n = cc.TMXObject.prototype;
cc.defineGetterSetter(n, "type", n.getType, null);
cc.defineGetterSetter(n, "name", n.getObjectName, n.setObjectName);
cc.defineGetterSetter(n, "id", n.getId, null);
cc.defineGetterSetter(n, "gid", n.getGid, null);
cc.defineGetterSetter(n, "offset", n.getOffset, null);
cc.defineGetterSetter(n, "objectSize", n.getObjectSize, null);
cc.defineGetterSetter(n, "objectVisible", n.getObjectVisible, null);
cc.defineGetterSetter(n, "objectRotation", n.getObjectRotation, null);
cc.defineGetterSetter(n, "sgNode", n.getNode, null);
}
}), {} ],
211: [ (function(t, e, i) {
cc.VideoPlayer = ccui.VideoPlayer;
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (cc.VideoPlayer = {});
cc.VideoPlayer.EventType = {
PLAYING: 0,
PAUSED: 1,
STOPPED: 2,
COMPLETED: 3,
META_LOADED: 4,
CLICKED: 5,
READY_TO_PLAY: 6
};
}), {} ],
212: [ (function(t, e, i) {
cc.WebView = ccui.WebView;
cc.sys.os !== cc.sys.OS_OSX && cc.sys.os !== cc.sys.OS_WINDOWS || (cc.WebView = {});
cc.WebView.EventType = {
LOADING: 0,
LOADED: 1,
ERROR: 2,
JS_EVALUATED: 3
};
}), {} ],
213: [ (function(i, n, o) {
Math.sign || (Math.sign = function(t) {
return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
});
Number.isInteger || (Number.isInteger = function(i) {
return "number" === ("object" == (e = typeof i) ? t(i) : e) && (0 | i) === i;
});
var r = window.performance || Date, s = Object.create(null);
console.time = function(t) {
s[t] = r.now();
};
console.timeEnd = function(t) {
var e = s[t], i = r.now() - e;
console.log(t + ": " + i + "ms");
};
}), {} ],
214: [ (function(i, n, o) {
String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
e = e || 0;
return this.lastIndexOf(t, e) === e;
});
String.prototype.endsWith || (String.prototype.endsWith = function(i, n) {
("undefined" === ("object" == (e = typeof n) ? t(n) : e) || n > this.length) && (n = this.length);
n -= i.length;
var o = this.indexOf(i, n);
return -1 !== o && o === n;
});
}), {} ],
215: [ (function(i, n, o) {
var r = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(t, e) {
t.__proto__ = e;
} || function(t, e) {
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
};
window.__extends = function(t, e) {
function i() {
this.constructor = t;
}
r(t, e);
t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
};
window.__assign = Object.assign || function(t) {
for (var e, i = 1, n = arguments.length; i < n; i++) {
e = arguments[i];
for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
}
return t;
};
window.__rest = function(i, n) {
var o = {};
for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && n.indexOf(r) < 0 && (o[r] = i[r]);
if (null != i && "function" === ("object" == (e = typeof Object.getOwnPropertySymbols) ? t(Object.getOwnPropertySymbols) : e)) {
var s = 0;
for (r = Object.getOwnPropertySymbols(i); s < r.length; s++) n.indexOf(r[s]) < 0 && (o[r[s]] = i[r[s]]);
}
return o;
};
window.__decorate = function(i, n, o, r) {
var s, c = arguments.length, a = c < 3 ? n : null === r ? r = Object.getOwnPropertyDescriptor(n, o) : r;
if ("object" === ("object" == (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" == (e = typeof Reflect.decorate) ? t(Reflect.decorate) : e)) a = Reflect.decorate(i, n, o, r); else for (var h = i.length - 1; h >= 0; h--) (s = i[h]) && (a = (c < 3 ? s(a) : c > 3 ? s(n, o, a) : s(n, o)) || a);
return c > 3 && a && Object.defineProperty(n, o, a), a;
};
window.__param = function(t, e) {
return function(i, n) {
e(i, n, t);
};
};
window.__metadata = function(i, n) {
if ("object" === ("object" == (e = typeof Reflect) ? t(Reflect) : e) && "function" === ("object" == (e = typeof Reflect.metadata) ? t(Reflect.metadata) : e)) return Reflect.metadata(i, n);
};
window.__awaiter = function(t, e, i, n) {
return new (i || (i = Promise))(function(o, r) {
function s(t) {
try {
a(n.next(t));
} catch (t) {
r(t);
}
}
function c(t) {
try {
a(n.throw(t));
} catch (t) {
r(t);
}
}
function a(t) {
t.done ? o(t.value) : new i(function(e) {
e(t.value);
}).then(s, c);
}
a((n = n.apply(t, e || [])).next());
});
};
window.__generator = function(i, n) {
function o(t) {
return function(e) {
return (function(t) {
if (r) throw new TypeError("Generator is already executing.");
for (;h; ) try {
if (r = 1, s && (c = s[2 & t[0] ? "return" : t[0] ? "throw" : "next"]) && !(c = c.call(s, t[1])).done) return c;
(s = 0, c) && (t = [ 0, c.value ]);
switch (t[0]) {
case 0:
case 1:
c = t;
break;

case 4:
h.label++;
return {
value: t[1],
done: !1
};

case 5:
h.label++;
s = t[1];
t = [ 0 ];
continue;

case 7:
t = h.ops.pop();
h.trys.pop();
continue;

default:
if (!(c = h.trys, c = c.length > 0 && c[c.length - 1]) && (6 === t[0] || 2 === t[0])) {
h = 0;
continue;
}
if (3 === t[0] && (!c || t[1] > c[0] && t[1] < c[3])) {
h.label = t[1];
break;
}
if (6 === t[0] && h.label < c[1]) {
h.label = c[1];
c = t;
break;
}
if (c && h.label < c[2]) {
h.label = c[2];
h.ops.push(t);
break;
}
c[2] && h.ops.pop();
h.trys.pop();
continue;
}
t = n.call(i, h);
} catch (e) {
t = [ 6, e ];
s = 0;
} finally {
r = c = 0;
}
if (5 & t[0]) throw t[1];
return {
value: t[0] ? t[1] : void 0,
done: !0
};
})([ t, e ]);
};
}
var r, s, c, a, h = {
label: 0,
sent: function() {
if (1 & c[0]) throw c[1];
return c[1];
},
trys: [],
ops: []
};
return a = {
next: o(0),
throw: o(1),
return: o(2)
}, "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && (a[Symbol.iterator] = function() {
return this;
}), a;
};
window.__exportStar = function(t, e) {
for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i]);
};
window.__values = function(i) {
var n = "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator], o = 0;
return n ? n.call(i) : {
next: function() {
i && o >= i.length && (i = void 0);
return {
value: i && i[o++],
done: !i
};
}
};
};
window.__read = function(i, n) {
var o = "function" === ("object" == (e = typeof Symbol) ? t(Symbol) : e) && i[Symbol.iterator];
if (!o) return i;
var r, s, c = o.call(i), a = [];
try {
for (;(void 0 === n || n-- > 0) && !(r = c.next()).done; ) a.push(r.value);
} catch (t) {
s = {
error: t
};
} finally {
try {
r && !r.done && (o = c.return) && o.call(c);
} finally {
if (s) throw s.error;
}
}
return a;
};
window.__spread = function() {
for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
return t;
};
window.__await = function(t) {
return this instanceof __await ? (this.v = t, this) : new __await(t);
};
window.__asyncGenerator = function(t, e, i) {
function n(t) {
h[t] && (a[t] = function(e) {
return new Promise(function(i, n) {
l.push([ t, e, i, n ]) > 1 || o(t, e);
});
});
}
function o(t, e) {
try {
!(function(t) {
t.value instanceof __await ? Promise.resolve(t.value.v).then(r, s) : c(l[0][2], t);
})(h[t](e));
} catch (t) {
c(l[0][3], t);
}
}
function r(t) {
o("next", t);
}
function s(t) {
o("throw", t);
}
function c(t, e) {
(t(e), l.shift(), l.length) && o(l[0][0], l[0][1]);
}
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var a, h = i.apply(t, e || []), l = [];
return a = {}, n("next"), n("throw"), n("return"), a[Symbol.asyncIterator] = function() {
return this;
}, a;
};
window.__asyncDelegator = function(t) {
function e(e, o) {
t[e] && (i[e] = function(i) {
return (n = !n) ? {
value: __await(t[e](i)),
done: "return" === e
} : o ? o(i) : i;
});
}
var i, n;
return i = {}, e("next"), e("throw", (function(t) {
throw t;
})), e("return"), i[Symbol.iterator] = function() {
return this;
}, i;
};
window.__asyncValues = function(i) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var n = i[Symbol.asyncIterator];
return n ? n.call(i) : "function" === ("object" == (e = typeof __values) ? t(__values) : e) ? __values(i) : i[Symbol.iterator]();
};
}), {} ]
}, {}, [ 193 ]);
var e = "";
})();