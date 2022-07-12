import { GlobalOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Layout, Menu, Typography } from 'antd'
import React from 'react'

import styles from './Header.module.css'
import logo from '../../assets/logo.svg'

export const Header :React.FC = () => {
  return (
    <div className={styles['app-header']}>
        {/* top-header */}
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>让旅游更幸福</Typography.Text>
            <Dropdown.Button
              style={{ marginLeft: 15 }}
              overlay={
                <Menu items={[
                  { key: "1", label: "中文" },
                  { key: "2", label: "English" }
                ]}/>
              }
              icon={<GlobalOutlined></GlobalOutlined>}
            >
              语言
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button>注册</Button>
              <Button>登录</Button>
            </Button.Group>
          </div>

        </div>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            React Travel
          </Typography.Title>
          <Input.Search
            placeholder={'请输入旅游目的地、主题、或关键字'}
            className={styles['search-input']}
          >
          </Input.Search>
        </Layout.Header>
        <Menu mode={'horizontal'} className={styles['main-menu']}
          items={[
            { key: 1, label: '旅游资源' },
            { key: 1, label: '跟团游' },
            { key: 1, label: '周末游' },
            { key: 1, label: '自由行' },
            { key: 1, label: '私家团' },
            { key: 1, label: '游轮' },
            { key: 1, label: '酒店+景点' },
            { key: 1, label: '当地玩乐' },
            { key: 1, label: '主题游' },
            { key: 1, label: '定制游' },
            {key: 1,label: '游学'},
            {key: 1,label: '签证'},
            {key: 1,label: '企业游'},
            {key: 1,label: '高端游'},
            {key: 1,label: '户外'},
            {key: 1,label: '保险'},
          ]}
        >

        </Menu>
      </div>
  )
}
