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


export interface RegisterModel { 
    /**
     * 用户名。仅仅用于登录
     */
    username: string;
    /**
     * 密码
     */
    password: string;
    /**
     * 昵称，用于展示。
     */
    nickname: string;
    /**
     * 简介
     */
    description: string;
}

