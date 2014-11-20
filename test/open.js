var docx2kdb=require("../lib/index");
console.time("convert");
docx2kdb.convertToXML("../sample/憲法.docx",{},function(session){
	console.log(session.pcount);
	console.timeEnd("convert");	
});
