/**
 * Created by nmtuan on 10-Jun-16.
 */
var Utils = {

    splitsStringToName : function (str) {
        var res = ['', ''];
        var spaceIdx = str.indexOf(' ');

        res[0] = str.substr(0, spaceIdx);
        res[1] = str.substr(spaceIdx + 1);

        return res;
    }
}