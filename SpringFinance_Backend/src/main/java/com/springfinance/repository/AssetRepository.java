package com.springfinance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.springfinance.model.Asset;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long>{
    @Query("SELECT a FROM Asset a WHERE a.userId = :uid")
    List<Asset> findAssetByUserId(Long uid);
}
