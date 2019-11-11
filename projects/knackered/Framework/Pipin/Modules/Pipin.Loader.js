
(function(){
	var Loader = new Class(function(loadStack, loadVersion, loadLogoPath)
	{
		this.LoadStack = loadStack;
		this.loadVersion = loadVersion;
		this.loadLogoPath = loadLogoPath;
	});

	Loader.Prop("Load", function()
	{
		var that = this;
		var loadLength = that.LoadStack.length;
		that.SetUpProgress(loadLength);
		for (var i = 0; i < loadLength; i++)
		{
			$("#loadDump").append("Loaded " + that.LoadStack[i][0] + " Assets...<br />");
			that.LoadStack[i][1]();
			$("#loadProg").animate({
				value: i + 1
			}, 10, function(){
				if (parseFloat($(this).attr("value")) == loadLength)
				{
					$("#loadCont").animate({
						opacity: 0
					}, 400, function(){
						$(this).hide();
						$("#gameCanvas").show();
					});

				}
			});
		}
	});

	Loader.Prop("SetUpProgress", function(max){
		var that = this;
	    var el = "<div id = 'loadCont' class = 'center-block'>" +
	        "<img id = 'logoImage' src = '" + that.loadLogoPath + "' />" +
	        "<progress value = '0' max = '" + max + "' id = 'loadProg'>" +
	        "</progress>" +
	        "<p id = 'loadTitle'>Loading...</p>" +
	        "<p id = 'loadVersion'>v" + that.loadVersion + " Development</p>" +
	        "<p id = 'loadDump'></p>" +
	        "</div>";
	    $("#gameCanvas").hide();
	    $("#gameContainer").append(el);
	});

	Pipin["Loader"] = Loader;

})();
