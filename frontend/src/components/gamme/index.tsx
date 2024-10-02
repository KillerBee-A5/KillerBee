import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ListProps,
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  EditProps,
  Edit,
} from "react-admin";

export const GammeList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="NOM_GAMME" label="Nom" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const GammeCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="NOM_GAMME" label="Nom" />
    </SimpleForm>
  </Create>
);

export const GammeEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="NOM_GAMME" label="Nom" />
    </SimpleForm>
  </Edit>
);
