import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
import './antDesign.css'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import TableEmployee from './Employee/TableEmployee';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class MyAntDesign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <>
                <Router>
                    <Layout style={{ minHeight: '100vh' }}>
                        
                        
                        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                            <div className="logo" />
                            <Menu className="my-menu" theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                <Menu.Item key="1">
                                    <Icon type="pie-chart" />
                                    {/* <Link to="/antd/TableEmployee">Employee</Link> */}
                                    <span>
                                    <Link to="/antd/TableEmployee">Employee</Link>
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="desktop" />
                                    <span>Option 2</span>
                                </Menu.Item>
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <span>
                                            <Icon type="user" />
                                            <span>User</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="3">Tom</Menu.Item>
                                    <Menu.Item key="4">Bill</Menu.Item>
                                    <Menu.Item key="5">Alex</Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <Icon type="team" />
                                            <span>Team</span>
                                        </span>
                                    }
                                >
                                    <Menu.Item key="6">Team 1</Menu.Item>
                                    <Menu.Item key="8">Team 2</Menu.Item>
                                </SubMenu>
                                <Menu.Item key="9">
                                    <Icon type="file" />
                                    <span>File</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>



                        <Layout>
                            <Content style={{ margin: '0 16px' }}>
                                <div className="my-content" style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                    <Switch>
                                        <Route path="/antd/TableEmployee" component={TableEmployee} />
                                    </Switch>
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                        </Layout>
                    </Layout>
                </Router>
            </>
        );
    }
}

export default MyAntDesign;