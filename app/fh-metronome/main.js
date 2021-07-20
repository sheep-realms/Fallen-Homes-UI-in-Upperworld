var infoMetronome = {
    name: "Metronome",
    version: "1.0",
    author: "Sheep-realms",
    license: "GPL 2.0",
    description: "在页面中插入一个节拍器",
    config: {
        //最大BPM
        maxBPM: 300,
        //最小BPM
        minBPM: 25,
    }
}

fh.pushAPP(infoMetronome);

/**
 * 节拍器 | Metronome
 * @class Metronome
 * @constructor
 * @param {Number} bpm BPM
 * @param {String} meter 节拍
 * @param {Number} paragraph 段落长度（小节）
 * @return {void}
 */
class Metronome {
    constructor(bpm=120,meter="4/4",paragraph=4) {
        //DOM渲染后绑定的ID
        this.id = "fh-metronome";
        //声明来源
        this.form = infoMetronome.name;
        //BPM
        this.bpm = bpm;
        //指针位置
        this.position = [1,0];
        //节拍
        this.meter = meter;
        //每小节N拍
        this.beat = meter.split('/')[0];
        //N分音符
        this.note = meter.split('/')[1];
        //音符长度（秒）
        this.noteTime = 60 / bpm;
        //音符长度（毫秒）
        this.noteTimeMs = this.noteTime * 1000;
        //隐藏的音符
        this.hiddenNote = [];
        //段落长度（小节，设为0则禁用段落）
        this.paragraph = paragraph;
        //段落内的第N小节为变奏（设为0则禁用变奏）
        this.variation = 4;
        //谱面
        this.music = {
            bassDrum: [1,3], //低音（低音鼓）
            militaryDrum: [2,4] //高音（军鼓）
        }
        //计时器ID
        this.timer = 0;
        //状态
        this.state = {
            play: false
        }
        this.lastTime = 0;
    }

    load($sel) {
        this.id = factoryMetronome(this,$sel);
        return this.id;
    }

    start() {
        this.state.play = true;
        this.timer = setInterval(metronomeRun, this.noteTimeMs, this);
    }

    stop() {
        this.state.play = false;
        clearInterval(this.timer);
    }

    next() {
        this.lastTime = Date.now();
    }

    setBPM(bpm) {
        if (bpm < infoMetronome.config.minBPM) bpm = infoMetronome.config.minBPM;
        if (bpm > infoMetronome.config.maxBPM) bpm = infoMetronome.config.maxBPM;
        this.bpm = bpm;
        this.noteTime = 60 / bpm;
        this.noteTimeMs = this.noteTime * 1000;
        if (this.state.play) {
            this.stop();
            if (Date.now() - this.lastTime > this.noteTimeMs) {
                metronomeRun(this);
                this.start();
            } else {
                setTimeout(this.start(), this.noteTimeMs - (Date.now() - this.lastTime))
            }
        }
        return this.bpm;
    }

    setMeter(meter) {
        this.meter = meter;
        this.beat = meter.split('/')[0];
        this.note = meter.split('/')[1];
        return this.meter;
    }

    speed(value) {
        return this.setBPM(this.bpm + value);
    }
}

/**
 * 包络 | Envelope
 * @class Envelope
 * @constructor
 * @param {String} value value
 * @return {void}
 */
class Envelope {

}


/**
 * 节拍器工厂 | factoryMetronome
 * @param {Metronome} obj 节拍器对象
 * @param {String} $sel JQuery选择器
 * @return {String} DOM渲染后绑定的ID
 */
function factoryMetronome(obj,$sel=$('body')) {
    let met = $('<div id="fh-metronome" class="fh-metronome" style="--bpm: ' + obj.bmp + '; --kira-time: ' + (obj.noteTime * 0.95) + 's;"></div>');
    for(i=1;i<=obj.beat;i++) {
        if (obj.hiddenNote.indexOf(i) == -1) met.append('<div class="p' + i + '"></div>');
    }
    $sel.append(met);

    $('.fh-metronome').on("webkitAnimationEnd", function() {
        $(this).removeClass('bass-drum').removeClass('military-drum');
    });

    fh.pushObject(obj);

    return "fh-metronome";
}

function metronomeRun(obj) {
    if (obj.position[1] < obj.beat) {
        obj.position[1]++;
    } else {
        if (obj.position[0] < obj.paragraph) {
            obj.position[0]++;
            obj.position[1] = 1;
        } else {
            obj.position = [1,1];
        }
    }

    obj.lastTime = Date.now();

    if(obj.music.bassDrum.indexOf(obj.position[1]) != -1) $('#' + obj.id).addClass('bass-drum');
    if(obj.music.militaryDrum.indexOf(obj.position[1]) != -1) $('#' + obj.id).addClass('military-drum');
    
    if (!(obj.position[0] >= obj.variation && obj.position[1] > 1)) {
        $('#' + obj.id + '>div').removeClass('fill');
        if (obj.position[1] > 1) {
            $('#' + obj.id + '>.p' + (obj.position[1] - 1)).addClass('glass');
        }
    }
    if (obj.position[1] == 1) $('#' + obj.id + '>div').removeClass('glass');
    $('#' + obj.id + '>.p' + obj.position[1]).addClass('fill');
}