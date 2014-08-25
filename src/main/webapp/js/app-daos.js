var app = app || {};

(function($){
	brite.registerDao(new app.GroupDao());
	brite.registerDao(new app.ContactDao());
})();

