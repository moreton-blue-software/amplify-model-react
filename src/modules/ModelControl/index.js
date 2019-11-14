import React from 'react';
import { ModelFormContext } from '../ModelForm';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';

export const ModelControlContext = React.createContext();

export default function ModelControl({ required = false, requiredLabel, children }) {
  const form = React.useContext(ModelFormContext);
  const { handlers } = form;
  const [fields, setFields] = React.useState({});
  const [errors, setErrors] = React.useState([]);
  const { data: formData } = form;
  const [touched, setTouched] = React.useState(false);

  const validate = React.useCallback(() => {
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
  }, [fields, formData, required]);

  React.useEffect(() => {
    const checkValid = () => {
      const { errors } = validate();
      setTouched(true);
      return !(errors.length > 0);
    };
    handlers.attachBeforeSave(checkValid, 4);
    return () => {
      handlers.detachBeforeSave(checkValid);
    };
  }, [fields, handlers, validate]);

  React.useEffect(() => {
    if (!touched) return;
    //validations
    const { errors } = validate();
    const errorsByKey = groupBy(errors, 'field');
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
    handlers.setFieldErrors(oldState => ({ ...oldState, ...errorFields }));
  }, [handlers, required, touched, validate]);

  return (
    <ModelControlContext.Provider
      value={{
        required,
        touched,
        setTouched,
        setFields,
        requiredLabel,
        errors,
        hasErrors: errors.length > 0
      }}>
      {children}
    </ModelControlContext.Provider>
  );
}
