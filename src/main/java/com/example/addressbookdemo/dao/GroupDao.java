package com.example.addressbookdemo.dao;

import java.util.List;

import com.example.addressbookdemo.entity.Group;
import com.google.inject.Singleton;

@Singleton
public class GroupDao extends BaseHibernateDao<Group> {

	public List<Group> getGroupsByContact(Long contactId){
        List<Group>  list = null;
        if(contactId != null){
            list = (List<Group>) daoHelper.find(0,100,"select o from Group o, ContactGroup contactGroup where o.id = contactGroup.group_id and contactGroup.contact_id= ? ", contactId);
        }else{
            list = (List<Group>) daoHelper.find(0,100,"select o from Group o");
        }
        return list;
    }
}


