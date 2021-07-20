class FallenHomesSeed {
    constructor() {
        this.version = "Alpha 2021.7.20";
        this.config = {
            //站点相关配置
            //站点名称
            websiteName: "Fallen Homes UI in Upperworld",
            //站点域名
            websiteDomain: "www.example.com",
            //站点协议
            websiteProtocol: "http://",
            //站点根目录
            websiteRootDir: "/",

            //页面配置 - 由页面定义，请勿随意修改
            //当前页面去往根目录的路径
            pageToRootDir: "",
        };

        //应用列表
        this.app = [];

        //对象容器 - 记录所有已通过工厂函数构建的对象
        this.object = [];

        //调试模式
        this.debugMode = true;
        this.debug = {
            //强制使用相对路径
            relativePaths: true,
        }
    }

    /**
     * 获取系统配置 | Get Config
     * @param {String} key 配置键名
     * @param {String} debugKey 调试模式配置键名
     * @return {String} 配置值
     * @example getConfig("websiteName");
     */
    getConfig(key, debugKey=null) {
        if (debugKey == null || !this.debugMode) return this.config[key];
        return this.debug[debugKey];
    }

    /**
     * 写入系统配置 | Set Config
     * @param {String} key 配置键名
     * @param {String} value 配置值
     * @return {String} 配置值
     * @example setConfig("websiteName", "My Website");
     */
    setConfig(key, value) {
        return this.config[key] = value;
    }

    /**
     * 提交应用 | Push APP
     * @param {JSON} info 应用自述
     * @return {JSON} 应用自述
     */
    pushAPP(info) {
        if (info.preAPP) {
            var unknowAPP = [];
            info.preAPP.forEach(app => {
                if (fh.app.find(e => e.name == app.name) == undefined) unknowAPP.push(app);
            });
            if (unknowAPP.length > 0) {
                return console.warn('应用 ' + info.name + ' 缺失前置应用：\n%O\n', unknowAPP);
            }
        }
        this.app.push(info);
        return info;
    }

    /**
     * 提交对象 | Push Object
     * @param {JSON} obj 对象
     * @return {JSON} 对象
     */
    pushObject(obj) {
        if (this.object.find(e => e.id==obj.id) == undefined) this.object.push(obj);
        return obj;
    }

    /**
     * 生成URL地址 | Print URL
     * @param {String} page 页面名称/地址
     * @param {String} parameter 参数列表
     * @return {String} URL地址
     * @example url("index.html", "id", "value");
     */
    url(page,...parameter) {
        var pars = "";
        if (parameter) {
            pars = "?" + parameter[0] + "=" + parameter[1];
            for (let i=2;i<parameter.length;i+=2) {
                pars += "&" + parameter[i] + "=" + parameter[i+1];
            }
        }
        return this.getConfig("websiteProtocol") + this.getConfig("websiteDomain") + this.getConfig("websiteRootDir") + page + pars;
    }

    basePath() {
        return this.debugIf("relativePaths") ? this.getConfig("pageToRootDir") : this.getConfig("websiteRootDir")
    }

    load(url, type) {
        var head = document.getElementsByTagName("head")[0];
        if (type == "css") {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            head.appendChild(link);
            return url;
        } else if (type == "js") {
            var script = document.createElement("script");
            script.src = url;
            head.appendChild(script);
            return url;
        }
    }

    loadAPP(name) {
        return this.load(this.basePath() + "app/" + name + "/main.js", "js");
    }

    debugIf(value) {
        if (this.debugMode) {
            return this.debug[value];
        }
        return false;
    }

    debugInfo() {
        var date = new Date();

        console.group("Fallen Homes UI Debug Info");

        console.group("System Config");
        console.log("websiteName: " + this.getConfig("websiteName"));
        console.log("websiteDomain: " + this.getConfig("websiteDomain"));
        console.log("websiteProtocol: " + this.getConfig("websiteProtocol"));
        console.log("websiteRootDir: " + this.getConfig("websiteRootDir"));
        console.groupEnd();

        console.group("App Information");
        this.app.forEach(e => {
            console.group(e.name);
            console.log("name: " + e.name);
            console.log("version: " + e.version);
            console.log("author: " + e.author);
            console.log("license: " + e.license);
            console.groupEnd();
        });
        console.groupEnd();

        console.group("Copyright Information");
        console.log("© 2001-" + date.getFullYear() + " Sheep-realms");
        console.log("license: https://www.gnu.org/licenses/old-licenses/gpl-2.0.html");
        console.groupEnd();

        console.groupEnd();
    }
}

var fh = new FallenHomesSeed();


$('.fh-window').ready(function() {
    $('.fh-window-title .close').click(function() {
        var $obj = $(this).parents('.fh-window').eq(0);
        $obj.addClass('window-close');
        $obj.find('button, input[type="button"], .fh-button').attr('disabled', 'true');
        setTimeout(function() {
            $obj.remove();
        }, 8000)
    });
});

$('ruby').ready(function() {
    if ($(this).data('fh-load') == undefined) {
        $(this).children('rt').before('<span class="fh-ruby-hidden">（</span>');
        $(this).children('rt').after('<span class="fh-ruby-hidden">）</span>');
        $(this).data('fh-load', true);
    }
});

// $('pre').ready(function() {
//     let text = $(this).html();
//     console.log(text);
//     $(this).html(text.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
// });

/**
 * 窗口 | Window
 * @class MsgBox
 * @constructor
 * @param {String} id 窗口的ID
 * @param {String} title 窗口的标题
 * @param {String} domClass 窗口生成在DOM树中使用的类
 * @return {void}
 */
class Window {
    constructor(id="", title="", domClass="") {
        this.id = id;
        this.title = title;
        this.domClass = domClass;
        this.width = "500px";
        this.height = "300px";
        this.top = "0px";
        this.right = "0px";
    }

    /**
     * 移动窗口 | Move Window
     * @param {String} top 窗口与网页顶部边界的距离
     * @param {String} right 窗口与网页右侧边界的距离
     * @return {void}
     * @example Window.move("100px", "200px");
     */
    move(top=this.top, right=this.right) {
        this.top = top;
        this.right = right;
    }

    /**
     * 设置窗口尺寸 | Set Window Size
     * @param {String} width 窗口的宽度
     * @param {String} height 窗口的高度（不包含标题栏）
     * @return {void}
     * @example Window.setSize("500px", "300px");
     */
    setSize(width=this.width, height=this.height) {
        this.width = width;
        this.height = height;
    }

    /**
     * 设置窗口标题 | Set Window Title
     * @param {String} title 窗口的标题
     * @return {void}
     * @example Window.setTitle("Missingno");
     */
    setTitle(title=this.title) {
        this.title = title;
    }
}

/**
 * 消息对话框 | MsgBox
 * @class MsgBox
 * @constructor
 * @param {String} message 消息...
 * @param {String} title 窗口的标题
 * @param {String} controllerType 控制器按钮类型
 * @return {void}
 */
class MsgBox extends Window {
    constructor(message="", title="MsgBox", controllerType="ok") {
        super("", title);
        this.message = message;
        this.controllerType = controllerType;
    }

    /**
     * 设置消息 | Set Message
     * @param {String} message 消息...
     * @return {void}
     * @example Window.setMessage("Hello, World!");
     */
    setMessage(message="") {
        this.message = message;
    }
}

class ParamList {
    constructor(list=[],value="") {
        this.list = list;
        this.value = "";
        this.setValue(value);
    }

    setValue(value="") {
        if (this.list.indexOf(value) != -1) {
            this.value = value;
            return this.value;
        }
        return "";
    }
}

class MsgBoxControllerType extends ParamList {
    constructor(value="") {
        super(
            [
                "customize",
                "ok",
                "okCancel",
                "okCancelApply",
                "okResetCancel",
                "retry",
                "retryCancel",
                "send",
                "sendCancel",
                "sendClearCancel",
                "submit",
                "submitCancel",
                "submitResetCancel",
                "yes",
                "yesNo",
                "yesNoCancel"
            ],
            value
        );
    }
}

function appStylesLoad(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = 'app/'+url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}