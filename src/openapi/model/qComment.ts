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
import { QWork } from './qWork';


export interface QComment { 
    id?: string;
    createdAt?: number;
    updatedAt?: number;
    /**
     * 评论发送者id
     */
    senderId?: string;
    /**
     * 作品id
     */
    workId?: string;
    /**
     * 评论标题
     */
    title?: string | null;
    /**
     * 评论正文
     */
    text?: string | null;
    /**
     * 评分（1-5）
     */
    rating?: number;
    /**
     * 赞同数量
     */
    agreeCount?: number;
    /**
     * 反对数量
     */
    disagreeCount?: number;
    user?: QUser;
    /**
     * 我的态度。true/false/null对应点赞/点踩/无
     */
    myAttitude?: boolean | null;
    work?: QWork;
}

