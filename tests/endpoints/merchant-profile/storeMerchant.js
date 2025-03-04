import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 5, // Number of Virtual Users
  duration: "5s", // Test Duration
};

export default function () {
  let url = "https://your-api-endpoint.com/merchant"; // Replace with actual API URL
  
  let payload = JSON.stringify({
    service: "ops",
    name: "hhhhh",
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_ACCESS_TOKEN", // Add token if needed
    },
  };

  let res = http.post(url, payload, params);

  // Log response to debug
  console.log("Response status:", res.status);
  console.log("Response body:", res.body);

  check(res, {
    "is status 201": (r) => r.status === 201, // Ensure successful creation
    "response contains merchant name": (r) => r.json().name === "hhhhh",
  });

  sleep(1); // Wait for 1 second between requests
}
