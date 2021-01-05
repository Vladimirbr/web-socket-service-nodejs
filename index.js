const http = require("http");
const WebSocketServer = require("websocket").server;

const validate = require("./validator/validate").validate;
const logger = require("./logger/logger");
const errors = require("./validator/errors");
const PORT = require("./configs/config").server.port;

const server = http.createServer();
server.listen(PORT);

const wsServer = new WebSocketServer({
  httpServer: server,
});

wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  connection.on("message", (message) => {
    let payload;
    const answer = {
      action: {
        method: "",
        response: {
          status: "",
          description: "",
        },
      },
    };
    try {
      payload = JSON.parse(message.utf8Data);
      const validationError = validate(payload);
      if (validationError) {
        answer.action.response.status = "ERROR";
        answer.action.response.description = validationError;
      } else {
        answer.action.response.status = "OK";
        answer.action.response.description = "SUCCESS";
        answer.action.response.batch_id = payload.action.parameters.batch_id;
      }
      if (payload.action && payload.action.method) {
        answer.action.method = payload.action.method;
      }
    } catch (error) {
      answer.action.response.status = "ERROR";
      answer.action.response.description = errors.VALIDATION_ERROR;
    }

    logger.log("info", "request and response log", {
      payload,
      answer,
    });

    connection.sendUTF(JSON.stringify(answer), (sendError) => {
      sendError ? console.log("answer send with errors: ", sendError) : null;
    });
  });
  connection.on("close", (reasonCode, description) => {
    console.log("Client has disconnected.", reasonCode, desciption);
  });
});
