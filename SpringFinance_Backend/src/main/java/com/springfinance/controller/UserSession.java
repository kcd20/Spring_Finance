package com.springfinance.controller;

import com.springfinance.model.User;

import java.io.Serializable;

/**
 * @Author Fusheng Tan
 * @Version 1.0
 */
public class UserSession implements Serializable  {
    private static final long serialVersionUID = 1L;
    private User user = null;
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}
