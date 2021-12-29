import {
  HeartOutlined,

  UserOutlined,

} from '@ant-design/icons';
import {Alert, message, Tabs} from 'antd';
import React, {useState} from 'react';
import {ProFormText, LoginForm} from '@ant-design/pro-form';
import {useIntl, history, useModel, useRequest} from 'umi';
import Footer from '@/components/Footer';
import styles from './index.less';
import {getTeacherUsingGET} from "../../../services/swagger/pdqController";

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  // @ts-ignore
  const {initialState, setInitialState} = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };


  const {status, type: loginType} = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          title="绩效明细查询"
          subTitle={"河北建筑工程学院"}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            try {
              const data: any = await getTeacherUsingGET(values);
              history.push({
                pathname: '/list',
                query: {
                  staffCode: values.staffCode,
                  idCard: values.idCard
                },
              });
            } catch (error) {
              message.error("职工号或身份证号输入错误");
            }
          }}
            submitter={{
            searchConfig:{submitText:"查询"},
            submitButtonProps:{
            style:{
            width:'100%'
          }
          },
            resetButtonProps:false
          }}
            >
            <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
            key="account"
            tab={"查询"}
            />
            </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
            content={"职工号不存在或身份证号错误"}
            />
            )}
          {type === 'account' && (
            <>
            <ProFormText
            name="staffCode"
            fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
            placeholder={"  职工号"}
            rules={[
          {
            required: true,
            message: ("请输入职工号!"
            ),
          },
            ]}
            />
            <ProFormText
            name="idCard"
            fieldProps={{
            size: 'large',
            prefix: <HeartOutlined  className={styles.prefixIcon} />,
          }}
            placeholder={"  身份证号后六位"}
            rules={[
          {
            required: true,
            message: ("请输入身份证号后六位！"
            ),
          },
            ]}
            />
            </>
            )}
            <div
            style={{
            marginBottom: 24,
          }}
            >
            </div>
            </LoginForm>
            </div>
            <Footer />
            </div>
            );
          };

        export default Login;
