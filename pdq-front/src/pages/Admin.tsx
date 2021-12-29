import React from 'react';
import { HeartTwoTone, SmileTwoTone, UploadOutlined } from '@ant-design/icons';
import { Card, Typography, Alert, message, Upload, Button } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useIntl } from 'umi';

const Admin: React.FC = () => {
  const intl = useIntl();
  const props = {
    name: 'file',
    action: '/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 数据处理已完成`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败或数据存在错误`);
      }
    },
  };
  return (
    <PageHeaderWrapper
      content={"上传文件后将自动清除原有数据!"}
    >
      <Card>
        <Alert
          message={"河北建筑工程学院"}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          <SmileTwoTone /> 上传文件后将自动清除原有数据 <HeartTwoTone twoToneColor="#eb2f96" />
        </Typography.Title>
      </Card>
      <Card>
        <Upload {...props}  >
          <Button style={{marginLeft:"500px"}}   type="primary" icon={<UploadOutlined />}>数据上传</Button>
        </Upload>
      </Card>
    </PageHeaderWrapper>
  );
};

export default Admin;
