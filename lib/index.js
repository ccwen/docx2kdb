
var SAXStream=require("./saxstream");
var DocXReader=require("./docxreader");

var convertToXML=function(fn,opts, cb ) {
	var options=require("./handlers");
	
	if (typeof opts=="function") {
		cb=opts;
		opts={};
	}
	options.filename=fn;
	options.onend=cb;
	options.contex=this;
	var saxstream=new SAXStream(options);
    DocXReader.openDocX2stream(fn,saxstream);
};	
module.exports={convertToXML:convertToXML};