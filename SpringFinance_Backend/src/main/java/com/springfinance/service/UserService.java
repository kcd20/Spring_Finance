package com.springfinance.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springfinance.model.User;

@Service
public interface UserService {
	
	//Collection<T> findAll();
	//ResponseEntity<Collection<User>> findAllUserIDs();
	
	//ResponseEntity<Collection<User>> findAllUserIDs();
	
	//Optional<T> findById(Long id);
	
	
	public List<User> getAllUsers();
	
	User findUserByID(Long Id);
	
	public User saveUser(User user);
	
	public User changeUser(User user);

	User authenticate(String email, String pwd);

	Integer checkInvalidEmailForRegistration(String email);

	User findUserByIdAndPwd(Long uid, String Pwd);
	
	//T saveOrUpdate(T t);
}
