import React from "react";
import { User } from "./search-panel";
interface Project {
  id: string;
  name: string;
  personId: string;
  organization: string;
  pin: boolean;
}
interface ListProps {
  users: User[];
  list: Project[];
}
export const List = ({ users, list }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.personId}>
            <td>{project.name}</td>
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
