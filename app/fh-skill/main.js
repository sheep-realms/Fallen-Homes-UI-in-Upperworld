var infoSkill = {
    name: "Skill",
    version: "d20210719",
    author: "Sheep-realms",
    license: "GPL 2.0",
    description: "显示动态技能条",
    config: {}
}

fh.pushAPP(infoSkill);

//moduleStylesLoad('fh-skill/main.css');

$('.fh-skill').ready(function() {
    $('.fh-skill').click(function() {
        if ($(this).hasClass('cd-ok')) {
            $(this).removeClass('cd').addClass('run');
        }
        if ($(this).hasClass('sleep')) {
            $(this).removeClass('sleep').addClass('build');
        }
        if ($(this).hasClass('build-ok')) {
            $(this).removeClass('build-ok').addClass('cd');
        }
    });

    $(".fh-skill").bind("contextmenu", function(){
        return false;
    })

    $(".fh-skill").mouseup(function(e) {
        if (3 == e.which && ($(this).hasClass('cd') || $(this).hasClass('cd-ok') || $(this).hasClass('run'))) {
            $(this).removeClass('cd').removeClass('cd-ok').removeClass('run').addClass('dead');
        }
    })
});


$('.fh-skill-progress-bar>.content').ready(function() {
    $('.fh-skill-progress-bar>.content').on("webkitAnimationEnd", function() {
        if ($(this).parents('.fh-skill').hasClass('cd') && $(this).parents('.fh-skill').hasClass('auto')) {
            $(this).parents('.fh-skill').removeClass('cd').addClass('run');
        } else if ($(this).parents('.fh-skill').hasClass('cd')) {
            $(this).parents('.fh-skill').removeClass('cd').addClass('cd-ok');
        } else if ($(this).parents('.fh-skill').hasClass('build')) {
            $(this).parents('.fh-skill').removeClass('build').addClass('build-ok');
        } else if ($(this).parents('.fh-skill').hasClass('run') && $(this).parents('.fh-skill').hasClass('run-end-dead')) {
            $(this).parents('.fh-skill').removeClass('run').removeClass('cd-ok').addClass('dead');
        } else if ($(this).parents('.fh-skill').hasClass('run') && $(this).parents('.fh-skill').hasClass('run-end-dead-1')) {
            $(this).parents('.fh-skill').removeClass('run').removeClass('cd-ok').removeClass('run-end-dead-1').addClass('dead');
        } else if ($(this).parents('.fh-skill').hasClass('dead')) {
            $(this).parents('.fh-skill').removeClass('dead').addClass('sleep');
        } else {
            $(this).parents('.fh-skill').removeClass('run').removeClass('cd-ok').addClass('cd');
        }
    });
});