import React, { useEffect, useState } from "react";
import { Operator } from "../App";
import firebase from "firebase/app";
import "firebase/database";
import operatorJson from "../data/operators.json";
import { Hidden, makeStyles } from "@material-ui/core";
import OperatorCollectionBlock from "./collectionTab/OperatorCollectionBlock";
import { classList } from "./DataTab";
import SelectorClass from "./dataTab/SelectorClass";
import SelectorRarity from "./dataTab/SelectorRarity";
import Drawer from "./Drawer";
import SelectorSortOptions from "./collectionTab/SelectorSortOptions";
import useLocalStorage from "../UseLocalStorage";
import OperatorCollectionBlockM from "./collectionTab/OperatorCollectionBlockM";
import TextInput from "./accountTab/TextInput";
import FormButton from "./FormButton";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: "calc(2.5% + 4px)",
    paddingTop: "calc(1.5% + 4px)",
  },
  collectionContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px 6px",
  },
  dummyContainer: {
    width: "162px",
    height: "0px",
  },
  drawerBox: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
  },
  horizontalDivider: {
    backgroundColor: "#909090",
    width: "70%",
    height: "2px",
    borderWidth: "0px",
    marginTop: "6px",
    marginBottom: "6px",
    marginLeft: "20px",
  },
  hideCorners: {
    borderRadius: "0px",
    height: "30px",
    flexGrow: 0,
    marginTop: "calc(0.7vh + 10px)",
  },
  searchBlock: {
    display: "flex",
    gap: "8px",
    alignItems: "start",
  },
});

interface Props {
  inOperators: Record<string, Operator>;
  findUser?: (s: string) => Promise<boolean>;
  username?: string;
}

const CollectionTab = React.memo((props: Props) => {
  const { inOperators, username } = props;
  const classes = useStyles();

  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<number[]>([]);
  const [sortFavorites, setSortFavorites] = useLocalStorage<boolean>("sortFav", false);
  const filterBar =
    <Drawer
      label={"Filter"}
    >
      <SelectorClass
        onClick={((cl: string) => {
          const index = selectedClasses.indexOf(cl);
          if (index > -1) {
            selectedClasses.splice(index, 1)
            setSelectedClasses(selectedClasses => [...selectedClasses]);
          }
          else {
            setSelectedClasses(selectedClasses => [...selectedClasses, cl]);
          }
        })}
        activeClasses={selectedClasses}
      />
      <SelectorRarity
        onClick={((rar: number) => {
          const index = selectedRarities.indexOf(rar);
          if (index > -1) {
            selectedRarities.splice(index, 1)
            setSelectedRarities(selectedRarities => [...selectedRarities]);
          }
          else {
            setSelectedRarities(selectedRarities => [...selectedRarities, rar]);
          }
        })}
        activeRarities={selectedRarities}
      />
      <SelectorSortOptions
        sortFav={sortFavorites}
        setSortFav={setSortFavorites}
        clearFilter={() => {
          setSelectedClasses([]);
          setSelectedRarities([]);
          setSortFavorites(false);
        }}
      />
    </Drawer>

  const [operators, setOperators] = useState(inOperators);
  const findUser = async (username: string, onFinish: (b: boolean) => void): Promise<void> => {
    const snapshot = await firebase
      .database()
      .ref("phonebook/" + username)
      .get();
    if (snapshot.exists()) {
      viewUserCollection(snapshot.val());
      onFinish(true);
    }
    else {
      onFinish(false);
    }
  };
  const viewUserCollection = (uid: string): void => {
    firebase
      .database()
      .ref("users/" + uid + "/roster/")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setOperators(snapshot.val());
        }
      });
  };

  function tryFind() {
    findUser(searchUser.toLowerCase(), (b: boolean) => {
      setSuccess(b)
    })
  }

  useEffect(() => {
    if (username) {
      findUser(username, tryFind);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchUser, setSearchUser] = useState<string>(username?.toLowerCase() ?? "");
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const searchBar =
    <Drawer
      label={"Search"}
      open={true}
    >
      <div className={classes.searchBlock}>
        <TextInput
          label={"Find a User"}
          value={searchUser}
          onChange={setSearchUser}
          placeholder={"Enter a username"}
          description={success === undefined ? "" : success ? "Success" : "Could not find user."}
        />
        <FormButton
          className={classes.hideCorners}
          onClick={tryFind}
          disabled={searchUser === ""}
        >
          Search
        </FormButton>
      </div>
    </Drawer>

  const filterObject = (op: any) => {
    const a = operators[op.id];
    return a.owned
      && (selectedClasses.length === 0 || selectedClasses.includes(op.class))
      && (selectedRarities.length === 0 || selectedRarities.includes(op.rarity))
  }

  function defaultSortComparator(x: any, y: any) {
    const a = operators[x.id];
    const b = operators[y.id];
    return (
      (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0) ||
      (b.owned ? 1 : 0) - (a.owned ? 1 : 0) ||
      b.promotion - a.promotion ||
      b.level - a.level ||
      b.rarity - a.rarity ||
      classList.indexOf(x.class) - classList.indexOf(y.class) ||
      (b.module?.length ?? 0) - (a.module?.length ?? 0) ||
      a.name.localeCompare(b.name)
    );
  }

  const collection =
    Object.values(operatorJson)
      .filter((op: any) => op.class !== "Token" && op.class !== "Trap")
      .filter(filterObject)
      .sort(defaultSortComparator)

  return (
    <div className={classes.container}>
      <div className={classes.drawerBox}>
        {username !== undefined ? searchBar : ""}
        {filterBar}
      </div>
      <div className={classes.horizontalDivider} />
      <div className={classes.collectionContainer}>
        {collection
          .map((op: any) => (
            <div key={op.id}>
              <Hidden xsDown>
                <OperatorCollectionBlock op={operators[op.id]} />
              </Hidden>
              <Hidden smUp>
                <OperatorCollectionBlockM op={operators[op.id]} />
              </Hidden>
            </div>
          ))
        }
        {[...Array(20)].map((_, i: number) => <div key={i} className={classes.dummyContainer} />)}
      </div>
    </div>
  );

});
export default CollectionTab;
