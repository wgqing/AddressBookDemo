(function($) {
	var groupDao = brite.dao("Group");
	brite.registerView("GroupSave", {
		loadTmpl : true,
		parent:"#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			var dfd = $.Deferred();
			var createDfd = $.Deferred();
			data = data || {};
			view.$notTransparentScreen = $("<div class='notTransparentScreen'></div>").appendTo("#bodyPage");
			if(data.id){
				groupDao.getGroup({id:data.id}).done(function(data) {
					dfd.resolve(data.group);
				});
			}else{
				dfd.resolve({});
			}
			dfd.done(function(group){
				view.groupId = group.id;
				var html = app.render("tmpl-GroupSave",group);
				var $e = $(html);
				createDfd.resolve($e);
			});
			return createDfd.promise();
		},
		
		events:{
			"btap;.btnClose":function(){
				var view = this;
				view.close();
			},
			
			"btap;.btnCreate":function(){
				var view = this;
				saveGroup.call(view);
			},
		},
		
		close : function() {
			var view = this;
			var $e = view.$el;
			$e.bRemove();
			view.$notTransparentScreen.remove();
		}
	});

	function saveGroup(){
		var view = this;
		var $e = view.$el;
		var name = $e.find("input[name='name']").val();
		if(name.length == 0){name = "No Name";}
		var data = {name : name};
		if(view.groupId){
			data.id = view.groupId;
		}
		groupDao.saveGroup(data).done(function(){
			view.close();
		});
	}
})(jQuery);
