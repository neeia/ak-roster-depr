import React from "react";
import { useDataStyles } from "./DataTabSharedStyles";
import { Grid, Hidden } from "@material-ui/core";

interface Props {
  label: string;
  part: boolean;
}

const DataLabel = React.memo((props: Props) => {
  const style = useDataStyles();
  const { label, part } = props;

  return (
    part
      ? <Hidden xsDown>
        < Grid item sm={12} >
          <h4 className={style.label}>
            {label}
          </h4>
        </Grid >
        <Grid item xs={12}>
          <hr className={style.horizontalDividerS} />
        </Grid>
      </Hidden>
      : <Hidden smUp>
        <Grid item xs={3} className={style.label}>
          <h4 className={style.label}>
            {label}
          </h4>
        </Grid>
        <Grid item xs={1} className={style.dividerContainer}>
          <hr className={style.verticalDividerS} />
        </Grid>
      </Hidden>
  )
});
export default DataLabel;