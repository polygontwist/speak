"use strict";

//Version 0.3 11.9.2016 23:15 von Andreas Kosmehl; basisversion
//Version 0.4 18.9.2016 02:12 von Andreas Kosmehl; wortlistencheck(innerhalb worte), Ausgabe separiert
//Version 0.5 19.9.2016 00:34 von Andreas Kosmehl; statt soundscrubbing, generiertes Audio
//Version 0.6 19.9.2016 23:09 von Andreas Kosmehl; Regler für Geschwindigkeit
//Version 0.7 20.9.2016 23:59 von Andreas Kosmehl; unbekannte Zeichen überlesen, Nummern in Worte "3in1"
//Version 0.8 20.9.2016 23:59 von Andreas Kosmehl; Sampel überlappung; iOS

/*
 Text zu lesen:
 
 Ein *Tier in der *Mitte der *Sonne ist *Reis auf.
 Die *Band ist im *Rhythmus der Musik. 
 Die *Malerei ist *hell oder dunkel.
 Auf dem *Bett ist *Physik *gewiss der *Beginn einer *Brücke über alles.
 Im *Raum herrscht *Ebbe und der *Fisch *oder der *Adler sehen zu.
 Die *Bauten im *Zoo haben ein *Rad aus *Pappe auf dem Dach.
 In der *Prüfung *kommen *Wald, *Mutter und *Pferd auf einen *Barzar nicht vor.
 Die *Freiheit ist *nie *zufällig wie *Schnee aber weiß.
 Ein *Hut vom *Pirat über dessen *Mähne sitzt.
 Ein großen *Schuh, der *Clown am Fuße hat.
 Fliegt der *Müll im hohen *Bogen die *Brüder wussten nichts.
 Doch ein *Loch wo *Häuser den *Fuchs einen *Kaffee anbieten.
 Oh wie *schön ist *Spanien im *Dirndl in diesem *Jahr zu sehen.
 Das kleine *Instrument passt ins *Auto genau.
 Aber *geben wir den *zwölf einen *Topf anbei,
 so ist auf dem *Berg keine *Qualle zu sehen.
 Die *Synode der *Familie besteht.
 In der *Reihe steht ein *Beamter wie jeder andere auch.
 
 Tagesschau
*/
/*
	todo: -generate audiofile
*/


var spraSy=function(){
	//https://de.wiktionary.org/wiki/Verzeichnis:Deutsch/Phoneme_und_Grapheme
	
	var audioSRC="phoneme.mp3";
	var timekorrekturA=-0.00;//.02+0.04;
	var timekorrekturE=+0.00;
	//nach Häufigkeit:
	var phoneDE=[
		{id:1,t:"t",k:"t,d,tt,th,dt" ,a:1,e:1.16 },
		{id:2,t:"ə",k:"e" ,a:1.5,e:1.635 },//
		{id:3,t:"n",k:"n,nn" ,a:2,e:2.083 },
		{id:4,t:"s",k:"s,ss,ß,c,z,zz" ,a:2.5,e:2.7 },
		{id:5,t:"a",k:"" ,a:3,e:3.115 },//a,ah  .. -> 20
		{id:6,t:"r",k:"r,rr,rh,rrh" ,a:3.5,e:3.565 },
		{id:7,t:"l",k:"l,ll" ,a:4,e:4.044 },
		{id:8,t:"ɛ",k:"ä" ,a:4.5,e:4.551 },//e,
		{id:9,t:"f",k:"f,v,ff,ph" ,a:5,e:5.094},
		{id:10,t:"g",k:"g,gg,gh" ,a:5.5,e:5.533},
		{id:11,t:"i",k:"i" ,a:6,e:6.051 },
		{id:12,t:"k",k:"k,g,ck,gg,c,cch,kk" ,a:6.4,e:6.55 },//0.034  //,ch,qu
		{id:13,t:"m",k:"m,mm" ,a:7,e:7.103 },
		{id:14,t:"b",k:"b,bb" ,a:7.5,e:7.565 },
		{id:15,t:"ʃ",k:"sch,s,sk,sh" ,a:8,e:8.069},//,ch 
		{id:16,t:"d",k:"d,dd" ,a:8.5,e:8.557},
		{id:17,t:"ɐ",k:"er" ,a:9,e:9.136 },
		{id:18,t:"n̩",k:"n" ,a:9.5,e:9.649},
		{id:19,t:"ʦ",k:"z,ts,tts,tz,zz,c,t" ,a:10,e:10.109},
		{id:20,t:"aː",k:"a,ah,aa" ,a:10.5,e:10.613 },
		{id:21,t:"p",k:"p,b,pp,bb" ,a:11,e:11.033 },
		{id:22,t:"ŋ",k:"ng,n" ,a:11.5,e:11.628 },
		{id:23,t:"ɔ",k:"o" ,a:12,e:12.2 },//,au
		{id:24,t:"v",k:"w,v" ,a:12.5,e:12.551 },
		{id:25,t:"ʊ",k:"u" ,a:13,e:13.079 },
		{id:26,t:"ɐ̯",k:"r" ,a:13.5,e:13.553 },
		{id:27,t:"z",k:"s,z,zz" ,a:14,e:14.072 },
		{id:28,t:"aɪ̯",k:"ei,ai,ail,aill,aille" ,a:14.5,e:14.606},//,y
		{id:29,t:"iː",k:"i,ieh,ih" ,a:15,e:15.118 },//ie,
		{id:30,t:"ç",k:"g" ,a:15.5,e:15.608 },		//ch,         // i[ch]
		{id:31,t:"eː",k:"e,eh,ee" ,a:16,e:16.187 },//,et
		{id:32,t:"h",k:"h" ,a:16.5,e:16.57 },
		{id:33,t:"i",k:"i" ,a:17,e:17.046 },//,y
		{id:34,t:"ɛː",k:"ä,äh" ,a:17.5,e:17.622 },
		{id:35,t:"uː",k:"u,uh,ou,oo" ,a:18,e:18.173 },
		{id:36,t:"aʊ̯",k:"au,ou,ow" ,a:18.5,e:18.637 },
		{id:37,t:"ʏ",k:"ü,y,u" ,a:19,e:19.087 },
		{id:38,t:"oː",k:"o,oh,oo,au,eau" ,a:19.5,e:19.576 },
		{id:39,t:"yː",k:"ü,üh,üt,y,u" ,a:20,e:20.099 },
		{id:40,t:"x",k:"ch" ,a:20.5,e:20.617 },					 //au[ch]
		{id:41,t:"ɔɪ̯",k:"eu,äu,oi,oy" ,a:21,e:21.104 },
		{id:42,t:"ks",k:"chs,x,cks,ks,gs,ggs" ,a:21.5,e:21.639 },
		{id:43,t:"e",k:"e,ee" ,a:22,e:22.092 },
		{id:44,t:"øː",k:"ö,öh,eu,eue" ,a:22.5,e:22.665 },
		{id:45,t:"i̯",k:"i" ,a:23,e:23.073 },
		{id:46,t:"l̩",k:"l" ,a:23.5,e:23.707 },//el,
		{id:47,t:"j",k:"j,y" ,a:24,e:24.072 },
		{id:48,t:"u",k:"u,ou" ,a:24.5,e:24.595 },
		{id:49,t:"o",k:"o,au" ,a:25,e:25.199 },
		{id:50,t:"m̩",k:"en,em" ,a:25.5,e:25.596 },
		{id:51,t:"œ",k:"ö" ,a:26,e:26.066 },
		{id:52,t:"pf",k:"pf" ,a:26.5,e:26.6 },
		{id:53,t:"ʁ",k:"r" ,a:27,e:27.046 },
		{id:54,t:"kv",k:"qu" ,a:27.5,e:27.619 },
		{id:55,t:"y",k:"y" ,a:28,e:28.084 },
		{id:56,t:"ɪ̯",k:"i" ,a:28.5,e:28.555 },
		{id:57,t:"-",k:"h" ,a:29,e:29.046 },
		{id:58,t:"ʔ",k:"-" ,a:29.5,e:29.538},
		
		{id:59,t:"|",k:"|" ,a:0,e:0}		 //steuerzeichen
	];
	
	var oPause={id:59,t:" ",k:" " ,a:0,e:0.1};
	
	
	var wortliste=[	//phon wird im ini verknüpft
		//{w:"drei",  oID:[1,6,28],phon:[] },  //'drei'
		{w:"die",  oID:[1,11,43 ],phon:[] },  //'die'
		{w:"ich",  oID:[11,30 ],phon:[] },  //'ich' s'ich'erlich
		{w:"auch", oID:[23,40 ],phon:[] },  //'auch'
		{w:"rhy", oID:[6,55 ],phon:[] },	//'Rhy'thmus
		{w:"phy", oID:[9,55 ],phon:[] },	//'Phy'sik
		{w:"ss", oID:[4 ],phon:[] },		//wu'ss'ten
		{w:"ist", oID:[11,4,1 ],phon:[] },	//'ist'
		{w:"st", oID:[15,1 ],phon:[] },		//'st'uhl
		{w:"pe", oID:[21,31 ],phon:[] },	//'pe'ter 
		{w:"ge", oID:[10,31 ],phon:[] },	//
		//{w:"en", oID:[31,50 ],phon:[] },	//
		{w:"rei", oID:[6,28 ],phon:[] }	,	//	frei, 3
		//{w:"re", oID:[6,31 ],phon:[] }		//	-> kollidiert mit frei
		{w:"---", oID:[],phon:[] }	
	];
	
	
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var media;
	var quelltextNode;
	var input_detune;
	var input_geschw;
	var input_overlap;
	var debug;
	var playbutton;
	var output;
	
	var audioQuelle;
	
	//--------basics-------
	var cE=function(ziel,e,id,cn){
		var newNode=document.createElement(e);
		if(id!=undefined && id!="")newNode.id=id;
		if(cn!=undefined && cn!="")newNode.className=cn;
		if(ziel)ziel.appendChild(newNode);
		return newNode;
		}

	var gE=function(id){if(id=="")return undefined; else return document.getElementById(id);}
	
	
	var playlist=[];//of phoneme
	var newAudibuffSaktiv=undefined;
	
	//--------sytem-------
	
	this.ini=function(){
		var i,i2,o,o2,i3,
			ziel,htmlnode;
		
		
		for(i=0;i<phoneDE.length;i++){
			o=phoneDE[i];
			o.k=o.k.split(',');//str to array
			
			//sort by length
			o.k.sort(function(a,b){return a.length<b.length});
		}
		
		//Wortliste mit Phoneme abgleichen
		for(i2=0;i2<wortliste.length;i2++){
			o2=wortliste[i2];
			for(i3=0;i3<o2.oID.length;i3++){
				for(i=0;i<phoneDE.length;i++){
						if(phoneDE[i].id==o2.oID[i3]){
							o2.phon.push(phoneDE[i]);
						}
				}
			}
		}
		
		//console.log(phoneDE);
		//console.log(wortliste);
		
		
		ziel=document.body;
		
		quelltextNode=cE(ziel,'input',"eingabetext");
		quelltextNode.type="text";
		quelltextNode.value="Hallo ich bin ein Computer";
		quelltextNode.onkeyup=function(e){
				if(e.keyCode==13){
						klickButt(quelltextNode.value);	
					}
				}
		
		htmlnode=cE(ziel,'br');
		htmlnode=cE(ziel,'br');

		var newAudibuffS= audioCtx.createBufferSource();
		if(newAudibuffS.detune!=undefined){
			input_detune=htmlnode=createSLider(ziel,'detune:',-1200,1200,50 ,0);
			htmlnode=cE(ziel,'br');
		}
		if(newAudibuffS.playbackRate!=undefined){
			input_geschw=htmlnode=createSLider(ziel,'playbackrate:',0.5,2,0.1 ,1);
			htmlnode=cE(ziel,'br');
		}
				
		input_overlap=htmlnode=createSLider(ziel,'overlap:',0,1,0.1 ,0.3);
				
		
		htmlnode=cE(ziel,'br');
		
		playbutton=cE(ziel,'a');
		playbutton.href="#";
		playbutton.innerHTML="play";
		playbutton.className="button";
		playbutton.onclick=function(){		
				klickButt(quelltextNode.value);				
				return false;
			}
		
		htmlnode=cE(ziel,'br');
		
		
		//
		audioQuelle=new ObjaudioQuelle();
		audioQuelle.load(audioSRC);
		
		
		//todo: generate audiofile
		/*media=cE(undefined,'audio');
		media.controls="controls";
		document.body.appendChild(media);
		media.style.display="none";
		*/
		
		
		htmlnode=cE(ziel,'div',"log","log");
		
		output=new oDebug(ziel);
		output.write("ready.");
	}
	
	var createSLider=function(ziel,labeltext,min,max,step,value ){
		
		var htmlnode=cE(ziel,'label');
		htmlnode.innerHTML=labeltext;
		htmlnode.className="reglerlabel";
		
		var input=cE(ziel,'input');
		input.className="regler";
		input.type="range";
		input.min=min;
		input.max=max;
		input.step=step;
		input.value=value;
		
		input.onchange=function(){
			this.valueview.innerHTML=this.value;
		}
		
		var htmlnode=cE(ziel,'label');
		htmlnode.innerHTML=input.value;
		htmlnode.className="reglervalue";
		
		input.valueview=htmlnode;
		
		return input;
	}
	
	var oDebug=function(ziel){
		var outputNode;
		var zeilen=[];
		var _this=this;
		var idnr=0;
		
		var create=function(){
			outputNode=cE(ziel,"div",undefined,"log2");
			outputNode.onclick=function(){
				_this.clear();
			}
			
		};
		
		this.getNewID=function(){idnr++;return idnr;}
		
		this.clear=function(){
			zeilen=[];
			outputNode.innerHTML="";
		}
		
		this.write=function(s,id){
			var i,sout="",gefunden;
			if(id==undefined){
				if(s!=""){
					idnr++;
					zeilen.push( {"id":idnr,"txt":s}  )
				}
					
			}else{
				gefunden=false;
				for(i=0;i<zeilen.length;i++){
					if(zeilen[i].id==id){
						zeilen[i].txt=s;
						gefunden=true;
						}						
				}
				if(!gefunden){
					zeilen.push( {"id":id,"txt":s}  )
				}
			}
			
			for(i=0;i<zeilen.length;i++){
				if(i>0)sout+="<br>";
				sout+=zeilen[i].txt;
			}
			
			outputNode.innerHTML=sout;
			
			return idnr;			
		}
		
		create();
	}
	
	var klickButt=function(sprichtext){
		playlist=[];
		generatePlaylist(sprichtext); //worte in phoneme konvertieren (playlist befüllen)
		
		audioQuelle.createAudioData(playlist,media);
		
		outputtext(sprichtext);//von Playlist ableiten

		console.log(playlist);
	}
	
	var outputtext=function(originaltext){
		var div=gE("log"),tab,th,td,tr,i,s;
		
		var phonemworte="";
		for(i=0;i<playlist.length;i++){
			phonemworte+=playlist[i].t;
		}
		
		//phonemworte / 
		
		//if(re==undefined)return;
		if(div){
			div.innerHTML="";
			
			tab=cE(div,"table");
			
			tr=cE(tab,"tr");
			s=originaltext.split(' ');
			for(i=0;i<s.length;i++){
				td=cE(tr,"td");
				td.innerHTML=s[i];
			}
			
			tr=cE(tab,"tr");
			s=phonemworte.split(' ');
			for(i=0;i<s.length;i++){
				td=cE(tr,"td");
				td.innerHTML=s[i];
			}
		}
		else
			console.log(re);
	}
	
	var wortlistencheck=function(wort){
		//Worte mit fester Phonemkombination
		//return: {liste:wortliste[i].phon,status:true|false|undefined};
		var i,pre,mid,rest,p,wlwort,redat;
		for(i=0;i<wortliste.length;i++){
			wlwort=wortliste[i].w;
			
			if(wlwort==wort){ 
					//Phonemkombination gefunden, Liste der phonemeObjektelinks rückgeben
					return {liste:wortliste[i].phon,status:true};
				}
				
				
			p=wort.indexOf(wlwort);//kommt wort in einem wort vor?
			if(p>-1){
				//wort aufsplitten
				pre=wort.slice(0,p);				//vor der Phonemkombination
				mid=wort.slice(p,p+wlwort.length);  //Phonemkombination in Liste
				rest=wort.slice(p+wlwort.length);	//Rest
				//Einzelteilen für Check zurückgeben
				return {status:false, wortpre:pre,wortmid:mid,wortrest:rest};//Phonemkombination im Wort gefunden
			}
		}
		return {status:undefined}; //keine Phonemkombination gefunden
	}
	
	var generatePlaylist=function(wortorig){
		if(wortorig=="")return;
		
		var iphon,ilist,o,oph,p,i,s,re,itera,rere,
			iteracount=0,
			wortout=[],
			gefunden,
			wort=wortorig.toLowerCase(),
			re={orig:wortorig,sprich:""};
			
			wort=wort.split(':-)').join('haha');
			wort=wort.split(':-o').join('oh');			
			wort=wort.split(':-p').join('bähh');			
			wort=wort.split(':-(').join('mmm');			
			
			//Sonderzeichen löschen
			wort=wort.split('*').join('');
			wort=wort.split(',').join('');
			wort=wort.split('.').join('');
			wort=wort.split(':').join('');
			wort=wort.split(';').join('');
			wort=wort.split("'").join('');
			wort=wort.split("/").join('');
			wort=wort.split("_").join(' ');
			//worte ersetzen
			wort=wort.split('-').join('minus');
			wort=wort.split('+').join('plus');
			wort=wort.split('=').join('istgleich');
			
			wort=wort.split('@').join('eet');
			
			wort=wort.split('ssch').join('s|sch');
			wort=wort.split('computer').join('kompjuter');
			wort=wort.split('regen').join('reegen');
			//Farben
			wort=wort.split('#ff0000').join('rot');
			wort=wort.split('#ffff00').join('gelb');
			wort=wort.split('#00ff00').join('grün');
			wort=wort.split('#00ffff').join('türkies');
			wort=wort.split('#0000ff').join('blau');
			wort=wort.split('#ff00ff').join('lila');
			
		var workwort=wort;	
		
		
		//wenn Leerzeichen, jedes Wort getrennt behandeln
		if(workwort.indexOf(' ')>-1){
			workwort=workwort.split(' ');
			re.orig="";
			for(i=0;i<workwort.length;i++){
				if(i>0)addPlaylist([oPause]);
				generatePlaylist(workwort[i]);
			}
			return;
		}

		//zahlen bis 9999, TODO: zahlen in worte "1ter"
		if(!isNaN(wort)){//'1234'		
			var zahlen=wort.split('');//['1','2','3','4']
			var arr=[];
			for(i=0;i<zahlen.length;i++){
				o=parseInt(zahlen[i]);
				//zusamenhängende Zahl, TODO: 00100, #F3123b,...
				
				switch(o){
					case 0:						
						if(zahlen.length==1)
							arr.push("null"); 
							else
							arr.push("");	
						break
					case 1:
						if(zahlen.length - i ==2)
							arr.push("zehn"); 
							else{
								if(zahlen.length==1)
									arr.push("eins"); 
									else
									arr.push("ein"); 
							}
							
					break;
					case 2:s+=""; 
						if(zahlen.length - i ==2)
							arr.push("zwanzig"); 
							else
							arr.push("zwei"); 
					break;
					case 3:arr.push("drei"); break;
					case 4:arr.push("vier"); break;
					case 5:arr.push("fünf"); break;
					case 6:arr.push("sechs"); break;
					case 7:arr.push("sieben"); break;
					case 8:arr.push("acht"); break;
					case 9:arr.push("neun"); break;
				}
				
				if(o!=0){
					if(zahlen.length - i ==4)arr[arr.length-1]+="tausend";
					if(zahlen.length - i ==3)arr[arr.length-1]+="hundert";
					if(zahlen.length - i ==2 && o!=1 && o!=2)arr[arr.length-1]+="zig";
					if(zahlen.length - i ==1 && arr.length>1 )arr[arr.length-1]+="und";
				}
				
			}
			
			if(arr.length>1){//einer und 10ner tauschen
				o=arr[arr.length-1];
				arr[arr.length-1]=arr[arr.length-2];
				arr[arr.length-2]=o;
				
				//korrektur 11 12 >=20+zig
				if(arr[arr.length-1]=="zehn"){
					if(arr[arr.length-2]=="einund" || arr[arr.length-2]=="ein"){
						arr[arr.length-2]="elf"
						arr[arr.length-1]="";
					}
					if(arr[arr.length-2]=="zweiund" || arr[arr.length-2]=="zwei"){
						arr[arr.length-2]="zwölf"
						arr[arr.length-1]="";
					}
					arr[arr.length-2]=arr[arr.length-2].split('und').join('');
				}
			}
			
			s='';
			for(i=0;i<arr.length;i++){
				s+=arr[i];
			}
			
			generatePlaylist(s);
			return;			
		}
		
		
		//Phrassenvordefinition filtern
		o=wortlistencheck(wort);	//gibt es eine feste Definition für das Wort?
		
		//Wort wurde zerlegt
		if(o.status===false){
			//status:false, wortpre:pre,wortmid:mid,wortrest:rest;
			if(o.wortpre.length>0) 
				generatePlaylist(o.wortpre);				
					
			if(o.wortmid.length>0) 
				generatePlaylist(o.wortmid);			
				
			if(o.wortrest.length>0)
				generatePlaylist(o.wortrest);
							
			return;
		};
				
		
		if(o.status===true){
			addPlaylist(o.liste);
			return;
		}
		if(o.status===undefined){//status:undefined
			itera=wort.length * phoneDE.length;//while nicht ins endlose laufen lassen
			//Wort in Phoneme konvertieren (Buchstabenkombination in Tabelle "phoneDE" finden)	
			
			
			while(wort.length>0){
				gefunden=false;
				//console.log(workwort,wort,!isNaN(workwort));	
				for(ilist=0;ilist<phoneDE.length;ilist++){
					o=phoneDE[ilist];//hole ein phonemsatz
					for(iphon=0;iphon<o.k.length;iphon++){//gucke alle definierten zeichen durch
						oph=o.k[iphon];
						if(workwort==oph){
							workwort=workwort.slice(oph.length);
							gefunden=true;
							wortout.push(o);
							
							workwort=wort.slice(oph.length);
							wort=workwort;
							itera=workwort.length* phoneDE.length+1;
							//console.log('>',oph,workwort,itera,o);
						}
						if(gefunden){break;}
					}
					if(gefunden){break;}//else{console.log('#',oph);}
				}
				
				
				if(workwort.length==0)break;
				
				if(!gefunden){
					workwort=workwort.slice(0,workwort.length-1);//letzten buchstaben wegnehmen, neuer durchlauf
					//console.log('>',workwort,workwort.length);
				}
				if(!isNaN(workwort)){
					if(wortout.length>0){
						addPlaylist(wortout);
						wortout=[];
					}
					generatePlaylist(workwort);
					
					p=workwort.length;
					if(p<1)p=1;//Buchstabe/zeichen nicht gefunden, überlesen
					
					wort=wort.slice(p);
					workwort="";
					generatePlaylist(wort);
					break;
				}
				
				itera--;
				if(itera<0){//bei unbekannten Zeichen z.B: .;()
						console.log("		break",workwort);
						break;
						}
			}
			//zur Playlist hinzufügen
			addPlaylist(wortout);	//console.log("ADD",wortout);			
		}
	}
	//-----------------
	
	var ObjaudioQuelle=function(){
		var request= new XMLHttpRequest();
			request.responseType = 'arraybuffer';
		var source;		//chan = source.buffer.getChannelData(0);
		
		var sampelsready=false;
		
		//API
		this.load=function(url){
			source 		= audioCtx.createBufferSource();			
			request.open('GET',url, true);			
			request.send();
		}
		
		
		//Request
		request.onreadystatechange =function(){
					//console.log("onreadystatechange",this.readyState);
					if(this.readyState==4){
						//console.log("getData 4");//geladen
					}
		};
		
		request.onload = function() {
			//console.log("**");
			playbutton.innerHTML="play*";
			
			var audioData = request.response;
			audioCtx.decodeAudioData(audioData,
								decodeAudioData, 
								function(e){"Error with decoding audio data" + e.err}
								);
			
		}
		
		var decodeAudioData=function(buffer){
			source.buffer = buffer;	
			var i,t,data;
			
			var chan = buffer.getChannelData(0);// Kanal 1  Float32Array containing the PCM data associated with the channel
			
			var gefunden=false;
			var counter=0;
			var lastXBuff=[	0,0,0,0,0,0,0,0,0,0,
							0,0,0,0,0,0,0,0,0,0,
							0,0,0,0,0,0,0,0,0,0,
							0,0,0,0,0,0,0,0,0,0,
							0,0,0,0,0,0,0,0,0,0,
							0,0,0,0,0,0,0,0,0,0,
							0,0,0,0,0,0,0,0,0,0
							];
			//console.log(70/buffer.sampleRate);//0.0015873015873015873sec
			//console.log(buffer);
			var lastXBuffpos=0;
			var anz0=0;
			var anzBloecke=0;
			var Abeginn=0;
			var Bend=0;
			var cutL;
			
			//Anfang und Ende der Sampels checken
			//und ggf. korrigieren
			/*
			for(i=0;i<chan.length;i++){
				data=chan[i];// -1..0..+1
				
				lastXBuff[lastXBuffpos]=data;
				lastXBuffpos++;
				
				if(lastXBuffpos==lastXBuff.length){
					if(i>lastXBuff.length){
						anz0=0;
						for(t=0;t<lastXBuff.length;t++){
							if(lastXBuff[t]>-0.003 && lastXBuff[t]<0.003 )anz0++;
						}					
						if(anz0<lastXBuff.length && !gefunden){
							gefunden=true;
							Abeginn=(i - lastXBuff.length)*buffer.duration/buffer.length;
						}
						if(anz0==lastXBuff.length && gefunden){
							gefunden=false;
							Bend=i*buffer.duration/buffer.length;
							
							cutL=(Bend-Abeginn);
							if(cutL>0.01){
								//gefundene Blöcke mit Liste abgleich
								
								if(phoneDE[anzBloecke].a>Abeginn)phoneDE[anzBloecke].a=Abeginn;
								if(phoneDE[anzBloecke].e<Bend)phoneDE[anzBloecke].e=Bend;								
								anzBloecke++;
							}
							
						}
					}
					lastXBuffpos=0;
				}				
			}
			*/
			sampelsready=true;
			//console.log(1,'=',buffer.duration/buffer.length,'sec',buffer);
			//console.log(buffer.length/buffer.sampleRate);//=buffer.duration
			//console.log(source);
			
			playbutton.innerHTML="play";
			
			output.write("Sampels geladen.");
		}
		
		var newAudibuffS;
	
		this.createAudioData=function(playliste,zielmedia){
			var i,plObj,t,qval,nowBuffering,cannels,outputzid,
				sampelbegin,sampelend,sampellength,samoverlapp,
				lastsampellength=0,
				laenge=0,
				nez=0;					//position im zielbuffer
			
			for(i=0;i<playliste.length;i++){
				plObj=playliste[i];
				sampelbegin		=(plObj.a);//sec -> sampl   
				sampelend		=(plObj.e);
				laenge+=sampelend-sampelbegin;		
			};
			
			var sectosam=source.buffer.duration/source.buffer.length;//Divisor: Sec to sampel
			var channels = 1;//mono
			var frameCount = source.buffer.sampleRate * (laenge+1);//Länge in sec
			
			//create new Buffer
			var myArrayBuffer = audioCtx.createBuffer(channels, frameCount, source.buffer.sampleRate);
			
			//Quelle
			var chan= source.buffer.getChannelData(0);	//nur aus einem Kanal Daten holen (mono)
			
			var overlapp=0.3;//0..1 (1=100%)
			if(input_overlap!=undefined)overlapp=input_overlap.value;
			
			for(cannels=0;cannels<channels;cannels++){//jeder Channel befüllen
				nowBuffering = myArrayBuffer.getChannelData(cannels);	//zielBuffer
				nez=0;
				for(i=0;i<playliste.length;i++){
					plObj=playliste[i];
					sampelbegin		=parseInt(plObj.a/sectosam);//sec -> sampl   
					sampelend		=parseInt(plObj.e/sectosam);
					sampellength	=sampelend-sampelbegin;
					
					samoverlapp=parseInt(lastsampellength*overlapp);//überlappungsposition im letzten Sampel					
					nez-=samoverlapp;
					if(nez<0)nez=0;
					
	
					for(t=sampelbegin;t<sampelend;t++){
						qval=nowBuffering[nez]+chan[t];
						if(qval>1)qval=1;
						if(qval<-1)qval=-1;
						nowBuffering[nez]=qval;		//sampels umkopieren
						nez++;					
					};	
					lastsampellength=sampellength;
				};
			};
			
			//console.log(newAudiData.length);
			
			//var Asource = audioCtx.createMediaElementSource(zielmedia);
			//Asource.buffer = myArrayBuffer;
			//Asource.connect(audioCtx.destination);
			
			outputzid=output.getNewID();
			output.write(outputzid+" play...",outputzid);
			
			//generate Audio
			newAudibuffS= audioCtx.createBufferSource();
			newAudibuffS.buffer = myArrayBuffer;
			newAudibuffS.connect(audioCtx.destination);
			if(newAudibuffS.detune!=undefined)//nicht auf iOS
				newAudibuffS.detune.value = input_detune.value; //verstimmung/geschwindigkeit  -1200 to 1200
			if(newAudibuffS.playbackRate!=undefined)
				newAudibuffS.playbackRate.value =input_geschw.value; //= input_detune.value; //geschwindigkeit 1=normal
			
			newAudibuffS.outputzid=outputzid;
			newAudibuffS.onended=function(){
				output.write(outputzid+" fertig.",this.outputzid);
				}
				
			newAudibuffSaktiv=newAudibuffS;		
			newAudibuffS.start(0);
			
			
			
			//var blob = new Blob(newAudibuffS, { 'type' : 'audio/ogg; codecs=opus' });
			//zielmedia.src= URL.createObjectURL(newAudibuffS);
			
			//var m = audioCtx.createMediaStreamDestination();
			//m.buffer = myArrayBuffer;
			//zielmedia.src = URL.createObjectURL(myArrayBuffer.buffer);
			
			
			//zielmedia
			/**/
			
			/*var analyser = audioCtx.createAnalyser();
			Asource.connect(analyser);
			analyser.connect(audioCtx.destination);*/
			
			/*Asource.connect(newAudibuffS);
			newAudibuffS.connect(audioCtx.destination);*/
			//Asource.connect(newAudibuffS);
			//Asource.context=newAudibuffS.context;
			//console.log("B",Asource);
			
		}
	
	}
	
	
	
	//-----------------
	var addPlaylist=function(liste){
		var i;
		for(i=0;i<liste.length;i++){
			playlist.push(liste[i]);
		}	
	}
	
	
}



window.addEventListener('load', function (event){
	var e=new spraSy();
	e.ini();
});
