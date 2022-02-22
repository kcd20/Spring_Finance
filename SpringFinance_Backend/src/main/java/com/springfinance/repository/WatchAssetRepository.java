package com.springfinance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.springfinance.model.Asset;
import com.springfinance.model.WatchAsset;

public interface WatchAssetRepository extends JpaRepository<WatchAsset, Integer> {

	@Query("SELECT w FROM WatchAsset w WHERE w.userId = :id")
    List<WatchAsset> findListByUserId(@Param("id") Long userId);
}
