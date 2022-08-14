<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html style="height: 100%">
   <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       
<style>
	.nrmax{ border:0px solid #8fc320; height:50px;  margin:20px 10%; border-radius:10px;}
	.nrdivmin{ text-align:center; padding:30px 0 0; display: inline;}
	.inptt{ background:#FFF;border-radius:5px; border:#FFF; height:35px; width:80%; padding-left:5px;}
	.shangfDiv{ margin:auto; position:absolute; width:80%;}
	.xianshiDiv{ width:80%; background:#FFF; margin:auto 12px; margin-top:2px; border-radius:5px; display:none; overflow:auto; height:auto;max-height:140px;}
	.xianshiDiv p:hover{ border-bottom:1px solid #0893d5; overflow:hidden;font-size:8px;}
	#address:hover{border:1px solid #8fc320;}
</style>
   </head>
   <body style="height: 100%; margin: 0">
   <!-- 查询结束 -->
   <div class="nrmax">
	   <input type="text" id="address" name="address" class="inptt" placeholder='请填写您所在的区域'>
	   <!-- 下拉框开始 -->
	   <div class="shangfDiv" id="DZaddress">
	    	<div class="xianshiDiv" id="address2">
	    		
	        </div>
       </div>
       <!-- 下拉框结束 -->
	   <div class="nrdivmin">
		    <input type="button" value="点击查询" id="isOk"  style="width:150px; background:#098ed4; border:#098ed4; height:35px;">
	   </div>
   </div>
<!-- 查询结束 -->

<!-- 地图开始 -->
       <div id="container" style="height: 90%; width: 100%" ></div>
<!-- 地图结束 -->

       <!-- 新添加的jQuery -->
       <script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.2.1.4.min.js"></script>
       <!-- End -->

       <script type="text/javascript" src="${pageContext.request.contextPath}/mapjs/echarts-all-3.js"></script>
       <script type="text/javascript" src="${pageContext.request.contextPath}/mapjs/dataTool.min.js"></script>
       <script type="text/javascript" src="${pageContext.request.contextPath}/mapjs/china.js"></script>
       <script type="text/javascript" src="${pageContext.request.contextPath}/mapjs/world.js"></script>
       <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=cW4AmdztXTI0xeYGZxDXG7tWA96qkQLi"></script>
       <script type="text/javascript" src="${pageContext.request.contextPath}/mapjs/bmap.min.js"></script>
       <script type="text/javascript">
         
       /****************************地图开始************************************/
       	  var dom = document.getElementById("container");
          var myChart = echarts.init(dom);
          var app = {};
          option = null;
          app.title = '热力图与百度地图扩展';
          $.get('${pageContext.request.contextPath}/background/hotspotmap/hotspotMap.html', function (data) {
             var data = data.broadBandHotData;
             //var data = eval("("+data+")");
             console.log(data);
              var points = [].concat.apply([], data.map(function (track) {
                  return track.map(function (seg) {
                      return seg.coord.concat([1]);
                  });
              }));
              myChart.setOption(option = {
                  animation: false,
                  bmap: {
                      center: [108.962783, 34.360491],
                      zoom: 12,
                      roam: true
                  },
                  visualMap: {
                      show: false,
                      top: 'top',
                      min: 0,
                      max: 5,
                      seriesIndex: 0,
                      calculable: true,
                      inRange: {
                          color: ['blue', 'blue', 'green', 'yellow', 'red']
                      }
                  },
                  series: [{
                      type: 'heatmap',
                      coordinateSystem: 'bmap',
                      data: points,
                      pointSize: 20,
                      blurSize: 5
                  }]
              });
              if (!app.inNode) {
            	  function addClickHandler(target,label,window){
            	      /* target.addEventListener("mouseover",function(){
            	        target.openInfoWindow(window);
            	      }); */
            		  target.addEventListener("mouseover", function(){ 
            			  label.setStyle({  //给label设置样式，任意的CSS都是可以的
            			    display:"block"
            			  });
            		  }); 
            		  target.addEventListener("mouseout", function(){ 
            			  label.setStyle({  //给label设置样式，任意的CSS都是可以的
            			    display:"none"
            			  }); 
            		  });
            	    }
            	//添加单个覆盖物
            	  function addMapOverlay(markers){
                      //alert("aaaaa");
            		  //console.log(markers.length);
                     /*  var markers = [
                        {content:"100",title:"活跃量",imageOffset: {width:0,height:3},position:{lat:34.315183,lng:108.900117}}
                      ]; */
                      if(markers.length > 0) {
	                      for(var index = 0; index < markers.length; index++ ){
	                        var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
	                        var marker = new BMap.Marker(point,{icon:new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png",new BMap.Size(20,25),{
	                          imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
	                        })});
	                        var label = new BMap.Label(markers[index].title+"<br/>宽带办理量"+markers[index].content,{offset: new BMap.Size(25,5)});
	                        //设置lebel样式
	                        label.setStyle({
	                        	padding:'8px',
	                        	border:'1px solid #96c2f1',
	                        	background:'#eff7ff',
	                        	display:'none'
	                        });
	                        var opts = {
	                          width: 200,
	                          title: markers[index].title,
	                          enableMessage: false
	                        };
	                        var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
	                        marker.setLabel(label);
	                        addClickHandler(marker,label,infoWindow);
	                        bmap.addOverlay(marker);
	                      };
                      }
                    }
            	  //添加覆盖物
            	  function addNumTag() {
            		//异步请求，获取数据
            	    	$.ajax({
            	    		type:"post",
            	    		url: "${pageContext.request.contextPath }/background/hotspotmap/hotspotMap1.html",
            	    		dataType:"json",
            	    		success:function(map) {
            	    			markers = map.broadBandHotData;
            	    			console.log(markers);
            	    			for(var i = 0; i < markers.length; i++) {
            	    				addMapOverlay(markers[i]);
            	    			}
            	    		}
            	    	});
            	    }
            	  // 添加百度地图插件
                  var bmap = myChart.getModel().getComponent('bmap').getBMap();
                  bmap.addControl(new BMap.MapTypeControl());
                  addNumTag();
                  /***************搜索开始******************/
                  
                  /***********搜索下拉框开始*****************/
              	  var bind_name = "";  
            	  if(navigator.userAgent.match(/android/i) == "android") {  
            	     bind_name = "keyup";  
            	  } else {
            		 bind_name = "input";  
            	  }
              		
              	
              	  var temp = "";
              	  $('#address').bind(bind_name, function() {
              		$("#address2").html(""); 
              		var address = $("#address").val();
              		var reg = /^[\u4e00-\u9fa5]+$/;
              		var patt1 = new RegExp(reg);
              		console.log(patt1.test(address));
              		if (patt1.test(address) && address.length > 2) {
              			$("#DZaddress").show();
              			$("#address2").show(); 
              			if(address != "" && address != null){
              				if(address != temp) {
              					temp = address;
              					$.post("${pageContext.request.contextPath}/background/hotspotmap/getAddressByLikeQyery.html",{"address":address},function(data1){
              						$("#address2").html("");
              						var listAddress=data1.listAddress;
              						if(listAddress.length > 0) {
	              						for(var i = 0;i < listAddress.length;i++){
	              							str = "<p onclick='address(\""+listAddress[i].plot+"\")'>"+listAddress[i].plot+"</p>";				    				
	              							$("#address2").append(str); 						  
	              						}
              						}
              					})
              				}
              			} else{
              				$(".xianshiDiv").hide();
              			} 
              		}
                 });
              	
                  /***********搜索下拉框结束*****************/
                  
	              var plot;
	              $("#isOk").click(function() {
	            	plot = $("#address").val();
	            	$.get("${pageContext.request.contextPath}/background/hotspotmap/findLL.html",{"plot":plot},function(map) {
	            		console.log(map);
	            		if(map.state == "OK") {
	            			lng = new Number(map.lng);
	            			lat = new Number(map.lat);
	            		} else if(map.state == "NO"){
	            			lng = 108.962783;
	            			lat = 34.360491;
	            		}
	            		console.log(lng+" ," + lat);
		              	bmap.centerAndZoom(new BMap.Point(lng, lat), 12);
		              	setTimeout(function(){
		            		bmap.setZoom(14);   
		            	}, 2000);  //2秒后放大到14级
		            	bmap.enableScrollWheelZoom(true);
	            	});
	              });
	              /***************搜索结束******************/
                  /*var marker = new BMap.Marker(new BMap.Point(108.962783,34.360491));
                  bmap.addOverlay(marker);
                  marker.addEventListener("click",getAttr);
              	  var label = new BMap.Label("我是文字标注哦",{offset:new BMap.Size(20,-10)});
              	  marker.setLabel(label);
              	  function getAttr(e){
              	 	 var p = e.target;       //获取marker的位置
              		 //alert("marker" + p.lng + "," + p.lat);
              	  }*/
              }
          },"json");
          if (option && typeof option === "object") {
              myChart.setOption(option, true);
          }
          function address(ss){
        		$("#address").val(ss);
        		$("#address2").html(""); 
        		$("#address2").hide();
          }
          /*************************地图结束*****************************/
		//#container{position:absolute;left:0px;top:0px;z-index: -1; }
          $("#address").focus(function(){
        	  $("#container").css({"position":"absolute","left":"0px","top":"0px","z-index":"-1","height":"100%"});
          }).blur(function(){
        	  $("#container").css({"position":"","left":"","top":"","z-index":"0","height":"90%"});
          });
          
       </script>
   </body>
</html>