;(function() {
    (function ($) {
        brite.registerView("MainView",  {loadTmpl:true,emptyParent:true}, {
            create:function (data, config) {
            	var html = app.render("tmpl-MainView",data);
            	return $(html);
            },
            postDisplay:function (data, config) {
                brite.display("Group","#groupList");
                brite.display("Contact","#contactList",{});
            }
        });
    })(jQuery);
})();
