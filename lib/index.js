const htmlTemplate = require('angular-template');

const templatePrefix =
`Object.defineProperty(exports, "__esModule", {
  value: true
});

var htmlTemplate = require('angular-template');
console.log('debug');
console.log(htmlTemplate);

var build = function () {
  function build(context) {
    var options = {prefix:'rt',jsMode:true};
    var output = htmlTemplate('`;
const templatePostfix =
    `',{'this': context},options);
    console.log(output);
    return output;
    }

  return build;
}();

exports.default = build;`;

module.exports = function(content) {
  const sanitizedContent = content.replace(/^\s+|\s+$/g, '');
  let template = templatePrefix + sanitizedContent + templatePostfix;
  console.log(template);
  return template;
};
