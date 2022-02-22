package com.springfinance.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.springfinance.model.User;
import com.springfinance.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
	
	@Resource
	private UserRepository uRepo;

	
	@Override
	@Transactional
	public List<User> getAllUsers(){
		return uRepo.findAll();
	}
	
	@Override
	@Transactional
	public User findUserByID(Long Id) {
		return uRepo.findTheUserByID(Id);
	}
	
    @Override
    @Transactional
    public User saveUser(User user) {
        return uRepo.saveAndFlush(user);
    }

    @Override
    @Transactional
    public User changeUser(User user){
        return uRepo.saveAndFlush(user);
    }

	@Override
	@Transactional
	public User authenticate(String email, String pwd) {
		return uRepo.findUserByEmailPwd(email, pwd);
	}

	@Override
	public Integer checkInvalidEmailForRegistration(String email) {
		return uRepo.checkInvalidEmailForRegistration(email);
	}

	@Override
	public User findUserByIdAndPwd(Long uid, String Pwd) {
		return uRepo.findUserByIdAndPwd(uid,Pwd);
	}


//	@Override
//	@Transactional
//	public ResponseEntity<User> findById(Long id){
//		return new ResponseEntity<>(userService.findById(id).get(), HttpStatus.OK);
//	}
//	
//	
//	@Override
//	@Transactional
//	public User findUserByID(Double Id) {
//		return uRepo.findTheUserByID(Id);
//	}
//	
//    @Override
//    @Transactional
//    public User createUser(User user) {
//        return uRepo.saveAndFlush(user);
//    }
//
//    @Override
//    @Transactional
//    public User changeUser(User user){
//        return uRepo.saveAndFlush(user);
//    }

}
