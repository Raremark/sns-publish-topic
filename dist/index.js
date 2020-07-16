"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _core = require('@actions/core'); var _core2 = _interopRequireDefault(_core);
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);

const AWS_REGION = _core2.default.getInput("AWS_REGION") || process.env.AWS_REGION;
const AWS_ACCESS_KEY_ID =
  _core2.default.getInput("AWS_ACCESS_KEY_ID") || process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY =
  _core2.default.getInput("AWS_SECRET_ACCESS_KEY") || process.env.AWS_SECRET_ACCESS_KEY;

_awssdk2.default.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

async function run() {
  const MESSAGE = _core2.default.getInput("MESSAGE");
  const TOPIC_ARN = _core2.default.getInput("TOPIC_ARN");

  const params = {
    Message: MESSAGE,
    TopicArn: TOPIC_ARN
  };

  const publishTextPromise = new _awssdk2.default.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  _core2.default.debug("Sending SMS");

  const { MessageId } = await publishTextPromise();

  _core2.default.debug("SMS sent!");

  return MessageId;
}

async function execute() {
  try {
    return await run();
  } catch (error) {
    _core2.default.error("Failed to send message", message);
    _core2.default.setFailed(message);
  }
}

exports. default = execute;

execute();
