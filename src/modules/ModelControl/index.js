import React from "react";
import { ModelFormContext } from "../ModelForm";
import get from "lodash/get";
import groupBy from "lodash/groupBy";

export const ModelControlContext = React.createContext();

export default function ModelControl({ required = false, children }) {
  const form = React.useContext(ModelFormContext);
  const [fields, setFields] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const { data: formData, state } = form;
  const [touched, setTouched] = React.useState(false);

  function validate() {
    const errors = [];
    Object.entries(fields).forEach(([fieldName, flag]) => {
      if (flag) {
        const fieldValue = get(formData, fieldName);
        if (!fieldValue && required) {
          const error = `"${fieldName}" should not be empty`;
          errors.push({ field: fieldName, message: error });
        }
      }
    });
    return { errors };
  }

  React.useEffect(() => {
    const checkValid = () => {
      const { errors } = validate();
      setTouched(true);
      return !(errors.length > 0);
    };
    form.handlers.attachBeforeSave(checkValid, 4);
    return () => {
      form.handlers.detachBeforeSave(checkValid);
    };
  }, [fields, formData]);

  React.useEffect(() => {
    if (!touched) return;
    //validations
    const { errors } = validate();
    const errorsByKey = groupBy(errors, "field");
    const errorMsgs = [];
    const errorFields = {};
    Object.entries(errorsByKey).map(entry => {
      const [field, errors] = entry;
      const errList = [];
      errors.forEach(({ message }) => {
        errorMsgs.push(message);
        errList.push(message);
      });
      errorFields[field] = errList;
    });
    setErrors(errorMsgs);
    form.handlers.setFieldErrors(oldState => ({ ...oldState, ...errorFields }));
  }, [formData, required, touched]);

  const contextState = React.useMemo(() => {
    const hasErrors = errors.length > 0;
    return {
      required,
      touched,
      setTouched,
      setFields,
      errors,
      hasErrors
    };
  }, [required, errors, touched]);

  return (
    <ModelControlContext.Provider value={contextState}>
      {children}
    </ModelControlContext.Provider>
  );
}
