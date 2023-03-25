import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React = require('react');

export default function PermissionControlParent(props) {
  return (
    <FormControlLabel
      label=""
      control={
        <Checkbox
          checked={props?.checked}
          indeterminate={props?.indeterminate}
          onChange={(event) => {
            props?.handleChangeEventParentRow(
              props?.permissions[props?.category],
              props?.columnName,
              event
            );
          }}
        />
      }
    />
  );
}
