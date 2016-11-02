---
imports:
  Field: ./field.js
---
# Fields

Renders an input by default

```render jsx
<Field id="user" name="user" />
```

Optional parameter for labels

```render jsx
<Field id="user1" label="User Name" name="user" />
```

Error messages are displayed under the form element

```render jsx
<Field id="user2" label="User Name" name="user" required validate />
```

Can be displayed inline

```render jsx
<Field id="user3" inline label="User Name" name="user" required validate />
```

## Form Element attributes

Accepted types are text, email, number, password, search, tel or url

```render jsx
<Field id="user4-1" inline label="text" type="text" />
<Field id="user4-2" inline label="email" type="email" />
<Field id="user4-3" inline label="number" type="number" />
<Field id="user4-4" inline label="password" type="password" />
<Field id="user4-5" inline label="search" type="search" />
<Field id="user4-6" inline label="tel" type="tel" />
<Field id="user4-7" inline label="url" type="url" />
<Field id="user4-8" inline label="color" type="color" />
<Field id="user4-9" inline label="range" type="range" />
<Field id="user4-10" inline label="date" type="date" />
<Field id="user4-11" inline label="datetime-local" type="datetime-local" />
<Field id="user4-12" inline label="month" type="month" />
<Field id="user4-13" inline label="week" type="week" />
```

A placeholder text can be set
```render jsx
<Field id="user5" label="User Name" name="user" placeholder="User Name" />
```

When required there's a small icon next to the label

```render jsx
<Field id="user6" label="User Name" name="user" required />
```

Can be disabled

```render jsx
<Field disabled id="user7" label="User Name" name="user" />
```

Can be readonly

```render jsx
<Field id="user8" label="User Name" name="user" readOnly />
```

Instead of value you can set a defaultValue
```render jsx
<Field defaultValue="Fernando" id="user9" name="user" />
```

## Select field

```render jsx
<Field component="select" id="user10" label="Choose a color" name="user" options={ [ 'red', 'green', 'blue' ] } placeholder="Choose a color" />
```

Inline

```render jsx
<Field component="select" id="user10" inline name="user" label="Choose a color" options={ [ 'red', 'green', 'blue' ] } placeholder="Choose a color" />
```
