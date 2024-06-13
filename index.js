const express = require('express');
const path = require('path');
const app = express();
const serverless = require('serverless-http');

// Serve the .well-known directory
app.use('/.well-known', express.static(path.join(__dirname, '../.well-known')));

// Handle event link redirection
app.get('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const appScheme = `ventlyapp://event/${eventId}`;
  const appStoreLink = 'https://apps.apple.com/app/vently/idYOUR_APP_ID'; // Replace with your App Store link

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting...</title>
        <meta http-equiv="refresh" content="0;url=${appScheme}" />
        <script type="text/javascript">
          setTimeout(function() {
            window.location.href = '${appStoreLink}';
          }, 25);
        </script>
      </head>
      <body>
        <p>If you are not redirected, <a href="${appScheme}">click here</a> to open the app or <a href="${appStoreLink}">click here</a> to download it from the App Store.</p>
      </body>
    </html>
  `);
});

module.exports = app;
module.exports.handler = serverless(app);
