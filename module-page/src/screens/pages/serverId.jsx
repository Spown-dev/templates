import React from "react";
import { useParams } from "react-router-dom";

const ServerId = () => {
  const { serverId } = useParams();
  return <div>Leadboard: {serverId}</div>;
};

export default ServerId;
