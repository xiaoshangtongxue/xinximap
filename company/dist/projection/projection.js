/**
 * 经纬度坐标类型
 * @remarks
 * 本应无此一说，坐标偏移的无奈之举
 */
export var LatLngType;
(function (LatLngType) {
    /**
     * GPS采集的经纬度坐标（Default）
     */
    LatLngType[LatLngType["GPS"] = 1] = "GPS";
    /**
     * GCJ02偏移后的经纬度坐标（Default）
     * Just For China, AMap aka GaoDe
     */
    LatLngType[LatLngType["GCJ02"] = 2] = "GCJ02";
    /**
     * BD09偏移后的经纬度坐标（Default）
     * Just For China, BaiduMap
     */
    LatLngType[LatLngType["BD09"] = 3] = "BD09";
})(LatLngType || (LatLngType = {}));
/**
 * 坐标投影转换
 * @remarks
 * TODO: only support web mecator
 */
export class Projection {
    /**
     * 经纬度转平面坐标
     * @remarks 地理平面坐标 单位米
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     * @return {number[]} 地理平面坐标
     */
    project([lng, lat]) { return []; }
    ;
    /**
     * 平面坐标转经纬度
     * @remarks 地理平面坐标 单位米
     * @param {number} x - 地理平面坐标x
     * @param {number} y - 地理平面坐标y
     * @return {number[]} 经纬度
     */
    unproject([x, y], original = false) { return []; }
    ;
    /**
     * 投影后的平面坐标范围
     */
    get bound() { return null; }
    ;
}
