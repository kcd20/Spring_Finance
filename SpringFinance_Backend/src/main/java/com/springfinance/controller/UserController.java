package com.springfinance.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.springfinance.model.Asset;
import com.springfinance.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springfinance.model.User;
import com.springfinance.repository.UserRepository;
import com.springfinance.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

	@Autowired
	private UserServiceImpl uService;

	@Autowired
	private UserRepository uRepo;

	@Autowired
	public UserController(UserRepository userRepository) {
		this.uRepo = userRepository;
	}

	// get userinfo
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable Long id) {
		return ResponseEntity.ok(this.uService.findUserByID(id));

	}

	// update userinfo
	@PutMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user, HttpServletRequest request) {
		User userByID = uService.findUserByID(id);
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("userId")) {
					userByID.setUserId(Long.parseLong(cookie.getValue()));
				}
			}
		}
		userByID.setFirstName(user.getFirstName());
		userByID.setLastName(user.getLastName());
		userByID.setAgeType(user.getAgeType());
		userByID.setCash(user.getCash());
		userByID.setRiskLevel(user.getRiskLevel());
		userByID.setInterest1(user.getInterest1());
		userByID.setInterest2(user.getInterest2());
		userByID.setInterest3(user.getInterest3());
		userByID.setAdditionalInformation(user.getAdditionalInformation());

		User updateUser = uRepo.saveAndFlush(userByID);
		return ResponseEntity.ok(updateUser);
	}

	@PutMapping("/resetPassword/{id}")
	public ResponseEntity<User> updateUserPassword(@PathVariable Long id, @RequestBody User user, HttpServletRequest request) throws NoSuchAlgorithmException {
		User userByID = uService.findUserByID(id);
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("userId")) {
					userByID.setUserId(Long.parseLong(cookie.getValue()));
				}
			}
		}
		MessageDigest md= MessageDigest.getInstance("MD5");
		String pwd = user.getPassword();
		byte[] b1=pwd.getBytes();
		// After Encryption
		byte[] b2=md.digest(b1);
		String pwd2="";
		//Convert bytes to hexadecimal
		for(byte i: b2){
			String s = Integer.toHexString(i & 0xff);
			if(s.length()==1){
				s ="0"+s;
			}
			pwd2 +=s;
		}
		// passwords after Encryption and changed to hexadecimal
		pwd2 = pwd2.toUpperCase();
		user.setPassword(pwd2);

		userByID.setPassword(user.getPassword());
		User updateUser = uRepo.saveAndFlush(userByID);
		return ResponseEntity.ok(updateUser);
	}


	@PutMapping("/verify")
	public ResponseEntity<User> verifyPassword( @RequestBody User user) throws NoSuchAlgorithmException {
		MessageDigest md= MessageDigest.getInstance("MD5");
		String pwd = user.getPassword();
		byte[] b1=pwd.getBytes();
		// After Encryption
		byte[] b2=md.digest(b1);
		String pwd2="";
		//Convert bytes to hexadecimal
		for(byte i: b2){
			String s = Integer.toHexString(i & 0xff);
			if(s.length()==1){
				s ="0"+s;
			}
			pwd2 +=s;
		}
		// passwords after Encryption and changed to hexadecimal
		pwd2 = pwd2.toUpperCase();
		user.setPassword(pwd2);
		return ResponseEntity.ok(user);
	}




	@PostMapping("/add")
	public String createUser(@RequestBody User user) {
		User savedUser = uService.saveUser(user);
		return "forward:/user";
	}


	@GetMapping("/getAll")
	public List<User> getAllUsers(){
		return uService.getAllUsers();
	}

	@PostMapping("/create")
	public User makeUser(@RequestBody User user) throws NoSuchAlgorithmException {
        MessageDigest md= MessageDigest.getInstance("MD5");
        String pwd = user.getPassword();
        byte[] b1=pwd.getBytes();
        // After Encryption
        byte[] b2=md.digest(b1);
        String pwd2="";
        //Convert bytes to hexadecimal
        for(byte i: b2){
            String s = Integer.toHexString(i & 0xff);
            if(s.length()==1){
                s ="0"+s;
            }
            pwd2 +=s;
        }
        // passwords after Encryption and changed to hexadecimal
        pwd2 = pwd2.toUpperCase();
        user.setPassword(pwd2);
		User savedUser = uService.saveUser(user);
		return savedUser;
	}
	
	@PostMapping("/android/update")
	public User updateTheUser(@RequestBody User user){
		User savedUser = uService.saveUser(user);
		return savedUser;
	}

	@GetMapping("/android/{id}")
	public User getTheUser(@PathVariable Long id) {
		return uRepo.findTheUserByID(id);
	}
	

}
