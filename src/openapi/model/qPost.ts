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


export interface QPost { 
    id?: string;
    createdAt?: number;
    updatedAt?: number;
    senderId?: string;
    title?: string | null;
    text?: string | null;
    isPinned?: boolean;
    isEssense?: boolean;
    user?: QUser;
    replyCount?: number;
    lastReply?: number;
}

