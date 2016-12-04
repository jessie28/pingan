var preloadImageList = [];
if( $('div').length > 0 ){
    $.each($('div'), function(index, val) {
        var img = $(val).css('background-image').replace( /^url\((['"]?)(.*)\1\)$/ , '$2' );
        img = $.trim(img);
        if( img && img.match(/[^/]+(jpg|png|gif)$/) ){
            preloadImageList.push( img );
        }
        });
    }
    if( $('img').length > 0 ){
    $.each($('img'), function(index, val) {
        var img = $(val).attr('src');
        if( img && img.match(/[^/]+(jpg|png|gif)$/) ){
            preloadImageList.push( img );
        }
    });
}
function preloadimages(obj, complete_cb, progress_cb) {
    var loaded = 0;
    var toload = 0;
    var images = obj instanceof Array ? [] : {};
    toload = obj.length;
    for (var i = 0; i < obj.length; i++) {
        images[i] = new Image();
        images[i].src = obj[i];
        images[i].onload = load;
        images[i].onerror = load;
        images[i].onabort = load;
    }
    if (obj.length == 0) {
        complete_cb(images);
    }
    function load() {
        ++loaded;
        if (progress_cb) {
            progress_cb(loaded / toload);
        }
        if (loaded >= toload) {
            complete_cb(images);
        }
    }
}
var timeEnd = false;
var imgLoaded = false;

preloadimages( preloadImageList , function () {
    imgLoaded = true;
    startPlay();
    // $(".page2").show();
}, function(progress){
    var text = Math.floor( progress*100 ) + '%';
    console.log(text)
    //to do show text
} );

function startPlay(){
	// console.log('play')
}

//page1
window.page_start = function(){
	$(".page").hide()
	$("#page1").show()
	$("#page1 .common_bg").hide()
	$("#page1 .bg1").show()
	setTimeout(function(){
		$("#page1 .common_bg").hide()
		$("#page1 .bg2").fadeIn()
	},5000)
}



$(function() {
	var cur_ele, cur_id
	var pre_ele, pre_id = 0, next_ele, next_id = 0
	var startY, endY
	document.addEventListener('touchstart', start, false);
	document.addEventListener('touchmove', move, false);
	document.addEventListener('touchend', end, false);

	function start(event) {
		event.preventDefault();
		pre_id = 0
		next_id = 0
		cur_ele = $("#container").find(".page:visible");
		cur_id_name = cur_ele.attr("id")
		cur_id = cur_id_name.slice(4)
		console.log(cur_id)
		if (cur_id < 8) {
			next_id = parseInt(cur_id) + 1
			next_ele = $("#page" + next_id)
			$(next_ele).show()
			$(next_ele).css("top", "101%")

		}
		if (cur_id > 1) {
			pre_id = parseInt(cur_id) - 1
			pre_ele = $("#page" + pre_id)
			$(pre_ele).show()
			$(pre_ele).css("top", "-101%")

		}
		var touch = event.touches[0];
		startY = touch.pageY;
	}


	function move(event) {
		event.preventDefault();
		var touch = event.touches[0];
		endY = touch.pageY;
		var diff = Math.abs(endY - startY)

		if (endY < startY) {
			if (next_id != 0) {
				var top = 100 - (diff / 900 * 100)
				// var css = "translate(0px,"+top+"%)";
				var css = top + "%"
				$(next_ele).css("top", css)
				$(next_ele).css("zIndex", 2)
				var scale = 1 - (diff / 1041)
				$(cur_ele).css("transform-origin", "50% 0%")
				var scale_css = "scale(" + scale + "," + scale + ")"
				$(cur_ele).css("transform", scale_css)

			}
		} else {
			if (pre_id != 0) {
				var top = 100 - (diff / 900 * 100)
				// var css = "translate(0px,"+top+"%)";
				var css = "-" + top + "%"
				$(pre_ele).css("top", css)
				$(pre_ele).css("zIndex", 2)
				var scale = 1 - (diff / 1041)
				console.log(scale)
				$(cur_ele).css("transform-origin", "50% 100%")
				var scale_css = "scale(" + scale + "," + scale + ")"
				$(cur_ele).css("transform", scale_css)
			}
		}


		// console.log(endY)
	}

	function end(event) {
		event.preventDefault();
		var diff = Math.abs(endY - startY)
		$(".page").hide()
		$(".page").css("zIndex", 1)
		$(".page").css("transform", "translate(0px,0%) scale(1,1)")
		$(".page").css("transform-origin", "0% 0%")
		$(".page").removeClass("animation")

		if (endY < startY) {
			//上滑 next
			if (next_id != 0) {
				$(next_ele).addClass("animation")
				$(next_ele).css('top', "0")
				$(next_ele).show()
			} else {
				$(cur_ele).addClass("animation")
				$(cur_ele).show()
			}
		} else {
			//下滑 pre

			if (pre_id != 0) {
				$(pre_ele).addClass("animation")
				$(pre_ele).css('top', "0")
				$(pre_ele).show()
			} else {
				$(cur_ele).show()
			}
		}
	}

	var page2_text = [
		{'text': '不用等三年', 'color': '#000', 'time': 200, 'top': '1rem'},
		{'text': '不用等lian年', 'color': '#000', 'time': 700, 'top': '4rem'},
		{'text': '不用等dswads三年', 'color': '#000', 'time': 400, 'top': '7rem'},
		{'text': '不用等三年aaa', 'color': '#000', 'time': 1200, 'top': '1.5rem'},
		{'text': '不用等三年dsds', 'color': '#000', 'time': 1700, 'top': '4.5rem'},
		{'text': '不用等三年dsds', 'color': '#000', 'time': 1500, 'top': '7.5rem'},
		{'text': '不用等三年dsdsdsdss', 'color': '#000', 'time': 2000, 'top': '12rem'},
	]
	var page2_text_move = function () {
		for (var index in page2_text) {
			var info = page2_text[index];
			(function (info, index) {
				setTimeout(function () {
					add(info, index);
				}, info.time);
			})(info, index);
			function add(info, index) {
				//var top =
				var className = "text" + index
				$("#page2 .text").append("<div class='text_common " + className + "'>" + info.text + "</div>")
				var classes = $("#page2 .text ." + className);
				classes.css('color', info.color);
				classes.css('top', info.top);
				setTimeout(function () {
					classes.css('left', '-110%')
				}, 200)
				if(index == 5){
					setTimeout(function(){
						$("#page2 .title").css('left','2rem')
						$("#page2 .man").css('left','8rem')
						$("#page2 .man").css('top','23rem')
					},1400)
				}
			}
		}

	}

	//page2_text_move()



});