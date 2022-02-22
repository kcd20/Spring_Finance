package com.springfinance.model;

import java.time.LocalDateTime;

import yahoofinance.Stock;

public class StockWrapper {
	
	private final Stock stock;
	private final LocalDateTime lastAccess;
	
	public StockWrapper(Stock stock) {
		this.stock= stock;
		this.lastAccess = LocalDateTime.now();
	}
	
	
	public StockWrapper(Stock stock, LocalDateTime lastAccess) {
		super();
		this.stock = stock;
		this.lastAccess = lastAccess;
	}


	public LocalDateTime getLastAccess() {
		return lastAccess;
	}
	
	public Stock getStock() {
		return stock;
	}
	
//	public StockWrapper withLastAccess (LocalDateTime lastAccess) {
//		return this.lastAccess == lastAccess ? this : new StockWrapper(this.stock, this.lastAccess);
//	}
}
