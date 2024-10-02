import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  ListProps,
  Create,
  SimpleForm,
  TextInput,
  CreateProps,
  Edit,
  EditProps,
} from "react-admin";

// Liste des Gammes
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

// Création d'une Gamme
export const GammeCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="NOM_GAMME" label="Nom" />
    </SimpleForm>
  </Create>
);

// Édition d'une Gamme
export const GammeEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="NOM_GAMME" label="Nom" />
    </SimpleForm>
  </Edit>
);
