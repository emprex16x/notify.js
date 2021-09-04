$.notify = function(_text,_duration) {
	let className = '.notification',
		thisIndex = $(className).length > 0 ? $(className).last().data('index') + 1 : 0,
		template = '<div class="notification" data-index="'+thisIndex+'" style="display:none"><div class="conteiner">'+_text+'</div></div>';
	if(_duration === undefined) _duration = 300;
	 
	$('body').append(template);
	if($(className).length > 1){
		updateBlockPos(className);
	};
	let blockwidth = $(className).last().outerWidth();
	
	$(className).last().css({'left':0,'right':0, 'width':blockwidth});
	$(className).last().slideDown('slow');
	if(_duration != 'call'){
		setTimeout(function(){ 
			$(className).filter('[data-index="'+thisIndex+'"]').slideUp('slow').remove(); 
			updateBlockPos(className);
		}, 3000);
	}
	$(document).on('click',className, function (event) {
		$(this).slideUp('slow').remove();
		updateBlockPos(className);
	});
	
	function updateBlockPos(className){
		$(className).each(function(index){ 
			let bottomPrevBlock = index > 0 ? parseInt($(className).eq(--index).css('bottom')) + $(className).last().outerHeight(true) : 0 ;
			$(this).css('bottom', bottomPrevBlock +'px');
			//$(this).attr('data-index',index)
		});
	};	

	$.notify.getIndex =  function () {
		if(thisIndex !== undefined)
		  return thisIndex;
	};
	
	$.notify.close =  function (index) {
		$this = $(className).filter('[data-index="'+index+'"]');
		$this.slideUp('slow').remove();
		updateBlockPos(className);
	};
	
};
