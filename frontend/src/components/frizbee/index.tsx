import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
} from "react-admin";

export const FrizbeeList = () => (
  <List>
    <Datagrid>
      <TextField source="ID_FRIZBEE" label="ID" />
      <TextField source="NOM_FRIZBEE" label="Nom" />
      <TextField source="DESCRIPTION_FRIZBEE" label="Description" />
      <NumberField source="PUHT" label="PUHT" />
      <NumberField source="STOCK" label="Stock" />
      <NumberField source="ID_PROCEDE" label="ID Procede" />
      <NumberField source="ID_GAMME" label="ID Gamme" />
      <NumberField source="ORDRE" label="Ordre" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const FrizbeeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="ID_FRIZBEE" label="ID" />
      <TextInput source="NOM_FRIZBEE" label="Nom" />
      <TextInput source="DESCRIPTION_FRIZBEE" label="Description" />
      <NumberInput source="PUHT" label="PUHT" />
      <NumberInput source="STOCK" label="Stock" />
      <NumberInput source="ID_PROCEDE" label="ID Procede" />
      <NumberInput source="ID_GAMME" label="ID Gamme" />
      <NumberInput source="ORDRE" label="Ordre" />
    </SimpleForm>
  </Edit>
);

export const FrizbeeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="NOM_FRIZBEE" label="Nom" />
      <TextInput source="DESCRIPTION_FRIZBEE" label="Description" />
      <NumberInput source="PUHT" label="PUHT" />
      <NumberInput source="STOCK" label="Stock" />
      <NumberInput source="ID_PROCEDE" label="ID Procede" />
      <NumberInput source="ID_GAMME" label="ID Gamme" />
      <NumberInput source="ORDRE" label="Ordre" />
    </SimpleForm>
  </Create>
);
