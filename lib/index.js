var babylon = require('babylon');
const babylonJsx = require('babylon-jsx');
const generate = require('babel-generator');
var htmlTemplate = require('react-template');

const templatePrefix =
`Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require('react');

var build = function () {
  function build(context) {
    var output = function() { return eval(\``;
const templatePostfix =
    `\`); }.call(context);
    //return output;
    }

  return build.bind(context);
}();

exports.default = build;`;

module.exports = function(content) {
  const sanitizedContent = content.replace(/^\s+|\s+$/g, '');
  var options = {prefix:'rt',jsMode:true};
  const precompiled = htmlTemplate(sanitizedContent,{}, options);
  console.log(precompiled);
  let ast =  babylon.parse(precompiled, {
                                        sourceType: 'module',
                                        plugins: ['jsx']
                                      });
  const transformed = babylonJsx.default(ast, 'React.createElement');
  let template = generate.default(transformed);
  template = templatePrefix + template.code + templatePostfix;
  console.log(template);
  return template;
};
