
const querystring = require('querystring');
const zlib = require('zlib');

const zoomApiKey = process.env.ZOOM_VERIFICATION_TOKEN;
const zoomApiSecret = process.env.ZOOM_SECRET_TOKEN;

app.post('/create-meeting', (req, res) => {
  const meetingParams = {
    topic: 'My Custom Meeting',
    type: 2, // 2 is a scheduled meeting
    // Add more meeting parameters as needed
  };

  const meetingPath = `/v2/users/YOUR_USER_ID/meetings`;
  const payload = JSON.stringify(meetingParams);

  const options = {
    hostname: 'api.zoom.us',
    path: meetingPath,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${zoomApiKey}.${zoomApiSecret}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  const reqZoom = http.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const meetingData = JSON.parse(data);
        res.json(meetingData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a Zoom meeting' });
      }
    });
  });

  reqZoom.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a Zoom meeting' });
  });

  reqZoom.write(payload);
  reqZoom.end();
});
