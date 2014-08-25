(function ($) {
	var contactDao = brite.dao("Contact");
    brite.registerView("Contact",  {loadTmpl:true,emptyParent:true}, {
        create:function (data, config) {
        	var dfd = $.Deferred();
        	var groupId = data.id || "all";
        	if(groupId == "all"){
        		contactDao.listAllContacts().done(function(val){
	        		var html = app.render("tmpl-Contact",{contacts:val});
	        		var $e = $(html);
	        		dfd.resolve($e);
	        	});
        	}else{
        		contactDao.getContactsByGroup({groupId: groupId}).done(function(val){
	        		var html = app.render("tmpl-Contact",{contacts:val});
	        		var $e = $(html);
	        		dfd.resolve($e);
	        	});
        	}
        	return dfd.promise();
        },
        
        events: {
        	"click; .btnCreate": function(e){
				brite.display("ContactSave", null, {});
			},
			"click; .btnEdit": function(e){
				var $target = $(e.currentTarget);
				var id = $target.closest("li").attr("data-obj.id");
				brite.display("ContactSave",null, {id:id});
			},
			"click; .btnDelete": function(e){
				var $target = $(e.currentTarget);
				var id = $target.closest("li").attr("data-obj.id");
				contactDao.deleteContact(id);
			},
			"click; .btnAddGroups": function(e){
				var $target = $(e.currentTarget);
				var id = $target.closest("li").attr("data-obj.id");
				var name = $target.closest("li").attr("data-obj.name");
				brite.display("ContactGroup",null, {id:id, name:name});
			}
        },
        
        daoEvents:{
			"dataChange;Contact" : function() {
				var view = this;
				refreshPage.call(view);
			}
		}
    });
    
    function refreshPage(){
    	var view = this;
    	brite.display("Contact","#contactList",{});
    }

})(jQuery);

