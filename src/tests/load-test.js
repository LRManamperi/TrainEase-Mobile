import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users over 30 seconds
    { duration: '1m', target: 10 },   // Stay at 10 users for 1 minute
    { duration: '10s', target: 0 },   // Ramp down to 0 users over 10 seconds
  ],
};

export default function () {
  // Replace 'http://localhost:3000' with your local server address
  const res = http.get('http://192.168.1.2:8081'); 

  // Check for success response
  check(res, { 'status is 200': (r) => r.status === 200 });

  sleep(1); // Wait 1 second between requests
}
