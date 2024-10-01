// src/dataProvider.ts
import { DataProvider } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import axiosInstance from './axiosInstance';

const dataProvider: DataProvider = simpleRestProvider('', axiosInstance);

export default dataProvider;
