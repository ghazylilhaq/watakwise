import SelectPersonalityForm from "@/components/selection/SelectPersonalityForm";
import React from "react";
import axios from "axios";

type Props = {};

const SelectionPage = async (props: Props) => {
const {data} = await axios.post('http://localhost:3000/api/auth');

console.log(data)

  return <SelectPersonalityForm />;
};

export default SelectionPage;
