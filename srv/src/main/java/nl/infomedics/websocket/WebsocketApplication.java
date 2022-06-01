package nl.infomedics.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.extern.log4j.Log4j2;

@SpringBootApplication @Log4j2 @EnableScheduling
public class WebsocketApplication {
	@Autowired private SimpMessageSendingOperations messagingTemplate;
	public static void main(String[] args) throws InterruptedException {
		SpringApplication.run(WebsocketApplication.class, args);
	}

	@Scheduled(fixedRate = 5000)
	void notifyUnsynced() throws InterruptedException {
		log.info("Sending notifyUnsynced message to client:");
		messagingTemplate.convertAndSend("/unsynced", "Notification on channel: unsynced from server");
	}

	@Scheduled(fixedRate = 8000, initialDelay = 3000)
	void notifyOther() throws InterruptedException {
		log.info("Sending notifyOther message to client:");
		messagingTemplate.convertAndSend("/other", "Notification on channel: other from server");
	}
}
