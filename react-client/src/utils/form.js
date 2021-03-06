import React from 'react';

const FormField = ({formdata, change, id}) => {
  const showError = () => {
    let errorMessage = null;
    if (formdata.validation && !formdata.valid) {
      errorMessage = (
        <div className = "error">
          {formdata.validationMessage}
        </div>
      )
    }
    return errorMessage
  }  
  const renderTemplate = () =>{
        let formTemplate = null;
        switch(formdata.element){
            case ("input"):
                formTemplate = (
                  <div >
                    <input
                      {...formdata.config}
                      value={formdata.value}
                      title={formdata.placeholder}
                      aria-labelledby={formdata.placeholder}
                      onBlur={(event)=> change({event, id, blur:true})}
                      // onBlur means the user has visited that input but not entered a valid input
                      // it is linked to "touched" for the corresponding state
                      onChange={(event)=> change({event, id})}
                    />
                    {showError()}
                  </div> 
                )
            break;
            default:
                formTemplate = null; 
        }
        return formTemplate;
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;