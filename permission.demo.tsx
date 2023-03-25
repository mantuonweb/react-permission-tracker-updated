import { Box, Button } from '@mui/material';
import React = require('react');
import PermissionGrid from './permission-matrix/permission-grid';
import { DATA } from './permission-matrix/data';

export default function PermissionMatrix() {
  const rawData = JSON.parse(JSON.stringify(DATA));
  const [permissionData, setPermisionData] = React.useState(
    JSON.parse(JSON.stringify(DATA))
  );
  let currentValue = rawData;
  const handleChange = (matrix) => {
    currentValue = matrix;
  };
  const expansionConfig = {
    VIEW: true,
    ADD: false,
    DELETE: false,
  };
  return (
    <React.Fragment>
      <div style={{ margin: '4em' }}>
        <Box
          sx={{ width: '100%' }}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            columnGap: '1em',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              currentValue = JSON.parse(JSON.stringify(rawData));
              setPermisionData(JSON.parse(JSON.stringify(rawData)));
            }}
          >
            Reset
          </Button>
          <Button variant="contained" color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              console.table(currentValue);
              alert('Please check console');
            }}
          >
            Submit
          </Button>
        </Box>
        <Box sx={{ width: '100%' }} style={{ marginTop: '30px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <PermissionGrid
              permissions={permissionData}
              handleChange={handleChange}
              expansionConfig={expansionConfig}
            />
          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
}
