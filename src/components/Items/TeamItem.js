import { useState } from "react";
import Card from "../UI/Card";
import styles from "./TeamItem.module.css";

const TeamItem = (props) => {
  return <Card>{props.id}</Card>;
};

export default TeamItem;
