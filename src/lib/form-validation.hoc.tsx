import { ComponentType, useState } from "react";

export interface ValidationRule {
    validator: (value: string, formData: { [key: string]: string } | undefined) => boolean;
    message: string;
  }
  
  export interface ValidationRules {
    [key: string]: ValidationRule[];
  }
  
  const withFormValidation = <P extends object>(
    WrappedComponent: ComponentType<P>,
    validationRules: ValidationRules
  ) => {
    const WithFormValidation: React.FC<P> = (props) => {
      const { ...rest } = props as P;
      const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
      const validateForm = (formData: { [key: string]: string }): boolean => {
        const newErrors: { [key: string]: string } = {};
  
        for (const field in formData) {
          if (validationRules[field]) {
            const rules = validationRules[field];
            const value = formData[field]?.trim() || "";
  
            for (const rule of rules) {
              const { validator, message } = rule;
              if (!validator(value, formData)) {
                newErrors[field] = message;
                break;
              }
            }
          }
        }
  
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return false;
        } else {
          setErrors({});
          return true;
        }
      };
  
      const validateInput = ({
        name,
        value,
        formData,
      }: {
        name: string;
        value: string;
        formData?: { [key: string]: string };
      }) => {
        let newErrors: { [key: string]: string } = { ...errors };
        let inputError = "";
        
        if (validationRules[name]) {
          const rules = validationRules[name];
          const inputValue = value?.trim() || "";
  
          for (const rule of rules) {
            const { validator, message } = rule;
            if (!validator(inputValue, formData)) {
              inputError = message;
              break;
            }
          }
        }
        
        // If there are errors, set them and prevent form submission
        if (!!inputError) {
          newErrors[name] = inputError;
        } else {
          newErrors[name] = "";
        }
        setErrors(newErrors);
      };
  
      return (
        <WrappedComponent
          {...rest}
          validateForm={validateForm}
          validateInput={validateInput}
          errors={errors}
        />
      );
    };
  
    return WithFormValidation;
  };
  
  export default withFormValidation;
  