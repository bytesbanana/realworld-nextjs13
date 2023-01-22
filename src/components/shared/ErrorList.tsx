import React from "react";
import { Errors } from "types/response";

interface Props {
  errors: Errors;
}

const ErrorList = ({ errors }: Props) => {
  return (
    <ul className="error-messages">
      {Object.keys(errors).map((key) =>
        errors[key].map((msg, i) => (
          <li key={key + i}>
            {key} {msg}
          </li>
        ))
      )}
    </ul>
  );
};

export default ErrorList;
