import React from "react";
import { ErrorMessageProps } from "./ErrorMessage.types";

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <p className="text-sm text-red-500">{error}</p>;
};

export default ErrorMessage;
