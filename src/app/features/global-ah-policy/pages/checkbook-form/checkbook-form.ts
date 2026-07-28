import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materialImports } from '../../../../shared/materials/material-imports';
import { FieldConfig } from '../../models/region.model';

@Component({
  selector: 'app-checkbook-form',
  standalone: true,
  imports: [CommonModule, ...materialImports, ReactiveFormsModule],
  templateUrl: './checkbook-form.html',
  styleUrls: ['./checkbook-form.css'],
})
export class CheckbookForm {
  @Input({ required: true }) group!: FormGroup;
  @Input({ required: true }) config: FieldConfig[] = [];
  @Input() title = 'Claim Details';
}
