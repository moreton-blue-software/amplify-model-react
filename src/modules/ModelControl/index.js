import React from "react";
import { ModelFormContext } from "../ModelForm";
import get from "lodash/get";

export const ModelControlContext = React.createContext();

export default function ModelControl({ required = false, children }) {
  const form = React.useContext(ModelFormContext);
  const [fields, setFields] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const { data: formData, state } = form;
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (!touched) return;
    //validations
    Object.entries(fields).forEach(([fieldName, flag]) => {
      if (flag) {
        const fieldValue = get(formData, fieldName);
        console.log(">>ModelControl/index::", "fieldValue", fieldValue); //TRACE
        setErrors(oldErrors => {
          if (!fieldValue && required) {
            const error = `"${fieldName}" should not be empty`;
            if (oldErrors.indexOf(error) < 0) {
              const newErrors = [...oldErrors, error];
              form.handlers.setFieldErrors(oldState => ({
                ...oldState,
                [fieldName]: newErrors
              }));
              return newErrors;
            }
            return oldErrors;
          } else {
            form.handlers.setFieldErrors(oldState => {
              delete oldState[fieldName];
              return oldState;
            });
            return [];
          }
        });
      }
    });
  }, [formData, required, touched]);

  console.log(">>ModelControl/index::", "fields", errors, state, fields); //TRACE
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
