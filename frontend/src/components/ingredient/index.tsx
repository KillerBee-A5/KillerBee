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

// Liste des Ingrédients
export const IngredientList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="NOM_INGREDIENT" label="Nom" />
      <TextField source="DESCRIPTION_INGREDIENT" label="Description" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// Création d'un Ingrédient
export const IngredientCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="NOM_INGREDIENT" label="Nom" />
      <TextInput source="DESCRIPTION_INGREDIENT" label="Description" />
    </SimpleForm>
  </Create>
);

// Édition d'un Ingrédient
export const IngredientEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="NOM_INGREDIENT" label="Nom" />
      <TextInput source="DESCRIPTION_INGREDIENT" label="Description" />
    </SimpleForm>
  </Edit>
);
