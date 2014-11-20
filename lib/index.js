
var SAXStream=require("./saxstream");
var DocXReader=require("./docxreader");
var handlers=require("./handlers");

var convertToXML=function(fn,opts, cb ) {
	if (typeof opts=="function") {
		cb=opts;
		opts={};
	}
	var saxstream=new SAXStream({callback:cb,context:this,
		session:handlers.session,
		handlers:handlers.handlers});
    DocXReader.openDocX2stream(fn,saxstream);
};	
module.exports={convertToXML:convertToXML};