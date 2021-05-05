import React, { useState } from "react";
import Operator from "./Operator";

const OpForm: React.FC = () => {
  const [operatorName, setOperatorName] = useState(""); // where "" is the initial value
  return (
    <>
      {/* <label>Operator name:
        <input onChange={(e) => setOperatorName(e.target.value)} />
      </label>
      <Operator 
        name={operatorName} 
        rarity= {6}
        potential={1}
        promotion={0}
        level={1}
        skillLevel={1}
        skill1Mastery={0}
        skill2Mastery={0}
        skill3Mastery={0} /> */}
    </>
  );
};

export default OpForm;
