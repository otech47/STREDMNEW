$(document).ready( function() {
	function getEventTags()
	{
		var artistSelection = $("input[id='artists']").val();
		var postdata = { artist:artistSelection };
		jQuery.ajax({
			type: "POST",
			url: '../scripts/eventTags.php',
			data: postdata,
			success: function(data) 
			{
				var autocompleteData = JSON.parse(data);
				$("input[id='events']").autocomplete({
					source: autocompleteData
				});
				$("#events").select();
				$("#events").autocomplete("search", "");
			}
		});
	}
	function getArtistTags()
	{
		var eventSelection = $("input[id='events']").val();
		var postdata = { event:eventSelection };
		jQuery.ajax({
			type: "POST",
			url: '../scripts/artistTags.php',
			data: postdata,
			success: function(data) 
			{
				var autocompleteData = JSON.parse(data);
				$("input[id='artists']").autocomplete({
					source: autocompleteData
				});
				$("#artists").select();
				$("#artists").autocomplete("search", "");
			}
		});
	}
	function getAllTags()
	{
		var autocompleteData = new Array();
		var eventSelection = "";
		var artistSelection = "";
		var postdata = { event:eventSelection };
		jQuery.ajax({
			type: "POST",
			url: '../scripts/artistTags.php',
			data: postdata,
			success: function(data) 
			{
				var autocompleteDataTemp = JSON.parse(data);
				autocompleteData = autocompleteData.concat(autocompleteDataTemp);
			}
		});
		postdata = { artist:artistSelection };
		jQuery.ajax({
			type: "POST",
			url: '../scripts/eventTags.php',
			data: postdata,
			success: function(data) 
			{
				var autocompleteDataTemp = JSON.parse(data);
				autocompleteData = autocompleteData.concat(autocompleteDataTemp);
			}
		});
		$("input[id='select-combined']").autocomplete({
					source: autocompleteData
				});
		$("#select-combined").select();
		$("#select-combined").autocomplete("search", "");
	}
	$("#select-combined").autocomplete({
		minLength: 0
	}).click(function() {
		getAllTags();
	});
	$(".option-button").hover(function(){
		$(this).css("box-shadow","0 0 2px 5px grey inset")
		},
		function ()
		{
		$(this).css("box-shadow","0 0 0 0")
	});
	$(".random-button").click(function(){
		$(".option-button").css("box-shadow","0 0 0 0");
		$(".option-label").animate({opacity:'0'}, 200, function() {
			$(".select-buttons").css("display","none");
			$(".random-search").css("display","table");
			});
	});
	$(".specific-button").click(function(){
		$(".option-button").css("box-shadow","0 0 0 0");
		$(".option-label").animate({opacity:'0'}, 200, function() {
			$(".select-buttons").css("display","none");
			$(".specific-search").css("display","table");
			});
	});
});