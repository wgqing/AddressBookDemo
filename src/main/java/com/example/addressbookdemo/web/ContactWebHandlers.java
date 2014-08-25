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
import com.example.addressbookdemo.entity.Contact;
import com.example.addressbookdemo.entity.Group;
import com.google.inject.Singleton;


@Singleton
public class ContactWebHandlers {

    @Inject
    private ContactDao contactDao;
    
    @Inject
    private GroupDao groupDao;
    
    @WebGet("/getContact")
    public WebResponse getContact(@WebModel Map m, @WebParam("id") Long id) {
    	Contact contact = contactDao.get(id);
		m.put("contact", contact);
		return WebResponse.success(m);
	}

    @WebGet("/listAllContacts")
    public WebResponse listAllContacts(@WebModel Map m) {
        List<Contact> list = contactDao.list(0,100, null,null);
        List<Map> listMap = new ArrayList();
        for(Contact contact : list){
            Map map = new HashMap();
            List<Group> groupList = groupDao.getGroupsByContact(contact.getId());
            map.put("id", contact.getId());
            map.put("name", contact.getName());
            map.put("address", contact.getAddress());
            map.put("phoneNum", contact.getPhoneNum());
            List<Map> selectGroups = new ArrayList();
            for(Group group : groupList){
            	Map ma = new HashMap();
            	ma.put("id", group.getId());
            	ma.put("name", group.getName());
            	selectGroups.add(ma);
            }
            map.put("groups", selectGroups);
            listMap.add(map);
        }
        m.put("result", listMap);
    	return WebResponse.success(m);
    }
    
    @WebGet("/getContactsByGroup")
    public WebResponse getContactsByGroup(@WebModel Map m, @WebParam("groupId") Long groupId) {
    	List<Contact> list = contactDao.getContactsByGroup(groupId);
    	List<Map> listMap = new ArrayList();
        for(Contact contact : list){
            Map map = new HashMap();
            List<Group> groupList = groupDao.getGroupsByContact(contact.getId());
            map.put("id", contact.getId());
            map.put("name", contact.getName());
            map.put("address", contact.getAddress());
            map.put("phoneNum", contact.getPhoneNum());
            List<Map> selectGroups = new ArrayList();
            for(Group group : groupList){
            	Map ma = new HashMap();
            	ma.put("id", group.getId());
            	ma.put("name", group.getName());
            	selectGroups.add(ma);
            }
            map.put("groups", selectGroups);
            listMap.add(map);
        }
        m.put("result", listMap);
    	return WebResponse.success(m);
    }
    
    @WebPost("/saveContact")
    public WebResponse saveContact(@WebParam("id") Long id,@WebParam("name") String name,@WebParam("phoneNum") String phoneNum,@WebParam("address") String address) {
    	Contact contact = contactDao.get(id);
        if (contact == null) {
        	contact = new Contact();
        }
        contact.setName(name);
        contact.setPhoneNum(phoneNum);
        contact.setAddress(address);
        try {
        	contactDao.save(contact);
            return WebResponse.success(contact);
        } catch (Exception e) {
        	e.printStackTrace();
        	return WebResponse.fail(e);
        } 
    }
    
    @WebPost("/deleteContact")
    public WebResponse deleteContact(@WebParam("id") Long id) {
    	Contact contact = contactDao.get(id);
    	contactDao.delete(contact);
    	return WebResponse.success(id);
    }
    
    @WebPost("/updateContactGroups")
    public void updateContactGroups(@WebParam("contactId") Long contactId, @WebParam("selectedGroupIds") String selectedGroupIds) {
    	if(selectedGroupIds != null && !selectedGroupIds.equals("")){
    		String[] groupIds = selectedGroupIds.split(",");
            Long[] ids = new Long[groupIds.length];
            for(int i = 0; i < groupIds.length; i++){
                ids[i] = Long.parseLong(groupIds[i]); 
            }
            contactDao.updateContactGroups(contactId, ids);
    	}
    }
}
