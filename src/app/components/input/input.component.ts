import { Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputFormConfiguration } from './input.model';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnChanges {
    public hideInputTextForPasswordInputs = false;

    @Input('inputFormConfiguration') inputFormConfiguration: InputFormConfiguration = {
        formControl: new FormControl(),
        type: 'text',
        placeholder: 'placeholder',
        label: 'test',
        isInputTypePassword: true,
        color: 'primary',
        isRtl: false,
        autofocus: false,
        readonly: false,
        errorMessages: [{ errorName: 'email', errorMessage: 'hello' }],
        hint: 'hint',
    };

    ngOnChanges(): void {
        if (!this.FC) throw new Error('FC Input is required');
        if (this.inputFormConfiguration.isInputTypePassword) this.hideInputTextForPasswordInputs = true;
    }

    public get FC(): FormControl {
        return this.inputFormConfiguration.formControl as FormControl;
    }
}
