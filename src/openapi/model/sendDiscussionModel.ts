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


export interface SendDiscussionModel { 
    /**
     * 话题id
     */
    topicId?: string;
    /**
     * 文字
     */
    text?: string | null;
    /**
     * 图片url。这个怎么使用呢？首先用单独的一个请求上传图片，获取id，然后再在这里附带id。
     */
    imageUrl?: string | null;
}

