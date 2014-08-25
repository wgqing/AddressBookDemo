package com.example.addressbookdemo.dao;

import java.util.ArrayList;
import java.util.List;

import com.example.addressbookdemo.entity.ContactGroup;
import com.example.addressbookdemo.entity.Contact;
import com.google.inject.Singleton;

@Singleton
public class ContactDao extends BaseHibernateDao<Contact> {
    
	public List<Contact> getContactsByGroup(Long groupId){
        List<Contact>  list = null;
        if(groupId != null){
            list = (List<Contact>) daoHelper.find(0,100,"select o from Contact o, ContactGroup contactGroup where o.id = contactGroup.contact_id and contactGroup.group_id= ? ", groupId);
        }else{
            list = (List<Contact>) daoHelper.find(0,100,"select o from Contact o");
        }
        return list;
    }
	
	public void updateContactGroups(Long contactId, Long[] selectGroupIds){
        List<ContactGroup>  selectGroups = (List<ContactGroup>) daoHelper.find(0,100,"from ContactGroup o where o.contact_id= ? ", contactId);
        List removeList = new ArrayList();
        for(ContactGroup contactGroup : selectGroups){
            boolean isHave = false;
            for(Long selectedId : selectGroupIds){
                if(contactGroup.getGroup_id().equals(selectedId)){
                	isHave = true;
                    break;
                }
            }
            if(!isHave){
                removeList.add(contactGroup);
            }
        }
        List addList = new ArrayList();
        for(Long selectedId : selectGroupIds){
            boolean isHave = false;
            for(ContactGroup contactGroup : selectGroups){
                if(contactGroup.getGroup_id().equals(selectedId)){
                	isHave = true;
                    break;
                }
            }
            if(!isHave){
            	ContactGroup contactGroup = new ContactGroup();
            	contactGroup.setContact_id(contactId);
            	contactGroup.setGroup_id(selectedId);
                addList.add(contactGroup);
            }
        }
        daoHelper.deleteEntities(removeList);
        daoHelper.saveEntities(addList);
    }
	
	public void removeContactGroups(Long grouptId){
        List<ContactGroup>  removeList = (List<ContactGroup>) daoHelper.find(0,100,"from ContactGroup o where o.group_id= ? ", grouptId);
        daoHelper.deleteEntities(removeList);
    }
}
