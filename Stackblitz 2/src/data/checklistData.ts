import { ChecklistSection, SectionId } from '../types';

export const checklistData: Record<SectionId, ChecklistSection> = {
  'accepted-offer': {
    name: 'Accepted Offer',
    tasks: [
      {
        title: 'Submit Earnest & Option Money',
        subtasks: [
          { title: 'Verify amount owed' },
          { title: 'Choose delivery method (wire, Zoccam, check)' },
          { title: 'Confirm with title company' },
        ],
      },
      {
        title: 'Schedule Home Inspection',
        subtasks: [
          { title: 'Choose inspector within 24 hours' },
          { title: 'Schedule inspection within 1–3 days' },
          { title: 'Plan to attend if possible' },
        ],
      },
      {
        title: 'Complete Loan Application',
        subtasks: [
          { title: 'Provide lender requested docs (W2s, pay stubs, IDs)' },
          { title: 'Sign borrower disclosures' },
          { title: 'Avoid new credit pulls or job changes' },
        ],
      },
      {
        title: 'Shop for Homeowners Insurance',
        subtasks: [
          { title: 'Get quotes from at least 2 providers' },
          { title: 'Choose policy & send to lender' },
          { title: 'Confirm it covers replacement cost' },
        ],
      },
    ],
  },
  'option-period': {
    name: 'Option Period',
    tasks: [
      {
        title: 'Attend Home Inspection',
        subtasks: [
          { title: 'Ask questions' },
          { title: 'Take notes/photos if needed' },
        ],
      },
      {
        title: 'Review Report & Negotiate Repairs',
        subtasks: [
          { title: 'Review full report with agent' },
          { title: 'Decide on requests: repairs, credits, price reductions' },
          { title: 'Sign repair amendment (if needed)' },
        ],
      },
    ],
  },
  pending: {
    name: 'Pending',
    tasks: [
      {
        title: 'Review Appraisal',
        subtasks: [],
      },
      {
        title: 'Submit Final Docs to Lender',
        subtasks: [
          { title: 'Income docs, ID, bank statements' },
          { title: 'Letter of explanation if requested' },
        ],
      },
      {
        title: 'Title Commitment Review',
        subtasks: [],
      },
      {
        title: 'Home Warranty (If Applicable)',
        subtasks: [
          { title: 'Ensure order is placed and policy is reviewed' },
        ],
      },
      {
        title: 'Review Disclosures & HOA Docs',
        subtasks: [
          { title: "Seller's Disclosure" },
          { title: 'Survey + T-47 affidavit' },
          { title: 'HOA rules, fees, transfer costs' },
          { title: 'MUD/PID notices (if any)' },
        ],
      },
      {
        title: 'Utility Setup',
        subtasks: [
          { title: 'Electricity' },
          { title: 'Water' },
          { title: 'Gas' },
          { title: 'Internet/TV' },
          { title: 'Trash Service' },
        ],
      },
    ],
  },
  'final-week': {
    name: 'Final Week',
    tasks: [
      {
        title: 'Closing Disclosure (CD)',
        subtasks: [
          { title: 'Review for accuracy' },
          { title: 'Ask questions if anything looks off' },
        ],
      },
      {
        title: 'Prepare for Move',
        subtasks: [
          { title: 'Schedule movers' },
          { title: 'Pack and label essentials separately' },
        ],
      },
      {
        title: 'Mail Forwarding',
        subtasks: [
          { title: 'Submit USPS address change' },
        ],
      },
      {
        title: 'Final Walkthrough',
        subtasks: [
          { title: 'Verify repairs completed' },
          { title: 'Check home is clean and ready' },
        ],
      },
    ],
  },
  closing: {
    name: 'Closing',
    tasks: [
      {
        title: 'Wire Closing Funds',
        subtasks: [
          { title: 'Call title company to verify wiring info' },
          { title: 'Send wire 24+ hrs before close' },
        ],
      },
      {
        title: 'Bring ID to Closing',
        subtasks: [
          { title: 'Driver\'s license or passport' },
        ],
      },
      {
        title: 'Wait for Funding',
        subtasks: [
          { title: "You'll receive keys once it funds" },
          { title: 'May take a few hours' },
        ],
      },
      {
        title: 'Change Locks or Rekey',
        subtasks: [
          { title: 'Schedule locksmith or install smart lock' },
        ],
      },
      {
        title: 'Organize Closing Docs',
        subtasks: [
          { title: 'Store CD, survey, title policy digitally' },
        ],
      },
      {
        title: 'Apply for Homestead Exemption',
        subtasks: [
          { title: 'Available Jan 1–Apr 30 next year' },
          { title: 'File online via county website' },
        ],
      },
      {
        title: 'Leave Review / Refer Others',
        subtasks: [
          { title: 'Share your experience to help others!' },
        ],
      },
    ],
  },
};