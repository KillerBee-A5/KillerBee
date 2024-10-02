import {
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  fetchUtils,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  QueryFunctionContext,
  RaRecord,
  UpdateManyParams,
  UpdateManyResult,
} from "react-admin";
import { stringify } from "query-string";
import { caesarEncrypt, caesarDecrypt } from "./utils/caesarCipher";

const apiUrl = import.meta.env.VITE_API_URL;
const httpClient = fetchUtils.fetchJson;

const mapId = (resource: string, data: any[]): any[] => {
  return data.map((item) => {
    switch (resource) {
      case "gammes":
        return { ...item, id: item.ID_GAMME };
      case "etapes":
        return { ...item, id: item.ID_ETAPE };
      case "procedes":
        return { ...item, id: item.ID_PROCEDE };
      case "ingredients":
        return { ...item, id: item.ID_INGREDIENT };
      case "frizbees":
        return { ...item, id: item.ID_FRIZBEE };
      default:
        return item;
    }
  });
};

const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const query = {
      // Ajoutez les paramètres de pagination et de tri si nécessaire
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      if (resource === "frizbees") {
        json = json.map((item: any) => {
          item.DESCRIPTION_FRIZBEE = caesarDecrypt(item.DESCRIPTION_FRIZBEE);
          return item;
        });
      }
      const data = mapId(resource, json);
      return {
        data,
        total: data.length,
      };
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      if (resource === "frizbees") {
        json.DESCRIPTION_FRIZBEE = caesarDecrypt(json.DESCRIPTION_FRIZBEE);
      }
      const data = mapId(resource, [json])[0];
      return { data };
    }),

  create: (resource, params) => {
    if (resource === "frizbees") {
      params.data.DESCRIPTION_FRIZBEE = caesarEncrypt(
        params.data.DESCRIPTION_FRIZBEE,
      );
    }
    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      const data = mapId(resource, [json])[0];
      return { data };
    });
  },

  update: (resource, params) => {
    if (resource === "frizbees") {
      params.data.DESCRIPTION_FRIZBEE = caesarEncrypt(
        params.data.DESCRIPTION_FRIZBEE,
      );
    }
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      const data = mapId(resource, [json])[0];
      return { data };
    });
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => {
      const data = mapId(resource, [json])[0];
      return { data };
    }),

  getMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ): Promise<GetManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },

  getManyReference: function <RecordType extends RaRecord = any>(
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ): Promise<GetManyReferenceResult<RecordType>> {
    throw new Error("Function not implemented.");
  },

  updateMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: UpdateManyParams,
  ): Promise<UpdateManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },

  deleteMany: function <RecordType extends RaRecord = any>(
    resource: string,
    params: DeleteManyParams<RecordType>,
  ): Promise<DeleteManyResult<RecordType>> {
    throw new Error("Function not implemented.");
  },
};

export default dataProvider;
