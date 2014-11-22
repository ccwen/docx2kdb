
var SAXStream=require("./saxstream");
var DocXReader=require("./docxreader");
var handlers=require("./handlers");

var convertToXML=function(fn,opts, cb ) {
	if (typeof opts=="function") {
		cb=opts;
		opts={};
	}
	handlers.onend=cb;
	handlers.contex=this;
	var saxstream=new SAXStream(handlers);
    DocXReader.openDocX2stream(fn,saxstream);
};	
module.exports={convertToXML:convertToXML};