jwplayer.vast={},function(a){function b(b){var c;return a.utils.foreach(b,function(a,b){c=c||{},c[a]="_adQueue"===a?b.slice():b}),c}function c(a,b){return"%"===a.toString().slice(-1)?b*parseFloat(a.slice(0,-1))/100:parseFloat(a)}a.vast.schedule=function(){var d,e,f,g=[],h=0;this.setPreRoll=function(a){d=a},this.getPreRoll=function(){return b(d)},this.getPostRoll=function(){return b(f)},this.getNextMidRoll=function(a,d){if(this.sort(d),g.length>=h+1){var e=g[h],f=c(e._offSet,d);if(a>f)return h++,b(e)}},this.getMidRolls=function(){var c=[];return a.utils.foreach(g,function(a,d){c.push(b(d))}),c},this.reset=function(){h=0},this.addMidRoll=function(a){g.push(a)},this.setPostRoll=function(a){f=a},this.sort=function(a){(!a||1>a)&&(a=1),g.sort(function(b,d){return c(b._offSet,a)-c(d._offSet,a)})},this.setVMAP=function(a){e=a},this.isVMAP=function(){return e?!0:!1},this.getVMAP=function(){return e}}}(jwplayer),function(a){function b(a){return h.isString(a)?[a]:h.isArray(a)?a.slice(0):a}function c(a){if("start"===a||"0%"===a)return"pre";if("end"===a||"100%"===a)return"post";if("pre"===a||"post"===a||h.indexOf(a,"%")>-1)return a;var b=g.seconds(a);return h.isNumber(b)?b:!1}function d(a,d){var e=d.schedule||d.adschedule;h.each(e,function(d){d.ad&&(g.extend(d,d.ad),delete d.ad);var e=c(d.offset),f={_offSet:e,_type:d.type};if(e===!1&&g.log("Error: ad offset format not supported",e),d.tag)f._adQueue=b(d.tag);else{if(!h.isString(d.vastxml))return void g.log("Error: no ad tag provided");f._adXML=d.vastxml}switch(e){case"pre":a.setPreRoll(f);break;case"post":a.setPostRoll(f);break;default:a.addMidRoll(f)}})}function e(c){var e=new a.vast.schedule;if(c.tag)e.setPreRoll({_offSet:"pre",_adQueue:b(c.tag)});else if(h.isString(c.vastxml))e.setPreRoll({_offSet:"pre",_adXML:c.vastxml});else{if(h.isString(c.schedule))return e.setVMAP(c.schedule),e;d(e,c)}return e.sort(),e}function f(a){var b={cuetext:a.cuetext||l,dynamicMessage:a.admessage||i,podMessage:a.podmessage||j,skipoffset:a.skipoffset||k,skipMessage:a.skipmessage||m,skipText:a.skiptext||n},c=a.companiondiv;return c&&(b.companion={id:c.id,height:c.height,width:c.width}),b}var g=a.utils,h=a._,i="Quảng cáo kết thúc sau xx giây.",j="Ad __AD_POD_CURRENT__ of __AD_POD_LENGTH__. ",k=-1,l="Quảng cáo",m="Bỏ qua sau xx",n="Bỏ qua";a.vast.configparser={getSchedule:e,getOptParams:f}}(jwplayer),function(a){function b(a,b,c){var d=[];return a&&(d=a.getElementsByTagName(b),c&&d&&0===d.length&&(d=a.getElementsByTagName(c+":"+b))),d}function c(a,b){return a?a.getAttribute(b):null}function d(a){if(a){var b=a.textContent||a.text;if(b)return g.trim(b)}return""}function e(a,b){var e=c(b,"event");if("progress"===e){var g=c(b,"offset");e=e+"_"+g}var h=d(b);f(a,e,h)}function f(a,b,c){a[b]||(a[b]=[]),c&&a[b].push(c)}var g=a.utils,h="vmap";a.vast.vmapparser=function(a,f){for(var i=b(a,"AdBreak",h),j=0;j<i.length;j++){var k={},l={},m=i[j],n=c(m,"timeOffset"),o=c(m,"breakType"),p=b(m,"AdTagURI",h)[0],q=b(m,"VASTData",h)[0]||b(m,"VASTAdData",h)[0],r=c(p,"templateType"),s=d(p),t=b(m,"TrackingEvents",h)[0],u=b(t,"Tracking",h);if(k._type=o,q)k._adXML=b(q,"VAST")[0];else{if("vast1"!=r&&"vast2"!=r&&"vast3"!=r)continue;k._adQueue=[s]}if(u)for(var v=0;v<u.length;v++)e(l,u[v]);switch(k._trackers=l,k._type=o,n){case"start":k._offSet="pre",f.setPreRoll(k);break;case"100%":case"end":k._offSet="post",f.setPostRoll(k);break;default:if(/^#/.test(n))break;k._offSet=/^\d\d?(?:\.\d+)?%$/.test(n)?n:g.seconds(n),f.addMidRoll(k)}}f.sort()},a.vast.vparser=function(a){function h(a){var d,e,f,g=[];"VAST"===a.nodeName?d=a:(d=b(a,"VAST")[0],d||(d=b(a,"VideoAdServingTemplate")[0])),d||k(101,"Invalid VAST response"),e="VideoAdServingTemplate"===d.tagName?1:parseFloat(c(d,"version")||0),f=b(d,"Ad");for(var h=0;h<f.length;h++){var j=i(e,f[h]);j.vastversion=e,g.push(j)}r=g}function i(a,e,f){f=f||{};var g,h=b(e,"InLine")[0],i=b(e,"Wrapper")[0],o=h?h:i,p=o?d(b(o,"AdTitle")[0]):"";return f.sequence=c(e,"sequence"),f.adTitle=p,(!a||a>3||1>a)&&k(102,"Vast version not supported"),o?(a>=2?(g=m(o),l(o,"Impression",g.trackers),l(o,"Error",g.trackers)):g=n(o),i&&(g.wrappedURI=d(b(i,"VASTAdTagURI")[0])||d(b(i,"VASTAdTagURL")[0])),g=j(f,g)):k(101,"Invalid VAST response"),g}function j(a,b){var c=g.extend({},a);return g.foreach(b,function(a,d){c[a]=g.exists(c[a])?"array"==g.typeOf(d)?c[a].concat(d):"object"==g.typeOf(d)?g.extend(c[a],b[a]):d:d}),c}function k(a,b){throw s={code:a,message:b,toString:function(){return this.code+" "+this.message}}}function l(a,c,e){var g,h=b(a,c);for(g=0;g<h.length;g++)f(e,c.toLowerCase(),d(h[g]))}function m(a){var g,h,i,j,k,l,m,n,r,s=b(b(a,"Creatives")[0],"Creative"),t={},u={trackers:t};for(u.adsystem=d(b(a,"AdSystem")[0]),h=0;h<s.length;h++){if(g=s[h],j=b(g,"Linear")[0],k=b(g,"NonLinear")[0],l=b(b(g,"TrackingEvents")[0],"Tracking"),j||k)for(i=0;i<l.length;i++)e(t,l[i]);if(m=d(b(g,"AdParameters")[0]),m&&(u.adParams=m),j){n=b(j,"VideoClicks")[0],r=d(b(n,"ClickThrough")[0]);for(var v=b(n,"ClickTracking"),w=c(j,"skipoffset"),x=0;x<v.length;x++)f(t,"click",d(v[x]));r&&(u.clickthrough=r),w&&(u.skipoffset=w),o(j,u)}else k?(r=d(b(k,"NonLinearClickThrough")[0]),r&&(u.clickthrough=r),p(g,u)):q(g,u)}return u}function n(a){var g,h,i,j,k,l,m,n,p,q,r,s,t=b(a,"Video")[0]||a,u=b(a,"NonLinear")[0],v={},w={trackers:v};if(t){for(g=b(b(a,"TrackingEvents")[0],"Tracking"),h=0;h<g.length;h++)e(v,g[h]);for(j=b(b(a,"Impression")[0],"URL"),h=0;h<j.length;h++)i=j[h],f(v,"impression",d(i));for(k=b(b(a,"Error")[0],"URL"),h=0;h<k.length;h++)i=k[h],f(v,"error",d(i));n=b(t,"VideoClicks")[0],p=d(b(n,"ClickThrough")[0]);for(var x=b(b(n,"ClickTracking")[0],"URL"),y=0;y<x.length;y++)f(v,"click",d(x[y]));if(p&&(w.clickthrough=p),q&&f(v,"click",q),o(t,w),r=b(t,"AdParameters")[0],r&&(s=c(r,"apiFramework"),"vpaid"==s.toLowerCase())){for(var z=0;z<w.media.length;z++)w.media[z].adType=s;w.adParams=d(r)}}if(u){var A=w.media||[],B=b(u,"URL")[0];A.push({type:c(u,"creativeType"),file:d(B),adType:c(u,"apiFramework")}),w.media=A}for(l=b(a,"CompanionAds")[0],l=b(l,"Companion"),w.companions||(w.companions=[]),h=0;h<l.length;h++)m=l[h],w.companions.push({width:parseInt(c(m,"width"),10),height:parseInt(c(m,"height"),10),type:c(m,"resourceType"),resource:d(b(m,"URL")[0]),trackers:[],clickthrough:""});return w}function o(a,e){for(var f=b(b(a,"MediaFiles")[0],"MediaFile"),g=e.media?e.media:[],h=0;h<f.length;h++){var i={type:c(f[h],"type"),file:d(f[h]),adType:c(f[h],"apiFramework")||""};i.file&&g.push(i)}e.media=g}function p(a,e){var f=[],g=b(a,"StaticResource")[0];g&&(f.push({type:c(g,"creativeType"),file:d(g),adType:c(b(a,"NonLinear")[0],"apiFramework")||"static",minDuration:c(b(a,"NonLinear")[0],"minSuggestedDuration")||"00:00:00"}),e.media=f)}function q(a,e){var g,h,i,j,k,l,m,n,o,p,q=b(b(a,"CompanionAds")[0],"Companion"),r=e.companions?e.companions:[];for(h=0;h<q.length;h++){g=q[h],j=b(g,"StaticResource")[0],k=b(g,"IFrameResource")[0],l=b(g,"HTMLResource")[0];var s={};if(j)m=c(j,"creativeType"),n=d(j);else if(k)m="iframe",n=d(k);else{if(!l)return;m="html",n=d(l)}var t=b(b(g,"TrackingEvents")[0],"Tracking");for(i=0;i<t.length;i++)o=c(t[i],"event"),f(s,o,d(t[i]));p=d(b(g,"CompanionClickThrough")[0]),r.push({width:parseInt(c(g,"width"),10),height:parseInt(c(g,"height"),10),type:m,source:n,trackers:s,clickthrough:p})}e.companions=r}var r=[],s=null;a&&h(a),this.parse=h,this.parsedAds=function(){return r},this.error=function(){return s}}}(window.jwplayer),function(a){function b(a){return c(a)?a:g.parseXML(a)}function c(a){return"object"==typeof Node?a instanceof Node:a&&"object"==typeof a&&"number"==typeof a.nodeType&&"string"==typeof a.nodeName}function d(b){return b&&b.indexOf("://")>=0&&b.split("/")[2]!=a.location.href.split("/")[2]}var e=a.jwplayer,f=e.events,g=e.utils,h=e._,i=e.vast;i.vloader=function(a,c){function j(a){return g.ajax(a,function(b){clearTimeout(z),l(b,a)},function(b,f,h){if(h.withCredentials===!0){var i=!0;return void x.load(a,i)}return"flash"===c.getRenderingMode()&&"Invalid XML"!==b&&d(a)?(e._=e._||{},e._[c.id]=e._[c.id]||{},e._[c.id]._flashLoadSuccess=function(b){clearTimeout(z),x.parseXmlString(b,a)},e._[c.id]._flashLoadFail=function(b){clearTimeout(z),g.log(b),r(b,a)},void c.callInternal("jwLoadXML",a,'jwplayer._["'+c.id+'"]._flashLoadSuccess','jwplayer._["'+c.id+'"]._flashLoadFail')):(clearTimeout(z),void r(b,a))})}function k(a){a&&(a.onload=null,a.onreadystatechange=null,a.onerror=null,a.abort&&a.abort())}function l(b,d){v=v||new i.vparser;try{v.parse(b.responseXML)}catch(e){return void t(e.message,e.code||900,d)}var h=v.parsedAds();h&&h.length?(A=h,g.foreach(A,function(b,d){if(d.wrappedURI){var e=new i.vloader(a,c);e.addEventListener(f.COMPLETE,function(){m(d,e.allAds())}),e.addEventListener(f.ERROR,function(a){t(a.message,a.code,a.url)}),e.load(d.wrappedURI)}}),p()):t("Ad Tag Empty",101,d)}function m(a,b){var c=n(a,b),d=h.indexOf(A,a);Array.prototype.splice.apply(A,[d,1].concat(c)),p()}function n(a,b){var c=[];return g.foreach(b,function(b,d){a.companions&&(d.companions=(d.companions?d.companions:[]).concat(a.companions)),a.trackers&&(d.trackers=o(d.trackers,a.trackers)),a.sequence&&(d.sequence=a.sequence),c.push(d)}),c}function o(a,b){return a=a||{},g.foreach(b,function(b,c){a[b]=a[b]?a[b].concat(c):c}),a}function p(){var a=!1;g.foreach(A,function(b,c){c.wrappedURI&&(a=!0)}),a||q()}function q(){for(var a=A.slice(0),b=a.length,c=a.length;c--;){var d=a[c];d.media&&d.media.length||a.length--}var e=0===b,g=a.length!==b;return e||g?void t("Ad Tag Empty",101,y[y.length-1]):void u(f.COMPLETE,x)}function r(a,b){"Invalid XML"===a?t(a,100,b):t("VAST could not be loaded",301,b)}function s(){return y&&y.length?y[0]:""}function t(a,b,c){B||(B=!0,x.sendEvent(f.ERROR,{message:a,code:b,vloader:x,url:s()||c,wrappedUrl:c}))}function u(a,b){return x.sendEvent(a,b)}var v,w,x=this,y=[],z=-1,A=[],B=!1;g.extend(x,new f.eventdispatcher),x.load=function(a,b){y.push(a),B=!1;var c=j(a);c&&(!b&&"withCredentials"in c&&(c.withCredentials=!0),w=c,clearTimeout(z),z=setTimeout(function(){k(c),r("Timeout",a)},5e3))},x.destroy=function(){clearTimeout(z),k(w),c=null},x.scheduledAd=function(){return a},x.allAds=function(){return A},x.adPod=function(){var a=[];return g.foreach(A,function(b,c){c.sequence&&a.push(c)}),a.sort(function(a,b){return a.sequence-b.sequence}),a},x.adBuffet=function(){var a=[];return g.foreach(A,function(b,c){c.sequence||a.push(c)}),a},x.history=function(){return y},x.parseXmlString=function(a,c){l({responseXML:b(a)},c)}}}(window),function(a){a.vast.companion=function(b){function c(c){if(c=c.creativeView){b&&(a._[b].companionvast.creativeView=a._[b].companionvast.creativeView||[]);for(var d=0;d<c.length;d++){var e=new Image;e.src=c[d],b&&a._[b].companionvast.creativeView.push(c[d])}}}function d(a,b,c){var d=document.createElement("param");d.setAttribute("name",b),d.setAttribute("value",c),a.appendChild(d)}function e(a){if(i.removeCompanion(),"html"==a.type)return h.innerHTML=a.source,void c(a.trackers);if("iframe"==a.type){var b=document.createElement("iframe");return b.height=g.height,b.width=g.width,b.src=a.source,b.scrolling="no",b.style.border="none",b.marginWidth=0,b.marginHeight=0,c(a.trackers),h.innerHTML="",void h.appendChild(b)}if("application/x-shockwave-flash"==a.type){if(j.isMSIE()){var e='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width="100%" height="100%"id="'+h.id+'" name="'+h.id+'" tabindex=0"">';e+='<param name="movie" value="'+a.source+'">',e+='<param name="allowfullscreen" value="true">',e+='<param name="allowscriptaccess" value="always">',e+='<param name="scale" value="exactfit">',e+='<param name="seamlesstabbing" value="true">',e+='<param name="wmode" value= "opaque">',e+="</object>",h.innerHTML=e}else{var f=document.createElement("object");f.setAttribute("type","application/x-shockwave-flash"),f.setAttribute("data",a.source),f.setAttribute("width","100%"),f.setAttribute("height","100%"),f.setAttribute("tabindex",0),d(f,"allowfullscreen","true"),d(f,"allowscriptaccess","always"),d(f,"seamlesstabbing","true"),d(f,"wmode","opaque"),h.appendChild(f)}return void c(a.trackers)}var k=new Image;k.src=a.source,j.exists(a.clickthrough)&&(k.onclick=function(){var b=window.open(a.clickthrough,"_blank");b.focus()}),h.innerHTML="",h.appendChild(k),c(a.trackers)}function f(a){return a.width==g.width&&a.height==g.height}var g,h,i=this,j=a.utils;b&&(a._=a._||{},a._[b]=a._[b]||{},a._[b].companionvast={}),i.addCompanion=function(a,b){if(g=a,h=document.getElementById(g.id),!h)return!1;for(var c=0;c<b.length;c++)if(f(b[c]))return e(b[c]),!0;return!1},i.removeCompanion=function(){h.innerHTML=""}}}(jwplayer),function(a){var b=a.utils,c="[ERRORCODE]";a.vast.tracker=function(d,e){function f(a){return d.hasOwnProperty(a)?d[a]:[]}function g(a,b){var c,d,e,g=f(a);for(n&&(n[a]=n[a]||[]),c=0;c<g.length;c++)if(d=g[c]){if(b)for(var h in b)if(b.hasOwnProperty(h)){var i=b[h];d=d.replace(h,i)}e=new Image,e.src=d,n&&n[a].push(d)}}function h(){p.started=!0,g("start")}function i(){p.started=!0,g("breakStart")}function j(a,b){if(b)for(var c=(4*a+.05)/b|0;c>o&&3>o;)o++,1===o?g("firstQuartile"):2===o?g("midpoint"):3===o&&g("thirdQuartile");k(a,b)}function k(a,b){for(var c=q.length;c--;){var d=q[c];if(!d.tracked){var e=d.offset;d.percentage&&(e=b*e/100),a>=e&&(d.tracked=!0,g(d.key))}}}function l(a){p.firedError=!0,a=a||900;var b={};b[c]=a,g("error",b)}function m(a){return function(){g(a)}}var n,o=0,p=this,q=[];e&&(a._=a._||{},a._[e]=a._[e]||{},a._[e].trackedvast=a._[e].trackedvast||{},n=a._[e].trackedvast);for(var r in d)if(d.hasOwnProperty(r)&&0===r.indexOf("progress")){var s=""+r.split("_")[1],t={key:r,offset:s,tracked:!1,percentage:!1};/^\d+%$/.test(s)?(t.percentage=!0,t.offset=parseFloat(s)):t.offset=b.seconds(s),q.push(t)}p.started=!1,p.firedError=!1,p.hasComp=!1,p.addUrl=function(a,b){d.hasOwnProperty(a)?d[a].push(b):(d[a]=[],d[a].push(b))},p.creativeView=m("creativeView"),p.start=h,p.click=m("click"),p.skip=m("skip"),p.complete=m("complete"),p.pause=m("pause"),p.resume=m("resume"),p.mute=m("mute"),p.unmute=m("unmute"),p.fullscreen=m("fullscreen"),p.expand=m("expand"),p.collapse=m("collapse"),p.acceptInvitation=m("acceptInvitation"),p.close=m("close"),p.rewind=m("rewind"),p.impression=m("impression"),p.breakStart=i,p.breakEnd=m("breakEnd"),p.time=j,p.error=l}}(window.jwplayer),function(a){var b,c,d=a.utils,e=a.events,f=e.JWPLAYER_MEDIA_TIME,g={CLICK:"onClick",PLAY:"onPlay",PAUSE:"onPause",ERROR:"onError",COMPLETE:"onComplete"},h="_staticLoadSuccess",i="_staticLoadFail",j="_clickHandler",k=function(b,c,f){function k(a){return["jwplayer","_",b.id,a].join(".")}var l=-1,m=this,n=a._[b.id];d.extend(this,new e.eventdispatcher),n[h]=function(){b.callInternal("jwAddClickHandler",k(j)),m.sendEvent(g.PLAY)},n[i]=function(){m.sendEvent(g.ERROR)},n[j]=function(){m.sendEvent(g.CLICK)},l=setTimeout(function(){b.callInternal("jwLoadStatic",c,f,k(h),k(i))},0),m.removeListeners=function(){clearTimeout(l),m.resetEventListeners()},m.stop=function(){b.callInternal("jwStopStatic")}},l="data:image/png;base64,",m="iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAw0lEQVQ4y2NgwATcQJwGxGuB+BoQP4PSa6Hi3AwEQCAQX4BqxIUvQNVhBcUENKPjYmwueEYGDkYOg4tkGnIViPlAhiSiS+7du/eHs7PzG2QxFxeXNyBxLAaB9DOsQJcAaXj79u1fmEEwPojGYghIP8N5bE6Faayurv6Ix4BnUP0MD3H5GWTAfyAA0XjC5SFOl4C8guwS9DBCd8kKXAaghwkOg1ZSLXaokk5AIIhMQ0KonneQXURMLg4mVBzAypN1xJYnALKHAXPzEPJQAAAAAElFTkSuQmCC",n="iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAiklEQVQ4y2NgwATcQJwGxGuB+BoQP4PSa6Hi3AwEQCAQX4BqxIUvQNVhBcUENKPjYmwueEYGDkYOg4tkGnIViPlAhiTiU/gfCAgYBNLPsIJCQ0D6Gc5TaAhIP8NDbBpxASyGPKSaSygNk5VUix2qpBMQCCLTkBCq5x1kFxGTi4MJFQew8mQdseUJAImp82D/nQbxAAAAAElFTkSuQmCC",o={cursor:"pointer",position:"absolute",margin:"auto",left:0,right:0,bottom:0,display:"block"},p="opacity 0.2s",q={"-webkit-transition":p,transition:p},r=function(a,f,h,i){function j(){clearTimeout(z),B.sendEvent(g.ERROR),x()}function k(){B.sendEvent(g.CLICK)}function l(){t(c)}function m(){t(c,.75)}function n(){t(b)}function p(){t(b,.5)}function r(a){-1===A&&(a.preventDefault(),i.onmouseover=i.onmouseout=null,u([y,c,b]),i.appendChild(b),A=setTimeout(function(){v(y),v(c),t(b,.5),i.onmouseover=n,i.onmouseout=p,A=-1},250))}function s(a){-1===A&&(a.preventDefault(),i.onmouseover=i.onmouseout=null,i.appendChild(y),i.appendChild(c),A=setTimeout(function(){t([y,c]),i.onmouseover=l,i.onmouseout=m,A=-1},50),u(b))}function t(a,b){d.css.style(a,{opacity:b||1})}function u(a){d.css.style(a,{opacity:0})}function v(a){i.contains(a)&&i.removeChild(a)}function w(){y.onload=y.onerror=null}function x(){w(),v(y)}var y,z=-1,A=-1,B=this;d.extend(this,new e.eventdispatcher);var C=i.parentNode,D=d.bounds(C).bottom,E=document.getElementById(a.id+"_controlbar"),F="none"===E.style.display,G=0;F&&(G=E.style.opacity,E.style.opacity=0,E.style.display="inline-block");var H=d.bounds(E).top||D-40;F&&(E.style.opacity=G,E.style.displa="none");var I=D-H;d.css.style(i,{bottom:I}),y=document.createElement("img"),y.id=a.id+"_vast_static",d.css.style(y,d.extend({"max-width":"100%",opacity:0},o,q)),u([c,b]),v(b),i.appendChild(y),i.appendChild(c),z=setTimeout(j,5e3),y.onerror=j,y.onload=function(){if(clearTimeout(z),0===y.naturalWidth)return j();if(w(),d.css.style(y,{top:-y.height},!0),d.css.style(c,{top:-y.height-8,bottom:y.height-8,left:y.width},!0),d.css.style(b,{top:-16},!0),t([i,y]),t(c,.75),d.isMobile()){var a=new d.touch(y);a.addEventListener(d.touchEvents.TAP,k)}else y.onclick=k,i.onmouseover=l,i.onmouseout=m;c.onclick=c.ontouchstart=r,b.onclick=b.ontouchstart=s,B.sendEvent(g.PLAY)},y.src=f,B.removeListeners=function(){clearTimeout(z),clearTimeout(A),i.onmouseover=i.onmouseout=c.onclick=b.onclick=null,B.resetEventListeners(),w()},B.stop=function(){u([i,y,c,b]),setTimeout(x,400),v(c),v(b)}};a.vast.staticplayer=function(h,i){function j(a){A.sendEvent(f,a)}function p(){C=h.getPosition(),D>0&&(0===C?A.addEventListener(f,s):A.addEventListener(f,t)),w(g.PLAY)}function s(a){C=a.position,A.removeEventListener(f,s),A.addEventListener(f,t)}function t(a){var b=a.position-C;b>D&&(A.removeEventListener(f,t),A.stop())}function u(){w(g.CLICK)}function v(){w(g.ERROR)}function w(a,b){b=b||{},b.tag=b.tag||z,A.sendEvent(a,b)}function x(a){return function(b){A.addEventListener(a,b)}}var y,z,A=this,B="html5"!==h.getRenderingMode(),C=0,D=0;if(d.extend(this,new e.eventdispatcher),A.type="static",B)a._=a._||{},a._[h.id]=a._[h.id]||{},i.style.visibility="hidden";else{var E=d.isFF()?{}:q;i.style.opacity=0,d.css.style(i,d.extend({top:"",position:"absolute",width:"100%"},E)),c=c||document.createElement("img"),b=b||document.createElement("img"),d.css.style([c,b],d.extend({opacity:.75},o,E)),c.src=l+m,b.src=l+n}h.onTime(j),A.playAd=function(a,b,c,e){D=d.seconds(c),z=e,y&&(y.removeListeners(),y.stop()),y=B?new k(h,a,b):new r(h,a,b,i),y.addEventListener(g.PLAY,p),y.addEventListener(g.CLICK,u),y.addEventListener(g.ERROR,v)},A.removeEvents=function(){A.resetEventListeners()},A.getState=function(){return e.state.PLAYING},A.stop=function(){C&&y&&(C=0,D=0,A.removeEventListener(f,s),A.removeEventListener(f,t),y.removeListeners(),y.stop(),w(g.COMPLETE))},A.pause=function(){},A.onPlay=x(g.PLAY),A.onComplete=x(g.COMPLETE),A.onClick=x(g.CLICK),A.onError=x(g.ERROR)}}(window.jwplayer),function(a){a.vast.vpaidevents={AD_LOADED:"AdLoaded",AD_STARTED:"AdStarted",AD_STOPPED:"AdStopped",AD_LINEAR_CHANGE:"AdLinearChange",AD_EXPANDED_CHANGE:"AdExpandedChange",AD_REMAINING_TIME_CHANGE:"AdRemainingTimeChange",AD_VOLUME_CHANGE:"AdVolumeChange",AD_IMPRESSION:"AdImpression",AD_VIDEO_START:"AdVideoStart",AD_VIDEO_FIRST_QUARTILE:"AdVideoFirstQuartile",AD_VIDEO_MIDPOINT:"AdVideoMidpoint",AD_VIDEO_THIRD_QUARTILE:"AdVideoThirdQuartile",AD_VIDEO_COMPLETE:"AdVideoComplete",AD_CLICK_THRU:"AdClickThru",AD_USER_ACCEPT_INVITATION:"AdUserAcceptInvitation",AD_USER_MINIMIZE:"AdUserMinimize",AD_USER_CLOSE:"AdUserClose",AD_PAUSED:"AdPaused",AD_PLAYING:"AdPlaying",AD_LOG:"AdLog",AD_ERROR:"AdError"}}(jwplayer),function(a){var b=a.jwplayer,c=b.vast,d="PLAYING",e="PAUSED",f="BUFFERING",g="IDLE",h=!0,i=!1;c.vpaidplayer=function(a,j,k,l){function m(){b._=b._||{},b._[a.id]=b._[a.id]||{},a.callInternal("jwLoadVPAID",j,H(n),H(o))}function n(){G(Q.AD_LOADED,q),G(Q.AD_STARTED,r),G(Q.AD_LINEAR_CHANGE,t),G(Q.AD_EXPANDED_CHANGE,u),G(Q.AD_PAUSED,w),G(Q.AD_PLAYING,x),G(Q.AD_STOPPED,v),G(Q.AD_REMAINING_TIME_CHANGE,y),G(Q.AD_CLICK_THRU,s),G(Q.AD_ERROR,o),G(Q.AD_VIDEO_FIRST_QUARTILE,A),G(Q.AD_VIDEO_MIDPOINT,B),G(Q.AD_VIDEO_THIRD_QUARTILE,C);var b=a.getSafeRegion(!1);D("initAd",b.width,b.height+b.y,a.getFullscreen()?"fullscreen":"normal",0,l)}function o(){p(R.ERROR)}function p(a,b){P&&(b=b||{},b.tag||(b.tag=k),P.sendEvent(a,b))}function q(){t(),F("adVolume",a.getMute()?0:a.getVolume()/100),D("startAd")}function r(){K&&L.blocking&&L.blocking.hide(),p(R.PLAY,{oldstate:f,newstate:d,linear:K?"linear":"nonlinear"})}function s(){p(R.CLICK)}function t(){var b,c;if(K=E("adLinear")){if(L.blocking)L.blocking.hide();else{var e=a.getState();(e==d||e==f)&&(M=h,a.pause(),a.setControls(i))}safe=a.getSafeRegion(!1),c=safe.height+safe.y,b=safe.width}else L.blocking?(L.blocking.destroy(),L.blocking=null):M&&(a.play(h),a.setControls(h)),safe=a.getSafeRegion(),c=safe.height+safe.y,b=safe.width;D("resizeAd",b,c,a.getFullscreen()?"fullscreen":"normal")}function u(){var a=E("adExpanded");p(R.EXPANDED_CHANGE,{expanded:a})}function v(){M&&(a.play(h),a.setControls(h)),p(R.COMPLETE)}function w(){O||(O=h,p(R.PAUSE,{newstate:e,oldstate:d}))}function x(){O&&(O=i,p(R.PLAY,{newstate:d,oldstate:e}))}function y(){var a=Math.max(E("adRemainingTime")||0,0);N=Math.max(N,a,1),p(R.TIME,{position:N-a,duration:N})}function z(a){var b=Math.max(E("adRemainingTime")||0,0);N=Math.max(N,4*b/(4-a),1),p(R.TIME,{position:N*a*.25,duration:N})}function A(){z(1)}function B(){z(2)}function C(){z(3)}function D(){var b=Array.prototype.slice.call(arguments);b.unshift("jwCallVPAID"),setTimeout(function(){a.callInternal.apply(this,b)},0)}function E(b){return a.callInternal("jwGetVPAIDProperty",b)}function F(b,c){a.callInternal("jwSetVPAIDProperty",b,c)}function G(b,c){a.callInternal("jwAddVPAIDListener",b,H(c))}function H(c){var d="_vpaidBridge"+Math.floor(1e4*Math.random());return b._[a.id][d]=I(c),"jwplayer._['"+a.id+"']['"+d+"']"}function I(a){return function(){setTimeout(a,0)}}function J(a){return function(b){P&&P.addEventListener(a,b)}}var K,L=this,M=i,N=-1,O=i,P=new b.events.eventdispatcher,Q=c.vpaidevents,R={TIME:"onTime",CLICK:"onClick",PLAY:"onPlay",PAUSE:"onPause",ERROR:"onError",COMPLETE:"onComplete",EXPANDED_CHANGE:"onExpandedChange"};L.type="vpaid",L.blocking=null,this.setVolume=function(a){F("adVolume",a)},L.setVolume=function(a){F("adVolume",a/100)},L.onTime=J(R.TIME),L.onComplete=J(R.COMPLETE),L.onClick=J(R.CLICK),L.onPlay=J(R.PLAY),L.onPause=J(R.PAUSE),L.onError=J(R.ERROR),L.onExpandedChange=J(R.EXPANDED_CHANGE),L.play=function(){D("resumeAd")},L.pause=function(){D("pauseAd")},L.stop=function(){D("stopAd")},L.resize=function(b){var c;c=a.getSafeRegion(!K),D("resizeAd",c.width,c.height+c.y,b?"fullscreen":"normal")},L.removeEvents=function(){P&&P.resetEventListeners()},L.destroy=function(){L.removeEvents(),L.blocking=null,P=null},L.getState=function(){return E("adLinear")?O?e:d:g},m()}}(window),function(a){function b(a){for(var b=[],c=0;c<a.length;c++){var d=a[c],e="iframe"==d.type||"html"==d.type?d.type:"static",f={width:d.width,height:d.height,type:e,resource:d.source,click:d.clickthrough};b.push(f)}return b}function c(a){for(var b=[],c=0;a&&c<a.length;c++)a[c].type.indexOf("flash")<0&&b.push(a[c]);return b}var d=a.jwplayer,e=d.vast,f=d.utils,g=d.events;d.vast.adplayer=function(h,i,j,k,l,m,n){function o(){X.blocking&&(p(X.blocking),X.blocking=null)}function p(a){a&&a!==Y&&a.destroy()}function q(){i&&(i.removeEventListener(g.JWPLAYER_RESIZE,A),i.removeEventListener(g.JWPLAYER_FULLSCREEN,B),i.removeEventListener(g.JWPLAYER_MEDIA_VOLUME,C),i.removeEventListener(g.JWPLAYER_MEDIA_MUTE,D)),Y&&Y.removeEvents(),X&&(o(),X.removeEvents()),j.stop(),j.removeEvents()}function r(a){a.tracker=new e.tracker(a.trackers,n)}function s(){var a={tag:cb._currentTag,client:"vast"};return $&&$.length&&(a.sequence=gb+1,a.podcount=$.length),a}function t(){fb.tracker.linear="nonlinear";var a=fb.media[0],b=fb.clickthrough||"",c=j;c.removeEvents(),c.playAd(a.file,b,a.minDuration,cb._currentTag),c.onPlay(F),c.onComplete(J),c.onClick(N),c.onError(T)}function u(a){var b=fb.media[0];X=new e.vpaidplayer(i,b.file,cb._currentTag,fb.adParams),X.blocking=a,X.onPlay(F),X.onPause(H),X.onTime(I),X.onComplete(J),X.onClick(O),X.onError(S),X.onExpandedChange(U)}function v(a){var b,c=null,d=[];if(fb&&(c=w(fb)),eb)for(b=0;b<eb.length;b++){var e=w(eb[b]),f=d.length===b;e&&f&&d.push(e)}if(!d.length&&!c)return z("No Compatible Creatives",403),!1;var g,h;if(d.length)for(g=d,h=[],b=0;b<g.length;b++)h.push(x(g[b].vastAd));else g=c,h=x(fb);return $=g,gb=0,Y=a?i.setInstream(a):i.setInstream(i.createInstream()).init(),Y.onPlay(F),Y.onPause(H),Y.onTime(I),Y.onPlaylistItem(E),Y.onComplete(K),Y.onPlaylistComplete(L),Y.onMute(M),Y.onClick(P),Y.onAdSkipped(R),Y.onError(S),Y.onMediaError(S),Y.loadItem(g,h),!0}function w(a){a.tracker.linear="linear";for(var b={vastAd:a,sources:[]},c=a.media,e=0;e<c.length;e++){var f=c[e];b.sources.push({file:f.file,type:f.type})}var g=new d.playlist.item(b),h=d.playlist.filterSources(g.sources,bb);return 0===h.length?null:b}function x(a){var b=m.skipoffset>=0?m.skipoffset:null;return{skipoffset:a.skipoffset||b,skipMessage:m.skipMessage,skipText:m.skipText}}function y(a){if($){var b;if(b=$.length?$[a]:$,b.vastAd)return b.vastAd}else if(!fb&&eb)return eb[a];return fb}function z(a,b){f.log(a),b=b||900;var c=y(gb),d=c.tracker;d.error(b);var e=s();e.code=b,e.message=a,_.sendEvent(g.JWPLAYER_AD_ERROR,e)}function A(){X&&X.resize()}function B(a){var b=y(gb),c=b.tracker;a.fullscreen&&c.started&&c.fullscreen(),A()}function C(a){X&&X.setVolume(a.volume)}function D(a){X&&X.setVolume(a.mute?0:i.getVolume())}function E(a){if(Y){gb=a.index;var b=y(gb),c=b.clickthrough||"";Y.setClick(c)}}function F(a){var e,h=y(gb),j=h.tracker;if(j.started)a.oldstate==d.events.state.PAUSED&&(j.resume(),G(a));else{X&&(j.linear=a.linear);var l=f.extend({linear:j.linear},s(),x(h));l.message=m.dynamicMessage||"",l.clickthrough=h.clickthrough,l.sequence&&(l.podMessage=m.podMessage||""),h.adTitle&&(l.title=h.adTitle),h.companions&&(l.companions=h.companions),i.dispatchEvent(g.JWPLAYER_AD_META,l),h.companions&&(e=s(),e.companions=b(h.companions),i.dispatchEvent(g.JWPLAYER_AD_COMPANIONS,e));var o=k,p=bb?h.companions:c(h.companions);m.companion&&p&&p.length&&(j.hasComp=o.addCompanion(m.companion,p));var q=V(h);j.addUrl("impression",q),n&&(d._[n].trackingURL=q),j.impression(),e=s(),e.adposition=cb._position||"",e.adtitle=h.adTitle||"",e.adsystem=h.adsystem||"",e.vastversion=h.vastversion,e.creativetype=Z,_.sendEvent(g.JWPLAYER_AD_IMPRESSION,e),j.start(),j.creativeView(),G(a)}}function G(a){if("static"!==W&&("vpaid"!==W||"linear"===a.linear)){var b=s();b.oldstate=a.oldstate,b.newstate=a.newstate,i.dispatchEvent(g.JWPLAYER_AD_PLAY,b)}}function H(a){var b=y(gb),c=b.tracker;c.pause();var d=s();d.oldstate=a.oldstate,d.newstate=a.newstate,i.dispatchEvent(g.JWPLAYER_AD_PAUSE,d)}function I(a){var b=y(gb),c=a.position,d=a.duration,e=m.dynamicMessage||"",f=m.podMessage||"",h=d-c,j=b.tracker;if(j&&j.time(c,d),Y&&e&&h>0){if(e=e.replace(/xx/gi,""+Math.round(h)),$&&$.length){var k=gb+1;f=f.replace(/__AD_POD_CURRENT__/g,""+k),f=f.replace(/__AD_POD_LENGTH__/g,""+$.length),e=f+e}Y.setText(e)}var l=s();l.position=c,l.duration=d,i.dispatchEvent(g.JWPLAYER_AD_TIME,l)}function J(){K(),L()}function K(){var a=y(gb),b=a.tracker;b.firedError||(b.complete(),b.close(),i.dispatchEvent(g.JWPLAYER_AD_COMPLETE,s()))}function L(){q(),_.sendEvent(g.JWPLAYER_AD_COMPLETE)}function M(a){var b=y(gb),c=b.tracker;c&&(a.mute?(c.mute(),X&&X.setVolume(0)):(c.unmute(),X&&X.setVolume(i.getVolume()/100)))}function N(){var a=y(gb);i.pause(!0),Q(a)}function O(){var a=y(gb);Q(a,!0)}function P(){var a=y(gb);if(bb)Q(a);else{var b=Y.getState()===g.state.PAUSED;b||Q(a)}}function Q(b,c){b.tracker.click(),i.dispatchEvent(g.JWPLAYER_AD_CLICK,s());var d=a.jwcast&&a.jwcast.player.id;!c&&bb||d||b.clickthrough&&a.open(b.clickthrough)}function R(){var a=y(gb);a.tracker.skip(),i.dispatchEvent(g.JWPLAYER_AD_SKIPPED,s())}function S(a){a.message&&-1!==a.message.indexOf("File could not be played")?z("Error Playing Creative",405):z("Error Playing Ad Tag",400)}function T(){var a="Unable to fetch NonLinear resource",b=502;z(a,b)}function U(a){var b=y(gb),c=b.tracker;a.expanded?c.expand():c.collapse()}function V(a){var b={d:l.domain,c:"vast",m:ab,a:l.account,co:a.tracker.hasComp,p:cb._position,ad:a.adsystem,type:a.tracker.linear,ph:l.hosting,ed:l.edition,n:Math.random().toFixed(16).substr(2,16)},c=l.trackingbase,d="?";for(var e in b)c+=d+e+"="+encodeURIComponent(b[e]),d="&";return c}var W,X,Y,Z,$,_=this,ab=i.getRenderingMode(),bb="flash"===ab,cb=h.scheduledAd(),db=h.adBuffet(),eb=h.adPod(),fb=db.length?db[0]:null,gb=0;f.extend(_,new g.eventdispatcher),_.init=function(a){if(_.init=function(){throw"vast.adplayer can only be initialized once"},fb&&r(fb),eb)for(var b=0;b<eb.length;b++)r(eb[b]);var c=fb||eb[0],d=c.media[0];if(W=(""+d.adType).toLowerCase(),bb&&"vpaid"===W)Z="vpaid",fb=fb||eb[0],u(a);else if("static"===W)Z="static",t(),p(a);else{Z="video";var e=v(a);if(!e)return!1;p(a)}return i.onResize(A),i.onFullscreen(B),i.onVolume(C),i.onMute(D),!0},_.getState=function(){return Y?Y.getState():X?X.getState():""},_.clearNonlinear=function(){j.stop(),X&&(o(),X.stop(),X.destroy(),X=null)},_.destroy=function(){_.resetEventListeners(),q(),null!==_&&(Y&&Y.destroy(),X&&(o(),X.destroy()),_.clearNonlinear(),_=h=i=X=Y=l=cb=db=fb=eb=null)},_.pause=function(){Y&&Y.pause()},_.play=function(){Y&&Y.play()}}}(window),function(a){function b(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}var c=a.vast,d=a.utils,e=a.events,f=a._;c.adcontroller=function(g,h,i){function j(a){if(a){Y=!0;var b,f=function(d){Y=!1,clearTimeout(b);try{c.vmapparser(d.responseXML,Q)}catch(f){return void L({message:"Error parsing VMAP",code:1002,vmap:a})}X&&(N(Q),cb&&m({type:e.JWPLAYER_MEDIA_BEFOREPLAY}))},g=function(c){Y=!1,clearTimeout(b),d.log(c),L({message:"Error Loading VMAP Schedule",code:"Timeout"===c?1007:1008,vmap:a})},h=d.ajax(a,f,g);h&&(b=setTimeout(function(){Y=!1,h.onload=null,h.onreadystatechange=null,h.onerror=null,h.abort&&h.abort(),g("Timeout")},5e3))}}function k(a){fb=!!a.active}function l(a){V.sendEvent(e.state.PLAYING,a)}function m(a){if(!fb){var b=Q.getPreRoll();return Y?void u():void(!_&&b?(S=p(b),q(b,a)):J())}}function n(a){if(!fb){var b=Q.getNextMidRoll(a.position,a.duration);b&&(S=p(b),r(b,a))}}function o(a){if(!fb){var b=Q.getPostRoll();!ab&&b&&(S=p(b),s(b,a))}}function p(a){return a._trackers?new c.tracker(a._trackers,O):null}function q(a,b){a._position="pre",_=!0,t(a,b)}function r(a,b){a._position="mid",t(a,b)}function s(a,b){a._position="post",ab=!0,g.detachMedia(),t(a,b)}function t(a,b){if($=a._position,clearTimeout(ib),ib=-1,"nonlinear"!==a._type&&!cb){var c=d.isMobile()&&("pre"===$||g.isBeforePlay()||0===g.getPosition());c?b&&b.type===e.JWPLAYER_MEDIA_BEFOREPLAY&&V.addEventListener(e.state.PLAYING,u):u()}a._adXML?(a._currentTag=a._currentTag||"clientloadedtag_"+bb++,x(a)):a._adQueue?(gb=a,w()):(d.log("scheduled ad has no url or xml",a),J())}function u(){V.removeEventListener(e.state.PLAYING,u),cb=g.createInstream().init()}function v(a){var b=g.getPlaylistItem(a.index);Q=f.isObject(b)&&b.adschedule?c.configparser.getSchedule(b):R;var d;for(d=db.length;d--;){var e=db[d];db.length--,e.destroy()}E(),I(),ab=!1,_=!1,N(Q),Q.reset()}function w(){var b=gb._adQueue.shift();gb._currentTag=b;var c=A(b);O&&(a._=a._||{},a._[O]=a._[O]||{},a._[O].actualTag=c,a._[O].originalTag=b),y(gb).load(c)}function x(a){y(a).parseXmlString(a._adXML)}function y(a){var b=new c.vloader(a,g);return b.addEventListener(e.COMPLETE,C),b.addEventListener(e.ERROR,K),db.push(b),b}function z(a){for(var b=db.length;b--;)db[b]===a&&(db.splice(b,1),a.destroy())
}function A(a){if(!a)return a;var c=g.getPlaylistItem(),d=window.location.href;a=B(a,"__random-number__",Math.random()*Math.pow(10,18)),a=B(a,"__timestamp__",(new Date).getTime()),a=B(a,"__page-url__",encodeURIComponent(d)),a=B(a,"__referrer__",encodeURIComponent(document.referrer)),a=B(a,"__player-height__",g.getHeight()),a=B(a,"__player-width__",g.getWidth()),a=B(a,"__item-duration__",b(g.getDuration(),3)),a=B(a,"__domain__",encodeURIComponent(M())),a=W.companion?B(a,"__companion-div__",W.companion.id):B(a,"__companion-div__","");for(var e=a.match(new RegExp(/__item-[a-z 0-9 A-Z]*__/g)),h=0;e&&h<e.length;h++){var i=e[h],j=i.substring(7,i.length-2);if(c.hasOwnProperty(j)&&f.isString(c[j])){var k=c[j];k.length>1e3&&(k=k.substring(0,1e3)),a=B(a,i,encodeURIComponent(k))}else a=B(a,i,"")}return a}function B(a,b,c){return a.replace(b,c)}function C(a){V.removeEventListener(e.state.PLAYING,u),clearTimeout(ib),ib=-1,gb.isWaterfalling||I(),z(a);var b=new c.adplayer(a,g,T,U,Z,W,O);b.addEventListener(e.JWPLAYER_AD_ERROR,F),b.addEventListener(e.JWPLAYER_AD_IMPRESSION,G);var d=b.init(cb);return d?(cb=null,b.addEventListener(e.JWPLAYER_AD_COMPLETE,H),void eb.push(b)):void b.destroy()}function D(){I()}function E(){for(var a=eb.length;a--;){var b=eb[a];eb.length--,b.destroy()}}function F(a){return hb=!1,L(a),gb._adQueue&&gb._adQueue.length>0&&!hb?void t({_adQueue:gb._adQueue,_offset:0,_position:gb._position,isWaterfalling:!0}):(E(),void(ib=setTimeout(function(){ib=-1,0===db.length&&("post"===$&&g.attachMedia(),g.releaseState(),J())},0)))}function G(a){gb={},S&&!S.started&&S.breakStart(),g.dispatchEvent(e.JWPLAYER_AD_IMPRESSION,a)}function H(){S&&S.breakEnd(),0===db.length&&"post"===$&&g.attachMedia()}function I(){if(eb.length){var a=eb[eb.length-1];a.clearNonlinear()}}function J(){cb&&(cb.destroy(),cb=null)}function K(a){V.removeEventListener(e.state.PLAYING,u);var b=a.vloader,d=b.allAds();if(z(b),d&&d.length){var f=d[0];if(f){var g=f.trackers;if(g&&g.error){var h=new c.tracker(g,O);h.error(a.code)}}}var i={message:a.message,code:a.code,tag:a.url};return a.wrappedUrl!==a.url&&(i.wrappedTag=a.wrappedUrl),hb=!1,L(i),gb._adQueue&&gb._adQueue.length>0&&!hb?void t({_adQueue:gb._adQueue,_offset:0,_position:gb._position,isWaterfalling:!0}):(E(),void(-1===ib&&(ib=setTimeout(function(){ib=-1,0===db.length&&J()},0))))}function L(a){d.extend(a,{client:"vast"}),S&&S.error(a.code),g.dispatchEvent(e.JWPLAYER_AD_ERROR,a)}function M(){var a=window.location.href;return a=a.match(new RegExp(/^[^/]*:\/\/\/?([^\/]*)/)),a&&a.length>1?a[1]:""}function N(a){var b=a.getMidRolls(),c=[];b.length&&(d.foreach(b,function(a,b){"nonlinear"!==b._type&&c.push({begin:b._offSet,text:W.cuetext})}),g.callInternal("jwSetCues",c))}var O,P,Q,R,S,T,U,V=this,W={},X=!1,Y=!1,Z={},$="",_=!1,ab=!1,bb=0,cb=null,db=[],eb=[],fb=!1,gb={},hb=!1,ib=-1;d.extend(V,new e.eventdispatcher),R=Q=c.configparser.getSchedule(h),Q.isVMAP()&&j(Q.getVMAP()),g.onReady(function(){X=!0,h.debug&&(O=g.id),P="flash"===g.getRenderingMode(),T=new c.staticplayer(g,i),U=new c.companion(O);var b=window.location.href,e=new d.key(a.key),j=e.edition();Z.trackingbase=(b.match(/^https/)?"https://s":"http://i")+".n.jwpltx.com/v1/adclient/ping.gif",Z.account=e.token(),Z.domain=M(),Z.edition=f.indexOf(["pro","premium","ads","invalid","enterprise"],j)+1,Z.hosting=a.defaults&&a.defaults.ph?a.defaults.ph:0,W=c.configparser.getOptParams(h),g.onBeforePlay(m),g.onCast(k),g.onPlay(l),g.onTime(n),g.onBeforeComplete(o),g.onPlaylistItem(v),g.onPlaylistComplete(v),g.onComplete(D)}),V.jwPauseAd=function(){if(eb.length){var a=eb[eb.length-1],b=a.getState();b===e.state.PLAYING||b===e.state.BUFFERING?a.pause():b===e.state.PAUSED&&a.play()}},V.jwPlayAd=function(a){hb=!0,I();var b;b=f.isArray(a)?a.slice(0):[a];var c={_adQueue:b,_offset:0,_position:"api"};t(c)}},a().registerPlugin("vast","6.3",c.adcontroller,"vast.swf")}(window.jwplayer);