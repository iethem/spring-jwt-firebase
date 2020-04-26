package io.github.iethem.firebase.model;

public class User {
	private String uid;
	private String name;
	private String email;
	private long lastLogin;
	private String bio;

	public User(String uid, String name, String email, long lastLogin, String bio) {
		super();
		this.uid = uid;
		this.name = name;
		this.email = email;
		this.lastLogin = lastLogin;
		this.setBio(bio);
	}

	public User() {
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getLastLogin() {
		return lastLogin;
	}

	public void setLastLogin(long lastLogin) {
		this.lastLogin = lastLogin;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}
}	