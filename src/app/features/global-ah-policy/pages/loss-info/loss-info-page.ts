import { Component, Input, OnInit } from '@angular/core';
import { materialImports } from '../../../../shared/materials/material-imports';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-loss-info',
  standalone: true,
  imports: [...materialImports, ReactiveFormsModule],
  templateUrl: './loss-info-page.html',
  styleUrl: './loss-info-page.css',
})
export class LossInfoPage implements OnInit {
  @Input({ required: true })
  group!: FormGroup;

  ngOnInit(): void {
    this.group.get('reportedToBhsi')?.valueChanges.subscribe((value) => {
      const caseNumber = this.group.get('caseNumber');

      if (value === true) {
        caseNumber?.setValidators([Validators.required]);
      } else {
        caseNumber?.clearValidators();
        caseNumber?.reset();
      }

      caseNumber?.updateValueAndValidity();
    });
  }
}
