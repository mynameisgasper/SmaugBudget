const hbs = require('hbs');

/*
  ! Simple IF statement for Handlebars
  ? Use as:
  * {{#ifEquals string1 string2}}
  * {{/ifEquals}}
 */
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});