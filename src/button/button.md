---
imports:
  Button: ./button.js
---
# Buttons

## Caption

When just a text is inside the button

```render jsx
<Button caption="OK" />
```

## Content

Complex html content can also be inside the button.

```render jsx
<Button><span>$</span>Pay</Button>
```

## Disabled

When interaction is forbidden but the button remains

```render jsx
<Button caption="Disabled" disabled />
```

## Sizes

Three sizes default, large, small.

```render jsx
<Button caption="small" size="small" />
<Button caption="default" />
<Button caption="large" size="large" />
```

## Display Types

There are display types default and primary.

```render jsx
<Button caption="Default" />
<Button caption="Primary" display="primary" />
```

Sometimes buttons may look like links

```render jsx
<Button caption="Link button" display="link" />
```

## Full width

Block buttons that cover the entire full width

```render jsx
<Button block caption="Cancel" />
<Button block caption="OK" display="primary" />
```
