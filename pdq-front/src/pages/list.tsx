import React from "react";
import {useRequest} from "umi";
import {getPdqUsingGET} from "../services/swagger/pdqController";
import ProList from '@ant-design/pro-list';
import { StatisticCard } from '@ant-design/pro-card';
import { Tag } from "antd";
import ProSkeleton from '@ant-design/pro-skeleton';
const { Divider } = StatisticCard;
const List: React.FC<API.getPdqUsingGETParams> = (props: API.getPdqUsingGETParams) => {

  const {data, loading}: any = useRequest(() => {
    return getPdqUsingGET(props.query)
  });
  let count: any[]=[]
  let result: any[]=[]

  if (loading) {
    return  <div
      style={{
        background: '#fafafa',
        padding: 24,
      }}
    >
      <ProSkeleton type="descriptions" />
    </div>
  }
  let i: number;
  count.push({
    id: data[0][0],
    money: ( <StatisticCard
      style={{left:"30px",width:"300px"}}
      statistic={{
        value: data[0][1],
        precision: 2,
        suffix: '元',
      }}
    />),
    name: ( <Tag color="#f50">{data[0][2]}</Tag>),
    avatar: "https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg"
  })

  for (i = 1; i < data.length; i++) {
    const x = {
      id: data[i][0],
      money: ( <StatisticCard
        style={{left:"30px",width:"300px"}}
        statistic={{
          value: data[i][1],
          precision: 2,
          suffix: '元',
        }}
      />),
      name: ( <Tag color="#5BD8A6">{data[i][2]}</Tag>),
      avatar: "https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg"
    }
    result.push(x)
  }

  return  <>
  <ProList<API.PDP>
    loading={loading}
    rowSelection={{}}
    grid={{gutter: 16, column: 1}}
    metas={{
      title: {
        dataIndex: 'name'
      },
      subTitle: {},
      type: {},
      avatar: {dataIndex:'avatar'},
      content: {dataIndex:'money'},
    }}
    headerTitle="绩效总计"
    dataSource={count}
  />
  <ProList<API.PDP>
    loading={loading}
    rowSelection={{}}
    grid={{gutter: 16, column: 2}}
    metas={{
      title: {
        dataIndex: 'name'
      },
      subTitle: {},
      type: {},
      avatar: {dataIndex:'avatar'},
      content: {dataIndex:'money'},
    }}
    headerTitle="绩效明细"
    dataSource={result}
  />
  </>
}
export default List;
