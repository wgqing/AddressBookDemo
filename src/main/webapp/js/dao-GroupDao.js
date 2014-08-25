var app = app || {};

(function($){
	function GroupDao(){
		this._entityType = "Group";
	}
	
	GroupDao.prototype.entityType = function () {
        return this._entityType;
    };
	
	GroupDao.prototype.saveGroup = function(data){
		var dao = this;
		return app.ajaxRequest(app.restURL + "/saveGroup",data,"POST").pipe(function(val) {
 			return val.result;
		});
	}
	
	GroupDao.prototype.deleteGroup = function(id){
		var dao = this;
		return app.ajaxRequest(app.restURL + "/deleteGroup",{id:id},"POST").pipe(function(val) {
			return val.result;
		});
	}
	
	GroupDao.prototype.getGroup = function(data){
		var dao = this;
		return app.ajaxRequest(app.restURL + "/getGroup",data).pipe(function(val) {
			return val.result;
		});
	}
	GroupDao.prototype.listGroups = function(){
		var data = {};
		return app.ajaxRequest(app.restURL + "/listGroups",data).pipe(function(val) {
			var resultSet = val.result.result;
			return resultSet;
		});
	}
	GroupDao.prototype.listGroupsForSelect = function(contactId){
		return app.ajaxRequest(app.restURL + "/listGroupsForSelect",{contactId:contactId}).pipe(function(val) {
			var resultSet = val.result.result;
			return resultSet;
		});
	}
	
	GroupDao.prototype.isDataChange = function(methodName){
		if(methodName == "saveGroup" || methodName == "deleteGroup"){
			return true;
		}
		return false;
	}
	
	app.GroupDao = GroupDao;
})(jQuery);