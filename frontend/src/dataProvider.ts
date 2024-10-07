import {
  fetchUtils,
  DataProvider,
  GetListParams,
  GetListResult,
  GetOneParams,
  GetOneResult,
  CreateParams,
  CreateResult,
  UpdateParams,
  UpdateResult,
  DeleteParams,
  DeleteResult,
  GetManyParams,
  GetManyResult,
  GetManyReferenceParams,
  GetManyReferenceResult,
  RaRecord,
} from "react-admin";
import { stringify } from "query-string";
import { encryptData, decryptData } from "./utils/cryptoUtils";

const apiUrl = import.meta.env.VITE_API_URL;
const httpClient = fetchUtils.fetchJson;

/**
 * Fonction pour chiffrer tous les champs string dans les données avant envoi
 */
const encryptParams = <T extends RaRecord>(
  params: CreateParams<T> | UpdateParams<T>,
): CreateParams<T> | UpdateParams<T> => {
  const encryptedParams = { ...params };
  if (encryptedParams.data) {
    encryptedParams.data = encryptData(encryptedParams.data);
  }
  return encryptedParams;
};

/**
 * Fonction pour déchiffrer tous les champs string dans les données reçues
 */
const decryptResponse = <T extends RaRecord>(data: T): T => {
  const decryptedData = decryptData(data);
  return { ...decryptedData, id: decryptedData.id };
};

/**
 * Data Provider Généralisé
 */
const dataProvider: DataProvider = {
  getList: <T extends RaRecord>(
    resource: string,
    params: GetListParams,
  ): Promise<GetListResult<T>> => {
    const { pagination } = params;

    let query;

    if (pagination) {
      const { page, perPage } = pagination;
      query = {
        sort: JSON.stringify(params.sort),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
      };
    } else {
      query = {
        sort: JSON.stringify(params.sort),
        filter: JSON.stringify(params.filter),
      };
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => {
      const data = (json as T[]).map(decryptResponse);
      const total = parseInt(
        headers.get("content-range")?.split("/").pop() ??
          data.length.toString(),
        10,
      );
      return {
        data,
        total,
      };
    });
  },

  getOne: <T extends RaRecord>(
    resource: string,
    params: GetOneParams,
  ): Promise<GetOneResult<T>> =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: decryptResponse(json as T),
    })),

  create: <T extends RaRecord>(
    resource: string,
    params: CreateParams<T>,
  ): Promise<CreateResult<T>> => {
    const encryptedParams = encryptParams(params);

    return httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(encryptedParams.data),
    }).then(({ json }) => ({
      data: decryptResponse(json as T),
    }));
  },

  update: <T extends RaRecord>(
    resource: string,
    params: UpdateParams<T>,
  ): Promise<UpdateResult<T>> => {
    const encryptedParams = encryptParams(params);

    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(encryptedParams.data),
    }).then(({ json }) => ({
      data: decryptResponse(json as T),
    }));
  },

  delete: <T extends RaRecord>(
    resource: string,
    params: DeleteParams,
  ): Promise<DeleteResult<T>> =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: decryptResponse(json as T),
    })),

  getMany: <T extends RaRecord>(
    resource: string,
    params: GetManyParams<T>,
  ): Promise<GetManyResult<T>> => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({
      data: (json as T[]).map(decryptResponse),
    }));
  },

  getManyReference: <T extends RaRecord>(
    resource: string,
    params: GetManyReferenceParams,
  ): Promise<GetManyReferenceResult<T>> => {
    const { pagination } = params;
    const { page, perPage } = pagination;

    const query = {
      sort: JSON.stringify(params.sort),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: (json as T[]).map(decryptResponse),
      total: parseInt(
        headers.get("content-range")?.split("/").pop() ??
          json.length.toString(),
        10,
      ),
    }));
  },

  updateMany: (resource, params) => {
    // Implémentez si nécessaire
    return Promise.reject(new Error("updateMany not implemented"));
  },

  deleteMany: (resource, params) => {
    // Implémentez si nécessaire
    return Promise.reject(new Error("deleteMany not implemented"));
  },
};

export default dataProvider;
