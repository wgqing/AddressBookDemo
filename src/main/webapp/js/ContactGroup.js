(function ($) {
	var groupDao = brite.dao("Group");
	var contactDao = brite.dao("Contact");
    brite.registerView("ContactGroup",  {loadTmpl:true,parent:"#bodyPage"}, {
        create:function (data, config) {
        	var view = this;
        	var dfd = $.Deferred();
        	view.contactId = data.id;
        	view.contactName = data.name;
        	view.$notTransparentScreen = $("<div class='notTransparentScreen'></div>").appendTo("#bodyPage");
        	groupDao.listGroupsForSelect(view.contactId).done(function(val){
        		var html = app.render("tmpl-ContactGroup",{groups:val, contactName:view.contactName});
        		var $e = $(html);
        		dfd.resolve($e);
        	});
        	return dfd.promise();
        },
        
        events: {
        	"btap; .btnCreate": function(e){
        		var view = this;
        		var $e = view.$el;
				var groupsIds = [];
				$e.find("input[name='groupId']:checked").each(function() {
					groupsIds.push($(this).val());
				});
				contactDao.updateContactGroups(view.contactId, groupsIds).done(function(){
					view.close();
				});
			},
			"btap;.btnClose":function(){
				var view = this;
				view.close();
			}
        },
        
        daoEvents:{
			"dataChange; Contact" : function() {
				var view = this;
				refreshPage.call(view);
			}
		},
		
		close : function() {
			var view = this;
			var $e = view.$el;
			$e.bRemove();
			view.$notTransparentScreen.remove();
		}
    });
    
    function refreshPage(){
    	var view = this;
    	brite.display("Contact","#contactList",{});
    }

})(jQuery);

