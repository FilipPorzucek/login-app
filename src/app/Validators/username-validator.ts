import { AbstractControl,ValidationErrors } from "@angular/forms";
export function usernameValidator(control:AbstractControl):ValidationErrors|null{
  const valid = /^[a-zA-Z ]+$/.test(control.value);
  return valid?null:{invalidUsername:true};

}