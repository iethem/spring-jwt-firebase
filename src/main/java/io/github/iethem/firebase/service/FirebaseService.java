package io.github.iethem.firebase.service;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class FirebaseService {

	@PostConstruct
	public void initializeFirebaseApp() throws IOException {
		if (FirebaseApp.getApps() == null || FirebaseApp.getApps().isEmpty()) {
			InputStream serviceAccount = this.getClass().getResourceAsStream("/firebase-service-credentials.json");
			GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
			FirestoreOptions fsoptions = FirestoreOptions.newBuilder().setCredentials(credentials)
					.setTimestampsInSnapshotsEnabled(true).build();
			FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(credentials)
					.setFirestoreOptions(fsoptions).build();
			FirebaseApp.initializeApp(options);
		}
	}

}