
import { PageContainer } from '@ant-design/pro-layout';
import { Card} from 'antd';

import React, { useState } from 'react';
import { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
const { Divider } = StatisticCard;
import { useRequest} from "umi";
import {getTeacherUsingGET} from "../services/swagger/pdqController";
import List from './list';


const Welcome: React.FC = (props: any) => {
  const [responsive, setResponsive] = useState(false);
  const mes = props.location.query
  let query = {staffCode: mes.staffCode, idCard: mes.idCard}
  const {data, loading}: any = useRequest(() => { return getTeacherUsingGET(query)});
  if (loading) {
   return <PageContainer>
      <Card>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            setResponsive(offset.width < 596);
          }}
        >
          <StatisticCard.Group title="个人信息" direction={responsive ? 'column' : 'row'}  loading={loading}>
            <StatisticCard
              statistic={{
                title: '姓名',
                tip: ' ',
                precision: 2,
              }}
            />
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <StatisticCard
              statistic={{
                title: '职工号',
                precision: 0,
              }}
            />
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <StatisticCard
              statistic={{
                title: '部门',
              }}
            />
            <StatisticCard
              statistic={{
                title: '身份证号',
                precision: 0,
              }}
            />
          </StatisticCard.Group>
        </RcResizeObserver>
      </Card>
   </PageContainer>
      }
  if(!loading && data==null)
  {
    return <div>错误</div>
  }
  return (
    <PageContainer>
      <Card>
        <RcResizeObserver
          key="resize-observer"
          onResize={(offset) => {
            setResponsive(offset.width < 596);
          }}
        >
          <StatisticCard.Group title="个人信息" direction={responsive ? 'column' : 'row'}  >
            <StatisticCard
              statistic={{
                title: '姓名',
                tip: ' ',
                value: data.name,
                precision: 2,
              }}
            />
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <StatisticCard
              statistic={{
                title: '职工号',
                value: data.staffCode,
                precision: 0,
              }}
            />
            <Divider type={responsive ? 'horizontal' : 'vertical'} />
            <StatisticCard
              statistic={{
                title: '部门',
                value: data.department,
              }}
            />
            <StatisticCard
              statistic={{
                title: '身份证号',
                value: "****"+data.idCard,
                precision: 0,
              }}
            />
          </StatisticCard.Group>
        </RcResizeObserver>
      </Card>
      <List query={query}/>
    </PageContainer>
  );
};

export default Welcome;
