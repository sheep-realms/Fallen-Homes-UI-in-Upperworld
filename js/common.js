
$('.fh-window').ready(function() {
    $('.fh-window-title .close').click(function() {
        var $obj = $(this).parents('.fh-window').eq(0);
        $obj.addClass('window-close');
        setTimeout(function() {
            $obj.remove();
        }, 8000)
    });
});

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