import { Bound } from "../util/bound";
import { LatLngType, Projection } from "./projection";
import { GCJ02 } from "./gcj02";
/**
 * 带百度09偏移的球体墨卡托投影
 * @remarks https://github.com/wandergis/coordtransform
 * just for china
 * 依赖Baidu Map API
 */
export class BD09 extends Projection {
    /**
     * 创建带国测局02偏移的球体墨卡托投影
     * @remarks 参考经纬度坐标类型，不同类型走不同数据处理流程
     * @param {LatLngType} type - 经纬度坐标类型
     */
    constructor(type = LatLngType.GPS) {
        super();
        this._type = type;
    }
    /**
     * 投影后的平面坐标范围
     */
    get bound() {
        return new Bound(-BD09.TOTAL_PIXELS / 2, BD09.TOTAL_PIXELS / 2, BD09.TOTAL_PIXELS / 2, -BD09.TOTAL_PIXELS / 2);
    }
    /**
     * 经纬度转平面坐标
     * @remarks 地理平面坐标 单位米
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     * @return {number[]} 地理平面坐标
     */
    project([lng, lat]) {
        //from leaflet & wiki
        if (this._type == LatLngType.GPS) {
            [lng, lat] = GCJ02.wgs84togcj02(lng, lat);
            [lng, lat] = BD09.gcj02tobd09(lng, lat);
        }
        else if (this._type == LatLngType.GCJ02) {
            [lng, lat] = BD09.gcj02tobd09(lng, lat);
        }
        const projection = new BMap.MercatorProjection();
        const pixel = projection.lngLatToPoint(new BMap.Point(lng, lat));
        return [pixel.x, pixel.y];
        /*const d = Math.PI / 180, sin = Math.sin(lat * d);
        return [WebMercator.R * lng * d,  WebMercator.R * Math.log((1 + sin) / (1 - sin)) / 2];*/
    }
    /**
     * 平面坐标转经纬度
     * @remarks 地理平面坐标 单位米
     * @param {number} x - 地理平面坐标x
     * @param {number} y - 地理平面坐标y
     * @return {number[]} 经纬度
     */
    unproject([x, y], original = false) {
        const projection = new BMap.MercatorProjection();
        const point = projection.pointToLngLat(new BMap.Pixel(x, y));
        let [lng, lat] = [point.lng, point.lat];
        if (original) {
            if (this._type == LatLngType.GPS) {
                [lng, lat] = BD09.bd09togcj02(lng, lat);
                [lng, lat] = GCJ02.gcj02towgs84(lng, lat);
            }
            else if (this._type == LatLngType.GCJ02) {
                [lng, lat] = BD09.bd09togcj02(lng, lat);
            }
        }
        return [lng, lat];
    }
    /**
     * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02) 的转换
     * @remarks
     * from https://github.com/wandergis/coordtransform
     * 即 百度 转 谷歌、高德
     * @param bd_lng
     * @param bd_lat
     * @returns {*[]}
     */
    static bd09togcj02(bd_lng, bd_lat) {
        var x = bd_lng - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * Math.PI * 3000.0 / 180.0);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * Math.PI * 3000.0 / 180.0);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return [gg_lng, gg_lat];
    }
    ;
    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * @remarks
     * from https://github.com/wandergis/coordtransform
     * 即 谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    static gcj02tobd09(lng, lat) {
        var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * Math.PI * 3000.0 / 180.0);
        var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * Math.PI * 3000.0 / 180.0);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat];
    }
    ;
}
/**
 * 百度平面坐标系的坐标原点与百度瓦片坐标原点相同，以瓦片等级18级为基准，规定18级时百度平面坐标的一个单位等于屏幕上的一个像素
 */
BD09.TOTAL_PIXELS = 256 * Math.pow(2, 18);
