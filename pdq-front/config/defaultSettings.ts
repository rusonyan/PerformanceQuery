import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fixed',
  fixedHeader: false,
  fixSiderbar: true,
  headerRender:false,
  splitMenus:false,
  menuRender:false,
  menuHeaderRender:false,
  colorWeak: false,
  title: '河北建筑工程学院',
  pwa: false,
  logo: 'https://www.hebiace.edu.cn/images/1512171120360943181.png',
  iconfontUrl: '',
};

export default Settings;



