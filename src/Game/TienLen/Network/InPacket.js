
//
TienLen.ReceiveJoinRoomSucceed = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i;
        // gia cua toi tren server
        this.myChair = this.getByte();
        cc.log("myChair: " + this.myChair);
        this.moneyBet = this.getLong();
        cc.log("moneyBet: " + this.moneyBet);
        this.roomOwner = this.getByte();
        cc.log("roomOwner: " + this.roomOwner);

        this.roomId = this.getInt();
        cc.log("roomId: " + this.roomId);
        this.gameId = this.getInt();

        this.moneyType = this.getByte();
        this.playerSize = this.getShort();
        this.playerStatus = [];
        for(i = 0; i < this.playerSize; i++){
            this.playerStatus.push(this.getByte());
        }

        this.playerSize = this.getShort();
        this.playerInfos = [];
        for(i =0; i < this.playerSize; i++){
            var player = {};
            player.avatar = this.getString();
            player.nickName = this.getString();
            player.money = this.getLong();
            this.playerInfos.push(player);
        }

        this.gameAction = this.getByte();
        this.handCardSizeSize = this.getShort();
        this.handCardSize = [];
        for(i = 0; i < this.handCardSizeSize; i++){
            this.handCardSize.push(this.getByte());
        }
        this.currentChair = this.getByte();
        this.countDownTime = this.getByte();
    }
});


TienLen.ReceivedDisconnect = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        //this.reason = this.getByte();
    }
});


TienLen.ReceivedUpdateGameInfo = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        var i;
        this.maxPlayer = this.getByte();
        this.myChair = this.getByte();
        var cardSize = this.getShort();
        this.cards = [];
        for(i = 0; i < cardSize; i++){
            this.cards.push(this.getByte());
        }

        this.boLuot = this.getBool();
        this.toiTrang = this.getInt();

//Thong tin hien tai:
        this.newRound = this.getBool();
        this.gameServerState = this.getByte();
        this.gameAction = this.getByte();
        this.activeTimeRemain = this.getByte();
        this.currentChair = this.getByte();

        var lastCardSize = this.getShort();
        this.recentCards = [];
        for(i = 0; i < lastCardSize; i++){
            this.recentCards.push(this.getByte());
        }

//Thong tin chung
        this.moneyType = this.getByte();
        this.roomBet = this.getLong();
        this.gameId = this.getInt();
        this.roomId = this.getInt();

//Thong tin tung nguoi choi
        var hasInfoSize = this.getShort();
        this.playerStatus = [];
        this.hasInfoList = [];
        this.playerInfos = [];
        for(i = 0; i < hasInfoSize; i++){
            this.hasInfoList.push(this.getBool());
        }

        for(i = 0; i < TienLen.MAX_PLAYER; i++){
            info = {};
            if(this.hasInfoList[i]){

                info["cards"] = this.getByte();
                //info["baosam"] = this.getBool();
                //info["huybaosam"] = this.getBool();
                this.playerStatus.push(this.getByte());
                info["avatar"] = this.getString();
                info["uID"] = this.getInt();
                info["nickName"] = this.getString();
                info["money"] = this.getLong();
            }
            else{
                this.playerStatus.push(0);
            }
            this.playerInfos.push(info);
        }
    }
});

TienLen.ReceiveAutoStart = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.isAutoStart = this.getBool();
        this.autoStartTime = this.getByte();

    }
});

TienLen.ReceivedChiaBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i = 0;
        this.cardSize = this.getShort();
        this.cards = [];
        for( i = 0; i < this.cardSize; i++){
            this.cards.push(this.getByte());
        }
        this.toiTrang = this.getByte();
        this.timeBaoSam = this.getByte();
        this.gameId = this.getInt();
    }
});

TienLen.ReceivedDanhBai = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        var i = 0;
        this.chair = this.getByte();
        var size = this.getShort();
        this.cards = [];

        for(var i =0;i<size;i++)
        {
            this.cards.push(this.getByte());
        }

        this.numberCard = this.getByte();
    }
});


TienLen.ReceivedBoluot = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.chair = this.getByte();
    }
})

TienLen.ReceivedChangeTurn = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.newRound = this.getBool();
        this.chair = this.getByte();

        this.chairLastTurn = this.getByte();
        cc.log("chairLastTurn: " + this.chairLastTurn);
        this.time = this.getByte();

    }
})


TienLen.ReceivedWaitBonDoiThong =  CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.chair = this.getByte();
    }
})

TienLen.ReceivedEndGame = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        var i = 0;
        this.winTypes = [];
        this.ketQuaTinhTienList = [];
        this.cards = [];
        this.sizeWinType = this.getShort();
        cc.log("sizeWinType: " + this.sizeWinType);
        for(i = 0; i < this.sizeWinType; i++){
            this.winTypes.push(this.getByte());
        }

        this.kqTinhTienSize = this.getShort();
        for(i =0; i < this.kqTinhTienSize; i++){
            this.ketQuaTinhTienList.push(this.getLong());
        }

        var playerSize = this.getShort();
        this.currentMoney = [];
        for(i = 0; i < playerSize; i++){
            this.currentMoney.push(this.getLong());
        }

        for(i = 0; i < TienLen.MAX_PLAYER; i++){
            var cardSize = this.getShort();
            var player = [];
            for( var j = 0; j < cardSize; j++){
                player.push(this.getByte());
            }
            this.cards.push(player);
        }

        this.countDown = this.getByte();


    }
})

TienLen.ReceivedFirstTurnDecision = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.isRandom = this.getBool();
        this.chair = this.getByte();
        this.cardSize = this.getShort();
        this.cards= [];
        for(var i = 0; i < this.cardSize; i++){
            var kk = this.getByte();
            this.cards.push(kk);
            cc.log("cardFirstTurn: " + i + " " +  kk);
        }
    }
})

TienLen.ReceivedChatChong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.winChair = this.getByte();
        this.lostChair = this.getByte();
        this.winMoney = this.getLong();
        this.lostMoney = this.getLong();
        this.winCurrentMoney = this.getLong();
        this.lostCurrentMoney = this.getLong();
    }
})

TienLen.ReceivedPingPong2 = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.id = this.getLong();
    }
})

TienLen.CMDUSERLEAVEROOM = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function() {
        this.chair = this.getByte();
        this.nickName = this.getString();
    }
})

TienLen.ReceiveUserJoinRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.info = {};
        this.info["nickName"] = this.getString();
        this.info["avatar"] = this.getString();
        this.info["money"]= this.getLong();
        this.uChair = this.getByte();
        this.uStatus = this.getByte();
    }
})

TienLen.CmdReceivedUpdateMath = CmdReceivedCommon.extend({
    ctor :function(pkg)
    {
        this._super(pkg);
        this.readData();
    },
    readData: function(){
        this.myChair = this.getByte();

        var size = this.getShort();
        this.hasInfo = [];
        for(var i=0;i<size;i++){
            this.hasInfo.push(this.getBool());
        }
        this.infos = [];
        for(var i=0;i<size;i++){
            var info = {};
            if(this.hasInfo[i])
            {
                info["money"] = this.getLong();
                info["status"] = this.getInt();
            }
            this.infos.push(info);
        }

    }
})

TienLen.CmdReceiveSamConfig = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.listSize = this.getShort();
        this.list = [];
        for( var i = 0; i < this.listSize; i++){
            var kk = {};
            kk.maxUserPerRoom = this.getByte();
            kk.moneyType = this.getByte();
            kk.moneyBet = this.getLong();
            kk.moneyRequire = this.getLong();
            kk.nPersion = this.getInt();
            this.list.push(kk);
        };
    }
});

TienLen.CmdReceiveNotifyRegOutRoom = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.outChair = this.getByte();
        this.isOutRoom = this.getBool();
    }
})

TienLen.CmdReceivedKickOff = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.reason = this.getByte();
    }
});

TienLen.CmdReceivePingPong = CmdReceivedCommon.extend({
    ctor: function(pkg){
        this._super(pkg);
        this.readData();
    },

    readData: function(){
        this.test = this.getLong();
    }
})