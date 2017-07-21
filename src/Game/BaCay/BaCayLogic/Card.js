//
BaCay.Card = cc.Class.extend({
    ctor: function(id){
        this.id = id;
        this.so = BaCay.Card.getSoById(id);
        this.chat = BaCay.Card.getChatById(id);
        this.diem = BaCay.Card.getDiemById(id);
    }
});

BaCay.Card.getSoById = function(id){
    return Math.floor(id/4);
};

BaCay.Card.getDiemById = function(id){
    return Math.floor(id/4) + 1;
}

BaCay.Card.getChatById = function (id){
    return id % 4;
}

BaCay.Card.getNormalId = function(id){
    var realSo;
    if(id < 4){
        realSo = 11;
    }else if(id < 8){
        realSo = 12
    }
    else{
        realSo = Math.floor(id/4) - 2;
    }

    var chat = Math.floor(id%4);
    if(chat == 3){
        chat = 2;
    }
    else if(chat == 2){
        chat = 3;
    }
    return realSo*4 + chat;
}
