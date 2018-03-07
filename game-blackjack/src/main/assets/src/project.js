require = function t(e, i, n) {
function o(s, r) {
if (!i[s]) {
if (!e[s]) {
var c = "function" == typeof require && require;
if (!r && c) return c(s, !0);
if (a) return a(s, !0);
var u = new Error("Cannot find module '" + s + "'");
throw u.code = "MODULE_NOT_FOUND", u;
}
var h = i[s] = {
exports: {}
};
e[s][0].call(h.exports, function(t) {
var i = e[s][1][t];
return o(i || t);
}, h, h.exports, t, e, i, n);
}
return i[s].exports;
}
for (var a = "function" == typeof require && require, s = 0; s < n.length; s++) o(n[s]);
return o;
}({
ActorRenderer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "1a792KO87NBg7vCCIp1jq+j", "ActorRenderer");
var n = t("Game"), o = t("Types"), a = t("Utils"), s = o.ActorPlayingState;
cc.Class({
extends: cc.Component,
properties: {
playerInfo: cc.Node,
stakeOnTable: cc.Node,
cardInfo: cc.Node,
cardPrefab: cc.Prefab,
anchorCards: cc.Node,
spPlayerName: cc.Sprite,
labelPlayerName: cc.Label,
labelTotalStake: cc.Label,
spPlayerPhoto: cc.Sprite,
callCounter: cc.ProgressBar,
labelStakeOnTable: cc.Label,
spChips: {
default: [],
type: cc.Sprite
},
labelCardInfo: cc.Label,
spCardInfo: cc.Sprite,
animFX: cc.Node,
cardSpace: 0
},
onLoad: function() {},
init: function(t, e, i, o, a) {
this.actor = this.getComponent("Actor");
this.isCounting = !1;
this.counterTimer = 0;
this.turnDuration = o;
this.playerInfo.position = e;
this.stakeOnTable.position = i;
this.labelPlayerName.string = t.name;
this.updateTotalStake(t.gold);
var s = t.photoIdx % 5;
this.spPlayerPhoto.spriteFrame = n.instance.assetMng.playerPhotos[s];
this.animFX = this.animFX.getComponent("FXPlayer");
this.animFX.init();
this.animFX.show(!1);
this.cardInfo.active = !1;
if (a) {
this.spCardInfo.getComponent("SideSwitcher").switchSide();
this.spPlayerName.getComponent("SideSwitcher").switchSide();
}
},
update: function(t) {
if (this.isCounting) {
this.callCounter.progress = this.counterTimer / this.turnDuration;
this.counterTimer += t;
if (this.counterTimer >= this.turnDuration) {
this.isCounting = !1;
this.callCounter.progress = 1;
}
}
},
initDealer: function() {
this.actor = this.getComponent("Actor");
this.animFX = this.animFX.getComponent("FXPlayer");
this.animFX.init();
this.animFX.show(!1);
},
updateTotalStake: function(t) {
this.labelTotalStake.string = "$" + t;
},
startCountdown: function() {
if (this.callCounter) {
this.isCounting = !0;
this.counterTimer = 0;
}
},
resetCountdown: function() {
if (this.callCounter) {
this.isCounting = !1;
this.counterTimer = 0;
this.callCounter.progress = 0;
}
},
playBlackJackFX: function() {
this.animFX.playFX("blackjack");
},
playBustFX: function() {
this.animFX.playFX("bust");
},
onDeal: function(t, e) {
var i = cc.instantiate(this.cardPrefab).getComponent("Card");
this.anchorCards.addChild(i.node);
i.init(t);
i.reveal(e);
var n = cc.p(0, 0), o = this.actor.cards.length - 1, a = cc.p(this.cardSpace * o, 0);
i.node.setPosition(n);
this._updatePointPos(a.x);
var s = cc.moveTo(.5, a), r = cc.callFunc(this._onDealEnd, this);
i.node.runAction(cc.sequence(s, r));
},
_onDealEnd: function(t) {
this.resetCountdown();
this.actor.state === s.Normal && this.startCountdown();
this.updatePoint();
},
onReset: function() {
this.cardInfo.active = !1;
this.anchorCards.removeAllChildren();
this._resetChips();
},
onRevealHoldCard: function() {
cc.find("cardPrefab", this.anchorCards).getComponent("Card").reveal(!0);
this.updateState();
},
updatePoint: function() {
this.cardInfo.active = !0;
this.labelCardInfo.string = this.actor.bestPoint;
switch (this.actor.hand) {
case o.Hand.BlackJack:
this.animFX.show(!0);
this.animFX.playFX("blackjack");
break;

case o.Hand.FiveCard:
}
},
_updatePointPos: function(t) {
this.cardInfo.setPosition(t + 50, 0);
},
showStakeChips: function(t) {
var e = this.spChips, i = 0;
t > 5e4 ? i = 5 : t > 25e3 ? i = 4 : t > 1e4 ? i = 3 : t > 5e3 ? i = 2 : t > 0 && (i = 1);
for (var n = 0; n < i; ++n) e[n].enabled = !0;
},
_resetChips: function() {
for (var t = 0; t < this.spChips.length; ++t) this.spChips.enabled = !1;
},
updateState: function() {
switch (this.actor.state) {
case s.Normal:
this.cardInfo.active = !0;
this.spCardInfo.spriteFrame = n.instance.assetMng.texCardInfo;
this.updatePoint();
break;

case s.Bust:
var t = a.getMinMaxPoint(this.actor.cards).min;
this.labelCardInfo.string = "爆牌(" + t + ")";
this.spCardInfo.spriteFrame = n.instance.assetMng.texBust;
this.cardInfo.active = !0;
this.animFX.show(!0);
this.animFX.playFX("bust");
this.resetCountdown();
break;

case s.Stand:
var e = a.getMinMaxPoint(this.actor.cards).max;
this.labelCardInfo.string = "停牌(" + e + ")";
this.spCardInfo.spriteFrame = n.instance.assetMng.texCardInfo;
this.resetCountdown();
}
}
});
cc._RF.pop();
}, {
Game: "Game",
Types: "Types",
Utils: "Utils"
} ],
Actor: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "7d008dTf6xB2Z0wCAdzh1Rx", "Actor");
var n = t("Types"), o = t("Utils"), a = n.ActorPlayingState;
cc.Class({
extends: cc.Component,
properties: {
cards: {
default: [],
serializable: !1,
visible: !1
},
holeCard: {
default: null,
serializable: !1,
visible: !1
},
bestPoint: {
get: function() {
return o.getMinMaxPoint(this.cards).max;
}
},
hand: {
get: function() {
var t = this.cards.length;
this.holeCard && ++t;
return t >= 5 ? n.Hand.FiveCard : 2 === t && 21 === this.bestPoint ? n.Hand.BlackJack : n.Hand.Normal;
}
},
canReport: {
get: function() {
return this.hand !== n.Hand.Normal;
},
visible: !1
},
renderer: {
default: null,
type: cc.Node
},
state: {
default: a.Normal,
notify: function(t) {
this.state !== t && this.renderer.updateState();
},
type: a,
serializable: !1
}
},
init: function() {
this.ready = !0;
this.renderer = this.getComponent("ActorRenderer");
},
addCard: function(t) {
this.cards.push(t);
this.renderer.onDeal(t, !0);
var e = this.holeCard ? [ this.holeCard ].concat(this.cards) : this.cards;
o.isBust(e) && (this.state = a.Bust);
},
addHoleCard: function(t) {
this.holeCard = t;
this.renderer.onDeal(t, !1);
},
stand: function() {
this.state = a.Stand;
},
revealHoldCard: function() {
if (this.holeCard) {
this.cards.unshift(this.holeCard);
this.holeCard = null;
this.renderer.onRevealHoldCard();
}
},
report: function() {
this.state = a.Report;
},
reset: function() {
this.cards = [];
this.holeCard = null;
this.reported = !1;
this.state = a.Normal;
this.renderer.onReset();
}
});
cc._RF.pop();
}, {
Types: "Types",
Utils: "Utils"
} ],
AssetMng: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "54522LcoVpPHbrqYgwp/1Qm", "AssetMng");
cc.Class({
extends: cc.Component,
properties: {
texBust: cc.SpriteFrame,
texCardInfo: cc.SpriteFrame,
texCountdown: cc.SpriteFrame,
texBetCountdown: cc.SpriteFrame,
playerPhotos: [ cc.SpriteFrame ]
}
});
cc._RF.pop();
}, {} ],
AudioMng: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "01ca4tStvVH+JmZ5TNcmuAu", "AudioMng");
cc.Class({
extends: cc.Component,
properties: {
winAudio: {
default: null,
url: cc.AudioClip
},
loseAudio: {
default: null,
url: cc.AudioClip
},
cardAudio: {
default: null,
url: cc.AudioClip
},
buttonAudio: {
default: null,
url: cc.AudioClip
},
chipsAudio: {
default: null,
url: cc.AudioClip
},
bgm: {
default: null,
url: cc.AudioClip
}
},
playMusic: function() {
cc.audioEngine.playMusic(this.bgm, !0);
},
pauseMusic: function() {
cc.audioEngine.pauseMusic();
},
resumeMusic: function() {
cc.audioEngine.resumeMusic();
},
_playSFX: function(t) {
cc.audioEngine.playEffect(t, !1);
},
playWin: function() {
this._playSFX(this.winAudio);
},
playLose: function() {
this._playSFX(this.loseAudio);
},
playCard: function() {
this._playSFX(this.cardAudio);
},
playChips: function() {
this._playSFX(this.chipsAudio);
},
playButton: function() {
this._playSFX(this.buttonAudio);
}
});
cc._RF.pop();
}, {} ],
Bet: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "28f38yToT1Pw7NgyeCvRxDC", "Bet");
var n = t("Game");
cc.Class({
extends: cc.Component,
properties: {
chipPrefab: cc.Prefab,
btnChips: {
default: [],
type: cc.Node
},
chipValues: {
default: [],
type: "Integer"
},
anchorChipToss: cc.Node
},
init: function() {
this._registerBtns();
},
_registerBtns: function() {
for (var t = this, e = 0; e < t.btnChips.length; ++e) !function(i) {
t.btnChips[e].on("touchstart", function(e) {
n.instance.addStake(t.chipValues[i]) && t.playAddChip();
}, this);
}(e);
},
playAddChip: function() {
var t = cc.p(50 * cc.randomMinus1To1(), 50 * cc.randomMinus1To1()), e = cc.instantiate(this.chipPrefab);
this.anchorChipToss.addChild(e);
e.setPosition(t);
e.getComponent("TossChip").play();
},
resetChips: function() {
n.instance.resetStake();
n.instance.info.enabled = !1;
this.resetTossedChips();
},
resetTossedChips: function() {
this.anchorChipToss.removeAllChildren();
}
});
cc._RF.pop();
}, {
Game: "Game"
} ],
ButtonScaler: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "a171dSnCXFMRIqs1IWdvgWM", "ButtonScaler");
cc.Class({
extends: cc.Component,
properties: {
pressedScale: 1,
transDuration: 0
},
onLoad: function() {
function t(t) {
this.stopAllActions();
this.runAction(e.scaleUpAction);
}
var e = this, i = cc.find("Menu/AudioMng") || cc.find("Game/AudioMng");
i && (i = i.getComponent("AudioMng"));
e.initScale = this.node.scale;
e.button = e.getComponent(cc.Button);
e.scaleDownAction = cc.scaleTo(e.transDuration, e.pressedScale);
e.scaleUpAction = cc.scaleTo(e.transDuration, e.initScale);
this.node.on("touchstart", function(t) {
this.stopAllActions();
i && i.playButton();
this.runAction(e.scaleDownAction);
}, this.node);
this.node.on("touchend", t, this.node);
this.node.on("touchcancel", t, this.node);
}
});
cc._RF.pop();
}, {} ],
Card: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ab67e5QkiVCBZ3DIMlWhiAt", "Card");
cc.Class({
extends: cc.Component,
properties: {
point: cc.Label,
suit: cc.Sprite,
mainPic: cc.Sprite,
cardBG: cc.Sprite,
redTextColor: cc.Color.WHITE,
blackTextColor: cc.Color.WHITE,
texFrontBG: cc.SpriteFrame,
texBackBG: cc.SpriteFrame,
texFaces: {
default: [],
type: cc.SpriteFrame
},
texSuitBig: {
default: [],
type: cc.SpriteFrame
},
texSuitSmall: {
default: [],
type: cc.SpriteFrame
}
},
init: function(t) {
var e = t.point > 10;
this.mainPic.spriteFrame = e ? this.texFaces[t.point - 10 - 1] : this.texSuitBig[t.suit - 1];
this.point.string = t.pointName;
t.isRedSuit ? this.point.node.color = this.redTextColor : this.point.node.color = this.blackTextColor;
this.suit.spriteFrame = this.texSuitSmall[t.suit - 1];
},
reveal: function(t) {
this.point.node.active = t;
this.suit.node.active = t;
this.mainPic.node.active = t;
this.cardBG.spriteFrame = t ? this.texFrontBG : this.texBackBG;
}
});
cc._RF.pop();
}, {} ],
Dealer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "ce2dfoqEulHCLjS1Z9xPN7t", "Dealer");
var n = t("Actor"), o = t("Utils");
cc.Class({
extends: n,
properties: {
bestPoint: {
get: function() {
var t = this.holeCard ? [ this.holeCard ].concat(this.cards) : this.cards;
return o.getMinMaxPoint(t).max;
},
override: !0
}
},
init: function() {
this._super();
this.renderer.initDealer();
},
wantHit: function() {
var e = t("Game"), i = t("Types"), n = this.bestPoint;
if (21 === n) return !1;
if (n <= 11) return !0;
var o = e.instance.player;
switch (e.instance._getPlayerResult(o, this)) {
case i.Outcome.Win:
return !0;

case i.Outcome.Lose:
return !1;
}
return this.bestPoint < 17;
}
});
cc._RF.pop();
}, {
Actor: "Actor",
Game: "Game",
Types: "Types",
Utils: "Utils"
} ],
Decks: [ function(t, e, i) {
"use strict";
function n(t) {
this._numberOfDecks = t;
this._cardIds = new Array(52 * t);
this.reset();
}
cc._RF.push(e, "17024G0JFpHcLI5GREbF8VN", "Decks");
var o = t("Types");
n.prototype.reset = function() {
this._cardIds.length = 52 * this._numberOfDecks;
for (var t = 0, e = o.Card.fromId, i = 0; i < this._numberOfDecks; ++i) for (var n = 0; n < 52; ++n) {
this._cardIds[t] = e(n);
++t;
}
};
n.prototype.draw = function() {
var t = this._cardIds, e = t.length;
if (0 === e) return null;
var i = Math.random() * e | 0, n = t[i], o = t[e - 1];
t[i] = o;
t.length = e - 1;
return n;
};
e.exports = n;
cc._RF.pop();
}, {
Types: "Types"
} ],
FXPlayer: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "68da2yjdGVMSYhXLN9DukIB", "FXPlayer");
cc.Class({
extends: cc.Component,
init: function() {
this.anim = this.getComponent(cc.Animation);
this.sprite = this.getComponent(cc.Sprite);
},
show: function(t) {
this.sprite.enabled = t;
},
playFX: function(t) {
this.anim.stop();
this.anim.play(t);
},
hideFX: function() {
this.sprite.enabled = !1;
}
});
cc._RF.pop();
}, {} ],
Game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "63738OONCFKHqsf4QSeJSun", "Game");
var n = t("PlayerData").players, o = t("Decks"), a = t("Types"), s = a.ActorPlayingState, r = t("game-fsm"), c = cc.Class({
extends: cc.Component,
properties: {
playerAnchors: {
default: [],
type: cc.Node
},
playerPrefab: cc.Prefab,
dealer: cc.Node,
inGameUI: cc.Node,
betUI: cc.Node,
assetMng: cc.Node,
audioMng: cc.Node,
turnDuration: 0,
betDuration: 0,
totalChipsNum: 0,
totalDiamondNum: 0,
numberOfDecks: {
default: 1,
type: "Integer"
}
},
statics: {
instance: null
},
onLoad: function() {
c.instance = this;
this.inGameUI = this.inGameUI.getComponent("InGameUI");
this.assetMng = this.assetMng.getComponent("AssetMng");
this.audioMng = this.audioMng.getComponent("AudioMng");
this.betUI = this.betUI.getComponent("Bet");
this.inGameUI.init(this.betDuration);
this.betUI.init();
this.dealer = this.dealer.getComponent("Dealer");
this.dealer.init();
this.player = null;
this.createPlayers();
this.info = this.inGameUI.resultTxt;
this.totalChips = this.inGameUI.labelTotalChips;
this.decks = new o(this.numberOfDecks);
this.fsm = r;
this.fsm.init(this);
this.updateTotalChips();
this.audioMng.playMusic();
},
addStake: function(t) {
if (this.totalChipsNum < t) {
console.log("not enough chips!");
this.info.enabled = !0;
this.info.string = "金币不足!";
return !1;
}
this.totalChipsNum -= t;
this.updateTotalChips();
this.player.addStake(t);
this.audioMng.playChips();
this.info.enabled = !1;
this.info.string = "请下注";
return !0;
},
resetStake: function() {
this.totalChipsNum += this.player.stakeNum;
this.player.resetStake();
this.updateTotalChips();
},
updateTotalChips: function() {
this.totalChips.string = this.totalChipsNum;
this.player.renderer.updateTotalStake(this.totalChipsNum);
},
createPlayers: function() {
for (var t = 0; t < 5; ++t) {
var e = cc.instantiate(this.playerPrefab), i = this.playerAnchors[t], o = t > 2;
i.addChild(e);
e.position = cc.p(0, 0);
var a = cc.find("anchorPlayerInfo", i).getPosition(), s = cc.find("anchorStake", i).getPosition();
e.getComponent("ActorRenderer").init(n[t], a, s, this.turnDuration, o);
if (2 === t) {
this.player = e.getComponent("Player");
this.player.init();
}
}
},
hit: function() {
this.player.addCard(this.decks.draw());
this.player.state === s.Bust && this.fsm.onPlayerActed();
this.audioMng.playCard();
this.audioMng.playButton();
},
stand: function() {
this.player.stand();
this.audioMng.playButton();
this.fsm.onPlayerActed();
},
deal: function() {
this.fsm.toDeal();
this.audioMng.playButton();
},
start: function() {
this.fsm.toBet();
this.audioMng.playButton();
},
report: function() {
this.player.report();
this.fsm.onPlayerActed();
},
quitToMenu: function() {
cc.director.loadScene("menu");
},
onEnterDealState: function() {
this.betUI.resetTossedChips();
this.inGameUI.resetCountdown();
this.player.renderer.showStakeChips(this.player.stakeNum);
this.player.addCard(this.decks.draw());
var t = this.decks.draw();
this.dealer.addHoleCard(t);
this.player.addCard(this.decks.draw());
this.dealer.addCard(this.decks.draw());
this.audioMng.playCard();
this.fsm.onDealed();
},
onPlayersTurnState: function(t) {
t && this.inGameUI.showGameState();
},
onEnterDealersTurnState: function() {
for (;this.dealer.state === s.Normal; ) this.dealer.wantHit() ? this.dealer.addCard(this.decks.draw()) : this.dealer.stand();
this.fsm.onDealerActed();
},
onEndState: function(t) {
if (t) {
this.dealer.revealHoldCard();
this.inGameUI.showResultState();
switch (this._getPlayerResult(this.player, this.dealer)) {
case a.Outcome.Win:
this.info.string = "You Win";
this.audioMng.pauseMusic();
this.audioMng.playWin();
this.totalChipsNum += this.player.stakeNum;
var e = this.player.stakeNum;
!this.player.state === a.ActorPlayingState.Report && (this.player.hand === a.Hand.BlackJack ? e *= 1.5 : e *= 2);
this.totalChipsNum += e;
this.updateTotalChips();
break;

case a.Outcome.Lose:
this.info.string = "You Lose";
this.audioMng.pauseMusic();
this.audioMng.playLose();
break;

case a.Outcome.Tie:
this.info.string = "Draw";
this.totalChipsNum += this.player.stakeNum;
this.updateTotalChips();
}
}
this.info.enabled = t;
},
onBetState: function(t) {
if (t) {
this.decks.reset();
this.player.reset();
this.dealer.reset();
this.info.string = "请下注";
this.inGameUI.showBetState();
this.inGameUI.startCountdown();
this.audioMng.resumeMusic();
}
this.info.enabled = t;
},
_getPlayerResult: function(t, e) {
var i = a.Outcome;
return t.state === s.Bust ? i.Lose : e.state === s.Bust ? i.Win : t.state === s.Report ? i.Win : t.hand > e.hand ? i.Win : t.hand < e.hand ? i.Lose : t.bestPoint === e.bestPoint ? i.Tie : t.bestPoint < e.bestPoint ? i.Lose : i.Win;
}
});
cc._RF.pop();
}, {
Decks: "Decks",
PlayerData: "PlayerData",
Types: "Types",
"game-fsm": "game-fsm"
} ],
InGameUI: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "f192efroeFEyaxtfh8TVXYz", "InGameUI");
t("Game");
cc.Class({
extends: cc.Component,
properties: {
panelChat: cc.Node,
panelSocial: cc.Node,
betStateUI: cc.Node,
gameStateUI: cc.Node,
resultTxt: cc.Label,
betCounter: cc.ProgressBar,
btnStart: cc.Node,
labelTotalChips: cc.Label
},
init: function(t) {
this.panelChat.active = !1;
this.panelSocial.active = !1;
this.resultTxt.enabled = !1;
this.betStateUI.active = !0;
this.gameStateUI.active = !1;
this.btnStart.active = !1;
this.betDuration = t;
this.betTimer = 0;
this.isBetCounting = !1;
},
startCountdown: function() {
if (this.betCounter) {
this.betTimer = 0;
this.isBetCounting = !0;
}
},
resetCountdown: function() {
if (this.betCounter) {
this.betTimer = 0;
this.isBetCounting = !1;
this.betCounter.progress = 0;
}
},
showBetState: function() {
this.betStateUI.active = !0;
this.gameStateUI.active = !1;
this.btnStart.active = !1;
},
showGameState: function() {
this.betStateUI.active = !1;
this.gameStateUI.active = !0;
this.btnStart.active = !1;
},
showResultState: function() {
this.betStateUI.active = !1;
this.gameStateUI.active = !1;
this.btnStart.active = !0;
},
toggleChat: function() {
this.panelChat.active = !this.panelChat.active;
},
toggleSocial: function() {
this.panelSocial.active = !this.panelSocial.active;
},
update: function(t) {
if (this.isBetCounting) {
this.betCounter.progress = this.betTimer / this.betDuration;
this.betTimer += t;
if (this.betTimer >= this.betDuration) {
this.isBetCounting = !1;
this.betCounter.progress = 1;
}
}
}
});
cc._RF.pop();
}, {
Game: "Game"
} ],
Menu: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "20f60m+3RlGO7x2/ARzZ6Qc", "Menu");
cc.Class({
extends: cc.Component,
properties: {
audioMng: cc.Node
},
onLoad: function() {
this.audioMng = this.audioMng.getComponent("AudioMng");
this.audioMng.playMusic();
cc.director.preloadScene("table", function() {
cc.log("Next scene preloaded");
});
},
playGame: function() {
cc.director.loadScene("table");
},
update: function(t) {}
});
cc._RF.pop();
}, {} ],
ModalUI: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "54397cUxehGzqEqpMUGHejs", "ModalUI");
cc.Class({
extends: cc.Component,
properties: {
mask: cc.Node
},
onLoad: function() {},
onEnable: function() {
this.mask.on("touchstart", function(t) {
t.stopPropagation();
});
this.mask.on("touchend", function(t) {
t.stopPropagation();
});
},
onDisable: function() {
this.mask.off("touchstart", function(t) {
t.stopPropagation();
});
this.mask.off("touchend", function(t) {
t.stopPropagation();
});
}
});
cc._RF.pop();
}, {} ],
PlayerData: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "4f9c5eXxqhHAKLxZeRmgHDB", "PlayerData");
var n = [ {
name: "燃烧吧，蛋蛋儿军",
gold: 3e3,
photoIdx: 0
}, {
name: "地方政府",
gold: 2e3,
photoIdx: 1
}, {
name: "手机超人",
gold: 1500,
photoIdx: 2
}, {
name: "天灵灵，地灵灵",
gold: 500,
photoIdx: 3
}, {
name: "哟哟，切克闹",
gold: 9e3,
photoIdx: 4
}, {
name: "学姐不要死",
gold: 5e3,
photoIdx: 5
}, {
name: "提百万",
gold: 1e4,
photoIdx: 6
} ];
e.exports = {
players: n
};
cc._RF.pop();
}, {} ],
Player: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "226a2AvzRpHL7SJGTMy5PDX", "Player");
var n = t("Actor");
cc.Class({
extends: n,
init: function() {
this._super();
this.labelStake = this.renderer.labelStakeOnTable;
this.stakeNum = 0;
},
reset: function() {
this._super();
this.resetStake();
},
addCard: function(t) {
this._super(t);
},
addStake: function(t) {
this.stakeNum += t;
this.updateStake(this.stakeNum);
},
resetStake: function(t) {
this.stakeNum = 0;
this.updateStake(this.stakeNum);
},
updateStake: function(t) {
this.labelStake.string = t;
}
});
cc._RF.pop();
}, {
Actor: "Actor"
} ],
RankItem: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "1657ewfijBOXLq5zGqr6PvE", "RankItem");
cc.Class({
extends: cc.Component,
properties: {
spRankBG: cc.Sprite,
labelRank: cc.Label,
labelPlayerName: cc.Label,
labelGold: cc.Label,
spPlayerPhoto: cc.Sprite,
texRankBG: cc.SpriteFrame,
texPlayerPhoto: cc.SpriteFrame
},
init: function(t, e) {
if (t < 3) {
this.labelRank.node.active = !1;
this.spRankBG.spriteFrame = this.texRankBG[t];
} else {
this.labelRank.node.active = !0;
this.labelRank.string = (t + 1).toString();
}
this.labelPlayerName.string = e.name;
this.labelGold.string = e.gold.toString();
this.spPlayerPhoto.spriteFrame = this.texPlayerPhoto[e.photoIdx];
},
update: function(t) {}
});
cc._RF.pop();
}, {} ],
RankList: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "fe3fcIxCFFLrKHg6s5+xRUU", "RankList");
var n = t("PlayerData").players;
cc.Class({
extends: cc.Component,
properties: {
scrollView: cc.ScrollView,
prefabRankItem: cc.Prefab,
rankCount: 0
},
onLoad: function() {
this.content = this.scrollView.content;
this.populateList();
},
populateList: function() {
for (var t = 0; t < this.rankCount; ++t) {
var e = n[t], i = cc.instantiate(this.prefabRankItem);
i.getComponent("RankItem").init(t, e);
this.content.addChild(i);
}
},
update: function(t) {}
});
cc._RF.pop();
}, {
PlayerData: "PlayerData"
} ],
SideSwitcher: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "3aae7lZKyhPqqsLD3wMKl6X", "SideSwitcher");
cc.Class({
extends: cc.Component,
properties: {
retainSideNodes: {
default: [],
type: cc.Node
}
},
switchSide: function() {
this.node.scaleX = -this.node.scaleX;
for (var t = 0; t < this.retainSideNodes.length; ++t) {
var e = this.retainSideNodes[t];
e.scaleX = -e.scaleX;
}
}
});
cc._RF.pop();
}, {} ],
TossChip: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "b4eb5Lo6U1IZ4eJWuxShCdH", "TossChip");
cc.Class({
extends: cc.Component,
properties: {
anim: cc.Animation
},
play: function() {
this.anim.play("chip_toss");
}
});
cc._RF.pop();
}, {} ],
Types: [ function(t, e, i) {
"use strict";
function n(t, e) {
Object.defineProperties(this, {
point: {
value: t,
writable: !1
},
suit: {
value: e,
writable: !1
},
id: {
value: 13 * (e - 1) + (t - 1),
writable: !1
},
pointName: {
get: function() {
return a[this.point];
}
},
suitName: {
get: function() {
return o[this.suit];
}
},
isBlackSuit: {
get: function() {
return this.suit === o.Spade || this.suit === o.Club;
}
},
isRedSuit: {
get: function() {
return this.suit === o.Heart || this.suit === o.Diamond;
}
}
});
}
cc._RF.push(e, "5b633QMQxpFmYetofEvK2UD", "Types");
var o = cc.Enum({
Spade: 1,
Heart: 2,
Club: 3,
Diamond: 4
}), a = "NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
n.prototype.toString = function() {
return this.suitName + " " + this.pointName;
};
var s = new Array(52);
n.fromId = function(t) {
return s[t];
};
!function() {
for (var t = 1; t <= 4; t++) for (var e = 1; e <= 13; e++) {
var i = new n(e, t);
s[i.id] = i;
}
}();
var r = cc.Enum({
Normal: -1,
Stand: -1,
Report: -1,
Bust: -1
}), c = cc.Enum({
Win: -1,
Lose: -1,
Tie: -1
}), u = cc.Enum({
Normal: -1,
BlackJack: -1,
FiveCard: -1
});
e.exports = {
Suit: o,
Card: n,
ActorPlayingState: r,
Hand: u,
Outcome: c
};
cc._RF.pop();
}, {} ],
Utils: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "73590esk6xP9ICqhfUZalMg", "Utils");
e.exports = {
isBust: function(t) {
for (var e = 0, i = 0; i < t.length; i++) {
var n = t[i];
e += Math.min(10, n.point);
}
return e > 21;
},
getMinMaxPoint: function(t) {
for (var e = !1, i = 0, n = 0; n < t.length; n++) {
var o = t[n];
1 === o.point && (e = !0);
i += Math.min(10, o.point);
}
var a = i;
e && i + 10 <= 21 && (a += 10);
return {
min: i,
max: a
};
},
isMobile: function() {
return cc.sys.isMobile;
}
};
cc._RF.pop();
}, {} ],
"game-fsm": [ function(t, e, i) {
"use strict";
function n(t) {
return function(e) {
return e === t;
};
}
cc._RF.push(e, "6510d1SmQRMMYH8FEIA7zXq", "game-fsm");
var o, a, s, r = t("state.com"), c = !1;
i = {
init: function(t) {
r.console = console;
a = new r.StateMachine("root");
var e = new r.PseudoState("init-root", a, r.PseudoStateKind.Initial), i = new r.State("下注", a);
s = new r.State("已开局", a);
var c = new r.State("结算", a);
e.to(i);
i.to(s).when(n("deal"));
s.to(c).when(n("end"));
c.to(i).when(n("bet"));
i.entry(function() {
t.onBetState(!0);
});
i.exit(function() {
t.onBetState(!1);
});
c.entry(function() {
t.onEndState(!0);
});
c.exit(function() {
t.onEndState(!1);
});
var u = new r.PseudoState("init 已开局", s, r.PseudoStateKind.Initial), h = new r.State("发牌", s), l = new r.State("玩家决策", s), p = new r.State("庄家决策", s);
u.to(h);
h.to(l).when(n("dealed"));
l.to(p).when(n("player acted"));
h.entry(function() {
t.onEnterDealState();
});
l.entry(function() {
t.onPlayersTurnState(!0);
});
l.exit(function() {
t.onPlayersTurnState(!1);
});
p.entry(function() {
t.onEnterDealersTurnState();
});
o = new r.StateMachineInstance("fsm");
r.initialise(a, o);
},
toDeal: function() {
this._evaluate("deal");
},
toBet: function() {
this._evaluate("bet");
},
onDealed: function() {
this._evaluate("dealed");
},
onPlayerActed: function() {
this._evaluate("player acted");
},
onDealerActed: function() {
this._evaluate("end");
},
_evaluate: function(t) {
if (c) setTimeout(function() {
r.evaluate(a, o, t);
}, 1); else {
c = !0;
r.evaluate(a, o, t);
c = !1;
}
},
_getInstance: function() {
return o;
},
_getModel: function() {
return a;
}
};
e.exports = i;
cc._RF.pop();
}, {
"state.com": "state.com"
} ],
"state.com": [ function(t, e, i) {
"use strict";
cc._RF.push(e, "71d9293mx9CFryhJvRw85ZS", "state.com");
!function(t) {
var e = function() {
function t(t) {
this.actions = [];
t && this.push(t);
}
t.prototype.push = function(e) {
Array.prototype.push.apply(this.actions, e instanceof t ? e.actions : arguments);
return this;
};
t.prototype.hasActions = function() {
return 0 !== this.actions.length;
};
t.prototype.invoke = function(t, e, i) {
void 0 === i && (i = !1);
this.actions.forEach(function(n) {
return n(t, e, i);
});
};
return t;
}();
t.Behavior = e;
}(o || (o = {}));
!function(t) {
!function(t) {
t[t.Initial = 0] = "Initial";
t[t.ShallowHistory = 1] = "ShallowHistory";
t[t.DeepHistory = 2] = "DeepHistory";
t[t.Choice = 3] = "Choice";
t[t.Junction = 4] = "Junction";
t[t.Terminate = 5] = "Terminate";
}(t.PseudoStateKind || (t.PseudoStateKind = {}));
t.PseudoStateKind;
}(o || (o = {}));
!function(t) {
!function(t) {
t[t.Internal = 0] = "Internal";
t[t.Local = 1] = "Local";
t[t.External = 2] = "External";
}(t.TransitionKind || (t.TransitionKind = {}));
t.TransitionKind;
}(o || (o = {}));
!function(t) {
var e = function() {
function t(e, i) {
this.name = e;
this.qualifiedName = i ? i.qualifiedName + t.namespaceSeparator + e : e;
}
t.prototype.toString = function() {
return this.qualifiedName;
};
t.namespaceSeparator = ".";
return t;
}();
t.Element = e;
}(o || (o = {}));
var n = function(t, e) {
function i() {
this.constructor = t;
}
for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
i.prototype = e.prototype;
t.prototype = new i();
};
!function(t) {
var e = function(t) {
function e(e, i) {
t.call(this, e, i);
this.vertices = [];
this.state = i;
this.state.regions.push(this);
this.state.getRoot().clean = !1;
}
n(e, t);
e.prototype.getRoot = function() {
return this.state.getRoot();
};
e.prototype.accept = function(t, e, i, n) {
return t.visitRegion(this, e, i, n);
};
e.defaultName = "default";
return e;
}(t.Element);
t.Region = e;
}(o || (o = {}));
!function(t) {
var e = function(e) {
function i(i, n) {
e.call(this, i, n = n instanceof t.State ? n.defaultRegion() : n);
this.outgoing = [];
this.region = n;
if (this.region) {
this.region.vertices.push(this);
this.region.getRoot().clean = !1;
}
}
n(i, e);
i.prototype.getRoot = function() {
return this.region.getRoot();
};
i.prototype.to = function(e, i) {
void 0 === i && (i = t.TransitionKind.External);
return new t.Transition(this, e, i);
};
i.prototype.accept = function(t, e, i, n) {};
return i;
}(t.Element);
t.Vertex = e;
}(o || (o = {}));
!function(t) {
var e = function(e) {
function i(i, n, o) {
void 0 === o && (o = t.PseudoStateKind.Initial);
e.call(this, i, n);
this.kind = o;
}
n(i, e);
i.prototype.isHistory = function() {
return this.kind === t.PseudoStateKind.DeepHistory || this.kind === t.PseudoStateKind.ShallowHistory;
};
i.prototype.isInitial = function() {
return this.kind === t.PseudoStateKind.Initial || this.isHistory();
};
i.prototype.accept = function(t, e, i, n) {
return t.visitPseudoState(this, e, i, n);
};
return i;
}(t.Vertex);
t.PseudoState = e;
}(o || (o = {}));
!function(t) {
var e = function(e) {
function i(i, n) {
e.call(this, i, n);
this.exitBehavior = new t.Behavior();
this.entryBehavior = new t.Behavior();
this.regions = [];
}
n(i, e);
i.prototype.defaultRegion = function() {
return this.regions.reduce(function(e, i) {
return i.name === t.Region.defaultName ? i : e;
}, void 0) || new t.Region(t.Region.defaultName, this);
};
i.prototype.isFinal = function() {
return 0 === this.outgoing.length;
};
i.prototype.isSimple = function() {
return 0 === this.regions.length;
};
i.prototype.isComposite = function() {
return this.regions.length > 0;
};
i.prototype.isOrthogonal = function() {
return this.regions.length > 1;
};
i.prototype.exit = function(t) {
this.exitBehavior.push(t);
this.getRoot().clean = !1;
return this;
};
i.prototype.entry = function(t) {
this.entryBehavior.push(t);
this.getRoot().clean = !1;
return this;
};
i.prototype.accept = function(t, e, i, n) {
return t.visitState(this, e, i, n);
};
return i;
}(t.Vertex);
t.State = e;
}(o || (o = {}));
!function(t) {
var e = function(t) {
function e(e, i) {
t.call(this, e, i);
}
n(e, t);
e.prototype.accept = function(t, e, i, n) {
return t.visitFinalState(this, e, i, n);
};
return e;
}(t.State);
t.FinalState = e;
}(o || (o = {}));
!function(t) {
var e = function(t) {
function e(e) {
t.call(this, e, void 0);
this.clean = !1;
}
n(e, t);
e.prototype.getRoot = function() {
return this.region ? this.region.getRoot() : this;
};
e.prototype.accept = function(t, e, i, n) {
return t.visitStateMachine(this, e, i, n);
};
return e;
}(t.State);
t.StateMachine = e;
}(o || (o = {}));
!function(t) {
var e = function() {
function e(i, n, o) {
var a = this;
void 0 === o && (o = t.TransitionKind.External);
this.transitionBehavior = new t.Behavior();
this.onTraverse = new t.Behavior();
this.source = i;
this.target = n;
this.kind = n ? o : t.TransitionKind.Internal;
this.guard = i instanceof t.PseudoState ? e.TrueGuard : function(t) {
return t === a.source;
};
this.source.outgoing.push(this);
this.source.getRoot().clean = !1;
}
e.prototype.else = function() {
this.guard = e.FalseGuard;
return this;
};
e.prototype.when = function(t) {
this.guard = t;
return this;
};
e.prototype.effect = function(t) {
this.transitionBehavior.push(t);
this.source.getRoot().clean = !1;
return this;
};
e.prototype.accept = function(t, e, i, n) {
return t.visitTransition(this, e, i, n);
};
e.prototype.toString = function() {
return "[" + (this.target ? this.source + " -> " + this.target : this.source) + "]";
};
e.TrueGuard = function() {
return !0;
};
e.FalseGuard = function() {
return !1;
};
return e;
}();
t.Transition = e;
}(o || (o = {}));
!function(t) {
var e = function() {
function t() {}
t.prototype.visitElement = function(t, e, i, n) {};
t.prototype.visitRegion = function(t, e, i, n) {
var o = this, a = this.visitElement(t, e, i, n);
t.vertices.forEach(function(t) {
t.accept(o, e, i, n);
});
return a;
};
t.prototype.visitVertex = function(t, e, i, n) {
var o = this, a = this.visitElement(t, e, i, n);
t.outgoing.forEach(function(t) {
t.accept(o, e, i, n);
});
return a;
};
t.prototype.visitPseudoState = function(t, e, i, n) {
return this.visitVertex(t, e, i, n);
};
t.prototype.visitState = function(t, e, i, n) {
var o = this, a = this.visitVertex(t, e, i, n);
t.regions.forEach(function(t) {
t.accept(o, e, i, n);
});
return a;
};
t.prototype.visitFinalState = function(t, e, i, n) {
return this.visitState(t, e, i, n);
};
t.prototype.visitStateMachine = function(t, e, i, n) {
return this.visitState(t, e, i, n);
};
t.prototype.visitTransition = function(t, e, i, n) {};
return t;
}();
t.Visitor = e;
}(o || (o = {}));
!function(t) {
var e = function() {
function t(t) {
void 0 === t && (t = "unnamed");
this.last = {};
this.isTerminated = !1;
this.name = t;
}
t.prototype.setCurrent = function(t, e) {
this.last[t.qualifiedName] = e;
};
t.prototype.getCurrent = function(t) {
return this.last[t.qualifiedName];
};
t.prototype.toString = function() {
return this.name;
};
return t;
}();
t.StateMachineInstance = e;
}(o || (o = {}));
!function(t) {
t.setRandom = function(t) {
e = t;
};
t.getRandom = function() {
return e;
};
var e = function(t) {
return Math.floor(Math.random() * t);
};
}(o || (o = {}));
!function(t) {
function e(i, n) {
return i instanceof t.Region ? e(i.state, n) : i instanceof t.State ? !i.region || e(i.region, n) && n.getCurrent(i.region) === i : void 0;
}
t.isActive = e;
}(o || (o = {}));
!function(t) {
function e(i, n) {
return i instanceof t.Region ? n.getCurrent(i).isFinal() : !(i instanceof t.State) || i.regions.every(function(t) {
return e(t, n);
});
}
t.isComplete = e;
}(o || (o = {}));
!function(t) {
function e(i, n, o) {
void 0 === o && (o = !0);
if (n) {
o && !1 === i.clean && e(i);
t.console.log("initialise " + n);
i.onInitialise.invoke(void 0, n);
} else {
t.console.log("initialise " + i.name);
i.accept(new d(), !1);
i.clean = !0;
}
}
function i(e, n, a) {
var s = !1;
e.regions.every(function(o) {
if (i(n.getCurrent(o), n, a)) {
s = !0;
return t.isActive(e, n);
}
return !0;
});
if (s) a !== e && t.isComplete(e, n) && i(e, n, e); else {
var r = e.outgoing.filter(function(t) {
return t.guard(a, n);
});
1 === r.length ? s = o(r[0], n, a) : r.length > 1 && t.console.error(e + ": multiple outbound transitions evaluated true for message " + a);
}
return s;
}
function o(e, n, s) {
for (var r = new t.Behavior(e.onTraverse), c = e.target; c && c instanceof t.PseudoState && c.kind === t.PseudoStateKind.Junction; ) {
c = (e = a(c, n, s)).target;
r.push(e.onTraverse);
}
r.invoke(s, n);
c && c instanceof t.PseudoState && c.kind === t.PseudoStateKind.Choice ? o(a(c, n, s), n, s) : c && c instanceof t.State && t.isComplete(c, n) && i(c, n, c);
return !0;
}
function a(e, i, n) {
var o = e.outgoing.filter(function(t) {
return t.guard(n, i);
});
if (e.kind === t.PseudoStateKind.Choice) return 0 !== o.length ? o[t.getRandom()(o.length)] : s(e);
if (!(o.length > 1)) return o[0] || s(e);
t.console.error("Multiple outbound transition guards returned true at " + this + " for " + n);
}
function s(e) {
return e.outgoing.filter(function(e) {
return e.guard === t.Transition.FalseGuard;
})[0];
}
function r(e) {
return e[0] || (e[0] = new t.Behavior());
}
function c(e) {
return e[1] || (e[1] = new t.Behavior());
}
function u(e) {
return e[2] || (e[2] = new t.Behavior());
}
function h(e) {
return new t.Behavior(c(e)).push(u(e));
}
function l(t) {
return (t.region ? l(t.region.state) : []).concat(t);
}
t.initialise = e;
t.evaluate = function(n, o, a, s) {
void 0 === s && (s = !0);
t.console.log(o + " evaluate " + a);
s && !1 === n.clean && e(n);
return !o.isTerminated && i(n, o, a);
};
var p = function(e) {
function i() {
e.apply(this, arguments);
}
n(i, e);
i.prototype.visitTransition = function(e, i) {
e.kind === t.TransitionKind.Internal ? e.onTraverse.push(e.transitionBehavior) : e.kind === t.TransitionKind.Local ? this.visitLocalTransition(e, i) : this.visitExternalTransition(e, i);
};
i.prototype.visitLocalTransition = function(e, i) {
var n = this;
e.onTraverse.push(function(o, a) {
for (var s = l(e.target), c = 0; t.isActive(s[c], a); ) ++c;
r(i(a.getCurrent(s[c].region))).invoke(o, a);
e.transitionBehavior.invoke(o, a);
for (;c < s.length; ) n.cascadeElementEntry(e, i, s[c++], s[c], function(t) {
t.invoke(o, a);
});
u(i(e.target)).invoke(o, a);
});
};
i.prototype.visitExternalTransition = function(t, e) {
for (var i = l(t.source), n = l(t.target), o = Math.min(i.length, n.length) - 1; i[o - 1] !== n[o - 1]; ) --o;
t.onTraverse.push(r(e(i[o])));
t.onTraverse.push(t.transitionBehavior);
for (;o < n.length; ) this.cascadeElementEntry(t, e, n[o++], n[o], function(e) {
return t.onTraverse.push(e);
});
t.onTraverse.push(u(e(t.target)));
};
i.prototype.cascadeElementEntry = function(e, i, n, o, a) {
a(c(i(n)));
o && n instanceof t.State && n.regions.forEach(function(t) {
a(c(i(t)));
t !== o.region && a(u(i(t)));
});
};
return i;
}(t.Visitor), d = function(e) {
function i() {
e.apply(this, arguments);
this.behaviours = {};
}
n(i, e);
i.prototype.behaviour = function(t) {
return this.behaviours[t.qualifiedName] || (this.behaviours[t.qualifiedName] = []);
};
i.prototype.visitElement = function(e, i) {
if (t.console !== f) {
r(this.behaviour(e)).push(function(i, n) {
return t.console.log(n + " leave " + e);
});
c(this.behaviour(e)).push(function(i, n) {
return t.console.log(n + " enter " + e);
});
}
};
i.prototype.visitRegion = function(e, i) {
var n = this, o = e.vertices.reduce(function(e, i) {
return i instanceof t.PseudoState && i.isInitial() ? i : e;
}, void 0);
e.vertices.forEach(function(e) {
e.accept(n, i || o && o.kind === t.PseudoStateKind.DeepHistory);
});
r(this.behaviour(e)).push(function(t, i) {
return r(n.behaviour(i.getCurrent(e))).invoke(t, i);
});
i || !o || o.isHistory() ? u(this.behaviour(e)).push(function(i, a, s) {
h(n.behaviour(s || o.isHistory() ? a.getCurrent(e) || o : o)).invoke(i, a, s || o.kind === t.PseudoStateKind.DeepHistory);
}) : u(this.behaviour(e)).push(h(this.behaviour(o)));
this.visitElement(e, i);
};
i.prototype.visitPseudoState = function(i, n) {
e.prototype.visitPseudoState.call(this, i, n);
i.isInitial() ? u(this.behaviour(i)).push(function(t, e) {
return o(i.outgoing[0], e);
}) : i.kind === t.PseudoStateKind.Terminate && c(this.behaviour(i)).push(function(t, e) {
return e.isTerminated = !0;
});
};
i.prototype.visitState = function(t, e) {
var i = this;
t.regions.forEach(function(n) {
n.accept(i, e);
r(i.behaviour(t)).push(r(i.behaviour(n)));
u(i.behaviour(t)).push(h(i.behaviour(n)));
});
this.visitVertex(t, e);
r(this.behaviour(t)).push(t.exitBehavior);
c(this.behaviour(t)).push(t.entryBehavior);
c(this.behaviour(t)).push(function(e, i) {
t.region && i.setCurrent(t.region, t);
});
};
i.prototype.visitStateMachine = function(t, i) {
var n = this;
e.prototype.visitStateMachine.call(this, t, i);
t.accept(new p(), function(t) {
return n.behaviour(t);
});
t.onInitialise = h(this.behaviour(t));
};
return i;
}(t.Visitor), f = {
log: function(t) {
for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
},
warn: function(t) {
for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
},
error: function(t) {
for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
throw t;
}
};
t.console = f;
}(o || (o = {}));
var o;
!function(t) {
function e(t) {
return (t.region ? e(t.region.state) : []).concat(t);
}
t.validate = function(t) {
t.accept(new i());
};
var i = function(i) {
function o() {
i.apply(this, arguments);
}
n(o, i);
o.prototype.visitPseudoState = function(e) {
i.prototype.visitPseudoState.call(this, e);
if (e.kind === t.PseudoStateKind.Choice || e.kind === t.PseudoStateKind.Junction) {
0 === e.outgoing.length && t.console.error(e + ": " + e.kind + " pseudo states must have at least one outgoing transition.");
e.outgoing.filter(function(e) {
return e.guard === t.Transition.FalseGuard;
}).length > 1 && t.console.error(e + ": " + e.kind + " pseudo states cannot have more than one Else transitions.");
} else {
0 !== e.outgoing.filter(function(e) {
return e.guard === t.Transition.FalseGuard;
}).length && t.console.error(e + ": " + e.kind + " pseudo states cannot have Else transitions.");
e.isInitial() && (1 !== e.outgoing.length ? t.console.error(e + ": initial pseudo states must have one outgoing transition.") : e.outgoing[0].guard !== t.Transition.TrueGuard && t.console.error(e + ": initial pseudo states cannot have a guard condition."));
}
};
o.prototype.visitRegion = function(e) {
i.prototype.visitRegion.call(this, e);
var n;
e.vertices.forEach(function(i) {
if (i instanceof t.PseudoState && i.isInitial()) {
n && t.console.error(e + ": regions may have at most one initial pseudo state.");
n = i;
}
});
};
o.prototype.visitState = function(e) {
i.prototype.visitState.call(this, e);
e.regions.filter(function(e) {
return e.name === t.Region.defaultName;
}).length > 1 && t.console.error(e + ": a state cannot have more than one region named " + t.Region.defaultName);
};
o.prototype.visitFinalState = function(e) {
i.prototype.visitFinalState.call(this, e);
0 !== e.outgoing.length && t.console.error(e + ": final states must not have outgoing transitions.");
0 !== e.regions.length && t.console.error(e + ": final states must not have child regions.");
e.entryBehavior.hasActions() && t.console.warn(e + ": final states may not have entry behavior.");
e.exitBehavior.hasActions() && t.console.warn(e + ": final states may not have exit behavior.");
};
o.prototype.visitTransition = function(n) {
i.prototype.visitTransition.call(this, n);
n.kind === t.TransitionKind.Local && -1 === e(n.target).indexOf(n.source) && t.console.error(n + ": local transition target vertices must be a child of the source composite sate.");
};
return o;
}(t.Visitor);
}(o || (o = {}));
e.exports = o;
cc._RF.pop();
}, {} ]
}, {}, [ "Actor", "ActorRenderer", "AssetMng", "AudioMng", "Bet", "Card", "Dealer", "FXPlayer", "Game", "Menu", "Player", "SideSwitcher", "TossChip", "ButtonScaler", "InGameUI", "ModalUI", "RankItem", "RankList", "state.com", "Decks", "PlayerData", "Types", "Utils", "game-fsm" ]);