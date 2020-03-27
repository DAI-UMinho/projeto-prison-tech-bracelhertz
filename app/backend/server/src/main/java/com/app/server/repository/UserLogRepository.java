package com.app.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.app.server.model.UserLog;





@Repository
public interface UserLogRepository extends JpaRepository<UserLog, Long>{

	
	UserLog findById(long userLogId);

}
