
const axios = require('axios');
const uuid = require('uuid');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const http = require('http');
const cors = require('cors');
const {Server} = require("socket.io");
import { v4 as uuidv4 } from 'uuid';

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

 app.post('/api/1.0/posts/:postId/messages', async function (req, res) {
    console.log("In postId");
    console.log(req.body);
    var response = { "response" : "This is messages POST method for response from DFO(MAX)." }
    console.log(response);
    const resParams = {
        "id": req.body.id,
        "parentId": req.body.id,
        "postId": req.body.post.channelId,
        "isOwn": false,
        "messageId": req.body.replyToMessageId,
        "idOnExternalPlatform": req.body.replyToMessageIdOnExternalPlatform,
        "channelId": req.params.postId,
        "channel": {
            "id": req.params.postId,
            "originId": "",
            "type": "chat"
        },
        "createdAtIso": Date.now(),
        "receivedAt": Date.now(),
        "createdAt": Date.now(),
        "originCreatedAt": Date.now(),
        "title": req.body.title,
        "content": req.body.content,
        "sentiment": "neutral"
    }
    res.send(resParams);
  })

  app.post('/api/vccChat/agent/concludeChat', function (req, res) {
    console.log("In postId");
    console.log(req.body);
    var response = { "response" : "This is messages POST method for conclude chat." }
    console.log(response);
    const resParams = {
      "id": req.body.case.caseNumber,
      "threadId": req.body.threadId,
      "messageId": req.body.replyToMessageId,
      "skillId": req.body.skill.skillId,
      "channelId": req.body.post.channelId,
      "channel": {
          "id": req.body.post.channelId,
          "originId": "",
          "type": "chat"
      },
      "agentDetail": {
        "agentId": req.body.agentDetail.agentId,
        "agentName": req.body.agentDetail.agentName
      }
  }
    res.send(resParams);
  })

  app.post('/api/1.0/token', function (req, res) {
    console.log("In token");
    console.log(req.body);
    var response = { "response" : "This is messages POST method for token generation." }
    console.log(response);
    const resParams = {
      "access_token": uuidv4(),
      "threadId": 36000,
      "token_type": "Bearer",
      "scope": null
  }
    res.send(resParams);
  })

server.listen(3001, () => {
    console.log("Server is running")})
