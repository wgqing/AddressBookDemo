<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>AddressBookDemo</title>
    
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/bootstrap/css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/bootstrap/css/bootstrap-responsive.css" />
    <link rel="stylesheet" type="text/css" href="${_r.contextPath}/css/main.css">
    
    <script type="text/javascript">
        var contextPath = "${_r.contextPath}";
    </script>
	
	<script type="text/javascript" src="${_r.contextPath}/js/jquery.min.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/brite-snapshot.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/handlebars-v1.3.0.js"></script>  
    <script type="text/javascript" src="${_r.contextPath}/js/dao-ContactDao.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/dao-GroupDao.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/app-daos.js"></script>
    
    <script type="text/javascript" src="${_r.contextPath}/js/app.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/MainView.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/Group.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/Contact.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/GroupSave.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/ContactSave.js"></script>
    <script type="text/javascript" src="${_r.contextPath}/js/ContactGroup.js"></script>
    
    <script type="text/javascript">
      	brite.viewDefaultConfig.loadTmpl = true;
		brite.viewDefaultConfig.loadCss = true;
    </script>
    	
  </head>

  <body>
  	<div id="bodyPage">
  		<div id="top">
  			<h2>Address Book Demo</h2>
  		</div>
  		<div id="content"></div>
  	</div>
  	<script type="text/javascript">
		$(function(){
			brite.display("MainView","#content");
		});
	</script>
  </body>
</html>