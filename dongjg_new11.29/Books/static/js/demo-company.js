//import { formatDiagnostic } from "typescript";
import {
    Map,
    Point,
    Tooltip,
    Tooltip1,
    Polyline,
    SimpleFillSymbol,
    FeatureClass,
    FeatureLayer,
    SimpleRenderer,
    CategoryRenderer,
    CategoryRendererItem,
    Field,
    Heat,
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
        mapStyle: 'amap://styles/5e112a56615d970c3a2c3cc8a2550c46', //更换地图样式
      
        features: ['road', 'point', 'bg'],
        viewMode: '2D'
    });
     
    //加载高德影像
    //const satellite = new AMap.TileLayer.Satellite();
    //satellite.setMap(amap);

    
    const map = new Map("foo");
    map.on("extent", (event) => {
        amap.setZoomAndCenter(event.zoom, event.center,true);
    });
    map.setView([112.561841, 37.731984],12);
    
    var box=document.getElementById("search3");
    //页面开始显示数据信息
    const req1 = new XMLHttpRequest();
    const url1="http://119.29.130.157:8000/company/";
    //const url1="http://127.0.0.1:8000/programe/";
    req1.onload = (event) => {
      const featureClass = new FeatureClass();
      featureClass.loadGeoJSON(JSON.parse(req1.responseText));
      const featureLayer = new FeatureLayer();
      featureLayer.featureClass = featureClass;
      const label = new Label();        //生成一个lable
      const symbol = new SimpleTextSymbol();//生成一个symbol
      symbol.pointSymbolWidth=21;
      symbol.pointSymbolHeight=21;
      symbol.auto=true;
      const field = new Field();

     // 信息内容
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


      field.type = FieldType.String;
      label.field = field; //label.field
      label.symbol = symbol;
      const renderer = new CategoryRenderer();
      renderer.number=0;
      renderer.generate(featureClass, field);
   
     
     /* const symbol1 = new LetterSymbol(); //点的渲染
      symbol1.strokeStyle = "#ffffff";
      symbol1.fillStyle = "#ff0000";
      symbol1.fontColor = "#ffffff";
      symbol1.fontSize = 12;
      symbol1.radius = 10;
      symbol1.letter = "A";
      const graphic = new Graphic(featureClass, symbol1);
      featureLayer.graphic =graphic;*/
      
      featureLayer.renderer = renderer;
      featureLayer.label = label; // 把label给featurelayer
      featureLayer.labeled = true; 
   
      search3.onclick=function(){
       if (box.checked==true){
          
         featureLayer.labeled=false;
         map.addLayer(featureLayer);
         
       }
       else{
         
         featureLayer.labeled=true;
         map.addLayer(featureLayer);
       }
     }///////
      featureLayer.zoom = [5, 20];
      //显示详细信息
      featureLayer.on("click", (event) => {

        map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
        map.showTooltip(event.feature,field); 
       // map.showTooltip(event.feature,field);
        // alert(event.feature.properties.point[0]);
        //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
        
      });
      let highlight = new SimplePointSymbol();
      highlight.fillStyle = "#00ffff";
      let old;
      featureLayer.on("mouseover", (event) => {
          old = event.feature.symbol;
          event.feature.symbol = highlight;
          map.redraw();
          map.showTooltip5(event.feature); 

         // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
      });
      featureLayer.on("mouseout", (event) => {
          event.feature.symbol = old;
          map.redraw(); 
           
      });
      map.setView([112.561841, 37.731984],12);
      map.addLayer(featureLayer);
      cansole.onclick=function(){
          map.clearLayers();
    
      }      
             

    }
    req1.onreadystatechange=function(){    //返回数据
        if (this.readyState == 4 && this.status == 200) {
          
         
         console.log(this.responseText);
        
      }};   
     //req.open("GET", "assets/geojson/xiaodian.json", true);
   // req1.open("GET","assets/geojson/company.json",true);
    req1.open("GET",url1,true);
    req1.send(null);
      
    

    
    //页面搜索数据信息
   // var search=document.getElementById("search");
    var myinput=document.getElementById("myinput");
    search.onclick=function(){
      const req = new XMLHttpRequest();
     
      const url5='http://119.29.130.157:8000/ComMultisearch/?company_'+document.getElementById("1").value;
      const url1=url5+myinput.value;
      req.onload = (event) => {
        const featureClass = new FeatureClass();
        featureClass.loadGeoJSON(JSON.parse(req.responseText));
        const featureLayer = new FeatureLayer();
        featureLayer.featureClass = featureClass;
        const label = new Label();        //生成一个lable
        const symbol = new SimpleTextSymbol();//生成一个symbol
        symbol.pointSymbolWidth=21;
        symbol.pointSymbolHeight=21;
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
        field.type = FieldType.String;
        label.field = field; //label.field
        label.symbol = symbol;
        const renderer = new CategoryRenderer();
        renderer.number=0;
        renderer.generate(featureClass, field);
     
       
       /* const symbol1 = new LetterSymbol(); //点的渲染
        symbol1.strokeStyle = "#ffffff";
        symbol1.fillStyle = "#ff0000";
        symbol1.fontColor = "#ffffff";
        symbol1.fontSize = 12;
        symbol1.radius = 10;
        symbol1.letter = "A";
        const graphic = new Graphic(featureClass, symbol1);
        featureLayer.graphic =graphic;*/
   
        featureLayer.renderer = renderer;
        featureLayer.label = label; // 把label给featurelayer
        featureLayer.labeled = true;
        
        search3.onclick=function(){
         if (box.checked==true){
            
           featureLayer.labeled=false;
           map.addLayer(featureLayer);
           
         }
         else{
           
           featureLayer.labeled=true;
           map.addLayer(featureLayer);
         }
       } ///////
        featureLayer.zoom = [5, 20];
        featureLayer.on("click", (event) => {

          map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
          map.showTooltip(event.feature,field); 
         
         // map.showTooltip(event.feature,field);
          // alert(event.feature.properties.point[0]);
          //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
          
        });
        let highlight = new SimplePointSymbol();
        highlight.fillStyle = "#00ffff";
        let old;
        featureLayer.on("mouseover", (event) => {
            old = event.feature.symbol;
            event.feature.symbol = highlight;
            map.redraw();
            map.showTooltip5(event.feature); 
          

           // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
        });
        featureLayer.on("mouseout", (event) => {
            event.feature.symbol = old;
            map.redraw(); 
             
        });
       //map.setTileUrl("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png");
       // map.setTileUrl("http://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7");
        map.setView([112.561841, 37.731984],12);
        map.addLayer(featureLayer);
        cansole.onclick=function(){
            map.clearLayers();
      
        }      
               
 
      }
           
    
      req.onreadystatechange=function(){    //返回数据
          if (this.readyState == 4 && this.status == 200) {
            
           
           console.log(this.responseText);
          
        }};   
       //req.open("GET", "assets/geojson/xiaodian.json", true);
      req.open("GET",url1,true);
      req.send(null);
        
    }
   // req.open("GET", "assets/geojson/date.json", true);
   // req.send(null);
 
   /*search1.onclick=function(){
    const req = new XMLHttpRequest();
    const url2="http://127.0.0.1:8000/snippets/";
    req.onload = (event) => {
    const featureClass = new FeatureClass();
    featureClass.loadGeoJSON(JSON.parse(req.responseText));
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const field = new Field();
    field.name = "name";
    const heat=new Heat();
    heat.honey=true;
    heat.honeySide=6;
    heat.generate(featureClass,field);
    const rasterLayer = new RasterLayer();
    rasterLayer.raster = heat;
    map.addLayer(rasterLayer);
  } 
  req.onreadystatechange=function(){    //返回数据
    if (this.readyState == 4 && this.status == 200) {
    
   
     console.log(this.responseText);
  
  }};   

  req.open("GET",url2,true);
  req.send();
 }
    */
  //点击下一页
   var number=1;
   search1.onclick=function(){
    number++;
    //限制num最大值为3
    if(number>=310)
    {
      number=309;
    }
    const req = new XMLHttpRequest();
    const url2='http://119.29.130.157:8000/company/?page='+number;
    req.onload = (event) => {
      const featureClass = new FeatureClass();
      featureClass.loadGeoJSON(JSON.parse(req.responseText));
      const featureLayer = new FeatureLayer();
      featureLayer.featureClass = featureClass;
      const label = new Label();        //生成一个lable
      const symbol = new SimpleTextSymbol();//生成一个symbol
      symbol.pointSymbolWidth=21;
      symbol.pointSymbolHeight=21;
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
      field.type = FieldType.String;
      label.field = field; //label.field
      label.symbol = symbol;
      const renderer = new CategoryRenderer();
      renderer.number=3;
      renderer.generate(featureClass, field);
      featureLayer.rasterLayer;
      featureLayer.renderer = renderer;
      featureLayer.label = label; // 把label给featurelayer
       //label的显示与取消
      featureLayer.labeled=true;
      
      search3.onclick=function(){
        if (box.checked==true){
           
          featureLayer.labeled=false;
          map.addLayer(featureLayer);
          
        }
        else{
          
          featureLayer.labeled=true;
          map.addLayer(featureLayer);
        }
      }
      featureLayer.zoom = [5, 20];
      featureLayer.on("click", (event) => {
  
        map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
        map.showTooltip3(event.feature,field); 
       // map.showTooltip(event.feature,field);
        // alert(event.feature.properties.point[0]);
        //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
        
      });
      let highlight = new SimplePointSymbol();
      highlight.fillStyle = "#00ffff";
      let old;
      featureLayer.on("mouseover", (event) => {
          old = event.feature.symbol;
          event.feature.symbol = highlight;
          map.redraw();
          map.showTooltip5(event.feature); 
  
         // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
      });
      featureLayer.on("mouseout", (event) => {
          event.feature.symbol = old;
          map.redraw(); 
           
      });
      map.setView([112.561841, 37.731984],12);
      map.addLayer(featureLayer);
      cansole.onclick=function(){
        map.clearLayers();
    
            };  
         
        
  
    }
    req.onreadystatechange=function(){    //返回数据
        if (this.readyState == 4 && this.status == 200) {
          
         
         console.log(this.responseText);
        
        
      }};  
    //req.open("GET", "lesson/text/company/demo/assets/geojson/projection.json", true);
    req.open("GET",url2,true);
    req.send(null);
   
   
    
  
  }
  //点击显示上一页
  search2.onclick=function(){
    number--;
    //限制num最小值为0
    if(number<=0)
    {
      number=1;
    }
    const req = new XMLHttpRequest();
    const url2='http://119.29.130.157:8000/company/?page='+number;
    req.onload = (event) => {
    const featureClass = new FeatureClass();
    featureClass.loadGeoJSON(JSON.parse(req.responseText));
    const featureLayer = new FeatureLayer();
    featureLayer.featureClass = featureClass;
    const label = new Label();        //生成一个lable
    const symbol = new SimpleTextSymbol();//生成一个symbol
    symbol.pointSymbolWidth=21;
    symbol.pointSymbolHeight=21;
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
  
    field.type = FieldType.String;
    label.field = field; //label.field
    label.symbol = symbol;
    const renderer = new CategoryRenderer();
    renderer.number=3;
    renderer.generate(featureClass, field);
    featureLayer.rasterLayer;
    featureLayer.renderer = renderer;
    featureLayer.label = label; // 把label给featurelayer
    featureLayer.labeled=true;
    //label的显示与取消
    search3.onclick=function(){
        if (box.checked==true){
           
          featureLayer.labeled=false;
          map.addLayer(featureLayer);
          
        }
        else{
          
          featureLayer.labeled=true;
          map.addLayer(featureLayer);
        }
      }
      
    featureLayer.zoom = [5, 20];
    featureLayer.on("click", (event) => {
  
      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],15);
      map.showTooltip3(event.feature,field); 
     // map.showTooltip(event.feature,field);
      // alert(event.feature.properties.point[0]);
      //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
      
    });
    let highlight = new SimplePointSymbol();
    highlight.fillStyle = "#00ffff";
    let old;
    featureLayer.on("mouseover", (event) => {
        old = event.feature.symbol;
        event.feature.symbol = highlight;
        map.redraw();
        map.showTooltip5(event.feature); 
  
       // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
    });
    featureLayer.on("mouseout", (event) => {
        event.feature.symbol = old;
        map.redraw(); 
         
    });
    map.setView([112.561841, 37.731984],12);
    map.addLayer(featureLayer);
    cansole.onclick=function(){
      map.clearLayers();
  
          };  
       
      
  
  }
  req.onreadystatechange=function(){    //返回数据
      if (this.readyState == 4 && this.status == 200) {
        
       
       console.log(this.responseText);
      
      
    }};  
  //req.open("GET", "lesson/text/company/demo/assets/geojson/projection.json", true);
  req.open("GET",url2,true);
  req.send(null);
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


}

//cause typescript tsc forget js suffix for geometry.js