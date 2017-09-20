"use strict";

var path = require('path')
var fs = require('fs')
var iconv = require('iconv-lite')
var colorful = require('colorful')

exports.home = process.platform === 'win32' ? process.env.USERPROFILE : process.env.HOME


function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) == '[object ' + type + ']'
  }
}
exports.isObject = isType("Object")
exports.isFunction = isType("Function")
var isArray = exports.isArray = Array.isArray || isType("Array")

var isString = exports.isString = isType("String")
var isNonEmptyString = exports.isNonEmptyString = function(v) {
  return v && isString(v)
}

var isNumber = exports.isNumber = function(v) {
  return typeof v === 'number'
}
exports.isInteger = function(v) {
  if (!isNumber(v)) return false
  if (Math.floor(v) !== Math.ceil(v)) return false
  return true
}


exports.split = function(v, delim) {
  if (isArray(v)) return v
  delim = delim || ','
  return isString(v) ? v.split(delim) : []
}


var camelcase = exports.camelcase = function(str) {
  return str.split('-').reduce(function(str, word){
    return str + word[0].toUpperCase() + word.slice(1)
  })
}

exports.unCamelcase = function(str) {
  return str.split(/([A-Z])/).reduce(function(str, word) {
    if (/[A-Z]/.test(word)) {
      return str + '-' + word.toLowerCase()
    } else {
      return str + word
    }
  })
}

// read json config file
exports.readJSON = function(p) {
  try {
    return JSON.parse(fs.readFileSync(p))
  } catch(e) {
    return {}
  }
}

exports.writeJSON = function(p, data) {
  var dir = path.dirname(p)
  if (!fs.existsSync(dir)) {
    dir.split(path.sep).reduce(function(parts, part) {
      parts += part + '/'
      var subpath = path.resolve(parts)
      if (!fs.existsSync(subpath)) {
        fs.mkdirSync(subpath)
      }
      return parts;
    }, '');
  }
  fs.writeFileSync(p, JSON.stringify(data))
}


exports.readFile = function(p, encoding) {
  var buf = fs.readFileSync(p)
  return iconv.decode(buf, encoding)
}

exports.isExistedFile = function(p){
  if (!isNonEmptyString(p)) return false
  //  if path contains query string
  p = p.replace(/(\?|#).*$/, '')
  return fs.existsSync(p) && fs.statSync(p).isFile()
}

exports.isExistedDir = function(p){
  if (!isNonEmptyString(p)) return false
  return fs.existsSync(p) && fs.statSync(p).isDirectory()
}


/**
 * mix properties from src to target
 * multiple src be allowed
 * e.g. var target = mix(target, src1, src2, src3)
 */
exports.mix = function(target, src, overwrite) {
  target = target || {}
  /*
   * NOTE
   *
   * can't modify overwrite directly!!!
   *
   * if you assign a new value to overwrite
   * when method in the same file call mix()
   * arguments is not modified
   * but if one method out of this file call it
   * arguments will be modified
   */
  var ow
  var len = arguments.length
  var srcEnd = len - 1
  var lastArg = arguments[len - 1]

  if ( typeof lastArg === 'boolean' || typeof lastArg === 'number') {
      ow = lastArg
      srcEnd--
  } else {
      ow = false
  }

  for (var i = 1; i <= srcEnd; i++) {
      var current = arguments[i] || {}
      for (var j in current) {
          if (ow || typeof target[j] === 'undefined') {
              target[j] = current[j]
          }
      }
  }

  return target
}


exports.getExternalIpAddress = function() {
  var interfaces = require('os').networkInterfaces()
  var addresses = []
  Object.keys(interfaces).forEach(function(name) {
    interfaces[name].forEach(function(node) {
      if (node.family === 'IPv4' && node.internal === false) {
        addresses.push(node)
      }
    })
  })
  if (addresses.length > 0) {
    return addresses[0].address
  }
}


exports.generateLine = function(len, symbol) {
  return new Array(len + 1).join(symbol || '-')
}


exports.cGetCfg = function(commander) {
  var cfg = {}
  commander.options.forEach(function(item) {
    var key = camelcase(item.name())
    if(key in commander) {
      if (typeof commander[key] !== 'function') {
        cfg[key] = commander[key]
      }
    }
  })
  return cfg
}


exports.cGetHelp = function(pkg) {
  return function() {
    var commandHelp = ''
    if (this.commands.length) {
      commandHelp = '\n' +
                    colorful.green('  Commands:') +
                    '    ' + this.commandHelp().replace(/\n  Commands:\n/gm, '')
    }
    return [
      '',
      colorful.cyan('  ' + pkg.description),
      '',
      colorful.green('  Usage:'),
      '    ' + this._name + ' ' + this.usage(),
      commandHelp,
      colorful.green('  Options:'),
      '' + this.optionHelp().replace(/^/gm, '    '),
      '',
      colorful.green('  More Info:'),
      '    ' + colorful.underline(pkg.homepage),
      '',
      ''
    ].join('\n')
  }
}


