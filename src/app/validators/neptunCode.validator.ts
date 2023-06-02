import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function NeptunCodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let neptunCode = control.value as string;

    //a neptun code must be exactly 6 chars long
    if (neptunCode.length !== 6) {
      return { neptunCodeCheck: { value: control.value } };
    }

    //a neptun code should not start with a digit
    if (!isNaN(+neptunCode[0])) {
      return { neptunCodeCheck: { value: control.value } };
    }

    const LETTER_EXPRESSION: RegExp = /^\p{L}$/u;

    //a neptun code should only contain numbers or letters
    if (
      [...neptunCode].some(
        (char) => isNaN(+char) && !LETTER_EXPRESSION.test(char)
      )
    ) {
      return { neptunCodeCheck: { value: control.value } };
    }

    return null;
  };
}
