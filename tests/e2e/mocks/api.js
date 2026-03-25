async function mockStreamElementsAPI(page) {
  await page.setRequestInterception(true);

  page.on("request", req => {
    const url = req.url();

    const headers = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "*",
      "content-type": "application/json"
    };

    if (url.includes("/channels/")) {
      return req.respond({
        status: 200,
        headers,
        body: JSON.stringify({
          _id: "5ebec5ee2c63d7c1cf008db7",
          username: "samzuka",
          displayName: "Samzuka"
        })
      });
    }

    if (url.includes("/points/")) {
      return req.respond({
        status: 200,
        headers,
        body: JSON.stringify({
          username: "samzuka",
          rank: 42,
          points: 12345
        })
      });
    }

    req.continue();
  });
}

module.exports = { mockStreamElementsAPI };
