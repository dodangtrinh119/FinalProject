/**
 * Created by nmtuan on 10-Jun-16.
 */
var Utils = {

    splitsStringToName : function (str) {
        var res = ['', ''];
        var spaceIdx = str.indexOf(' ');

        res[0] = str.substring(0, spaceIdx);

        if (spaceIdx >= 0 && spaceIdx + 1 < str.length) {
            var secondSpaceIdx = str.indexOf(' ', spaceIdx + 1);
            res[1] = str.substring(spaceIdx + 1, secondSpaceIdx);
        }

        return res;
    }
}