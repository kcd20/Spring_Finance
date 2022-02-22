package com.springfinance.controller;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import static java.util.Map.entry;
import java.util.stream.Collectors;
import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;

import com.springfinance.model.User;
import com.springfinance.service.UserServiceImpl;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rometools.rome.feed.synd.SyndFeed;
import com.rometools.rome.io.FeedException;
import com.rometools.rome.io.SyndFeedInput;
import com.rometools.rome.io.XmlReader;
import com.springfinance.exception.ResourceNotFoundException;
import com.springfinance.model.Asset;
import com.springfinance.repository.AssetRepository;
import com.springfinance.service.StockService;

import yahoofinance.Stock;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/assets")
public class AssetController {
    @Autowired
    private Environment env;

    @Autowired
    private AssetRepository aRepository;

    @Autowired
    private StockService stockService;

    @Autowired
    private UserServiceImpl uService;

    //@Autowired
    //private RefreshStockService refreshStockService;

    //get all assets
    @GetMapping("")
    public List<Asset> getAllAssets (HttpServletRequest request){
        // List<Asset> assets = aRepository.findAll();
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            UserSession userSession = new UserSession();
            System.out.println("Cookies:"+ Arrays.toString(cookies));
            for(Cookie cookie : cookies) {
                if(cookie.getName().equals("userId")){
                    User userByID = uService.findUserByID(Long.parseLong(cookie.getValue()));
                    userSession.setUser(userByID);
                }
            }

            System.out.println("userId:"+userSession.getUser().getUserId());

            List<Asset> assets = aRepository.findAssetByUserId(userSession.getUser().getUserId());
        

        for (Asset asset : assets) {
            Stock stock = stockService.findStock(asset.getSymbol()).getStock();
            BigDecimal latestPrice = stock.getQuote().getPrice();
            asset.setLatestPrice(latestPrice);

            Double purchasePrice = asset.getPurchasePrice();
            Double gainValue = latestPrice.doubleValue()-purchasePrice;
            Long gainValueRound = Math.round(gainValue * 100);
            Double gainValueRoundDb = gainValueRound/100.0;
            asset.setGainValue(gainValueRoundDb);
            Double gain = (gainValue)/purchasePrice*100;
            Long gainRound = Math.round(gain * 100.0);
            Double gainRoundDouble = gainRound/100.0;
            asset.setGain(gainRoundDouble);

            String sym = asset.getSymbol();
            if(sym.contains("-") && sym.substring(sym.length()-3).equals("USD")) {
                asset.setType("Crypto");
            } else {
                asset.setType("Stock");
            }
            
            Double totalGain = gainValueRoundDb*asset.getHoldings();
            Long totalGainRound = Math.round(totalGain * 100);
            Double totalGainRoundDb = totalGainRound/100.0;
            asset.setTotalGain(totalGainRoundDb);
            
            Double currentValue = latestPrice.doubleValue()*asset.getHoldings();
            Long currentValueRound = Math.round(currentValue * 100);
            Double currentValueRoundDb = currentValueRound/100.0;
            asset.setCurrentValue(currentValueRoundDb);
            
            Date currentDate = Calendar.getInstance().getTime();
            Long diffInMillies =  Math.abs(currentDate.getTime() - asset.getDatePurchased().getTime());
            Long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
            asset.setHoldingPeriod(diff);
            
            asset.setUserId(userSession.getUser().getUserId());
            aRepository.save(asset);
            System.out.println(stock);
        }
        System.out.println("refreshed");
        return aRepository.findAssetByUserId(userSession.getUser().getUserId());
        }
        
        else {
        	List<Asset> assets = aRepository.findAll();
        	if (assets != null) {
            for (Asset asset : assets) {
            Stock stock = stockService.findStock(asset.getSymbol()).getStock();
            BigDecimal latestPrice = stock.getQuote().getPrice();
            asset.setLatestPrice(latestPrice);

            Double purchasePrice = asset.getPurchasePrice();
            Double gainValue = latestPrice.doubleValue()-purchasePrice;
            Long gainValueRound = Math.round(gainValue * 100);
            Double gainValueRoundDb = gainValueRound/100.0;
            asset.setGainValue(gainValueRoundDb);
            Double gain = (gainValue)/purchasePrice*100;
            Long gainRound = Math.round(gain * 100.0);
            Double gainRoundDouble = gainRound/100.0;
            asset.setGain(gainRoundDouble);

            String sym = asset.getSymbol();
            if(sym.contains("-") && sym.substring(sym.length()-3).equals("USD")) {
                asset.setType("Crypto");
            } else {
                asset.setType("Stock");
            }
            
            Double totalGain = gainValueRoundDb*asset.getHoldings();
            Long totalGainRound = Math.round(totalGain * 100);
            Double totalGainRoundDb = totalGainRound/100.0;
            asset.setTotalGain(totalGainRoundDb);
            
            Double currentValue = latestPrice.doubleValue()*asset.getHoldings();
            Long currentValueRound = Math.round(currentValue * 100);
            Double currentValueRoundDb = currentValueRound/100.0;
            asset.setCurrentValue(currentValueRoundDb);
            
            Date currentDate = Calendar.getInstance().getTime();
            Long diffInMillies =  Math.abs(currentDate.getTime() - asset.getDatePurchased().getTime());
            Long diff = TimeUnit.DAYS.convert(diffInMillies, TimeUnit.MILLISECONDS);
            asset.setHoldingPeriod(diff);
                
                aRepository.save(asset);
                System.out.println(stock);
            }
        }
            System.out.println("refreshed");
            return aRepository.findAll();
            }
    }
    

    //create asset rest api
    @PostMapping("")
    public Asset createAsset(@RequestBody Asset asset, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        
        if (cookies != null) {
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("userId")){
                    asset.setUserId(Long.parseLong(cookie.getValue()));
                    System.out.println("C UserId:"+Long.parseLong(cookie.getValue()));
                }
            }
            if (stockService.findStock(asset.getSymbol()).getStock() == null) {
            	System.out.println("Fail");
            	return null;
            }
            Stock stock = stockService.findStock(asset.getSymbol()).getStock();
            if((stock.getQuote().getPrice()) == null) {
            	 System.out.println("Fail");
            	return null;
            }
            return aRepository.save(asset);
        }
        else {
            if (stockService.findStock(asset.getSymbol()).getStock() == null) {
            	System.out.println("Fail");
            	return null;
            }
            Stock stock = stockService.findStock(asset.getSymbol()).getStock();
            if((stock.getQuote().getPrice()) == null) {
            	 System.out.println("Fail");
            	return null;
            }
            return aRepository.save(asset);
        }
    }

        
//        for (Asset assetInDB : assets) {
//        	if (asset.getSymbol() == assetInDB.getSymbol()) {
//        		Double totalAssetHoldings = assetInDB.getHoldings() + asset.getHoldings();
//        		Double totalPurchasePrice = (assetInDB.getHoldings() * assetInDB.getPurchasePrice()) + (asset.getHoldings() * asset.getPurchasePrice());
//        		Double avgPurchasePrice = (totalPurchasePrice)/(totalAssetHoldings);
//        		
//        		assetInDB.setHoldings(totalAssetHoldings);
//        		assetInDB.setPurchasePrice(avgPurchasePrice);
//        		
//        		return aRepository.save(assetInDB);
//        	}
//        }

    //get asset by id rest api
    @GetMapping("/{assetId}")
    public ResponseEntity<Asset> getAssetbyId(@PathVariable Long assetId) {
        Asset asset = aRepository.findById(assetId).
                orElseThrow(() -> new ResourceNotFoundException("Asset does not exist with id: " + assetId));
        return ResponseEntity.ok(asset);
    }

    //update asset rest api
    @PutMapping("/{assetId}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long assetId, @RequestBody Asset assetDetails,HttpServletRequest request){
        Asset asset = aRepository.findById(assetId).
                orElseThrow(() -> new ResourceNotFoundException("Asset does not exist with id: " + assetId));
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("userId")){
                asset.setUserId(Long.parseLong(cookie.getValue()));
            }
        }
        }
        asset.setHoldings(assetDetails.getHoldings());
        asset.setDatePurchased(assetDetails.getDatePurchased());
        asset.setPurchasePrice(assetDetails.getPurchasePrice());

        Asset updatedAsset = aRepository.saveAndFlush(asset);
        return ResponseEntity.ok(updatedAsset);
    }

    //delete asset rest api
    @DeleteMapping("/{assetId}")
    public ResponseEntity<Map<String, Boolean>> deleteAsset(@PathVariable Long assetId){
        Asset asset = aRepository.findById(assetId).
                orElseThrow(() -> new ResourceNotFoundException("Asset does not exist with id: " + assetId));

        aRepository.delete(asset);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    // Returns the fbprophet generated plotly graph as the string of the HTML
    // File is cached in server, download logic is processed by the python script
    // date format is yyyy-MM-dd
    @GetMapping("/predict/{ticker}/{date}")
    public ResponseEntity<Map<String, String>> getPrediction(@PathVariable String ticker, 
                                                             @PathVariable String date, 
                                                             @RequestParam(defaultValue="false") String mobile) 
                                                             throws IOException, InterruptedException{
        String userdir = System.getProperty("user.dir");
        String datadir = env.getProperty("python.datadir");
        ProcessBuilder processBuilder = new ProcessBuilder("python3", "prediction.py", ticker, date);
        processBuilder.directory(new File(userdir, datadir));

        Process process = processBuilder.start();
        InputStream err = process.getErrorStream();
        BufferedReader errReader = new BufferedReader(new InputStreamReader(err));
        BufferedReader inReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        System.out.println("Python process started.");
        HashMap<String, String> result = new HashMap<String, String>();
        String graph = "";
        int response = process.waitFor();
        if (response != 0) {
            System.out.println("Program exit with code: " + response);
            System.out.println(errReader.lines().collect(Collectors.joining("\n")));
        }
        else {
            System.out.println("Python script finished.");
            if (mobile.equals("true")) {
                FileInputStream fis = new FileInputStream(new File(datadir, "graphs" + File.separatorChar + ticker + ".png"));
                byte[] bytes = new byte[(int)fis.getChannel().size()];
                fis.read(bytes);
                graph = new String(Base64.encodeBase64(bytes),"UTF-8");                 
            }
            else {
                BufferedReader htmlReader = new BufferedReader(new FileReader(new File(datadir, "graphs" + File.separatorChar + ticker + "-forecast.html")));
                graph = htmlReader.lines().collect(Collectors.joining("\n")).replace("\n","");
                htmlReader.close();        
            }
            result.put("graph", graph);
            String value = inReader.lines().collect(Collectors.joining("\n"));
            result.put("value", value);
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/news/{ticker}")
    public ResponseEntity<List<Map<String, String>>> getAllNews(@PathVariable String ticker) throws MalformedURLException, IOException, IllegalArgumentException, FeedException {
        String token = env.getProperty("iex.api.token");
        String baseURL = env.getProperty("iex.api.url");
        BufferedInputStream in = new BufferedInputStream(new URL(baseURL + "/" + ticker + "/company?token=" + token).openStream());
        int i;
        String answer = "";
        while ((i = in.read()) != -1) {
            answer += (char)i;
        }
        in.close();
        BasicJsonParser parser = new BasicJsonParser();
        Map<String,Object> json = parser.parseMap(answer);
        // theory is that the first part of the company name is the one that will be mentioned by articles
        String companyName = json.get("companyName").toString().split(" ")[0];
        URL rssURL = new URL("https://finance.yahoo.com/news/rssindex");
        SyndFeedInput yfinance = new SyndFeedInput();
        SyndFeed yfFeed = yfinance.build(new XmlReader(rssURL));
        List<Map<String, String>> entries = yfFeed.getEntries()
                .stream()
                .filter(e -> e.getTitle().contains(companyName))
                .map(x -> Map.ofEntries(entry("link",
                                              (x.getLink().contains("?")) ? x.getLink().substring(0, x.getLink().indexOf('?')) : x.getLink()),
                        entry("title", x.getTitle())))
                .collect(Collectors.toList());
        return ResponseEntity.ok(entries);
    }
    
    @EventListener(ApplicationReadyEvent.class)
    private void initFolders() throws IOException {
        File datadir = new File(env.getProperty("python.datadir"));
        if (!datadir.exists()) {
            datadir.mkdir();
            new File("python", "raw").mkdir();
            new File("python", "graphs").mkdir();
        }
        File pyPredict = new File(datadir.getAbsoluteFile().toPath().toString(), "prediction.py");
        if (!pyPredict.exists()) {
            ClassPathResource classPathResource = new ClassPathResource("python/prediction.py");
            InputStream in = classPathResource.getInputStream();
            try {
                Files.copy(in, pyPredict.getAbsoluteFile().toPath());
                in.close();
            }
            catch (IOException e) {
               System.out.println(e);
            }
        }
    }
}
