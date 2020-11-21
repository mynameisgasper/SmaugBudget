module.exports = {
    ifNot: function(arg1, options) {
        return (!arg1) ? options.fn(this) : options.inverse(this);
    },
    ifEquals: function(arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    }
}