import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { ICountry } from '../../model/i-country';

@Component({
  selector: 'oa-rm',
  templateUrl: './rm.component.html',
  styleUrls: ['./rm.component.scss']
})
export class RmComponent implements OnInit {
  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  // parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = ['Male', 'Female', 'Other'];

  countries = [
    new ICountry('UY', 'Uruguay'),
    new ICountry('US', 'United States'),
    new ICountry('AR', 'Argentina')
  ];

  validation_messages = {
    fullname: [{ type: 'required', message: 'Full name is required' }],
    bio: [
      {
        type: 'maxlength',
        message: 'Bio cannot be more than 256 characters long'
      }
    ],
    gender: [{ type: 'required', message: 'Please select your gender' }],
    birthday: [{ type: 'required', message: 'Please insert your birthday' }],
    phone: [
      { type: 'required', message: 'Phone is required' },
      {
        type: 'validCountryPhone',
        message: 'Phone incorrect for the country selected'
      }
    ]
  };

  account_validation_messages = {
    username: [
      { type: 'required', message: 'Username is required' },
      {
        type: 'minlength',
        message: 'Username must be at least 5 characters long'
      },
      {
        type: 'maxlength',
        message: 'Username cannot be more than 25 characters long'
      },
      {
        type: 'pattern',
        message: 'Your username must contain only numbers and letters'
      },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long'
      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase, one lowercase, and one number'
      }
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
            )
          ])
        ),
        confirm_password: new FormControl('', Validators.required)
      },
      (formGroup: FormGroup) => {
        return null;
        // return PasswordValidator.areEqual(formGroup);
      }
    );

    // country & phone validation
    const country = new FormControl(this.countries[0], Validators.required);

    const phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required
        // PhoneValidator.validCountryPhone(country)
      ])
    });

    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    // user details form validations
    this.userDetailsForm = this.fb.group({
      fullname: ['Homero Simpson', Validators.required],
      bio: [
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        Validators.maxLength(256)
      ],
      birthday: ['', Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      country_phone: this.country_phone_group
    });

    // user links form validations
    this.accountDetailsForm = this.fb.group({
      username: new FormControl(
        '',
        Validators.compose([
          //  UsernameValidator.validUsername,
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      ),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }

  onSubmitAccountDetails(value) {
    console.log(value);
  }

  onSubmitUserDetails(value) {
    console.log(value);
  }
}
