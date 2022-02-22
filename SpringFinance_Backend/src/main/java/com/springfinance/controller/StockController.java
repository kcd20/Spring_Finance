package com.springfinance.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springfinance.model.StockModel;
import com.springfinance.service.StockService;

import yahoofinance.Stock;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api")
public class StockController {
	
	@Autowired
	StockService stockService;
	
	@GetMapping("/getStock/{symbol}")
	List<StockModel> getStocks(@PathVariable(value = "symbol") String symbol) {
		List<StockModel> stocks = new ArrayList<>();
		
		/*
		 * List<String> symbolArr = new ArrayList<>(); symbolArr.add(symbol);
		 */
		
		Stock stock = stockService.findStock(symbol).getStock();
		StockModel stockModel = new StockModel(symbol, stock.getName(), stock.getQuote().getPrice().toString());
		stocks.add(stockModel);

		return stocks;
	}

}
