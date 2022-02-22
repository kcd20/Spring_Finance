package com.springfinance.controller;

import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.processing.RoundEnvironment;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springfinance.jsonparsehelper.Post;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springfinance.exception.ResourceNotFoundException;
import com.springfinance.model.Asset;
import com.springfinance.model.User;
import com.springfinance.model.WatchAsset;
import com.springfinance.repository.WatchAssetRepository;
import com.springfinance.service.StockService;
import com.springfinance.service.UserServiceImpl;

import yahoofinance.Stock;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/watchassets")
public class WatchlistController {
	
	@Autowired
    private UserServiceImpl uService;
	
	@Autowired
	private StockService sService;
	
	@Autowired
	private WatchAssetRepository wRepo;
	
	@GetMapping("/ggg/{id}")
	public WatchAsset getAsset(@PathVariable Integer id) {
		return null;
	}
	
	//get the watchlist
	@RequestMapping("/all")
	public List<WatchAsset> getWatchlist(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
        
        if(cookies != null) {
            UserSession userSession = new UserSession();
        	for(Cookie cookie : cookies) {
                if(cookie.getName().equals("userId")){
                    User userByID = uService.findUserByID(Long.parseLong(cookie.getValue()));
                    userSession.setUser(userByID);
                }
            }

            List<WatchAsset> wAssets = wRepo.findListByUserId(userSession.getUser().getUserId());
            for(WatchAsset wa: wAssets) {
//            	aquireClosePrice(wa);
            	
            Stock stock = sService.findStock(wa.getAssetName().toUpperCase()).getStock();
            BigDecimal latestPrice = stock.getQuote().getPrice();
            wa.setClosePrice(latestPrice.doubleValue());
            BigDecimal openPrice = stock.getQuote().getOpen();
            wa.setOpenPrice(openPrice.doubleValue());
            Double changeValue = latestPrice.doubleValue()-openPrice.doubleValue();
            Long changeValueR = Math.round(changeValue*100.0);
            Double changeValueD = changeValueR/100.0;
            wa.setChangeValue(changeValueD);
            Double changeRate = changeValue/openPrice.doubleValue()*100;
            Long changeRateR = Math.round(changeRate * 100.0);
            Double changeRateD = changeRateR/100.0;
            wa.setChangeRate(changeRateD);
//            wa.setUserId(userSession.getUser().getUserId());
//            wRepo.save(wa);	
            }
            //pre-sort the list with descending changeRate
            Collections.sort(wAssets, (w1,w2)->{return -w1.getChangeRate().compareTo(w2.getChangeRate());} );
            return wAssets;
    	}else {
    		List<WatchAsset> wAssets = wRepo.findAll();
    		for(WatchAsset wa: wAssets) {	
            Stock stock = sService.findStock(wa.getAssetName().toUpperCase()).getStock();
            BigDecimal latestPrice = stock.getQuote().getPrice();
            wa.setClosePrice(latestPrice.doubleValue());
            
            BigDecimal openPrice = stock.getQuote().getOpen();
            wa.setOpenPrice(openPrice.doubleValue());
            Double changeValue = latestPrice.doubleValue()-openPrice.doubleValue();
            Long changeValueR = Math.round(changeValue*100.0);
            Double changeValueD = changeValueR/100.0;
            wa.setChangeValue(changeValueD);
            Double changeRate = changeValue/openPrice.doubleValue()*100;
            Long changeRateR = Math.round(changeRate * 100.0);
            Double changeRateD = changeRateR/100.0;
            wa.setChangeRate(changeRateD);
            
            wRepo.save(wa);	
    		}
            return wRepo.findAll();
    	}
}
        
	//create new watchlist-asset
	@PostMapping("/add")
	public WatchAsset createWatchAsset(@RequestBody WatchAsset wAsset, HttpServletRequest request) {
		
		Cookie[] cookies = request.getCookies();
		if(cookies != null) {
			for(Cookie cookie : cookies){
	            if(cookie.getName().equals("userId")){
	                wAsset.setUserId(Long.parseLong(cookie.getValue()));
	            }
	        }
	        wAsset.setAddDate(LocalDate.now());
	        try {
	        	Stock stock = sService.findStock(wAsset.getAssetName().toUpperCase()).getStock();
	        	wAsset.setOpenPrice(stock.getQuote().getOpen().doubleValue());
	        	wAsset.setClosePrice(stock.getQuote().getPrice().doubleValue());
	        	return wRepo.save(wAsset);
	        }catch (Exception e) {
				return wAsset;
			}
		}
		else {
			wAsset.setAddDate(LocalDate.now());
	        try {
	        	Stock stock = sService.findStock(wAsset.getAssetName().toUpperCase()).getStock();
	        	wAsset.setOpenPrice(stock.getQuote().getOpen().doubleValue());
	        	wAsset.setClosePrice(stock.getQuote().getPrice().doubleValue());
	        	return wRepo.save(wAsset);
	        }catch (Exception e) {
	        	return wAsset;
			}
		}
	}
	
	
//	//get watchlist-asset by id
//	@PushMapping("/{wid}")
//	public ResponseEntity<WatchAsset> getWatchAssetbyId(@PathVariable Integer wid) {
//        WatchAsset wAsset = wRepo.findById(wid).
//                orElseThrow(() -> new ResourceNotFoundException("Asset does not exist with id: " + wid));
//        aquireClosePrice(wAsset);
//        return ResponseEntity.ok(wAsset);
//    }
	
	
	//delete watchlist-asset by id
	@DeleteMapping("/delete/{wid}")
	public ResponseEntity<Map<String, Boolean>> deleteWatchAsset(@PathVariable Integer wid){
        WatchAsset wAsset = wRepo.findById(wid).
                orElseThrow(() -> new ResourceNotFoundException("Asset does not exist with id: " + wid));

        wRepo.delete(wAsset);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
	
	
	
	//assign a watchAsset with the latest close/open price, change value and change rate
//		public static void aquireClosePrice(WatchAsset wa) {
//			try {
//				String url = "https://api.polygon.io/v2/aggs/ticker/" 
//						+ wa.getAssetName().toUpperCase() 
//						+ "/prev?adjusted=true&apiKey=jCqaugBgbCUrSZ_M3_iCLvAJBxuRW4Zu";
//				HttpClient client = HttpClient.newHttpClient();
//				HttpRequest request = HttpRequest.newBuilder()
//						.GET()
//						.header("accept", "application/json")
//						.uri(URI.create(url))
//						.build();
//				HttpResponse<String> result = client.send(request, HttpResponse.BodyHandlers.ofString());
//				ObjectMapper mapper = new ObjectMapper();
//				Post post = mapper.readValue(result.body(), new TypeReference<Post>() {});
//				//compare open & close prices for increment/decrement for demo purpose. (latest quote api require subscription)
//				wa.setOpenPrice(post.getResults().get(0).getO());
//				wa.setClosePrice(post.getResults().get(0).getC());
//				Double change = wa.getClosePrice() - wa.getOpenPrice();
//				Double rate = change/wa.getOpenPrice();
//				wa.setChangeValue(Math.round(change*100.0)/100.0);
//				wa.setChangeRate(Math.round(rate*1000000.0)/10000.0);
//			}catch (Exception e) {
//				wa.setOpenPrice(-1.0);
//				wa.setClosePrice(-1.0);
//				wa.setChangeValue(-1.0);
//				wa.setChangeRate(-1.0);
//			}
//		}

		
}
