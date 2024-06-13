
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

// Configure the notification channel
PushNotification.createChannel(
  {
    channelId: "your-channel-id", 
    channelName: "General Notifications", 
    channelDescription: "General notifications channel", 
    soundName: "default", 
    importance: 4, 
    vibrate: true, 
  },
  (created) => console.log(`createChannel returned '${created}'`), 
);


PushNotification.configure({
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

  
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);


  },
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export default PushNotification;
