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
 * Liste des Constituer
 */
export const ConstituerList: React.FC<ListProps> = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <ReferenceField label="Frizbee" source="ID_FRIZBEE" reference="frizbees">
        <TextField source="NOM_FRIZBEE" />
      </ReferenceField>
      <ReferenceField
        label="Ingrédient"
        source="ID_INGREDIENT"
        reference="ingredients"
      >
        <TextField source="NOM_INGREDIENT" />
      </ReferenceField>
      <NumberField source="GRAMMAGE" label="Grammage" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

/**
 * Création d'un Constituer
 */
export const ConstituerCreate: React.FC<CreateProps> = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="Frizbee" source="ID_FRIZBEE" reference="frizbees">
        <SelectInput optionText="NOM_FRIZBEE" />
      </ReferenceInput>
      <ReferenceInput
        label="Ingrédient"
        source="ID_INGREDIENT"
        reference="ingredients"
      >
        <SelectInput optionText="NOM_INGREDIENT" />
      </ReferenceInput>
      <NumberInput source="GRAMMAGE" label="Grammage" />
    </SimpleForm>
  </Create>
);

/**
 * Édition d'un Constituer
 */
export const ConstituerEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" label="ID" />
      <ReferenceInput label="Frizbee" source="ID_FRIZBEE" reference="frizbees">
        <SelectInput optionText="NOM_FRIZBEE" />
      </ReferenceInput>
      <ReferenceInput
        label="Ingrédient"
        source="ID_INGREDIENT"
        reference="ingredients"
      >
        <SelectInput optionText="NOM_INGREDIENT" />
      </ReferenceInput>
      <NumberInput source="GRAMMAGE" label="Grammage" />
    </SimpleForm>
  </Edit>
);
