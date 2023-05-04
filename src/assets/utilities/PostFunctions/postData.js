async function postData(url = "", data) {
  // console.log("eds", data);
  const parsedData = JSON.stringify(data);
  // console.log(a);
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "calculated",
      "Access-Control-Allow-Credentials": "true",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: parsedData, // body data type must match "Content-Type" header
  });
  const parsedResponse = await response.json(); // parses JSON response into native JavaScript objects
  return parsedResponse;
}

export default postData;
