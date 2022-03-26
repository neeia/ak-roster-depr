import React, { useState } from "react";
import { classList, COLOR_BY_RARITY } from "./DataTab";
import { Box, makeStyles, TextField } from "@material-ui/core";
import FormButton from "./FormButton";

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
  numPages: number;
  filterType: string;
  setFilterType: (type: string) => void;
  filter: string | number;
  setFilter: (newFilter: string | number) => void;
}

const CollectionTabNavbar = React.memo((props: Props) => {
  const classes = useStyles();
  const { page, setPage, numPages, filterType, setFilterType, filter, setFilter } = props;

  const [showFilter, setShowFilter] = useState(false);

  function toggleFilter(): void {
    setShowFilter(!showFilter);
  }

  const [pageField, setPageField] = React.useState<number | string>(page);

  function updatePage(newPage: string | number) {
    if (typeof newPage === "number") {
      setPage(newPage);
      if (newPage > 0 && newPage <= numPages) {
        setPageField(newPage);
      }
    }
    else if (parseInt(newPage)) {
      setPage(parseInt(newPage));
      if (parseInt(newPage) > 0 && parseInt(newPage) <= numPages) {
        setPageField(newPage);
      }
    }
    else {
      setPageField("");
    }
  };

  return (
    <div className={classes.container}>
      <FormButton onClick={() => updatePage(1)}>
        {"<<"}
      </FormButton>
      <FormButton onClick={() => updatePage(page - 1)}>
        {"<"}
      </FormButton>
      <span className={classes.pageDisplay}>
          Page
        <TextField
          onChange={e => updatePage(e.target.value)}
          className={classes.pageTextField}
          value={pageField}
        />
        of {numPages}
      </span>
      <FormButton onClick={() => updatePage(page + 1)}>
        {">"}
      </FormButton>
      <FormButton onClick={() => updatePage(numPages)}>
        {">>"}
      </FormButton>
      <FormButton onClick={() => toggleFilter()} toggled={showFilter}>
        {/*<FilterAltIcon fontSize={"small"} />*/}
        Filter
      </FormButton>
      {showFilter ?
        <span>
          {" | "}
          <FormButton onClick={() => setFilterType("class")} toggled={filterType==="class"}>
            Class
          </FormButton>
          <FormButton onClick={() => setFilterType("rarity")} toggled={filterType === "rarity"}>
            Rarity
          </FormButton>
          {filterType === "class" ?
            <span>
              {" | "}
              {classList.map((cl: string) => (
                <FormButton
                  onClick={() => setFilter(cl)}
                  toggled={filter === cl}
                >
                  {cl}
                </FormButton>))
              }
            </span>
            : ""}
          {filterType === "rarity" ?
            <span>
              {" | "}
              {[...Array(6)].map((x, i) =>
                <FormButton
                  onClick={() => setFilter(i + 1)}
                  toggled={filter === i + 1}
                >
                  {i + 1}
                  <Box position="absolute" bottom={1}>
                    <div style={{ width: 9, height: 3, backgroundColor: COLOR_BY_RARITY[i + 1], marginBottom: 3 }} />
                  </Box>
                </FormButton>
              )}
            </span>
            : ""}
        </span>
        : ""}
    </div>
);

});
export default CollectionTabNavbar;
