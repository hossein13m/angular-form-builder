import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AgSection } from '../../models/agSection.model';
import { AgSettingModalComponent } from '../../components/ag-setting-modal/ag-setting-modal.component';
import { AgColumnComponentModel } from '../../models/agColumnComponent.model';
import { AgMockFormDataModel } from '../../models/agMockFormData.model';

@Component({
    selector: 'lib-ag-form-builder',
    templateUrl: './ag-form-builder.component.html',
    styleUrls: ['./ag-form-builder.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AgFormBuilderComponent implements OnInit {
    @Output() emittedFormInfo: EventEmitter<{ name: string; sections: Array<AgSection> }> = new EventEmitter<{ name: string; sections: Array<AgSection> }>();
    @Input() formData!: AgMockFormDataModel;

    public sections: Array<AgSection> = [];
    public form: FormGroup = this.fb.group({
        name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
    });

    constructor(private dialog: MatDialog, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.checkForEditMode() && this.setDataForEditMode();
    }

    private checkForEditMode(): boolean {
        return !!this.formData;
    }

    private setDataForEditMode(): void {
        this.form.get('name')?.setValue(this.formData.name);
        this.sections = this.formData.sections;
    }

    public clearForm(): void {
        this.sections = [];
        this.form.reset();
    }

    public addSection(): void {
        this.sections.push({ columnsCount: 0 });
    }

    public removeSection(section: AgSection): void {
        const sectionIndex = this.sections.indexOf(section);
        this.sections.splice(sectionIndex, 1);
    }

    public openSettingDialog(sectionIndex: number, sectionInfo: AgSection): void {
        this.dialog
            .open(AgSettingModalComponent, { data: { sectionIndex, sectionInfo }, height: '800px', width: '1600px' })
            .afterClosed()
            .subscribe((sectionInfo: { sectionIndex: number; sectionColumns: Array<AgColumnComponentModel> }) => {
                sectionInfo && this.createSectionPreview(sectionInfo);
            });
    }

    public submitForm(): void {
        console.log('hello');
        console.log({ name: this.form.get('name')!.value, sections: this.sections });
        this.emittedFormInfo.emit({ name: this.form.get('name')!.value, sections: this.sections });
    }

    public isSubmitButtonDisable(): boolean {
        return this.form.valid && !!this.sections.length;
    }

    private createSectionPreview(sectionInfo: { sectionIndex: number; sectionColumns: Array<AgColumnComponentModel> }): void {
        this.sections[sectionInfo.sectionIndex] = {
            columnInfo: sectionInfo.sectionColumns,
            columnsCount: sectionInfo.sectionColumns.length,
        };
    }
}
