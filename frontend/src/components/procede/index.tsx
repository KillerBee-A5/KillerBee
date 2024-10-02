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

// Liste des Procédés
export const ProcedeList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="NOM_PROCEDE" label="Nom" />
      <TextField source="DESCRIPTION_PROCEDE" label="Description" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Création d'un Procédé
export const ProcedeCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="NOM_PROCEDE" label="Nom" />
      <TextInput source="DESCRIPTION_PROCEDE" label="Description" />
    </SimpleForm>
  </Create>
);

// Édition d'un Procédé
export const ProcedeEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="NOM_PROCEDE" label="Nom" />
      <TextInput source="DESCRIPTION_PROCEDE" label="Description" />
    </SimpleForm>
  </Edit>
);
