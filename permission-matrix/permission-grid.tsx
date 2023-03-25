import * as React from 'react';
import Grid from '@mui/material/Grid';
import { PermissionRow } from './permission-model';
import PermissionControlParent from './permission-parent-control';
import ChildPermissionControl from './permission-child-control';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
  HeaderCheckboxCheckedStatus,
  HeaderCheckboxProps,
} from './models/grid.models';

import Collapse from '@mui/material/Collapse';

export default function PermissionGrid(props) {
  const borderStyle = '1px solid gray';
  const headerCellStyle = {
    borderRight: borderStyle,
    borderTop: borderStyle,
    borderBottom: borderStyle,
  };
  const permissionTitleCellStyle = {
    borderRight: borderStyle,
  };
  const headerFirstCellStyle = {
    borderRight: borderStyle,
    borderBottom: borderStyle,
  };
  const gridStyle = { border: borderStyle };
  const headerCellStyleWithWidth = {
    borderRight: borderStyle,
    borderBottom: borderStyle,
    height: '55px',
  };
  const firstCellStyle = {
    borderRight: borderStyle,
    paddingTop: '4px',
  };
  const cellStyle = {
    paddingTop: '4px',
  };
  let groupByActionCategory = props.permissions.reduce((group, product) => {
    const { actionCategory } = product;
    group[actionCategory] = group[actionCategory] ?? [];
    group[actionCategory].push(product);
    return group;
  }, {});
  const CATEGORY_ORDER = ['VIEW', 'ADD', 'DELETE', 'CUSTOM']; // More can be added
  const categoryMap = {
    VIEW: 'View',
    ADD: 'Add',
    DELETE: 'Delete',
  };

  const COLUMN_PROPS: HeaderCheckboxProps = {
    accountManager: true,
    head: true,
    lead: true,
    user: true,
    analyst: true,
    admin: true,
  };

  const HEADERCHECKBOX_STATUS: HeaderCheckboxCheckedStatus = CATEGORY_ORDER.map(
    (item) => {
      return {
        [item]: { ...COLUMN_PROPS },
      };
    }
  ).reduce((cum, item) => {
    return { ...item, ...cum };
  }, {});

  const [expendedMap, setExpensionMap] = React.useState({
    VIEW: false,
    ADD: false,
    DELETE: false,
    ...props.expansionConfig,
  });

  const [categories] = React.useState(CATEGORY_ORDER);
  const [permissions, setPermission] = React.useState(groupByActionCategory);
  const [headerCheckBoxCheckedStatus, setHeaderCheckBoxCheckedStatus] =
    React.useState(HEADERCHECKBOX_STATUS);
  const [
    headerCheckBoxInterMediateStatus,
    setHeaderCheckBoxInterMediateStatus,
  ] = React.useState(JSON.parse(JSON.stringify(HEADERCHECKBOX_STATUS)));
  // const checkParentCheckBox = (rows: PermissionRow[], key: string) => {
  //   return !(rows ?? []).some((item) => !item[key]);
  // };
  const calcParentCheckBoxCheckedStatus = () => {
    for (const prop in headerCheckBoxCheckedStatus) {
      if (
        prop &&
        headerCheckBoxCheckedStatus[prop] &&
        groupByActionCategory[prop]
      ) {
        for (const keyProp in headerCheckBoxCheckedStatus[prop]) {
          const unchecked = groupByActionCategory[prop].some(
            (rowVal) => rowVal[keyProp] == false
          );
          const checked = groupByActionCategory[prop].some(
            (rowVal) => rowVal[keyProp] == true
          );
          headerCheckBoxCheckedStatus[prop][keyProp] = !unchecked;
          headerCheckBoxInterMediateStatus[prop][keyProp] =
            unchecked && checked;
        }
        setHeaderCheckBoxCheckedStatus({ ...headerCheckBoxCheckedStatus });
        setHeaderCheckBoxInterMediateStatus({
          ...headerCheckBoxInterMediateStatus,
        });
      }
    }
  };
  // const checkParentIntermediateCheckBox = (
  //   rows: PermissionRow[],
  //   key: string
  // ) => {
  //   const checked = (rows ?? []).some((item) => item[key]);
  //   const notChecked = (rows ?? []).some((item) => !item[key]);
  //   return notChecked && checked;
  // };

  const handleChangeEventChildRow = (
    row: PermissionRow,
    prop,
    currentValue
  ) => {
    row[prop] = currentValue?.target.checked;
    // setPermission({ ...groupByActionCategory });
    // console.log(props.permissions, 'props.permissions', row[prop], prop);
    props?.handleChange(props.permissions);
    // console.log()
    calcParentCheckBoxCheckedStatus();
  };
  const handleChangeEventParentRow = (
    rows: PermissionRow[],
    prop: string,
    currentValue
  ) => {
    rows.forEach((item) => {
      item[prop] = currentValue?.target.checked;
    });
    calcParentCheckBoxCheckedStatus();
    // setPermission({ ...groupByActionCategory });
    props?.handleChange(props.permissions);
  };

  React.useEffect(() => {
    groupByActionCategory = props.permissions.reduce((group, product) => {
      const { actionCategory } = product;
      group[actionCategory] = group[actionCategory] ?? [];
      group[actionCategory].push(product);
      return group;
    }, {});

    calcParentCheckBoxCheckedStatus();
    setPermission({ ...groupByActionCategory });
  }, [props.permissions]);

  React.useEffect(() => {
    setExpensionMap({
      VIEW: false,
      ADD: false,
      DELETE: false,
      ...props.expansionConfig,
    });
    // setPermission({ ...groupByActionCategory });
    // console.log(props?.expansionConfig);
  }, [props.expensionCcnfig]);
  const permissionMatrixColumnConfig = [
    { name: 'accountManager', style: firstCellStyle, colSpan: 1.5 },
    { name: 'head', colSpan: 1.5, style: cellStyle },
    { name: 'lead', colSpan: 1.5, style: cellStyle },
    { name: 'user', colSpan: 1.5, style: cellStyle },
    { name: 'analyst', colSpan: 1.5, style: cellStyle },
    { name: 'admin', colSpan: 1.5, style: cellStyle },
  ];

  const columnsHeaderNameConfig = [
    { name: 'Account Manager', colSpan: 1.5, style: cellStyle },
    { name: 'Head', colSpan: 1.5, style: cellStyle },
    { name: 'Lead', colSpan: 1.5, style: cellStyle },
    { name: 'User', colSpan: 1.5, style: cellStyle },
    { name: 'Analyst', colSpan: 1.5, style: cellStyle },
    { name: 'Admin', colSpan: 1.5, style: cellStyle },
  ];

  const gridTitleColSpan = 3;
  const setOpen = (prop: string, open: boolean) => {
    setExpensionMap({ ...expendedMap, [prop]: open });
  };
  return (
    <Grid container spacing={2} style={gridStyle}>
      <Grid item xs={gridTitleColSpan} style={headerCellStyleWithWidth}>
        <b>Permission</b>
      </Grid>
      {columnsHeaderNameConfig.map((item) => (
        <Grid item xs={item.colSpan} style={headerCellStyleWithWidth}>
          <b>{item.name}</b>
        </Grid>
      ))}
      {categories.map((category, index) => {
        return permissions[category]?.length ? (
          <React.Fragment>
            {/* Group */}
            <Grid
              item
              xs={gridTitleColSpan}
              style={index == 0 ? headerFirstCellStyle : headerCellStyle}
            >
              <b>{categoryMap[category] ?? category} Access</b>{' '}
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(category, !expendedMap[category])}
              >
                {expendedMap[category] ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </Grid>
            {permissionMatrixColumnConfig.map((item) => (
              <Grid item xs={item.colSpan} style={item.style}>
                <PermissionControlParent
                  permissions={permissions}
                  category={category}
                  columnName={item.name}
                  checked={headerCheckBoxCheckedStatus[category][item.name]}
                  indeterminate={
                    headerCheckBoxInterMediateStatus[category][item.name]
                  }
                  handleChangeEventParentRow={handleChangeEventParentRow}
                />
              </Grid>
            ))}
            {/* categorised */}
            {(permissions[category] ?? []).map((permission) => {
              if (expendedMap[category]) {
                return (
                  <React.Fragment>
                    <Grid
                      item
                      xs={gridTitleColSpan}
                      style={{
                        ...permissionTitleCellStyle,
                        display: expendedMap[category] ? 'initial' : 'none',
                      }}
                    >
                      {permission?.action}
                    </Grid>
                    {permissionMatrixColumnConfig.map((item) => (
                      <Grid
                        item
                        xs={item.colSpan}
                        style={{
                          ...item?.style,
                          display: expendedMap[category] ? 'initial' : 'none',
                        }}
                      >
                        <ChildPermissionControl
                          handleChangeEventChildRow={handleChangeEventChildRow}
                          permission={permission}
                          columnName={item.name}
                          headerChecked={
                            headerCheckBoxCheckedStatus[category][item.name]
                          }
                          headerIndeterminate={
                            headerCheckBoxInterMediateStatus[category][
                              item.name
                            ]
                          }
                        />
                      </Grid>
                    ))}
                  </React.Fragment>
                );
              } else {
                return <React.Fragment></React.Fragment>;
              }
            })}
          </React.Fragment>
        ) : (
          <React.Fragment />
        );
      })}
    </Grid>
  );
}
