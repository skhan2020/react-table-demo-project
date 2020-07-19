import { useState, useEffect, useCallback } from 'react';

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  // Disable button in initial render.
  useEffect(() => {
    setDisable(true);
  }, []);

  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some(key => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value; // state value
      const stateError = state[key].error; // state error

      return (isInputFieldRequired && !stateValue) || stateError;
    });

    return hasErrorInState;
  }, [state, validationSchema]);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateState());
    }
  }, [state, isDirty, validateState]);

  const reset = useCallback(() => {
    setState(stateSchema);
  });

  // Used to handle every changes in every input
  const handleOnChange = useCallback(
    event => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;

      let error = '';
      if (validationSchema[name].required) {
        if (!value) {
          error = 'This is required field.';
        }
      }

      if (
        validationSchema[name].validator !== null &&
        typeof validationSchema[name].validator === 'object'
      ) {
        if (value && !validationSchema[name].validator.regEx.test(value)) {
          error = validationSchema[name].validator.error;
        }
      }

      setState(prevState => ({
        ...prevState,
        [name]: { value, error },
      }));
    },
    [validationSchema]
  );

  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();

      // Make sure that validateState returns false
      // Before calling the submit callback function
      if (!validateState()) {
        callback(state);
      }
    },
    [state, callback, validateState]
  );

  return { state, disable, handleOnChange, handleOnSubmit, reset };
}

export default useForm;