// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** getPdq GET /api/pdq */
export async function getPdqUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPdqUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.PDP[]>('/api/pdq', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getTeacher GET /api/teacher */
export async function getTeacherUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getTeacherUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.Teacher>('/api/teacher', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
