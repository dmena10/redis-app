const express = require('express');
const redis = require('redis');

const app =  express();
app.disable("x-powered-by");
const client = redis.createClient({host: 'redis-server',
    port: 6379});


client.set('vissits', 0);

app.get('/', (req, res) => {
  client.get('vissits', (err, visits) => {
    if (err) {
      console.error('Error retrieving visits:', err);
      return res.status(500).send('Internal Server Error');
    }
    visits = parseInt(visits, 10) + 1;
    client.set('vissits', visits);
    res.send(`Number of visits: ${visits}`);
  });
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
