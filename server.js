const express = require('express');
const app = express();

app.get('*', (req, res) => {
  res.write('aaaaaaaa');
  res.end();
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
