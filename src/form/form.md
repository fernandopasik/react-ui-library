---
imports:
  Button: ../button/button.jsx
  Form: ./form.jsx
  Field: ./field.jsx
---

# Forms

```render jsx
<Form
  onSubmit={ (values) => { document.querySelector('#form-data').innerHTML = JSON.stringify(values); } }
  onReset={ () => { document.querySelector('#form-data').innerHTML = ''; } }
>
  <Field
    id="firstName"
    label="First Name"
    name="firstName"
    required
  />
  <Field
    id="lastName"
    label="Last Name"
    name="lastName"
  />
  <Field
    id="email"
    label="Email Address"
    name="email"
    type="email"
  />
  <Field
    component="select"
    id="country"
    label="Country of Residence"
    name="country"
    options={ [ 'Argentina', 'Italy', 'United Kingdom' ] }
    placeholder="Choose a country"
    required
  />
  <Field
    component="textarea"
    id="comments"
    label="Leave your comments"
    name="comments"
    required
    rows={ 3 }
  />
  <footer>
    <span id="form-data"></span>
    <Button type="submit" display="primary" caption="Send" />
    <Button type="reset" caption="Clear" />
  </footer>
</Form>
```
