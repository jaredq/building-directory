function initrb(b, c)
{
    /*$("#rba-" + b).bind("mousedown", function () { mdrb(b,c); });
     $("#rba-" + b).bind("mouseup", function () { murb(b,c); });*/
    $("#" + b).bind("touchstart", function () {
        tsrb(b, c);
    });
    $("#" + b).bind("touchend", function () {
        terb(b, c);
    });
}
function tsrb(b, c)
{
    $('#' + b).removeClass('rb-end-' + c).addClass('rb-start-' + c);
}
function terb(b, c)
{
    $('#' + b).removeClass('rb-start-' + c).addClass('rb-end-' + c);
}

function toggle_block(b, c) {
    if (b === c)
    {
        $("#" + c).slideDown(500);
    } else {
        $("#" + c).hide();
    }
}
function live_time(t)
{
    date = new Date;
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    result = h + ':' + m;
    $("#" + t[0]).html(result);
    $("#" + t[1]).html(result);
    $("#" + t[2]).html(result);
    setTimeout('live_time(["' + t[0] + '","' + t[1] + '","' + t[2] + '"]);', '10000');
    return true;
}
function backspace_str(s) {
    if (s === null || s === "" || s.length === 0) {
        return "";
    } else {
        return s.substr(0, s.length - 1);
    }
}

var screen_idle_time = 0;

function reset_idle_time() {
    screen_idle_time = 0;
}

function show_sort_links() {
    //$("#sort_links").fadeIn();
    $("#sort_links").animate({right: '0px'});
}

function hide_sort_links() {
    //$("#sort_links").fadeOut();
    $("#sort_links").animate({right: '-295px'});
}

function switch_block(t) {
    toggle_block(t, "list_icons");
    toggle_block(t, "sort_by_alphabetical");
    toggle_block(t, "sort_by_level");
    toggle_block(t, "search");
}

function switch_main_block(t) {
    toggle_block(t, "welcome");
    toggle_block(t, "mainbox");
    toggle_block(t, "bldmgt");
    toggle_block(t, "company");
}

function show_company() {
    switch_main_block("company");
}

var rippleRunner;
var rippleRandom;
function show_mainbox() {
    switch_main_block("mainbox");
    clearInterval(rippleRunner);
    clearInterval(rippleRandom);
}

function show_listicons() {
    show_mainbox();
    switch_block("list_icons");
}

function show_sortbyalphabetical() {
    show_mainbox();
    switch_block("sort_by_alphabetical");
}

function show_sortbylevel() {
    show_mainbox();
    switch_block("sort_by_level");
}

function show_search() {
    show_mainbox();
    switch_block("search");
}

function show_bldmgt() {
    switch_main_block("bldmgt");
}

function play_click_sound() {
    document.getElementById("click_sound").play();
}

function play_swipe_sound() {
    document.getElementById("swipe_sound").play();
}

$(document).ready(function () {
    initrb("rbb-red1", "red");
    initrb("rbb-blue1", "blue");
    initrb("rbb-green1", "green");
    initrb("rbb-search", "search");
    initrb("rbb-homelink1", "homelink");
    initrb("rbb-bldmgtlink1", "bldmgtlink");
    initrb("rbb-back1", "backlink");
    initrb("rbb-back2", "backlink");

    initrb("key_a1", "a");
    initrb("key_b1", "b");
    initrb("key_c1", "c");
    initrb("key_d1", "d");
    initrb("key_e1", "e");
    initrb("key_f1", "f");
    initrb("key_g1", "g");
    initrb("key_h1", "h");
    initrb("key_i1", "i");
    initrb("key_j1", "j");
    initrb("key_k1", "k");
    initrb("key_l1", "l");
    initrb("key_m1", "m");
    initrb("key_n1", "n");
    initrb("key_o1", "o");
    initrb("key_p1", "p");
    initrb("key_q1", "q");
    initrb("key_r1", "r");
    initrb("key_s1", "s");
    initrb("key_t1", "t");
    initrb("key_u1", "u");
    initrb("key_v1", "v");
    initrb("key_w1", "w");
    initrb("key_x1", "x");
    initrb("key_y1", "y");
    initrb("key_z1", "z");
    initrb("key_listall1", "listall");

    initrb("key_a2", "a");
    initrb("key_b2", "b");
    initrb("key_c2", "c");
    initrb("key_d2", "d");
    initrb("key_e2", "e");
    initrb("key_f2", "f");
    initrb("key_g2", "g");
    initrb("key_h2", "h");
    initrb("key_i2", "i");
    initrb("key_j2", "j");
    initrb("key_k2", "k");
    initrb("key_l2", "l");
    initrb("key_m2", "m");
    initrb("key_n2", "n");
    initrb("key_o2", "o");
    initrb("key_p2", "p");
    initrb("key_q2", "q");
    initrb("key_r2", "r");
    initrb("key_s2", "s");
    initrb("key_t2", "t");
    initrb("key_u2", "u");
    initrb("key_v2", "v");
    initrb("key_w2", "w");
    initrb("key_x2", "x");
    initrb("key_y2", "y");
    initrb("key_z2", "z");
    initrb("key_clear2", "clear");
    initrb("key_blank2", "blank");
    initrb("key_backspace2", "backspace");

    live_time(["ltb-1", "ltb-2", "ltb-3"]);

    $("body").on("tap", function (event) {
        reset_idle_time();
    });
    $("body").on("taphold", function (event) {
        reset_idle_time();
    });
    $("body").on("swipe", function (event) {
        reset_idle_time();
    });
    $("body").on("scrollstart", function (event) {
        reset_idle_time();
    });
});