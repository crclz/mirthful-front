/**
 * TheAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { QUser } from './qUser';


export interface QComment { 
    id?: string;
    createdAt?: number;
    updatedAt?: number;
    senderId?: string;
    workId?: string;
    title?: string | null;
    text?: string | null;
    rating?: number;
    agreeCount?: number;
    disagreeCount?: number;
    user?: QUser;
}

