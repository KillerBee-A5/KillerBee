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
  Create,
  SimpleForm,
  NumberInput,
  ReferenceInput,
  SelectInput,
  CreateProps,
  Edit,
  EditProps,
  TextInput,
} from "react-admin";

/**
 * Liste des Composers
 */
export const ComposerList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <ReferenceField label="Procédé" source="ID_PROCEDE" reference="procedes">
        <TextField source="NOM_PROCEDE" />
      </ReferenceField>
      <ReferenceField label="Étape" source="ID_ETAPE" reference="etapes">
        <TextField source="NOM_ETAPE" />
      </ReferenceField>
      <NumberField source="ORDRE" label="Ordre" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

/**
 * Création d'un Composer
 */
export const ComposerCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Procédé" source="ID_PROCEDE" reference="procedes">
        <SelectInput optionText="NOM_PROCEDE" />
      </ReferenceInput>
      <ReferenceInput label="Étape" source="ID_ETAPE" reference="etapes">
        <SelectInput optionText="NOM_ETAPE" />
      </ReferenceInput>
      <NumberInput source="ORDRE" label="Ordre" />
    </SimpleForm>
  </Create>
);

/**
 * Édition d'un Composer
 */
export const ComposerEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" label="ID" />
      <ReferenceInput label="Procédé" source="ID_PROCEDE" reference="procedes">
        <SelectInput optionText="NOM_PROCEDE" />
      </ReferenceInput>
      <ReferenceInput label="Étape" source="ID_ETAPE" reference="etapes">
        <SelectInput optionText="NOM_ETAPE" />
      </ReferenceInput>
      <NumberInput source="ORDRE" label="Ordre" />
    </SimpleForm>
  </Edit>
);
