package com.rs.www.dto;

public class StatusDto {
	private String counterName;
	private String status;
	public String getCounterName() {
		return counterName;
	}
	public void setCounterName(String counterName) {
		this.counterName = counterName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public StatusDto(String counterName, String status) {
		super();
		this.counterName = counterName;
		this.status = status;
	}
	public StatusDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
