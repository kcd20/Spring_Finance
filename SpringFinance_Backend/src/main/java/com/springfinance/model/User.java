package com.springfinance.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name= "user")
public class User {
	@Id
	@Column(name="user_id")
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long userId;

	@Column(name = "first_name", length = 64)
	private String firstName;

	@Column(name = "last_name", length = 64)
	private String lastName;

	@Column(name = "information")
	private String additionalInformation;

	@Column(name = "age_type")
	private String ageType;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "email_address", length = 128)
	private String email;

	@Column(name = "password", length = 64)
	private String password;

	@Column(name="cash")
	private Double cash;

	@Column(name="risk_level")
	private String riskLevel;

	@Column(name= "interest_1")
	private String interest1;

	@Column(name = "interest_2")
	private String interest2;

	@Column(name = "interest_3")
	private String interest3;


	public Double getCash() {
		return cash;
	}

	public void setCash(Double cash) {
		this.cash = cash;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getAdditionalInformation() {
		return additionalInformation;
	}

	public void setAdditionalInformation(String additionalInformation) {
		this.additionalInformation = additionalInformation;
	}

	public String getAgeType() {
		return ageType;
	}

	public void setAgeType(String ageType) {
		this.ageType = ageType;
	}

	public String getRiskLevel() {
		return riskLevel;
	}

	public void setRiskLevel(String riskLevel) {
		this.riskLevel = riskLevel;
	}

	public String getInterest1() {
		return interest1;
	}

	public void setInterest1(String interest1) {
		this.interest1 = interest1;
	}

	public String getInterest2() {
		return interest2;
	}

	public void setInterest2(String interest2) {
		this.interest2 = interest2;
	}

	public String getInterest3() {
		return interest3;
	}

	public void setInterest3(String interest3) {
		this.interest3 = interest3;
	}

}
