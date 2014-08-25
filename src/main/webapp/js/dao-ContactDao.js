var app = app || {};

(function($){
	function ContactDao(){
		this._entityType = "Contact";
	}
	
	ContactDao.prototype.entityType = function () {
        return this._entityType;
    };
	
	ContactDao.prototype.saveContact = function(data){
		var dao = this;
		return app.ajaxRequest(app.restURL + "/saveContact",data,"POST").pipe(function(val) {
 			return val.result;
		});
	}
	
	ContactDao.prototype.deleteContact = function(id){
		var dao = this;
		return app.ajaxRequest(app.restURL + "/deleteContact",{id:id},"POST").pipe(function(val) {
			return val.result;
		});
	}
	
	ContactDao.prototype.getContact = function(data){
		var dao = this;
		return app.ajaxRequest(app.restURL + "/getContact",data).pipe(function(val) {
			return val.result;
		});
	}
	ContactDao.prototype.listAllContacts = function(){
		var data = {};
		return app.ajaxRequest(app.restURL + "/listAllContacts",data).pipe(function(val) {
			var resultSet = val.result.result;
			return resultSet;
		});
	}
	
	ContactDao.prototype.getContactsByGroup = function(data){
		return app.ajaxRequest(app.restURL + "/getContactsByGroup",data).pipe(function(val) {
			var resultSet = val.result.result;
			return resultSet;
		});
	}
	
	ContactDao.prototype.updateContactGroups = function(contactId, selectedGroupIds){
		var data = {};
		data.contactId = contactId;
		var groupIds = "";
		for(var i = 0; i < selectedGroupIds.length; i++){
			groupIds += selectedGroupIds[i];
			if(i < selectedGroupIds.length-1){
				groupIds += ",";
			}
		}
		data.selectedGroupIds = groupIds;
		return app.ajaxRequest(app.restURL + "/updateContactGroups",data,"POST").pipe(function(val) {
 			return val.result;
		});
	}
	
	ContactDao.prototype.isDataChange = function(methodName){
		if(methodName == "saveContact" || methodName == "deleteContact" || methodName == "updateContactGroups"){
			return true;
		}
		return false;
	}
	
	app.ContactDao = ContactDao;
})(jQuery);