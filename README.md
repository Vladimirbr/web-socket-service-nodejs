# web-socket-service-nodejs

## WebSocket Service

A web socket server application.
The application listen to the default web socket port and get a connection from a web socket client.

#### I'm using the following chrome extension for the test:

https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?hl=en

The application receive a json payload as described below and validate the json schema.

In case of successful validation, a json response will be sent back to the client with the same batch_id as was received in the input json.

In case of failure in one of the validations rule a json response will be sent back to the client with the error description.

Upon a request to the client, both request and response json files logged in a local directory.

### The request payload will have the following Structure:

```
{
    "action": {
         "method": "traffilog_task_1_http",
         "parameters": {
             "batch_id": 10,
             "vehicle_id": 1234578,
             "timestamp": "2020-11-15T15:50:38.000"
        }
    }
}
```

#### Json schema validations:

| Parameter name | Type         | Mandatory | Description             |
| -------------- | ------------ | --------- | ----------------------- |
| method         | String (100) | TRUE      |
| batch_id       | Number       | TRUE      |
| vehicle_id     | Number       | FALSE     |
| Timestamp      | Date time    | TRUE      | Cannot be a future date |

### The response body will have the following structure:

```
{
    "action": {
        "method ": "traffilog_task_1_http",
        "response": {
            "batch_id": 10,
            "status": "OK",
            "description": "SUCCESS"
        }
    }
}

{
    "action": {
        "method ": "traffilog_task_1_http",
        "response": {
            "status": "ERROR",
            "description": "Missing Mandatory Field"
        }
    }
}
```

"description" field:

#### This field return one of the following error types in case of error:

- Missing Mandatory Field
- Validation Error
