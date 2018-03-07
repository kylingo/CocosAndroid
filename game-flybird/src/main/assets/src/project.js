require = function e(t, n, i) {
function s(c, a) {
if (!n[c]) {
if (!t[c]) {
var r = "function" == typeof require && require;
if (!a && r) return r(c, !0);
if (o) return o(c, !0);
var p = new Error("Cannot find module '" + c + "'");
throw p.code = "MODULE_NOT_FOUND", p;
}
var u = n[c] = {
exports: {}
};
t[c][0].call(u.exports, function(e) {
var n = t[c][1][e];
return s(n || e);
}, u, u.exports, e, t, n, i);
}
return n[c].exports;
}
for (var o = "function" == typeof require && require, c = 0; c < i.length; c++) s(i[c]);
return s;
}({
CollisionProxy: [ function(e, t, n) {
"use strict";
function i(e) {
this.realListener.onCollisionEnter(e);
}
function s(e) {
this.realListener.onCollisionStay(e);
}
function o(e) {
this.realListener.onCollisionExit(e);
}
cc._RF.push(t, "6cd7aG5qipG8Z9+eOwNmn3m", "CollisionProxy");
cc.Class({
extends: cc.Component,
properties: {
realListener: cc.Component
},
onLoad: function() {
this.onCollisionEnter = null;
this.onCollisionStay = null;
this.onCollisionExit = null;
if (this.realListener) {
this.realListener.onCollisionEnter && (this.onCollisionEnter = i);
this.realListener.onCollisionStay && (this.onCollisionStay = s);
this.realListener.onCollisionExit && (this.onCollisionExit = o);
}
}
});
cc._RF.pop();
}, {} ],
Dust: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "97ca5Hx+7VEy425oaf76L9U", "Dust");
cc.Class({
extends: cc.Component,
properties: {
anim: cc.Animation
},
playAnim: function(e) {
this.anim.play(e);
},
finish: function() {
this.node.removeFromParent();
cc.pool.putInPool(this);
}
});
cc._RF.pop();
}, {} ],
GameManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "327f03mWlNHJqsi+VEpOBXC", "GameManager");
var i = e("Sheep"), s = (e("Scroller"), cc.Enum({
Menu: -1,
Run: -1,
Over: -1
})), o = cc.Class({
extends: cc.Component,
properties: {
sheep: i,
gameOverMenu: cc.Node,
scoreText: cc.Label,
gameBgAudio: {
default: null,
url: cc.AudioClip
},
dieAudio: {
default: null,
url: cc.AudioClip
},
gameOverAudio: {
default: null,
url: cc.AudioClip
},
scoreAudio: {
default: null,
url: cc.AudioClip
}
},
statics: {
State: s
},
onLoad: function() {
D.GameManager = o;
D.game = this;
cc.director.getCollisionManager().enabled = !0;
this.state = s.Menu;
this.score = 0;
this.scoreText.string = this.score;
this.gameOverMenu.active = !1;
this.sheep.init();
},
start: function() {
this.state = s.Run;
this.score = 0;
D.pipeManager.startSpawn();
this.sheep.startRun();
},
gameOver: function() {
cc.audioEngine.stopMusic(this.gameBgAudio);
cc.audioEngine.playEffect(this.dieAudio);
cc.audioEngine.playEffect(this.gameOverAudio);
D.pipeManager.reset();
this.state = s.Over;
this.gameOverMenu.active = !0;
this.gameOverMenu.getComponent("GameOverMenu").score.string = this.score;
},
gainScore: function() {
this.score++;
this.scoreText.string = this.score;
cc.audioEngine.playEffect(this.scoreAudio);
}
});
cc._RF.pop();
}, {
Scroller: "Scroller",
Sheep: "Sheep"
} ],
GameOverMenu: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "42ba7gAyfpGZqXEsckB6M2a", "GameOverMenu");
cc.Class({
extends: cc.Component,
properties: {
btn_play: cc.Button,
score: cc.Label
},
restart: function() {
cc.director.loadScene("Game");
}
});
cc._RF.pop();
}, {} ],
Globals: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "67384+vJYpFIbOgxpXpv1wf", "Globals");
window.D = {
GameManager: null,
game: null,
pipeManager: null
};
cc._RF.pop();
}, {} ],
PipeGroupManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ded04ocxo1Pcopg6kafVPGn", "PipeGroupManager");
var i = e("PipeGroup");
cc.Class({
extends: cc.Component,
properties: {
pipePrefab: cc.Prefab,
pipeLayer: cc.Node,
initPipeX: 0,
spawnInterval: 0
},
onLoad: function() {
D.pipeManager = this;
},
startSpawn: function() {
this.spawnPipe();
this.schedule(this.spawnPipe, this.spawnInterval);
},
spawnPipe: function() {
var e = null;
e = cc.pool.hasObject(i) ? cc.pool.getFromPool(i) : cc.instantiate(this.pipePrefab).getComponent(i);
this.pipeLayer.addChild(e.node);
e.node.active = !0;
e.node.x = this.initPipeX;
},
despawnPipe: function(e) {
e.node.removeFromParent();
e.node.active = !1;
cc.pool.putInPool(e);
},
reset: function() {
this.unschedule(this.spawnPipe);
}
});
cc._RF.pop();
}, {
PipeGroup: "PipeGroup"
} ],
PipeGroup: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5026dczn8lKZpq2Z+LGadpZ", "PipeGroup");
cc.Class({
extends: cc.Component,
properties: {
speed: 0,
botYRange: cc.p(0, 0),
spacingRange: cc.p(0, 0),
topPipe: cc.Node,
botPipe: cc.Node
},
onEnable: function() {
var e = this.botYRange.x + Math.random() * (this.botYRange.y - this.botYRange.x), t = e + (this.spacingRange.x + Math.random() * (this.spacingRange.y - this.spacingRange.x));
this.topPipe.y = t;
this.botPipe.y = e;
},
update: function(e) {
if (D.game.state === D.GameManager.State.Run) {
this.node.x += this.speed * e;
this.node.getBoundingBoxToWorld().xMax < 0 && D.pipeManager.despawnPipe(this);
}
}
});
cc._RF.pop();
}, {} ],
Scroller: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b90489JvD1O1pgXMQXSKGr7", "Scroller");
cc.Class({
extends: cc.Component,
properties: {
speed: 0,
resetX: 0
},
update: function(e) {
if (D.game.state === D.GameManager.State.Run) {
var t = this.node.x;
(t += this.speed * e) <= this.resetX && (t -= this.resetX);
this.node.x = t;
}
}
});
cc._RF.pop();
}, {} ],
Sheep: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ff4b8pGzIRNxZt3wHXtOqB+", "Sheep");
var i = cc.Enum({
None: -1,
Run: -1,
Jump: -1,
Drop: -1,
DropEnd: -1,
Dead: -1
}), s = e("Dust"), o = cc.Class({
extends: cc.Component,
properties: {
maxY: 0,
groundY: 0,
gravity: 0,
initJumpSpeed: 0,
_state: {
default: i.None,
type: i,
visible: !1
},
state: {
get: function() {
return this._state;
},
set: function(e) {
if (e !== this._state) {
this._state = e;
if (this._state !== i.None) {
var t = i[this._state];
this.anim.stop();
this.anim.play(t);
}
}
},
type: i
},
jumpAudio: {
default: null,
url: cc.AudioClip
},
dustPrefab: cc.Prefab
},
statics: {
State: i
},
init: function() {
this.anim = this.getComponent(cc.Animation);
this.currentSpeed = 0;
this.sprite = this.getComponent(cc.Sprite);
this.registerInput();
},
startRun: function() {
this.state = i.Run;
this.enableInput(!0);
},
registerInput: function() {
cc.eventManager.addListener({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(e, t) {
this.jump();
}.bind(this)
}, this.node);
cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
onTouchBegan: function(e, t) {
this.jump();
return !0;
}.bind(this)
}, this.node);
},
enableInput: function(e) {
e ? cc.eventManager.resumeTarget(this.node) : cc.eventManager.pauseTarget(this.node);
},
update: function(e) {
switch (this.state) {
case i.Jump:
this.currentSpeed < 0 && (this.state = i.Drop);
break;

case i.Drop:
if (this.node.y < this.groundY) {
this.node.y = this.groundY;
this.state = i.DropEnd;
this.spawnDust("DustDown");
}
break;

case i.None:
case i.Dead:
return;
}
if (this.state === i.Jump || this.node.y > this.groundY) {
this.currentSpeed -= e * this.gravity;
this.node.y += e * this.currentSpeed;
}
},
onDropFinished: function() {
this.state = i.Run;
},
onCollisionEnter: function(e) {
if (this.state !== i.Dead) {
var t = cc.game.groupList[e.node.groupIndex];
if ("Obstacle" === t) {
this.state = o.State.Dead;
D.game.gameOver();
this.enableInput(!1);
} else "NextPipe" === t && D.game.gainScore();
}
},
jump: function() {
this.state = i.Jump;
this.currentSpeed = this.initJumpSpeed;
cc.audioEngine.playEffect(this.jumpAudio);
this.spawnDust("DustUp");
},
spawnDust: function(e) {
var t = null;
t = cc.pool.hasObject(s) ? cc.pool.getFromPool(s) : cc.instantiate(this.dustPrefab).getComponent(s);
this.node.parent.addChild(t.node);
t.node.position = this.node.position;
t.playAnim(e);
}
});
cc._RF.pop();
}, {
Dust: "Dust"
} ]
}, {}, [ "Dust", "GameManager", "GameOverMenu", "Globals", "PipeGroup", "PipeGroupManager", "Scroller", "Sheep", "CollisionProxy" ]);