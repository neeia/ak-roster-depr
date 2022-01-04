import { makeStyles } from "@material-ui/core";
import React from "react";
import FormButton from "./FormButton";
import FormField from "./FormField";


const useStyles = makeStyles({
  container: {
    marginBottom: "12px",
  },
  pageDisplay: {
    marginLeft: "6px",
    marginRight: "6px",
  },
  pageTextField: {
    marginLeft: "6px",
    marginRight: "6px",
    maxWidth: "20px",
  },
});

interface Props {
  page: number;
  setPage: (page: number) => void;
  numPages: number
}

const CollectionTabNavbar = React.memo((props: Props) => {
const classes = useStyles();
const { page, setPage, numPages } = props;

  return (
    <div className={classes.container}>
    <FormButton onClick={() => setPage(1)}>
      {"<<"}
    </FormButton>
    <FormButton onClick={() => setPage(page - 1)}>
      {"<"}
    </FormButton>
    <span className={classes.pageDisplay}>
        Page
        <span className={classes.pageTextField}>
          <FormField onChange={(value: string) => setPage(parseInt(value))}>
            {page}
          </FormField>
        </span>
      of {numPages}
    </span>
    <FormButton onClick={() => setPage(page + 1)}>
      {">"}
    </FormButton>
    <FormButton onClick={() => setPage(numPages)}>
      {">>"}
    </FormButton>
  </div>
);

});
export default CollectionTabNavbar;
