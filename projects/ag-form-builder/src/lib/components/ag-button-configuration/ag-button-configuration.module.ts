import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgButtonConfigurationComponent } from './ag-button-configuration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    declarations: [AgButtonConfigurationComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatRadioModule,
    ],
    exports: [AgButtonConfigurationComponent],
})
export class AgButtonConfigurationModule {}
