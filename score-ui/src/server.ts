import app from "./app";
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.info(
    `\x1b[32mscore-ui\x1b[0m running at \x1b[4m\x1b[33mhttp://localhost:${PORT}/\x1b[0m`
  );
});
