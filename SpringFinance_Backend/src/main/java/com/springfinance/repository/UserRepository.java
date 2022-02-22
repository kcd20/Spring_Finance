package com.springfinance.repository;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springfinance.model.User;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	@Query("SELECT DISTINCT u.userId FROM User u")
	ArrayList<String> findAllUserIDs();

	@Query("SELECT DISTINCT u FROM User u WHERE u.userId=:uid")
	User findTheUserByID(@Param("uid")Long uid);

	@Query("select u from User u where u.email=:email and u.password=:pwd")
	User findUserByEmailPwd(@Param("email")String email, @Param("pwd")String Pwd);

	@Query("select count(u) from User u where u.email=:email")
	Integer checkInvalidEmailForRegistration(@Param("email")String email);

	@Query("select u from User u where u.userId=:uid and u.password=:pwd")
	User findUserByIdAndPwd(@Param("uid")Long uid, @Param("pwd")String Pwd);
}
