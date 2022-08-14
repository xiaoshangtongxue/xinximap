import { CoordinateType } from "./geometry/geometry";
import { Bound } from "./util/bound";
import { WebMercator } from "./projection/web-mercator";
import { GraphicLayer } from "./layer/graphic-layer";
import { Graphic } from "./element/graphic";
import { Utility } from "./util/utility";
import { Editor } from "./editor/editor";
import { Viewer } from "./viewer";
import { Subject } from "./util/subject";
import { Tooltip } from "./tooltip/tooltip";
import { Tooltip1 } from "./tooltip/tooltip";
import { Animator } from "./animator";
import { Point } from "./geometry/point";
import { MultiplePoint } from "./geometry/multiple-point";
import { Polyline } from "./geometry/polyline";
import { MultiplePolyline } from "./geometry/multiple-polyline";
import { SimpleFillSymbol, SimpleLineSymbol, SimplePointSymbol } from "./symbol/symbol";
import { MultiplePolygon } from "./geometry/multiple-polygon";
import { Polygon } from "./geometry/polygon";
import { Tile } from "./tile";
import { Grid } from "./grid";
import { Measurer } from "./measurer";
/**
 * 地图
 * 容器: 1 viewer 1 editor 1 animator 1 tooltip
 */
export class Map extends Subject {
    /**
     * 创建地图
     * @param {string | HTMLDivElement} id - HTMLDivElement | id
     * @param {Object} option - 选项配置
     */
    constructor(id, option) {
        //extent: 视图范围更新时
        //click:  单击地图时
        //dblclick: 双击地图时
        //mousemove: 鼠标移动时
        //resize: 视图容器尺寸调整时
        super(["extent", "click", "dblclick", "mousemove", "resize"]);
        this._option = {
            disableDoubleClick: false,
            disableInteractive: false
        };
        this._drag = {
            flag: false,
            start: {
                x: 0,
                y: 0
            },
            end: {
                x: 0,
                y: 0
            }
        };
        this._touch = {
            zooming: false,
            dragging: false,
            finger_dist: 0
        };
        //地图缩放等级
        this._zoom = 1;
        this.minZoom = 3;
        this.maxZoom = 20;
        //地图视图中心
        this._center = [0, 0];
        //默认图形图层
        this._defaultGraphicLayer = new GraphicLayer();
        //选择图层
        this._selectionLayer = new GraphicLayer();
        //option
        this._option.disableDoubleClick = option && option.hasOwnProperty('disableDoubleClick') ? option.disableDoubleClick : false;
        this._option.disableInteractive = option && option.hasOwnProperty('disableInteractive') ? option.disableInteractive : false;
        this.minZoom = option && option.hasOwnProperty('minZoom') ? option.minZoom : 3;
        this.maxZoom = option && option.hasOwnProperty('minZoom') ? option.minZoom : 20;
        this._container = id instanceof HTMLDivElement ? id : document.getElementById(id);
        //create canvas
        this._canvas = document.createElement("canvas");
        this._canvas.style.cssText = "position: absolute; height: 100%; width: 100%; z-index: 100";
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight;
        this._container.appendChild(this._canvas);
        this._onClick = this._onClick.bind(this);
        this._onDoubleClick = this._onDoubleClick.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onWheel = this._onWheel.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._ctx = this._canvas.getContext("2d");
        this._canvas.addEventListener("click", this._onClick);
        if (!this._option.disableInteractive) {
            this._canvas.addEventListener("dblclick", this._onDoubleClick);
            this._canvas.addEventListener("mousedown", this._onMouseDown);
            this._canvas.addEventListener("mousemove", this._onMouseMove, false);
            this._canvas.addEventListener("mouseup", this._onMouseUp);
            this._canvas.addEventListener("wheel", this._onWheel);
            this._canvas.addEventListener("touchstart", this._onTouchStart, false);
            this._canvas.addEventListener("touchmove", this._onTouchMove, false);
            this._canvas.addEventListener("touchend", this._onTouchEnd, false);
        }
        //viewer
        this._viewer = new Viewer(this);
        this._viewer.on("mouseover", () => { Utility.addClass(this._canvas, "green-hover"); });
        this._viewer.on("mouseout", () => { Utility.removeClass(this._canvas, "green-hover"); });
        //editor
        this._editor = new Editor(this);
        this._editor.on("mouseover", () => { Utility.addClass(this._canvas, "green-hover"); });
        this._editor.on("mouseout", () => { Utility.removeClass(this._canvas, "green-hover"); });
        this._editor.on("startedit", () => { this._viewer.redraw(); });
        this._editor.on("stopedit", () => { this._viewer.redraw(); });
        //measurer
        this._measurer = new Measurer(this);
        //animator
        this._animator = new Animator(this);
        //tile
        this._tile = new Tile(this);
        //grid
        this._grid = new Grid(this);
        //tooltip
        this._tooltip = new Tooltip(this);
        this._tooltip1 = new Tooltip1(this);
        this._projection = new WebMercator();
        //this._center = [0, 0];
        //this._zoom = 10;
        //Latlng [-180, 180] [-90, 90]
        //this._ctx.setTransform(256/180 * Math.pow(2, this._zoom - 1), 0, 0, -256/90 * Math.pow(2, this._zoom - 1), this._canvas.width/2, this._canvas.height/2);
        //const bound: Bound = this._projection.bound;
        //设置初始矩阵，由于地图切片是256*256，Math.pow(2, this._zoom)代表在一定缩放级别下x与y轴的切片数量
        //this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale , 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
        this.setView([0, 0], 10);
        this._onResize = this._onResize.bind(this);
        window.addEventListener("resize", this._onResize);
        //selection
        this._selectionPointSymbol = new SimplePointSymbol();
        this._selectionPointSymbol.strokeStyle = "#00ffff";
        this._selectionPointSymbol.fillStyle = "#00ffff88";
        this._selectionLineSymbol = new SimpleLineSymbol();
        this._selectionLineSymbol.lineWidth = 3;
        this._selectionLineSymbol.strokeStyle = "#00ffff";
        this._selectionPolygonSymbol = new SimpleFillSymbol();
        this._selectionPolygonSymbol.lineWidth = 3;
        this._selectionPolygonSymbol.strokeStyle = "#00ffff";
        this._selectionPolygonSymbol.fillStyle = "#00ffff33";
    }
    /**
     * DIV容器
     */
    get container() {
        return this._container;
    }
    /**
     * Viewer
     */
    get viewer() {
        return this._viewer;
    }
    /**
     * Tooltip
     */
    get tooltip() {
        return this._tooltip;
    }
    get tooltip1() {
        return this._tooltip1;
    }
    /**
     * Editor
     */
    get editor() {
        return this._editor;
    }
    set editor(value) {
        this._editor = value;
    }
    get grid() {
        return this._grid;
    }
    get tile() {
        return this._tile;
    }
    /**
     * Measurer
     */
    get measurer() {
        return this._measurer;
    }
    /**
     * 视图中心
     */
    get center() {
        return this._center;
    }
    /**
     * 可视范围
     */
    get extent() {
        return this._extent;
    }
    /**
     * 缩放级别
     */
    get zoom() {
        return this._zoom;
    }
    /**
     * 坐标投影变换
     */
    get projection() {
        return this._projection;
    }
    /**
     * 点选中符号
     */
    get selectionPointSymbol() {
        return this._selectionPointSymbol;
    }
    /**
     * 线选中符号
     */
    get selectionLineSymbol() {
        return this._selectionLineSymbol;
    }
    /**
     * 面选中符号
     */
    get selectionPolygonSymbol() {
        return this._selectionPolygonSymbol;
    }
    /**
     * 禁用双击交互
     */
    disableDoubleClick() {
        this._option.disableDoubleClick = true;
    }
    /**
     * 启用双击交互
     */
    enableDoubleClick() {
        this._option.disableDoubleClick = false;
    }
    /**
     * 设置坐标投影变换
     * @param {Projection} projection - 坐标投影变换
     */
    setProjection(projection) {
        this._projection = projection;
        //const bound: Bound = this._projection.bound;
        //this._ctx.setTransform(256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale , 0, 0, 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale, this._canvas.width / 2, this._canvas.height / 2);
        //center为经纬度，转化为平面坐标
        const origin = this._projection.project(this._center);
        const bound = this._projection.bound;
        //已知：地理坐标origin，转换后屏幕坐标 即canvas的中心 [this._canvas.width / 2, this._canvas.height / 2]
        //求：平面坐标转换矩阵=Map初始矩阵:  地理坐标——屏幕坐标
        //解法如下：
        const a = 256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale;
        const d = 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale;
        const e = this._canvas.width / 2 - a * origin[0];
        const f = this._canvas.height / 2 - d * origin[1];
        this._ctx.setTransform(a, 0, 0, d, e, f);
    }
    /**
     * 设置视图级别及视图中心
     * @param {number[]} center - 视图中心
     * @param {number} zoom - 视图级别
     */
    setView(center = [0, 0], zoom = 3) {
        this._center = center;
        this._zoom = Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
        //center为经纬度，转化为平面坐标
        const origin = this._projection.project(center);
        const bound = this._projection.bound;
        //已知：地理坐标origin，转换后屏幕坐标 即canvas的中心 [this._canvas.width / 2, this._canvas.height / 2]
        //求：平面坐标转换矩阵=Map初始矩阵:  地理坐标——屏幕坐标
        //解法如下：
        const a = 256 * Math.pow(2, this._zoom) / (bound.xmax - bound.xmin) * bound.xscale;
        const d = 256 * Math.pow(2, this._zoom) / (bound.ymax - bound.ymin) * bound.yscale;
        const e = this._canvas.width / 2 - a * origin[0];
        const f = this._canvas.height / 2 - d * origin[1];
        this._ctx.setTransform(a, 0, 0, d, e, f);
        this.redraw();
    }
    /**
     * 设置缩放到某一范围
     * 默认该范围2倍. 用于缩放到某一要素对应的bound
     * @param {Bound} bound - 视图范围
     */
    fitBound(bound) {
        const origin = bound.getCenter();
        const center = this._projection.unproject(origin, true);
        bound.scale(2);
        const x_mpp = (bound.xmax - bound.xmin) / this._canvas.width; //x  meter per pixel
        const y_mpp = (bound.ymax - bound.ymin) / this._canvas.height; //y  meter per pixel
        //反算 zoom : x_mpp = (bound.xmax - bound.xmin) / (256 * Math.pow(2, this._zoom))
        if (x_mpp == 0 || y_mpp == 0) {
            this.setView(center, this.maxZoom);
        }
        else {
            const full_bound = this._projection.bound;
            const x_zoom = Math.log2((full_bound.xmax - full_bound.xmin) / x_mpp / 256);
            const y_zoom = Math.log2((full_bound.ymax - full_bound.ymin) / y_mpp / 256);
            const zoom = Math.floor(Math.min(x_zoom, y_zoom, this.maxZoom));
            this.setView(center, zoom);
        }
    }
    /**
     * 添加图层
     * @param {Layer} layer - 图层
     */
    addLayer(layer) {
        this._viewer.addLayer(layer);
    }
    /**
     * 插入图层
     * @param {Layer} layer - 图层
     * @param {number} index - 图层顺序
     */
    insertLayer(layer, index = -1) {
        this._viewer.insertLayer(layer, index);
    }
    /**
     * 移除图层
     * @param {Layer} layer - 图层
     */
    removeLayer(layer) {
        this._viewer.removeLayer(layer);
    }
    /**
     * 清空图层
     */
    clearLayers() {
        this._viewer.clearLayers();
    }
    /**
     * 添加动画
     * @param {Animation} animation - 动画
     */
    addAnimation(animation) {
        this._animator.addAnimation(animation);
    }
    /**
     * 删除动画
     * @param {Animation} animation - 动画
     */
    removeAnimation(animation) {
        this._animator.removeAnimation(animation);
    }
    /**
     * 清除动画
     */
    clearAnimations() {
        this._animator.clearAnimations();
    }
    /**
     * 设置切片url
     */
    setTileUrl(url) {
        this._tile.url = url;
    }
    /**
     * 添加图形
     * 参考_defaultGraphicLayer定义处的说明
     * shortcut
     * @param {Graphic} graphic - 图形
     */
    addGraphic(graphic) {
        this._defaultGraphicLayer.add(graphic);
        graphic.draw(this._ctx, this._projection, this._extent);
    }
    /**
     * 删除图形
     * 参考_defaultGraphicLayer定义处的说明
     * shortcut
     * @param {Graphic} graphic - 图形
     */
    removeGraphic(graphic) {
        this._defaultGraphicLayer.remove(graphic);
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
    }
    /**
     * 清除图形
     * 参考_defaultGraphicLayer定义处的说明
     * shortcut
     */
    clearGraphics() {
        this._defaultGraphicLayer.clear();
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
    }
    /**
     * 添加选中
     * @param {Geometry} geometry - 图形
     */
    addSelection(geometry) {
        if (geometry instanceof Point || geometry instanceof MultiplePoint) {
            this._selectionLayer.add(new Graphic(geometry, this._selectionPointSymbol));
        }
        else if (geometry instanceof Polyline || geometry instanceof MultiplePolyline) {
            this._selectionLayer.add(new Graphic(geometry, this._selectionLineSymbol));
        }
        else if (geometry instanceof Polygon || geometry instanceof MultiplePolygon) {
            this._selectionLayer.add(new Graphic(geometry, this._selectionPolygonSymbol));
        }
        this._selectionLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
    }
    /**
     * 清除选中
     */
    clearSelection() {
        this._selectionLayer.clear();
        this._selectionLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
    }
    /**
     * 更新地图视图范围以及中心点
     */
    updateExtent() {
        const matrix = this._ctx.getTransform();
        const x1 = (0 - matrix.e) / matrix.a, y1 = (0 - matrix.f) / matrix.d, x2 = (this._canvas.width - matrix.e) / matrix.a, y2 = (this._canvas.height - matrix.f) / matrix.d;
        this._extent = new Bound(Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2));
        this._center = this._projection.unproject([(x1 + x2) / 2, (y1 + y2) / 2]);
        //this._handlers["extent"].forEach(handler => handler({extent: this._extent, center: this._center, zoom: this._zoom, matrix: matrix}));
        this.emit("extent", { extent: this._extent, center: this._center, zoom: this._zoom, matrix: matrix });
    }
    /**
     * 重绘
     */
    redraw() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this.updateExtent();
        this._defaultGraphicLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
        this._selectionLayer.draw(this._ctx, this._projection, this._extent, this._zoom);
        this.hideTooltip();
    }
    /**
     * 清空视图
     */
    clear() {
        this._ctx.save();
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._ctx.restore();
        this.updateExtent();
    }
    /**
     * 响应窗体resize
     */
    resize() {
        this._onResize(null);
    }
    //响应窗体resize
    _onResize(event) {
        this._canvas.width = this._container.clientWidth;
        this._canvas.height = this._container.clientHeight;
        //this._handlers["resize"].forEach(handler => handler(event));
        this.emit("resize", event);
        this.setView(this._center, this._zoom);
    }
    //响应canvas被点击
    _onClick(event) {
        const matrix = this._ctx.getTransform();
        const x = (event.offsetX - matrix.e) / matrix.a;
        const y = (event.offsetY - matrix.f) / matrix.d;
        [event.lng, event.lat] = this._projection.unproject([x, y]);
        //保存偏移前的坐标
        [event.originalLng, event.originalLat] = this._projection.unproject([x, y], true);
        if (this._editor && this._editor.editing) {
            this._editor._onClick(event);
            return;
        }
        if (this._measurer && this._measurer.measuring) {
            this._measurer._onClick(event);
            return;
        }
        //this._handlers["click"].forEach(handler => handler(event));
        this.emit("click", event);
    }
    //响应canvas被双击
    //默认交互，双击放大一倍
    _onDoubleClick(event) {
        if (this._editor.editing) {
            this._editor._onDoubleClick(event);
            return;
        }
        if (this._measurer.measuring) {
            this._measurer._onDoubleClick(event);
            return;
        }
        if (!this._option.disableDoubleClick) {
            if (this._zoom >= this.maxZoom)
                return;
            const scale = 2;
            this._zoom += 1;
            const matrix = this._ctx.getTransform();
            const a1 = matrix.a, e1 = matrix.e, x1 = event.offsetX, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
            const e = (x2 - scale * (x1 - e1) - e1) / a1;
            const d1 = matrix.d, f1 = matrix.f, y1 = event.offsetY, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
            const f = (y2 - scale * (y1 - f1) - f1) / d1;
            this._ctx.transform(scale, 0, 0, scale, e, f);
            this.redraw();
        }
        //this._handlers["dblclick"].forEach(handler => handler(event));
        this.emit("dblclick", event);
    }
    //响应canvas mousedown
    //漫游起始
    _onMouseDown(event) {
        if (this._editor.editing && this._editor.editingFeature) {
            this._editor._onMouseDown(event);
            return;
        }
        this._drag.flag = true;
        this._drag.start.x = event.x;
        this._drag.start.y = event.y;
    }
    _onMouseMove(event) {
        if (this._editor.editing) {
            const matrix = this._ctx.getTransform();
            const x = (event.offsetX - matrix.e) / matrix.a;
            const y = (event.offsetY - matrix.f) / matrix.d;
            [event.lng, event.lat] = this._projection.unproject([x, y]);
            [event.originalLng, event.originalLat] = this._projection.unproject([x, y], true);
            this._editor._onMouseMove(event);
            return;
        }
        if (this._measurer.measuring) {
            const matrix = this._ctx.getTransform();
            const x = (event.offsetX - matrix.e) / matrix.a;
            const y = (event.offsetY - matrix.f) / matrix.d;
            [event.lng, event.lat] = this._projection.unproject([x, y]);
            //保存偏移前的坐标
            [event.originalLng, event.originalLat] = this._projection.unproject([x, y], true);
            this._measurer._onMouseMove(event);
            return;
        }
        if (!this._drag.flag) {
            this._handlers["mousemove"].forEach(handler => handler(event));
        }
    }
    //响应canvas mouseup
    //漫游结束
    _onMouseUp(event) {
        if (this._editor.editing && this._editor.editingFeature) {
            this._editor._onMouseUp(event);
            return;
        }
        if (this._drag.flag) {
            this._drag.end.x = event.x;
            this._drag.end.y = event.y;
            const matrix = this._ctx.getTransform();
            this._ctx.translate((this._drag.end.x - this._drag.start.x) / matrix.a, (this._drag.end.y - this._drag.start.y) / matrix.d);
            this.redraw();
        }
        this._drag.flag = false;
    }
    //响应滚轮缩放
    _onWheel(event) {
        event.preventDefault();
        //级别缩放
        const sensitivity = 5;
        if (Math.abs(event.deltaY) <= sensitivity)
            return;
        const delta = event.deltaY < 0 ? -1 : 1;
        let scale = 1;
        if (delta < 0) {
            // 放大
            scale *= delta * -2;
        }
        else {
            // 缩小
            scale /= delta * 2;
        }
        let zoom = Math.round(Math.log(scale));
        //无级缩放
        /*const sensitivity = 100;
        const delta = event.deltaY / sensitivity;
        if (Math.abs(delta) <= 0.05) return;
        let scale = 1;
        let zoom = -delta;*/
        //------------------------------------------------------------
        if (zoom > 0) {
            // 放大
            zoom = this._zoom + zoom >= this.maxZoom ? this.maxZoom - this._zoom : zoom;
        }
        else if (zoom < 0) {
            // 缩小
            zoom = this._zoom + zoom <= this.minZoom ? this.minZoom - this._zoom : zoom;
        }
        if (zoom == 0)
            return;
        this._zoom += zoom;
        scale = Math.pow(2, zoom);
        //交互表现为 鼠标当前位置 屏幕坐标不变 进行缩放 即x2 = x1，y2=y1
        //其它设定：变换前矩阵(a1,0,0,d1,e1,f1)   变换矩阵(a,0,0,d,e,f)  变换后矩阵(a2,0,0,d2,e2,f2)
        //scale已通过滚轮变化，换算得到，且a=d=scale，求e和f
        //1.将原屏幕坐标 x1 转成 地理坐标 x0 = (x1 - e1) / a1
        //2.地理坐标x0 转成 现屏幕坐标x2  a2 * x0 + e2 = x2 e2 = x2 - a2 * x0 代入1式 e2 = x2 - a2 * (x1 - e1) / a1
        //3.已知scale = a2 / a1 故 e2 = x2 - scale * (x1 - e1)
        //4.另矩阵变换 a1 * e + e1 = e2
        //5.联立3和4 求得 e = (x2 - scale * (x1 - e1) - e1) / a1
        const matrix = this._ctx.getTransform();
        const a1 = matrix.a, e1 = matrix.e, x1 = event.offsetX, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
        const e = (x2 - scale * (x1 - e1) - e1) / a1;
        const d1 = matrix.d, f1 = matrix.f, y1 = event.offsetY, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
        const f = (y2 - scale * (y1 - f1) - f1) / d1;
        this._ctx.transform(scale, 0, 0, scale, e, f);
        this.redraw();
    }
    //响应触摸
    _onTouchStart(event) {
        if (event.touches.length == 2) { // if multiple touches (pinch zooming)
            let diffX = event.touches[0].clientX - event.touches[1].clientX;
            let diffY = event.touches[0].clientY - event.touches[1].clientY;
            this._touch.finger_dist = Math.sqrt(diffX * diffX + diffY * diffY); // Save current finger distance
            this._touch.dragging = false;
            this._touch.zooming = true;
            //console.log("zoom start(cancel drag)");
        } // Else just moving around
        else if (event.touches.length == 1) {
            this._onMouseDown({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
            this._touch.dragging = true;
            //console.log("drag start");
        }
    }
    _onTouchMove(event) {
        event.preventDefault(); // Stop the window from moving
        if (event.touches.length == 2 && this._touch.zooming) { // If pinch-zooming
            let diffX = event.touches[0].clientX - event.touches[1].clientX;
            let diffY = event.touches[0].clientY - event.touches[1].clientY;
            let new_finger_dist = Math.sqrt(diffX * diffX + diffY * diffY); // Get current distance between fingers
            //let scale = Math.abs(new_finger_dist / this._touch.finger_dist); // Zoom is proportional to change
            /*let zoom = Math.round(Math.log(scale));
            if (zoom > 0) {
                // 放大
                zoom = this._zoom + zoom >= this.maxZoom ? this.maxZoom - this._zoom : zoom;
            } else if (zoom < 0) {
                // 缩小
                zoom = this._zoom + zoom <= this.minZoom ? this.minZoom - this._zoom : zoom;
            }*/
            let zoom = 0;
            let sensitivity = 50; //pixel
            if (new_finger_dist - this._touch.finger_dist > sensitivity) {
                // 放大
                zoom = this._zoom + 1 >= this.maxZoom ? this.maxZoom - this._zoom : 1;
            }
            else if (this._touch.finger_dist - new_finger_dist > sensitivity) {
                // 缩小
                zoom = this._zoom - 1 <= this.minZoom ? this.minZoom - this._zoom : -1;
            }
            else {
                return;
            }
            if (zoom == 0)
                return;
            let scale = Math.pow(2, zoom);
            this._zoom += zoom;
            //console.log("zoom:" + this._zoom + " dist:" + this._touch.finger_dist + "-" + new_finger_dist);
            this._touch.finger_dist = new_finger_dist; // Save current distance for next time
            const matrix = this._ctx.getTransform();
            const a1 = matrix.a, e1 = matrix.e, x1 = (event.touches[0].clientX + event.touches[1].clientX) / 2, x2 = x1; //放大到中心点 x2 = this._canvas.width / 2
            const e = (x2 - scale * (x1 - e1) - e1) / a1;
            const d1 = matrix.d, f1 = matrix.f, y1 = (event.touches[0].clientY + event.touches[1].clientY) / 2, y2 = y1; //放大到中心点 y2 = this._canvas.height / 2
            const f = (y2 - scale * (y1 - f1) - f1) / d1;
            this._ctx.transform(scale, 0, 0, scale, e, f);
            this.redraw();
        }
    }
    _onTouchEnd(event) {
        if (this._touch.zooming) {
            this._touch.zooming = false;
            //console.log("zoom end");
        }
        else if (this._touch.dragging) {
            this._touch.dragging = false;
            this._onMouseUp({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
            //console.log("drag end");
        }
    }
    /**
     * 显示Tooltip
     * shortcut
     * @param {Feature} feature - 要素
     * @param {Field} field - 字段
     */
    showTooltip(feature, field) {
        //const text=<span>feature.properties[field.name]<span>;
        //const text=feature.properties[field.auth];style=\"font-weight:bold;color:red\" 
        const text = "<span style=\"border-bottom: 1px dashed black;border-top: 1px dashed black;line-height:50px;height:50px;font-size:16px;color:black;font-weight:bold;display:block;text-align: center;\" >" + "<button title=\"点击查看推荐信息\" id=\"company_botton\"  style=\"cursor:pointer;font-size:18px;background:#2CB7F5;color:white;height:30px; line-height:30px;border-radius:12px;border:1px solid #3D9DD1;\">" + feature.properties[field.name] + "</button>" + "</span>"
            + "<h style=\"font-weight:bold\" >公司法人:</h>" + feature.properties[field.company_auth] +
            '<br>' + "<h style=\"font-weight:bold;\">公司类型:</h>" + feature.properties[field.company_categary] +
            '<br>' + "<h style=\"font-weight:bold;\">公司二级行业:</h>" + feature.properties[field.company_auxsector] +
            '<br>' + "<h style=\"font-weight:bold;\">公司一级行业:</h>" + feature.properties[field.company_prisector] +
            '<br>' + "<h style=\"font-weight:bold;\">公司十四大产业:</h>" + feature.properties[field.company_fourthsector] +
            '<br>' + "<h style=\"font-weight:bold;\">获批准年:</h>" + feature.properties[field.company_year] +
            '<br>' + "<h style=\"font-weight:bold;\">注册时间:</h>" + feature.properties[field.company_time] +
            '<br>' + "<h style=\"font-weight:bold;\">公司介绍:</h>" + feature.properties[field.company_introduction] +
            '<br>' + "<h style=\"font-weight:bold;\">公司地址:</h>" + feature.properties[field.company_address] +
            '<br>' + "<h style=\"font-weight:bold;\">备注:</h>";
        // const text = "点击显示详情";
        const center = feature.geometry.getCenter(CoordinateType.Projection, this.projection);
        const matrix = this._ctx.getTransform();
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        this._tooltip.show(text, screenX, screenY);
    }
    showTooltip1(feature, field) {
        //const text=feature.properties[field.auth];
        // const text ="公司名字:"+ feature.properties[field.name]+'<br>'+"法人:"+feature.properties[field.auth]+'<br>'+"公司属性:"+ feature.properties[field.categary]+'<br>'+"主营领域:"+feature.properties[field.sector]+'<br>'+"成立时间:"+ feature.properties[field.year]+'<br>'+"公司介绍:"+feature.properties[field.introduction]+'<br>'+"公司地址:"+feature.properties[field.address];
        const text = "<span style=\"border-bottom: 1px dashed black;border-top: 1px dashed black;font-size:16px;color:black;font-weight:bold;text-align:center;display:block;text-align: center;\">" + "<button title=\"点击查看推荐信息\" id=\"ach_botton\" style=\"cursor:pointer;font-size:16px;margin:10px 0;background:#2CB7F5;color:white;border-radius:12px;border:1px solid #3D9DD1;\">" + feature.properties[field.name] + "</button>" + "</span>" + "<h style=\"font-weight:bold;\">成果完成人:</h>" + feature.properties[field.ach_people] + '<br>' + "<h style=\"font-weight:bold;\">成果完成单位:</h>" + feature.properties[field.ach_unit] + '<br>' + "<h style=\"font- weight:bold;\">关键词:</h>" + feature.properties[field.ach_keywords] + '<br>' + "<h style=\"font-weight:bold;\">中图分类号:</h>" + feature.properties[field.ach_clc] + '<br>' + "<h style=\"font-weight:bold;\">成果简介:</h>" + feature.properties[field.ach_introduction] + '<br>' + "<h style= \"font-weight:bold;\">成果类别:</h>" + feature.properties[field.ach_categary] + '<br>' + "<h style=\"font-weight:bold;\">成果入库时间:</h>" + feature.properties[field.ach_inyear] + '<br>' + "<h style=\"font-weight:bold;\">成果水平:</h>" + '<br>' + "<h style=\"font-weight:bold;\">成果一级行业:</h>" + feature.properties[field.ach_prisectorsector] + '<br>' + "<h style=\"font-weight:bold;\">公司十四大产业:</h>" + feature.properties[field.ach_fourthsector] + '<br>' + "<h style=\"font-weight:bold;\">成果二级行业:</h>";
        const center = feature.geometry.getCenter(CoordinateType.Projection, this.projection);
        const matrix = this._ctx.getTransform();
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        this._tooltip.show(text, screenX, screenY);
    }
    showTooltip2(feature, field) {
        //const text=feature.properties[field.auth];
        // const text ="公司名字:"+ feature.properties[field.name]+'<br>'+"法人:"+feature.properties[field.auth]+'<br>'+"公司属性:"+ feature.properties[field.categary]+'<br>'+"主营领域:"+feature.properties[field.sector]+'<br>'+"成立时间:"+ feature.properties[field.year]+'<br>'+"公司介绍:"+feature.properties[field.introduction]+'<br>'+"公司地址:"+feature.properties[field.address];
        const text = "<span style=\"border-bottom: 1px dashed black;border-top: 1px dashed black;font-size:16px;color:black;font-weight:bold;text-align:center;display:block;text-align: center;\">" + "<button title=\"点击查看推荐信息\" id=\"ins_botton\" style=\"cursor:pointer;font-size:16px;  margin:10px 0;background:#2CB7F5;color:white;border-radius:12px;border:1px solid #3D9DD1;\">" + feature.properties[field.name] + "</button>" + "</span>" + "<h style=\"font-weight:bold;\">仪器地址:</h>" + feature.properties[field.instrument_address] + '<br>' + "<h style=\"font-weight:bold;\">仪器分类:</h>" + feature.properties[field.instrument_category] + '<br>' + "<h style=\"font-weight:bold;\">仪器使用付费:</h>" + feature.properties[field.instrument_pay] + '<br>' + "<h style=\"font-weight:bold;\">仪器一级行业:</h>" + feature.properties[field.instrument_prisectorsector] + '<br>' + "<h style=\"font-weight:bold;\">仪器二级行业:</h>" + '<br>' + "<h style=\"font-weight:bold;\">公司十四大产业:</h>" + feature.properties[field.instrument_fourthsector] + '<br>' + "<h style=\"font-weight:bold;\">联系人:</h>" + feature.properties[field.instrument_contact] + '<br>' + "<h style=\"font-weight:bold;\">联系电话:</h>" + feature.properties[field.instrument_phone] + '<br>' + "<h style=\"font-weight:bold;\">是否可复用:</h>" + /* feature.properties[field.instrument_reuse]+*/ '<br>' + "<h style=\"font-weight:bold;\">备注:</h>" /*+feature.properties[field.instrument_remark]*/;
        const center = feature.geometry.getCenter(CoordinateType.Projection, this.projection);
        const matrix = this._ctx.getTransform();
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        this._tooltip.show(text, screenX, screenY);
    }
    showTooltip3(feature, field) {
        //const text=feature.properties[field.auth];
        // const text ="公司名字:"+ feature.properties[field.name]+'<br>'+"法人:"+feature.properties[field.auth]+'<br>'+"公司属性:"+ feature.properties[field.categary]+'<br>'+"主营领域:"+feature.properties[field.sector]+'<br>'+"成立时间:"+ feature.properties[field.year]+'<br>'+"公司介绍:"+feature.properties[field.introduction]+'<br>'+"公司地址:"+feature.properties[field.address];
        const text = "<span style=\"border-bottom: 1px dashed black;border-top: 1px dashed black;font-size:16px;color:black;font-weight:bold;display:block;text-align: center;\">" + "<button title=\"点击查看推荐信息\" id=\"pro_botton\" style=\"cursor:pointer;font-size:16px;margin:10px 0;background:#2CB7F5;color:white;border-radius:12px;border:1px solid #3D9DD1;\">" + feature.properties[field.name] + "</button>" + "</span>" + "<h style=\"font-weight:bold;\">项目人员:</h>" + feature.properties[field.pro_people] + '<br>' + "<h style=\"font-weight:bold;\">人员职称:</h>" + feature.properties[field.pro_position] + '<br>' + "<h style=\"font-weight:bold;\">项目完成单位:</h>" + feature.properties[field.pro_unit] + '<br>' + "<h style=\"font-weight:bold;\">项目所属公司:</h>" + feature.properties[field.pro_corcomp] + '<br>' + "<h style=\"font-weight:bold;\">项目技术:</h>" + feature.properties[field.pro_technology] + '<br>' + "<h style= \"font-weight:bold;\">项目简介:</h>" + feature.properties[field.pro_introduction] + '<br>' + "<h style=\"font-weight:bold;\">项目负责人:</h>" + feature.properties[field.pro_compeople] + '<br>' + "<h style=\"font-weight:bold;\">联系方式:</h>" + feature.properties[field.pro_phone] + '<br>' + "<h style=\"font-weight:bold;\">项目年份:</h>" + feature.properties[field.pro_year] + '<br>' + "<h style=\"font-weight:bold;\">所属二级行业:</h>" /*+feature.properties[field.pro_auxsectorsector]*/ + '<br>' + "<h style=\"font-weight:bold;\">公司十四大产业:</h>" + feature.properties[field.pro_fourthsector] + '<br>' + "<h style=\"font-weight:bold;\">备注:</h>" /*+feature.properties[field.pro_remark]*/;
        //const text = "<img src=\"../assets/img/2.png\">"+"<img src=\"../assets/img/xinxi.svg\" style=\"margin-left:80px\" >"+"<img src=\"../assets/img/rencai.svg\" style=\"margin-left:100px\" >"+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_name:</h>"+ feature.properties[field.name]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_people:</h>"+feature.properties[field.pro_people]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_position:</h>"+ feature.properties[field.pro_position]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_unit:</h>"+feature.properties[field.pro_unit]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_corcomp:</h>"+ feature.properties[field.pro_corcomp]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_technology:</h>"+feature.properties[field.pro_technology]+'<br>'+"<h style= \"font-weight:bold;color:red\">Pro_introduction:</h>"+feature.properties[field.pro_introduction]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_compeople:</h>"+feature.properties[field.pro_compeople]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_phone:</h>"+ feature.properties[field.pro_phone]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_year:</h>"+feature.properties[field.pro_year]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_auxsectorsector:</h>"+feature.properties[field.pro_auxsectorsector]+'<br>'+"<h style=\"font-weight:bold;color:red\">Pro_remark:</h>"+feature.properties[field.pro_remark];
        const center = feature.geometry.getCenter(CoordinateType.Projection, this.projection);
        const matrix = this._ctx.getTransform();
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        this._tooltip.show(text, screenX, screenY);
    }
    showTooltip4(feature, field) {
        //const text=feature.properties[field.auth];
        // const text ="公司名字:"+ feature.properties[field.name]+'<br>'+"法人:"+feature.properties[field.auth]+'<br>'+"公司属性:"+ feature.properties[field.categary]+'<br>'+"主营领域:"+feature.properties[field.sector]+'<br>'+"成立时间:"+ feature.properties[field.year]+'<br>'+"公司介绍:"+feature.properties[field.introduction]+'<br>'+"公司地址:"+feature.properties[field.address];
        const text = "<span style=\"border-bottom: 1px dashed black;border-top: 1px dashed black;height:50px;line-height:50px;font-size:16px;color:black;font-weight:bold;display:block;text-align: center;\">" + "<button title=\"点击查看推荐信息\" id=\"teacher_botton\" style=\"cursor:pointer;font-size:18px;background:#2CB7F5;color:white;height:30px; line-height:30px;border-radius:12px;border:1px solid #3D9DD1;margin:10px 0\">" + feature.properties[field.name] + "</button>" + "</span>" + "<h style=\"font-weight:bold;\">教师职称:</h>" + feature.properties[field.teacher_position] + '<br>' + "<h style=\"font-weight:bold;\">研究方向:</h>" + feature.properties[field.teacher_research] + '<br>' + "<h style=\"font-weight:bold;\">所在学院:</h>" + feature.properties[field.teacher_college] + '<br>' + "<h style=\"font-weight:bold;\">科研项目:</h>" + feature.properties[field.teacher_program] + '<br>' + "<h style=\"font-weight:bold;\">所属一级行业:</h>" + feature.properties[field.teacher_prisectorsector] + '<br>' + "<h style= \"font-weight:bold;\">所属二级行业:</h>" /*+feature.properties[field.teacher_auxsectorsector]*/ + '<br>' + "<h style=\"font-weight:bold;\">十四大产业:</h>" + feature.properties[field.teacher_fourthsector] + '<br>' + "<h style=\"font-weight:bold;\">教师评价:</h>" + feature.properties[field.teacher_evaluate] + '<br>' + "<h style=\"font-weight:bold;\">备注:</h>" /*+ feature.properties[field.teacher_remark]*/;
        const center = feature.geometry.getCenter(CoordinateType.Projection, this.projection);
        const matrix = this._ctx.getTransform();
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        this._tooltip.show(text, screenX, screenY);
    }
    showTooltip5(feature, field) {
        //const text=feature.properties[field.auth];
        // const text ="公司名字:"+ feature.properties[field.name]+'<br>'+"法人:"+feature.properties[field.auth]+'<br>'+"公司属性:"+ feature.properties[field.categary]+'<br>'+"主营领域:"+feature.properties[field.sector]+'<br>'+"成立时间:"+ feature.properties[field.year]+'<br>'+"公司介绍:"+feature.properties[field.introduction]+'<br>'+"公司地址:"+feature.properties[field.address];
        const text = "点击显示详情";
        const center = feature.geometry.getCenter(CoordinateType.Projection, this.projection);
        const matrix = this._ctx.getTransform();
        const screenX = (matrix.a * center[0] + matrix.e);
        const screenY = (matrix.d * center[1] + matrix.f);
        this._tooltip1.show1(text, screenX, screenY);
    }
    /**
     * 隐藏Tooltipcd
     * shortcut
     */
    hideTooltip() {
        this._tooltip.hide();
        this._tooltip1.hide1();
    }
    /**
     * h
     * 销毁
     *
     *
     *
     */
    destroy() {
        window.removeEventListener("resize", this._onResize);
        this._canvas.removeEventListener("click", this._onClick);
        if (!this._option.disableInteractive) {
            this._canvas.removeEventListener("dblclick", this._onDoubleClick);
            this._canvas.removeEventListener("mousedown", this._onMouseDown);
            this._canvas.removeEventListener("mousemove", this._onMouseMove);
            this._canvas.removeEventListener("mouseup", this._onMouseUp);
            this._canvas.removeEventListener("wheel", this._onWheel);
            this._canvas.removeEventListener("touchstart", this._onTouchStart);
            this._canvas.removeEventListener("touchmove", this._onTouchMove);
            this._canvas.removeEventListener("touchend", this._onTouchEnd);
        }
        this._viewer = null;
        this._editor = null;
    }
}
