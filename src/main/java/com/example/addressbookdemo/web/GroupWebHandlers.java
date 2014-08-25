package com.example.addressbookdemo.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;

import com.britesnow.snow.web.param.annotation.WebModel;
import com.britesnow.snow.web.param.annotation.WebParam;
import com.britesnow.snow.web.rest.annotation.WebGet;
import com.britesnow.snow.web.rest.annotation.WebPost;
import com.example.addressbookdemo.dao.ContactDao;
import com.example.addressbookdemo.dao.GroupDao;
import com.example.addressbookdemo.entity.Group;
import com.google.inject.Singleton;


@Singleton
public class GroupWebHandlers {

    @Inject
    private GroupDao groupDao;
    
    @Inject
    private ContactDao contactDao;

    @WebGet("/getGroup")
    public WebResponse getGroup(@WebModel Map m, @WebParam("id") Long id) {
    	Group group = groupDao.get(id);
		m.put("group", group);
		return WebResponse.success(m);
	}

    @WebGet("/listGroups")
    public WebResponse listGroups(@WebModel Map m) {
        List<Group> list = groupDao.list(0,1000, null,null);
        m.put("result", list);
    	return WebResponse.success(m);
    }
    
    @WebGet("/listGroupsForSelect")
    public WebResponse listGroupsForSelect(@WebModel Map m, @WebParam("contactId") Long contactId) {
        List<Group> list = groupDao.list(0,1000, null,null);
        List<Group> selectedList = groupDao.getGroupsByContact(contactId);
        List<Map> selectGroups = new ArrayList();
        for(Group group : list){
            Map map = new HashMap();
            boolean have = false;
            for(Group  groupSelect: selectedList){
                if(groupSelect.getId().equals(group.getId())){
                	have = true;
                    break;
                }
            }
            map.put("id", group.getId());
            map.put("name", group.getName());
            if (have) {
                map.put("selected", true);
            }
            selectGroups.add(map);
        }
        m.put("result", selectGroups);
    	return WebResponse.success(m);
    }
    
    @WebPost("/saveGroup")
    public WebResponse saveGroup(@WebParam("id") Long id,@WebParam("name") String name) {
    	Group group = groupDao.get(id);
        if (group == null) {
        	group = new Group();
        }
        group.setName(name);
        try {
        	groupDao.save(group);
            return WebResponse.success(group);
        } catch (Exception e) {
        	e.printStackTrace();
        	return WebResponse.fail(e);
        } 
    }
    
    @WebPost("/deleteGroup")
    public WebResponse deleteGroup(@WebParam("id") Long id) {
    	contactDao.removeContactGroups(id);
    	Group group = groupDao.get(id);
    	groupDao.delete(group);
    	return WebResponse.success(id);
    }
}
