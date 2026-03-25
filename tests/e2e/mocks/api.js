async function mockStreamElementsAPI(page) {
  await page.setRequestInterception(true);

  page.on("request", req => {
    const url = req.url();

    if (url.includes("/channels/")) {
      return req.respond({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          _id: "123",
          username: "samuelrbo",
          displayName: "SamuelRBO"
        })
      });
    }

    if (url.includes("/points/")) {
      return req.respond({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          username: "samuelrbo",
          rank: 42,
          points: 12345
        })
      });
    }

    req.continue();
  });
}

module.exports = { mockStreamElementsAPI };
