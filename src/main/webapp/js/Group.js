(function ($) {
	var groupDao = brite.dao("Group");
    brite.registerView("Group",  {loadTmpl:true,emptyParent:true}, {
        create:function (data, config) {
        	var dfd = $.Deferred();
        	groupDao.listGroups().done(function(val){
        		var html = app.render("tmpl-Group",{groups:val});
        		var $e = $(html);
        		dfd.resolve($e);
        	});
        	return dfd.promise();
        },
        
        events: {
        	"click; .btnCreate": function(e){
				brite.display("GroupSave", null, {});
			},
			"click; .btnEdit": function(e){
				var view = this;
				var $e = view.$el;
				var $target = $(e.currentTarget);
				var id = $target.closest("li").attr("data-obj.id");
				brite.display("GroupSave",null, {id:id});
			},
			"click; .btnDelete": function(e){
				var view = this;
				var $e = view.$el;
				var $target = $(e.currentTarget);
				var id = $target.closest("li").attr("data-obj.id");
				groupDao.deleteGroup(id);
			},
			"click; .name": function(e){
				var view = this;
				var $e = view.$el;
				var $target = $(e.currentTarget);
				var id = $target.closest("li").attr("data-obj.id");
				$target.closest(".panel-content").find("li .name").each(function(){
					var $li = $(this);
					$li.removeClass("selected");
				})
				$target.addClass("selected");
				
				brite.display("Contact","#contactList", {id:id});
			}
        },
        
        daoEvents:{
			"dataChange;Group" : function() {
				var view = this;
				refreshPage.call(view);
			}
		}
    });
    
    function refreshPage(){
    	var view = this;
    	brite.display("Group","#groupList");
    	brite.display("Contact","#contactList",{});
    }

})(jQuery);

