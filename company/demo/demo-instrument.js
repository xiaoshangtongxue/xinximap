//import { formatDiagnostic } from "typescript";
import {
  Map,
  Point,
  Tooltip,
  Polyline,
  SimpleFillSymbol,
  FeatureClass,
  FeatureLayer,
  SimpleRenderer,
  CategoryRenderer,
  CategoryRendererItem,
  Field,
  DotRenderer,
  DotRenderer2,
  DotRenderer1,
  DotRenderer3,
  DotRenderer4,
  DotRenderer5,
  Heat,
  GeometryType,
  RasterLayer,
  FieldType,
  Label, NullCollision, SimpleCollision, CoverCollision, SimpleTextSymbol,
  Graphic, SimpleMarkerSymbol,LetterSymbol, Feature, LatLngType, GCJ02, SimplePointSymbol
} from "../dist";


window.load = () => { 
  //初始化地图
  const amap = new AMap.Map("amap", {
      fadeOnZoom: false,
      navigationMode: 'classic',
      optimizePanAnimation: false,
      animateEnable: false,
      dragEnable: false,
      zoomEnable: false,
      resizeEnable: true,
      doubleClickZoom: false,
      keyboardEnable: false,
      scrollWheel: false,
      expandZoomRange: true,
      zooms: [1, 20],
    
     // mapStyle: 'normal',
     // mapStyle: 'amap://styles/5e112a56615d970c3a2c3cc8a2550c46', //更换地图样式
      mapStyle:styleFunction(),
      features: ['road', 'point', 'bg'],
      viewMode: '2D'
  });
    //更改地图风格
    function styleFunction(){

      return 'amap://styles/2af36b7f2eed9057580c2b8f263f5929';//草色青
  
    }
    colorCaoseqing.onclick=function(){
      
      amap.setMapStyle("amap://styles/2af36b7f2eed9057580c2b8f263f5929");//草色青
     /* colorCaoseqing.style.boxShadow = "0px 0px 10px 2px #3699CB";
      colorYuanshanxun.style.boxShadow = "none";
      colorZhengchang.style.boxShadow = "none";
      colorMakalong.style.boxShadow = "none";
      colorHuanyehei.style.boxShadow = "none";*/
      map_img.style.backgroundImage = "url(/static/images/caoseqing.jpg)";
      
    }
    colorYuanshanxun.onclick=function(){
     
      amap.setMapStyle("amap://styles/e440edb0375e067ae095d256d3e1ff6d");//远山熏
     /* colorYuanshanxun.style.boxShadow = "0px 0px 10px 2px #3699CB";
      colorZhengchang.style.boxShadow = "none";
      colorMakalong.style.boxShadow = "none";
      colorHuanyehei.style.boxShadow = "none";
      colorCaoseqing.style.boxShadow = "none";*/
      map_img.style.backgroundImage = "url(/static/images/yuanshanxun.jpg)";
    }
    colorZhengchang.onclick=function(){
     
      amap.setMapStyle("amap://styles/0c008bf6b7ce35b5e1ac1ebf41547737");//正常
     /* colorZhengchang.style.boxShadow = "0px 0px 10px 2px #3699CB";
      colorMakalong.style.boxShadow = "none";
      colorHuanyehei.style.boxShadow = "none";
      colorCaoseqing.style.boxShadow = "none";
      colorYuanshanxun.style.boxShadow = "none";*/
      map_img.style.backgroundImage = "url(/static/images/zhengchang.jpg)";
     
    }
    colorMakalong.onclick=function(){
     
      amap.setMapStyle("amap://styles/1eeae85c0ffa7eb90976dd694f43efb9 ");//马卡龙
     /* colorMakalong.style.boxShadow = "0px 0px 10px 2px #3699CB";
      colorHuanyehei.style.boxShadow = "none";
      colorCaoseqing.style.boxShadow = "none";
      colorYuanshanxun.style.boxShadow = "none";
      colorZhengchang.style.boxShadow = "none";*/
      map_img.style.backgroundImage = "url(/static/images/makalong.jpg)";
    }
    colorHuanyehei.onclick=function(){
     
      amap.setMapStyle("amap://styles/89238855b07d6641f0612b92a5e7069c");//玄烨黑
     /* colorHuanyehei.style.boxShadow = "0px 0px 10px 2px #3699CB";
      colorCaoseqing.style.boxShadow = "none";
      colorYuanshanxun.style.boxShadow = "none";
      colorMakalong.style.boxShadow = "none";
      colorZhengchang.style.boxShadow = "none";*/
      map_img.style.backgroundImage = "url(/static/images/huanyehei.jpg)";
    }

  //加载高德影像
  //const satellite = new AMap.TileLayer.Satellite();
  //satellite.setMap(amap);
  var driving = new AMap.Driving({
    map: amap,
    panel: "panel",
    showTraffic:true,
    autoFitView:false,
    // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
  // policy: AMap.DrivingPolicy.LEAST_TIME
  });
  var walking = new AMap.Walking({

    map: amap,
    panel: "panel",
    autoFitView:false,

  });
  var transfer= new AMap.Transfer({
    city:"太原",
    map: amap,
    panel: "panel",
    autoFitView:false,

  });
  var riding = new AMap.Riding({
    city:"太原",
    map: amap,
    panel: "panel",
    autoFitView:false,

  });

  

  var geolocation = new AMap.Geolocation({
    map:amap,
    panel: "panel",

    showButton: true,
    panToLocation:false,



  });
  amap.addControl(geolocation);

  var autoComplete =new AMap.Autocomplete({
    input: "first",


});
var autoCompleteEnd =new AMap.Autocomplete({
  input: "end",


});

  
  const map = new Map("foo");
  map.on("extent", (event) => {
      amap.setZoomAndCenter(event.zoom, event.center,true);
  });
  


  map.setView([112.561841, 37.731984],12);
  var box=document.getElementById("search3");
  var box2=document.getElementById("border");
    //路线参数
    var keywords = document.getElementById("first").value;
    var startLngLat = [];
    var endLngLat = [];
    var info = 0;
 
  //获取当前位置信息  
   ipBotton.onclick=function(){
    info = 1;
             geolocation.getCurrentPosition(function(status,result){
              if(status == 'complete'){
           document.getElementById("first").value = result.addressComponent.province+result.addressComponent.city+
             result.addressComponent.district+result.addressComponent.street+result.addressComponent.township+
             result.addressComponent.streetNumber;
        
              }
            else{
              console.log(result);
            }
           
           })
           
    };
  const  dog= new XMLHttpRequest();
  dog.onload = (event) => {
          const featureClass = new FeatureClass(GeometryType.MultiPolygon);
          featureClass.loadGeoJSON2(JSON.parse(dog.responseText));
          const featureLayer = new FeatureLayer();
          featureLayer.featureClass = featureClass;
          const field = new Field();
          const label=new Label();
          const symbol= new SimpleTextSymbol();
          symbol.strokeStyle="#0f0cc2";
          symbol.fontColor="#0f0cc2";
          field.name='name';
          label.field=field;
          label.symbol=symbol;
        //  const renderer = new SimpleRenderer();
          const renderer=new CategoryRenderer();
          renderer.generate(featureClass,field);
          renderer.symbol = new SimpleFillSymbol();
          featureLayer.label = label;
          featureLayer.labeled = true;
          featureLayer.renderer = renderer;
          featureLayer.zoom = [5, 20];  
          featureLayer.index=0;     
          border.onclick=function(){ 
          if(box2.checked==true){       
          map.addLayer(featureLayer);
        
        }
          else
        {
          map.removeLayer(featureLayer);
        }
        };
            };
      dog.open("GET", "/static/js/xiaodian.geojson", true);
      dog.send(null);
  
    //自动打开筛选栏
    var container_check=document.getElementById("check");
    container_check.checked=true;
  /*页面开始显示数据信息*/
  const req = new XMLHttpRequest();
  const url='http://119.29.130.157:8000/instrument/';
  req.onload = (event) => {
    const featureClass = new FeatureClass();
    featureClass.loadGeoJSON(JSON.parse(req.responseText));
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const label = new Label();        //生成一个lable
    const symbol = new SimpleTextSymbol();//生成一个symbol
    symbol.pointSymbolWidth=40;
    symbol.pointSymbolHeight=40;
    symbol.auto=true;
    const field = new Field();
    field.name = "instrument_name";
    field.instrument_address='instrument_address';
    field.instrument_category='instrument_category';
    field.instrument_pay='instrument_pay';
    field.instrument_prisectorsector='instrument_prisectorsector';
    field.instrument_auxsectorsector='instrument_auxsectorsector';
    field.instrument_contact='instrument_contact';
    field.instrument_phone='instrument_phone';
    field.instrument_fourthsector='instrument_fourthsector';
    field.instrument_reuse='instrument_reuse';
    field.instrument_remark='instrument_remark';
    field.type = FieldType.String;
    label.field = field; //label.field
    label.symbol = symbol;
    const renderer = new DotRenderer3();
    renderer.field=field;
    featureLayer.renderer = renderer;
    featureLayer.label = label; // 把label给featurelayer
    featureLayer.labeled = true; ///////
    
    search3.onclick=function(){
      if (box.checked==true){
         
        featureLayer.labeled=false;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
        
      }
      else{
        
        featureLayer.labeled=true;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
      }
    }
    featureLayer.zoom = [5, 20];
    featureLayer.on("click", (event) => {

      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
      map.showTooltip2(event.feature,field); 
      ins_botton.onclick=function(){
        //alert(event.feature.properties.company_name);
        $('#table-body').empty()
        $('#container_ins2').empty();
        $('#pagination-wrapper').empty()
        var ins_name_botton=event.feature.properties.instrument_name;
     
        check_company_botton(ins_name_botton);

      }
      ins_botton.onmouseover=function(){
        this.style.opacity="0.6";
               
       }
      ins_botton.onmouseout=function(){
        this.style.opacity="1";
               
       }
     // map.showTooltip(event.feature,field);
      // alert(event.feature.properties.point[0]);
      //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
      
    });
    featureLayer.on("mouseover", (event) => {
    
        map.redraw();
        map.showTooltip5(event.feature); 

       // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
    });
   /* featureLayer.on("mouseout", (event) => {
        event.feature.symbol = old;
        map.redraw(); 
         
    });*/
    map.setView([112.561841, 37.731984],12);
    map.addLayer(featureLayer);
    cansole.onclick=function(){
      map.removeLayer(featureLayer);
      box.checked=false;
      driving.clear();
      walking.clear();
      transfer.clear();
      riding.clear(); 
      $('#table-body').empty()
      $('#container_ins2').empty();
      $('#pagination-wrapper').empty()
      $('#container_ins3').empty();
      $('#table-body_search').empty();
      $('#pagination-wrapper_search').empty();
  
    }   
           

  }
  req.onreadystatechange=function(){ 
 
      if (this.readyState == 4 && this.status == 200) {
        
       
       console.log(this.responseText);
      
    }};   
   //req.open("GET", "assets/geojson/xiaodian.json", true);
  req.open("GET",url,true);
  req.send(null);
    
//行业
var list1=document.getElementById('box_name1').getElementsByTagName('p');
                  for (var j = 0; j <list1.length; j++) {
                  (function(j){
                      list1[j].addEventListener("click", function(e) {
                     //var k=JSON.parse(req.responseText).features[j].point[0];
                    // var o=JSON.parse(req.responseText).features[j].point[1];
$('#container_ins3').empty();
$('#table-body_search').empty();
$('#pagination-wrapper_search').empty();
driving.clear();
walking.clear();
transfer.clear();
riding.clear(); 
navList[4].click(); 
map.clearLayers();
box.checked=false;
box2.checked=false;
const n="http://119.29.130.157:8000/InsMultisearch/?instrument_prisectorsector="+document.getElementById("id"+j).innerText;
const req = new XMLHttpRequest();
const url3=n;
req.onload = (event) => {
  const featureClass = new FeatureClass();
  featureClass.loadGeoJSON(JSON.parse(req.responseText));
  const featureLayer = new FeatureLayer();
  featureLayer.featureClass = featureClass;
  const label = new Label();        //生成一个lable
  const symbol = new SimpleTextSymbol();//生成一个symbol
  symbol.pointSymbolWidth=40;
  symbol.pointSymbolHeight=40;
  symbol.auto=true;
  const field = new Field();
  field.name = "instrument_name";
  field.instrument_address='instrument_address';
  field.instrument_category='instrument_category';
  field.instrument_pay='instrument_pay';
  field.instrument_prisectorsector='instrument_prisectorsector';
  field.instrument_auxsectorsector='instrument_auxsectorsector';
  field.instrument_contact='instrument_contact';
  field.instrument_phone='instrument_phone';
  field.instrument_fourthsector='instrument_fourthsector';
  field.instrument_reuse='instrument_reuse';
  field.instrument_remark='instrument_remark';
  field.type = FieldType.String;
  label.field = field; //label.field
  label.symbol = symbol;
  const renderer = new DotRenderer3();
  renderer.field=field;
 

  featureLayer.renderer = renderer;
  featureLayer.label = label; // 把label给featurelayer
  featureLayer.labeled = true; ///////
 
  search3.onclick=function(){
    if (box.checked==true){
       
      featureLayer.labeled=false;
      map.removeLayer(featureLayer);
      map.addLayer(featureLayer);
      
    }
    else{
      
      featureLayer.labeled=true;
      map.removeLayer(featureLayer);
      map.addLayer(featureLayer);
    }
  }
  featureLayer.zoom = [5, 20];
  featureLayer.on("click", (event) => {

    map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
    map.showTooltip2(event.feature,field); 
    ins_botton.onclick=function(){
      //alert(event.feature.properties.company_name);
      $('#table-body').empty()
      $('#container_ins2').empty();
      $('#pagination-wrapper').empty()
      var ins_name_botton=event.feature.properties.instrument_name;
   
      check_company_botton(ins_name_botton);

    }
    ins_botton.onmouseover=function(){
      this.style.opacity="0.6";
             
     }
    ins_botton.onmouseout=function(){
      this.style.opacity="1";
             
     }
   // map.showTooltip(event.feature,field);
    // alert(event.feature.properties.point[0]);
    //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
    
  });

  featureLayer.on("mouseover", (event) => {
    
      map.redraw();
      map.showTooltip5(event.feature); 

     // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
  });

  map.setView([112.561841, 37.731984],12);
  map.addLayer(featureLayer);
  cansole.onclick=function(){
    map.removeLayer(featureLayer);
    box.checked=false;
    driving.clear();
    walking.clear();
    transfer.clear();
    riding.clear(); 
    $('#table-body').empty()
    $('#container_ins2').empty();
    $('#pagination-wrapper').empty()
    $('#container_ins3').empty();
    $('#table-body_search').empty();
    $('#pagination-wrapper_search').empty();


  }     
         

}
     

req.onreadystatechange=function(){  

 
    if (this.readyState == 4 && this.status == 200) {
      
     
     console.log(this.responseText);
     var data=JSON.parse(req.responseText).count;
     if(data==0)
      {
        alert("无数据")  
      }
    
  }};   
 //req.open("GET", "assets/geojson/xiaodian.json", true);
req.open("GET",url3,true);
req.send(null);
check_search2(url3);  
  
                    
                      }, false);
                    })(j) ;
                   }

//产业
var chanye_j=0;
var list1=document.getElementById('box_name2').getElementsByTagName('p');
                  for (chanye_j;chanye_j <list1.length;chanye_j++) {
                  (function(chanye_j)  {
                       
                      var chanye_id=document.getElementById("chanye_"+chanye_j);
                      chanye_id.addEventListener("click", function(e) {
                          
                     //var k=JSON.parse(req.responseText).features[j].point[0];
                    // var o=JSON.parse(req.responseText).features[j].point[1];
                            $('#container_ins3').empty();
                            $('#table-body_search').empty();
                            $('#pagination-wrapper_search').empty();
                            navList[4].click(); 
                            driving.clear();
                            walking.clear();
                            transfer.clear();
                            riding.clear(); 
                            map.clearLayers();
                            box.checked=false; 
                            box2.checked=false;
                            const n="http://119.29.130.157:8000/InsMultisearch/?instrument_fourthsector="+document.getElementById("chanye_"+chanye_j).innerText;
                          // const n="http://119.29.130.157:8000/company";
                            const req = new XMLHttpRequest();
                            const url3=n;
                            req.onload = (event) => {
                              const featureClass = new FeatureClass();
                              featureClass.loadGeoJSON(JSON.parse(req.responseText));
                              const featureLayer = new FeatureLayer();
                              featureLayer.featureClass = featureClass;
                              const label = new Label();        //生成一个lable
                              const symbol = new SimpleTextSymbol();//生成一个symbol
                              symbol.pointSymbolWidth=40;
                              symbol.pointSymbolHeight=40;
                              symbol.auto=true;
                              const field = new Field();
                              field.name = "instrument_name";
                              field.instrument_address='instrument_address';
                              field.instrument_category='instrument_category';
                              field.instrument_pay='instrument_pay';
                              field.instrument_fourthsector='instrument_fourthsector';
                              field.instrument_prisectorsector='instrument_prisectorsector';
                              field.instrument_auxsectorsector='instrument_auxsectorsector';
                              field.instrument_contact='instrument_contact';
                              field.instrument_phone='instrument_phone';
                              field.instrument_reuse='instrument_reuse';
                              field.instrument_remark='instrument_remark';
                              field.type = FieldType.String;
                              label.field = field; //label.field
                              label.symbol = symbol;
                              const renderer = new DotRenderer3();
                              renderer.field=field;
                             
                            
                              featureLayer.renderer = renderer;
                              featureLayer.label = label; // 把label给featurelayer
                              featureLayer.labeled = true; ///////
                             
                              search3.onclick=function(){
                                if (box.checked==true){
                                   
                                  featureLayer.labeled=false;
                                  map.removeLayer(featureLayer);
                                  map.addLayer(featureLayer);
                                  
                                }
                                else{
                                  
                                  featureLayer.labeled=true;
                                  map.removeLayer(featureLayer);
                                  map.addLayer(featureLayer);
                                }
                              }
                              featureLayer.zoom = [5, 20];
                              featureLayer.on("click", (event) => {
                            
                                map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                map.showTooltip2(event.feature,field); 
                                ins_botton.onclick=function(){
                                  //alert(event.feature.properties.company_name);
                                  $('#table-body').empty()
                                  $('#container_ins2').empty();
                                  $('#pagination-wrapper').empty()
                                  var ins_name_botton=event.feature.properties.instrument_name;
                               
                                  check_company_botton(ins_name_botton);
                          
                                }
                                ins_botton.onmouseover=function(){
                                  this.style.opacity="0.6";
                                         
                                 }
                                ins_botton.onmouseout=function(){
                                  this.style.opacity="1";
                                         
                                 }
                               // map.showTooltip(event.feature,field);
                                // alert(event.feature.properties.point[0]);
                                //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                
                              });
                            
                              featureLayer.on("mouseover", (event) => {
                                
                                  map.redraw();
                                  map.showTooltip5(event.feature); 
                            
                                 // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                              });
                            
                              map.setView([112.561841, 37.731984],12);
                              map.addLayer(featureLayer);
                              cansole.onclick=function(){
                                map.removeLayer(featureLayer);
                                box.checked=false;
                                driving.clear();
                                walking.clear();
                                transfer.clear();
                                riding.clear(); 
                                $('#table-body').empty()
                                $('#container_ins2').empty();
                                $('#pagination-wrapper').empty()
                                $('#container_ins3').empty();
                                $('#table-body_search').empty();
                                $('#pagination-wrapper_search').empty();
                            
                            
                              }     
                                     
                            
                            }
                                

                            req.onreadystatechange=function(){  

                               

                              //返回数据
                                if (this.readyState ==4 && this.status == 200) {
                                  
                                
                               console.log(this.responseText);
                         
                               var data=JSON.parse(req.responseText).count;
                               if(data==0)
                                {
                                  alert("无数据")  
                                }
                                
                              }};   
                            //req.open("GET", "assets/geojson/xiaodian.json", true);
                            req.open("GET",url3,true);
                            req.send(null);
                            check_search2(url3);  
                    
                      }, false);
                    })(chanye_j) ;
 } 

//路线规划
road_sure_click.onclick=function(){
  map.clearLayers();
  box.checked=false;
  box2.checked=false;
  if(document.getElementById("end").value!="" && document.getElementById("first").value!="" ){
            click_set_value.checked=false;
            var company_body_set=document.getElementById("foo1");
            company_body_set.style.display="none";
      //起始路线 
        if(info == 1){
           
              geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    startLngLat = [result.position.R,result.position.Q]; 
                   
                  
                    roadselect();
              


                }
                else{
                    onError(result)
                }
            });

    
         

        }
        else { 
        
            autoInput();

            document.getElementById("first").oninput = autoInput;
       
           
            }

        //终点坐标
         autoInputEnd();
         document.getElementById("end").oninput = autoInputEnd;
         
        }
        else{
         
          alert("您的输入为空，请重新输入!");
          driving.clear();
          walking.clear();
          riding.clear(); 
          transfer.clear();
          
      
          
       
        }
        

        document.getElementById("first").value ="";
        document.getElementById("end").value ="";
        info = 0;
   
  };
 //高级搜索
 var click_set_value=document.getElementById("click_set");
 click_set_value.onclick=function(){
   if(click_set_value.checked==true){
       var company_body_set=document.getElementById("foo1");
       company_body_set.style.backgroundColor='#7E7D79';
       company_body_set.style.opacity="0.4";
        company_body_set.style.display="block";
        company_body_set.style.zIndex="100";

   }
  else{
       var company_body_set=document.getElementById("foo1");
       company_body_set.style.display="none";
  }


 document.getElementById("search_sure_click").onclick=function(){
  if(document.getElementById("select").value!="" )
   {
       if(document.getElementById("myinput_sure").value!=""){
           click_set_value.checked=false;
           var company_body_set=document.getElementById("foo1");
           company_body_set.style.display="none";
           var myinput_sure_value=document.getElementById("myinput_sure");
        
       }
       else{
         alert("您的输入为空，请重新输入!");
       }
     }
  else{
     alert("您的输入为空，请重新输入!");
   }

   $('#container_ins3').empty();
   $('#table-body_search').empty();
   $('#pagination-wrapper_search').empty();
   driving.clear();
   walking.clear();
   transfer.clear();
   riding.clear(); 
   map.clearLayers();
   container_check.checked=true;
   box.checked=false;
   box2.checked=false;
   const req = new XMLHttpRequest();
   const url5='http://119.29.130.157:8000/InsMultisearch/?instrument_'+document.getElementById("select").value;
   
   const url1=url5+myinput_sure_value.value;
   if(document.getElementById("select").value!="recommend"){
    navList[4].click();
  }
  else{
    navList[3].click();
  }
   req.onload = (event) => {
     const featureClass = new FeatureClass();
     featureClass.loadGeoJSON(JSON.parse(req.responseText));
     const featureLayer = new FeatureLayer();
     featureLayer.featureClass = featureClass;
     const label = new Label();        //生成一个lable
     const symbol = new SimpleTextSymbol();//生成一个symbol
     symbol.pointSymbolWidth=40;
     symbol.pointSymbolHeight=40;
     symbol.auto=true;
     const field = new Field();
     field.name = "instrument_name";
     field.instrument_address='instrument_address';
     field.instrument_category='instrument_category';
     field.instrument_pay='instrument_pay';
     field.instrument_prisectorsector='instrument_prisectorsector';
     field.instrument_auxsectorsector='instrument_auxsectorsector';
     field.instrument_contact='instrument_contact';
     field.instrument_phone='instrument_phone';
     field.instrument_fourthsector='instrument_fourthsector';
     field.instrument_reuse='instrument_reuse';
     field.instrument_remark='instrument_remark';
     field.type = FieldType.String;
     label.field = field; //label.field
     label.symbol = symbol;
     const renderer = new DotRenderer3();
     renderer.field=field;
     featureLayer.renderer = renderer;
     featureLayer.label = label; // 把label给featurelayer
     featureLayer.labeled = true; ///////
    
     search3.onclick=function(){
       if (box.checked==true){
          
         featureLayer.labeled=false;
         map.removeLayer(featureLayer);
         map.addLayer(featureLayer);
         
       }
       else{
         
         featureLayer.labeled=true;
         map.removeLayer(featureLayer);
         map.addLayer(featureLayer);
       }
     }
     featureLayer.zoom = [5, 20];
     featureLayer.on("click", (event) => {

       map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
       map.showTooltip2(event.feature,field); 
       ins_botton.onclick=function(){
         //alert(event.feature.properties.company_name);
         $('#table-body').empty()
         $('#container_ins2').empty();
         $('#pagination-wrapper').empty()
         var ins_name_botton=event.feature.properties.instrument_name;
      
         check_company_botton(ins_name_botton);
 
       }
       ins_botton.onmouseover=function(){
         this.style.opacity="0.6";
                
        }
       ins_botton.onmouseout=function(){
         this.style.opacity="1";
                
        }
      // map.showTooltip(event.feature,field);
       // alert(event.feature.properties.point[0]);
       //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
       
     });
   
     featureLayer.on("mouseover", (event) => {
      
         map.redraw();
         map.showTooltip5(event.feature); 

        // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
     });
     map.setView([JSON.parse(req.responseText).features[0].point[0],JSON.parse(req.responseText).features[0].point[1]],13);
     map.addLayer(featureLayer);
     cansole.onclick=function(){
       map.removeLayer(featureLayer);
       box.checked=false;
       driving.clear();
       walking.clear();
       transfer.clear();
       riding.clear(); 
       $('#table-body').empty()
       $('#container_ins2').empty();
       $('#pagination-wrapper').empty()
       $('#container_ins3').empty();
       $('#table-body_search').empty();
       $('#pagination-wrapper_search').empty();
  
   
     }      
            

   }
        
 
   req.onreadystatechange=function(){    //返回数据
       if (this.readyState == 4 && this.status == 200) {
         
        
        console.log(this.responseText);
       
     }};   
    //req.open("GET", "assets/geojson/xiaodian.json", true);
   req.open("GET",url1,true);
   req.send(null);
 
   
   check_search2(url1);
   if(document.getElementById("select").value=="recommend")
   {
     $('#container_ins3').empty();
     $('#table-body_search').empty();
     $('#pagination-wrapper_search').empty();
   }
 
   

     
      
 }
 document.getElementById("img_close").onclick=function(){
         click_set_value.checked=false;
         var company_body_set=document.getElementById("foo1");
         company_body_set.style.display="none";
 }

}
//搜索信息返回函数
function check_search2(url_address) {    
  var relativeSearch = (function() {
                            $.ajax({
                                type: "get",
                                async: false, //同步执行
                                //url: "http://119.29.130.157:8000/boot/"+realtivedata,
                                url:url_address,
                                dataType: "text", //返回数据形式为json
                                success: function(result) {
                                    console.log("--------------------------------------")
                                    console.log(JSON.parse(result).features)
                                    var list_data=JSON.parse(result).features   
                                    var result_length = JSON.parse(result).count
                                    var  container_data_number = document.getElementById('container_ins3') ;
                                    var  cc = document.createTextNode('总计' + result_length + '个标注');
                                    container_data_number.appendChild(cc);  
                                   //  console.log(JSON.parse(result))
                                  //   var list_data=JSON.parse(result)
                                      var state = {
                                         'querySet': list_data,
                                         // 'querySet': tableData,
                                          'page': 1,
                                          'rows': 20,
                                          'window':5,
                                      }
                                      buildTable()
    
                                      function pagination(querySet, page, rows) {
    
                                          var trimStart = (page - 1) * rows
                                          var trimEnd = trimStart + rows
    
                                          var trimmedData = querySet.slice(trimStart, trimEnd)
    
                                          var pages = Math.round(querySet.length / rows); //Math.ceil
    
                                          return {
                                              'querySet': trimmedData,
                                              'pages': pages,
                                          }
                                      }
    
                                      function pageButtons(pages) {
                                          var wrapper = document.getElementById('pagination-wrapper_search')
    
                                          wrapper.innerHTML = ``
                                          console.log('Pages:', pages)
    
                                          var maxLeft = (state.page - Math.floor(state.window / 2))
                                          var maxRight = (state.page + Math.floor(state.window / 2))
    
                                          if (maxLeft < 1) {
                                              maxLeft = 1
                                              maxRight = state.window
                                          }
    
                                          if (maxRight > pages) {
                                              maxLeft = pages - (state.window - 1)
    
                                              if (maxLeft < 1) {
                                                  maxLeft = 1
                                              }
                                              maxRight = pages
                                          }
    
    
    
                                          for (var page = maxLeft; page <= maxRight; page++) {
                                              wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info" style="font-size:16px;background-color:#5EBFE2;">${page}</button>`
                                          }
    
                                          if (state.page != 1) {
                                              wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">&#171; 首页</button>` + wrapper.innerHTML
                                          }
    
                                          if (state.page != pages) {
                                              wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">末页 &#187;</button>`
                                          }
    
                                          $('.page').on('click', function() {
                                              $('#table-body_search').empty()
                                             
                                              state.page = Number($(this).val())
                                          
                                              buildTable()
                                          })
    
                                      }
    
    
                                      function buildTable() {
                                          var table = $('#table-body_search')
    
                                          var data = pagination(state.querySet, state.page, state.rows)
                                          var myList = data.querySet
                                          for (var i  in myList) {
                                           console.log(myList)
                                           if(myList[i].instrument_name!==undefined){
                                               var a=document.createElement("a")
                                               a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                               a.id="instrument_name_search"+i
                                               const instrument_id=a.id
                                               var instrument_row=myList[i].instrument_name
                                               var c=document.createTextNode(instrument_row);
                                               a.appendChild(c)
                                               var img = document.createElement("img")
                                               img.src="/static/images/定位3.svg"
                                               table.append(img)
                                               table.append(a)
                                               table.append("<br>")
                                               table.append("<br>")
                                               a.onclick=function(){
                                               map.clearLayers();
                                              // map.setView([112.48699,37.94036],9);                         
                                               box.checked=false; 
                                               box2.checked=false;
                                               const n="http://119.29.130.157:8000/InsMultisearch/?instrument_name="+document.getElementById(instrument_id).innerText;
                                               const req1 = new XMLHttpRequest();
                                               const url3=n;
                                               req1.onload = (event) => {
                                                const featureClass = new FeatureClass();
                                                featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                                const featureLayer = new FeatureLayer();
                                                featureLayer.featureClass = featureClass;
                                                const label = new Label();        //生成一个lable
                                                const symbol = new SimpleTextSymbol();//生成一个symbol
                                                symbol.pointSymbolWidth=40;
                                                symbol.pointSymbolHeight=40;
                                                symbol.auto=true;
                                                const field = new Field();
                                                field.name = "instrument_name";
                                                field.instrument_address='instrument_address';
                                                field.instrument_category='instrument_category';
                                                field.instrument_pay='instrument_pay';
                                                field.instrument_prisectorsector='instrument_prisectorsector';
                                                field.instrument_auxsectorsector='instrument_auxsectorsector';
                                                field.instrument_contact='instrument_contact';
                                                field.instrument_phone='instrument_phone';
                                                field.instrument_fourthsector='instrument_fourthsector';
                                                field.instrument_reuse='instrument_reuse';
                                                field.instrument_remark='instrument_remark';
                                                field.type = FieldType.String;
                                                label.field = field; //label.field
                                                label.symbol = symbol;
                                                const renderer = new DotRenderer3();
                                                renderer.field=field;
                                                
                                            
                                                featureLayer.renderer = renderer;
                                                featureLayer.label = label; // 把label给featurelayer
                                                featureLayer.labeled = true; ///////
                                                
                                                search3.onclick=function(){
                                                  if (box.checked==true){
                                                      
                                                    featureLayer.labeled=false;
                                                    map.removeLayer(featureLayer);
                                                    map.addLayer(featureLayer);
                                                    
                                                  }
                                                  else{
                                                    
                                                    featureLayer.labeled=true;
                                                    map.removeLayer(featureLayer);
                                                    map.addLayer(featureLayer);
                                                  }
                                                }
                                                 map.setView([JSON.parse(req1.responseText).features[0].point[0],JSON.parse(req1.responseText).features[0].point[1]],13);
        
                                                featureLayer.zoom = [5, 20];
                                                featureLayer.on("click", (event) => {
                                            
                                                  map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                                  map.showTooltip2(event.feature,field); 
                                                  ins_botton.onclick=function(){
                                                    //alert(event.feature.properties.company_name);
                                                    $('#table-body').empty()
                                                    $('#container_ins2').empty();
                                                    $('#pagination-wrapper').empty()
                                                    var ins_name_botton=event.feature.properties.instrument_name;
                                                 
                                                    check_company_botton(ins_name_botton);
                                            
                                                  }
                                                  ins_botton.onmouseover=function(){
                                                    this.style.opacity="0.6";
                                                           
                                                   }
                                                  ins_botton.onmouseout=function(){
                                                    this.style.opacity="1";
                                                           
                                                   }
                                                  // map.showTooltip(event.feature,field);
                                                  // alert(event.feature.properties.point[0]);
                                                  //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                                  
                                                });
                                              
                                                featureLayer.on("mouseover", (event) => {
                                                  
                                                    map.redraw();
                                                    map.showTooltip5(event.feature); 
                                            
                                                    // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                                });
                                              
                                        
                                                map.addLayer(featureLayer);
                                                cansole.onclick=function(){
                                                  map.removeLayer(featureLayer);
                                                  box.checked=false;
                                                  driving.clear();
                                                  walking.clear();
                                                  transfer.clear();
                                                  riding.clear(); 
                                                  $('#table-body').empty()
                                                  $('#container_ins2').empty();
                                                  $('#pagination-wrapper').empty()
                                                  $('#container_ins3').empty();
                                                  $('#table-body_search').empty();
                                                  $('#pagination-wrapper_search').empty();
                                              
                                              
                                                }     
                                                       
                                            
                                              }
                                                    
                                            
                                              req1.onreadystatechange=function(){  
                                            
                                                
                                                  if (this.readyState == 4 && this.status == 200) {
                                                    
                                                    
                                                    console.log(this.responseText);
                                                  
                                                }};   
                                                //req.open("GET", "assets/geojson/xiaodian.json", true);
                                              req1.open("GET",url3,true);
                                              req1.send(null);
                                                                                          
                                               }  
                                        }
                                            
                                         
                                           
                                          }
                                       
                                          
                                          pageButtons(data.pages)
                                      }
                                   
                                },
                                error: function(errorMsg) {
                                    alert("无数据！");
                              
                                                            }
                            });
                            return relativeSearch;
                        })()
   
  }
  
  /*页面搜索数据信息*/
  //var search=document.getElementById("search");
  var myinput=document.getElementById("myinput");
  search.onclick=function(){

    $('#container_ins3').empty();
    $('#table-body_search').empty();
    $('#pagination-wrapper_search').empty();
    map.clearLayers();
    box.checked=false;
    box2.checked=false;
    driving.clear();
    walking.clear();
    transfer.clear();
    riding.clear(); 
    navList[4].click();
    container_check.checked=true;
    const req = new XMLHttpRequest();
    const url5='http://119.29.130.157:8000/InsMultisearch/?instrument_'+document.getElementById("select_lower").value;
  
    const url1=url5+myinput.value;
    if(myinput.value==""){
         
      alert("您输入的内容为空，请重新输入！")
      url1='';
    }
    if(document.getElementById("select_lower").value=="recommend")
      {
        navList[3].click();
      }
    req.onload = (event) => {
      const featureClass = new FeatureClass();
      featureClass.loadGeoJSON(JSON.parse(req.responseText));
      const featureLayer = new FeatureLayer();
      featureLayer.featureClass = featureClass;
      const label = new Label();        //生成一个lable
      const symbol = new SimpleTextSymbol();//生成一个symbol
      symbol.pointSymbolWidth=40;
      symbol.pointSymbolHeight=40;
      symbol.auto=true;
      const field = new Field();
      field.name = "instrument_name";
      field.instrument_address='instrument_address';
      field.instrument_category='instrument_category';
      field.instrument_pay='instrument_pay';
      field.instrument_prisectorsector='instrument_prisectorsector';
      field.instrument_auxsectorsector='instrument_auxsectorsector';
      field.instrument_contact='instrument_contact';
      field.instrument_phone='instrument_phone';
      field.instrument_fourthsector='instrument_fourthsector';
      field.instrument_reuse='instrument_reuse';
      field.instrument_remark='instrument_remark';
      field.type = FieldType.String;
      label.field = field; //label.field
      label.symbol = symbol;
      const renderer = new DotRenderer3();
      renderer.field=field;
      featureLayer.renderer = renderer;
      featureLayer.label = label; // 把label给featurelayer
      featureLayer.labeled = true; ///////
     
      search3.onclick=function(){
        if (box.checked==true){
           
          featureLayer.labeled=false;
          map.removeLayer(featureLayer);
          map.addLayer(featureLayer);
          
        }
        else{
          
          featureLayer.labeled=true;
          map.removeLayer(featureLayer);
          map.addLayer(featureLayer);
        }
      }
      featureLayer.zoom = [5, 20];
      featureLayer.on("click", (event) => {

        map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
        map.showTooltip2(event.feature,field); 
        ins_botton.onclick=function(){
          //alert(event.feature.properties.company_name);
          $('#table-body').empty()
          $('#container_ins2').empty();
          $('#pagination-wrapper').empty()
          var ins_name_botton=event.feature.properties.instrument_name;
       
          check_company_botton(ins_name_botton);
  
        }
        ins_botton.onmouseover=function(){
          this.style.opacity="0.6";
                 
         }
        ins_botton.onmouseout=function(){
          this.style.opacity="1";
                 
         }
       // map.showTooltip(event.feature,field);
        // alert(event.feature.properties.point[0]);
        //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
        
      });
    
      featureLayer.on("mouseover", (event) => {
       
          map.redraw();
          map.showTooltip5(event.feature); 

         // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
      });
      map.setView([JSON.parse(req.responseText).features[0].point[0],JSON.parse(req.responseText).features[0].point[1]],13);
      map.addLayer(featureLayer);
      cansole.onclick=function(){
        map.removeLayer(featureLayer);
        box.checked=false;
        driving.clear();
        walking.clear();
        transfer.clear();
        riding.clear(); 
        $('#table-body').empty()
        $('#container_ins2').empty();
        $('#pagination-wrapper').empty()
        $('#container_ins3').empty();
        $('#table-body_search').empty();
        $('#pagination-wrapper_search').empty();
   
    
      }      
             

    }
         
  
    req.onreadystatechange=function(){    //返回数据
        if (this.readyState == 4 && this.status == 200) {
          
         
         console.log(this.responseText);
        
      }};   
     //req.open("GET", "assets/geojson/xiaodian.json", true);
    req.open("GET",url1,true);
    req.send(null);
    check_search2(url1);
    if(document.getElementById("select_lower").value=="recommend")
    {
        $('#container_ins3').empty();
        $('#table-body_search').empty();
        $('#pagination-wrapper_search').empty();
    }
  
  }
 


 /*显示下一页信息*/
 /*var number=1;
 search1.onclick=function(){
  number++;
  var m = document.getElementById("box_name");

  m.innerHTML="";
  //限制num最大值为3
  if(number>=3)
  {
    number=2;
  }
  map.clearLayers();
  box.checked=false;
  box2.checked=false;
  const req = new XMLHttpRequest();
  const url3='http://119.29.130.157:8000/instrument/?page='+number;
  req.onload = (event) => {
    const featureClass = new FeatureClass();
    featureClass.loadGeoJSON(JSON.parse(req.responseText));
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const label = new Label();        //生成一个lable
    const symbol = new SimpleTextSymbol();//生成一个symbol
    symbol.pointSymbolWidth=40;
    symbol.pointSymbolHeight=40;
    symbol.auto=true;
    const field = new Field();
    field.name = "instrument_name";
    field.instrument_address='instrument_address';
    field.instrument_category='instrument_category';
    field.instrument_pay='instrument_pay';
    field.instrument_prisectorsector='instrument_prisectorsector';
    field.instrument_auxsectorsector='instrument_auxsectorsector';
    field.instrument_contact='instrument_contact';
    field.instrument_phone='instrument_phone';
    field.instrument_reuse='instrument_reuse';
    field.instrument_remark='instrument_remark';
    field.type = FieldType.String;
    label.field = field; //label.field
    label.symbol = symbol;
    const renderer = new DotRenderer3();
    renderer.field=field;
   

    featureLayer.renderer = renderer;
    featureLayer.label = label; // 把label给featurelayer
    featureLayer.labeled = true; ///////
   
    search3.onclick=function(){
      if (box.checked==true){
         
        featureLayer.labeled=false;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
        
      }
      else{
        
        featureLayer.labeled=true;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
      }
    }
    featureLayer.zoom = [5, 20];
    featureLayer.on("click", (event) => {

      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
      map.showTooltip2(event.feature,field); 
     // map.showTooltip(event.feature,field);
      // alert(event.feature.properties.point[0]);
      //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
      
    });
  
    featureLayer.on("mouseover", (event) => {
      
        map.redraw();
        map.showTooltip5(event.feature); 

       // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
    });
  
    map.setView([112.561841, 37.731984],12);
    map.addLayer(featureLayer);
    cansole.onclick=function(){
      map.removeLayer(featureLayer);
      box.checked=false;
 
  
    }     
           

  }
       

  req.onreadystatechange=function(){  
         // 返回名称
      
         var maxid=getJsonObjLength(JSON.parse(req.responseText).features);
         var ii=0;
         for(ii;ii<=maxid-1;ii++)
                             {
                            var m = document.getElementById("box_name");
                            var n=JSON.parse(req.responseText).features[ii].instrument_name;
                           
                            var a=document.createElement("a");
                            a.id=ii;
                           // a.style.backgroundColor = "#00FF7F";
                            a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                            var c=document.createTextNode(n);
                            a.appendChild(c);
                            var img = document.createElement("img");
                            img.src="/static/images/定位4.svg";
                            var b=document.createElement("br");
                            var d=document.createElement("br");
                            m.appendChild(b);
                            m.appendChild(img);
                            m.appendChild(a);
                            m.appendChild(d);
              
                            }
               
                            var list=document.getElementById('box_name').getElementsByTagName('a');
                           for (var j = 0; j <list.length; j++) {
                           (function(j){
                               list[j].addEventListener("click", function(e) {
                               map.clearLayers();
                               var k=JSON.parse(req.responseText).features[j].point[0];
                               var o=JSON.parse(req.responseText).features[j].point[1];
                         
                               map.setView([k,o],20);
                       
                              box.checked=false;
                              box2.checked=false;
                              const n="http://119.29.130.157:8000/InsMultisearch/?instrument_name="+document.getElementById(j).innerText;
                              const req1 = new XMLHttpRequest();
                              const url3=n;
                              req1.onload = (event) => {
                                const featureClass = new FeatureClass();
                                featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                const featureLayer = new FeatureLayer();
                                featureLayer.featureClass = featureClass;
                                const label = new Label();        //生成一个lable
                                const symbol = new SimpleTextSymbol();//生成一个symbol
                                symbol.pointSymbolWidth=40;
                                symbol.pointSymbolHeight=40;
                                symbol.auto=true;
                                const field = new Field();
                                field.name = "instrument_name";
                                field.instrument_address='instrument_address';
                                field.instrument_category='instrument_category';
                                field.instrument_pay='instrument_pay';
                                field.instrument_prisectorsector='instrument_prisectorsector';
                                field.instrument_auxsectorsector='instrument_auxsectorsector';
                                field.instrument_contact='instrument_contact';
                                field.instrument_phone='instrument_phone';
                                field.instrument_reuse='instrument_reuse';
                                field.instrument_remark='instrument_remark';
                                field.type = FieldType.String;
                                label.field = field; //label.field
                                label.symbol = symbol;
                                const renderer = new DotRenderer3();
                                renderer.field=field;
                                
                            
                                featureLayer.renderer = renderer;
                                featureLayer.label = label; // 把label给featurelayer
                                featureLayer.labeled = true; ///////
                                
                                search3.onclick=function(){
                                  if (box.checked==true){
                                      
                                    featureLayer.labeled=false;
                                    map.removeLayer(featureLayer);
                                    map.addLayer(featureLayer);
                                    
                                  }
                                  else{
                                    
                                    featureLayer.labeled=true;
                                    map.removeLayer(featureLayer);
                                    map.addLayer(featureLayer);
                                  }
                                }
                                featureLayer.zoom = [5, 20];
                                featureLayer.on("click", (event) => {
                            
                             
                                  map.showTooltip2(event.feature,field); 
                                  // map.showTooltip(event.feature,field);
                                  // alert(event.feature.properties.point[0]);
                                  //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                  
                                });
                              
                                featureLayer.on("mouseover", (event) => {
                                  
                                    map.redraw();
                                    map.showTooltip5(event.feature); 
                            
                                    // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                });
                              
                        
                                map.addLayer(featureLayer);
                                cansole.onclick=function(){
                                  map.removeLayer(featureLayer);
                                  box.checked=false;
                              
                              
                                }     
                                       
                            
                              }
                                    
                            
                              req1.onreadystatechange=function(){  
                            
                                
                                  if (this.readyState == 4 && this.status == 200) {
                                    
                                    
                                    console.log(this.responseText);
                                  
                                }};   
                                //req.open("GET", "assets/geojson/xiaodian.json", true);
                              req1.open("GET",url3,true);
                              req1.send(null);
                             
                               }, false);
                             })(j) ;
         }; 
      if (this.readyState == 4 && this.status == 200) {
        
       
       console.log(this.responseText);
      
    }};   
   //req.open("GET", "assets/geojson/xiaodian.json", true);
  req.open("GET",url3,true);
  req.send(null);
    
}


/*点击显示上一页信息*/
 /*search2.onclick=function(){
  number--;
  var m = document.getElementById("box_name");

  m.innerHTML="";
  //限制num最大值为3
  if(number<=0)
  {
    number=1;
  }
  map.clearLayers();
  box.checked=false;
  box2.checked=false;
  const req = new XMLHttpRequest();
  const url3='http://119.29.130.157:8000/instrument/?page='+number;
  req.onload = (event) => {
    const featureClass = new FeatureClass();
    featureClass.loadGeoJSON(JSON.parse(req.responseText));
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const label = new Label();        //生成一个lable
    const symbol = new SimpleTextSymbol();//生成一个symbol
    symbol.pointSymbolWidth=40;
    symbol.pointSymbolHeight=40;
    symbol.auto=true;
    const field = new Field();
    field.name = "instrument_name";
    field.instrument_address='instrument_address';
    field.instrument_category='instrument_category';
    field.instrument_pay='instrument_pay';
    field.instrument_prisectorsector='instrument_prisectorsector';
    field.instrument_auxsectorsector='instrument_auxsectorsector';
    field.instrument_contact='instrument_contact';
    field.instrument_phone='instrument_phone';
    field.instrument_reuse='instrument_reuse';
    field.instrument_remark='instrument_remark';
    field.type = FieldType.String;
    label.field = field; //label.field
    label.symbol = symbol;
    const renderer = new DotRenderer3();
    renderer.field=field;
   

    featureLayer.renderer = renderer;
    featureLayer.label = label; // 把label给featurelayer
    featureLayer.labeled = true; ///////
   
    search3.onclick=function(){
      if (box.checked==true){
         
        featureLayer.labeled=false;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
        
      }
      else{
        
        featureLayer.labeled=true;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
      }
    }
    featureLayer.zoom = [5, 20];
    featureLayer.on("click", (event) => {

      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
      map.showTooltip2(event.feature,field); 
     // map.showTooltip(event.feature,field);
      // alert(event.feature.properties.point[0]);
      //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
      
    });
  
    featureLayer.on("mouseover", (event) => {
      
        map.redraw();
        map.showTooltip5(event.feature); 

       // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
    });
  
    map.setView([112.561841, 37.731984],12);
    map.addLayer(featureLayer);
    cansole.onclick=function(){
      map.removeLayer(featureLayer);
      box.checked=false;
 
  
    }     
           

  }
       

  req.onreadystatechange=function(){  
         // 返回名称
         var maxid=getJsonObjLength(JSON.parse(req.responseText).features);
         var ii=0;
         for(ii;ii<=maxid-1;ii++)
                             {
                            var m = document.getElementById("box_name");
                            var n=JSON.parse(req.responseText).features[ii].instrument_name;
                           
                            var a=document.createElement("a");
                            a.id=ii;
                           // a.style.backgroundColor = "#00FF7F";
                            a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                            var c=document.createTextNode(n);
                            a.appendChild(c);
                            var img = document.createElement("img");
                            img.src="/static/images/定位4.svg";
                            var b=document.createElement("br");
                            var d=document.createElement("br");
                            m.appendChild(b);
                            m.appendChild(img);
                            m.appendChild(a);
                            m.appendChild(d);
              
                            }
               
                            var list=document.getElementById('box_name').getElementsByTagName('a');
                           for (var j = 0; j <list.length; j++) {
                           (function(j){
                               list[j].addEventListener("click", function(e) {
                               map.clearLayers();
                               var k=JSON.parse(req.responseText).features[j].point[0];
                               var o=JSON.parse(req.responseText).features[j].point[1];
                         
                               map.setView([k,o],20);
                       
                              box.checked=false;
                              box2.checked=false;
                              const n="http://119.29.130.157:8000/InsMultisearch/?instrument_name="+document.getElementById(j).innerText;
                              const req1 = new XMLHttpRequest();
                              const url3=n;
                              req1.onload = (event) => {
                                const featureClass = new FeatureClass();
                                featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                const featureLayer = new FeatureLayer();
                                featureLayer.featureClass = featureClass;
                                const label = new Label();        //生成一个lable
                                const symbol = new SimpleTextSymbol();//生成一个symbol
                                symbol.pointSymbolWidth=40;
                                symbol.pointSymbolHeight=40;
                                symbol.auto=true;
                                const field = new Field();
                                field.name = "instrument_name";
                                field.instrument_address='instrument_address';
                                field.instrument_category='instrument_category';
                                field.instrument_pay='instrument_pay';
                                field.instrument_prisectorsector='instrument_prisectorsector';
                                field.instrument_auxsectorsector='instrument_auxsectorsector';
                                field.instrument_contact='instrument_contact';
                                field.instrument_phone='instrument_phone';
                                field.instrument_reuse='instrument_reuse';
                                field.instrument_remark='instrument_remark';
                                field.type = FieldType.String;
                                label.field = field; //label.field
                                label.symbol = symbol;
                                const renderer = new DotRenderer3();
                                renderer.field=field;
                                
                            
                                featureLayer.renderer = renderer;
                                featureLayer.label = label; // 把label给featurelayer
                                featureLayer.labeled = true; ///////
                                
                                search3.onclick=function(){
                                  if (box.checked==true){
                                      
                                    featureLayer.labeled=false;
                                    map.removeLayer(featureLayer);
                                    map.addLayer(featureLayer);
                                    
                                  }
                                  else{
                                    
                                    featureLayer.labeled=true;
                                    map.removeLayer(featureLayer);
                                    map.addLayer(featureLayer);
                                  }
                                }
                                featureLayer.zoom = [5, 20];
                                featureLayer.on("click", (event) => {
                            
                             
                                  map.showTooltip2(event.feature,field); 
                                  // map.showTooltip(event.feature,field);
                                  // alert(event.feature.properties.point[0]);
                                  //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                  
                                });
                              
                                featureLayer.on("mouseover", (event) => {
                                  
                                    map.redraw();
                                    map.showTooltip5(event.feature); 
                            
                                    // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                });
                              
                        
                                map.addLayer(featureLayer);
                                cansole.onclick=function(){
                                  map.removeLayer(featureLayer);
                                  box.checked=false;
                              
                              
                                }     
                                       
                            
                              }
                                    
                            
                              req1.onreadystatechange=function(){  
                            
                                
                                  if (this.readyState == 4 && this.status == 200) {
                                    
                                    
                                    console.log(this.responseText);
                                  
                                }};   
                                //req.open("GET", "assets/geojson/xiaodian.json", true);
                              req1.open("GET",url3,true);
                              req1.send(null);
                             
                               }, false);
                             })(j) ;
         }; 
      if (this.readyState == 4 && this.status == 200) {
        
       
       console.log(this.responseText);
      
    }};   
   //req.open("GET", "assets/geojson/xiaodian.json", true);
  req.open("GET",url3,true);
  req.send(null);
    
}*/
//返回Json文件的长度的函数
    function getJsonObjLength(jsonObj) {
      var Length = 0;
    for (var item in jsonObj) {
        Length++;
      }
    return Length;
    }

var navList=document.getElementById('top2').getElementsByTagName('li');
    var contents=document.getElementById('bottom').getElementsByTagName('li');
    for(var i=0;i<navList.length;i++){
            //在事件之前我先把索引给准备好
            navList[i].setAttribute("index",i);
            navList[i].onclick=function(){
                for(var j=0;j<navList.length;j++){
                //removeAttribute既可以移除自定义属性，也可以移除非自定义属性
                    navList[j].removeAttribute('class');
                }
                this.className="current";
                //将索引值先给存下来
                var num=this.getAttribute("index");
                for(var k=0;k<contents.length;k++){
                    contents[k].removeAttribute('class');
                }
                contents[num].className="current";
            }
    }
    navList[0].click();

//推荐栏
search_sure_click_recomend.onclick=function(){
  var myinput=document.getElementById("myinput");
  $('#table-body').empty()
  $('#container_ins2').empty();
  $('#pagination-wrapper').empty()
  driving.clear();
  walking.clear();
  transfer.clear();
  riding.clear(); 
  container_check.checked=true;
  if(document.getElementById("select").value=="recommend" )
  {
    if(getValue('myinput_sure') != ''){
 
     check_search(1);
    }
    
  /* var chear_name=document.getElementById("box_name3");
   chear_name.innerHTML="";*/
 
  }
 }
 
//基础搜索推荐
search_lower.onclick=function(){
  
  container_check.checked=true;
  
 /* var wrapper = document.getElementById('pagination-wrapper');
  wrapper.empty();*/
  $('#table-body').empty()
  $('#container_ins2').empty();
  $('#pagination-wrapper').empty()
  $('#container_ins3').empty();
  $('#table-body_search').empty();
  $('#pagination-wrapper_search').empty();
  driving.clear();
  walking.clear();
  transfer.clear();
  riding.clear(); 
     if(document.getElementById("select_lower").value=="recommend" )
   {
     if(getValue('myinput') != ''){
  
      check_search(2);
     }
    
   /* var chear_name=document.getElementById("box_name3");
    chear_name.innerHTML="";*/
  
   }
 
 }
       function getValue(id) {
            return document.getElementById(id).value;
        }

        //检测搜索
        var myInput = []

        function check_search(key_word) {
         // var list_m = document.getElementById("box_name3");
        //  list_m.innerHTML="";
           
                if (!window.localStorage) {
                    alert("浏览器不支持localStorage");
                } else {
                          if(key_word==1){
                              var myinput_sure_value=document.getElementById("myinput_sure")
                                               var realtivedata = myinput_sure_value.value
                          }
                          else if(key_word==2){
                          var myinput_sure_value=document.getElementById("myinput")
                                          var realtivedata = myinput_sure_value.value
                          }
                  
                    var relativeSearch = (function() {
                        $.ajax({
                            type: "get",
                            async: false, //同步执行
                            url: "http://119.29.130.157:8000/boot/"+realtivedata,
                            dataType: "text", //返回数据形式为json
                            success: function(result) {
                                 console.log(JSON.parse(result))
                                 var list_data=JSON.parse(result)

                                 var result_length = getJsonObjLength(JSON.parse(result))
                                 var  container_data_number = document.getElementById('container_ins2') ;
                                 var  cc = document.createTextNode('总计' + result_length + '个标注');
                                 container_data_number.appendChild(cc);

                                  var state = {
                                     'querySet': list_data,
                                     // 'querySet': tableData,
                                      'page': 1,
                                      'rows': 15,
                                      'window':5,
                                  }
                                  buildTable()

                                  function pagination(querySet, page, rows) {

                                      var trimStart = (page - 1) * rows
                                      var trimEnd = trimStart + rows

                                      var trimmedData = querySet.slice(trimStart, trimEnd)

                                      var pages = Math.round(querySet.length / rows); //Math.ceil

                                      return {
                                          'querySet': trimmedData,
                                          'pages': pages,
                                      }
                                  }

                                  function pageButtons(pages) {
                                      var wrapper = document.getElementById('pagination-wrapper')

                                      wrapper.innerHTML = ``
                                      console.log('Pages:', pages)

                                      var maxLeft = (state.page - Math.floor(state.window / 2))
                                      var maxRight = (state.page + Math.floor(state.window / 2))

                                      if (maxLeft < 1) {
                                          maxLeft = 1
                                          maxRight = state.window
                                      }

                                      if (maxRight > pages) {
                                          maxLeft = pages - (state.window - 1)

                                          if (maxLeft < 1) {
                                              maxLeft = 1
                                          }
                                          maxRight = pages
                                      }



                                      for (var page = maxLeft; page <= maxRight; page++) {
                                          wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info" style="font-size:16px;background-color:#5EBFE2;">${page}</button>`
                                      }

                                      if (state.page != 1) {
                                          wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">&#171; 首页</button>` + wrapper.innerHTML
                                      }

                                      if (state.page != pages) {
                                          wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">末页 &#187;</button>`
                                      }

                                      $('.page').on('click', function() {
                                          $('#table-body').empty()

                                          state.page = Number($(this).val())

                                          buildTable()
                                      })

                                  }


                                  function buildTable() {
                                      var table = $('#table-body')

                                      var data = pagination(state.querySet, state.page, state.rows)
                                      var myList = data.querySet
                                      for (var i  in myList) {
                                       console.log(myList)
                                       if(myList[i].company_name!==undefined){
                                              var a=document.createElement("a")
                                              a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                              a.id="company_"+i
                                              const company_id=a.id
                                              var company_row=myList[i].company_name
                                              var c=document.createTextNode(company_row);
                                              a.appendChild(c)
                                              var img = document.createElement("img")
                                              img.src="/static/images/定位.svg"
                                              table.append(img)
                                              table.append(a)
                                              table.append("<br>")
                                              table.append("<br>")
                                              a.onclick=function(){
                                                                      
                                                                        //  alert(n)
                                                                          map.clearLayers();
                                                                          map.setView([112.48699,37.94036],9);
                                                                       //  var k=JSON.parse(req.responseText).features[j].point[0];
                                                                       //  var o=JSON.parse(req.responseText).features[j].point[1];
                                                                       //  map.setView([k,o],20);
                                                                         box.checked=false; 
                                                                         box2.checked=false;
                                                                         const n="http://119.29.130.157:8000/ComMultisearch/?company_name="+document.getElementById(company_id).innerText;
                                                                         const req1 = new XMLHttpRequest();
                                                                         const url3=n;
                                                                         req1.onload = (event) => {
                                                                           const featureClass = new FeatureClass();
                                                                           featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                                                           const featureLayer = new FeatureLayer();
                                                                           featureLayer.featureClass = featureClass;
                                                                           const label = new Label();        //生成一个lable
                                                                           const symbol = new SimpleTextSymbol();//生成一个symbol
                                                                           symbol.pointSymbolWidth=40;
                                                                           symbol.pointSymbolHeight=40;
                                                                           symbol.strokeStyle="#5ebfe2";
                                                                           symbol.fontColor="#5ebfe2";
                                                                           symbol.auto=true;
                                                                           const field = new Field();
                                                                           field.name = "company_name";
                                                                           field.company_introduction='company_introduction';
                                                                           field.company_prisector='company_prisector';
                                                                           field.company_auxsector='company_auxsector';
                                                                           field.company_fourthsector='company_fourthsector';
                                                                           field.company_categary='company_categary';
                                                                           field.company_auth='company_auth';
                                     
                                                                           field.company_time='company_time';
                                                                           field.company_address='company_address';
                                                                           field.company_item='company_item';
                                                                           field.company_year='company_year';
                                                                           field.company_remark='company_remark';
                                                                           field.radius='company_radius';
                                                                           field.type = FieldType.String;
                                                                           label.field = field; //label.field
                                                                           label.symbol = symbol;
                                                                           const renderer = new DotRenderer2();
                                                                           renderer.field=field;
                                                                           featureLayer.renderer = renderer;
                                                                           featureLayer.label = label; // 把label给featurelayer
                                                                           featureLayer.labeled = true;
                                                                           
                                                                           search3.onclick=function(){
                                                                             if (box.checked==true){
                                                                               
                                                                               featureLayer.labeled=false;
                                                                               map.removeLayer(featureLayer);
                                                                               map.addLayer(featureLayer);
                                                                               
                                                                             }
                                                                             else{
                                                                               
                                                                               featureLayer.labeled=true;
                                                                               map.removeLayer(featureLayer);
                                                                               map.addLayer(featureLayer);
                                                                             }
                                                                           }
                                                                           featureLayer.zoom = [5, 20];
                                                                           featureLayer.on("click", (event) => {
                                                                            map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                     
                                                                            map.showTooltip(event.feature,field); 
                                                                            company_botton.onclick=function(){
                                                                              //alert(event.feature.properties.company_name);
                                                                              $('#table-body').empty()
                                                                              $('#container_ins2').empty();
                                                                              $('#pagination-wrapper').empty()
                                                                              var company_name_botton=event.feature.properties.company_name;
                                                                           
                                                                              check_company_botton(company_name_botton);
                                                                    
                                                                            }
                                                                            company_botton.onmouseover=function(){
                                                                              this.style.opacity="0.6";
                                                                                     
                                                                             }
                                                                            company_botton.onmouseout=function(){
                                                                              this.style.opacity="1";
                                                                                     
                                                                             }
                                                                           
                                                                           // map.showTooltip(event.feature,field);
                                                                             // alert(event.feature.properties.point[0]);
                                                                             //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                                                             
                                                                           });
                                     
                                                                           featureLayer.on("mouseover", (event) => {
                                                                             
                                                                               map.redraw();
                                                                               map.showTooltip5(event.feature); 
                                                                             
                                     
                                                                             // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                                                           });
                                                                       
                                     
                                                                     
                                                                           map.addLayer(featureLayer);
                                                                           cansole.onclick=function(){
                                                                             map.removeLayer(featureLayer);
                                                                             box.checked=false;
                                                                             driving.clear();
                                                                             walking.clear();
                                                                             transfer.clear();
                                                                             riding.clear(); 
                                                                             $('#table-body').empty()
                                                                             $('#container_ins2').empty();
                                                                             $('#pagination-wrapper').empty()
                                                                             $('#container_ins3').empty();
                                                                             $('#table-body_search').empty();
                                                                             $('#pagination-wrapper_search').empty();
                                     
                                     
                                                                           }    
                                                                                  
                                     
                                                                         }
                                                                             
                                     
                                                                         req1.onreadystatechange=function(){  
                                                                           //返回数据
                                                                             if (this.readyState == 4 && this.status == 200) {
                                                                               
                                                                             
                                                                             console.log(this.responseText);
                                                                             
                                                                           }};   
                                                                         //req.open("GET", "assets/geojson/xiaodian.json", true);
                                                                         req1.open("GET",url3,true);
                                                                         req1.send(null);
                                                                                         
                                              }  
                                       }
                                           if(myList[i].ach_name!==undefined){
                                            var a=document.createElement("a")
                                               a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                               a.id="ach_"+i
                                               const ach_id=a.id
                                               var ach_row=myList[i].ach_name
                                               var c=document.createTextNode(ach_row);
                                               a.appendChild(c)
                                               var img = document.createElement("img")
                                               img.src="/static/images/定位1.svg"
                                               table.append(img)
                                               table.append(a)
                                               table.append("<br>")
                                               table.append("<br>")
                                               a.onclick=function(){
                                                                      
                                                //  alert(n)
                                                  map.clearLayers();
                                                  map.setView([112.48699,37.94036],9);
                                               //  var k=JSON.parse(req.responseText).features[j].point[0];
                                               //  var o=JSON.parse(req.responseText).features[j].point[1];
                                               //  map.setView([k,o],20);
                                                 box.checked=false; 
                                                 box2.checked=false;
                                                 const n="http://119.29.130.157:8000/AchMultisearch/?ach_name="+document.getElementById(ach_id).innerText;
                                                const req1 = new XMLHttpRequest();
                                                const url2=n;
                                                req1.onload = (event) => {
                                                  const featureClass = new FeatureClass();
                                                  featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                                  const featureLayer = new FeatureLayer();
                                                  featureLayer.featureClass = featureClass;
                                                  const label = new Label();        //生成一个lable
                                                  const symbol = new SimpleTextSymbol();//生成一个symbol
                                                  symbol.pointSymbolWidth=40;
                                                  symbol.pointSymbolHeight=40;
                                                  symbol.auto=true;
                                                  const field = new Field();
                                                  field.name = "ach_name";
                                                  field.ach_people='ach_people';
                                                  field.ach_unit='ach_unit';
                                                  field.ach_keywords='ach_keywords';
                                                  field.ach_clc='ach_clc';
                                                  field.ach_sc='ach_sc';
                                                  field.ach_introduction='ach_introduction';
                                                  field.ach_categary='ach_categary';
                                                  field.ach_inyear='ach_inyear';
                                                  field.ach_researchtime='ach_researchtime';
                                                  field.ach_evaluform='ach_evaluform';
                                                  field.ach_level='ach_level';
                                                  field.ach_fourthsector='ach_fourthsector'
                                                  field.ach_prisectorsector='ach_prisectorsector';
                                                  field.ach_auxsectorsector='ach_auxsectorsector';
                                                  field.ach_remark='ach_remark';
                                                  field.type = FieldType.String;
                                                  label.field = field; //label.field
                                                  label.symbol = symbol;
                                                  const renderer = new DotRenderer1();
                                                  renderer.field=field;
                                                  featureLayer.renderer = renderer;
                                                  featureLayer.label = label; // 把label给featurelayer
                                                  featureLayer.labeled = true; ///////
                                                  search3.onclick=function(){
                                                    if (box.checked==true){
                                                      
                                                      featureLayer.labeled=false;
                                                      map.removeLayer(featureLayer);
                                                      map.addLayer(featureLayer);
                                                      
                                                    }
                                                    else{
                                                      
                                                      featureLayer.labeled=true;
                                                      map.removeLayer(featureLayer);
                                                      map.addLayer(featureLayer);
                                                    }
                                                  }
                                                  featureLayer.zoom = [5, 20];
                                                  featureLayer.on("click", (event) => {

                                                    map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                                    map.showTooltip1(event.feature,field);
                                                    ach_botton.onclick=function(){
                                                      //alert(event.feature.properties.company_name);
                                                      $('#table-body').empty()
                                                      $('#container_ins2').empty();
                                                      $('#pagination-wrapper').empty()
                                                      var ach_name_botton=event.feature.properties.ach_name;
                                                   
                                                      check_company_botton(ach_name_botton);
                                            
                                                    }
                                                    ach_botton.onmouseover=function(){
                                                      this.style.opacity="0.6";
                                                             
                                                     }
                                                    ach_botton.onmouseout=function(){
                                                      this.style.opacity="1";
                                                             
                                                     } 
                                                  // map.showTooltip(event.feature,field);
                                                    // alert(event.feature.properties.point[0]);
                                                    //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                                    
                                                  });
                                                
                                                  featureLayer.on("mouseover", (event) => {
                                                  
                                                      map.redraw();
                                                      map.showTooltip5(event.feature); 

                                                    // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                                  });
                                                  /*featureLayer.on("mouseout", (event) => {
                                                      event.feature.symbol = old;
                                                      map.redraw(); 
                                                      
                                                  });*/
                                                //map.setTileUrl("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png");
                                                // map.setTileUrl("http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7");
                                          
                                                  map.addLayer(featureLayer);
                                                  cansole.onclick=function(){
                                                    map.removeLayer(featureLayer);
                                                    box.checked=false;
                                                    driving.clear();
                                                    walking.clear();
                                                    transfer.clear();
                                                    riding.clear(); 
                                                    $('#table-body').empty()
                                                    $('#container_ins2').empty();
                                                    $('#pagination-wrapper').empty()
                                                    $('#container_ins3').empty();
                                                    $('#table-body_search').empty();
                                                    $('#pagination-wrapper_search').empty();


                                                  }       

                                                }
                                                    

                                                req1.onreadystatechange=function(){  
                                                  
                                                    if (this.readyState == 4 && this.status == 200) {
                                                      
                                                    
                                                    console.log(this.responseText);
                                                    
                                                  }};   
                                                //req.open("GET", "assets/geojson/xiaodian.json", true);
                                                req1.open("GET",url2,true);
                                                req1.send(null);
                                          
                                                                 
                      }  
                                              }
                                              
                                         if(myList[i].teacher_name!==undefined){
                                          var a=document.createElement("a")
                                             a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                             a.id="teacher_"+i
                                             const teacher_id=a.id
                                             var teacher_row=myList[i].teacher_name
                                             var c=document.createTextNode(teacher_row);
                                             a.appendChild(c)
                                             var img = document.createElement("img")
                                             img.src="/static/images/定位2.svg"
                                             table.append(img)
                                             table.append(a)
                                             table.append("<br>")
                                             table.append("<br>")
                                             a.onclick=function(){
                                                                      
                                              //  alert(n)
                                                map.clearLayers();
                                                map.setView([112.48699,37.94036],9);
                                             //  var k=JSON.parse(req.responseText).features[j].point[0];
                                             //  var o=JSON.parse(req.responseText).features[j].point[1];
                                             //  map.setView([k,o],20);
                                               box.checked=false; 
                                               box2.checked=false;
                                               const n="http://119.29.130.157:8000/TeaMultisearch/?teacher_name="+document.getElementById(teacher_id).innerText;
                                               const url2=n;
                                               const req1 = new XMLHttpRequest();
                                               req1.onload = (event) => {
                                                 const featureClass = new FeatureClass();
                                                 featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                                 const featureLayer = new FeatureLayer();
                                                 featureLayer.featureClass = featureClass;
                                                 const label = new Label();        //生成一个lable
                                                 const symbol = new SimpleTextSymbol();//生成一个symbol
                                                 symbol.pointSymbolWidth=40;
                                                 symbol.pointSymbolHeight=40;
                                                 symbol.auto=true;
                                                 const field = new Field();
                                                 field.name = "teacher_name";
                                                 field.teacher_position='teacher_position';
                                                 field.teacher_college='teacher_college';
                                                 field.teacher_prisectorsector='teacher_prisectorsector';
                                                 field.teacher_program='teacher_program';
                                                 field.teacher_auxsectorsector='teacher_auxsectorsector';
                                                 field.teacher_research='teacher_research';
                                                 field.teacher_fourthsector='teacher_fourthsector';
                                                 field.teacher_remark='teacher_remark';
                                                 field.radius='teacher_radius';
                                                 field.type = FieldType.String;
                                                 label.field = field; //label.field
                                                 label.symbol = symbol;
                                                 const renderer = new DotRenderer5();
                                                 renderer.field=field;
                   
                   
                                                 featureLayer.renderer = renderer;
                                                 featureLayer.label = label; // 把label给featurelayer
                                                 featureLayer.labeled = true; ///////
                   
                                                 search3.onclick=function(){
                                                   if (box.checked==true){
                                                     
                                                     featureLayer.labeled=false;
                                                     map.removeLayer(featureLayer);
                                                     map.addLayer(featureLayer);
                                                     
                                                   }
                                                   else{
                                                     
                                                     featureLayer.labeled=true;
                                                     map.removeLayer(featureLayer);
                                                     map.addLayer(featureLayer);
                                                   }
                                                 }
                                                 featureLayer.zoom = [5, 20];
                                                 featureLayer.on("click", (event) => {
                   
                                                  map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                                   map.showTooltip4(event.feature,field); 
                                                   teacher_botton.onclick=function(){
                                                    //alert(event.feature.properties.company_name);
                                                    $('#table-body').empty()
                                                    $('#container_ins2').empty();
                                                    $('#pagination-wrapper').empty()
                                                    var teacher_name_botton=event.feature.properties.teacher_name;
                                                 
                                                    check_company_botton(teacher_name_botton);
                                          
                                                  }
                                                  teacher_botton.onmouseover=function(){
                                                    this.style.opacity="0.6";
                                                           
                                                   }
                                                  teacher_botton.onmouseout=function(){
                                                    this.style.opacity="1";
                                                           
                                                   }
                                                 // map.showTooltip(event.feature,field);
                                                   // alert(event.feature.properties.point[0]);
                                                   //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                                   
                                                 });
                                               
                                                 featureLayer.on("mouseover", (event) => {
                                                 
                                                     map.redraw();
                                                     map.showTooltip5(event.feature); 
                   
                                                   // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                                 });
                                                 /*featureLayer.on("mouseout", (event) => {
                                                     event.feature.symbol = old;
                                                     map.redraw(); 
                                                     
                                                 });*/
                                         
                                                 map.addLayer(featureLayer);
                                                 cansole.onclick=function(){
                                                   map.removeLayer(featureLayer);
                                                   box.checked=false;
                                                   driving.clear();
                                                   walking.clear();
                                                   transfer.clear();
                                                   riding.clear(); 
                                                   $('#table-body').empty()
                                                   $('#container_ins2').empty();
                                                   $('#pagination-wrapper').empty()
                                                   $('#container_ins3').empty();
                                                   $('#table-body_search').empty();
                                                   $('#pagination-wrapper_search').empty();
                   
                   
                                                 }      
                                                        
                   
                                               }
                                               req1.onreadystatechange=function(){ 
                                               
                                               
                                                 //返回数据
                                                   if (this.readyState == 4 && this.status == 200) {
                                                     
                                                   
                                                   console.log(this.responseText);
                                                   
                                                 }};   
                                               //req.open("GET", "assets/geojson/xiaodian.json", true);
                                               req1.open("GET",url2,true);
                                               req1.send(null);
                                                               
                    }  
                                       }
                                     
                                       
                                      }
                                   
                                      
                                      pageButtons(data.pages)
                                  }
                               
                            },
                            error: function(errorMsg) {
                                alert("无数据！");
                          
                                                        }
                        });
                        return relativeSearch;
                    })()
                }
                return true;
           
        }

//名称点击
check_search1();
  function check_search1() {    
                    var relativeSearch = (function() {
                        $.ajax({
                            type: "get",
                            async: false, //同步执行
                            url: "http://119.29.130.157:8000/instrument/",
                            
                            dataType: "text", //返回数据形式为json
                            success: function(result) {
                            console.log(JSON.parse(result).features)
                            var list_data=JSON.parse(result).features

                            var result_length = JSON.parse(result).count
                            var  container_data_number = document.getElementById('container_ins1') ;
                            var  cc = document.createTextNode('总计' + result_length + '个标注');
                            container_data_number.appendChild(cc);  
                            var state = {
                              'querySet': list_data,
                              // 'querySet': tableData,
                               'page': 1,
                               'rows': 20,
                               'window':5,
                           }
                           buildTable()
                           
                           function pagination(querySet, page, rows) {

                               var trimStart = (page - 1) * rows
                               var trimEnd = trimStart + rows

                               var trimmedData = querySet.slice(trimStart, trimEnd)

                               var pages = Math.round(querySet.length / rows); //Math.ceil

                               return {
                                   'querySet': trimmedData,
                                   'pages': 2,
                               }
                           }

                           function pageButtons(pages) {
                               var wrapper = document.getElementById('pagination-wrapper_name')
                               
                               wrapper.innerHTML = ``
                               console.log('Pages:', pages)

                               var maxLeft = (state.page - Math.floor(state.window / 2))
                               var maxRight = (state.page + Math.floor(state.window / 2))

                               if (maxLeft < 1) {
                                   maxLeft = 1
                                   maxRight = state.window
                               }

                               if (maxRight > pages) {
                                   maxLeft = pages - (state.window - 1)

                                   if (maxLeft < 1) {
                                       maxLeft = 1
                                   }
                                   maxRight = pages
                               }



                               for (var page = maxLeft; page <= maxRight; page++) {
                                   wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info" style="font-size:16px;background-color:#5EBFE2;">${page}</button>`
                               }

                               if (state.page != 1) {
                                   wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">&#171; 首页</button>` + wrapper.innerHTML
                               }

                               if (state.page != pages) {
                                   wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">末页 &#187;</button>`
                               }

                               $('.page').on('click', function() {
                                   $('#table-body_name').empty()
                                  map.clearLayers();
                                  map.setView([112.561841, 37.731984],12);                                 
                                  box.checked=false; 
                                  box2.checked=false;
                                  driving.clear();
                                  walking.clear();
                                  transfer.clear();
                                  riding.clear(); 
                                  const n="http://119.29.130.157:8000/instrument/?page="+this.value;
                                
                                  const req1 = new XMLHttpRequest();
                                  const url3=n;
                                  req1.onload = (event) => {
                                    const featureClass = new FeatureClass();
                                    featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                    const featureLayer = new FeatureLayer();
                                    featureLayer.featureClass = featureClass;
                                    const label = new Label();        //生成一个lable
                                    const symbol = new SimpleTextSymbol();//生成一个symbol
                                    symbol.pointSymbolWidth=40;
                                    symbol.pointSymbolHeight=40;
                                    symbol.auto=true;
                                    const field = new Field();
                                    field.name = "instrument_name";
                                    field.instrument_address='instrument_address';
                                    field.instrument_category='instrument_category';
                                    field.instrument_pay='instrument_pay';
                                    field.instrument_prisectorsector='instrument_prisectorsector';
                                    field.instrument_auxsectorsector='instrument_auxsectorsector';
                                    field.instrument_contact='instrument_contact';
                                    field.instrument_phone='instrument_phone';
                                    field.instrument_fourthsector='instrument_fourthsector';
                                    field.instrument_reuse='instrument_reuse';
                                    field.instrument_remark='instrument_remark';
                                    field.type = FieldType.String;
                                    label.field = field; //label.field
                                    label.symbol = symbol;
                                    const renderer = new DotRenderer3();
                                    renderer.field=field;
                                    
                                
                                    featureLayer.renderer = renderer;
                                    featureLayer.label = label; // 把label给featurelayer
                                    featureLayer.labeled = true; ///////
                                    
                                    search3.onclick=function(){
                                      if (box.checked==true){
                                          
                                        featureLayer.labeled=false;
                                        map.removeLayer(featureLayer);
                                        map.addLayer(featureLayer);
                                        
                                      }
                                      else{
                                        
                                        featureLayer.labeled=true;
                                        map.removeLayer(featureLayer);
                                        map.addLayer(featureLayer);
                                      }
                                    }
                                    featureLayer.zoom = [5, 20];
                                    featureLayer.on("click", (event) => {
                                
                                      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                      map.showTooltip2(event.feature,field); 
                                      ins_botton.onclick=function(){
                                        //alert(event.feature.properties.company_name);
                                        $('#table-body').empty()
                                        $('#container_ins2').empty();
                                        $('#pagination-wrapper').empty()
                                        var ins_name_botton=event.feature.properties.instrument_name;
                                     
                                        check_company_botton(ins_name_botton);
                                
                                      }
                                      ins_botton.onmouseover=function(){
                                        this.style.opacity="0.6";
                                               
                                       }
                                      ins_botton.onmouseout=function(){
                                        this.style.opacity="1";
                                               
                                       }
                                      // map.showTooltip(event.feature,field);
                                      // alert(event.feature.properties.point[0]);
                                      //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                      
                                    });
                                  
                                    featureLayer.on("mouseover", (event) => {
                                      
                                        map.redraw();
                                        map.showTooltip5(event.feature); 
                                
                                        // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                    });
                                  
                            
                                    map.addLayer(featureLayer);
                                    cansole.onclick=function(){
                                      map.removeLayer(featureLayer);
                                      box.checked=false;
                                      driving.clear();
                                      walking.clear();
                                      transfer.clear();
                                      riding.clear(); 
                                      $('#table-body').empty()
                                      $('#container_ins2').empty();
                                      $('#pagination-wrapper').empty()
                                      $('#container_ins3').empty();
                                      $('#table-body_search').empty();
                                      $('#pagination-wrapper_search').empty();
                                  
                                  
                                    }     
                                           
                                
                                  }
                                        
                                
                                  req1.onreadystatechange=function(){  
                                
                                    
                                      if (this.readyState == 4 && this.status == 200) {
                                        
                                        list_data=JSON.parse(this.responseText).features;
                                        console.log(this.responseText);
                                        buildTable()
                                    }};   
                                    //req.open("GET", "assets/geojson/xiaodian.json", true);
                                  req1.open("GET",url3,true);
                                  req1.send(null);         
                                     
                               
                                   state.page = Number($(this).val())

                                
                               })
                           
                           }


                           function buildTable() {
                               var table = $('#table-body_name')

                               var data = pagination(state.querySet, state.page, state.rows)
                               var myList = list_data
                               for (var i  in myList) {
                                console.log(myList)
                                if(myList[i].instrument_name!==undefined){
                                       var a=document.createElement("a")
                                       a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                       a.id="instrument_name"+i
                                       const instrument_id=a.id
                                       var instrument_row=myList[i].instrument_name
                                       var c=document.createTextNode(instrument_row);
                                       a.appendChild(c)
                                       var img = document.createElement("img")
                                       img.src="/static/images/定位3.svg"
                                       table.append(img)
                                       table.append(a)
                                       table.append("<br>")
                                       table.append("<br>")
                                       a.onclick=function(){
                                       map.clearLayers();
                                      // map.setView([112.48699,37.94036],9);                         
                                       box.checked=false; 
                                       box2.checked=false;
                                       driving.clear();
                                       walking.clear();
                                       transfer.clear();
                                       riding.clear(); 
                                       const n="http://119.29.130.157:8000/InsMultisearch/?instrument_name="+document.getElementById(instrument_id).innerText;
                                       const req1 = new XMLHttpRequest();
                                       const url3=n;
                                       req1.onload = (event) => {
                                        const featureClass = new FeatureClass();
                                        featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                        const featureLayer = new FeatureLayer();
                                        featureLayer.featureClass = featureClass;
                                        const label = new Label();        //生成一个lable
                                        const symbol = new SimpleTextSymbol();//生成一个symbol
                                        symbol.pointSymbolWidth=40;
                                        symbol.pointSymbolHeight=40;
                                        symbol.auto=true;
                                        const field = new Field();
                                        field.name = "instrument_name";
                                        field.instrument_address='instrument_address';
                                        field.instrument_category='instrument_category';
                                        field.instrument_pay='instrument_pay';
                                        field.instrument_prisectorsector='instrument_prisectorsector';
                                        field.instrument_auxsectorsector='instrument_auxsectorsector';
                                        field.instrument_contact='instrument_contact';
                                        field.instrument_phone='instrument_phone';
                                        field.instrument_fourthsector='instrument_fourthsector';
                                        field.instrument_reuse='instrument_reuse';
                                        field.instrument_remark='instrument_remark';
                                        field.type = FieldType.String;
                                        label.field = field; //label.field
                                        label.symbol = symbol;
                                        const renderer = new DotRenderer3();
                                        renderer.field=field;
                                        
                                    
                                        featureLayer.renderer = renderer;
                                        featureLayer.label = label; // 把label给featurelayer
                                        featureLayer.labeled = true; ///////
                                        
                                        search3.onclick=function(){
                                          if (box.checked==true){
                                              
                                            featureLayer.labeled=false;
                                            map.removeLayer(featureLayer);
                                            map.addLayer(featureLayer);
                                            
                                          }
                                          else{
                                            
                                            featureLayer.labeled=true;
                                            map.removeLayer(featureLayer);
                                            map.addLayer(featureLayer);
                                          }
                                        }
                                         map.setView([JSON.parse(req1.responseText).features[0].point[0],JSON.parse(req1.responseText).features[0].point[1]],13);

                                        featureLayer.zoom = [5, 20];
                                        featureLayer.on("click", (event) => {
                                    
                                          map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                          map.showTooltip2(event.feature,field); 
                                          ins_botton.onclick=function(){
                                            //alert(event.feature.properties.company_name);
                                            $('#table-body').empty()
                                            $('#container_ins2').empty();
                                            $('#pagination-wrapper').empty()
                                            var ins_name_botton=event.feature.properties.instrument_name;
                                         
                                            check_company_botton(ins_name_botton);
                                    
                                          }
                                          ins_botton.onmouseover=function(){
                                            this.style.opacity="0.6";
                                                   
                                           }
                                          ins_botton.onmouseout=function(){
                                            this.style.opacity="1";
                                                   
                                           }
                                          // map.showTooltip(event.feature,field);
                                          // alert(event.feature.properties.point[0]);
                                          //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                          
                                        });
                                      
                                        featureLayer.on("mouseover", (event) => {
                                          
                                            map.redraw();
                                            map.showTooltip5(event.feature); 
                                    
                                            // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                        });
                                      
                                
                                        map.addLayer(featureLayer);
                                        cansole.onclick=function(){
                                          map.removeLayer(featureLayer);
                                          box.checked=false;
                                          driving.clear();
                                          walking.clear();
                                          transfer.clear();
                                          riding.clear(); 
                                          $('#table-body').empty()
                                          $('#container_ins2').empty();
                                          $('#pagination-wrapper').empty()
                                          $('#container_ins3').empty();
                                          $('#table-body_search').empty();
                                          $('#pagination-wrapper_search').empty();
                                      
                                      
                                        }     
                                               
                                    
                                      }
                                            
                                    
                                      req1.onreadystatechange=function(){  
                                    
                                        
                                          if (this.readyState == 4 && this.status == 200) {
                                            
                                            
                                            console.log(this.responseText);
                                          
                                        }};   
                                        //req.open("GET", "assets/geojson/xiaodian.json", true);
                                      req1.open("GET",url3,true);
                                      req1.send(null);
                                                                                  
                                       }  
                                }
                                    
                              
                                
                                
                               }
                            
                               
                               pageButtons(data.pages)
                            
                           }
                        
                            },
                            error: function(errorMsg) {
                                alert("加载失败！");
                          
                                                        }
                        });
                        return relativeSearch;
                    })()
              

      }
//路线按钮
roadBack.onclick=function(){
  document.getElementById("table1").style.display = "none";
  document.getElementById("table2").style.display = "block";
  document.getElementById("roadBack").style.display = "none";
  document.getElementById("searchBack").style.display = "block";
  document.getElementById("search_sure_click").style.display = "none";
  document.getElementById("road_sure_click").style.display = "block";
  document.getElementById("ipBotton").style.display = "inline";
  

}
searchBack.onclick=function(){
  document.getElementById("table1").style.display = "block";
  document.getElementById("table2").style.display = "none";
  document.getElementById("roadBack").style.display = "block";
  document.getElementById("searchBack").style.display = "none";
  document.getElementById("search_sure_click").style.display = "block";
  document.getElementById("road_sure_click").style.display = "none";
  document.getElementById("ipBotton").style.display = "none";


}
//推荐函数
function check_company_botton(data_botton) {
  navList[3].click();
  container_check.checked=true;
   var relativeSearch = (function() {
                            $.ajax({
                                type: "get",
                                async: false, //同步执行
                                url: "http://119.29.130.157:8000/boot/"+data_botton,
                                dataType: "text", //返回数据形式为json
                                success: function(result) {
                                     console.log(JSON.parse(result))
                                     var list_data=JSON.parse(result)
                                     
                                     var result_length = getJsonObjLength(JSON.parse(result))
                                     var  container_data_number = document.getElementById('container_ins2') ;
                                     var  cc = document.createTextNode('总计' + result_length + '个标注');
                                     container_data_number.appendChild(cc);
    
    
    
    
                                      var state = {
                                         'querySet': list_data,
                                         // 'querySet': tableData,
                                          'page': 1,
                                          'rows': 20,
                                          'window':5,
                                      }
                                      buildTable()
    
                                      function pagination(querySet, page, rows) {
    
                                          var trimStart = (page - 1) * rows
                                          var trimEnd = trimStart + rows
    
                                          var trimmedData = querySet.slice(trimStart, trimEnd)
    
                                          var pages = Math.round(querySet.length / rows); //Math.ceil
    
                                          return {
                                              'querySet': trimmedData,
                                              'pages': pages,
                                          }
                                      }
    
                                      function pageButtons(pages) {
                                          var wrapper = document.getElementById('pagination-wrapper')
    
                                          wrapper.innerHTML = ``
                                          console.log('Pages:', pages)
    
                                          var maxLeft = (state.page - Math.floor(state.window / 2))
                                          var maxRight = (state.page + Math.floor(state.window / 2))
    
                                          if (maxLeft < 1) {
                                              maxLeft = 1
                                              maxRight = state.window
                                          }
    
                                          if (maxRight > pages) {
                                              maxLeft = pages - (state.window - 1)
    
                                              if (maxLeft < 1) {
                                                  maxLeft = 1
                                              }
                                              maxRight = pages
                                          }
    
    
    
                                          for (var page = maxLeft; page <= maxRight; page++) {
                                              wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info" style="font-size:16px;background-color:#5EBFE2;">${page}</button>`
                                          }
    
                                          if (state.page != 1) {
                                              wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">&#171; 首页</button>` + wrapper.innerHTML
                                          }
    
                                          if (state.page != pages) {
                                              wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info" style="font-size:13.5px;background-color:#5EBFE2;">末页 &#187;</button>`
                                          }
    
                                          $('.page').on('click', function() {
                                              $('#table-body').empty()
                                             
                                              state.page = Number($(this).val())
                                          
                                              buildTable()
                                          })
    
                                      }
    
    
                                      function buildTable() {
                                          var table = $('#table-body')
    
                                          var data = pagination(state.querySet, state.page, state.rows)
                                          var myList = data.querySet
                                          for (var i  in myList) {
                                           console.log(myList)
                                           if(myList[i].company_name!==undefined){
                                                  var a=document.createElement("a")
                                                  a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                                  a.id="company_"+i
                                                  const company_id=a.id
                                                  var company_row=myList[i].company_name
                                                  var c=document.createTextNode(company_row);
                                                  a.appendChild(c)
                                                  var img = document.createElement("img")
                                                  img.src="/static/images/定位.svg"
                                                  table.append(img)
                                                  table.append(a)
                                                  table.append("<br>")
                                                  table.append("<br>")
                                                  a.onclick=function(){
                                                                          
                                                                            //  alert(n)
                                                                              map.clearLayers();
                                                                              map.setView([112.48699,37.94036],9);
                                                                           //  var k=JSON.parse(req.responseText).features[j].point[0];
                                                                           //  var o=JSON.parse(req.responseText).features[j].point[1];
                                                                           //  map.setView([k,o],20);
                                                                             box.checked=false; 
                                                                             box2.checked=false;
                                                                             const n="http://119.29.130.157:8000/ComMultisearch/?company_name="+document.getElementById(company_id).innerText;
                                                                             const req1 = new XMLHttpRequest();
                                                                             const url3=n;
                                                                             req1.onload = (event) => {
                                                                               const featureClass = new FeatureClass();
                                                                               featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                                                               const featureLayer = new FeatureLayer();
                                                                               featureLayer.featureClass = featureClass;
                                                                               const label = new Label();        //生成一个lable
                                                                               const symbol = new SimpleTextSymbol();//生成一个symbol
                                                                               symbol.pointSymbolWidth=40;
                                                                               symbol.pointSymbolHeight=40;
                                                                               symbol.strokeStyle="#5ebfe2";
                                                                               symbol.fontColor="#5ebfe2";
                                                                               symbol.auto=true;
                                                                               const field = new Field();
                                                                               field.name = "company_name";
                                                                               field.company_introduction='company_introduction';
                                                                               field.company_prisector='company_prisector';
                                                                               field.company_auxsector='company_auxsector';
                                                                               field.company_fourthsector='company_fourthsector';
                                                                               field.company_categary='company_categary';
                                                                               field.company_auth='company_auth';
                                         
                                                                               field.company_time='company_time';
                                                                               field.company_address='company_address';
                                                                               field.company_item='company_item';
                                                                               field.company_year='company_year';
                                                                               field.company_remark='company_remark';
                                                                               field.radius='company_radius';
                                                                               field.type = FieldType.String;
                                                                               label.field = field; //label.field
                                                                               label.symbol = symbol;
                                                                               const renderer = new DotRenderer2();
                                                                               renderer.field=field;
                                                                               featureLayer.renderer = renderer;
                                                                               featureLayer.label = label; // 把label给featurelayer
                                                                               featureLayer.labeled = true;
                                                                               
                                                                               search3.onclick=function(){
                                                                                 if (box.checked==true){
                                                                                   
                                                                                   featureLayer.labeled=false;
                                                                                   map.removeLayer(featureLayer);
                                                                                   map.addLayer(featureLayer);
                                                                                   
                                                                                 }
                                                                                 else{
                                                                                   
                                                                                   featureLayer.labeled=true;
                                                                                   map.removeLayer(featureLayer);
                                                                                   map.addLayer(featureLayer);
                                                                                 }
                                                                               }
                                                                               featureLayer.zoom = [5, 20];
                                                                               featureLayer.on("click", (event) => {
                                                                                map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                         
                                                                                map.showTooltip(event.feature,field); 
                                                                                company_botton.onclick=function(){
                                                                                  //alert(event.feature.properties.company_name);
                                                                                  $('#table-body').empty()
                                                                                  $('#container_ins2').empty();
                                                                                  $('#pagination-wrapper').empty()
                                                                                  var company_name_botton=event.feature.properties.company_name;
                                                                               
                                                                                  check_company_botton(company_name_botton);
                                                                        
                                                                                }
                                                                                company_botton.onmouseover=function(){
                                                                                  this.style.opacity="0.6";
                                                                                         
                                                                                 }
                                                                                company_botton.onmouseout=function(){
                                                                                  this.style.opacity="1";
                                                                                         
                                                                                 }
                                                                              
                                                                               
                                                                               // map.showTooltip(event.feature,field);
                                                                                 // alert(event.feature.properties.point[0]);
                                                                                 //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                                                                 
                                                                               });
                                         
                                                                               featureLayer.on("mouseover", (event) => {
                                                                                 
                                                                                   map.redraw();
                                                                                   map.showTooltip5(event.feature); 
                                                                                 
                                         
                                                                                 // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                                                               });
                                                                           
                                         
                                                                         
                                                                               map.addLayer(featureLayer);
                                                                               cansole.onclick=function(){
                                                                                 map.removeLayer(featureLayer);
                                                                                 box.checked=false;
                                         
                                         
                                                                               }    
                                                                                      
                                         
                                                                             }
                                                                                 
                                         
                                                                             req1.onreadystatechange=function(){  
                                                                               //返回数据
                                                                                 if (this.readyState == 4 && this.status == 200) {
                                                                                   
                                                                                 
                                                                                 console.log(this.responseText);
                                                                                 
                                                                               }};   
                                                                             //req.open("GET", "assets/geojson/xiaodian.json", true);
                                                                             req1.open("GET",url3,true);
                                                                             req1.send(null);
                                                                                             
                                                  }  
                                           }
                                               if(myList[i].ach_name!==undefined){
                                                var a=document.createElement("a")
                                                   a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                                   a.id="ach_"+i
                                                   const ach_id=a.id
                                                   var ach_row=myList[i].ach_name
                                                   var c=document.createTextNode(ach_row);
                                                   a.appendChild(c)
                                                   var img = document.createElement("img")
                                                   img.src="/static/images/定位1.svg"
                                                   table.append(img)
                                                   table.append(a)
                                                   table.append("<br>")
                                                   table.append("<br>")
                                                   a.onclick=function(){
                                                                          
                                                    //  alert(n)
                                                      map.clearLayers();
                                                      map.setView([112.48699,37.94036],9);
                                                   //  var k=JSON.parse(req.responseText).features[j].point[0];
                                                   //  var o=JSON.parse(req.responseText).features[j].point[1];
                                                   //  map.setView([k,o],20);
                                                     box.checked=false; 
                                                     box2.checked=false;
                                                  
                                                     const n="http://119.29.130.157:8000/AchMultisearch/?ach_name="+document.getElementById(ach_id).innerText;
                                                    const req1 = new XMLHttpRequest();
                                                    const url2=n;
                                                    req1.onload = (event) => {
                                                      const featureClass = new FeatureClass();
                                                      featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                                      const featureLayer = new FeatureLayer();
                                                      featureLayer.featureClass = featureClass;
                                                      const label = new Label();        //生成一个lable
                                                      const symbol = new SimpleTextSymbol();//生成一个symbol
                                                      symbol.pointSymbolWidth=40;
                                                      symbol.pointSymbolHeight=40;
                                                      symbol.auto=true;
                                                      const field = new Field();
                                                      field.name = "ach_name";
                                                      field.ach_people='ach_people';
                                                      field.ach_unit='ach_unit';
                                                      field.ach_keywords='ach_keywords';
                                                      field.ach_clc='ach_clc';
                                                      field.ach_sc='ach_sc';
                                                      field.ach_introduction='ach_introduction';
                                                      field.ach_categary='ach_categary';
                                                      field.ach_inyear='ach_inyear';
                                                      field.ach_fourthsector='ach_fourthsector';
                                                      field.ach_researchtime='ach_researchtime';
                                                      field.ach_evaluform='ach_evaluform';
                                                      field.ach_level='ach_level';
                                                      field.ach_prisectorsector='ach_prisectorsector';
                                                      field.ach_auxsectorsector='ach_auxsectorsector';
                                                      field.ach_remark='ach_remark';
                                                      field.type = FieldType.String;
                                                      label.field = field; //label.field
                                                      label.symbol = symbol;
                                                      const renderer = new DotRenderer1();
                                                      renderer.field=field;
                                                      featureLayer.renderer = renderer;
                                                      featureLayer.label = label; // 把label给featurelayer
                                                      featureLayer.labeled = true; ///////
                                                      search3.onclick=function(){
                                                        if (box.checked==true){
                                                          
                                                          featureLayer.labeled=false;
                                                          map.removeLayer(featureLayer);
                                                          map.addLayer(featureLayer);
                                                          
                                                        }
                                                        else{
                                                          
                                                          featureLayer.labeled=true;
                                                          map.removeLayer(featureLayer);
                                                          map.addLayer(featureLayer);
                                                        }
                                                      }
                                                      featureLayer.zoom = [5, 20];
                                                      featureLayer.on("click", (event) => {
    
                                                        map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                                        map.showTooltip1(event.feature,field); 
                                                        ach_botton.onclick=function(){
                                                          //alert(event.feature.properties.company_name);
                                                          $('#table-body').empty()
                                                          $('#container_ins2').empty();
                                                          $('#pagination-wrapper').empty()
                                                          var ach_name_botton=event.feature.properties.ach_name;
                                                       
                                                          check_company_botton(ach_name_botton);
                                                
                                                        }
                                                        ach_botton.onmouseover=function(){
                                                          this.style.opacity="0.6";
                                                                 
                                                         }
                                                        ach_botton.onmouseout=function(){
                                                          this.style.opacity="1";
                                                                 
                                                         }
                                                      // map.showTooltip(event.feature,field);
                                                        // alert(event.feature.properties.point[0]);
                                                        //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                                        
                                                      });
                                                    
                                                      featureLayer.on("mouseover", (event) => {
                                                      
                                                          map.redraw();
                                                          map.showTooltip5(event.feature); 
    
                                                        // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                                      });
                                                      /*featureLayer.on("mouseout", (event) => {
                                                          event.feature.symbol = old;
                                                          map.redraw(); 
                                                          
                                                      });*/
                                                    //map.setTileUrl("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png");
                                                    // map.setTileUrl("http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7");
                                              
                                                      map.addLayer(featureLayer);
                                                      cansole.onclick=function(){
                                                        map.removeLayer(featureLayer);
                                                        box.checked=false;
    
    
                                                      }       
    
                                                    }
                                                        
    
                                                    req1.onreadystatechange=function(){  
                                                      
                                                        if (this.readyState == 4 && this.status == 200) {
                                                          
                                                        
                                                        console.log(this.responseText);
                                                        
                                                      }};   
                                                    //req.open("GET", "assets/geojson/xiaodian.json", true);
                                                    req1.open("GET",url2,true);
                                                    req1.send(null);
                                              
                                                                     
                          }  
                                                  }
                                                  
                                             if(myList[i].teacher_name!==undefined){
                                              var a=document.createElement("a")
                                                 a.setAttribute("style","background-color:white;color:gray;width:100px;height:200px ;font-size: 20px;")
                                                 a.id="teacher_"+i
                                                 const teacher_id=a.id
                                                 var teacher_row=myList[i].teacher_name
                                                 var c=document.createTextNode(teacher_row);
                                                 a.appendChild(c)
                                                 var img = document.createElement("img")
                                                 img.src="/static/images/定位2.svg"
                                                 table.append(img)
                                                 table.append(a)
                                                 table.append("<br>")
                                                 table.append("<br>")
                                                 a.onclick=function(){
                                                                          
                                                  //  alert(n)
                                                    map.clearLayers();
                                                    map.setView([112.48699,37.94036],9);
                                                 //  var k=JSON.parse(req.responseText).features[j].point[0];
                                                 //  var o=JSON.parse(req.responseText).features[j].point[1];
                                                 //  map.setView([k,o],20);
                                                   box.checked=false; 
                                                   box2.checked=false;
                                                   const n="http://119.29.130.157:8000/TeaMultisearch/?teacher_name="+document.getElementById(teacher_id).innerText;
                                                   const url2=n;
                                                   const req1 = new XMLHttpRequest();
                                                   req1.onload = (event) => {
                                                     const featureClass = new FeatureClass();
                                                     featureClass.loadGeoJSON(JSON.parse(req1.responseText));
                                                     const featureLayer = new FeatureLayer();
                                                     featureLayer.featureClass = featureClass;
                                                     const label = new Label();        //生成一个lable
                                                     const symbol = new SimpleTextSymbol();//生成一个symbol
                                                     symbol.pointSymbolWidth=40;
                                                     symbol.pointSymbolHeight=40;
                                                     symbol.auto=true;
                                                     const field = new Field();
                                                     field.name = "teacher_name";
                                                     field.teacher_position='teacher_position';
                                                     field.teacher_college='teacher_college';
                                                     field.teacher_prisectorsector='teacher_prisectorsector';
                                                     field.teacher_program='teacher_program';
                                                     field.teacher_auxsectorsector='teacher_auxsectorsector';
                                                     field.teacher_research='teacher_research';
                                                     field.teacher_fourthsector='teacher_fourthsector';
                                                     field.teacher_remark='teacher_remark';
                                                     field.radius='teacher_radius';
                                                     field.type = FieldType.String;
                                                     label.field = field; //label.field
                                                     label.symbol = symbol;
                                                     const renderer = new DotRenderer5();
                                                     renderer.field=field;
                       
                       
                                                     featureLayer.renderer = renderer;
                                                     featureLayer.label = label; // 把label给featurelayer
                                                     featureLayer.labeled = true; ///////
                       
                                                     search3.onclick=function(){
                                                       if (box.checked==true){
                                                         
                                                         featureLayer.labeled=false;
                                                         map.removeLayer(featureLayer);
                                                         map.addLayer(featureLayer);
                                                         
                                                       }
                                                       else{
                                                         
                                                         featureLayer.labeled=true;
                                                         map.removeLayer(featureLayer);
                                                         map.addLayer(featureLayer);
                                                       }
                                                     }
                                                     featureLayer.zoom = [5, 20];
                                                     featureLayer.on("click", (event) => {
                       
                                                       map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
                                                       map.showTooltip4(event.feature,field); 
                                                       teacher_botton.onclick=function(){
                                                        //alert(event.feature.properties.company_name);
                                                        $('#table-body').empty()
                                                        $('#container_ins2').empty();
                                                        $('#pagination-wrapper').empty()
                                                        var teacher_name_botton=event.feature.properties.teacher_name;
                                                     
                                                        check_company_botton(teacher_name_botton);
                                              
                                                      }
                                                      teacher_botton.onmouseover=function(){
                                                        this.style.opacity="0.6";
                                                               
                                                       }
                                                      teacher_botton.onmouseout=function(){
                                                        this.style.opacity="1";
                                                               
                                                       }
                                                     // map.showTooltip(event.feature,field);
                                                       // alert(event.feature.properties.point[0]);
                                                       //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
                                                       
                                                     });
                                                   
                                                     featureLayer.on("mouseover", (event) => {
                                                     
                                                         map.redraw();
                                                         map.showTooltip5(event.feature); 
                       
                                                       // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
                                                     });
                                                     /*featureLayer.on("mouseout", (event) => {
                                                         event.feature.symbol = old;
                                                         map.redraw(); 
                                                         
                                                     });*/
                                             
                                                     map.addLayer(featureLayer);
                                                     cansole.onclick=function(){
                                                       map.removeLayer(featureLayer);
                                                       box.checked=false;
                       
                       
                                                     }      
                                                            
                       
                                                   }
                                                   req1.onreadystatechange=function(){ 
                                                   
                                                   
                                                     //返回数据
                                                       if (this.readyState == 4 && this.status == 200) {
                                                         
                                                       
                                                       console.log(this.responseText);
                                                       
                                                     }};   
                                                   //req.open("GET", "assets/geojson/xiaodian.json", true);
                                                   req1.open("GET",url2,true);
                                                   req1.send(null);
                                                                   
                        }  
                                           }
                                         
                                           
                                          }
                                       
                                          
                                          pageButtons(data.pages)
                                      }
                                   
                                },
                                error: function(errorMsg) {
                                    alert("无数据！");
                              
                                                            }
                            });
                            return relativeSearch;
                        })()
    }
      //自动匹配起点函数
  function autoInput(){
    var keywords = document.getElementById("first").value;
  
  
      autoComplete.search(keywords, function(status, result) {
        // 搜索成功时，result即是对应的匹配数据
         
        
          
          if(status=='complete'){
            startLngLat = [result.tips[0].location.R,result.tips[0].location.Q];
           
            roadselect()
            infoRoad == 1;
     
            
           
          
                                   

         }
         else{
         
         
             $.ajax({
                       type: "get",
                       async: false, //同步执行
                                //url: "http://119.29.130.157:8000/boot/"+realtivedata,
                       url:'http://119.29.130.157:8000/InsMultisearch/?instrument_name='+keywords,
                       dataType: "text", //返回数据形式为json
                       success: function(result) {
                          const point1=  JSON.parse(result).features[0].point[0];
                          const point2=  JSON.parse(result).features[0].point[1];
                          startLngLat = [point1,point2];
                          
                   
                            }
                            
                            });
                     const urlTrue1 ='http://119.29.130.157:8000/InsMultisearch/?instrument_name='+keywords;
                     companyDate(urlTrue1);
                     roadselect()
                 
     
   

         }
   
          
      })
 
  }
     //自动匹配终点函数
  function autoInputEnd(){
    var keywords = document.getElementById("end").value;
  
  
      autoCompleteEnd.search(keywords, function(status, result) {
        // 搜索成功时，result即是对应的匹配数据
         
        
          
          if(status=='complete'){
            endLngLat = [result.tips[0].location.R,result.tips[0].location.Q];
           
            roadselect()
            map.setView([result.tips[0].location.R,result.tips[0].location.Q],12);
        
            
           
          
                                   

         }
         else{
         
         
             $.ajax({
                       type: "get",
                       async: false, //同步执行
                                //url: "http://119.29.130.157:8000/boot/"+realtivedata,
                       url:'http://119.29.130.157:8000/InsMultisearch/?instrument_name='+keywords,
                       dataType: "text", //返回数据形式为json
                       success: function(result) {
                          const point1=  JSON.parse(result).features[0].point[0];
                          const point2=  JSON.parse(result).features[0].point[1];
                          endLngLat= [point1,point2];
                          
                   
                            }
                            
                            });
                     const urlTrue1 ='http://119.29.130.157:8000/InsMultisearch/?instrument_name='+keywords;
                     companyDate(urlTrue1);
                     roadselect()
                 
     
   

         }
   
          
      })
 
  }
      
     //路线分类函数   
function roadselect(){
  if(document.getElementById("roadXian").value == "drving")
  {  
        transfer.clear();
        walking.clear();
        riding.clear(); 
        driving.search(startLngLat,endLngLat, function (status, result) {
              if (status === 'complete') {
                console.log("路线完成")
            } else {
              console.log('获取驾车数据失败：' + result)
            }
        });

}
else if(document.getElementById("roadXian").value == "walk"){
          driving.clear();
          transfer.clear();
          riding.clear(); 
          walking.search(startLngLat,endLngLat, function (status, result) {
          if (status === 'complete') {
          console.log("路线完成")
          } else {
          console.log('获取驾车数据失败：' + result)
          }
          });

}
else if(document.getElementById("roadXian").value == "bus"){
        driving.clear();
        walking.clear();
        riding.clear(); 

        transfer.search(startLngLat,endLngLat, function (status, result) {
        if (status === 'complete') {
        console.log("路线完成")
        } else {
        console.log('获取驾车数据失败：' + result)
        }
        });



}
else if(document.getElementById("roadXian").value == "circle"){
      driving.clear();
      walking.clear();
      transfer.clear();


      riding.search(startLngLat,endLngLat, function (status, result) {
      if (status === 'complete') {
      console.log("路线完成")
      } else {
      console.log('获取驾车数据失败：' + result)
      }
      });



}   
}

function companyDate(url_company){
  const req = new XMLHttpRequest();
  const url_first=url_company;

  req.onload = (event) => {
    const featureClass = new FeatureClass();
    featureClass.loadGeoJSON(JSON.parse(req.responseText));
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const label = new Label();        //生成一个lable
    const symbol = new SimpleTextSymbol();//生成一个symbol
    symbol.pointSymbolWidth=40;
    symbol.pointSymbolHeight=40;
    symbol.auto=true;
    const field = new Field();
    field.name = "instrument_name";
    field.instrument_address='instrument_address';
    field.instrument_category='instrument_category';
    field.instrument_pay='instrument_pay';
    field.instrument_prisectorsector='instrument_prisectorsector';
    field.instrument_auxsectorsector='instrument_auxsectorsector';
    field.instrument_contact='instrument_contact';
    field.instrument_phone='instrument_phone';
    field.instrument_fourthsector='instrument_fourthsector';
    field.instrument_reuse='instrument_reuse';
    field.instrument_remark='instrument_remark';
    field.type = FieldType.String;
    label.field = field; //label.field
    label.symbol = symbol;
    const renderer = new DotRenderer3();
    renderer.field=field;
   
  
    featureLayer.renderer = renderer;
    featureLayer.label = label; // 把label给featurelayer
    featureLayer.labeled = true; ///////
   
    search3.onclick=function(){
      if (box.checked==true){
         
        featureLayer.labeled=false;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
        
      }
      else{
        
        featureLayer.labeled=true;
        map.removeLayer(featureLayer);
        map.addLayer(featureLayer);
      }
    }
    featureLayer.zoom = [5, 20];
    featureLayer.on("click", (event) => {
  
      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
      map.showTooltip2(event.feature,field); 
      ins_botton.onclick=function(){
        //alert(event.feature.properties.company_name);
        $('#table-body').empty()
        $('#container_ins2').empty();
        $('#pagination-wrapper').empty()
        var ins_name_botton=event.feature.properties.instrument_name;
     
        check_company_botton(ins_name_botton);
  
      }
      ins_botton.onmouseover=function(){
        this.style.opacity="0.6";
               
       }
      ins_botton.onmouseout=function(){
        this.style.opacity="1";
               
       }
     // map.showTooltip(event.feature,field);
      // alert(event.feature.properties.point[0]);
      //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
      
    });
  
    featureLayer.on("mouseover", (event) => {
      
        map.redraw();
        map.showTooltip5(event.feature); 
  
       // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
    });
  
    map.setView([112.561841, 37.731984],12);
    map.addLayer(featureLayer);
    cansole.onclick=function(){
      map.clearLayers();
      box.checked=false;
      driving.clear();
      walking.clear();
      transfer.clear();
      riding.clear(); 
      $('#table-body').empty()
      $('#container_ins2').empty();
      $('#pagination-wrapper').empty()
      $('#container_ins3').empty();
      $('#table-body_search').empty();
      $('#pagination-wrapper_search').empty();
  
  
    }     
           
  
  }
       
  
  req.onreadystatechange=function(){  
  
   
      if (this.readyState == 4 && this.status == 200) {
        
       
       console.log(this.responseText);
       var data=JSON.parse(req.responseText).count;
       if(data==0)
        {
          alert("无数据")  
        }
      
    }};   
 
  req.open("GET",url_first,true);
  req.send(null);

}
}

//cause typescript tsc forget js suffix for geometry.js