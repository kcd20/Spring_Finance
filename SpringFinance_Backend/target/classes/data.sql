USE spring_finance;
INSERT INTO user(user_id, cash, first_name, last_name, email_address, password,age_type,interest_1,interest_2,interest_3,risk_level) VALUES(1, 5000, "John", "Doe", "johndoe@Gmail.com", "861B46D3B866A39DD8B48BAB39217CC2","36 to 45","bonds","technology","stocks","Sell remaining portfolio and move to cash (Very Low)");
INSERT INTO user(user_id, cash, first_name, last_name, email_address, password,age_type,interest_1,interest_2,interest_3,risk_level) VALUES(2, 10000, "Jane", "Doe", "janedoe@Gmail.com", "C073F80C6C995F3A6E6B7C35C2F1C05C","18 to 25","etf","technology","stocks","Do nothing and wait it out (Moderate)");
INSERT INTO user(user_id, cash, first_name, last_name, email_address, password,age_type,interest_1,interest_2,interest_3,risk_level) VALUES(3, 100000, "Tom", "Jones", "tomjones@Gmail.com", "C971E8BFF520BA229EDEAD01A4676605","36 to 45","bonds","technology","stocks","Buy more assets (High)");
INSERT INTO user(user_id, cash, first_name, last_name, email_address, password,age_type,interest_1,interest_2,interest_3,risk_level) VALUES(4, 500000, "Bonny", "Clyde", "bonnyclyde@Gmail.com", "669790B689CF313AB1ABE451150391FC","46 to 55","bonds","technology","stocks","Buy more assets (High)");
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(1, DATE("2019-01-15"), 45, "Apple", 170.20, "AAPL", "Stock", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(2, DATE("2019-01-15"), 43, "Starbucks", 100.23, "SBUX", "Stock", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(3, DATE("2020-02-28"), 13, "Microsoft", 213.73, "MSFT", "Stock", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(4, DATE("2020-03-03"), 34, "IBM", 140.44, "IBM", "Stock", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(5, DATE("2020-04-15"), 12, "Binance Coin", 400.33, "BNB-USD", "Crypto", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(6, DATE("2020-05-23"), 10, "Tesla", 824.92, "TSLA", "Stock", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(7, DATE("2020-06-26"), 5, "Nvidia", 255.32, "NVDA", "Stock", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(8, DATE("2020-07-07"), 42, "Litecoin", 132.24, "LTC-USD", "Crypto", 1);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(9, DATE("2020-08-13"), 23, "Disney", 170.22, "DIS", "Stock", 1);

INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(10, DATE("2020-09-14"), 375, "Google", 500, "GOOGL", "Stock", 2);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(11, DATE("2020-10-24"), 1000, "IBM", 70, "IBM", "Stock", 2);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(12, DATE("2021-11-20"), 1000, "BTC-USD", 567, "BTC-USD", "Crypto", 2);

INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(13, DATE("2021-12-21"), 1000, "BTC-USD", 1000, "BTC-USD", "Crypto", 3);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(14, DATE("2022-01-21"), 1000, "DOGE-USD", 1000, "DOGE-USD", "Crypto", 3);
INSERT INTO asset(asset_id, date_purchased, holdings, name, purchase_price, symbol, type, user_id) VALUES(15, DATE("2022-01-19"), 1150, "Tesla", 789, "TSLA", "Stock", 3);
INSERT INTO watch_asset(watch_asset_id, add_date, asset_name, user_id) VALUES(1, DATE("2020-02-20"), "UPST", 1);
INSERT INTO watch_asset(watch_asset_id, add_date, asset_name, user_id) VALUES(2, DATE("2020-02-20"), "ABNB", 1);
INSERT INTO watch_asset(watch_asset_id, add_date, asset_name, user_id) VALUES(3, DATE("2020-02-20"), "RBLX", 1);
INSERT INTO watch_asset(watch_asset_id, add_date, asset_name, user_id) VALUES(4, DATE("2020-02-20"), "PLTR", 1);
INSERT INTO watch_asset(watch_asset_id, add_date, asset_name, user_id) VALUES(5, DATE("2021-03-20"), "CAR", 1);
