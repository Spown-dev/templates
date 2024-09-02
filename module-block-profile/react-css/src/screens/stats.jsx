import React from "react";
import { useParams } from "react-router-dom";

const Stats = () => {
  const { playerId } = useParams();
  return <div>Stats, profile: {playerId}</div>;
};

export default Stats;
