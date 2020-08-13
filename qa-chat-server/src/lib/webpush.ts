import app from "../app";
import webpush from 'web-push';

const fakeDatabase: any = [];

app.post('/subscription', async (req, res) => {
  const subscription = req.body;
  fakeDatabase.push(subscription);
});


app.get('/sendNotification', async (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification'
    }
  };

  const promises: any = [];
  fakeDatabase.forEach((subscription: any) => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  });
  Promise.all(promises).then(() => res.sendStatus(200));
});
