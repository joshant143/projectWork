import { PolicyCountry } from '../models/claim-master.model';

export const CLAIM_MASTER_DATA: PolicyCountry[] = [
  {
    countryCode: 'AU',
    countryName: 'Australia',
    policyTypes: [
      {
        policyTypeCode: 'CORP_TRAVEL',
        policyTypeName: 'Corporate Travel',
        claimTypes: [
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'RENTAL_VEHICLE',
            claimTypeName: 'Rental Vehicle Excess Waiver Claim',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'CARD_MISUSE',
            claimTypeName: 'Money and Financial Card Misuse',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'EXPAT_INPAT',
        policyTypeName: 'Expat/Inpat',
        claimTypes: [
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'GROUP_PA',
        policyTypeName: 'Group Personal Accident',
        claimTypes: [
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'LEISURE_TRAVEL',
        policyTypeName: 'Leisure Travel',
        claimTypes: [
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'RENTAL_VEHICLE',
            claimTypeName: 'Rental Vehicle Excess Waiver Claim',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
    ],
  },
  {
    countryCode: 'HK',
    countryName: 'Hong Kong',
    policyTypes: [
      {
        policyTypeCode: 'CORP_TRAVEL',
        policyTypeName: 'Corporate Travel',
        claimTypes: [
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'RENTAL_VEHICLE',
            claimTypeName: 'Rental Vehicle Excess Waiver Claim',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'EXPAT_INPAT',
        policyTypeName: 'Expat/Inpat',
        claimTypes: [
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'GROUP_PA',
        policyTypeName: 'Group Personal Accident',
        claimTypes: [
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
    ],
  },
  {
    countryCode: 'MO',
    countryName: 'Macau',
    policyTypes: [
      {
        policyTypeCode: 'CORP_TRAVEL',
        policyTypeName: 'Corporate Travel',
        claimTypes: [
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'RENTAL_VEHICLE',
            claimTypeName: 'Rental Vehicle Excess Waiver Claim',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'EXPAT_INPAT',
        policyTypeName: 'Expat/Inpat',
        claimTypes: [
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'GROUP_PA',
        policyTypeName: 'Group Personal Accident',
        claimTypes: [
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
    ],
  },
  {
    countryCode: 'NZ',
    countryName: 'New Zealand',
    policyTypes: [
      {
        policyTypeCode: 'CORP_TRAVEL',
        policyTypeName: 'Corporate Travel',
        claimTypes: [
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'RENTAL_VEHICLE',
            claimTypeName: 'Rental Vehicle Excess Waiver Claim',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'CARD_MISUSE',
            claimTypeName: 'Money and Financial Card Misuse',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'EXPAT_INPAT',
        policyTypeName: 'Expat/Inpat',
        claimTypes: [
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'GROUP_PA',
        policyTypeName: 'Group Personal Accident',
        claimTypes: [
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
    ],
  },
  {
    countryCode: 'SG',
    countryName: 'Singapore',
    policyTypes: [
      {
        policyTypeCode: 'CORP_TRAVEL',
        policyTypeName: 'Corporate Travel',
        claimTypes: [
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'RENTAL_VEHICLE',
            claimTypeName: 'Rental Vehicle Excess Waiver Claim',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'EXPAT_INPAT',
        policyTypeName: 'Expat/Inpat',
        claimTypes: [
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
      {
        policyTypeCode: 'GROUP_PA',
        policyTypeName: 'Group Personal Accident',
        claimTypes: [
          {
            claimTypeCode: 'PA_WEEKLY',
            claimTypeName: 'Personal Accident - Weekly Benefit',
          },
          {
            claimTypeCode: 'PS_WEEKLY',
            claimTypeName: 'Personal Sickness - Weekly Benefit',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
    ],
  },
  {
    countryCode: 'UK',
    countryName: 'United Kingdom',
    policyTypes: [
      {
        policyTypeCode: 'CORP_TRAVEL',
        policyTypeName: 'Corporate Travel',
        claimTypes: [
          {
            claimTypeCode: 'TRIP_CANCEL',
            claimTypeName: 'Trip Cancellation/Trip Disruption',
          },
          {
            claimTypeCode: 'BAGGAGE',
            claimTypeName: 'Baggage and personal effects',
          },
          {
            claimTypeCode: 'RENTAL_VEHICLE',
            claimTypeName: 'Rental Vehicle Excess Waiver Claim',
          },
          {
            claimTypeCode: 'EVACUATION',
            claimTypeName: 'Political and Natural Disaster Evacuation',
          },
          {
            claimTypeCode: 'MEDICAL',
            claimTypeName: 'Medical Expenses',
          },
          {
            claimTypeCode: 'CARD_MISUSE',
            claimTypeName: 'Money and Financial Card Misuse',
          },
          {
            claimTypeCode: 'OTHERS',
            claimTypeName: 'Others',
          },
        ],
      },
    ],
  },
];
