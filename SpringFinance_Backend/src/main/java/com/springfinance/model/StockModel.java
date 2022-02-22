package com.springfinance.model;

public class StockModel {
	
	private final String symbol;
	private final String name;
	private final String price;
	
	public StockModel(String symbol, String name, String price) {
		super();
		this.symbol = symbol;
		this.name = name;
		this.price = price;
	}

	public String getSymbol() {
		return symbol;
	}

	public String getName() {
		return name;
	}

	public String getPrice() {
		return price;
	}
	
	
	

}
