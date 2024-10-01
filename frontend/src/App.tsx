import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { FrizbeeList, FrizbeeCreate, FrizbeeEdit } from "./components/frizbee";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="frizbees"
      list={FrizbeeList}
      create={FrizbeeCreate}
      edit={FrizbeeEdit}
    />
  </Admin>
);
