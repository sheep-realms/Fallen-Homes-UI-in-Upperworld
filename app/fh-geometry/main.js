var infoGeometry = {
    name: "Geometry",
    version: "1.0",
    author: "Sheep-realms",
    license: "GPL 2.0",
    description: "几何图形工具包",
    preAPP: [
        {
            name: "Mathematics",
            version: "1.0",
        }
    ],
    config: {
        
    }
}

fh.pushAPP(infoGeometry);


/**
 * 平面几何图形 | Plane Geometry
 * @class PlaneGeometry
 * @constructor
 * @param {Number} width 宽度
 * @param {Number} height 高度
 * @return {void}
 */
class PlaneGeometry {
    constructor(width=undefined, height=undefined) {
        this.id = "";
        this.form = "Geometry";
        this.width = width;
        this.height = height;
        this.top = 0;
        this.right = 0;
        this.bottom = 0;
        this.left = 0;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
        return [this.width, this.height];
    }
}

/**
 * 矩形 | Rectangle
 * @class Rectangle
 * @constructor
 * @param {Number} width 宽度
 * @param {Number} height 高度
 * @return {void}
 */
class Rectangle extends PlaneGeometry {
    constructor(width=undefined, height=undefined) {
        super(width, height);
    }

    getPerimeter() {
        return (this.width + this.height) * 2;
    }

    getArea() {
        return this.width * this.height;
    }

    getDiagonal() {
        return Math.sqrt(Math.pow(this.width, 2) + Math.pow(this.height, 2));
    }
}

/**
 * 正方形 | Square
 * @class Square
 * @constructor
 * @param {Number} width 宽度
 * @return {void}
 */
class Square extends Rectangle {
    constructor(width=undefined) {
        super(width, width);
    }

    resize(width) {
        this.width = width;
        this.height = width;
        return this.width;
    }

    getPerimeter() {
        return this.width * 4;
    }

    getArea() {
        return Math.pow(this.width, 2);
    }

    getDiagonal() {
        return Math.sqrt(Math.pow(this.width, 2) * 2);
    }
}

/**
 * 圆形 | Circular
 * @class Circular
 * @constructor
 * @param {Number} radius 半径
 * @return {void}
 */
class Circular extends Square {
    constructor(radius=undefined) {
        super(undefined);
        this.radius = radius;
        this.diameter = radius * 2
    }

    resize(radius) {
        this.diameter = radius * 2
        return this.radius = radius;
    }

    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }

    getArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }

    getDiagonal() {
        return this.diameter;
    }
}

/**
 * 扇形 | Sector
 * @class Circular
 * @constructor
 * @param {Number} radius 半径
 * @param {Number} angle 角度
 * @return {void}
 */
class Sector extends Circular {
    constructor(radius=undefined, angle=0) {
        super(undefined);
        this.radius = radius;
        this.diameter = radius * 2
        this.angle = limitAngle(angle);
    }

    resize(radius, angle) {
        this.diameter = radius * 2
        this.radius = radius
        this.angle = angle;
        return [this.radius, this.angle];
    }

    getArcLength() {
        return this.angle * Math.PI * this.radius / 180;
    }

    getPerimeter() {
        if (this.angle == 0) return this.radius;
        return getArcLength() + this.diameter;
    }

    getArea() {
        return getArcLength() * this.radius / 2;
    }
}