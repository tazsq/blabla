import React from "react";
import { Message } from "semantic-ui-react";

function ErrorMessage(props) {
  const { error } = props;
  if (!error) return null;

  return (
    <Message negative style={{ width: "100%" }}>
      <Message.Header>Error</Message.Header>
      <p>{error}</p>
    </Message>
  );
}

export default ErrorMessage;
