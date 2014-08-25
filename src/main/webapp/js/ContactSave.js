(function($) {
	var contactDao = brite.dao("Contact");
	brite.registerView("ContactSave", {
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
				contactDao.getContact({id:data.id}).done(function(data) {
					dfd.resolve(data.contact);
				});
			}else{
				dfd.resolve({});
			}
			dfd.done(function(contact){
				view.contactId = contact.id;
				var html = app.render("tmpl-ContactSave",contact);
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
				saveContact.call(view);
			},
		},
		
		close : function() {
			var view = this;
			var $e = view.$el;
			$e.bRemove();
			view.$notTransparentScreen.remove();
		}
	});

	function saveContact(){
		var view = this;
		var $e = view.$el;
		var name = $e.find("input[name='name']").val();
		var address = $e.find("input[name='address']").val();
		var phoneNum = $e.find("input[name='phoneNum']").val();
		if(name.length == 0){name = "No Name";}
		if(address.length == 0){address = "No Address";}
		if(phoneNum.length == 0){phoneNum = "No Phone";}
		var data = {name:name, phoneNum:phoneNum, address:address};
		if(view.contactId){
			data.id = view.contactId;
		}
		contactDao.saveContact(data).done(function(){
			view.close();
		});
	}
})(jQuery);
