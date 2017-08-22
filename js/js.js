
var Select = function(){  // 调用 select.init("#id/.class",options); valueOf()/indexOf()
	return{
		init:function(selector,options){
			this.options.url = options.url;
			this.options.dataType = options.dataType;
			/* 判断是class还是id */
			var selector = this.selector(selector);
			debugger;
			/* 加载Json */
			this.Ajax.get(this.options.url);
			/* 清空DOM */
			this.emptyDom(selector);
			/* 创建DOM */
			if(selector.length){
				for(var i = 0; i<selector.length; i++){
					this.createDom(selector[i]);
				}
			}else{
				this.createDom(selector);
			}
			
		},
		selector:function(selector){
			var select_div;
			select = selector.substr(1);
			if(selector.indexOf("#") > -1){
				select_div = document.getElementById(select);
				select_div.setAttribute("class", "select");
			}else if(selector.indexOf(".") > -1){
				select_div = document.getElementsByClassName(select);//获取的是一个数组
			}else{
				alert("参数错误");
			}
			return select_div;
		},
		emptyDom: function(selector){
			if(selector.length){
				for(var i = 0; i<selector.length; i++){
					var childNodes = selector[i].childNodes;
					for(var j = childNodes.length-1; j>-1; j--){
						selector[i].removeChild(childNodes[j]);
					}
				}
			}else{
				var childNodes = selector[i].childNodes;
				for(var j = childNodes.length-1; j>-1; j--){
					selector[i].removeChild(childNodes[j]);
				}
			}
		},
		createDom: function(selector){
			var dataUrl = this.options.url;
			var span_left = document.createElement("span");
			var span_right = document.createElement("span");
          	span_left.setAttribute("class", "input_left");
          	span_right.setAttribute("class", "btn_right");
          	
          	var input_border = document.createElement("div");
          	var text_input = document.createElement("input");
          	text_input.addEventListener("keyup",this.toLoad, false);
          	input_border.setAttribute("class", "input_border");
          	text_input.setAttribute("dataurl", dataUrl);
          	text_input.setAttribute("class", "text_input");
          	input_border.setAttribute("type", "text");
          	span_left.appendChild(input_border);
          	span_left.appendChild(text_input);
          	
          	var search_btn = document.createElement("div");
   　　　　　　	var txt = document.createTextNode("搜索");
   			search_btn.appendChild(txt);
          	search_btn.setAttribute("id", "sousuo");
          	search_btn.setAttribute("class", "search_btn");
          	span_right.appendChild(search_btn);
          	
          	selector.appendChild(span_left);
          	selector.appendChild(span_right);
		},
		keyUp: function(selector){
			var textNodes;
			var dataUrl = this.default.url;
			if(selector.length){
				for(var i = 0; i<selector.length; i++){
					debugger;
					textNodes = selector[i].childNodes[0].childNodes[1];
//					textNodes.removeEventListener("keyup",bandKeyUp);
					textNodes.addEventListener("keyup",function(e){this.bandKeyUp(e,"哎呦,我曹")});
				}
			}else{
				textNodes = selector.childNodes[0].childNodes[1];
//				textNodes.removeEventListener("keyup",bandKeyUp);
				textNodes.addEventListener("keyup",bandKeyUp(dataUrl));
			}
		},
		toLoad:function(e,dataUrl){
//			alert("哎呦,我曹!");
			textValue = e.target.value;
			dataurl = e.target.getAttribute("dataurl");
//			debugger;
			/* 取得当前适合的数据 */
			list = window.Select.dataList;
			var newList = new Array(); 
			for( item in list){
				if(list[item].indexOf(textValue) > -1){
					newList.push(list[item]);
				}
            }
			/* 清除历史DOM */
			parentSpan = this.parentElement;
			var childNodes = parentSpan.childNodes;
			for(var j = childNodes.length-1; j>1; j--){
				parentSpan.removeChild(childNodes[j]);
			}
			/* 加载渲染符合条件的数据  */
			var listUl = document.createElement("ul");
          	listUl.setAttribute("class", "select_ul");
			for( item in newList){
				var listLi = document.createElement("li");
				var txt = document.createTextNode(newList[item]);
          		listLi.setAttribute("class", "select_li");
            	listLi.appendChild(txt);
            	listLi.addEventListener("click",window.Select.liClick, false);
            	listUl.appendChild(listLi);
            }
			if(newList.length>0){
				parentSpan.appendChild(listUl);
			}
			if(textValue == ""){
				listUl.setAttribute("class", "dis_no");
			}
		},
		Ajax:{
		    get: function(url) {
		    	var list = new Array();;
		        var obj = new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
		        obj.open('GET', url, true);
		        obj.onreadystatechange = function() {
		            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) { // readyState == 4说明请求已完成
		                //fn.call(this, obj.responseText);  //从服务器获得数据
		                textJosn = JSON.parse(obj.responseText);
		                for( item in textJosn){
		                	window.Select.dataList.push(textJosn[item].text);
		                }
		            }
		        };
		        obj.send();
		        return list;
		    },
		    post: function (url, data, fn) {         // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
		        var obj = new XMLHttpRequest();
		        obj.open("POST", url, true);
		        obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  // 添加http头，发送信息至服务器时内容编码类型
		        obj.onreadystatechange = function() {
		            if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) {  // 304未修改
		                fn.call(this, obj.responseText);
		            }
		        };
		        obj.send(data);
		    }
		},
		liClick:function(){
			debugger;
			parentSpan = this.parentElement
			input = parentSpan.previousSibling;
			input.value = this.innerHTML;
			parentSpan.setAttribute("class", "dis_no");
//			alert(this.innerHTML);
		},
		options:{
			url:"data/data.json",
			dataType:"json"
		},
		dataList:[]
	}
}();
/*Select.init(".select",{
	url:"",
	dataType:"json",  // json/local
	
})*/
