import React, { useEffect, useState } from "react";
import { Operator } from "../App";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Button from "./Button";
import firebase from "firebase";
import useLocalStorage from "../UseLocalStorage";

interface Props {
}

const DevTab: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>August 03</h1>
      <h2>Bugfixes</h2>
      <ul>
        <li>Fixed a bug where new operator releases wouldn't be imported on refresh</li>
        <li>Fixed a related bug where this would cause outdated saved data to crash and fail to render</li>
      </ul>
      <h1>August 03</h1>
      <h2>News</h2>
      <ul>
        <li>Collection view redesigned</li>
        <ul>
          <li>Border and background color added</li>
          <li>Spacing and arrangement adjusted</li>
        </ul>
        <li>Starters are no longer automatically owned upon first launch</li>
      </ul>
      <h1>August 02</h1>
      <h2>News</h2>
      <ul>
        <li>Starters are now automatically owned upon first launch</li>
        <li>Various UI improvements</li>
        <li>Readme updated</li>
        <li>Description updated</li>
      </ul>
      <h1>August 01</h1>
      <h2>News</h2>
      <ul>
        <li>neia.io officially hosted and published</li>
        <li>favicon updated</li>
        <li>Dev tab added</li>
        <li>Ability to filter operator list restored</li>
        <li>Disabled creation of new accounts while bugs are being patched</li>
      </ul>
      <h2>Bugfixes</h2>
      <ul>
        <li>Fixed a bug where E1 operators were locked at skill level 4</li>
        <li>Fixed a bug where switching tab would log you out of your account</li>
        <li>Fixed a bug where masteries would occasionally fail to display</li>
      </ul>
    </div>
  )
};
export default DevTab;
