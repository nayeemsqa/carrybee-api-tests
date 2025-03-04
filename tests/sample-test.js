import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Simulate 10 users
  duration: '10s', // Run for 10 seconds
};

export default function () {
  let res = http.get('https://jsonplaceholder.typicode.com/posts/1');

  check(res, {
    'is status 200': (r) => r.status === 200,
    'is response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
