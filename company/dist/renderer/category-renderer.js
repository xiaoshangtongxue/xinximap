import { SimpleFillSymbol, LetterSymbol, SimpleLineSymbol } from "../symbol/symbol";
import { GeometryType } from "../geometry/geometry";
import { Color } from "../util/color";
/**
 * 分类渲染项
 */
export class CategoryRendererItem {
    constructor() {
        /**
         * 该类总数
         */
        this.count = 1;
    }
}
/**
 * 分类渲染
 * @remarks
 * 一般可通过设置分类字段，再调用generate自动生成分类渲染项
 * 也可通过手动添加和定义分类渲染项，完成分类渲染设置，通过items.push()
 */
export class CategoryRenderer {
    constructor() {
        /**
         * 所有分类集合
         */
        this._items = [];
    }
    /**
     * 分类字段
     * @remarks
     * 一般为字符串字段，也可为枚举域值，或是非布尔值
     */
    get field() {
        return this._field;
    }
    /**
     * 所有分类集合
     */
    get items() {
        return this._items;
    }
    /**
     * 根据分类字段，自动生成分类渲染项
     * @param {FeatureClass} featureClass - 要素类（要素集合）
     * @param {Field} field - 分类字段
     */
    generate(featureClass, field) {
        this._field = field;
        this._items = [];
        //分类统计
        featureClass.features.map(feature => feature.properties[field.name]).forEach((value) => {
            const item = this._items.find(item => item.value == value);
            if (item) {
                item.count += 1;
            }
            else {
                const item = new CategoryRendererItem();
                switch (featureClass.type) {
                    case GeometryType.Point:
                        /*const marker : SimpleMarkerSymbol = new SimpleMarkerSymbol();
                        marker.width = 32;
                        marker.height = 32;
                        marker.offsetX = -17;  //16
                        marker.offsetY = -15;  //32
                        marker.url = "assets/img/marker3.svg";*/
                        if (this.number == 0) {
                            const symbol1 = new LetterSymbol(); //点的渲染
                            symbol1.strokeStyle = "#ffffff";
                            if (this.info == 1) {
                                symbol1.fillStyle = "#5ebfe2";
                            }
                            else if (this.info == 2) {
                                symbol1.fillStyle = "rgb(3, 172, 45)";
                            }
                            else if (this.info == 3) {
                                symbol1.fillStyle = "#ff0000";
                            }
                            symbol1.fontColor = "#ffffff";
                            symbol1.fontSize = 12;
                            symbol1.radius = 10;
                            symbol1.letter = "C";
                            /* const symbol1: SimplePointSymbol = new SimplePointSymbol();
                             symbol1.fillStyle = Color.random1().toString();
                             symbol1.strokeStyle = Color.random().toString();*/
                            item.symbol = symbol1;
                            item.value = value;
                            this._items.push(item);
                        }
                        else if (this.number == 1) {
                            const symbol1 = new LetterSymbol(); //点的渲染
                            symbol1.strokeStyle = "#ffffff";
                            symbol1.fillStyle = "#ff0000";
                            symbol1.fontColor = "#ffffff";
                            symbol1.fontSize = 12;
                            symbol1.radius = 10;
                            symbol1.letter = "A";
                            item.symbol = symbol1;
                            item.value = value;
                            this._items.push(item);
                        }
                        else if (this.number == 2) {
                            const symbol1 = new LetterSymbol(); //点的渲染
                            symbol1.strokeStyle = "#ffffff";
                            symbol1.fillStyle = "#ff0000";
                            symbol1.fontColor = "#ffffff";
                            symbol1.fontSize = 12;
                            symbol1.radius = 10;
                            symbol1.letter = "I";
                            item.symbol = symbol1;
                            item.value = value;
                            this._items.push(item);
                        }
                        else if (this.number == 3) {
                            const symbol1 = new LetterSymbol(); //点的渲染
                            symbol1.strokeStyle = "#ffffff";
                            symbol1.fillStyle = "#ff0000";
                            symbol1.fontColor = "#ffffff";
                            symbol1.fontSize = 12;
                            symbol1.radius = 10;
                            symbol1.letter = "P";
                            item.symbol = symbol1;
                            item.value = value;
                            this._items.push(item);
                        }
                        else if (this.number == 4) {
                            const symbol1 = new LetterSymbol(); //点的渲染
                            symbol1.strokeStyle = "#ffffff";
                            symbol1.fillStyle = "#ff0000";
                            symbol1.fontColor = "#ffffff";
                            symbol1.fontSize = 12;
                            symbol1.letter = "T";
                            symbol1.radius = 10;
                            item.symbol = symbol1;
                            item.value = value;
                            this._items.push(item);
                        }
                        break;
                    case GeometryType.Polyline:
                        const symbol2 = new SimpleLineSymbol();
                        symbol2.strokeStyle = Color.random().toString();
                        item.symbol = symbol2;
                        item.value = value;
                        this._items.push(item);
                        break;
                    case GeometryType.Polygon:
                        const symbol3 = new SimpleFillSymbol();
                        symbol3.fillStyle = Color.random2().toString();
                        symbol3.strokeStyle = Color.random2().toString();
                        item.symbol = symbol3;
                        item.value = value;
                        this._items.push(item);
                        break;
                }
            }
        });
    }
}
