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
  FieldType,
  Heat,
  LineAnimation,
  RasterLayer,
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
      mapStyle: "amap://styles/da08dd4de41f76d12c6595847d343550",
      features: ['road', 'point', 'bg'],
      viewMode: '2D'
  });
   
   

 
  
  const map = new Map("foo");
  map.on("extent", (event) => {
      amap.setZoomAndCenter(event.zoom, event.center,true);
  });
  map.setView([112.561841, 37.731984],12);

  var box=document.getElementById("search3");
  var box1=document.getElementById("search4");
  //页面开始显示数据信息
  const req = new XMLHttpRequest();
  const url='http://119.29.130.157:8000/programe/';
  req.onload = (event) => {
    const featureClass = new FeatureClass();
          featureClass.loadGeoJSON(JSON.parse(req.responseText));
          const featureLayer = new FeatureLayer();
          featureLayer.featureClass = featureClass;
          const label = new Label();        //生成一个lable
          const symbol = new SimpleTextSymbol();//生成一个symbol
          symbol.pointSymbolWidth=23;
          symbol.pointSymbolHeight=23;
          symbol.auto=true;
          const field = new Field();
          field.name = "pro_name";
          field.pro_people='pro_people';
          field.pro_position='pro_position';
          field.pro_unit='pro_unit';
          field.pro_corcomp='pro_corcomp';
          field.pro_technology='pro_technology';
          field.pro_introduction='pro_introduction';
          field.pro_compeople='pro_compeople';
          field.pro_phone='pro_phone';
          field.pro_year='pro_year';
          field.pro_prisectorsector='pro_prisectorsector';
          field.pro_auxsectorsector='pro_auxsectorsector';
          field.pro_remark='pro_remark';
          
          field.type = FieldType.String;
          label.field = field; //label.field
          label.symbol = symbol;
         
          const renderer = new CategoryRenderer();
          renderer.number=3;
          renderer.generate(featureClass, field);
          featureLayer.renderer = renderer;
          featureLayer.label = label; // 把label给featurelayer
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
    //缩放等级
    featureLayer.zoom = [5, 20];
    featureLayer.on("click", (event) => {
      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],18);
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
      map.clearAnimations();
          };    
  }
  req.onreadystatechange=function(){    //返回数据
      if (this.readyState == 4 && this.status == 200) {
        
       
       console.log(this.responseText);
      

      
    }};  
  req//.open("GET", "assets/geojson/projection.json", true);
  req.open("GET",url,true);
  req.send(null);
 
  
//飞行图
 search4.onclick=function(){
    if (box1.checked==true){
      map.clearLayers();
      const req = new XMLHttpRequest();
      req.onload = (event) => {
        //项目信息
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
        field.name ="pro_name";
        field.pro_people='pro_people';
        field.pro_position='pro_position';
        field.pro_unit='pro_unit';
        field.pro_corcomp='pro_corcomp';
        field.pro_technology='pro_technology';
        field.pro_introduction='pro_introduction';
        field.pro_compeople='pro_compeople';
        field.pro_phone='pro_phone';
        field.pro_year='pro_year';
        field.pro_prisectorsector='pro_prisectorsector';
        field.pro_auxsectorsector='pro_auxsectorsector';
        field.pro_remark='pro_remark';    
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
        featureLayer.on("click", (event) => {
          map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],20);
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
       

        //企业信息
        const featureClass1 = new FeatureClass();
        featureClass1.loadGeoJSON1(JSON.parse(req.responseText));
        const featureLayer1 = new FeatureLayer();
        featureLayer1.featureClass = featureClass1;
        const label1 = new Label();        //生成一个lable
        const symbol1 = new SimpleTextSymbol();//生成一个symbol
        symbol1.pointSymbolWidth=21;
        symbol1.pointSymbolHeight=21;
        symbol1.auto=true;
        const field1 = new Field();
        field1.name = "company_name";
        field1.company_introduction='company_introduction';
        field1.company_prisector='company_prisector';
        field1.company_auxsector='company_auxsector';
        field1.company_fourthsector='company_fourthsector';
        field1.company_categary='company_categary';
        field1.company_auth='company_auth';

        field1.company_time='company_time';
        field1.company_address='company_address';
        field1.company_item='company_item';
        field1.company_year='company_year';
        field1.company_remark='company_remark'; 
        field1.type = FieldType.String;
        label1.field = field1; //label.field
        label1.symbol = symbol1;
        const renderer1 = new CategoryRenderer();
        renderer1.number=0;
        renderer1.generate(featureClass1, field1);
        featureLayer1.rasterLayer;
        featureLayer1.renderer = renderer1;
        featureLayer1.label = label1; // 把label给featurelayer
        featureLayer1.labeled=true;
        
        featureLayer1.on("click", (event) => {
          map.setView([event.feature.properties.point1[0],event.feature.properties.point1[1]],20);
          map.showTooltip(event.feature,field1); 
         // map.showTooltip(event.feature,field);
          // alert(event.feature.properties.point[0]);
          //alert("公司名字:"+event.feature.properties["name"]+'\n'+"Introduction:"+event.feature.properties["introduction"]+'\n'+"Company_categary:"+event.feature.properties["company_categary"]+'\n'+"Auth:"+event.feature.properties["auth"]+'\n'+"Zhuce_time:"+event.feature.properties["zhuce_time"]+'\n'+"Address:"+event.feature.properties["adress"]+'\n'+"Categary:"+event.feature.properties["categary"]+'\n'+"Year:"+event.feature.properties["year"]);
          
        });
        let highlight1 = new SimplePointSymbol();
        highlight1.fillStyle = "#00ffff";
        let old1;
        featureLayer1.on("mouseover", (event) => {
            old1 = event.feature.symbol;
            event.feature.symbol = highlight1;
            map.redraw();
            map.showTooltip5(event.feature); 
    
           // alert("公司名字:"+event.feature.properties["NAME"]+'\n'+"法人:"+event.feature.properties["LEGAL"]+"\n"+"创建日期:"+event.feature.properties["Registration_time"]+"\n"+"企业类型:"+event.feature.properties["CATEGORY"])
        });

        JSON.parse(req.responseText).features.map(item=> { 
        
          const polyline = new Polyline([item.point,item.point1]);
          const animation = new LineAnimation(polyline);
          map.addAnimation(animation);
       /* const polyline1 = new Polyline([item.point,[112.593756,37.805857]]);
        const animation1 = new LineAnimation(polyline1);
        map.addAnimation(animation1);*/
        });

        search3.onclick=function(){
          if (box.checked==true){
             
            featureLayer.labeled=false;
            featureLayer1.labeled=false;
            map.addLayer(featureLayer);
            map.addLayer(featureLayer1);
            
          }
          else{
            
            featureLayer.labeled=true;
            featureLayer1.labeled=true;
            map.addLayer(featureLayer);
            map.addLayer(featureLayer1);
          }
        } 
        map.addLayer(featureLayer);
        map.addLayer(featureLayer1);
    
      
      }
      req.onreadystatechange=function(){    //返回数据
        if (this.readyState == 4 && this.status == 200) {
          
         
         console.log(this.responseText);
        
  
        
      }};  
     req.open("GET", "assets/geojson/projection.json", true);
    //req.open("GET",url,true);
     req.send(null);
      
    }
    else{
      
     map.clearAnimations();
     map.clearLayers();
     
    }
   };
 
  
  //页面搜索数据信息
  //var search=document.getElementById("search");
  var myinput=document.getElementById("myinput");
 // var cansole=document.getElementById("cansole");
  search.onclick=function(){
    map.clearLayers();
    map.clearAnimations();
    const req = new XMLHttpRequest();
    const url5='http://119.29.130.157:8000/ProMultisearch/?pro_'+document.getElementById("1").value;
    const url=url5+myinput.value;
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
      field.name = "pro_name";
      field.pro_people='pro_people';
      field.pro_position='pro_position';
      field.pro_unit='pro_unit';
      field.pro_corcomp='pro_corcomp';
      field.pro_technology='pro_technology';
      field.pro_introduction='pro_introduction';
      field.pro_compeople='pro_compeople';
      field.pro_phone='pro_phone';
      field.pro_year='pro_year';
      field.pro_prisectorsector='pro_prisectorsector';
      field.pro_auxsectorsector='pro_auxsectorsector';
      field.pro_remark='pro_remark';
      field.type = FieldType.String;
      label.field = field; //label.field
      label.symbol = symbol;
      const renderer = new CategoryRenderer();
      renderer.number=3;
      renderer.generate(featureClass, field);
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
      };
     
      featureLayer.zoom = [5, 20];
      featureLayer.on("click", (event) => {
        
        map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],18);
        map.showTooltip3(event.feature,field); 
   
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
     
     
      map.setView([JSON.parse(req.responseText).features[0].point[0],JSON.parse(req.responseText).features[0].point[1]],13);   
      //map.setView([112.561841, 37.731984],12);
      map.addLayer(featureLayer);
      cansole.onclick=function(){
        map.clearLayers();

      };
      
    }
    req.onreadystatechange=function(){    //返回数据
      if (this.readyState == 4 && this.status == 200) {
      
     
       console.log(this.responseText);
    
    }};   

    req.open("GET",url,true);
    req.send();
   
  
      
  }
 

 //点击显示下一页
 var number=1;
 search1.onclick=function(){
  number++;
  //限制num最大值为3
  if(number>=3)
  {
    number=2;
  }
  const req = new XMLHttpRequest();
  const url='http://119.29.130.157:8000/programe/?page='+number;
  map.clearLayers();
  map.clearAnimations();
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

    field.name = "pro_name";
    field.pro_people='pro_people';
    field.pro_position='pro_position';
    field.pro_unit='pro_unit';
    field.pro_corcomp='pro_corcomp';
    field.pro_technology='pro_technology';
    field.pro_introduction='pro_introduction';
    field.pro_compeople='pro_compeople';
    field.pro_phone='pro_phone';
    field.pro_year='pro_year';
    field.pro_prisectorsector='pro_prisectorsector';
    field.pro_auxsectorsector='pro_auxsectorsector';
    field.pro_remark='pro_remark';
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

      map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],18);
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
  req.open("GET",url,true);
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
  map.clearLayers();
  map.clearAnimations();
  const req = new XMLHttpRequest();
  const url='http://119.29.130.157:8000/programe/?page='+number;
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

  field.name = "pro_name";
  field.pro_people='pro_people';
  field.pro_position='pro_position';
  field.pro_unit='pro_unit';
  field.pro_corcomp='pro_corcomp';
  field.pro_technology='pro_technology';
  field.pro_introduction='pro_introduction';
  field.pro_compeople='pro_compeople';
  field.pro_phone='pro_phone';
  field.pro_year='pro_year';
  field.pro_prisectorsector='pro_prisectorsector';
  field.pro_auxsectorsector='pro_auxsectorsector';
  field.pro_remark='pro_remark';

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

    map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],18);
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
  //飞行图按钮
 
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
req.open("GET",url,true);
req.send(null);
}


 //信息选择页面
     //教授信息
     var box2=document.getElementById("search5");
     search5.onclick=function(){
     
      if (box2.checked==true){
        const url='http://119.29.130.157:8000/ProMultisearch/?pro_position=教授';
        map.clearLayers();
        map.clearAnimations();
        const req = new XMLHttpRequest();
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
          field.name = "pro_name";
          field.pro_people='pro_people';
          field.pro_position='pro_position';
          field.pro_unit='pro_unit';
          field.pro_corcomp='pro_corcomp';
          field.pro_technology='pro_technology';
          field.pro_introduction='pro_introduction';
          field.pro_compeople='pro_compeople';
          field.pro_phone='pro_phone';
          field.pro_year='pro_year';
          field.pro_prisectorsector='pro_prisectorsector';
          field.pro_auxsectorsector='pro_auxsectorsector';
          field.pro_remark='pro_remark';
          field.type = FieldType.String;
          label.field = field; //label.field
          label.symbol = symbol;
          const renderer = new CategoryRenderer();
          renderer.number=3;
          renderer.generate(featureClass, field);
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
          };
         
          featureLayer.zoom = [5, 20];
          featureLayer.on("click", (event) => {
            
            map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],18);
            map.showTooltip3(event.feature,field); 
       
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
          //飞行图按钮
         
          map.setView([JSON.parse(req.responseText).features[0].point[0],JSON.parse(req.responseText).features[0].point[1]],13);   
          //map.setView([112.561841, 37.731984],12);
          map.addLayer(featureLayer);
          cansole.onclick=function(){
            map.clearLayers();
    
          };
          
        }
        req.onreadystatechange=function(){    //返回数据
          if (this.readyState == 4 && this.status == 200) {
          
         
           console.log(this.responseText);
        
        }};   
    
        req.open("GET",url,true);
        req.send();
     
        
      }
      else{
        map.clearLayers();
      }

    };
     
   

 
       
   //副教授信息
   var box3=document.getElementById("search6");
   search6.onclick=function(){
    if (box3.checked==true){
      const url='http://119.29.130.157:8000/ProMultisearch/?pro_position=副教授';
      map.clearLayers();
      map.clearAnimations();
      const req = new XMLHttpRequest();
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
        field.name = "pro_name";
        field.pro_people='pro_people';
        field.pro_position='pro_position';
        field.pro_unit='pro_unit';
        field.pro_corcomp='pro_corcomp';
        field.pro_technology='pro_technology';
        field.pro_introduction='pro_introduction';
        field.pro_compeople='pro_compeople';
        field.pro_phone='pro_phone';
        field.pro_year='pro_year';
        field.pro_prisectorsector='pro_prisectorsector';
        field.pro_auxsectorsector='pro_auxsectorsector';
        field.pro_remark='pro_remark';
        field.type = FieldType.String;
        label.field = field; //label.field
        label.symbol = symbol;
        const renderer = new CategoryRenderer();
        renderer.number=3;
        renderer.generate(featureClass, field);
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
        };
       
        featureLayer.zoom = [5, 20];
        featureLayer.on("click", (event) => {
          
          map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],18);
          map.showTooltip3(event.feature,field); 
     
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
        //飞行图按钮
       
        map.setView([JSON.parse(req.responseText).features[0].point[0],JSON.parse(req.responseText).features[0].point[1]],13);   
        //map.setView([112.561841, 37.731984],12);
        map.addLayer(featureLayer);
        cansole.onclick=function(){
          map.clearLayers();
  
        };
        
      }
      req.onreadystatechange=function(){    //返回数据
        if (this.readyState == 4 && this.status == 200) {
        
       
         console.log(this.responseText);
      
      }};   
  
      req.open("GET",url,true);
      req.send();
   
      
    }
    else{
      map.clearLayers();
    }

  };
    

   //讲师信息
     var box4=document.getElementById("search7");
     search7.onclick=function(){
      if (box4.checked==true){
        const url='http://119.29.130.157:8000/ProMultisearch/?pro_position=讲师';
        map.clearLayers();
        map.clearAnimations();
        const req = new XMLHttpRequest();
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
          field.name = "pro_name";
          field.pro_people='pro_people';
          field.pro_position='pro_position';
          field.pro_unit='pro_unit';
          field.pro_corcomp='pro_corcomp';
          field.pro_technology='pro_technology';
          field.pro_introduction='pro_introduction';
          field.pro_compeople='pro_compeople';
          field.pro_phone='pro_phone';
          field.pro_year='pro_year';
          field.pro_prisectorsector='pro_prisectorsector';
          field.pro_auxsectorsector='pro_auxsectorsector';
          field.pro_remark='pro_remark';
          field.type = FieldType.String;
          label.field = field; //label.field
          label.symbol = symbol;
          const renderer = new CategoryRenderer();
          renderer.number=3;
          renderer.generate(featureClass, field);
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
          };
         
          featureLayer.zoom = [5, 20];
          featureLayer.on("click", (event) => {
            
            map.setView([event.feature.properties.point[0],event.feature.properties.point[1]],18);
            map.showTooltip3(event.feature,field); 
       
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
          //飞行图按钮
         
          map.setView([JSON.parse(req.responseText).features[0].point[0],JSON.parse(req.responseText).features[0].point[1]],13);   
          //map.setView([112.561841, 37.731984],12);
          map.addLayer(featureLayer);
          cansole.onclick=function(){
            map.clearLayers();
    
          };
          
        }
        req.onreadystatechange=function(){    //返回数据
          if (this.readyState == 4 && this.status == 200) {
          
         
           console.log(this.responseText);
        
        }};   
    
        req.open("GET",url,true);
        req.send();
     
        
      }
      else{
         map.clearLayers();
      }

    };
    


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