var app = app || {};

Handlebars.templates = Handlebars.templates || {};  
function render(templateName,data){
	var tmpl = Handlebars.templates[templateName];
  	if (!tmpl){
    	tmpl = Handlebars.compile($("#" + templateName).html());
    	Handlebars.templates[templateName] = tmpl;
  	}
  	return tmpl(data);
}

app.render = render;

(function($){
	var host = contextPath;
	app.restURL = host;
	
	app.ajaxRequest = function(url, params,method) {
		var dfd = $.Deferred();
		params = params || {};
		jQuery.ajax({
			type : method ? method : "GET",
			url : url,
			async : true,
			data : params,
			dataType : "json"
		}).success(function(data) {
			dfd.resolve(data);
		}).fail(function(){
			console.log("----have exception------");
		});
		return dfd.promise();
	}
})(jQuery);

