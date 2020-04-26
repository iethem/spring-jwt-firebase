package io.github.iethem.firebase.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;

import io.github.iethem.firebase.model.User;
import io.github.iethem.firebase.repository.UserRepository;

@RestController
@RequestMapping("api/user")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@GetMapping
	public ResponseEntity<User> get() throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String uid = authentication.getName();
		User user = userRepository.get(uid);

		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<User> save(@RequestBody String bio) throws Exception {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		String uid = authentication.getName();
		UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);

		User user = new User();
		user.setEmail(userRecord.getEmail());
		user.setName(userRecord.getDisplayName());
		user.setUid(uid);
		user.setLastLogin(userRecord.getUserMetadata().getLastSignInTimestamp());
		user.setBio(bio);

		User savedUser = userRepository.save(user);

		return new ResponseEntity<>(savedUser, HttpStatus.OK);
	}
}