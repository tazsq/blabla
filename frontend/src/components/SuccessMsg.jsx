import { Message } from "semantic-ui-react";

function SuccessMsg(props) {
  const { msg } = props;
  if (!msg) return null;

  return (
    <Message positive style={{ width: "100%" }}>
      <Message.Header>Success</Message.Header>
      <p>{msg}</p>
    </Message>
  );
}

export default SuccessMsg;
