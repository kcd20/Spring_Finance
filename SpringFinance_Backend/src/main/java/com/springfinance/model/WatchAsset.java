package com.springfinance.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class WatchAsset {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer watchAssetId;
	
	private String assetName;
	private LocalDate addDate;
	private Double openPrice = -1.0;
	private Double closePrice = -1.0;
	private Double changeValue = 0.0;
	private Double changeRate = 0.0;
	private Long userId;
	
	public WatchAsset() {}

	public Integer getWatchAssetId() {
		return watchAssetId;
	}

	public void setWatchAssetId(Integer watchAssetId) {
		this.watchAssetId = watchAssetId;
	}

	public String getAssetName() {
		return assetName;
	}

	public void setAssetName(String assetName) {
		this.assetName = assetName;
	}

	public LocalDate getAddDate() {
		return addDate;
	}

	public void setAddDate(LocalDate addDate) {
		this.addDate = addDate;
	}

	public Double getClosePrice() {
		return closePrice;
	}

	public void setClosePrice(Double closePrice) {
		this.closePrice = closePrice;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Double getOpenPrice() {
		return openPrice;
	}

	public void setOpenPrice(Double openPrice) {
		this.openPrice = openPrice;
	}

	public Double getChangeValue() {
		return changeValue;
	}

	public void setChangeValue(Double changeValue) {
		this.changeValue = changeValue;
	}

	public Double getChangeRate() {
		return changeRate;
	}

	public void setChangeRate(Double changeRate) {
		this.changeRate = changeRate;
	}
	
	
	
}