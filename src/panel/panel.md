---
imports:
  Panel: ./panel.js
  Button: ../button/button.js
---

# Panel

Put content in a box

```render jsx
<Panel>This is content</Panel>
```

A title can be set through an attribute

```render jsx
<Panel title="Example title">This is content</Panel>
```

A separate header and/or footer

```render jsx
<Panel>
  <header><h3>This is a semantic title in header</h3></header>
  This is content
  <footer><Button>OK</Button></footer>
</Panel>
```

Collapse the panel to the header

```render jsx
<Panel collapsed id="example">
  <header><h3>This is a collapsed panel</h3></header>
  This is content
  <footer><Button>OK</Button></footer>
</Panel>
```
