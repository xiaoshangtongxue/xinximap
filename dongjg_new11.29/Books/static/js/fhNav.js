$(".fhNav").hover(function(){},function(){
	$(".bottomLine").css("width",parseFloat($(".selectedNav").eq(0).width())+"px");
	$(".bottomLine").css("left",parseFloat($(".selectedNav").eq(0)[0].offsetLeft+0)+"px");
})
$(".nav li").hover(function(){
	$(".bottomLine").css("width",parseFloat($(this).width())+"px");
	$(".bottomLine").css("left",parseFloat($(this)[0].offsetLeft+0)+"px");
});
$(".Functionalbox ul li").on('mouseover',function(){
	var index = $(this).index();

	if(index == 0){
		console.log(index);
		$(this).children('img').attr('src','../static/images/clear_white.svg')
	}else if(index == 1){
		console.log(index);
		$(this).children('img').attr('src','../static/images/closemapwhite.svg')
	}else if(index == 2){
		console.log(index);
		$(this).children('img').attr('src','../static/images/shuaxinwhite.svg')
	}else if(index == 3){
		console.log(index);
		$(this).children('img').attr('src','../static/images/shezhiwhite.svg')
	}
})
$(".Functionalbox ul li").on('mouseout',function(){
	var index = $(this).index();
	if(index == 0){
		console.log(index);
		$(this).children('img').attr('src','../static/images/clear_blue.svg')
	}else if(index == 1){
		console.log(index);
		$(this).children('img').attr('src','../static/images/closemapblack.svg')
	}else if(index == 2){
		console.log(index);
		$(this).children('img').attr('src','../static/images/shuaxinblack.svg')
	}else if(index == 3){
		console.log(index);
		$(this).children('img').attr('src','../static/images/shezhiblack.svg')
	}
})
// $(".nav li").on("click",function(){
// 	$(".nav li").removeClass("selectedNav");
// 	$(this).addClass("selectedNav");
// 	$(".bottomLine").css("width",parseFloat($(this).width()+20)+"px");
// 	$(".bottomLine").css("left",parseFloat($(this)[0].offsetLeft)+"px");
// })