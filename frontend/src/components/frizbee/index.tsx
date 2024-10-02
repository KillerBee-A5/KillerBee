// src/components/frizbee/FrizbeeList.tsx

import React from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  DeleteButton,
  ReferenceField,
  ListProps,
  CreateProps,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  EditProps,
  Edit,
} from "react-admin";

export const FrizbeeList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="NOM_FRIZBEE" label="Nom" />
      <TextField source="DESCRIPTION_FRIZBEE" label="Description" />
      <NumberField
        source="PUHT"
        label="Prix HT"
        options={{ minimumFractionDigits: 2 }}
      />
      <NumberField source="STOCK" label="Stock" />
      <ReferenceField label="Gamme" source="ID_GAMME" reference="gammes">
        <TextField source="NOM_GAMME" />
      </ReferenceField>
      <ReferenceField label="Procédé" source="ID_PROCEDE" reference="procedes">
        <TextField source="NOM_PROCEDE" />
      </ReferenceField>
      <NumberField source="ORDRE" label="Ordre" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const FrizbeeCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="NOM_FRIZBEE" label="Nom" />
      <TextInput source="DESCRIPTION_FRIZBEE" label="Description" />
      <NumberInput source="PUHT" label="Prix unitaire HT" />
      <NumberInput source="STOCK" label="Stock" />
      <ReferenceInput label="Gamme" source="ID_GAMME" reference="gammes">
        <SelectInput optionText="NOM_GAMME" />
      </ReferenceInput>
      <ReferenceInput label="Procédé" source="ID_PROCEDE" reference="procedes">
        <SelectInput optionText="NOM_PROCEDE" />
      </ReferenceInput>
      <NumberInput source="ORDRE" label="Ordre" />
    </SimpleForm>
  </Create>
);

export const FrizbeeEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="NOM_FRIZBEE" label="Nom" />
      <TextInput source="DESCRIPTION_FRIZBEE" label="Description" />
      <NumberInput source="PUHT" label="Prix unitaire HT" />
      <NumberInput source="STOCK" label="Stock" />
      <ReferenceInput label="Gamme" source="ID_GAMME" reference="gammes">
        <SelectInput optionText="NOM_GAMME" />
      </ReferenceInput>
      <ReferenceInput label="Procédé" source="ID_PROCEDE" reference="procedes">
        <SelectInput optionText="NOM_PROCEDE" />
      </ReferenceInput>
      <NumberInput source="ORDRE" label="Ordre" />
    </SimpleForm>
  </Edit>
);

