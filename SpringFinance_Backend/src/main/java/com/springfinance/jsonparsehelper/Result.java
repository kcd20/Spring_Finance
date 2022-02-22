package com.springfinance.jsonparsehelper;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Result {

	@JsonProperty("T")
	private String TT;
	private double c;
	private String h;
	private String l;
	private Double o;
	private String t;
	private String v;
	private String vw;
	@JsonIgnore
	private String n;
	
	public String getTT() {
		return TT;
	}
	public void setTT(String tT) {
		TT = tT;
	}
	public double getC() {
		return c;
	}
	public void setC(double c) {
		this.c = c;
	}
	public String getH() {
		return h;
	}
	public void setH(String h) {
		this.h = h;
	}
	public String getL() {
		return l;
	}
	public void setL(String l) {
		this.l = l;
	}
	public Double getO() {
		return o;
	}
	public void setO(Double o) {
		this.o = o;
	}
	public String getT() {
		return t;
	}
	public void setT(String t) {
		this.t = t;
	}
	public String getV() {
		return v;
	}
	public void setV(String v) {
		this.v = v;
	}
	public String getVw() {
		return vw;
	}
	public void setVw(String vw) {
		this.vw = vw;
	}
	public String getN() {
		return n;
	}
	public void setN(String n) {
		this.n = n;
	}
	
	
}