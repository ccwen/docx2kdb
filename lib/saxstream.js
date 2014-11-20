var setupParser=function(parser,options) {
  var obj=null;
  var objstack=[];
  parser.onerror = function (e) {
    // an error happened.
  };
  parser.ontext = function (t) {
    //console.log(t.substr(0,4));
    // got some text.  t is the string of text.
    if (objstack.length) {
      obj=objstack[objstack.length-1];
      obj.child.push(t);      
    }
  };
  parser.onopentag = function (node) {
    var handler=options.handlers[node.name];
    if (handler) {
      obj={ node: node, child:[] };
      objstack.push(obj);
    } else if (objstack.length) {
      obj=objstack[objstack.length-1];
      obj.child.push(node);
    }

    if (options.tagstack) options.tagstack.push(node.name);
    //console.log(tagstack.join("/"));
    // opened a tag.  node has "name" and "attributes"
  };
  parser.onclosetag =function(nodename) {
    if (options.tagstack) options.tagstack.pop();
    var handler=options.handlers[nodename];
    if (handler) {
      var obj=objstack.pop();
      handler(obj);
    } else if (objstack.length) {
      obj=objstack[objstack.length-1];
      obj.child.push([nodename]);
    }
  }
  //parser.onattribute = function (attr) {
    // an attribute.  attr has "name" and "value"
  //};
  parser.onend = function () {
    if (options.callback) {
      options.callback.apply(options.context,[options.session]);
    }
  };
}

var createSAXStream=function(options) {
  var strict = true; // set to false for html-mode
  var tagstack=[];
  var saxStream = require("sax").createStream(strict, options);
  setupParser(saxStream._parser,options,tagstack);
  saxStream.on("error", function (e) {
    // unhandled errors will throw, since this is a proper node
    // event emitter.
    console.error("error!", e);
    // clear the error
    this._parser.error = null;
    this._parser.resume();
  });

  return saxStream;
}
module.exports=createSAXStream;
