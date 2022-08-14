import {SimpleFillSymbol,LetterSymbol,SimpleMarkerSymbol, SimpleLineSymbol, SimplePointSymbol, Symbol} from "../symbol/symbol";
import {Field} from "../data/field";
import {FeatureClass} from "../data/feature-class";
import {GeometryType} from "../geometry/geometry";
import {Color} from "../util/color";

/**
 * 分级渲染项
 * @remarks
 * 分级区间一般为( ]: 即下开上闭
 */
export class ClassRendererItem {
    /**
     * 分级的级别下限
     */
    low: number;
    /**
     * 分级的级别上限
     */
    high: number;
    /**
     * 分级渲染符号
     */
    symbol: Symbol;
    /**
     * 分级标题（常用于图例中）
     */
    label: string;
}

/**
 * 分级渲染
 * @remarks
 * 一般可通过设置分级字段，再调用generate自动生成分级渲染项
 * 也可通过手动添加和定义分级渲染项，完成分级渲染设置，通过items.push()
 */
export class ClassRenderer {
    /**
     * 分级字段
     * @remarks
     * 必须为数值型
     */
    private _field: Field;
    /**
     * 所有分级渲染项集合
     */
    private _items: ClassRendererItem[] = [];
    /**
     * 分级字段
     * @remarks
     * 必须为数值型
     */
    get field(): Field {
        return this._field;
    }
    /**
     * 所有分级渲染项集合
     */
    get items(): ClassRendererItem[] {
        return this._items;
    }

    /**
     * 自动生成分级渲染项
     * @remarks
     * TODO: 分级有多种方式，目前只实现均分
     */
    generate(featureClass: FeatureClass, field: Field, breaks: number) {
        this._field = field;
        this._items = [];
        //获取该字段极值
        const stat = featureClass.features.map(feature => feature.properties[field.name]).reduce((stat, cur) => {
            stat.max = Math.max(cur, stat.max);
            stat.min = Math.min(cur, stat.max);
            return stat;
        },{min: 0, max: 0});
        for(let i = 0; i < breaks; i++ ) {
            const item = new ClassRendererItem();
            switch (featureClass.type) {
                case GeometryType.Point:

                  /*  const marker : SimpleMarkerSymbol = new SimpleMarkerSymbol();//将点渲染成图片
                    marker.width = 32;
                    marker.height = 32;
                    marker.offsetX = -17;  //16 
                    marker.offsetY = -15;  //32
                    marker.url = "assets/img/marker3.svg";*/

                   /* const symbol1 : LetterSymbol = new LetterSymbol(); //点的渲染
                    symbol1.strokeStyle = "#ffffff";
                    symbol1.fillStyle = "#ff0000";
                    symbol1.fontColor = "#ffffff";
                    symbol1.fontSize = 12;
                    symbol1.radius = 10;
                    symbol1.letter = "A";*/

                    const symbol1: SimplePointSymbol = new SimplePointSymbol();
                    symbol1.fillStyle = Color.random().toString();
                    symbol1.strokeStyle = Color.random().toString();

                    item.symbol = symbol1;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i+1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
                case GeometryType.Polyline:
                    const symbol2: SimpleLineSymbol = new SimpleLineSymbol();
                    symbol2.strokeStyle = Color.random().toString();
                    item.symbol = symbol2;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i+1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
                case GeometryType.Polygon:
                    const symbol3: SimpleFillSymbol = new SimpleFillSymbol();
                    symbol3.fillStyle = Color.random().toString();
                    symbol3.strokeStyle = Color.random().toString();
                    item.symbol = symbol3;
                    item.low = stat.min + i * (stat.max - stat.min) / breaks;
                    item.high = stat.min + (i+1) * (stat.max - stat.min) / breaks;
                    item.label = item.low + " - " + item.high;
                    this._items.push(item);
                    break;
            }
        }
    }
}