var session={pcount:0};

var onP=function(obj) {
	session.pcount++;
	var inlink=false;
	var t="",pstyle="",linktext="",instrtext="";
	obj.child.map(function(o,idx){
		if (typeof o=="string") {
			var txt=o.replace(/>/g,"").replace(/</g,"");	
			if (inlink) {
				linktext+=txt;
			} else {
				t+=txt;
			}
		}
		if (typeof o=="object") {
			if ( o.name=="w:pStyle") {
				pstyle=o.attributes['w:val'];
			}
			else if (o.name=="w:hyperlink") {
				inlink=true;
			}else if (o.name=="w:instrText") {
				instrtext+=obj.child[idx+1]; //consumed
				obj.child[idx+1]="";
			}

			if (o[0]=="w:hyperlink") {
				inlink=false;
				t+="<a>"+linktext+"</a>";
				linktext="";
			} else if (o[0]=="w:instrText") {
				console.log("w:instrtext",instrtext);
				instrtext="";
			}
		} 
	});
	if (pstyle) {
		//console.log("<H"+pstyle+">"+t+"</H"+pstyle+">");
	} else {
		//console.log(t);
	}
	//console.log(t);
	//console.log(obj);
}
var handlers={
	"w:p":onP
}
module.exports={session:session,handlers:handlers};