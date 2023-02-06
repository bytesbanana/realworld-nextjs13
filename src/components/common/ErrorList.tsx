import React from "react";
import type { CommonErrors } from "lib/types/common";

interface Props {
  errors?: CommonErrors;
}

const ErrorList = ({ errors }: Props) => {
  return (
    <ul className="error-messages">
      {errors &&
        Object.keys(errors).map((key) => {
          return errors[key].map((err) => (
            <li key={key}>
              {key} {err}
            </li>
          ));
        })}
    </ul>
  );
};

export default ErrorList;
