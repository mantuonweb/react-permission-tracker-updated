import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React = require('react');
export default function ChildPermissionControl(props) {
  const [isChecked, setChecked] = React.useState(
    !!props?.permission[props?.columnName]
  );
  React.useEffect(() => {
    if (!props.headerIndeterminate) {
      setChecked(props.headerChecked);
    }
  }, [props.headerChecked, props.headerIndeterminate]);
  return (
    <FormControlLabel
      label=""
      control={
        <Checkbox
          checked={isChecked}
          onChange={(event) => {
            setChecked(event?.target.checked);
            props?.handleChangeEventChildRow(
              props?.permission,
              props?.columnName,
              event
            );
          }}
        />
      }
    />
  );
}
