/**
 * Created by nmtuan on 08-Jun-16.
 */
function DataRef(ref) {
    this.dataRef = ref;
    this.key = ref.key;
};
DataRef.prototype.setRemoteProperty = function (property, value) {
    this.dataRef.child(property).set(value);
};