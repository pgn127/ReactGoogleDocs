const express = require('express');
const router = express.Router();
//import {TodoItem} from '../models/TodoItem';

router.get('/', function (req, res) {
  res.send('Hello World!')
})


module.exports = router;
