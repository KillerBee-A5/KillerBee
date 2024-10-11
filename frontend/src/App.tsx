import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import { FrizbeeList, FrizbeeCreate, FrizbeeEdit } from "./components/frizbee";
import { GammeList, GammeCreate, GammeEdit } from "./components/gamme";
import { EtapeList, EtapeCreate, EtapeEdit } from "./components/etape";
import { ProcedeList, ProcedeCreate, ProcedeEdit } from "./components/procede";
import {
  IngredientList,
  IngredientCreate,
  IngredientEdit,
} from "./components/ingredient";
import {
  ComposerList,
  ComposerEdit,
  ComposerCreate,
} from "./components/composer";
import {
  ConstituerList,
  ConstituerEdit,
  ConstituerCreate,
} from "./components/constituer";

export const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      name="frizbees"
      list={FrizbeeList}
      create={FrizbeeCreate}
      edit={FrizbeeEdit}
    />
    <Resource
      name="gammes"
      list={GammeList}
      create={GammeCreate}
      edit={GammeEdit}
    />
    <Resource
      name="etapes"
      list={EtapeList}
      create={EtapeCreate}
      edit={EtapeEdit}
    />
    <Resource
      name="procedes"
      list={ProcedeList}
      create={ProcedeCreate}
      edit={ProcedeEdit}
    />
    <Resource
      name="ingredients"
      list={IngredientList}
      create={IngredientCreate}
      edit={IngredientEdit}
    />
    <Resource
      name="composer"
      list={ComposerList}
      edit={ComposerEdit}
      create={ComposerCreate}
    />
    <Resource
      name="constituer"
      list={ConstituerList}
      edit={ConstituerEdit}
      create={ConstituerCreate}
    />
  </Admin>
);
