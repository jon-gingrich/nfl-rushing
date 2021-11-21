const server = require("./app");

const port = process.env.PORT || 1234;

server.listen(port, () => {
  console.info(
    `\x1b[32mscore-api\x1b[0m running at \x1b[4m\x1b[33mhttp://localhost:${port}\x1b[0m`
  );
});
