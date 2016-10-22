---
imports:
  Button: ../button/button.js
  Dropdown: ./dropdown.js
---
# Dropdown

By default uses button trigger

```render jsx
<Dropdown caption="Menu" options={ [ 'About us', 'Products', 'Contact' ] } />
```

Can provide children triggers

```render jsx
<Dropdown options={ [ 'About us', 'Products', 'Contact' ] }>
  <Button caption="Menu" />
</Dropdown>

<Dropdown options={ [ 'About us', 'Products', 'Contact' ] }>
  <Button caption="Menu" display="link" />
</Dropdown>
```

Can put a limit to visible options

```render jsx
<Dropdown caption="Menu" options={ [ 'About us', 'Products', 'Contact' ] } size={ 2 } />
```