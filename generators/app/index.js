'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = Generator.extend({
  prompting: function () {
    var prompts = [{
      type: 'input',
      name: 'title',
      message: 'How would you like to name this snippet?',
      default: 'snippet'
    }, {
      type: 'input',
      name: 'content',
      message: 'What\'s the content of this snippet?'
    }, {
      type: 'input',
      name: 'trigger',
      message: 'How to trigger this snippet?'
    }, {
      type: 'input',
      name: 'scope',
      message: 'What\'s the scope (file extensition) to run this snippet in?',
      default: 'js'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('snippet.sublime-snippet'),
      this.destinationPath(`${_.kebabCase(this.props.title)}.sublime-snippet`),
      {
        title: _.kebabCase(this.props.title),
        content: this.props.content,
        trigger: this.props.trigger,
        scope: this.props.scope
      }
    );
  }
});