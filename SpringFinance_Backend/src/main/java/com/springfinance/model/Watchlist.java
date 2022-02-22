package com.springfinance.model;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class Watchlist {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long watchlistId;
	private String assetName;
	private Double holdings;
	
	public Long getWatchlistId() {
		return watchlistId;
	}
	public void setWatchlistId(Long watchlistId) {
		this.watchlistId = watchlistId;
	}
	public String getAssetName() {
		return assetName;
	}
	public void setName(String assetName) {
		this.assetName = assetName;
	}
	public Double getHoldings() {
		return holdings;
	}
	public void setHoldings(Double holdings) {
		this.holdings = holdings;
	}
}
