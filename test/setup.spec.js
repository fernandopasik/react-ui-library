import a11y from 'react-a11y';
import React from 'react';

before(() => a11y(React, { throw: true }));
after(() => a11y.restoreAll());
