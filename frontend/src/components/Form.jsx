import React from "react";
import { Loader } from "semantic-ui-react";

function Form(props) {
  const { loading, children } = props;
  return (
    <form className={"login-input-block"}>
      {!loading ? (
        children
      ) : (
        <Loader active inline="centered" size="medium">
          Loading...
        </Loader>
      )}
    </form>
  );
}
export default Form;
