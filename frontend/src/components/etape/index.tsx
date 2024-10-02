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

// Liste des Étapes
export const EtapeList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="NOM_ETAPE" label="Nom" />
      <TextField source="DESCRIPTION_ETAPE" label="Description" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Création d'une Étape
export const EtapeCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="NOM_ETAPE" label="Nom" />
      <TextInput source="DESCRIPTION_ETAPE" label="Description" />
    </SimpleForm>
  </Create>
);

// Édition d'une Étape
export const EtapeEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="NOM_ETAPE" label="Nom" />
      <TextInput source="DESCRIPTION_ETAPE" label="Description" />
    </SimpleForm>
  </Edit>
);
