package com.springfinance.controller;

import com.springfinance.exception.UserNotFound;
import com.springfinance.model.User;
import com.springfinance.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * @Author Fusheng Tan
 * @Version 1.0
 */

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/authentication")
public class CommonController {

    @Autowired
    private UserServiceImpl uService;

    @RequestMapping("/robots.txt")
    @ResponseBody
    public String robots() {
        return "User-agent: *\n" +
            "Disallow: /";
    }
    @PostMapping("/login")
    public User login(@RequestBody User user, HttpServletResponse response, HttpServletRequest request) throws NoSuchAlgorithmException {
        UserSession usession = new UserSession();

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
        User authUser = uService.authenticate(user.getEmail(),  pwd2 );
        if (authUser==null){
            return null;
        }
        System.out.println(authUser);
        usession.setUser(authUser);
        // Store userId
        Cookie cookie = new Cookie("userId", String.valueOf(authUser.getUserId()));
        cookie.setPath(request.getContextPath());
        cookie.setPath("/");
        cookie.setSecure(false);
        cookie.setMaxAge(60*60*24*30);
        response.addCookie(cookie);
        // Store firstName
        Cookie cookie2 = new Cookie("userName", authUser.getFirstName());
        cookie2.setPath(request.getContextPath());
        cookie2.setPath("/");
        cookie2.setSecure(false);
        cookie2.setMaxAge(60*60*24*30);
        response.addCookie(cookie2);
        // Store credential
        Cookie cookie3 = new Cookie("credential", authUser.getPassword());
        cookie3.setPath(request.getContextPath());
        cookie3.setPath("/");
        cookie3.setSecure(false);
        cookie3.setMaxAge(60*60*24*30);
        response.addCookie(cookie3);
        System.out.println("Login successfully!");
        return authUser;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) throws NoSuchAlgorithmException {
        // Check if the user's email is already registered,if yes, reject the request
        if(uService.checkInvalidEmailForRegistration(user.getEmail())==1) return null;
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
        uService.saveUser(user);
        return user;
    }

    @PostMapping("/login/android")
    public User loginAndroid(@RequestBody User user) throws NoSuchAlgorithmException {
        UserSession usession = new UserSession();
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

        User authUser = uService.authenticate(user.getEmail(), pwd2);
        if (authUser==null){
            throw new UserNotFound("user does not exist");
        }
        System.out.println(authUser);
        usession.setUser(authUser);
        return authUser;
    }
}
