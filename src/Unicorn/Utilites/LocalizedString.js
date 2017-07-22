(function () {
    var root = this;
    var LocalizedsString = uc.LocalizedsString = cc.Class.extend({
        ctor: function () {

        },

        loadLocalized: function () {
            this._localizedStrings = {};
            var contents = "";

            if (cc.sys.isNative) {
                cc.loader.loadTxt("res/list", function (error, txt) {
                    if (error != null) {
                        cc.log("Load localization file error!");
                    }
                    else {
                        contents = txt;
                    }
                });
            }
            else {
                contents = cc.loader._loadTxtSync("res/list");
            }
        },

        getText: function (key) {
            if (key in this._localizedStrings) {
                return this._localizedStrings[key];
            }
            return key;
        }
    });

    var g_localization = null;

    var LocalizedString = uc.LocalizedString = cc.Class.extend({

        ctor: function () {

        },

        loadLocalized: function () {
            this._localizedStrings = {};
            var contents = "";

            if (cc.sys.isNative) {
                cc.loader.loadTxt("res/Localized_vi.txt", function (error, txt) {
                    if (error != null) {
                        cc.log("Load localization file error!");
                    }
                    else {
                        contents = txt;
                    }
                });
            }
            else {
                contents = cc.loader._loadTxtSync("res/Localized_vi.txt");
            }


            var lines = contents.split('\n');
            for (var i in lines) {
                var line = lines[i];
                if (line.indexOf("/*", 0) == -1 &&
                    line.indexOf("//", 0) == -1 &&
                    line.indexOf("*/", 0) == -1) //filter the valid string of one line
                {
                    var validPos = line.indexOf('=', 0);
                    if (validPos != -1) {
                        var keyStr = line.substring(0, validPos - 1);
                        // get valid string
                        var subStr = line.substring(validPos + 1, line.length - 1);

                        //trim space
                        keyStr = keyStr.slice(this.findFirstNotOf(keyStr, " \t"));
                        keyStr = keyStr.slice(0, this.findLastNotOf(keyStr, " \t") + 1);

                        subStr = subStr.slice(this.findFirstNotOf(subStr, " \t"));
                        subStr = subStr.slice(0, this.findLastNotOf(subStr, " \t") + 1);

                        //trim \"
                        keyStr = keyStr.slice(this.findFirstNotOf(keyStr, "\""));
                        keyStr = keyStr.slice(0, this.findLastNotOf(keyStr, "\"") + 1);
                        var findPosition = subStr.indexOf('\"', 0);
                        subStr = subStr.slice(this.findFirstNotOf(subStr, "\""));

                        //trim ; character and last \" character
                        subStr = subStr.slice(0, this.findLastNotOf(subStr, ";") + 1);
                        subStr = subStr.slice(0, this.findLastNotOf(subStr, "\"") + 1);

                        //replace line feed with \n
                        subStr.replace(/\\n/g, "\n");

                        this._localizedStrings[keyStr] = subStr;
                    }
                }
            }
        },

        findLastNotOf: function (strSource, text) {
            var sourceLen = strSource.length;
            var strLen = text.length;
            if (strLen > sourceLen) {
                return -1;
            }
            var i = sourceLen - 1;
            while (i >= 0) {
                var result = false;
                for (var k = 0; k < strLen; k++) {
                    if (text[k] == strSource[i]) {
                        result = true;
                        break;
                    }
                }
                if (result) {
                    i -= 1;
                }
                else {
                    return i;
                }
            }
            return -1;
        },

        findFirstNotOf: function (strSource, text) {
            var sourceLen = strSource.length;
            var strLen = text.length;
            var i = 0;
            while (i < sourceLen - 1) {
                var result = false;
                for (var k = 0; k < strLen; k++) {
                    if (text[k] == strSource[i]) {
                        result = true;
                        break;
                    }
                }
                if (result) {
                    i += 1;
                } else {
                    return i;
                }

            }
            return -1;
        },

        getText: function (key) {
            if (key in this._localizedStrings) {
                return this._localizedStrings[key];
            }
            return key;
        }
    });

    LocalizedString.to = function (keyLocalized) {
        if (g_localization == null) {
            g_localization = new LocalizedString();
            g_localization.loadLocalized();
        }
        return g_localization.getText(keyLocalized);
    }

    var localized = function (keyLocalized) {
        return LocalizedString.to(keyLocalized)
    }
}.call(this));
