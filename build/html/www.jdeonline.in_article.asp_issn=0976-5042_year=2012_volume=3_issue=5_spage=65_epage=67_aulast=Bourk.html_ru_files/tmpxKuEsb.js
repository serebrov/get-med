var link=new Array()
var delay_hide=500
var menuobj;
var menu;
var default_menu_item;


function lib_bwcheck(){ //Browsercheck (needed)
	this.ver=navigator.appVersion
	this.agent=navigator.userAgent
	this.dom=document.getElementById?1:0
	this.opera5=this.agent.indexOf("Opera 5")>-1
	this.ie5=(this.ver.indexOf("MSIE 5")>-1 && this.dom && !this.opera5)?1:0; 
	this.ie6=(this.ver.indexOf("MSIE 6")>-1 && this.dom && !this.opera5)?1:0;
	this.ie4=(document.all && !this.dom && !this.opera5)?1:0;
	this.ie=this.ie4||this.ie5||this.ie6
	this.mac=this.agent.indexOf("Mac")>-1
	this.ns6=(this.dom && parseInt(this.ver) >= 5) ?1:0; 
	this.ns4=(document.layers && !this.dom)?1:0;
	this.bw=(this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.opera5)
	return this
}
var bw=new lib_bwcheck();

function  x(obj,visible)
{	this.evnt=bw.dom? 	document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?document.layers[obj]:0;

	if(!this.evnt) return false
	this.css=bw.dom||bw.ie4?this.evnt.style:bw.ns4?this.evnt:0;	
   	this.wref=bw.dom||bw.ie4?this.evnt:bw.ns4?this.css.document:0;	
	this.css.visibility = visible;
	this.css.width='100%';

}

function showHideLayer(obj,visible){								
   	this.evnt=bw.dom? document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?document.layers[obj]:0;

	if(!this.evnt) return false
	this.css=bw.dom||bw.ie4?this.evnt.style:bw.ns4?this.evnt:0;	
   	this.wref=bw.dom||bw.ie4?this.evnt:bw.ns4?this.css.document:0;	
	this.css.visibility = visible;
	this.css.top='94px';
	bw.ns4||bw.ns6?this.css.left='-8px':
	this.css.left='0px';
	this.css.width='100%';
	this.css.position="absolute";
}


function writeSubmenu(obj,item){								
   	this.evnt=bw.dom? document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?document.layers[obj]:0;
	if(!this.evnt) return false
	this.css=bw.dom||bw.ie4?this.evnt.style:bw.ns4?this.evnt:0;	
   	this.wref=bw.dom||bw.ie4?this.evnt:bw.ns4?this.css.document:0;	
	thecontent=(item==-1)? "" : link[item]
	this.wref.innerHTML=thecontent;

}


function clearContent(obj){	
						
   	this.evnt=bw.dom? document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?document.layers[obj]:0;
	if(!this.evnt) return false
	this.css=bw.dom||bw.ie4?this.evnt.style:bw.ns4?this.evnt:0;	
   	this.wref=bw.dom||bw.ie4?this.evnt:bw.ns4?this.css.document:0;	
	thecontent=(item==-1)? "" : link[item]
	this.wref.innerHTML="";

}


function clear_delayhide()
{
	alert("asdASD");
	if (window.delayhide)
	{onlpgld(default_menu_item)
	clearTimeout(delayhide)
}
}

function contains_ns6(a, b) 
{
	while (b.parentNode)
	if ((b = b.parentNode) == a)
		return true;
	return false;
}





function navtopMouseOver(src)
{ 

	src.className="topBand1MO"
} 



function navtopMouseOut(src)
{ 
	src.className="tbcl"
}
function navleftMouseOver(src)
{ 

	src.className="leftnavcellover"
} 



function navleftMouseOut(src)
{ 
	src.className="leftnavcell"
}

function navtabMouseOver(src)
{ 

	src.className="nav"
} 



function navtabMouseOut(src)
{ 
	src.className="navover"
}

////



function navMouseOver(src,item)
{ 

	src.className="topBand1MO"
	//writeSubmenu("submenu",item);
	//showHideLayer("submenu","visible");	
	

} 



function navMouseOut(src,lyr)
{ 
	src.className="";
//	onlpgld(default_menu_item);
	
}


function navMouseOversUB(src)
{ 
	src.className="topBand2MO"

} 
function navMouseOutsUB(src)
{ 
	src.className="topBand2"
}
function navMouseBotOut(src)
{
	src.className="leftnavcell"
}
function navMouseBotOver(src)
{
	src.className="leftnavcellover"
}

function loadMenu(index)
{
	writeMenu("menu",item);
	showHideLayer("menu","visible");	
	if (index >= 0)
	{
		onload(index)		
	}
}


function showMenu(e,f)
{
	var ie4=document.all&&navigator.userAgent.indexOf("Opera")==-1
	var ns6=document.getElementById&&!document.all
	var ns4=document.layers
	eventX=ie4? event.clientX : ns6? e.clientX : e.x
	eventY=ie4? event.clientY : ns6? e.clientY : e.y
	var rightedge=ie4? document.body.clientWidth-eventX : window.innerWidth-eventX
	var bottomedge=ie4? document.body.clientHeight-eventY : window.innerHeight-eventY

	var obj="floatmenu";
	this.evnt=bw.dom? 	document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?document.layers[obj]:0;
	if(!this.evnt) return false
	this.css=bw.dom||bw.ie4?this.evnt.style:bw.ns4?this.evnt:0;	
   	this.wref=bw.dom||bw.ie4?this.evnt:bw.ns4?this.css.document:0;	
	this.css.visibility = "visible";
	this.css.left=ie4? document.body.scrollLeft+eventX : ns6? window.pageXOffset+eventX : eventX
	 if (bottomedge<this.css.contentheight)
		this.css.top=ie4? document.body.scrollTop+eventY-this.css.contentheight : ns6? window.pageYOffset+eventY-this.css.contentheight : eventY-this.css.contentheight;
	 else
		 this.css.top=ie4? document.body.scrollTop+event.clientY : ns6? window.pageYOffset+eventY : eventY 

	this.css.visibility="visible";
	this.css.top=eventX;

	alert(eventX);

}


function writeMenu(obj,item)
{
  	this.evnt=bw.dom? document.getElementById(obj):bw.ie4?document.all[obj]:bw.ns4?document.layers[obj]:0;
	if(!this.evnt) return false
	this.css=bw.dom||bw.ie4?this.evnt.style:bw.ns4?this.evnt:0;	
   	this.wref=bw.dom||bw.ie4?this.evnt:bw.ns4?this.css.document:0;	
	thecontent=(item==-1)? "" : menu;
	this.wref.innerHTML=thecontent;

}

function setCSS(typ)
{ 
	var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) 
	{

	    if(a.getAttribute("rel").indexOf("style") != -1 && 	a.getAttribute("title")) {
      	    a.disabled = true;
            if(a.getAttribute("title") == typ) a.disabled = false;
    }
  }
	
}



function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}


function openWin(pg)
{

if (pg.indexOf('special') >= 0 )
{
var attributes = 'toolbar=0,location=0,directories=0,status=0, menubar=0,scrollbars=1,resizable=1,width=800,height=600,left=0,top=0';
}
else
{
var attributes = 'toolbar=0,location=0,directories=0,status=0, menubar=0,scrollbars=1,resizable=1,width=600,height=400,left=0,top=0';
}

sealWin=window.open(pg ,'',attributes); 
self.name = pg; 
}

function valfld(field)
{

	var valid = "0123456789"; // these are allowed values
	var ok = "yes";
	var temp;
	if (field.value.length == 0 )
	{
		//alert("Invalid entry! please enter number");
		field.value = ""
		field.focus();
		field.select();
		return false;	
	}
	for (var i=0; i<field.value.length; i++)
	{
		temp = "" + field.value.substring(i, i+1);
		if (valid.indexOf(temp) == "-1") 
		ok = "no";
	}
	if (ok == "no") 
	{
		alert("Invalid entry! Only numbers are allowed!");
		field.value = ""
		field.focus();
		field.select();

		return false;
	}
	else
		return true;
	}


function chkvldemail(email_address)
   {
         //Assumes that valid email addresses consist of user_name@domain.tld
         at = email_address.indexOf('@');
         dot = email_address.indexOf('.');
         
         if(at == -1 || 
            dot == -1 ||         
            dot == 0 )
		{	
			alert("Please enter valid email address 1.");
            return(false);
		}
            
         user_name = email_address.substr(0, at);
         domain_name = email_address.substr(at + 1, email_address.length);                  

         if(Validate_String(user_name) === false || Validate_String(domain_name) === false)
		{	
			alert("Please enter valid email address.");
	            return(false); 
                }
         else
		 return(true);
}

function Validate_String(string, return_invalid_chars)
         {
         valid_chars = '1234567890-_.^~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
         invalid_chars = '';
         
         if(string == null || string == '')
            return(true);
         
         //For every character on the string.   
         for(index = 0; index < string.length; index++)
            {
            charx = string.substr(index, 1);                        
            
            //Is it a valid character?
            if(valid_chars.indexOf(charx) == -1)
              {
              //If not, is it already on the list of invalid characters?
              if(invalid_chars.indexOf(charx) == -1)
                {
                //If it's not, add it.
                if(invalid_chars == '')
                   invalid_chars += charx;
                else
                   invalid_chars += ', ' + charx;
                }
              }
            }                     
            
         //If the string does not contain invalid characters, the function will return true.
         //If it does, it will either return false or a list of the invalid characters used
         //in the string, depending on the value of the second parameter.
         if(return_invalid_chars == true && invalid_chars != '')
           {
           last_comma = invalid_chars.lastIndexOf(',');
           
           if(last_comma != -1)
              invalid_chars = invalid_chars.substr(0, $last_comma) + 
              ' and ' + invalid_chars.substr(last_comma + 1, invalid_chars.length);
                      
           return(invalid_chars);
           }
         else
           return(invalid_chars == ''); 
         }

function trimstr(par)
{

while (par.charAt(0)==" "){
par=par.replace(" ","")
}
i=par.length-1
while(par.charAt(i)==" "){
par=par.slice(0,i)
i=i-1
}
return par
}

// var xyz = createBar(
// total_width,
// total_height,
// background_color,
// border_width,
// border_color,
// block_color,
// scroll_speed,
// block_count,
// scroll_count,
// action_to_perform_after_scrolled_n_times
// )

var w3c=(document.getElementById)?true:false;
var ie=(document.all)?true:false;
var N=-1;
var back_color='white';
var bar_color='green';
function createBar(w,h,bgc,brdW,brdC,blkC,speed,blocks,count,action,flag){
if(ie||w3c){

	bgc=back_color;
	blkC=bar_color;

if (flag!=''){
	h=13;
	}
h=10
var t='<div id="_xpbar'+(++N)+'" style="visibility:visible; position:relative; overflow:hidden; width:'+w+'px; height:'+h+'px; background-color:'+bgc+'; border-color:'+brdC+'; border-width:'+brdW+'px; border-style:solid; font-size:1px;">';
t+='<span id="blocks'+N+'" style="left:-'+(h*2+1)+'px; position:absolute; font-size:1px">';
for(i=0;i<blocks;i++){
t+='<span style="background-color:'+blkC+'; left:-'+((h*i)+i)+'px; font-size:1px; position:absolute; width:'+h+'px; height:'+h+'px; '
t+=(ie)?'filter:alpha(opacity='+(100-i*(100/blocks))+')':'-Moz-opacity:'+((100-i*(100/blocks))/100);
t+='"></span>';
}
t+='</span></div>';
document.write(t);
var bA=(ie)?document.all['blocks'+N]:document.getElementById('blocks'+N);
bA.bar=(ie)?document.all['_xpbar'+N]:document.getElementById('_xpbar'+N);
bA.blocks=blocks;
bA.N=N;
bA.w=w;
bA.h=h;
bA.speed=speed;
bA.ctr=0;
bA.count=count;
bA.action=action;
bA.togglePause=togglePause;
bA.showBar=function(){
this.bar.style.visibility="visible";
}
bA.hideBar=function(){
this.bar.style.visibility="hidden";
}
bA.tid=setInterval('startBar('+N+')',speed);
return bA;
}}

function startBar(bn){
var t=(ie)?document.all['blocks'+bn]:document.getElementById('blocks'+bn);
if(parseInt(t.style.left)+t.h+1-(t.blocks*t.h+t.blocks)>t.w){
t.style.left=-(t.h*2+1)+'px';
t.ctr++;
if(t.ctr>=t.count){
eval(t.action);
t.ctr=0;
}}else t.style.left=(parseInt(t.style.left)+t.h+1)+'px';
}

function togglePause(){
if(this.tid==0){
this.tid=setInterval('startBar('+this.N+')',this.speed);
}else{
clearInterval(this.tid);
this.tid=0;
}}

function togglePause(){
if(this.tid==0){
this.tid=setInterval('startBar('+this.N+')',this.speed);
}else{
clearInterval(this.tid);
this.tid=0;
}}

function showpp(el_id)
{
	if (document.getElementById(el_id).style.display=="")
	{
	document.getElementById(el_id).style.display="none";
	}
	else
	{
	document.getElementById(el_id).style.display=""
	}	
}


document.write('<script type="text/javascript" src="http://www.medknow.com/js/_dirj.js"><\/script>')
window.onload=setW


function setW()
{//alert(screen.width)
	if (document.getElementById('submenu')!=null)
		document.getElementById('submenu').width=1;
	 if (getCookie('_pl') !=null)
	{
			setCW (getCookie('_pl'));
	}
	else if (screen.width <1024)
	{

		if (document.getElementById('tsw1')!=null)
			document.getElementById('tsw1').width=760;
		if (document.getElementById('tsw2')!=null)
			document.getElementById('tsw2').width=760;
		if (document.getElementById('tsw3')!=null)
			document.getElementById('tsw3').width=760;}

}


function setCW(wd)
{
	//alert(screen.width);
	setCookie ('_pl',wd,60);
	if (wd =='w')
	{

		if (document.getElementById('tsw1')!=null)
			document.getElementById('tsw1').width=1000;
		if (document.getElementById('tsw2')!=null)
			document.getElementById('tsw2').width=1000;
		if (document.getElementById('tsw3')!=null)
			document.getElementById('tsw3').width=1000;
	}
	else if (wd =='n')
	{

		if (document.getElementById('tsw1')!=null)
			document.getElementById('tsw1').width=764;
		if (document.getElementById('tsw2')!=null)
			document.getElementById('tsw2').width=764;
		if (document.getElementById('tsw3')!=null)
			document.getElementById('tsw3').width=764;
	}
	else if (wd =='f')
	{

		if (document.getElementById('tsw1')!=null)
			document.getElementById('tsw1').width='100%';
		if (document.getElementById('tsw2')!=null)
			document.getElementById('tsw2').width='100%';
		if (document.getElementById('tsw3')!=null)
			document.getElementById('tsw3').width='100%';
	}
}



function getCookie(NameOfCookie)
{

// First we check to see if there is a cookie stored.
// Otherwise the length of document.cookie would be zero.

if (document.cookie.length > 0) 
{ 

// Second we check to see if the cookie's name is stored in the
// "document.cookie" object for the page.

// Since more than one cookie can be set on a
// single page it is possible that our cookie
// is not present, even though the "document.cookie" object
// is not just an empty text.
// If our cookie name is not present the value -1 is stored
// in the variable called "begin".

begin = document.cookie.indexOf(NameOfCookie+"="); 
if (begin != -1) // Note: != means "is not equal to"
{ 

// Our cookie was set. 
// The value stored in the cookie is returned from the function.

begin += NameOfCookie.length+1; 
end = document.cookie.indexOf(";", begin);
if (end == -1) end = document.cookie.length;
return unescape(document.cookie.substring(begin, end)); } 
}
return null; 

// Our cookie was not set. 
// The value "null" is returned from the function.

}

function setCookie(NameOfCookie, value, expiredays) 
{

// Three variables are used to set the new cookie. 
// The name of the cookie, the value to be stored,
// and finally the number of days until the cookie expires.
// The first lines in the function convert 
// the number of days to a valid date.

var ExpireDate = new Date ();
ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

// The next line stores the cookie, simply by assigning 
// the values to the "document.cookie" object.
// Note the date is converted to Greenwich Mean time using
// the "toGMTstring()" function.

document.cookie = NameOfCookie + "=" + escape(value) + 
((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
}
document.write('<script type="text/javascript" src="http://www.medknow.com/js/commonjsinclude.js"><\/script>')
document.write('<script language="javascript" type="text/javascript" src="http://www.medknow.com/js/countries.js"></script>')

