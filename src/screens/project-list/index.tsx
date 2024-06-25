import { useState, useEffect } from "react";
import { List } from "./list";
import React from "react";
import { SearchPanel } from "./search-panel";
import { cleanObject, useDebounce, useMount } from "../../utils/index";
import qs from "qs";

export const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  const debounceParam = useDebounce(param, 2000);

  useEffect(() => {
    console.log(">>>useEffect param", param, qs.stringify(cleanObject(param)));
    // name=${param.name}&personId=${param.personId}`
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
