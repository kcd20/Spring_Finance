package com.springfinance.service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.springfinance.model.StockWrapper;

import yahoofinance.YahooFinance;

@Service
public class StockService {
	
	
	public StockWrapper findStock(String symbol) {
		
		try {
			return new StockWrapper(YahooFinance.get(symbol));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		return null;
	}
	
	public List<StockWrapper> findStocks(List<String> symbols) {
		return symbols.stream().map(this::findStock).filter(Objects::nonNull).collect(Collectors.toList());
	}

}
